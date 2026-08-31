// ============================================================================
// Fengfan Xiangqi Service Worker
//
// 缓存策略：引擎 / 前端界面 分层缓存 + Cache First + stale-while-revalidate
//
//  [1] 前端界面资源：Cache First + SWR。
//  [2] 引擎文件（pikafish.js / .wasm / .data）：Cache First + SWR，
//      命中缓存立即返回；未命中时把网络响应【直接流式转发】给页面，
//      让 Emscripten 的 setStatus("Downloading data... (x/y)") 能拿到真实
//      进度（修复"引擎加载一直 0%"）。
//  [3] 续传：飞行下载（LiveDownload）缓存在 SW 内存里，并在页面关闭后继续
//      下载写回 CacheStorage；引擎加载中刷新页面会【接着上次已下载的字节
//      继续】，而不是从头重新下载。
//  [4] 真值源 = version.json 的 sha256（不依赖不可靠的服务器 ETag）：
//      哪个文件 hash 变了，就只回源替换那一个，其余沿用，保持最新且不多下。
//      大文件 pikafish.data（~50MB）用 meta 哈希做秒级字符串比对，不重复读盘。
//  [5] 所有响应统一注入 COOP/COEP，保证多线程 WASM（SharedArrayBuffer）可用。
// ============================================================================

"use strict";

const CACHE_NAME = "fengfan-xiangqi-files-v1";
const MANIFEST_PATH = "/version.json";
const BUILD_INFO_PATH = "/build-info.json"; // 构建信息：引擎版本 / 更新时间 / 各文件大小
const DATA_PATH = "/wasm/pikafish.data";
const DATA_META_KEY = "/__meta/pikafish.data.sha256"; // 仅内部记录 data 的 sha256，非真实文件

// 前端界面外壳：小体积，安装时预缓存，保证离线首屏
const APP_SHELL = [
    "/xiangqiai.html",
    "/assets/index.b58f0dd0.js",
    "/assets/index.65062099.css"
];

// 引擎文件判断（本项目为 pikafish.js / .wasm / .data）
function isEngineFile(urlPath) {
    return urlPath.indexOf("/wasm/pikafish.js") >= 0 ||
           urlPath.indexOf("/wasm/pikafish.wasm") >= 0 ||
           urlPath.indexOf("/wasm/pikafish.data") >= 0;
}

// ----------------------------------------------------------------------------
// 安装：预缓存前端外壳并立即 skipWaiting，尽快接管页面。
// ----------------------------------------------------------------------------
self.addEventListener("install", function (event) {
    event.waitUntil(
        (async function () {
            const cache = await caches.open(CACHE_NAME);
            await Promise.allSettled(
                APP_SHELL.map(function (u) { return cache.add(u); })
            );
            await self.skipWaiting();
        })()
    );
});

// ----------------------------------------------------------------------------
// 激活：清理旧结构缓存并立即接管页面。
// ----------------------------------------------------------------------------
self.addEventListener("activate", function (event) {
    event.waitUntil(
        (async function () {
            const keys = await caches.keys();
            await Promise.all(
                keys.filter(function (k) { return k !== CACHE_NAME; })
                    .map(function (k) { return caches.delete(k); })
            );
            await self.clients.claim();
        })().catch(function () { /* 清理/接管失败不影响后续 fetch */ })
    );
});

// ----------------------------------------------------------------------------
// 通知所有打开页面：缓存内容有更新（页面侧无监听，纯提示）。
// ----------------------------------------------------------------------------
function notifyUpdate() {
    self.clients.matchAll({ type: "window" }).then(function (list) {
        list.forEach(function (c) { c.postMessage({ type: "CACHE_UPDATED" }); });
    });
}

// ----------------------------------------------------------------------------
// 抓取：仅拦截同源 GET 请求。
// ----------------------------------------------------------------------------
self.addEventListener("fetch", function (event) {
    const req = event.request;
    if (req.method !== "GET") return;
    const url = new URL(req.url);
    if (url.origin !== self.location.origin) return;

    event.respondWith(serve(event, req, url));
});

// ----------------------------------------------------------------------------
// 核心分流：清单 / 导航走网络优先；引擎文件走流式 + 续传；前端资源走 SWR。
// ----------------------------------------------------------------------------
async function serve(event, req, url) {
    const cache = await caches.open(CACHE_NAME);

    // version.json 自身：必须拿到最新清单。
    if (url.pathname === MANIFEST_PATH) return networkFirst(req, cache);

    // build-info.json（关于界面展示用）：网络优先保证新鲜，离线回退缓存。
    if (url.pathname === BUILD_INFO_PATH) return networkFirst(req, cache);

    // 导航请求（HTML 文档）：网络优先，保证界面每次都是最新，并第一时间注入
    // COOP/COEP 建立跨源隔离（无痕模式卡 0% 的修复就靠这条快速通道）。
    if (req.mode === "navigate") return networkFirst(req, cache);

    // 引擎文件：Cache First + 流式下载 + 续传。
    if (isEngineFile(url.pathname)) return cacheFirstEngine(event, req, url, cache);

    // 前端界面资源：Cache First + SWR。
    return cacheFirstSWR(req, url, cache);
}

// ----------------------------------------------------------------------------
// 前端界面资源：Cache First + stale-while-revalidate。
//   命中缓存立即返回；后台用 version.json 的 sha256 校验，变了才回源更新。
// ----------------------------------------------------------------------------
async function cacheFirstSWR(req, url, cache) {
    const cached = await cache.match(req);

    const refreshing = (async function () {
        try {
            const manifest = await getManifest(cache);
            const expected = manifest ? manifest[url.pathname] : undefined;
            if (expected && cached) {
                const hash = await sha256Hex(await readAllBytes(cached.clone().body));
                if (hash === expected) return; // 缓存内容即最新，无需更新
            }
            const fresh = await fetch(req, { cache: "reload" });
            if (fresh && fresh.ok && fresh.type === "basic") {
                await cache.put(req, fresh.clone()).catch(function () {});
                if (cached) notifyUpdate();
            }
        } catch (e) { /* 忽略，回退缓存即可 */ }
    })();

    if (cached) {
        return withIsolationHeaders(cached); // 立即返回缓存（stale）
    }

    // 无缓存：等待后台回源完成再返回
    await refreshing;
    const freshCached = await cache.match(req);
    if (freshCached) return withIsolationHeaders(freshCached);
    return new Response(null, { status: 504, statusText: "Network Unavailable" });
}

// ----------------------------------------------------------------------------
// 引擎文件：Cache First + 流式下载 + 续传。
//   命中缓存 → 立即返回，后台按需校验（小文件 sha256 / data 用 meta）。
//   未命中   → 加入/创建"飞行下载"，把已缓冲字节 + 实时字节流式返回给页面，
//              进度可见；后台下载在页面刷新后仍继续并写回 CacheStorage。
// ----------------------------------------------------------------------------
async function cacheFirstEngine(event, req, url, cache) {
    const cached = await cache.match(req);
    if (cached) {
        // 后台按需重新校验，不阻塞本次响应
        kickoffRevalidate(url, cache).catch(function () {});
        return withIsolationHeaders(cached);
    }

    // 无缓存：若正在下载则续传，否则启动新的飞行下载。
    let live = inflight.get(url.pathname);
    if (live && live.failed) {
        live = null; // 上次下载失败：重新开始
    }
    if (!live) {
        live = new LiveDownload(url);
        inflight.set(url.pathname, live);
        // 页面刷新/关闭后，SW 仍保持存活把下载写完。
        if (event) { try { event.waitUntil(live.promise); } catch (e) { /* 忽略 */ } }
    }
    return live.respond(); // 流式：已下载字节立刻给到 + 后续实时续传
}

// ----------------------------------------------------------------------------
// 后台按需校验（引擎文件）：小文件比对 sha256，data 比对 meta 哈希。
// ----------------------------------------------------------------------------
async function kickoffRevalidate(url, cache) {
    if (url.pathname === DATA_PATH) {
        const manifest = await getManifest(cache);
        const expected = manifest ? manifest[DATA_PATH] : undefined;
        if (!expected) return;
        const stored = await readStoredSha(cache);
        if (stored === expected) return; // 已最新
        const fresh = await fetch(DATA_PATH, { cache: "reload" });
        if (fresh && fresh.ok && fresh.type === "basic") {
            const bytes = await readAllBytes(fresh.clone().body);
            const sha = await sha256Hex(bytes);
            await cache.put(DATA_PATH, fresh.clone()).catch(function () {});
            await cache.put(DATA_META_KEY, new Response(sha, { headers: { "Content-Type": "text/plain" } }))
                .catch(function () {});
            notifyUpdate();
        }
        return;
    }

    const manifest = await getManifest(cache);
    const expected = manifest ? manifest[url.pathname] : undefined;
    if (!expected) return;
    const cached = await cache.match(url.href);
    if (!cached) return;
    const hash = await sha256Hex(await readAllBytes(cached.clone().body));
    if (hash === expected) return; // 已最新
    const fresh = await fetch(url.href, { cache: "reload" });
    if (fresh && fresh.ok && fresh.type === "basic") {
        await cache.put(url.href, fresh.clone()).catch(function () {});
        notifyUpdate();
    }
}

// ============================================================================
// 飞行下载（LiveDownload）：负责一次引擎文件的"流式 + 续传"下载。
//   - 用 tee() 把网络响应分成两路：
//       [a] 直接交给首个页面消费者 —— 这是网络原生流，浏览器会逐步转发，
//           保证 Emscripten 能拿到真实 "Downloading data... (x/y)" 进度
//           （修复"首次加载一直 0%"）。
//       [b] 我们自己读取并缓冲进内存，供刷新后的续传，下载完成写回缓存。
//   - 刷新后再次请求（下载未完）时，从缓冲回放"已下载字节 + 实时字节"，
//     不重新下载。
//   注意：缓冲整份文件（.data 约 50MB）是换取"刷新续传"的代价，下载完即释放。
// ============================================================================
const inflight = new Map(); // pathname -> LiveDownload

class LiveDownload {
    constructor(url) {
        this.url = url;
        this.path = url.pathname;
        this.chunks = [];       // 缓冲：供续传回放 + 完成后写回缓存
        this.received = 0;
        this.total = 0;
        this.headers = null;
        this.status = 0;
        this.statusText = "";
        this.pageStream = null;    // 网络原始 tee 分支 [a]：给首个消费者
        this.pageStreamTaken = false;
        this.done = false;
        this.failed = false;
        // 续传消费者（刷新后的页面请求）：push 模型，_start() 每收到一块就喂给它们。
        // 不使用 pull 返回 Promise 的续期方式 —— 实测浏览器/Node 在 Promise 兑现后
        // 不再重新调用 pull，会导致刷新续传的流死锁、进度一直为 0。
        this.replayConsumers = new Set();
        this.headerWaiters = [];     // 等待响应头的 respond() 调用者
        this.promise = this._start(); // 后台下载 + 写缓存，完成后解析
    }

    async _start() {
        inflight.set(this.path, this);
        try {
            const resp = await fetch(this.url.href, { cache: "reload" });
            this.status = resp.status;
            this.statusText = resp.statusText;
            this.headers = resp.headers;
            if (!resp.ok || resp.type !== "basic") throw new Error("HTTP " + resp.status);
            this.total = Number(resp.headers.get("Content-Length") || 0);

            // tee：a 给页面（原生流式，进度可见）；b 供我们缓冲 + 写缓存
            const branches = resp.body.tee();
            this.pageStream = branches[0];
            this._resolveHeaderWaiters();

            const reader = branches[1].getReader();
            for (;;) {
                const r = await reader.read();
                if (r.done) break;
                this.chunks.push(r.value);
                this.received += r.value.byteLength;
                this._pumpReplays();
            }
            this.done = true;
            this._pumpReplays();
            await this._commit();
        } catch (e) {
            this.failed = true;
            this.done = true;
            this._pumpReplays();
            this._rejectHeaderWaiters(e);
        } finally {
            inflight.delete(this.path);
        }
    }

    // push 模型：把新到/已缓冲的字节喂给所有续传消费者。
    _pumpReplays() {
        for (const c of this.replayConsumers) this._feedReplay(c);
    }

    // 喂给单个续传消费者：回放已缓冲块；下载结束后 close/error。
    _feedReplay(consumer) {
        const controller = consumer.controller;
        if (!consumer.active || !controller) return;
        try {
            while (consumer.pos < this.chunks.length) {
                controller.enqueue(this.chunks[consumer.pos++]);
            }
            if (this.done) {
                if (this.failed && this.received === 0) {
                    controller.error(new Error("engine download failed"));
                } else {
                    controller.close();
                }
                consumer.active = false;
                this.replayConsumers.delete(consumer);
            }
        } catch (e) {
            // 消费者已取消（页面刷新 / fetch 中止）：移除即可
            consumer.active = false;
            this.replayConsumers.delete(consumer);
        }
    }

    _resolveHeaderWaiters() {
        const arr = this.headerWaiters;
        this.headerWaiters = [];
        for (const w of arr) w.resolve();
    }

    _rejectHeaderWaiters(e) {
        const arr = this.headerWaiters;
        this.headerWaiters = [];
        for (const w of arr) w.reject(e);
    }

    async _commit() {
        if (this.failed || this.received === 0) return;
        try {
            const cache = await caches.open(CACHE_NAME);
            const blob = new Blob(this.chunks);
            const headers = new Headers(this.headers || {});
            headers.delete("Content-Encoding"); // body 已是解压后的原始字节
            headers.delete("Content-Length");
            headers.delete("Set-Cookie");
            await cache.put(this.url.href, new Response(blob, {
                status: this.status || 200,
                statusText: this.statusText || "OK",
                headers: headers
            }));
            // 大文件 data 额外记录 sha256 到 meta，后续只做字符串比对
            if (this.path === DATA_PATH) {
                const buf = new Uint8Array(await blob.arrayBuffer());
                const sha = await sha256Hex(buf);
                await cache.put(DATA_META_KEY, new Response(sha, { headers: { "Content-Type": "text/plain" } }))
                    .catch(function () {});
            }
        } catch (e) { /* 缓存失败不影响本次流式返回 */ }
    }

    // 构造给页面的响应：
    //   首个消费者 → 直接使用网络原生流 [a]（进度必达）。
    //   后续消费者（刷新续传）→ 回放已缓冲字节 + 实时字节（即使下载未完，
    //       也立即返回回放流，避免被 headerWaiters 永久阻塞而进度一直为 0）。
    //   失败时 reject，让页面侧 fetch 抛错从而走重试/离线提示。
    respond() {
        const self = this;
        // 网络响应头还没到（下载尚未开始回源）：先排队等流就绪。
        if (!this.pageStream && !this.done) {
            return new Promise(function (resolve, reject) {
                self.headerWaiters.push({
                    resolve: function () { resolve(self.respond()); },
                    reject: reject
                });
            });
        }
        // 首个消费者：直接把网络原生流 [a] 给它。
        if (!this.pageStreamTaken && this.pageStream) {
            this.pageStreamTaken = true;
            return Promise.resolve(this._buildNetworkResponse());
        }
        // 已完成/失败：给明确结果。
        if (this.done) {
            if (this.failed && this.received === 0) {
                return Promise.reject(new Error("engine download failed"));
            }
            return Promise.resolve(this._buildReplayResponse());
        }
        // 下载进行中：后续消费者（刷新续传）→ 回放已缓冲字节 + 实时字节。
        return Promise.resolve(this._buildReplayResponse());
    }

    // 网络原生流响应：浏览器逐步转发到页面，进度可见。
    // 不设 Content-Length，Emscripten 会回退到 packageSize 计算进度，避免压缩偏差。
    _buildNetworkResponse() {
        const headers = new Headers(this.headers || {});
        headers.delete("Content-Encoding"); // 已解压，避免客户端二次解码
        headers.delete("Content-Length");
        headers.set("Cross-Origin-Embedder-Policy", "require-corp");
        headers.set("Cross-Origin-Opener-Policy", "same-origin");
        return new Response(this.pageStream, {
            status: this.status || 200,
            statusText: this.statusText || "OK",
            headers: headers
        });
    }

    // 续传响应：回放已缓冲字节 + 实时字节（仅刷新后下载未完时使用）。
    // push 模型：start() 时立即回放已缓冲块；之后 _start() 每收到一块就经
    // _pumpReplays() 推给本流。不用 pull 返回 Promise 续期，规避流死锁。
    _buildReplayResponse() {
        const self = this;
        const consumer = { pos: 0, controller: null, active: true };
        const stream = new ReadableStream({
            start: function (controller) {
                consumer.controller = controller;
                self.replayConsumers.add(consumer);
                self._feedReplay(consumer); // 立即回放已缓冲字节，进度即刻可见
            },
            cancel: function () {
                consumer.active = false;
                self.replayConsumers.delete(consumer);
            }
        });

        const headers = new Headers(self.headers || {});
        headers.delete("Content-Encoding");
        headers.delete("Content-Length");
        headers.set("Cross-Origin-Embedder-Policy", "require-corp");
        headers.set("Cross-Origin-Opener-Policy", "same-origin");
        return new Response(stream, {
            status: self.status || 200,
            statusText: self.statusText || "OK",
            headers: headers
        });
    }
}

// ----------------------------------------------------------------------------
// 网络优先（用于 version.json 与导航文档）：成功写缓存返回，失败回退缓存。
// ----------------------------------------------------------------------------
async function networkFirst(req, cache) {
    try {
        const fresh = await fetch(req, { cache: "reload" });
        if (fresh && fresh.ok && fresh.type === "basic") {
            await cache.put(req, fresh.clone()).catch(function () {});
            return withIsolationHeaders(fresh);
        }
        const cached = await cache.match(req);
        if (cached) return withIsolationHeaders(cached);
        return withIsolationHeaders(fresh);
    } catch (e) {
        const cached = await cache.match(req);
        if (cached) return withIsolationHeaders(cached);
        return new Response(null, { status: 504, statusText: "Network Unavailable" });
    }
}

// ----------------------------------------------------------------------------
// 清单（version.json）：同一加载周期内并发请求合并为单次回源；失败退回缓存清单。
// ----------------------------------------------------------------------------
let manifestInflight = null;

function getManifest(cache) {
    if (manifestInflight) return manifestInflight;
    manifestInflight = loadManifest(cache).then(
        function (v) { manifestInflight = null; return v; },
        function () { manifestInflight = null; return null; }
    );
    return manifestInflight;
}

async function loadManifest(cache) {
    try {
        const fresh = await fetch(MANIFEST_PATH, { cache: "reload" });
        if (fresh && fresh.ok && fresh.type === "basic") {
            const data = await fresh.json().catch(function () { return null; });
            if (data) {
                await cache.put(MANIFEST_PATH, fresh.clone()).catch(function () {});
                return data;
            }
        }
    } catch (e) { /* 回源失败：用缓存清单 */ }
    try {
        const r = await cache.match(MANIFEST_PATH);
        if (r) return (await r.json().catch(function () { return null; })) || null;
    } catch (e) { /* 忽略 */ }
    return null;
}

async function readStoredSha(cache) {
    try {
        const r = await cache.match(DATA_META_KEY);
        if (r) return (await r.text()).trim();
    } catch (e) { /* 忽略 */ }
    return null;
}

// ----------------------------------------------------------------------------
// 工具函数。
// ----------------------------------------------------------------------------
async function readAllBytes(body) {
    if (!body) return new Uint8Array(0);
    const reader = body.getReader();
    const chunks = [];
    let size = 0;
    for (;;) {
        const r = await reader.read();
        if (r.done) break;
        chunks.push(r.value);
        size += r.value.byteLength;
    }
    const full = new Uint8Array(size);
    let offset = 0;
    chunks.forEach(function (c) { full.set(c, offset); offset += c.byteLength; });
    return full;
}

async function sha256Hex(data) {
    const buf = (data instanceof Uint8Array) ? data : new Uint8Array(data);
    const digest = await crypto.subtle.digest("SHA-256", buf);
    return Array.from(new Uint8Array(digest)).map(function (b) {
        return b.toString(16).padStart(2, "0");
    }).join("");
}

// 注入跨源隔离头，保证 COOP/COEP 生效，使多线程引擎可正常运行。
function withIsolationHeaders(response) {
    if (!response) return response;
    const status = response.status;
    if (status < 200 || status > 599 || response.type === "opaque" || response.type === "opaqueredirect") {
        return response;
    }
    try {
        const headers = new Headers(response.headers);
        headers.set("Cross-Origin-Embedder-Policy", "require-corp");
        headers.set("Cross-Origin-Opener-Policy", "same-origin");
        return new Response(response.body, {
            status: status,
            statusText: response.statusText,
            headers: headers
        });
    } catch (e) {
        return response;
    }
}

// ----------------------------------------------------------------------------
// 来自页面的指令：跳过等待 / 清空缓存。
// ----------------------------------------------------------------------------
self.addEventListener("message", function (event) {
    const d = event.data || {};
    if (d.type === "SKIP_WAITING") {
        self.skipWaiting();
    } else if (d.type === "CLEAR_CACHE") {
        event.waitUntil(
            caches.delete(CACHE_NAME)
                .then(function () { return self.clients.matchAll(); })
                .then(function (list) {
                    list.forEach(function (c) { c.postMessage({ type: "CACHE_CLEARED" }); });
                })
        );
    }
});
