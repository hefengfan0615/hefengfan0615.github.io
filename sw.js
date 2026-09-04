// ============================================================================
// Fengfan Xiangqi Service Worker
//
// 缓存策略：引擎 / 前端界面 分层缓存 + Cache First + stale-while-revalidate
//
//  [1] 前端界面资源：Cache First + SWR。
//  [2] 引擎代码 pikafish.js / pikafish.wasm（小文件）：【网络优先】——
//      在线时每次回源拿最新字节，保证"刷新即用最新引擎"，彻底规避
//      清单/CDN/缓存滞后导致一直用旧引擎的问题；离线时回退缓存兜底。
//  [3] 引擎大文件 pikafish.data（~50MB）：Cache First + 清单哈希校验。
//      data 是确定性产物，只有 NNUE 真的变了才回源重下 51MB，否则秒用缓存。
//      version.json 始终"缓存击穿"（时间戳 query + cache:reload）后比对，
//      确保用的是服务器最新清单，不受 CDN 滞后影响。
//  [4] 飞行下载（LiveDownload）：data 需重下时把网络响应【直接流式转发】给
//      页面，进度可见（修复"引擎加载一直 0%"）；刷新页面接着已下载字节续传，
//      下载完写回缓存，并记录 data 的 sha256 到 meta 供秒级比对。
//  [5] 所有响应统一注入 COOP/COEP，保证多线程 WASM（SharedArrayBuffer）可用。
// ============================================================================

"use strict";

const CACHE_NAME = "fengfan-xiangqi-files-v1";
const MANIFEST_PATH = "/version.json";
const DATA_PATH = "/wasm/pikafish.data";
const DATA_META_KEY = "/__meta/pikafish.data.sha256"; // 仅内部记录 data 的 sha256，非真实文件

// 飞行下载自愈参数：防止"刷新/回源卡死"后 LiveDownload 被永久复用，进度一直 0%。
const HEADER_TIMEOUT_MS = 20000; // 回源等响应头最长时间，超过视为回源卡死
const STALL_TIMEOUT_MS = 30000;  // 读数据 30s 无字节推进视为下载卡死
const WATCHDOG_MS = 5000;        // 看门狗扫描周期

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
    ensureWatchdog(); // 提前跑看门狗，尽早发现卡死下载
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
    ensureWatchdog(); // 兜底再跑看门狗
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

    // version.json 自身：必须拿到最新清单（已内联引擎版本 / 更新时间 / 文件大小）。
    if (url.pathname === MANIFEST_PATH) return networkFirst(req, cache);

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
            const expected = manifest ? manifestSha(manifest, url.pathname) : undefined;
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
// 引擎文件：
//   pikafish.js / pikafish.wasm（小文件）→ 【网络优先】：在线时每次都回源拿
//     最新字节，保证"刷新即用最新引擎"；离线时回退缓存兜底。
//   pikafish.data（~50MB 确定性大文件）→ Cache First + 清单哈希校验：
//     version.json 已"缓存击穿"，只把 data 与最新清单比对，NNUE 没变就秒用
//     缓存（不重下 51MB），变了才走流式续传下载。
// ----------------------------------------------------------------------------
async function cacheFirstEngine(event, req, url, cache) {

    // ---- pikafish.data：大文件，Cache First + 哈希校验（meta 秒级比对）----
    if (url.pathname === DATA_PATH) {
        const cached = await cache.match(req);
        if (cached) {
            try {
                const manifest = await getManifest(cache); // 最新清单（缓存击穿）
                const expected = manifest ? manifestSha(manifest, url.pathname) : undefined;
                if (expected) {
                    let stored = await readStoredSha(cache);
                    if (stored === null) {
                        // 旧版本缓存没有 meta：一次性全量哈希补写，避免盲目重下 51MB
                        stored = await sha256Hex(await readAllBytes(cached.clone().body));
                        if (stored) {
                            await cache.put(DATA_META_KEY, new Response(stored, {
                                headers: { "Content-Type": "text/plain" }
                            })).catch(function () {});
                        }
                    }
                    if (stored === expected) return withIsolationHeaders(cached); // 已最新
                    // 缓存落后于清单：删掉旧文件，走下方回源下载新版。
                    await cache.delete(req).catch(function () {});
                } else {
                    return withIsolationHeaders(cached); // 拿不到清单：用缓存兜底
                }
            } catch (e) {
                return withIsolationHeaders(cached); // 校验出错（如离线）：回退缓存
            }
        }

        // 需要更新 / 无缓存：复用/续传在途下载；已失败或卡死则自动换新。
        // ensureLive 内部会自愈卡死的下载（含正在等头的请求迁到新下载），
        // 保证之后刷新/点重新加载不再是"进度一直 0%"。
        const live = ensureLive(url, event);
        return live.respond(); // 流式：已下载字节立刻给到 + 后续实时续传
    }

    // ---- pikafish.js / pikafish.wasm：小文件，网络优先 ----
    try {
        const fresh = await fetch(req, { cache: "reload" });
        if (fresh && fresh.ok && fresh.type === "basic") {
            // 后台写缓存作离线兜底（去掉 Content-Encoding，body 已是解压字节）
            (async function () {
                try {
                    const headers = new Headers(fresh.headers);
                    headers.delete("Content-Encoding");
                    headers.delete("Content-Length");
                    headers.delete("Set-Cookie");
                    const buf = await fresh.clone().arrayBuffer();
                    await cache.put(req, new Response(buf, {
                        status: fresh.status,
                        statusText: fresh.statusText,
                        headers: headers
                    }));
                } catch (e) { /* 缓存失败不影响本次返回 */ }
            })();
            return withIsolationHeaders(fresh); // 本次就用网络最新字节
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

// ============================================================================
// 飞行下载（LiveDownload）：负责一次引擎文件的"流式 + 续传 + 多播"下载。
//   - SW 持有网络源的【唯一】读取分支，把收到的每一块字节缓冲进内存，并即刻
//     多播给当前及后续（刷新后）的所有页面消费者。
//   - 不再把网络源 tee 出一路直接交给首个页面：那样页面刷新/关闭后，无人读取
//     的那一路会按 Streams 规范把共享源背压/取消，导致下载永远卡在 0% —— 这是
//     "刷新两次后进度卡死、点重新加载也无效"的根因。
//   - 首/刷新各页面统一走多播流：新页面一进入先回放"已缓冲字节"，进度立即跳到
//     已下载比例，再随实时字节续进（"延续之前加载进度"）；下载完成写回缓存。
//   注意：缓冲整份文件（.data 约 50MB）是换取"刷新续传 + 多播"的代价，下载完即释放。
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
        this.done = false;
        this.failed = false;
        this.abandoned = false;
        this.reader = null;     // 网络源读取分支（供 abandon 时 cancel 中止）
        this.createdAt = Date.now();
        this.lastByteAt = this.createdAt;
        // 页面消费者（首/刷新统一）：push 模型，_start() 每收到一块就喂给它们。
        // 不使用 pull 返回 Promise 的续期方式 —— 实测浏览器/Node 在 Promise 兑现后
        // 不再重新调用 pull，会导致刷新续传的流死锁、进度一直为 0。
        this.replayConsumers = new Set();
        this.headerWaiters = [];     // 等待响应头的 respond() 调用者（resolve/reject 直存）
        this.promise = this._start(); // 后台下载 + 写缓存，完成后解析
    }

    async _start() {
        inflight.set(this.path, this);
        try {
            const resp = await fetch(this.url.href, { cache: "reload" });
            if (this.abandoned) { /* 已在等待回源期间被看门狗废弃 */ }
            this.status = resp.status;
            this.statusText = resp.statusText;
            this.headers = resp.headers;
            if (!resp.ok || resp.type !== "basic") throw new Error("HTTP " + resp.status);
            this.total = Number(resp.headers.get("Content-Length") || 0);
            // 响应头已就绪：通知所有排队等待响应的页面，保证状态码 / 头正确。
            this._resolveHeaderWaiters();

            // SW 持有网络源的唯一读取分支，逐块缓冲并多播给所有页面消费者。
            // （不再 tee 出一路给页面，避免刷新/关闭后分支背压/取消导致卡死 0%。）
            this.reader = resp.body.getReader();
            for (;;) {
                const r = await this.reader.read();
                if (r.done) break;
                this.lastByteAt = Date.now();
                this.chunks.push(r.value);
                this.received += r.value.byteLength;
                this._pumpReplays();
            }
            if (this.abandoned) return; // 被废弃：不再提交缓存
            this.done = true;
            this._pumpReplays();
            await this._commit();
        } catch (e) {
            this.failed = true;
            this.done = true;
            this._pumpReplays();
            this._rejectHeaderWaiters(e);
        } finally {
            // 只有自己仍在 inflight 才清理，避免误删看门狗换上的新下载。
            if (inflight.get(this.path) === this) inflight.delete(this.path);
        }
    }

    // 首次捕获到网络响应头，回应所有排队等头的 respond() 调用者。
    _resolveHeaderWaiters() {
        const arr = this.headerWaiters;
        this.headerWaiters = [];
        for (const w of arr) this._settleWaiter(w, this);
    }

    _rejectHeaderWaiters(e) {
        const arr = this.headerWaiters;
        this.headerWaiters = [];
        for (const w of arr) {
            try { w.reject(e); } catch (err) { /* 忽略 */ }
        }
    }

    // 把一个排队等头的 waiter 用某个下载实例构造出流式响应交付。
    _settleWaiter(w, target) {
        let resp = null;
        try { resp = target._buildOutgoing(); }
        catch (e) { try { w.reject(e); return; } catch (_) { return; } }
        try { w.resolve(resp); } catch (e) { /* 忽略 */ }
    }

    // 是否已确定卡死：等待响应头过久 / 读数据长时间无推进。
    isStalled() {
        if (this.done || this.abandoned) return false;
        const now = Date.now();
        if (!this.headers) return (now - this.createdAt) > HEADER_TIMEOUT_MS;
        return (now - this.lastByteAt) > STALL_TIMEOUT_MS;
    }

    // 废弃本项目：取消网络读取、标记失败；把仍在等头的请求迁到全新下载上，
    // 保证"点我重新加载 / 刷新"不会复用这个卡死的下载而一直 0%。
    //   有等头请求时，就地换上一个全新下载并把它注册到 inflight（避免外面再建
    //   一次导致重复下载 50MB），同时把这些 waiter 交给新下载续传。
    abandon() {
        if (this.abandoned || this.done) return;
        this.abandoned = true;
        this.failed = true;
        if (this.reader) { try { this.reader.cancel().catch(function () {}); } catch (e) { /* 忽略 */ } }
        // 若已有页面正排队等头，绝不能让他们悬挂：立即换新下载并接管 waiters。
        if (this.headerWaiters.length) {
            const replacement = new LiveDownload(this.url);
            inflight.set(this.path, replacement); // 接管在途位，避免外面新建重复下载
            this.adoptWaitersFrom(replacement);
        }
    }

    // 把调用者的等头 waiter 转交给 target（target 构造响应交付，绝不悬挂）。
    adoptWaitersFrom(target) {
        const waiters = this.headerWaiters;
        this.headerWaiters = [];
        for (const w of waiters) target._settleWaiter(w, target);
        target._pumpReplays();
    }

    // push 模型：把新到/已缓冲的字节喂给所有续传消费者。
    _pumpReplays() {
        if (this.abandoned) return;
        for (const c of Array.from(this.replayConsumers)) this._feedReplay(c);
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

    // 构造给页面的响应：首/刷新统一走"多播续传流"。
    //   回放已缓冲字节 + 实时字节（即使下载未完也立即返回并回放，避免被
    //   headerWaiters 永久阻塞而进度一直为 0）；失败时 reject 走重试/离线。
    respond() {
        const self = this;
        // 网络响应头还没到：先排队，等头就绪后回放。抓不到头（回源卡死）时由
        // 看门狗 abandon() 迁到新下载 / 终止，绝不让本调用永久悬挂（刷新卡 0% 根因）。
        if (!this.headers && !this.done && !this.abandoned) {
            return new Promise(function (resolve, reject) {
                self.headerWaiters.push({ resolve: resolve, reject: reject });
            });
        }
        try {
            return Promise.resolve(this._buildOutgoing());
        } catch (e) {
            return Promise.reject(e);
        }
    }

    // 统一出口：完成但失败且零字节时抛错；否则总是给"多播续传流"。
    _buildOutgoing() {
        if (this.done && this.failed && this.received === 0) {
            throw new Error("engine download failed");
        }
        return this._buildReplayResponse();
    }

    // 多播续传响应（所有页面消费者统一走这里）：回放已缓冲字节 + 实时字节。
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

// 启动（或在途则复用）一个下载；若在途的已失败/卡死，则替换为全新下载。
// 返回可用的 in-flight 实例，由调用方统一走 live.respond() 交给页面。
function ensureLive(url, event) {
    const path = url.pathname;
    let live = inflight.get(path);
    if (live && !live.failed && live.isStalled()) {
        // 卡死：abandon 可能已就地换新并注册到 inflight（有等头请求时），
        // 也可能只标记失败。两种都重新读一次当前在途位再决定。
        live.abandon();
        live = inflight.get(path);
        if (live === undefined || live.failed) live = null;
    }
    if (!live || live.failed) {
        live = new LiveDownload(url);
        inflight.set(path, live);
        if (event) { try { event.waitUntil(live.promise); } catch (e) { /* 忽略 */ } }
    }
    return live;
}

// ----------------------------------------------------------------------------
// 看门狗：周期性扫描在途下载，废弃"卡死"的实例（等头过久 / 读数据长时间无推进）。
//   一旦废弃，正在等头的请求会被迁到全新下载上继续，进度恢复正常，刷新不再 0%。
// ----------------------------------------------------------------------------
let watchdogTimer = null;
function ensureWatchdog() {
    if (watchdogTimer) return;
    watchdogTimer = setInterval(function () {
        for (const live of Array.from(inflight.values())) {
            if (live.done || live.abandoned) continue;
            if (live.isStalled()) live.abandon();
        }
    }, WATCHDOG_MS);
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
//   version.json 结构：{ engineVersion, updatedAt, files: { path: { sha256, size } } }
// ----------------------------------------------------------------------------
let manifestInflight = null;

// 取某文件的期望 sha256；旧版扁平结构或字段缺失时返回 undefined（回退缓存）。
function manifestSha(manifest, path) {
    try {
        const e = manifest && manifest.files && manifest.files[path];
        return (e && typeof e.sha256 === "string") ? e.sha256 : undefined;
    } catch (err) { return undefined; }
}

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
        // 带时间戳 query + cache:reload：确保拿到的永远是服务器最新清单，
        // 不受浏览器 HTTP 缓存 / GitHub Pages CDN 滞后影响。
        const fresh = await fetch(MANIFEST_PATH + "?v=" + Date.now(), { cache: "reload" });
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
