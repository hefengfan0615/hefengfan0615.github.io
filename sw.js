// ============================================================================
// Fengfan Xiangqi Service Worker  —  最终版
//
// 缓存策略：引擎 / 前端界面 分层缓存 + Cache First + stale-while-revalidate
//
//  [1] 前端界面资源：Cache First + SWR + 清单 sha256 校验（有网必取最新）。
//  [2] 引擎代码 pikafish.js / pikafish.wasm（小文件）：【网络优先】——
//      在线时每次回源拿最新字节，保证"刷新即用最新引擎"；离线回退缓存兜底。
//  [3] 引擎大文件 pikafish.data（~50MB）：Cache First + 清单哈希校验。
//      version.json 始终"缓存击穿"后比对，NNUE 没变就秒用缓存，变了才回源。
//  [4] 大文件下载：单实例下载会话 + 实时扇出，刷新/切后台都不丢进度，
//      绝不产生"SW 源头流"式的悬挂（进度一直 0 的元凶）。
//  [5] 统一注入 COOP/COEP，保证多线程 WASM（SharedArrayBuffer）可用。
//
//  ★ 本版修复清单：
//    A. NNUE 更新后刷新无效
//       → tryServeDataFromCache 判定磁盘缓存过期并删除时，必须同时清空
//         内存中与之绑定的 dataSession（否则 chunks 里的旧 NNUE 字节会被
//         getDataResponse 复用重放给引擎）。仅清"当前版本键"对应的会话。
//    B. pruneOldData 形同虚设
//       → 原实现用 pathname 前缀/全等判断，而 cache.keys() 返回完整 URL，
//         条件恒为 false，旧 .data 会无限堆积。改用 URL 解析后的 pathname。
//    C. pruneOldData 调用位置
//       → 原只在"缓存命中"分支调用，导致"发布后第一次打开直接下载新版本"
//         这条路径不清旧缓存，旧 51MB 会滞留到下一次命中才清。
//         改为在解析出版本键后、命中/下载分流之前统一调用一次（并保证
//         旧裸键迁移 adopt 已完成，避免误删刚 adopt 的数据）。
//    D. 缓存键污染（潜在隐患）
//       → 前端资源和 WASM/JS 的缓存键统一规范化为 "origin + pathname"，
//         避免将来给请求带 ?v= / utm_* / 时间戳时产生多个孤儿条目、命中失败。
//         （.data 的版本化键保留 query，这是"版本对齐"的设计本身要求。）
//    E. manifest 短时高频回源
//       → 增加 1 秒 TTL，减少同一次页面加载内多次资源请求各触发一次
//         version.json 回源；超过 1 秒仍会回源，保证"刷新即最新"。
//    F. CLEAR_CACHE 与内存会话竞争
//       → 清空缓存时同步清空 dataSession，避免正在进行的下载完成后把数据
//         重新写回缓存，让"清空"看起来不生效。
// ============================================================================

"use strict";

// ----------------------------------------------------------------------------
// 常量与辅助
// ----------------------------------------------------------------------------
const CACHE_NAME = "fengfan-xiangqi-files-v4"; // v4：一次性淘汰旧缓存 + 应用本版修复
const MANIFEST_PATH = "/version.json";
const DATA_PATH = "/wasm/pikafish.data";
const DATA_META_KEY = "/__meta/pikafish.data.sha256"; // 仅内部记录 sha256，非真实文件
// 版本化缓存键：把 .data 和 engineVersion 绑到一起，杜绝"新引擎 + 旧 NNUE"错配。
const DATA_PFX = DATA_PATH + "?v=";
const DATA_META_PFX = "/__meta/pikafish.data.";
function dataCacheKey(version) { return version ? DATA_PFX + encodeURIComponent(version) : DATA_PATH; }
function dataMetaKey(version)   { return version ? DATA_META_PFX + encodeURIComponent(version) + ".sha256" : DATA_META_KEY; }

// 前端界面外壳：安装时预缓存，保证离线首屏
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

// 缓存键规范化：前端资源 / WASM / JS 的缓存键一律使用 origin + pathname，
// 剔除 query 与 hash，避免将来带 ?v= / utm_* / 时间戳时产生多个孤儿条目。
// 注意：.data 的"版本化键"必须保留 query（那是版本对齐的设计本身），
//       所以本函数只用于"非版本化"的缓存键。
function normalizeCacheKey(url) {
    return new Request(url.origin + url.pathname);
}

// ----------------------------------------------------------------------------
// 状态
// ----------------------------------------------------------------------------
let manifestInflight = null;                                   // 并发合并用
let manifestCached = { value: null, at: 0 };                   // 短 TTL 缓存
const MANIFEST_TTL = 1000;                                     // 1 秒
let dataSession = null;                                        // 大文件唯一会话

// ----------------------------------------------------------------------------
// 安装：预缓存前端外壳并立即 skipWaiting。
// ----------------------------------------------------------------------------
self.addEventListener("install", function (event) {
    event.waitUntil(
        (async function () {
            const cache = await caches.open(CACHE_NAME);
            await Promise.allSettled(
                APP_SHELL.map(function (u) {
                    return cache.add(u).catch(function () { /* 单资源失败不阻塞接管 */ });
                })
            );
            await self.skipWaiting();
        })()
    );
});

// ----------------------------------------------------------------------------
// 激活：清理旧缓存并立即接管页面。
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
// 通知页面：缓存内容有更新。
// ----------------------------------------------------------------------------
function notifyUpdate() {
    self.clients.matchAll({ type: "window" }).then(function (list) {
        list.forEach(function (c) { c.postMessage({ type: "CACHE_UPDATED" }); });
    });
}

// ----------------------------------------------------------------------------
// 抓取：仅拦截同源 GET。
// ----------------------------------------------------------------------------
self.addEventListener("fetch", function (event) {
    const req = event.request;
    if (req.method !== "GET") return;
    const url = new URL(req.url);
    if (url.origin !== self.location.origin) return;
    event.respondWith(serve(event, req, url));
});

// ----------------------------------------------------------------------------
// 分流
// ----------------------------------------------------------------------------
async function serve(event, req, url) {
    const cache = await caches.open(CACHE_NAME);

    // version.json 自身：必须拿到最新清单。
    if (url.pathname === MANIFEST_PATH) return networkFirst(req, url, cache);

    // 导航请求：网络优先，尽早注入 COOP/COEP（无痕模式卡 0% 的修复）。
    if (req.mode === "navigate") return networkFirst(req, url, cache);

    // 引擎文件。
    if (isEngineFile(url.pathname)) return cacheFirstEngine(event, req, url, cache);

    // 前端界面资源。
    return serveAppAsset(req, url, cache);
}

// ----------------------------------------------------------------------------
// 前端界面资源：网络优先 + 清单 sha256 校验（有网必取最新，离线回退原缓存）。
// ----------------------------------------------------------------------------
async function serveAppAsset(req, url, cache) {
    const cacheKey = normalizeCacheKey(url);      // ★ D：规范化缓存键
    const cached = await cache.match(cacheKey);

    let expected;
    try {
        const manifest = await getManifest(cache);
        expected = manifest ? manifestSha(manifest, url.pathname) : undefined;
    } catch (e) { expected = undefined; }

    if (expected) {
        if (cached) {
            const hash = await sha256Hex(await readAllBytes(cached.clone().body));
            if (hash === expected) return withIsolationHeaders(cached); // 已最新，秒用
        }
        // 缓存缺失或过期：同步回源拿最新，本次加载即生效。
        try {
            const fresh = await fetch(req, { cache: "reload" });
            if (fresh && fresh.ok && fresh.type === "basic") {
                await cache.put(cacheKey, fresh.clone()).catch(function () {});
                if (cached) notifyUpdate();
                return withIsolationHeaders(fresh);
            }
        } catch (e) { /* 离线：下面用缓存兜底 */ }
    }

    if (cached) return withIsolationHeaders(cached);

    // 无缓存：再尽力直接回源一次。
    try {
        const fresh = await fetch(req, { cache: "reload" });
        if (fresh && fresh.ok && fresh.type === "basic") {
            await cache.put(cacheKey, fresh.clone()).catch(function () {});
            return withIsolationHeaders(fresh);
        }
        return withIsolationHeaders(fresh);
    } catch (e) {
        return new Response(null, { status: 504, statusText: "Network Unavailable" });
    }
}

// ----------------------------------------------------------------------------
// 引擎文件：
//   .js / .wasm（小文件）→ 网络优先；离线回退缓存。
//   .data（~50MB）       → Cache First + 清单 sha256 校验；命中即秒用，
//                          过期才走单会话流式下载。
// ----------------------------------------------------------------------------
async function cacheFirstEngine(event, req, url, cache) {

    // ---- .data：大文件 ----
    if (url.pathname === DATA_PATH) {
        return getDataResponse(event, req, url, cache);
    }

    // ---- .js / .wasm：小文件，网络优先 ----
    const cacheKey = normalizeCacheKey(url);      // ★ D：规范化缓存键
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
                    await cache.put(cacheKey, new Response(buf, {
                        status: fresh.status,
                        statusText: fresh.statusText,
                        headers: headers
                    }));
                } catch (e) { /* 缓存失败不影响本次返回 */ }
            })();
            return withIsolationHeaders(fresh); // 本次就用网络最新字节
        }
        const cached = await cache.match(cacheKey);
        if (cached) return withIsolationHeaders(cached);
        return withIsolationHeaders(fresh);
    } catch (e) {
        const cached = await cache.match(cacheKey);
        if (cached) return withIsolationHeaders(cached);
        return new Response(null, { status: 504, statusText: "Network Unavailable" });
    }
}

// ----------------------------------------------------------------------------
// 后台缓存：把一份网络响应整份写入 CacheStorage（浏览器管理的 clone 双路，
// 与"SW 内存流多播"不同，刷新中断后不会悬挂）。
// ----------------------------------------------------------------------------
async function backgroundCacheData(resp, storeHref, fetchPath, metaKey, cache) {
    try {
        const buf = await resp.arrayBuffer();
        const headers = new Headers(resp.headers);
        headers.delete("Content-Encoding");
        headers.delete("Content-Length");
        headers.delete("Set-Cookie");
        await cache.put(storeHref, new Response(buf, {
            status: resp.status || 200,
            statusText: resp.statusText || "OK",
            headers: headers
        }));
        if (fetchPath === DATA_PATH) {
            const sha = await sha256Hex(new Uint8Array(buf));
            await cache.put(metaKey, new Response(sha, {
                headers: { "Content-Type": "text/plain" }
            })).catch(function () {});
        }
        notifyUpdate();
    } catch (e) { /* 后台缓存失败不影响本次返回 */ }
}

// ----------------------------------------------------------------------------
// 网络优先（version.json 与导航文档）：成功写缓存返回，失败回退缓存。
// ----------------------------------------------------------------------------
async function networkFirst(req, url, cache) {
    const cacheKey = normalizeCacheKey(url);      // ★ D：导航也规范化（去掉 query）
    try {
        const fresh = await fetch(req, { cache: "reload" });
        if (fresh && fresh.ok && fresh.type === "basic") {
            await cache.put(cacheKey, fresh.clone()).catch(function () {});
            return withIsolationHeaders(fresh);
        }
        const cached = await cache.match(cacheKey);
        if (cached) return withIsolationHeaders(cached);
        return withIsolationHeaders(fresh);
    } catch (e) {
        const cached = await cache.match(cacheKey);
        if (cached) return withIsolationHeaders(cached);
        return new Response(null, { status: 504, statusText: "Network Unavailable" });
    }
}

// ----------------------------------------------------------------------------
// 清单（version.json）：短 TTL + 并发合并；失败退回缓存清单。
//   version.json 结构：{ engineVersion, updatedAt, files: { path: { sha256, size } } }
// ----------------------------------------------------------------------------
function manifestSha(manifest, path) {
    try {
        const e = manifest && manifest.files && manifest.files[path];
        return (e && typeof e.sha256 === "string") ? e.sha256 : undefined;
    } catch (err) { return undefined; }
}

function getManifest(cache) {
    // ★ E：TTL 内直接返回，避免同一次页面加载内多次资源请求各触发一次回源。
    const now = Date.now();
    if (manifestCached.value && now - manifestCached.at < MANIFEST_TTL) {
        return Promise.resolve(manifestCached.value);
    }
    if (manifestInflight) return manifestInflight;
    manifestInflight = loadManifest(cache).then(
        function (v) {
            manifestInflight = null;
            if (v) manifestCached = { value: v, at: Date.now() };
            return v;
        },
        function () {
            manifestInflight = null;
            return null;
        }
    );
    return manifestInflight;
}

async function loadManifest(cache) {
    try {
        // 带时间戳 query + cache:reload：确保拿到服务器最新清单，
        // 不受 HTTP 缓存 / CDN 滞后影响。
        const fresh = await fetch(MANIFEST_PATH + "?v=" + Date.now(), { cache: "reload" });
        if (fresh && fresh.ok && fresh.type === "basic") {
            const data = await fresh.json().catch(function () { return null; });
            if (data) {
                // 缓存键固定为 /version.json（不带 query），后续 match 也用同一键。
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

async function readStoredSha(cache, metaKey) {
    try {
        const r = await cache.match(metaKey);
        if (r) return (await r.text()).trim();
    } catch (e) { /* 忽略 */ }
    return null;
}

// ============================================================================
// .data 大文件：单实例下载会话 + 实时扇出
//
//   ① 同一时刻只有一个下载会话，绝不并发多份 51MB。
//   ② 会话把已下载字节缓存在 chunks 中，所有订阅者【从头】读，
//      刷新 / 切后台返回时复用同一会话，进度延续、不重下。
//   ③ event.waitUntil(session.done) 兜住会话生命周期，SW 不会提前终止。
// ============================================================================

// ----------------------------------------------------------------------------
// ★ A（核心修复）：过期时同时清磁盘 + 内存
// ----------------------------------------------------------------------------
async function tryServeDataFromCache(storeHref, metaKey, fetchPath, cache) {
    const cached = await cache.match(storeHref);
    if (!cached) return null;
    try {
        const manifest = await getManifest(cache);
        const expected = manifest ? manifestSha(manifest, fetchPath) : undefined;
        if (expected) {
            let stored = await readStoredSha(cache, metaKey);
            if (stored === null) {
                // 旧版本缓存没有 meta：一次性全量哈希补写，避免盲目重下 51MB
                stored = await sha256Hex(await readAllBytes(cached.clone().body));
                if (stored) {
                    await cache.put(metaKey, new Response(stored, {
                        headers: { "Content-Type": "text/plain" }
                    })).catch(function () {});
                }
            }
            if (stored === expected) return cached;                 // 已最新：秒用

            // ---------- 缓存过期：删磁盘 + 清内存 ----------
            await cache.delete(storeHref).catch(function () {});

            // ★ 关键：清掉同版本键上驻留的内存下载会话，否则
            //   getDataResponse 里 `dataSession.storeHref === storeHref`
            //   会把旧 NNUE 字节从头重放给引擎。
            if (dataSession && dataSession.storeHref === storeHref) {
                dataSession = null;
            }
            return null;
        }
        return cached; // 拿不到清单：用缓存兜底
    } catch (e) {
        return cached; // 校验出错（如离线）：回退缓存
    }
}

// 把"已验证匹配"的旧裸键缓存沿用到当前版本键（避免重下 51MB）。
async function adoptCachedData(legacy, storeHref, metaKey, cache) {
    try {
        const buf = await legacy.clone().arrayBuffer();
        await cache.put(storeHref, legacy.clone()).catch(function () {});
        const sha = await sha256Hex(new Uint8Array(buf));
        await cache.put(metaKey, new Response(sha, {
            headers: { "Content-Type": "text/plain" }
        })).catch(function () {});
        return legacy;
    } catch (e) {
        return null;
    }
}

// ----------------------------------------------------------------------------
// ★ B（修复）：pruneOldData 用 pathname 判断，不再恒假；
//   并用绝对 URL 比较当前键，避免误删正在使用的条目。
// ----------------------------------------------------------------------------
async function pruneOldData(storeHref, metaKey, cache) {
    try {
        const origin = self.location.origin;
        const currentStore = new URL(storeHref, origin).href;
        const currentMeta  = new URL(metaKey,   origin).href;

        const keys = await cache.keys();
        await Promise.all(keys.map(async function (r) {
            const href = r.url;
            let pathname;
            try { pathname = new URL(href).pathname; } catch (e) { return; }

            let isDataEntry = false;
            if (pathname === DATA_PATH) isDataEntry = true;                     // /wasm/pikafish.data（?v= 时 pathname 仍是它）
            else if (pathname === DATA_META_KEY) isDataEntry = true;            // /__meta/pikafish.data.sha256
            else if (pathname.indexOf(DATA_META_PFX) === 0) isDataEntry = true; // /__meta/pikafish.data.<ver>.sha256

            if (isDataEntry && href !== currentStore && href !== currentMeta) {
                await cache.delete(href).catch(function () {});
            }
        }));
    } catch (e) { /* 清理失败不影响主流程 */ }
}

// ----------------------------------------------------------------------------
// 网络直通兜底（下载会话失败 / 极端竞态）：直接流式给 worker，后台并行写缓存。
// ----------------------------------------------------------------------------
async function directPassthrough(event, req, fetchPath, storeHref, metaKey, cache) {
    try {
        const resp = await fetch(fetchPath, { cache: "reload" });
        if (!resp.ok || resp.type !== "basic") {
            const fb = await cache.match(storeHref);
            if (fb) return fb;
            return resp;
        }
        event.waitUntil(backgroundCacheData(resp.clone(), storeHref, fetchPath, metaKey, cache).catch(function () {}));
        return resp;
    } catch (e) {
        const fb = await cache.match(storeHref);
        if (fb) return fb;
        return new Response(null, { status: 504, statusText: "Network Unavailable" });
    }
}

// ----------------------------------------------------------------------------
// 下载会话：SW 亲自读网络流，把 chunk 推入共享缓冲；所有订阅者从头读，
// 保证刷新/切后台返回时都能拿到【从 0 到结尾的完整文件】。
// ----------------------------------------------------------------------------
function startDataSession(fetchPath, storeHref, metaKey, cache) {
    const session = {
        ready: null, resolveReady: null,
        done: null, resolveDone: null,
        ok: false,
        loopDone: false,
        completed: false,
        expectedSize: 0,
        chunks: [],
        signal: null, resolveSignal: null,
        storeHref: storeHref,
        metaKey: metaKey
    };
    session.ready = new Promise(function (r) { session.resolveReady = r; });
    session.done  = new Promise(function (r) { session.resolveDone = r; });
    armSignal(session);

    (async function () {
        let total = 0;
        try {
            const resp = await fetch(fetchPath, { cache: "reload" });
            if (!(resp && resp.ok && resp.type === "basic")) {
                session.resolveReady(); // ok=false，走兜底
                return;
            }
            session.ok = true;
            // 用清单里的 size 作为 Content-Length 基线（进度百分比正确）
            try {
                const m = await getManifest(cache);
                const e = m && m.files && m.files[fetchPath];
                session.expectedSize = (e && e.size) || 0;
            } catch (err) {}
            session.resolveReady();

            const reader = resp.body.getReader();
            let reachedEOF = false;
            for (;;) {
                const r = await reader.read();
                if (r.done) { reachedEOF = true; break; }
                session.chunks.push(r.value);
                total += r.value.byteLength;
                kickSignal(session); // 唤醒所有订阅者去读新一批数据
            }
            // 仅当完整读到流末尾、且字节数不短于清单期望才算完成；
            // 否则视为失败，绝不把截断文件交给引擎（防 NNUE 越界）。
            if (reachedEOF && (session.expectedSize === 0 || total >= session.expectedSize)) {
                session.completed = true;
                await writeDataCache(storeHref, session.chunks, total, metaKey, cache);
            }
        } catch (e) {
            // 网络中断等异常：交由 finally 收尾，订阅流读到已有数据后关闭
        } finally {
            if (!session.completed && dataSession === session) dataSession = null; // 失败：下次重开新会话
            session.loopDone = true;
            kickSignal(session);
            session.resolveDone();
        }
    })();

    return session;
}

// 挂新"信号"供订阅者等待；kickSignal 会 resolve 旧信号并换新。
function armSignal(session) {
    session.signal = new Promise(function (r) { session.resolveSignal = r; });
}
function kickSignal(session) {
    const rs = session.resolveSignal;
    armSignal(session);
    if (rs) rs();
}

// 把内存中已下载的整份 .data 原子写入 CacheStorage。
async function writeDataCache(storeHref, chunks, total, metaKey, cache) {
    let i = 0;
    const body = new ReadableStream({
        pull: function (c) {
            if (i < chunks.length) { c.enqueue(chunks[i++]); }
            else { c.close(); }
        }
    });
    const resp = new Response(body, {
        status: 200,
        statusText: "OK",
        headers: { "Content-Type": "application/octet-stream", "Content-Length": String(total) }
    });
    await cache.put(storeHref, resp).catch(function () {});
    // meta 仅用于下次秒级校验命中缓存
    try {
        const full = new Uint8Array(total);
        let off = 0;
        for (const c of chunks) { full.set(c, off); off += c.byteLength; }
        const sha = await sha256Hex(full);
        await cache.put(metaKey, new Response(sha, {
            headers: { "Content-Type": "text/plain" }
        })).catch(function () {});
    } catch (e) { /* 忽略，下次命中不了就重下 */ }
    notifyUpdate();
}

// 订阅实时流：输出流在 pull 时从 session.chunks【从头】读取。
// 数据随下载增长 → 每次 signal 唤醒后继续多发；下载结束(loopDone) → 发完剩余后关闭。
// 因此无论何时刷新加入，都能拿到【从 0 到结尾的完整文件】。
function makeSubscriberStream(session) {
    const entry = { idx: 0 };
    return new ReadableStream({
        pull: function (controller) {
            return (async function () {
                while (entry.idx < session.chunks.length) {
                    controller.enqueue(session.chunks[entry.idx++]);
                }
                if (session.loopDone) {
                    if (session.completed) { controller.close(); return; }
                    // 下载未完成：主动报错，不把截断文件当成功发给引擎
                    controller.error(new Error("engine data download incomplete")); return;
                }
                await session.signal; // 等下一批数据或结束，再回检
            })();
        },
        cancel: function () { /* 数据在共享缓冲，无需清理 */ }
    });
}

// ----------------------------------------------------------------------------
// .data 请求处理
// ----------------------------------------------------------------------------
async function getDataResponse(event, req, url, cache) {
    // 解析当前引擎版本，构造与该版本绑定的缓存键。
    // 离线时 getManifest 会回退到缓存清单，engineVersion 依然可得。
    let version = null;
    try {
        const manifest = await getManifest(cache);
        if (manifest && typeof manifest.engineVersion === "string") version = manifest.engineVersion;
    } catch (e) { /* 拿不到版本则以未版本化键兜底 */ }

    const storeHref = dataCacheKey(version);   // 当前版本缓存键（保留 ?v=）
    const metaKey   = dataMetaKey(version);    // 当前版本 meta 键
    const fetchPath = url.pathname;            // 下载始终走真实路径

    // 1) 命中当前版本缓存且哈希一致 → 秒用。
    //    注意：tryServeDataFromCache 在"缓存过期并删除"时会同步清空
    //    与之绑定的 dataSession（见该函数注释），保证下面第 2 步能开新会话。
    let fromCache = await tryServeDataFromCache(storeHref, metaKey, fetchPath, cache);

    // 1.5) 旧版未版本化缓存：若其哈希仍与当前清单一致，直接沿用（不重下）。
    if (!fromCache) {
        const legacy = await tryServeDataFromCache(DATA_PATH, DATA_META_KEY, fetchPath, cache);
        if (legacy) fromCache = await adoptCachedData(legacy, storeHref, metaKey, cache);
    }

    // ★ C（修复）：无论本次命中还是走下载，都统一清一次旧版本残留。
    //   - 命中分支：清上一版本的 ?v=old 与旧裸键（adopt 已完成，不会误删）；
    //   - 下载分支：清上一版本残留，避免"发布后第一次打开"这条路径不清缓存，
    //     导致旧的 51MB 滞留到下一次命中才清。
    await pruneOldData(storeHref, metaKey, cache).catch(function () {});

    if (fromCache) {
        return withIsolationHeaders(fromCache);
    }

    // 2) 需要下载：原子共享唯一会话；用 event.waitUntil 钉住生命周期。
    //    ⚠️ 会话必须与当前引擎版本绑定：dataSession 是 SW 全局单例，
    //       若它属于别的版本键，直接复用会把旧版本 NNUE 字节喂给新引擎。
    //       结合 tryServeDataFromCache 的"过期清内存"修复：即使 engineVersion
    //       未变、只有 NNUE 变了，dataSession 也会被清空 → 这里必然开新会话。
    if (!dataSession || dataSession.storeHref !== storeHref) {
        dataSession = startDataSession(fetchPath, storeHref, metaKey, cache);
    }
    const session = dataSession;
    event.waitUntil(session.done);

    // 3) 等网络结果确定：成功可订阅；失败走缓存 / 网络直通兜底。
    await session.ready;
    if (!session.ok) {
        const fb = await cache.match(storeHref);
        if (fb) return withIsolationHeaders(fb);
        return withIsolationHeaders(await directPassthrough(event, req, fetchPath, storeHref, metaKey, cache));
    }

    // 4) 订阅实时流。
    const headers = { "Content-Type": "application/octet-stream" };
    if (session.expectedSize > 0) headers["Content-Length"] = String(session.expectedSize);
    return withIsolationHeaders(new Response(makeSubscriberStream(session), {
        status: 200,
        statusText: "OK",
        headers: headers
    }));
}

// ----------------------------------------------------------------------------
// 工具函数
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

// 注入跨源隔离头，保证 COOP/COEP 生效，多线程引擎可正常运行。
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
        // ★ F：清缓存的同时清掉内存下载会话，避免正在进行的下载完成后
        //      把数据重新写回缓存，让"清空"看起来不生效。
        dataSession = null;
        manifestInflight = null;
        manifestCached = { value: null, at: 0 };
        event.waitUntil(
            caches.delete(CACHE_NAME)
                .then(function () { return self.clients.matchAll(); })
                .then(function (list) {
                    list.forEach(function (c) { c.postMessage({ type: "CACHE_CLEARED" }); });
                })
        );
    }
});
