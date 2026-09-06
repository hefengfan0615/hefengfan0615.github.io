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
//  [4] 引擎大文件需要回源下载时：用【浏览器管理的网络 passthrough】直接把字节
//      流式给引擎 worker，进度实时可见；后台并行把整份写入缓存供下次秒开。
//      不再用 SW 内存自建 ReadableStream 流式转发整份 50MB —— 那种"SW 源头流"
//      在页面刷新/中断后可能被 Chromium 永久悬挂（reader.read() 永不返回也不报错，
//      进度一直 0%，只能清浏览数据恢复），是"刷新多次后卡 0"的根因。
//  [5] 所有响应统一注入 COOP/COEP，保证多线程 WASM（SharedArrayBuffer）可用。
// ============================================================================

"use strict";

const CACHE_NAME = "fengfan-xiangqi-files-v2";
const MANIFEST_PATH = "/version.json";
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

    // ---- pikafish.data：大文件，Cache First + 哈希校验 ----
    // 关键：不再用 SW 内存 ReadableStream 给引擎 worker 流式整份 .data。
    // （Chromium 对 SW 源头流式响应在页面刷新/异常中断后可能"永久悬挂"——
    //   worker 的 reader.read() 既不返回数据也不报错，进度一直 0%，只能清浏览数据恢复。
    //   这正是之前"刷新多次后卡 0、怎么刷新都好不了"的根因。）
    // 改为：缓存命中且哈希匹配 → 原子返回整份缓存（可靠、秒开、绝不悬挂）；
    //        缓存过期 / 缺失 → 用"浏览器管理的网络 passthrough"直接流式给 worker，
    //        进度实时可见，刷新即干净地重新开始，绝不复用悬挂流。
    if (url.pathname === DATA_PATH) {
        return getDataResponse(event, req, url, cache);
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

// ----------------------------------------------------------------------------
// 后台缓存：把一份网络响应整份写入 CacheStorage。
//   浏览器管理的网络响应 clone() 后两路互相独立：worker 读实时字节这一路，
//   写缓存这路并行完成。worker 中断/刷新不影响本路，也不会悬挂（区别于用手工
//   tee/自建 SW 内存流去"多播"，后者在刷新中断后会产生永久悬挂的流）。
// ----------------------------------------------------------------------------
async function backgroundCacheData(resp, cache, url) {
    try {
        const buf = await resp.arrayBuffer(); // 读取整份（实时网络下载）
        const headers = new Headers(resp.headers);
        headers.delete("Content-Encoding"); // body 已是解压后的原始字节
        headers.delete("Content-Length");
        headers.delete("Set-Cookie");
        await cache.put(url.href, new Response(buf, {
            status: resp.status || 200,
            statusText: resp.statusText || "OK",
            headers: headers
        }));
        // 大文件 data 额外记录 sha256 到 meta，供下次秒级校验命中缓存。
        if (url.pathname === DATA_PATH) {
            const sha = await sha256Hex(new Uint8Array(buf));
            await cache.put(DATA_META_KEY, new Response(sha, {
                headers: { "Content-Type": "text/plain" }
            })).catch(function () {});
        }
        notifyUpdate();
    } catch (e) { /* 后台缓存失败不影响本次返回 */ }
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

// ============================================================================
// .data 大文件统一下载入口：单实例下载锁。
//   关键解决：刷新会导致多份 51MB 并发下载抢占带宽（每刷新一份新下载、旧页面的
//   waitUntil 后台下载仍未结束），越刷越慢、最后贴近 0、只能开新页才恢复。
//   因此规定：同一时刻【只有一个】下载任务。缓存不满足时，谁先到谁当下载发起者
//   （网络直通流给 worker，实时进度）；期间其它请求在锁上等待，等后台把整份写入
//   缓存后用缓存出波特（不再各自新开下载）。锁在后台写缓存完成后自动释放。
// ============================================================================
let dataDownloadInFlight = null;

// 尝试从缓存提供 .data：命中且与最新清单哈希一致 → 返回 Response；否则返回 null。
async function tryServeDataFromCache(req, url, cache) {
    const cached = await cache.match(req);
    if (!cached) return null;
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
            if (stored === expected) return cached;          // 已最新：秒用
            await cache.delete(req).catch(function () {});   // 过期：删掉走回源
            return null;
        }
        return cached; // 拿不到清单：用缓存兜底
    } catch (e) {
        return cached; // 校验出错（如离线）：回退缓存
    }
}

// 浏览器管理的网络 passthrough：直接流式给 worker（实时进度），后台并行写整份缓存。
async function directPassthrough(event, req, url, cache) {
    try {
        const resp = await fetch(req, { cache: "reload" });
        if (!resp.ok || resp.type !== "basic") {
            const fb = await cache.match(req);
            if (fb) return fb;
            return resp;
        }
        event.waitUntil(backgroundCacheData(resp.clone(), cache, url).catch(function () {}));
        return resp; // 网络流直接给 worker，进度实时可见
    } catch (e) {
        const fb = await cache.match(req);
        if (fb) return fb;
        return new Response(null, { status: 504, statusText: "Network Unavailable" });
    }
}

async function getDataResponse(event, req, url, cache) {
    // 1) 缓存命中且最新 → 秒用，绝不重下
    const fromCache = await tryServeDataFromCache(req, url, cache);
    if (fromCache) return withIsolationHeaders(fromCache);

    // 2) 已有唯一下载任务在跑 → 等待其完成（含后台写缓存），从缓存拿，不开新下载
    if (dataDownloadInFlight) {
        const WAIT_MS = 2 * 60 * 1000;
        const finishing = dataDownloadInFlight
            .then(function () {}, function () {}); // 无论成败都放行
        await Promise.race([
            finishing,
            new Promise(function (r) { setTimeout(r, WAIT_MS); }) // 兜底超时，防悬挂
        ]);
        const doneCache = await cache.match(req);
        if (doneCache) return withIsolationHeaders(doneCache);
        // 下载未成功（超时 / 失败）：网络直通兜底（罕见）
        return withIsolationHeaders(await directPassthrough(event, req, url, cache));
    }

    // 3) 本请求充当唯一下载发起者：先占锁，后台写缓存完成后自动释放
    let resolveDownload;
    dataDownloadInFlight = new Promise(function (res) { resolveDownload = res; });
    dataDownloadInFlight.then(
        function () { dataDownloadInFlight = null; },
        function () { dataDownloadInFlight = null; }
    );

    try {
        const resp = await fetch(req, { cache: "reload" });
        if (!resp.ok || resp.type !== "basic") {
            resolveDownload(); // 失败：释放锁，允许下次重试
            const fb = await cache.match(req);
            if (fb) return withIsolationHeaders(fb);
            return withIsolationHeaders(resp);
        }
        // worker 走网络直通（实时进度）；后台写缓存，写完后 resolve 锁通知等待者。
        // backgroundCacheData 内部 try/catch 保证必然 settle，故锁必然释放。
        const bg = backgroundCacheData(resp.clone(), cache, url)
            .catch(function () {})
            .then(function () { resolveDownload(); });
        event.waitUntil(bg);
        return withIsolationHeaders(resp); // 发起者：直接网络流，进度实时可见
    } catch (e) {
        resolveDownload(); // 异常：释放锁
        const fb = await cache.match(req);
        if (fb) return withIsolationHeaders(fb);
        return new Response(null, { status: 504, statusText: "Network Unavailable" });
    }
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
