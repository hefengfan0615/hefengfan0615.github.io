const mh = function() {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload"))
        return;
    for (const i of document.querySelectorAll('link[rel="modulepreload"]'))
        r(i);
    new MutationObserver(i=>{
        for (const o of i)
            if (o.type === "childList")
                for (const a of o.addedNodes)
                    a.tagName === "LINK" && a.rel === "modulepreload" && r(a)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function n(i) {
        const o = {};
        return i.integrity && (o.integrity = i.integrity),
        i.referrerpolicy && (o.referrerPolicy = i.referrerpolicy),
        i.crossorigin === "use-credentials" ? o.credentials = "include" : i.crossorigin === "anonymous" ? o.credentials = "omit" : o.credentials = "same-origin",
        o
    }
    function r(i) {
        if (i.ep)
            return;
        i.ep = !0;
        const o = n(i);
        fetch(i.href, o)
    }
};
mh();
function cs(e, t) {
    const n = Object.create(null)
      , r = e.split(",");
    for (let i = 0; i < r.length; i++)
        n[r[i]] = !0;
    return t ? i=>!!n[i.toLowerCase()] : i=>!!n[i]
}
const hh = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly"
  , gh = cs(hh);
function Mu(e) {
    return !!e || e === ""
}
function us(e) {
    if (be(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) {
            const r = e[n]
              , i = et(r) ? bh(r) : us(r);
            if (i)
                for (const o in i)
                    t[o] = i[o]
        }
        return t
    } else {
        if (et(e))
            return e;
        if (Ye(e))
            return e
    }
}
const ph = /;(?![^(]*\))/g
  , vh = /:(.+)/;
function bh(e) {
    const t = {};
    return e.split(ph).forEach(n=>{
        if (n) {
            const r = n.split(vh);
            r.length > 1 && (t[r[0].trim()] = r[1].trim())
        }
    }
    ),
    t
}
function fs(e) {
    let t = "";
    if (et(e))
        t = e;
    else if (be(e))
        for (let n = 0; n < e.length; n++) {
            const r = fs(e[n]);
            r && (t += r + " ")
        }
    else if (Ye(e))
        for (const n in e)
            e[n] && (t += n + " ");
    return t.trim()
}
const fC = e=>et(e) ? e : e == null ? "" : be(e) || Ye(e) && (e.toString === Uu || !we(e.toString)) ? JSON.stringify(e, Fu, 2) : String(e)
  , Fu = (e,t)=>t && t.__v_isRef ? Fu(e, t.value) : gr(t) ? {
    [`Map(${t.size})`]: [...t.entries()].reduce((n,[r,i])=>(n[`${r} =>`] = i,
    n), {})
} : $u(t) ? {
    [`Set(${t.size})`]: [...t.values()]
} : Ye(t) && !be(t) && !Vu(t) ? String(t) : t
  , $e = {}
  , hr = []
  , Dt = ()=>{}
  , yh = ()=>!1
  , _h = /^on[^a-z]/
  , Ei = e=>_h.test(e)
  , ds = e=>e.startsWith("onUpdate:")
  , nt = Object.assign
  , ms = (e,t)=>{
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1)
}
  , Eh = Object.prototype.hasOwnProperty
  , Pe = (e,t)=>Eh.call(e, t)
  , be = Array.isArray
  , gr = e=>wi(e) === "[object Map]"
  , $u = e=>wi(e) === "[object Set]"
  , we = e=>typeof e == "function"
  , et = e=>typeof e == "string"
  , hs = e=>typeof e == "symbol"
  , Ye = e=>e !== null && typeof e == "object"
  , Bu = e=>Ye(e) && we(e.then) && we(e.catch)
  , Uu = Object.prototype.toString
  , wi = e=>Uu.call(e)
  , wh = e=>wi(e).slice(8, -1)
  , Vu = e=>wi(e) === "[object Object]"
  , gs = e=>et(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e
  , Go = cs(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted")
  , Si = e=>{
    const t = Object.create(null);
    return n=>t[n] || (t[n] = e(n))
}
  , Sh = /-(\w)/g
  , Yt = Si(e=>e.replace(Sh, (t,n)=>n ? n.toUpperCase() : ""))
  , Th = /\B([A-Z])/g
  , Jn = Si(e=>e.replace(Th, "-$1").toLowerCase())
  , Ti = Si(e=>e.charAt(0).toUpperCase() + e.slice(1))
  , Ji = Si(e=>e ? `on${Ti(e)}` : "")
  , io = (e,t)=>!Object.is(e, t)
  , Xo = (e,t)=>{
    for (let n = 0; n < e.length; n++)
        e[n](t)
}
  , ai = (e,t,n)=>{
    Object.defineProperty(e, t, {
        configurable: !0,
        enumerable: !1,
        value: n
    })
}
  , si = e=>{
    const t = parseFloat(e);
    return isNaN(t) ? e : t
}
;
let ll;
const Ch = ()=>ll || (ll = typeof globalThis != "undefined" ? globalThis : typeof self != "undefined" ? self : typeof window != "undefined" ? window : typeof global != "undefined" ? global : {});
let jt;
class Hu {
    constructor(t=!1) {
        this.active = !0,
        this.effects = [],
        this.cleanups = [],
        !t && jt && (this.parent = jt,
        this.index = (jt.scopes || (jt.scopes = [])).push(this) - 1)
    }
    run(t) {
        if (this.active) {
            const n = jt;
            try {
                return jt = this,
                t()
            } finally {
                jt = n
            }
        }
    }
    on() {
        jt = this
    }
    off() {
        jt = this.parent
    }
    stop(t) {
        if (this.active) {
            let n, r;
            for (n = 0,
            r = this.effects.length; n < r; n++)
                this.effects[n].stop();
            for (n = 0,
            r = this.cleanups.length; n < r; n++)
                this.cleanups[n]();
            if (this.scopes)
                for (n = 0,
                r = this.scopes.length; n < r; n++)
                    this.scopes[n].stop(!0);
            if (this.parent && !t) {
                const i = this.parent.scopes.pop();
                i && i !== this && (this.parent.scopes[this.index] = i,
                i.index = this.index)
            }
            this.active = !1
        }
    }
}
function Oh(e) {
    return new Hu(e)
}
function kh(e, t=jt) {
    t && t.active && t.effects.push(e)
}
const ps = e=>{
    const t = new Set(e);
    return t.w = 0,
    t.n = 0,
    t
}
  , Wu = e=>(e.w & Rn) > 0
  , ju = e=>(e.n & Rn) > 0
  , Ih = ({deps: e})=>{
    if (e.length)
        for (let t = 0; t < e.length; t++)
            e[t].w |= Rn
}
  , Ph = e=>{
    const {deps: t} = e;
    if (t.length) {
        let n = 0;
        for (let r = 0; r < t.length; r++) {
            const i = t[r];
            Wu(i) && !ju(i) ? i.delete(e) : t[n++] = i,
            i.w &= ~Rn,
            i.n &= ~Rn
        }
        t.length = n
    }
}
  , Ea = new WeakMap;
let Yr = 0
  , Rn = 1;
const wa = 30;
let Nt;
const zn = Symbol("")
  , Sa = Symbol("");
class vs {
    constructor(t, n=null, r) {
        this.fn = t,
        this.scheduler = n,
        this.active = !0,
        this.deps = [],
        this.parent = void 0,
        kh(this, r)
    }
    run() {
        if (!this.active)
            return this.fn();
        let t = Nt
          , n = kn;
        for (; t; ) {
            if (t === this)
                return;
            t = t.parent
        }
        try {
            return this.parent = Nt,
            Nt = this,
            kn = !0,
            Rn = 1 << ++Yr,
            Yr <= wa ? Ih(this) : cl(this),
            this.fn()
        } finally {
            Yr <= wa && Ph(this),
            Rn = 1 << --Yr,
            Nt = this.parent,
            kn = n,
            this.parent = void 0,
            this.deferStop && this.stop()
        }
    }
    stop() {
        Nt === this ? this.deferStop = !0 : this.active && (cl(this),
        this.onStop && this.onStop(),
        this.active = !1)
    }
}
function cl(e) {
    const {deps: t} = e;
    if (t.length) {
        for (let n = 0; n < t.length; n++)
            t[n].delete(e);
        t.length = 0
    }
}
let kn = !0;
const zu = [];
function kr() {
    zu.push(kn),
    kn = !1
}
function Ir() {
    const e = zu.pop();
    kn = e === void 0 ? !0 : e
}
function wt(e, t, n) {
    if (kn && Nt) {
        let r = Ea.get(e);
        r || Ea.set(e, r = new Map);
        let i = r.get(n);
        i || r.set(n, i = ps()),
        Ku(i)
    }
}
function Ku(e, t) {
    let n = !1;
    Yr <= wa ? ju(e) || (e.n |= Rn,
    n = !Wu(e)) : n = !e.has(Nt),
    n && (e.add(Nt),
    Nt.deps.push(e))
}
function sn(e, t, n, r, i, o) {
    const a = Ea.get(e);
    if (!a)
        return;
    let s = [];
    if (t === "clear")
        s = [...a.values()];
    else if (n === "length" && be(e))
        a.forEach((l,u)=>{
            (u === "length" || u >= r) && s.push(l)
        }
        );
    else
        switch (n !== void 0 && s.push(a.get(n)),
        t) {
        case "add":
            be(e) ? gs(n) && s.push(a.get("length")) : (s.push(a.get(zn)),
            gr(e) && s.push(a.get(Sa)));
            break;
        case "delete":
            be(e) || (s.push(a.get(zn)),
            gr(e) && s.push(a.get(Sa)));
            break;
        case "set":
            gr(e) && s.push(a.get(zn));
            break
        }
    if (s.length === 1)
        s[0] && Ta(s[0]);
    else {
        const l = [];
        for (const u of s)
            u && l.push(...u);
        Ta(ps(l))
    }
}
function Ta(e, t) {
    const n = be(e) ? e : [...e];
    for (const r of n)
        r.computed && ul(r);
    for (const r of n)
        r.computed || ul(r)
}
function ul(e, t) {
    (e !== Nt || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run())
}
const Rh = cs("__proto__,__v_isRef,__isVue")
  , Yu = new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e !== "arguments" && e !== "caller").map(e=>Symbol[e]).filter(hs))
  , Lh = bs()
  , Ah = bs(!1, !0)
  , Nh = bs(!0)
  , fl = xh();
function xh() {
    const e = {};
    return ["includes", "indexOf", "lastIndexOf"].forEach(t=>{
        e[t] = function(...n) {
            const r = Le(this);
            for (let o = 0, a = this.length; o < a; o++)
                wt(r, "get", o + "");
            const i = r[t](...n);
            return i === -1 || i === !1 ? r[t](...n.map(Le)) : i
        }
    }
    ),
    ["push", "pop", "shift", "unshift", "splice"].forEach(t=>{
        e[t] = function(...n) {
            kr();
            const r = Le(this)[t].apply(this, n);
            return Ir(),
            r
        }
    }
    ),
    e
}
function bs(e=!1, t=!1) {
    return function(r, i, o) {
        if (i === "__v_isReactive")
            return !e;
        if (i === "__v_isReadonly")
            return e;
        if (i === "__v_isShallow")
            return t;
        if (i === "__v_raw" && o === (e ? t ? Xh : Zu : t ? Ju : Xu).get(r))
            return r;
        const a = be(r);
        if (!e && a && Pe(fl, i))
            return Reflect.get(fl, i, o);
        const s = Reflect.get(r, i, o);
        return (hs(i) ? Yu.has(i) : Rh(i)) || (e || wt(r, "get", i),
        t) ? s : Ze(s) ? a && gs(i) ? s : s.value : Ye(s) ? e ? Qu(s) : rt(s) : s
    }
}
const Dh = qu()
  , Mh = qu(!0);
function qu(e=!1) {
    return function(n, r, i, o) {
        let a = n[r];
        if (ao(a) && Ze(a) && !Ze(i))
            return !1;
        if (!e && !ao(i) && (Ca(i) || (i = Le(i),
        a = Le(a)),
        !be(n) && Ze(a) && !Ze(i)))
            return a.value = i,
            !0;
        const s = be(n) && gs(r) ? Number(r) < n.length : Pe(n, r)
          , l = Reflect.set(n, r, i, o);
        return n === Le(o) && (s ? io(i, a) && sn(n, "set", r, i) : sn(n, "add", r, i)),
        l
    }
}
function Fh(e, t) {
    const n = Pe(e, t);
    e[t];
    const r = Reflect.deleteProperty(e, t);
    return r && n && sn(e, "delete", t, void 0),
    r
}
function $h(e, t) {
    const n = Reflect.has(e, t);
    return (!hs(t) || !Yu.has(t)) && wt(e, "has", t),
    n
}
function Bh(e) {
    return wt(e, "iterate", be(e) ? "length" : zn),
    Reflect.ownKeys(e)
}
const Gu = {
    get: Lh,
    set: Dh,
    deleteProperty: Fh,
    has: $h,
    ownKeys: Bh
}
  , Uh = {
    get: Nh,
    set(e, t) {
        return !0
    },
    deleteProperty(e, t) {
        return !0
    }
}
  , Vh = nt({}, Gu, {
    get: Ah,
    set: Mh
})
  , ys = e=>e
  , Ci = e=>Reflect.getPrototypeOf(e);
function Ro(e, t, n=!1, r=!1) {
    e = e.__v_raw;
    const i = Le(e)
      , o = Le(t);
    n || (t !== o && wt(i, "get", t),
    wt(i, "get", o));
    const {has: a} = Ci(i)
      , s = r ? ys : n ? ws : so;
    if (a.call(i, t))
        return s(e.get(t));
    if (a.call(i, o))
        return s(e.get(o));
    e !== i && e.get(t)
}
function Lo(e, t=!1) {
    const n = this.__v_raw
      , r = Le(n)
      , i = Le(e);
    return t || (e !== i && wt(r, "has", e),
    wt(r, "has", i)),
    e === i ? n.has(e) : n.has(e) || n.has(i)
}
function Ao(e, t=!1) {
    return e = e.__v_raw,
    !t && wt(Le(e), "iterate", zn),
    Reflect.get(e, "size", e)
}
function dl(e) {
    e = Le(e);
    const t = Le(this);
    return Ci(t).has.call(t, e) || (t.add(e),
    sn(t, "add", e, e)),
    this
}
function ml(e, t) {
    t = Le(t);
    const n = Le(this)
      , {has: r, get: i} = Ci(n);
    let o = r.call(n, e);
    o || (e = Le(e),
    o = r.call(n, e));
    const a = i.call(n, e);
    return n.set(e, t),
    o ? io(t, a) && sn(n, "set", e, t) : sn(n, "add", e, t),
    this
}
function hl(e) {
    const t = Le(this)
      , {has: n, get: r} = Ci(t);
    let i = n.call(t, e);
    i || (e = Le(e),
    i = n.call(t, e)),
    r && r.call(t, e);
    const o = t.delete(e);
    return i && sn(t, "delete", e, void 0),
    o
}
function gl() {
    const e = Le(this)
      , t = e.size !== 0
      , n = e.clear();
    return t && sn(e, "clear", void 0, void 0),
    n
}
function No(e, t) {
    return function(r, i) {
        const o = this
          , a = o.__v_raw
          , s = Le(a)
          , l = t ? ys : e ? ws : so;
        return !e && wt(s, "iterate", zn),
        a.forEach((u,c)=>r.call(i, l(u), l(c), o))
    }
}
function xo(e, t, n) {
    return function(...r) {
        const i = this.__v_raw
          , o = Le(i)
          , a = gr(o)
          , s = e === "entries" || e === Symbol.iterator && a
          , l = e === "keys" && a
          , u = i[e](...r)
          , c = n ? ys : t ? ws : so;
        return !t && wt(o, "iterate", l ? Sa : zn),
        {
            next() {
                const {value: f, done: h} = u.next();
                return h ? {
                    value: f,
                    done: h
                } : {
                    value: s ? [c(f[0]), c(f[1])] : c(f),
                    done: h
                }
            },
            [Symbol.iterator]() {
                return this
            }
        }
    }
}
function hn(e) {
    return function(...t) {
        return e === "delete" ? !1 : this
    }
}
function Hh() {
    const e = {
        get(o) {
            return Ro(this, o)
        },
        get size() {
            return Ao(this)
        },
        has: Lo,
        add: dl,
        set: ml,
        delete: hl,
        clear: gl,
        forEach: No(!1, !1)
    }
      , t = {
        get(o) {
            return Ro(this, o, !1, !0)
        },
        get size() {
            return Ao(this)
        },
        has: Lo,
        add: dl,
        set: ml,
        delete: hl,
        clear: gl,
        forEach: No(!1, !0)
    }
      , n = {
        get(o) {
            return Ro(this, o, !0)
        },
        get size() {
            return Ao(this, !0)
        },
        has(o) {
            return Lo.call(this, o, !0)
        },
        add: hn("add"),
        set: hn("set"),
        delete: hn("delete"),
        clear: hn("clear"),
        forEach: No(!0, !1)
    }
      , r = {
        get(o) {
            return Ro(this, o, !0, !0)
        },
        get size() {
            return Ao(this, !0)
        },
        has(o) {
            return Lo.call(this, o, !0)
        },
        add: hn("add"),
        set: hn("set"),
        delete: hn("delete"),
        clear: hn("clear"),
        forEach: No(!0, !0)
    };
    return ["keys", "values", "entries", Symbol.iterator].forEach(o=>{
        e[o] = xo(o, !1, !1),
        n[o] = xo(o, !0, !1),
        t[o] = xo(o, !1, !0),
        r[o] = xo(o, !0, !0)
    }
    ),
    [e, n, t, r]
}
const [Wh,jh,zh,Kh] = Hh();
function _s(e, t) {
    const n = t ? e ? Kh : zh : e ? jh : Wh;
    return (r,i,o)=>i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? r : Reflect.get(Pe(n, i) && i in r ? n : r, i, o)
}
const Yh = {
    get: _s(!1, !1)
}
  , qh = {
    get: _s(!1, !0)
}
  , Gh = {
    get: _s(!0, !1)
}
  , Xu = new WeakMap
  , Ju = new WeakMap
  , Zu = new WeakMap
  , Xh = new WeakMap;
function Jh(e) {
    switch (e) {
    case "Object":
    case "Array":
        return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
        return 2;
    default:
        return 0
    }
}
function Zh(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : Jh(wh(e))
}
function rt(e) {
    return ao(e) ? e : Es(e, !1, Gu, Yh, Xu)
}
function Qh(e) {
    return Es(e, !1, Vh, qh, Ju)
}
function Qu(e) {
    return Es(e, !0, Uh, Gh, Zu)
}
function Es(e, t, n, r, i) {
    if (!Ye(e) || e.__v_raw && !(t && e.__v_isReactive))
        return e;
    const o = i.get(e);
    if (o)
        return o;
    const a = Zh(e);
    if (a === 0)
        return e;
    const s = new Proxy(e,a === 2 ? r : n);
    return i.set(e, s),
    s
}
function pr(e) {
    return ao(e) ? pr(e.__v_raw) : !!(e && e.__v_isReactive)
}
function ao(e) {
    return !!(e && e.__v_isReadonly)
}
function Ca(e) {
    return !!(e && e.__v_isShallow)
}
function ef(e) {
    return pr(e) || ao(e)
}
function Le(e) {
    const t = e && e.__v_raw;
    return t ? Le(t) : e
}
function tf(e) {
    return ai(e, "__v_skip", !0),
    e
}
const so = e=>Ye(e) ? rt(e) : e
  , ws = e=>Ye(e) ? Qu(e) : e;
function nf(e) {
    kn && Nt && (e = Le(e),
    Ku(e.dep || (e.dep = ps())))
}
function rf(e, t) {
    e = Le(e),
    e.dep && Ta(e.dep)
}
function Ze(e) {
    return !!(e && e.__v_isRef === !0)
}
function oe(e) {
    return af(e, !1)
}
function of(e) {
    return af(e, !0)
}
function af(e, t) {
    return Ze(e) ? e : new eg(e,t)
}
class eg {
    constructor(t, n) {
        this.__v_isShallow = n,
        this.dep = void 0,
        this.__v_isRef = !0,
        this._rawValue = n ? t : Le(t),
        this._value = n ? t : so(t)
    }
    get value() {
        return nf(this),
        this._value
    }
    set value(t) {
        t = this.__v_isShallow ? t : Le(t),
        io(t, this._rawValue) && (this._rawValue = t,
        this._value = this.__v_isShallow ? t : so(t),
        rf(this))
    }
}
function Mt(e) {
    return Ze(e) ? e.value : e
}
const tg = {
    get: (e,t,n)=>Mt(Reflect.get(e, t, n)),
    set: (e,t,n,r)=>{
        const i = e[t];
        return Ze(i) && !Ze(n) ? (i.value = n,
        !0) : Reflect.set(e, t, n, r)
    }
};
function sf(e) {
    return pr(e) ? e : new Proxy(e,tg)
}
function dC(e) {
    const t = be(e) ? new Array(e.length) : {};
    for (const n in e)
        t[n] = rg(e, n);
    return t
}
class ng {
    constructor(t, n, r) {
        this._object = t,
        this._key = n,
        this._defaultValue = r,
        this.__v_isRef = !0
    }
    get value() {
        const t = this._object[this._key];
        return t === void 0 ? this._defaultValue : t
    }
    set value(t) {
        this._object[this._key] = t
    }
}
function rg(e, t, n) {
    const r = e[t];
    return Ze(r) ? r : new ng(e,t,n)
}
class og {
    constructor(t, n, r, i) {
        this._setter = n,
        this.dep = void 0,
        this.__v_isRef = !0,
        this._dirty = !0,
        this.effect = new vs(t,()=>{
            this._dirty || (this._dirty = !0,
            rf(this))
        }
        ),
        this.effect.computed = this,
        this.effect.active = this._cacheable = !i,
        this.__v_isReadonly = r
    }
    get value() {
        const t = Le(this);
        return nf(t),
        (t._dirty || !t._cacheable) && (t._dirty = !1,
        t._value = t.effect.run()),
        t._value
    }
    set value(t) {
        this._setter(t)
    }
}
function ig(e, t, n=!1) {
    let r, i;
    const o = we(e);
    return o ? (r = e,
    i = Dt) : (r = e.get,
    i = e.set),
    new og(r,i,o || !i,n)
}
function In(e, t, n, r) {
    let i;
    try {
        i = r ? e(...r) : e()
    } catch (o) {
        Oi(o, t, n)
    }
    return i
}
function Pt(e, t, n, r) {
    if (we(e)) {
        const o = In(e, t, n, r);
        return o && Bu(o) && o.catch(a=>{
            Oi(a, t, n)
        }
        ),
        o
    }
    const i = [];
    for (let o = 0; o < e.length; o++)
        i.push(Pt(e[o], t, n, r));
    return i
}
function Oi(e, t, n, r=!0) {
    const i = t ? t.vnode : null;
    if (t) {
        let o = t.parent;
        const a = t.proxy
          , s = n;
        for (; o; ) {
            const u = o.ec;
            if (u) {
                for (let c = 0; c < u.length; c++)
                    if (u[c](e, a, s) === !1)
                        return
            }
            o = o.parent
        }
        const l = t.appContext.config.errorHandler;
        if (l) {
            In(l, null, 10, [e, a, s]);
            return
        }
    }
    ag(e, n, i, r)
}
function ag(e, t, n, r=!0) {
    console.error(e)
}
let li = !1
  , Oa = !1;
const yt = [];
let en = 0;
const Xr = [];
let qr = null
  , lr = 0;
const Jr = [];
let En = null
  , cr = 0;
const lf = Promise.resolve();
let Ss = null
  , ka = null;
function Be(e) {
    const t = Ss || lf;
    return e ? t.then(this ? e.bind(this) : e) : t
}
function sg(e) {
    let t = en + 1
      , n = yt.length;
    for (; t < n; ) {
        const r = t + n >>> 1;
        lo(yt[r]) < e ? t = r + 1 : n = r
    }
    return t
}
function cf(e) {
    (!yt.length || !yt.includes(e, li && e.allowRecurse ? en + 1 : en)) && e !== ka && (e.id == null ? yt.push(e) : yt.splice(sg(e.id), 0, e),
    uf())
}
function uf() {
    !li && !Oa && (Oa = !0,
    Ss = lf.then(mf))
}
function lg(e) {
    const t = yt.indexOf(e);
    t > en && yt.splice(t, 1)
}
function ff(e, t, n, r) {
    be(e) ? n.push(...e) : (!t || !t.includes(e, e.allowRecurse ? r + 1 : r)) && n.push(e),
    uf()
}
function cg(e) {
    ff(e, qr, Xr, lr)
}
function ug(e) {
    ff(e, En, Jr, cr)
}
function ki(e, t=null) {
    if (Xr.length) {
        for (ka = t,
        qr = [...new Set(Xr)],
        Xr.length = 0,
        lr = 0; lr < qr.length; lr++)
            qr[lr]();
        qr = null,
        lr = 0,
        ka = null,
        ki(e, t)
    }
}
function df(e) {
    if (ki(),
    Jr.length) {
        const t = [...new Set(Jr)];
        if (Jr.length = 0,
        En) {
            En.push(...t);
            return
        }
        for (En = t,
        En.sort((n,r)=>lo(n) - lo(r)),
        cr = 0; cr < En.length; cr++)
            En[cr]();
        En = null,
        cr = 0
    }
}
const lo = e=>e.id == null ? 1 / 0 : e.id;
function mf(e) {
    Oa = !1,
    li = !0,
    ki(e),
    yt.sort((n,r)=>lo(n) - lo(r));
    const t = Dt;
    try {
        for (en = 0; en < yt.length; en++) {
            const n = yt[en];
            n && n.active !== !1 && In(n, null, 14)
        }
    } finally {
        en = 0,
        yt.length = 0,
        df(),
        li = !1,
        Ss = null,
        (yt.length || Xr.length || Jr.length) && mf(e)
    }
}
function fg(e, t, ...n) {
    if (e.isUnmounted)
        return;
    const r = e.vnode.props || $e;
    let i = n;
    const o = t.startsWith("update:")
      , a = o && t.slice(7);
    if (a && a in r) {
        const c = `${a === "modelValue" ? "model" : a}Modifiers`
          , {number: f, trim: h} = r[c] || $e;
        h && (i = n.map(p=>p.trim())),
        f && (i = n.map(si))
    }
    let s, l = r[s = Ji(t)] || r[s = Ji(Yt(t))];
    !l && o && (l = r[s = Ji(Jn(t))]),
    l && Pt(l, e, 6, i);
    const u = r[s + "Once"];
    if (u) {
        if (!e.emitted)
            e.emitted = {};
        else if (e.emitted[s])
            return;
        e.emitted[s] = !0,
        Pt(u, e, 6, i)
    }
}
function hf(e, t, n=!1) {
    const r = t.emitsCache
      , i = r.get(e);
    if (i !== void 0)
        return i;
    const o = e.emits;
    let a = {}
      , s = !1;
    if (!we(e)) {
        const l = u=>{
            const c = hf(u, t, !0);
            c && (s = !0,
            nt(a, c))
        }
        ;
        !n && t.mixins.length && t.mixins.forEach(l),
        e.extends && l(e.extends),
        e.mixins && e.mixins.forEach(l)
    }
    return !o && !s ? (r.set(e, null),
    null) : (be(o) ? o.forEach(l=>a[l] = null) : nt(a, o),
    r.set(e, a),
    a)
}
function Ii(e, t) {
    return !e || !Ei(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""),
    Pe(e, t[0].toLowerCase() + t.slice(1)) || Pe(e, Jn(t)) || Pe(e, t))
}
let Ot = null
  , gf = null;
function ci(e) {
    const t = Ot;
    return Ot = e,
    gf = e && e.type.__scopeId || null,
    t
}
function dg(e, t=Ot, n) {
    if (!t || e._n)
        return e;
    const r = (...i)=>{
        r._d && kl(-1);
        const o = ci(t)
          , a = e(...i);
        return ci(o),
        r._d && kl(1),
        a
    }
    ;
    return r._n = !0,
    r._c = !0,
    r._d = !0,
    r
}
function Zi(e) {
    const {type: t, vnode: n, proxy: r, withProxy: i, props: o, propsOptions: [a], slots: s, attrs: l, emit: u, render: c, renderCache: f, data: h, setupState: p, ctx: v, inheritAttrs: E} = e;
    let y, g;
    const _ = ci(e);
    try {
        if (n.shapeFlag & 4) {
            const S = i || r;
            y = zt(c.call(S, S, f, o, p, h, v)),
            g = l
        } else {
            const S = t;
            y = zt(S.length > 1 ? S(o, {
                attrs: l,
                slots: s,
                emit: u
            }) : S(o, null)),
            g = t.props ? l : mg(l)
        }
    } catch (S) {
        Qr.length = 0,
        Oi(S, e, 1),
        y = k(Rt)
    }
    let C = y;
    if (g && E !== !1) {
        const S = Object.keys(g)
          , {shapeFlag: A} = C;
        S.length && A & 7 && (a && S.some(ds) && (g = hg(g, a)),
        C = Ln(C, g))
    }
    return n.dirs && (C = Ln(C),
    C.dirs = C.dirs ? C.dirs.concat(n.dirs) : n.dirs),
    n.transition && (C.transition = n.transition),
    y = C,
    ci(_),
    y
}
const mg = e=>{
    let t;
    for (const n in e)
        (n === "class" || n === "style" || Ei(n)) && ((t || (t = {}))[n] = e[n]);
    return t
}
  , hg = (e,t)=>{
    const n = {};
    for (const r in e)
        (!ds(r) || !(r.slice(9)in t)) && (n[r] = e[r]);
    return n
}
;
function gg(e, t, n) {
    const {props: r, children: i, component: o} = e
      , {props: a, children: s, patchFlag: l} = t
      , u = o.emitsOptions;
    if (t.dirs || t.transition)
        return !0;
    if (n && l >= 0) {
        if (l & 1024)
            return !0;
        if (l & 16)
            return r ? pl(r, a, u) : !!a;
        if (l & 8) {
            const c = t.dynamicProps;
            for (let f = 0; f < c.length; f++) {
                const h = c[f];
                if (a[h] !== r[h] && !Ii(u, h))
                    return !0
            }
        }
    } else
        return (i || s) && (!s || !s.$stable) ? !0 : r === a ? !1 : r ? a ? pl(r, a, u) : !0 : !!a;
    return !1
}
function pl(e, t, n) {
    const r = Object.keys(t);
    if (r.length !== Object.keys(e).length)
        return !0;
    for (let i = 0; i < r.length; i++) {
        const o = r[i];
        if (t[o] !== e[o] && !Ii(n, o))
            return !0
    }
    return !1
}
function pg({vnode: e, parent: t}, n) {
    for (; t && t.subTree === e; )
        (e = t.vnode).el = n,
        t = t.parent
}
const vg = e=>e.__isSuspense;
function bg(e, t) {
    t && t.pendingBranch ? be(e) ? t.effects.push(...e) : t.effects.push(e) : ug(e)
}
function rn(e, t) {
    if (tt) {
        let n = tt.provides;
        const r = tt.parent && tt.parent.provides;
        r === n && (n = tt.provides = Object.create(r)),
        n[e] = t
    }
}
function Et(e, t, n=!1) {
    const r = tt || Ot;
    if (r) {
        const i = r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides;
        if (i && e in i)
            return i[e];
        if (arguments.length > 1)
            return n && we(t) ? t.call(r.proxy) : t
    }
}
function Pi(e, t) {
    return Ts(e, null, t)
}
const vl = {};
function he(e, t, n) {
    return Ts(e, t, n)
}
function Ts(e, t, {immediate: n, deep: r, flush: i, onTrack: o, onTrigger: a}=$e) {
    const s = tt;
    let l, u = !1, c = !1;
    if (Ze(e) ? (l = ()=>e.value,
    u = Ca(e)) : pr(e) ? (l = ()=>e,
    r = !0) : be(e) ? (c = !0,
    u = e.some(g=>pr(g) || Ca(g)),
    l = ()=>e.map(g=>{
        if (Ze(g))
            return g.value;
        if (pr(g))
            return Wn(g);
        if (we(g))
            return In(g, s, 2)
    }
    )) : we(e) ? t ? l = ()=>In(e, s, 2) : l = ()=>{
        if (!(s && s.isUnmounted))
            return f && f(),
            Pt(e, s, 3, [h])
    }
    : l = Dt,
    t && r) {
        const g = l;
        l = ()=>Wn(g())
    }
    let f, h = g=>{
        f = y.onStop = ()=>{
            In(g, s, 4)
        }
    }
    ;
    if (mo)
        return h = Dt,
        t ? n && Pt(t, s, 3, [l(), c ? [] : void 0, h]) : l(),
        Dt;
    let p = c ? [] : vl;
    const v = ()=>{
        if (!!y.active)
            if (t) {
                const g = y.run();
                (r || u || (c ? g.some((_,C)=>io(_, p[C])) : io(g, p))) && (f && f(),
                Pt(t, s, 3, [g, p === vl ? void 0 : p, h]),
                p = g)
            } else
                y.run()
    }
    ;
    v.allowRecurse = !!t;
    let E;
    i === "sync" ? E = v : i === "post" ? E = ()=>vt(v, s && s.suspense) : E = ()=>cg(v);
    const y = new vs(l,E);
    return t ? n ? v() : p = y.run() : i === "post" ? vt(y.run.bind(y), s && s.suspense) : y.run(),
    ()=>{
        y.stop(),
        s && s.scope && ms(s.scope.effects, y)
    }
}
function yg(e, t, n) {
    const r = this.proxy
      , i = et(e) ? e.includes(".") ? pf(r, e) : ()=>r[e] : e.bind(r, r);
    let o;
    we(t) ? o = t : (o = t.handler,
    n = t);
    const a = tt;
    br(this);
    const s = Ts(i, o.bind(r), n);
    return a ? br(a) : Kn(),
    s
}
function pf(e, t) {
    const n = t.split(".");
    return ()=>{
        let r = e;
        for (let i = 0; i < n.length && r; i++)
            r = r[n[i]];
        return r
    }
}
function Wn(e, t) {
    if (!Ye(e) || e.__v_skip || (t = t || new Set,
    t.has(e)))
        return e;
    if (t.add(e),
    Ze(e))
        Wn(e.value, t);
    else if (be(e))
        for (let n = 0; n < e.length; n++)
            Wn(e[n], t);
    else if ($u(e) || gr(e))
        e.forEach(n=>{
            Wn(n, t)
        }
        );
    else if (Vu(e))
        for (const n in e)
            Wn(e[n], t);
    return e
}
function vf() {
    const e = {
        isMounted: !1,
        isLeaving: !1,
        isUnmounting: !1,
        leavingVNodes: new Map
    };
    return gt(()=>{
        e.isMounted = !0
    }
    ),
    fn(()=>{
        e.isUnmounting = !0
    }
    ),
    e
}
const St = [Function, Array]
  , _g = {
    name: "BaseTransition",
    props: {
        mode: String,
        appear: Boolean,
        persisted: Boolean,
        onBeforeEnter: St,
        onEnter: St,
        onAfterEnter: St,
        onEnterCancelled: St,
        onBeforeLeave: St,
        onLeave: St,
        onAfterLeave: St,
        onLeaveCancelled: St,
        onBeforeAppear: St,
        onAppear: St,
        onAfterAppear: St,
        onAppearCancelled: St
    },
    setup(e, {slots: t}) {
        const n = ct()
          , r = vf();
        let i;
        return ()=>{
            const o = t.default && Cs(t.default(), !0);
            if (!o || !o.length)
                return;
            let a = o[0];
            if (o.length > 1) {
                for (const E of o)
                    if (E.type !== Rt) {
                        a = E;
                        break
                    }
            }
            const s = Le(e)
              , {mode: l} = s;
            if (r.isLeaving)
                return Qi(a);
            const u = bl(a);
            if (!u)
                return Qi(a);
            const c = co(u, s, r, n);
            uo(u, c);
            const f = n.subTree
              , h = f && bl(f);
            let p = !1;
            const {getTransitionKey: v} = u.type;
            if (v) {
                const E = v();
                i === void 0 ? i = E : E !== i && (i = E,
                p = !0)
            }
            if (h && h.type !== Rt && (!Vn(u, h) || p)) {
                const E = co(h, s, r, n);
                if (uo(h, E),
                l === "out-in")
                    return r.isLeaving = !0,
                    E.afterLeave = ()=>{
                        r.isLeaving = !1,
                        n.update()
                    }
                    ,
                    Qi(a);
                l === "in-out" && u.type !== Rt && (E.delayLeave = (y,g,_)=>{
                    const C = yf(r, h);
                    C[String(h.key)] = h,
                    y._leaveCb = ()=>{
                        g(),
                        y._leaveCb = void 0,
                        delete c.delayedLeave
                    }
                    ,
                    c.delayedLeave = _
                }
                )
            }
            return a
        }
    }
}
  , bf = _g;
function yf(e, t) {
    const {leavingVNodes: n} = e;
    let r = n.get(t.type);
    return r || (r = Object.create(null),
    n.set(t.type, r)),
    r
}
function co(e, t, n, r) {
    const {appear: i, mode: o, persisted: a=!1, onBeforeEnter: s, onEnter: l, onAfterEnter: u, onEnterCancelled: c, onBeforeLeave: f, onLeave: h, onAfterLeave: p, onLeaveCancelled: v, onBeforeAppear: E, onAppear: y, onAfterAppear: g, onAppearCancelled: _} = t
      , C = String(e.key)
      , S = yf(n, e)
      , A = (O,M)=>{
        O && Pt(O, r, 9, M)
    }
      , N = (O,M)=>{
        const B = M[1];
        A(O, M),
        be(O) ? O.every(T=>T.length <= 1) && B() : O.length <= 1 && B()
    }
      , x = {
        mode: o,
        persisted: a,
        beforeEnter(O) {
            let M = s;
            if (!n.isMounted)
                if (i)
                    M = E || s;
                else
                    return;
            O._leaveCb && O._leaveCb(!0);
            const B = S[C];
            B && Vn(e, B) && B.el._leaveCb && B.el._leaveCb(),
            A(M, [O])
        },
        enter(O) {
            let M = l
              , B = u
              , T = c;
            if (!n.isMounted)
                if (i)
                    M = y || l,
                    B = g || u,
                    T = _ || c;
                else
                    return;
            let I = !1;
            const U = O._enterCb = ce=>{
                I || (I = !0,
                ce ? A(T, [O]) : A(B, [O]),
                x.delayedLeave && x.delayedLeave(),
                O._enterCb = void 0)
            }
            ;
            M ? N(M, [O, U]) : U()
        },
        leave(O, M) {
            const B = String(e.key);
            if (O._enterCb && O._enterCb(!0),
            n.isUnmounting)
                return M();
            A(f, [O]);
            let T = !1;
            const I = O._leaveCb = U=>{
                T || (T = !0,
                M(),
                U ? A(v, [O]) : A(p, [O]),
                O._leaveCb = void 0,
                S[B] === e && delete S[B])
            }
            ;
            S[B] = e,
            h ? N(h, [O, I]) : I()
        },
        clone(O) {
            return co(O, t, n, r)
        }
    };
    return x
}
function Qi(e) {
    if (Ri(e))
        return e = Ln(e),
        e.children = null,
        e
}
function bl(e) {
    return Ri(e) ? e.children ? e.children[0] : void 0 : e
}
function uo(e, t) {
    e.shapeFlag & 6 && e.component ? uo(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent),
    e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t
}
function Cs(e, t=!1, n) {
    let r = []
      , i = 0;
    for (let o = 0; o < e.length; o++) {
        let a = e[o];
        const s = n == null ? a.key : String(n) + String(a.key != null ? a.key : o);
        a.type === ot ? (a.patchFlag & 128 && i++,
        r = r.concat(Cs(a.children, t, s))) : (t || a.type !== Rt) && r.push(s != null ? Ln(a, {
            key: s
        }) : a)
    }
    if (i > 1)
        for (let o = 0; o < r.length; o++)
            r[o].patchFlag = -2;
    return r
}
function Ee(e) {
    return we(e) ? {
        setup: e,
        name: e.name
    } : e
}
const Jo = e=>!!e.type.__asyncLoader
  , Ri = e=>e.type.__isKeepAlive;
function Pr(e, t) {
    _f(e, "a", t)
}
function Zn(e, t) {
    _f(e, "da", t)
}
function _f(e, t, n=tt) {
    const r = e.__wdc || (e.__wdc = ()=>{
        let i = n;
        for (; i; ) {
            if (i.isDeactivated)
                return;
            i = i.parent
        }
        return e()
    }
    );
    if (Li(t, r, n),
    n) {
        let i = n.parent;
        for (; i && i.parent; )
            Ri(i.parent.vnode) && Eg(r, t, n, i),
            i = i.parent
    }
}
function Eg(e, t, n, r) {
    const i = Li(t, e, r, !0);
    Rr(()=>{
        ms(r[t], i)
    }
    , n)
}
function Li(e, t, n=tt, r=!1) {
    if (n) {
        const i = n[e] || (n[e] = [])
          , o = t.__weh || (t.__weh = (...a)=>{
            if (n.isUnmounted)
                return;
            kr(),
            br(n);
            const s = Pt(t, n, e, a);
            return Kn(),
            Ir(),
            s
        }
        );
        return r ? i.unshift(o) : i.push(o),
        o
    }
}
const un = e=>(t,n=tt)=>(!mo || e === "sp") && Li(e, t, n)
  , Ef = un("bm")
  , gt = un("m")
  , wf = un("bu")
  , Sf = un("u")
  , fn = un("bum")
  , Rr = un("um")
  , wg = un("sp")
  , Sg = un("rtg")
  , Tg = un("rtc");
function Cg(e, t=tt) {
    Li("ec", e, t)
}
function on(e, t) {
    const n = Ot;
    if (n === null)
        return e;
    const r = xi(n) || n.proxy
      , i = e.dirs || (e.dirs = []);
    for (let o = 0; o < t.length; o++) {
        let[a,s,l,u=$e] = t[o];
        we(a) && (a = {
            mounted: a,
            updated: a
        }),
        a.deep && Wn(s),
        i.push({
            dir: a,
            instance: r,
            value: s,
            oldValue: void 0,
            arg: l,
            modifiers: u
        })
    }
    return e
}
function Dn(e, t, n, r) {
    const i = e.dirs
      , o = t && t.dirs;
    for (let a = 0; a < i.length; a++) {
        const s = i[a];
        o && (s.oldValue = o[a].value);
        let l = s.dir[r];
        l && (kr(),
        Pt(l, n, 8, [e.el, s, e, t]),
        Ir())
    }
}
const Tf = "components"
  , Og = "directives";
function kg(e, t) {
    return Cf(Tf, e, !0, t) || e
}
const Ig = Symbol();
function Pg(e) {
    return Cf(Og, e)
}
function Cf(e, t, n=!0, r=!1) {
    const i = Ot || tt;
    if (i) {
        const o = i.type;
        if (e === Tf) {
            const s = ip(o, !1);
            if (s && (s === t || s === Yt(t) || s === Ti(Yt(t))))
                return o
        }
        const a = yl(i[e] || o[e], t) || yl(i.appContext[e], t);
        return !a && r ? o : a
    }
}
function yl(e, t) {
    return e && (e[t] || e[Yt(t)] || e[Ti(Yt(t))])
}
function mC(e, t, n, r) {
    let i;
    const o = n && n[r];
    if (be(e) || et(e)) {
        i = new Array(e.length);
        for (let a = 0, s = e.length; a < s; a++)
            i[a] = t(e[a], a, void 0, o && o[a])
    } else if (typeof e == "number") {
        i = new Array(e);
        for (let a = 0; a < e; a++)
            i[a] = t(a + 1, a, void 0, o && o[a])
    } else if (Ye(e))
        if (e[Symbol.iterator])
            i = Array.from(e, (a,s)=>t(a, s, void 0, o && o[s]));
        else {
            const a = Object.keys(e);
            i = new Array(a.length);
            for (let s = 0, l = a.length; s < l; s++) {
                const u = a[s];
                i[s] = t(e[u], u, s, o && o[s])
            }
        }
    else
        i = [];
    return n && (n[r] = i),
    i
}
const Ia = e=>e ? Vf(e) ? xi(e) || e.proxy : Ia(e.parent) : null
  , ui = nt(Object.create(null), {
    $: e=>e,
    $el: e=>e.vnode.el,
    $data: e=>e.data,
    $props: e=>e.props,
    $attrs: e=>e.attrs,
    $slots: e=>e.slots,
    $refs: e=>e.refs,
    $parent: e=>Ia(e.parent),
    $root: e=>Ia(e.root),
    $emit: e=>e.emit,
    $options: e=>kf(e),
    $forceUpdate: e=>e.f || (e.f = ()=>cf(e.update)),
    $nextTick: e=>e.n || (e.n = Be.bind(e.proxy)),
    $watch: e=>yg.bind(e)
})
  , Rg = {
    get({_: e}, t) {
        const {ctx: n, setupState: r, data: i, props: o, accessCache: a, type: s, appContext: l} = e;
        let u;
        if (t[0] !== "$") {
            const p = a[t];
            if (p !== void 0)
                switch (p) {
                case 1:
                    return r[t];
                case 2:
                    return i[t];
                case 4:
                    return n[t];
                case 3:
                    return o[t]
                }
            else {
                if (r !== $e && Pe(r, t))
                    return a[t] = 1,
                    r[t];
                if (i !== $e && Pe(i, t))
                    return a[t] = 2,
                    i[t];
                if ((u = e.propsOptions[0]) && Pe(u, t))
                    return a[t] = 3,
                    o[t];
                if (n !== $e && Pe(n, t))
                    return a[t] = 4,
                    n[t];
                Pa && (a[t] = 0)
            }
        }
        const c = ui[t];
        let f, h;
        if (c)
            return t === "$attrs" && wt(e, "get", t),
            c(e);
        if ((f = s.__cssModules) && (f = f[t]))
            return f;
        if (n !== $e && Pe(n, t))
            return a[t] = 4,
            n[t];
        if (h = l.config.globalProperties,
        Pe(h, t))
            return h[t]
    },
    set({_: e}, t, n) {
        const {data: r, setupState: i, ctx: o} = e;
        return i !== $e && Pe(i, t) ? (i[t] = n,
        !0) : r !== $e && Pe(r, t) ? (r[t] = n,
        !0) : Pe(e.props, t) || t[0] === "$" && t.slice(1)in e ? !1 : (o[t] = n,
        !0)
    },
    has({_: {data: e, setupState: t, accessCache: n, ctx: r, appContext: i, propsOptions: o}}, a) {
        let s;
        return !!n[a] || e !== $e && Pe(e, a) || t !== $e && Pe(t, a) || (s = o[0]) && Pe(s, a) || Pe(r, a) || Pe(ui, a) || Pe(i.config.globalProperties, a)
    },
    defineProperty(e, t, n) {
        return n.get != null ? e._.accessCache[t] = 0 : Pe(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
    }
};
let Pa = !0;
function Lg(e) {
    const t = kf(e)
      , n = e.proxy
      , r = e.ctx;
    Pa = !1,
    t.beforeCreate && _l(t.beforeCreate, e, "bc");
    const {data: i, computed: o, methods: a, watch: s, provide: l, inject: u, created: c, beforeMount: f, mounted: h, beforeUpdate: p, updated: v, activated: E, deactivated: y, beforeDestroy: g, beforeUnmount: _, destroyed: C, unmounted: S, render: A, renderTracked: N, renderTriggered: x, errorCaptured: O, serverPrefetch: M, expose: B, inheritAttrs: T, components: I, directives: U, filters: ce} = t;
    if (u && Ag(u, r, null, e.appContext.config.unwrapInjectedRef),
    a)
        for (const ee in a) {
            const re = a[ee];
            we(re) && (r[ee] = re.bind(n))
        }
    if (i) {
        const ee = i.call(n, n);
        Ye(ee) && (e.data = rt(ee))
    }
    if (Pa = !0,
    o)
        for (const ee in o) {
            const re = o[ee]
              , fe = we(re) ? re.bind(n, n) : we(re.get) ? re.get.bind(n, n) : Dt
              , Oe = !we(re) && we(re.set) ? re.set.bind(n) : Dt
              , H = ne({
                get: fe,
                set: Oe
            });
            Object.defineProperty(r, ee, {
                enumerable: !0,
                configurable: !0,
                get: ()=>H.value,
                set: F=>H.value = F
            })
        }
    if (s)
        for (const ee in s)
            Of(s[ee], r, n, ee);
    if (l) {
        const ee = we(l) ? l.call(n) : l;
        Reflect.ownKeys(ee).forEach(re=>{
            rn(re, ee[re])
        }
        )
    }
    c && _l(c, e, "c");
    function K(ee, re) {
        be(re) ? re.forEach(fe=>ee(fe.bind(n))) : re && ee(re.bind(n))
    }
    if (K(Ef, f),
    K(gt, h),
    K(wf, p),
    K(Sf, v),
    K(Pr, E),
    K(Zn, y),
    K(Cg, O),
    K(Tg, N),
    K(Sg, x),
    K(fn, _),
    K(Rr, S),
    K(wg, M),
    be(B))
        if (B.length) {
            const ee = e.exposed || (e.exposed = {});
            B.forEach(re=>{
                Object.defineProperty(ee, re, {
                    get: ()=>n[re],
                    set: fe=>n[re] = fe
                })
            }
            )
        } else
            e.exposed || (e.exposed = {});
    A && e.render === Dt && (e.render = A),
    T != null && (e.inheritAttrs = T),
    I && (e.components = I),
    U && (e.directives = U)
}
function Ag(e, t, n=Dt, r=!1) {
    be(e) && (e = Ra(e));
    for (const i in e) {
        const o = e[i];
        let a;
        Ye(o) ? "default"in o ? a = Et(o.from || i, o.default, !0) : a = Et(o.from || i) : a = Et(o),
        Ze(a) && r ? Object.defineProperty(t, i, {
            enumerable: !0,
            configurable: !0,
            get: ()=>a.value,
            set: s=>a.value = s
        }) : t[i] = a
    }
}
function _l(e, t, n) {
    Pt(be(e) ? e.map(r=>r.bind(t.proxy)) : e.bind(t.proxy), t, n)
}
function Of(e, t, n, r) {
    const i = r.includes(".") ? pf(n, r) : ()=>n[r];
    if (et(e)) {
        const o = t[e];
        we(o) && he(i, o)
    } else if (we(e))
        he(i, e.bind(n));
    else if (Ye(e))
        if (be(e))
            e.forEach(o=>Of(o, t, n, r));
        else {
            const o = we(e.handler) ? e.handler.bind(n) : t[e.handler];
            we(o) && he(i, o, e)
        }
}
function kf(e) {
    const t = e.type
      , {mixins: n, extends: r} = t
      , {mixins: i, optionsCache: o, config: {optionMergeStrategies: a}} = e.appContext
      , s = o.get(t);
    let l;
    return s ? l = s : !i.length && !n && !r ? l = t : (l = {},
    i.length && i.forEach(u=>fi(l, u, a, !0)),
    fi(l, t, a)),
    o.set(t, l),
    l
}
function fi(e, t, n, r=!1) {
    const {mixins: i, extends: o} = t;
    o && fi(e, o, n, !0),
    i && i.forEach(a=>fi(e, a, n, !0));
    for (const a in t)
        if (!(r && a === "expose")) {
            const s = Ng[a] || n && n[a];
            e[a] = s ? s(e[a], t[a]) : t[a]
        }
    return e
}
const Ng = {
    data: El,
    props: Un,
    emits: Un,
    methods: Un,
    computed: Un,
    beforeCreate: dt,
    created: dt,
    beforeMount: dt,
    mounted: dt,
    beforeUpdate: dt,
    updated: dt,
    beforeDestroy: dt,
    beforeUnmount: dt,
    destroyed: dt,
    unmounted: dt,
    activated: dt,
    deactivated: dt,
    errorCaptured: dt,
    serverPrefetch: dt,
    components: Un,
    directives: Un,
    watch: Dg,
    provide: El,
    inject: xg
};
function El(e, t) {
    return t ? e ? function() {
        return nt(we(e) ? e.call(this, this) : e, we(t) ? t.call(this, this) : t)
    }
    : t : e
}
function xg(e, t) {
    return Un(Ra(e), Ra(t))
}
function Ra(e) {
    if (be(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++)
            t[e[n]] = e[n];
        return t
    }
    return e
}
function dt(e, t) {
    return e ? [...new Set([].concat(e, t))] : t
}
function Un(e, t) {
    return e ? nt(nt(Object.create(null), e), t) : t
}
function Dg(e, t) {
    if (!e)
        return t;
    if (!t)
        return e;
    const n = nt(Object.create(null), e);
    for (const r in t)
        n[r] = dt(e[r], t[r]);
    return n
}
function Mg(e, t, n, r=!1) {
    const i = {}
      , o = {};
    ai(o, Ni, 1),
    e.propsDefaults = Object.create(null),
    If(e, t, i, o);
    for (const a in e.propsOptions[0])
        a in i || (i[a] = void 0);
    n ? e.props = r ? i : Qh(i) : e.type.props ? e.props = i : e.props = o,
    e.attrs = o
}
function Fg(e, t, n, r) {
    const {props: i, attrs: o, vnode: {patchFlag: a}} = e
      , s = Le(i)
      , [l] = e.propsOptions;
    let u = !1;
    if ((r || a > 0) && !(a & 16)) {
        if (a & 8) {
            const c = e.vnode.dynamicProps;
            for (let f = 0; f < c.length; f++) {
                let h = c[f];
                if (Ii(e.emitsOptions, h))
                    continue;
                const p = t[h];
                if (l)
                    if (Pe(o, h))
                        p !== o[h] && (o[h] = p,
                        u = !0);
                    else {
                        const v = Yt(h);
                        i[v] = La(l, s, v, p, e, !1)
                    }
                else
                    p !== o[h] && (o[h] = p,
                    u = !0)
            }
        }
    } else {
        If(e, t, i, o) && (u = !0);
        let c;
        for (const f in s)
            (!t || !Pe(t, f) && ((c = Jn(f)) === f || !Pe(t, c))) && (l ? n && (n[f] !== void 0 || n[c] !== void 0) && (i[f] = La(l, s, f, void 0, e, !0)) : delete i[f]);
        if (o !== s)
            for (const f in o)
                (!t || !Pe(t, f) && !0) && (delete o[f],
                u = !0)
    }
    u && sn(e, "set", "$attrs")
}
function If(e, t, n, r) {
    const [i,o] = e.propsOptions;
    let a = !1, s;
    if (t)
        for (let l in t) {
            if (Go(l))
                continue;
            const u = t[l];
            let c;
            i && Pe(i, c = Yt(l)) ? !o || !o.includes(c) ? n[c] = u : (s || (s = {}))[c] = u : Ii(e.emitsOptions, l) || (!(l in r) || u !== r[l]) && (r[l] = u,
            a = !0)
        }
    if (o) {
        const l = Le(n)
          , u = s || $e;
        for (let c = 0; c < o.length; c++) {
            const f = o[c];
            n[f] = La(i, l, f, u[f], e, !Pe(u, f))
        }
    }
    return a
}
function La(e, t, n, r, i, o) {
    const a = e[n];
    if (a != null) {
        const s = Pe(a, "default");
        if (s && r === void 0) {
            const l = a.default;
            if (a.type !== Function && we(l)) {
                const {propsDefaults: u} = i;
                n in u ? r = u[n] : (br(i),
                r = u[n] = l.call(null, t),
                Kn())
            } else
                r = l
        }
        a[0] && (o && !s ? r = !1 : a[1] && (r === "" || r === Jn(n)) && (r = !0))
    }
    return r
}
function Pf(e, t, n=!1) {
    const r = t.propsCache
      , i = r.get(e);
    if (i)
        return i;
    const o = e.props
      , a = {}
      , s = [];
    let l = !1;
    if (!we(e)) {
        const c = f=>{
            l = !0;
            const [h,p] = Pf(f, t, !0);
            nt(a, h),
            p && s.push(...p)
        }
        ;
        !n && t.mixins.length && t.mixins.forEach(c),
        e.extends && c(e.extends),
        e.mixins && e.mixins.forEach(c)
    }
    if (!o && !l)
        return r.set(e, hr),
        hr;
    if (be(o))
        for (let c = 0; c < o.length; c++) {
            const f = Yt(o[c]);
            wl(f) && (a[f] = $e)
        }
    else if (o)
        for (const c in o) {
            const f = Yt(c);
            if (wl(f)) {
                const h = o[c]
                  , p = a[f] = be(h) || we(h) ? {
                    type: h
                } : h;
                if (p) {
                    const v = Cl(Boolean, p.type)
                      , E = Cl(String, p.type);
                    p[0] = v > -1,
                    p[1] = E < 0 || v < E,
                    (v > -1 || Pe(p, "default")) && s.push(f)
                }
            }
        }
    const u = [a, s];
    return r.set(e, u),
    u
}
function wl(e) {
    return e[0] !== "$"
}
function Sl(e) {
    const t = e && e.toString().match(/^\s*function (\w+)/);
    return t ? t[1] : e === null ? "null" : ""
}
function Tl(e, t) {
    return Sl(e) === Sl(t)
}
function Cl(e, t) {
    return be(t) ? t.findIndex(n=>Tl(n, e)) : we(t) && Tl(t, e) ? 0 : -1
}
const Rf = e=>e[0] === "_" || e === "$stable"
  , Os = e=>be(e) ? e.map(zt) : [zt(e)]
  , $g = (e,t,n)=>{
    if (t._n)
        return t;
    const r = dg((...i)=>Os(t(...i)), n);
    return r._c = !1,
    r
}
  , Lf = (e,t,n)=>{
    const r = e._ctx;
    for (const i in e) {
        if (Rf(i))
            continue;
        const o = e[i];
        if (we(o))
            t[i] = $g(i, o, r);
        else if (o != null) {
            const a = Os(o);
            t[i] = ()=>a
        }
    }
}
  , Af = (e,t)=>{
    const n = Os(t);
    e.slots.default = ()=>n
}
  , Bg = (e,t)=>{
    if (e.vnode.shapeFlag & 32) {
        const n = t._;
        n ? (e.slots = Le(t),
        ai(t, "_", n)) : Lf(t, e.slots = {})
    } else
        e.slots = {},
        t && Af(e, t);
    ai(e.slots, Ni, 1)
}
  , Ug = (e,t,n)=>{
    const {vnode: r, slots: i} = e;
    let o = !0
      , a = $e;
    if (r.shapeFlag & 32) {
        const s = t._;
        s ? n && s === 1 ? o = !1 : (nt(i, t),
        !n && s === 1 && delete i._) : (o = !t.$stable,
        Lf(t, i)),
        a = t
    } else
        t && (Af(e, t),
        a = {
            default: 1
        });
    if (o)
        for (const s in i)
            !Rf(s) && !(s in a) && delete i[s]
}
;
function Nf() {
    return {
        app: null,
        config: {
            isNativeTag: yh,
            performance: !1,
            globalProperties: {},
            optionMergeStrategies: {},
            errorHandler: void 0,
            warnHandler: void 0,
            compilerOptions: {}
        },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null),
        optionsCache: new WeakMap,
        propsCache: new WeakMap,
        emitsCache: new WeakMap
    }
}
let Vg = 0;
function Hg(e, t) {
    return function(r, i=null) {
        we(r) || (r = Object.assign({}, r)),
        i != null && !Ye(i) && (i = null);
        const o = Nf()
          , a = new Set;
        let s = !1;
        const l = o.app = {
            _uid: Vg++,
            _component: r,
            _props: i,
            _container: null,
            _context: o,
            _instance: null,
            version: sp,
            get config() {
                return o.config
            },
            set config(u) {},
            use(u, ...c) {
                return a.has(u) || (u && we(u.install) ? (a.add(u),
                u.install(l, ...c)) : we(u) && (a.add(u),
                u(l, ...c))),
                l
            },
            mixin(u) {
                return o.mixins.includes(u) || o.mixins.push(u),
                l
            },
            component(u, c) {
                return c ? (o.components[u] = c,
                l) : o.components[u]
            },
            directive(u, c) {
                return c ? (o.directives[u] = c,
                l) : o.directives[u]
            },
            mount(u, c, f) {
                if (!s) {
                    const h = k(r, i);
                    return h.appContext = o,
                    c && t ? t(h, u) : e(h, u, f),
                    s = !0,
                    l._container = u,
                    u.__vue_app__ = l,
                    xi(h.component) || h.component.proxy
                }
            },
            unmount() {
                s && (e(null, l._container),
                delete l._container.__vue_app__)
            },
            provide(u, c) {
                return o.provides[u] = c,
                l
            }
        };
        return l
    }
}
function Aa(e, t, n, r, i=!1) {
    if (be(e)) {
        e.forEach((h,p)=>Aa(h, t && (be(t) ? t[p] : t), n, r, i));
        return
    }
    if (Jo(r) && !i)
        return;
    const o = r.shapeFlag & 4 ? xi(r.component) || r.component.proxy : r.el
      , a = i ? null : o
      , {i: s, r: l} = e
      , u = t && t.r
      , c = s.refs === $e ? s.refs = {} : s.refs
      , f = s.setupState;
    if (u != null && u !== l && (et(u) ? (c[u] = null,
    Pe(f, u) && (f[u] = null)) : Ze(u) && (u.value = null)),
    we(l))
        In(l, s, 12, [a, c]);
    else {
        const h = et(l)
          , p = Ze(l);
        if (h || p) {
            const v = ()=>{
                if (e.f) {
                    const E = h ? c[l] : l.value;
                    i ? be(E) && ms(E, o) : be(E) ? E.includes(o) || E.push(o) : h ? (c[l] = [o],
                    Pe(f, l) && (f[l] = c[l])) : (l.value = [o],
                    e.k && (c[e.k] = l.value))
                } else
                    h ? (c[l] = a,
                    Pe(f, l) && (f[l] = a)) : p && (l.value = a,
                    e.k && (c[e.k] = a))
            }
            ;
            a ? (v.id = -1,
            vt(v, n)) : v()
        }
    }
}
const vt = bg;
function Wg(e) {
    return jg(e)
}
function jg(e, t) {
    const n = Ch();
    n.__VUE__ = !0;
    const {insert: r, remove: i, patchProp: o, createElement: a, createText: s, createComment: l, setText: u, setElementText: c, parentNode: f, nextSibling: h, setScopeId: p=Dt, cloneNode: v, insertStaticContent: E} = e
      , y = (d,m,b,L=null,D=null,j=null,Q=!1,G=null,J=!!m.dynamicChildren)=>{
        if (d === m)
            return;
        d && !Vn(d, m) && (L = W(d),
        q(d, D, j, !0),
        d = null),
        m.patchFlag === -2 && (J = !1,
        m.dynamicChildren = null);
        const {type: Y, ref: ie, shapeFlag: R} = m;
        switch (Y) {
        case Ai:
            g(d, m, b, L);
            break;
        case Rt:
            _(d, m, b, L);
            break;
        case ea:
            d == null && C(m, b, L, Q);
            break;
        case ot:
            U(d, m, b, L, D, j, Q, G, J);
            break;
        default:
            R & 1 ? N(d, m, b, L, D, j, Q, G, J) : R & 6 ? ce(d, m, b, L, D, j, Q, G, J) : (R & 64 || R & 128) && Y.process(d, m, b, L, D, j, Q, G, J, te)
        }
        ie != null && D && Aa(ie, d && d.ref, j, m || d, !m)
    }
      , g = (d,m,b,L)=>{
        if (d == null)
            r(m.el = s(m.children), b, L);
        else {
            const D = m.el = d.el;
            m.children !== d.children && u(D, m.children)
        }
    }
      , _ = (d,m,b,L)=>{
        d == null ? r(m.el = l(m.children || ""), b, L) : m.el = d.el
    }
      , C = (d,m,b,L)=>{
        [d.el,d.anchor] = E(d.children, m, b, L, d.el, d.anchor)
    }
      , S = ({el: d, anchor: m},b,L)=>{
        let D;
        for (; d && d !== m; )
            D = h(d),
            r(d, b, L),
            d = D;
        r(m, b, L)
    }
      , A = ({el: d, anchor: m})=>{
        let b;
        for (; d && d !== m; )
            b = h(d),
            i(d),
            d = b;
        i(m)
    }
      , N = (d,m,b,L,D,j,Q,G,J)=>{
        Q = Q || m.type === "svg",
        d == null ? x(m, b, L, D, j, Q, G, J) : B(d, m, D, j, Q, G, J)
    }
      , x = (d,m,b,L,D,j,Q,G)=>{
        let J, Y;
        const {type: ie, props: R, shapeFlag: $, transition: ae, patchFlag: ue, dirs: Se} = d;
        if (d.el && v !== void 0 && ue === -1)
            J = d.el = v(d.el);
        else {
            if (J = d.el = a(d.type, j, R && R.is, R),
            $ & 8 ? c(J, d.children) : $ & 16 && M(d.children, J, null, L, D, j && ie !== "foreignObject", Q, G),
            Se && Dn(d, null, L, "created"),
            R) {
                for (const Ie in R)
                    Ie !== "value" && !Go(Ie) && o(J, Ie, null, R[Ie], j, d.children, L, D, w);
                "value"in R && o(J, "value", null, R.value),
                (Y = R.onVnodeBeforeMount) && Ht(Y, L, d)
            }
            O(J, d, d.scopeId, Q, L)
        }
        Se && Dn(d, null, L, "beforeMount");
        const Te = (!D || D && !D.pendingBranch) && ae && !ae.persisted;
        Te && ae.beforeEnter(J),
        r(J, m, b),
        ((Y = R && R.onVnodeMounted) || Te || Se) && vt(()=>{
            Y && Ht(Y, L, d),
            Te && ae.enter(J),
            Se && Dn(d, null, L, "mounted")
        }
        , D)
    }
      , O = (d,m,b,L,D)=>{
        if (b && p(d, b),
        L)
            for (let j = 0; j < L.length; j++)
                p(d, L[j]);
        if (D) {
            let j = D.subTree;
            if (m === j) {
                const Q = D.vnode;
                O(d, Q, Q.scopeId, Q.slotScopeIds, D.parent)
            }
        }
    }
      , M = (d,m,b,L,D,j,Q,G,J=0)=>{
        for (let Y = J; Y < d.length; Y++) {
            const ie = d[Y] = G ? Sn(d[Y]) : zt(d[Y]);
            y(null, ie, m, b, L, D, j, Q, G)
        }
    }
      , B = (d,m,b,L,D,j,Q)=>{
        const G = m.el = d.el;
        let {patchFlag: J, dynamicChildren: Y, dirs: ie} = m;
        J |= d.patchFlag & 16;
        const R = d.props || $e
          , $ = m.props || $e;
        let ae;
        b && Mn(b, !1),
        (ae = $.onVnodeBeforeUpdate) && Ht(ae, b, m, d),
        ie && Dn(m, d, b, "beforeUpdate"),
        b && Mn(b, !0);
        const ue = D && m.type !== "foreignObject";
        if (Y ? T(d.dynamicChildren, Y, G, b, L, ue, j) : Q || fe(d, m, G, null, b, L, ue, j, !1),
        J > 0) {
            if (J & 16)
                I(G, m, R, $, b, L, D);
            else if (J & 2 && R.class !== $.class && o(G, "class", null, $.class, D),
            J & 4 && o(G, "style", R.style, $.style, D),
            J & 8) {
                const Se = m.dynamicProps;
                for (let Te = 0; Te < Se.length; Te++) {
                    const Ie = Se[Te]
                      , ut = R[Ie]
                      , Vt = $[Ie];
                    (Vt !== ut || Ie === "value") && o(G, Ie, ut, Vt, D, d.children, b, L, w)
                }
            }
            J & 1 && d.children !== m.children && c(G, m.children)
        } else
            !Q && Y == null && I(G, m, R, $, b, L, D);
        ((ae = $.onVnodeUpdated) || ie) && vt(()=>{
            ae && Ht(ae, b, m, d),
            ie && Dn(m, d, b, "updated")
        }
        , L)
    }
      , T = (d,m,b,L,D,j,Q)=>{
        for (let G = 0; G < m.length; G++) {
            const J = d[G]
              , Y = m[G]
              , ie = J.el && (J.type === ot || !Vn(J, Y) || J.shapeFlag & 70) ? f(J.el) : b;
            y(J, Y, ie, null, L, D, j, Q, !0)
        }
    }
      , I = (d,m,b,L,D,j,Q)=>{
        if (b !== L) {
            for (const G in L) {
                if (Go(G))
                    continue;
                const J = L[G]
                  , Y = b[G];
                J !== Y && G !== "value" && o(d, G, Y, J, Q, m.children, D, j, w)
            }
            if (b !== $e)
                for (const G in b)
                    !Go(G) && !(G in L) && o(d, G, b[G], null, Q, m.children, D, j, w);
            "value"in L && o(d, "value", b.value, L.value)
        }
    }
      , U = (d,m,b,L,D,j,Q,G,J)=>{
        const Y = m.el = d ? d.el : s("")
          , ie = m.anchor = d ? d.anchor : s("");
        let {patchFlag: R, dynamicChildren: $, slotScopeIds: ae} = m;
        ae && (G = G ? G.concat(ae) : ae),
        d == null ? (r(Y, b, L),
        r(ie, b, L),
        M(m.children, b, ie, D, j, Q, G, J)) : R > 0 && R & 64 && $ && d.dynamicChildren ? (T(d.dynamicChildren, $, b, D, j, Q, G),
        (m.key != null || D && m === D.subTree) && ks(d, m, !0)) : fe(d, m, b, ie, D, j, Q, G, J)
    }
      , ce = (d,m,b,L,D,j,Q,G,J)=>{
        m.slotScopeIds = G,
        d == null ? m.shapeFlag & 512 ? D.ctx.activate(m, b, L, Q, J) : me(m, b, L, D, j, Q, J) : K(d, m, J)
    }
      , me = (d,m,b,L,D,j,Q)=>{
        const G = d.component = ep(d, L, D);
        if (Ri(d) && (G.ctx.renderer = te),
        tp(G),
        G.asyncDep) {
            if (D && D.registerDep(G, ee),
            !d.el) {
                const J = G.subTree = k(Rt);
                _(null, J, m, b)
            }
            return
        }
        ee(G, d, m, b, D, j, Q)
    }
      , K = (d,m,b)=>{
        const L = m.component = d.component;
        if (gg(d, m, b))
            if (L.asyncDep && !L.asyncResolved) {
                re(L, m, b);
                return
            } else
                L.next = m,
                lg(L.update),
                L.update();
        else
            m.el = d.el,
            L.vnode = m
    }
      , ee = (d,m,b,L,D,j,Q)=>{
        const G = ()=>{
            if (d.isMounted) {
                let {next: ie, bu: R, u: $, parent: ae, vnode: ue} = d, Se = ie, Te;
                Mn(d, !1),
                ie ? (ie.el = ue.el,
                re(d, ie, Q)) : ie = ue,
                R && Xo(R),
                (Te = ie.props && ie.props.onVnodeBeforeUpdate) && Ht(Te, ae, ie, ue),
                Mn(d, !0);
                const Ie = Zi(d)
                  , ut = d.subTree;
                d.subTree = Ie,
                y(ut, Ie, f(ut.el), W(ut), d, D, j),
                ie.el = Ie.el,
                Se === null && pg(d, Ie.el),
                $ && vt($, D),
                (Te = ie.props && ie.props.onVnodeUpdated) && vt(()=>Ht(Te, ae, ie, ue), D)
            } else {
                let ie;
                const {el: R, props: $} = m
                  , {bm: ae, m: ue, parent: Se} = d
                  , Te = Jo(m);
                if (Mn(d, !1),
                ae && Xo(ae),
                !Te && (ie = $ && $.onVnodeBeforeMount) && Ht(ie, Se, m),
                Mn(d, !0),
                R && le) {
                    const Ie = ()=>{
                        d.subTree = Zi(d),
                        le(R, d.subTree, d, D, null)
                    }
                    ;
                    Te ? m.type.__asyncLoader().then(()=>!d.isUnmounted && Ie()) : Ie()
                } else {
                    const Ie = d.subTree = Zi(d);
                    y(null, Ie, b, L, d, D, j),
                    m.el = Ie.el
                }
                if (ue && vt(ue, D),
                !Te && (ie = $ && $.onVnodeMounted)) {
                    const Ie = m;
                    vt(()=>Ht(ie, Se, Ie), D)
                }
                (m.shapeFlag & 256 || Se && Jo(Se.vnode) && Se.vnode.shapeFlag & 256) && d.a && vt(d.a, D),
                d.isMounted = !0,
                m = b = L = null
            }
        }
          , J = d.effect = new vs(G,()=>cf(Y),d.scope)
          , Y = d.update = ()=>J.run();
        Y.id = d.uid,
        Mn(d, !0),
        Y()
    }
      , re = (d,m,b)=>{
        m.component = d;
        const L = d.vnode.props;
        d.vnode = m,
        d.next = null,
        Fg(d, m.props, L, b),
        Ug(d, m.children, b),
        kr(),
        ki(void 0, d.update),
        Ir()
    }
      , fe = (d,m,b,L,D,j,Q,G,J=!1)=>{
        const Y = d && d.children
          , ie = d ? d.shapeFlag : 0
          , R = m.children
          , {patchFlag: $, shapeFlag: ae} = m;
        if ($ > 0) {
            if ($ & 128) {
                H(Y, R, b, L, D, j, Q, G, J);
                return
            } else if ($ & 256) {
                Oe(Y, R, b, L, D, j, Q, G, J);
                return
            }
        }
        ae & 8 ? (ie & 16 && w(Y, D, j),
        R !== Y && c(b, R)) : ie & 16 ? ae & 16 ? H(Y, R, b, L, D, j, Q, G, J) : w(Y, D, j, !0) : (ie & 8 && c(b, ""),
        ae & 16 && M(R, b, L, D, j, Q, G, J))
    }
      , Oe = (d,m,b,L,D,j,Q,G,J)=>{
        d = d || hr,
        m = m || hr;
        const Y = d.length
          , ie = m.length
          , R = Math.min(Y, ie);
        let $;
        for ($ = 0; $ < R; $++) {
            const ae = m[$] = J ? Sn(m[$]) : zt(m[$]);
            y(d[$], ae, b, null, D, j, Q, G, J)
        }
        Y > ie ? w(d, D, j, !0, !1, R) : M(m, b, L, D, j, Q, G, J, R)
    }
      , H = (d,m,b,L,D,j,Q,G,J)=>{
        let Y = 0;
        const ie = m.length;
        let R = d.length - 1
          , $ = ie - 1;
        for (; Y <= R && Y <= $; ) {
            const ae = d[Y]
              , ue = m[Y] = J ? Sn(m[Y]) : zt(m[Y]);
            if (Vn(ae, ue))
                y(ae, ue, b, null, D, j, Q, G, J);
            else
                break;
            Y++
        }
        for (; Y <= R && Y <= $; ) {
            const ae = d[R]
              , ue = m[$] = J ? Sn(m[$]) : zt(m[$]);
            if (Vn(ae, ue))
                y(ae, ue, b, null, D, j, Q, G, J);
            else
                break;
            R--,
            $--
        }
        if (Y > R) {
            if (Y <= $) {
                const ae = $ + 1
                  , ue = ae < ie ? m[ae].el : L;
                for (; Y <= $; )
                    y(null, m[Y] = J ? Sn(m[Y]) : zt(m[Y]), b, ue, D, j, Q, G, J),
                    Y++
            }
        } else if (Y > $)
            for (; Y <= R; )
                q(d[Y], D, j, !0),
                Y++;
        else {
            const ae = Y
              , ue = Y
              , Se = new Map;
            for (Y = ue; Y <= $; Y++) {
                const ft = m[Y] = J ? Sn(m[Y]) : zt(m[Y]);
                ft.key != null && Se.set(ft.key, Y)
            }
            let Te, Ie = 0;
            const ut = $ - ue + 1;
            let Vt = !1
              , Fr = 0;
            const mn = new Array(ut);
            for (Y = 0; Y < ut; Y++)
                mn[Y] = 0;
            for (Y = ae; Y <= R; Y++) {
                const ft = d[Y];
                if (Ie >= ut) {
                    q(ft, D, j, !0);
                    continue
                }
                let Fe;
                if (ft.key != null)
                    Fe = Se.get(ft.key);
                else
                    for (Te = ue; Te <= $; Te++)
                        if (mn[Te - ue] === 0 && Vn(ft, m[Te])) {
                            Fe = Te;
                            break
                        }
                Fe === void 0 ? q(ft, D, j, !0) : (mn[Fe - ue] = Y + 1,
                Fe >= Fr ? Fr = Fe : Vt = !0,
                y(ft, m[Fe], b, null, D, j, Q, G, J),
                Ie++)
            }
            const $r = Vt ? zg(mn) : hr;
            for (Te = $r.length - 1,
            Y = ut - 1; Y >= 0; Y--) {
                const ft = ue + Y
                  , Fe = m[ft]
                  , ze = ft + 1 < ie ? m[ft + 1].el : L;
                mn[Y] === 0 ? y(null, Fe, b, ze, D, j, Q, G, J) : Vt && (Te < 0 || Y !== $r[Te] ? F(Fe, b, ze, 2) : Te--)
            }
        }
    }
      , F = (d,m,b,L,D=null)=>{
        const {el: j, type: Q, transition: G, children: J, shapeFlag: Y} = d;
        if (Y & 6) {
            F(d.component.subTree, m, b, L);
            return
        }
        if (Y & 128) {
            d.suspense.move(m, b, L);
            return
        }
        if (Y & 64) {
            Q.move(d, m, b, te);
            return
        }
        if (Q === ot) {
            r(j, m, b);
            for (let R = 0; R < J.length; R++)
                F(J[R], m, b, L);
            r(d.anchor, m, b);
            return
        }
        if (Q === ea) {
            S(d, m, b);
            return
        }
        if (L !== 2 && Y & 1 && G)
            if (L === 0)
                G.beforeEnter(j),
                r(j, m, b),
                vt(()=>G.enter(j), D);
            else {
                const {leave: R, delayLeave: $, afterLeave: ae} = G
                  , ue = ()=>r(j, m, b)
                  , Se = ()=>{
                    R(j, ()=>{
                        ue(),
                        ae && ae()
                    }
                    )
                }
                ;
                $ ? $(j, ue, Se) : Se()
            }
        else
            r(j, m, b)
    }
      , q = (d,m,b,L=!1,D=!1)=>{
        const {type: j, props: Q, ref: G, children: J, dynamicChildren: Y, shapeFlag: ie, patchFlag: R, dirs: $} = d;
        if (G != null && Aa(G, null, b, d, !0),
        ie & 256) {
            m.ctx.deactivate(d);
            return
        }
        const ae = ie & 1 && $
          , ue = !Jo(d);
        let Se;
        if (ue && (Se = Q && Q.onVnodeBeforeUnmount) && Ht(Se, m, d),
        ie & 6)
            V(d.component, b, L);
        else {
            if (ie & 128) {
                d.suspense.unmount(b, L);
                return
            }
            ae && Dn(d, null, m, "beforeUnmount"),
            ie & 64 ? d.type.remove(d, m, b, D, te, L) : Y && (j !== ot || R > 0 && R & 64) ? w(Y, m, b, !1, !0) : (j === ot && R & 384 || !D && ie & 16) && w(J, m, b),
            L && de(d)
        }
        (ue && (Se = Q && Q.onVnodeUnmounted) || ae) && vt(()=>{
            Se && Ht(Se, m, d),
            ae && Dn(d, null, m, "unmounted")
        }
        , b)
    }
      , de = d=>{
        const {type: m, el: b, anchor: L, transition: D} = d;
        if (m === ot) {
            P(b, L);
            return
        }
        if (m === ea) {
            A(d);
            return
        }
        const j = ()=>{
            i(b),
            D && !D.persisted && D.afterLeave && D.afterLeave()
        }
        ;
        if (d.shapeFlag & 1 && D && !D.persisted) {
            const {leave: Q, delayLeave: G} = D
              , J = ()=>Q(b, j);
            G ? G(d.el, j, J) : J()
        } else
            j()
    }
      , P = (d,m)=>{
        let b;
        for (; d !== m; )
            b = h(d),
            i(d),
            d = b;
        i(m)
    }
      , V = (d,m,b)=>{
        const {bum: L, scope: D, update: j, subTree: Q, um: G} = d;
        L && Xo(L),
        D.stop(),
        j && (j.active = !1,
        q(Q, d, m, b)),
        G && vt(G, m),
        vt(()=>{
            d.isUnmounted = !0
        }
        , m),
        m && m.pendingBranch && !m.isUnmounted && d.asyncDep && !d.asyncResolved && d.suspenseId === m.pendingId && (m.deps--,
        m.deps === 0 && m.resolve())
    }
      , w = (d,m,b,L=!1,D=!1,j=0)=>{
        for (let Q = j; Q < d.length; Q++)
            q(d[Q], m, b, L, D)
    }
      , W = d=>d.shapeFlag & 6 ? W(d.component.subTree) : d.shapeFlag & 128 ? d.suspense.next() : h(d.anchor || d.el)
      , X = (d,m,b)=>{
        d == null ? m._vnode && q(m._vnode, null, null, !0) : y(m._vnode || null, d, m, null, null, null, b),
        df(),
        m._vnode = d
    }
      , te = {
        p: y,
        um: q,
        m: F,
        r: de,
        mt: me,
        mc: M,
        pc: fe,
        pbc: T,
        n: W,
        o: e
    };
    let Z, le;
    return t && ([Z,le] = t(te)),
    {
        render: X,
        hydrate: Z,
        createApp: Hg(X, Z)
    }
}
function Mn({effect: e, update: t}, n) {
    e.allowRecurse = t.allowRecurse = n
}
function ks(e, t, n=!1) {
    const r = e.children
      , i = t.children;
    if (be(r) && be(i))
        for (let o = 0; o < r.length; o++) {
            const a = r[o];
            let s = i[o];
            s.shapeFlag & 1 && !s.dynamicChildren && ((s.patchFlag <= 0 || s.patchFlag === 32) && (s = i[o] = Sn(i[o]),
            s.el = a.el),
            n || ks(a, s))
        }
}
function zg(e) {
    const t = e.slice()
      , n = [0];
    let r, i, o, a, s;
    const l = e.length;
    for (r = 0; r < l; r++) {
        const u = e[r];
        if (u !== 0) {
            if (i = n[n.length - 1],
            e[i] < u) {
                t[r] = i,
                n.push(r);
                continue
            }
            for (o = 0,
            a = n.length - 1; o < a; )
                s = o + a >> 1,
                e[n[s]] < u ? o = s + 1 : a = s;
            u < e[n[o]] && (o > 0 && (t[r] = n[o - 1]),
            n[o] = r)
        }
    }
    for (o = n.length,
    a = n[o - 1]; o-- > 0; )
        n[o] = a,
        a = t[a];
    return n
}
const Kg = e=>e.__isTeleport
  , Zr = e=>e && (e.disabled || e.disabled === "")
  , Ol = e=>typeof SVGElement != "undefined" && e instanceof SVGElement
  , Na = (e,t)=>{
    const n = e && e.to;
    return et(n) ? t ? t(n) : null : n
}
  , Yg = {
    __isTeleport: !0,
    process(e, t, n, r, i, o, a, s, l, u) {
        const {mc: c, pc: f, pbc: h, o: {insert: p, querySelector: v, createText: E, createComment: y}} = u
          , g = Zr(t.props);
        let {shapeFlag: _, children: C, dynamicChildren: S} = t;
        if (e == null) {
            const A = t.el = E("")
              , N = t.anchor = E("");
            p(A, n, r),
            p(N, n, r);
            const x = t.target = Na(t.props, v)
              , O = t.targetAnchor = E("");
            x && (p(O, x),
            a = a || Ol(x));
            const M = (B,T)=>{
                _ & 16 && c(C, B, T, i, o, a, s, l)
            }
            ;
            g ? M(n, N) : x && M(x, O)
        } else {
            t.el = e.el;
            const A = t.anchor = e.anchor
              , N = t.target = e.target
              , x = t.targetAnchor = e.targetAnchor
              , O = Zr(e.props)
              , M = O ? n : N
              , B = O ? A : x;
            if (a = a || Ol(N),
            S ? (h(e.dynamicChildren, S, M, i, o, a, s),
            ks(e, t, !0)) : l || f(e, t, M, B, i, o, a, s, !1),
            g)
                O || Do(t, n, A, u, 1);
            else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
                const T = t.target = Na(t.props, v);
                T && Do(t, T, null, u, 0)
            } else
                O && Do(t, N, x, u, 1)
        }
    },
    remove(e, t, n, r, {um: i, o: {remove: o}}, a) {
        const {shapeFlag: s, children: l, anchor: u, targetAnchor: c, target: f, props: h} = e;
        if (f && o(c),
        (a || !Zr(h)) && (o(u),
        s & 16))
            for (let p = 0; p < l.length; p++) {
                const v = l[p];
                i(v, t, n, !0, !!v.dynamicChildren)
            }
    },
    move: Do,
    hydrate: qg
};
function Do(e, t, n, {o: {insert: r}, m: i}, o=2) {
    o === 0 && r(e.targetAnchor, t, n);
    const {el: a, anchor: s, shapeFlag: l, children: u, props: c} = e
      , f = o === 2;
    if (f && r(a, t, n),
    (!f || Zr(c)) && l & 16)
        for (let h = 0; h < u.length; h++)
            i(u[h], t, n, 2);
    f && r(s, t, n)
}
function qg(e, t, n, r, i, o, {o: {nextSibling: a, parentNode: s, querySelector: l}}, u) {
    const c = t.target = Na(t.props, l);
    if (c) {
        const f = c._lpa || c.firstChild;
        if (t.shapeFlag & 16)
            if (Zr(t.props))
                t.anchor = u(a(e), t, s(e), n, r, i, o),
                t.targetAnchor = f;
            else {
                t.anchor = a(e);
                let h = f;
                for (; h; )
                    if (h = a(h),
                    h && h.nodeType === 8 && h.data === "teleport anchor") {
                        t.targetAnchor = h,
                        c._lpa = t.targetAnchor && a(t.targetAnchor);
                        break
                    }
                u(f, t, c, n, r, i, o)
            }
    }
    return t.anchor && a(t.anchor)
}
const xf = Yg
  , ot = Symbol(void 0)
  , Ai = Symbol(void 0)
  , Rt = Symbol(void 0)
  , ea = Symbol(void 0)
  , Qr = [];
let xt = null;
function Df(e=!1) {
    Qr.push(xt = e ? null : [])
}
function Gg() {
    Qr.pop(),
    xt = Qr[Qr.length - 1] || null
}
let fo = 1;
function kl(e) {
    fo += e
}
function Mf(e) {
    return e.dynamicChildren = fo > 0 ? xt || hr : null,
    Gg(),
    fo > 0 && xt && xt.push(e),
    e
}
function hC(e, t, n, r, i, o) {
    return Mf(Bf(e, t, n, r, i, o, !0))
}
function Ff(e, t, n, r, i) {
    return Mf(k(e, t, n, r, i, !0))
}
function di(e) {
    return e ? e.__v_isVNode === !0 : !1
}
function Vn(e, t) {
    return e.type === t.type && e.key === t.key
}
const Ni = "__vInternal"
  , $f = ({key: e})=>e != null ? e : null
  , Zo = ({ref: e, ref_key: t, ref_for: n})=>e != null ? et(e) || Ze(e) || we(e) ? {
    i: Ot,
    r: e,
    k: t,
    f: !!n
} : e : null;
function Bf(e, t=null, n=null, r=0, i=null, o=e === ot ? 0 : 1, a=!1, s=!1) {
    const l = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && $f(t),
        ref: t && Zo(t),
        scopeId: gf,
        slotScopeIds: null,
        children: n,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag: o,
        patchFlag: r,
        dynamicProps: i,
        dynamicChildren: null,
        appContext: null
    };
    return s ? (Is(l, n),
    o & 128 && e.normalize(l)) : n && (l.shapeFlag |= et(n) ? 8 : 16),
    fo > 0 && !a && xt && (l.patchFlag > 0 || o & 6) && l.patchFlag !== 32 && xt.push(l),
    l
}
const k = Xg;
function Xg(e, t=null, n=null, r=0, i=null, o=!1) {
    if ((!e || e === Ig) && (e = Rt),
    di(e)) {
        const s = Ln(e, t, !0);
        return n && Is(s, n),
        fo > 0 && !o && xt && (s.shapeFlag & 6 ? xt[xt.indexOf(e)] = s : xt.push(s)),
        s.patchFlag |= -2,
        s
    }
    if (ap(e) && (e = e.__vccOpts),
    t) {
        t = Jg(t);
        let {class: s, style: l} = t;
        s && !et(s) && (t.class = fs(s)),
        Ye(l) && (ef(l) && !be(l) && (l = nt({}, l)),
        t.style = us(l))
    }
    const a = et(e) ? 1 : vg(e) ? 128 : Kg(e) ? 64 : Ye(e) ? 4 : we(e) ? 2 : 0;
    return Bf(e, t, n, r, i, a, o, !0)
}
function Jg(e) {
    return e ? ef(e) || Ni in e ? nt({}, e) : e : null
}
function Ln(e, t, n=!1) {
    const {props: r, ref: i, patchFlag: o, children: a} = e
      , s = t ? qe(r || {}, t) : r;
    return {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e.type,
        props: s,
        key: s && $f(s),
        ref: t && t.ref ? n && i ? be(i) ? i.concat(Zo(t)) : [i, Zo(t)] : Zo(t) : i,
        scopeId: e.scopeId,
        slotScopeIds: e.slotScopeIds,
        children: a,
        target: e.target,
        targetAnchor: e.targetAnchor,
        staticCount: e.staticCount,
        shapeFlag: e.shapeFlag,
        patchFlag: t && e.type !== ot ? o === -1 ? 16 : o | 16 : o,
        dynamicProps: e.dynamicProps,
        dynamicChildren: e.dynamicChildren,
        appContext: e.appContext,
        dirs: e.dirs,
        transition: e.transition,
        component: e.component,
        suspense: e.suspense,
        ssContent: e.ssContent && Ln(e.ssContent),
        ssFallback: e.ssFallback && Ln(e.ssFallback),
        el: e.el,
        anchor: e.anchor
    }
}
function Uf(e=" ", t=0) {
    return k(Ai, null, e, t)
}
function gC(e="", t=!1) {
    return t ? (Df(),
    Ff(Rt, null, e)) : k(Rt, null, e)
}
function zt(e) {
    return e == null || typeof e == "boolean" ? k(Rt) : be(e) ? k(ot, null, e.slice()) : typeof e == "object" ? Sn(e) : k(Ai, null, String(e))
}
function Sn(e) {
    return e.el === null || e.memo ? e : Ln(e)
}
function Is(e, t) {
    let n = 0;
    const {shapeFlag: r} = e;
    if (t == null)
        t = null;
    else if (be(t))
        n = 16;
    else if (typeof t == "object")
        if (r & 65) {
            const i = t.default;
            i && (i._c && (i._d = !1),
            Is(e, i()),
            i._c && (i._d = !0));
            return
        } else {
            n = 32;
            const i = t._;
            !i && !(Ni in t) ? t._ctx = Ot : i === 3 && Ot && (Ot.slots._ === 1 ? t._ = 1 : (t._ = 2,
            e.patchFlag |= 1024))
        }
    else
        we(t) ? (t = {
            default: t,
            _ctx: Ot
        },
        n = 32) : (t = String(t),
        r & 64 ? (n = 16,
        t = [Uf(t)]) : n = 8);
    e.children = t,
    e.shapeFlag |= n
}
function qe(...e) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
        const r = e[n];
        for (const i in r)
            if (i === "class")
                t.class !== r.class && (t.class = fs([t.class, r.class]));
            else if (i === "style")
                t.style = us([t.style, r.style]);
            else if (Ei(i)) {
                const o = t[i]
                  , a = r[i];
                a && o !== a && !(be(o) && o.includes(a)) && (t[i] = o ? [].concat(o, a) : a)
            } else
                i !== "" && (t[i] = r[i])
    }
    return t
}
function Ht(e, t, n, r=null) {
    Pt(e, t, 7, [n, r])
}
const Zg = Nf();
let Qg = 0;
function ep(e, t, n) {
    const r = e.type
      , i = (t ? t.appContext : e.appContext) || Zg
      , o = {
        uid: Qg++,
        vnode: e,
        type: r,
        parent: t,
        appContext: i,
        root: null,
        next: null,
        subTree: null,
        effect: null,
        update: null,
        scope: new Hu(!0),
        render: null,
        proxy: null,
        exposed: null,
        exposeProxy: null,
        withProxy: null,
        provides: t ? t.provides : Object.create(i.provides),
        accessCache: null,
        renderCache: [],
        components: null,
        directives: null,
        propsOptions: Pf(r, i),
        emitsOptions: hf(r, i),
        emit: null,
        emitted: null,
        propsDefaults: $e,
        inheritAttrs: r.inheritAttrs,
        ctx: $e,
        data: $e,
        props: $e,
        attrs: $e,
        slots: $e,
        refs: $e,
        setupState: $e,
        setupContext: null,
        suspense: n,
        suspenseId: n ? n.pendingId : 0,
        asyncDep: null,
        asyncResolved: !1,
        isMounted: !1,
        isUnmounted: !1,
        isDeactivated: !1,
        bc: null,
        c: null,
        bm: null,
        m: null,
        bu: null,
        u: null,
        um: null,
        bum: null,
        da: null,
        a: null,
        rtg: null,
        rtc: null,
        ec: null,
        sp: null
    };
    return o.ctx = {
        _: o
    },
    o.root = t ? t.root : o,
    o.emit = fg.bind(null, o),
    e.ce && e.ce(o),
    o
}
let tt = null;
const ct = ()=>tt || Ot
  , br = e=>{
    tt = e,
    e.scope.on()
}
  , Kn = ()=>{
    tt && tt.scope.off(),
    tt = null
}
;
function Vf(e) {
    return e.vnode.shapeFlag & 4
}
let mo = !1;
function tp(e, t=!1) {
    mo = t;
    const {props: n, children: r} = e.vnode
      , i = Vf(e);
    Mg(e, n, i, t),
    Bg(e, r);
    const o = i ? np(e, t) : void 0;
    return mo = !1,
    o
}
function np(e, t) {
    const n = e.type;
    e.accessCache = Object.create(null),
    e.proxy = tf(new Proxy(e.ctx,Rg));
    const {setup: r} = n;
    if (r) {
        const i = e.setupContext = r.length > 1 ? op(e) : null;
        br(e),
        kr();
        const o = In(r, e, 0, [e.props, i]);
        if (Ir(),
        Kn(),
        Bu(o)) {
            if (o.then(Kn, Kn),
            t)
                return o.then(a=>{
                    Il(e, a, t)
                }
                ).catch(a=>{
                    Oi(a, e, 0)
                }
                );
            e.asyncDep = o
        } else
            Il(e, o, t)
    } else
        Hf(e, t)
}
function Il(e, t, n) {
    we(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Ye(t) && (e.setupState = sf(t)),
    Hf(e, n)
}
let Pl;
function Hf(e, t, n) {
    const r = e.type;
    if (!e.render) {
        if (!t && Pl && !r.render) {
            const i = r.template;
            if (i) {
                const {isCustomElement: o, compilerOptions: a} = e.appContext.config
                  , {delimiters: s, compilerOptions: l} = r
                  , u = nt(nt({
                    isCustomElement: o,
                    delimiters: s
                }, a), l);
                r.render = Pl(i, u)
            }
        }
        e.render = r.render || Dt
    }
    br(e),
    kr(),
    Lg(e),
    Ir(),
    Kn()
}
function rp(e) {
    return new Proxy(e.attrs,{
        get(t, n) {
            return wt(e, "get", "$attrs"),
            t[n]
        }
    })
}
function op(e) {
    const t = r=>{
        e.exposed = r || {}
    }
    ;
    let n;
    return {
        get attrs() {
            return n || (n = rp(e))
        },
        slots: e.slots,
        emit: e.emit,
        expose: t
    }
}
function xi(e) {
    if (e.exposed)
        return e.exposeProxy || (e.exposeProxy = new Proxy(sf(tf(e.exposed)),{
            get(t, n) {
                if (n in t)
                    return t[n];
                if (n in ui)
                    return ui[n](e)
            }
        }))
}
function ip(e, t=!0) {
    return we(e) ? e.displayName || e.name : e.name || t && e.__name
}
function ap(e) {
    return we(e) && "__vccOpts"in e
}
const ne = (e,t)=>ig(e, t, mo);
function wo(e, t, n) {
    const r = arguments.length;
    return r === 2 ? Ye(t) && !be(t) ? di(t) ? k(e, null, [t]) : k(e, t) : k(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && di(n) && (n = [n]),
    k(e, t, n))
}
const sp = "3.2.37"
  , lp = "http://www.w3.org/2000/svg"
  , Hn = typeof document != "undefined" ? document : null
  , Rl = Hn && Hn.createElement("template")
  , cp = {
    insert: (e,t,n)=>{
        t.insertBefore(e, n || null)
    }
    ,
    remove: e=>{
        const t = e.parentNode;
        t && t.removeChild(e)
    }
    ,
    createElement: (e,t,n,r)=>{
        const i = t ? Hn.createElementNS(lp, e) : Hn.createElement(e, n ? {
            is: n
        } : void 0);
        return e === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple),
        i
    }
    ,
    createText: e=>Hn.createTextNode(e),
    createComment: e=>Hn.createComment(e),
    setText: (e,t)=>{
        e.nodeValue = t
    }
    ,
    setElementText: (e,t)=>{
        e.textContent = t
    }
    ,
    parentNode: e=>e.parentNode,
    nextSibling: e=>e.nextSibling,
    querySelector: e=>Hn.querySelector(e),
    setScopeId(e, t) {
        e.setAttribute(t, "")
    },
    cloneNode(e) {
        const t = e.cloneNode(!0);
        return "_value"in e && (t._value = e._value),
        t
    },
    insertStaticContent(e, t, n, r, i, o) {
        const a = n ? n.previousSibling : t.lastChild;
        if (i && (i === o || i.nextSibling))
            for (; t.insertBefore(i.cloneNode(!0), n),
            !(i === o || !(i = i.nextSibling)); )
                ;
        else {
            Rl.innerHTML = r ? `<svg>${e}</svg>` : e;
            const s = Rl.content;
            if (r) {
                const l = s.firstChild;
                for (; l.firstChild; )
                    s.appendChild(l.firstChild);
                s.removeChild(l)
            }
            t.insertBefore(s, n)
        }
        return [a ? a.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
    }
};
function up(e, t, n) {
    const r = e._vtc;
    r && (t = (t ? [t, ...r] : [...r]).join(" ")),
    t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t
}
function fp(e, t, n) {
    const r = e.style
      , i = et(n);
    if (n && !i) {
        for (const o in n)
            xa(r, o, n[o]);
        if (t && !et(t))
            for (const o in t)
                n[o] == null && xa(r, o, "")
    } else {
        const o = r.display;
        i ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"),
        "_vod"in e && (r.display = o)
    }
}
const Ll = /\s*!important$/;
function xa(e, t, n) {
    if (be(n))
        n.forEach(r=>xa(e, t, r));
    else if (n == null && (n = ""),
    t.startsWith("--"))
        e.setProperty(t, n);
    else {
        const r = dp(e, t);
        Ll.test(n) ? e.setProperty(Jn(r), n.replace(Ll, ""), "important") : e[r] = n
    }
}
const Al = ["Webkit", "Moz", "ms"]
  , ta = {};
function dp(e, t) {
    const n = ta[t];
    if (n)
        return n;
    let r = Yt(t);
    if (r !== "filter" && r in e)
        return ta[t] = r;
    r = Ti(r);
    for (let i = 0; i < Al.length; i++) {
        const o = Al[i] + r;
        if (o in e)
            return ta[t] = o
    }
    return t
}
const Nl = "http://www.w3.org/1999/xlink";
function mp(e, t, n, r, i) {
    if (r && t.startsWith("xlink:"))
        n == null ? e.removeAttributeNS(Nl, t.slice(6, t.length)) : e.setAttributeNS(Nl, t, n);
    else {
        const o = gh(t);
        n == null || o && !Mu(n) ? e.removeAttribute(t) : e.setAttribute(t, o ? "" : n)
    }
}
function hp(e, t, n, r, i, o, a) {
    if (t === "innerHTML" || t === "textContent") {
        r && a(r, i, o),
        e[t] = n == null ? "" : n;
        return
    }
    if (t === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) {
        e._value = n;
        const l = n == null ? "" : n;
        (e.value !== l || e.tagName === "OPTION") && (e.value = l),
        n == null && e.removeAttribute(t);
        return
    }
    let s = !1;
    if (n === "" || n == null) {
        const l = typeof e[t];
        l === "boolean" ? n = Mu(n) : n == null && l === "string" ? (n = "",
        s = !0) : l === "number" && (n = 0,
        s = !0)
    }
    try {
        e[t] = n
    } catch {}
    s && e.removeAttribute(t)
}
const [Wf,gp] = (()=>{
    let e = Date.now
      , t = !1;
    if (typeof window != "undefined") {
        Date.now() > document.createEvent("Event").timeStamp && (e = performance.now.bind(performance));
        const n = navigator.userAgent.match(/firefox\/(\d+)/i);
        t = !!(n && Number(n[1]) <= 53)
    }
    return [e, t]
}
)();
let Da = 0;
const pp = Promise.resolve()
  , vp = ()=>{
    Da = 0
}
  , bp = ()=>Da || (pp.then(vp),
Da = Wf());
function ur(e, t, n, r) {
    e.addEventListener(t, n, r)
}
function yp(e, t, n, r) {
    e.removeEventListener(t, n, r)
}
function _p(e, t, n, r, i=null) {
    const o = e._vei || (e._vei = {})
      , a = o[t];
    if (r && a)
        a.value = r;
    else {
        const [s,l] = Ep(t);
        if (r) {
            const u = o[t] = wp(r, i);
            ur(e, s, u, l)
        } else
            a && (yp(e, s, a, l),
            o[t] = void 0)
    }
}
const xl = /(?:Once|Passive|Capture)$/;
function Ep(e) {
    let t;
    if (xl.test(e)) {
        t = {};
        let n;
        for (; n = e.match(xl); )
            e = e.slice(0, e.length - n[0].length),
            t[n[0].toLowerCase()] = !0
    }
    return [Jn(e.slice(2)), t]
}
function wp(e, t) {
    const n = r=>{
        const i = r.timeStamp || Wf();
        (gp || i >= n.attached - 1) && Pt(Sp(r, n.value), t, 5, [r])
    }
    ;
    return n.value = e,
    n.attached = bp(),
    n
}
function Sp(e, t) {
    if (be(t)) {
        const n = e.stopImmediatePropagation;
        return e.stopImmediatePropagation = ()=>{
            n.call(e),
            e._stopped = !0
        }
        ,
        t.map(r=>i=>!i._stopped && r && r(i))
    } else
        return t
}
const Dl = /^on[a-z]/
  , Tp = (e,t,n,r,i=!1,o,a,s,l)=>{
    t === "class" ? up(e, r, i) : t === "style" ? fp(e, n, r) : Ei(t) ? ds(t) || _p(e, t, n, r, a) : (t[0] === "." ? (t = t.slice(1),
    !0) : t[0] === "^" ? (t = t.slice(1),
    !1) : Cp(e, t, r, i)) ? hp(e, t, r, o, a, s, l) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r),
    mp(e, t, r, i))
}
;
function Cp(e, t, n, r) {
    return r ? !!(t === "innerHTML" || t === "textContent" || t in e && Dl.test(t) && we(n)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || Dl.test(t) && et(n) ? !1 : t in e
}
const gn = "transition"
  , Br = "animation"
  , So = (e,{slots: t})=>wo(bf, zf(e), t);
So.displayName = "Transition";
const jf = {
    name: String,
    type: String,
    css: {
        type: Boolean,
        default: !0
    },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String
}
  , Op = So.props = nt({}, bf.props, jf)
  , Fn = (e,t=[])=>{
    be(e) ? e.forEach(n=>n(...t)) : e && e(...t)
}
  , Ml = e=>e ? be(e) ? e.some(t=>t.length > 1) : e.length > 1 : !1;
function zf(e) {
    const t = {};
    for (const I in e)
        I in jf || (t[I] = e[I]);
    if (e.css === !1)
        return t;
    const {name: n="v", type: r, duration: i, enterFromClass: o=`${n}-enter-from`, enterActiveClass: a=`${n}-enter-active`, enterToClass: s=`${n}-enter-to`, appearFromClass: l=o, appearActiveClass: u=a, appearToClass: c=s, leaveFromClass: f=`${n}-leave-from`, leaveActiveClass: h=`${n}-leave-active`, leaveToClass: p=`${n}-leave-to`} = e
      , v = kp(i)
      , E = v && v[0]
      , y = v && v[1]
      , {onBeforeEnter: g, onEnter: _, onEnterCancelled: C, onLeave: S, onLeaveCancelled: A, onBeforeAppear: N=g, onAppear: x=_, onAppearCancelled: O=C} = t
      , M = (I,U,ce)=>{
        wn(I, U ? c : s),
        wn(I, U ? u : a),
        ce && ce()
    }
      , B = (I,U)=>{
        I._isLeaving = !1,
        wn(I, f),
        wn(I, p),
        wn(I, h),
        U && U()
    }
      , T = I=>(U,ce)=>{
        const me = I ? x : _
          , K = ()=>M(U, I, ce);
        Fn(me, [U, K]),
        Fl(()=>{
            wn(U, I ? l : o),
            Qt(U, I ? c : s),
            Ml(me) || $l(U, r, E, K)
        }
        )
    }
    ;
    return nt(t, {
        onBeforeEnter(I) {
            Fn(g, [I]),
            Qt(I, o),
            Qt(I, a)
        },
        onBeforeAppear(I) {
            Fn(N, [I]),
            Qt(I, l),
            Qt(I, u)
        },
        onEnter: T(!1),
        onAppear: T(!0),
        onLeave(I, U) {
            I._isLeaving = !0;
            const ce = ()=>B(I, U);
            Qt(I, f),
            Yf(),
            Qt(I, h),
            Fl(()=>{
                !I._isLeaving || (wn(I, f),
                Qt(I, p),
                Ml(S) || $l(I, r, y, ce))
            }
            ),
            Fn(S, [I, ce])
        },
        onEnterCancelled(I) {
            M(I, !1),
            Fn(C, [I])
        },
        onAppearCancelled(I) {
            M(I, !0),
            Fn(O, [I])
        },
        onLeaveCancelled(I) {
            B(I),
            Fn(A, [I])
        }
    })
}
function kp(e) {
    if (e == null)
        return null;
    if (Ye(e))
        return [na(e.enter), na(e.leave)];
    {
        const t = na(e);
        return [t, t]
    }
}
function na(e) {
    return si(e)
}
function Qt(e, t) {
    t.split(/\s+/).forEach(n=>n && e.classList.add(n)),
    (e._vtc || (e._vtc = new Set)).add(t)
}
function wn(e, t) {
    t.split(/\s+/).forEach(r=>r && e.classList.remove(r));
    const {_vtc: n} = e;
    n && (n.delete(t),
    n.size || (e._vtc = void 0))
}
function Fl(e) {
    requestAnimationFrame(()=>{
        requestAnimationFrame(e)
    }
    )
}
let Ip = 0;
function $l(e, t, n, r) {
    const i = e._endId = ++Ip
      , o = ()=>{
        i === e._endId && r()
    }
    ;
    if (n)
        return setTimeout(o, n);
    const {type: a, timeout: s, propCount: l} = Kf(e, t);
    if (!a)
        return r();
    const u = a + "end";
    let c = 0;
    const f = ()=>{
        e.removeEventListener(u, h),
        o()
    }
      , h = p=>{
        p.target === e && ++c >= l && f()
    }
    ;
    setTimeout(()=>{
        c < l && f()
    }
    , s + 1),
    e.addEventListener(u, h)
}
function Kf(e, t) {
    const n = window.getComputedStyle(e)
      , r = v=>(n[v] || "").split(", ")
      , i = r(gn + "Delay")
      , o = r(gn + "Duration")
      , a = Bl(i, o)
      , s = r(Br + "Delay")
      , l = r(Br + "Duration")
      , u = Bl(s, l);
    let c = null
      , f = 0
      , h = 0;
    t === gn ? a > 0 && (c = gn,
    f = a,
    h = o.length) : t === Br ? u > 0 && (c = Br,
    f = u,
    h = l.length) : (f = Math.max(a, u),
    c = f > 0 ? a > u ? gn : Br : null,
    h = c ? c === gn ? o.length : l.length : 0);
    const p = c === gn && /\b(transform|all)(,|$)/.test(n[gn + "Property"]);
    return {
        type: c,
        timeout: f,
        propCount: h,
        hasTransform: p
    }
}
function Bl(e, t) {
    for (; e.length < t.length; )
        e = e.concat(e);
    return Math.max(...t.map((n,r)=>Ul(n) + Ul(e[r])))
}
function Ul(e) {
    return Number(e.slice(0, -1).replace(",", ".")) * 1e3
}
function Yf() {
    return document.body.offsetHeight
}
const qf = new WeakMap
  , Gf = new WeakMap
  , Pp = {
    name: "TransitionGroup",
    props: nt({}, Op, {
        tag: String,
        moveClass: String
    }),
    setup(e, {slots: t}) {
        const n = ct()
          , r = vf();
        let i, o;
        return Sf(()=>{
            if (!i.length)
                return;
            const a = e.moveClass || `${e.name || "v"}-move`;
            if (!Np(i[0].el, n.vnode.el, a))
                return;
            i.forEach(Rp),
            i.forEach(Lp);
            const s = i.filter(Ap);
            Yf(),
            s.forEach(l=>{
                const u = l.el
                  , c = u.style;
                Qt(u, a),
                c.transform = c.webkitTransform = c.transitionDuration = "";
                const f = u._moveCb = h=>{
                    h && h.target !== u || (!h || /transform$/.test(h.propertyName)) && (u.removeEventListener("transitionend", f),
                    u._moveCb = null,
                    wn(u, a))
                }
                ;
                u.addEventListener("transitionend", f)
            }
            )
        }
        ),
        ()=>{
            const a = Le(e)
              , s = zf(a);
            let l = a.tag || ot;
            i = o,
            o = t.default ? Cs(t.default()) : [];
            for (let u = 0; u < o.length; u++) {
                const c = o[u];
                c.key != null && uo(c, co(c, s, r, n))
            }
            if (i)
                for (let u = 0; u < i.length; u++) {
                    const c = i[u];
                    uo(c, co(c, s, r, n)),
                    qf.set(c, c.el.getBoundingClientRect())
                }
            return k(l, null, o)
        }
    }
}
  , pC = Pp;
function Rp(e) {
    const t = e.el;
    t._moveCb && t._moveCb(),
    t._enterCb && t._enterCb()
}
function Lp(e) {
    Gf.set(e, e.el.getBoundingClientRect())
}
function Ap(e) {
    const t = qf.get(e)
      , n = Gf.get(e)
      , r = t.left - n.left
      , i = t.top - n.top;
    if (r || i) {
        const o = e.el.style;
        return o.transform = o.webkitTransform = `translate(${r}px,${i}px)`,
        o.transitionDuration = "0s",
        e
    }
}
function Np(e, t, n) {
    const r = e.cloneNode();
    e._vtc && e._vtc.forEach(a=>{
        a.split(/\s+/).forEach(s=>s && r.classList.remove(s))
    }
    ),
    n.split(/\s+/).forEach(a=>a && r.classList.add(a)),
    r.style.display = "none";
    const i = t.nodeType === 1 ? t : t.parentNode;
    i.appendChild(r);
    const {hasTransform: o} = Kf(r);
    return i.removeChild(r),
    o
}
const Vl = e=>{
    const t = e.props["onUpdate:modelValue"] || !1;
    return be(t) ? n=>Xo(t, n) : t
}
;
function xp(e) {
    e.target.composing = !0
}
function Hl(e) {
    const t = e.target;
    t.composing && (t.composing = !1,
    t.dispatchEvent(new Event("input")))
}
const vC = {
    created(e, {modifiers: {lazy: t, trim: n, number: r}}, i) {
        e._assign = Vl(i);
        const o = r || i.props && i.props.type === "number";
        ur(e, t ? "change" : "input", a=>{
            if (a.target.composing)
                return;
            let s = e.value;
            n && (s = s.trim()),
            o && (s = si(s)),
            e._assign(s)
        }
        ),
        n && ur(e, "change", ()=>{
            e.value = e.value.trim()
        }
        ),
        t || (ur(e, "compositionstart", xp),
        ur(e, "compositionend", Hl),
        ur(e, "change", Hl))
    },
    mounted(e, {value: t}) {
        e.value = t == null ? "" : t
    },
    beforeUpdate(e, {value: t, modifiers: {lazy: n, trim: r, number: i}}, o) {
        if (e._assign = Vl(o),
        e.composing || document.activeElement === e && e.type !== "range" && (n || r && e.value.trim() === t || (i || e.type === "number") && si(e.value) === t))
            return;
        const a = t == null ? "" : t;
        e.value !== a && (e.value = a)
    }
}
  , Dp = ["ctrl", "shift", "alt", "meta"]
  , Mp = {
    stop: e=>e.stopPropagation(),
    prevent: e=>e.preventDefault(),
    self: e=>e.target !== e.currentTarget,
    ctrl: e=>!e.ctrlKey,
    shift: e=>!e.shiftKey,
    alt: e=>!e.altKey,
    meta: e=>!e.metaKey,
    left: e=>"button"in e && e.button !== 0,
    middle: e=>"button"in e && e.button !== 1,
    right: e=>"button"in e && e.button !== 2,
    exact: (e,t)=>Dp.some(n=>e[`${n}Key`] && !t.includes(n))
}
  , bC = (e,t)=>(n,...r)=>{
    for (let i = 0; i < t.length; i++) {
        const o = Mp[t[i]];
        if (o && o(n, t))
            return
    }
    return e(n, ...r)
}
  , Fp = {
    esc: "escape",
    space: " ",
    up: "arrow-up",
    left: "arrow-left",
    right: "arrow-right",
    down: "arrow-down",
    delete: "backspace"
}
  , $p = (e,t)=>n=>{
    if (!("key"in n))
        return;
    const r = Jn(n.key);
    if (t.some(i=>i === r || Fp[i] === r))
        return e(n)
}
  , Pn = {
    beforeMount(e, {value: t}, {transition: n}) {
        e._vod = e.style.display === "none" ? "" : e.style.display,
        n && t ? n.beforeEnter(e) : Ur(e, t)
    },
    mounted(e, {value: t}, {transition: n}) {
        n && t && n.enter(e)
    },
    updated(e, {value: t, oldValue: n}, {transition: r}) {
        !t != !n && (r ? t ? (r.beforeEnter(e),
        Ur(e, !0),
        r.enter(e)) : r.leave(e, ()=>{
            Ur(e, !1)
        }
        ) : Ur(e, t))
    },
    beforeUnmount(e, {value: t}) {
        Ur(e, t)
    }
};
function Ur(e, t) {
    e.style.display = t ? e._vod : "none"
}
const Bp = nt({
    patchProp: Tp
}, cp);
let Wl;
function Up() {
    return Wl || (Wl = Wg(Bp))
}
const Xf = (...e)=>{
    const t = Up().createApp(...e)
      , {mount: n} = t;
    return t.mount = r=>{
        const i = Vp(r);
        if (!i)
            return;
        const o = t._component;
        !we(o) && !o.render && !o.template && (o.template = i.innerHTML),
        i.innerHTML = "";
        const a = n(i, !1, i instanceof SVGElement);
        return i instanceof Element && (i.removeAttribute("v-cloak"),
        i.setAttribute("data-v-app", "")),
        a
    }
    ,
    t
}
;
function Vp(e) {
    return et(e) ? document.querySelector(e) : e
}
/*!
  * shared v9.6.4
  * (c) 2023 kazuya kawaguchi
  * Released under the MIT License.
  */
const Ma = typeof window != "undefined"
  , dn = (e,t=!1)=>t ? Symbol.for(e) : Symbol(e)
  , Hp = (e,t,n)=>Wp({
    l: e,
    k: t,
    s: n
})
  , Wp = e=>JSON.stringify(e).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027")
  , Je = e=>typeof e == "number" && isFinite(e)
  , jp = e=>Zf(e) === "[object Date]"
  , An = e=>Zf(e) === "[object RegExp]"
  , Di = e=>ye(e) && Object.keys(e).length === 0
  , it = Object.assign;
let jl;
const tn = ()=>jl || (jl = typeof globalThis != "undefined" ? globalThis : typeof self != "undefined" ? self : typeof window != "undefined" ? window : typeof global != "undefined" ? global : {});
function zl(e) {
    return e.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;")
}
const zp = Object.prototype.hasOwnProperty;
function ho(e, t) {
    return zp.call(e, t)
}
const Ve = Array.isArray
  , je = e=>typeof e == "function"
  , se = e=>typeof e == "string"
  , Ce = e=>typeof e == "boolean"
  , De = e=>e !== null && typeof e == "object"
  , Jf = Object.prototype.toString
  , Zf = e=>Jf.call(e)
  , ye = e=>{
    if (!De(e))
        return !1;
    const t = Object.getPrototypeOf(e);
    return t === null || t.constructor === Object
}
  , Kp = e=>e == null ? "" : Ve(e) || ye(e) && e.toString === Jf ? JSON.stringify(e, null, 2) : String(e);
function Yp(e, t="") {
    return e.reduce((n,r,i)=>i === 0 ? n + r : n + t + r, "")
}
function Ps(e) {
    let t = e;
    return ()=>++t
}
function qp(e, t) {
    typeof console != "undefined" && (console.warn("[intlify] " + e),
    t && console.warn(t.stack))
}
/*!
  * message-compiler v9.6.4
  * (c) 2023 kazuya kawaguchi
  * Released under the MIT License.
  */
function Gp(e, t, n) {
    return {
        line: e,
        column: t,
        offset: n
    }
}
function Fa(e, t, n) {
    const r = {
        start: e,
        end: t
    };
    return n != null && (r.source = n),
    r
}
const Xp = /\{([0-9a-zA-Z]+)\}/g;
function Jp(e, ...t) {
    return t.length === 1 && Zp(t[0]) && (t = t[0]),
    (!t || !t.hasOwnProperty) && (t = {}),
    e.replace(Xp, (n,r)=>t.hasOwnProperty(r) ? t[r] : "")
}
const Qf = Object.assign
  , Kl = e=>typeof e == "string"
  , Zp = e=>e !== null && typeof e == "object";
function ed(e, t="") {
    return e.reduce((n,r,i)=>i === 0 ? n + r : n + t + r, "")
}
const pe = {
    EXPECTED_TOKEN: 1,
    INVALID_TOKEN_IN_PLACEHOLDER: 2,
    UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
    UNKNOWN_ESCAPE_SEQUENCE: 4,
    INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
    UNBALANCED_CLOSING_BRACE: 6,
    UNTERMINATED_CLOSING_BRACE: 7,
    EMPTY_PLACEHOLDER: 8,
    NOT_ALLOW_NEST_PLACEHOLDER: 9,
    INVALID_LINKED_FORMAT: 10,
    MUST_HAVE_MESSAGES_IN_PLURAL: 11,
    UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
    UNEXPECTED_EMPTY_LINKED_KEY: 13,
    UNEXPECTED_LEXICAL_ANALYSIS: 14,
    UNHANDLED_CODEGEN_NODE_TYPE: 15,
    UNHANDLED_MINIFIER_NODE_TYPE: 16,
    __EXTEND_POINT__: 17
}
  , Qp = {
    [pe.EXPECTED_TOKEN]: "Expected token: '{0}'",
    [pe.INVALID_TOKEN_IN_PLACEHOLDER]: "Invalid token in placeholder: '{0}'",
    [pe.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER]: "Unterminated single quote in placeholder",
    [pe.UNKNOWN_ESCAPE_SEQUENCE]: "Unknown escape sequence: \\{0}",
    [pe.INVALID_UNICODE_ESCAPE_SEQUENCE]: "Invalid unicode escape sequence: {0}",
    [pe.UNBALANCED_CLOSING_BRACE]: "Unbalanced closing brace",
    [pe.UNTERMINATED_CLOSING_BRACE]: "Unterminated closing brace",
    [pe.EMPTY_PLACEHOLDER]: "Empty placeholder",
    [pe.NOT_ALLOW_NEST_PLACEHOLDER]: "Not allowed nest placeholder",
    [pe.INVALID_LINKED_FORMAT]: "Invalid linked format",
    [pe.MUST_HAVE_MESSAGES_IN_PLURAL]: "Plural must have messages",
    [pe.UNEXPECTED_EMPTY_LINKED_MODIFIER]: "Unexpected empty linked modifier",
    [pe.UNEXPECTED_EMPTY_LINKED_KEY]: "Unexpected empty linked key",
    [pe.UNEXPECTED_LEXICAL_ANALYSIS]: "Unexpected lexical analysis in token: '{0}'",
    [pe.UNHANDLED_CODEGEN_NODE_TYPE]: "unhandled codegen node type: '{0}'",
    [pe.UNHANDLED_MINIFIER_NODE_TYPE]: "unhandled mimifier node type: '{0}'"
};
function Lr(e, t, n={}) {
    const {domain: r, messages: i, args: o} = n
      , a = Jp((i || Qp)[e] || "", ...o || [])
      , s = new SyntaxError(String(a));
    return s.code = e,
    t && (s.location = t),
    s.domain = r,
    s
}
function ev(e) {
    throw e
}
const Xt = " "
  , tv = "\r"
  , mt = `
`
  , nv = String.fromCharCode(8232)
  , rv = String.fromCharCode(8233);
function ov(e) {
    const t = e;
    let n = 0
      , r = 1
      , i = 1
      , o = 0;
    const a = x=>t[x] === tv && t[x + 1] === mt
      , s = x=>t[x] === mt
      , l = x=>t[x] === rv
      , u = x=>t[x] === nv
      , c = x=>a(x) || s(x) || l(x) || u(x)
      , f = ()=>n
      , h = ()=>r
      , p = ()=>i
      , v = ()=>o
      , E = x=>a(x) || l(x) || u(x) ? mt : t[x]
      , y = ()=>E(n)
      , g = ()=>E(n + o);
    function _() {
        return o = 0,
        c(n) && (r++,
        i = 0),
        a(n) && n++,
        n++,
        i++,
        t[n]
    }
    function C() {
        return a(n + o) && o++,
        o++,
        t[n + o]
    }
    function S() {
        n = 0,
        r = 1,
        i = 1,
        o = 0
    }
    function A(x=0) {
        o = x
    }
    function N() {
        const x = n + o;
        for (; x !== n; )
            _();
        o = 0
    }
    return {
        index: f,
        line: h,
        column: p,
        peekOffset: v,
        charAt: E,
        currentChar: y,
        currentPeek: g,
        next: _,
        peek: C,
        reset: S,
        resetPeek: A,
        skipToPeek: N
    }
}
const pn = void 0
  , iv = "."
  , Yl = "'"
  , av = "tokenizer";
function sv(e, t={}) {
    const n = t.location !== !1
      , r = ov(e)
      , i = ()=>r.index()
      , o = ()=>Gp(r.line(), r.column(), r.index())
      , a = o()
      , s = i()
      , l = {
        currentType: 14,
        offset: s,
        startLoc: a,
        endLoc: a,
        lastType: 14,
        lastOffset: s,
        lastStartLoc: a,
        lastEndLoc: a,
        braceNest: 0,
        inLinked: !1,
        text: ""
    }
      , u = ()=>l
      , {onError: c} = t;
    function f(d, m, b, ...L) {
        const D = u();
        if (m.column += b,
        m.offset += b,
        c) {
            const j = n ? Fa(D.startLoc, m) : null
              , Q = Lr(d, j, {
                domain: av,
                args: L
            });
            c(Q)
        }
    }
    function h(d, m, b) {
        d.endLoc = o(),
        d.currentType = m;
        const L = {
            type: m
        };
        return n && (L.loc = Fa(d.startLoc, d.endLoc)),
        b != null && (L.value = b),
        L
    }
    const p = d=>h(d, 14);
    function v(d, m) {
        return d.currentChar() === m ? (d.next(),
        m) : (f(pe.EXPECTED_TOKEN, o(), 0, m),
        "")
    }
    function E(d) {
        let m = "";
        for (; d.currentPeek() === Xt || d.currentPeek() === mt; )
            m += d.currentPeek(),
            d.peek();
        return m
    }
    function y(d) {
        const m = E(d);
        return d.skipToPeek(),
        m
    }
    function g(d) {
        if (d === pn)
            return !1;
        const m = d.charCodeAt(0);
        return m >= 97 && m <= 122 || m >= 65 && m <= 90 || m === 95
    }
    function _(d) {
        if (d === pn)
            return !1;
        const m = d.charCodeAt(0);
        return m >= 48 && m <= 57
    }
    function C(d, m) {
        const {currentType: b} = m;
        if (b !== 2)
            return !1;
        E(d);
        const L = g(d.currentPeek());
        return d.resetPeek(),
        L
    }
    function S(d, m) {
        const {currentType: b} = m;
        if (b !== 2)
            return !1;
        E(d);
        const L = d.currentPeek() === "-" ? d.peek() : d.currentPeek()
          , D = _(L);
        return d.resetPeek(),
        D
    }
    function A(d, m) {
        const {currentType: b} = m;
        if (b !== 2)
            return !1;
        E(d);
        const L = d.currentPeek() === Yl;
        return d.resetPeek(),
        L
    }
    function N(d, m) {
        const {currentType: b} = m;
        if (b !== 8)
            return !1;
        E(d);
        const L = d.currentPeek() === ".";
        return d.resetPeek(),
        L
    }
    function x(d, m) {
        const {currentType: b} = m;
        if (b !== 9)
            return !1;
        E(d);
        const L = g(d.currentPeek());
        return d.resetPeek(),
        L
    }
    function O(d, m) {
        const {currentType: b} = m;
        if (!(b === 8 || b === 12))
            return !1;
        E(d);
        const L = d.currentPeek() === ":";
        return d.resetPeek(),
        L
    }
    function M(d, m) {
        const {currentType: b} = m;
        if (b !== 10)
            return !1;
        const L = ()=>{
            const j = d.currentPeek();
            return j === "{" ? g(d.peek()) : j === "@" || j === "%" || j === "|" || j === ":" || j === "." || j === Xt || !j ? !1 : j === mt ? (d.peek(),
            L()) : g(j)
        }
          , D = L();
        return d.resetPeek(),
        D
    }
    function B(d) {
        E(d);
        const m = d.currentPeek() === "|";
        return d.resetPeek(),
        m
    }
    function T(d) {
        const m = E(d)
          , b = d.currentPeek() === "%" && d.peek() === "{";
        return d.resetPeek(),
        {
            isModulo: b,
            hasSpace: m.length > 0
        }
    }
    function I(d, m=!0) {
        const b = (D=!1,j="",Q=!1)=>{
            const G = d.currentPeek();
            return G === "{" ? j === "%" ? !1 : D : G === "@" || !G ? j === "%" ? !0 : D : G === "%" ? (d.peek(),
            b(D, "%", !0)) : G === "|" ? j === "%" || Q ? !0 : !(j === Xt || j === mt) : G === Xt ? (d.peek(),
            b(!0, Xt, Q)) : G === mt ? (d.peek(),
            b(!0, mt, Q)) : !0
        }
          , L = b();
        return m && d.resetPeek(),
        L
    }
    function U(d, m) {
        const b = d.currentChar();
        return b === pn ? pn : m(b) ? (d.next(),
        b) : null
    }
    function ce(d) {
        return U(d, b=>{
            const L = b.charCodeAt(0);
            return L >= 97 && L <= 122 || L >= 65 && L <= 90 || L >= 48 && L <= 57 || L === 95 || L === 36
        }
        )
    }
    function me(d) {
        return U(d, b=>{
            const L = b.charCodeAt(0);
            return L >= 48 && L <= 57
        }
        )
    }
    function K(d) {
        return U(d, b=>{
            const L = b.charCodeAt(0);
            return L >= 48 && L <= 57 || L >= 65 && L <= 70 || L >= 97 && L <= 102
        }
        )
    }
    function ee(d) {
        let m = ""
          , b = "";
        for (; m = me(d); )
            b += m;
        return b
    }
    function re(d) {
        y(d);
        const m = d.currentChar();
        return m !== "%" && f(pe.EXPECTED_TOKEN, o(), 0, m),
        d.next(),
        "%"
    }
    function fe(d) {
        let m = "";
        for (; ; ) {
            const b = d.currentChar();
            if (b === "{" || b === "}" || b === "@" || b === "|" || !b)
                break;
            if (b === "%")
                if (I(d))
                    m += b,
                    d.next();
                else
                    break;
            else if (b === Xt || b === mt)
                if (I(d))
                    m += b,
                    d.next();
                else {
                    if (B(d))
                        break;
                    m += b,
                    d.next()
                }
            else
                m += b,
                d.next()
        }
        return m
    }
    function Oe(d) {
        y(d);
        let m = ""
          , b = "";
        for (; m = ce(d); )
            b += m;
        return d.currentChar() === pn && f(pe.UNTERMINATED_CLOSING_BRACE, o(), 0),
        b
    }
    function H(d) {
        y(d);
        let m = "";
        return d.currentChar() === "-" ? (d.next(),
        m += `-${ee(d)}`) : m += ee(d),
        d.currentChar() === pn && f(pe.UNTERMINATED_CLOSING_BRACE, o(), 0),
        m
    }
    function F(d) {
        y(d),
        v(d, "'");
        let m = ""
          , b = "";
        const L = j=>j !== Yl && j !== mt;
        for (; m = U(d, L); )
            m === "\\" ? b += q(d) : b += m;
        const D = d.currentChar();
        return D === mt || D === pn ? (f(pe.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, o(), 0),
        D === mt && (d.next(),
        v(d, "'")),
        b) : (v(d, "'"),
        b)
    }
    function q(d) {
        const m = d.currentChar();
        switch (m) {
        case "\\":
        case "'":
            return d.next(),
            `\\${m}`;
        case "u":
            return de(d, m, 4);
        case "U":
            return de(d, m, 6);
        default:
            return f(pe.UNKNOWN_ESCAPE_SEQUENCE, o(), 0, m),
            ""
        }
    }
    function de(d, m, b) {
        v(d, m);
        let L = "";
        for (let D = 0; D < b; D++) {
            const j = K(d);
            if (!j) {
                f(pe.INVALID_UNICODE_ESCAPE_SEQUENCE, o(), 0, `\\${m}${L}${d.currentChar()}`);
                break
            }
            L += j
        }
        return `\\${m}${L}`
    }
    function P(d) {
        y(d);
        let m = ""
          , b = "";
        const L = D=>D !== "{" && D !== "}" && D !== Xt && D !== mt;
        for (; m = U(d, L); )
            b += m;
        return b
    }
    function V(d) {
        let m = ""
          , b = "";
        for (; m = ce(d); )
            b += m;
        return b
    }
    function w(d) {
        const m = (b=!1,L)=>{
            const D = d.currentChar();
            return D === "{" || D === "%" || D === "@" || D === "|" || D === "(" || D === ")" || !D || D === Xt ? L : D === mt || D === iv ? (L += D,
            d.next(),
            m(b, L)) : (L += D,
            d.next(),
            m(!0, L))
        }
        ;
        return m(!1, "")
    }
    function W(d) {
        y(d);
        const m = v(d, "|");
        return y(d),
        m
    }
    function X(d, m) {
        let b = null;
        switch (d.currentChar()) {
        case "{":
            return m.braceNest >= 1 && f(pe.NOT_ALLOW_NEST_PLACEHOLDER, o(), 0),
            d.next(),
            b = h(m, 2, "{"),
            y(d),
            m.braceNest++,
            b;
        case "}":
            return m.braceNest > 0 && m.currentType === 2 && f(pe.EMPTY_PLACEHOLDER, o(), 0),
            d.next(),
            b = h(m, 3, "}"),
            m.braceNest--,
            m.braceNest > 0 && y(d),
            m.inLinked && m.braceNest === 0 && (m.inLinked = !1),
            b;
        case "@":
            return m.braceNest > 0 && f(pe.UNTERMINATED_CLOSING_BRACE, o(), 0),
            b = te(d, m) || p(m),
            m.braceNest = 0,
            b;
        default:
            let D = !0
              , j = !0
              , Q = !0;
            if (B(d))
                return m.braceNest > 0 && f(pe.UNTERMINATED_CLOSING_BRACE, o(), 0),
                b = h(m, 1, W(d)),
                m.braceNest = 0,
                m.inLinked = !1,
                b;
            if (m.braceNest > 0 && (m.currentType === 5 || m.currentType === 6 || m.currentType === 7))
                return f(pe.UNTERMINATED_CLOSING_BRACE, o(), 0),
                m.braceNest = 0,
                Z(d, m);
            if (D = C(d, m))
                return b = h(m, 5, Oe(d)),
                y(d),
                b;
            if (j = S(d, m))
                return b = h(m, 6, H(d)),
                y(d),
                b;
            if (Q = A(d, m))
                return b = h(m, 7, F(d)),
                y(d),
                b;
            if (!D && !j && !Q)
                return b = h(m, 13, P(d)),
                f(pe.INVALID_TOKEN_IN_PLACEHOLDER, o(), 0, b.value),
                y(d),
                b;
            break
        }
        return b
    }
    function te(d, m) {
        const {currentType: b} = m;
        let L = null;
        const D = d.currentChar();
        switch ((b === 8 || b === 9 || b === 12 || b === 10) && (D === mt || D === Xt) && f(pe.INVALID_LINKED_FORMAT, o(), 0),
        D) {
        case "@":
            return d.next(),
            L = h(m, 8, "@"),
            m.inLinked = !0,
            L;
        case ".":
            return y(d),
            d.next(),
            h(m, 9, ".");
        case ":":
            return y(d),
            d.next(),
            h(m, 10, ":");
        default:
            return B(d) ? (L = h(m, 1, W(d)),
            m.braceNest = 0,
            m.inLinked = !1,
            L) : N(d, m) || O(d, m) ? (y(d),
            te(d, m)) : x(d, m) ? (y(d),
            h(m, 12, V(d))) : M(d, m) ? (y(d),
            D === "{" ? X(d, m) || L : h(m, 11, w(d))) : (b === 8 && f(pe.INVALID_LINKED_FORMAT, o(), 0),
            m.braceNest = 0,
            m.inLinked = !1,
            Z(d, m))
        }
    }
    function Z(d, m) {
        let b = {
            type: 14
        };
        if (m.braceNest > 0)
            return X(d, m) || p(m);
        if (m.inLinked)
            return te(d, m) || p(m);
        switch (d.currentChar()) {
        case "{":
            return X(d, m) || p(m);
        case "}":
            return f(pe.UNBALANCED_CLOSING_BRACE, o(), 0),
            d.next(),
            h(m, 3, "}");
        case "@":
            return te(d, m) || p(m);
        default:
            if (B(d))
                return b = h(m, 1, W(d)),
                m.braceNest = 0,
                m.inLinked = !1,
                b;
            const {isModulo: D, hasSpace: j} = T(d);
            if (D)
                return j ? h(m, 0, fe(d)) : h(m, 4, re(d));
            if (I(d))
                return h(m, 0, fe(d));
            break
        }
        return b
    }
    function le() {
        const {currentType: d, offset: m, startLoc: b, endLoc: L} = l;
        return l.lastType = d,
        l.lastOffset = m,
        l.lastStartLoc = b,
        l.lastEndLoc = L,
        l.offset = i(),
        l.startLoc = o(),
        r.currentChar() === pn ? h(l, 14) : Z(r, l)
    }
    return {
        nextToken: le,
        currentOffset: i,
        currentPosition: o,
        context: u
    }
}
const lv = "parser"
  , cv = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function uv(e, t, n) {
    switch (e) {
    case "\\\\":
        return "\\";
    case "\\'":
        return "'";
    default:
        {
            const r = parseInt(t || n, 16);
            return r <= 55295 || r >= 57344 ? String.fromCodePoint(r) : "\uFFFD"
        }
    }
}
function fv(e={}) {
    const t = e.location !== !1
      , {onError: n} = e;
    function r(g, _, C, S, ...A) {
        const N = g.currentPosition();
        if (N.offset += S,
        N.column += S,
        n) {
            const x = t ? Fa(C, N) : null
              , O = Lr(_, x, {
                domain: lv,
                args: A
            });
            n(O)
        }
    }
    function i(g, _, C) {
        const S = {
            type: g
        };
        return t && (S.start = _,
        S.end = _,
        S.loc = {
            start: C,
            end: C
        }),
        S
    }
    function o(g, _, C, S) {
        S && (g.type = S),
        t && (g.end = _,
        g.loc && (g.loc.end = C))
    }
    function a(g, _) {
        const C = g.context()
          , S = i(3, C.offset, C.startLoc);
        return S.value = _,
        o(S, g.currentOffset(), g.currentPosition()),
        S
    }
    function s(g, _) {
        const C = g.context()
          , {lastOffset: S, lastStartLoc: A} = C
          , N = i(5, S, A);
        return N.index = parseInt(_, 10),
        g.nextToken(),
        o(N, g.currentOffset(), g.currentPosition()),
        N
    }
    function l(g, _) {
        const C = g.context()
          , {lastOffset: S, lastStartLoc: A} = C
          , N = i(4, S, A);
        return N.key = _,
        g.nextToken(),
        o(N, g.currentOffset(), g.currentPosition()),
        N
    }
    function u(g, _) {
        const C = g.context()
          , {lastOffset: S, lastStartLoc: A} = C
          , N = i(9, S, A);
        return N.value = _.replace(cv, uv),
        g.nextToken(),
        o(N, g.currentOffset(), g.currentPosition()),
        N
    }
    function c(g) {
        const _ = g.nextToken()
          , C = g.context()
          , {lastOffset: S, lastStartLoc: A} = C
          , N = i(8, S, A);
        return _.type !== 12 ? (r(g, pe.UNEXPECTED_EMPTY_LINKED_MODIFIER, C.lastStartLoc, 0),
        N.value = "",
        o(N, S, A),
        {
            nextConsumeToken: _,
            node: N
        }) : (_.value == null && r(g, pe.UNEXPECTED_LEXICAL_ANALYSIS, C.lastStartLoc, 0, Wt(_)),
        N.value = _.value || "",
        o(N, g.currentOffset(), g.currentPosition()),
        {
            node: N
        })
    }
    function f(g, _) {
        const C = g.context()
          , S = i(7, C.offset, C.startLoc);
        return S.value = _,
        o(S, g.currentOffset(), g.currentPosition()),
        S
    }
    function h(g) {
        const _ = g.context()
          , C = i(6, _.offset, _.startLoc);
        let S = g.nextToken();
        if (S.type === 9) {
            const A = c(g);
            C.modifier = A.node,
            S = A.nextConsumeToken || g.nextToken()
        }
        switch (S.type !== 10 && r(g, pe.UNEXPECTED_LEXICAL_ANALYSIS, _.lastStartLoc, 0, Wt(S)),
        S = g.nextToken(),
        S.type === 2 && (S = g.nextToken()),
        S.type) {
        case 11:
            S.value == null && r(g, pe.UNEXPECTED_LEXICAL_ANALYSIS, _.lastStartLoc, 0, Wt(S)),
            C.key = f(g, S.value || "");
            break;
        case 5:
            S.value == null && r(g, pe.UNEXPECTED_LEXICAL_ANALYSIS, _.lastStartLoc, 0, Wt(S)),
            C.key = l(g, S.value || "");
            break;
        case 6:
            S.value == null && r(g, pe.UNEXPECTED_LEXICAL_ANALYSIS, _.lastStartLoc, 0, Wt(S)),
            C.key = s(g, S.value || "");
            break;
        case 7:
            S.value == null && r(g, pe.UNEXPECTED_LEXICAL_ANALYSIS, _.lastStartLoc, 0, Wt(S)),
            C.key = u(g, S.value || "");
            break;
        default:
            r(g, pe.UNEXPECTED_EMPTY_LINKED_KEY, _.lastStartLoc, 0);
            const A = g.context()
              , N = i(7, A.offset, A.startLoc);
            return N.value = "",
            o(N, A.offset, A.startLoc),
            C.key = N,
            o(C, A.offset, A.startLoc),
            {
                nextConsumeToken: S,
                node: C
            }
        }
        return o(C, g.currentOffset(), g.currentPosition()),
        {
            node: C
        }
    }
    function p(g) {
        const _ = g.context()
          , C = _.currentType === 1 ? g.currentOffset() : _.offset
          , S = _.currentType === 1 ? _.endLoc : _.startLoc
          , A = i(2, C, S);
        A.items = [];
        let N = null;
        do {
            const M = N || g.nextToken();
            switch (N = null,
            M.type) {
            case 0:
                M.value == null && r(g, pe.UNEXPECTED_LEXICAL_ANALYSIS, _.lastStartLoc, 0, Wt(M)),
                A.items.push(a(g, M.value || ""));
                break;
            case 6:
                M.value == null && r(g, pe.UNEXPECTED_LEXICAL_ANALYSIS, _.lastStartLoc, 0, Wt(M)),
                A.items.push(s(g, M.value || ""));
                break;
            case 5:
                M.value == null && r(g, pe.UNEXPECTED_LEXICAL_ANALYSIS, _.lastStartLoc, 0, Wt(M)),
                A.items.push(l(g, M.value || ""));
                break;
            case 7:
                M.value == null && r(g, pe.UNEXPECTED_LEXICAL_ANALYSIS, _.lastStartLoc, 0, Wt(M)),
                A.items.push(u(g, M.value || ""));
                break;
            case 8:
                const B = h(g);
                A.items.push(B.node),
                N = B.nextConsumeToken || null;
                break
            }
        } while (_.currentType !== 14 && _.currentType !== 1);
        const x = _.currentType === 1 ? _.lastOffset : g.currentOffset()
          , O = _.currentType === 1 ? _.lastEndLoc : g.currentPosition();
        return o(A, x, O),
        A
    }
    function v(g, _, C, S) {
        const A = g.context();
        let N = S.items.length === 0;
        const x = i(1, _, C);
        x.cases = [],
        x.cases.push(S);
        do {
            const O = p(g);
            N || (N = O.items.length === 0),
            x.cases.push(O)
        } while (A.currentType !== 14);
        return N && r(g, pe.MUST_HAVE_MESSAGES_IN_PLURAL, C, 0),
        o(x, g.currentOffset(), g.currentPosition()),
        x
    }
    function E(g) {
        const _ = g.context()
          , {offset: C, startLoc: S} = _
          , A = p(g);
        return _.currentType === 14 ? A : v(g, C, S, A)
    }
    function y(g) {
        const _ = sv(g, Qf({}, e))
          , C = _.context()
          , S = i(0, C.offset, C.startLoc);
        return t && S.loc && (S.loc.source = g),
        S.body = E(_),
        e.onCacheKey && (S.cacheKey = e.onCacheKey(g)),
        C.currentType !== 14 && r(_, pe.UNEXPECTED_LEXICAL_ANALYSIS, C.lastStartLoc, 0, g[C.offset] || ""),
        o(S, _.currentOffset(), _.currentPosition()),
        S
    }
    return {
        parse: y
    }
}
function Wt(e) {
    if (e.type === 14)
        return "EOF";
    const t = (e.value || "").replace(/\r?\n/gu, "\\n");
    return t.length > 10 ? t.slice(0, 9) + "\u2026" : t
}
function dv(e, t={}) {
    const n = {
        ast: e,
        helpers: new Set
    };
    return {
        context: ()=>n,
        helper: o=>(n.helpers.add(o),
        o)
    }
}
function ql(e, t) {
    for (let n = 0; n < e.length; n++)
        Rs(e[n], t)
}
function Rs(e, t) {
    switch (e.type) {
    case 1:
        ql(e.cases, t),
        t.helper("plural");
        break;
    case 2:
        ql(e.items, t);
        break;
    case 6:
        Rs(e.key, t),
        t.helper("linked"),
        t.helper("type");
        break;
    case 5:
        t.helper("interpolate"),
        t.helper("list");
        break;
    case 4:
        t.helper("interpolate"),
        t.helper("named");
        break
    }
}
function mv(e, t={}) {
    const n = dv(e);
    n.helper("normalize"),
    e.body && Rs(e.body, n);
    const r = n.context();
    e.helpers = Array.from(r.helpers)
}
function hv(e) {
    const t = e.body;
    return t.type === 2 ? Gl(t) : t.cases.forEach(n=>Gl(n)),
    e
}
function Gl(e) {
    if (e.items.length === 1) {
        const t = e.items[0];
        (t.type === 3 || t.type === 9) && (e.static = t.value,
        delete t.value)
    } else {
        const t = [];
        for (let n = 0; n < e.items.length; n++) {
            const r = e.items[n];
            if (!(r.type === 3 || r.type === 9) || r.value == null)
                break;
            t.push(r.value)
        }
        if (t.length === e.items.length) {
            e.static = ed(t);
            for (let n = 0; n < e.items.length; n++) {
                const r = e.items[n];
                (r.type === 3 || r.type === 9) && delete r.value
            }
        }
    }
}
const gv = "minifier";
function fr(e) {
    switch (e.t = e.type,
    e.type) {
    case 0:
        const t = e;
        fr(t.body),
        t.b = t.body,
        delete t.body;
        break;
    case 1:
        const n = e
          , r = n.cases;
        for (let c = 0; c < r.length; c++)
            fr(r[c]);
        n.c = r,
        delete n.cases;
        break;
    case 2:
        const i = e
          , o = i.items;
        for (let c = 0; c < o.length; c++)
            fr(o[c]);
        i.i = o,
        delete i.items,
        i.static && (i.s = i.static,
        delete i.static);
        break;
    case 3:
    case 9:
    case 8:
    case 7:
        const a = e;
        a.value && (a.v = a.value,
        delete a.value);
        break;
    case 6:
        const s = e;
        fr(s.key),
        s.k = s.key,
        delete s.key,
        s.modifier && (fr(s.modifier),
        s.m = s.modifier,
        delete s.modifier);
        break;
    case 5:
        const l = e;
        l.i = l.index,
        delete l.index;
        break;
    case 4:
        const u = e;
        u.k = u.key,
        delete u.key;
        break;
    default:
        throw Lr(pe.UNHANDLED_MINIFIER_NODE_TYPE, null, {
            domain: gv,
            args: [e.type]
        })
    }
    delete e.type
}
const pv = "parser";
function vv(e, t) {
    const {sourceMap: n, filename: r, breakLineCode: i, needIndent: o} = t
      , a = t.location !== !1
      , s = {
        filename: r,
        code: "",
        column: 1,
        line: 1,
        offset: 0,
        map: void 0,
        breakLineCode: i,
        needIndent: o,
        indentLevel: 0
    };
    a && e.loc && (s.source = e.loc.source);
    const l = ()=>s;
    function u(y, g) {
        s.code += y
    }
    function c(y, g=!0) {
        const _ = g ? i : "";
        u(o ? _ + "  ".repeat(y) : _)
    }
    function f(y=!0) {
        const g = ++s.indentLevel;
        y && c(g)
    }
    function h(y=!0) {
        const g = --s.indentLevel;
        y && c(g)
    }
    function p() {
        c(s.indentLevel)
    }
    return {
        context: l,
        push: u,
        indent: f,
        deindent: h,
        newline: p,
        helper: y=>`_${y}`,
        needIndent: ()=>s.needIndent
    }
}
function bv(e, t) {
    const {helper: n} = e;
    e.push(`${n("linked")}(`),
    yr(e, t.key),
    t.modifier ? (e.push(", "),
    yr(e, t.modifier),
    e.push(", _type")) : e.push(", undefined, _type"),
    e.push(")")
}
function yv(e, t) {
    const {helper: n, needIndent: r} = e;
    e.push(`${n("normalize")}([`),
    e.indent(r());
    const i = t.items.length;
    for (let o = 0; o < i && (yr(e, t.items[o]),
    o !== i - 1); o++)
        e.push(", ");
    e.deindent(r()),
    e.push("])")
}
function _v(e, t) {
    const {helper: n, needIndent: r} = e;
    if (t.cases.length > 1) {
        e.push(`${n("plural")}([`),
        e.indent(r());
        const i = t.cases.length;
        for (let o = 0; o < i && (yr(e, t.cases[o]),
        o !== i - 1); o++)
            e.push(", ");
        e.deindent(r()),
        e.push("])")
    }
}
function Ev(e, t) {
    t.body ? yr(e, t.body) : e.push("null")
}
function yr(e, t) {
    const {helper: n} = e;
    switch (t.type) {
    case 0:
        Ev(e, t);
        break;
    case 1:
        _v(e, t);
        break;
    case 2:
        yv(e, t);
        break;
    case 6:
        bv(e, t);
        break;
    case 8:
        e.push(JSON.stringify(t.value), t);
        break;
    case 7:
        e.push(JSON.stringify(t.value), t);
        break;
    case 5:
        e.push(`${n("interpolate")}(${n("list")}(${t.index}))`, t);
        break;
    case 4:
        e.push(`${n("interpolate")}(${n("named")}(${JSON.stringify(t.key)}))`, t);
        break;
    case 9:
        e.push(JSON.stringify(t.value), t);
        break;
    case 3:
        e.push(JSON.stringify(t.value), t);
        break;
    default:
        throw Lr(pe.UNHANDLED_CODEGEN_NODE_TYPE, null, {
            domain: pv,
            args: [t.type]
        })
    }
}
const wv = (e,t={})=>{
    const n = Kl(t.mode) ? t.mode : "normal"
      , r = Kl(t.filename) ? t.filename : "message.intl"
      , i = !!t.sourceMap
      , o = t.breakLineCode != null ? t.breakLineCode : n === "arrow" ? ";" : `
`
      , a = t.needIndent ? t.needIndent : n !== "arrow"
      , s = e.helpers || []
      , l = vv(e, {
        mode: n,
        filename: r,
        sourceMap: i,
        breakLineCode: o,
        needIndent: a
    });
    l.push(n === "normal" ? "function __msg__ (ctx) {" : "(ctx) => {"),
    l.indent(a),
    s.length > 0 && (l.push(`const { ${ed(s.map(f=>`${f}: _${f}`), ", ")} } = ctx`),
    l.newline()),
    l.push("return "),
    yr(l, e),
    l.deindent(a),
    l.push("}"),
    delete e.helpers;
    const {code: u, map: c} = l.context();
    return {
        ast: e,
        code: u,
        map: c ? c.toJSON() : void 0
    }
}
;
function Sv(e, t={}) {
    const n = Qf({}, t)
      , r = !!n.jit
      , i = !!n.minify
      , o = n.optimize == null ? !0 : n.optimize
      , s = fv(n).parse(e);
    return r ? (o && hv(s),
    i && fr(s),
    {
        ast: s,
        code: ""
    }) : (mv(s, n),
    wv(s, n))
}
/*!
  * core-base v9.6.4
  * (c) 2023 kazuya kawaguchi
  * Released under the MIT License.
  */
function Tv() {
    typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (tn().__INTLIFY_PROD_DEVTOOLS__ = !1),
    typeof __INTLIFY_JIT_COMPILATION__ != "boolean" && (tn().__INTLIFY_JIT_COMPILATION__ = !1),
    typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (tn().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1)
}
const xn = [];
xn[0] = {
    w: [0],
    i: [3, 0],
    ["["]: [4],
    o: [7]
};
xn[1] = {
    w: [1],
    ["."]: [2],
    ["["]: [4],
    o: [7]
};
xn[2] = {
    w: [2],
    i: [3, 0],
    [0]: [3, 0]
};
xn[3] = {
    i: [3, 0],
    [0]: [3, 0],
    w: [1, 1],
    ["."]: [2, 1],
    ["["]: [4, 1],
    o: [7, 1]
};
xn[4] = {
    ["'"]: [5, 0],
    ['"']: [6, 0],
    ["["]: [4, 2],
    ["]"]: [1, 3],
    o: 8,
    l: [4, 0]
};
xn[5] = {
    ["'"]: [4, 0],
    o: 8,
    l: [5, 0]
};
xn[6] = {
    ['"']: [4, 0],
    o: 8,
    l: [6, 0]
};
const Cv = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function Ov(e) {
    return Cv.test(e)
}
function kv(e) {
    const t = e.charCodeAt(0)
      , n = e.charCodeAt(e.length - 1);
    return t === n && (t === 34 || t === 39) ? e.slice(1, -1) : e
}
function Iv(e) {
    if (e == null)
        return "o";
    switch (e.charCodeAt(0)) {
    case 91:
    case 93:
    case 46:
    case 34:
    case 39:
        return e;
    case 95:
    case 36:
    case 45:
        return "i";
    case 9:
    case 10:
    case 13:
    case 160:
    case 65279:
    case 8232:
    case 8233:
        return "w"
    }
    return "i"
}
function Pv(e) {
    const t = e.trim();
    return e.charAt(0) === "0" && isNaN(parseInt(e)) ? !1 : Ov(t) ? kv(t) : "*" + t
}
function Rv(e) {
    const t = [];
    let n = -1, r = 0, i = 0, o, a, s, l, u, c, f;
    const h = [];
    h[0] = ()=>{
        a === void 0 ? a = s : a += s
    }
    ,
    h[1] = ()=>{
        a !== void 0 && (t.push(a),
        a = void 0)
    }
    ,
    h[2] = ()=>{
        h[0](),
        i++
    }
    ,
    h[3] = ()=>{
        if (i > 0)
            i--,
            r = 4,
            h[0]();
        else {
            if (i = 0,
            a === void 0 || (a = Pv(a),
            a === !1))
                return !1;
            h[1]()
        }
    }
    ;
    function p() {
        const v = e[n + 1];
        if (r === 5 && v === "'" || r === 6 && v === '"')
            return n++,
            s = "\\" + v,
            h[0](),
            !0
    }
    for (; r !== null; )
        if (n++,
        o = e[n],
        !(o === "\\" && p())) {
            if (l = Iv(o),
            f = xn[r],
            u = f[l] || f.l || 8,
            u === 8 || (r = u[0],
            u[1] !== void 0 && (c = h[u[1]],
            c && (s = o,
            c() === !1))))
                return;
            if (r === 7)
                return t
        }
}
const Xl = new Map;
function Lv(e, t) {
    return De(e) ? e[t] : null
}
function Av(e, t) {
    if (!De(e))
        return null;
    let n = Xl.get(t);
    if (n || (n = Rv(t),
    n && Xl.set(t, n)),
    !n)
        return null;
    const r = n.length;
    let i = e
      , o = 0;
    for (; o < r; ) {
        const a = i[n[o]];
        if (a === void 0 || je(i))
            return null;
        i = a,
        o++
    }
    return i
}
const Nv = e=>e
  , xv = e=>""
  , Dv = "text"
  , Mv = e=>e.length === 0 ? "" : Yp(e)
  , Fv = Kp;
function Jl(e, t) {
    return e = Math.abs(e),
    t === 2 ? e ? e > 1 ? 1 : 0 : 1 : e ? Math.min(e, 2) : 0
}
function $v(e) {
    const t = Je(e.pluralIndex) ? e.pluralIndex : -1;
    return e.named && (Je(e.named.count) || Je(e.named.n)) ? Je(e.named.count) ? e.named.count : Je(e.named.n) ? e.named.n : t : t
}
function Bv(e, t) {
    t.count || (t.count = e),
    t.n || (t.n = e)
}
function Uv(e={}) {
    const t = e.locale
      , n = $v(e)
      , r = De(e.pluralRules) && se(t) && je(e.pluralRules[t]) ? e.pluralRules[t] : Jl
      , i = De(e.pluralRules) && se(t) && je(e.pluralRules[t]) ? Jl : void 0
      , o = g=>g[r(n, g.length, i)]
      , a = e.list || []
      , s = g=>a[g]
      , l = e.named || {};
    Je(e.pluralIndex) && Bv(n, l);
    const u = g=>l[g];
    function c(g) {
        const _ = je(e.messages) ? e.messages(g) : De(e.messages) ? e.messages[g] : !1;
        return _ || (e.parent ? e.parent.message(g) : xv)
    }
    const f = g=>e.modifiers ? e.modifiers[g] : Nv
      , h = ye(e.processor) && je(e.processor.normalize) ? e.processor.normalize : Mv
      , p = ye(e.processor) && je(e.processor.interpolate) ? e.processor.interpolate : Fv
      , v = ye(e.processor) && se(e.processor.type) ? e.processor.type : Dv
      , y = {
        list: s,
        named: u,
        plural: o,
        linked: (g,..._)=>{
            const [C,S] = _;
            let A = "text"
              , N = "";
            _.length === 1 ? De(C) ? (N = C.modifier || N,
            A = C.type || A) : se(C) && (N = C || N) : _.length === 2 && (se(C) && (N = C || N),
            se(S) && (A = S || A));
            const x = c(g)(y)
              , O = A === "vnode" && Ve(x) && N ? x[0] : x;
            return N ? f(N)(O, A) : O
        }
        ,
        message: c,
        type: v,
        interpolate: p,
        normalize: h,
        values: it({}, a, l)
    };
    return y
}
let go = null;
function Vv(e) {
    go = e
}
function Hv(e, t, n) {
    go && go.emit("i18n:init", {
        timestamp: Date.now(),
        i18n: e,
        version: t,
        meta: n
    })
}
const Wv = jv("function:translate");
function jv(e) {
    return t=>go && go.emit(e, t)
}
const zv = {
    NOT_FOUND_KEY: 1,
    FALLBACK_TO_TRANSLATE: 2,
    CANNOT_FORMAT_NUMBER: 3,
    FALLBACK_TO_NUMBER_FORMAT: 4,
    CANNOT_FORMAT_DATE: 5,
    FALLBACK_TO_DATE_FORMAT: 6,
    EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER: 7,
    __EXTEND_POINT__: 8
};
function Ls(e, t) {
    return t.locale != null ? Zl(t.locale) : Zl(e.locale)
}
let ra;
function Zl(e) {
    return se(e) ? e : ra != null && e.resolvedOnce ? ra : ra = e()
}
function Kv(e, t, n) {
    return [...new Set([n, ...Ve(t) ? t : De(t) ? Object.keys(t) : se(t) ? [t] : [n]])]
}
function td(e, t, n) {
    const r = se(n) ? n : _r
      , i = e;
    i.__localeChainCache || (i.__localeChainCache = new Map);
    let o = i.__localeChainCache.get(r);
    if (!o) {
        o = [];
        let a = [n];
        for (; Ve(a); )
            a = Ql(o, a, t);
        const s = Ve(t) || !ye(t) ? t : t.default ? t.default : null;
        a = se(s) ? [s] : s,
        Ve(a) && Ql(o, a, !1),
        i.__localeChainCache.set(r, o)
    }
    return o
}
function Ql(e, t, n) {
    let r = !0;
    for (let i = 0; i < t.length && Ce(r); i++) {
        const o = t[i];
        se(o) && (r = Yv(e, t[i], n))
    }
    return r
}
function Yv(e, t, n) {
    let r;
    const i = t.split("-");
    do {
        const o = i.join("-");
        r = qv(e, o, n),
        i.splice(-1, 1)
    } while (i.length && r === !0);
    return r
}
function qv(e, t, n) {
    let r = !1;
    if (!e.includes(t) && (r = !0,
    t)) {
        r = t[t.length - 1] !== "!";
        const i = t.replace(/!/g, "");
        e.push(i),
        (Ve(n) || ye(n)) && n[i] && (r = n[i])
    }
    return r
}
const Gv = "9.6.4"
  , Mi = -1
  , _r = "en-US"
  , ec = ""
  , tc = e=>`${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;
function Xv() {
    return {
        upper: (e,t)=>t === "text" && se(e) ? e.toUpperCase() : t === "vnode" && De(e) && "__v_isVNode"in e ? e.children.toUpperCase() : e,
        lower: (e,t)=>t === "text" && se(e) ? e.toLowerCase() : t === "vnode" && De(e) && "__v_isVNode"in e ? e.children.toLowerCase() : e,
        capitalize: (e,t)=>t === "text" && se(e) ? tc(e) : t === "vnode" && De(e) && "__v_isVNode"in e ? tc(e.children) : e
    }
}
let nd;
function nc(e) {
    nd = e
}
let rd;
function Jv(e) {
    rd = e
}
let od;
function Zv(e) {
    od = e
}
let id = null;
const rc = e=>{
    id = e
}
  , Qv = ()=>id;
let ad = null;
const oc = e=>{
    ad = e
}
  , eb = ()=>ad;
let ic = 0;
function tb(e={}) {
    const t = je(e.onWarn) ? e.onWarn : qp
      , n = se(e.version) ? e.version : Gv
      , r = se(e.locale) || je(e.locale) ? e.locale : _r
      , i = je(r) ? _r : r
      , o = Ve(e.fallbackLocale) || ye(e.fallbackLocale) || se(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : i
      , a = ye(e.messages) ? e.messages : {
        [i]: {}
    }
      , s = ye(e.datetimeFormats) ? e.datetimeFormats : {
        [i]: {}
    }
      , l = ye(e.numberFormats) ? e.numberFormats : {
        [i]: {}
    }
      , u = it({}, e.modifiers || {}, Xv())
      , c = e.pluralRules || {}
      , f = je(e.missing) ? e.missing : null
      , h = Ce(e.missingWarn) || An(e.missingWarn) ? e.missingWarn : !0
      , p = Ce(e.fallbackWarn) || An(e.fallbackWarn) ? e.fallbackWarn : !0
      , v = !!e.fallbackFormat
      , E = !!e.unresolving
      , y = je(e.postTranslation) ? e.postTranslation : null
      , g = ye(e.processor) ? e.processor : null
      , _ = Ce(e.warnHtmlMessage) ? e.warnHtmlMessage : !0
      , C = !!e.escapeParameter
      , S = je(e.messageCompiler) ? e.messageCompiler : nd
      , A = je(e.messageResolver) ? e.messageResolver : rd || Lv
      , N = je(e.localeFallbacker) ? e.localeFallbacker : od || Kv
      , x = De(e.fallbackContext) ? e.fallbackContext : void 0
      , O = e
      , M = De(O.__datetimeFormatters) ? O.__datetimeFormatters : new Map
      , B = De(O.__numberFormatters) ? O.__numberFormatters : new Map
      , T = De(O.__meta) ? O.__meta : {};
    ic++;
    const I = {
        version: n,
        cid: ic,
        locale: r,
        fallbackLocale: o,
        messages: a,
        modifiers: u,
        pluralRules: c,
        missing: f,
        missingWarn: h,
        fallbackWarn: p,
        fallbackFormat: v,
        unresolving: E,
        postTranslation: y,
        processor: g,
        warnHtmlMessage: _,
        escapeParameter: C,
        messageCompiler: S,
        messageResolver: A,
        localeFallbacker: N,
        fallbackContext: x,
        onWarn: t,
        __meta: T
    };
    return I.datetimeFormats = s,
    I.numberFormats = l,
    I.__datetimeFormatters = M,
    I.__numberFormatters = B,
    __INTLIFY_PROD_DEVTOOLS__ && Hv(I, n, T),
    I
}
function As(e, t, n, r, i) {
    const {missing: o, onWarn: a} = e;
    if (o !== null) {
        const s = o(e, n, t, i);
        return se(s) ? s : t
    } else
        return t
}
function Vr(e, t, n) {
    const r = e;
    r.__localeChainCache = new Map,
    e.localeFallbacker(e, n, t)
}
function oa(e) {
    return n=>nb(n, e)
}
function nb(e, t) {
    const n = t.b || t.body;
    if ((n.t || n.type) === 1) {
        const r = n
          , i = r.c || r.cases;
        return e.plural(i.reduce((o,a)=>[...o, ac(e, a)], []))
    } else
        return ac(e, n)
}
function ac(e, t) {
    const n = t.s || t.static;
    if (n)
        return e.type === "text" ? n : e.normalize([n]);
    {
        const r = (t.i || t.items).reduce((i,o)=>[...i, $a(e, o)], []);
        return e.normalize(r)
    }
}
function $a(e, t) {
    const n = t.t || t.type;
    switch (n) {
    case 3:
        const r = t;
        return r.v || r.value;
    case 9:
        const i = t;
        return i.v || i.value;
    case 4:
        const o = t;
        return e.interpolate(e.named(o.k || o.key));
    case 5:
        const a = t;
        return e.interpolate(e.list(a.i != null ? a.i : a.index));
    case 6:
        const s = t
          , l = s.m || s.modifier;
        return e.linked($a(e, s.k || s.key), l ? $a(e, l) : void 0, e.type);
    case 7:
        const u = t;
        return u.v || u.value;
    case 8:
        const c = t;
        return c.v || c.value;
    default:
        throw new Error(`unhandled node type on format message part: ${n}`)
    }
}
const sd = pe.__EXTEND_POINT__
  , Mo = Ps(sd)
  , Cn = {
    INVALID_ARGUMENT: sd,
    INVALID_DATE_ARGUMENT: Mo(),
    INVALID_ISO_DATE_ARGUMENT: Mo(),
    NOT_SUPPORT_NON_STRING_MESSAGE: Mo(),
    __EXTEND_POINT__: Mo()
};
function jn(e) {
    return Lr(e, null, void 0)
}
const ld = e=>e;
let mr = Object.create(null);
const Er = e=>De(e) && (e.t === 0 || e.type === 0) && ("b"in e || "body"in e);
function cd(e, t={}) {
    let n = !1;
    const r = t.onError || ev;
    return t.onError = i=>{
        n = !0,
        r(i)
    }
    ,
    {
        ...Sv(e, t),
        detectError: n
    }
}
const rb = (e,t)=>{
    if (!se(e))
        throw jn(Cn.NOT_SUPPORT_NON_STRING_MESSAGE);
    {
        Ce(t.warnHtmlMessage) && t.warnHtmlMessage;
        const r = (t.onCacheKey || ld)(e)
          , i = mr[r];
        if (i)
            return i;
        const {code: o, detectError: a} = cd(e, t)
          , s = new Function(`return ${o}`)();
        return a ? s : mr[r] = s
    }
}
;
function ob(e, t) {
    if (__INTLIFY_JIT_COMPILATION__ && !__INTLIFY_DROP_MESSAGE_COMPILER__ && se(e)) {
        Ce(t.warnHtmlMessage) && t.warnHtmlMessage;
        const r = (t.onCacheKey || ld)(e)
          , i = mr[r];
        if (i)
            return i;
        const {ast: o, detectError: a} = cd(e, {
            ...t,
            location: !1,
            jit: !0
        })
          , s = oa(o);
        return a ? s : mr[r] = s
    } else {
        const n = e.cacheKey;
        if (n) {
            const r = mr[n];
            return r || (mr[n] = oa(e))
        } else
            return oa(e)
    }
}
const sc = ()=>""
  , Ct = e=>je(e);
function lc(e, ...t) {
    const {fallbackFormat: n, postTranslation: r, unresolving: i, messageCompiler: o, fallbackLocale: a, messages: s} = e
      , [l,u] = Ba(...t)
      , c = Ce(u.missingWarn) ? u.missingWarn : e.missingWarn
      , f = Ce(u.fallbackWarn) ? u.fallbackWarn : e.fallbackWarn
      , h = Ce(u.escapeParameter) ? u.escapeParameter : e.escapeParameter
      , p = !!u.resolvedMessage
      , v = se(u.default) || Ce(u.default) ? Ce(u.default) ? o ? l : ()=>l : u.default : n ? o ? l : ()=>l : ""
      , E = n || v !== ""
      , y = Ls(e, u);
    h && ib(u);
    let[g,_,C] = p ? [l, y, s[y] || {}] : ud(e, l, y, a, f, c)
      , S = g
      , A = l;
    if (!p && !(se(S) || Er(S) || Ct(S)) && E && (S = v,
    A = S),
    !p && (!(se(S) || Er(S) || Ct(S)) || !se(_)))
        return i ? Mi : l;
    let N = !1;
    const x = ()=>{
        N = !0
    }
      , O = Ct(S) ? S : fd(e, l, _, S, A, x);
    if (N)
        return S;
    const M = lb(e, _, C, u)
      , B = Uv(M)
      , T = ab(e, O, B)
      , I = r ? r(T, l) : T;
    if (__INTLIFY_PROD_DEVTOOLS__) {
        const U = {
            timestamp: Date.now(),
            key: se(l) ? l : Ct(S) ? S.key : "",
            locale: _ || (Ct(S) ? S.locale : ""),
            format: se(S) ? S : Ct(S) ? S.source : "",
            message: I
        };
        U.meta = it({}, e.__meta, Qv() || {}),
        Wv(U)
    }
    return I
}
function ib(e) {
    Ve(e.list) ? e.list = e.list.map(t=>se(t) ? zl(t) : t) : De(e.named) && Object.keys(e.named).forEach(t=>{
        se(e.named[t]) && (e.named[t] = zl(e.named[t]))
    }
    )
}
function ud(e, t, n, r, i, o) {
    const {messages: a, onWarn: s, messageResolver: l, localeFallbacker: u} = e
      , c = u(e, r, n);
    let f = {}, h, p = null;
    const v = "translate";
    for (let E = 0; E < c.length && (h = c[E],
    f = a[h] || {},
    (p = l(f, t)) === null && (p = f[t]),
    !(se(p) || Er(p) || Ct(p))); E++) {
        const y = As(e, t, h, o, v);
        y !== t && (p = y)
    }
    return [p, h, f]
}
function fd(e, t, n, r, i, o) {
    const {messageCompiler: a, warnHtmlMessage: s} = e;
    if (Ct(r)) {
        const u = r;
        return u.locale = u.locale || n,
        u.key = u.key || t,
        u
    }
    if (a == null) {
        const u = ()=>r;
        return u.locale = n,
        u.key = t,
        u
    }
    const l = a(r, sb(e, n, i, r, s, o));
    return l.locale = n,
    l.key = t,
    l.source = r,
    l
}
function ab(e, t, n) {
    return t(n)
}
function Ba(...e) {
    const [t,n,r] = e
      , i = {};
    if (!se(t) && !Je(t) && !Ct(t) && !Er(t))
        throw jn(Cn.INVALID_ARGUMENT);
    const o = Je(t) ? String(t) : (Ct(t),
    t);
    return Je(n) ? i.plural = n : se(n) ? i.default = n : ye(n) && !Di(n) ? i.named = n : Ve(n) && (i.list = n),
    Je(r) ? i.plural = r : se(r) ? i.default = r : ye(r) && it(i, r),
    [o, i]
}
function sb(e, t, n, r, i, o) {
    return {
        locale: t,
        key: n,
        warnHtmlMessage: i,
        onError: a=>{
            throw o && o(a),
            a
        }
        ,
        onCacheKey: a=>Hp(t, n, a)
    }
}
function lb(e, t, n, r) {
    const {modifiers: i, pluralRules: o, messageResolver: a, fallbackLocale: s, fallbackWarn: l, missingWarn: u, fallbackContext: c} = e
      , h = {
        locale: t,
        modifiers: i,
        pluralRules: o,
        messages: p=>{
            let v = a(n, p);
            if (v == null && c) {
                const [,,E] = ud(c, p, t, s, l, u);
                v = a(E, p)
            }
            if (se(v) || Er(v)) {
                let E = !1;
                const g = fd(e, p, t, v, p, ()=>{
                    E = !0
                }
                );
                return E ? sc : g
            } else
                return Ct(v) ? v : sc
        }
    };
    return e.processor && (h.processor = e.processor),
    r.list && (h.list = r.list),
    r.named && (h.named = r.named),
    Je(r.plural) && (h.pluralIndex = r.plural),
    h
}
function cc(e, ...t) {
    const {datetimeFormats: n, unresolving: r, fallbackLocale: i, onWarn: o, localeFallbacker: a} = e
      , {__datetimeFormatters: s} = e
      , [l,u,c,f] = Ua(...t)
      , h = Ce(c.missingWarn) ? c.missingWarn : e.missingWarn;
    Ce(c.fallbackWarn) ? c.fallbackWarn : e.fallbackWarn;
    const p = !!c.part
      , v = Ls(e, c)
      , E = a(e, i, v);
    if (!se(l) || l === "")
        return new Intl.DateTimeFormat(v,f).format(u);
    let y = {}, g, _ = null;
    const C = "datetime format";
    for (let N = 0; N < E.length && (g = E[N],
    y = n[g] || {},
    _ = y[l],
    !ye(_)); N++)
        As(e, l, g, h, C);
    if (!ye(_) || !se(g))
        return r ? Mi : l;
    let S = `${g}__${l}`;
    Di(f) || (S = `${S}__${JSON.stringify(f)}`);
    let A = s.get(S);
    return A || (A = new Intl.DateTimeFormat(g,it({}, _, f)),
    s.set(S, A)),
    p ? A.formatToParts(u) : A.format(u)
}
const dd = ["localeMatcher", "weekday", "era", "year", "month", "day", "hour", "minute", "second", "timeZoneName", "formatMatcher", "hour12", "timeZone", "dateStyle", "timeStyle", "calendar", "dayPeriod", "numberingSystem", "hourCycle", "fractionalSecondDigits"];
function Ua(...e) {
    const [t,n,r,i] = e
      , o = {};
    let a = {}, s;
    if (se(t)) {
        const l = t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
        if (!l)
            throw jn(Cn.INVALID_ISO_DATE_ARGUMENT);
        const u = l[3] ? l[3].trim().startsWith("T") ? `${l[1].trim()}${l[3].trim()}` : `${l[1].trim()}T${l[3].trim()}` : l[1].trim();
        s = new Date(u);
        try {
            s.toISOString()
        } catch {
            throw jn(Cn.INVALID_ISO_DATE_ARGUMENT)
        }
    } else if (jp(t)) {
        if (isNaN(t.getTime()))
            throw jn(Cn.INVALID_DATE_ARGUMENT);
        s = t
    } else if (Je(t))
        s = t;
    else
        throw jn(Cn.INVALID_ARGUMENT);
    return se(n) ? o.key = n : ye(n) && Object.keys(n).forEach(l=>{
        dd.includes(l) ? a[l] = n[l] : o[l] = n[l]
    }
    ),
    se(r) ? o.locale = r : ye(r) && (a = r),
    ye(i) && (a = i),
    [o.key || "", s, o, a]
}
function uc(e, t, n) {
    const r = e;
    for (const i in n) {
        const o = `${t}__${i}`;
        !r.__datetimeFormatters.has(o) || r.__datetimeFormatters.delete(o)
    }
}
function fc(e, ...t) {
    const {numberFormats: n, unresolving: r, fallbackLocale: i, onWarn: o, localeFallbacker: a} = e
      , {__numberFormatters: s} = e
      , [l,u,c,f] = Va(...t)
      , h = Ce(c.missingWarn) ? c.missingWarn : e.missingWarn;
    Ce(c.fallbackWarn) ? c.fallbackWarn : e.fallbackWarn;
    const p = !!c.part
      , v = Ls(e, c)
      , E = a(e, i, v);
    if (!se(l) || l === "")
        return new Intl.NumberFormat(v,f).format(u);
    let y = {}, g, _ = null;
    const C = "number format";
    for (let N = 0; N < E.length && (g = E[N],
    y = n[g] || {},
    _ = y[l],
    !ye(_)); N++)
        As(e, l, g, h, C);
    if (!ye(_) || !se(g))
        return r ? Mi : l;
    let S = `${g}__${l}`;
    Di(f) || (S = `${S}__${JSON.stringify(f)}`);
    let A = s.get(S);
    return A || (A = new Intl.NumberFormat(g,it({}, _, f)),
    s.set(S, A)),
    p ? A.formatToParts(u) : A.format(u)
}
const md = ["localeMatcher", "style", "currency", "currencyDisplay", "currencySign", "useGrouping", "minimumIntegerDigits", "minimumFractionDigits", "maximumFractionDigits", "minimumSignificantDigits", "maximumSignificantDigits", "compactDisplay", "notation", "signDisplay", "unit", "unitDisplay", "roundingMode", "roundingPriority", "roundingIncrement", "trailingZeroDisplay"];
function Va(...e) {
    const [t,n,r,i] = e
      , o = {};
    let a = {};
    if (!Je(t))
        throw jn(Cn.INVALID_ARGUMENT);
    const s = t;
    return se(n) ? o.key = n : ye(n) && Object.keys(n).forEach(l=>{
        md.includes(l) ? a[l] = n[l] : o[l] = n[l]
    }
    ),
    se(r) ? o.locale = r : ye(r) && (a = r),
    ye(i) && (a = i),
    [o.key || "", s, o, a]
}
function dc(e, t, n) {
    const r = e;
    for (const i in n) {
        const o = `${t}__${i}`;
        !r.__numberFormatters.has(o) || r.__numberFormatters.delete(o)
    }
}
Tv();
/*!
  * vue-i18n v9.6.4
  * (c) 2023 kazuya kawaguchi
  * Released under the MIT License.
  */
const cb = "9.6.4";
function ub() {
    typeof __VUE_I18N_FULL_INSTALL__ != "boolean" && (tn().__VUE_I18N_FULL_INSTALL__ = !0),
    typeof __VUE_I18N_LEGACY_API__ != "boolean" && (tn().__VUE_I18N_LEGACY_API__ = !0),
    typeof __INTLIFY_JIT_COMPILATION__ != "boolean" && (tn().__INTLIFY_JIT_COMPILATION__ = !1),
    typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (tn().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1),
    typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (tn().__INTLIFY_PROD_DEVTOOLS__ = !1)
}
const hd = zv.__EXTEND_POINT__
  , vn = Ps(hd);
vn(),
vn(),
vn(),
vn(),
vn(),
vn(),
vn(),
vn();
const gd = Cn.__EXTEND_POINT__
  , pt = Ps(gd)
  , Ke = {
    UNEXPECTED_RETURN_TYPE: gd,
    INVALID_ARGUMENT: pt(),
    MUST_BE_CALL_SETUP_TOP: pt(),
    NOT_INSTALLED: pt(),
    NOT_AVAILABLE_IN_LEGACY_MODE: pt(),
    REQUIRED_VALUE: pt(),
    INVALID_VALUE: pt(),
    CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: pt(),
    NOT_INSTALLED_WITH_PROVIDE: pt(),
    UNEXPECTED_ERROR: pt(),
    NOT_COMPATIBLE_LEGACY_VUE_I18N: pt(),
    BRIDGE_SUPPORT_VUE_2_ONLY: pt(),
    MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION: pt(),
    NOT_AVAILABLE_COMPOSITION_IN_LEGACY: pt(),
    __EXTEND_POINT__: pt()
};
function Qe(e, ...t) {
    return Lr(e, null, void 0)
}
const Ha = dn("__translateVNode")
  , Wa = dn("__datetimeParts")
  , ja = dn("__numberParts")
  , pd = dn("__setPluralRules");
dn("__intlifyMeta");
const vd = dn("__injectWithOption")
  , za = dn("__dispose");
function po(e) {
    if (!De(e))
        return e;
    for (const t in e)
        if (!!ho(e, t))
            if (!t.includes("."))
                De(e[t]) && po(e[t]);
            else {
                const n = t.split(".")
                  , r = n.length - 1;
                let i = e
                  , o = !1;
                for (let a = 0; a < r; a++) {
                    if (n[a]in i || (i[n[a]] = {}),
                    !De(i[n[a]])) {
                        o = !0;
                        break
                    }
                    i = i[n[a]]
                }
                o || (i[n[r]] = e[t],
                delete e[t]),
                De(i[n[r]]) && po(i[n[r]])
            }
    return e
}
function Fi(e, t) {
    const {messages: n, __i18n: r, messageResolver: i, flatJson: o} = t
      , a = ye(n) ? n : Ve(r) ? {} : {
        [e]: {}
    };
    if (Ve(r) && r.forEach(s=>{
        if ("locale"in s && "resource"in s) {
            const {locale: l, resource: u} = s;
            l ? (a[l] = a[l] || {},
            eo(u, a[l])) : eo(u, a)
        } else
            se(s) && eo(JSON.parse(s), a)
    }
    ),
    i == null && o)
        for (const s in a)
            ho(a, s) && po(a[s]);
    return a
}
const Fo = e=>!De(e) || Ve(e);
function eo(e, t) {
    if (Fo(e) || Fo(t))
        throw Qe(Ke.INVALID_VALUE);
    for (const n in e)
        ho(e, n) && (Fo(e[n]) || Fo(t[n]) ? t[n] = e[n] : eo(e[n], t[n]))
}
function bd(e) {
    return e.type
}
function yd(e, t, n) {
    let r = De(t.messages) ? t.messages : {};
    "__i18nGlobal"in n && (r = Fi(e.locale.value, {
        messages: r,
        __i18n: n.__i18nGlobal
    }));
    const i = Object.keys(r);
    i.length && i.forEach(o=>{
        e.mergeLocaleMessage(o, r[o])
    }
    );
    {
        if (De(t.datetimeFormats)) {
            const o = Object.keys(t.datetimeFormats);
            o.length && o.forEach(a=>{
                e.mergeDateTimeFormat(a, t.datetimeFormats[a])
            }
            )
        }
        if (De(t.numberFormats)) {
            const o = Object.keys(t.numberFormats);
            o.length && o.forEach(a=>{
                e.mergeNumberFormat(a, t.numberFormats[a])
            }
            )
        }
    }
}
function mc(e) {
    return k(Ai, null, e, 0)
}
const hc = "__INTLIFY_META__"
  , gc = ()=>[]
  , fb = ()=>!1;
let pc = 0;
function vc(e) {
    return (t,n,r,i)=>e(n, r, ct() || void 0, i)
}
const db = ()=>{
    const e = ct();
    let t = null;
    return e && (t = bd(e)[hc]) ? {
        [hc]: t
    } : null
}
;
function Ns(e={}, t) {
    const {__root: n, __injectWithOption: r} = e
      , i = n === void 0
      , o = e.flatJson;
    let a = Ce(e.inheritLocale) ? e.inheritLocale : !0;
    const s = oe(n && a ? n.locale.value : se(e.locale) ? e.locale : _r)
      , l = oe(n && a ? n.fallbackLocale.value : se(e.fallbackLocale) || Ve(e.fallbackLocale) || ye(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : s.value)
      , u = oe(Fi(s.value, e))
      , c = oe(ye(e.datetimeFormats) ? e.datetimeFormats : {
        [s.value]: {}
    })
      , f = oe(ye(e.numberFormats) ? e.numberFormats : {
        [s.value]: {}
    });
    let h = n ? n.missingWarn : Ce(e.missingWarn) || An(e.missingWarn) ? e.missingWarn : !0
      , p = n ? n.fallbackWarn : Ce(e.fallbackWarn) || An(e.fallbackWarn) ? e.fallbackWarn : !0
      , v = n ? n.fallbackRoot : Ce(e.fallbackRoot) ? e.fallbackRoot : !0
      , E = !!e.fallbackFormat
      , y = je(e.missing) ? e.missing : null
      , g = je(e.missing) ? vc(e.missing) : null
      , _ = je(e.postTranslation) ? e.postTranslation : null
      , C = n ? n.warnHtmlMessage : Ce(e.warnHtmlMessage) ? e.warnHtmlMessage : !0
      , S = !!e.escapeParameter;
    const A = n ? n.modifiers : ye(e.modifiers) ? e.modifiers : {};
    let N = e.pluralRules || n && n.pluralRules, x;
    x = (()=>{
        i && oc(null);
        const R = {
            version: cb,
            locale: s.value,
            fallbackLocale: l.value,
            messages: u.value,
            modifiers: A,
            pluralRules: N,
            missing: g === null ? void 0 : g,
            missingWarn: h,
            fallbackWarn: p,
            fallbackFormat: E,
            unresolving: !0,
            postTranslation: _ === null ? void 0 : _,
            warnHtmlMessage: C,
            escapeParameter: S,
            messageResolver: e.messageResolver,
            messageCompiler: e.messageCompiler,
            __meta: {
                framework: "vue"
            }
        };
        R.datetimeFormats = c.value,
        R.numberFormats = f.value,
        R.__datetimeFormatters = ye(x) ? x.__datetimeFormatters : void 0,
        R.__numberFormatters = ye(x) ? x.__numberFormatters : void 0;
        const $ = tb(R);
        return i && oc($),
        $
    }
    )(),
    Vr(x, s.value, l.value);
    function M() {
        return [s.value, l.value, u.value, c.value, f.value]
    }
    const B = ne({
        get: ()=>s.value,
        set: R=>{
            s.value = R,
            x.locale = s.value
        }
    })
      , T = ne({
        get: ()=>l.value,
        set: R=>{
            l.value = R,
            x.fallbackLocale = l.value,
            Vr(x, s.value, R)
        }
    })
      , I = ne(()=>u.value)
      , U = ne(()=>c.value)
      , ce = ne(()=>f.value);
    function me() {
        return je(_) ? _ : null
    }
    function K(R) {
        _ = R,
        x.postTranslation = R
    }
    function ee() {
        return y
    }
    function re(R) {
        R !== null && (g = vc(R)),
        y = R,
        x.missing = g
    }
    const fe = (R,$,ae,ue,Se,Te)=>{
        M();
        let Ie;
        try {
            __INTLIFY_PROD_DEVTOOLS__ && rc(db()),
            i || (x.fallbackContext = n ? eb() : void 0),
            Ie = R(x)
        } finally {
            __INTLIFY_PROD_DEVTOOLS__ && rc(null),
            i || (x.fallbackContext = void 0)
        }
        if (ae !== "translate exists" && Je(Ie) && Ie === Mi || ae === "translate exists" && !Ie) {
            const [ut,Vt] = $();
            return n && v ? ue(n) : Se(ut)
        } else {
            if (Te(Ie))
                return Ie;
            throw Qe(Ke.UNEXPECTED_RETURN_TYPE)
        }
    }
    ;
    function Oe(...R) {
        return fe($=>Reflect.apply(lc, null, [$, ...R]), ()=>Ba(...R), "translate", $=>Reflect.apply($.t, $, [...R]), $=>$, $=>se($))
    }
    function H(...R) {
        const [$,ae,ue] = R;
        if (ue && !De(ue))
            throw Qe(Ke.INVALID_ARGUMENT);
        return Oe($, ae, it({
            resolvedMessage: !0
        }, ue || {}))
    }
    function F(...R) {
        return fe($=>Reflect.apply(cc, null, [$, ...R]), ()=>Ua(...R), "datetime format", $=>Reflect.apply($.d, $, [...R]), ()=>ec, $=>se($))
    }
    function q(...R) {
        return fe($=>Reflect.apply(fc, null, [$, ...R]), ()=>Va(...R), "number format", $=>Reflect.apply($.n, $, [...R]), ()=>ec, $=>se($))
    }
    function de(R) {
        return R.map($=>se($) || Je($) || Ce($) ? mc(String($)) : $)
    }
    const V = {
        normalize: de,
        interpolate: R=>R,
        type: "vnode"
    };
    function w(...R) {
        return fe($=>{
            let ae;
            const ue = $;
            try {
                ue.processor = V,
                ae = Reflect.apply(lc, null, [ue, ...R])
            } finally {
                ue.processor = null
            }
            return ae
        }
        , ()=>Ba(...R), "translate", $=>$[Ha](...R), $=>[mc($)], $=>Ve($))
    }
    function W(...R) {
        return fe($=>Reflect.apply(fc, null, [$, ...R]), ()=>Va(...R), "number format", $=>$[ja](...R), gc, $=>se($) || Ve($))
    }
    function X(...R) {
        return fe($=>Reflect.apply(cc, null, [$, ...R]), ()=>Ua(...R), "datetime format", $=>$[Wa](...R), gc, $=>se($) || Ve($))
    }
    function te(R) {
        N = R,
        x.pluralRules = N
    }
    function Z(R, $) {
        return fe(()=>{
            if (!R)
                return !1;
            const ae = se($) ? $ : s.value
              , ue = m(ae)
              , Se = x.messageResolver(ue, R);
            return Er(Se) || Ct(Se) || se(Se)
        }
        , ()=>[R], "translate exists", ae=>Reflect.apply(ae.te, ae, [R, $]), fb, ae=>Ce(ae))
    }
    function le(R) {
        let $ = null;
        const ae = td(x, l.value, s.value);
        for (let ue = 0; ue < ae.length; ue++) {
            const Se = u.value[ae[ue]] || {}
              , Te = x.messageResolver(Se, R);
            if (Te != null) {
                $ = Te;
                break
            }
        }
        return $
    }
    function d(R) {
        const $ = le(R);
        return $ != null ? $ : n ? n.tm(R) || {} : {}
    }
    function m(R) {
        return u.value[R] || {}
    }
    function b(R, $) {
        if (o) {
            const ae = {
                [R]: $
            };
            for (const ue in ae)
                ho(ae, ue) && po(ae[ue]);
            $ = ae[R]
        }
        u.value[R] = $,
        x.messages = u.value
    }
    function L(R, $) {
        u.value[R] = u.value[R] || {};
        const ae = {
            [R]: $
        };
        for (const ue in ae)
            ho(ae, ue) && po(ae[ue]);
        $ = ae[R],
        eo($, u.value[R]),
        x.messages = u.value
    }
    function D(R) {
        return c.value[R] || {}
    }
    function j(R, $) {
        c.value[R] = $,
        x.datetimeFormats = c.value,
        uc(x, R, $)
    }
    function Q(R, $) {
        c.value[R] = it(c.value[R] || {}, $),
        x.datetimeFormats = c.value,
        uc(x, R, $)
    }
    function G(R) {
        return f.value[R] || {}
    }
    function J(R, $) {
        f.value[R] = $,
        x.numberFormats = f.value,
        dc(x, R, $)
    }
    function Y(R, $) {
        f.value[R] = it(f.value[R] || {}, $),
        x.numberFormats = f.value,
        dc(x, R, $)
    }
    pc++,
    n && Ma && (he(n.locale, R=>{
        a && (s.value = R,
        x.locale = R,
        Vr(x, s.value, l.value))
    }
    ),
    he(n.fallbackLocale, R=>{
        a && (l.value = R,
        x.fallbackLocale = R,
        Vr(x, s.value, l.value))
    }
    ));
    const ie = {
        id: pc,
        locale: B,
        fallbackLocale: T,
        get inheritLocale() {
            return a
        },
        set inheritLocale(R) {
            a = R,
            R && n && (s.value = n.locale.value,
            l.value = n.fallbackLocale.value,
            Vr(x, s.value, l.value))
        },
        get availableLocales() {
            return Object.keys(u.value).sort()
        },
        messages: I,
        get modifiers() {
            return A
        },
        get pluralRules() {
            return N || {}
        },
        get isGlobal() {
            return i
        },
        get missingWarn() {
            return h
        },
        set missingWarn(R) {
            h = R,
            x.missingWarn = h
        },
        get fallbackWarn() {
            return p
        },
        set fallbackWarn(R) {
            p = R,
            x.fallbackWarn = p
        },
        get fallbackRoot() {
            return v
        },
        set fallbackRoot(R) {
            v = R
        },
        get fallbackFormat() {
            return E
        },
        set fallbackFormat(R) {
            E = R,
            x.fallbackFormat = E
        },
        get warnHtmlMessage() {
            return C
        },
        set warnHtmlMessage(R) {
            C = R,
            x.warnHtmlMessage = R
        },
        get escapeParameter() {
            return S
        },
        set escapeParameter(R) {
            S = R,
            x.escapeParameter = R
        },
        t: Oe,
        getLocaleMessage: m,
        setLocaleMessage: b,
        mergeLocaleMessage: L,
        getPostTranslationHandler: me,
        setPostTranslationHandler: K,
        getMissingHandler: ee,
        setMissingHandler: re,
        [pd]: te
    };
    return ie.datetimeFormats = U,
    ie.numberFormats = ce,
    ie.rt = H,
    ie.te = Z,
    ie.tm = d,
    ie.d = F,
    ie.n = q,
    ie.getDateTimeFormat = D,
    ie.setDateTimeFormat = j,
    ie.mergeDateTimeFormat = Q,
    ie.getNumberFormat = G,
    ie.setNumberFormat = J,
    ie.mergeNumberFormat = Y,
    ie[vd] = r,
    ie[Ha] = w,
    ie[Wa] = X,
    ie[ja] = W,
    ie
}
function mb(e) {
    const t = se(e.locale) ? e.locale : _r
      , n = se(e.fallbackLocale) || Ve(e.fallbackLocale) || ye(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : t
      , r = je(e.missing) ? e.missing : void 0
      , i = Ce(e.silentTranslationWarn) || An(e.silentTranslationWarn) ? !e.silentTranslationWarn : !0
      , o = Ce(e.silentFallbackWarn) || An(e.silentFallbackWarn) ? !e.silentFallbackWarn : !0
      , a = Ce(e.fallbackRoot) ? e.fallbackRoot : !0
      , s = !!e.formatFallbackMessages
      , l = ye(e.modifiers) ? e.modifiers : {}
      , u = e.pluralizationRules
      , c = je(e.postTranslation) ? e.postTranslation : void 0
      , f = se(e.warnHtmlInMessage) ? e.warnHtmlInMessage !== "off" : !0
      , h = !!e.escapeParameterHtml
      , p = Ce(e.sync) ? e.sync : !0;
    let v = e.messages;
    if (ye(e.sharedMessages)) {
        const A = e.sharedMessages;
        v = Object.keys(A).reduce((x,O)=>{
            const M = x[O] || (x[O] = {});
            return it(M, A[O]),
            x
        }
        , v || {})
    }
    const {__i18n: E, __root: y, __injectWithOption: g} = e
      , _ = e.datetimeFormats
      , C = e.numberFormats
      , S = e.flatJson;
    return {
        locale: t,
        fallbackLocale: n,
        messages: v,
        flatJson: S,
        datetimeFormats: _,
        numberFormats: C,
        missing: r,
        missingWarn: i,
        fallbackWarn: o,
        fallbackRoot: a,
        fallbackFormat: s,
        modifiers: l,
        pluralRules: u,
        postTranslation: c,
        warnHtmlMessage: f,
        escapeParameter: h,
        messageResolver: e.messageResolver,
        inheritLocale: p,
        __i18n: E,
        __root: y,
        __injectWithOption: g
    }
}
function Ka(e={}, t) {
    {
        const n = Ns(mb(e))
          , {__extender: r} = e
          , i = {
            id: n.id,
            get locale() {
                return n.locale.value
            },
            set locale(o) {
                n.locale.value = o
            },
            get fallbackLocale() {
                return n.fallbackLocale.value
            },
            set fallbackLocale(o) {
                n.fallbackLocale.value = o
            },
            get messages() {
                return n.messages.value
            },
            get datetimeFormats() {
                return n.datetimeFormats.value
            },
            get numberFormats() {
                return n.numberFormats.value
            },
            get availableLocales() {
                return n.availableLocales
            },
            get formatter() {
                return {
                    interpolate() {
                        return []
                    }
                }
            },
            set formatter(o) {},
            get missing() {
                return n.getMissingHandler()
            },
            set missing(o) {
                n.setMissingHandler(o)
            },
            get silentTranslationWarn() {
                return Ce(n.missingWarn) ? !n.missingWarn : n.missingWarn
            },
            set silentTranslationWarn(o) {
                n.missingWarn = Ce(o) ? !o : o
            },
            get silentFallbackWarn() {
                return Ce(n.fallbackWarn) ? !n.fallbackWarn : n.fallbackWarn
            },
            set silentFallbackWarn(o) {
                n.fallbackWarn = Ce(o) ? !o : o
            },
            get modifiers() {
                return n.modifiers
            },
            get formatFallbackMessages() {
                return n.fallbackFormat
            },
            set formatFallbackMessages(o) {
                n.fallbackFormat = o
            },
            get postTranslation() {
                return n.getPostTranslationHandler()
            },
            set postTranslation(o) {
                n.setPostTranslationHandler(o)
            },
            get sync() {
                return n.inheritLocale
            },
            set sync(o) {
                n.inheritLocale = o
            },
            get warnHtmlInMessage() {
                return n.warnHtmlMessage ? "warn" : "off"
            },
            set warnHtmlInMessage(o) {
                n.warnHtmlMessage = o !== "off"
            },
            get escapeParameterHtml() {
                return n.escapeParameter
            },
            set escapeParameterHtml(o) {
                n.escapeParameter = o
            },
            get preserveDirectiveContent() {
                return !0
            },
            set preserveDirectiveContent(o) {},
            get pluralizationRules() {
                return n.pluralRules || {}
            },
            __composer: n,
            t(...o) {
                const [a,s,l] = o
                  , u = {};
                let c = null
                  , f = null;
                if (!se(a))
                    throw Qe(Ke.INVALID_ARGUMENT);
                const h = a;
                return se(s) ? u.locale = s : Ve(s) ? c = s : ye(s) && (f = s),
                Ve(l) ? c = l : ye(l) && (f = l),
                Reflect.apply(n.t, n, [h, c || f || {}, u])
            },
            rt(...o) {
                return Reflect.apply(n.rt, n, [...o])
            },
            tc(...o) {
                const [a,s,l] = o
                  , u = {
                    plural: 1
                };
                let c = null
                  , f = null;
                if (!se(a))
                    throw Qe(Ke.INVALID_ARGUMENT);
                const h = a;
                return se(s) ? u.locale = s : Je(s) ? u.plural = s : Ve(s) ? c = s : ye(s) && (f = s),
                se(l) ? u.locale = l : Ve(l) ? c = l : ye(l) && (f = l),
                Reflect.apply(n.t, n, [h, c || f || {}, u])
            },
            te(o, a) {
                return n.te(o, a)
            },
            tm(o) {
                return n.tm(o)
            },
            getLocaleMessage(o) {
                return n.getLocaleMessage(o)
            },
            setLocaleMessage(o, a) {
                n.setLocaleMessage(o, a)
            },
            mergeLocaleMessage(o, a) {
                n.mergeLocaleMessage(o, a)
            },
            d(...o) {
                return Reflect.apply(n.d, n, [...o])
            },
            getDateTimeFormat(o) {
                return n.getDateTimeFormat(o)
            },
            setDateTimeFormat(o, a) {
                n.setDateTimeFormat(o, a)
            },
            mergeDateTimeFormat(o, a) {
                n.mergeDateTimeFormat(o, a)
            },
            n(...o) {
                return Reflect.apply(n.n, n, [...o])
            },
            getNumberFormat(o) {
                return n.getNumberFormat(o)
            },
            setNumberFormat(o, a) {
                n.setNumberFormat(o, a)
            },
            mergeNumberFormat(o, a) {
                n.mergeNumberFormat(o, a)
            },
            getChoiceIndex(o, a) {
                return -1
            }
        };
        return i.__extender = r,
        i
    }
}
const xs = {
    tag: {
        type: [String, Object]
    },
    locale: {
        type: String
    },
    scope: {
        type: String,
        validator: e=>e === "parent" || e === "global",
        default: "parent"
    },
    i18n: {
        type: Object
    }
};
function hb({slots: e}, t) {
    return t.length === 1 && t[0] === "default" ? (e.default ? e.default() : []).reduce((r,i)=>[...r, ...i.type === ot ? i.children : [i]], []) : t.reduce((n,r)=>{
        const i = e[r];
        return i && (n[r] = i()),
        n
    }
    , {})
}
function _d(e) {
    return ot
}
const gb = Ee({
    name: "i18n-t",
    props: it({
        keypath: {
            type: String,
            required: !0
        },
        plural: {
            type: [Number, String],
            validator: e=>Je(e) || !isNaN(e)
        }
    }, xs),
    setup(e, t) {
        const {slots: n, attrs: r} = t
          , i = e.i18n || Ds({
            useScope: e.scope,
            __useComponent: !0
        });
        return ()=>{
            const o = Object.keys(n).filter(f=>f !== "_")
              , a = {};
            e.locale && (a.locale = e.locale),
            e.plural !== void 0 && (a.plural = se(e.plural) ? +e.plural : e.plural);
            const s = hb(t, o)
              , l = i[Ha](e.keypath, s, a)
              , u = it({}, r)
              , c = se(e.tag) || De(e.tag) ? e.tag : _d();
            return wo(c, u, l)
        }
    }
})
  , bc = gb;
function pb(e) {
    return Ve(e) && !se(e[0])
}
function Ed(e, t, n, r) {
    const {slots: i, attrs: o} = t;
    return ()=>{
        const a = {
            part: !0
        };
        let s = {};
        e.locale && (a.locale = e.locale),
        se(e.format) ? a.key = e.format : De(e.format) && (se(e.format.key) && (a.key = e.format.key),
        s = Object.keys(e.format).reduce((h,p)=>n.includes(p) ? it({}, h, {
            [p]: e.format[p]
        }) : h, {}));
        const l = r(e.value, a, s);
        let u = [a.key];
        Ve(l) ? u = l.map((h,p)=>{
            const v = i[h.type]
              , E = v ? v({
                [h.type]: h.value,
                index: p,
                parts: l
            }) : [h.value];
            return pb(E) && (E[0].key = `${h.type}-${p}`),
            E
        }
        ) : se(l) && (u = [l]);
        const c = it({}, o)
          , f = se(e.tag) || De(e.tag) ? e.tag : _d();
        return wo(f, c, u)
    }
}
const vb = Ee({
    name: "i18n-n",
    props: it({
        value: {
            type: Number,
            required: !0
        },
        format: {
            type: [String, Object]
        }
    }, xs),
    setup(e, t) {
        const n = e.i18n || Ds({
            useScope: "parent",
            __useComponent: !0
        });
        return Ed(e, t, md, (...r)=>n[ja](...r))
    }
})
  , yc = vb
  , bb = Ee({
    name: "i18n-d",
    props: it({
        value: {
            type: [Number, Date],
            required: !0
        },
        format: {
            type: [String, Object]
        }
    }, xs),
    setup(e, t) {
        const n = e.i18n || Ds({
            useScope: "parent",
            __useComponent: !0
        });
        return Ed(e, t, dd, (...r)=>n[Wa](...r))
    }
})
  , _c = bb;
function yb(e, t) {
    const n = e;
    if (e.mode === "composition")
        return n.__getInstance(t) || e.global;
    {
        const r = n.__getInstance(t);
        return r != null ? r.__composer : e.global.__composer
    }
}
function _b(e) {
    const t = a=>{
        const {instance: s, modifiers: l, value: u} = a;
        if (!s || !s.$)
            throw Qe(Ke.UNEXPECTED_ERROR);
        const c = yb(e, s.$)
          , f = Ec(u);
        return [Reflect.apply(c.t, c, [...wc(f)]), c]
    }
    ;
    return {
        created: (a,s)=>{
            const [l,u] = t(s);
            Ma && e.global === u && (a.__i18nWatcher = he(u.locale, ()=>{
                s.instance && s.instance.$forceUpdate()
            }
            )),
            a.__composer = u,
            a.textContent = l
        }
        ,
        unmounted: a=>{
            Ma && a.__i18nWatcher && (a.__i18nWatcher(),
            a.__i18nWatcher = void 0,
            delete a.__i18nWatcher),
            a.__composer && (a.__composer = void 0,
            delete a.__composer)
        }
        ,
        beforeUpdate: (a,{value: s})=>{
            if (a.__composer) {
                const l = a.__composer
                  , u = Ec(s);
                a.textContent = Reflect.apply(l.t, l, [...wc(u)])
            }
        }
        ,
        getSSRProps: a=>{
            const [s] = t(a);
            return {
                textContent: s
            }
        }
    }
}
function Ec(e) {
    if (se(e))
        return {
            path: e
        };
    if (ye(e)) {
        if (!("path"in e))
            throw Qe(Ke.REQUIRED_VALUE, "path");
        return e
    } else
        throw Qe(Ke.INVALID_VALUE)
}
function wc(e) {
    const {path: t, locale: n, args: r, choice: i, plural: o} = e
      , a = {}
      , s = r || {};
    return se(n) && (a.locale = n),
    Je(i) && (a.plural = i),
    Je(o) && (a.plural = o),
    [t, s, a]
}
function Eb(e, t, ...n) {
    const r = ye(n[0]) ? n[0] : {}
      , i = !!r.useI18nComponentName;
    (Ce(r.globalInstall) ? r.globalInstall : !0) && ([i ? "i18n" : bc.name, "I18nT"].forEach(a=>e.component(a, bc)),
    [yc.name, "I18nN"].forEach(a=>e.component(a, yc)),
    [_c.name, "I18nD"].forEach(a=>e.component(a, _c))),
    e.directive("t", _b(t))
}
function wb(e, t, n) {
    return {
        beforeCreate() {
            const r = ct();
            if (!r)
                throw Qe(Ke.UNEXPECTED_ERROR);
            const i = this.$options;
            if (i.i18n) {
                const o = i.i18n;
                if (i.__i18n && (o.__i18n = i.__i18n),
                o.__root = t,
                this === this.$root)
                    this.$i18n = Sc(e, o);
                else {
                    o.__injectWithOption = !0,
                    o.__extender = n.__vueI18nExtend,
                    this.$i18n = Ka(o);
                    const a = this.$i18n;
                    a.__extender && (a.__disposer = a.__extender(this.$i18n))
                }
            } else if (i.__i18n)
                if (this === this.$root)
                    this.$i18n = Sc(e, i);
                else {
                    this.$i18n = Ka({
                        __i18n: i.__i18n,
                        __injectWithOption: !0,
                        __extender: n.__vueI18nExtend,
                        __root: t
                    });
                    const o = this.$i18n;
                    o.__extender && (o.__disposer = o.__extender(this.$i18n))
                }
            else
                this.$i18n = e;
            i.__i18nGlobal && yd(t, i, i),
            this.$t = (...o)=>this.$i18n.t(...o),
            this.$rt = (...o)=>this.$i18n.rt(...o),
            this.$tc = (...o)=>this.$i18n.tc(...o),
            this.$te = (o,a)=>this.$i18n.te(o, a),
            this.$d = (...o)=>this.$i18n.d(...o),
            this.$n = (...o)=>this.$i18n.n(...o),
            this.$tm = o=>this.$i18n.tm(o),
            n.__setInstance(r, this.$i18n)
        },
        mounted() {},
        unmounted() {
            const r = ct();
            if (!r)
                throw Qe(Ke.UNEXPECTED_ERROR);
            const i = this.$i18n;
            delete this.$t,
            delete this.$rt,
            delete this.$tc,
            delete this.$te,
            delete this.$d,
            delete this.$n,
            delete this.$tm,
            i.__disposer && (i.__disposer(),
            delete i.__disposer,
            delete i.__extender),
            n.__deleteInstance(r),
            delete this.$i18n
        }
    }
}
function Sc(e, t) {
    e.locale = t.locale || e.locale,
    e.fallbackLocale = t.fallbackLocale || e.fallbackLocale,
    e.missing = t.missing || e.missing,
    e.silentTranslationWarn = t.silentTranslationWarn || e.silentFallbackWarn,
    e.silentFallbackWarn = t.silentFallbackWarn || e.silentFallbackWarn,
    e.formatFallbackMessages = t.formatFallbackMessages || e.formatFallbackMessages,
    e.postTranslation = t.postTranslation || e.postTranslation,
    e.warnHtmlInMessage = t.warnHtmlInMessage || e.warnHtmlInMessage,
    e.escapeParameterHtml = t.escapeParameterHtml || e.escapeParameterHtml,
    e.sync = t.sync || e.sync,
    e.__composer[pd](t.pluralizationRules || e.pluralizationRules);
    const n = Fi(e.locale, {
        messages: t.messages,
        __i18n: t.__i18n
    });
    return Object.keys(n).forEach(r=>e.mergeLocaleMessage(r, n[r])),
    t.datetimeFormats && Object.keys(t.datetimeFormats).forEach(r=>e.mergeDateTimeFormat(r, t.datetimeFormats[r])),
    t.numberFormats && Object.keys(t.numberFormats).forEach(r=>e.mergeNumberFormat(r, t.numberFormats[r])),
    e
}
const Sb = dn("global-vue-i18n");
function Tb(e={}, t) {
    const n = __VUE_I18N_LEGACY_API__ && Ce(e.legacy) ? e.legacy : __VUE_I18N_LEGACY_API__
      , r = Ce(e.globalInjection) ? e.globalInjection : !0
      , i = __VUE_I18N_LEGACY_API__ && n ? !!e.allowComposition : !0
      , o = new Map
      , [a,s] = Cb(e, n)
      , l = dn("");
    function u(h) {
        return o.get(h) || null
    }
    function c(h, p) {
        o.set(h, p)
    }
    function f(h) {
        o.delete(h)
    }
    {
        const h = {
            get mode() {
                return __VUE_I18N_LEGACY_API__ && n ? "legacy" : "composition"
            },
            get allowComposition() {
                return i
            },
            async install(p, ...v) {
                if (p.__VUE_I18N_SYMBOL__ = l,
                p.provide(p.__VUE_I18N_SYMBOL__, h),
                ye(v[0])) {
                    const g = v[0];
                    h.__composerExtend = g.__composerExtend,
                    h.__vueI18nExtend = g.__vueI18nExtend
                }
                let E = null;
                !n && r && (E = xb(p, h.global)),
                __VUE_I18N_FULL_INSTALL__ && Eb(p, h, ...v),
                __VUE_I18N_LEGACY_API__ && n && p.mixin(wb(s, s.__composer, h));
                const y = p.unmount;
                p.unmount = ()=>{
                    E && E(),
                    h.dispose(),
                    y()
                }
            },
            get global() {
                return s
            },
            dispose() {
                a.stop()
            },
            __instances: o,
            __getInstance: u,
            __setInstance: c,
            __deleteInstance: f
        };
        return h
    }
}
function Ds(e={}) {
    const t = ct();
    if (t == null)
        throw Qe(Ke.MUST_BE_CALL_SETUP_TOP);
    if (!t.isCE && t.appContext.app != null && !t.appContext.app.__VUE_I18N_SYMBOL__)
        throw Qe(Ke.NOT_INSTALLED);
    const n = Ob(t)
      , r = Ib(n)
      , i = bd(t)
      , o = kb(e, i);
    if (__VUE_I18N_LEGACY_API__ && n.mode === "legacy" && !e.__useComponent) {
        if (!n.allowComposition)
            throw Qe(Ke.NOT_AVAILABLE_IN_LEGACY_MODE);
        return Ab(t, o, r, e)
    }
    if (o === "global")
        return yd(r, e, i),
        r;
    if (o === "parent") {
        let l = Pb(n, t, e.__useComponent);
        return l == null && (l = r),
        l
    }
    const a = n;
    let s = a.__getInstance(t);
    if (s == null) {
        const l = it({}, e);
        "__i18n"in i && (l.__i18n = i.__i18n),
        r && (l.__root = r),
        s = Ns(l),
        a.__composerExtend && (s[za] = a.__composerExtend(s)),
        Lb(a, t, s),
        a.__setInstance(t, s)
    }
    return s
}
function Cb(e, t, n) {
    const r = Oh();
    {
        const i = __VUE_I18N_LEGACY_API__ && t ? r.run(()=>Ka(e)) : r.run(()=>Ns(e));
        if (i == null)
            throw Qe(Ke.UNEXPECTED_ERROR);
        return [r, i]
    }
}
function Ob(e) {
    {
        const t = Et(e.isCE ? Sb : e.appContext.app.__VUE_I18N_SYMBOL__);
        if (!t)
            throw Qe(e.isCE ? Ke.NOT_INSTALLED_WITH_PROVIDE : Ke.UNEXPECTED_ERROR);
        return t
    }
}
function kb(e, t) {
    return Di(e) ? "__i18n"in t ? "local" : "global" : e.useScope ? e.useScope : "local"
}
function Ib(e) {
    return e.mode === "composition" ? e.global : e.global.__composer
}
function Pb(e, t, n=!1) {
    let r = null;
    const i = t.root;
    let o = Rb(t, n);
    for (; o != null; ) {
        const a = e;
        if (e.mode === "composition")
            r = a.__getInstance(o);
        else if (__VUE_I18N_LEGACY_API__) {
            const s = a.__getInstance(o);
            s != null && (r = s.__composer,
            n && r && !r[vd] && (r = null))
        }
        if (r != null || i === o)
            break;
        o = o.parent
    }
    return r
}
function Rb(e, t=!1) {
    return e == null ? null : t && e.vnode.ctx || e.parent
}
function Lb(e, t, n) {
    gt(()=>{}
    , t),
    Rr(()=>{
        const r = n;
        e.__deleteInstance(t);
        const i = r[za];
        i && (i(),
        delete r[za])
    }
    , t)
}
function Ab(e, t, n, r={}) {
    const i = t === "local"
      , o = of(null);
    if (i && e.proxy && !(e.proxy.$options.i18n || e.proxy.$options.__i18n))
        throw Qe(Ke.MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION);
    const a = Ce(r.inheritLocale) ? r.inheritLocale : !se(r.locale)
      , s = oe(!i || a ? n.locale.value : se(r.locale) ? r.locale : _r)
      , l = oe(!i || a ? n.fallbackLocale.value : se(r.fallbackLocale) || Ve(r.fallbackLocale) || ye(r.fallbackLocale) || r.fallbackLocale === !1 ? r.fallbackLocale : s.value)
      , u = oe(Fi(s.value, r))
      , c = oe(ye(r.datetimeFormats) ? r.datetimeFormats : {
        [s.value]: {}
    })
      , f = oe(ye(r.numberFormats) ? r.numberFormats : {
        [s.value]: {}
    })
      , h = i ? n.missingWarn : Ce(r.missingWarn) || An(r.missingWarn) ? r.missingWarn : !0
      , p = i ? n.fallbackWarn : Ce(r.fallbackWarn) || An(r.fallbackWarn) ? r.fallbackWarn : !0
      , v = i ? n.fallbackRoot : Ce(r.fallbackRoot) ? r.fallbackRoot : !0
      , E = !!r.fallbackFormat
      , y = je(r.missing) ? r.missing : null
      , g = je(r.postTranslation) ? r.postTranslation : null
      , _ = i ? n.warnHtmlMessage : Ce(r.warnHtmlMessage) ? r.warnHtmlMessage : !0
      , C = !!r.escapeParameter
      , S = i ? n.modifiers : ye(r.modifiers) ? r.modifiers : {}
      , A = r.pluralRules || i && n.pluralRules;
    function N() {
        return [s.value, l.value, u.value, c.value, f.value]
    }
    const x = ne({
        get: ()=>o.value ? o.value.locale.value : s.value,
        set: m=>{
            o.value && (o.value.locale.value = m),
            s.value = m
        }
    })
      , O = ne({
        get: ()=>o.value ? o.value.fallbackLocale.value : l.value,
        set: m=>{
            o.value && (o.value.fallbackLocale.value = m),
            l.value = m
        }
    })
      , M = ne(()=>o.value ? o.value.messages.value : u.value)
      , B = ne(()=>c.value)
      , T = ne(()=>f.value);
    function I() {
        return o.value ? o.value.getPostTranslationHandler() : g
    }
    function U(m) {
        o.value && o.value.setPostTranslationHandler(m)
    }
    function ce() {
        return o.value ? o.value.getMissingHandler() : y
    }
    function me(m) {
        o.value && o.value.setMissingHandler(m)
    }
    function K(m) {
        return N(),
        m()
    }
    function ee(...m) {
        return o.value ? K(()=>Reflect.apply(o.value.t, null, [...m])) : K(()=>"")
    }
    function re(...m) {
        return o.value ? Reflect.apply(o.value.rt, null, [...m]) : ""
    }
    function fe(...m) {
        return o.value ? K(()=>Reflect.apply(o.value.d, null, [...m])) : K(()=>"")
    }
    function Oe(...m) {
        return o.value ? K(()=>Reflect.apply(o.value.n, null, [...m])) : K(()=>"")
    }
    function H(m) {
        return o.value ? o.value.tm(m) : {}
    }
    function F(m, b) {
        return o.value ? o.value.te(m, b) : !1
    }
    function q(m) {
        return o.value ? o.value.getLocaleMessage(m) : {}
    }
    function de(m, b) {
        o.value && (o.value.setLocaleMessage(m, b),
        u.value[m] = b)
    }
    function P(m, b) {
        o.value && o.value.mergeLocaleMessage(m, b)
    }
    function V(m) {
        return o.value ? o.value.getDateTimeFormat(m) : {}
    }
    function w(m, b) {
        o.value && (o.value.setDateTimeFormat(m, b),
        c.value[m] = b)
    }
    function W(m, b) {
        o.value && o.value.mergeDateTimeFormat(m, b)
    }
    function X(m) {
        return o.value ? o.value.getNumberFormat(m) : {}
    }
    function te(m, b) {
        o.value && (o.value.setNumberFormat(m, b),
        f.value[m] = b)
    }
    function Z(m, b) {
        o.value && o.value.mergeNumberFormat(m, b)
    }
    const le = {
        get id() {
            return o.value ? o.value.id : -1
        },
        locale: x,
        fallbackLocale: O,
        messages: M,
        datetimeFormats: B,
        numberFormats: T,
        get inheritLocale() {
            return o.value ? o.value.inheritLocale : a
        },
        set inheritLocale(m) {
            o.value && (o.value.inheritLocale = m)
        },
        get availableLocales() {
            return o.value ? o.value.availableLocales : Object.keys(u.value)
        },
        get modifiers() {
            return o.value ? o.value.modifiers : S
        },
        get pluralRules() {
            return o.value ? o.value.pluralRules : A
        },
        get isGlobal() {
            return o.value ? o.value.isGlobal : !1
        },
        get missingWarn() {
            return o.value ? o.value.missingWarn : h
        },
        set missingWarn(m) {
            o.value && (o.value.missingWarn = m)
        },
        get fallbackWarn() {
            return o.value ? o.value.fallbackWarn : p
        },
        set fallbackWarn(m) {
            o.value && (o.value.missingWarn = m)
        },
        get fallbackRoot() {
            return o.value ? o.value.fallbackRoot : v
        },
        set fallbackRoot(m) {
            o.value && (o.value.fallbackRoot = m)
        },
        get fallbackFormat() {
            return o.value ? o.value.fallbackFormat : E
        },
        set fallbackFormat(m) {
            o.value && (o.value.fallbackFormat = m)
        },
        get warnHtmlMessage() {
            return o.value ? o.value.warnHtmlMessage : _
        },
        set warnHtmlMessage(m) {
            o.value && (o.value.warnHtmlMessage = m)
        },
        get escapeParameter() {
            return o.value ? o.value.escapeParameter : C
        },
        set escapeParameter(m) {
            o.value && (o.value.escapeParameter = m)
        },
        t: ee,
        getPostTranslationHandler: I,
        setPostTranslationHandler: U,
        getMissingHandler: ce,
        setMissingHandler: me,
        rt: re,
        d: fe,
        n: Oe,
        tm: H,
        te: F,
        getLocaleMessage: q,
        setLocaleMessage: de,
        mergeLocaleMessage: P,
        getDateTimeFormat: V,
        setDateTimeFormat: w,
        mergeDateTimeFormat: W,
        getNumberFormat: X,
        setNumberFormat: te,
        mergeNumberFormat: Z
    };
    function d(m) {
        m.locale.value = s.value,
        m.fallbackLocale.value = l.value,
        Object.keys(u.value).forEach(b=>{
            m.mergeLocaleMessage(b, u.value[b])
        }
        ),
        Object.keys(c.value).forEach(b=>{
            m.mergeDateTimeFormat(b, c.value[b])
        }
        ),
        Object.keys(f.value).forEach(b=>{
            m.mergeNumberFormat(b, f.value[b])
        }
        ),
        m.escapeParameter = C,
        m.fallbackFormat = E,
        m.fallbackRoot = v,
        m.fallbackWarn = p,
        m.missingWarn = h,
        m.warnHtmlMessage = _
    }
    return Ef(()=>{
        if (e.proxy == null || e.proxy.$i18n == null)
            throw Qe(Ke.NOT_AVAILABLE_COMPOSITION_IN_LEGACY);
        const m = o.value = e.proxy.$i18n.__composer;
        t === "global" ? (s.value = m.locale.value,
        l.value = m.fallbackLocale.value,
        u.value = m.messages.value,
        c.value = m.datetimeFormats.value,
        f.value = m.numberFormats.value) : i && d(m)
    }
    ),
    le
}
const Nb = ["locale", "fallbackLocale", "availableLocales"]
  , Tc = ["t", "rt", "d", "n", "tm", "te"];
function xb(e, t) {
    const n = Object.create(null);
    return Nb.forEach(i=>{
        const o = Object.getOwnPropertyDescriptor(t, i);
        if (!o)
            throw Qe(Ke.UNEXPECTED_ERROR);
        const a = Ze(o.value) ? {
            get() {
                return o.value.value
            },
            set(s) {
                o.value.value = s
            }
        } : {
            get() {
                return o.get && o.get()
            }
        };
        Object.defineProperty(n, i, a)
    }
    ),
    e.config.globalProperties.$i18n = n,
    Tc.forEach(i=>{
        const o = Object.getOwnPropertyDescriptor(t, i);
        if (!o || !o.value)
            throw Qe(Ke.UNEXPECTED_ERROR);
        Object.defineProperty(e.config.globalProperties, `$${i}`, o)
    }
    ),
    ()=>{
        delete e.config.globalProperties.$i18n,
        Tc.forEach(i=>{
            delete e.config.globalProperties[`$${i}`]
        }
        )
    }
}
ub();
__INTLIFY_JIT_COMPILATION__ ? nc(ob) : nc(rb);
Jv(Av);
Zv(td);
if (__INTLIFY_PROD_DEVTOOLS__) {
    const e = tn();
    e.__INTLIFY__ = !0,
    Vv(e.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__)
}
function Ya() {}
const Me = Object.assign
  , qt = typeof window != "undefined"
  , qn = e=>e !== null && typeof e == "object"
  , Ue = e=>e != null
  , wr = e=>typeof e == "function"
  , Ms = e=>qn(e) && wr(e.then) && wr(e.catch)
  , wd = e=>typeof e == "number" || /^\d+(\.\d+)?$/.test(e)
  , Db = ()=>qt ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) : !1;
function Cc(e, t) {
    const n = t.split(".");
    let r = e;
    return n.forEach(i=>{
        var o;
        r = qn(r) && (o = r[i]) != null ? o : ""
    }
    ),
    r
}
function _t(e, t, n) {
    return t.reduce((r,i)=>((!n || e[i] !== void 0) && (r[i] = e[i]),
    r), {})
}
const to = (e,t)=>JSON.stringify(e) === JSON.stringify(t)
  , mi = e=>Array.isArray(e) ? e : [e]
  , Mb = e=>e.reduce((t,n)=>t.concat(n), [])
  , st = null
  , ge = [Number, String]
  , ve = {
    type: Boolean,
    default: !0
}
  , kt = e=>({
    type: e,
    required: !0
})
  , Gn = ()=>({
    type: Array,
    default: ()=>[]
})
  , Sd = e=>({
    type: Number,
    default: e
})
  , Ae = e=>({
    type: ge,
    default: e
})
  , _e = e=>({
    type: String,
    default: e
});
var Qn = typeof window != "undefined";
function Nn(e) {
    return Qn ? requestAnimationFrame(e) : -1
}
function Fs(e) {
    Qn && cancelAnimationFrame(e)
}
function Gr(e) {
    Nn(()=>Nn(e))
}
var Fb = e=>e === window
  , Oc = (e,t)=>({
    top: 0,
    left: 0,
    right: e,
    bottom: t,
    width: e,
    height: t
})
  , It = e=>{
    const t = Mt(e);
    if (Fb(t)) {
        const n = t.innerWidth
          , r = t.innerHeight;
        return Oc(n, r)
    }
    return t != null && t.getBoundingClientRect ? t.getBoundingClientRect() : Oc(0, 0)
}
;
function Ar(e) {
    const t = Et(e, null);
    if (t) {
        const n = ct()
          , {link: r, unlink: i, internalChildren: o} = t;
        r(n),
        Rr(()=>i(n));
        const a = ne(()=>o.indexOf(n));
        return {
            parent: t,
            index: a
        }
    }
    return {
        parent: null,
        index: oe(-1)
    }
}
function $b(e) {
    const t = []
      , n = r=>{
        Array.isArray(r) && r.forEach(i=>{
            var o;
            di(i) && (t.push(i),
            (o = i.component) != null && o.subTree && (t.push(i.component.subTree),
            n(i.component.subTree.children)),
            i.children && n(i.children))
        }
        )
    }
    ;
    return n(e),
    t
}
var kc = (e,t)=>{
    const n = e.indexOf(t);
    return n === -1 ? e.findIndex(r=>t.key !== void 0 && t.key !== null && r.type === t.type && r.key === t.key) : n
}
;
function Bb(e, t, n) {
    const r = $b(e.subTree.children);
    n.sort((o,a)=>kc(r, o.vnode) - kc(r, a.vnode));
    const i = n.map(o=>o.proxy);
    t.sort((o,a)=>{
        const s = i.indexOf(o)
          , l = i.indexOf(a);
        return s - l
    }
    )
}
function To(e) {
    const t = rt([])
      , n = rt([])
      , r = ct();
    return {
        children: t,
        linkChildren: o=>{
            rn(e, Object.assign({
                link: l=>{
                    l.proxy && (n.push(l),
                    t.push(l.proxy),
                    Bb(r, t, n))
                }
                ,
                unlink: l=>{
                    const u = n.indexOf(l);
                    t.splice(u, 1),
                    n.splice(u, 1)
                }
                ,
                children: t,
                internalChildren: n
            }, o))
        }
    }
}
function $i(e) {
    let t;
    gt(()=>{
        e(),
        Be(()=>{
            t = !0
        }
        )
    }
    ),
    Pr(()=>{
        t && e()
    }
    )
}
function Bt(e, t, n={}) {
    if (!Qn)
        return;
    const {target: r=window, passive: i=!1, capture: o=!1} = n;
    let a = !1, s;
    const l = f=>{
        if (a)
            return;
        const h = Mt(f);
        h && !s && (h.addEventListener(e, t, {
            capture: o,
            passive: i
        }),
        s = !0)
    }
      , u = f=>{
        if (a)
            return;
        const h = Mt(f);
        h && s && (h.removeEventListener(e, t, o),
        s = !1)
    }
    ;
    Rr(()=>u(r)),
    Zn(()=>u(r)),
    $i(()=>l(r));
    let c;
    return Ze(r) && (c = he(r, (f,h)=>{
        u(h),
        l(f)
    }
    )),
    ()=>{
        c == null || c(),
        u(r),
        a = !0
    }
}
function Ub(e, t, n={}) {
    if (!Qn)
        return;
    const {eventName: r="click"} = n;
    Bt(r, o=>{
        (Array.isArray(e) ? e : [e]).every(l=>{
            const u = Mt(l);
            return u && !u.contains(o.target)
        }
        ) && t(o)
    }
    , {
        target: document
    })
}
var $o, ia;
function Vb() {
    if (!$o && ($o = oe(0),
    ia = oe(0),
    Qn)) {
        const e = ()=>{
            $o.value = window.innerWidth,
            ia.value = window.innerHeight
        }
        ;
        e(),
        window.addEventListener("resize", e, {
            passive: !0
        }),
        window.addEventListener("orientationchange", e, {
            passive: !0
        })
    }
    return {
        width: $o,
        height: ia
    }
}
var Hb = /scroll|auto|overlay/i
  , Td = Qn ? window : void 0;
function Wb(e) {
    return e.tagName !== "HTML" && e.tagName !== "BODY" && e.nodeType === 1
}
function Cd(e, t=Td) {
    let n = e;
    for (; n && n !== t && Wb(n); ) {
        const {overflowY: r} = window.getComputedStyle(n);
        if (Hb.test(r))
            return n;
        n = n.parentNode
    }
    return t
}
function Od(e, t=Td) {
    const n = oe();
    return gt(()=>{
        e.value && (n.value = Cd(e.value, t))
    }
    ),
    n
}
var Bo;
function jb() {
    if (!Bo && (Bo = oe("visible"),
    Qn)) {
        const e = ()=>{
            Bo.value = document.hidden ? "hidden" : "visible"
        }
        ;
        e(),
        window.addEventListener("visibilitychange", e)
    }
    return Bo
}
var kd = Symbol("van-field");
function Bi(e) {
    const t = Et(kd, null);
    t && !t.customValue.value && (t.customValue.value = e,
    he(e, ()=>{
        t.resetValidation(),
        t.validateWithTrigger("onChange")
    }
    ))
}
function $s(e) {
    const t = "scrollTop"in e ? e.scrollTop : e.pageYOffset;
    return Math.max(t, 0)
}
function qa(e, t) {
    "scrollTop"in e ? e.scrollTop = t : e.scrollTo(e.scrollX, t)
}
function Bs() {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
}
function Us(e) {
    qa(window, e),
    qa(document.body, e)
}
function Ic(e, t) {
    if (e === window)
        return 0;
    const n = t ? $s(t) : Bs();
    return It(e).top + n
}
const zb = Db();
function Id() {
    zb && Us(Bs())
}
const Pd = e=>e.stopPropagation();
function lt(e, t) {
    (typeof e.cancelable != "boolean" || e.cancelable) && e.preventDefault(),
    t && Pd(e)
}
function vo(e) {
    const t = Mt(e);
    if (!t)
        return !1;
    const n = window.getComputedStyle(t)
      , r = n.display === "none"
      , i = t.offsetParent === null && n.position !== "fixed";
    return r || i
}
const {width: Nr, height: Co} = Vb();
function We(e) {
    if (Ue(e))
        return wd(e) ? `${e}px` : String(e)
}
function xr(e) {
    if (Ue(e)) {
        if (Array.isArray(e))
            return {
                width: We(e[0]),
                height: We(e[1])
            };
        const t = We(e);
        return {
            width: t,
            height: t
        }
    }
}
function Rd(e) {
    const t = {};
    return e !== void 0 && (t.zIndex = +e),
    t
}
let aa;
function Kb() {
    if (!aa) {
        const e = document.documentElement
          , t = e.style.fontSize || window.getComputedStyle(e).fontSize;
        aa = parseFloat(t)
    }
    return aa
}
function Yb(e) {
    return e = e.replace(/rem/g, ""),
    +e * Kb()
}
function qb(e) {
    return e = e.replace(/vw/g, ""),
    +e * Nr.value / 100
}
function Gb(e) {
    return e = e.replace(/vh/g, ""),
    +e * Co.value / 100
}
function Vs(e) {
    if (typeof e == "number")
        return e;
    if (qt) {
        if (e.includes("rem"))
            return Yb(e);
        if (e.includes("vw"))
            return qb(e);
        if (e.includes("vh"))
            return Gb(e)
    }
    return parseFloat(e)
}
const Xb = /-(\w)/g
  , Ld = e=>e.replace(Xb, (t,n)=>n.toUpperCase())
  , Jb = e=>e.replace(/([A-Z])/g, "-$1").toLowerCase().replace(/^-/, "")
  , ht = (e,t,n)=>Math.min(Math.max(e, t), n);
function Pc(e, t, n) {
    const r = e.indexOf(t);
    return r === -1 ? e : t === "-" && r !== 0 ? e.slice(0, r) : e.slice(0, r + 1) + e.slice(r).replace(n, "")
}
function Ga(e, t=!0, n=!0) {
    t ? e = Pc(e, ".", /\./g) : e = e.split(".")[0],
    n ? e = Pc(e, "-", /-/g) : e = e.replace(/-/, "");
    const r = t ? /[^-0-9.]/g : /[^-0-9]/g;
    return e.replace(r, "")
}
function Ad(e, t) {
    return Math.round((e + t) * 1e10) / 1e10
}
const {hasOwnProperty: Zb} = Object.prototype;
function Qb(e, t, n) {
    const r = t[n];
    !Ue(r) || (!Zb.call(e, n) || !qn(r) ? e[n] = r : e[n] = Nd(Object(e[n]), r))
}
function Nd(e, t) {
    return Object.keys(t).forEach(n=>{
        Qb(e, t, n)
    }
    ),
    e
}
var ey = {
    name: "\u59D3\u540D",
    tel: "\u7535\u8BDD",
    save: "\u4FDD\u5B58",
    clear: "\u6E05\u7A7A",
    cancel: "\u53D6\u6D88",
    confirm: "\u786E\u8BA4",
    delete: "\u5220\u9664",
    loading: "\u52A0\u8F7D\u4E2D...",
    noCoupon: "\u6682\u65E0\u4F18\u60E0\u5238",
    nameEmpty: "\u8BF7\u586B\u5199\u59D3\u540D",
    addContact: "\u6DFB\u52A0\u8054\u7CFB\u4EBA",
    telInvalid: "\u8BF7\u586B\u5199\u6B63\u786E\u7684\u7535\u8BDD",
    vanCalendar: {
        end: "\u7ED3\u675F",
        start: "\u5F00\u59CB",
        title: "\u65E5\u671F\u9009\u62E9",
        weekdays: ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"],
        monthTitle: (e,t)=>`${e}\u5E74${t}\u6708`,
        rangePrompt: e=>`\u6700\u591A\u9009\u62E9 ${e} \u5929`
    },
    vanCascader: {
        select: "\u8BF7\u9009\u62E9"
    },
    vanPagination: {
        prev: "\u4E0A\u4E00\u9875",
        next: "\u4E0B\u4E00\u9875"
    },
    vanPullRefresh: {
        pulling: "\u4E0B\u62C9\u5373\u53EF\u5237\u65B0...",
        loosing: "\u91CA\u653E\u5373\u53EF\u5237\u65B0..."
    },
    vanSubmitBar: {
        label: "\u5408\u8BA1:"
    },
    vanCoupon: {
        unlimited: "\u65E0\u95E8\u69DB",
        discount: e=>`${e}\u6298`,
        condition: e=>`\u6EE1${e}\u5143\u53EF\u7528`
    },
    vanCouponCell: {
        title: "\u4F18\u60E0\u5238",
        count: e=>`${e}\u5F20\u53EF\u7528`
    },
    vanCouponList: {
        exchange: "\u5151\u6362",
        close: "\u4E0D\u4F7F\u7528",
        enable: "\u53EF\u7528",
        disabled: "\u4E0D\u53EF\u7528",
        placeholder: "\u8F93\u5165\u4F18\u60E0\u7801"
    },
    vanAddressEdit: {
        area: "\u5730\u533A",
        areaEmpty: "\u8BF7\u9009\u62E9\u5730\u533A",
        addressEmpty: "\u8BF7\u586B\u5199\u8BE6\u7EC6\u5730\u5740",
        addressDetail: "\u8BE6\u7EC6\u5730\u5740",
        defaultAddress: "\u8BBE\u4E3A\u9ED8\u8BA4\u6536\u8D27\u5730\u5740"
    },
    vanAddressList: {
        add: "\u65B0\u589E\u5730\u5740"
    }
};
const Rc = oe("zh-CN")
  , Lc = rt({
    "zh-CN": ey
})
  , ty = {
    messages() {
        return Lc[Rc.value]
    },
    use(e, t) {
        Rc.value = e,
        this.add({
            [e]: t
        })
    },
    add(e={}) {
        Nd(Lc, e)
    }
};
var ny = ty;
function ry(e) {
    const t = Ld(e) + ".";
    return (n,...r)=>{
        const i = ny.messages()
          , o = Cc(i, t + n) || Cc(i, n);
        return wr(o) ? o(...r) : o
    }
}
function Xa(e, t) {
    return t ? typeof t == "string" ? ` ${e}--${t}` : Array.isArray(t) ? t.reduce((n,r)=>n + Xa(e, r), "") : Object.keys(t).reduce((n,r)=>n + (t[r] ? Xa(e, r) : ""), "") : ""
}
function oy(e) {
    return (t,n)=>(t && typeof t != "string" && (n = t,
    t = ""),
    t = t ? `${e}__${t}` : e,
    `${t}${Xa(t, n)}`)
}
function ke(e) {
    const t = `van-${e}`;
    return [t, oy(t), ry(t)]
}
const er = "van-hairline"
  , iy = `${er}--top`
  , ay = `${er}--left`
  , sy = `${er}--right`
  , ly = `${er}--bottom`
  , cy = `${er}--surround`
  , xd = `${er}--top-bottom`
  , uy = `${er}-unset--top-bottom`
  , Xn = "van-haptics-feedback"
  , fy = Symbol("van-form")
  , Dd = 500
  , Ac = 5;
function Dr(e, {args: t=[], done: n, canceled: r, error: i}) {
    if (e) {
        const o = e.apply(null, t);
        Ms(o) ? o.then(a=>{
            a ? n() : r && r()
        }
        ).catch(i || Ya) : o ? n() : r && r()
    } else
        n()
}
function Ne(e) {
    return e.install = t=>{
        const {name: n} = e;
        n && (t.component(n, e),
        t.component(Ld(`-${n}`), e))
    }
    ,
    e
}
const Md = Symbol();
function Hs(e) {
    const t = Et(Md, null);
    t && he(t, n=>{
        n && e()
    }
    )
}
const dy = (e,t)=>{
    const n = oe()
      , r = ()=>{
        n.value = It(e).height
    }
    ;
    return gt(()=>{
        if (Be(r),
        t)
            for (let i = 1; i <= 3; i++)
                setTimeout(r, 100 * i)
    }
    ),
    Hs(()=>Be(r)),
    he([Nr, Co], r),
    n
}
;
function my(e, t) {
    const n = dy(e, !0);
    return r=>k("div", {
        class: t("placeholder"),
        style: {
            height: n.value ? `${n.value}px` : void 0
        }
    }, [r()])
}
const [Fd,Nc] = ke("action-bar")
  , $d = Symbol(Fd)
  , hy = {
    placeholder: Boolean,
    safeAreaInsetBottom: ve
};
var gy = Ee({
    name: Fd,
    props: hy,
    setup(e, {slots: t}) {
        const n = oe()
          , r = my(n, Nc)
          , {linkChildren: i} = To($d);
        i();
        const o = ()=>{
            var a;
            return k("div", {
                ref: n,
                class: [Nc(), {
                    "van-safe-area-bottom": e.safeAreaInsetBottom
                }]
            }, [(a = t.default) == null ? void 0 : a.call(t)])
        }
        ;
        return ()=>e.placeholder ? r(o) : o()
    }
});
const py = Ne(gy);
function bt(e) {
    const t = ct();
    t && Me(t.proxy, e)
}
const Ui = {
    to: [String, Object],
    url: String,
    replace: Boolean
};
function Bd({to: e, url: t, replace: n, $router: r}) {
    e && r ? r[n ? "replace" : "push"](e) : t && (n ? location.replace(t) : location.href = t)
}
function Ws() {
    const e = ct().proxy;
    return ()=>Bd(e)
}
const [vy,xc] = ke("badge")
  , by = {
    dot: Boolean,
    max: ge,
    tag: _e("div"),
    color: String,
    offset: Array,
    content: ge,
    showZero: ve,
    position: _e("top-right")
};
var yy = Ee({
    name: vy,
    props: by,
    setup(e, {slots: t}) {
        const n = ()=>{
            if (t.content)
                return !0;
            const {content: s, showZero: l} = e;
            return Ue(s) && s !== "" && (l || s !== 0 && s !== "0")
        }
          , r = ()=>{
            const {dot: s, max: l, content: u} = e;
            if (!s && n())
                return t.content ? t.content() : Ue(l) && wd(u) && +u > +l ? `${l}+` : u
        }
          , i = s=>s.startsWith("-") ? s.replace("-", "") : `-${s}`
          , o = ne(()=>{
            const s = {
                background: e.color
            };
            if (e.offset) {
                const [l,u] = e.offset
                  , {position: c} = e
                  , [f,h] = c.split("-");
                t.default ? (typeof u == "number" ? s[f] = We(f === "top" ? u : -u) : s[f] = f === "top" ? We(u) : i(u),
                typeof l == "number" ? s[h] = We(h === "left" ? l : -l) : s[h] = h === "left" ? We(l) : i(l)) : (s.marginTop = We(u),
                s.marginLeft = We(l))
            }
            return s
        }
        )
          , a = ()=>{
            if (n() || e.dot)
                return k("div", {
                    class: xc([e.position, {
                        dot: e.dot,
                        fixed: !!t.default
                    }]),
                    style: o.value
                }, [r()])
        }
        ;
        return ()=>{
            if (t.default) {
                const {tag: s} = e;
                return k(s, {
                    class: xc("wrapper")
                }, {
                    default: ()=>[t.default(), a()]
                })
            }
            return a()
        }
    }
});
const Ud = Ne(yy);
let Vd = 2e3;
const _y = ()=>++Vd
  , Ey = e=>{
    Vd = e
}
  , [Hd,wy] = ke("config-provider")
  , Wd = Symbol(Hd)
  , Sy = {
    tag: _e("div"),
    theme: _e("light"),
    zIndex: Number,
    themeVars: Object,
    themeVarsDark: Object,
    themeVarsLight: Object,
    themeVarsScope: _e("local"),
    iconPrefix: String
};
function Ty(e) {
    return e.replace(/([a-zA-Z])(\d)/g, "$1-$2")
}
function Cy(e) {
    const t = {};
    return Object.keys(e).forEach(n=>{
        const r = Ty(Jb(n));
        t[`--van-${r}`] = e[n]
    }
    ),
    t
}
function Uo(e={}, t={}) {
    Object.keys(e).forEach(n=>{
        e[n] !== t[n] && document.documentElement.style.setProperty(n, e[n])
    }
    ),
    Object.keys(t).forEach(n=>{
        e[n] || document.documentElement.style.removeProperty(n)
    }
    )
}
var Oy = Ee({
    name: Hd,
    props: Sy,
    setup(e, {slots: t}) {
        const n = ne(()=>Cy(Me({}, e.themeVars, e.theme === "dark" ? e.themeVarsDark : e.themeVarsLight)));
        if (qt) {
            const r = ()=>{
                document.documentElement.classList.add(`van-theme-${e.theme}`)
            }
              , i = (o=e.theme)=>{
                document.documentElement.classList.remove(`van-theme-${o}`)
            }
            ;
            he(()=>e.theme, (o,a)=>{
                a && i(a),
                r()
            }
            , {
                immediate: !0
            }),
            Pr(r),
            Zn(i),
            fn(i),
            he(n, (o,a)=>{
                e.themeVarsScope === "global" && Uo(o, a)
            }
            ),
            he(()=>e.themeVarsScope, (o,a)=>{
                a === "global" && Uo({}, n.value),
                o === "global" && Uo(n.value, {})
            }
            ),
            e.themeVarsScope === "global" && Uo(n.value, {})
        }
        return rn(Wd, e),
        Pi(()=>{
            e.zIndex !== void 0 && Ey(e.zIndex)
        }
        ),
        ()=>k(e.tag, {
            class: wy(),
            style: e.themeVarsScope === "local" ? n.value : void 0
        }, {
            default: ()=>{
                var r;
                return [(r = t.default) == null ? void 0 : r.call(t)]
            }
        })
    }
});
const [ky,Dc] = ke("icon")
  , Iy = e=>e == null ? void 0 : e.includes("/")
  , Py = {
    dot: Boolean,
    tag: _e("i"),
    name: String,
    size: ge,
    badge: ge,
    color: String,
    badgeProps: Object,
    classPrefix: String
};
var Ry = Ee({
    name: ky,
    props: Py,
    setup(e, {slots: t}) {
        const n = Et(Wd, null)
          , r = ne(()=>e.classPrefix || (n == null ? void 0 : n.iconPrefix) || Dc());
        return ()=>{
            const {tag: i, dot: o, name: a, size: s, badge: l, color: u} = e
              , c = Iy(a);
            return k(Ud, qe({
                dot: o,
                tag: i,
                class: [r.value, c ? "" : `${r.value}-${a}`],
                style: {
                    color: u,
                    fontSize: We(s)
                },
                content: l
            }, e.badgeProps), {
                default: ()=>{
                    var f;
                    return [(f = t.default) == null ? void 0 : f.call(t), c && k("img", {
                        class: Dc("image"),
                        src: a
                    }, null)]
                }
            })
        }
    }
});
const at = Ne(Ry)
  , [Ly,no] = ke("loading")
  , Ay = Array(12).fill(null).map((e,t)=>k("i", {
    class: no("line", String(t + 1))
}, null))
  , Ny = k("svg", {
    class: no("circular"),
    viewBox: "25 25 50 50"
}, [k("circle", {
    cx: "50",
    cy: "50",
    r: "20",
    fill: "none"
}, null)])
  , xy = {
    size: ge,
    type: _e("circular"),
    color: String,
    vertical: Boolean,
    textSize: ge,
    textColor: String
};
var Dy = Ee({
    name: Ly,
    props: xy,
    setup(e, {slots: t}) {
        const n = ne(()=>Me({
            color: e.color
        }, xr(e.size)))
          , r = ()=>{
            const o = e.type === "spinner" ? Ay : Ny;
            return k("span", {
                class: no("spinner", e.type),
                style: n.value
            }, [t.icon ? t.icon() : o])
        }
          , i = ()=>{
            var o;
            if (t.default)
                return k("span", {
                    class: no("text"),
                    style: {
                        fontSize: We(e.textSize),
                        color: (o = e.textColor) != null ? o : e.color
                    }
                }, [t.default()])
        }
        ;
        return ()=>{
            const {type: o, vertical: a} = e;
            return k("div", {
                class: no([o, {
                    vertical: a
                }]),
                "aria-live": "polite",
                "aria-busy": !0
            }, [r(), i()])
        }
    }
});
const tr = Ne(Dy)
  , [My,nr] = ke("button")
  , Fy = Me({}, Ui, {
    tag: _e("button"),
    text: String,
    icon: String,
    type: _e("default"),
    size: _e("normal"),
    color: String,
    block: Boolean,
    plain: Boolean,
    round: Boolean,
    square: Boolean,
    loading: Boolean,
    hairline: Boolean,
    disabled: Boolean,
    iconPrefix: String,
    nativeType: _e("button"),
    loadingSize: ge,
    loadingText: String,
    loadingType: String,
    iconPosition: _e("left")
});
var $y = Ee({
    name: My,
    props: Fy,
    emits: ["click"],
    setup(e, {emit: t, slots: n}) {
        const r = Ws()
          , i = ()=>n.loading ? n.loading() : k(tr, {
            size: e.loadingSize,
            type: e.loadingType,
            class: nr("loading")
        }, null)
          , o = ()=>{
            if (e.loading)
                return i();
            if (n.icon)
                return k("div", {
                    class: nr("icon")
                }, [n.icon()]);
            if (e.icon)
                return k(at, {
                    name: e.icon,
                    class: nr("icon"),
                    classPrefix: e.iconPrefix
                }, null)
        }
          , a = ()=>{
            let u;
            if (e.loading ? u = e.loadingText : u = n.default ? n.default() : e.text,
            u)
                return k("span", {
                    class: nr("text")
                }, [u])
        }
          , s = ()=>{
            const {color: u, plain: c} = e;
            if (u) {
                const f = {
                    color: c ? u : "white"
                };
                return c || (f.background = u),
                u.includes("gradient") ? f.border = 0 : f.borderColor = u,
                f
            }
        }
          , l = u=>{
            e.loading ? lt(u) : e.disabled || (t("click", u),
            r())
        }
        ;
        return ()=>{
            const {tag: u, type: c, size: f, block: h, round: p, plain: v, square: E, loading: y, disabled: g, hairline: _, nativeType: C, iconPosition: S} = e
              , A = [nr([c, f, {
                plain: v,
                block: h,
                round: p,
                square: E,
                loading: y,
                disabled: g,
                hairline: _
            }]), {
                [cy]: _
            }];
            return k(u, {
                type: C,
                class: A,
                style: s(),
                disabled: g,
                onClick: l
            }, {
                default: ()=>[k("div", {
                    class: nr("content")
                }, [S === "left" && o(), a(), S === "right" && o()])]
            })
        }
    }
});
const hi = Ne($y)
  , [By,Uy] = ke("action-bar-button")
  , Vy = Me({}, Ui, {
    type: String,
    text: String,
    icon: String,
    color: String,
    loading: Boolean,
    disabled: Boolean
});
var Hy = Ee({
    name: By,
    props: Vy,
    setup(e, {slots: t}) {
        const n = Ws()
          , {parent: r, index: i} = Ar($d)
          , o = ne(()=>{
            if (r) {
                const s = r.children[i.value - 1];
                return !(s && "isButton"in s)
            }
        }
        )
          , a = ne(()=>{
            if (r) {
                const s = r.children[i.value + 1];
                return !(s && "isButton"in s)
            }
        }
        );
        return bt({
            isButton: !0
        }),
        ()=>{
            const {type: s, icon: l, text: u, color: c, loading: f, disabled: h} = e;
            return k(hi, {
                class: Uy([s, {
                    last: a.value,
                    first: o.value
                }]),
                size: "large",
                type: s,
                icon: l,
                color: c,
                loading: f,
                disabled: h,
                onClick: n
            }, {
                default: ()=>[t.default ? t.default() : u]
            })
        }
    }
});
const Mc = Ne(Hy)
  , js = {
    show: Boolean,
    zIndex: ge,
    overlay: ve,
    duration: ge,
    teleport: [String, Object],
    lockScroll: ve,
    lazyRender: ve,
    beforeClose: Function,
    overlayStyle: Object,
    overlayClass: st,
    transitionAppear: Boolean,
    closeOnClickOverlay: ve
}
  , Wy = Object.keys(js);
function jy(e, t) {
    return e > t ? "horizontal" : t > e ? "vertical" : ""
}
function Oo() {
    const e = oe(0)
      , t = oe(0)
      , n = oe(0)
      , r = oe(0)
      , i = oe(0)
      , o = oe(0)
      , a = oe("")
      , s = oe(!0)
      , l = ()=>a.value === "vertical"
      , u = ()=>a.value === "horizontal"
      , c = ()=>{
        n.value = 0,
        r.value = 0,
        i.value = 0,
        o.value = 0,
        a.value = "",
        s.value = !0
    }
    ;
    return {
        move: p=>{
            const v = p.touches[0];
            n.value = (v.clientX < 0 ? 0 : v.clientX) - e.value,
            r.value = v.clientY - t.value,
            i.value = Math.abs(n.value),
            o.value = Math.abs(r.value);
            const E = 10;
            (!a.value || i.value < E && o.value < E) && (a.value = jy(i.value, o.value)),
            s.value && (i.value > Ac || o.value > Ac) && (s.value = !1)
        }
        ,
        start: p=>{
            c(),
            e.value = p.touches[0].clientX,
            t.value = p.touches[0].clientY
        }
        ,
        reset: c,
        startX: e,
        startY: t,
        deltaX: n,
        deltaY: r,
        offsetX: i,
        offsetY: o,
        direction: a,
        isVertical: l,
        isHorizontal: u,
        isTap: s
    }
}
let Hr = 0;
const Fc = "van-overflow-hidden";
function zy(e, t) {
    const n = Oo()
      , r = "01"
      , i = "10"
      , o = c=>{
        n.move(c);
        const f = n.deltaY.value > 0 ? i : r
          , h = Cd(c.target, e.value)
          , {scrollHeight: p, offsetHeight: v, scrollTop: E} = h;
        let y = "11";
        E === 0 ? y = v >= p ? "00" : "01" : E + v >= p && (y = "10"),
        y !== "11" && n.isVertical() && !(parseInt(y, 2) & parseInt(f, 2)) && lt(c, !0)
    }
      , a = ()=>{
        document.addEventListener("touchstart", n.start),
        document.addEventListener("touchmove", o, {
            passive: !1
        }),
        Hr || document.body.classList.add(Fc),
        Hr++
    }
      , s = ()=>{
        Hr && (document.removeEventListener("touchstart", n.start),
        document.removeEventListener("touchmove", o),
        Hr--,
        Hr || document.body.classList.remove(Fc))
    }
      , l = ()=>t() && a()
      , u = ()=>t() && s();
    $i(l),
    Zn(u),
    fn(u),
    he(t, c=>{
        c ? a() : s()
    }
    )
}
function jd(e) {
    const t = oe(!1);
    return he(e, n=>{
        n && (t.value = n)
    }
    , {
        immediate: !0
    }),
    n=>()=>t.value ? n() : null
}
const gi = ()=>{
    var e;
    const {scopeId: t} = ((e = ct()) == null ? void 0 : e.vnode) || {};
    return t ? {
        [t]: ""
    } : null
}
  , [Ky,Yy] = ke("overlay")
  , qy = {
    show: Boolean,
    zIndex: ge,
    duration: ge,
    className: st,
    lockScroll: ve,
    lazyRender: ve,
    customStyle: Object,
    teleport: [String, Object]
};
var Gy = Ee({
    name: Ky,
    props: qy,
    setup(e, {slots: t}) {
        const n = oe()
          , r = jd(()=>e.show || !e.lazyRender)
          , i = a=>{
            e.lockScroll && lt(a, !0)
        }
          , o = r(()=>{
            var a;
            const s = Me(Rd(e.zIndex), e.customStyle);
            return Ue(e.duration) && (s.animationDuration = `${e.duration}s`),
            on(k("div", {
                ref: n,
                style: s,
                class: [Yy(), e.className]
            }, [(a = t.default) == null ? void 0 : a.call(t)]), [[Pn, e.show]])
        }
        );
        return Bt("touchmove", i, {
            target: n
        }),
        ()=>{
            const a = k(So, {
                name: "van-fade",
                appear: !0
            }, {
                default: o
            });
            return e.teleport ? k(xf, {
                to: e.teleport
            }, {
                default: ()=>[a]
            }) : a
        }
    }
});
const zd = Ne(Gy)
  , Xy = Me({}, js, {
    round: Boolean,
    position: _e("center"),
    closeIcon: _e("cross"),
    closeable: Boolean,
    transition: String,
    iconPrefix: String,
    closeOnPopstate: Boolean,
    closeIconPosition: _e("top-right"),
    safeAreaInsetTop: Boolean,
    safeAreaInsetBottom: Boolean
})
  , [Jy,$c] = ke("popup");
var Zy = Ee({
    name: Jy,
    inheritAttrs: !1,
    props: Xy,
    emits: ["open", "close", "opened", "closed", "keydown", "update:show", "clickOverlay", "clickCloseIcon"],
    setup(e, {emit: t, attrs: n, slots: r}) {
        let i, o;
        const a = oe()
          , s = oe()
          , l = jd(()=>e.show || !e.lazyRender)
          , u = ne(()=>{
            const N = {
                zIndex: a.value
            };
            if (Ue(e.duration)) {
                const x = e.position === "center" ? "animationDuration" : "transitionDuration";
                N[x] = `${e.duration}s`
            }
            return N
        }
        )
          , c = ()=>{
            i || (i = !0,
            a.value = e.zIndex !== void 0 ? +e.zIndex : _y(),
            t("open"))
        }
          , f = ()=>{
            i && Dr(e.beforeClose, {
                done() {
                    i = !1,
                    t("close"),
                    t("update:show", !1)
                }
            })
        }
          , h = N=>{
            t("clickOverlay", N),
            e.closeOnClickOverlay && f()
        }
          , p = ()=>{
            if (e.overlay)
                return k(zd, qe({
                    show: e.show,
                    class: e.overlayClass,
                    zIndex: a.value,
                    duration: e.duration,
                    customStyle: e.overlayStyle,
                    role: e.closeOnClickOverlay ? "button" : void 0,
                    tabindex: e.closeOnClickOverlay ? 0 : void 0
                }, gi(), {
                    onClick: h
                }), {
                    default: r["overlay-content"]
                })
        }
          , v = N=>{
            t("clickCloseIcon", N),
            f()
        }
          , E = ()=>{
            if (e.closeable)
                return k(at, {
                    role: "button",
                    tabindex: 0,
                    name: e.closeIcon,
                    class: [$c("close-icon", e.closeIconPosition), Xn],
                    classPrefix: e.iconPrefix,
                    onClick: v
                }, null)
        }
        ;
        let y;
        const g = ()=>{
            y && clearTimeout(y),
            y = setTimeout(()=>{
                t("opened")
            }
            )
        }
          , _ = ()=>t("closed")
          , C = N=>t("keydown", N)
          , S = l(()=>{
            var N;
            const {round: x, position: O, safeAreaInsetTop: M, safeAreaInsetBottom: B} = e;
            return on(k("div", qe({
                ref: s,
                style: u.value,
                role: "dialog",
                tabindex: 0,
                class: [$c({
                    round: x,
                    [O]: O
                }), {
                    "van-safe-area-top": M,
                    "van-safe-area-bottom": B
                }],
                onKeydown: C
            }, n, gi()), [(N = r.default) == null ? void 0 : N.call(r), E()]), [[Pn, e.show]])
        }
        )
          , A = ()=>{
            const {position: N, transition: x, transitionAppear: O} = e
              , M = N === "center" ? "van-fade" : `van-popup-slide-${N}`;
            return k(So, {
                name: x || M,
                appear: O,
                onAfterEnter: g,
                onAfterLeave: _
            }, {
                default: S
            })
        }
        ;
        return he(()=>e.show, N=>{
            N && !i && (c(),
            n.tabindex === 0 && Be(()=>{
                var x;
                (x = s.value) == null || x.focus()
            }
            )),
            !N && i && (i = !1,
            t("close"))
        }
        ),
        bt({
            popupRef: s
        }),
        zy(s, ()=>e.show && e.lockScroll),
        Bt("popstate", ()=>{
            e.closeOnPopstate && (f(),
            o = !1)
        }
        ),
        gt(()=>{
            e.show && c()
        }
        ),
        Pr(()=>{
            o && (t("update:show", !0),
            o = !1)
        }
        ),
        Zn(()=>{
            e.show && e.teleport && (f(),
            o = !0)
        }
        ),
        rn(Md, ()=>e.show),
        ()=>e.teleport ? k(xf, {
            to: e.teleport
        }, {
            default: ()=>[p(), A()]
        }) : k(ot, null, [p(), A()])
    }
});
const ko = Ne(Zy)
  , [Qy,nn,Bc] = ke("picker")
  , Kd = e=>e.find(t=>!t.disabled) || e[0];
function e_(e, t) {
    const n = e[0];
    if (n) {
        if (Array.isArray(n))
            return "multiple";
        if (t.children in n)
            return "cascade"
    }
    return "default"
}
function Qo(e, t) {
    t = ht(t, 0, e.length);
    for (let n = t; n < e.length; n++)
        if (!e[n].disabled)
            return n;
    for (let n = t - 1; n >= 0; n--)
        if (!e[n].disabled)
            return n;
    return 0
}
const Uc = (e,t,n)=>t !== void 0 && !!e.find(r=>r[n.value] === t);
function Ja(e, t, n) {
    const r = e.findIndex(o=>o[n.value] === t)
      , i = Qo(e, r);
    return e[i]
}
function t_(e, t, n) {
    const r = [];
    let i = {
        [t.children]: e
    }
      , o = 0;
    for (; i && i[t.children]; ) {
        const a = i[t.children]
          , s = n.value[o];
        if (i = Ue(s) ? Ja(a, s, t) : void 0,
        !i && a.length) {
            const l = Kd(a)[t.value];
            i = Ja(a, l, t)
        }
        o++,
        r.push(a)
    }
    return r
}
function n_(e) {
    const {transform: t} = window.getComputedStyle(e)
      , n = t.slice(7, t.length - 1).split(", ")[5];
    return Number(n)
}
function r_(e) {
    return Me({
        text: "text",
        value: "value",
        children: "children"
    }, e)
}
const Vc = 200
  , Hc = 300
  , o_ = 15
  , [Yd,sa] = ke("picker-column")
  , qd = Symbol(Yd);
var i_ = Ee({
    name: Yd,
    props: {
        value: ge,
        fields: kt(Object),
        options: Gn(),
        readonly: Boolean,
        allowHtml: Boolean,
        optionHeight: kt(Number),
        swipeDuration: kt(ge),
        visibleOptionNum: kt(ge)
    },
    emits: ["change", "clickOption", "scrollInto"],
    setup(e, {emit: t, slots: n}) {
        let r, i, o, a, s;
        const l = oe()
          , u = oe()
          , c = oe(0)
          , f = oe(0)
          , h = Oo()
          , p = ()=>e.options.length
          , v = ()=>e.optionHeight * (+e.visibleOptionNum - 1) / 2
          , E = B=>{
            let T = Qo(e.options, B);
            const I = -T * e.optionHeight
              , U = ()=>{
                T > p() - 1 && (T = Qo(e.options, B));
                const ce = e.options[T][e.fields.value];
                ce !== e.value && t("change", ce)
            }
            ;
            r && I !== c.value ? s = U : U(),
            c.value = I
        }
          , y = ()=>e.readonly || !e.options.length
          , g = B=>{
            r || y() || (s = null,
            f.value = Vc,
            E(B),
            t("clickOption", e.options[B]))
        }
          , _ = B=>ht(Math.round(-B / e.optionHeight), 0, p() - 1)
          , C = ne(()=>_(c.value))
          , S = (B,T)=>{
            const I = Math.abs(B / T);
            B = c.value + I / .003 * (B < 0 ? -1 : 1);
            const U = _(B);
            f.value = +e.swipeDuration,
            E(U)
        }
          , A = ()=>{
            r = !1,
            f.value = 0,
            s && (s(),
            s = null)
        }
          , N = B=>{
            if (!y()) {
                if (h.start(B),
                r) {
                    const T = n_(u.value);
                    c.value = Math.min(0, T - v())
                }
                f.value = 0,
                i = c.value,
                o = Date.now(),
                a = i,
                s = null
            }
        }
          , x = B=>{
            if (y())
                return;
            h.move(B),
            h.isVertical() && (r = !0,
            lt(B, !0));
            const T = ht(i + h.deltaY.value, -(p() * e.optionHeight), e.optionHeight)
              , I = _(T);
            I !== C.value && t("scrollInto", e.options[I]),
            c.value = T;
            const U = Date.now();
            U - o > Hc && (o = U,
            a = T)
        }
          , O = ()=>{
            if (y())
                return;
            const B = c.value - a
              , T = Date.now() - o;
            if (T < Hc && Math.abs(B) > o_) {
                S(B, T);
                return
            }
            const U = _(c.value);
            f.value = Vc,
            E(U),
            setTimeout(()=>{
                r = !1
            }
            , 0)
        }
          , M = ()=>{
            const B = {
                height: `${e.optionHeight}px`
            };
            return e.options.map((T,I)=>{
                const U = T[e.fields.text]
                  , {disabled: ce} = T
                  , me = T[e.fields.value]
                  , K = {
                    role: "button",
                    style: B,
                    tabindex: ce ? -1 : 0,
                    class: [sa("item", {
                        disabled: ce,
                        selected: me === e.value
                    }), T.className],
                    onClick: ()=>g(I)
                }
                  , ee = {
                    class: "van-ellipsis",
                    [e.allowHtml ? "innerHTML" : "textContent"]: U
                };
                return k("li", K, [n.option ? n.option(T, I) : k("div", ee, null)])
            }
            )
        }
        ;
        return Ar(qd),
        bt({
            stopMomentum: A
        }),
        Pi(()=>{
            const B = r ? Math.floor(-c.value / e.optionHeight) : e.options.findIndex(U=>U[e.fields.value] === e.value)
              , T = Qo(e.options, B)
              , I = -T * e.optionHeight;
            r && T < B && A(),
            c.value = I
        }
        ),
        Bt("touchmove", x, {
            target: l
        }),
        ()=>k("div", {
            ref: l,
            class: sa(),
            onTouchstartPassive: N,
            onTouchend: O,
            onTouchcancel: O
        }, [k("ul", {
            ref: u,
            style: {
                transform: `translate3d(0, ${c.value + v()}px, 0)`,
                transitionDuration: `${f.value}ms`,
                transitionProperty: f.value ? "all" : "none"
            },
            class: sa("wrapper"),
            onTransitionend: A
        }, [M()])])
    }
});
const [a_] = ke("picker-toolbar")
  , Vi = {
    title: String,
    cancelButtonText: String,
    confirmButtonText: String
}
  , Gd = ["cancel", "confirm", "title", "toolbar"]
  , s_ = Object.keys(Vi);
var Xd = Ee({
    name: a_,
    props: Vi,
    emits: ["confirm", "cancel"],
    setup(e, {emit: t, slots: n}) {
        const r = ()=>{
            if (n.title)
                return n.title();
            if (e.title)
                return k("div", {
                    class: [nn("title"), "van-ellipsis"]
                }, [e.title])
        }
          , i = ()=>t("cancel")
          , o = ()=>t("confirm")
          , a = ()=>{
            var l;
            const u = (l = e.cancelButtonText) != null ? l : Bc("cancel");
            if (!(!n.cancel && !u))
                return k("button", {
                    type: "button",
                    class: [nn("cancel"), Xn],
                    onClick: i
                }, [n.cancel ? n.cancel() : u])
        }
          , s = ()=>{
            var l;
            const u = (l = e.confirmButtonText) != null ? l : Bc("confirm");
            if (!(!n.confirm && !u))
                return k("button", {
                    type: "button",
                    class: [nn("confirm"), Xn],
                    onClick: o
                }, [n.confirm ? n.confirm() : u])
        }
        ;
        return ()=>k("div", {
            class: nn("toolbar")
        }, [n.toolbar ? n.toolbar() : [a(), r(), s()]])
    }
});
const Jd = (e,t)=>{
    const n = oe(e());
    return he(e, r=>{
        r !== n.value && (n.value = r)
    }
    ),
    he(n, r=>{
        r !== e() && t(r)
    }
    ),
    n
}
;
/**
* @vue/shared v3.5.11
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const Zd = Array.isArray
  , bo = e=>typeof e == "string"
  , Qd = e=>e !== null && typeof e == "object"
  , l_ = e=>{
    const t = Object.create(null);
    return n=>t[n] || (t[n] = e(n))
}
  , c_ = /\B([A-Z])/g
  , u_ = l_(e=>e.replace(c_, "-$1").toLowerCase());
function em(e) {
    if (Zd(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) {
            const r = e[n]
              , i = bo(r) ? h_(r) : em(r);
            if (i)
                for (const o in i)
                    t[o] = i[o]
        }
        return t
    } else if (bo(e) || Qd(e))
        return e
}
const f_ = /;(?![^(]*\))/g
  , d_ = /:([^]+)/
  , m_ = /\/\*[^]*?\*\//g;
function h_(e) {
    const t = {};
    return e.replace(m_, "").split(f_).forEach(n=>{
        if (n) {
            const r = n.split(d_);
            r.length > 1 && (t[r[0].trim()] = r[1].trim())
        }
    }
    ),
    t
}
function g_(e) {
    let t = "";
    if (!e || bo(e))
        return t;
    for (const n in e) {
        const r = e[n];
        (bo(r) || typeof r == "number") && (t += `${n.startsWith("--") ? n : u_(n)}:${r};`)
    }
    return t
}
function tm(e) {
    let t = "";
    if (bo(e))
        t = e;
    else if (Zd(e))
        for (let n = 0; n < e.length; n++) {
            const r = tm(e[n]);
            r && (t += r + " ")
        }
    else if (Qd(e))
        for (const n in e)
            e[n] && (t += n + " ");
    return t.trim()
}
function p_(e, t, n) {
    let r, i = 0;
    const o = e.scrollLeft
      , a = n === 0 ? 1 : Math.round(n * 1e3 / 16);
    let s = o;
    function l() {
        Fs(r)
    }
    function u() {
        s += (t - o) / a,
        e.scrollLeft = s,
        ++i < a && (r = Nn(u))
    }
    return u(),
    l
}
function v_(e, t, n, r) {
    let i, o = $s(e);
    const a = o < t
      , s = n === 0 ? 1 : Math.round(n * 1e3 / 16)
      , l = (t - o) / s;
    function u() {
        Fs(i)
    }
    function c() {
        o += l,
        (a && o > t || !a && o < t) && (o = t),
        qa(e, o),
        a && o < t || !a && o > t ? i = Nn(c) : r && (i = Nn(r))
    }
    return c(),
    u
}
let b_ = 0;
function zs() {
    const e = ct()
      , {name: t="unknown"} = (e == null ? void 0 : e.type) || {};
    return `${t}-${++b_}`
}
function y_() {
    const e = oe([])
      , t = [];
    return wf(()=>{
        e.value = []
    }
    ),
    [e, r=>(t[r] || (t[r] = i=>{
        e.value[r] = i
    }
    ),
    t[r])]
}
function nm(e, t) {
    if (!qt || !window.IntersectionObserver)
        return;
    const n = new IntersectionObserver(o=>{
        t(o[0].intersectionRatio > 0)
    }
    ,{
        root: document.body
    })
      , r = ()=>{
        e.value && n.observe(e.value)
    }
      , i = ()=>{
        e.value && n.unobserve(e.value)
    }
    ;
    Zn(i),
    fn(i),
    $i(r)
}
const [__,E_] = ke("sticky")
  , w_ = {
    zIndex: ge,
    position: _e("top"),
    container: Object,
    offsetTop: Ae(0),
    offsetBottom: Ae(0)
};
var S_ = Ee({
    name: __,
    props: w_,
    emits: ["scroll", "change"],
    setup(e, {emit: t, slots: n}) {
        const r = oe()
          , i = Od(r)
          , o = rt({
            fixed: !1,
            width: 0,
            height: 0,
            transform: 0
        })
          , a = oe(!1)
          , s = ne(()=>Vs(e.position === "top" ? e.offsetTop : e.offsetBottom))
          , l = ne(()=>{
            if (a.value)
                return;
            const {fixed: h, height: p, width: v} = o;
            if (h)
                return {
                    width: `${v}px`,
                    height: `${p}px`
                }
        }
        )
          , u = ne(()=>{
            if (!o.fixed || a.value)
                return;
            const h = Me(Rd(e.zIndex), {
                width: `${o.width}px`,
                height: `${o.height}px`,
                [e.position]: `${s.value}px`
            });
            return o.transform && (h.transform = `translate3d(0, ${o.transform}px, 0)`),
            h
        }
        )
          , c = h=>t("scroll", {
            scrollTop: h,
            isFixed: o.fixed
        })
          , f = ()=>{
            if (!r.value || vo(r))
                return;
            const {container: h, position: p} = e
              , v = It(r)
              , E = $s(window);
            if (o.width = v.width,
            o.height = v.height,
            p === "top")
                if (h) {
                    const y = It(h)
                      , g = y.bottom - s.value - o.height;
                    o.fixed = s.value > v.top && y.bottom > 0,
                    o.transform = g < 0 ? g : 0
                } else
                    o.fixed = s.value > v.top;
            else {
                const {clientHeight: y} = document.documentElement;
                if (h) {
                    const g = It(h)
                      , _ = y - g.top - s.value - o.height;
                    o.fixed = y - s.value < v.bottom && y > g.top,
                    o.transform = _ < 0 ? -_ : 0
                } else
                    o.fixed = y - s.value < v.bottom
            }
            c(E)
        }
        ;
        return he(()=>o.fixed, h=>t("change", h)),
        Bt("scroll", f, {
            target: i,
            passive: !0
        }),
        nm(r, f),
        he([Nr, Co], ()=>{
            !r.value || vo(r) || !o.fixed || (a.value = !0,
            Be(()=>{
                const h = It(r);
                o.width = h.width,
                o.height = h.height,
                a.value = !1
            }
            ))
        }
        ),
        ()=>{
            var h;
            return k("div", {
                ref: r,
                style: l.value
            }, [k("div", {
                class: E_({
                    fixed: o.fixed && !a.value
                }),
                style: u.value
            }, [(h = n.default) == null ? void 0 : h.call(n)])])
        }
    }
});
const T_ = Ne(S_)
  , [rm,Vo] = ke("swipe")
  , C_ = {
    loop: ve,
    width: ge,
    height: ge,
    vertical: Boolean,
    autoplay: Ae(0),
    duration: Ae(500),
    touchable: ve,
    lazyRender: Boolean,
    initialSwipe: Ae(0),
    indicatorColor: String,
    showIndicators: ve,
    stopPropagation: ve
}
  , om = Symbol(rm);
var O_ = Ee({
    name: rm,
    props: C_,
    emits: ["change", "dragStart", "dragEnd"],
    setup(e, {emit: t, slots: n}) {
        const r = oe()
          , i = oe()
          , o = rt({
            rect: null,
            width: 0,
            height: 0,
            offset: 0,
            active: 0,
            swiping: !1
        });
        let a = !1;
        const s = Oo()
          , {children: l, linkChildren: u} = To(om)
          , c = ne(()=>l.length)
          , f = ne(()=>o[e.vertical ? "height" : "width"])
          , h = ne(()=>e.vertical ? s.deltaY.value : s.deltaX.value)
          , p = ne(()=>o.rect ? (e.vertical ? o.rect.height : o.rect.width) - f.value * c.value : 0)
          , v = ne(()=>f.value ? Math.ceil(Math.abs(p.value) / f.value) : c.value)
          , E = ne(()=>c.value * f.value)
          , y = ne(()=>(o.active + c.value) % c.value)
          , g = ne(()=>{
            const H = e.vertical ? "vertical" : "horizontal";
            return s.direction.value === H
        }
        )
          , _ = ne(()=>{
            const H = {
                transitionDuration: `${o.swiping ? 0 : e.duration}ms`,
                transform: `translate${e.vertical ? "Y" : "X"}(${+o.offset.toFixed(2)}px)`
            };
            if (f.value) {
                const F = e.vertical ? "height" : "width"
                  , q = e.vertical ? "width" : "height";
                H[F] = `${E.value}px`,
                H[q] = e[q] ? `${e[q]}px` : ""
            }
            return H
        }
        )
          , C = H=>{
            const {active: F} = o;
            return H ? e.loop ? ht(F + H, -1, c.value) : ht(F + H, 0, v.value) : F
        }
          , S = (H,F=0)=>{
            let q = H * f.value;
            e.loop || (q = Math.min(q, -p.value));
            let de = F - q;
            return e.loop || (de = ht(de, p.value, 0)),
            de
        }
          , A = ({pace: H=0, offset: F=0, emitChange: q})=>{
            if (c.value <= 1)
                return;
            const {active: de} = o
              , P = C(H)
              , V = S(P, F);
            if (e.loop) {
                if (l[0] && V !== p.value) {
                    const w = V < p.value;
                    l[0].setOffset(w ? E.value : 0)
                }
                if (l[c.value - 1] && V !== 0) {
                    const w = V > 0;
                    l[c.value - 1].setOffset(w ? -E.value : 0)
                }
            }
            o.active = P,
            o.offset = V,
            q && P !== de && t("change", y.value)
        }
          , N = ()=>{
            o.swiping = !0,
            o.active <= -1 ? A({
                pace: c.value
            }) : o.active >= c.value && A({
                pace: -c.value
            })
        }
          , x = ()=>{
            N(),
            s.reset(),
            Gr(()=>{
                o.swiping = !1,
                A({
                    pace: -1,
                    emitChange: !0
                })
            }
            )
        }
          , O = ()=>{
            N(),
            s.reset(),
            Gr(()=>{
                o.swiping = !1,
                A({
                    pace: 1,
                    emitChange: !0
                })
            }
            )
        }
        ;
        let M;
        const B = ()=>clearTimeout(M)
          , T = ()=>{
            B(),
            +e.autoplay > 0 && c.value > 1 && (M = setTimeout(()=>{
                O(),
                T()
            }
            , +e.autoplay))
        }
          , I = (H=+e.initialSwipe)=>{
            if (!r.value)
                return;
            const F = ()=>{
                var q, de;
                if (!vo(r)) {
                    const P = {
                        width: r.value.offsetWidth,
                        height: r.value.offsetHeight
                    };
                    o.rect = P,
                    o.width = +((q = e.width) != null ? q : P.width),
                    o.height = +((de = e.height) != null ? de : P.height)
                }
                c.value && (H = Math.min(c.value - 1, H),
                H === -1 && (H = c.value - 1)),
                o.active = H,
                o.swiping = !0,
                o.offset = S(H),
                l.forEach(P=>{
                    P.setOffset(0)
                }
                ),
                T()
            }
            ;
            vo(r) ? Be().then(F) : F()
        }
          , U = ()=>I(o.active);
        let ce;
        const me = H=>{
            !e.touchable || H.touches.length > 1 || (s.start(H),
            a = !1,
            ce = Date.now(),
            B(),
            N())
        }
          , K = H=>{
            e.touchable && o.swiping && (s.move(H),
            g.value && (!e.loop && (o.active === 0 && h.value > 0 || o.active === c.value - 1 && h.value < 0) || (lt(H, e.stopPropagation),
            A({
                offset: h.value
            }),
            a || (t("dragStart", {
                index: y.value
            }),
            a = !0))))
        }
          , ee = ()=>{
            if (!e.touchable || !o.swiping)
                return;
            const H = Date.now() - ce
              , F = h.value / H;
            if ((Math.abs(F) > .25 || Math.abs(h.value) > f.value / 2) && g.value) {
                const de = e.vertical ? s.offsetY.value : s.offsetX.value;
                let P = 0;
                e.loop ? P = de > 0 ? h.value > 0 ? -1 : 1 : 0 : P = -Math[h.value > 0 ? "ceil" : "floor"](h.value / f.value),
                A({
                    pace: P,
                    emitChange: !0
                })
            } else
                h.value && A({
                    pace: 0
                });
            a = !1,
            o.swiping = !1,
            t("dragEnd", {
                index: y.value
            }),
            T()
        }
          , re = (H,F={})=>{
            N(),
            s.reset(),
            Gr(()=>{
                let q;
                e.loop && H === c.value ? q = o.active === 0 ? 0 : H : q = H % c.value,
                F.immediate ? Gr(()=>{
                    o.swiping = !1
                }
                ) : o.swiping = !1,
                A({
                    pace: q - o.active,
                    emitChange: !0
                })
            }
            )
        }
          , fe = (H,F)=>{
            const q = F === y.value
              , de = q ? {
                backgroundColor: e.indicatorColor
            } : void 0;
            return k("i", {
                style: de,
                class: Vo("indicator", {
                    active: q
                })
            }, null)
        }
          , Oe = ()=>{
            if (n.indicator)
                return n.indicator({
                    active: y.value,
                    total: c.value
                });
            if (e.showIndicators && c.value > 1)
                return k("div", {
                    class: Vo("indicators", {
                        vertical: e.vertical
                    })
                }, [Array(c.value).fill("").map(fe)])
        }
        ;
        return bt({
            prev: x,
            next: O,
            state: o,
            resize: U,
            swipeTo: re
        }),
        u({
            size: f,
            props: e,
            count: c,
            activeIndicator: y
        }),
        he(()=>e.initialSwipe, H=>I(+H)),
        he(c, ()=>I(o.active)),
        he(()=>e.autoplay, T),
        he([Nr, Co, ()=>e.width, ()=>e.height], U),
        he(jb(), H=>{
            H === "visible" ? T() : B()
        }
        ),
        gt(I),
        Pr(()=>I(o.active)),
        Hs(()=>I(o.active)),
        Zn(B),
        fn(B),
        Bt("touchmove", K, {
            target: i
        }),
        ()=>{
            var H;
            return k("div", {
                ref: r,
                class: Vo()
            }, [k("div", {
                ref: i,
                style: _.value,
                class: Vo("track", {
                    vertical: e.vertical
                }),
                onTouchstartPassive: me,
                onTouchend: ee,
                onTouchcancel: ee
            }, [(H = n.default) == null ? void 0 : H.call(n)]), Oe()])
        }
    }
});
const im = Ne(O_)
  , [k_,Wc] = ke("tabs");
var I_ = Ee({
    name: k_,
    props: {
        count: kt(Number),
        inited: Boolean,
        animated: Boolean,
        duration: kt(ge),
        swipeable: Boolean,
        lazyRender: Boolean,
        currentIndex: kt(Number)
    },
    emits: ["change"],
    setup(e, {emit: t, slots: n}) {
        const r = oe()
          , i = s=>t("change", s)
          , o = ()=>{
            var s;
            const l = (s = n.default) == null ? void 0 : s.call(n);
            return e.animated || e.swipeable ? k(im, {
                ref: r,
                loop: !1,
                class: Wc("track"),
                duration: +e.duration * 1e3,
                touchable: e.swipeable,
                lazyRender: e.lazyRender,
                showIndicators: !1,
                onChange: i
            }, {
                default: ()=>[l]
            }) : l
        }
          , a = s=>{
            const l = r.value;
            l && l.state.active !== s && l.swipeTo(s, {
                immediate: !e.inited
            })
        }
        ;
        return he(()=>e.currentIndex, a),
        gt(()=>{
            a(e.currentIndex)
        }
        ),
        bt({
            swipeRef: r
        }),
        ()=>k("div", {
            class: Wc("content", {
                animated: e.animated || e.swipeable
            })
        }, [o()])
    }
});
const [am,Ho] = ke("tabs")
  , P_ = {
    type: _e("line"),
    color: String,
    border: Boolean,
    sticky: Boolean,
    shrink: Boolean,
    active: Ae(0),
    duration: Ae(.3),
    animated: Boolean,
    ellipsis: ve,
    swipeable: Boolean,
    scrollspy: Boolean,
    offsetTop: Ae(0),
    background: String,
    lazyRender: ve,
    showHeader: ve,
    lineWidth: ge,
    lineHeight: ge,
    beforeChange: Function,
    swipeThreshold: Ae(5),
    titleActiveColor: String,
    titleInactiveColor: String
}
  , sm = Symbol(am);
var R_ = Ee({
    name: am,
    props: P_,
    emits: ["change", "scroll", "rendered", "clickTab", "update:active"],
    setup(e, {emit: t, slots: n}) {
        let r, i, o, a, s;
        const l = oe()
          , u = oe()
          , c = oe()
          , f = oe()
          , h = zs()
          , p = Od(l)
          , [v,E] = y_()
          , {children: y, linkChildren: g} = To(sm)
          , _ = rt({
            inited: !1,
            position: "",
            lineStyle: {},
            currentIndex: -1
        })
          , C = ne(()=>y.length > +e.swipeThreshold || !e.ellipsis || e.shrink)
          , S = ne(()=>({
            borderColor: e.color,
            background: e.background
        }))
          , A = (P,V)=>{
            var w;
            return (w = P.name) != null ? w : V
        }
          , N = ne(()=>{
            const P = y[_.currentIndex];
            if (P)
                return A(P, _.currentIndex)
        }
        )
          , x = ne(()=>Vs(e.offsetTop))
          , O = ne(()=>e.sticky ? x.value + r : 0)
          , M = P=>{
            const V = u.value
              , w = v.value;
            if (!C.value || !V || !w || !w[_.currentIndex])
                return;
            const W = w[_.currentIndex].$el
              , X = W.offsetLeft - (V.offsetWidth - W.offsetWidth) / 2;
            a && a(),
            a = p_(V, X, P ? 0 : +e.duration)
        }
          , B = ()=>{
            const P = _.inited;
            Be(()=>{
                const V = v.value;
                if (!V || !V[_.currentIndex] || e.type !== "line" || vo(l.value))
                    return;
                const w = V[_.currentIndex].$el
                  , {lineWidth: W, lineHeight: X} = e
                  , te = w.offsetLeft + w.offsetWidth / 2
                  , Z = {
                    width: We(W),
                    backgroundColor: e.color,
                    transform: `translateX(${te}px) translateX(-50%)`
                };
                if (P && (Z.transitionDuration = `${e.duration}s`),
                Ue(X)) {
                    const le = We(X);
                    Z.height = le,
                    Z.borderRadius = le
                }
                _.lineStyle = Z
            }
            )
        }
          , T = P=>{
            const V = P < _.currentIndex ? -1 : 1;
            for (; P >= 0 && P < y.length; ) {
                if (!y[P].disabled)
                    return P;
                P += V
            }
        }
          , I = (P,V)=>{
            const w = T(P);
            if (!Ue(w))
                return;
            const W = y[w]
              , X = A(W, w)
              , te = _.currentIndex !== null;
            _.currentIndex !== w && (_.currentIndex = w,
            V || M(),
            B()),
            X !== e.active && (t("update:active", X),
            te && t("change", X, W.title)),
            o && !e.scrollspy && Us(Math.ceil(Ic(l.value) - x.value))
        }
          , U = (P,V)=>{
            const w = y.find((X,te)=>A(X, te) === P)
              , W = w ? y.indexOf(w) : 0;
            I(W, V)
        }
          , ce = (P=!1)=>{
            if (e.scrollspy) {
                const V = y[_.currentIndex].$el;
                if (V && p.value) {
                    const w = Ic(V, p.value) - O.value;
                    i = !0,
                    s && s(),
                    s = v_(p.value, w, P ? 0 : +e.duration, ()=>{
                        i = !1
                    }
                    )
                }
            }
        }
          , me = (P,V,w)=>{
            const {title: W, disabled: X} = y[V]
              , te = A(y[V], V);
            X || (Dr(e.beforeChange, {
                args: [te],
                done: ()=>{
                    I(V),
                    ce()
                }
            }),
            Bd(P)),
            t("clickTab", {
                name: te,
                title: W,
                event: w,
                disabled: X
            })
        }
          , K = P=>{
            o = P.isFixed,
            t("scroll", P)
        }
          , ee = P=>{
            Be(()=>{
                U(P),
                ce(!0)
            }
            )
        }
          , re = ()=>{
            for (let P = 0; P < y.length; P++) {
                const {top: V} = It(y[P].$el);
                if (V > O.value)
                    return P === 0 ? 0 : P - 1
            }
            return y.length - 1
        }
          , fe = ()=>{
            if (e.scrollspy && !i) {
                const P = re();
                I(P)
            }
        }
          , Oe = ()=>{
            if (e.type === "line" && y.length)
                return k("div", {
                    class: Ho("line"),
                    style: _.lineStyle
                }, null)
        }
          , H = ()=>{
            var P, V, w;
            const {type: W, border: X, sticky: te} = e
              , Z = [k("div", {
                ref: te ? void 0 : c,
                class: [Ho("wrap"), {
                    [xd]: W === "line" && X
                }]
            }, [k("div", {
                ref: u,
                role: "tablist",
                class: Ho("nav", [W, {
                    shrink: e.shrink,
                    complete: C.value
                }]),
                style: S.value,
                "aria-orientation": "horizontal"
            }, [(P = n["nav-left"]) == null ? void 0 : P.call(n), y.map(le=>le.renderTitle(me)), Oe(), (V = n["nav-right"]) == null ? void 0 : V.call(n)])]), (w = n["nav-bottom"]) == null ? void 0 : w.call(n)];
            return te ? k("div", {
                ref: c
            }, [Z]) : Z
        }
          , F = ()=>{
            B(),
            Be(()=>{
                var P, V;
                M(!0),
                (V = (P = f.value) == null ? void 0 : P.swipeRef.value) == null || V.resize()
            }
            )
        }
        ;
        he(()=>[e.color, e.duration, e.lineWidth, e.lineHeight], B),
        he(Nr, F),
        he(()=>e.active, P=>{
            P !== N.value && U(P)
        }
        ),
        he(()=>y.length, ()=>{
            _.inited && (U(e.active),
            B(),
            Be(()=>{
                M(!0)
            }
            ))
        }
        );
        const q = ()=>{
            U(e.active, !0),
            Be(()=>{
                _.inited = !0,
                c.value && (r = It(c.value).height),
                M(!0)
            }
            )
        }
          , de = (P,V)=>t("rendered", P, V);
        return bt({
            resize: F,
            scrollTo: ee
        }),
        Pr(B),
        Hs(B),
        $i(q),
        nm(l, B),
        Bt("scroll", fe, {
            target: p,
            passive: !0
        }),
        g({
            id: h,
            props: e,
            setLine: B,
            scrollable: C,
            onRendered: de,
            currentName: N,
            setTitleRefs: E,
            scrollIntoView: M
        }),
        ()=>k("div", {
            ref: l,
            class: Ho([e.type])
        }, [e.showHeader ? e.sticky ? k(T_, {
            container: l.value,
            offsetTop: x.value,
            onScroll: K
        }, {
            default: ()=>[H()]
        }) : H() : null, k(I_, {
            ref: f,
            count: y.length,
            inited: _.inited,
            animated: e.animated,
            duration: e.duration,
            swipeable: e.swipeable,
            lazyRender: e.lazyRender,
            currentIndex: _.currentIndex,
            onChange: I
        }, {
            default: ()=>{
                var P;
                return [(P = n.default) == null ? void 0 : P.call(n)]
            }
        })])
    }
});
const L_ = Symbol()
  , [A_,jc] = ke("tab")
  , N_ = Ee({
    name: A_,
    props: {
        id: String,
        dot: Boolean,
        type: String,
        color: String,
        title: String,
        badge: ge,
        shrink: Boolean,
        isActive: Boolean,
        disabled: Boolean,
        controls: String,
        scrollable: Boolean,
        activeColor: String,
        inactiveColor: String,
        showZeroBadge: ve
    },
    setup(e, {slots: t}) {
        const n = ne(()=>{
            const i = {}
              , {type: o, color: a, disabled: s, isActive: l, activeColor: u, inactiveColor: c} = e;
            a && o === "card" && (i.borderColor = a,
            s || (l ? i.backgroundColor = a : i.color = a));
            const h = l ? u : c;
            return h && (i.color = h),
            i
        }
        )
          , r = ()=>{
            const i = k("span", {
                class: jc("text", {
                    ellipsis: !e.scrollable
                })
            }, [t.title ? t.title() : e.title]);
            return e.dot || Ue(e.badge) && e.badge !== "" ? k(Ud, {
                dot: e.dot,
                content: e.badge,
                showZero: e.showZeroBadge
            }, {
                default: ()=>[i]
            }) : i
        }
        ;
        return ()=>k("div", {
            id: e.id,
            role: "tab",
            class: [jc([e.type, {
                grow: e.scrollable && !e.shrink,
                shrink: e.shrink,
                active: e.isActive,
                disabled: e.disabled
            }])],
            style: n.value,
            tabindex: e.disabled ? void 0 : e.isActive ? 0 : -1,
            "aria-selected": e.isActive,
            "aria-disabled": e.disabled || void 0,
            "aria-controls": e.controls,
            "data-allow-mismatch": "attribute"
        }, [r()])
    }
})
  , [x_,D_] = ke("swipe-item");
var M_ = Ee({
    name: x_,
    setup(e, {slots: t}) {
        let n;
        const r = rt({
            offset: 0,
            inited: !1,
            mounted: !1
        })
          , {parent: i, index: o} = Ar(om);
        if (!i)
            return;
        const a = ne(()=>{
            const u = {}
              , {vertical: c} = i.props;
            return i.size.value && (u[c ? "height" : "width"] = `${i.size.value}px`),
            r.offset && (u.transform = `translate${c ? "Y" : "X"}(${r.offset}px)`),
            u
        }
        )
          , s = ne(()=>{
            const {loop: u, lazyRender: c} = i.props;
            if (!c || n)
                return !0;
            if (!r.mounted)
                return !1;
            const f = i.activeIndicator.value
              , h = i.count.value - 1
              , p = f === 0 && u ? h : f - 1
              , v = f === h && u ? 0 : f + 1;
            return n = o.value === f || o.value === p || o.value === v,
            n
        }
        )
          , l = u=>{
            r.offset = u
        }
        ;
        return gt(()=>{
            Be(()=>{
                r.mounted = !0
            }
            )
        }
        ),
        bt({
            setOffset: l
        }),
        ()=>{
            var u;
            return k("div", {
                class: D_(),
                style: a.value
            }, [s.value ? (u = t.default) == null ? void 0 : u.call(t) : null])
        }
    }
});
const lm = Ne(M_)
  , [F_,la] = ke("tab")
  , $_ = Me({}, Ui, {
    dot: Boolean,
    name: ge,
    badge: ge,
    title: String,
    disabled: Boolean,
    titleClass: st,
    titleStyle: [String, Object],
    showZeroBadge: ve
});
var B_ = Ee({
    name: F_,
    props: $_,
    setup(e, {slots: t}) {
        const n = zs()
          , r = oe(!1)
          , i = ct()
          , {parent: o, index: a} = Ar(sm);
        if (!o)
            return;
        const s = ()=>{
            var v;
            return (v = e.name) != null ? v : a.value
        }
          , l = ()=>{
            r.value = !0,
            o.props.lazyRender && Be(()=>{
                o.onRendered(s(), e.title)
            }
            )
        }
          , u = ne(()=>{
            const v = s() === o.currentName.value;
            return v && !r.value && l(),
            v
        }
        )
          , c = oe("")
          , f = oe("");
        Pi(()=>{
            const {titleClass: v, titleStyle: E} = e;
            c.value = v ? tm(v) : "",
            f.value = E && typeof E != "string" ? g_(em(E)) : E
        }
        );
        const h = v=>k(N_, qe({
            key: n,
            id: `${o.id}-${a.value}`,
            ref: o.setTitleRefs(a.value),
            style: f.value,
            class: c.value,
            isActive: u.value,
            controls: n,
            scrollable: o.scrollable.value,
            activeColor: o.props.titleActiveColor,
            inactiveColor: o.props.titleInactiveColor,
            onClick: E=>v(i.proxy, a.value, E)
        }, _t(o.props, ["type", "color", "shrink"]), _t(e, ["dot", "badge", "title", "disabled", "showZeroBadge"])), {
            title: t.title
        })
          , p = oe(!u.value);
        return he(u, v=>{
            v ? p.value = !1 : Gr(()=>{
                p.value = !0
            }
            )
        }
        ),
        he(()=>e.title, ()=>{
            o.setLine(),
            o.scrollIntoView()
        }
        ),
        rn(L_, u),
        bt({
            id: n,
            renderTitle: h
        }),
        ()=>{
            var v;
            const E = `${o.id}-${a.value}`
              , {animated: y, swipeable: g, scrollspy: _, lazyRender: C} = o.props;
            if (!t.default && !y)
                return;
            const S = _ || u.value;
            if (y || g)
                return k(lm, {
                    id: n,
                    role: "tabpanel",
                    class: la("panel-wrapper", {
                        inactive: p.value
                    }),
                    tabindex: u.value ? 0 : -1,
                    "aria-hidden": !u.value,
                    "aria-labelledby": E,
                    "data-allow-mismatch": "attribute"
                }, {
                    default: ()=>{
                        var x;
                        return [k("div", {
                            class: la("panel")
                        }, [(x = t.default) == null ? void 0 : x.call(t)])]
                    }
                });
            const N = r.value || _ || !C ? (v = t.default) == null ? void 0 : v.call(t) : null;
            return on(k("div", {
                id: n,
                role: "tabpanel",
                class: la("panel"),
                tabindex: S ? 0 : -1,
                "aria-labelledby": E,
                "data-allow-mismatch": "attribute"
            }, [N]), [[Pn, S]])
        }
    }
});
const cm = Ne(B_)
  , um = Ne(R_)
  , [fm,ca] = ke("picker-group")
  , dm = Symbol(fm)
  , U_ = Me({
    tabs: Gn(),
    activeTab: Ae(0),
    nextStepText: String,
    showToolbar: ve
}, Vi);
Ee({
    name: fm,
    props: U_,
    emits: ["confirm", "cancel", "update:activeTab"],
    setup(e, {emit: t, slots: n}) {
        const r = Jd(()=>e.activeTab, u=>t("update:activeTab", u))
          , {children: i, linkChildren: o} = To(dm);
        o();
        const a = ()=>+r.value < e.tabs.length - 1 && e.nextStepText
          , s = ()=>{
            a() ? r.value = +r.value + 1 : t("confirm", i.map(u=>u.confirm()))
        }
          , l = ()=>t("cancel");
        return ()=>{
            var u, c;
            let f = (c = (u = n.default) == null ? void 0 : u.call(n)) == null ? void 0 : c.filter(p=>p.type !== Rt).map(p=>p.type === ot ? p.children : p);
            f && (f = Mb(f));
            const h = a() ? e.nextStepText : e.confirmButtonText;
            return k("div", {
                class: ca()
            }, [e.showToolbar ? k(Xd, {
                title: e.title,
                cancelButtonText: e.cancelButtonText,
                confirmButtonText: h,
                onConfirm: s,
                onCancel: l
            }, _t(n, Gd)) : null, k(um, {
                active: r.value,
                "onUpdate:active": p=>r.value = p,
                class: ca("tabs"),
                shrink: !0,
                animated: !0,
                lazyRender: !1
            }, {
                default: ()=>[e.tabs.map((p,v)=>k(cm, {
                    title: p,
                    titleClass: ca("tab-title")
                }, {
                    default: ()=>[f == null ? void 0 : f[v]]
                }))]
            })])
        }
    }
});
const V_ = Me({
    loading: Boolean,
    readonly: Boolean,
    allowHtml: Boolean,
    optionHeight: Ae(44),
    showToolbar: ve,
    swipeDuration: Ae(1e3),
    visibleOptionNum: Ae(6)
}, Vi)
  , H_ = Me({}, V_, {
    columns: Gn(),
    modelValue: Gn(),
    toolbarPosition: _e("top"),
    columnsFieldNames: Object
});
var W_ = Ee({
    name: Qy,
    props: H_,
    emits: ["confirm", "cancel", "change", "scrollInto", "clickOption", "update:modelValue"],
    setup(e, {emit: t, slots: n}) {
        const r = oe()
          , i = oe(e.modelValue.slice(0))
          , {parent: o} = Ar(dm)
          , {children: a, linkChildren: s} = To(qd);
        s();
        const l = ne(()=>r_(e.columnsFieldNames))
          , u = ne(()=>Vs(e.optionHeight))
          , c = ne(()=>e_(e.columns, l.value))
          , f = ne(()=>{
            const {columns: T} = e;
            switch (c.value) {
            case "multiple":
                return T;
            case "cascade":
                return t_(T, l.value, i);
            default:
                return [T]
            }
        }
        )
          , h = ne(()=>f.value.some(T=>T.length))
          , p = ne(()=>f.value.map((T,I)=>Ja(T, i.value[I], l.value)))
          , v = ne(()=>f.value.map((T,I)=>T.findIndex(U=>U[l.value.value] === i.value[I])))
          , E = (T,I)=>{
            if (i.value[T] !== I) {
                const U = i.value.slice(0);
                U[T] = I,
                i.value = U
            }
        }
          , y = ()=>({
            selectedValues: i.value.slice(0),
            selectedOptions: p.value,
            selectedIndexes: v.value
        })
          , g = (T,I)=>{
            E(I, T),
            c.value === "cascade" && i.value.forEach((U,ce)=>{
                const me = f.value[ce];
                Uc(me, U, l.value) || E(ce, me.length ? me[0][l.value.value] : void 0)
            }
            ),
            Be(()=>{
                t("change", Me({
                    columnIndex: I
                }, y()))
            }
            )
        }
          , _ = (T,I)=>{
            const U = {
                columnIndex: I,
                currentOption: T
            };
            t("clickOption", Me(y(), U)),
            t("scrollInto", U)
        }
          , C = ()=>{
            a.forEach(I=>I.stopMomentum());
            const T = y();
            return Be(()=>{
                t("confirm", T)
            }
            ),
            T
        }
          , S = ()=>t("cancel", y())
          , A = ()=>f.value.map((T,I)=>k(i_, {
            value: i.value[I],
            fields: l.value,
            options: T,
            readonly: e.readonly,
            allowHtml: e.allowHtml,
            optionHeight: u.value,
            swipeDuration: e.swipeDuration,
            visibleOptionNum: e.visibleOptionNum,
            onChange: U=>g(U, I),
            onClickOption: U=>_(U, I),
            onScrollInto: U=>{
                t("scrollInto", {
                    currentOption: U,
                    columnIndex: I
                })
            }
        }, {
            option: n.option
        }))
          , N = T=>{
            if (h.value) {
                const I = {
                    height: `${u.value}px`
                }
                  , U = {
                    backgroundSize: `100% ${(T - u.value) / 2}px`
                };
                return [k("div", {
                    class: nn("mask"),
                    style: U
                }, null), k("div", {
                    class: [uy, nn("frame")],
                    style: I
                }, null)]
            }
        }
          , x = ()=>{
            const T = u.value * +e.visibleOptionNum
              , I = {
                height: `${T}px`
            };
            return k("div", {
                ref: r,
                class: nn("columns"),
                style: I
            }, [A(), N(T)])
        }
          , O = ()=>{
            if (e.showToolbar && !o)
                return k(Xd, qe(_t(e, s_), {
                    onConfirm: C,
                    onCancel: S
                }), _t(n, Gd))
        }
        ;
        he(f, T=>{
            T.forEach((I,U)=>{
                I.length && !Uc(I, i.value[U], l.value) && E(U, Kd(I)[l.value.value])
            }
            )
        }
        , {
            immediate: !0
        });
        let M;
        return he(()=>e.modelValue, T=>{
            !to(T, i.value) && !to(T, M) && (i.value = T.slice(0),
            M = T.slice(0))
        }
        , {
            deep: !0
        }),
        he(i, T=>{
            to(T, e.modelValue) || (M = T.slice(0),
            t("update:modelValue", M))
        }
        , {
            immediate: !0
        }),
        Bt("touchmove", lt, {
            target: r
        }),
        bt({
            confirm: C,
            getSelectedOptions: ()=>p.value
        }),
        ()=>{
            var T, I;
            return k("div", {
                class: nn()
            }, [e.toolbarPosition === "top" ? O() : null, e.loading ? k(tr, {
                class: nn("loading")
            }, null) : null, (T = n["columns-top"]) == null ? void 0 : T.call(n), x(), (I = n["columns-bottom"]) == null ? void 0 : I.call(n), e.toolbarPosition === "bottom" ? O() : null])
        }
    }
});
const j_ = Ne(W_)
  , [z_,rr] = ke("cell")
  , mm = {
    tag: _e("div"),
    icon: String,
    size: String,
    title: ge,
    value: ge,
    label: ge,
    center: Boolean,
    isLink: Boolean,
    border: ve,
    iconPrefix: String,
    valueClass: st,
    labelClass: st,
    titleClass: st,
    titleStyle: null,
    arrowDirection: String,
    required: {
        type: [Boolean, String],
        default: null
    },
    clickable: {
        type: Boolean,
        default: null
    }
}
  , K_ = Me({}, mm, Ui);
var Y_ = Ee({
    name: z_,
    props: K_,
    setup(e, {slots: t}) {
        const n = Ws()
          , r = ()=>{
            if (t.label || Ue(e.label))
                return k("div", {
                    class: [rr("label"), e.labelClass]
                }, [t.label ? t.label() : e.label])
        }
          , i = ()=>{
            var l;
            if (t.title || Ue(e.title)) {
                const u = (l = t.title) == null ? void 0 : l.call(t);
                return Array.isArray(u) && u.length === 0 ? void 0 : k("div", {
                    class: [rr("title"), e.titleClass],
                    style: e.titleStyle
                }, [u || k("span", null, [e.title]), r()])
            }
        }
          , o = ()=>{
            const l = t.value || t.default;
            if (l || Ue(e.value))
                return k("div", {
                    class: [rr("value"), e.valueClass]
                }, [l ? l() : k("span", null, [e.value])])
        }
          , a = ()=>{
            if (t.icon)
                return t.icon();
            if (e.icon)
                return k(at, {
                    name: e.icon,
                    class: rr("left-icon"),
                    classPrefix: e.iconPrefix
                }, null)
        }
          , s = ()=>{
            if (t["right-icon"])
                return t["right-icon"]();
            if (e.isLink) {
                const l = e.arrowDirection && e.arrowDirection !== "right" ? `arrow-${e.arrowDirection}` : "arrow";
                return k(at, {
                    name: l,
                    class: rr("right-icon")
                }, null)
            }
        }
        ;
        return ()=>{
            var l;
            const {tag: u, size: c, center: f, border: h, isLink: p, required: v} = e
              , E = (l = e.clickable) != null ? l : p
              , y = {
                center: f,
                required: !!v,
                clickable: E,
                borderless: !h
            };
            return c && (y[c] = !!c),
            k(u, {
                class: rr(y),
                role: E ? "button" : void 0,
                tabindex: E ? 0 : void 0,
                onClick: n
            }, {
                default: ()=>{
                    var g;
                    return [a(), i(), o(), s(), (g = t.extra) == null ? void 0 : g.call(t)]
                }
            })
        }
    }
});
const hm = Ne(Y_);
function gm(e) {
    return Array.isArray(e) ? !e.length : e === 0 ? !1 : !e
}
function q_(e, t) {
    if (gm(e)) {
        if (t.required)
            return !1;
        if (t.validateEmpty === !1)
            return !0
    }
    return !(t.pattern && !t.pattern.test(String(e)))
}
function G_(e, t) {
    return new Promise(n=>{
        const r = t.validator(e, t);
        if (Ms(r)) {
            r.then(n);
            return
        }
        n(r)
    }
    )
}
function zc(e, t) {
    const {message: n} = t;
    return wr(n) ? n(e, t) : n || ""
}
function X_({target: e}) {
    e.composing = !0
}
function Kc({target: e}) {
    e.composing && (e.composing = !1,
    e.dispatchEvent(new Event("input")))
}
function J_(e, t) {
    const n = Bs();
    e.style.height = "auto";
    let r = e.scrollHeight;
    if (qn(t)) {
        const {maxHeight: i, minHeight: o} = t;
        i !== void 0 && (r = Math.min(r, i)),
        o !== void 0 && (r = Math.max(r, o))
    }
    r && (e.style.height = `${r}px`,
    Us(n))
}
function Z_(e) {
    return e === "number" ? {
        type: "text",
        inputmode: "decimal"
    } : e === "digit" ? {
        type: "tel",
        inputmode: "numeric"
    } : {
        type: e
    }
}
function Jt(e) {
    return [...e].length
}
function ua(e, t) {
    return [...e].slice(0, t).join("")
}
const [Q_,Tt] = ke("field")
  , eE = {
    id: String,
    name: String,
    leftIcon: String,
    rightIcon: String,
    autofocus: Boolean,
    clearable: Boolean,
    maxlength: ge,
    max: Number,
    min: Number,
    formatter: Function,
    clearIcon: _e("clear"),
    modelValue: Ae(""),
    inputAlign: String,
    placeholder: String,
    autocomplete: String,
    autocapitalize: String,
    autocorrect: String,
    errorMessage: String,
    enterkeyhint: String,
    clearTrigger: _e("focus"),
    formatTrigger: _e("onChange"),
    spellcheck: {
        type: Boolean,
        default: null
    },
    error: {
        type: Boolean,
        default: null
    },
    disabled: {
        type: Boolean,
        default: null
    },
    readonly: {
        type: Boolean,
        default: null
    }
}
  , tE = Me({}, mm, eE, {
    rows: ge,
    type: _e("text"),
    rules: Array,
    autosize: [Boolean, Object],
    labelWidth: ge,
    labelClass: st,
    labelAlign: String,
    showWordLimit: Boolean,
    errorMessageAlign: String,
    colon: {
        type: Boolean,
        default: null
    }
});
var nE = Ee({
    name: Q_,
    props: tE,
    emits: ["blur", "focus", "clear", "keypress", "clickInput", "endValidate", "startValidate", "clickLeftIcon", "clickRightIcon", "update:modelValue"],
    setup(e, {emit: t, slots: n}) {
        const r = zs()
          , i = rt({
            status: "unvalidated",
            focused: !1,
            validateMessage: ""
        })
          , o = oe()
          , a = oe()
          , s = oe()
          , {parent: l} = Ar(fy)
          , u = ()=>{
            var w;
            return String((w = e.modelValue) != null ? w : "")
        }
          , c = w=>{
            if (Ue(e[w]))
                return e[w];
            if (l && Ue(l.props[w]))
                return l.props[w]
        }
          , f = ne(()=>{
            const w = c("readonly");
            if (e.clearable && !w) {
                const W = u() !== ""
                  , X = e.clearTrigger === "always" || e.clearTrigger === "focus" && i.focused;
                return W && X
            }
            return !1
        }
        )
          , h = ne(()=>s.value && n.input ? s.value() : e.modelValue)
          , p = ne(()=>{
            var w;
            const W = c("required");
            return W === "auto" ? (w = e.rules) == null ? void 0 : w.some(X=>X.required) : W
        }
        )
          , v = w=>w.reduce((W,X)=>W.then(()=>{
            if (i.status === "failed")
                return;
            let {value: te} = h;
            if (X.formatter && (te = X.formatter(te, X)),
            !q_(te, X)) {
                i.status = "failed",
                i.validateMessage = zc(te, X);
                return
            }
            if (X.validator)
                return gm(te) && X.validateEmpty === !1 ? void 0 : G_(te, X).then(Z=>{
                    Z && typeof Z == "string" ? (i.status = "failed",
                    i.validateMessage = Z) : Z === !1 && (i.status = "failed",
                    i.validateMessage = zc(te, X))
                }
                )
        }
        ), Promise.resolve())
          , E = ()=>{
            i.status = "unvalidated",
            i.validateMessage = ""
        }
          , y = ()=>t("endValidate", {
            status: i.status,
            message: i.validateMessage
        })
          , g = (w=e.rules)=>new Promise(W=>{
            E(),
            w ? (t("startValidate"),
            v(w).then(()=>{
                i.status === "failed" ? (W({
                    name: e.name,
                    message: i.validateMessage
                }),
                y()) : (i.status = "passed",
                W(),
                y())
            }
            )) : W()
        }
        )
          , _ = w=>{
            if (l && e.rules) {
                const {validateTrigger: W} = l.props
                  , X = mi(W).includes(w)
                  , te = e.rules.filter(Z=>Z.trigger ? mi(Z.trigger).includes(w) : X);
                te.length && g(te)
            }
        }
          , C = w=>{
            var W;
            const {maxlength: X} = e;
            if (Ue(X) && Jt(w) > +X) {
                const te = u();
                if (te && Jt(te) === +X)
                    return te;
                const Z = (W = o.value) == null ? void 0 : W.selectionEnd;
                if (i.focused && Z) {
                    const le = [...w]
                      , d = le.length - +X;
                    return le.splice(Z - d, d),
                    le.join("")
                }
                return ua(w, +X)
            }
            return w
        }
          , S = (w,W="onChange")=>{
            var X, te;
            const Z = w;
            w = C(w);
            const le = Jt(Z) - Jt(w);
            if (e.type === "number" || e.type === "digit") {
                const m = e.type === "number";
                w = Ga(w, m, m),
                W === "onBlur" && w !== "" && (w = ht(+w, (X = e.min) != null ? X : -1 / 0, (te = e.max) != null ? te : 1 / 0).toString())
            }
            let d = 0;
            if (e.formatter && W === e.formatTrigger) {
                const {formatter: m, maxlength: b} = e;
                if (w = m(w),
                Ue(b) && Jt(w) > +b && (w = ua(w, +b)),
                o.value && i.focused) {
                    const {selectionEnd: L} = o.value
                      , D = ua(Z, L);
                    d = Jt(m(D)) - Jt(D)
                }
            }
            if (o.value && o.value.value !== w)
                if (i.focused) {
                    let {selectionStart: m, selectionEnd: b} = o.value;
                    if (o.value.value = w,
                    Ue(m) && Ue(b)) {
                        const L = Jt(w);
                        le ? (m -= le,
                        b -= le) : d && (m += d,
                        b += d),
                        o.value.setSelectionRange(Math.min(m, L), Math.min(b, L))
                    }
                } else
                    o.value.value = w;
            w !== e.modelValue && t("update:modelValue", w)
        }
          , A = w=>{
            w.target.composing || S(w.target.value)
        }
          , N = ()=>{
            var w;
            return (w = o.value) == null ? void 0 : w.blur()
        }
          , x = ()=>{
            var w;
            return (w = o.value) == null ? void 0 : w.focus()
        }
          , O = ()=>{
            const w = o.value;
            e.type === "textarea" && e.autosize && w && J_(w, e.autosize)
        }
          , M = w=>{
            i.focused = !0,
            t("focus", w),
            Be(O),
            c("readonly") && N()
        }
          , B = w=>{
            i.focused = !1,
            S(u(), "onBlur"),
            t("blur", w),
            !c("readonly") && (_("onBlur"),
            Be(O),
            Id())
        }
          , T = w=>t("clickInput", w)
          , I = w=>t("clickLeftIcon", w)
          , U = w=>t("clickRightIcon", w)
          , ce = w=>{
            lt(w),
            t("update:modelValue", ""),
            t("clear", w)
        }
          , me = ne(()=>{
            if (typeof e.error == "boolean")
                return e.error;
            if (l && l.props.showError && i.status === "failed")
                return !0
        }
        )
          , K = ne(()=>{
            const w = c("labelWidth")
              , W = c("labelAlign");
            if (w && W !== "top")
                return {
                    width: We(w)
                }
        }
        )
          , ee = w=>{
            w.keyCode === 13 && (!(l && l.props.submitOnEnter) && e.type !== "textarea" && lt(w),
            e.type === "search" && N()),
            t("keypress", w)
        }
          , re = ()=>e.id || `${r}-input`
          , fe = ()=>i.status
          , Oe = ()=>{
            const w = Tt("control", [c("inputAlign"), {
                error: me.value,
                custom: !!n.input,
                "min-height": e.type === "textarea" && !e.autosize
            }]);
            if (n.input)
                return k("div", {
                    class: w,
                    onClick: T
                }, [n.input()]);
            const W = {
                id: re(),
                ref: o,
                name: e.name,
                rows: e.rows !== void 0 ? +e.rows : void 0,
                class: w,
                disabled: c("disabled"),
                readonly: c("readonly"),
                autofocus: e.autofocus,
                placeholder: e.placeholder,
                autocomplete: e.autocomplete,
                autocapitalize: e.autocapitalize,
                autocorrect: e.autocorrect,
                enterkeyhint: e.enterkeyhint,
                spellcheck: e.spellcheck,
                "aria-labelledby": e.label ? `${r}-label` : void 0,
                "data-allow-mismatch": "attribute",
                onBlur: B,
                onFocus: M,
                onInput: A,
                onClick: T,
                onChange: Kc,
                onKeypress: ee,
                onCompositionend: Kc,
                onCompositionstart: X_
            };
            return e.type === "textarea" ? k("textarea", W, null) : k("input", qe(Z_(e.type), W), null)
        }
          , H = ()=>{
            const w = n["left-icon"];
            if (e.leftIcon || w)
                return k("div", {
                    class: Tt("left-icon"),
                    onClick: I
                }, [w ? w() : k(at, {
                    name: e.leftIcon,
                    classPrefix: e.iconPrefix
                }, null)])
        }
          , F = ()=>{
            const w = n["right-icon"];
            if (e.rightIcon || w)
                return k("div", {
                    class: Tt("right-icon"),
                    onClick: U
                }, [w ? w() : k(at, {
                    name: e.rightIcon,
                    classPrefix: e.iconPrefix
                }, null)])
        }
          , q = ()=>{
            if (e.showWordLimit && e.maxlength) {
                const w = Jt(u());
                return k("div", {
                    class: Tt("word-limit")
                }, [k("span", {
                    class: Tt("word-num")
                }, [w]), Uf("/"), e.maxlength])
            }
        }
          , de = ()=>{
            if (l && l.props.showErrorMessage === !1)
                return;
            const w = e.errorMessage || i.validateMessage;
            if (w) {
                const W = n["error-message"]
                  , X = c("errorMessageAlign");
                return k("div", {
                    class: Tt("error-message", X)
                }, [W ? W({
                    message: w
                }) : w])
            }
        }
          , P = ()=>{
            const w = c("labelWidth")
              , W = c("labelAlign")
              , X = c("colon") ? ":" : "";
            if (n.label)
                return [n.label(), X];
            if (e.label)
                return k("label", {
                    id: `${r}-label`,
                    for: n.input ? void 0 : re(),
                    "data-allow-mismatch": "attribute",
                    onClick: te=>{
                        lt(te),
                        x()
                    }
                    ,
                    style: W === "top" && w ? {
                        width: We(w)
                    } : void 0
                }, [e.label + X])
        }
          , V = ()=>[k("div", {
            class: Tt("body")
        }, [Oe(), f.value && k(at, {
            ref: a,
            name: e.clearIcon,
            class: Tt("clear")
        }, null), F(), n.button && k("div", {
            class: Tt("button")
        }, [n.button()])]), q(), de()];
        return bt({
            blur: N,
            focus: x,
            validate: g,
            formValue: h,
            resetValidation: E,
            getValidationStatus: fe
        }),
        rn(kd, {
            customValue: s,
            resetValidation: E,
            validateWithTrigger: _
        }),
        he(()=>e.modelValue, ()=>{
            S(u()),
            E(),
            _("onChange"),
            Be(O)
        }
        ),
        gt(()=>{
            S(u(), e.formatTrigger),
            Be(O)
        }
        ),
        Bt("touchstart", ce, {
            target: ne(()=>{
                var w;
                return (w = a.value) == null ? void 0 : w.$el
            }
            )
        }),
        ()=>{
            const w = c("disabled")
              , W = c("labelAlign")
              , X = H()
              , te = ()=>{
                const Z = P();
                return W === "top" ? [X, Z].filter(Boolean) : Z || []
            }
            ;
            return k(hm, {
                size: e.size,
                class: Tt({
                    error: me.value,
                    disabled: w,
                    [`label-${W}`]: W
                }),
                center: e.center,
                border: e.border,
                isLink: e.isLink,
                clickable: e.clickable,
                titleStyle: K.value,
                valueClass: Tt("value"),
                titleClass: [Tt("label", [W, {
                    required: p.value
                }]), e.labelClass],
                arrowDirection: e.arrowDirection
            }, {
                icon: X && W !== "top" ? ()=>X : null,
                title: te,
                value: V,
                extra: n.extra
            })
        }
    }
});
const rE = Ne(nE);
let Wr = 0;
function oE(e) {
    e ? (Wr || document.body.classList.add("van-toast--unclickable"),
    Wr++) : Wr && (Wr--,
    Wr || document.body.classList.remove("van-toast--unclickable"))
}
const [iE,or] = ke("toast")
  , aE = ["show", "overlay", "teleport", "transition", "overlayClass", "overlayStyle", "closeOnClickOverlay", "zIndex"]
  , sE = {
    icon: String,
    show: Boolean,
    type: _e("text"),
    overlay: Boolean,
    message: ge,
    iconSize: ge,
    duration: Sd(2e3),
    position: _e("middle"),
    teleport: [String, Object],
    wordBreak: String,
    className: st,
    iconPrefix: String,
    transition: _e("van-fade"),
    loadingType: String,
    forbidClick: Boolean,
    overlayClass: st,
    overlayStyle: Object,
    closeOnClick: Boolean,
    closeOnClickOverlay: Boolean,
    zIndex: ge
};
var pm = Ee({
    name: iE,
    props: sE,
    emits: ["update:show"],
    setup(e, {emit: t, slots: n}) {
        let r, i = !1;
        const o = ()=>{
            const f = e.show && e.forbidClick;
            i !== f && (i = f,
            oE(i))
        }
          , a = f=>t("update:show", f)
          , s = ()=>{
            e.closeOnClick && a(!1)
        }
          , l = ()=>clearTimeout(r)
          , u = ()=>{
            const {icon: f, type: h, iconSize: p, iconPrefix: v, loadingType: E} = e;
            if (f || h === "success" || h === "fail")
                return k(at, {
                    name: f || h,
                    size: p,
                    class: or("icon"),
                    classPrefix: v
                }, null);
            if (h === "loading")
                return k(tr, {
                    class: or("loading"),
                    size: p,
                    type: E
                }, null)
        }
          , c = ()=>{
            const {type: f, message: h} = e;
            if (n.message)
                return k("div", {
                    class: or("text")
                }, [n.message()]);
            if (Ue(h) && h !== "")
                return f === "html" ? k("div", {
                    key: 0,
                    class: or("text"),
                    innerHTML: String(h)
                }, null) : k("div", {
                    class: or("text")
                }, [h])
        }
        ;
        return he(()=>[e.show, e.forbidClick], o),
        he(()=>[e.show, e.type, e.message, e.duration], ()=>{
            l(),
            e.show && e.duration > 0 && (r = setTimeout(()=>{
                a(!1)
            }
            , e.duration))
        }
        ),
        gt(o),
        Rr(o),
        ()=>k(ko, qe({
            class: [or([e.position, e.wordBreak === "normal" ? "break-normal" : e.wordBreak, {
                [e.type]: !e.icon
            }]), e.className],
            lockScroll: !1,
            onClick: s,
            onClosed: l,
            "onUpdate:show": a
        }, _t(e, aE)), {
            default: ()=>[u(), c()]
        })
    }
});
function Ks() {
    const e = rt({
        show: !1
    })
      , t = i=>{
        e.show = i
    }
      , n = i=>{
        Me(e, i, {
            transitionAppear: !0
        }),
        t(!0)
    }
      , r = ()=>t(!1);
    return bt({
        open: n,
        close: r,
        toggle: t
    }),
    {
        open: n,
        close: r,
        state: e,
        toggle: t
    }
}
function Ys(e) {
    const t = Xf(e)
      , n = document.createElement("div");
    return document.body.appendChild(n),
    {
        instance: t.mount(n),
        unmount() {
            t.unmount(),
            document.body.removeChild(n)
        }
    }
}
const lE = {
    icon: "",
    type: "text",
    message: "",
    className: "",
    overlay: !1,
    onClose: void 0,
    onOpened: void 0,
    duration: 2e3,
    teleport: "body",
    iconSize: void 0,
    iconPrefix: void 0,
    position: "middle",
    transition: "van-fade",
    forbidClick: !1,
    loadingType: void 0,
    overlayClass: "",
    overlayStyle: void 0,
    closeOnClick: !1,
    closeOnClickOverlay: !1
};
let On = []
  , cE = !1
  , Yc = Me({}, lE);
const uE = new Map;
function vm(e) {
    return qn(e) ? e : {
        message: e
    }
}
function fE() {
    const {instance: e, unmount: t} = Ys({
        setup() {
            const n = oe("")
              , {open: r, state: i, close: o, toggle: a} = Ks()
              , s = ()=>{}
              , l = ()=>k(pm, qe(i, {
                onClosed: s,
                "onUpdate:show": a
            }), null);
            return he(n, u=>{
                i.message = u
            }
            ),
            ct().render = l,
            {
                open: r,
                close: o,
                message: n
            }
        }
    });
    return e
}
function dE() {
    if (!On.length || cE) {
        const e = fE();
        On.push(e)
    }
    return On[On.length - 1]
}
function mE(e={}) {
    if (!qt)
        return {};
    const t = dE()
      , n = vm(e);
    return t.open(Me({}, Yc, uE.get(n.type || Yc.type), n)),
    t
}
const qs = e=>t=>mE(Me({
    type: e
}, vm(t)))
  , yC = qs("loading")
  , _C = qs("success")
  , hE = qs("fail")
  , EC = e=>{
    On.length && (e ? (On.forEach(t=>{
        t.close()
    }
    ),
    On = []) : On[0].close())
}
  , gE = Ne(pm)
  , [pE,fa] = ke("switch")
  , vE = {
    size: ge,
    loading: Boolean,
    disabled: Boolean,
    modelValue: st,
    activeColor: String,
    inactiveColor: String,
    activeValue: {
        type: st,
        default: !0
    },
    inactiveValue: {
        type: st,
        default: !1
    }
};
var bE = Ee({
    name: pE,
    props: vE,
    emits: ["change", "update:modelValue"],
    setup(e, {emit: t, slots: n}) {
        const r = ()=>e.modelValue === e.activeValue
          , i = ()=>{
            if (!e.disabled && !e.loading) {
                const a = r() ? e.inactiveValue : e.activeValue;
                t("update:modelValue", a),
                t("change", a)
            }
        }
          , o = ()=>{
            if (e.loading) {
                const a = r() ? e.activeColor : e.inactiveColor;
                return k(tr, {
                    class: fa("loading"),
                    color: a
                }, null)
            }
            if (n.node)
                return n.node()
        }
        ;
        return Bi(()=>e.modelValue),
        ()=>{
            var a;
            const {size: s, loading: l, disabled: u, activeColor: c, inactiveColor: f} = e
              , h = r()
              , p = {
                fontSize: We(s),
                backgroundColor: h ? c : f
            };
            return k("div", {
                role: "switch",
                class: fa({
                    on: h,
                    loading: l,
                    disabled: u
                }),
                style: p,
                tabindex: u ? void 0 : 0,
                "aria-checked": h,
                onClick: i
            }, [k("div", {
                class: fa("node")
            }, [o()]), (a = n.background) == null ? void 0 : a.call(n)])
        }
    }
});
const yE = Ne(bE)
  , [_E,qc] = ke("tag")
  , EE = {
    size: String,
    mark: Boolean,
    show: ve,
    type: _e("default"),
    color: String,
    plain: Boolean,
    round: Boolean,
    textColor: String,
    closeable: Boolean
};
var wE = Ee({
    name: _E,
    props: EE,
    emits: ["close"],
    setup(e, {slots: t, emit: n}) {
        const r = a=>{
            a.stopPropagation(),
            n("close", a)
        }
          , i = ()=>e.plain ? {
            color: e.textColor || e.color,
            borderColor: e.color
        } : {
            color: e.textColor,
            background: e.color
        }
          , o = ()=>{
            var a;
            const {type: s, mark: l, plain: u, round: c, size: f, closeable: h} = e
              , p = {
                mark: l,
                plain: u,
                round: c
            };
            f && (p[f] = f);
            const v = h && k(at, {
                name: "cross",
                class: [qc("close"), Xn],
                onClick: r
            }, null);
            return k("span", {
                style: i(),
                class: qc([p, s])
            }, [(a = t.default) == null ? void 0 : a.call(t), v])
        }
        ;
        return ()=>k(So, {
            name: e.closeable ? "van-fade" : void 0
        }, {
            default: ()=>[e.show ? o() : null]
        })
    }
});
const SE = Ne(wE)
  , [TE,ir] = ke("image")
  , CE = {
    src: String,
    alt: String,
    fit: String,
    position: String,
    round: Boolean,
    block: Boolean,
    width: ge,
    height: ge,
    radius: ge,
    lazyLoad: Boolean,
    iconSize: ge,
    showError: ve,
    errorIcon: _e("photo-fail"),
    iconPrefix: String,
    showLoading: ve,
    loadingIcon: _e("photo"),
    crossorigin: String,
    referrerpolicy: String
};
var OE = Ee({
    name: TE,
    props: CE,
    emits: ["load", "error"],
    setup(e, {emit: t, slots: n}) {
        const r = oe(!1)
          , i = oe(!0)
          , o = oe()
          , {$Lazyload: a} = ct().proxy
          , s = ne(()=>{
            const y = {
                width: We(e.width),
                height: We(e.height)
            };
            return Ue(e.radius) && (y.overflow = "hidden",
            y.borderRadius = We(e.radius)),
            y
        }
        );
        he(()=>e.src, ()=>{
            r.value = !1,
            i.value = !0
        }
        );
        const l = y=>{
            i.value && (i.value = !1,
            t("load", y))
        }
          , u = ()=>{
            const y = new Event("load");
            Object.defineProperty(y, "target", {
                value: o.value,
                enumerable: !0
            }),
            l(y)
        }
          , c = y=>{
            r.value = !0,
            i.value = !1,
            t("error", y)
        }
          , f = (y,g,_)=>_ ? _() : k(at, {
            name: y,
            size: e.iconSize,
            class: g,
            classPrefix: e.iconPrefix
        }, null)
          , h = ()=>{
            if (i.value && e.showLoading)
                return k("div", {
                    class: ir("loading")
                }, [f(e.loadingIcon, ir("loading-icon"), n.loading)]);
            if (r.value && e.showError)
                return k("div", {
                    class: ir("error")
                }, [f(e.errorIcon, ir("error-icon"), n.error)])
        }
          , p = ()=>{
            if (r.value || !e.src)
                return;
            const y = {
                alt: e.alt,
                class: ir("img"),
                style: {
                    objectFit: e.fit,
                    objectPosition: e.position
                },
                crossorigin: e.crossorigin,
                referrerpolicy: e.referrerpolicy
            };
            return e.lazyLoad ? on(k("img", qe({
                ref: o
            }, y), null), [[Pg("lazy"), e.src]]) : k("img", qe({
                ref: o,
                src: e.src,
                onLoad: l,
                onError: c
            }, y), null)
        }
          , v = ({el: y})=>{
            const g = ()=>{
                y === o.value && i.value && u()
            }
            ;
            o.value ? g() : Be(g)
        }
          , E = ({el: y})=>{
            y === o.value && !r.value && c()
        }
        ;
        return a && qt && (a.$on("loaded", v),
        a.$on("error", E),
        fn(()=>{
            a.$off("loaded", v),
            a.$off("error", E)
        }
        )),
        gt(()=>{
            Be(()=>{
                var y;
                ((y = o.value) == null ? void 0 : y.complete) && !e.lazyLoad && u()
            }
            )
        }
        ),
        ()=>{
            var y;
            return k("div", {
                class: ir({
                    round: e.round,
                    block: e.block
                }),
                style: s.value
            }, [p(), h(), (y = n.default) == null ? void 0 : y.call(n)])
        }
    }
});
const bm = Ne(OE)
  , [kE,Gc] = ke("cell-group")
  , IE = {
    title: String,
    inset: Boolean,
    border: ve
};
var PE = Ee({
    name: kE,
    inheritAttrs: !1,
    props: IE,
    setup(e, {slots: t, attrs: n}) {
        const r = ()=>{
            var o;
            return k("div", qe({
                class: [Gc({
                    inset: e.inset
                }), {
                    [xd]: e.border && !e.inset
                }]
            }, n, gi()), [(o = t.default) == null ? void 0 : o.call(t)])
        }
          , i = ()=>k("div", {
            class: Gc("title", {
                inset: e.inset
            })
        }, [t.title ? t.title() : e.title]);
        return ()=>e.title || t.title ? k(ot, null, [i(), r()]) : r()
    }
});
const RE = Ne(PE)
  , [LE,Wo] = ke("circle");
let AE = 0;
const Xc = e=>Math.min(Math.max(+e, 0), 100);
function NE(e, t) {
    const n = e ? 1 : 0;
    return `M ${t / 2} ${t / 2} m 0, -500 a 500, 500 0 1, ${n} 0, 1000 a 500, 500 0 1, ${n} 0, -1000`
}
const xE = {
    text: String,
    size: ge,
    fill: _e("none"),
    rate: Ae(100),
    speed: Ae(0),
    color: [String, Object],
    clockwise: ve,
    layerColor: String,
    currentRate: Sd(0),
    strokeWidth: Ae(40),
    strokeLinecap: String,
    startPosition: _e("top")
};
var DE = Ee({
    name: LE,
    props: xE,
    emits: ["update:currentRate"],
    setup(e, {emit: t, slots: n}) {
        const r = `van-circle-${AE++}`
          , i = ne(()=>+e.strokeWidth + 1e3)
          , o = ne(()=>NE(e.clockwise, i.value))
          , a = ne(()=>{
            const h = {
                top: 0,
                right: 90,
                bottom: 180,
                left: 270
            }[e.startPosition];
            if (h)
                return {
                    transform: `rotate(${h}deg)`
                }
        }
        );
        he(()=>e.rate, f=>{
            let h;
            const p = Date.now()
              , v = e.currentRate
              , E = Xc(f)
              , y = Math.abs((v - E) * 1e3 / +e.speed)
              , g = ()=>{
                const _ = Date.now()
                  , S = Math.min((_ - p) / y, 1) * (E - v) + v;
                t("update:currentRate", Xc(parseFloat(S.toFixed(1)))),
                (E > v ? S < E : S > E) && (h = Nn(g))
            }
            ;
            e.speed ? (h && Fs(h),
            h = Nn(g)) : t("update:currentRate", E)
        }
        , {
            immediate: !0
        });
        const s = ()=>{
            const {strokeWidth: h, currentRate: p, strokeLinecap: v} = e
              , E = 3140 * p / 100
              , y = qn(e.color) ? `url(#${r})` : e.color
              , g = {
                stroke: y,
                strokeWidth: `${+h + 1}px`,
                strokeLinecap: v,
                strokeDasharray: `${E}px ${3140}px`
            };
            return k("path", {
                d: o.value,
                style: g,
                class: Wo("hover"),
                stroke: y
            }, null)
        }
          , l = ()=>{
            const f = {
                fill: e.fill,
                stroke: e.layerColor,
                strokeWidth: `${e.strokeWidth}px`
            };
            return k("path", {
                class: Wo("layer"),
                style: f,
                d: o.value
            }, null)
        }
          , u = ()=>{
            const {color: f} = e;
            if (!qn(f))
                return;
            const h = Object.keys(f).sort((p,v)=>parseFloat(p) - parseFloat(v)).map((p,v)=>k("stop", {
                key: v,
                offset: p,
                "stop-color": f[p]
            }, null));
            return k("defs", null, [k("linearGradient", {
                id: r,
                x1: "100%",
                y1: "0%",
                x2: "0%",
                y2: "0%"
            }, [h])])
        }
          , c = ()=>{
            if (n.default)
                return n.default();
            if (e.text)
                return k("div", {
                    class: Wo("text")
                }, [e.text])
        }
        ;
        return ()=>k("div", {
            class: Wo(),
            style: xr(e.size)
        }, [k("svg", {
            viewBox: `0 0 ${i.value} ${i.value}`,
            style: a.value
        }, [u(), l(), s()]), c()])
    }
});
const ME = Ne(DE)
  , FE = Ne(Oy)
  , [$E,At,jo] = ke("dialog")
  , BE = Me({}, js, {
    title: String,
    theme: String,
    width: ge,
    message: [String, Function],
    callback: Function,
    allowHtml: Boolean,
    className: st,
    transition: _e("van-dialog-bounce"),
    messageAlign: String,
    closeOnPopstate: ve,
    showCancelButton: Boolean,
    cancelButtonText: String,
    cancelButtonColor: String,
    cancelButtonDisabled: Boolean,
    confirmButtonText: String,
    confirmButtonColor: String,
    confirmButtonDisabled: Boolean,
    showConfirmButton: ve,
    closeOnClickOverlay: Boolean
})
  , UE = [...Wy, "transition", "closeOnPopstate"];
var ym = Ee({
    name: $E,
    props: BE,
    emits: ["confirm", "cancel", "keydown", "update:show"],
    setup(e, {emit: t, slots: n}) {
        const r = oe()
          , i = rt({
            confirm: !1,
            cancel: !1
        })
          , o = g=>t("update:show", g)
          , a = g=>{
            var _;
            o(!1),
            (_ = e.callback) == null || _.call(e, g)
        }
          , s = g=>()=>{
            !e.show || (t(g),
            e.beforeClose ? (i[g] = !0,
            Dr(e.beforeClose, {
                args: [g],
                done() {
                    a(g),
                    i[g] = !1
                },
                canceled() {
                    i[g] = !1
                }
            })) : a(g))
        }
          , l = s("cancel")
          , u = s("confirm")
          , c = $p(g=>{
            var _, C;
            if (g.target !== ((C = (_ = r.value) == null ? void 0 : _.popupRef) == null ? void 0 : C.value))
                return;
            ({
                Enter: e.showConfirmButton ? u : Ya,
                Escape: e.showCancelButton ? l : Ya
            })[g.key](),
            t("keydown", g)
        }
        , ["enter", "esc"])
          , f = ()=>{
            const g = n.title ? n.title() : e.title;
            if (g)
                return k("div", {
                    class: At("header", {
                        isolated: !e.message && !n.default
                    })
                }, [g])
        }
          , h = g=>{
            const {message: _, allowHtml: C, messageAlign: S} = e
              , A = At("message", {
                "has-title": g,
                [S]: S
            })
              , N = wr(_) ? _() : _;
            return C && typeof N == "string" ? k("div", {
                class: A,
                innerHTML: N
            }, null) : k("div", {
                class: A
            }, [N])
        }
          , p = ()=>{
            if (n.default)
                return k("div", {
                    class: At("content")
                }, [n.default()]);
            const {title: g, message: _, allowHtml: C} = e;
            if (_) {
                const S = !!(g || n.title);
                return k("div", {
                    key: C ? 1 : 0,
                    class: At("content", {
                        isolated: !S
                    })
                }, [h(S)])
            }
        }
          , v = ()=>k("div", {
            class: [iy, At("footer")]
        }, [e.showCancelButton && k(hi, {
            size: "large",
            text: e.cancelButtonText || jo("cancel"),
            class: At("cancel"),
            style: {
                color: e.cancelButtonColor
            },
            loading: i.cancel,
            disabled: e.cancelButtonDisabled,
            onClick: l
        }, null), e.showConfirmButton && k(hi, {
            size: "large",
            text: e.confirmButtonText || jo("confirm"),
            class: [At("confirm"), {
                [ay]: e.showCancelButton
            }],
            style: {
                color: e.confirmButtonColor
            },
            loading: i.confirm,
            disabled: e.confirmButtonDisabled,
            onClick: u
        }, null)])
          , E = ()=>k(py, {
            class: At("footer")
        }, {
            default: ()=>[e.showCancelButton && k(Mc, {
                type: "warning",
                text: e.cancelButtonText || jo("cancel"),
                class: At("cancel"),
                color: e.cancelButtonColor,
                loading: i.cancel,
                disabled: e.cancelButtonDisabled,
                onClick: l
            }, null), e.showConfirmButton && k(Mc, {
                type: "danger",
                text: e.confirmButtonText || jo("confirm"),
                class: At("confirm"),
                color: e.confirmButtonColor,
                loading: i.confirm,
                disabled: e.confirmButtonDisabled,
                onClick: u
            }, null)]
        })
          , y = ()=>n.footer ? n.footer() : e.theme === "round-button" ? E() : v();
        return ()=>{
            const {width: g, title: _, theme: C, message: S, className: A} = e;
            return k(ko, qe({
                ref: r,
                role: "dialog",
                class: [At([C]), A],
                style: {
                    width: We(g)
                },
                tabindex: 0,
                "aria-labelledby": _ || S,
                onKeydown: c,
                "onUpdate:show": o
            }, _t(e, UE)), {
                default: ()=>[f(), p(), y()]
            })
        }
    }
});
let Za;
const VE = {
    title: "",
    width: "",
    theme: null,
    message: "",
    overlay: !0,
    callback: null,
    teleport: "body",
    className: "",
    allowHtml: !1,
    lockScroll: !0,
    transition: void 0,
    beforeClose: null,
    overlayClass: "",
    overlayStyle: void 0,
    messageAlign: "",
    cancelButtonText: "",
    cancelButtonColor: null,
    cancelButtonDisabled: !1,
    confirmButtonText: "",
    confirmButtonColor: null,
    confirmButtonDisabled: !1,
    showConfirmButton: !0,
    showCancelButton: !1,
    closeOnPopstate: !0,
    closeOnClickOverlay: !1
};
let HE = Me({}, VE);
function WE() {
    ({instance: Za} = Ys({
        setup() {
            const {state: t, toggle: n} = Ks();
            return ()=>k(ym, qe(t, {
                "onUpdate:show": n
            }), null)
        }
    }))
}
function _m(e) {
    return qt ? new Promise((t,n)=>{
        Za || WE(),
        Za.open(Me({}, HE, e, {
            callback: r=>{
                (r === "confirm" ? t : n)(r)
            }
        }))
    }
    ) : Promise.resolve(void 0)
}
const jE = Ne(ym)
  , [zE,KE] = ke("divider")
  , YE = {
    dashed: Boolean,
    hairline: ve,
    vertical: Boolean,
    contentPosition: _e("center")
};
var qE = Ee({
    name: zE,
    props: YE,
    setup(e, {slots: t}) {
        return ()=>{
            var n;
            return k("div", {
                role: "separator",
                class: KE({
                    dashed: e.dashed,
                    hairline: e.hairline,
                    vertical: e.vertical,
                    [`content-${e.contentPosition}`]: !!t.default && !e.vertical
                })
            }, [!e.vertical && ((n = t.default) == null ? void 0 : n.call(t))])
        }
    }
});
const GE = Ne(qE)
  , Jc = e=>Math.sqrt((e[0].clientX - e[1].clientX) ** 2 + (e[0].clientY - e[1].clientY) ** 2)
  , XE = e=>({
    x: (e[0].clientX + e[1].clientX) / 2,
    y: (e[0].clientY + e[1].clientY) / 2
})
  , da = ke("image-preview")[1]
  , Zc = 2.6
  , JE = {
    src: String,
    show: Boolean,
    active: Number,
    minZoom: kt(ge),
    maxZoom: kt(ge),
    rootWidth: kt(Number),
    rootHeight: kt(Number),
    disableZoom: Boolean,
    doubleScale: Boolean,
    closeOnClickImage: Boolean,
    closeOnClickOverlay: Boolean,
    vertical: Boolean
};
var ZE = Ee({
    props: JE,
    emits: ["scale", "close", "longPress"],
    setup(e, {emit: t, slots: n}) {
        const r = rt({
            scale: 1,
            moveX: 0,
            moveY: 0,
            moving: !1,
            zooming: !1,
            initializing: !1,
            imageRatio: 0
        })
          , i = Oo()
          , o = oe()
          , a = oe()
          , s = oe(!1)
          , l = oe(!1);
        let u = 0;
        const c = ne(()=>{
            const {scale: K, moveX: ee, moveY: re, moving: fe, zooming: Oe, initializing: H} = r
              , F = {
                transitionDuration: Oe || fe || H ? "0s" : ".3s"
            };
            return (K !== 1 || l.value) && (F.transform = `matrix(${K}, 0, 0, ${K}, ${ee}, ${re})`),
            F
        }
        )
          , f = ne(()=>{
            if (r.imageRatio) {
                const {rootWidth: K, rootHeight: ee} = e
                  , re = s.value ? ee / r.imageRatio : K;
                return Math.max(0, (r.scale * re - K) / 2)
            }
            return 0
        }
        )
          , h = ne(()=>{
            if (r.imageRatio) {
                const {rootWidth: K, rootHeight: ee} = e
                  , re = s.value ? ee : K * r.imageRatio;
                return Math.max(0, (r.scale * re - ee) / 2)
            }
            return 0
        }
        )
          , p = (K,ee)=>{
            var re;
            if (K = ht(K, +e.minZoom, +e.maxZoom + 1),
            K !== r.scale) {
                const fe = K / r.scale;
                if (r.scale = K,
                ee) {
                    const Oe = It((re = o.value) == null ? void 0 : re.$el)
                      , H = {
                        x: Oe.width * .5,
                        y: Oe.height * .5
                    }
                      , F = r.moveX - (ee.x - Oe.left - H.x) * (fe - 1)
                      , q = r.moveY - (ee.y - Oe.top - H.y) * (fe - 1);
                    r.moveX = ht(F, -f.value, f.value),
                    r.moveY = ht(q, -h.value, h.value)
                } else
                    r.moveX = 0,
                    r.moveY = l.value ? u : 0;
                t("scale", {
                    scale: K,
                    index: e.active
                })
            }
        }
          , v = ()=>{
            p(1)
        }
          , E = ()=>{
            const K = r.scale > 1 ? 1 : 2;
            p(K, K === 2 || l.value ? {
                x: i.startX.value,
                y: i.startY.value
            } : void 0)
        }
        ;
        let y, g, _, C, S, A, N, x, O = !1;
        const M = K=>{
            const {touches: ee} = K;
            if (y = ee.length,
            y === 2 && e.disableZoom)
                return;
            const {offsetX: re} = i;
            i.start(K),
            g = r.moveX,
            _ = r.moveY,
            x = Date.now(),
            O = !1,
            r.moving = y === 1 && (r.scale !== 1 || l.value),
            r.zooming = y === 2 && !re.value,
            r.zooming && (C = r.scale,
            S = Jc(ee))
        }
          , B = K=>{
            const {touches: ee} = K;
            if (i.move(K),
            r.moving) {
                const {deltaX: re, deltaY: fe} = i
                  , Oe = re.value + g
                  , H = fe.value + _;
                if ((e.vertical ? i.isVertical() && Math.abs(H) > h.value : i.isHorizontal() && Math.abs(Oe) > f.value) && !O) {
                    r.moving = !1;
                    return
                }
                O = !0,
                lt(K, !0),
                r.moveX = ht(Oe, -f.value, f.value),
                r.moveY = ht(H, -h.value, h.value)
            }
            if (r.zooming && (lt(K, !0),
            ee.length === 2)) {
                const re = Jc(ee)
                  , fe = C * re / S;
                A = XE(ee),
                p(fe, A)
            }
        }
          , T = K=>{
            var ee;
            const re = (ee = a.value) == null ? void 0 : ee.$el;
            if (!re)
                return;
            const fe = re.firstElementChild
              , Oe = K.target === re
              , H = fe == null ? void 0 : fe.contains(K.target);
            !e.closeOnClickImage && H || !e.closeOnClickOverlay && Oe || t("close")
        }
          , I = K=>{
            if (y > 1)
                return;
            const ee = Date.now() - x
              , re = 250;
            i.isTap.value && (ee < re ? e.doubleScale ? N ? (clearTimeout(N),
            N = null,
            E()) : N = setTimeout(()=>{
                T(K),
                N = null
            }
            , re) : T(K) : ee > Dd && t("longPress"))
        }
          , U = K=>{
            let ee = !1;
            if ((r.moving || r.zooming) && (ee = !0,
            r.moving && g === r.moveX && _ === r.moveY && (ee = !1),
            !K.touches.length)) {
                r.zooming && (r.moveX = ht(r.moveX, -f.value, f.value),
                r.moveY = ht(r.moveY, -h.value, h.value),
                r.zooming = !1),
                r.moving = !1,
                g = 0,
                _ = 0,
                C = 1,
                r.scale < 1 && v();
                const re = +e.maxZoom;
                r.scale > re && p(re, A)
            }
            lt(K, ee),
            I(K),
            i.reset()
        }
          , ce = ()=>{
            const {rootWidth: K, rootHeight: ee} = e
              , re = ee / K
              , {imageRatio: fe} = r;
            s.value = r.imageRatio > re && fe < Zc,
            l.value = r.imageRatio > re && fe >= Zc,
            l.value && (u = (fe * K - ee) / 2,
            r.moveY = u,
            r.initializing = !0,
            Nn(()=>{
                r.initializing = !1
            }
            )),
            v()
        }
          , me = K=>{
            const {naturalWidth: ee, naturalHeight: re} = K.target;
            r.imageRatio = re / ee,
            ce()
        }
        ;
        return he(()=>e.active, v),
        he(()=>e.show, K=>{
            K || v()
        }
        ),
        he(()=>[e.rootWidth, e.rootHeight], ce),
        Bt("touchmove", B, {
            target: ne(()=>{
                var K;
                return (K = a.value) == null ? void 0 : K.$el
            }
            )
        }),
        bt({
            resetScale: v
        }),
        ()=>{
            const K = {
                loading: ()=>k(tr, {
                    type: "spinner"
                }, null)
            };
            return k(lm, {
                ref: a,
                class: da("swipe-item"),
                onTouchstartPassive: M,
                onTouchend: U,
                onTouchcancel: U
            }, {
                default: ()=>[n.image ? k("div", {
                    class: da("image-wrap")
                }, [n.image({
                    src: e.src,
                    onLoad: me,
                    style: c.value
                })]) : k(bm, {
                    ref: o,
                    src: e.src,
                    fit: "contain",
                    class: da("image", {
                        vertical: s.value
                    }),
                    style: c.value,
                    onLoad: me
                }, K)]
            })
        }
    }
});
const [QE,ar] = ke("image-preview")
  , ew = ["show", "teleport", "transition", "overlayStyle", "closeOnPopstate"]
  , tw = {
    show: Boolean,
    loop: ve,
    images: Gn(),
    minZoom: Ae(1 / 3),
    maxZoom: Ae(3),
    overlay: ve,
    vertical: Boolean,
    closeable: Boolean,
    showIndex: ve,
    className: st,
    closeIcon: _e("clear"),
    transition: String,
    beforeClose: Function,
    doubleScale: ve,
    overlayClass: st,
    overlayStyle: Object,
    swipeDuration: Ae(300),
    startPosition: Ae(0),
    showIndicators: Boolean,
    closeOnPopstate: ve,
    closeOnClickImage: ve,
    closeOnClickOverlay: ve,
    closeIconPosition: _e("top-right"),
    teleport: [String, Object]
};
var Em = Ee({
    name: QE,
    props: tw,
    emits: ["scale", "close", "closed", "change", "longPress", "update:show"],
    setup(e, {emit: t, slots: n}) {
        const r = oe()
          , i = oe()
          , o = rt({
            active: 0,
            rootWidth: 0,
            rootHeight: 0,
            disableZoom: !1
        })
          , a = ()=>{
            if (r.value) {
                const C = It(r.value.$el);
                o.rootWidth = C.width,
                o.rootHeight = C.height,
                r.value.resize()
            }
        }
          , s = C=>t("scale", C)
          , l = C=>t("update:show", C)
          , u = ()=>{
            Dr(e.beforeClose, {
                args: [o.active],
                done: ()=>l(!1)
            })
        }
          , c = C=>{
            C !== o.active && (o.active = C,
            t("change", C))
        }
          , f = ()=>{
            if (e.showIndex)
                return k("div", {
                    class: ar("index")
                }, [n.index ? n.index({
                    index: o.active
                }) : `${o.active + 1} / ${e.images.length}`])
        }
          , h = ()=>{
            if (n.cover)
                return k("div", {
                    class: ar("cover")
                }, [n.cover()])
        }
          , p = ()=>{
            o.disableZoom = !0
        }
          , v = ()=>{
            o.disableZoom = !1
        }
          , E = ()=>k(im, {
            ref: r,
            lazyRender: !0,
            loop: e.loop,
            class: ar("swipe"),
            vertical: e.vertical,
            duration: e.swipeDuration,
            initialSwipe: e.startPosition,
            showIndicators: e.showIndicators,
            indicatorColor: "white",
            onChange: c,
            onDragEnd: v,
            onDragStart: p
        }, {
            default: ()=>[e.images.map((C,S)=>k(ZE, {
                ref: A=>{
                    S === o.active && (i.value = A)
                }
                ,
                src: C,
                show: e.show,
                active: o.active,
                maxZoom: e.maxZoom,
                minZoom: e.minZoom,
                rootWidth: o.rootWidth,
                rootHeight: o.rootHeight,
                disableZoom: o.disableZoom,
                doubleScale: e.doubleScale,
                closeOnClickImage: e.closeOnClickImage,
                closeOnClickOverlay: e.closeOnClickOverlay,
                vertical: e.vertical,
                onScale: s,
                onClose: u,
                onLongPress: ()=>t("longPress", {
                    index: S
                })
            }, {
                image: n.image
            }))]
        })
          , y = ()=>{
            if (e.closeable)
                return k(at, {
                    role: "button",
                    name: e.closeIcon,
                    class: [ar("close-icon", e.closeIconPosition), Xn],
                    onClick: u
                }, null)
        }
          , g = ()=>t("closed")
          , _ = (C,S)=>{
            var A;
            return (A = r.value) == null ? void 0 : A.swipeTo(C, S)
        }
        ;
        return bt({
            resetScale: ()=>{
                var C;
                (C = i.value) == null || C.resetScale()
            }
            ,
            swipeTo: _
        }),
        gt(a),
        he([Nr, Co], a),
        he(()=>e.startPosition, C=>c(+C)),
        he(()=>e.show, C=>{
            const {images: S, startPosition: A} = e;
            C ? (c(+A),
            Be(()=>{
                a(),
                _(+A, {
                    immediate: !0
                })
            }
            )) : t("close", {
                index: o.active,
                url: S[o.active]
            })
        }
        ),
        ()=>k(ko, qe({
            class: [ar(), e.className],
            overlayClass: [ar("overlay"), e.overlayClass],
            onClosed: g,
            "onUpdate:show": l
        }, _t(e, ew)), {
            default: ()=>[y(), E(), f(), h()]
        })
    }
});
let ei;
const nw = {
    loop: !0,
    images: [],
    maxZoom: 3,
    minZoom: 1 / 3,
    onScale: void 0,
    onClose: void 0,
    onChange: void 0,
    vertical: !1,
    teleport: "body",
    className: "",
    showIndex: !0,
    closeable: !1,
    closeIcon: "clear",
    transition: void 0,
    beforeClose: void 0,
    doubleScale: !0,
    overlayStyle: void 0,
    overlayClass: void 0,
    startPosition: 0,
    swipeDuration: 300,
    showIndicators: !1,
    closeOnPopstate: !0,
    closeOnClickOverlay: !0,
    closeIconPosition: "top-right"
};
function rw() {
    ({instance: ei} = Ys({
        setup() {
            const {state: e, toggle: t} = Ks()
              , n = ()=>{
                e.images = []
            }
            ;
            return ()=>k(Em, qe(e, {
                onClosed: n,
                "onUpdate:show": t
            }), null)
        }
    }))
}
const ow = (e,t=0)=>{
    if (!!qt)
        return ei || rw(),
        e = Array.isArray(e) ? {
            images: e,
            startPosition: t
        } : e,
        ei.open(Me({}, nw, e)),
        ei
}
;
Ne(Em);
function Ut(e) {
    if (e == null)
        return window;
    if (e.toString() !== "[object Window]") {
        var t = e.ownerDocument;
        return t && t.defaultView || window
    }
    return e
}
function Gs(e) {
    var t = Ut(e).Element;
    return e instanceof t || e instanceof Element
}
function Ft(e) {
    var t = Ut(e).HTMLElement;
    return e instanceof t || e instanceof HTMLElement
}
function wm(e) {
    if (typeof ShadowRoot == "undefined")
        return !1;
    var t = Ut(e).ShadowRoot;
    return e instanceof t || e instanceof ShadowRoot
}
var Sr = Math.round;
function Qa() {
    var e = navigator.userAgentData;
    return e != null && e.brands ? e.brands.map(function(t) {
        return t.brand + "/" + t.version
    }).join(" ") : navigator.userAgent
}
function iw() {
    return !/^((?!chrome|android).)*safari/i.test(Qa())
}
function pi(e, t, n) {
    t === void 0 && (t = !1),
    n === void 0 && (n = !1);
    var r = e.getBoundingClientRect()
      , i = 1
      , o = 1;
    t && Ft(e) && (i = e.offsetWidth > 0 && Sr(r.width) / e.offsetWidth || 1,
    o = e.offsetHeight > 0 && Sr(r.height) / e.offsetHeight || 1);
    var a = Gs(e) ? Ut(e) : window
      , s = a.visualViewport
      , l = !iw() && n
      , u = (r.left + (l && s ? s.offsetLeft : 0)) / i
      , c = (r.top + (l && s ? s.offsetTop : 0)) / o
      , f = r.width / i
      , h = r.height / o;
    return {
        width: f,
        height: h,
        top: c,
        right: u + f,
        bottom: c + h,
        left: u,
        x: u,
        y: c
    }
}
function Sm(e) {
    var t = Ut(e)
      , n = t.pageXOffset
      , r = t.pageYOffset;
    return {
        scrollLeft: n,
        scrollTop: r
    }
}
function aw(e) {
    return {
        scrollLeft: e.scrollLeft,
        scrollTop: e.scrollTop
    }
}
function sw(e) {
    return e === Ut(e) || !Ft(e) ? Sm(e) : aw(e)
}
function ln(e) {
    return e ? (e.nodeName || "").toLowerCase() : null
}
function Hi(e) {
    return ((Gs(e) ? e.ownerDocument : e.document) || window.document).documentElement
}
function lw(e) {
    return pi(Hi(e)).left + Sm(e).scrollLeft
}
function cn(e) {
    return Ut(e).getComputedStyle(e)
}
function Xs(e) {
    var t = cn(e)
      , n = t.overflow
      , r = t.overflowX
      , i = t.overflowY;
    return /auto|scroll|overlay|hidden/.test(n + i + r)
}
function cw(e) {
    var t = e.getBoundingClientRect()
      , n = Sr(t.width) / e.offsetWidth || 1
      , r = Sr(t.height) / e.offsetHeight || 1;
    return n !== 1 || r !== 1
}
function uw(e, t, n) {
    n === void 0 && (n = !1);
    var r = Ft(t)
      , i = Ft(t) && cw(t)
      , o = Hi(t)
      , a = pi(e, i, n)
      , s = {
        scrollLeft: 0,
        scrollTop: 0
    }
      , l = {
        x: 0,
        y: 0
    };
    return (r || !r && !n) && ((ln(t) !== "body" || Xs(o)) && (s = sw(t)),
    Ft(t) ? (l = pi(t, !0),
    l.x += t.clientLeft,
    l.y += t.clientTop) : o && (l.x = lw(o))),
    {
        x: a.left + s.scrollLeft - l.x,
        y: a.top + s.scrollTop - l.y,
        width: a.width,
        height: a.height
    }
}
function fw(e) {
    var t = pi(e)
      , n = e.offsetWidth
      , r = e.offsetHeight;
    return Math.abs(t.width - n) <= 1 && (n = t.width),
    Math.abs(t.height - r) <= 1 && (r = t.height),
    {
        x: e.offsetLeft,
        y: e.offsetTop,
        width: n,
        height: r
    }
}
function Js(e) {
    return ln(e) === "html" ? e : e.assignedSlot || e.parentNode || (wm(e) ? e.host : null) || Hi(e)
}
function Tm(e) {
    return ["html", "body", "#document"].indexOf(ln(e)) >= 0 ? e.ownerDocument.body : Ft(e) && Xs(e) ? e : Tm(Js(e))
}
function ti(e, t) {
    var n;
    t === void 0 && (t = []);
    var r = Tm(e)
      , i = r === ((n = e.ownerDocument) == null ? void 0 : n.body)
      , o = Ut(r)
      , a = i ? [o].concat(o.visualViewport || [], Xs(r) ? r : []) : r
      , s = t.concat(a);
    return i ? s : s.concat(ti(Js(a)))
}
function dw(e) {
    return ["table", "td", "th"].indexOf(ln(e)) >= 0
}
function Qc(e) {
    return !Ft(e) || cn(e).position === "fixed" ? null : e.offsetParent
}
function mw(e) {
    var t = /firefox/i.test(Qa())
      , n = /Trident/i.test(Qa());
    if (n && Ft(e)) {
        var r = cn(e);
        if (r.position === "fixed")
            return null
    }
    var i = Js(e);
    for (wm(i) && (i = i.host); Ft(i) && ["html", "body"].indexOf(ln(i)) < 0; ) {
        var o = cn(i);
        if (o.transform !== "none" || o.perspective !== "none" || o.contain === "paint" || ["transform", "perspective"].indexOf(o.willChange) !== -1 || t && o.willChange === "filter" || t && o.filter && o.filter !== "none")
            return i;
        i = i.parentNode
    }
    return null
}
function Cm(e) {
    for (var t = Ut(e), n = Qc(e); n && dw(n) && cn(n).position === "static"; )
        n = Qc(n);
    return n && (ln(n) === "html" || ln(n) === "body" && cn(n).position === "static") ? t : n || mw(e) || t
}
var vr = "top"
  , vi = "bottom"
  , yo = "right"
  , Yn = "left"
  , Om = "auto"
  , hw = [vr, vi, yo, Yn]
  , km = "start"
  , bi = "end"
  , gw = [].concat(hw, [Om]).reduce(function(e, t) {
    return e.concat([t, t + "-" + km, t + "-" + bi])
}, [])
  , pw = "beforeRead"
  , vw = "read"
  , bw = "afterRead"
  , yw = "beforeMain"
  , _w = "main"
  , Ew = "afterMain"
  , ww = "beforeWrite"
  , Sw = "write"
  , Tw = "afterWrite"
  , es = [pw, vw, bw, yw, _w, Ew, ww, Sw, Tw];
function Cw(e) {
    var t = new Map
      , n = new Set
      , r = [];
    e.forEach(function(o) {
        t.set(o.name, o)
    });
    function i(o) {
        n.add(o.name);
        var a = [].concat(o.requires || [], o.requiresIfExists || []);
        a.forEach(function(s) {
            if (!n.has(s)) {
                var l = t.get(s);
                l && i(l)
            }
        }),
        r.push(o)
    }
    return e.forEach(function(o) {
        n.has(o.name) || i(o)
    }),
    r
}
function Ow(e) {
    var t = Cw(e);
    return es.reduce(function(n, r) {
        return n.concat(t.filter(function(i) {
            return i.phase === r
        }))
    }, [])
}
function kw(e) {
    var t;
    return function() {
        return t || (t = new Promise(function(n) {
            Promise.resolve().then(function() {
                t = void 0,
                n(e())
            })
        }
        )),
        t
    }
}
function bn(e) {
    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
        n[r - 1] = arguments[r];
    return [].concat(n).reduce(function(i, o) {
        return i.replace(/%s/, o)
    }, e)
}
var $n = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s'
  , Iw = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available'
  , eu = ["name", "enabled", "phase", "fn", "effect", "requires", "options"];
function Pw(e) {
    e.forEach(function(t) {
        [].concat(Object.keys(t), eu).filter(function(n, r, i) {
            return i.indexOf(n) === r
        }).forEach(function(n) {
            switch (n) {
            case "name":
                typeof t.name != "string" && console.error(bn($n, String(t.name), '"name"', '"string"', '"' + String(t.name) + '"'));
                break;
            case "enabled":
                typeof t.enabled != "boolean" && console.error(bn($n, t.name, '"enabled"', '"boolean"', '"' + String(t.enabled) + '"'));
                break;
            case "phase":
                es.indexOf(t.phase) < 0 && console.error(bn($n, t.name, '"phase"', "either " + es.join(", "), '"' + String(t.phase) + '"'));
                break;
            case "fn":
                typeof t.fn != "function" && console.error(bn($n, t.name, '"fn"', '"function"', '"' + String(t.fn) + '"'));
                break;
            case "effect":
                t.effect != null && typeof t.effect != "function" && console.error(bn($n, t.name, '"effect"', '"function"', '"' + String(t.fn) + '"'));
                break;
            case "requires":
                t.requires != null && !Array.isArray(t.requires) && console.error(bn($n, t.name, '"requires"', '"array"', '"' + String(t.requires) + '"'));
                break;
            case "requiresIfExists":
                Array.isArray(t.requiresIfExists) || console.error(bn($n, t.name, '"requiresIfExists"', '"array"', '"' + String(t.requiresIfExists) + '"'));
                break;
            case "options":
            case "data":
                break;
            default:
                console.error('PopperJS: an invalid property has been provided to the "' + t.name + '" modifier, valid properties are ' + eu.map(function(r) {
                    return '"' + r + '"'
                }).join(", ") + '; but "' + n + '" was provided.')
            }
            t.requires && t.requires.forEach(function(r) {
                e.find(function(i) {
                    return i.name === r
                }) == null && console.error(bn(Iw, String(t.name), r, r))
            })
        })
    })
}
function Rw(e, t) {
    var n = new Set;
    return e.filter(function(r) {
        var i = t(r);
        if (!n.has(i))
            return n.add(i),
            !0
    })
}
function Wi(e) {
    return e.split("-")[0]
}
function Lw(e) {
    var t = e.reduce(function(n, r) {
        var i = n[r.name];
        return n[r.name] = i ? Object.assign({}, i, r, {
            options: Object.assign({}, i.options, r.options),
            data: Object.assign({}, i.data, r.data)
        }) : r,
        n
    }, {});
    return Object.keys(t).map(function(n) {
        return t[n]
    })
}
function Im(e) {
    return e.split("-")[1]
}
function Aw(e) {
    return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y"
}
function Nw(e) {
    var t = e.reference, n = e.element, r = e.placement, i = r ? Wi(r) : null, o = r ? Im(r) : null, a = t.x + t.width / 2 - n.width / 2, s = t.y + t.height / 2 - n.height / 2, l;
    switch (i) {
    case vr:
        l = {
            x: a,
            y: t.y - n.height
        };
        break;
    case vi:
        l = {
            x: a,
            y: t.y + t.height
        };
        break;
    case yo:
        l = {
            x: t.x + t.width,
            y: s
        };
        break;
    case Yn:
        l = {
            x: t.x - n.width,
            y: s
        };
        break;
    default:
        l = {
            x: t.x,
            y: t.y
        }
    }
    var u = i ? Aw(i) : null;
    if (u != null) {
        var c = u === "y" ? "height" : "width";
        switch (o) {
        case km:
            l[u] = l[u] - (t[c] / 2 - n[c] / 2);
            break;
        case bi:
            l[u] = l[u] + (t[c] / 2 - n[c] / 2);
            break
        }
    }
    return l
}
var tu = "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element."
  , xw = "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash."
  , nu = {
    placement: "bottom",
    modifiers: [],
    strategy: "absolute"
};
function ru() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
        t[n] = arguments[n];
    return !t.some(function(r) {
        return !(r && typeof r.getBoundingClientRect == "function")
    })
}
function Dw(e) {
    e === void 0 && (e = {});
    var t = e
      , n = t.defaultModifiers
      , r = n === void 0 ? [] : n
      , i = t.defaultOptions
      , o = i === void 0 ? nu : i;
    return function(s, l, u) {
        u === void 0 && (u = o);
        var c = {
            placement: "bottom",
            orderedModifiers: [],
            options: Object.assign({}, nu, o),
            modifiersData: {},
            elements: {
                reference: s,
                popper: l
            },
            attributes: {},
            styles: {}
        }
          , f = []
          , h = !1
          , p = {
            state: c,
            setOptions: function(g) {
                var _ = typeof g == "function" ? g(c.options) : g;
                E(),
                c.options = Object.assign({}, o, c.options, _),
                c.scrollParents = {
                    reference: Gs(s) ? ti(s) : s.contextElement ? ti(s.contextElement) : [],
                    popper: ti(l)
                };
                var C = Ow(Lw([].concat(r, c.options.modifiers)));
                c.orderedModifiers = C.filter(function(T) {
                    return T.enabled
                });
                {
                    var S = Rw([].concat(C, c.options.modifiers), function(T) {
                        var I = T.name;
                        return I
                    });
                    if (Pw(S),
                    Wi(c.options.placement) === Om) {
                        var A = c.orderedModifiers.find(function(T) {
                            var I = T.name;
                            return I === "flip"
                        });
                        A || console.error(['Popper: "auto" placements require the "flip" modifier be', "present and enabled to work."].join(" "))
                    }
                    var N = cn(l)
                      , x = N.marginTop
                      , O = N.marginRight
                      , M = N.marginBottom
                      , B = N.marginLeft;
                    [x, O, M, B].some(function(T) {
                        return parseFloat(T)
                    }) && console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', "between the popper and its reference element or boundary.", "To replicate margin, use the `offset` modifier, as well as", "the `padding` option in the `preventOverflow` and `flip`", "modifiers."].join(" "))
                }
                return v(),
                p.update()
            },
            forceUpdate: function() {
                if (!h) {
                    var g = c.elements
                      , _ = g.reference
                      , C = g.popper;
                    if (!ru(_, C)) {
                        console.error(tu);
                        return
                    }
                    c.rects = {
                        reference: uw(_, Cm(C), c.options.strategy === "fixed"),
                        popper: fw(C)
                    },
                    c.reset = !1,
                    c.placement = c.options.placement,
                    c.orderedModifiers.forEach(function(T) {
                        return c.modifiersData[T.name] = Object.assign({}, T.data)
                    });
                    for (var S = 0, A = 0; A < c.orderedModifiers.length; A++) {
                        if (S += 1,
                        S > 100) {
                            console.error(xw);
                            break
                        }
                        if (c.reset === !0) {
                            c.reset = !1,
                            A = -1;
                            continue
                        }
                        var N = c.orderedModifiers[A]
                          , x = N.fn
                          , O = N.options
                          , M = O === void 0 ? {} : O
                          , B = N.name;
                        typeof x == "function" && (c = x({
                            state: c,
                            options: M,
                            name: B,
                            instance: p
                        }) || c)
                    }
                }
            },
            update: kw(function() {
                return new Promise(function(y) {
                    p.forceUpdate(),
                    y(c)
                }
                )
            }),
            destroy: function() {
                E(),
                h = !0
            }
        };
        if (!ru(s, l))
            return console.error(tu),
            p;
        p.setOptions(u).then(function(y) {
            !h && u.onFirstUpdate && u.onFirstUpdate(y)
        });
        function v() {
            c.orderedModifiers.forEach(function(y) {
                var g = y.name
                  , _ = y.options
                  , C = _ === void 0 ? {} : _
                  , S = y.effect;
                if (typeof S == "function") {
                    var A = S({
                        state: c,
                        name: g,
                        instance: p,
                        options: C
                    })
                      , N = function() {};
                    f.push(A || N)
                }
            })
        }
        function E() {
            f.forEach(function(y) {
                return y()
            }),
            f = []
        }
        return p
    }
}
var zo = {
    passive: !0
};
function Mw(e) {
    var t = e.state
      , n = e.instance
      , r = e.options
      , i = r.scroll
      , o = i === void 0 ? !0 : i
      , a = r.resize
      , s = a === void 0 ? !0 : a
      , l = Ut(t.elements.popper)
      , u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
    return o && u.forEach(function(c) {
        c.addEventListener("scroll", n.update, zo)
    }),
    s && l.addEventListener("resize", n.update, zo),
    function() {
        o && u.forEach(function(c) {
            c.removeEventListener("scroll", n.update, zo)
        }),
        s && l.removeEventListener("resize", n.update, zo)
    }
}
var Fw = {
    name: "eventListeners",
    enabled: !0,
    phase: "write",
    fn: function() {},
    effect: Mw,
    data: {}
};
function $w(e) {
    var t = e.state
      , n = e.name;
    t.modifiersData[n] = Nw({
        reference: t.rects.reference,
        element: t.rects.popper,
        strategy: "absolute",
        placement: t.placement
    })
}
var Bw = {
    name: "popperOffsets",
    enabled: !0,
    phase: "read",
    fn: $w,
    data: {}
}
  , Uw = {
    top: "auto",
    right: "auto",
    bottom: "auto",
    left: "auto"
};
function Vw(e) {
    var t = e.x
      , n = e.y
      , r = window
      , i = r.devicePixelRatio || 1;
    return {
        x: Sr(t * i) / i || 0,
        y: Sr(n * i) / i || 0
    }
}
function ou(e) {
    var t, n = e.popper, r = e.popperRect, i = e.placement, o = e.variation, a = e.offsets, s = e.position, l = e.gpuAcceleration, u = e.adaptive, c = e.roundOffsets, f = e.isFixed, h = a.x, p = h === void 0 ? 0 : h, v = a.y, E = v === void 0 ? 0 : v, y = typeof c == "function" ? c({
        x: p,
        y: E
    }) : {
        x: p,
        y: E
    };
    p = y.x,
    E = y.y;
    var g = a.hasOwnProperty("x")
      , _ = a.hasOwnProperty("y")
      , C = Yn
      , S = vr
      , A = window;
    if (u) {
        var N = Cm(n)
          , x = "clientHeight"
          , O = "clientWidth";
        if (N === Ut(n) && (N = Hi(n),
        cn(N).position !== "static" && s === "absolute" && (x = "scrollHeight",
        O = "scrollWidth")),
        N = N,
        i === vr || (i === Yn || i === yo) && o === bi) {
            S = vi;
            var M = f && N === A && A.visualViewport ? A.visualViewport.height : N[x];
            E -= M - r.height,
            E *= l ? 1 : -1
        }
        if (i === Yn || (i === vr || i === vi) && o === bi) {
            C = yo;
            var B = f && N === A && A.visualViewport ? A.visualViewport.width : N[O];
            p -= B - r.width,
            p *= l ? 1 : -1
        }
    }
    var T = Object.assign({
        position: s
    }, u && Uw)
      , I = c === !0 ? Vw({
        x: p,
        y: E
    }) : {
        x: p,
        y: E
    };
    if (p = I.x,
    E = I.y,
    l) {
        var U;
        return Object.assign({}, T, (U = {},
        U[S] = _ ? "0" : "",
        U[C] = g ? "0" : "",
        U.transform = (A.devicePixelRatio || 1) <= 1 ? "translate(" + p + "px, " + E + "px)" : "translate3d(" + p + "px, " + E + "px, 0)",
        U))
    }
    return Object.assign({}, T, (t = {},
    t[S] = _ ? E + "px" : "",
    t[C] = g ? p + "px" : "",
    t.transform = "",
    t))
}
function Hw(e) {
    var t = e.state
      , n = e.options
      , r = n.gpuAcceleration
      , i = r === void 0 ? !0 : r
      , o = n.adaptive
      , a = o === void 0 ? !0 : o
      , s = n.roundOffsets
      , l = s === void 0 ? !0 : s;
    {
        var u = cn(t.elements.popper).transitionProperty || "";
        a && ["transform", "top", "right", "bottom", "left"].some(function(f) {
            return u.indexOf(f) >= 0
        }) && console.warn(["Popper: Detected CSS transitions on at least one of the following", 'CSS properties: "transform", "top", "right", "bottom", "left".', `

`, 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', "for smooth transitions, or remove these properties from the CSS", "transition declaration on the popper element if only transitioning", "opacity or background-color for example.", `

`, "We recommend using the popper element as a wrapper around an inner", "element that can have any CSS property transitioned for animations."].join(" "))
    }
    var c = {
        placement: Wi(t.placement),
        variation: Im(t.placement),
        popper: t.elements.popper,
        popperRect: t.rects.popper,
        gpuAcceleration: i,
        isFixed: t.options.strategy === "fixed"
    };
    t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, ou(Object.assign({}, c, {
        offsets: t.modifiersData.popperOffsets,
        position: t.options.strategy,
        adaptive: a,
        roundOffsets: l
    })))),
    t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, ou(Object.assign({}, c, {
        offsets: t.modifiersData.arrow,
        position: "absolute",
        adaptive: !1,
        roundOffsets: l
    })))),
    t.attributes.popper = Object.assign({}, t.attributes.popper, {
        "data-popper-placement": t.placement
    })
}
var Ww = {
    name: "computeStyles",
    enabled: !0,
    phase: "beforeWrite",
    fn: Hw,
    data: {}
};
function jw(e) {
    var t = e.state;
    Object.keys(t.elements).forEach(function(n) {
        var r = t.styles[n] || {}
          , i = t.attributes[n] || {}
          , o = t.elements[n];
        !Ft(o) || !ln(o) || (Object.assign(o.style, r),
        Object.keys(i).forEach(function(a) {
            var s = i[a];
            s === !1 ? o.removeAttribute(a) : o.setAttribute(a, s === !0 ? "" : s)
        }))
    })
}
function zw(e) {
    var t = e.state
      , n = {
        popper: {
            position: t.options.strategy,
            left: "0",
            top: "0",
            margin: "0"
        },
        arrow: {
            position: "absolute"
        },
        reference: {}
    };
    return Object.assign(t.elements.popper.style, n.popper),
    t.styles = n,
    t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
    function() {
        Object.keys(t.elements).forEach(function(r) {
            var i = t.elements[r]
              , o = t.attributes[r] || {}
              , a = Object.keys(t.styles.hasOwnProperty(r) ? t.styles[r] : n[r])
              , s = a.reduce(function(l, u) {
                return l[u] = "",
                l
            }, {});
            !Ft(i) || !ln(i) || (Object.assign(i.style, s),
            Object.keys(o).forEach(function(l) {
                i.removeAttribute(l)
            }))
        })
    }
}
var Kw = {
    name: "applyStyles",
    enabled: !0,
    phase: "write",
    fn: jw,
    effect: zw,
    requires: ["computeStyles"]
}
  , Yw = [Fw, Bw, Ww, Kw]
  , qw = Dw({
    defaultModifiers: Yw
});
function Gw(e, t, n) {
    var r = Wi(e)
      , i = [Yn, vr].indexOf(r) >= 0 ? -1 : 1
      , o = typeof n == "function" ? n(Object.assign({}, t, {
        placement: e
    })) : n
      , a = o[0]
      , s = o[1];
    return a = a || 0,
    s = (s || 0) * i,
    [Yn, yo].indexOf(r) >= 0 ? {
        x: s,
        y: a
    } : {
        x: a,
        y: s
    }
}
function Xw(e) {
    var t = e.state
      , n = e.options
      , r = e.name
      , i = n.offset
      , o = i === void 0 ? [0, 0] : i
      , a = gw.reduce(function(c, f) {
        return c[f] = Gw(f, t.rects, o),
        c
    }, {})
      , s = a[t.placement]
      , l = s.x
      , u = s.y;
    t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += l,
    t.modifiersData.popperOffsets.y += u),
    t.modifiersData[r] = a
}
var Jw = {
    name: "offset",
    enabled: !0,
    phase: "main",
    requires: ["popperOffsets"],
    fn: Xw
};
const [Zw,Bn] = ke("popover")
  , Qw = ["overlay", "duration", "teleport", "overlayStyle", "overlayClass", "closeOnClickOverlay"]
  , eS = {
    show: Boolean,
    theme: _e("light"),
    overlay: Boolean,
    actions: Gn(),
    actionsDirection: _e("vertical"),
    trigger: _e("click"),
    duration: ge,
    showArrow: ve,
    placement: _e("bottom"),
    iconPrefix: String,
    overlayClass: st,
    overlayStyle: Object,
    closeOnClickAction: ve,
    closeOnClickOverlay: ve,
    closeOnClickOutside: ve,
    offset: {
        type: Array,
        default: ()=>[0, 8]
    },
    teleport: {
        type: [String, Object],
        default: "body"
    }
};
var tS = Ee({
    name: Zw,
    props: eS,
    emits: ["select", "touchstart", "update:show"],
    setup(e, {emit: t, slots: n, attrs: r}) {
        let i;
        const o = oe()
          , a = oe()
          , s = oe()
          , l = Jd(()=>e.show, _=>t("update:show", _))
          , u = ()=>({
            placement: e.placement,
            modifiers: [{
                name: "computeStyles",
                options: {
                    adaptive: !1,
                    gpuAcceleration: !1
                }
            }, Me({}, Jw, {
                options: {
                    offset: e.offset
                }
            })]
        })
          , c = ()=>a.value && s.value ? qw(a.value, s.value.popupRef.value, u()) : null
          , f = ()=>{
            Be(()=>{
                !l.value || (i ? i.setOptions(u()) : (i = c(),
                qt && (window.addEventListener("animationend", f),
                window.addEventListener("transitionend", f))))
            }
            )
        }
          , h = _=>{
            l.value = _
        }
          , p = ()=>{
            e.trigger === "click" && (l.value = !l.value)
        }
          , v = (_,C)=>{
            _.disabled || (t("select", _, C),
            e.closeOnClickAction && (l.value = !1))
        }
          , E = ()=>{
            l.value && e.closeOnClickOutside && (!e.overlay || e.closeOnClickOverlay) && (l.value = !1)
        }
          , y = (_,C)=>n.action ? n.action({
            action: _,
            index: C
        }) : [_.icon && k(at, {
            name: _.icon,
            classPrefix: e.iconPrefix,
            class: Bn("action-icon")
        }, null), k("div", {
            class: [Bn("action-text"), {
                [ly]: e.actionsDirection === "vertical"
            }]
        }, [_.text])]
          , g = (_,C)=>{
            const {icon: S, color: A, disabled: N, className: x} = _;
            return k("div", {
                role: "menuitem",
                class: [Bn("action", {
                    disabled: N,
                    "with-icon": S
                }), {
                    [sy]: e.actionsDirection === "horizontal"
                }, x],
                style: {
                    color: A
                },
                tabindex: N ? void 0 : 0,
                "aria-disabled": N || void 0,
                onClick: ()=>v(_, C)
            }, [y(_, C)])
        }
        ;
        return gt(()=>{
            f(),
            Pi(()=>{
                var _;
                o.value = (_ = s.value) == null ? void 0 : _.popupRef.value
            }
            )
        }
        ),
        fn(()=>{
            i && (qt && (window.removeEventListener("animationend", f),
            window.removeEventListener("transitionend", f)),
            i.destroy(),
            i = null)
        }
        ),
        he(()=>[l.value, e.offset, e.placement], f),
        Ub([a, o], E, {
            eventName: "touchstart"
        }),
        ()=>{
            var _;
            return k(ot, null, [k("span", {
                ref: a,
                class: Bn("wrapper"),
                onClick: p
            }, [(_ = n.reference) == null ? void 0 : _.call(n)]), k(ko, qe({
                ref: s,
                show: l.value,
                class: Bn([e.theme]),
                position: "",
                transition: "van-popover-zoom",
                lockScroll: !1,
                "onUpdate:show": h
            }, r, gi(), _t(e, Qw)), {
                default: ()=>[e.showArrow && k("div", {
                    class: Bn("arrow")
                }, null), k("div", {
                    role: "menu",
                    class: Bn("content", e.actionsDirection)
                }, [n.default ? n.default() : e.actions.map(g)])]
            })])
        }
    }
});
const nS = Ne(tS)
  , [rS,ma] = ke("progress")
  , oS = {
    color: String,
    inactive: Boolean,
    pivotText: String,
    textColor: String,
    showPivot: ve,
    pivotColor: String,
    trackColor: String,
    strokeWidth: ge,
    percentage: {
        type: ge,
        default: 0,
        validator: e=>+e >= 0 && +e <= 100
    }
};
var iS = Ee({
    name: rS,
    props: oS,
    setup(e) {
        const t = ne(()=>e.inactive ? void 0 : e.color)
          , n = ()=>{
            const {textColor: r, pivotText: i, pivotColor: o, percentage: a} = e
              , s = i != null ? i : `${a}%`;
            if (e.showPivot && s) {
                const l = {
                    color: r,
                    left: `${+a}%`,
                    transform: `translate(-${+a}%,-50%)`,
                    background: o || t.value
                };
                return k("span", {
                    style: l,
                    class: ma("pivot", {
                        inactive: e.inactive
                    })
                }, [s])
            }
        }
        ;
        return ()=>{
            const {trackColor: r, percentage: i, strokeWidth: o} = e
              , a = {
                background: r,
                height: We(o)
            }
              , s = {
                width: `${i}%`,
                background: t.value
            };
            return k("div", {
                class: ma(),
                style: a
            }, [k("span", {
                class: ma("portion", {
                    inactive: e.inactive
                }),
                style: s
            }, null), n()])
        }
    }
});
const aS = Ne(iS)
  , [sS,jr] = ke("slider")
  , lS = {
    min: Ae(0),
    max: Ae(100),
    step: Ae(1),
    range: Boolean,
    reverse: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    vertical: Boolean,
    barHeight: ge,
    buttonSize: ge,
    activeColor: String,
    inactiveColor: String,
    modelValue: {
        type: [Number, Array],
        default: 0
    }
};
var cS = Ee({
    name: sS,
    props: lS,
    emits: ["change", "dragEnd", "dragStart", "update:modelValue"],
    setup(e, {emit: t, slots: n}) {
        let r, i, o;
        const a = oe()
          , s = [oe(), oe()]
          , l = oe()
          , u = Oo()
          , c = ne(()=>Number(e.max) - Number(e.min))
          , f = ne(()=>{
            const T = e.vertical ? "width" : "height";
            return {
                background: e.inactiveColor,
                [T]: We(e.barHeight)
            }
        }
        )
          , h = T=>e.range && Array.isArray(T)
          , p = ()=>{
            const {modelValue: T, min: I} = e;
            return h(T) ? `${(T[1] - T[0]) * 100 / c.value}%` : `${(T - Number(I)) * 100 / c.value}%`
        }
          , v = ()=>{
            const {modelValue: T, min: I} = e;
            return h(T) ? `${(T[0] - Number(I)) * 100 / c.value}%` : "0%"
        }
          , E = ne(()=>{
            const I = {
                [e.vertical ? "height" : "width"]: p(),
                background: e.activeColor
            };
            l.value && (I.transition = "none");
            const U = ()=>e.vertical ? e.reverse ? "bottom" : "top" : e.reverse ? "right" : "left";
            return I[U()] = v(),
            I
        }
        )
          , y = T=>{
            const I = +e.min
              , U = +e.max
              , ce = +e.step;
            T = ht(T, I, U);
            const me = Math.round((T - I) / ce) * ce;
            return Ad(I, me)
        }
          , g = ()=>{
            const T = e.modelValue;
            h(T) ? o = T.map(y) : o = y(T)
        }
          , _ = T=>{
            var I, U;
            const ce = (I = T[0]) != null ? I : Number(e.min)
              , me = (U = T[1]) != null ? U : Number(e.max);
            return ce > me ? [me, ce] : [ce, me]
        }
          , C = (T,I)=>{
            h(T) ? T = _(T).map(y) : T = y(T),
            to(T, e.modelValue) || t("update:modelValue", T),
            I && !to(T, o) && t("change", T)
        }
          , S = T=>{
            if (T.stopPropagation(),
            e.disabled || e.readonly)
                return;
            g();
            const {min: I, reverse: U, vertical: ce, modelValue: me} = e
              , K = It(a)
              , ee = ()=>ce ? U ? K.bottom - T.clientY : T.clientY - K.top : U ? K.right - T.clientX : T.clientX - K.left
              , re = ce ? K.height : K.width
              , fe = Number(I) + ee() / re * c.value;
            if (h(me)) {
                const [Oe,H] = me
                  , F = (Oe + H) / 2;
                fe <= F ? C([fe, H], !0) : C([Oe, fe], !0)
            } else
                C(fe, !0)
        }
          , A = T=>{
            e.disabled || e.readonly || (u.start(T),
            i = e.modelValue,
            g(),
            l.value = "start")
        }
          , N = T=>{
            if (e.disabled || e.readonly)
                return;
            l.value === "start" && t("dragStart", T),
            lt(T, !0),
            u.move(T),
            l.value = "dragging";
            const I = It(a)
              , U = e.vertical ? u.deltaY.value : u.deltaX.value
              , ce = e.vertical ? I.height : I.width;
            let me = U / ce * c.value;
            if (e.reverse && (me = -me),
            h(o)) {
                const K = e.reverse ? 1 - r : r;
                i[K] = o[K] + me
            } else
                i = o + me;
            C(i)
        }
          , x = T=>{
            e.disabled || e.readonly || (l.value === "dragging" && (C(i, !0),
            t("dragEnd", T)),
            l.value = "")
        }
          , O = T=>typeof T == "number" ? jr("button-wrapper", ["left", "right"][T]) : jr("button-wrapper", e.reverse ? "left" : "right")
          , M = (T,I)=>{
            const U = l.value === "dragging";
            if (typeof I == "number") {
                const ce = n[I === 0 ? "left-button" : "right-button"];
                let me;
                if (U && Array.isArray(i) && (me = i[0] > i[1] ? r ^ 1 : r),
                ce)
                    return ce({
                        value: T,
                        dragging: U,
                        dragIndex: me
                    })
            }
            return n.button ? n.button({
                value: T,
                dragging: U
            }) : k("div", {
                class: jr("button"),
                style: xr(e.buttonSize)
            }, null)
        }
          , B = T=>{
            const I = typeof T == "number" ? e.modelValue[T] : e.modelValue;
            return k("div", {
                ref: s[T != null ? T : 0],
                role: "slider",
                class: O(T),
                tabindex: e.disabled ? void 0 : 0,
                "aria-valuemin": e.min,
                "aria-valuenow": I,
                "aria-valuemax": e.max,
                "aria-disabled": e.disabled || void 0,
                "aria-readonly": e.readonly || void 0,
                "aria-orientation": e.vertical ? "vertical" : "horizontal",
                onTouchstartPassive: U=>{
                    typeof T == "number" && (r = T),
                    A(U)
                }
                ,
                onTouchend: x,
                onTouchcancel: x,
                onClick: Pd
            }, [M(I, T)])
        }
        ;
        return C(e.modelValue),
        Bi(()=>e.modelValue),
        s.forEach(T=>{
            Bt("touchmove", N, {
                target: T
            })
        }
        ),
        ()=>k("div", {
            ref: a,
            style: f.value,
            class: jr({
                vertical: e.vertical,
                disabled: e.disabled
            }),
            onClick: S
        }, [k("div", {
            class: jr("bar"),
            style: E.value
        }, [e.range ? [B(0), B(1)] : B()])])
    }
});
const uS = Ne(cS)
  , [fS,Ko] = ke("stepper")
  , dS = 200
  , Yo = (e,t)=>String(e) === String(t)
  , mS = {
    min: Ae(1),
    max: Ae(1 / 0),
    name: Ae(""),
    step: Ae(1),
    theme: String,
    integer: Boolean,
    disabled: Boolean,
    showPlus: ve,
    showMinus: ve,
    showInput: ve,
    longPress: ve,
    autoFixed: ve,
    allowEmpty: Boolean,
    modelValue: ge,
    inputWidth: ge,
    buttonSize: ge,
    placeholder: String,
    disablePlus: Boolean,
    disableMinus: Boolean,
    disableInput: Boolean,
    beforeChange: Function,
    defaultValue: Ae(1),
    decimalLength: ge
};
var hS = Ee({
    name: fS,
    props: mS,
    emits: ["plus", "blur", "minus", "focus", "change", "overlimit", "update:modelValue"],
    setup(e, {emit: t}) {
        const n = (O,M=!0)=>{
            const {min: B, max: T, allowEmpty: I, decimalLength: U} = e;
            return I && O === "" || (O = Ga(String(O), !e.integer),
            O = O === "" ? 0 : +O,
            O = Number.isNaN(O) ? +B : O,
            O = M ? Math.max(Math.min(+T, O), +B) : O,
            Ue(U) && (O = O.toFixed(+U))),
            O
        }
          , r = ()=>{
            var O;
            const M = (O = e.modelValue) != null ? O : e.defaultValue
              , B = n(M);
            return Yo(B, e.modelValue) || t("update:modelValue", B),
            B
        }
        ;
        let i;
        const o = oe()
          , a = oe(r())
          , s = ne(()=>e.disabled || e.disableMinus || +a.value <= +e.min)
          , l = ne(()=>e.disabled || e.disablePlus || +a.value >= +e.max)
          , u = ne(()=>({
            width: We(e.inputWidth),
            height: We(e.buttonSize)
        }))
          , c = ne(()=>xr(e.buttonSize))
          , f = ()=>{
            const O = n(a.value);
            Yo(O, a.value) || (a.value = O)
        }
          , h = O=>{
            e.beforeChange ? Dr(e.beforeChange, {
                args: [O],
                done() {
                    a.value = O
                }
            }) : a.value = O
        }
          , p = ()=>{
            if (i === "plus" && l.value || i === "minus" && s.value) {
                t("overlimit", i);
                return
            }
            const O = i === "minus" ? -e.step : +e.step
              , M = n(Ad(+a.value, O));
            h(M),
            t(i)
        }
          , v = O=>{
            const M = O.target
              , {value: B} = M
              , {decimalLength: T} = e;
            let I = Ga(String(B), !e.integer);
            if (Ue(T) && I.includes(".")) {
                const ce = I.split(".");
                I = `${ce[0]}.${ce[1].slice(0, +T)}`
            }
            e.beforeChange ? M.value = String(a.value) : Yo(B, I) || (M.value = I);
            const U = I === String(+I);
            h(U ? +I : I)
        }
          , E = O=>{
            var M;
            e.disableInput ? (M = o.value) == null || M.blur() : t("focus", O)
        }
          , y = O=>{
            const M = O.target
              , B = n(M.value, e.autoFixed);
            M.value = String(B),
            a.value = B,
            Be(()=>{
                t("blur", O),
                Id()
            }
            )
        }
        ;
        let g, _;
        const C = ()=>{
            _ = setTimeout(()=>{
                p(),
                C()
            }
            , dS)
        }
          , S = ()=>{
            e.longPress && (g = !1,
            clearTimeout(_),
            _ = setTimeout(()=>{
                g = !0,
                p(),
                C()
            }
            , Dd))
        }
          , A = O=>{
            e.longPress && (clearTimeout(_),
            g && lt(O))
        }
          , N = O=>{
            e.disableInput && lt(O)
        }
          , x = O=>({
            onClick: M=>{
                lt(M),
                i = O,
                p()
            }
            ,
            onTouchstartPassive: ()=>{
                i = O,
                S()
            }
            ,
            onTouchend: A,
            onTouchcancel: A
        });
        return he(()=>[e.max, e.min, e.integer, e.decimalLength], f),
        he(()=>e.modelValue, O=>{
            Yo(O, a.value) || (a.value = n(O))
        }
        ),
        he(a, O=>{
            t("update:modelValue", O),
            t("change", O, {
                name: e.name
            })
        }
        ),
        Bi(()=>e.modelValue),
        ()=>k("div", {
            role: "group",
            class: Ko([e.theme])
        }, [on(k("button", qe({
            type: "button",
            style: c.value,
            class: [Ko("minus", {
                disabled: s.value
            }), {
                [Xn]: !s.value
            }],
            "aria-disabled": s.value || void 0
        }, x("minus")), null), [[Pn, e.showMinus]]), on(k("input", {
            ref: o,
            type: e.integer ? "tel" : "text",
            role: "spinbutton",
            class: Ko("input"),
            value: a.value,
            style: u.value,
            disabled: e.disabled,
            readonly: e.disableInput,
            inputmode: e.integer ? "numeric" : "decimal",
            placeholder: e.placeholder,
            autocomplete: "off",
            "aria-valuemax": e.max,
            "aria-valuemin": e.min,
            "aria-valuenow": a.value,
            onBlur: y,
            onInput: v,
            onFocus: E,
            onMousedown: N
        }, null), [[Pn, e.showInput]]), on(k("button", qe({
            type: "button",
            style: c.value,
            class: [Ko("plus", {
                disabled: l.value
            }), {
                [Xn]: !l.value
            }],
            "aria-disabled": l.value || void 0
        }, x("plus")), null), [[Pn, e.showPlus]])])
    }
});
const gS = Ne(hS)
  , [pS,Xe,vS] = ke("uploader");
function iu(e, t) {
    return new Promise(n=>{
        if (t === "file") {
            n();
            return
        }
        const r = new FileReader;
        r.onload = i=>{
            n(i.target.result)
        }
        ,
        t === "dataUrl" ? r.readAsDataURL(e) : t === "text" && r.readAsText(e)
    }
    )
}
function Pm(e, t) {
    return mi(e).some(n=>n.file ? wr(t) ? t(n.file) : n.file.size > +t : !1)
}
function bS(e, t) {
    const n = []
      , r = [];
    return e.forEach(i=>{
        Pm(i, t) ? r.push(i) : n.push(i)
    }
    ),
    {
        valid: n,
        invalid: r
    }
}
const yS = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg|avif)/i
  , _S = e=>yS.test(e);
function Rm(e) {
    return e.isImage ? !0 : e.file && e.file.type ? e.file.type.indexOf("image") === 0 : e.url ? _S(e.url) : typeof e.content == "string" ? e.content.indexOf("data:image") === 0 : !1
}
var ES = Ee({
    props: {
        name: ge,
        item: kt(Object),
        index: Number,
        imageFit: String,
        lazyLoad: Boolean,
        deletable: Boolean,
        reupload: Boolean,
        previewSize: [Number, String, Array],
        beforeDelete: Function
    },
    emits: ["delete", "preview", "reupload"],
    setup(e, {emit: t, slots: n}) {
        const r = ()=>{
            const {status: c, message: f} = e.item;
            if (c === "uploading" || c === "failed") {
                const h = c === "failed" ? k(at, {
                    name: "close",
                    class: Xe("mask-icon")
                }, null) : k(tr, {
                    class: Xe("loading")
                }, null)
                  , p = Ue(f) && f !== "";
                return k("div", {
                    class: Xe("mask")
                }, [h, p && k("div", {
                    class: Xe("mask-message")
                }, [f])])
            }
        }
          , i = c=>{
            const {name: f, item: h, index: p, beforeDelete: v} = e;
            c.stopPropagation(),
            Dr(v, {
                args: [h, {
                    name: f,
                    index: p
                }],
                done: ()=>t("delete")
            })
        }
          , o = ()=>t("preview")
          , a = ()=>t("reupload")
          , s = ()=>{
            if (e.deletable && e.item.status !== "uploading") {
                const c = n["preview-delete"];
                return k("div", {
                    role: "button",
                    class: Xe("preview-delete", {
                        shadow: !c
                    }),
                    tabindex: 0,
                    "aria-label": vS("delete"),
                    onClick: i
                }, [c ? c() : k(at, {
                    name: "cross",
                    class: Xe("preview-delete-icon")
                }, null)])
            }
        }
          , l = ()=>{
            if (n["preview-cover"]) {
                const {index: c, item: f} = e;
                return k("div", {
                    class: Xe("preview-cover")
                }, [n["preview-cover"](Me({
                    index: c
                }, f))])
            }
        }
          , u = ()=>{
            const {item: c, lazyLoad: f, imageFit: h, previewSize: p, reupload: v} = e;
            return Rm(c) ? k(bm, {
                fit: h,
                src: c.objectUrl || c.content || c.url,
                class: Xe("preview-image"),
                width: Array.isArray(p) ? p[0] : p,
                height: Array.isArray(p) ? p[1] : p,
                lazyLoad: f,
                onClick: v ? a : o
            }, {
                default: l
            }) : k("div", {
                class: Xe("file"),
                style: xr(e.previewSize)
            }, [k(at, {
                class: Xe("file-icon"),
                name: "description"
            }, null), k("div", {
                class: [Xe("file-name"), "van-ellipsis"]
            }, [c.file ? c.file.name : c.url]), l()])
        }
        ;
        return ()=>k("div", {
            class: Xe("preview")
        }, [u(), r(), s()])
    }
});
const wS = {
    name: Ae(""),
    accept: _e("image/*"),
    capture: String,
    multiple: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    lazyLoad: Boolean,
    maxCount: Ae(1 / 0),
    imageFit: _e("cover"),
    resultType: _e("dataUrl"),
    uploadIcon: _e("photograph"),
    uploadText: String,
    deletable: ve,
    reupload: Boolean,
    afterRead: Function,
    showUpload: ve,
    modelValue: Gn(),
    beforeRead: Function,
    beforeDelete: Function,
    previewSize: [Number, String, Array],
    previewImage: ve,
    previewOptions: Object,
    previewFullImage: ve,
    maxSize: {
        type: [Number, String, Function],
        default: 1 / 0
    }
};
var SS = Ee({
    name: pS,
    props: wS,
    emits: ["delete", "oversize", "clickUpload", "closePreview", "clickPreview", "clickReupload", "update:modelValue"],
    setup(e, {emit: t, slots: n}) {
        const r = oe()
          , i = []
          , o = oe(-1)
          , a = oe(!1)
          , s = (O=e.modelValue.length)=>({
            name: e.name,
            index: O
        })
          , l = ()=>{
            r.value && (r.value.value = "")
        }
          , u = O=>{
            if (l(),
            Pm(O, e.maxSize))
                if (Array.isArray(O)) {
                    const M = bS(O, e.maxSize);
                    if (O = M.valid,
                    t("oversize", M.invalid, s()),
                    !O.length)
                        return
                } else {
                    t("oversize", O, s());
                    return
                }
            if (O = rt(O),
            o.value > -1) {
                const M = [...e.modelValue];
                M.splice(o.value, 1, O),
                t("update:modelValue", M),
                o.value = -1
            } else
                t("update:modelValue", [...e.modelValue, ...mi(O)]);
            e.afterRead && e.afterRead(O, s())
        }
          , c = O=>{
            const {maxCount: M, modelValue: B, resultType: T} = e;
            if (Array.isArray(O)) {
                const I = +M - B.length;
                O.length > I && (O = O.slice(0, I)),
                Promise.all(O.map(U=>iu(U, T))).then(U=>{
                    const ce = O.map((me,K)=>{
                        const ee = {
                            file: me,
                            status: "",
                            message: "",
                            objectUrl: URL.createObjectURL(me)
                        };
                        return U[K] && (ee.content = U[K]),
                        ee
                    }
                    );
                    u(ce)
                }
                )
            } else
                iu(O, T).then(I=>{
                    const U = {
                        file: O,
                        status: "",
                        message: "",
                        objectUrl: URL.createObjectURL(O)
                    };
                    I && (U.content = I),
                    u(U)
                }
                )
        }
          , f = O=>{
            const {files: M} = O.target;
            if (e.disabled || !M || !M.length)
                return;
            const B = M.length === 1 ? M[0] : [].slice.call(M);
            if (e.beforeRead) {
                const T = e.beforeRead(B, s());
                if (!T) {
                    l();
                    return
                }
                if (Ms(T)) {
                    T.then(I=>{
                        c(I || B)
                    }
                    ).catch(l);
                    return
                }
            }
            c(B)
        }
        ;
        let h;
        const p = ()=>t("closePreview")
          , v = O=>{
            if (e.previewFullImage) {
                const M = e.modelValue.filter(Rm)
                  , B = M.map(T=>(T.objectUrl && !T.url && T.status !== "failed" && (T.url = T.objectUrl,
                i.push(T.url)),
                T.url)).filter(Boolean);
                h = ow(Me({
                    images: B,
                    startPosition: M.indexOf(O),
                    onClose: p
                }, e.previewOptions))
            }
        }
          , E = ()=>{
            h && h.close()
        }
          , y = (O,M)=>{
            const B = e.modelValue.slice(0);
            B.splice(M, 1),
            t("update:modelValue", B),
            t("delete", O, s(M))
        }
          , g = O=>{
            a.value = !0,
            o.value = O,
            Be(()=>x())
        }
          , _ = ()=>{
            a.value || (o.value = -1),
            a.value = !1
        }
          , C = (O,M)=>{
            const B = ["imageFit", "deletable", "reupload", "previewSize", "beforeDelete"]
              , T = Me(_t(e, B), _t(O, B, !0));
            return k(ES, qe({
                item: O,
                index: M,
                onClick: ()=>t(e.reupload ? "clickReupload" : "clickPreview", O, s(M)),
                onDelete: ()=>y(O, M),
                onPreview: ()=>v(O),
                onReupload: ()=>g(M)
            }, _t(e, ["name", "lazyLoad"]), T), _t(n, ["preview-cover", "preview-delete"]))
        }
          , S = ()=>{
            if (e.previewImage)
                return e.modelValue.map(C)
        }
          , A = O=>t("clickUpload", O)
          , N = ()=>{
            const O = e.modelValue.length < +e.maxCount
              , M = e.readonly ? null : k("input", {
                ref: r,
                type: "file",
                class: Xe("input"),
                accept: e.accept,
                capture: e.capture,
                multiple: e.multiple && o.value === -1,
                disabled: e.disabled,
                onChange: f,
                onClick: _
            }, null);
            return n.default ? on(k("div", {
                class: Xe("input-wrapper"),
                onClick: A
            }, [n.default(), M]), [[Pn, O]]) : on(k("div", {
                class: Xe("upload", {
                    readonly: e.readonly
                }),
                style: xr(e.previewSize),
                onClick: A
            }, [k(at, {
                name: e.uploadIcon,
                class: Xe("upload-icon")
            }, null), e.uploadText && k("span", {
                class: Xe("upload-text")
            }, [e.uploadText]), M]), [[Pn, e.showUpload && O]])
        }
          , x = ()=>{
            r.value && !e.disabled && r.value.click()
        }
        ;
        return fn(()=>{
            i.forEach(O=>URL.revokeObjectURL(O))
        }
        ),
        bt({
            chooseFile: x,
            reuploadFile: g,
            closeImagePreview: E
        }),
        Bi(()=>e.modelValue),
        ()=>k("div", {
            class: Xe()
        }, [k("div", {
            class: Xe("wrapper", {
                disabled: e.disabled
            })
        }, [S(), N()])])
    }
});
const TS = Ne(SS)
  , CS = "modulepreload"
  , au = {}
  , OS = "/"
  , ni = function(t, n) {
    return !n || n.length === 0 ? t() : Promise.all(n.map(r=>{
        if (r = `${OS}${r}`,
        r in au)
            return;
        au[r] = !0;
        const i = r.endsWith(".css")
          , o = i ? '[rel="stylesheet"]' : "";
        if (document.querySelector(`link[href="${r}"]${o}`))
            return;
        const a = document.createElement("link");
        if (a.rel = i ? "stylesheet" : CS,
        i || (a.as = "script",
        a.crossOrigin = ""),
        a.href = r,
        document.head.appendChild(a),
        i)
            return new Promise((s,l)=>{
                a.addEventListener("load", s),
                a.addEventListener("error", ()=>l(new Error(`Unable to preload CSS for ${r}`)))
            }
            )
    }
    )).then(()=>t())
};
function kS(e={}) {
    const {immediate: t=!1, onNeedRefresh: n, onOfflineReady: r, onRegistered: i, onRegisteredSW: o, onRegisterError: a} = e;
    let s, l, u, c;
    const f = async(p=!0)=>{
        await u,
        p && (s == null || s.addEventListener("controlling", v=>{
            v.isUpdate && window.location.reload()
        }
        )),
        await (c == null ? void 0 : c())
    }
    ;
    async function h() {
        if ("serviceWorker"in navigator) {
            const {Workbox: p, messageSW: v} = await ni(()=>import("./workbox-window.js"), []);
            c = async()=>{
                l && l.waiting && await v(l.waiting, {
                    type: "SKIP_WAITING"
                })
            }
            ,
            s = new p("/sw.js",{
                scope: "/",
                type: "classic"
            }),
            s.addEventListener("activated", E=>{
                E.isUpdate || r == null || r()
            }
            );
            {
                const E = ()=>{
                    n == null || n()
                }
                ;
                s.addEventListener("waiting", E),
                s.addEventListener("externalwaiting", E)
            }
            s.register({
                immediate: t
            }).then(E=>{
                l = E,
                o ? o("/sw.js", E) : i == null || i(E)
            }
            ).catch(E=>{
                a == null || a(E)
            }
            )
        }
    }
    return u = h(),
    f
}
var IS = (e,t)=>{
    const n = e.__vccOpts || e;
    for (const [r,i] of t)
        n[r] = i;
    return n
}
;
const su = kS({
    onNeedRefresh() {
        // 静默更新：既不弹窗询问、也不自动刷新打断用户。仅把新版 SW
        // 跳过等待、在后台就绪；当前界面继续用原缓存，下次自然打开再生效。
        su(!1)
    },
    onOfflineReady() {}
});
let qo;
function PS() {
    const e = JSON.parse(localStorage.getItem("installPromptData"));
    if (console.log(e),
    !e)
        return !0;
    const {lastShown: t, count: n} = e
      , r = new Date().toDateString();
    return !(n >= 5 || t === r)
}
function lu() {
    const e = new Date().toDateString()
      , t = JSON.parse(localStorage.getItem("installPromptData")) || {
        lastShown: null,
        count: 0
    };
    t.lastShown !== e && (t.lastShown = e,
    t.count += 1,
    localStorage.setItem("installPromptData", JSON.stringify(t)))
}
window.addEventListener("beforeinstallprompt", e=>{
    !PS() || (e.preventDefault(),
    qo = e,
    _m({
        title: "\u4E00\u6B65\u4E4B\u9065\uFF01",
        message: "\u60A8\u662F\u5426\u5E0C\u671B\u628A\u201C\u76AE\u5361\u9C7C\u8C61\u68CB\u201D\u6DFB\u52A0\u5230\u4E3B\u5C4F\u5E55\uFF1F\u5B89\u88C5\u540E\u53EF\u968F\u65F6\u4EAB\u53D7\u4FBF\u6377\u7684\u68CB\u5C40\u4F53\u9A8C\uFF0C\u5373\u4F7F\u6CA1\u7F51\u4E5F\u80FD\u8F7B\u677E\u8BBF\u95EE\uFF01",
        showCancelButton: !0,
        confirmButtonText: "\u7ACB\u5373\u5B89\u88C5",
        cancelButtonText: "\u7A0D\u540E\u518D\u8BF4"
    }).then(()=>{
        lu(),
        qo.prompt(),
        qo.userChoice.then(t=>{
            t.outcome === "accepted" ? console.log("\u7528\u6237\u63A5\u53D7\u4E86\u5B89\u88C5\u63D0\u793A") : console.log("\u7528\u6237\u62D2\u7EDD\u4E86\u5B89\u88C5\u63D0\u793A"),
            qo = null
        }
        )
    }
    ).catch(()=>{
        lu(),
        console.log("\u7528\u6237\u53D6\u6D88\u4E86\u5B89\u88C5\u63D0\u793A")
    }
    ))
}
);
const RS = {};
function LS(e, t, n, r, i, o) {
    const a = kg("router-view");
    return Df(),
    Ff(a)
}
var AS = IS(RS, [["render", LS]]);
/*!
  * vue-router v4.1.4
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */
const dr = typeof window != "undefined";
function NS(e) {
    return e.__esModule || e[Symbol.toStringTag] === "Module"
}
const xe = Object.assign;
function ha(e, t) {
    const n = {};
    for (const r in t) {
        const i = t[r];
        n[r] = $t(i) ? i.map(e) : e(i)
    }
    return n
}
const ro = ()=>{}
  , $t = Array.isArray
  , xS = /\/$/
  , DS = e=>e.replace(xS, "");
function ga(e, t, n="/") {
    let r, i = {}, o = "", a = "";
    const s = t.indexOf("#");
    let l = t.indexOf("?");
    return s < l && s >= 0 && (l = -1),
    l > -1 && (r = t.slice(0, l),
    o = t.slice(l + 1, s > -1 ? s : t.length),
    i = e(o)),
    s > -1 && (r = r || t.slice(0, s),
    a = t.slice(s, t.length)),
    r = BS(r != null ? r : t, n),
    {
        fullPath: r + (o && "?") + o + a,
        path: r,
        query: i,
        hash: a
    }
}
function MS(e, t) {
    const n = t.query ? e(t.query) : "";
    return t.path + (n && "?") + n + (t.hash || "")
}
function cu(e, t) {
    return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/"
}
function FS(e, t, n) {
    const r = t.matched.length - 1
      , i = n.matched.length - 1;
    return r > -1 && r === i && Tr(t.matched[r], n.matched[i]) && Lm(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash
}
function Tr(e, t) {
    return (e.aliasOf || e) === (t.aliasOf || t)
}
function Lm(e, t) {
    if (Object.keys(e).length !== Object.keys(t).length)
        return !1;
    for (const n in e)
        if (!$S(e[n], t[n]))
            return !1;
    return !0
}
function $S(e, t) {
    return $t(e) ? uu(e, t) : $t(t) ? uu(t, e) : e === t
}
function uu(e, t) {
    return $t(t) ? e.length === t.length && e.every((n,r)=>n === t[r]) : e.length === 1 && e[0] === t
}
function BS(e, t) {
    if (e.startsWith("/"))
        return e;
    if (!e)
        return t;
    const n = t.split("/")
      , r = e.split("/");
    let i = n.length - 1, o, a;
    for (o = 0; o < r.length; o++)
        if (a = r[o],
        a !== ".")
            if (a === "..")
                i > 1 && i--;
            else
                break;
    return n.slice(0, i).join("/") + "/" + r.slice(o - (o === r.length ? 1 : 0)).join("/")
}
var _o;
(function(e) {
    e.pop = "pop",
    e.push = "push"
}
)(_o || (_o = {}));
var oo;
(function(e) {
    e.back = "back",
    e.forward = "forward",
    e.unknown = ""
}
)(oo || (oo = {}));
function US(e) {
    if (!e)
        if (dr) {
            const t = document.querySelector("base");
            e = t && t.getAttribute("href") || "/",
            e = e.replace(/^\w+:\/\/[^\/]+/, "")
        } else
            e = "/";
    return e[0] !== "/" && e[0] !== "#" && (e = "/" + e),
    DS(e)
}
const VS = /^[^#]+#/;
function HS(e, t) {
    return e.replace(VS, "#") + t
}
function WS(e, t) {
    const n = document.documentElement.getBoundingClientRect()
      , r = e.getBoundingClientRect();
    return {
        behavior: t.behavior,
        left: r.left - n.left - (t.left || 0),
        top: r.top - n.top - (t.top || 0)
    }
}
const ji = ()=>({
    left: window.pageXOffset,
    top: window.pageYOffset
});
function jS(e) {
    let t;
    if ("el"in e) {
        const n = e.el
          , r = typeof n == "string" && n.startsWith("#")
          , i = typeof n == "string" ? r ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
        if (!i)
            return;
        t = WS(i, e)
    } else
        t = e;
    "scrollBehavior"in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.pageXOffset, t.top != null ? t.top : window.pageYOffset)
}
function fu(e, t) {
    return (history.state ? history.state.position - t : -1) + e
}
const ts = new Map;
function zS(e, t) {
    ts.set(e, t)
}
function KS(e) {
    const t = ts.get(e);
    return ts.delete(e),
    t
}
let YS = ()=>location.protocol + "//" + location.host;
function Am(e, t) {
    const {pathname: n, search: r, hash: i} = t
      , o = e.indexOf("#");
    if (o > -1) {
        let s = i.includes(e.slice(o)) ? e.slice(o).length : 1
          , l = i.slice(s);
        return l[0] !== "/" && (l = "/" + l),
        cu(l, "")
    }
    return cu(n, e) + r + i
}
function qS(e, t, n, r) {
    let i = []
      , o = []
      , a = null;
    const s = ({state: h})=>{
        const p = Am(e, location)
          , v = n.value
          , E = t.value;
        let y = 0;
        if (h) {
            if (n.value = p,
            t.value = h,
            a && a === v) {
                a = null;
                return
            }
            y = E ? h.position - E.position : 0
        } else
            r(p);
        i.forEach(g=>{
            g(n.value, v, {
                delta: y,
                type: _o.pop,
                direction: y ? y > 0 ? oo.forward : oo.back : oo.unknown
            })
        }
        )
    }
    ;
    function l() {
        a = n.value
    }
    function u(h) {
        i.push(h);
        const p = ()=>{
            const v = i.indexOf(h);
            v > -1 && i.splice(v, 1)
        }
        ;
        return o.push(p),
        p
    }
    function c() {
        const {history: h} = window;
        !h.state || h.replaceState(xe({}, h.state, {
            scroll: ji()
        }), "")
    }
    function f() {
        for (const h of o)
            h();
        o = [],
        window.removeEventListener("popstate", s),
        window.removeEventListener("beforeunload", c)
    }
    return window.addEventListener("popstate", s),
    window.addEventListener("beforeunload", c),
    {
        pauseListeners: l,
        listen: u,
        destroy: f
    }
}
function du(e, t, n, r=!1, i=!1) {
    return {
        back: e,
        current: t,
        forward: n,
        replaced: r,
        position: window.history.length,
        scroll: i ? ji() : null
    }
}
function GS(e) {
    const {history: t, location: n} = window
      , r = {
        value: Am(e, n)
    }
      , i = {
        value: t.state
    };
    i.value || o(r.value, {
        back: null,
        current: r.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null
    }, !0);
    function o(l, u, c) {
        const f = e.indexOf("#")
          , h = f > -1 ? (n.host && document.querySelector("base") ? e : e.slice(f)) + l : YS() + e + l;
        try {
            t[c ? "replaceState" : "pushState"](u, "", h),
            i.value = u
        } catch (p) {
            console.error(p),
            n[c ? "replace" : "assign"](h)
        }
    }
    function a(l, u) {
        const c = xe({}, t.state, du(i.value.back, l, i.value.forward, !0), u, {
            position: i.value.position
        });
        o(l, c, !0),
        r.value = l
    }
    function s(l, u) {
        const c = xe({}, i.value, t.state, {
            forward: l,
            scroll: ji()
        });
        o(c.current, c, !0);
        const f = xe({}, du(r.value, l, null), {
            position: c.position + 1
        }, u);
        o(l, f, !1),
        r.value = l
    }
    return {
        location: r,
        state: i,
        push: s,
        replace: a
    }
}
function XS(e) {
    e = US(e);
    const t = GS(e)
      , n = qS(e, t.state, t.location, t.replace);
    function r(o, a=!0) {
        a || n.pauseListeners(),
        history.go(o)
    }
    const i = xe({
        location: "",
        base: e,
        go: r,
        createHref: HS.bind(null, e)
    }, t, n);
    return Object.defineProperty(i, "location", {
        enumerable: !0,
        get: ()=>t.location.value
    }),
    Object.defineProperty(i, "state", {
        enumerable: !0,
        get: ()=>t.state.value
    }),
    i
}
function JS(e) {
    return e = location.host ? e || location.pathname + location.search : "",
    e.includes("#") || (e += "#"),
    XS(e)
}
function ZS(e) {
    return typeof e == "string" || e && typeof e == "object"
}
function Nm(e) {
    return typeof e == "string" || typeof e == "symbol"
}
const yn = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0
}
  , xm = Symbol("");
var mu;
(function(e) {
    e[e.aborted = 4] = "aborted",
    e[e.cancelled = 8] = "cancelled",
    e[e.duplicated = 16] = "duplicated"
}
)(mu || (mu = {}));
function Cr(e, t) {
    return xe(new Error, {
        type: e,
        [xm]: !0
    }, t)
}
function Zt(e, t) {
    return e instanceof Error && xm in e && (t == null || !!(e.type & t))
}
const hu = "[^/]+?"
  , QS = {
    sensitive: !1,
    strict: !1,
    start: !0,
    end: !0
}
  , e0 = /[.+*?^${}()[\]/\\]/g;
function t0(e, t) {
    const n = xe({}, QS, t)
      , r = [];
    let i = n.start ? "^" : "";
    const o = [];
    for (const u of e) {
        const c = u.length ? [] : [90];
        n.strict && !u.length && (i += "/");
        for (let f = 0; f < u.length; f++) {
            const h = u[f];
            let p = 40 + (n.sensitive ? .25 : 0);
            if (h.type === 0)
                f || (i += "/"),
                i += h.value.replace(e0, "\\$&"),
                p += 40;
            else if (h.type === 1) {
                const {value: v, repeatable: E, optional: y, regexp: g} = h;
                o.push({
                    name: v,
                    repeatable: E,
                    optional: y
                });
                const _ = g || hu;
                if (_ !== hu) {
                    p += 10;
                    try {
                        new RegExp(`(${_})`)
                    } catch (S) {
                        throw new Error(`Invalid custom RegExp for param "${v}" (${_}): ` + S.message)
                    }
                }
                let C = E ? `((?:${_})(?:/(?:${_}))*)` : `(${_})`;
                f || (C = y && u.length < 2 ? `(?:/${C})` : "/" + C),
                y && (C += "?"),
                i += C,
                p += 20,
                y && (p += -8),
                E && (p += -20),
                _ === ".*" && (p += -50)
            }
            c.push(p)
        }
        r.push(c)
    }
    if (n.strict && n.end) {
        const u = r.length - 1;
        r[u][r[u].length - 1] += .7000000000000001
    }
    n.strict || (i += "/?"),
    n.end ? i += "$" : n.strict && (i += "(?:/|$)");
    const a = new RegExp(i,n.sensitive ? "" : "i");
    function s(u) {
        const c = u.match(a)
          , f = {};
        if (!c)
            return null;
        for (let h = 1; h < c.length; h++) {
            const p = c[h] || ""
              , v = o[h - 1];
            f[v.name] = p && v.repeatable ? p.split("/") : p
        }
        return f
    }
    function l(u) {
        let c = ""
          , f = !1;
        for (const h of e) {
            (!f || !c.endsWith("/")) && (c += "/"),
            f = !1;
            for (const p of h)
                if (p.type === 0)
                    c += p.value;
                else if (p.type === 1) {
                    const {value: v, repeatable: E, optional: y} = p
                      , g = v in u ? u[v] : "";
                    if ($t(g) && !E)
                        throw new Error(`Provided param "${v}" is an array but it is not repeatable (* or + modifiers)`);
                    const _ = $t(g) ? g.join("/") : g;
                    if (!_)
                        if (y)
                            h.length < 2 && (c.endsWith("/") ? c = c.slice(0, -1) : f = !0);
                        else
                            throw new Error(`Missing required param "${v}"`);
                    c += _
                }
        }
        return c || "/"
    }
    return {
        re: a,
        score: r,
        keys: o,
        parse: s,
        stringify: l
    }
}
function n0(e, t) {
    let n = 0;
    for (; n < e.length && n < t.length; ) {
        const r = t[n] - e[n];
        if (r)
            return r;
        n++
    }
    return e.length < t.length ? e.length === 1 && e[0] === 40 + 40 ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === 40 + 40 ? 1 : -1 : 0
}
function r0(e, t) {
    let n = 0;
    const r = e.score
      , i = t.score;
    for (; n < r.length && n < i.length; ) {
        const o = n0(r[n], i[n]);
        if (o)
            return o;
        n++
    }
    if (Math.abs(i.length - r.length) === 1) {
        if (gu(r))
            return 1;
        if (gu(i))
            return -1
    }
    return i.length - r.length
}
function gu(e) {
    const t = e[e.length - 1];
    return e.length > 0 && t[t.length - 1] < 0
}
const o0 = {
    type: 0,
    value: ""
}
  , i0 = /[a-zA-Z0-9_]/;
function a0(e) {
    if (!e)
        return [[]];
    if (e === "/")
        return [[o0]];
    if (!e.startsWith("/"))
        throw new Error(`Invalid path "${e}"`);
    function t(p) {
        throw new Error(`ERR (${n})/"${u}": ${p}`)
    }
    let n = 0
      , r = n;
    const i = [];
    let o;
    function a() {
        o && i.push(o),
        o = []
    }
    let s = 0, l, u = "", c = "";
    function f() {
        !u || (n === 0 ? o.push({
            type: 0,
            value: u
        }) : n === 1 || n === 2 || n === 3 ? (o.length > 1 && (l === "*" || l === "+") && t(`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`),
        o.push({
            type: 1,
            value: u,
            regexp: c,
            repeatable: l === "*" || l === "+",
            optional: l === "*" || l === "?"
        })) : t("Invalid state to consume buffer"),
        u = "")
    }
    function h() {
        u += l
    }
    for (; s < e.length; ) {
        if (l = e[s++],
        l === "\\" && n !== 2) {
            r = n,
            n = 4;
            continue
        }
        switch (n) {
        case 0:
            l === "/" ? (u && f(),
            a()) : l === ":" ? (f(),
            n = 1) : h();
            break;
        case 4:
            h(),
            n = r;
            break;
        case 1:
            l === "(" ? n = 2 : i0.test(l) ? h() : (f(),
            n = 0,
            l !== "*" && l !== "?" && l !== "+" && s--);
            break;
        case 2:
            l === ")" ? c[c.length - 1] == "\\" ? c = c.slice(0, -1) + l : n = 3 : c += l;
            break;
        case 3:
            f(),
            n = 0,
            l !== "*" && l !== "?" && l !== "+" && s--,
            c = "";
            break;
        default:
            t("Unknown state");
            break
        }
    }
    return n === 2 && t(`Unfinished custom RegExp for param "${u}"`),
    f(),
    a(),
    i
}
function s0(e, t, n) {
    const r = t0(a0(e.path), n)
      , i = xe(r, {
        record: e,
        parent: t,
        children: [],
        alias: []
    });
    return t && !i.record.aliasOf == !t.record.aliasOf && t.children.push(i),
    i
}
function l0(e, t) {
    const n = []
      , r = new Map;
    t = bu({
        strict: !1,
        end: !0,
        sensitive: !1
    }, t);
    function i(c) {
        return r.get(c)
    }
    function o(c, f, h) {
        const p = !h
          , v = c0(c);
        v.aliasOf = h && h.record;
        const E = bu(t, c)
          , y = [v];
        if ("alias"in c) {
            const C = typeof c.alias == "string" ? [c.alias] : c.alias;
            for (const S of C)
                y.push(xe({}, v, {
                    components: h ? h.record.components : v.components,
                    path: S,
                    aliasOf: h ? h.record : v
                }))
        }
        let g, _;
        for (const C of y) {
            const {path: S} = C;
            if (f && S[0] !== "/") {
                const A = f.record.path
                  , N = A[A.length - 1] === "/" ? "" : "/";
                C.path = f.record.path + (S && N + S)
            }
            if (g = s0(C, f, E),
            h ? h.alias.push(g) : (_ = _ || g,
            _ !== g && _.alias.push(g),
            p && c.name && !vu(g) && a(c.name)),
            v.children) {
                const A = v.children;
                for (let N = 0; N < A.length; N++)
                    o(A[N], g, h && h.children[N])
            }
            h = h || g,
            l(g)
        }
        return _ ? ()=>{
            a(_)
        }
        : ro
    }
    function a(c) {
        if (Nm(c)) {
            const f = r.get(c);
            f && (r.delete(c),
            n.splice(n.indexOf(f), 1),
            f.children.forEach(a),
            f.alias.forEach(a))
        } else {
            const f = n.indexOf(c);
            f > -1 && (n.splice(f, 1),
            c.record.name && r.delete(c.record.name),
            c.children.forEach(a),
            c.alias.forEach(a))
        }
    }
    function s() {
        return n
    }
    function l(c) {
        let f = 0;
        for (; f < n.length && r0(c, n[f]) >= 0 && (c.record.path !== n[f].record.path || !Dm(c, n[f])); )
            f++;
        n.splice(f, 0, c),
        c.record.name && !vu(c) && r.set(c.record.name, c)
    }
    function u(c, f) {
        let h, p = {}, v, E;
        if ("name"in c && c.name) {
            if (h = r.get(c.name),
            !h)
                throw Cr(1, {
                    location: c
                });
            E = h.record.name,
            p = xe(pu(f.params, h.keys.filter(_=>!_.optional).map(_=>_.name)), c.params && pu(c.params, h.keys.map(_=>_.name))),
            v = h.stringify(p)
        } else if ("path"in c)
            v = c.path,
            h = n.find(_=>_.re.test(v)),
            h && (p = h.parse(v),
            E = h.record.name);
        else {
            if (h = f.name ? r.get(f.name) : n.find(_=>_.re.test(f.path)),
            !h)
                throw Cr(1, {
                    location: c,
                    currentLocation: f
                });
            E = h.record.name,
            p = xe({}, f.params, c.params),
            v = h.stringify(p)
        }
        const y = [];
        let g = h;
        for (; g; )
            y.unshift(g.record),
            g = g.parent;
        return {
            name: E,
            path: v,
            params: p,
            matched: y,
            meta: f0(y)
        }
    }
    return e.forEach(c=>o(c)),
    {
        addRoute: o,
        resolve: u,
        removeRoute: a,
        getRoutes: s,
        getRecordMatcher: i
    }
}
function pu(e, t) {
    const n = {};
    for (const r of t)
        r in e && (n[r] = e[r]);
    return n
}
function c0(e) {
    return {
        path: e.path,
        redirect: e.redirect,
        name: e.name,
        meta: e.meta || {},
        aliasOf: void 0,
        beforeEnter: e.beforeEnter,
        props: u0(e),
        children: e.children || [],
        instances: {},
        leaveGuards: new Set,
        updateGuards: new Set,
        enterCallbacks: {},
        components: "components"in e ? e.components || null : e.component && {
            default: e.component
        }
    }
}
function u0(e) {
    const t = {}
      , n = e.props || !1;
    if ("component"in e)
        t.default = n;
    else
        for (const r in e.components)
            t[r] = typeof n == "boolean" ? n : n[r];
    return t
}
function vu(e) {
    for (; e; ) {
        if (e.record.aliasOf)
            return !0;
        e = e.parent
    }
    return !1
}
function f0(e) {
    return e.reduce((t,n)=>xe(t, n.meta), {})
}
function bu(e, t) {
    const n = {};
    for (const r in e)
        n[r] = r in t ? t[r] : e[r];
    return n
}
function Dm(e, t) {
    return t.children.some(n=>n === e || Dm(e, n))
}
const Mm = /#/g
  , d0 = /&/g
  , m0 = /\//g
  , h0 = /=/g
  , g0 = /\?/g
  , Fm = /\+/g
  , p0 = /%5B/g
  , v0 = /%5D/g
  , $m = /%5E/g
  , b0 = /%60/g
  , Bm = /%7B/g
  , y0 = /%7C/g
  , Um = /%7D/g
  , _0 = /%20/g;
function Zs(e) {
    return encodeURI("" + e).replace(y0, "|").replace(p0, "[").replace(v0, "]")
}
function E0(e) {
    return Zs(e).replace(Bm, "{").replace(Um, "}").replace($m, "^")
}
function ns(e) {
    return Zs(e).replace(Fm, "%2B").replace(_0, "+").replace(Mm, "%23").replace(d0, "%26").replace(b0, "`").replace(Bm, "{").replace(Um, "}").replace($m, "^")
}
function w0(e) {
    return ns(e).replace(h0, "%3D")
}
function S0(e) {
    return Zs(e).replace(Mm, "%23").replace(g0, "%3F")
}
function T0(e) {
    return e == null ? "" : S0(e).replace(m0, "%2F")
}
function yi(e) {
    try {
        return decodeURIComponent("" + e)
    } catch {}
    return "" + e
}
function C0(e) {
    const t = {};
    if (e === "" || e === "?")
        return t;
    const r = (e[0] === "?" ? e.slice(1) : e).split("&");
    for (let i = 0; i < r.length; ++i) {
        const o = r[i].replace(Fm, " ")
          , a = o.indexOf("=")
          , s = yi(a < 0 ? o : o.slice(0, a))
          , l = a < 0 ? null : yi(o.slice(a + 1));
        if (s in t) {
            let u = t[s];
            $t(u) || (u = t[s] = [u]),
            u.push(l)
        } else
            t[s] = l
    }
    return t
}
function yu(e) {
    let t = "";
    for (let n in e) {
        const r = e[n];
        if (n = w0(n),
        r == null) {
            r !== void 0 && (t += (t.length ? "&" : "") + n);
            continue
        }
        ($t(r) ? r.map(o=>o && ns(o)) : [r && ns(r)]).forEach(o=>{
            o !== void 0 && (t += (t.length ? "&" : "") + n,
            o != null && (t += "=" + o))
        }
        )
    }
    return t
}
function O0(e) {
    const t = {};
    for (const n in e) {
        const r = e[n];
        r !== void 0 && (t[n] = $t(r) ? r.map(i=>i == null ? null : "" + i) : r == null ? r : "" + r)
    }
    return t
}
const k0 = Symbol("")
  , _u = Symbol("")
  , Qs = Symbol("")
  , Vm = Symbol("")
  , rs = Symbol("");
function zr() {
    let e = [];
    function t(r) {
        return e.push(r),
        ()=>{
            const i = e.indexOf(r);
            i > -1 && e.splice(i, 1)
        }
    }
    function n() {
        e = []
    }
    return {
        add: t,
        list: ()=>e,
        reset: n
    }
}
function Tn(e, t, n, r, i) {
    const o = r && (r.enterCallbacks[i] = r.enterCallbacks[i] || []);
    return ()=>new Promise((a,s)=>{
        const l = f=>{
            f === !1 ? s(Cr(4, {
                from: n,
                to: t
            })) : f instanceof Error ? s(f) : ZS(f) ? s(Cr(2, {
                from: t,
                to: f
            })) : (o && r.enterCallbacks[i] === o && typeof f == "function" && o.push(f),
            a())
        }
          , u = e.call(r && r.instances[i], t, n, l);
        let c = Promise.resolve(u);
        e.length < 3 && (c = c.then(l)),
        c.catch(f=>s(f))
    }
    )
}
function pa(e, t, n, r) {
    const i = [];
    for (const o of e)
        for (const a in o.components) {
            let s = o.components[a];
            if (!(t !== "beforeRouteEnter" && !o.instances[a]))
                if (I0(s)) {
                    const u = (s.__vccOpts || s)[t];
                    u && i.push(Tn(u, n, r, o, a))
                } else {
                    let l = s();
                    i.push(()=>l.then(u=>{
                        if (!u)
                            return Promise.reject(new Error(`Couldn't resolve component "${a}" at "${o.path}"`));
                        const c = NS(u) ? u.default : u;
                        o.components[a] = c;
                        const h = (c.__vccOpts || c)[t];
                        return h && Tn(h, n, r, o, a)()
                    }
                    ))
                }
        }
    return i
}
function I0(e) {
    return typeof e == "object" || "displayName"in e || "props"in e || "__vccOpts"in e
}
function Eu(e) {
    const t = Et(Qs)
      , n = Et(Vm)
      , r = ne(()=>t.resolve(Mt(e.to)))
      , i = ne(()=>{
        const {matched: l} = r.value
          , {length: u} = l
          , c = l[u - 1]
          , f = n.matched;
        if (!c || !f.length)
            return -1;
        const h = f.findIndex(Tr.bind(null, c));
        if (h > -1)
            return h;
        const p = wu(l[u - 2]);
        return u > 1 && wu(c) === p && f[f.length - 1].path !== p ? f.findIndex(Tr.bind(null, l[u - 2])) : h
    }
    )
      , o = ne(()=>i.value > -1 && A0(n.params, r.value.params))
      , a = ne(()=>i.value > -1 && i.value === n.matched.length - 1 && Lm(n.params, r.value.params));
    function s(l={}) {
        return L0(l) ? t[Mt(e.replace) ? "replace" : "push"](Mt(e.to)).catch(ro) : Promise.resolve()
    }
    return {
        route: r,
        href: ne(()=>r.value.href),
        isActive: o,
        isExactActive: a,
        navigate: s
    }
}
const P0 = Ee({
    name: "RouterLink",
    compatConfig: {
        MODE: 3
    },
    props: {
        to: {
            type: [String, Object],
            required: !0
        },
        replace: Boolean,
        activeClass: String,
        exactActiveClass: String,
        custom: Boolean,
        ariaCurrentValue: {
            type: String,
            default: "page"
        }
    },
    useLink: Eu,
    setup(e, {slots: t}) {
        const n = rt(Eu(e))
          , {options: r} = Et(Qs)
          , i = ne(()=>({
            [Su(e.activeClass, r.linkActiveClass, "router-link-active")]: n.isActive,
            [Su(e.exactActiveClass, r.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
        }));
        return ()=>{
            const o = t.default && t.default(n);
            return e.custom ? o : wo("a", {
                "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: i.value
            }, o)
        }
    }
})
  , R0 = P0;
function L0(e) {
    if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
        if (e.currentTarget && e.currentTarget.getAttribute) {
            const t = e.currentTarget.getAttribute("target");
            if (/\b_blank\b/i.test(t))
                return
        }
        return e.preventDefault && e.preventDefault(),
        !0
    }
}
function A0(e, t) {
    for (const n in t) {
        const r = t[n]
          , i = e[n];
        if (typeof r == "string") {
            if (r !== i)
                return !1
        } else if (!$t(i) || i.length !== r.length || r.some((o,a)=>o !== i[a]))
            return !1
    }
    return !0
}
function wu(e) {
    return e ? e.aliasOf ? e.aliasOf.path : e.path : ""
}
const Su = (e,t,n)=>e != null ? e : t != null ? t : n
  , N0 = Ee({
    name: "RouterView",
    inheritAttrs: !1,
    props: {
        name: {
            type: String,
            default: "default"
        },
        route: Object
    },
    compatConfig: {
        MODE: 3
    },
    setup(e, {attrs: t, slots: n}) {
        const r = Et(rs)
          , i = ne(()=>e.route || r.value)
          , o = Et(_u, 0)
          , a = ne(()=>{
            let u = Mt(o);
            const {matched: c} = i.value;
            let f;
            for (; (f = c[u]) && !f.components; )
                u++;
            return u
        }
        )
          , s = ne(()=>i.value.matched[a.value]);
        rn(_u, ne(()=>a.value + 1)),
        rn(k0, s),
        rn(rs, i);
        const l = oe();
        return he(()=>[l.value, s.value, e.name], ([u,c,f],[h,p,v])=>{
            c && (c.instances[f] = u,
            p && p !== c && u && u === h && (c.leaveGuards.size || (c.leaveGuards = p.leaveGuards),
            c.updateGuards.size || (c.updateGuards = p.updateGuards))),
            u && c && (!p || !Tr(c, p) || !h) && (c.enterCallbacks[f] || []).forEach(E=>E(u))
        }
        , {
            flush: "post"
        }),
        ()=>{
            const u = i.value
              , c = e.name
              , f = s.value
              , h = f && f.components[c];
            if (!h)
                return Tu(n.default, {
                    Component: h,
                    route: u
                });
            const p = f.props[c]
              , v = p ? p === !0 ? u.params : typeof p == "function" ? p(u) : p : null
              , y = wo(h, xe({}, v, t, {
                onVnodeUnmounted: g=>{
                    g.component.isUnmounted && (f.instances[c] = null)
                }
                ,
                ref: l
            }));
            return Tu(n.default, {
                Component: y,
                route: u
            }) || y
        }
    }
});
function Tu(e, t) {
    if (!e)
        return null;
    const n = e(t);
    return n.length === 1 ? n[0] : n
}
const x0 = N0;
function D0(e) {
    const t = l0(e.routes, e)
      , n = e.parseQuery || C0
      , r = e.stringifyQuery || yu
      , i = e.history
      , o = zr()
      , a = zr()
      , s = zr()
      , l = of(yn);
    let u = yn;
    dr && e.scrollBehavior && "scrollRestoration"in history && (history.scrollRestoration = "manual");
    const c = ha.bind(null, P=>"" + P)
      , f = ha.bind(null, T0)
      , h = ha.bind(null, yi);
    function p(P, V) {
        let w, W;
        return Nm(P) ? (w = t.getRecordMatcher(P),
        W = V) : W = P,
        t.addRoute(W, w)
    }
    function v(P) {
        const V = t.getRecordMatcher(P);
        V && t.removeRoute(V)
    }
    function E() {
        return t.getRoutes().map(P=>P.record)
    }
    function y(P) {
        return !!t.getRecordMatcher(P)
    }
    function g(P, V) {
        if (V = xe({}, V || l.value),
        typeof P == "string") {
            const le = ga(n, P, V.path)
              , d = t.resolve({
                path: le.path
            }, V)
              , m = i.createHref(le.fullPath);
            return xe(le, d, {
                params: h(d.params),
                hash: yi(le.hash),
                redirectedFrom: void 0,
                href: m
            })
        }
        let w;
        if ("path"in P)
            w = xe({}, P, {
                path: ga(n, P.path, V.path).path
            });
        else {
            const le = xe({}, P.params);
            for (const d in le)
                le[d] == null && delete le[d];
            w = xe({}, P, {
                params: f(P.params)
            }),
            V.params = f(V.params)
        }
        const W = t.resolve(w, V)
          , X = P.hash || "";
        W.params = c(h(W.params));
        const te = MS(r, xe({}, P, {
            hash: E0(X),
            path: W.path
        }))
          , Z = i.createHref(te);
        return xe({
            fullPath: te,
            hash: X,
            query: r === yu ? O0(P.query) : P.query || {}
        }, W, {
            redirectedFrom: void 0,
            href: Z
        })
    }
    function _(P) {
        return typeof P == "string" ? ga(n, P, l.value.path) : xe({}, P)
    }
    function C(P, V) {
        if (u !== P)
            return Cr(8, {
                from: V,
                to: P
            })
    }
    function S(P) {
        return x(P)
    }
    function A(P) {
        return S(xe(_(P), {
            replace: !0
        }))
    }
    function N(P) {
        const V = P.matched[P.matched.length - 1];
        if (V && V.redirect) {
            const {redirect: w} = V;
            let W = typeof w == "function" ? w(P) : w;
            return typeof W == "string" && (W = W.includes("?") || W.includes("#") ? W = _(W) : {
                path: W
            },
            W.params = {}),
            xe({
                query: P.query,
                hash: P.hash,
                params: "path"in W ? {} : P.params
            }, W)
        }
    }
    function x(P, V) {
        const w = u = g(P)
          , W = l.value
          , X = P.state
          , te = P.force
          , Z = P.replace === !0
          , le = N(w);
        if (le)
            return x(xe(_(le), {
                state: typeof le == "object" ? xe({}, X, le.state) : X,
                force: te,
                replace: Z
            }), V || w);
        const d = w;
        d.redirectedFrom = V;
        let m;
        return !te && FS(r, W, w) && (m = Cr(16, {
            to: d,
            from: W
        }),
        Oe(W, W, !0, !1)),
        (m ? Promise.resolve(m) : M(d, W)).catch(b=>Zt(b) ? Zt(b, 2) ? b : fe(b) : ee(b, d, W)).then(b=>{
            if (b) {
                if (Zt(b, 2))
                    return x(xe({
                        replace: Z
                    }, _(b.to), {
                        state: typeof b.to == "object" ? xe({}, X, b.to.state) : X,
                        force: te
                    }), V || d)
            } else
                b = T(d, W, !0, Z, X);
            return B(d, W, b),
            b
        }
        )
    }
    function O(P, V) {
        const w = C(P, V);
        return w ? Promise.reject(w) : Promise.resolve()
    }
    function M(P, V) {
        let w;
        const [W,X,te] = M0(P, V);
        w = pa(W.reverse(), "beforeRouteLeave", P, V);
        for (const le of W)
            le.leaveGuards.forEach(d=>{
                w.push(Tn(d, P, V))
            }
            );
        const Z = O.bind(null, P, V);
        return w.push(Z),
        sr(w).then(()=>{
            w = [];
            for (const le of o.list())
                w.push(Tn(le, P, V));
            return w.push(Z),
            sr(w)
        }
        ).then(()=>{
            w = pa(X, "beforeRouteUpdate", P, V);
            for (const le of X)
                le.updateGuards.forEach(d=>{
                    w.push(Tn(d, P, V))
                }
                );
            return w.push(Z),
            sr(w)
        }
        ).then(()=>{
            w = [];
            for (const le of P.matched)
                if (le.beforeEnter && !V.matched.includes(le))
                    if ($t(le.beforeEnter))
                        for (const d of le.beforeEnter)
                            w.push(Tn(d, P, V));
                    else
                        w.push(Tn(le.beforeEnter, P, V));
            return w.push(Z),
            sr(w)
        }
        ).then(()=>(P.matched.forEach(le=>le.enterCallbacks = {}),
        w = pa(te, "beforeRouteEnter", P, V),
        w.push(Z),
        sr(w))).then(()=>{
            w = [];
            for (const le of a.list())
                w.push(Tn(le, P, V));
            return w.push(Z),
            sr(w)
        }
        ).catch(le=>Zt(le, 8) ? le : Promise.reject(le))
    }
    function B(P, V, w) {
        for (const W of s.list())
            W(P, V, w)
    }
    function T(P, V, w, W, X) {
        const te = C(P, V);
        if (te)
            return te;
        const Z = V === yn
          , le = dr ? history.state : {};
        w && (W || Z ? i.replace(P.fullPath, xe({
            scroll: Z && le && le.scroll
        }, X)) : i.push(P.fullPath, X)),
        l.value = P,
        Oe(P, V, w, Z),
        fe()
    }
    let I;
    function U() {
        I || (I = i.listen((P,V,w)=>{
            if (!de.listening)
                return;
            const W = g(P)
              , X = N(W);
            if (X) {
                x(xe(X, {
                    replace: !0
                }), W).catch(ro);
                return
            }
            u = W;
            const te = l.value;
            dr && zS(fu(te.fullPath, w.delta), ji()),
            M(W, te).catch(Z=>Zt(Z, 12) ? Z : Zt(Z, 2) ? (x(Z.to, W).then(le=>{
                Zt(le, 20) && !w.delta && w.type === _o.pop && i.go(-1, !1)
            }
            ).catch(ro),
            Promise.reject()) : (w.delta && i.go(-w.delta, !1),
            ee(Z, W, te))).then(Z=>{
                Z = Z || T(W, te, !1),
                Z && (w.delta && !Zt(Z, 8) ? i.go(-w.delta, !1) : w.type === _o.pop && Zt(Z, 20) && i.go(-1, !1)),
                B(W, te, Z)
            }
            ).catch(ro)
        }
        ))
    }
    let ce = zr(), me = zr(), K;
    function ee(P, V, w) {
        fe(P);
        const W = me.list();
        return W.length ? W.forEach(X=>X(P, V, w)) : console.error(P),
        Promise.reject(P)
    }
    function re() {
        return K && l.value !== yn ? Promise.resolve() : new Promise((P,V)=>{
            ce.add([P, V])
        }
        )
    }
    function fe(P) {
        return K || (K = !P,
        U(),
        ce.list().forEach(([V,w])=>P ? w(P) : V()),
        ce.reset()),
        P
    }
    function Oe(P, V, w, W) {
        const {scrollBehavior: X} = e;
        if (!dr || !X)
            return Promise.resolve();
        const te = !w && KS(fu(P.fullPath, 0)) || (W || !w) && history.state && history.state.scroll || null;
        return Be().then(()=>X(P, V, te)).then(Z=>Z && jS(Z)).catch(Z=>ee(Z, P, V))
    }
    const H = P=>i.go(P);
    let F;
    const q = new Set
      , de = {
        currentRoute: l,
        listening: !0,
        addRoute: p,
        removeRoute: v,
        hasRoute: y,
        getRoutes: E,
        resolve: g,
        options: e,
        push: S,
        replace: A,
        go: H,
        back: ()=>H(-1),
        forward: ()=>H(1),
        beforeEach: o.add,
        beforeResolve: a.add,
        afterEach: s.add,
        onError: me.add,
        isReady: re,
        install(P) {
            const V = this;
            P.component("RouterLink", R0),
            P.component("RouterView", x0),
            P.config.globalProperties.$router = V,
            Object.defineProperty(P.config.globalProperties, "$route", {
                enumerable: !0,
                get: ()=>Mt(l)
            }),
            dr && !F && l.value === yn && (F = !0,
            S(i.location).catch(X=>{}
            ));
            const w = {};
            for (const X in yn)
                w[X] = ne(()=>l.value[X]);
            P.provide(Qs, V),
            P.provide(Vm, rt(w)),
            P.provide(rs, l);
            const W = P.unmount;
            q.add(P),
            P.unmount = function() {
                q.delete(P),
                q.size < 1 && (u = yn,
                I && I(),
                I = null,
                l.value = yn,
                F = !1,
                K = !1),
                W()
            }
        }
    };
    return de
}
function sr(e) {
    return e.reduce((t,n)=>t.then(()=>n()), Promise.resolve())
}
function M0(e, t) {
    const n = []
      , r = []
      , i = []
      , o = Math.max(t.matched.length, e.matched.length);
    for (let a = 0; a < o; a++) {
        const s = t.matched[a];
        s && (e.matched.find(u=>Tr(u, s)) ? r.push(s) : n.push(s));
        const l = e.matched[a];
        l && (t.matched.find(u=>Tr(u, l)) || i.push(l))
    }
    return [n, r, i]
}
const F0 = [{
    path: "/boardtest",
    name: "BoardTestView",
    component: ()=>ni(()=>import("./BoardTestView.1646e4b5.js"), ["assets/BoardTestView.1646e4b5.js", "assets/ChessBoard.46291e70.js", "assets/ChessBoard.9232dc69.css", "assets/vschess.function.e5de4338.js"])
}, {
    path: "/vschess",
    name: "vschess",
    component: ()=>ni(()=>import("./VschessTestView.cec5aaa8.js"), ["assets/VschessTestView.cec5aaa8.js", "assets/VschessTestView.b918d83e.css", "assets/vschess.function.e5de4338.js", "assets/xqf.2e5d5959.js"])
}, {
    path: "/:fen*",
    name: "main",
    component: ()=>ni(()=>import("./MainView.7b2ba2e8.js"), ["assets/MainView.7b2ba2e8.js", "assets/MainView.4ccb1b33.css", "assets/vschess.function.e5de4338.js", "assets/xqf.2e5d5959.js", "assets/ChessBoard.46291e70.js", "assets/ChessBoard.9232dc69.css"])
}]
  , $0 = D0({
    history: JS(),
    routes: F0
});
var B0 = typeof globalThis != "undefined" ? globalThis : typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {};
function wC(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
}
function SC(e) {
    throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')
}
var Hm = {
    exports: {}
};
/*!
  * vue-scrollto v2.20.0
  * (c) 2019 Randjelovic Igor
  * @license MIT
  */
(function(e, t) {
    (function(n, r) {
        e.exports = r()
    }
    )(B0, function() {
        function n(H) {
            return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? n = function(F) {
                return typeof F
            }
            : n = function(F) {
                return F && typeof Symbol == "function" && F.constructor === Symbol && F !== Symbol.prototype ? "symbol" : typeof F
            }
            ,
            n(H)
        }
        function r() {
            return r = Object.assign || function(H) {
                for (var F = 1; F < arguments.length; F++) {
                    var q = arguments[F];
                    for (var de in q)
                        Object.prototype.hasOwnProperty.call(q, de) && (H[de] = q[de])
                }
                return H
            }
            ,
            r.apply(this, arguments)
        }
        var i = 4
          , o = .001
          , a = 1e-7
          , s = 10
          , l = 11
          , u = 1 / (l - 1)
          , c = typeof Float32Array == "function";
        function f(H, F) {
            return 1 - 3 * F + 3 * H
        }
        function h(H, F) {
            return 3 * F - 6 * H
        }
        function p(H) {
            return 3 * H
        }
        function v(H, F, q) {
            return ((f(F, q) * H + h(F, q)) * H + p(F)) * H
        }
        function E(H, F, q) {
            return 3 * f(F, q) * H * H + 2 * h(F, q) * H + p(F)
        }
        function y(H, F, q, de, P) {
            var V, w, W = 0;
            do
                w = F + (q - F) / 2,
                V = v(w, de, P) - H,
                V > 0 ? q = w : F = w;
            while (Math.abs(V) > a && ++W < s);
            return w
        }
        function g(H, F, q, de) {
            for (var P = 0; P < i; ++P) {
                var V = E(F, q, de);
                if (V === 0)
                    return F;
                var w = v(F, q, de) - H;
                F -= w / V
            }
            return F
        }
        function _(H) {
            return H
        }
        var C = function(F, q, de, P) {
            if (!(0 <= F && F <= 1 && 0 <= de && de <= 1))
                throw new Error("bezier x values must be in [0, 1] range");
            if (F === q && de === P)
                return _;
            for (var V = c ? new Float32Array(l) : new Array(l), w = 0; w < l; ++w)
                V[w] = v(w * u, F, de);
            function W(X) {
                for (var te = 0, Z = 1, le = l - 1; Z !== le && V[Z] <= X; ++Z)
                    te += u;
                --Z;
                var d = (X - V[Z]) / (V[Z + 1] - V[Z])
                  , m = te + d * u
                  , b = E(m, F, de);
                return b >= o ? g(X, m, F, de) : b === 0 ? m : y(X, te, te + u, F, de)
            }
            return function(te) {
                return te === 0 ? 0 : te === 1 ? 1 : v(W(te), q, P)
            }
        }
          , S = {
            ease: [.25, .1, .25, 1],
            linear: [0, 0, 1, 1],
            "ease-in": [.42, 0, 1, 1],
            "ease-out": [0, 0, .58, 1],
            "ease-in-out": [.42, 0, .58, 1]
        }
          , A = !1;
        try {
            var N = Object.defineProperty({}, "passive", {
                get: function() {
                    A = !0
                }
            });
            window.addEventListener("test", null, N)
        } catch {}
        var x = {
            $: function(F) {
                return typeof F != "string" ? F : document.querySelector(F)
            },
            on: function(F, q, de) {
                var P = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {
                    passive: !1
                };
                q instanceof Array || (q = [q]);
                for (var V = 0; V < q.length; V++)
                    F.addEventListener(q[V], de, A ? P : !1)
            },
            off: function(F, q, de) {
                q instanceof Array || (q = [q]);
                for (var P = 0; P < q.length; P++)
                    F.removeEventListener(q[P], de)
            },
            cumulativeOffset: function(F) {
                var q = 0
                  , de = 0;
                do
                    q += F.offsetTop || 0,
                    de += F.offsetLeft || 0,
                    F = F.offsetParent;
                while (F);
                return {
                    top: q,
                    left: de
                }
            }
        }
          , O = ["mousedown", "wheel", "DOMMouseScroll", "mousewheel", "keyup", "touchmove"]
          , M = {
            container: "body",
            duration: 500,
            lazy: !0,
            easing: "ease",
            offset: 0,
            force: !0,
            cancelable: !0,
            onStart: !1,
            onDone: !1,
            onCancel: !1,
            x: !1,
            y: !0
        };
        function B(H) {
            M = r({}, M, H)
        }
        var T = function() {
            var F, q, de, P, V, w, W, X, te, Z, le, d, m, b, L, D, j, Q, G, J, Y, ie, R, $ = function(ze) {
                !X || (R = ze,
                J = !0)
            }, ae, ue, Se, Te;
            function Ie(Fe) {
                var ze = Fe.scrollTop;
                return Fe.tagName.toLowerCase() === "body" && (ze = ze || document.documentElement.scrollTop),
                ze
            }
            function ut(Fe) {
                var ze = Fe.scrollLeft;
                return Fe.tagName.toLowerCase() === "body" && (ze = ze || document.documentElement.scrollLeft),
                ze
            }
            function Vt() {
                Y = x.cumulativeOffset(q),
                ie = x.cumulativeOffset(F),
                d && (L = ie.left - Y.left + w,
                Q = L - b),
                m && (j = ie.top - Y.top + w,
                G = j - D)
            }
            function Fr(Fe) {
                if (J)
                    return mn();
                ue || (ue = Fe),
                V || Vt(),
                Se = Fe - ue,
                Te = Math.min(Se / de, 1),
                Te = ae(Te),
                $r(q, D + G * Te, b + Q * Te),
                Se < de ? window.requestAnimationFrame(Fr) : mn()
            }
            function mn() {
                J || $r(q, j, L),
                ue = !1,
                x.off(q, O, $),
                J && le && le(R, F),
                !J && Z && Z(F)
            }
            function $r(Fe, ze, He) {
                m && (Fe.scrollTop = ze),
                d && (Fe.scrollLeft = He),
                Fe.tagName.toLowerCase() === "body" && (m && (document.documentElement.scrollTop = ze),
                d && (document.documentElement.scrollLeft = He))
            }
            function ft(Fe, ze) {
                var He = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                if (n(ze) === "object" ? He = ze : typeof ze == "number" && (He.duration = ze),
                F = x.$(Fe),
                !F)
                    return console.warn("[vue-scrollto warn]: Trying to scroll to an element that is not on the page: " + Fe);
                if (q = x.$(He.container || M.container),
                de = He.hasOwnProperty("duration") ? He.duration : M.duration,
                V = He.hasOwnProperty("lazy") ? He.lazy : M.lazy,
                P = He.easing || M.easing,
                w = He.hasOwnProperty("offset") ? He.offset : M.offset,
                W = He.hasOwnProperty("force") ? He.force !== !1 : M.force,
                X = He.hasOwnProperty("cancelable") ? He.cancelable !== !1 : M.cancelable,
                te = He.onStart || M.onStart,
                Z = He.onDone || M.onDone,
                le = He.onCancel || M.onCancel,
                d = He.x === void 0 ? M.x : He.x,
                m = He.y === void 0 ? M.y : He.y,
                typeof w == "function" && (w = w(F, q)),
                b = ut(q),
                D = Ie(q),
                Vt(),
                J = !1,
                !W) {
                    var uh = q.tagName.toLowerCase() === "body" ? document.documentElement.clientHeight || window.innerHeight : q.offsetHeight
                      , al = D
                      , fh = al + uh
                      , sl = j - w
                      , dh = sl + F.offsetHeight;
                    if (sl >= al && dh <= fh) {
                        Z && Z(F);
                        return
                    }
                }
                if (te && te(F),
                !G && !Q) {
                    Z && Z(F);
                    return
                }
                return typeof P == "string" && (P = S[P] || S.ease),
                ae = C.apply(C, P),
                x.on(q, O, $, {
                    passive: !0
                }),
                window.requestAnimationFrame(Fr),
                function() {
                    R = null,
                    J = !0
                }
            }
            return ft
        }
          , I = T()
          , U = [];
        function ce(H) {
            for (var F = 0; F < U.length; ++F)
                if (U[F].el === H)
                    return U.splice(F, 1),
                    !0;
            return !1
        }
        function me(H) {
            for (var F = 0; F < U.length; ++F)
                if (U[F].el === H)
                    return U[F]
        }
        function K(H) {
            var F = me(H);
            return F || (U.push(F = {
                el: H,
                binding: {}
            }),
            F)
        }
        function ee(H) {
            var F = K(this).binding;
            if (!!F.value) {
                if (H.preventDefault(),
                typeof F.value == "string")
                    return I(F.value);
                I(F.value.el || F.value.element, F.value)
            }
        }
        var re = {
            bind: function(F, q) {
                K(F).binding = q,
                x.on(F, "click", ee)
            },
            unbind: function(F) {
                ce(F),
                x.off(F, "click", ee)
            },
            update: function(F, q) {
                K(F).binding = q
            }
        }
          , fe = {
            bind: re.bind,
            unbind: re.unbind,
            update: re.update,
            beforeMount: re.bind,
            unmounted: re.unbind,
            updated: re.update,
            scrollTo: I,
            bindings: U
        }
          , Oe = function(F, q) {
            q && B(q),
            F.directive("scroll-to", fe);
            var de = F.config.globalProperties || F.prototype;
            de.$scrollTo = fe.scrollTo
        };
        return typeof window != "undefined" && window.Vue && (window.VueScrollTo = fe,
        window.VueScrollTo.setDefaults = B,
        window.VueScrollTo.scroller = T,
        window.Vue.use && window.Vue.use(Oe)),
        fe.install = Oe,
        fe
    })
}
)(Hm);
var U0 = Hm.exports;
function Wm(e, t) {
    return function() {
        return e.apply(t, arguments)
    }
}
const {toString: V0} = Object.prototype
  , {getPrototypeOf: el} = Object
  , zi = (e=>t=>{
    const n = V0.call(t);
    return e[n] || (e[n] = n.slice(8, -1).toLowerCase())
}
)(Object.create(null))
  , Gt = e=>(e = e.toLowerCase(),
t=>zi(t) === e)
  , Ki = e=>t=>typeof t === e
  , {isArray: Mr} = Array
  , Eo = Ki("undefined");
function H0(e) {
    return e !== null && !Eo(e) && e.constructor !== null && !Eo(e.constructor) && Lt(e.constructor.isBuffer) && e.constructor.isBuffer(e)
}
const jm = Gt("ArrayBuffer");
function W0(e) {
    let t;
    return typeof ArrayBuffer != "undefined" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && jm(e.buffer),
    t
}
const j0 = Ki("string")
  , Lt = Ki("function")
  , zm = Ki("number")
  , Yi = e=>e !== null && typeof e == "object"
  , z0 = e=>e === !0 || e === !1
  , ri = e=>{
    if (zi(e) !== "object")
        return !1;
    const t = el(e);
    return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e)
}
  , K0 = Gt("Date")
  , Y0 = Gt("File")
  , q0 = Gt("Blob")
  , G0 = Gt("FileList")
  , X0 = e=>Yi(e) && Lt(e.pipe)
  , J0 = e=>{
    let t;
    return e && (typeof FormData == "function" && e instanceof FormData || Lt(e.append) && ((t = zi(e)) === "formdata" || t === "object" && Lt(e.toString) && e.toString() === "[object FormData]"))
}
  , Z0 = Gt("URLSearchParams")
  , Q0 = e=>e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Io(e, t, {allOwnKeys: n=!1}={}) {
    if (e === null || typeof e == "undefined")
        return;
    let r, i;
    if (typeof e != "object" && (e = [e]),
    Mr(e))
        for (r = 0,
        i = e.length; r < i; r++)
            t.call(null, e[r], r, e);
    else {
        const o = n ? Object.getOwnPropertyNames(e) : Object.keys(e)
          , a = o.length;
        let s;
        for (r = 0; r < a; r++)
            s = o[r],
            t.call(null, e[s], s, e)
    }
}
function Km(e, t) {
    t = t.toLowerCase();
    const n = Object.keys(e);
    let r = n.length, i;
    for (; r-- > 0; )
        if (i = n[r],
        t === i.toLowerCase())
            return i;
    return null
}
const Ym = (()=>typeof globalThis != "undefined" ? globalThis : typeof self != "undefined" ? self : typeof window != "undefined" ? window : global)()
  , qm = e=>!Eo(e) && e !== Ym;
function os() {
    const {caseless: e} = qm(this) && this || {}
      , t = {}
      , n = (r,i)=>{
        const o = e && Km(t, i) || i;
        ri(t[o]) && ri(r) ? t[o] = os(t[o], r) : ri(r) ? t[o] = os({}, r) : Mr(r) ? t[o] = r.slice() : t[o] = r
    }
    ;
    for (let r = 0, i = arguments.length; r < i; r++)
        arguments[r] && Io(arguments[r], n);
    return t
}
const eT = (e,t,n,{allOwnKeys: r}={})=>(Io(t, (i,o)=>{
    n && Lt(i) ? e[o] = Wm(i, n) : e[o] = i
}
, {
    allOwnKeys: r
}),
e)
  , tT = e=>(e.charCodeAt(0) === 65279 && (e = e.slice(1)),
e)
  , nT = (e,t,n,r)=>{
    e.prototype = Object.create(t.prototype, r),
    e.prototype.constructor = e,
    Object.defineProperty(e, "super", {
        value: t.prototype
    }),
    n && Object.assign(e.prototype, n)
}
  , rT = (e,t,n,r)=>{
    let i, o, a;
    const s = {};
    if (t = t || {},
    e == null)
        return t;
    do {
        for (i = Object.getOwnPropertyNames(e),
        o = i.length; o-- > 0; )
            a = i[o],
            (!r || r(a, e, t)) && !s[a] && (t[a] = e[a],
            s[a] = !0);
        e = n !== !1 && el(e)
    } while (e && (!n || n(e, t)) && e !== Object.prototype);
    return t
}
  , oT = (e,t,n)=>{
    e = String(e),
    (n === void 0 || n > e.length) && (n = e.length),
    n -= t.length;
    const r = e.indexOf(t, n);
    return r !== -1 && r === n
}
  , iT = e=>{
    if (!e)
        return null;
    if (Mr(e))
        return e;
    let t = e.length;
    if (!zm(t))
        return null;
    const n = new Array(t);
    for (; t-- > 0; )
        n[t] = e[t];
    return n
}
  , aT = (e=>t=>e && t instanceof e)(typeof Uint8Array != "undefined" && el(Uint8Array))
  , sT = (e,t)=>{
    const r = (e && e[Symbol.iterator]).call(e);
    let i;
    for (; (i = r.next()) && !i.done; ) {
        const o = i.value;
        t.call(e, o[0], o[1])
    }
}
  , lT = (e,t)=>{
    let n;
    const r = [];
    for (; (n = e.exec(t)) !== null; )
        r.push(n);
    return r
}
  , cT = Gt("HTMLFormElement")
  , uT = e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function(n, r, i) {
    return r.toUpperCase() + i
})
  , Cu = (({hasOwnProperty: e})=>(t,n)=>e.call(t, n))(Object.prototype)
  , fT = Gt("RegExp")
  , Gm = (e,t)=>{
    const n = Object.getOwnPropertyDescriptors(e)
      , r = {};
    Io(n, (i,o)=>{
        let a;
        (a = t(i, o, e)) !== !1 && (r[o] = a || i)
    }
    ),
    Object.defineProperties(e, r)
}
  , dT = e=>{
    Gm(e, (t,n)=>{
        if (Lt(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
            return !1;
        const r = e[n];
        if (!!Lt(r)) {
            if (t.enumerable = !1,
            "writable"in t) {
                t.writable = !1;
                return
            }
            t.set || (t.set = ()=>{
                throw Error("Can not rewrite read-only method '" + n + "'")
            }
            )
        }
    }
    )
}
  , mT = (e,t)=>{
    const n = {}
      , r = i=>{
        i.forEach(o=>{
            n[o] = !0
        }
        )
    }
    ;
    return Mr(e) ? r(e) : r(String(e).split(t)),
    n
}
  , hT = ()=>{}
  , gT = (e,t)=>(e = +e,
Number.isFinite(e) ? e : t)
  , va = "abcdefghijklmnopqrstuvwxyz"
  , Ou = "0123456789"
  , Xm = {
    DIGIT: Ou,
    ALPHA: va,
    ALPHA_DIGIT: va + va.toUpperCase() + Ou
}
  , pT = (e=16,t=Xm.ALPHA_DIGIT)=>{
    let n = "";
    const {length: r} = t;
    for (; e--; )
        n += t[Math.random() * r | 0];
    return n
}
;
function vT(e) {
    return !!(e && Lt(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator])
}
const bT = e=>{
    const t = new Array(10)
      , n = (r,i)=>{
        if (Yi(r)) {
            if (t.indexOf(r) >= 0)
                return;
            if (!("toJSON"in r)) {
                t[i] = r;
                const o = Mr(r) ? [] : {};
                return Io(r, (a,s)=>{
                    const l = n(a, i + 1);
                    !Eo(l) && (o[s] = l)
                }
                ),
                t[i] = void 0,
                o
            }
        }
        return r
    }
    ;
    return n(e, 0)
}
  , yT = Gt("AsyncFunction")
  , _T = e=>e && (Yi(e) || Lt(e)) && Lt(e.then) && Lt(e.catch);
var z = {
    isArray: Mr,
    isArrayBuffer: jm,
    isBuffer: H0,
    isFormData: J0,
    isArrayBufferView: W0,
    isString: j0,
    isNumber: zm,
    isBoolean: z0,
    isObject: Yi,
    isPlainObject: ri,
    isUndefined: Eo,
    isDate: K0,
    isFile: Y0,
    isBlob: q0,
    isRegExp: fT,
    isFunction: Lt,
    isStream: X0,
    isURLSearchParams: Z0,
    isTypedArray: aT,
    isFileList: G0,
    forEach: Io,
    merge: os,
    extend: eT,
    trim: Q0,
    stripBOM: tT,
    inherits: nT,
    toFlatObject: rT,
    kindOf: zi,
    kindOfTest: Gt,
    endsWith: oT,
    toArray: iT,
    forEachEntry: sT,
    matchAll: lT,
    isHTMLForm: cT,
    hasOwnProperty: Cu,
    hasOwnProp: Cu,
    reduceDescriptors: Gm,
    freezeMethods: dT,
    toObjectSet: mT,
    toCamelCase: uT,
    noop: hT,
    toFiniteNumber: gT,
    findKey: Km,
    global: Ym,
    isContextDefined: qm,
    ALPHABET: Xm,
    generateString: pT,
    isSpecCompliantForm: vT,
    toJSONObject: bT,
    isAsyncFn: yT,
    isThenable: _T
};
function Re(e, t, n, r, i) {
    Error.call(this),
    Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack,
    this.message = e,
    this.name = "AxiosError",
    t && (this.code = t),
    n && (this.config = n),
    r && (this.request = r),
    i && (this.response = i)
}
z.inherits(Re, Error, {
    toJSON: function() {
        return {
            message: this.message,
            name: this.name,
            description: this.description,
            number: this.number,
            fileName: this.fileName,
            lineNumber: this.lineNumber,
            columnNumber: this.columnNumber,
            stack: this.stack,
            config: z.toJSONObject(this.config),
            code: this.code,
            status: this.response && this.response.status ? this.response.status : null
        }
    }
});
const Jm = Re.prototype
  , Zm = {};
["ERR_BAD_OPTION_VALUE", "ERR_BAD_OPTION", "ECONNABORTED", "ETIMEDOUT", "ERR_NETWORK", "ERR_FR_TOO_MANY_REDIRECTS", "ERR_DEPRECATED", "ERR_BAD_RESPONSE", "ERR_BAD_REQUEST", "ERR_CANCELED", "ERR_NOT_SUPPORT", "ERR_INVALID_URL"].forEach(e=>{
    Zm[e] = {
        value: e
    }
}
);
Object.defineProperties(Re, Zm);
Object.defineProperty(Jm, "isAxiosError", {
    value: !0
});
Re.from = (e,t,n,r,i,o)=>{
    const a = Object.create(Jm);
    return z.toFlatObject(e, a, function(l) {
        return l !== Error.prototype
    }, s=>s !== "isAxiosError"),
    Re.call(a, e.message, t, n, r, i),
    a.cause = e,
    a.name = e.name,
    o && Object.assign(a, o),
    a
}
;
var ET = null;
function is(e) {
    return z.isPlainObject(e) || z.isArray(e)
}
function Qm(e) {
    return z.endsWith(e, "[]") ? e.slice(0, -2) : e
}
function ku(e, t, n) {
    return e ? e.concat(t).map(function(i, o) {
        return i = Qm(i),
        !n && o ? "[" + i + "]" : i
    }).join(n ? "." : "") : t
}
function wT(e) {
    return z.isArray(e) && !e.some(is)
}
const ST = z.toFlatObject(z, {}, null, function(t) {
    return /^is[A-Z]/.test(t)
});
function qi(e, t, n) {
    if (!z.isObject(e))
        throw new TypeError("target must be an object");
    t = t || new FormData,
    n = z.toFlatObject(n, {
        metaTokens: !0,
        dots: !1,
        indexes: !1
    }, !1, function(E, y) {
        return !z.isUndefined(y[E])
    });
    const r = n.metaTokens
      , i = n.visitor || c
      , o = n.dots
      , a = n.indexes
      , l = (n.Blob || typeof Blob != "undefined" && Blob) && z.isSpecCompliantForm(t);
    if (!z.isFunction(i))
        throw new TypeError("visitor must be a function");
    function u(v) {
        if (v === null)
            return "";
        if (z.isDate(v))
            return v.toISOString();
        if (!l && z.isBlob(v))
            throw new Re("Blob is not supported. Use a Buffer instead.");
        return z.isArrayBuffer(v) || z.isTypedArray(v) ? l && typeof Blob == "function" ? new Blob([v]) : Buffer.from(v) : v
    }
    function c(v, E, y) {
        let g = v;
        if (v && !y && typeof v == "object") {
            if (z.endsWith(E, "{}"))
                E = r ? E : E.slice(0, -2),
                v = JSON.stringify(v);
            else if (z.isArray(v) && wT(v) || (z.isFileList(v) || z.endsWith(E, "[]")) && (g = z.toArray(v)))
                return E = Qm(E),
                g.forEach(function(C, S) {
                    !(z.isUndefined(C) || C === null) && t.append(a === !0 ? ku([E], S, o) : a === null ? E : E + "[]", u(C))
                }),
                !1
        }
        return is(v) ? !0 : (t.append(ku(y, E, o), u(v)),
        !1)
    }
    const f = []
      , h = Object.assign(ST, {
        defaultVisitor: c,
        convertValue: u,
        isVisitable: is
    });
    function p(v, E) {
        if (!z.isUndefined(v)) {
            if (f.indexOf(v) !== -1)
                throw Error("Circular reference detected in " + E.join("."));
            f.push(v),
            z.forEach(v, function(g, _) {
                (!(z.isUndefined(g) || g === null) && i.call(t, g, z.isString(_) ? _.trim() : _, E, h)) === !0 && p(g, E ? E.concat(_) : [_])
            }),
            f.pop()
        }
    }
    if (!z.isObject(e))
        throw new TypeError("data must be an object");
    return p(e),
    t
}
function Iu(e) {
    const t = {
        "!": "%21",
        "'": "%27",
        "(": "%28",
        ")": "%29",
        "~": "%7E",
        "%20": "+",
        "%00": "\0"
    };
    return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(r) {
        return t[r]
    })
}
function tl(e, t) {
    this._pairs = [],
    e && qi(e, this, t)
}
const eh = tl.prototype;
eh.append = function(t, n) {
    this._pairs.push([t, n])
}
;
eh.toString = function(t) {
    const n = t ? function(r) {
        return t.call(this, r, Iu)
    }
    : Iu;
    return this._pairs.map(function(i) {
        return n(i[0]) + "=" + n(i[1])
    }, "").join("&")
}
;
function TT(e) {
    return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
}
function th(e, t, n) {
    if (!t)
        return e;
    const r = n && n.encode || TT
      , i = n && n.serialize;
    let o;
    if (i ? o = i(t, n) : o = z.isURLSearchParams(t) ? t.toString() : new tl(t,n).toString(r),
    o) {
        const a = e.indexOf("#");
        a !== -1 && (e = e.slice(0, a)),
        e += (e.indexOf("?") === -1 ? "?" : "&") + o
    }
    return e
}
class CT {
    constructor() {
        this.handlers = []
    }
    use(t, n, r) {
        return this.handlers.push({
            fulfilled: t,
            rejected: n,
            synchronous: r ? r.synchronous : !1,
            runWhen: r ? r.runWhen : null
        }),
        this.handlers.length - 1
    }
    eject(t) {
        this.handlers[t] && (this.handlers[t] = null)
    }
    clear() {
        this.handlers && (this.handlers = [])
    }
    forEach(t) {
        z.forEach(this.handlers, function(r) {
            r !== null && t(r)
        })
    }
}
var Pu = CT
  , nh = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1
}
  , OT = typeof URLSearchParams != "undefined" ? URLSearchParams : tl
  , kT = typeof FormData != "undefined" ? FormData : null
  , IT = typeof Blob != "undefined" ? Blob : null
  , PT = {
    isBrowser: !0,
    classes: {
        URLSearchParams: OT,
        FormData: kT,
        Blob: IT
    },
    protocols: ["http", "https", "file", "blob", "url", "data"]
};
const rh = typeof window != "undefined" && typeof document != "undefined"
  , RT = (e=>rh && ["ReactNative", "NativeScript", "NS"].indexOf(e) < 0)(typeof navigator != "undefined" && navigator.product)
  , LT = (()=>typeof WorkerGlobalScope != "undefined" && self instanceof WorkerGlobalScope && typeof self.importScripts == "function")();
var AT = Object.freeze(Object.defineProperty({
    __proto__: null,
    hasBrowserEnv: rh,
    hasStandardBrowserWebWorkerEnv: LT,
    hasStandardBrowserEnv: RT
}, Symbol.toStringTag, {
    value: "Module"
}))
  , Kt = {
    ...AT,
    ...PT
};
function NT(e, t) {
    return qi(e, new Kt.classes.URLSearchParams, Object.assign({
        visitor: function(n, r, i, o) {
            return Kt.isNode && z.isBuffer(n) ? (this.append(r, n.toString("base64")),
            !1) : o.defaultVisitor.apply(this, arguments)
        }
    }, t))
}
function xT(e) {
    return z.matchAll(/\w+|\[(\w*)]/g, e).map(t=>t[0] === "[]" ? "" : t[1] || t[0])
}
function DT(e) {
    const t = {}
      , n = Object.keys(e);
    let r;
    const i = n.length;
    let o;
    for (r = 0; r < i; r++)
        o = n[r],
        t[o] = e[o];
    return t
}
function oh(e) {
    function t(n, r, i, o) {
        let a = n[o++];
        if (a === "__proto__")
            return !0;
        const s = Number.isFinite(+a)
          , l = o >= n.length;
        return a = !a && z.isArray(i) ? i.length : a,
        l ? (z.hasOwnProp(i, a) ? i[a] = [i[a], r] : i[a] = r,
        !s) : ((!i[a] || !z.isObject(i[a])) && (i[a] = []),
        t(n, r, i[a], o) && z.isArray(i[a]) && (i[a] = DT(i[a])),
        !s)
    }
    if (z.isFormData(e) && z.isFunction(e.entries)) {
        const n = {};
        return z.forEachEntry(e, (r,i)=>{
            t(xT(r), i, n, 0)
        }
        ),
        n
    }
    return null
}
function MT(e, t, n) {
    if (z.isString(e))
        try {
            return (t || JSON.parse)(e),
            z.trim(e)
        } catch (r) {
            if (r.name !== "SyntaxError")
                throw r
        }
    return (n || JSON.stringify)(e)
}
const nl = {
    transitional: nh,
    adapter: ["xhr", "http"],
    transformRequest: [function(t, n) {
        const r = n.getContentType() || ""
          , i = r.indexOf("application/json") > -1
          , o = z.isObject(t);
        if (o && z.isHTMLForm(t) && (t = new FormData(t)),
        z.isFormData(t))
            return i ? JSON.stringify(oh(t)) : t;
        if (z.isArrayBuffer(t) || z.isBuffer(t) || z.isStream(t) || z.isFile(t) || z.isBlob(t))
            return t;
        if (z.isArrayBufferView(t))
            return t.buffer;
        if (z.isURLSearchParams(t))
            return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1),
            t.toString();
        let s;
        if (o) {
            if (r.indexOf("application/x-www-form-urlencoded") > -1)
                return NT(t, this.formSerializer).toString();
            if ((s = z.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
                const l = this.env && this.env.FormData;
                return qi(s ? {
                    "files[]": t
                } : t, l && new l, this.formSerializer)
            }
        }
        return o || i ? (n.setContentType("application/json", !1),
        MT(t)) : t
    }
    ],
    transformResponse: [function(t) {
        const n = this.transitional || nl.transitional
          , r = n && n.forcedJSONParsing
          , i = this.responseType === "json";
        if (t && z.isString(t) && (r && !this.responseType || i)) {
            const a = !(n && n.silentJSONParsing) && i;
            try {
                return JSON.parse(t)
            } catch (s) {
                if (a)
                    throw s.name === "SyntaxError" ? Re.from(s, Re.ERR_BAD_RESPONSE, this, null, this.response) : s
            }
        }
        return t
    }
    ],
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {
        FormData: Kt.classes.FormData,
        Blob: Kt.classes.Blob
    },
    validateStatus: function(t) {
        return t >= 200 && t < 300
    },
    headers: {
        common: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": void 0
        }
    }
};
z.forEach(["delete", "get", "head", "post", "put", "patch"], e=>{
    nl.headers[e] = {}
}
);
var rl = nl;
const FT = z.toObjectSet(["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"]);
var $T = e=>{
    const t = {};
    let n, r, i;
    return e && e.split(`
`).forEach(function(a) {
        i = a.indexOf(":"),
        n = a.substring(0, i).trim().toLowerCase(),
        r = a.substring(i + 1).trim(),
        !(!n || t[n] && FT[n]) && (n === "set-cookie" ? t[n] ? t[n].push(r) : t[n] = [r] : t[n] = t[n] ? t[n] + ", " + r : r)
    }),
    t
}
;
const Ru = Symbol("internals");
function Kr(e) {
    return e && String(e).trim().toLowerCase()
}
function oi(e) {
    return e === !1 || e == null ? e : z.isArray(e) ? e.map(oi) : String(e)
}
function BT(e) {
    const t = Object.create(null)
      , n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
    let r;
    for (; r = n.exec(e); )
        t[r[1]] = r[2];
    return t
}
const UT = e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function ba(e, t, n, r, i) {
    if (z.isFunction(r))
        return r.call(this, t, n);
    if (i && (t = n),
    !!z.isString(t)) {
        if (z.isString(r))
            return t.indexOf(r) !== -1;
        if (z.isRegExp(r))
            return r.test(t)
    }
}
function VT(e) {
    return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t,n,r)=>n.toUpperCase() + r)
}
function HT(e, t) {
    const n = z.toCamelCase(" " + t);
    ["get", "set", "has"].forEach(r=>{
        Object.defineProperty(e, r + n, {
            value: function(i, o, a) {
                return this[r].call(this, t, i, o, a)
            },
            configurable: !0
        })
    }
    )
}
class Gi {
    constructor(t) {
        t && this.set(t)
    }
    set(t, n, r) {
        const i = this;
        function o(s, l, u) {
            const c = Kr(l);
            if (!c)
                throw new Error("header name must be a non-empty string");
            const f = z.findKey(i, c);
            (!f || i[f] === void 0 || u === !0 || u === void 0 && i[f] !== !1) && (i[f || l] = oi(s))
        }
        const a = (s,l)=>z.forEach(s, (u,c)=>o(u, c, l));
        return z.isPlainObject(t) || t instanceof this.constructor ? a(t, n) : z.isString(t) && (t = t.trim()) && !UT(t) ? a($T(t), n) : t != null && o(n, t, r),
        this
    }
    get(t, n) {
        if (t = Kr(t),
        t) {
            const r = z.findKey(this, t);
            if (r) {
                const i = this[r];
                if (!n)
                    return i;
                if (n === !0)
                    return BT(i);
                if (z.isFunction(n))
                    return n.call(this, i, r);
                if (z.isRegExp(n))
                    return n.exec(i);
                throw new TypeError("parser must be boolean|regexp|function")
            }
        }
    }
    has(t, n) {
        if (t = Kr(t),
        t) {
            const r = z.findKey(this, t);
            return !!(r && this[r] !== void 0 && (!n || ba(this, this[r], r, n)))
        }
        return !1
    }
    delete(t, n) {
        const r = this;
        let i = !1;
        function o(a) {
            if (a = Kr(a),
            a) {
                const s = z.findKey(r, a);
                s && (!n || ba(r, r[s], s, n)) && (delete r[s],
                i = !0)
            }
        }
        return z.isArray(t) ? t.forEach(o) : o(t),
        i
    }
    clear(t) {
        const n = Object.keys(this);
        let r = n.length
          , i = !1;
        for (; r--; ) {
            const o = n[r];
            (!t || ba(this, this[o], o, t, !0)) && (delete this[o],
            i = !0)
        }
        return i
    }
    normalize(t) {
        const n = this
          , r = {};
        return z.forEach(this, (i,o)=>{
            const a = z.findKey(r, o);
            if (a) {
                n[a] = oi(i),
                delete n[o];
                return
            }
            const s = t ? VT(o) : String(o).trim();
            s !== o && delete n[o],
            n[s] = oi(i),
            r[s] = !0
        }
        ),
        this
    }
    concat(...t) {
        return this.constructor.concat(this, ...t)
    }
    toJSON(t) {
        const n = Object.create(null);
        return z.forEach(this, (r,i)=>{
            r != null && r !== !1 && (n[i] = t && z.isArray(r) ? r.join(", ") : r)
        }
        ),
        n
    }
    [Symbol.iterator]() {
        return Object.entries(this.toJSON())[Symbol.iterator]()
    }
    toString() {
        return Object.entries(this.toJSON()).map(([t,n])=>t + ": " + n).join(`
`)
    }
    get[Symbol.toStringTag]() {
        return "AxiosHeaders"
    }
    static from(t) {
        return t instanceof this ? t : new this(t)
    }
    static concat(t, ...n) {
        const r = new this(t);
        return n.forEach(i=>r.set(i)),
        r
    }
    static accessor(t) {
        const r = (this[Ru] = this[Ru] = {
            accessors: {}
        }).accessors
          , i = this.prototype;
        function o(a) {
            const s = Kr(a);
            r[s] || (HT(i, a),
            r[s] = !0)
        }
        return z.isArray(t) ? t.forEach(o) : o(t),
        this
    }
}
Gi.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
z.reduceDescriptors(Gi.prototype, ({value: e},t)=>{
    let n = t[0].toUpperCase() + t.slice(1);
    return {
        get: ()=>e,
        set(r) {
            this[n] = r
        }
    }
}
);
z.freezeMethods(Gi);
var an = Gi;
function ya(e, t) {
    const n = this || rl
      , r = t || n
      , i = an.from(r.headers);
    let o = r.data;
    return z.forEach(e, function(s) {
        o = s.call(n, o, i.normalize(), t ? t.status : void 0)
    }),
    i.normalize(),
    o
}
function ih(e) {
    return !!(e && e.__CANCEL__)
}
function Po(e, t, n) {
    Re.call(this, e == null ? "canceled" : e, Re.ERR_CANCELED, t, n),
    this.name = "CanceledError"
}
z.inherits(Po, Re, {
    __CANCEL__: !0
});
function WT(e, t, n) {
    const r = n.config.validateStatus;
    !n.status || !r || r(n.status) ? e(n) : t(new Re("Request failed with status code " + n.status,[Re.ERR_BAD_REQUEST, Re.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],n.config,n.request,n))
}
var jT = Kt.hasStandardBrowserEnv ? {
    write(e, t, n, r, i, o) {
        const a = [e + "=" + encodeURIComponent(t)];
        z.isNumber(n) && a.push("expires=" + new Date(n).toGMTString()),
        z.isString(r) && a.push("path=" + r),
        z.isString(i) && a.push("domain=" + i),
        o === !0 && a.push("secure"),
        document.cookie = a.join("; ")
    },
    read(e) {
        const t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
        return t ? decodeURIComponent(t[3]) : null
    },
    remove(e) {
        this.write(e, "", Date.now() - 864e5)
    }
} : {
    write() {},
    read() {
        return null
    },
    remove() {}
};
function zT(e) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)
}
function KT(e, t) {
    return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e
}
function ah(e, t) {
    return e && !zT(t) ? KT(e, t) : t
}
var YT = Kt.hasStandardBrowserEnv ? function() {
    const t = /(msie|trident)/i.test(navigator.userAgent)
      , n = document.createElement("a");
    let r;
    function i(o) {
        let a = o;
        return t && (n.setAttribute("href", a),
        a = n.href),
        n.setAttribute("href", a),
        {
            href: n.href,
            protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
            host: n.host,
            search: n.search ? n.search.replace(/^\?/, "") : "",
            hash: n.hash ? n.hash.replace(/^#/, "") : "",
            hostname: n.hostname,
            port: n.port,
            pathname: n.pathname.charAt(0) === "/" ? n.pathname : "/" + n.pathname
        }
    }
    return r = i(window.location.href),
    function(a) {
        const s = z.isString(a) ? i(a) : a;
        return s.protocol === r.protocol && s.host === r.host
    }
}() : function() {
    return function() {
        return !0
    }
}();
function qT(e) {
    const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
    return t && t[1] || ""
}
function GT(e, t) {
    e = e || 10;
    const n = new Array(e)
      , r = new Array(e);
    let i = 0, o = 0, a;
    return t = t !== void 0 ? t : 1e3,
    function(l) {
        const u = Date.now()
          , c = r[o];
        a || (a = u),
        n[i] = l,
        r[i] = u;
        let f = o
          , h = 0;
        for (; f !== i; )
            h += n[f++],
            f = f % e;
        if (i = (i + 1) % e,
        i === o && (o = (o + 1) % e),
        u - a < t)
            return;
        const p = c && u - c;
        return p ? Math.round(h * 1e3 / p) : void 0
    }
}
function Lu(e, t) {
    let n = 0;
    const r = GT(50, 250);
    return i=>{
        const o = i.loaded
          , a = i.lengthComputable ? i.total : void 0
          , s = o - n
          , l = r(s)
          , u = o <= a;
        n = o;
        const c = {
            loaded: o,
            total: a,
            progress: a ? o / a : void 0,
            bytes: s,
            rate: l || void 0,
            estimated: l && a && u ? (a - o) / l : void 0,
            event: i
        };
        c[t ? "download" : "upload"] = !0,
        e(c)
    }
}
const XT = typeof XMLHttpRequest != "undefined";
var JT = XT && function(e) {
    return new Promise(function(n, r) {
        let i = e.data;
        const o = an.from(e.headers).normalize();
        let {responseType: a, withXSRFToken: s} = e, l;
        function u() {
            e.cancelToken && e.cancelToken.unsubscribe(l),
            e.signal && e.signal.removeEventListener("abort", l)
        }
        let c;
        if (z.isFormData(i)) {
            if (Kt.hasStandardBrowserEnv || Kt.hasStandardBrowserWebWorkerEnv)
                o.setContentType(!1);
            else if ((c = o.getContentType()) !== !1) {
                const [E,...y] = c ? c.split(";").map(g=>g.trim()).filter(Boolean) : [];
                o.setContentType([E || "multipart/form-data", ...y].join("; "))
            }
        }
        let f = new XMLHttpRequest;
        if (e.auth) {
            const E = e.auth.username || ""
              , y = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
            o.set("Authorization", "Basic " + btoa(E + ":" + y))
        }
        const h = ah(e.baseURL, e.url);
        f.open(e.method.toUpperCase(), th(h, e.params, e.paramsSerializer), !0),
        f.timeout = e.timeout;
        function p() {
            if (!f)
                return;
            const E = an.from("getAllResponseHeaders"in f && f.getAllResponseHeaders())
              , g = {
                data: !a || a === "text" || a === "json" ? f.responseText : f.response,
                status: f.status,
                statusText: f.statusText,
                headers: E,
                config: e,
                request: f
            };
            WT(function(C) {
                n(C),
                u()
            }, function(C) {
                r(C),
                u()
            }, g),
            f = null
        }
        if ("onloadend"in f ? f.onloadend = p : f.onreadystatechange = function() {
            !f || f.readyState !== 4 || f.status === 0 && !(f.responseURL && f.responseURL.indexOf("file:") === 0) || setTimeout(p)
        }
        ,
        f.onabort = function() {
            !f || (r(new Re("Request aborted",Re.ECONNABORTED,e,f)),
            f = null)
        }
        ,
        f.onerror = function() {
            r(new Re("Network Error",Re.ERR_NETWORK,e,f)),
            f = null
        }
        ,
        f.ontimeout = function() {
            let y = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded";
            const g = e.transitional || nh;
            e.timeoutErrorMessage && (y = e.timeoutErrorMessage),
            r(new Re(y,g.clarifyTimeoutError ? Re.ETIMEDOUT : Re.ECONNABORTED,e,f)),
            f = null
        }
        ,
        Kt.hasStandardBrowserEnv && (s && z.isFunction(s) && (s = s(e)),
        s || s !== !1 && YT(h))) {
            const E = e.xsrfHeaderName && e.xsrfCookieName && jT.read(e.xsrfCookieName);
            E && o.set(e.xsrfHeaderName, E)
        }
        i === void 0 && o.setContentType(null),
        "setRequestHeader"in f && z.forEach(o.toJSON(), function(y, g) {
            f.setRequestHeader(g, y)
        }),
        z.isUndefined(e.withCredentials) || (f.withCredentials = !!e.withCredentials),
        a && a !== "json" && (f.responseType = e.responseType),
        typeof e.onDownloadProgress == "function" && f.addEventListener("progress", Lu(e.onDownloadProgress, !0)),
        typeof e.onUploadProgress == "function" && f.upload && f.upload.addEventListener("progress", Lu(e.onUploadProgress)),
        (e.cancelToken || e.signal) && (l = E=>{
            !f || (r(!E || E.type ? new Po(null,e,f) : E),
            f.abort(),
            f = null)
        }
        ,
        e.cancelToken && e.cancelToken.subscribe(l),
        e.signal && (e.signal.aborted ? l() : e.signal.addEventListener("abort", l)));
        const v = qT(h);
        if (v && Kt.protocols.indexOf(v) === -1) {
            r(new Re("Unsupported protocol " + v + ":",Re.ERR_BAD_REQUEST,e));
            return
        }
        f.send(i || null)
    }
    )
}
;
const as = {
    http: ET,
    xhr: JT
};
z.forEach(as, (e,t)=>{
    if (e) {
        try {
            Object.defineProperty(e, "name", {
                value: t
            })
        } catch {}
        Object.defineProperty(e, "adapterName", {
            value: t
        })
    }
}
);
const Au = e=>`- ${e}`
  , ZT = e=>z.isFunction(e) || e === null || e === !1;
var sh = {
    getAdapter: e=>{
        e = z.isArray(e) ? e : [e];
        const {length: t} = e;
        let n, r;
        const i = {};
        for (let o = 0; o < t; o++) {
            n = e[o];
            let a;
            if (r = n,
            !ZT(n) && (r = as[(a = String(n)).toLowerCase()],
            r === void 0))
                throw new Re(`Unknown adapter '${a}'`);
            if (r)
                break;
            i[a || "#" + o] = r
        }
        if (!r) {
            const o = Object.entries(i).map(([s,l])=>`adapter ${s} ` + (l === !1 ? "is not supported by the environment" : "is not available in the build"));
            let a = t ? o.length > 1 ? `since :
` + o.map(Au).join(`
`) : " " + Au(o[0]) : "as no adapter specified";
            throw new Re("There is no suitable adapter to dispatch the request " + a,"ERR_NOT_SUPPORT")
        }
        return r
    }
    ,
    adapters: as
};
function _a(e) {
    if (e.cancelToken && e.cancelToken.throwIfRequested(),
    e.signal && e.signal.aborted)
        throw new Po(null,e)
}
function Nu(e) {
    return _a(e),
    e.headers = an.from(e.headers),
    e.data = ya.call(e, e.transformRequest),
    ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1),
    sh.getAdapter(e.adapter || rl.adapter)(e).then(function(r) {
        return _a(e),
        r.data = ya.call(e, e.transformResponse, r),
        r.headers = an.from(r.headers),
        r
    }, function(r) {
        return ih(r) || (_a(e),
        r && r.response && (r.response.data = ya.call(e, e.transformResponse, r.response),
        r.response.headers = an.from(r.response.headers))),
        Promise.reject(r)
    })
}
const xu = e=>e instanceof an ? {
    ...e
} : e;
function Or(e, t) {
    t = t || {};
    const n = {};
    function r(u, c, f) {
        return z.isPlainObject(u) && z.isPlainObject(c) ? z.merge.call({
            caseless: f
        }, u, c) : z.isPlainObject(c) ? z.merge({}, c) : z.isArray(c) ? c.slice() : c
    }
    function i(u, c, f) {
        if (z.isUndefined(c)) {
            if (!z.isUndefined(u))
                return r(void 0, u, f)
        } else
            return r(u, c, f)
    }
    function o(u, c) {
        if (!z.isUndefined(c))
            return r(void 0, c)
    }
    function a(u, c) {
        if (z.isUndefined(c)) {
            if (!z.isUndefined(u))
                return r(void 0, u)
        } else
            return r(void 0, c)
    }
    function s(u, c, f) {
        if (f in t)
            return r(u, c);
        if (f in e)
            return r(void 0, u)
    }
    const l = {
        url: o,
        method: o,
        data: o,
        baseURL: a,
        transformRequest: a,
        transformResponse: a,
        paramsSerializer: a,
        timeout: a,
        timeoutMessage: a,
        withCredentials: a,
        withXSRFToken: a,
        adapter: a,
        responseType: a,
        xsrfCookieName: a,
        xsrfHeaderName: a,
        onUploadProgress: a,
        onDownloadProgress: a,
        decompress: a,
        maxContentLength: a,
        maxBodyLength: a,
        beforeRedirect: a,
        transport: a,
        httpAgent: a,
        httpsAgent: a,
        cancelToken: a,
        socketPath: a,
        responseEncoding: a,
        validateStatus: s,
        headers: (u,c)=>i(xu(u), xu(c), !0)
    };
    return z.forEach(Object.keys(Object.assign({}, e, t)), function(c) {
        const f = l[c] || i
          , h = f(e[c], t[c], c);
        z.isUndefined(h) && f !== s || (n[c] = h)
    }),
    n
}
const lh = "1.6.8"
  , ol = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e,t)=>{
    ol[e] = function(r) {
        return typeof r === e || "a" + (t < 1 ? "n " : " ") + e
    }
}
);
const Du = {};
ol.transitional = function(t, n, r) {
    function i(o, a) {
        return "[Axios v" + lh + "] Transitional option '" + o + "'" + a + (r ? ". " + r : "")
    }
    return (o,a,s)=>{
        if (t === !1)
            throw new Re(i(a, " has been removed" + (n ? " in " + n : "")),Re.ERR_DEPRECATED);
        return n && !Du[a] && (Du[a] = !0,
        console.warn(i(a, " has been deprecated since v" + n + " and will be removed in the near future"))),
        t ? t(o, a, s) : !0
    }
}
;
function QT(e, t, n) {
    if (typeof e != "object")
        throw new Re("options must be an object",Re.ERR_BAD_OPTION_VALUE);
    const r = Object.keys(e);
    let i = r.length;
    for (; i-- > 0; ) {
        const o = r[i]
          , a = t[o];
        if (a) {
            const s = e[o]
              , l = s === void 0 || a(s, o, e);
            if (l !== !0)
                throw new Re("option " + o + " must be " + l,Re.ERR_BAD_OPTION_VALUE);
            continue
        }
        if (n !== !0)
            throw new Re("Unknown option " + o,Re.ERR_BAD_OPTION)
    }
}
var ss = {
    assertOptions: QT,
    validators: ol
};
const _n = ss.validators;
class _i {
    constructor(t) {
        this.defaults = t,
        this.interceptors = {
            request: new Pu,
            response: new Pu
        }
    }
    async request(t, n) {
        try {
            return await this._request(t, n)
        } catch (r) {
            if (r instanceof Error) {
                let i;
                Error.captureStackTrace ? Error.captureStackTrace(i = {}) : i = new Error;
                const o = i.stack ? i.stack.replace(/^.+\n/, "") : "";
                r.stack ? o && !String(r.stack).endsWith(o.replace(/^.+\n.+\n/, "")) && (r.stack += `
` + o) : r.stack = o
            }
            throw r
        }
    }
    _request(t, n) {
        typeof t == "string" ? (n = n || {},
        n.url = t) : n = t || {},
        n = Or(this.defaults, n);
        const {transitional: r, paramsSerializer: i, headers: o} = n;
        r !== void 0 && ss.assertOptions(r, {
            silentJSONParsing: _n.transitional(_n.boolean),
            forcedJSONParsing: _n.transitional(_n.boolean),
            clarifyTimeoutError: _n.transitional(_n.boolean)
        }, !1),
        i != null && (z.isFunction(i) ? n.paramsSerializer = {
            serialize: i
        } : ss.assertOptions(i, {
            encode: _n.function,
            serialize: _n.function
        }, !0)),
        n.method = (n.method || this.defaults.method || "get").toLowerCase();
        let a = o && z.merge(o.common, o[n.method]);
        o && z.forEach(["delete", "get", "head", "post", "put", "patch", "common"], v=>{
            delete o[v]
        }
        ),
        n.headers = an.concat(a, o);
        const s = [];
        let l = !0;
        this.interceptors.request.forEach(function(E) {
            typeof E.runWhen == "function" && E.runWhen(n) === !1 || (l = l && E.synchronous,
            s.unshift(E.fulfilled, E.rejected))
        });
        const u = [];
        this.interceptors.response.forEach(function(E) {
            u.push(E.fulfilled, E.rejected)
        });
        let c, f = 0, h;
        if (!l) {
            const v = [Nu.bind(this), void 0];
            for (v.unshift.apply(v, s),
            v.push.apply(v, u),
            h = v.length,
            c = Promise.resolve(n); f < h; )
                c = c.then(v[f++], v[f++]);
            return c
        }
        h = s.length;
        let p = n;
        for (f = 0; f < h; ) {
            const v = s[f++]
              , E = s[f++];
            try {
                p = v(p)
            } catch (y) {
                E.call(this, y);
                break
            }
        }
        try {
            c = Nu.call(this, p)
        } catch (v) {
            return Promise.reject(v)
        }
        for (f = 0,
        h = u.length; f < h; )
            c = c.then(u[f++], u[f++]);
        return c
    }
    getUri(t) {
        t = Or(this.defaults, t);
        const n = ah(t.baseURL, t.url);
        return th(n, t.params, t.paramsSerializer)
    }
}
z.forEach(["delete", "get", "head", "options"], function(t) {
    _i.prototype[t] = function(n, r) {
        return this.request(Or(r || {}, {
            method: t,
            url: n,
            data: (r || {}).data
        }))
    }
});
z.forEach(["post", "put", "patch"], function(t) {
    function n(r) {
        return function(o, a, s) {
            return this.request(Or(s || {}, {
                method: t,
                headers: r ? {
                    "Content-Type": "multipart/form-data"
                } : {},
                url: o,
                data: a
            }))
        }
    }
    _i.prototype[t] = n(),
    _i.prototype[t + "Form"] = n(!0)
});
var ii = _i;
class il {
    constructor(t) {
        if (typeof t != "function")
            throw new TypeError("executor must be a function.");
        let n;
        this.promise = new Promise(function(o) {
            n = o
        }
        );
        const r = this;
        this.promise.then(i=>{
            if (!r._listeners)
                return;
            let o = r._listeners.length;
            for (; o-- > 0; )
                r._listeners[o](i);
            r._listeners = null
        }
        ),
        this.promise.then = i=>{
            let o;
            const a = new Promise(s=>{
                r.subscribe(s),
                o = s
            }
            ).then(i);
            return a.cancel = function() {
                r.unsubscribe(o)
            }
            ,
            a
        }
        ,
        t(function(o, a, s) {
            r.reason || (r.reason = new Po(o,a,s),
            n(r.reason))
        })
    }
    throwIfRequested() {
        if (this.reason)
            throw this.reason
    }
    subscribe(t) {
        if (this.reason) {
            t(this.reason);
            return
        }
        this._listeners ? this._listeners.push(t) : this._listeners = [t]
    }
    unsubscribe(t) {
        if (!this._listeners)
            return;
        const n = this._listeners.indexOf(t);
        n !== -1 && this._listeners.splice(n, 1)
    }
    static source() {
        let t;
        return {
            token: new il(function(i) {
                t = i
            }
            ),
            cancel: t
        }
    }
}
var eC = il;
function tC(e) {
    return function(n) {
        return e.apply(null, n)
    }
}
function nC(e) {
    return z.isObject(e) && e.isAxiosError === !0
}
const ls = {
    Continue: 100,
    SwitchingProtocols: 101,
    Processing: 102,
    EarlyHints: 103,
    Ok: 200,
    Created: 201,
    Accepted: 202,
    NonAuthoritativeInformation: 203,
    NoContent: 204,
    ResetContent: 205,
    PartialContent: 206,
    MultiStatus: 207,
    AlreadyReported: 208,
    ImUsed: 226,
    MultipleChoices: 300,
    MovedPermanently: 301,
    Found: 302,
    SeeOther: 303,
    NotModified: 304,
    UseProxy: 305,
    Unused: 306,
    TemporaryRedirect: 307,
    PermanentRedirect: 308,
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    ProxyAuthenticationRequired: 407,
    RequestTimeout: 408,
    Conflict: 409,
    Gone: 410,
    LengthRequired: 411,
    PreconditionFailed: 412,
    PayloadTooLarge: 413,
    UriTooLong: 414,
    UnsupportedMediaType: 415,
    RangeNotSatisfiable: 416,
    ExpectationFailed: 417,
    ImATeapot: 418,
    MisdirectedRequest: 421,
    UnprocessableEntity: 422,
    Locked: 423,
    FailedDependency: 424,
    TooEarly: 425,
    UpgradeRequired: 426,
    PreconditionRequired: 428,
    TooManyRequests: 429,
    RequestHeaderFieldsTooLarge: 431,
    UnavailableForLegalReasons: 451,
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504,
    HttpVersionNotSupported: 505,
    VariantAlsoNegotiates: 506,
    InsufficientStorage: 507,
    LoopDetected: 508,
    NotExtended: 510,
    NetworkAuthenticationRequired: 511
};
Object.entries(ls).forEach(([e,t])=>{
    ls[t] = e
}
);
var rC = ls;
function ch(e) {
    const t = new ii(e)
      , n = Wm(ii.prototype.request, t);
    return z.extend(n, ii.prototype, t, {
        allOwnKeys: !0
    }),
    z.extend(n, t, null, {
        allOwnKeys: !0
    }),
    n.create = function(i) {
        return ch(Or(e, i))
    }
    ,
    n
}
const Ge = ch(rl);
Ge.Axios = ii;
Ge.CanceledError = Po;
Ge.CancelToken = eC;
Ge.isCancel = ih;
Ge.VERSION = lh;
Ge.toFormData = qi;
Ge.AxiosError = Re;
Ge.Cancel = Ge.CanceledError;
Ge.all = function(t) {
    return Promise.all(t)
}
;
Ge.spread = tC;
Ge.isAxiosError = nC;
Ge.mergeConfig = Or;
Ge.AxiosHeaders = an;
Ge.formToJSON = e=>oh(z.isHTMLForm(e) ? new FormData(e) : e);
Ge.getAdapter = sh.getAdapter;
Ge.HttpStatusCode = rC;
Ge.default = Ge;
var oC = Ge
  , iC = {
    gui: {
        pikafishAnalyze: "分析",
        chessDb: "\u4E91\u5E93",
        scoreGraph: "\u5C40\u52BF",
        note: "\u6CE8\u91CA",
        notePlaceHolder: "\u6DFB\u52A0\u7740\u6CD5\u6CE8\u91CA",
        noAnalyzeResult: "\u6682\u65E0\u5206\u6790\u7ED3\u679C",
        move: "\u7740\u6CD5",
        score: "\u8BC4\u5206",
        depth: "\u6DF1\u5EA6",
        timeCost: "\u8017\u65F6",
        nps: "NPS",
        chessDbShort: "\u4E91\u5E93",
        redSide: "\u7EA2\u65B9",
        blackSide: "\u9ED1\u65B9",
        redScore: "\u7EA2\u65B9\u8BC4\u5206",
        blackScore: "\u9ED1\u65B9\u8BC4\u5206",
        redScoreShort: "\u7EA2\u5206",
        blackScoreShort: "\u9ED1\u5206",
        mated: "\u7EDD\u6740",
        engineIsLoading: "\u5F15\u64CE\u52A0\u8F7D\u4E2D",
        pleaseWait: "\u9996\u6B21\u52A0\u8F7D\u901F\u5EA6\u53EF\u80FD\u8F83\u6162\uFF0C\u8BF7\u8010\u5FC3\u7B49\u5F85",
        progressStuck: "\u8FDB\u5EA6\u957F\u65F6\u95F4\u6CA1\u53D8\u5316\uFF1F",
        clickForReload: "\u70B9\u6211\u91CD\u65B0\u52A0\u8F7D",
        qqGroupInfo: "",
        waitingForResource: "\u8D44\u6E90\u52A0\u8F7D\u4E2D \u8BF7\u7A0D\u540E",
        engineStatus: "\u5F15\u64CE\u72B6\u6001",
        resourceStatus: "\u8D44\u6E90\u72B6\u6001",
        ready: "\u5C31\u7EEA",
        notReady: "\u672A\u5C31\u7EEA",
        waitingForGifGenerate: "GIF \u751F\u6210\u4E2D\uFF0C\u8BF7\u8010\u5FC3\u7B49\u5F85",
        settings: "\u8BBE\u7F6E",
        about: "\u5173\u4E8E",
        flipBoard: "\u65CB\u8F6C\u68CB\u76D8",
        flipHorizontal: "\u5DE6\u53F3\u7FFB\u8F6C",
        moveList: {
            startPos: "\u5F00\u59CB"
        },
        hintOffNotify: "\u60A8\u5DF2\u5173\u95ED\u4EBA\u673A\u5BF9\u5F08\u65F6\u7684\u63D0\u793A",
        chooseManualFile: "\u9009\u62E9\u68CB\u8C31\u6587\u4EF6"
    },
    settings: {
        uiSettings: "\u754C\u9762\u8BBE\u7F6E",
        language: "\u8BED\u8A00",
        languagePlaceholder: "Language",
        boardSkin: "\u68CB\u76D8\u76AE\u80A4",
        boardSkinPlaceholder: "\u9009\u62E9\u68CB\u76D8\u76AE\u80A4",
        pieceSkin: "\u68CB\u5B50\u76AE\u80A4",
        pieceSkinPlaceholder: "\u9009\u62E9\u68CB\u5B50\u76AE\u80A4",
        showBoardLabel: "\u663E\u793A\u68CB\u76D8\u5750\u6807",
        showBoardLabelDesc: "\u662F\u5426\u663E\u793A\u68CB\u76D8\u5750\u6807",
        playSound: "\u8D70\u68CB\u97F3\u6548",
        playSoundDesc: "\u662F\u5426\u64AD\u653E\u8D70\u68CB\u97F3\u6548",
        animationTime: "\u8D70\u68CB\u52A8\u753B\u65F6\u957F (\u79D2)",
        animationTimeDesc: "\u8BBE\u4E3A0\u5373\u4E3A\u5173\u95ED\u52A8\u753B",
        pureMode: "\u7EAF\u51C0\u6A21\u5F0F",
        pureModeDesc: "\u4EC5\u663E\u793A\u68CB\u76D8",
        pieceScaleRate: "\u68CB\u5B50\u7F29\u653E\u767E\u5206\u6BD4",
        pieceScaleRateDesc: "100% \u4E3A\u539F\u59CB\u5927\u5C0F",
        engineSettings: "\u5F15\u64CE\u8BBE\u7F6E",
        engineRule: "\u8C61\u68CB\u89C4\u5219",
        engineRulePlaceholder: "\u5F15\u64CE\u9075\u5FAA\u7684\u8C61\u68CB\u89C4\u5219",
        engineRuleEnums: {
            asianRule: "\u4E9A\u6D32\u89C4\u5219",
            skyRule: "\u5929\u89C4",
            chineseRule: "\u7B80\u6613\u4E2D\u89C4",
            allowChase: "\u5141\u8BB8\u957F\u6349"
        },
        skillLevel: "\u68CB\u529B\u7B49\u7EA7",
        skillLevelDesc: "\u8303\u56F4 0 ~ 20\uFF0C20\u7EA7\u4E3A\u4E0D\u9650\u5236\u68CB\u529B",
        threadCount: "\u7EBF\u7A0B\u6570",
        threadCountDesc: "\u6700\u5927: ",
        hashSize: "\u7F6E\u6362\u8868\u5927\u5C0F",
        hashSizeDesc: "\u6700\u5927: ",
        multiPv: "\u663E\u793A\u7740\u6CD5\u6570",
        multiPvDesc: "\u8BF7\u8C28\u614E\u8BBE\u7F6E\uFF0C\u6570\u91CF\u8D8A\u591A\u68CB\u529B\u8D8A\u5F31",
        multiPvWarning: "\u7531\u4E8E\u7B97\u529B\u5206\u644A\uFF0C\u68CB\u529B\u5C06\u663E\u8457\u4E0B\u964D",
        thinkingSettings: "\u8D70\u68CB\u8BBE\u7F6E",
        turnTime: "\u6B65\u65F6",
        turnTimeDesc: "\u5F15\u64CE\u5355\u6B65\u601D\u8003\u65F6\u95F4",
        maxDepth: "\u6700\u5927\u6DF1\u5EA6",
        maxDepthDesc: "\u5141\u8BB8\u5F15\u64CE\u8BA1\u7B97\u7684\u6700\u5927\u6DF1\u5EA6",
        chessDbSettings: "\u4E91\u5E93\u8BBE\u7F6E",
        getChessDbMove: "\u83B7\u53D6\u4E91\u5E93\u7740\u6CD5",
        getChessDbMoveDesc: "\u5728\u5C40\u9762\u53D8\u52A8\u65F6\u540C\u6B65\u83B7\u53D6\u4E91\u5E93\u7740\u6CD5",
        chessDbAutoMove: "\u4E91\u5E93\u81EA\u52A8\u8D70\u68CB",
        chessDbAutoMoveDesc: "\u4F18\u5148\u4F7F\u7528\u4E91\u5E93\u7740\u6CD5\uFF0C\u4E91\u5E93\u65E0\u7740\u6CD5\u65F6\u518D\u542F\u7528\u5F15\u64CE\u601D\u8003",
        alwaysUseEgtb: "\u59CB\u7EC8\u542F\u7528\u4E91\u6B8B\u5C40\u5E93",
        alwaysUseEgtbDesc: "\u5728\u8D85\u8FC7\u8131\u5E93\u6B65\u6570\u540E\u4ECD\u7136\u4F7F\u7528\u4E91\u6B8B\u5C40\u5E93",
        disablePly: "\u8131\u5E93\u6B65\u6570",
        disablePlyDesc: "\u7528\u4E91\u5E93\u81EA\u52A8\u8D70\u68CB\u65F6\u8131\u5E93\u6B65\u6570",
        displaySettings: "\u663E\u793A\u8BBE\u7F6E",
        showArrows: "\u663E\u793A\u7BAD\u5934",
        showArrowsDesc: "\u4EBA\u673A\u5BF9\u5F08\u65F6\u663E\u793A\u63D0\u793A\u7BAD\u5934",
        browserEnvironment: "\u6D4F\u89C8\u5668\u73AF\u5883",
        browserSimd: "SIMD: ",
        browserSupportSimd: "\u652F\u6301",
        browserDontSupportSimd: "\u4E0D\u652F\u6301",
        noSimdImpact: "\u5C06\u6781\u5927\u5F71\u54CD\u8BA1\u7B97\u901F\u5EA6\uFF0C\u5B89\u5353\u7528\u6237\u5EFA\u8BAE\u66F4\u6362\u5176\u4ED6\u6D4F\u89C8\u5668",
        browserMultithreading: "\u591A\u7EBF\u7A0B: ",
        browserSupportMultithreading: "\u652F\u6301",
        browserDontSupportMultithreading: "\u4E0D\u652F\u6301",
        noMultithreadingImpact: "\u60A8\u7684\u7EBF\u7A0B\u6570\u5C06\u88AB\u9650\u5236\u5728 1",
        contactUs: "",
        welcomeToJoin: "",
        skinEnums: {
            defaultPieceSkin: "\u9ED8\u8BA4\u68CB\u5B50",
            defaultBoardSkin: "\u9ED8\u8BA4\u68CB\u76D8"
        },
        showMoveVariantArrow: "\u663E\u793A\u53D8\u7740\u7BAD\u5934",
        showMoveVariantArrowDesc: "\u663E\u793A\u6307\u793A\u4E0B\u4E00\u6B65\u68CB\u7684\u7BAD\u5934"
    },
    about: {
        introduction: "欢迎使用丰帆象棋,本网页采用了最先进的神经网络NNUE算法,现已经超过人类棋手!",
        thanksForSupport: "",
        thanksPikacat: "",
        thanksDblue: "",
        thanksPikafishTeams: "",
        thanksTesting: "",
        qqGroupInfo: ""
    }
}, sC = {
    gui: {
        pikafishAnalyze: "Analysis",
        chessDb: "ChessDB",
        noAnalyzeResult: "No analysis results available",
        move: "Move",
        score: "Score",
        depth: "Depth",
        timeCost: "Time",
        nps: "NPS",
        chessDbShort: "ChessDB",
        redSide: "Red Side",
        blackSide: "Black Side",
        redScore: "Red Side Score",
        blackScore: "Black Side Score",
        redScoreShort: "Red Score",
        blackScoreShort: "Black Score",
        mated: "Checkmate",
        engineIsLoading: "Engine is loading",
        pleaseWait: "Initial loading may be slow, please wait patiently",
        progressStuck: "Progress stuck?",
        clickForReload: "Click to reload",
        qqGroupInfo: "",
        waitingForResource: "Loading resources, please wait",
        engineStatus: "Engine Status",
        resourceStatus: "Resource Status",
        ready: "Ready",
        notReady: "Loading",
        waitingForGifGenerate: "Generating GIF, please wait patiently",
        settings: "Settings",
        about: "About",
        flipBoard: "Rotate Board",
        flipHorizontal: "Flip Horizontal",
        moveList: {
            startPos: "StartPos"
        }
    },
    settings: {
        uiSettings: "Interface Settings",
        language: "Language",
        languagePlaceholder: "UI Language",
        boardSkin: "Board Skin",
        boardSkinPlaceholder: "Select Board Skin",
        pieceSkin: "Piece Skin",
        pieceSkinPlaceholder: "Select Piece Skin",
        playSound: "Move Sound",
        playSoundDesc: "Enable move sound",
        animationTime: "Move Animation Duration (seconds)",
        animationTimeDesc: "Set to 0 to disable animation",
        pureMode: "Pure Mode",
        pureModeDesc: "Display only the chessboard",
        pieceScaleRate: "Piece Scale Rate",
        pieceScaleRateDesc: "100% is the original size",
        engineSettings: "Engine Settings",
        engineRule: "Xiangqi Rule",
        engineRulePlaceholder: "Xiangqi rule that the engine follows",
        engineRuleEnums: {
            asianRule: "Asian Rule",
            skyRule: "Sky Rule",
            chineseRule: "Simplified Chinese Rule",
            allowChase: "Allow Chase"
        },
        skillLevel: "Skill Level",
        skillLevelDesc: "Range 0 ~ 20, Level 20 is unlimited strength",
        threadCount: "Thread Count",
        threadCountDesc: "Maximum: ",
        hashSize: "Transposition Table Size",
        hashSizeDesc: "Maximum: ",
        multiPv: "Number of Moves Displayed",
        multiPvDesc: "Maximum: 10",
        multiPvWarning: "Due to shared computation power, chess strength will significantly decrease",
        thinkingSettings: "Thinking Settings",
        turnTime: "Time per Move",
        turnTimeDesc: "Engine's thinking time per move",
        maxDepth: "Maximum Depth",
        maxDepthDesc: "Maximum depth the engine is allowed to calculate",
        chessDbSettings: "Cloud Database Settings",
        getChessDbMove: "Retrieve Move from Cloud Database",
        getChessDbMoveDesc: "Sync and get moves from the cloud database when the position changes",
        chessDbAutoMove: "Auto-move Using Cloud Database",
        chessDbAutoMoveDesc: "Prioritize moves from the cloud database. If no move is found, use the engine for analysis",
        alwaysUseEgtb: "Always Use Cloud Endgame Database",
        alwaysUseEgtbDesc: "Continue using the cloud endgame database even after exceeding the predefined number of moves",
        disablePly: "Number of Moves Before Exiting Database",
        disablePlyDesc: "Number of moves before the auto-move feature exits the database",
        displaySettings: "Display Settings",
        showArrows: "Show Arrows",
        showArrowsDesc: "Show hint arrows during human vs. machine gameplay",
        browserEnvironment: "Browser Environment",
        browserSimd: "SIMD: ",
        browserSupportSimd: "Supported",
        browserDontSupportSimd: "Not Supported",
        noSimdImpact: "This will greatly affect computation speed. Android users are advised to switch to another browser",
        browserMultithreading: "Multithreading: ",
        browserSupportMultithreading: "Supported",
        browserDontSupportMultithreading: "Not Supported",
        noMultithreadingImpact: "Your thread count will be limited to 1",
        contactUs: "",
        welcomeToJoin: ""
    },
    about: {
        introduction: "Welcome to Fengfan Chess! This webpage employs the most advanced NNUE neural network algorithm, which has now surpassed human players!",
        thanksForSupport: "",
        thanksPikacat: "",
        thanksDblue: "",
        thanksPikafishTeams: "",
        thanksTesting: "",
        qqGroupInfo: ""
    }
}
const cC = [$0, hi, gE, gS, hm, RE, ME, zd, tr, jE, yE, at, nS, uS, cm, um, j_, rE, ko, TS, GE, aS, SE, FE, U0]
  , Xi = Xf(AS);
cC.forEach(e=>Xi.use(e));
const uC = Tb({
    locale: "zh-CN",
    messages: {
        "zh-CN": iC,
        "en-US": sC,
    }
});
Xi.use(uC);
Xi.config.globalProperties.$axios = oC;
Xi.mount("#app");
export {ct as A, Pi as B, fn as C, wo as D, Be as E, Ze as F, hE as G, _C as H, yC as I, EC as J, _m as K, us as L, So as M, gC as N, Ff as O, vC as P, ot as Q, mC as R, bC as S, pC as T, IS as _, k as a, oe as b, hC as c, gt as d, ni as e, Bf as f, on as g, dg as h, Uf as i, B0 as j, wC as k, SC as l, oC as m, fs as n, Df as o, Ee as p, of as q, kg as r, mE as s, fC as t, Mt as u, Pn as v, he as w, Et as x, dC as y, ne as z};
