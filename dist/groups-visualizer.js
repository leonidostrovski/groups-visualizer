/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Cr = globalThis, Ou = Cr.ShadowRoot && (Cr.ShadyCSS === void 0 || Cr.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Mu = Symbol(), dc = /* @__PURE__ */ new WeakMap();
let sv = class {
  constructor(t, r, n) {
    if (this._$cssResult$ = !0, n !== Mu) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = r;
  }
  get styleSheet() {
    let t = this.o;
    const r = this.t;
    if (Ou && t === void 0) {
      const n = r !== void 0 && r.length === 1;
      n && (t = dc.get(r)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && dc.set(r, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const s_ = (e) => new sv(typeof e == "string" ? e : e + "", void 0, Mu), o_ = (e, ...t) => {
  const r = e.length === 1 ? e[0] : t.reduce((n, i, a) => n + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + e[a + 1], e[0]);
  return new sv(r, e, Mu);
}, u_ = (e, t) => {
  if (Ou) e.adoptedStyleSheets = t.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else for (const r of t) {
    const n = document.createElement("style"), i = Cr.litNonce;
    i !== void 0 && n.setAttribute("nonce", i), n.textContent = r.cssText, e.appendChild(n);
  }
}, pc = Ou ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let r = "";
  for (const n of t.cssRules) r += n.cssText;
  return s_(r);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: c_, defineProperty: f_, getOwnPropertyDescriptor: l_, getOwnPropertyNames: h_, getOwnPropertySymbols: d_, getPrototypeOf: p_ } = Object, rt = globalThis, vc = rt.trustedTypes, v_ = vc ? vc.emptyScript : "", gn = rt.reactiveElementPolyfillSupport, Qt = (e, t) => e, _u = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? v_ : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let r = e;
  switch (t) {
    case Boolean:
      r = e !== null;
      break;
    case Number:
      r = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        r = JSON.parse(e);
      } catch {
        r = null;
      }
  }
  return r;
} }, ov = (e, t) => !c_(e, t), gc = { attribute: !0, type: String, converter: _u, reflect: !1, useDefault: !1, hasChanged: ov };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), rt.litPropertyMetadata ?? (rt.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Rt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, r = gc) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((r = Object.create(r)).wrapped = !0), this.elementProperties.set(t, r), !r.noAccessor) {
      const n = Symbol(), i = this.getPropertyDescriptor(t, n, r);
      i !== void 0 && f_(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, r, n) {
    const { get: i, set: a } = l_(this.prototype, t) ?? { get() {
      return this[r];
    }, set(s) {
      this[r] = s;
    } };
    return { get: i, set(s) {
      const o = i == null ? void 0 : i.call(this);
      a == null || a.call(this, s), this.requestUpdate(t, o, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? gc;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Qt("elementProperties"))) return;
    const t = p_(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Qt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Qt("properties"))) {
      const r = this.properties, n = [...h_(r), ...d_(r)];
      for (const i of n) this.createProperty(i, r[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const r = litPropertyMetadata.get(t);
      if (r !== void 0) for (const [n, i] of r) this.elementProperties.set(n, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [r, n] of this.elementProperties) {
      const i = this._$Eu(r, n);
      i !== void 0 && this._$Eh.set(i, r);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const r = [];
    if (Array.isArray(t)) {
      const n = new Set(t.flat(1 / 0).reverse());
      for (const i of n) r.unshift(pc(i));
    } else t !== void 0 && r.push(pc(t));
    return r;
  }
  static _$Eu(t, r) {
    const n = r.attribute;
    return n === !1 ? void 0 : typeof n == "string" ? n : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((r) => this.enableUpdating = r), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((r) => r(this));
  }
  addController(t) {
    var r;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((r = t.hostConnected) == null || r.call(t));
  }
  removeController(t) {
    var r;
    (r = this._$EO) == null || r.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), r = this.constructor.elementProperties;
    for (const n of r.keys()) this.hasOwnProperty(n) && (t.set(n, this[n]), delete this[n]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return u_(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((r) => {
      var n;
      return (n = r.hostConnected) == null ? void 0 : n.call(r);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((r) => {
      var n;
      return (n = r.hostDisconnected) == null ? void 0 : n.call(r);
    });
  }
  attributeChangedCallback(t, r, n) {
    this._$AK(t, n);
  }
  _$ET(t, r) {
    var a;
    const n = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, n);
    if (i !== void 0 && n.reflect === !0) {
      const s = (((a = n.converter) == null ? void 0 : a.toAttribute) !== void 0 ? n.converter : _u).toAttribute(r, n.type);
      this._$Em = t, s == null ? this.removeAttribute(i) : this.setAttribute(i, s), this._$Em = null;
    }
  }
  _$AK(t, r) {
    var a, s;
    const n = this.constructor, i = n._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const o = n.getPropertyOptions(i), u = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((a = o.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? o.converter : _u;
      this._$Em = i;
      const f = u.fromAttribute(r, o.type);
      this[i] = f ?? ((s = this._$Ej) == null ? void 0 : s.get(i)) ?? f, this._$Em = null;
    }
  }
  requestUpdate(t, r, n, i = !1, a) {
    var s;
    if (t !== void 0) {
      const o = this.constructor;
      if (i === !1 && (a = this[t]), n ?? (n = o.getPropertyOptions(t)), !((n.hasChanged ?? ov)(a, r) || n.useDefault && n.reflect && a === ((s = this._$Ej) == null ? void 0 : s.get(t)) && !this.hasAttribute(o._$Eu(t, n)))) return;
      this.C(t, r, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, r, { useDefault: n, reflect: i, wrapped: a }, s) {
    n && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, s ?? r ?? this[t]), a !== !0 || s !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (r = void 0), this._$AL.set(t, r)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (r) {
      Promise.reject(r);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var n;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [a, s] of this._$Ep) this[a] = s;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [a, s] of i) {
        const { wrapped: o } = s, u = this[a];
        o !== !0 || this._$AL.has(a) || u === void 0 || this.C(a, void 0, s, u);
      }
    }
    let t = !1;
    const r = this._$AL;
    try {
      t = this.shouldUpdate(r), t ? (this.willUpdate(r), (n = this._$EO) == null || n.forEach((i) => {
        var a;
        return (a = i.hostUpdate) == null ? void 0 : a.call(i);
      }), this.update(r)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(r);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var r;
    (r = this._$EO) == null || r.forEach((n) => {
      var i;
      return (i = n.hostUpdated) == null ? void 0 : i.call(n);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((r) => this._$ET(r, this[r]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
Rt.elementStyles = [], Rt.shadowRootOptions = { mode: "open" }, Rt[Qt("elementProperties")] = /* @__PURE__ */ new Map(), Rt[Qt("finalized")] = /* @__PURE__ */ new Map(), gn == null || gn({ ReactiveElement: Rt }), (rt.reactiveElementVersions ?? (rt.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const er = globalThis, _c = (e) => e, Or = er.trustedTypes, yc = Or ? Or.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, uv = "$lit$", et = `lit$${Math.random().toFixed(9).slice(2)}$`, cv = "?" + et, g_ = `<${cv}>`, bt = document, rr = () => bt.createComment(""), nr = (e) => e === null || typeof e != "object" && typeof e != "function", Pu = Array.isArray, __ = (e) => Pu(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", _n = `[ 	
\f\r]`, jt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, bc = /-->/g, mc = />/g, ft = RegExp(`>|${_n}(?:([^\\s"'>=/]+)(${_n}*=${_n}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), xc = /'/g, wc = /"/g, fv = /^(?:script|style|textarea|title)$/i, y_ = (e) => (t, ...r) => ({ _$litType$: e, strings: t, values: r }), Ae = y_(1), It = Symbol.for("lit-noChange"), se = Symbol.for("lit-nothing"), Ec = /* @__PURE__ */ new WeakMap(), dt = bt.createTreeWalker(bt, 129);
function lv(e, t) {
  if (!Pu(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return yc !== void 0 ? yc.createHTML(t) : t;
}
const b_ = (e, t) => {
  const r = e.length - 1, n = [];
  let i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", s = jt;
  for (let o = 0; o < r; o++) {
    const u = e[o];
    let f, c, l = -1, d = 0;
    for (; d < u.length && (s.lastIndex = d, c = s.exec(u), c !== null); ) d = s.lastIndex, s === jt ? c[1] === "!--" ? s = bc : c[1] !== void 0 ? s = mc : c[2] !== void 0 ? (fv.test(c[2]) && (i = RegExp("</" + c[2], "g")), s = ft) : c[3] !== void 0 && (s = ft) : s === ft ? c[0] === ">" ? (s = i ?? jt, l = -1) : c[1] === void 0 ? l = -2 : (l = s.lastIndex - c[2].length, f = c[1], s = c[3] === void 0 ? ft : c[3] === '"' ? wc : xc) : s === wc || s === xc ? s = ft : s === bc || s === mc ? s = jt : (s = ft, i = void 0);
    const h = s === ft && e[o + 1].startsWith("/>") ? " " : "";
    a += s === jt ? u + g_ : l >= 0 ? (n.push(f), u.slice(0, l) + uv + u.slice(l) + et + h) : u + et + (l === -2 ? o : h);
  }
  return [lv(e, a + (e[r] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class ir {
  constructor({ strings: t, _$litType$: r }, n) {
    let i;
    this.parts = [];
    let a = 0, s = 0;
    const o = t.length - 1, u = this.parts, [f, c] = b_(t, r);
    if (this.el = ir.createElement(f, n), dt.currentNode = this.el.content, r === 2 || r === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (i = dt.nextNode()) !== null && u.length < o; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const l of i.getAttributeNames()) if (l.endsWith(uv)) {
          const d = c[s++], h = i.getAttribute(l).split(et), v = /([.?@])?(.*)/.exec(d);
          u.push({ type: 1, index: a, name: v[2], strings: h, ctor: v[1] === "." ? x_ : v[1] === "?" ? w_ : v[1] === "@" ? E_ : Hr }), i.removeAttribute(l);
        } else l.startsWith(et) && (u.push({ type: 6, index: a }), i.removeAttribute(l));
        if (fv.test(i.tagName)) {
          const l = i.textContent.split(et), d = l.length - 1;
          if (d > 0) {
            i.textContent = Or ? Or.emptyScript : "";
            for (let h = 0; h < d; h++) i.append(l[h], rr()), dt.nextNode(), u.push({ type: 2, index: ++a });
            i.append(l[d], rr());
          }
        }
      } else if (i.nodeType === 8) if (i.data === cv) u.push({ type: 2, index: a });
      else {
        let l = -1;
        for (; (l = i.data.indexOf(et, l + 1)) !== -1; ) u.push({ type: 7, index: a }), l += et.length - 1;
      }
      a++;
    }
  }
  static createElement(t, r) {
    const n = bt.createElement("template");
    return n.innerHTML = t, n;
  }
}
function Ot(e, t, r = e, n) {
  var s, o;
  if (t === It) return t;
  let i = n !== void 0 ? (s = r._$Co) == null ? void 0 : s[n] : r._$Cl;
  const a = nr(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== a && ((o = i == null ? void 0 : i._$AO) == null || o.call(i, !1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, r, n)), n !== void 0 ? (r._$Co ?? (r._$Co = []))[n] = i : r._$Cl = i), i !== void 0 && (t = Ot(e, i._$AS(e, t.values), i, n)), t;
}
class m_ {
  constructor(t, r) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = r;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: r }, parts: n } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? bt).importNode(r, !0);
    dt.currentNode = i;
    let a = dt.nextNode(), s = 0, o = 0, u = n[0];
    for (; u !== void 0; ) {
      if (s === u.index) {
        let f;
        u.type === 2 ? f = new cr(a, a.nextSibling, this, t) : u.type === 1 ? f = new u.ctor(a, u.name, u.strings, this, t) : u.type === 6 && (f = new A_(a, this, t)), this._$AV.push(f), u = n[++o];
      }
      s !== (u == null ? void 0 : u.index) && (a = dt.nextNode(), s++);
    }
    return dt.currentNode = bt, i;
  }
  p(t) {
    let r = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, r), r += n.strings.length - 2) : n._$AI(t[r])), r++;
  }
}
class cr {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, r, n, i) {
    this.type = 2, this._$AH = se, this._$AN = void 0, this._$AA = t, this._$AB = r, this._$AM = n, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const r = this._$AM;
    return r !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = r.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, r = this) {
    t = Ot(this, t, r), nr(t) ? t === se || t == null || t === "" ? (this._$AH !== se && this._$AR(), this._$AH = se) : t !== this._$AH && t !== It && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : __(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== se && nr(this._$AH) ? this._$AA.nextSibling.data = t : this.T(bt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var a;
    const { values: r, _$litType$: n } = t, i = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = ir.createElement(lv(n.h, n.h[0]), this.options)), n);
    if (((a = this._$AH) == null ? void 0 : a._$AD) === i) this._$AH.p(r);
    else {
      const s = new m_(i, this), o = s.u(this.options);
      s.p(r), this.T(o), this._$AH = s;
    }
  }
  _$AC(t) {
    let r = Ec.get(t.strings);
    return r === void 0 && Ec.set(t.strings, r = new ir(t)), r;
  }
  k(t) {
    Pu(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let n, i = 0;
    for (const a of t) i === r.length ? r.push(n = new cr(this.O(rr()), this.O(rr()), this, this.options)) : n = r[i], n._$AI(a), i++;
    i < r.length && (this._$AR(n && n._$AB.nextSibling, i), r.length = i);
  }
  _$AR(t = this._$AA.nextSibling, r) {
    var n;
    for ((n = this._$AP) == null ? void 0 : n.call(this, !1, !0, r); t !== this._$AB; ) {
      const i = _c(t).nextSibling;
      _c(t).remove(), t = i;
    }
  }
  setConnected(t) {
    var r;
    this._$AM === void 0 && (this._$Cv = t, (r = this._$AP) == null || r.call(this, t));
  }
}
class Hr {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, r, n, i, a) {
    this.type = 1, this._$AH = se, this._$AN = void 0, this.element = t, this.name = r, this._$AM = i, this.options = a, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = se;
  }
  _$AI(t, r = this, n, i) {
    const a = this.strings;
    let s = !1;
    if (a === void 0) t = Ot(this, t, r, 0), s = !nr(t) || t !== this._$AH && t !== It, s && (this._$AH = t);
    else {
      const o = t;
      let u, f;
      for (t = a[0], u = 0; u < a.length - 1; u++) f = Ot(this, o[n + u], r, u), f === It && (f = this._$AH[u]), s || (s = !nr(f) || f !== this._$AH[u]), f === se ? t = se : t !== se && (t += (f ?? "") + a[u + 1]), this._$AH[u] = f;
    }
    s && !i && this.j(t);
  }
  j(t) {
    t === se ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class x_ extends Hr {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === se ? void 0 : t;
  }
}
class w_ extends Hr {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== se);
  }
}
class E_ extends Hr {
  constructor(t, r, n, i, a) {
    super(t, r, n, i, a), this.type = 5;
  }
  _$AI(t, r = this) {
    if ((t = Ot(this, t, r, 0) ?? se) === It) return;
    const n = this._$AH, i = t === se && n !== se || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, a = t !== se && (n === se || i);
    i && this.element.removeEventListener(this.name, this, n), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var r;
    typeof this._$AH == "function" ? this._$AH.call(((r = this.options) == null ? void 0 : r.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class A_ {
  constructor(t, r, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Ot(this, t);
  }
}
const yn = er.litHtmlPolyfillSupport;
yn == null || yn(ir, cr), (er.litHtmlVersions ?? (er.litHtmlVersions = [])).push("3.3.3");
const q_ = (e, t, r) => {
  const n = (r == null ? void 0 : r.renderBefore) ?? t;
  let i = n._$litPart$;
  if (i === void 0) {
    const a = (r == null ? void 0 : r.renderBefore) ?? null;
    n._$litPart$ = i = new cr(t.insertBefore(rr(), a), a, void 0, r ?? {});
  }
  return i._$AI(e), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _t = globalThis;
class tr extends Rt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var r;
    const t = super.createRenderRoot();
    return (r = this.renderOptions).renderBefore ?? (r.renderBefore = t.firstChild), t;
  }
  update(t) {
    const r = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = q_(r, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return It;
  }
}
var av;
tr._$litElement$ = !0, tr.finalized = !0, (av = _t.litElementHydrateSupport) == null || av.call(_t, { LitElement: tr });
const bn = _t.litElementPolyfillSupport;
bn == null || bn({ LitElement: tr });
(_t.litElementVersions ?? (_t.litElementVersions = [])).push("4.2.2");
const $_ = o_`
  :host { display: block; width: 100%; }
  ha-card { width: 100%; box-sizing: border-box; padding: 0; }

  /* -- Header ---------------------------------------------------------- */
  .header {
    display: flex; align-items: center; justify-content: space-between;
    background: #1a237e; color: #fff; padding: 10px 16px;
    font-family: Segoe UI, Arial, sans-serif;
  }
  .header-title { font-size: 16px; font-weight: bold; }
  .header-version { font-size: 11px; font-weight: normal; opacity: 0.65; margin-left: 6px; }
  .header-subtitle { font-size: 11px; opacity: 0.75; margin-top: 2px; }

  .header-actions { display: flex; align-items: center; gap: 8px; }
  .header-timestamp {
    font-size: 12px; background: rgba(255,255,255,0.15);
    padding: 4px 12px; border-radius: 12px;
    font-family: monospace; white-space: nowrap;
  }
  .refresh-btn {
    border: 2px solid rgba(255,255,255,0.85);
    background: #ffffff; color: #1a237e;
    font-weight: 700; font-size: 12px; padding: 6px 12px;
    border-radius: 14px; cursor: pointer; transition: background .15s ease, transform .05s ease;
  }
  .refresh-btn:hover { background: #f2f2f2; }
  .refresh-btn:active { transform: translateY(1px); }

  /* -- Main category tabs ---------------------------------------------- */
  .main-tabs {
    display: flex; flex-wrap: wrap; gap: 4px;
    background: #283593; padding: 8px 12px;
    position: sticky; top: 0; z-index: 20;
    border-bottom: 3px solid #1a237e;
  }
  .main-tab {
    padding: 6px 18px; border: none;
    background: rgba(255,255,255,0.12);
    color: rgba(255,255,255,0.8);
    cursor: pointer; border-radius: 20px;
    font-weight: 500; font-size: 13px;
    font-family: Segoe UI, Arial, sans-serif;
    transition: background 0.15s;
  }
  .main-tab:hover { background: rgba(255,255,255,0.22); color: #fff; }
  .main-tab.active { background: #fff; color: #1a237e; font-weight: bold; }

  /* -- Sub-tabs per tree ----------------------------------------------- */
  .sub-tabs {
    display: flex; flex-wrap: wrap; gap: 4px;
    background: var(--card-background-color, #f5f5f5);
    padding: 6px 12px;
    border-bottom: 2px solid var(--divider-color, #ddd);
    position: sticky; top: 49px; z-index: 19;
  }
  .sub-tab {
    padding: 4px 14px; border: 2px solid transparent;
    background: transparent; color: var(--secondary-text-color);
    cursor: pointer; border-radius: 14px;
    font-size: 12px; font-weight: 500;
    font-family: Segoe UI, Arial, sans-serif;
    transition: all 0.15s; white-space: nowrap;
    max-width: 260px; overflow: hidden; text-overflow: ellipsis;
  }
  .sub-tab:hover {
    background: var(--secondary-background-color);
    border-color: var(--primary-color);
  }
  .sub-tab.active {
    background: var(--primary-color);
    border-color: var(--primary-color);
    color: #fff; font-weight: bold;
  }

  /* -- Graph viewport -------------------------------------------------- */
  .graph-viewport {
    width: 100%; height: calc(100vh - 200px);
    min-height: 500px; overflow: auto;
    background: #ececec; box-sizing: border-box;
  }
  .graph-canvas {
    width: 100%; overflow-x: auto;
    background: #f5f5f5; cursor: grab;
  }
  .graph-canvas:active { cursor: grabbing; }

  .loading {
    text-align: center; padding: 60px;
    color: var(--secondary-text-color); font-size: 16px;
  }

  /* -- Area popup -------------------------------------------------------- */
  .area-popup-overlay {
    position: fixed; inset: 0; z-index: 1000;
    background: rgba(0,0,0,0.45);
    display: flex; align-items: center; justify-content: center;
  }
  .area-popup {
    background: #fff; border-radius: 12px;
    min-width: 320px; max-width: 480px; width: 90%;
    max-height: 80vh; overflow-y: auto;
    box-shadow: 0 8px 32px rgba(0,0,0,0.35);
    font-family: Segoe UI, Arial, sans-serif;
    display: flex; flex-direction: column;
  }
  .area-popup-header {
    display: flex; align-items: center; justify-content: space-between;
    background: #1a237e; color: #fff;
    padding: 14px 16px; border-radius: 12px 12px 0 0;
    font-size: 16px; font-weight: bold; flex-shrink: 0;
  }
  .area-popup-close {
    background: none; border: none; color: #fff;
    font-size: 20px; cursor: pointer; padding: 0 4px; line-height: 1;
  }
  .area-popup-close:hover { opacity: 0.75; }
  .area-popup-section {
    padding: 10px 16px; border-bottom: 1px solid #eee;
  }
  .area-popup-label {
    font-size: 10px; font-weight: bold; color: #777;
    text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 6px;
  }
  .area-popup-alias { font-size: 12px; color: #444; padding: 2px 0; }
  .area-popup-entity {
    display: flex; flex-direction: column;
    padding: 5px 0; border-bottom: 1px solid #f0f0f0;
    cursor: pointer;
  }
  .area-popup-entity:hover { background: #f5f5f5; margin: 0 -16px; padding: 5px 16px; }
  .area-popup-entity:last-child { border-bottom: none; }
  .area-popup-entity-name { font-size: 12px; color: #222; font-weight: 500; }
  .area-popup-eid { font-size: 10px; color: #999; font-family: monospace; margin-top: 1px; }
  .area-popup-none { font-size: 12px; color: #aaa; }
  .area-popup-footer {
    padding: 12px 16px; text-align: right; flex-shrink: 0;
  }
  .area-popup-btn {
    background: #1a237e; color: #fff;
    border: none; border-radius: 8px;
    padding: 8px 18px; font-size: 13px;
    cursor: pointer; font-weight: 600;
  }
  .area-popup-btn:hover { background: #283593; }
`;
function ke(e) {
  const t = (e == null ? void 0 : e.attributes) || {}, r = t.entity_id;
  if (Array.isArray(r) && r.length > 0) return [r, "entity_id"];
  const n = t.lights;
  return Array.isArray(n) && n.length > 0 ? [n, "lights"] : [[], null];
}
function Ac(e) {
  const [t] = ke(e);
  return t.length > 0;
}
function S_(e) {
  const t = e.entity_id.split(".")[0];
  return {
    switch: "Switches",
    light: "Lights",
    sensor: "Sensors",
    fan: "Fans",
    climate: "Climate",
    group: "Groups"
  }[t] || t.charAt(0).toUpperCase() + t.slice(1);
}
function hv(e) {
  const t = e.split(".")[0];
  return {
    light: "#FFA726",
    switch: "#42A5F5",
    sensor: "#66BB6A",
    fan: "#26C6DA",
    climate: "#EF5350",
    group: "#9C27B0"
  }[t] || "#9E9E9E";
}
function C_(e) {
  const t = e.split(".")[0];
  return {
    light: "LIGHT",
    switch: "SWITCH",
    sensor: "SENSOR",
    fan: "FAN",
    climate: "CLIMATE",
    group: "GROUP"
  }[t] || t.toUpperCase();
}
function R_(e) {
  if (!e) return !0;
  const t = (e.state || "").toLowerCase();
  return t === "unknown" || t === "unavailable";
}
function qc(e, t) {
  var s;
  const r = t[e];
  if (!r) return { text: "UNKN", bg: "#F44336", unit: "" };
  const n = r.state || "unknown", i = n.toLowerCase();
  if (i === "on") return { text: "ON", bg: "#4CAF50", unit: "" };
  if (i === "off") return { text: "OFF", bg: "#9E9E9E", unit: "" };
  const a = (((s = r.attributes) == null ? void 0 : s.unit_of_measurement) || "").trim();
  return a && !isNaN(parseFloat(n)) ? { text: `${n} ${a}`, bg: "#2196F3", unit: a } : { text: n.substring(0, 8).toUpperCase(), bg: "#2196F3", unit: "" };
}
function T_(e, t = {}) {
  const r = {};
  e.forEach((h) => {
    r[h.entity_id] = h;
  });
  const n = e.filter((h) => Ac(h)), i = new Set(n.map((h) => h.entity_id)), a = /* @__PURE__ */ new Set();
  Object.entries(t).forEach(([h, v]) => {
    v.platform === "group" && i.add(h), v.platform === "template" && a.add(h);
  }), e.filter((h) => Ac(h)).forEach((h) => {
    const [v] = ke(h);
    v.forEach((p) => {
      a.has(p) && i.add(p);
    });
  }), e.forEach((h) => {
    h.entity_id.startsWith("group.") && i.add(h.entity_id);
  });
  const s = {};
  e.forEach((h) => {
    const v = h.entity_id;
    if (!v.startsWith("light.")) return;
    const p = v.replace("light.", "switch.");
    if (!r[p]) return;
    const [g] = ke(r[p]);
    g.length > 0 && (s[v] = p, i.add(v));
  });
  const o = new Set(Object.values(s)), u = [];
  n.forEach((h) => {
    const [v] = ke(h), p = v.some((_) => i.has(_) || a.has(_)), g = o.has(h.entity_id);
    (p || g) && u.push(h);
  }), Object.keys(s).forEach((h) => {
    const v = r[h];
    v && !u.find((p) => p.entity_id === h) && u.push(v);
  });
  const f = /* @__PURE__ */ new Set();
  u.forEach((h) => {
    const [v] = ke(h);
    v.filter((p) => i.has(p)).forEach((p) => f.add(p));
  }), Object.entries(s).forEach(([, h]) => {
    i.has(h) && f.add(h);
  });
  const c = u.filter((h) => !f.has(h.entity_id)).sort((h, v) => ke(v)[0].length - ke(h)[0].length), l = e.filter((h) => {
    const v = (h.state || "").toLowerCase();
    if (v !== "unavailable" && v !== "unknown") return !1;
    const p = t[h.entity_id], g = p && p.platform === "group", _ = h.entity_id.startsWith("group.");
    return g || _;
  }).map((h) => {
    var v, p, g;
    return {
      id: h.entity_id,
      state: h.state,
      members: ((v = h.attributes) == null ? void 0 : v.entity_id) ?? ((p = h.attributes) == null ? void 0 : p.lights) ?? null,
      in_group_ids: i.has(h.entity_id),
      reg_platform: ((g = t[h.entity_id]) == null ? void 0 : g.platform) ?? "(not in reg)"
    };
  }), d = {
    total_states: e.length,
    entity_reg_size: Object.keys(t).length,
    reg_group_platform: Object.entries(t).filter(([, h]) => h.platform === "group").map(([h]) => h),
    group_domain_states: e.filter((h) => h.entity_id.startsWith("group.")).map((h) => {
      var v, p;
      return { id: h.entity_id, state: h.state, members: ((v = h.attributes) == null ? void 0 : v.entity_id) ?? ((p = h.attributes) == null ? void 0 : p.lights) ?? null };
    }),
    groups_with_members: n.map((h) => ({
      id: h.entity_id,
      members: ke(h)[0]
    })),
    hierarchical: u.map((h) => h.entity_id),
    roots: c.map((h) => h.entity_id),
    unavailable_group_candidates: l
  };
  return { roots: c, pairs: s, lookup: r, group_ids: i, _debug: d };
}
const dv = "gv_member_cache_v1";
function k_() {
  try {
    return JSON.parse(localStorage.getItem(dv) || "{}");
  } catch {
    return {};
  }
}
function I_(e) {
  try {
    localStorage.setItem(dv, JSON.stringify(e));
  } catch {
  }
}
async function yr(e, t) {
  try {
    const r = await e.callWS({ type: t });
    if (Array.isArray(r)) return r;
    const n = Object.values(r || {}).find((i) => Array.isArray(i));
    return n || [];
  } catch (r) {
    return console.warn(`[groups-visualizer] WS ${t} failed:`, r), [];
  }
}
async function $c(e) {
  const [t, r, n, i] = await Promise.all([
    yr(e, "get_states"),
    yr(e, "config/entity_registry/list"),
    yr(e, "config/area_registry/list"),
    yr(e, "config/label_registry/list")
  ]), a = {};
  r.forEach((x) => {
    x.entity_id && (a[x.entity_id] = x);
  });
  const s = {};
  t.forEach((x) => {
    s[x.entity_id] = x;
  });
  const o = t.filter((x) => {
    var R, k;
    if (!x.entity_id.startsWith("light.")) return !1;
    const O = s[x.entity_id.replace("light.", "switch.")];
    if (!O) return !1;
    const m = ((R = O.attributes) == null ? void 0 : R.entity_id) ?? ((k = O.attributes) == null ? void 0 : k.lights);
    return Array.isArray(m) && m.length > 0;
  }).map((x) => x.entity_id), u = [.../* @__PURE__ */ new Set([
    ...r.filter((x) => {
      var O;
      return x.platform === "group" || ((O = x.entity_id) == null ? void 0 : O.startsWith("group."));
    }).map((x) => x.entity_id),
    ...o
  ])];
  (await Promise.all(
    u.map(
      (x) => e.callWS({ type: "config/entity_registry/get", entity_id: x }).catch(() => null)
    )
  )).forEach((x) => {
    x != null && x.entity_id && a[x.entity_id] && (a[x.entity_id].aliases = x.aliases || []);
  });
  const c = {};
  n.forEach((x) => {
    x.area_id && (c[x.area_id] = x);
  }), (await Promise.all(
    n.map(
      (x) => e.callWS({ type: "config/area_registry/get", area_id: x.area_id }).catch(() => null)
    )
  )).forEach((x) => {
    x != null && x.area_id && c[x.area_id] && (c[x.area_id].aliases = x.aliases || []);
  });
  const d = {};
  i.forEach((x) => {
    x.label_id && (d[x.label_id] = x);
  });
  let h = {};
  try {
    const x = await e.callWS({ type: "homeassistant/expose_entity/list" });
    x && typeof x == "object" && !Array.isArray(x) && (h = x.exposed_entities ?? x);
  } catch (x) {
    console.warn("[groups-visualizer] expose_entity/list failed:", x);
  }
  const v = { entities: a, areas: c, labels: d, expose: h }, p = {};
  function g(x) {
    if (!Array.isArray(x)) return;
    function O(m, R, k, y) {
      const A = [m];
      for (; A.length; ) {
        const b = A.pop();
        if (!(!b || typeof b != "object")) {
          if (Array.isArray(b)) {
            b.forEach((S) => A.push(S));
            continue;
          }
          for (const [S, $] of Object.entries(b))
            S === "entity_id" ? (Array.isArray($) ? $ : typeof $ == "string" ? [$] : []).forEach((M) => {
              if (typeof M != "string" || !M.includes(".") || /^[0-9a-f]{32}$/i.test(M)) return;
              p[M] || (p[M] = []);
              const P = p[M].find((B) => B.id === k);
              P ? (P.count++, P.sections.includes(R) || P.sections.push(R)) : p[M].push({ id: k, name: y, count: 1, sections: [R] });
            }) : $ && typeof $ == "object" && A.push($);
        }
      }
    }
    x.forEach((m) => {
      if (!m) return;
      const R = m.alias || m.id || "", k = m.id || "";
      O(m.trigger || m.triggers || [], "trigger", k, R), O(m.condition || m.conditions || [], "condition", k, R), O(m.action || m.actions || [], "action", k, R);
    });
  }
  let _ = [];
  try {
    const x = await e.callWS({ type: "config/automation/list" });
    Array.isArray(x) && (_ = x);
  } catch (x) {
    console.warn("[groups-visualizer] config/automation/list WS failed, using REST fallback:", x);
  }
  if (_.length === 0) {
    const x = r.filter((m) => {
      var R;
      return ((R = m.entity_id) == null ? void 0 : R.startsWith("automation.")) && m.unique_id;
    });
    _ = (await Promise.all(
      x.map((m) => e.callApi("GET", "config/automation/config/" + m.unique_id).catch(() => null))
    )).filter(Boolean);
  }
  g(_), v.automations = p;
  const w = k_();
  t.forEach((x) => {
    var m, R, k;
    const O = ((m = x.attributes) == null ? void 0 : m.entity_id) ?? ((R = x.attributes) == null ? void 0 : R.lights);
    Array.isArray(O) && O.length > 0 && (w[x.entity_id] = { attr: (k = x.attributes) != null && k.lights ? "lights" : "entity_id", ids: O });
  }), I_(w);
  const E = t.map((x) => {
    var R, k;
    const O = ((R = x.attributes) == null ? void 0 : R.entity_id) ?? ((k = x.attributes) == null ? void 0 : k.lights);
    if (Array.isArray(O) && O.length > 0) return x;
    const m = w[x.entity_id];
    return m ? { ...x, attributes: { ...x.attributes, [m.attr]: m.ids } } : x;
  }), { roots: q, pairs: I, lookup: T, group_ids: C, _debug: L } = T_(E, a);
  return { roots: q, pairs: I, lookup: T, group_ids: C, registry: v, _debug: L };
}
function Sc(e, t) {
  const r = (t == null ? void 0 : t.show_domains) || {}, n = e.filter((a) => {
    const s = a.entity_id.split(".")[0];
    return Object.keys(r).length === 0 || r[s] === !0;
  }), i = {};
  return n.forEach((a) => {
    const s = S_(a);
    i[s] || (i[s] = []), i[s].push(a);
  }), i;
}
function Cc(e, t) {
  const r = {};
  return Object.entries(e).forEach(([n, i]) => {
    var o;
    const a = t[n], s = a && i.find((u) => u.entity_id === a);
    r[n] = s ? a : (o = i[0]) == null ? void 0 : o.entity_id;
  }), r;
}
function Rc() {
  return (/* @__PURE__ */ new Date()).toLocaleString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: !1
  });
}
var O_ = { value: () => {
} };
function Nu() {
  for (var e = 0, t = arguments.length, r = {}, n; e < t; ++e) {
    if (!(n = arguments[e] + "") || n in r || /[\s.]/.test(n)) throw new Error("illegal type: " + n);
    r[n] = [];
  }
  return new Rr(r);
}
function Rr(e) {
  this._ = e;
}
function M_(e, t) {
  return e.trim().split(/^|\s+/).map(function(r) {
    var n = "", i = r.indexOf(".");
    if (i >= 0 && (n = r.slice(i + 1), r = r.slice(0, i)), r && !t.hasOwnProperty(r)) throw new Error("unknown type: " + r);
    return { type: r, name: n };
  });
}
Rr.prototype = Nu.prototype = {
  constructor: Rr,
  on: function(e, t) {
    var r = this._, n = M_(e + "", r), i, a = -1, s = n.length;
    if (arguments.length < 2) {
      for (; ++a < s; ) if ((i = (e = n[a]).type) && (i = P_(r[i], e.name))) return i;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++a < s; )
      if (i = (e = n[a]).type) r[i] = Tc(r[i], e.name, t);
      else if (t == null) for (i in r) r[i] = Tc(r[i], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var r in t) e[r] = t[r].slice();
    return new Rr(e);
  },
  call: function(e, t) {
    if ((i = arguments.length - 2) > 0) for (var r = new Array(i), n = 0, i, a; n < i; ++n) r[n] = arguments[n + 2];
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (a = this._[e], n = 0, i = a.length; n < i; ++n) a[n].value.apply(t, r);
  },
  apply: function(e, t, r) {
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (var n = this._[e], i = 0, a = n.length; i < a; ++i) n[i].value.apply(t, r);
  }
};
function P_(e, t) {
  for (var r = 0, n = e.length, i; r < n; ++r)
    if ((i = e[r]).name === t)
      return i.value;
}
function Tc(e, t, r) {
  for (var n = 0, i = e.length; n < i; ++n)
    if (e[n].name === t) {
      e[n] = O_, e = e.slice(0, n).concat(e.slice(n + 1));
      break;
    }
  return r != null && e.push({ name: t, value: r }), e;
}
var yu = "http://www.w3.org/1999/xhtml";
const kc = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: yu,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Vr(e) {
  var t = e += "", r = t.indexOf(":");
  return r >= 0 && (t = e.slice(0, r)) !== "xmlns" && (e = e.slice(r + 1)), kc.hasOwnProperty(t) ? { space: kc[t], local: e } : e;
}
function N_(e) {
  return function() {
    var t = this.ownerDocument, r = this.namespaceURI;
    return r === yu && t.documentElement.namespaceURI === yu ? t.createElement(e) : t.createElementNS(r, e);
  };
}
function L_(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function pv(e) {
  var t = Vr(e);
  return (t.local ? L_ : N_)(t);
}
function F_() {
}
function Lu(e) {
  return e == null ? F_ : function() {
    return this.querySelector(e);
  };
}
function D_(e) {
  typeof e != "function" && (e = Lu(e));
  for (var t = this._groups, r = t.length, n = new Array(r), i = 0; i < r; ++i)
    for (var a = t[i], s = a.length, o = n[i] = new Array(s), u, f, c = 0; c < s; ++c)
      (u = a[c]) && (f = e.call(u, u.__data__, c, a)) && ("__data__" in u && (f.__data__ = u.__data__), o[c] = f);
  return new ge(n, this._parents);
}
function z_(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function j_() {
  return [];
}
function vv(e) {
  return e == null ? j_ : function() {
    return this.querySelectorAll(e);
  };
}
function B_(e) {
  return function() {
    return z_(e.apply(this, arguments));
  };
}
function G_(e) {
  typeof e == "function" ? e = B_(e) : e = vv(e);
  for (var t = this._groups, r = t.length, n = [], i = [], a = 0; a < r; ++a)
    for (var s = t[a], o = s.length, u, f = 0; f < o; ++f)
      (u = s[f]) && (n.push(e.call(u, u.__data__, f, s)), i.push(u));
  return new ge(n, i);
}
function gv(e) {
  return function() {
    return this.matches(e);
  };
}
function _v(e) {
  return function(t) {
    return t.matches(e);
  };
}
var U_ = Array.prototype.find;
function H_(e) {
  return function() {
    return U_.call(this.children, e);
  };
}
function V_() {
  return this.firstElementChild;
}
function K_(e) {
  return this.select(e == null ? V_ : H_(typeof e == "function" ? e : _v(e)));
}
var W_ = Array.prototype.filter;
function Y_() {
  return Array.from(this.children);
}
function X_(e) {
  return function() {
    return W_.call(this.children, e);
  };
}
function Z_(e) {
  return this.selectAll(e == null ? Y_ : X_(typeof e == "function" ? e : _v(e)));
}
function J_(e) {
  typeof e != "function" && (e = gv(e));
  for (var t = this._groups, r = t.length, n = new Array(r), i = 0; i < r; ++i)
    for (var a = t[i], s = a.length, o = n[i] = [], u, f = 0; f < s; ++f)
      (u = a[f]) && e.call(u, u.__data__, f, a) && o.push(u);
  return new ge(n, this._parents);
}
function yv(e) {
  return new Array(e.length);
}
function Q_() {
  return new ge(this._enter || this._groups.map(yv), this._parents);
}
function Mr(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
Mr.prototype = {
  constructor: Mr,
  appendChild: function(e) {
    return this._parent.insertBefore(e, this._next);
  },
  insertBefore: function(e, t) {
    return this._parent.insertBefore(e, t);
  },
  querySelector: function(e) {
    return this._parent.querySelector(e);
  },
  querySelectorAll: function(e) {
    return this._parent.querySelectorAll(e);
  }
};
function ey(e) {
  return function() {
    return e;
  };
}
function ty(e, t, r, n, i, a) {
  for (var s = 0, o, u = t.length, f = a.length; s < f; ++s)
    (o = t[s]) ? (o.__data__ = a[s], n[s] = o) : r[s] = new Mr(e, a[s]);
  for (; s < u; ++s)
    (o = t[s]) && (i[s] = o);
}
function ry(e, t, r, n, i, a, s) {
  var o, u, f = /* @__PURE__ */ new Map(), c = t.length, l = a.length, d = new Array(c), h;
  for (o = 0; o < c; ++o)
    (u = t[o]) && (d[o] = h = s.call(u, u.__data__, o, t) + "", f.has(h) ? i[o] = u : f.set(h, u));
  for (o = 0; o < l; ++o)
    h = s.call(e, a[o], o, a) + "", (u = f.get(h)) ? (n[o] = u, u.__data__ = a[o], f.delete(h)) : r[o] = new Mr(e, a[o]);
  for (o = 0; o < c; ++o)
    (u = t[o]) && f.get(d[o]) === u && (i[o] = u);
}
function ny(e) {
  return e.__data__;
}
function iy(e, t) {
  if (!arguments.length) return Array.from(this, ny);
  var r = t ? ry : ty, n = this._parents, i = this._groups;
  typeof e != "function" && (e = ey(e));
  for (var a = i.length, s = new Array(a), o = new Array(a), u = new Array(a), f = 0; f < a; ++f) {
    var c = n[f], l = i[f], d = l.length, h = ay(e.call(c, c && c.__data__, f, n)), v = h.length, p = o[f] = new Array(v), g = s[f] = new Array(v), _ = u[f] = new Array(d);
    r(c, l, p, g, _, h, t);
    for (var w = 0, E = 0, q, I; w < v; ++w)
      if (q = p[w]) {
        for (w >= E && (E = w + 1); !(I = g[E]) && ++E < v; ) ;
        q._next = I || null;
      }
  }
  return s = new ge(s, n), s._enter = o, s._exit = u, s;
}
function ay(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function sy() {
  return new ge(this._exit || this._groups.map(yv), this._parents);
}
function oy(e, t, r) {
  var n = this.enter(), i = this, a = this.exit();
  return typeof e == "function" ? (n = e(n), n && (n = n.selection())) : n = n.append(e + ""), t != null && (i = t(i), i && (i = i.selection())), r == null ? a.remove() : r(a), n && i ? n.merge(i).order() : i;
}
function uy(e) {
  for (var t = e.selection ? e.selection() : e, r = this._groups, n = t._groups, i = r.length, a = n.length, s = Math.min(i, a), o = new Array(i), u = 0; u < s; ++u)
    for (var f = r[u], c = n[u], l = f.length, d = o[u] = new Array(l), h, v = 0; v < l; ++v)
      (h = f[v] || c[v]) && (d[v] = h);
  for (; u < i; ++u)
    o[u] = r[u];
  return new ge(o, this._parents);
}
function cy() {
  for (var e = this._groups, t = -1, r = e.length; ++t < r; )
    for (var n = e[t], i = n.length - 1, a = n[i], s; --i >= 0; )
      (s = n[i]) && (a && s.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(s, a), a = s);
  return this;
}
function fy(e) {
  e || (e = ly);
  function t(l, d) {
    return l && d ? e(l.__data__, d.__data__) : !l - !d;
  }
  for (var r = this._groups, n = r.length, i = new Array(n), a = 0; a < n; ++a) {
    for (var s = r[a], o = s.length, u = i[a] = new Array(o), f, c = 0; c < o; ++c)
      (f = s[c]) && (u[c] = f);
    u.sort(t);
  }
  return new ge(i, this._parents).order();
}
function ly(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function hy() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function dy() {
  return Array.from(this);
}
function py() {
  for (var e = this._groups, t = 0, r = e.length; t < r; ++t)
    for (var n = e[t], i = 0, a = n.length; i < a; ++i) {
      var s = n[i];
      if (s) return s;
    }
  return null;
}
function vy() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function gy() {
  return !this.node();
}
function _y(e) {
  for (var t = this._groups, r = 0, n = t.length; r < n; ++r)
    for (var i = t[r], a = 0, s = i.length, o; a < s; ++a)
      (o = i[a]) && e.call(o, o.__data__, a, i);
  return this;
}
function yy(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function by(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function my(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function xy(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function wy(e, t) {
  return function() {
    var r = t.apply(this, arguments);
    r == null ? this.removeAttribute(e) : this.setAttribute(e, r);
  };
}
function Ey(e, t) {
  return function() {
    var r = t.apply(this, arguments);
    r == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, r);
  };
}
function Ay(e, t) {
  var r = Vr(e);
  if (arguments.length < 2) {
    var n = this.node();
    return r.local ? n.getAttributeNS(r.space, r.local) : n.getAttribute(r);
  }
  return this.each((t == null ? r.local ? by : yy : typeof t == "function" ? r.local ? Ey : wy : r.local ? xy : my)(r, t));
}
function bv(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function qy(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function $y(e, t, r) {
  return function() {
    this.style.setProperty(e, t, r);
  };
}
function Sy(e, t, r) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.style.removeProperty(e) : this.style.setProperty(e, n, r);
  };
}
function Cy(e, t, r) {
  return arguments.length > 1 ? this.each((t == null ? qy : typeof t == "function" ? Sy : $y)(e, t, r ?? "")) : Mt(this.node(), e);
}
function Mt(e, t) {
  return e.style.getPropertyValue(t) || bv(e).getComputedStyle(e, null).getPropertyValue(t);
}
function Ry(e) {
  return function() {
    delete this[e];
  };
}
function Ty(e, t) {
  return function() {
    this[e] = t;
  };
}
function ky(e, t) {
  return function() {
    var r = t.apply(this, arguments);
    r == null ? delete this[e] : this[e] = r;
  };
}
function Iy(e, t) {
  return arguments.length > 1 ? this.each((t == null ? Ry : typeof t == "function" ? ky : Ty)(e, t)) : this.node()[e];
}
function mv(e) {
  return e.trim().split(/^|\s+/);
}
function Fu(e) {
  return e.classList || new xv(e);
}
function xv(e) {
  this._node = e, this._names = mv(e.getAttribute("class") || "");
}
xv.prototype = {
  add: function(e) {
    var t = this._names.indexOf(e);
    t < 0 && (this._names.push(e), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(e) {
    var t = this._names.indexOf(e);
    t >= 0 && (this._names.splice(t, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(e) {
    return this._names.indexOf(e) >= 0;
  }
};
function wv(e, t) {
  for (var r = Fu(e), n = -1, i = t.length; ++n < i; ) r.add(t[n]);
}
function Ev(e, t) {
  for (var r = Fu(e), n = -1, i = t.length; ++n < i; ) r.remove(t[n]);
}
function Oy(e) {
  return function() {
    wv(this, e);
  };
}
function My(e) {
  return function() {
    Ev(this, e);
  };
}
function Py(e, t) {
  return function() {
    (t.apply(this, arguments) ? wv : Ev)(this, e);
  };
}
function Ny(e, t) {
  var r = mv(e + "");
  if (arguments.length < 2) {
    for (var n = Fu(this.node()), i = -1, a = r.length; ++i < a; ) if (!n.contains(r[i])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? Py : t ? Oy : My)(r, t));
}
function Ly() {
  this.textContent = "";
}
function Fy(e) {
  return function() {
    this.textContent = e;
  };
}
function Dy(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function zy(e) {
  return arguments.length ? this.each(e == null ? Ly : (typeof e == "function" ? Dy : Fy)(e)) : this.node().textContent;
}
function jy() {
  this.innerHTML = "";
}
function By(e) {
  return function() {
    this.innerHTML = e;
  };
}
function Gy(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function Uy(e) {
  return arguments.length ? this.each(e == null ? jy : (typeof e == "function" ? Gy : By)(e)) : this.node().innerHTML;
}
function Hy() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Vy() {
  return this.each(Hy);
}
function Ky() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Wy() {
  return this.each(Ky);
}
function Yy(e) {
  var t = typeof e == "function" ? e : pv(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function Xy() {
  return null;
}
function Zy(e, t) {
  var r = typeof e == "function" ? e : pv(e), n = t == null ? Xy : typeof t == "function" ? t : Lu(t);
  return this.select(function() {
    return this.insertBefore(r.apply(this, arguments), n.apply(this, arguments) || null);
  });
}
function Jy() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function Qy() {
  return this.each(Jy);
}
function eb() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function tb() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function rb(e) {
  return this.select(e ? tb : eb);
}
function nb(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function ib(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function ab(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var r = "", n = t.indexOf(".");
    return n >= 0 && (r = t.slice(n + 1), t = t.slice(0, n)), { type: t, name: r };
  });
}
function sb(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var r = 0, n = -1, i = t.length, a; r < i; ++r)
        a = t[r], (!e.type || a.type === e.type) && a.name === e.name ? this.removeEventListener(a.type, a.listener, a.options) : t[++n] = a;
      ++n ? t.length = n : delete this.__on;
    }
  };
}
function ob(e, t, r) {
  return function() {
    var n = this.__on, i, a = ib(t);
    if (n) {
      for (var s = 0, o = n.length; s < o; ++s)
        if ((i = n[s]).type === e.type && i.name === e.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = a, i.options = r), i.value = t;
          return;
        }
    }
    this.addEventListener(e.type, a, r), i = { type: e.type, name: e.name, value: t, listener: a, options: r }, n ? n.push(i) : this.__on = [i];
  };
}
function ub(e, t, r) {
  var n = ab(e + ""), i, a = n.length, s;
  if (arguments.length < 2) {
    var o = this.node().__on;
    if (o) {
      for (var u = 0, f = o.length, c; u < f; ++u)
        for (i = 0, c = o[u]; i < a; ++i)
          if ((s = n[i]).type === c.type && s.name === c.name)
            return c.value;
    }
    return;
  }
  for (o = t ? ob : sb, i = 0; i < a; ++i) this.each(o(n[i], t, r));
  return this;
}
function Av(e, t, r) {
  var n = bv(e), i = n.CustomEvent;
  typeof i == "function" ? i = new i(t, r) : (i = n.document.createEvent("Event"), r ? (i.initEvent(t, r.bubbles, r.cancelable), i.detail = r.detail) : i.initEvent(t, !1, !1)), e.dispatchEvent(i);
}
function cb(e, t) {
  return function() {
    return Av(this, e, t);
  };
}
function fb(e, t) {
  return function() {
    return Av(this, e, t.apply(this, arguments));
  };
}
function lb(e, t) {
  return this.each((typeof t == "function" ? fb : cb)(e, t));
}
function* hb() {
  for (var e = this._groups, t = 0, r = e.length; t < r; ++t)
    for (var n = e[t], i = 0, a = n.length, s; i < a; ++i)
      (s = n[i]) && (yield s);
}
var qv = [null];
function ge(e, t) {
  this._groups = e, this._parents = t;
}
function fr() {
  return new ge([[document.documentElement]], qv);
}
function db() {
  return this;
}
ge.prototype = fr.prototype = {
  constructor: ge,
  select: D_,
  selectAll: G_,
  selectChild: K_,
  selectChildren: Z_,
  filter: J_,
  data: iy,
  enter: Q_,
  exit: sy,
  join: oy,
  merge: uy,
  selection: db,
  order: cy,
  sort: fy,
  call: hy,
  nodes: dy,
  node: py,
  size: vy,
  empty: gy,
  each: _y,
  attr: Ay,
  style: Cy,
  property: Iy,
  classed: Ny,
  text: zy,
  html: Uy,
  raise: Vy,
  lower: Wy,
  append: Yy,
  insert: Zy,
  remove: Qy,
  clone: rb,
  datum: nb,
  on: ub,
  dispatch: lb,
  [Symbol.iterator]: hb
};
function Ie(e) {
  return typeof e == "string" ? new ge([[document.querySelector(e)]], [document.documentElement]) : new ge([[e]], qv);
}
function pb(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function lt(e, t) {
  if (e = pb(e), t === void 0 && (t = e.currentTarget), t) {
    var r = t.ownerSVGElement || t;
    if (r.createSVGPoint) {
      var n = r.createSVGPoint();
      return n.x = e.clientX, n.y = e.clientY, n = n.matrixTransform(t.getScreenCTM().inverse()), [n.x, n.y];
    }
    if (t.getBoundingClientRect) {
      var i = t.getBoundingClientRect();
      return [e.clientX - i.left - t.clientLeft, e.clientY - i.top - t.clientTop];
    }
  }
  return [e.pageX, e.pageY];
}
const bu = { capture: !0, passive: !1 };
function mu(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function vb(e) {
  var t = e.document.documentElement, r = Ie(e).on("dragstart.drag", mu, bu);
  "onselectstart" in t ? r.on("selectstart.drag", mu, bu) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function gb(e, t) {
  var r = e.document.documentElement, n = Ie(e).on("dragstart.drag", null);
  t && (n.on("click.drag", mu, bu), setTimeout(function() {
    n.on("click.drag", null);
  }, 0)), "onselectstart" in r ? n.on("selectstart.drag", null) : (r.style.MozUserSelect = r.__noselect, delete r.__noselect);
}
function Du(e, t, r) {
  e.prototype = t.prototype = r, r.constructor = e;
}
function $v(e, t) {
  var r = Object.create(e.prototype);
  for (var n in t) r[n] = t[n];
  return r;
}
function lr() {
}
var ar = 0.7, Pr = 1 / ar, Tt = "\\s*([+-]?\\d+)\\s*", sr = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Me = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", _b = /^#([0-9a-f]{3,8})$/, yb = new RegExp(`^rgb\\(${Tt},${Tt},${Tt}\\)$`), bb = new RegExp(`^rgb\\(${Me},${Me},${Me}\\)$`), mb = new RegExp(`^rgba\\(${Tt},${Tt},${Tt},${sr}\\)$`), xb = new RegExp(`^rgba\\(${Me},${Me},${Me},${sr}\\)$`), wb = new RegExp(`^hsl\\(${sr},${Me},${Me}\\)$`), Eb = new RegExp(`^hsla\\(${sr},${Me},${Me},${sr}\\)$`), Ic = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
Du(lr, or, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Oc,
  // Deprecated! Use color.formatHex.
  formatHex: Oc,
  formatHex8: Ab,
  formatHsl: qb,
  formatRgb: Mc,
  toString: Mc
});
function Oc() {
  return this.rgb().formatHex();
}
function Ab() {
  return this.rgb().formatHex8();
}
function qb() {
  return Sv(this).formatHsl();
}
function Mc() {
  return this.rgb().formatRgb();
}
function or(e) {
  var t, r;
  return e = (e + "").trim().toLowerCase(), (t = _b.exec(e)) ? (r = t[1].length, t = parseInt(t[1], 16), r === 6 ? Pc(t) : r === 3 ? new le(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : r === 8 ? br(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : r === 4 ? br(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = yb.exec(e)) ? new le(t[1], t[2], t[3], 1) : (t = bb.exec(e)) ? new le(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = mb.exec(e)) ? br(t[1], t[2], t[3], t[4]) : (t = xb.exec(e)) ? br(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = wb.exec(e)) ? Fc(t[1], t[2] / 100, t[3] / 100, 1) : (t = Eb.exec(e)) ? Fc(t[1], t[2] / 100, t[3] / 100, t[4]) : Ic.hasOwnProperty(e) ? Pc(Ic[e]) : e === "transparent" ? new le(NaN, NaN, NaN, 0) : null;
}
function Pc(e) {
  return new le(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function br(e, t, r, n) {
  return n <= 0 && (e = t = r = NaN), new le(e, t, r, n);
}
function $b(e) {
  return e instanceof lr || (e = or(e)), e ? (e = e.rgb(), new le(e.r, e.g, e.b, e.opacity)) : new le();
}
function xu(e, t, r, n) {
  return arguments.length === 1 ? $b(e) : new le(e, t, r, n ?? 1);
}
function le(e, t, r, n) {
  this.r = +e, this.g = +t, this.b = +r, this.opacity = +n;
}
Du(le, xu, $v(lr, {
  brighter(e) {
    return e = e == null ? Pr : Math.pow(Pr, e), new le(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? ar : Math.pow(ar, e), new le(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new le(yt(this.r), yt(this.g), yt(this.b), Nr(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Nc,
  // Deprecated! Use color.formatHex.
  formatHex: Nc,
  formatHex8: Sb,
  formatRgb: Lc,
  toString: Lc
}));
function Nc() {
  return `#${pt(this.r)}${pt(this.g)}${pt(this.b)}`;
}
function Sb() {
  return `#${pt(this.r)}${pt(this.g)}${pt(this.b)}${pt((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Lc() {
  const e = Nr(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${yt(this.r)}, ${yt(this.g)}, ${yt(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Nr(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function yt(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function pt(e) {
  return e = yt(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Fc(e, t, r, n) {
  return n <= 0 ? e = t = r = NaN : r <= 0 || r >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new qe(e, t, r, n);
}
function Sv(e) {
  if (e instanceof qe) return new qe(e.h, e.s, e.l, e.opacity);
  if (e instanceof lr || (e = or(e)), !e) return new qe();
  if (e instanceof qe) return e;
  e = e.rgb();
  var t = e.r / 255, r = e.g / 255, n = e.b / 255, i = Math.min(t, r, n), a = Math.max(t, r, n), s = NaN, o = a - i, u = (a + i) / 2;
  return o ? (t === a ? s = (r - n) / o + (r < n) * 6 : r === a ? s = (n - t) / o + 2 : s = (t - r) / o + 4, o /= u < 0.5 ? a + i : 2 - a - i, s *= 60) : o = u > 0 && u < 1 ? 0 : s, new qe(s, o, u, e.opacity);
}
function Cb(e, t, r, n) {
  return arguments.length === 1 ? Sv(e) : new qe(e, t, r, n ?? 1);
}
function qe(e, t, r, n) {
  this.h = +e, this.s = +t, this.l = +r, this.opacity = +n;
}
Du(qe, Cb, $v(lr, {
  brighter(e) {
    return e = e == null ? Pr : Math.pow(Pr, e), new qe(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? ar : Math.pow(ar, e), new qe(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, r = this.l, n = r + (r < 0.5 ? r : 1 - r) * t, i = 2 * r - n;
    return new le(
      mn(e >= 240 ? e - 240 : e + 120, i, n),
      mn(e, i, n),
      mn(e < 120 ? e + 240 : e - 120, i, n),
      this.opacity
    );
  },
  clamp() {
    return new qe(Dc(this.h), mr(this.s), mr(this.l), Nr(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = Nr(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Dc(this.h)}, ${mr(this.s) * 100}%, ${mr(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Dc(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function mr(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function mn(e, t, r) {
  return (e < 60 ? t + (r - t) * e / 60 : e < 180 ? r : e < 240 ? t + (r - t) * (240 - e) / 60 : t) * 255;
}
const Cv = (e) => () => e;
function Rb(e, t) {
  return function(r) {
    return e + r * t;
  };
}
function Tb(e, t, r) {
  return e = Math.pow(e, r), t = Math.pow(t, r) - e, r = 1 / r, function(n) {
    return Math.pow(e + n * t, r);
  };
}
function kb(e) {
  return (e = +e) == 1 ? Rv : function(t, r) {
    return r - t ? Tb(t, r, e) : Cv(isNaN(t) ? r : t);
  };
}
function Rv(e, t) {
  var r = t - e;
  return r ? Rb(e, r) : Cv(isNaN(e) ? t : e);
}
const zc = function e(t) {
  var r = kb(t);
  function n(i, a) {
    var s = r((i = xu(i)).r, (a = xu(a)).r), o = r(i.g, a.g), u = r(i.b, a.b), f = Rv(i.opacity, a.opacity);
    return function(c) {
      return i.r = s(c), i.g = o(c), i.b = u(c), i.opacity = f(c), i + "";
    };
  }
  return n.gamma = e, n;
}(1);
function Qe(e, t) {
  return e = +e, t = +t, function(r) {
    return e * (1 - r) + t * r;
  };
}
var wu = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, xn = new RegExp(wu.source, "g");
function Ib(e) {
  return function() {
    return e;
  };
}
function Ob(e) {
  return function(t) {
    return e(t) + "";
  };
}
function Mb(e, t) {
  var r = wu.lastIndex = xn.lastIndex = 0, n, i, a, s = -1, o = [], u = [];
  for (e = e + "", t = t + ""; (n = wu.exec(e)) && (i = xn.exec(t)); )
    (a = i.index) > r && (a = t.slice(r, a), o[s] ? o[s] += a : o[++s] = a), (n = n[0]) === (i = i[0]) ? o[s] ? o[s] += i : o[++s] = i : (o[++s] = null, u.push({ i: s, x: Qe(n, i) })), r = xn.lastIndex;
  return r < t.length && (a = t.slice(r), o[s] ? o[s] += a : o[++s] = a), o.length < 2 ? u[0] ? Ob(u[0].x) : Ib(t) : (t = u.length, function(f) {
    for (var c = 0, l; c < t; ++c) o[(l = u[c]).i] = l.x(f);
    return o.join("");
  });
}
var jc = 180 / Math.PI, Eu = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Tv(e, t, r, n, i, a) {
  var s, o, u;
  return (s = Math.sqrt(e * e + t * t)) && (e /= s, t /= s), (u = e * r + t * n) && (r -= e * u, n -= t * u), (o = Math.sqrt(r * r + n * n)) && (r /= o, n /= o, u /= o), e * n < t * r && (e = -e, t = -t, u = -u, s = -s), {
    translateX: i,
    translateY: a,
    rotate: Math.atan2(t, e) * jc,
    skewX: Math.atan(u) * jc,
    scaleX: s,
    scaleY: o
  };
}
var xr;
function Pb(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? Eu : Tv(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Nb(e) {
  return e == null || (xr || (xr = document.createElementNS("http://www.w3.org/2000/svg", "g")), xr.setAttribute("transform", e), !(e = xr.transform.baseVal.consolidate())) ? Eu : (e = e.matrix, Tv(e.a, e.b, e.c, e.d, e.e, e.f));
}
function kv(e, t, r, n) {
  function i(f) {
    return f.length ? f.pop() + " " : "";
  }
  function a(f, c, l, d, h, v) {
    if (f !== l || c !== d) {
      var p = h.push("translate(", null, t, null, r);
      v.push({ i: p - 4, x: Qe(f, l) }, { i: p - 2, x: Qe(c, d) });
    } else (l || d) && h.push("translate(" + l + t + d + r);
  }
  function s(f, c, l, d) {
    f !== c ? (f - c > 180 ? c += 360 : c - f > 180 && (f += 360), d.push({ i: l.push(i(l) + "rotate(", null, n) - 2, x: Qe(f, c) })) : c && l.push(i(l) + "rotate(" + c + n);
  }
  function o(f, c, l, d) {
    f !== c ? d.push({ i: l.push(i(l) + "skewX(", null, n) - 2, x: Qe(f, c) }) : c && l.push(i(l) + "skewX(" + c + n);
  }
  function u(f, c, l, d, h, v) {
    if (f !== l || c !== d) {
      var p = h.push(i(h) + "scale(", null, ",", null, ")");
      v.push({ i: p - 4, x: Qe(f, l) }, { i: p - 2, x: Qe(c, d) });
    } else (l !== 1 || d !== 1) && h.push(i(h) + "scale(" + l + "," + d + ")");
  }
  return function(f, c) {
    var l = [], d = [];
    return f = e(f), c = e(c), a(f.translateX, f.translateY, c.translateX, c.translateY, l, d), s(f.rotate, c.rotate, l, d), o(f.skewX, c.skewX, l, d), u(f.scaleX, f.scaleY, c.scaleX, c.scaleY, l, d), f = c = null, function(h) {
      for (var v = -1, p = d.length, g; ++v < p; ) l[(g = d[v]).i] = g.x(h);
      return l.join("");
    };
  };
}
var Lb = kv(Pb, "px, ", "px)", "deg)"), Fb = kv(Nb, ", ", ")", ")"), Db = 1e-12;
function Bc(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function zb(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function jb(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Bb = function e(t, r, n) {
  function i(a, s) {
    var o = a[0], u = a[1], f = a[2], c = s[0], l = s[1], d = s[2], h = c - o, v = l - u, p = h * h + v * v, g, _;
    if (p < Db)
      _ = Math.log(d / f) / t, g = function(C) {
        return [
          o + C * h,
          u + C * v,
          f * Math.exp(t * C * _)
        ];
      };
    else {
      var w = Math.sqrt(p), E = (d * d - f * f + n * p) / (2 * f * r * w), q = (d * d - f * f - n * p) / (2 * d * r * w), I = Math.log(Math.sqrt(E * E + 1) - E), T = Math.log(Math.sqrt(q * q + 1) - q);
      _ = (T - I) / t, g = function(C) {
        var L = C * _, x = Bc(I), O = f / (r * w) * (x * jb(t * L + I) - zb(I));
        return [
          o + O * h,
          u + O * v,
          f * x / Bc(t * L + I)
        ];
      };
    }
    return g.duration = _ * 1e3 * t / Math.SQRT2, g;
  }
  return i.rho = function(a) {
    var s = Math.max(1e-3, +a), o = s * s, u = o * o;
    return e(s, o, u);
  }, i;
}(Math.SQRT2, 2, 4);
var Pt = 0, Ht = 0, Bt = 0, Iv = 1e3, Lr, Vt, Fr = 0, mt = 0, Kr = 0, ur = typeof performance == "object" && performance.now ? performance : Date, Ov = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function zu() {
  return mt || (Ov(Gb), mt = ur.now() + Kr);
}
function Gb() {
  mt = 0;
}
function Dr() {
  this._call = this._time = this._next = null;
}
Dr.prototype = Mv.prototype = {
  constructor: Dr,
  restart: function(e, t, r) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    r = (r == null ? zu() : +r) + (t == null ? 0 : +t), !this._next && Vt !== this && (Vt ? Vt._next = this : Lr = this, Vt = this), this._call = e, this._time = r, Au();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Au());
  }
};
function Mv(e, t, r) {
  var n = new Dr();
  return n.restart(e, t, r), n;
}
function Ub() {
  zu(), ++Pt;
  for (var e = Lr, t; e; )
    (t = mt - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --Pt;
}
function Gc() {
  mt = (Fr = ur.now()) + Kr, Pt = Ht = 0;
  try {
    Ub();
  } finally {
    Pt = 0, Vb(), mt = 0;
  }
}
function Hb() {
  var e = ur.now(), t = e - Fr;
  t > Iv && (Kr -= t, Fr = e);
}
function Vb() {
  for (var e, t = Lr, r, n = 1 / 0; t; )
    t._call ? (n > t._time && (n = t._time), e = t, t = t._next) : (r = t._next, t._next = null, t = e ? e._next = r : Lr = r);
  Vt = e, Au(n);
}
function Au(e) {
  if (!Pt) {
    Ht && (Ht = clearTimeout(Ht));
    var t = e - mt;
    t > 24 ? (e < 1 / 0 && (Ht = setTimeout(Gc, e - ur.now() - Kr)), Bt && (Bt = clearInterval(Bt))) : (Bt || (Fr = ur.now(), Bt = setInterval(Hb, Iv)), Pt = 1, Ov(Gc));
  }
}
function Uc(e, t, r) {
  var n = new Dr();
  return t = t == null ? 0 : +t, n.restart((i) => {
    n.stop(), e(i + t);
  }, t, r), n;
}
var Kb = Nu("start", "end", "cancel", "interrupt"), Wb = [], Pv = 0, Hc = 1, qu = 2, Tr = 3, Vc = 4, $u = 5, kr = 6;
function Wr(e, t, r, n, i, a) {
  var s = e.__transition;
  if (!s) e.__transition = {};
  else if (r in s) return;
  Yb(e, r, {
    name: t,
    index: n,
    // For context during callback.
    group: i,
    // For context during callback.
    on: Kb,
    tween: Wb,
    time: a.time,
    delay: a.delay,
    duration: a.duration,
    ease: a.ease,
    timer: null,
    state: Pv
  });
}
function ju(e, t) {
  var r = $e(e, t);
  if (r.state > Pv) throw new Error("too late; already scheduled");
  return r;
}
function Pe(e, t) {
  var r = $e(e, t);
  if (r.state > Tr) throw new Error("too late; already running");
  return r;
}
function $e(e, t) {
  var r = e.__transition;
  if (!r || !(r = r[t])) throw new Error("transition not found");
  return r;
}
function Yb(e, t, r) {
  var n = e.__transition, i;
  n[t] = r, r.timer = Mv(a, 0, r.time);
  function a(f) {
    r.state = Hc, r.timer.restart(s, r.delay, r.time), r.delay <= f && s(f - r.delay);
  }
  function s(f) {
    var c, l, d, h;
    if (r.state !== Hc) return u();
    for (c in n)
      if (h = n[c], h.name === r.name) {
        if (h.state === Tr) return Uc(s);
        h.state === Vc ? (h.state = kr, h.timer.stop(), h.on.call("interrupt", e, e.__data__, h.index, h.group), delete n[c]) : +c < t && (h.state = kr, h.timer.stop(), h.on.call("cancel", e, e.__data__, h.index, h.group), delete n[c]);
      }
    if (Uc(function() {
      r.state === Tr && (r.state = Vc, r.timer.restart(o, r.delay, r.time), o(f));
    }), r.state = qu, r.on.call("start", e, e.__data__, r.index, r.group), r.state === qu) {
      for (r.state = Tr, i = new Array(d = r.tween.length), c = 0, l = -1; c < d; ++c)
        (h = r.tween[c].value.call(e, e.__data__, r.index, r.group)) && (i[++l] = h);
      i.length = l + 1;
    }
  }
  function o(f) {
    for (var c = f < r.duration ? r.ease.call(null, f / r.duration) : (r.timer.restart(u), r.state = $u, 1), l = -1, d = i.length; ++l < d; )
      i[l].call(e, c);
    r.state === $u && (r.on.call("end", e, e.__data__, r.index, r.group), u());
  }
  function u() {
    r.state = kr, r.timer.stop(), delete n[t];
    for (var f in n) return;
    delete e.__transition;
  }
}
function Ir(e, t) {
  var r = e.__transition, n, i, a = !0, s;
  if (r) {
    t = t == null ? null : t + "";
    for (s in r) {
      if ((n = r[s]).name !== t) {
        a = !1;
        continue;
      }
      i = n.state > qu && n.state < $u, n.state = kr, n.timer.stop(), n.on.call(i ? "interrupt" : "cancel", e, e.__data__, n.index, n.group), delete r[s];
    }
    a && delete e.__transition;
  }
}
function Xb(e) {
  return this.each(function() {
    Ir(this, e);
  });
}
function Zb(e, t) {
  var r, n;
  return function() {
    var i = Pe(this, e), a = i.tween;
    if (a !== r) {
      n = r = a;
      for (var s = 0, o = n.length; s < o; ++s)
        if (n[s].name === t) {
          n = n.slice(), n.splice(s, 1);
          break;
        }
    }
    i.tween = n;
  };
}
function Jb(e, t, r) {
  var n, i;
  if (typeof r != "function") throw new Error();
  return function() {
    var a = Pe(this, e), s = a.tween;
    if (s !== n) {
      i = (n = s).slice();
      for (var o = { name: t, value: r }, u = 0, f = i.length; u < f; ++u)
        if (i[u].name === t) {
          i[u] = o;
          break;
        }
      u === f && i.push(o);
    }
    a.tween = i;
  };
}
function Qb(e, t) {
  var r = this._id;
  if (e += "", arguments.length < 2) {
    for (var n = $e(this.node(), r).tween, i = 0, a = n.length, s; i < a; ++i)
      if ((s = n[i]).name === e)
        return s.value;
    return null;
  }
  return this.each((t == null ? Zb : Jb)(r, e, t));
}
function Bu(e, t, r) {
  var n = e._id;
  return e.each(function() {
    var i = Pe(this, n);
    (i.value || (i.value = {}))[t] = r.apply(this, arguments);
  }), function(i) {
    return $e(i, n).value[t];
  };
}
function Nv(e, t) {
  var r;
  return (typeof t == "number" ? Qe : t instanceof or ? zc : (r = or(t)) ? (t = r, zc) : Mb)(e, t);
}
function em(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function tm(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function rm(e, t, r) {
  var n, i = r + "", a;
  return function() {
    var s = this.getAttribute(e);
    return s === i ? null : s === n ? a : a = t(n = s, r);
  };
}
function nm(e, t, r) {
  var n, i = r + "", a;
  return function() {
    var s = this.getAttributeNS(e.space, e.local);
    return s === i ? null : s === n ? a : a = t(n = s, r);
  };
}
function im(e, t, r) {
  var n, i, a;
  return function() {
    var s, o = r(this), u;
    return o == null ? void this.removeAttribute(e) : (s = this.getAttribute(e), u = o + "", s === u ? null : s === n && u === i ? a : (i = u, a = t(n = s, o)));
  };
}
function am(e, t, r) {
  var n, i, a;
  return function() {
    var s, o = r(this), u;
    return o == null ? void this.removeAttributeNS(e.space, e.local) : (s = this.getAttributeNS(e.space, e.local), u = o + "", s === u ? null : s === n && u === i ? a : (i = u, a = t(n = s, o)));
  };
}
function sm(e, t) {
  var r = Vr(e), n = r === "transform" ? Fb : Nv;
  return this.attrTween(e, typeof t == "function" ? (r.local ? am : im)(r, n, Bu(this, "attr." + e, t)) : t == null ? (r.local ? tm : em)(r) : (r.local ? nm : rm)(r, n, t));
}
function om(e, t) {
  return function(r) {
    this.setAttribute(e, t.call(this, r));
  };
}
function um(e, t) {
  return function(r) {
    this.setAttributeNS(e.space, e.local, t.call(this, r));
  };
}
function cm(e, t) {
  var r, n;
  function i() {
    var a = t.apply(this, arguments);
    return a !== n && (r = (n = a) && um(e, a)), r;
  }
  return i._value = t, i;
}
function fm(e, t) {
  var r, n;
  function i() {
    var a = t.apply(this, arguments);
    return a !== n && (r = (n = a) && om(e, a)), r;
  }
  return i._value = t, i;
}
function lm(e, t) {
  var r = "attr." + e;
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (t == null) return this.tween(r, null);
  if (typeof t != "function") throw new Error();
  var n = Vr(e);
  return this.tween(r, (n.local ? cm : fm)(n, t));
}
function hm(e, t) {
  return function() {
    ju(this, e).delay = +t.apply(this, arguments);
  };
}
function dm(e, t) {
  return t = +t, function() {
    ju(this, e).delay = t;
  };
}
function pm(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? hm : dm)(t, e)) : $e(this.node(), t).delay;
}
function vm(e, t) {
  return function() {
    Pe(this, e).duration = +t.apply(this, arguments);
  };
}
function gm(e, t) {
  return t = +t, function() {
    Pe(this, e).duration = t;
  };
}
function _m(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? vm : gm)(t, e)) : $e(this.node(), t).duration;
}
function ym(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    Pe(this, e).ease = t;
  };
}
function bm(e) {
  var t = this._id;
  return arguments.length ? this.each(ym(t, e)) : $e(this.node(), t).ease;
}
function mm(e, t) {
  return function() {
    var r = t.apply(this, arguments);
    if (typeof r != "function") throw new Error();
    Pe(this, e).ease = r;
  };
}
function xm(e) {
  if (typeof e != "function") throw new Error();
  return this.each(mm(this._id, e));
}
function wm(e) {
  typeof e != "function" && (e = gv(e));
  for (var t = this._groups, r = t.length, n = new Array(r), i = 0; i < r; ++i)
    for (var a = t[i], s = a.length, o = n[i] = [], u, f = 0; f < s; ++f)
      (u = a[f]) && e.call(u, u.__data__, f, a) && o.push(u);
  return new Ue(n, this._parents, this._name, this._id);
}
function Em(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, r = e._groups, n = t.length, i = r.length, a = Math.min(n, i), s = new Array(n), o = 0; o < a; ++o)
    for (var u = t[o], f = r[o], c = u.length, l = s[o] = new Array(c), d, h = 0; h < c; ++h)
      (d = u[h] || f[h]) && (l[h] = d);
  for (; o < n; ++o)
    s[o] = t[o];
  return new Ue(s, this._parents, this._name, this._id);
}
function Am(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var r = t.indexOf(".");
    return r >= 0 && (t = t.slice(0, r)), !t || t === "start";
  });
}
function qm(e, t, r) {
  var n, i, a = Am(t) ? ju : Pe;
  return function() {
    var s = a(this, e), o = s.on;
    o !== n && (i = (n = o).copy()).on(t, r), s.on = i;
  };
}
function $m(e, t) {
  var r = this._id;
  return arguments.length < 2 ? $e(this.node(), r).on.on(e) : this.each(qm(r, e, t));
}
function Sm(e) {
  return function() {
    var t = this.parentNode;
    for (var r in this.__transition) if (+r !== e) return;
    t && t.removeChild(this);
  };
}
function Cm() {
  return this.on("end.remove", Sm(this._id));
}
function Rm(e) {
  var t = this._name, r = this._id;
  typeof e != "function" && (e = Lu(e));
  for (var n = this._groups, i = n.length, a = new Array(i), s = 0; s < i; ++s)
    for (var o = n[s], u = o.length, f = a[s] = new Array(u), c, l, d = 0; d < u; ++d)
      (c = o[d]) && (l = e.call(c, c.__data__, d, o)) && ("__data__" in c && (l.__data__ = c.__data__), f[d] = l, Wr(f[d], t, r, d, f, $e(c, r)));
  return new Ue(a, this._parents, t, r);
}
function Tm(e) {
  var t = this._name, r = this._id;
  typeof e != "function" && (e = vv(e));
  for (var n = this._groups, i = n.length, a = [], s = [], o = 0; o < i; ++o)
    for (var u = n[o], f = u.length, c, l = 0; l < f; ++l)
      if (c = u[l]) {
        for (var d = e.call(c, c.__data__, l, u), h, v = $e(c, r), p = 0, g = d.length; p < g; ++p)
          (h = d[p]) && Wr(h, t, r, p, d, v);
        a.push(d), s.push(c);
      }
  return new Ue(a, s, t, r);
}
var km = fr.prototype.constructor;
function Im() {
  return new km(this._groups, this._parents);
}
function Om(e, t) {
  var r, n, i;
  return function() {
    var a = Mt(this, e), s = (this.style.removeProperty(e), Mt(this, e));
    return a === s ? null : a === r && s === n ? i : i = t(r = a, n = s);
  };
}
function Lv(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Mm(e, t, r) {
  var n, i = r + "", a;
  return function() {
    var s = Mt(this, e);
    return s === i ? null : s === n ? a : a = t(n = s, r);
  };
}
function Pm(e, t, r) {
  var n, i, a;
  return function() {
    var s = Mt(this, e), o = r(this), u = o + "";
    return o == null && (u = o = (this.style.removeProperty(e), Mt(this, e))), s === u ? null : s === n && u === i ? a : (i = u, a = t(n = s, o));
  };
}
function Nm(e, t) {
  var r, n, i, a = "style." + t, s = "end." + a, o;
  return function() {
    var u = Pe(this, e), f = u.on, c = u.value[a] == null ? o || (o = Lv(t)) : void 0;
    (f !== r || i !== c) && (n = (r = f).copy()).on(s, i = c), u.on = n;
  };
}
function Lm(e, t, r) {
  var n = (e += "") == "transform" ? Lb : Nv;
  return t == null ? this.styleTween(e, Om(e, n)).on("end.style." + e, Lv(e)) : typeof t == "function" ? this.styleTween(e, Pm(e, n, Bu(this, "style." + e, t))).each(Nm(this._id, e)) : this.styleTween(e, Mm(e, n, t), r).on("end.style." + e, null);
}
function Fm(e, t, r) {
  return function(n) {
    this.style.setProperty(e, t.call(this, n), r);
  };
}
function Dm(e, t, r) {
  var n, i;
  function a() {
    var s = t.apply(this, arguments);
    return s !== i && (n = (i = s) && Fm(e, s, r)), n;
  }
  return a._value = t, a;
}
function zm(e, t, r) {
  var n = "style." + (e += "");
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, Dm(e, t, r ?? ""));
}
function jm(e) {
  return function() {
    this.textContent = e;
  };
}
function Bm(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function Gm(e) {
  return this.tween("text", typeof e == "function" ? Bm(Bu(this, "text", e)) : jm(e == null ? "" : e + ""));
}
function Um(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function Hm(e) {
  var t, r;
  function n() {
    var i = e.apply(this, arguments);
    return i !== r && (t = (r = i) && Um(i)), t;
  }
  return n._value = e, n;
}
function Vm(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, Hm(e));
}
function Km() {
  for (var e = this._name, t = this._id, r = Fv(), n = this._groups, i = n.length, a = 0; a < i; ++a)
    for (var s = n[a], o = s.length, u, f = 0; f < o; ++f)
      if (u = s[f]) {
        var c = $e(u, t);
        Wr(u, e, r, f, s, {
          time: c.time + c.delay + c.duration,
          delay: 0,
          duration: c.duration,
          ease: c.ease
        });
      }
  return new Ue(n, this._parents, e, r);
}
function Wm() {
  var e, t, r = this, n = r._id, i = r.size();
  return new Promise(function(a, s) {
    var o = { value: s }, u = { value: function() {
      --i === 0 && a();
    } };
    r.each(function() {
      var f = Pe(this, n), c = f.on;
      c !== e && (t = (e = c).copy(), t._.cancel.push(o), t._.interrupt.push(o), t._.end.push(u)), f.on = t;
    }), i === 0 && a();
  });
}
var Ym = 0;
function Ue(e, t, r, n) {
  this._groups = e, this._parents = t, this._name = r, this._id = n;
}
function Fv() {
  return ++Ym;
}
var Fe = fr.prototype;
Ue.prototype = {
  constructor: Ue,
  select: Rm,
  selectAll: Tm,
  selectChild: Fe.selectChild,
  selectChildren: Fe.selectChildren,
  filter: wm,
  merge: Em,
  selection: Im,
  transition: Km,
  call: Fe.call,
  nodes: Fe.nodes,
  node: Fe.node,
  size: Fe.size,
  empty: Fe.empty,
  each: Fe.each,
  on: $m,
  attr: sm,
  attrTween: lm,
  style: Lm,
  styleTween: zm,
  text: Gm,
  textTween: Vm,
  remove: Cm,
  tween: Qb,
  delay: pm,
  duration: _m,
  ease: bm,
  easeVarying: xm,
  end: Wm,
  [Symbol.iterator]: Fe[Symbol.iterator]
};
function Xm(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var Zm = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Xm
};
function Jm(e, t) {
  for (var r; !(r = e.__transition) || !(r = r[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return r;
}
function Qm(e) {
  var t, r;
  e instanceof Ue ? (t = e._id, e = e._name) : (t = Fv(), (r = Zm).time = zu(), e = e == null ? null : e + "");
  for (var n = this._groups, i = n.length, a = 0; a < i; ++a)
    for (var s = n[a], o = s.length, u, f = 0; f < o; ++f)
      (u = s[f]) && Wr(u, e, t, f, s, r || Jm(u, t));
  return new Ue(n, this._parents, e, t);
}
fr.prototype.interrupt = Xb;
fr.prototype.transition = Qm;
const Su = Math.PI, Cu = 2 * Su, ht = 1e-6, e0 = Cu - ht;
function Dv(e) {
  this._ += e[0];
  for (let t = 1, r = e.length; t < r; ++t)
    this._ += arguments[t] + e[t];
}
function t0(e) {
  let t = Math.floor(e);
  if (!(t >= 0)) throw new Error(`invalid digits: ${e}`);
  if (t > 15) return Dv;
  const r = 10 ** t;
  return function(n) {
    this._ += n[0];
    for (let i = 1, a = n.length; i < a; ++i)
      this._ += Math.round(arguments[i] * r) / r + n[i];
  };
}
class r0 {
  constructor(t) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = t == null ? Dv : t0(t);
  }
  moveTo(t, r) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +r}`;
  }
  closePath() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`);
  }
  lineTo(t, r) {
    this._append`L${this._x1 = +t},${this._y1 = +r}`;
  }
  quadraticCurveTo(t, r, n, i) {
    this._append`Q${+t},${+r},${this._x1 = +n},${this._y1 = +i}`;
  }
  bezierCurveTo(t, r, n, i, a, s) {
    this._append`C${+t},${+r},${+n},${+i},${this._x1 = +a},${this._y1 = +s}`;
  }
  arcTo(t, r, n, i, a) {
    if (t = +t, r = +r, n = +n, i = +i, a = +a, a < 0) throw new Error(`negative radius: ${a}`);
    let s = this._x1, o = this._y1, u = n - t, f = i - r, c = s - t, l = o - r, d = c * c + l * l;
    if (this._x1 === null)
      this._append`M${this._x1 = t},${this._y1 = r}`;
    else if (d > ht) if (!(Math.abs(l * u - f * c) > ht) || !a)
      this._append`L${this._x1 = t},${this._y1 = r}`;
    else {
      let h = n - s, v = i - o, p = u * u + f * f, g = h * h + v * v, _ = Math.sqrt(p), w = Math.sqrt(d), E = a * Math.tan((Su - Math.acos((p + d - g) / (2 * _ * w))) / 2), q = E / w, I = E / _;
      Math.abs(q - 1) > ht && this._append`L${t + q * c},${r + q * l}`, this._append`A${a},${a},0,0,${+(l * h > c * v)},${this._x1 = t + I * u},${this._y1 = r + I * f}`;
    }
  }
  arc(t, r, n, i, a, s) {
    if (t = +t, r = +r, n = +n, s = !!s, n < 0) throw new Error(`negative radius: ${n}`);
    let o = n * Math.cos(i), u = n * Math.sin(i), f = t + o, c = r + u, l = 1 ^ s, d = s ? i - a : a - i;
    this._x1 === null ? this._append`M${f},${c}` : (Math.abs(this._x1 - f) > ht || Math.abs(this._y1 - c) > ht) && this._append`L${f},${c}`, n && (d < 0 && (d = d % Cu + Cu), d > e0 ? this._append`A${n},${n},0,1,${l},${t - o},${r - u}A${n},${n},0,1,${l},${this._x1 = f},${this._y1 = c}` : d > ht && this._append`A${n},${n},0,${+(d >= Su)},${l},${this._x1 = t + n * Math.cos(a)},${this._y1 = r + n * Math.sin(a)}`);
  }
  rect(t, r, n, i) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +r}h${n = +n}v${+i}h${-n}Z`;
  }
  toString() {
    return this._;
  }
}
function Ct(e) {
  return function() {
    return e;
  };
}
function n0(e) {
  let t = 3;
  return e.digits = function(r) {
    if (!arguments.length) return t;
    if (r == null)
      t = null;
    else {
      const n = Math.floor(r);
      if (!(n >= 0)) throw new RangeError(`invalid digits: ${r}`);
      t = n;
    }
    return e;
  }, () => new r0(t);
}
function i0(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function zv(e) {
  this._context = e;
}
zv.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
      default:
        this._context.lineTo(e, t);
        break;
    }
  }
};
function jv(e) {
  return new zv(e);
}
function a0(e) {
  return e[0];
}
function s0(e) {
  return e[1];
}
function Kc(e, t) {
  var r = Ct(!0), n = null, i = jv, a = null, s = n0(o);
  e = typeof e == "function" ? e : e === void 0 ? a0 : Ct(e), t = typeof t == "function" ? t : t === void 0 ? s0 : Ct(t);
  function o(u) {
    var f, c = (u = i0(u)).length, l, d = !1, h;
    for (n == null && (a = i(h = s())), f = 0; f <= c; ++f)
      !(f < c && r(l = u[f], f, u)) === d && ((d = !d) ? a.lineStart() : a.lineEnd()), d && a.point(+e(l, f, u), +t(l, f, u));
    if (h) return a = null, h + "" || null;
  }
  return o.x = function(u) {
    return arguments.length ? (e = typeof u == "function" ? u : Ct(+u), o) : e;
  }, o.y = function(u) {
    return arguments.length ? (t = typeof u == "function" ? u : Ct(+u), o) : t;
  }, o.defined = function(u) {
    return arguments.length ? (r = typeof u == "function" ? u : Ct(!!u), o) : r;
  }, o.curve = function(u) {
    return arguments.length ? (i = u, n != null && (a = i(n)), o) : i;
  }, o.context = function(u) {
    return arguments.length ? (u == null ? n = a = null : a = i(n = u), o) : n;
  }, o;
}
function Wc(e, t, r) {
  e._context.bezierCurveTo(
    (2 * e._x0 + e._x1) / 3,
    (2 * e._y0 + e._y1) / 3,
    (e._x0 + 2 * e._x1) / 3,
    (e._y0 + 2 * e._y1) / 3,
    (e._x0 + 4 * e._x1 + t) / 6,
    (e._y0 + 4 * e._y1 + r) / 6
  );
}
function Bv(e) {
  this._context = e;
}
Bv.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 3:
        Wc(this, this._x1, this._y1);
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3, this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
      default:
        Wc(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function o0(e) {
  return new Bv(e);
}
const wr = (e) => () => e;
function u0(e, {
  sourceEvent: t,
  target: r,
  transform: n,
  dispatch: i
}) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    target: { value: r, enumerable: !0, configurable: !0 },
    transform: { value: n, enumerable: !0, configurable: !0 },
    _: { value: i }
  });
}
function je(e, t, r) {
  this.k = e, this.x = t, this.y = r;
}
je.prototype = {
  constructor: je,
  scale: function(e) {
    return e === 1 ? this : new je(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new je(this.k, this.x + this.k * e, this.y + this.k * t);
  },
  apply: function(e) {
    return [e[0] * this.k + this.x, e[1] * this.k + this.y];
  },
  applyX: function(e) {
    return e * this.k + this.x;
  },
  applyY: function(e) {
    return e * this.k + this.y;
  },
  invert: function(e) {
    return [(e[0] - this.x) / this.k, (e[1] - this.y) / this.k];
  },
  invertX: function(e) {
    return (e - this.x) / this.k;
  },
  invertY: function(e) {
    return (e - this.y) / this.k;
  },
  rescaleX: function(e) {
    return e.copy().domain(e.range().map(this.invertX, this).map(e.invert, e));
  },
  rescaleY: function(e) {
    return e.copy().domain(e.range().map(this.invertY, this).map(e.invert, e));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var Gu = new je(1, 0, 0);
je.prototype;
function wn(e) {
  e.stopImmediatePropagation();
}
function Gt(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function c0(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function f0() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function Yc() {
  return this.__zoom || Gu;
}
function l0(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function h0() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function d0(e, t, r) {
  var n = e.invertX(t[0][0]) - r[0][0], i = e.invertX(t[1][0]) - r[1][0], a = e.invertY(t[0][1]) - r[0][1], s = e.invertY(t[1][1]) - r[1][1];
  return e.translate(
    i > n ? (n + i) / 2 : Math.min(0, n) || Math.max(0, i),
    s > a ? (a + s) / 2 : Math.min(0, a) || Math.max(0, s)
  );
}
function p0() {
  var e = c0, t = f0, r = d0, n = l0, i = h0, a = [0, 1 / 0], s = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], o = 250, u = Bb, f = Nu("start", "zoom", "end"), c, l, d, h = 500, v = 150, p = 0, g = 10;
  function _(y) {
    y.property("__zoom", Yc).on("wheel.zoom", L, { passive: !1 }).on("mousedown.zoom", x).on("dblclick.zoom", O).filter(i).on("touchstart.zoom", m).on("touchmove.zoom", R).on("touchend.zoom touchcancel.zoom", k).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  _.transform = function(y, A, b, S) {
    var $ = y.selection ? y.selection() : y;
    $.property("__zoom", Yc), y !== $ ? I(y, A, b, S) : $.interrupt().each(function() {
      T(this, arguments).event(S).start().zoom(null, typeof A == "function" ? A.apply(this, arguments) : A).end();
    });
  }, _.scaleBy = function(y, A, b, S) {
    _.scaleTo(y, function() {
      var $ = this.__zoom.k, N = typeof A == "function" ? A.apply(this, arguments) : A;
      return $ * N;
    }, b, S);
  }, _.scaleTo = function(y, A, b, S) {
    _.transform(y, function() {
      var $ = t.apply(this, arguments), N = this.__zoom, M = b == null ? q($) : typeof b == "function" ? b.apply(this, arguments) : b, P = N.invert(M), B = typeof A == "function" ? A.apply(this, arguments) : A;
      return r(E(w(N, B), M, P), $, s);
    }, b, S);
  }, _.translateBy = function(y, A, b, S) {
    _.transform(y, function() {
      return r(this.__zoom.translate(
        typeof A == "function" ? A.apply(this, arguments) : A,
        typeof b == "function" ? b.apply(this, arguments) : b
      ), t.apply(this, arguments), s);
    }, null, S);
  }, _.translateTo = function(y, A, b, S, $) {
    _.transform(y, function() {
      var N = t.apply(this, arguments), M = this.__zoom, P = S == null ? q(N) : typeof S == "function" ? S.apply(this, arguments) : S;
      return r(Gu.translate(P[0], P[1]).scale(M.k).translate(
        typeof A == "function" ? -A.apply(this, arguments) : -A,
        typeof b == "function" ? -b.apply(this, arguments) : -b
      ), N, s);
    }, S, $);
  };
  function w(y, A) {
    return A = Math.max(a[0], Math.min(a[1], A)), A === y.k ? y : new je(A, y.x, y.y);
  }
  function E(y, A, b) {
    var S = A[0] - b[0] * y.k, $ = A[1] - b[1] * y.k;
    return S === y.x && $ === y.y ? y : new je(y.k, S, $);
  }
  function q(y) {
    return [(+y[0][0] + +y[1][0]) / 2, (+y[0][1] + +y[1][1]) / 2];
  }
  function I(y, A, b, S) {
    y.on("start.zoom", function() {
      T(this, arguments).event(S).start();
    }).on("interrupt.zoom end.zoom", function() {
      T(this, arguments).event(S).end();
    }).tween("zoom", function() {
      var $ = this, N = arguments, M = T($, N).event(S), P = t.apply($, N), B = b == null ? q(P) : typeof b == "function" ? b.apply($, N) : b, Y = Math.max(P[1][0] - P[0][0], P[1][1] - P[0][1]), V = $.__zoom, te = typeof A == "function" ? A.apply($, N) : A, ue = u(V.invert(B).concat(Y / V.k), te.invert(B).concat(Y / te.k));
      return function(W) {
        if (W === 1) W = te;
        else {
          var re = ue(W), ce = Y / re[2];
          W = new je(ce, B[0] - re[0] * ce, B[1] - re[1] * ce);
        }
        M.zoom(null, W);
      };
    });
  }
  function T(y, A, b) {
    return !b && y.__zooming || new C(y, A);
  }
  function C(y, A) {
    this.that = y, this.args = A, this.active = 0, this.sourceEvent = null, this.extent = t.apply(y, A), this.taps = 0;
  }
  C.prototype = {
    event: function(y) {
      return y && (this.sourceEvent = y), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(y, A) {
      return this.mouse && y !== "mouse" && (this.mouse[1] = A.invert(this.mouse[0])), this.touch0 && y !== "touch" && (this.touch0[1] = A.invert(this.touch0[0])), this.touch1 && y !== "touch" && (this.touch1[1] = A.invert(this.touch1[0])), this.that.__zoom = A, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(y) {
      var A = Ie(this.that).datum();
      f.call(
        y,
        this.that,
        new u0(y, {
          sourceEvent: this.sourceEvent,
          target: _,
          transform: this.that.__zoom,
          dispatch: f
        }),
        A
      );
    }
  };
  function L(y, ...A) {
    if (!e.apply(this, arguments)) return;
    var b = T(this, A).event(y), S = this.__zoom, $ = Math.max(a[0], Math.min(a[1], S.k * Math.pow(2, n.apply(this, arguments)))), N = lt(y);
    if (b.wheel)
      (b.mouse[0][0] !== N[0] || b.mouse[0][1] !== N[1]) && (b.mouse[1] = S.invert(b.mouse[0] = N)), clearTimeout(b.wheel);
    else {
      if (S.k === $) return;
      b.mouse = [N, S.invert(N)], Ir(this), b.start();
    }
    Gt(y), b.wheel = setTimeout(M, v), b.zoom("mouse", r(E(w(S, $), b.mouse[0], b.mouse[1]), b.extent, s));
    function M() {
      b.wheel = null, b.end();
    }
  }
  function x(y, ...A) {
    if (d || !e.apply(this, arguments)) return;
    var b = y.currentTarget, S = T(this, A, !0).event(y), $ = Ie(y.view).on("mousemove.zoom", B, !0).on("mouseup.zoom", Y, !0), N = lt(y, b), M = y.clientX, P = y.clientY;
    vb(y.view), wn(y), S.mouse = [N, this.__zoom.invert(N)], Ir(this), S.start();
    function B(V) {
      if (Gt(V), !S.moved) {
        var te = V.clientX - M, ue = V.clientY - P;
        S.moved = te * te + ue * ue > p;
      }
      S.event(V).zoom("mouse", r(E(S.that.__zoom, S.mouse[0] = lt(V, b), S.mouse[1]), S.extent, s));
    }
    function Y(V) {
      $.on("mousemove.zoom mouseup.zoom", null), gb(V.view, S.moved), Gt(V), S.event(V).end();
    }
  }
  function O(y, ...A) {
    if (e.apply(this, arguments)) {
      var b = this.__zoom, S = lt(y.changedTouches ? y.changedTouches[0] : y, this), $ = b.invert(S), N = b.k * (y.shiftKey ? 0.5 : 2), M = r(E(w(b, N), S, $), t.apply(this, A), s);
      Gt(y), o > 0 ? Ie(this).transition().duration(o).call(I, M, S, y) : Ie(this).call(_.transform, M, S, y);
    }
  }
  function m(y, ...A) {
    if (e.apply(this, arguments)) {
      var b = y.touches, S = b.length, $ = T(this, A, y.changedTouches.length === S).event(y), N, M, P, B;
      for (wn(y), M = 0; M < S; ++M)
        P = b[M], B = lt(P, this), B = [B, this.__zoom.invert(B), P.identifier], $.touch0 ? !$.touch1 && $.touch0[2] !== B[2] && ($.touch1 = B, $.taps = 0) : ($.touch0 = B, N = !0, $.taps = 1 + !!c);
      c && (c = clearTimeout(c)), N && ($.taps < 2 && (l = B[0], c = setTimeout(function() {
        c = null;
      }, h)), Ir(this), $.start());
    }
  }
  function R(y, ...A) {
    if (this.__zooming) {
      var b = T(this, A).event(y), S = y.changedTouches, $ = S.length, N, M, P, B;
      for (Gt(y), N = 0; N < $; ++N)
        M = S[N], P = lt(M, this), b.touch0 && b.touch0[2] === M.identifier ? b.touch0[0] = P : b.touch1 && b.touch1[2] === M.identifier && (b.touch1[0] = P);
      if (M = b.that.__zoom, b.touch1) {
        var Y = b.touch0[0], V = b.touch0[1], te = b.touch1[0], ue = b.touch1[1], W = (W = te[0] - Y[0]) * W + (W = te[1] - Y[1]) * W, re = (re = ue[0] - V[0]) * re + (re = ue[1] - V[1]) * re;
        M = w(M, Math.sqrt(W / re)), P = [(Y[0] + te[0]) / 2, (Y[1] + te[1]) / 2], B = [(V[0] + ue[0]) / 2, (V[1] + ue[1]) / 2];
      } else if (b.touch0) P = b.touch0[0], B = b.touch0[1];
      else return;
      b.zoom("touch", r(E(M, P, B), b.extent, s));
    }
  }
  function k(y, ...A) {
    if (this.__zooming) {
      var b = T(this, A).event(y), S = y.changedTouches, $ = S.length, N, M;
      for (wn(y), d && clearTimeout(d), d = setTimeout(function() {
        d = null;
      }, h), N = 0; N < $; ++N)
        M = S[N], b.touch0 && b.touch0[2] === M.identifier ? delete b.touch0 : b.touch1 && b.touch1[2] === M.identifier && delete b.touch1;
      if (b.touch1 && !b.touch0 && (b.touch0 = b.touch1, delete b.touch1), b.touch0) b.touch0[1] = this.__zoom.invert(b.touch0[0]);
      else if (b.end(), b.taps === 2 && (M = lt(M, this), Math.hypot(l[0] - M[0], l[1] - M[1]) < g)) {
        var P = Ie(this).on("dblclick.zoom");
        P && P.apply(this, arguments);
      }
    }
  }
  return _.wheelDelta = function(y) {
    return arguments.length ? (n = typeof y == "function" ? y : wr(+y), _) : n;
  }, _.filter = function(y) {
    return arguments.length ? (e = typeof y == "function" ? y : wr(!!y), _) : e;
  }, _.touchable = function(y) {
    return arguments.length ? (i = typeof y == "function" ? y : wr(!!y), _) : i;
  }, _.extent = function(y) {
    return arguments.length ? (t = typeof y == "function" ? y : wr([[+y[0][0], +y[0][1]], [+y[1][0], +y[1][1]]]), _) : t;
  }, _.scaleExtent = function(y) {
    return arguments.length ? (a[0] = +y[0], a[1] = +y[1], _) : [a[0], a[1]];
  }, _.translateExtent = function(y) {
    return arguments.length ? (s[0][0] = +y[0][0], s[1][0] = +y[1][0], s[0][1] = +y[0][1], s[1][1] = +y[1][1], _) : [[s[0][0], s[0][1]], [s[1][0], s[1][1]]];
  }, _.constrain = function(y) {
    return arguments.length ? (r = y, _) : r;
  }, _.duration = function(y) {
    return arguments.length ? (o = +y, _) : o;
  }, _.interpolate = function(y) {
    return arguments.length ? (u = y, _) : u;
  }, _.on = function() {
    var y = f.on.apply(f, arguments);
    return y === f ? _ : y;
  }, _.clickDistance = function(y) {
    return arguments.length ? (p = (y = +y) * y, _) : Math.sqrt(p);
  }, _.tapDistance = function(y) {
    return arguments.length ? (g = +y, _) : g;
  }, _;
}
var Er = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function v0(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Uu(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var En, Xc;
function g0() {
  if (Xc) return En;
  Xc = 1;
  function e() {
    this.__data__ = [], this.size = 0;
  }
  return En = e, En;
}
var An, Zc;
function Nt() {
  if (Zc) return An;
  Zc = 1;
  function e(t, r) {
    return t === r || t !== t && r !== r;
  }
  return An = e, An;
}
var qn, Jc;
function Yr() {
  if (Jc) return qn;
  Jc = 1;
  var e = Nt();
  function t(r, n) {
    for (var i = r.length; i--; )
      if (e(r[i][0], n))
        return i;
    return -1;
  }
  return qn = t, qn;
}
var $n, Qc;
function _0() {
  if (Qc) return $n;
  Qc = 1;
  var e = Yr(), t = Array.prototype, r = t.splice;
  function n(i) {
    var a = this.__data__, s = e(a, i);
    if (s < 0)
      return !1;
    var o = a.length - 1;
    return s == o ? a.pop() : r.call(a, s, 1), --this.size, !0;
  }
  return $n = n, $n;
}
var Sn, ef;
function y0() {
  if (ef) return Sn;
  ef = 1;
  var e = Yr();
  function t(r) {
    var n = this.__data__, i = e(n, r);
    return i < 0 ? void 0 : n[i][1];
  }
  return Sn = t, Sn;
}
var Cn, tf;
function b0() {
  if (tf) return Cn;
  tf = 1;
  var e = Yr();
  function t(r) {
    return e(this.__data__, r) > -1;
  }
  return Cn = t, Cn;
}
var Rn, rf;
function m0() {
  if (rf) return Rn;
  rf = 1;
  var e = Yr();
  function t(r, n) {
    var i = this.__data__, a = e(i, r);
    return a < 0 ? (++this.size, i.push([r, n])) : i[a][1] = n, this;
  }
  return Rn = t, Rn;
}
var Tn, nf;
function Xr() {
  if (nf) return Tn;
  nf = 1;
  var e = g0(), t = _0(), r = y0(), n = b0(), i = m0();
  function a(s) {
    var o = -1, u = s == null ? 0 : s.length;
    for (this.clear(); ++o < u; ) {
      var f = s[o];
      this.set(f[0], f[1]);
    }
  }
  return a.prototype.clear = e, a.prototype.delete = t, a.prototype.get = r, a.prototype.has = n, a.prototype.set = i, Tn = a, Tn;
}
var kn, af;
function x0() {
  if (af) return kn;
  af = 1;
  var e = Xr();
  function t() {
    this.__data__ = new e(), this.size = 0;
  }
  return kn = t, kn;
}
var In, sf;
function w0() {
  if (sf) return In;
  sf = 1;
  function e(t) {
    var r = this.__data__, n = r.delete(t);
    return this.size = r.size, n;
  }
  return In = e, In;
}
var On, of;
function E0() {
  if (of) return On;
  of = 1;
  function e(t) {
    return this.__data__.get(t);
  }
  return On = e, On;
}
var Mn, uf;
function A0() {
  if (uf) return Mn;
  uf = 1;
  function e(t) {
    return this.__data__.has(t);
  }
  return Mn = e, Mn;
}
var Pn, cf;
function Gv() {
  if (cf) return Pn;
  cf = 1;
  var e = typeof Er == "object" && Er && Er.Object === Object && Er;
  return Pn = e, Pn;
}
var Nn, ff;
function Se() {
  if (ff) return Nn;
  ff = 1;
  var e = Gv(), t = typeof self == "object" && self && self.Object === Object && self, r = e || t || Function("return this")();
  return Nn = r, Nn;
}
var Ln, lf;
function Lt() {
  if (lf) return Ln;
  lf = 1;
  var e = Se(), t = e.Symbol;
  return Ln = t, Ln;
}
var Fn, hf;
function q0() {
  if (hf) return Fn;
  hf = 1;
  var e = Lt(), t = Object.prototype, r = t.hasOwnProperty, n = t.toString, i = e ? e.toStringTag : void 0;
  function a(s) {
    var o = r.call(s, i), u = s[i];
    try {
      s[i] = void 0;
      var f = !0;
    } catch {
    }
    var c = n.call(s);
    return f && (o ? s[i] = u : delete s[i]), c;
  }
  return Fn = a, Fn;
}
var Dn, df;
function $0() {
  if (df) return Dn;
  df = 1;
  var e = Object.prototype, t = e.toString;
  function r(n) {
    return t.call(n);
  }
  return Dn = r, Dn;
}
var zn, pf;
function xt() {
  if (pf) return zn;
  pf = 1;
  var e = Lt(), t = q0(), r = $0(), n = "[object Null]", i = "[object Undefined]", a = e ? e.toStringTag : void 0;
  function s(o) {
    return o == null ? o === void 0 ? i : n : a && a in Object(o) ? t(o) : r(o);
  }
  return zn = s, zn;
}
var jn, vf;
function me() {
  if (vf) return jn;
  vf = 1;
  function e(t) {
    var r = typeof t;
    return t != null && (r == "object" || r == "function");
  }
  return jn = e, jn;
}
var Bn, gf;
function hr() {
  if (gf) return Bn;
  gf = 1;
  var e = xt(), t = me(), r = "[object AsyncFunction]", n = "[object Function]", i = "[object GeneratorFunction]", a = "[object Proxy]";
  function s(o) {
    if (!t(o))
      return !1;
    var u = e(o);
    return u == n || u == i || u == r || u == a;
  }
  return Bn = s, Bn;
}
var Gn, _f;
function S0() {
  if (_f) return Gn;
  _f = 1;
  var e = Se(), t = e["__core-js_shared__"];
  return Gn = t, Gn;
}
var Un, yf;
function C0() {
  if (yf) return Un;
  yf = 1;
  var e = S0(), t = function() {
    var n = /[^.]+$/.exec(e && e.keys && e.keys.IE_PROTO || "");
    return n ? "Symbol(src)_1." + n : "";
  }();
  function r(n) {
    return !!t && t in n;
  }
  return Un = r, Un;
}
var Hn, bf;
function Uv() {
  if (bf) return Hn;
  bf = 1;
  var e = Function.prototype, t = e.toString;
  function r(n) {
    if (n != null) {
      try {
        return t.call(n);
      } catch {
      }
      try {
        return n + "";
      } catch {
      }
    }
    return "";
  }
  return Hn = r, Hn;
}
var Vn, mf;
function R0() {
  if (mf) return Vn;
  mf = 1;
  var e = hr(), t = C0(), r = me(), n = Uv(), i = /[\\^$.*+?()[\]{}|]/g, a = /^\[object .+?Constructor\]$/, s = Function.prototype, o = Object.prototype, u = s.toString, f = o.hasOwnProperty, c = RegExp(
    "^" + u.call(f).replace(i, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function l(d) {
    if (!r(d) || t(d))
      return !1;
    var h = e(d) ? c : a;
    return h.test(n(d));
  }
  return Vn = l, Vn;
}
var Kn, xf;
function T0() {
  if (xf) return Kn;
  xf = 1;
  function e(t, r) {
    return t == null ? void 0 : t[r];
  }
  return Kn = e, Kn;
}
var Wn, wf;
function wt() {
  if (wf) return Wn;
  wf = 1;
  var e = R0(), t = T0();
  function r(n, i) {
    var a = t(n, i);
    return e(a) ? a : void 0;
  }
  return Wn = r, Wn;
}
var Yn, Ef;
function Hu() {
  if (Ef) return Yn;
  Ef = 1;
  var e = wt(), t = Se(), r = e(t, "Map");
  return Yn = r, Yn;
}
var Xn, Af;
function Zr() {
  if (Af) return Xn;
  Af = 1;
  var e = wt(), t = e(Object, "create");
  return Xn = t, Xn;
}
var Zn, qf;
function k0() {
  if (qf) return Zn;
  qf = 1;
  var e = Zr();
  function t() {
    this.__data__ = e ? e(null) : {}, this.size = 0;
  }
  return Zn = t, Zn;
}
var Jn, $f;
function I0() {
  if ($f) return Jn;
  $f = 1;
  function e(t) {
    var r = this.has(t) && delete this.__data__[t];
    return this.size -= r ? 1 : 0, r;
  }
  return Jn = e, Jn;
}
var Qn, Sf;
function O0() {
  if (Sf) return Qn;
  Sf = 1;
  var e = Zr(), t = "__lodash_hash_undefined__", r = Object.prototype, n = r.hasOwnProperty;
  function i(a) {
    var s = this.__data__;
    if (e) {
      var o = s[a];
      return o === t ? void 0 : o;
    }
    return n.call(s, a) ? s[a] : void 0;
  }
  return Qn = i, Qn;
}
var ei, Cf;
function M0() {
  if (Cf) return ei;
  Cf = 1;
  var e = Zr(), t = Object.prototype, r = t.hasOwnProperty;
  function n(i) {
    var a = this.__data__;
    return e ? a[i] !== void 0 : r.call(a, i);
  }
  return ei = n, ei;
}
var ti, Rf;
function P0() {
  if (Rf) return ti;
  Rf = 1;
  var e = Zr(), t = "__lodash_hash_undefined__";
  function r(n, i) {
    var a = this.__data__;
    return this.size += this.has(n) ? 0 : 1, a[n] = e && i === void 0 ? t : i, this;
  }
  return ti = r, ti;
}
var ri, Tf;
function N0() {
  if (Tf) return ri;
  Tf = 1;
  var e = k0(), t = I0(), r = O0(), n = M0(), i = P0();
  function a(s) {
    var o = -1, u = s == null ? 0 : s.length;
    for (this.clear(); ++o < u; ) {
      var f = s[o];
      this.set(f[0], f[1]);
    }
  }
  return a.prototype.clear = e, a.prototype.delete = t, a.prototype.get = r, a.prototype.has = n, a.prototype.set = i, ri = a, ri;
}
var ni, kf;
function L0() {
  if (kf) return ni;
  kf = 1;
  var e = N0(), t = Xr(), r = Hu();
  function n() {
    this.size = 0, this.__data__ = {
      hash: new e(),
      map: new (r || t)(),
      string: new e()
    };
  }
  return ni = n, ni;
}
var ii, If;
function F0() {
  if (If) return ii;
  If = 1;
  function e(t) {
    var r = typeof t;
    return r == "string" || r == "number" || r == "symbol" || r == "boolean" ? t !== "__proto__" : t === null;
  }
  return ii = e, ii;
}
var ai, Of;
function Jr() {
  if (Of) return ai;
  Of = 1;
  var e = F0();
  function t(r, n) {
    var i = r.__data__;
    return e(n) ? i[typeof n == "string" ? "string" : "hash"] : i.map;
  }
  return ai = t, ai;
}
var si, Mf;
function D0() {
  if (Mf) return si;
  Mf = 1;
  var e = Jr();
  function t(r) {
    var n = e(this, r).delete(r);
    return this.size -= n ? 1 : 0, n;
  }
  return si = t, si;
}
var oi, Pf;
function z0() {
  if (Pf) return oi;
  Pf = 1;
  var e = Jr();
  function t(r) {
    return e(this, r).get(r);
  }
  return oi = t, oi;
}
var ui, Nf;
function j0() {
  if (Nf) return ui;
  Nf = 1;
  var e = Jr();
  function t(r) {
    return e(this, r).has(r);
  }
  return ui = t, ui;
}
var ci, Lf;
function B0() {
  if (Lf) return ci;
  Lf = 1;
  var e = Jr();
  function t(r, n) {
    var i = e(this, r), a = i.size;
    return i.set(r, n), this.size += i.size == a ? 0 : 1, this;
  }
  return ci = t, ci;
}
var fi, Ff;
function Vu() {
  if (Ff) return fi;
  Ff = 1;
  var e = L0(), t = D0(), r = z0(), n = j0(), i = B0();
  function a(s) {
    var o = -1, u = s == null ? 0 : s.length;
    for (this.clear(); ++o < u; ) {
      var f = s[o];
      this.set(f[0], f[1]);
    }
  }
  return a.prototype.clear = e, a.prototype.delete = t, a.prototype.get = r, a.prototype.has = n, a.prototype.set = i, fi = a, fi;
}
var li, Df;
function G0() {
  if (Df) return li;
  Df = 1;
  var e = Xr(), t = Hu(), r = Vu(), n = 200;
  function i(a, s) {
    var o = this.__data__;
    if (o instanceof e) {
      var u = o.__data__;
      if (!t || u.length < n - 1)
        return u.push([a, s]), this.size = ++o.size, this;
      o = this.__data__ = new r(u);
    }
    return o.set(a, s), this.size = o.size, this;
  }
  return li = i, li;
}
var hi, zf;
function Qr() {
  if (zf) return hi;
  zf = 1;
  var e = Xr(), t = x0(), r = w0(), n = E0(), i = A0(), a = G0();
  function s(o) {
    var u = this.__data__ = new e(o);
    this.size = u.size;
  }
  return s.prototype.clear = t, s.prototype.delete = r, s.prototype.get = n, s.prototype.has = i, s.prototype.set = a, hi = s, hi;
}
var di, jf;
function Ku() {
  if (jf) return di;
  jf = 1;
  function e(t, r) {
    for (var n = -1, i = t == null ? 0 : t.length; ++n < i && r(t[n], n, t) !== !1; )
      ;
    return t;
  }
  return di = e, di;
}
var pi, Bf;
function Hv() {
  if (Bf) return pi;
  Bf = 1;
  var e = wt(), t = function() {
    try {
      var r = e(Object, "defineProperty");
      return r({}, "", {}), r;
    } catch {
    }
  }();
  return pi = t, pi;
}
var vi, Gf;
function en() {
  if (Gf) return vi;
  Gf = 1;
  var e = Hv();
  function t(r, n, i) {
    n == "__proto__" && e ? e(r, n, {
      configurable: !0,
      enumerable: !0,
      value: i,
      writable: !0
    }) : r[n] = i;
  }
  return vi = t, vi;
}
var gi, Uf;
function tn() {
  if (Uf) return gi;
  Uf = 1;
  var e = en(), t = Nt(), r = Object.prototype, n = r.hasOwnProperty;
  function i(a, s, o) {
    var u = a[s];
    (!(n.call(a, s) && t(u, o)) || o === void 0 && !(s in a)) && e(a, s, o);
  }
  return gi = i, gi;
}
var _i, Hf;
function dr() {
  if (Hf) return _i;
  Hf = 1;
  var e = tn(), t = en();
  function r(n, i, a, s) {
    var o = !a;
    a || (a = {});
    for (var u = -1, f = i.length; ++u < f; ) {
      var c = i[u], l = s ? s(a[c], n[c], c, a, n) : void 0;
      l === void 0 && (l = n[c]), o ? t(a, c, l) : e(a, c, l);
    }
    return a;
  }
  return _i = r, _i;
}
var yi, Vf;
function U0() {
  if (Vf) return yi;
  Vf = 1;
  function e(t, r) {
    for (var n = -1, i = Array(t); ++n < t; )
      i[n] = r(n);
    return i;
  }
  return yi = e, yi;
}
var bi, Kf;
function Ne() {
  if (Kf) return bi;
  Kf = 1;
  function e(t) {
    return t != null && typeof t == "object";
  }
  return bi = e, bi;
}
var mi, Wf;
function H0() {
  if (Wf) return mi;
  Wf = 1;
  var e = xt(), t = Ne(), r = "[object Arguments]";
  function n(i) {
    return t(i) && e(i) == r;
  }
  return mi = n, mi;
}
var xi, Yf;
function pr() {
  if (Yf) return xi;
  Yf = 1;
  var e = H0(), t = Ne(), r = Object.prototype, n = r.hasOwnProperty, i = r.propertyIsEnumerable, a = e(/* @__PURE__ */ function() {
    return arguments;
  }()) ? e : function(s) {
    return t(s) && n.call(s, "callee") && !i.call(s, "callee");
  };
  return xi = a, xi;
}
var wi, Xf;
function ee() {
  if (Xf) return wi;
  Xf = 1;
  var e = Array.isArray;
  return wi = e, wi;
}
var Kt = { exports: {} }, Ei, Zf;
function V0() {
  if (Zf) return Ei;
  Zf = 1;
  function e() {
    return !1;
  }
  return Ei = e, Ei;
}
Kt.exports;
var Jf;
function Ft() {
  return Jf || (Jf = 1, function(e, t) {
    var r = Se(), n = V0(), i = t && !t.nodeType && t, a = i && !0 && e && !e.nodeType && e, s = a && a.exports === i, o = s ? r.Buffer : void 0, u = o ? o.isBuffer : void 0, f = u || n;
    e.exports = f;
  }(Kt, Kt.exports)), Kt.exports;
}
var Ai, Qf;
function rn() {
  if (Qf) return Ai;
  Qf = 1;
  var e = 9007199254740991, t = /^(?:0|[1-9]\d*)$/;
  function r(n, i) {
    var a = typeof n;
    return i = i ?? e, !!i && (a == "number" || a != "symbol" && t.test(n)) && n > -1 && n % 1 == 0 && n < i;
  }
  return Ai = r, Ai;
}
var qi, el;
function Wu() {
  if (el) return qi;
  el = 1;
  var e = 9007199254740991;
  function t(r) {
    return typeof r == "number" && r > -1 && r % 1 == 0 && r <= e;
  }
  return qi = t, qi;
}
var $i, tl;
function K0() {
  if (tl) return $i;
  tl = 1;
  var e = xt(), t = Wu(), r = Ne(), n = "[object Arguments]", i = "[object Array]", a = "[object Boolean]", s = "[object Date]", o = "[object Error]", u = "[object Function]", f = "[object Map]", c = "[object Number]", l = "[object Object]", d = "[object RegExp]", h = "[object Set]", v = "[object String]", p = "[object WeakMap]", g = "[object ArrayBuffer]", _ = "[object DataView]", w = "[object Float32Array]", E = "[object Float64Array]", q = "[object Int8Array]", I = "[object Int16Array]", T = "[object Int32Array]", C = "[object Uint8Array]", L = "[object Uint8ClampedArray]", x = "[object Uint16Array]", O = "[object Uint32Array]", m = {};
  m[w] = m[E] = m[q] = m[I] = m[T] = m[C] = m[L] = m[x] = m[O] = !0, m[n] = m[i] = m[g] = m[a] = m[_] = m[s] = m[o] = m[u] = m[f] = m[c] = m[l] = m[d] = m[h] = m[v] = m[p] = !1;
  function R(k) {
    return r(k) && t(k.length) && !!m[e(k)];
  }
  return $i = R, $i;
}
var Si, rl;
function nn() {
  if (rl) return Si;
  rl = 1;
  function e(t) {
    return function(r) {
      return t(r);
    };
  }
  return Si = e, Si;
}
var Wt = { exports: {} };
Wt.exports;
var nl;
function Yu() {
  return nl || (nl = 1, function(e, t) {
    var r = Gv(), n = t && !t.nodeType && t, i = n && !0 && e && !e.nodeType && e, a = i && i.exports === n, s = a && r.process, o = function() {
      try {
        var u = i && i.require && i.require("util").types;
        return u || s && s.binding && s.binding("util");
      } catch {
      }
    }();
    e.exports = o;
  }(Wt, Wt.exports)), Wt.exports;
}
var Ci, il;
function vr() {
  if (il) return Ci;
  il = 1;
  var e = K0(), t = nn(), r = Yu(), n = r && r.isTypedArray, i = n ? t(n) : e;
  return Ci = i, Ci;
}
var Ri, al;
function Vv() {
  if (al) return Ri;
  al = 1;
  var e = U0(), t = pr(), r = ee(), n = Ft(), i = rn(), a = vr(), s = Object.prototype, o = s.hasOwnProperty;
  function u(f, c) {
    var l = r(f), d = !l && t(f), h = !l && !d && n(f), v = !l && !d && !h && a(f), p = l || d || h || v, g = p ? e(f.length, String) : [], _ = g.length;
    for (var w in f)
      (c || o.call(f, w)) && !(p && // Safari 9 has enumerable `arguments.length` in strict mode.
      (w == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      h && (w == "offset" || w == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      v && (w == "buffer" || w == "byteLength" || w == "byteOffset") || // Skip index properties.
      i(w, _))) && g.push(w);
    return g;
  }
  return Ri = u, Ri;
}
var Ti, sl;
function an() {
  if (sl) return Ti;
  sl = 1;
  var e = Object.prototype;
  function t(r) {
    var n = r && r.constructor, i = typeof n == "function" && n.prototype || e;
    return r === i;
  }
  return Ti = t, Ti;
}
var ki, ol;
function Kv() {
  if (ol) return ki;
  ol = 1;
  function e(t, r) {
    return function(n) {
      return t(r(n));
    };
  }
  return ki = e, ki;
}
var Ii, ul;
function W0() {
  if (ul) return Ii;
  ul = 1;
  var e = Kv(), t = e(Object.keys, Object);
  return Ii = t, Ii;
}
var Oi, cl;
function Xu() {
  if (cl) return Oi;
  cl = 1;
  var e = an(), t = W0(), r = Object.prototype, n = r.hasOwnProperty;
  function i(a) {
    if (!e(a))
      return t(a);
    var s = [];
    for (var o in Object(a))
      n.call(a, o) && o != "constructor" && s.push(o);
    return s;
  }
  return Oi = i, Oi;
}
var Mi, fl;
function Ve() {
  if (fl) return Mi;
  fl = 1;
  var e = hr(), t = Wu();
  function r(n) {
    return n != null && t(n.length) && !e(n);
  }
  return Mi = r, Mi;
}
var Pi, ll;
function at() {
  if (ll) return Pi;
  ll = 1;
  var e = Vv(), t = Xu(), r = Ve();
  function n(i) {
    return r(i) ? e(i) : t(i);
  }
  return Pi = n, Pi;
}
var Ni, hl;
function Y0() {
  if (hl) return Ni;
  hl = 1;
  var e = dr(), t = at();
  function r(n, i) {
    return n && e(i, t(i), n);
  }
  return Ni = r, Ni;
}
var Li, dl;
function X0() {
  if (dl) return Li;
  dl = 1;
  function e(t) {
    var r = [];
    if (t != null)
      for (var n in Object(t))
        r.push(n);
    return r;
  }
  return Li = e, Li;
}
var Fi, pl;
function Z0() {
  if (pl) return Fi;
  pl = 1;
  var e = me(), t = an(), r = X0(), n = Object.prototype, i = n.hasOwnProperty;
  function a(s) {
    if (!e(s))
      return r(s);
    var o = t(s), u = [];
    for (var f in s)
      f == "constructor" && (o || !i.call(s, f)) || u.push(f);
    return u;
  }
  return Fi = a, Fi;
}
var Di, vl;
function Et() {
  if (vl) return Di;
  vl = 1;
  var e = Vv(), t = Z0(), r = Ve();
  function n(i) {
    return r(i) ? e(i, !0) : t(i);
  }
  return Di = n, Di;
}
var zi, gl;
function J0() {
  if (gl) return zi;
  gl = 1;
  var e = dr(), t = Et();
  function r(n, i) {
    return n && e(i, t(i), n);
  }
  return zi = r, zi;
}
var Yt = { exports: {} };
Yt.exports;
var _l;
function Wv() {
  return _l || (_l = 1, function(e, t) {
    var r = Se(), n = t && !t.nodeType && t, i = n && !0 && e && !e.nodeType && e, a = i && i.exports === n, s = a ? r.Buffer : void 0, o = s ? s.allocUnsafe : void 0;
    function u(f, c) {
      if (c)
        return f.slice();
      var l = f.length, d = o ? o(l) : new f.constructor(l);
      return f.copy(d), d;
    }
    e.exports = u;
  }(Yt, Yt.exports)), Yt.exports;
}
var ji, yl;
function Yv() {
  if (yl) return ji;
  yl = 1;
  function e(t, r) {
    var n = -1, i = t.length;
    for (r || (r = Array(i)); ++n < i; )
      r[n] = t[n];
    return r;
  }
  return ji = e, ji;
}
var Bi, bl;
function Xv() {
  if (bl) return Bi;
  bl = 1;
  function e(t, r) {
    for (var n = -1, i = t == null ? 0 : t.length, a = 0, s = []; ++n < i; ) {
      var o = t[n];
      r(o, n, t) && (s[a++] = o);
    }
    return s;
  }
  return Bi = e, Bi;
}
var Gi, ml;
function Zv() {
  if (ml) return Gi;
  ml = 1;
  function e() {
    return [];
  }
  return Gi = e, Gi;
}
var Ui, xl;
function Zu() {
  if (xl) return Ui;
  xl = 1;
  var e = Xv(), t = Zv(), r = Object.prototype, n = r.propertyIsEnumerable, i = Object.getOwnPropertySymbols, a = i ? function(s) {
    return s == null ? [] : (s = Object(s), e(i(s), function(o) {
      return n.call(s, o);
    }));
  } : t;
  return Ui = a, Ui;
}
var Hi, wl;
function Q0() {
  if (wl) return Hi;
  wl = 1;
  var e = dr(), t = Zu();
  function r(n, i) {
    return e(n, t(n), i);
  }
  return Hi = r, Hi;
}
var Vi, El;
function Ju() {
  if (El) return Vi;
  El = 1;
  function e(t, r) {
    for (var n = -1, i = r.length, a = t.length; ++n < i; )
      t[a + n] = r[n];
    return t;
  }
  return Vi = e, Vi;
}
var Ki, Al;
function sn() {
  if (Al) return Ki;
  Al = 1;
  var e = Kv(), t = e(Object.getPrototypeOf, Object);
  return Ki = t, Ki;
}
var Wi, ql;
function Jv() {
  if (ql) return Wi;
  ql = 1;
  var e = Ju(), t = sn(), r = Zu(), n = Zv(), i = Object.getOwnPropertySymbols, a = i ? function(s) {
    for (var o = []; s; )
      e(o, r(s)), s = t(s);
    return o;
  } : n;
  return Wi = a, Wi;
}
var Yi, $l;
function e1() {
  if ($l) return Yi;
  $l = 1;
  var e = dr(), t = Jv();
  function r(n, i) {
    return e(n, t(n), i);
  }
  return Yi = r, Yi;
}
var Xi, Sl;
function Qv() {
  if (Sl) return Xi;
  Sl = 1;
  var e = Ju(), t = ee();
  function r(n, i, a) {
    var s = i(n);
    return t(n) ? s : e(s, a(n));
  }
  return Xi = r, Xi;
}
var Zi, Cl;
function eg() {
  if (Cl) return Zi;
  Cl = 1;
  var e = Qv(), t = Zu(), r = at();
  function n(i) {
    return e(i, r, t);
  }
  return Zi = n, Zi;
}
var Ji, Rl;
function t1() {
  if (Rl) return Ji;
  Rl = 1;
  var e = Qv(), t = Jv(), r = Et();
  function n(i) {
    return e(i, r, t);
  }
  return Ji = n, Ji;
}
var Qi, Tl;
function r1() {
  if (Tl) return Qi;
  Tl = 1;
  var e = wt(), t = Se(), r = e(t, "DataView");
  return Qi = r, Qi;
}
var ea, kl;
function n1() {
  if (kl) return ea;
  kl = 1;
  var e = wt(), t = Se(), r = e(t, "Promise");
  return ea = r, ea;
}
var ta, Il;
function tg() {
  if (Il) return ta;
  Il = 1;
  var e = wt(), t = Se(), r = e(t, "Set");
  return ta = r, ta;
}
var ra, Ol;
function i1() {
  if (Ol) return ra;
  Ol = 1;
  var e = wt(), t = Se(), r = e(t, "WeakMap");
  return ra = r, ra;
}
var na, Ml;
function Dt() {
  if (Ml) return na;
  Ml = 1;
  var e = r1(), t = Hu(), r = n1(), n = tg(), i = i1(), a = xt(), s = Uv(), o = "[object Map]", u = "[object Object]", f = "[object Promise]", c = "[object Set]", l = "[object WeakMap]", d = "[object DataView]", h = s(e), v = s(t), p = s(r), g = s(n), _ = s(i), w = a;
  return (e && w(new e(new ArrayBuffer(1))) != d || t && w(new t()) != o || r && w(r.resolve()) != f || n && w(new n()) != c || i && w(new i()) != l) && (w = function(E) {
    var q = a(E), I = q == u ? E.constructor : void 0, T = I ? s(I) : "";
    if (T)
      switch (T) {
        case h:
          return d;
        case v:
          return o;
        case p:
          return f;
        case g:
          return c;
        case _:
          return l;
      }
    return q;
  }), na = w, na;
}
var ia, Pl;
function a1() {
  if (Pl) return ia;
  Pl = 1;
  var e = Object.prototype, t = e.hasOwnProperty;
  function r(n) {
    var i = n.length, a = new n.constructor(i);
    return i && typeof n[0] == "string" && t.call(n, "index") && (a.index = n.index, a.input = n.input), a;
  }
  return ia = r, ia;
}
var aa, Nl;
function rg() {
  if (Nl) return aa;
  Nl = 1;
  var e = Se(), t = e.Uint8Array;
  return aa = t, aa;
}
var sa, Ll;
function Qu() {
  if (Ll) return sa;
  Ll = 1;
  var e = rg();
  function t(r) {
    var n = new r.constructor(r.byteLength);
    return new e(n).set(new e(r)), n;
  }
  return sa = t, sa;
}
var oa, Fl;
function s1() {
  if (Fl) return oa;
  Fl = 1;
  var e = Qu();
  function t(r, n) {
    var i = n ? e(r.buffer) : r.buffer;
    return new r.constructor(i, r.byteOffset, r.byteLength);
  }
  return oa = t, oa;
}
var ua, Dl;
function o1() {
  if (Dl) return ua;
  Dl = 1;
  var e = /\w*$/;
  function t(r) {
    var n = new r.constructor(r.source, e.exec(r));
    return n.lastIndex = r.lastIndex, n;
  }
  return ua = t, ua;
}
var ca, zl;
function u1() {
  if (zl) return ca;
  zl = 1;
  var e = Lt(), t = e ? e.prototype : void 0, r = t ? t.valueOf : void 0;
  function n(i) {
    return r ? Object(r.call(i)) : {};
  }
  return ca = n, ca;
}
var fa, jl;
function ng() {
  if (jl) return fa;
  jl = 1;
  var e = Qu();
  function t(r, n) {
    var i = n ? e(r.buffer) : r.buffer;
    return new r.constructor(i, r.byteOffset, r.length);
  }
  return fa = t, fa;
}
var la, Bl;
function c1() {
  if (Bl) return la;
  Bl = 1;
  var e = Qu(), t = s1(), r = o1(), n = u1(), i = ng(), a = "[object Boolean]", s = "[object Date]", o = "[object Map]", u = "[object Number]", f = "[object RegExp]", c = "[object Set]", l = "[object String]", d = "[object Symbol]", h = "[object ArrayBuffer]", v = "[object DataView]", p = "[object Float32Array]", g = "[object Float64Array]", _ = "[object Int8Array]", w = "[object Int16Array]", E = "[object Int32Array]", q = "[object Uint8Array]", I = "[object Uint8ClampedArray]", T = "[object Uint16Array]", C = "[object Uint32Array]";
  function L(x, O, m) {
    var R = x.constructor;
    switch (O) {
      case h:
        return e(x);
      case a:
      case s:
        return new R(+x);
      case v:
        return t(x, m);
      case p:
      case g:
      case _:
      case w:
      case E:
      case q:
      case I:
      case T:
      case C:
        return i(x, m);
      case o:
        return new R();
      case u:
      case l:
        return new R(x);
      case f:
        return r(x);
      case c:
        return new R();
      case d:
        return n(x);
    }
  }
  return la = L, la;
}
var ha, Gl;
function ig() {
  if (Gl) return ha;
  Gl = 1;
  var e = me(), t = Object.create, r = /* @__PURE__ */ function() {
    function n() {
    }
    return function(i) {
      if (!e(i))
        return {};
      if (t)
        return t(i);
      n.prototype = i;
      var a = new n();
      return n.prototype = void 0, a;
    };
  }();
  return ha = r, ha;
}
var da, Ul;
function ag() {
  if (Ul) return da;
  Ul = 1;
  var e = ig(), t = sn(), r = an();
  function n(i) {
    return typeof i.constructor == "function" && !r(i) ? e(t(i)) : {};
  }
  return da = n, da;
}
var pa, Hl;
function f1() {
  if (Hl) return pa;
  Hl = 1;
  var e = Dt(), t = Ne(), r = "[object Map]";
  function n(i) {
    return t(i) && e(i) == r;
  }
  return pa = n, pa;
}
var va, Vl;
function l1() {
  if (Vl) return va;
  Vl = 1;
  var e = f1(), t = nn(), r = Yu(), n = r && r.isMap, i = n ? t(n) : e;
  return va = i, va;
}
var ga, Kl;
function h1() {
  if (Kl) return ga;
  Kl = 1;
  var e = Dt(), t = Ne(), r = "[object Set]";
  function n(i) {
    return t(i) && e(i) == r;
  }
  return ga = n, ga;
}
var _a, Wl;
function d1() {
  if (Wl) return _a;
  Wl = 1;
  var e = h1(), t = nn(), r = Yu(), n = r && r.isSet, i = n ? t(n) : e;
  return _a = i, _a;
}
var ya, Yl;
function sg() {
  if (Yl) return ya;
  Yl = 1;
  var e = Qr(), t = Ku(), r = tn(), n = Y0(), i = J0(), a = Wv(), s = Yv(), o = Q0(), u = e1(), f = eg(), c = t1(), l = Dt(), d = a1(), h = c1(), v = ag(), p = ee(), g = Ft(), _ = l1(), w = me(), E = d1(), q = at(), I = Et(), T = 1, C = 2, L = 4, x = "[object Arguments]", O = "[object Array]", m = "[object Boolean]", R = "[object Date]", k = "[object Error]", y = "[object Function]", A = "[object GeneratorFunction]", b = "[object Map]", S = "[object Number]", $ = "[object Object]", N = "[object RegExp]", M = "[object Set]", P = "[object String]", B = "[object Symbol]", Y = "[object WeakMap]", V = "[object ArrayBuffer]", te = "[object DataView]", ue = "[object Float32Array]", W = "[object Float64Array]", re = "[object Int8Array]", ce = "[object Int16Array]", _r = "[object Int32Array]", ie = "[object Uint8Array]", de = "[object Uint8ClampedArray]", pe = "[object Uint16Array]", st = "[object Uint32Array]", U = {};
  U[x] = U[O] = U[V] = U[te] = U[m] = U[R] = U[ue] = U[W] = U[re] = U[ce] = U[_r] = U[b] = U[S] = U[$] = U[N] = U[M] = U[P] = U[B] = U[ie] = U[de] = U[pe] = U[st] = !0, U[k] = U[y] = U[Y] = !1;
  function Re(G, Te, oe, $t, We, X) {
    var ne, _e = Te & T, ye = Te & C, ot = Te & L;
    if (oe && (ne = We ? oe(G, $t, We, X) : oe(G)), ne !== void 0)
      return ne;
    if (!w(G))
      return G;
    var ut = p(G);
    if (ut) {
      if (ne = d(G), !_e)
        return s(G, ne);
    } else {
      var z = l(G), H = z == y || z == A;
      if (g(G))
        return a(G, _e);
      if (z == $ || z == x || H && !We) {
        if (ne = ye || H ? {} : v(G), !_e)
          return ye ? u(G, i(ne, G)) : o(G, n(ne, G));
      } else {
        if (!U[z])
          return We ? G : {};
        ne = h(G, z, _e);
      }
    }
    X || (X = new e());
    var fe = X.get(G);
    if (fe)
      return fe;
    X.set(G, ne), E(G) ? G.forEach(function(Z) {
      ne.add(Re(Z, Te, oe, Z, G, X));
    }) : _(G) && G.forEach(function(Z, J) {
      ne.set(J, Re(Z, Te, oe, J, G, X));
    });
    var St = ot ? ye ? c : f : ye ? I : q, D = ut ? void 0 : St(G);
    return t(D || G, function(Z, J) {
      D && (J = Z, Z = G[J]), r(ne, J, Re(Z, Te, oe, J, G, X));
    }), ne;
  }
  return ya = Re, ya;
}
var ba, Xl;
function p1() {
  if (Xl) return ba;
  Xl = 1;
  var e = sg(), t = 4;
  function r(n) {
    return e(n, t);
  }
  return ba = r, ba;
}
var ma, Zl;
function ec() {
  if (Zl) return ma;
  Zl = 1;
  function e(t) {
    return function() {
      return t;
    };
  }
  return ma = e, ma;
}
var xa, Jl;
function v1() {
  if (Jl) return xa;
  Jl = 1;
  function e(t) {
    return function(r, n, i) {
      for (var a = -1, s = Object(r), o = i(r), u = o.length; u--; ) {
        var f = o[t ? u : ++a];
        if (n(s[f], f, s) === !1)
          break;
      }
      return r;
    };
  }
  return xa = e, xa;
}
var wa, Ql;
function tc() {
  if (Ql) return wa;
  Ql = 1;
  var e = v1(), t = e();
  return wa = t, wa;
}
var Ea, eh;
function rc() {
  if (eh) return Ea;
  eh = 1;
  var e = tc(), t = at();
  function r(n, i) {
    return n && e(n, i, t);
  }
  return Ea = r, Ea;
}
var Aa, th;
function g1() {
  if (th) return Aa;
  th = 1;
  var e = Ve();
  function t(r, n) {
    return function(i, a) {
      if (i == null)
        return i;
      if (!e(i))
        return r(i, a);
      for (var s = i.length, o = n ? s : -1, u = Object(i); (n ? o-- : ++o < s) && a(u[o], o, u) !== !1; )
        ;
      return i;
    };
  }
  return Aa = t, Aa;
}
var qa, rh;
function on() {
  if (rh) return qa;
  rh = 1;
  var e = rc(), t = g1(), r = t(e);
  return qa = r, qa;
}
var $a, nh;
function At() {
  if (nh) return $a;
  nh = 1;
  function e(t) {
    return t;
  }
  return $a = e, $a;
}
var Sa, ih;
function og() {
  if (ih) return Sa;
  ih = 1;
  var e = At();
  function t(r) {
    return typeof r == "function" ? r : e;
  }
  return Sa = t, Sa;
}
var Ca, ah;
function ug() {
  if (ah) return Ca;
  ah = 1;
  var e = Ku(), t = on(), r = og(), n = ee();
  function i(a, s) {
    var o = n(a) ? e : t;
    return o(a, r(s));
  }
  return Ca = i, Ca;
}
var Ra, sh;
function cg() {
  return sh || (sh = 1, Ra = ug()), Ra;
}
var Ta, oh;
function _1() {
  if (oh) return Ta;
  oh = 1;
  var e = on();
  function t(r, n) {
    var i = [];
    return e(r, function(a, s, o) {
      n(a, s, o) && i.push(a);
    }), i;
  }
  return Ta = t, Ta;
}
var ka, uh;
function y1() {
  if (uh) return ka;
  uh = 1;
  var e = "__lodash_hash_undefined__";
  function t(r) {
    return this.__data__.set(r, e), this;
  }
  return ka = t, ka;
}
var Ia, ch;
function b1() {
  if (ch) return Ia;
  ch = 1;
  function e(t) {
    return this.__data__.has(t);
  }
  return Ia = e, Ia;
}
var Oa, fh;
function fg() {
  if (fh) return Oa;
  fh = 1;
  var e = Vu(), t = y1(), r = b1();
  function n(i) {
    var a = -1, s = i == null ? 0 : i.length;
    for (this.__data__ = new e(); ++a < s; )
      this.add(i[a]);
  }
  return n.prototype.add = n.prototype.push = t, n.prototype.has = r, Oa = n, Oa;
}
var Ma, lh;
function m1() {
  if (lh) return Ma;
  lh = 1;
  function e(t, r) {
    for (var n = -1, i = t == null ? 0 : t.length; ++n < i; )
      if (r(t[n], n, t))
        return !0;
    return !1;
  }
  return Ma = e, Ma;
}
var Pa, hh;
function lg() {
  if (hh) return Pa;
  hh = 1;
  function e(t, r) {
    return t.has(r);
  }
  return Pa = e, Pa;
}
var Na, dh;
function hg() {
  if (dh) return Na;
  dh = 1;
  var e = fg(), t = m1(), r = lg(), n = 1, i = 2;
  function a(s, o, u, f, c, l) {
    var d = u & n, h = s.length, v = o.length;
    if (h != v && !(d && v > h))
      return !1;
    var p = l.get(s), g = l.get(o);
    if (p && g)
      return p == o && g == s;
    var _ = -1, w = !0, E = u & i ? new e() : void 0;
    for (l.set(s, o), l.set(o, s); ++_ < h; ) {
      var q = s[_], I = o[_];
      if (f)
        var T = d ? f(I, q, _, o, s, l) : f(q, I, _, s, o, l);
      if (T !== void 0) {
        if (T)
          continue;
        w = !1;
        break;
      }
      if (E) {
        if (!t(o, function(C, L) {
          if (!r(E, L) && (q === C || c(q, C, u, f, l)))
            return E.push(L);
        })) {
          w = !1;
          break;
        }
      } else if (!(q === I || c(q, I, u, f, l))) {
        w = !1;
        break;
      }
    }
    return l.delete(s), l.delete(o), w;
  }
  return Na = a, Na;
}
var La, ph;
function x1() {
  if (ph) return La;
  ph = 1;
  function e(t) {
    var r = -1, n = Array(t.size);
    return t.forEach(function(i, a) {
      n[++r] = [a, i];
    }), n;
  }
  return La = e, La;
}
var Fa, vh;
function nc() {
  if (vh) return Fa;
  vh = 1;
  function e(t) {
    var r = -1, n = Array(t.size);
    return t.forEach(function(i) {
      n[++r] = i;
    }), n;
  }
  return Fa = e, Fa;
}
var Da, gh;
function w1() {
  if (gh) return Da;
  gh = 1;
  var e = Lt(), t = rg(), r = Nt(), n = hg(), i = x1(), a = nc(), s = 1, o = 2, u = "[object Boolean]", f = "[object Date]", c = "[object Error]", l = "[object Map]", d = "[object Number]", h = "[object RegExp]", v = "[object Set]", p = "[object String]", g = "[object Symbol]", _ = "[object ArrayBuffer]", w = "[object DataView]", E = e ? e.prototype : void 0, q = E ? E.valueOf : void 0;
  function I(T, C, L, x, O, m, R) {
    switch (L) {
      case w:
        if (T.byteLength != C.byteLength || T.byteOffset != C.byteOffset)
          return !1;
        T = T.buffer, C = C.buffer;
      case _:
        return !(T.byteLength != C.byteLength || !m(new t(T), new t(C)));
      case u:
      case f:
      case d:
        return r(+T, +C);
      case c:
        return T.name == C.name && T.message == C.message;
      case h:
      case p:
        return T == C + "";
      case l:
        var k = i;
      case v:
        var y = x & s;
        if (k || (k = a), T.size != C.size && !y)
          return !1;
        var A = R.get(T);
        if (A)
          return A == C;
        x |= o, R.set(T, C);
        var b = n(k(T), k(C), x, O, m, R);
        return R.delete(T), b;
      case g:
        if (q)
          return q.call(T) == q.call(C);
    }
    return !1;
  }
  return Da = I, Da;
}
var za, _h;
function E1() {
  if (_h) return za;
  _h = 1;
  var e = eg(), t = 1, r = Object.prototype, n = r.hasOwnProperty;
  function i(a, s, o, u, f, c) {
    var l = o & t, d = e(a), h = d.length, v = e(s), p = v.length;
    if (h != p && !l)
      return !1;
    for (var g = h; g--; ) {
      var _ = d[g];
      if (!(l ? _ in s : n.call(s, _)))
        return !1;
    }
    var w = c.get(a), E = c.get(s);
    if (w && E)
      return w == s && E == a;
    var q = !0;
    c.set(a, s), c.set(s, a);
    for (var I = l; ++g < h; ) {
      _ = d[g];
      var T = a[_], C = s[_];
      if (u)
        var L = l ? u(C, T, _, s, a, c) : u(T, C, _, a, s, c);
      if (!(L === void 0 ? T === C || f(T, C, o, u, c) : L)) {
        q = !1;
        break;
      }
      I || (I = _ == "constructor");
    }
    if (q && !I) {
      var x = a.constructor, O = s.constructor;
      x != O && "constructor" in a && "constructor" in s && !(typeof x == "function" && x instanceof x && typeof O == "function" && O instanceof O) && (q = !1);
    }
    return c.delete(a), c.delete(s), q;
  }
  return za = i, za;
}
var ja, yh;
function A1() {
  if (yh) return ja;
  yh = 1;
  var e = Qr(), t = hg(), r = w1(), n = E1(), i = Dt(), a = ee(), s = Ft(), o = vr(), u = 1, f = "[object Arguments]", c = "[object Array]", l = "[object Object]", d = Object.prototype, h = d.hasOwnProperty;
  function v(p, g, _, w, E, q) {
    var I = a(p), T = a(g), C = I ? c : i(p), L = T ? c : i(g);
    C = C == f ? l : C, L = L == f ? l : L;
    var x = C == l, O = L == l, m = C == L;
    if (m && s(p)) {
      if (!s(g))
        return !1;
      I = !0, x = !1;
    }
    if (m && !x)
      return q || (q = new e()), I || o(p) ? t(p, g, _, w, E, q) : r(p, g, C, _, w, E, q);
    if (!(_ & u)) {
      var R = x && h.call(p, "__wrapped__"), k = O && h.call(g, "__wrapped__");
      if (R || k) {
        var y = R ? p.value() : p, A = k ? g.value() : g;
        return q || (q = new e()), E(y, A, _, w, q);
      }
    }
    return m ? (q || (q = new e()), n(p, g, _, w, E, q)) : !1;
  }
  return ja = v, ja;
}
var Ba, bh;
function dg() {
  if (bh) return Ba;
  bh = 1;
  var e = A1(), t = Ne();
  function r(n, i, a, s, o) {
    return n === i ? !0 : n == null || i == null || !t(n) && !t(i) ? n !== n && i !== i : e(n, i, a, s, r, o);
  }
  return Ba = r, Ba;
}
var Ga, mh;
function q1() {
  if (mh) return Ga;
  mh = 1;
  var e = Qr(), t = dg(), r = 1, n = 2;
  function i(a, s, o, u) {
    var f = o.length, c = f, l = !u;
    if (a == null)
      return !c;
    for (a = Object(a); f--; ) {
      var d = o[f];
      if (l && d[2] ? d[1] !== a[d[0]] : !(d[0] in a))
        return !1;
    }
    for (; ++f < c; ) {
      d = o[f];
      var h = d[0], v = a[h], p = d[1];
      if (l && d[2]) {
        if (v === void 0 && !(h in a))
          return !1;
      } else {
        var g = new e();
        if (u)
          var _ = u(v, p, h, a, s, g);
        if (!(_ === void 0 ? t(p, v, r | n, u, g) : _))
          return !1;
      }
    }
    return !0;
  }
  return Ga = i, Ga;
}
var Ua, xh;
function pg() {
  if (xh) return Ua;
  xh = 1;
  var e = me();
  function t(r) {
    return r === r && !e(r);
  }
  return Ua = t, Ua;
}
var Ha, wh;
function $1() {
  if (wh) return Ha;
  wh = 1;
  var e = pg(), t = at();
  function r(n) {
    for (var i = t(n), a = i.length; a--; ) {
      var s = i[a], o = n[s];
      i[a] = [s, o, e(o)];
    }
    return i;
  }
  return Ha = r, Ha;
}
var Va, Eh;
function vg() {
  if (Eh) return Va;
  Eh = 1;
  function e(t, r) {
    return function(n) {
      return n == null ? !1 : n[t] === r && (r !== void 0 || t in Object(n));
    };
  }
  return Va = e, Va;
}
var Ka, Ah;
function S1() {
  if (Ah) return Ka;
  Ah = 1;
  var e = q1(), t = $1(), r = vg();
  function n(i) {
    var a = t(i);
    return a.length == 1 && a[0][2] ? r(a[0][0], a[0][1]) : function(s) {
      return s === i || e(s, i, a);
    };
  }
  return Ka = n, Ka;
}
var Wa, qh;
function zt() {
  if (qh) return Wa;
  qh = 1;
  var e = xt(), t = Ne(), r = "[object Symbol]";
  function n(i) {
    return typeof i == "symbol" || t(i) && e(i) == r;
  }
  return Wa = n, Wa;
}
var Ya, $h;
function ic() {
  if ($h) return Ya;
  $h = 1;
  var e = ee(), t = zt(), r = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, n = /^\w*$/;
  function i(a, s) {
    if (e(a))
      return !1;
    var o = typeof a;
    return o == "number" || o == "symbol" || o == "boolean" || a == null || t(a) ? !0 : n.test(a) || !r.test(a) || s != null && a in Object(s);
  }
  return Ya = i, Ya;
}
var Xa, Sh;
function C1() {
  if (Sh) return Xa;
  Sh = 1;
  var e = Vu(), t = "Expected a function";
  function r(n, i) {
    if (typeof n != "function" || i != null && typeof i != "function")
      throw new TypeError(t);
    var a = function() {
      var s = arguments, o = i ? i.apply(this, s) : s[0], u = a.cache;
      if (u.has(o))
        return u.get(o);
      var f = n.apply(this, s);
      return a.cache = u.set(o, f) || u, f;
    };
    return a.cache = new (r.Cache || e)(), a;
  }
  return r.Cache = e, Xa = r, Xa;
}
var Za, Ch;
function R1() {
  if (Ch) return Za;
  Ch = 1;
  var e = C1(), t = 500;
  function r(n) {
    var i = e(n, function(s) {
      return a.size === t && a.clear(), s;
    }), a = i.cache;
    return i;
  }
  return Za = r, Za;
}
var Ja, Rh;
function T1() {
  if (Rh) return Ja;
  Rh = 1;
  var e = R1(), t = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, r = /\\(\\)?/g, n = e(function(i) {
    var a = [];
    return i.charCodeAt(0) === 46 && a.push(""), i.replace(t, function(s, o, u, f) {
      a.push(u ? f.replace(r, "$1") : o || s);
    }), a;
  });
  return Ja = n, Ja;
}
var Qa, Th;
function un() {
  if (Th) return Qa;
  Th = 1;
  function e(t, r) {
    for (var n = -1, i = t == null ? 0 : t.length, a = Array(i); ++n < i; )
      a[n] = r(t[n], n, t);
    return a;
  }
  return Qa = e, Qa;
}
var es, kh;
function k1() {
  if (kh) return es;
  kh = 1;
  var e = Lt(), t = un(), r = ee(), n = zt(), i = e ? e.prototype : void 0, a = i ? i.toString : void 0;
  function s(o) {
    if (typeof o == "string")
      return o;
    if (r(o))
      return t(o, s) + "";
    if (n(o))
      return a ? a.call(o) : "";
    var u = o + "";
    return u == "0" && 1 / o == -1 / 0 ? "-0" : u;
  }
  return es = s, es;
}
var ts, Ih;
function gg() {
  if (Ih) return ts;
  Ih = 1;
  var e = k1();
  function t(r) {
    return r == null ? "" : e(r);
  }
  return ts = t, ts;
}
var rs, Oh;
function cn() {
  if (Oh) return rs;
  Oh = 1;
  var e = ee(), t = ic(), r = T1(), n = gg();
  function i(a, s) {
    return e(a) ? a : t(a, s) ? [a] : r(n(a));
  }
  return rs = i, rs;
}
var ns, Mh;
function gr() {
  if (Mh) return ns;
  Mh = 1;
  var e = zt();
  function t(r) {
    if (typeof r == "string" || e(r))
      return r;
    var n = r + "";
    return n == "0" && 1 / r == -1 / 0 ? "-0" : n;
  }
  return ns = t, ns;
}
var is, Ph;
function fn() {
  if (Ph) return is;
  Ph = 1;
  var e = cn(), t = gr();
  function r(n, i) {
    i = e(i, n);
    for (var a = 0, s = i.length; n != null && a < s; )
      n = n[t(i[a++])];
    return a && a == s ? n : void 0;
  }
  return is = r, is;
}
var as, Nh;
function I1() {
  if (Nh) return as;
  Nh = 1;
  var e = fn();
  function t(r, n, i) {
    var a = r == null ? void 0 : e(r, n);
    return a === void 0 ? i : a;
  }
  return as = t, as;
}
var ss, Lh;
function O1() {
  if (Lh) return ss;
  Lh = 1;
  function e(t, r) {
    return t != null && r in Object(t);
  }
  return ss = e, ss;
}
var os, Fh;
function _g() {
  if (Fh) return os;
  Fh = 1;
  var e = cn(), t = pr(), r = ee(), n = rn(), i = Wu(), a = gr();
  function s(o, u, f) {
    u = e(u, o);
    for (var c = -1, l = u.length, d = !1; ++c < l; ) {
      var h = a(u[c]);
      if (!(d = o != null && f(o, h)))
        break;
      o = o[h];
    }
    return d || ++c != l ? d : (l = o == null ? 0 : o.length, !!l && i(l) && n(h, l) && (r(o) || t(o)));
  }
  return os = s, os;
}
var us, Dh;
function yg() {
  if (Dh) return us;
  Dh = 1;
  var e = O1(), t = _g();
  function r(n, i) {
    return n != null && t(n, i, e);
  }
  return us = r, us;
}
var cs, zh;
function M1() {
  if (zh) return cs;
  zh = 1;
  var e = dg(), t = I1(), r = yg(), n = ic(), i = pg(), a = vg(), s = gr(), o = 1, u = 2;
  function f(c, l) {
    return n(c) && i(l) ? a(s(c), l) : function(d) {
      var h = t(d, c);
      return h === void 0 && h === l ? r(d, c) : e(l, h, o | u);
    };
  }
  return cs = f, cs;
}
var fs, jh;
function bg() {
  if (jh) return fs;
  jh = 1;
  function e(t) {
    return function(r) {
      return r == null ? void 0 : r[t];
    };
  }
  return fs = e, fs;
}
var ls, Bh;
function P1() {
  if (Bh) return ls;
  Bh = 1;
  var e = fn();
  function t(r) {
    return function(n) {
      return e(n, r);
    };
  }
  return ls = t, ls;
}
var hs, Gh;
function N1() {
  if (Gh) return hs;
  Gh = 1;
  var e = bg(), t = P1(), r = ic(), n = gr();
  function i(a) {
    return r(a) ? e(n(a)) : t(a);
  }
  return hs = i, hs;
}
var ds, Uh;
function Ke() {
  if (Uh) return ds;
  Uh = 1;
  var e = S1(), t = M1(), r = At(), n = ee(), i = N1();
  function a(s) {
    return typeof s == "function" ? s : s == null ? r : typeof s == "object" ? n(s) ? t(s[0], s[1]) : e(s) : i(s);
  }
  return ds = a, ds;
}
var ps, Hh;
function mg() {
  if (Hh) return ps;
  Hh = 1;
  var e = Xv(), t = _1(), r = Ke(), n = ee();
  function i(a, s) {
    var o = n(a) ? e : t;
    return o(a, r(s, 3));
  }
  return ps = i, ps;
}
var vs, Vh;
function L1() {
  if (Vh) return vs;
  Vh = 1;
  var e = Object.prototype, t = e.hasOwnProperty;
  function r(n, i) {
    return n != null && t.call(n, i);
  }
  return vs = r, vs;
}
var gs, Kh;
function xg() {
  if (Kh) return gs;
  Kh = 1;
  var e = L1(), t = _g();
  function r(n, i) {
    return n != null && t(n, i, e);
  }
  return gs = r, gs;
}
var _s, Wh;
function F1() {
  if (Wh) return _s;
  Wh = 1;
  var e = Xu(), t = Dt(), r = pr(), n = ee(), i = Ve(), a = Ft(), s = an(), o = vr(), u = "[object Map]", f = "[object Set]", c = Object.prototype, l = c.hasOwnProperty;
  function d(h) {
    if (h == null)
      return !0;
    if (i(h) && (n(h) || typeof h == "string" || typeof h.splice == "function" || a(h) || o(h) || r(h)))
      return !h.length;
    var v = t(h);
    if (v == u || v == f)
      return !h.size;
    if (s(h))
      return !e(h).length;
    for (var p in h)
      if (l.call(h, p))
        return !1;
    return !0;
  }
  return _s = d, _s;
}
var ys, Yh;
function wg() {
  if (Yh) return ys;
  Yh = 1;
  function e(t) {
    return t === void 0;
  }
  return ys = e, ys;
}
var bs, Xh;
function Eg() {
  if (Xh) return bs;
  Xh = 1;
  var e = on(), t = Ve();
  function r(n, i) {
    var a = -1, s = t(n) ? Array(n.length) : [];
    return e(n, function(o, u, f) {
      s[++a] = i(o, u, f);
    }), s;
  }
  return bs = r, bs;
}
var ms, Zh;
function Ag() {
  if (Zh) return ms;
  Zh = 1;
  var e = un(), t = Ke(), r = Eg(), n = ee();
  function i(a, s) {
    var o = n(a) ? e : r;
    return o(a, t(s, 3));
  }
  return ms = i, ms;
}
var xs, Jh;
function D1() {
  if (Jh) return xs;
  Jh = 1;
  function e(t, r, n, i) {
    var a = -1, s = t == null ? 0 : t.length;
    for (i && s && (n = t[++a]); ++a < s; )
      n = r(n, t[a], a, t);
    return n;
  }
  return xs = e, xs;
}
var ws, Qh;
function z1() {
  if (Qh) return ws;
  Qh = 1;
  function e(t, r, n, i, a) {
    return a(t, function(s, o, u) {
      n = i ? (i = !1, s) : r(n, s, o, u);
    }), n;
  }
  return ws = e, ws;
}
var Es, ed;
function qg() {
  if (ed) return Es;
  ed = 1;
  var e = D1(), t = on(), r = Ke(), n = z1(), i = ee();
  function a(s, o, u) {
    var f = i(s) ? e : n, c = arguments.length < 3;
    return f(s, r(o, 4), u, c, t);
  }
  return Es = a, Es;
}
var As, td;
function j1() {
  if (td) return As;
  td = 1;
  var e = xt(), t = ee(), r = Ne(), n = "[object String]";
  function i(a) {
    return typeof a == "string" || !t(a) && r(a) && e(a) == n;
  }
  return As = i, As;
}
var qs, rd;
function B1() {
  if (rd) return qs;
  rd = 1;
  var e = bg(), t = e("length");
  return qs = t, qs;
}
var $s, nd;
function G1() {
  if (nd) return $s;
  nd = 1;
  var e = "\\ud800-\\udfff", t = "\\u0300-\\u036f", r = "\\ufe20-\\ufe2f", n = "\\u20d0-\\u20ff", i = t + r + n, a = "\\ufe0e\\ufe0f", s = "\\u200d", o = RegExp("[" + s + e + i + a + "]");
  function u(f) {
    return o.test(f);
  }
  return $s = u, $s;
}
var Ss, id;
function U1() {
  if (id) return Ss;
  id = 1;
  var e = "\\ud800-\\udfff", t = "\\u0300-\\u036f", r = "\\ufe20-\\ufe2f", n = "\\u20d0-\\u20ff", i = t + r + n, a = "\\ufe0e\\ufe0f", s = "[" + e + "]", o = "[" + i + "]", u = "\\ud83c[\\udffb-\\udfff]", f = "(?:" + o + "|" + u + ")", c = "[^" + e + "]", l = "(?:\\ud83c[\\udde6-\\uddff]){2}", d = "[\\ud800-\\udbff][\\udc00-\\udfff]", h = "\\u200d", v = f + "?", p = "[" + a + "]?", g = "(?:" + h + "(?:" + [c, l, d].join("|") + ")" + p + v + ")*", _ = p + v + g, w = "(?:" + [c + o + "?", o, l, d, s].join("|") + ")", E = RegExp(u + "(?=" + u + ")|" + w + _, "g");
  function q(I) {
    for (var T = E.lastIndex = 0; E.test(I); )
      ++T;
    return T;
  }
  return Ss = q, Ss;
}
var Cs, ad;
function H1() {
  if (ad) return Cs;
  ad = 1;
  var e = B1(), t = G1(), r = U1();
  function n(i) {
    return t(i) ? r(i) : e(i);
  }
  return Cs = n, Cs;
}
var Rs, sd;
function V1() {
  if (sd) return Rs;
  sd = 1;
  var e = Xu(), t = Dt(), r = Ve(), n = j1(), i = H1(), a = "[object Map]", s = "[object Set]";
  function o(u) {
    if (u == null)
      return 0;
    if (r(u))
      return n(u) ? i(u) : u.length;
    var f = t(u);
    return f == a || f == s ? u.size : e(u).length;
  }
  return Rs = o, Rs;
}
var Ts, od;
function K1() {
  if (od) return Ts;
  od = 1;
  var e = Ku(), t = ig(), r = rc(), n = Ke(), i = sn(), a = ee(), s = Ft(), o = hr(), u = me(), f = vr();
  function c(l, d, h) {
    var v = a(l), p = v || s(l) || f(l);
    if (d = n(d, 4), h == null) {
      var g = l && l.constructor;
      p ? h = v ? new g() : [] : u(l) ? h = o(g) ? t(i(l)) : {} : h = {};
    }
    return (p ? e : r)(l, function(_, w, E) {
      return d(h, _, w, E);
    }), h;
  }
  return Ts = c, Ts;
}
var ks, ud;
function W1() {
  if (ud) return ks;
  ud = 1;
  var e = Lt(), t = pr(), r = ee(), n = e ? e.isConcatSpreadable : void 0;
  function i(a) {
    return r(a) || t(a) || !!(n && a && a[n]);
  }
  return ks = i, ks;
}
var Is, cd;
function ac() {
  if (cd) return Is;
  cd = 1;
  var e = Ju(), t = W1();
  function r(n, i, a, s, o) {
    var u = -1, f = n.length;
    for (a || (a = t), o || (o = []); ++u < f; ) {
      var c = n[u];
      i > 0 && a(c) ? i > 1 ? r(c, i - 1, a, s, o) : e(o, c) : s || (o[o.length] = c);
    }
    return o;
  }
  return Is = r, Is;
}
var Os, fd;
function Y1() {
  if (fd) return Os;
  fd = 1;
  function e(t, r, n) {
    switch (n.length) {
      case 0:
        return t.call(r);
      case 1:
        return t.call(r, n[0]);
      case 2:
        return t.call(r, n[0], n[1]);
      case 3:
        return t.call(r, n[0], n[1], n[2]);
    }
    return t.apply(r, n);
  }
  return Os = e, Os;
}
var Ms, ld;
function $g() {
  if (ld) return Ms;
  ld = 1;
  var e = Y1(), t = Math.max;
  function r(n, i, a) {
    return i = t(i === void 0 ? n.length - 1 : i, 0), function() {
      for (var s = arguments, o = -1, u = t(s.length - i, 0), f = Array(u); ++o < u; )
        f[o] = s[i + o];
      o = -1;
      for (var c = Array(i + 1); ++o < i; )
        c[o] = s[o];
      return c[i] = a(f), e(n, this, c);
    };
  }
  return Ms = r, Ms;
}
var Ps, hd;
function X1() {
  if (hd) return Ps;
  hd = 1;
  var e = ec(), t = Hv(), r = At(), n = t ? function(i, a) {
    return t(i, "toString", {
      configurable: !0,
      enumerable: !1,
      value: e(a),
      writable: !0
    });
  } : r;
  return Ps = n, Ps;
}
var Ns, dd;
function Z1() {
  if (dd) return Ns;
  dd = 1;
  var e = 800, t = 16, r = Date.now;
  function n(i) {
    var a = 0, s = 0;
    return function() {
      var o = r(), u = t - (o - s);
      if (s = o, u > 0) {
        if (++a >= e)
          return arguments[0];
      } else
        a = 0;
      return i.apply(void 0, arguments);
    };
  }
  return Ns = n, Ns;
}
var Ls, pd;
function Sg() {
  if (pd) return Ls;
  pd = 1;
  var e = X1(), t = Z1(), r = t(e);
  return Ls = r, Ls;
}
var Fs, vd;
function ln() {
  if (vd) return Fs;
  vd = 1;
  var e = At(), t = $g(), r = Sg();
  function n(i, a) {
    return r(t(i, a, e), i + "");
  }
  return Fs = n, Fs;
}
var Ds, gd;
function Cg() {
  if (gd) return Ds;
  gd = 1;
  function e(t, r, n, i) {
    for (var a = t.length, s = n + (i ? 1 : -1); i ? s-- : ++s < a; )
      if (r(t[s], s, t))
        return s;
    return -1;
  }
  return Ds = e, Ds;
}
var zs, _d;
function J1() {
  if (_d) return zs;
  _d = 1;
  function e(t) {
    return t !== t;
  }
  return zs = e, zs;
}
var js, yd;
function Q1() {
  if (yd) return js;
  yd = 1;
  function e(t, r, n) {
    for (var i = n - 1, a = t.length; ++i < a; )
      if (t[i] === r)
        return i;
    return -1;
  }
  return js = e, js;
}
var Bs, bd;
function ex() {
  if (bd) return Bs;
  bd = 1;
  var e = Cg(), t = J1(), r = Q1();
  function n(i, a, s) {
    return a === a ? r(i, a, s) : e(i, t, s);
  }
  return Bs = n, Bs;
}
var Gs, md;
function tx() {
  if (md) return Gs;
  md = 1;
  var e = ex();
  function t(r, n) {
    var i = r == null ? 0 : r.length;
    return !!i && e(r, n, 0) > -1;
  }
  return Gs = t, Gs;
}
var Us, xd;
function rx() {
  if (xd) return Us;
  xd = 1;
  function e(t, r, n) {
    for (var i = -1, a = t == null ? 0 : t.length; ++i < a; )
      if (n(r, t[i]))
        return !0;
    return !1;
  }
  return Us = e, Us;
}
var Hs, wd;
function nx() {
  if (wd) return Hs;
  wd = 1;
  function e() {
  }
  return Hs = e, Hs;
}
var Vs, Ed;
function ix() {
  if (Ed) return Vs;
  Ed = 1;
  var e = tg(), t = nx(), r = nc(), n = 1 / 0, i = e && 1 / r(new e([, -0]))[1] == n ? function(a) {
    return new e(a);
  } : t;
  return Vs = i, Vs;
}
var Ks, Ad;
function ax() {
  if (Ad) return Ks;
  Ad = 1;
  var e = fg(), t = tx(), r = rx(), n = lg(), i = ix(), a = nc(), s = 200;
  function o(u, f, c) {
    var l = -1, d = t, h = u.length, v = !0, p = [], g = p;
    if (c)
      v = !1, d = r;
    else if (h >= s) {
      var _ = f ? null : i(u);
      if (_)
        return a(_);
      v = !1, d = n, g = new e();
    } else
      g = f ? [] : p;
    e:
      for (; ++l < h; ) {
        var w = u[l], E = f ? f(w) : w;
        if (w = c || w !== 0 ? w : 0, v && E === E) {
          for (var q = g.length; q--; )
            if (g[q] === E)
              continue e;
          f && g.push(E), p.push(w);
        } else d(g, E, c) || (g !== p && g.push(E), p.push(w));
      }
    return p;
  }
  return Ks = o, Ks;
}
var Ws, qd;
function Rg() {
  if (qd) return Ws;
  qd = 1;
  var e = Ve(), t = Ne();
  function r(n) {
    return t(n) && e(n);
  }
  return Ws = r, Ws;
}
var Ys, $d;
function sx() {
  if ($d) return Ys;
  $d = 1;
  var e = ac(), t = ln(), r = ax(), n = Rg(), i = t(function(a) {
    return r(e(a, 1, n, !0));
  });
  return Ys = i, Ys;
}
var Xs, Sd;
function ox() {
  if (Sd) return Xs;
  Sd = 1;
  var e = un();
  function t(r, n) {
    return e(n, function(i) {
      return r[i];
    });
  }
  return Xs = t, Xs;
}
var Zs, Cd;
function Tg() {
  if (Cd) return Zs;
  Cd = 1;
  var e = ox(), t = at();
  function r(n) {
    return n == null ? [] : e(n, t(n));
  }
  return Zs = r, Zs;
}
var Js, Rd;
function xe() {
  if (Rd) return Js;
  Rd = 1;
  var e;
  if (typeof Uu == "function")
    try {
      e = {
        clone: p1(),
        constant: ec(),
        each: cg(),
        filter: mg(),
        has: xg(),
        isArray: ee(),
        isEmpty: F1(),
        isFunction: hr(),
        isUndefined: wg(),
        keys: at(),
        map: Ag(),
        reduce: qg(),
        size: V1(),
        transform: K1(),
        union: sx(),
        values: Tg()
      };
    } catch {
    }
  return e || (e = window._), Js = e, Js;
}
var Qs, Td;
function sc() {
  if (Td) return Qs;
  Td = 1;
  var e = xe();
  Qs = i;
  var t = "\0", r = "\0", n = "";
  function i(c) {
    this._isDirected = e.has(c, "directed") ? c.directed : !0, this._isMultigraph = e.has(c, "multigraph") ? c.multigraph : !1, this._isCompound = e.has(c, "compound") ? c.compound : !1, this._label = void 0, this._defaultNodeLabelFn = e.constant(void 0), this._defaultEdgeLabelFn = e.constant(void 0), this._nodes = {}, this._isCompound && (this._parent = {}, this._children = {}, this._children[r] = {}), this._in = {}, this._preds = {}, this._out = {}, this._sucs = {}, this._edgeObjs = {}, this._edgeLabels = {};
  }
  i.prototype._nodeCount = 0, i.prototype._edgeCount = 0, i.prototype.isDirected = function() {
    return this._isDirected;
  }, i.prototype.isMultigraph = function() {
    return this._isMultigraph;
  }, i.prototype.isCompound = function() {
    return this._isCompound;
  }, i.prototype.setGraph = function(c) {
    return this._label = c, this;
  }, i.prototype.graph = function() {
    return this._label;
  }, i.prototype.setDefaultNodeLabel = function(c) {
    return e.isFunction(c) || (c = e.constant(c)), this._defaultNodeLabelFn = c, this;
  }, i.prototype.nodeCount = function() {
    return this._nodeCount;
  }, i.prototype.nodes = function() {
    return e.keys(this._nodes);
  }, i.prototype.sources = function() {
    var c = this;
    return e.filter(this.nodes(), function(l) {
      return e.isEmpty(c._in[l]);
    });
  }, i.prototype.sinks = function() {
    var c = this;
    return e.filter(this.nodes(), function(l) {
      return e.isEmpty(c._out[l]);
    });
  }, i.prototype.setNodes = function(c, l) {
    var d = arguments, h = this;
    return e.each(c, function(v) {
      d.length > 1 ? h.setNode(v, l) : h.setNode(v);
    }), this;
  }, i.prototype.setNode = function(c, l) {
    return e.has(this._nodes, c) ? (arguments.length > 1 && (this._nodes[c] = l), this) : (this._nodes[c] = arguments.length > 1 ? l : this._defaultNodeLabelFn(c), this._isCompound && (this._parent[c] = r, this._children[c] = {}, this._children[r][c] = !0), this._in[c] = {}, this._preds[c] = {}, this._out[c] = {}, this._sucs[c] = {}, ++this._nodeCount, this);
  }, i.prototype.node = function(c) {
    return this._nodes[c];
  }, i.prototype.hasNode = function(c) {
    return e.has(this._nodes, c);
  }, i.prototype.removeNode = function(c) {
    var l = this;
    if (e.has(this._nodes, c)) {
      var d = function(h) {
        l.removeEdge(l._edgeObjs[h]);
      };
      delete this._nodes[c], this._isCompound && (this._removeFromParentsChildList(c), delete this._parent[c], e.each(this.children(c), function(h) {
        l.setParent(h);
      }), delete this._children[c]), e.each(e.keys(this._in[c]), d), delete this._in[c], delete this._preds[c], e.each(e.keys(this._out[c]), d), delete this._out[c], delete this._sucs[c], --this._nodeCount;
    }
    return this;
  }, i.prototype.setParent = function(c, l) {
    if (!this._isCompound)
      throw new Error("Cannot set parent in a non-compound graph");
    if (e.isUndefined(l))
      l = r;
    else {
      l += "";
      for (var d = l; !e.isUndefined(d); d = this.parent(d))
        if (d === c)
          throw new Error("Setting " + l + " as parent of " + c + " would create a cycle");
      this.setNode(l);
    }
    return this.setNode(c), this._removeFromParentsChildList(c), this._parent[c] = l, this._children[l][c] = !0, this;
  }, i.prototype._removeFromParentsChildList = function(c) {
    delete this._children[this._parent[c]][c];
  }, i.prototype.parent = function(c) {
    if (this._isCompound) {
      var l = this._parent[c];
      if (l !== r)
        return l;
    }
  }, i.prototype.children = function(c) {
    if (e.isUndefined(c) && (c = r), this._isCompound) {
      var l = this._children[c];
      if (l)
        return e.keys(l);
    } else {
      if (c === r)
        return this.nodes();
      if (this.hasNode(c))
        return [];
    }
  }, i.prototype.predecessors = function(c) {
    var l = this._preds[c];
    if (l)
      return e.keys(l);
  }, i.prototype.successors = function(c) {
    var l = this._sucs[c];
    if (l)
      return e.keys(l);
  }, i.prototype.neighbors = function(c) {
    var l = this.predecessors(c);
    if (l)
      return e.union(l, this.successors(c));
  }, i.prototype.isLeaf = function(c) {
    var l;
    return this.isDirected() ? l = this.successors(c) : l = this.neighbors(c), l.length === 0;
  }, i.prototype.filterNodes = function(c) {
    var l = new this.constructor({
      directed: this._isDirected,
      multigraph: this._isMultigraph,
      compound: this._isCompound
    });
    l.setGraph(this.graph());
    var d = this;
    e.each(this._nodes, function(p, g) {
      c(g) && l.setNode(g, p);
    }), e.each(this._edgeObjs, function(p) {
      l.hasNode(p.v) && l.hasNode(p.w) && l.setEdge(p, d.edge(p));
    });
    var h = {};
    function v(p) {
      var g = d.parent(p);
      return g === void 0 || l.hasNode(g) ? (h[p] = g, g) : g in h ? h[g] : v(g);
    }
    return this._isCompound && e.each(l.nodes(), function(p) {
      l.setParent(p, v(p));
    }), l;
  }, i.prototype.setDefaultEdgeLabel = function(c) {
    return e.isFunction(c) || (c = e.constant(c)), this._defaultEdgeLabelFn = c, this;
  }, i.prototype.edgeCount = function() {
    return this._edgeCount;
  }, i.prototype.edges = function() {
    return e.values(this._edgeObjs);
  }, i.prototype.setPath = function(c, l) {
    var d = this, h = arguments;
    return e.reduce(c, function(v, p) {
      return h.length > 1 ? d.setEdge(v, p, l) : d.setEdge(v, p), p;
    }), this;
  }, i.prototype.setEdge = function() {
    var c, l, d, h, v = !1, p = arguments[0];
    typeof p == "object" && p !== null && "v" in p ? (c = p.v, l = p.w, d = p.name, arguments.length === 2 && (h = arguments[1], v = !0)) : (c = p, l = arguments[1], d = arguments[3], arguments.length > 2 && (h = arguments[2], v = !0)), c = "" + c, l = "" + l, e.isUndefined(d) || (d = "" + d);
    var g = o(this._isDirected, c, l, d);
    if (e.has(this._edgeLabels, g))
      return v && (this._edgeLabels[g] = h), this;
    if (!e.isUndefined(d) && !this._isMultigraph)
      throw new Error("Cannot set a named edge when isMultigraph = false");
    this.setNode(c), this.setNode(l), this._edgeLabels[g] = v ? h : this._defaultEdgeLabelFn(c, l, d);
    var _ = u(this._isDirected, c, l, d);
    return c = _.v, l = _.w, Object.freeze(_), this._edgeObjs[g] = _, a(this._preds[l], c), a(this._sucs[c], l), this._in[l][g] = _, this._out[c][g] = _, this._edgeCount++, this;
  }, i.prototype.edge = function(c, l, d) {
    var h = arguments.length === 1 ? f(this._isDirected, arguments[0]) : o(this._isDirected, c, l, d);
    return this._edgeLabels[h];
  }, i.prototype.hasEdge = function(c, l, d) {
    var h = arguments.length === 1 ? f(this._isDirected, arguments[0]) : o(this._isDirected, c, l, d);
    return e.has(this._edgeLabels, h);
  }, i.prototype.removeEdge = function(c, l, d) {
    var h = arguments.length === 1 ? f(this._isDirected, arguments[0]) : o(this._isDirected, c, l, d), v = this._edgeObjs[h];
    return v && (c = v.v, l = v.w, delete this._edgeLabels[h], delete this._edgeObjs[h], s(this._preds[l], c), s(this._sucs[c], l), delete this._in[l][h], delete this._out[c][h], this._edgeCount--), this;
  }, i.prototype.inEdges = function(c, l) {
    var d = this._in[c];
    if (d) {
      var h = e.values(d);
      return l ? e.filter(h, function(v) {
        return v.v === l;
      }) : h;
    }
  }, i.prototype.outEdges = function(c, l) {
    var d = this._out[c];
    if (d) {
      var h = e.values(d);
      return l ? e.filter(h, function(v) {
        return v.w === l;
      }) : h;
    }
  }, i.prototype.nodeEdges = function(c, l) {
    var d = this.inEdges(c, l);
    if (d)
      return d.concat(this.outEdges(c, l));
  };
  function a(c, l) {
    c[l] ? c[l]++ : c[l] = 1;
  }
  function s(c, l) {
    --c[l] || delete c[l];
  }
  function o(c, l, d, h) {
    var v = "" + l, p = "" + d;
    if (!c && v > p) {
      var g = v;
      v = p, p = g;
    }
    return v + n + p + n + (e.isUndefined(h) ? t : h);
  }
  function u(c, l, d, h) {
    var v = "" + l, p = "" + d;
    if (!c && v > p) {
      var g = v;
      v = p, p = g;
    }
    var _ = { v, w: p };
    return h && (_.name = h), _;
  }
  function f(c, l) {
    return o(c, l.v, l.w, l.name);
  }
  return Qs;
}
var eo, kd;
function ux() {
  return kd || (kd = 1, eo = "2.1.8"), eo;
}
var to, Id;
function cx() {
  return Id || (Id = 1, to = {
    Graph: sc(),
    version: ux()
  }), to;
}
var ro, Od;
function fx() {
  if (Od) return ro;
  Od = 1;
  var e = xe(), t = sc();
  ro = {
    write: r,
    read: a
  };
  function r(s) {
    var o = {
      options: {
        directed: s.isDirected(),
        multigraph: s.isMultigraph(),
        compound: s.isCompound()
      },
      nodes: n(s),
      edges: i(s)
    };
    return e.isUndefined(s.graph()) || (o.value = e.clone(s.graph())), o;
  }
  function n(s) {
    return e.map(s.nodes(), function(o) {
      var u = s.node(o), f = s.parent(o), c = { v: o };
      return e.isUndefined(u) || (c.value = u), e.isUndefined(f) || (c.parent = f), c;
    });
  }
  function i(s) {
    return e.map(s.edges(), function(o) {
      var u = s.edge(o), f = { v: o.v, w: o.w };
      return e.isUndefined(o.name) || (f.name = o.name), e.isUndefined(u) || (f.value = u), f;
    });
  }
  function a(s) {
    var o = new t(s.options).setGraph(s.value);
    return e.each(s.nodes, function(u) {
      o.setNode(u.v, u.value), u.parent && o.setParent(u.v, u.parent);
    }), e.each(s.edges, function(u) {
      o.setEdge({ v: u.v, w: u.w, name: u.name }, u.value);
    }), o;
  }
  return ro;
}
var no, Md;
function lx() {
  if (Md) return no;
  Md = 1;
  var e = xe();
  no = t;
  function t(r) {
    var n = {}, i = [], a;
    function s(o) {
      e.has(n, o) || (n[o] = !0, a.push(o), e.each(r.successors(o), s), e.each(r.predecessors(o), s));
    }
    return e.each(r.nodes(), function(o) {
      a = [], s(o), a.length && i.push(a);
    }), i;
  }
  return no;
}
var io, Pd;
function kg() {
  if (Pd) return io;
  Pd = 1;
  var e = xe();
  io = t;
  function t() {
    this._arr = [], this._keyIndices = {};
  }
  return t.prototype.size = function() {
    return this._arr.length;
  }, t.prototype.keys = function() {
    return this._arr.map(function(r) {
      return r.key;
    });
  }, t.prototype.has = function(r) {
    return e.has(this._keyIndices, r);
  }, t.prototype.priority = function(r) {
    var n = this._keyIndices[r];
    if (n !== void 0)
      return this._arr[n].priority;
  }, t.prototype.min = function() {
    if (this.size() === 0)
      throw new Error("Queue underflow");
    return this._arr[0].key;
  }, t.prototype.add = function(r, n) {
    var i = this._keyIndices;
    if (r = String(r), !e.has(i, r)) {
      var a = this._arr, s = a.length;
      return i[r] = s, a.push({ key: r, priority: n }), this._decrease(s), !0;
    }
    return !1;
  }, t.prototype.removeMin = function() {
    this._swap(0, this._arr.length - 1);
    var r = this._arr.pop();
    return delete this._keyIndices[r.key], this._heapify(0), r.key;
  }, t.prototype.decrease = function(r, n) {
    var i = this._keyIndices[r];
    if (n > this._arr[i].priority)
      throw new Error("New priority is greater than current priority. Key: " + r + " Old: " + this._arr[i].priority + " New: " + n);
    this._arr[i].priority = n, this._decrease(i);
  }, t.prototype._heapify = function(r) {
    var n = this._arr, i = 2 * r, a = i + 1, s = r;
    i < n.length && (s = n[i].priority < n[s].priority ? i : s, a < n.length && (s = n[a].priority < n[s].priority ? a : s), s !== r && (this._swap(r, s), this._heapify(s)));
  }, t.prototype._decrease = function(r) {
    for (var n = this._arr, i = n[r].priority, a; r !== 0 && (a = r >> 1, !(n[a].priority < i)); )
      this._swap(r, a), r = a;
  }, t.prototype._swap = function(r, n) {
    var i = this._arr, a = this._keyIndices, s = i[r], o = i[n];
    i[r] = o, i[n] = s, a[o.key] = r, a[s.key] = n;
  }, io;
}
var ao, Nd;
function Ig() {
  if (Nd) return ao;
  Nd = 1;
  var e = xe(), t = kg();
  ao = n;
  var r = e.constant(1);
  function n(a, s, o, u) {
    return i(
      a,
      String(s),
      o || r,
      u || function(f) {
        return a.outEdges(f);
      }
    );
  }
  function i(a, s, o, u) {
    var f = {}, c = new t(), l, d, h = function(v) {
      var p = v.v !== l ? v.v : v.w, g = f[p], _ = o(v), w = d.distance + _;
      if (_ < 0)
        throw new Error("dijkstra does not allow negative edge weights. Bad edge: " + v + " Weight: " + _);
      w < g.distance && (g.distance = w, g.predecessor = l, c.decrease(p, w));
    };
    for (a.nodes().forEach(function(v) {
      var p = v === s ? 0 : Number.POSITIVE_INFINITY;
      f[v] = { distance: p }, c.add(v, p);
    }); c.size() > 0 && (l = c.removeMin(), d = f[l], d.distance !== Number.POSITIVE_INFINITY); )
      u(l).forEach(h);
    return f;
  }
  return ao;
}
var so, Ld;
function hx() {
  if (Ld) return so;
  Ld = 1;
  var e = Ig(), t = xe();
  so = r;
  function r(n, i, a) {
    return t.transform(n.nodes(), function(s, o) {
      s[o] = e(n, o, i, a);
    }, {});
  }
  return so;
}
var oo, Fd;
function Og() {
  if (Fd) return oo;
  Fd = 1;
  var e = xe();
  oo = t;
  function t(r) {
    var n = 0, i = [], a = {}, s = [];
    function o(u) {
      var f = a[u] = {
        onStack: !0,
        lowlink: n,
        index: n++
      };
      if (i.push(u), r.successors(u).forEach(function(d) {
        e.has(a, d) ? a[d].onStack && (f.lowlink = Math.min(f.lowlink, a[d].index)) : (o(d), f.lowlink = Math.min(f.lowlink, a[d].lowlink));
      }), f.lowlink === f.index) {
        var c = [], l;
        do
          l = i.pop(), a[l].onStack = !1, c.push(l);
        while (u !== l);
        s.push(c);
      }
    }
    return r.nodes().forEach(function(u) {
      e.has(a, u) || o(u);
    }), s;
  }
  return oo;
}
var uo, Dd;
function dx() {
  if (Dd) return uo;
  Dd = 1;
  var e = xe(), t = Og();
  uo = r;
  function r(n) {
    return e.filter(t(n), function(i) {
      return i.length > 1 || i.length === 1 && n.hasEdge(i[0], i[0]);
    });
  }
  return uo;
}
var co, zd;
function px() {
  if (zd) return co;
  zd = 1;
  var e = xe();
  co = r;
  var t = e.constant(1);
  function r(i, a, s) {
    return n(
      i,
      a || t,
      s || function(o) {
        return i.outEdges(o);
      }
    );
  }
  function n(i, a, s) {
    var o = {}, u = i.nodes();
    return u.forEach(function(f) {
      o[f] = {}, o[f][f] = { distance: 0 }, u.forEach(function(c) {
        f !== c && (o[f][c] = { distance: Number.POSITIVE_INFINITY });
      }), s(f).forEach(function(c) {
        var l = c.v === f ? c.w : c.v, d = a(c);
        o[f][l] = { distance: d, predecessor: f };
      });
    }), u.forEach(function(f) {
      var c = o[f];
      u.forEach(function(l) {
        var d = o[l];
        u.forEach(function(h) {
          var v = d[f], p = c[h], g = d[h], _ = v.distance + p.distance;
          _ < g.distance && (g.distance = _, g.predecessor = p.predecessor);
        });
      });
    }), o;
  }
  return co;
}
var fo, jd;
function Mg() {
  if (jd) return fo;
  jd = 1;
  var e = xe();
  fo = t, t.CycleException = r;
  function t(n) {
    var i = {}, a = {}, s = [];
    function o(u) {
      if (e.has(a, u))
        throw new r();
      e.has(i, u) || (a[u] = !0, i[u] = !0, e.each(n.predecessors(u), o), delete a[u], s.push(u));
    }
    if (e.each(n.sinks(), o), e.size(i) !== n.nodeCount())
      throw new r();
    return s;
  }
  function r() {
  }
  return r.prototype = new Error(), fo;
}
var lo, Bd;
function vx() {
  if (Bd) return lo;
  Bd = 1;
  var e = Mg();
  lo = t;
  function t(r) {
    try {
      e(r);
    } catch (n) {
      if (n instanceof e.CycleException)
        return !1;
      throw n;
    }
    return !0;
  }
  return lo;
}
var ho, Gd;
function Pg() {
  if (Gd) return ho;
  Gd = 1;
  var e = xe();
  ho = t;
  function t(n, i, a) {
    e.isArray(i) || (i = [i]);
    var s = (n.isDirected() ? n.successors : n.neighbors).bind(n), o = [], u = {};
    return e.each(i, function(f) {
      if (!n.hasNode(f))
        throw new Error("Graph does not have node: " + f);
      r(n, f, a === "post", u, s, o);
    }), o;
  }
  function r(n, i, a, s, o, u) {
    e.has(s, i) || (s[i] = !0, a || u.push(i), e.each(o(i), function(f) {
      r(n, f, a, s, o, u);
    }), a && u.push(i));
  }
  return ho;
}
var po, Ud;
function gx() {
  if (Ud) return po;
  Ud = 1;
  var e = Pg();
  po = t;
  function t(r, n) {
    return e(r, n, "post");
  }
  return po;
}
var vo, Hd;
function _x() {
  if (Hd) return vo;
  Hd = 1;
  var e = Pg();
  vo = t;
  function t(r, n) {
    return e(r, n, "pre");
  }
  return vo;
}
var go, Vd;
function yx() {
  if (Vd) return go;
  Vd = 1;
  var e = xe(), t = sc(), r = kg();
  go = n;
  function n(i, a) {
    var s = new t(), o = {}, u = new r(), f;
    function c(d) {
      var h = d.v === f ? d.w : d.v, v = u.priority(h);
      if (v !== void 0) {
        var p = a(d);
        p < v && (o[h] = f, u.decrease(h, p));
      }
    }
    if (i.nodeCount() === 0)
      return s;
    e.each(i.nodes(), function(d) {
      u.add(d, Number.POSITIVE_INFINITY), s.setNode(d);
    }), u.decrease(i.nodes()[0], 0);
    for (var l = !1; u.size() > 0; ) {
      if (f = u.removeMin(), e.has(o, f))
        s.setEdge(f, o[f]);
      else {
        if (l)
          throw new Error("Input graph is not connected: " + i);
        l = !0;
      }
      i.nodeEdges(f).forEach(c);
    }
    return s;
  }
  return go;
}
var _o, Kd;
function bx() {
  return Kd || (Kd = 1, _o = {
    components: lx(),
    dijkstra: Ig(),
    dijkstraAll: hx(),
    findCycles: dx(),
    floydWarshall: px(),
    isAcyclic: vx(),
    postorder: gx(),
    preorder: _x(),
    prim: yx(),
    tarjan: Og(),
    topsort: Mg()
  }), _o;
}
var yo, Wd;
function mx() {
  if (Wd) return yo;
  Wd = 1;
  var e = cx();
  return yo = {
    Graph: e.Graph,
    json: fx(),
    alg: bx(),
    version: e.version
  }, yo;
}
var zr;
if (typeof Uu == "function")
  try {
    zr = mx();
  } catch {
  }
zr || (zr = window.graphlib);
var Ce = zr, bo, Yd;
function xx() {
  if (Yd) return bo;
  Yd = 1;
  var e = sg(), t = 1, r = 4;
  function n(i) {
    return e(i, t | r);
  }
  return bo = n, bo;
}
var mo, Xd;
function hn() {
  if (Xd) return mo;
  Xd = 1;
  var e = Nt(), t = Ve(), r = rn(), n = me();
  function i(a, s, o) {
    if (!n(o))
      return !1;
    var u = typeof s;
    return (u == "number" ? t(o) && r(s, o.length) : u == "string" && s in o) ? e(o[s], a) : !1;
  }
  return mo = i, mo;
}
var xo, Zd;
function wx() {
  if (Zd) return xo;
  Zd = 1;
  var e = ln(), t = Nt(), r = hn(), n = Et(), i = Object.prototype, a = i.hasOwnProperty, s = e(function(o, u) {
    o = Object(o);
    var f = -1, c = u.length, l = c > 2 ? u[2] : void 0;
    for (l && r(u[0], u[1], l) && (c = 1); ++f < c; )
      for (var d = u[f], h = n(d), v = -1, p = h.length; ++v < p; ) {
        var g = h[v], _ = o[g];
        (_ === void 0 || t(_, i[g]) && !a.call(o, g)) && (o[g] = d[g]);
      }
    return o;
  });
  return xo = s, xo;
}
var wo, Jd;
function Ex() {
  if (Jd) return wo;
  Jd = 1;
  var e = Ke(), t = Ve(), r = at();
  function n(i) {
    return function(a, s, o) {
      var u = Object(a);
      if (!t(a)) {
        var f = e(s, 3);
        a = r(a), s = function(l) {
          return f(u[l], l, u);
        };
      }
      var c = i(a, s, o);
      return c > -1 ? u[f ? a[c] : c] : void 0;
    };
  }
  return wo = n, wo;
}
var Eo, Qd;
function Ax() {
  if (Qd) return Eo;
  Qd = 1;
  var e = /\s/;
  function t(r) {
    for (var n = r.length; n-- && e.test(r.charAt(n)); )
      ;
    return n;
  }
  return Eo = t, Eo;
}
var Ao, ep;
function qx() {
  if (ep) return Ao;
  ep = 1;
  var e = Ax(), t = /^\s+/;
  function r(n) {
    return n && n.slice(0, e(n) + 1).replace(t, "");
  }
  return Ao = r, Ao;
}
var qo, tp;
function $x() {
  if (tp) return qo;
  tp = 1;
  var e = qx(), t = me(), r = zt(), n = NaN, i = /^[-+]0x[0-9a-f]+$/i, a = /^0b[01]+$/i, s = /^0o[0-7]+$/i, o = parseInt;
  function u(f) {
    if (typeof f == "number")
      return f;
    if (r(f))
      return n;
    if (t(f)) {
      var c = typeof f.valueOf == "function" ? f.valueOf() : f;
      f = t(c) ? c + "" : c;
    }
    if (typeof f != "string")
      return f === 0 ? f : +f;
    f = e(f);
    var l = a.test(f);
    return l || s.test(f) ? o(f.slice(2), l ? 2 : 8) : i.test(f) ? n : +f;
  }
  return qo = u, qo;
}
var $o, rp;
function Ng() {
  if (rp) return $o;
  rp = 1;
  var e = $x(), t = 1 / 0, r = 17976931348623157e292;
  function n(i) {
    if (!i)
      return i === 0 ? i : 0;
    if (i = e(i), i === t || i === -t) {
      var a = i < 0 ? -1 : 1;
      return a * r;
    }
    return i === i ? i : 0;
  }
  return $o = n, $o;
}
var So, np;
function Sx() {
  if (np) return So;
  np = 1;
  var e = Ng();
  function t(r) {
    var n = e(r), i = n % 1;
    return n === n ? i ? n - i : n : 0;
  }
  return So = t, So;
}
var Co, ip;
function Cx() {
  if (ip) return Co;
  ip = 1;
  var e = Cg(), t = Ke(), r = Sx(), n = Math.max;
  function i(a, s, o) {
    var u = a == null ? 0 : a.length;
    if (!u)
      return -1;
    var f = o == null ? 0 : r(o);
    return f < 0 && (f = n(u + f, 0)), e(a, t(s, 3), f);
  }
  return Co = i, Co;
}
var Ro, ap;
function Rx() {
  if (ap) return Ro;
  ap = 1;
  var e = Ex(), t = Cx(), r = e(t);
  return Ro = r, Ro;
}
var To, sp;
function Lg() {
  if (sp) return To;
  sp = 1;
  var e = ac();
  function t(r) {
    var n = r == null ? 0 : r.length;
    return n ? e(r, 1) : [];
  }
  return To = t, To;
}
var ko, op;
function Tx() {
  if (op) return ko;
  op = 1;
  var e = tc(), t = og(), r = Et();
  function n(i, a) {
    return i == null ? i : e(i, t(a), r);
  }
  return ko = n, ko;
}
var Io, up;
function kx() {
  if (up) return Io;
  up = 1;
  function e(t) {
    var r = t == null ? 0 : t.length;
    return r ? t[r - 1] : void 0;
  }
  return Io = e, Io;
}
var Oo, cp;
function Ix() {
  if (cp) return Oo;
  cp = 1;
  var e = en(), t = rc(), r = Ke();
  function n(i, a) {
    var s = {};
    return a = r(a, 3), t(i, function(o, u, f) {
      e(s, u, a(o, u, f));
    }), s;
  }
  return Oo = n, Oo;
}
var Mo, fp;
function oc() {
  if (fp) return Mo;
  fp = 1;
  var e = zt();
  function t(r, n, i) {
    for (var a = -1, s = r.length; ++a < s; ) {
      var o = r[a], u = n(o);
      if (u != null && (f === void 0 ? u === u && !e(u) : i(u, f)))
        var f = u, c = o;
    }
    return c;
  }
  return Mo = t, Mo;
}
var Po, lp;
function Ox() {
  if (lp) return Po;
  lp = 1;
  function e(t, r) {
    return t > r;
  }
  return Po = e, Po;
}
var No, hp;
function Mx() {
  if (hp) return No;
  hp = 1;
  var e = oc(), t = Ox(), r = At();
  function n(i) {
    return i && i.length ? e(i, r, t) : void 0;
  }
  return No = n, No;
}
var Lo, dp;
function Fg() {
  if (dp) return Lo;
  dp = 1;
  var e = en(), t = Nt();
  function r(n, i, a) {
    (a !== void 0 && !t(n[i], a) || a === void 0 && !(i in n)) && e(n, i, a);
  }
  return Lo = r, Lo;
}
var Fo, pp;
function Px() {
  if (pp) return Fo;
  pp = 1;
  var e = xt(), t = sn(), r = Ne(), n = "[object Object]", i = Function.prototype, a = Object.prototype, s = i.toString, o = a.hasOwnProperty, u = s.call(Object);
  function f(c) {
    if (!r(c) || e(c) != n)
      return !1;
    var l = t(c);
    if (l === null)
      return !0;
    var d = o.call(l, "constructor") && l.constructor;
    return typeof d == "function" && d instanceof d && s.call(d) == u;
  }
  return Fo = f, Fo;
}
var Do, vp;
function Dg() {
  if (vp) return Do;
  vp = 1;
  function e(t, r) {
    if (!(r === "constructor" && typeof t[r] == "function") && r != "__proto__")
      return t[r];
  }
  return Do = e, Do;
}
var zo, gp;
function Nx() {
  if (gp) return zo;
  gp = 1;
  var e = dr(), t = Et();
  function r(n) {
    return e(n, t(n));
  }
  return zo = r, zo;
}
var jo, _p;
function Lx() {
  if (_p) return jo;
  _p = 1;
  var e = Fg(), t = Wv(), r = ng(), n = Yv(), i = ag(), a = pr(), s = ee(), o = Rg(), u = Ft(), f = hr(), c = me(), l = Px(), d = vr(), h = Dg(), v = Nx();
  function p(g, _, w, E, q, I, T) {
    var C = h(g, w), L = h(_, w), x = T.get(L);
    if (x) {
      e(g, w, x);
      return;
    }
    var O = I ? I(C, L, w + "", g, _, T) : void 0, m = O === void 0;
    if (m) {
      var R = s(L), k = !R && u(L), y = !R && !k && d(L);
      O = L, R || k || y ? s(C) ? O = C : o(C) ? O = n(C) : k ? (m = !1, O = t(L, !0)) : y ? (m = !1, O = r(L, !0)) : O = [] : l(L) || a(L) ? (O = C, a(C) ? O = v(C) : (!c(C) || f(C)) && (O = i(L))) : m = !1;
    }
    m && (T.set(L, O), q(O, L, E, I, T), T.delete(L)), e(g, w, O);
  }
  return jo = p, jo;
}
var Bo, yp;
function Fx() {
  if (yp) return Bo;
  yp = 1;
  var e = Qr(), t = Fg(), r = tc(), n = Lx(), i = me(), a = Et(), s = Dg();
  function o(u, f, c, l, d) {
    u !== f && r(f, function(h, v) {
      if (d || (d = new e()), i(h))
        n(u, f, v, c, o, l, d);
      else {
        var p = l ? l(s(u, v), h, v + "", u, f, d) : void 0;
        p === void 0 && (p = h), t(u, v, p);
      }
    }, a);
  }
  return Bo = o, Bo;
}
var Go, bp;
function Dx() {
  if (bp) return Go;
  bp = 1;
  var e = ln(), t = hn();
  function r(n) {
    return e(function(i, a) {
      var s = -1, o = a.length, u = o > 1 ? a[o - 1] : void 0, f = o > 2 ? a[2] : void 0;
      for (u = n.length > 3 && typeof u == "function" ? (o--, u) : void 0, f && t(a[0], a[1], f) && (u = o < 3 ? void 0 : u, o = 1), i = Object(i); ++s < o; ) {
        var c = a[s];
        c && n(i, c, s, u);
      }
      return i;
    });
  }
  return Go = r, Go;
}
var Uo, mp;
function zx() {
  if (mp) return Uo;
  mp = 1;
  var e = Fx(), t = Dx(), r = t(function(n, i, a) {
    e(n, i, a);
  });
  return Uo = r, Uo;
}
var Ho, xp;
function zg() {
  if (xp) return Ho;
  xp = 1;
  function e(t, r) {
    return t < r;
  }
  return Ho = e, Ho;
}
var Vo, wp;
function jx() {
  if (wp) return Vo;
  wp = 1;
  var e = oc(), t = zg(), r = At();
  function n(i) {
    return i && i.length ? e(i, r, t) : void 0;
  }
  return Vo = n, Vo;
}
var Ko, Ep;
function Bx() {
  if (Ep) return Ko;
  Ep = 1;
  var e = oc(), t = Ke(), r = zg();
  function n(i, a) {
    return i && i.length ? e(i, t(a, 2), r) : void 0;
  }
  return Ko = n, Ko;
}
var Wo, Ap;
function Gx() {
  if (Ap) return Wo;
  Ap = 1;
  var e = Se(), t = function() {
    return e.Date.now();
  };
  return Wo = t, Wo;
}
var Yo, qp;
function Ux() {
  if (qp) return Yo;
  qp = 1;
  var e = tn(), t = cn(), r = rn(), n = me(), i = gr();
  function a(s, o, u, f) {
    if (!n(s))
      return s;
    o = t(o, s);
    for (var c = -1, l = o.length, d = l - 1, h = s; h != null && ++c < l; ) {
      var v = i(o[c]), p = u;
      if (v === "__proto__" || v === "constructor" || v === "prototype")
        return s;
      if (c != d) {
        var g = h[v];
        p = f ? f(g, v, h) : void 0, p === void 0 && (p = n(g) ? g : r(o[c + 1]) ? [] : {});
      }
      e(h, v, p), h = h[v];
    }
    return s;
  }
  return Yo = a, Yo;
}
var Xo, $p;
function Hx() {
  if ($p) return Xo;
  $p = 1;
  var e = fn(), t = Ux(), r = cn();
  function n(i, a, s) {
    for (var o = -1, u = a.length, f = {}; ++o < u; ) {
      var c = a[o], l = e(i, c);
      s(l, c) && t(f, r(c, i), l);
    }
    return f;
  }
  return Xo = n, Xo;
}
var Zo, Sp;
function Vx() {
  if (Sp) return Zo;
  Sp = 1;
  var e = Hx(), t = yg();
  function r(n, i) {
    return e(n, i, function(a, s) {
      return t(n, s);
    });
  }
  return Zo = r, Zo;
}
var Jo, Cp;
function Kx() {
  if (Cp) return Jo;
  Cp = 1;
  var e = Lg(), t = $g(), r = Sg();
  function n(i) {
    return r(t(i, void 0, e), i + "");
  }
  return Jo = n, Jo;
}
var Qo, Rp;
function Wx() {
  if (Rp) return Qo;
  Rp = 1;
  var e = Vx(), t = Kx(), r = t(function(n, i) {
    return n == null ? {} : e(n, i);
  });
  return Qo = r, Qo;
}
var eu, Tp;
function Yx() {
  if (Tp) return eu;
  Tp = 1;
  var e = Math.ceil, t = Math.max;
  function r(n, i, a, s) {
    for (var o = -1, u = t(e((i - n) / (a || 1)), 0), f = Array(u); u--; )
      f[s ? u : ++o] = n, n += a;
    return f;
  }
  return eu = r, eu;
}
var tu, kp;
function Xx() {
  if (kp) return tu;
  kp = 1;
  var e = Yx(), t = hn(), r = Ng();
  function n(i) {
    return function(a, s, o) {
      return o && typeof o != "number" && t(a, s, o) && (s = o = void 0), a = r(a), s === void 0 ? (s = a, a = 0) : s = r(s), o = o === void 0 ? a < s ? 1 : -1 : r(o), e(a, s, o, i);
    };
  }
  return tu = n, tu;
}
var ru, Ip;
function Zx() {
  if (Ip) return ru;
  Ip = 1;
  var e = Xx(), t = e();
  return ru = t, ru;
}
var nu, Op;
function Jx() {
  if (Op) return nu;
  Op = 1;
  function e(t, r) {
    var n = t.length;
    for (t.sort(r); n--; )
      t[n] = t[n].value;
    return t;
  }
  return nu = e, nu;
}
var iu, Mp;
function Qx() {
  if (Mp) return iu;
  Mp = 1;
  var e = zt();
  function t(r, n) {
    if (r !== n) {
      var i = r !== void 0, a = r === null, s = r === r, o = e(r), u = n !== void 0, f = n === null, c = n === n, l = e(n);
      if (!f && !l && !o && r > n || o && u && c && !f && !l || a && u && c || !i && c || !s)
        return 1;
      if (!a && !o && !l && r < n || l && i && s && !a && !o || f && i && s || !u && s || !c)
        return -1;
    }
    return 0;
  }
  return iu = t, iu;
}
var au, Pp;
function ew() {
  if (Pp) return au;
  Pp = 1;
  var e = Qx();
  function t(r, n, i) {
    for (var a = -1, s = r.criteria, o = n.criteria, u = s.length, f = i.length; ++a < u; ) {
      var c = e(s[a], o[a]);
      if (c) {
        if (a >= f)
          return c;
        var l = i[a];
        return c * (l == "desc" ? -1 : 1);
      }
    }
    return r.index - n.index;
  }
  return au = t, au;
}
var su, Np;
function tw() {
  if (Np) return su;
  Np = 1;
  var e = un(), t = fn(), r = Ke(), n = Eg(), i = Jx(), a = nn(), s = ew(), o = At(), u = ee();
  function f(c, l, d) {
    l.length ? l = e(l, function(p) {
      return u(p) ? function(g) {
        return t(g, p.length === 1 ? p[0] : p);
      } : p;
    }) : l = [o];
    var h = -1;
    l = e(l, a(r));
    var v = n(c, function(p, g, _) {
      var w = e(l, function(E) {
        return E(p);
      });
      return { criteria: w, index: ++h, value: p };
    });
    return i(v, function(p, g) {
      return s(p, g, d);
    });
  }
  return su = f, su;
}
var ou, Lp;
function rw() {
  if (Lp) return ou;
  Lp = 1;
  var e = ac(), t = tw(), r = ln(), n = hn(), i = r(function(a, s) {
    if (a == null)
      return [];
    var o = s.length;
    return o > 1 && n(a, s[0], s[1]) ? s = [] : o > 2 && n(s[0], s[1], s[2]) && (s = [s[0]]), t(a, e(s, 1), []);
  });
  return ou = i, ou;
}
var uu, Fp;
function nw() {
  if (Fp) return uu;
  Fp = 1;
  var e = gg(), t = 0;
  function r(n) {
    var i = ++t;
    return e(n) + i;
  }
  return uu = r, uu;
}
var cu, Dp;
function iw() {
  if (Dp) return cu;
  Dp = 1;
  function e(t, r, n) {
    for (var i = -1, a = t.length, s = r.length, o = {}; ++i < a; ) {
      var u = i < s ? r[i] : void 0;
      n(o, t[i], u);
    }
    return o;
  }
  return cu = e, cu;
}
var fu, zp;
function aw() {
  if (zp) return fu;
  zp = 1;
  var e = tn(), t = iw();
  function r(n, i) {
    return t(n || [], i || [], e);
  }
  return fu = r, fu;
}
var jr;
if (typeof Uu == "function")
  try {
    jr = {
      cloneDeep: xx(),
      constant: ec(),
      defaults: wx(),
      each: cg(),
      filter: mg(),
      find: Rx(),
      flatten: Lg(),
      forEach: ug(),
      forIn: Tx(),
      has: xg(),
      isUndefined: wg(),
      last: kx(),
      map: Ag(),
      mapValues: Ix(),
      max: Mx(),
      merge: zx(),
      min: jx(),
      minBy: Bx(),
      now: Gx(),
      pick: Wx(),
      range: Zx(),
      reduce: qg(),
      sortBy: rw(),
      uniqueId: nw(),
      values: Tg(),
      zipObject: aw()
    };
  } catch {
  }
jr || (jr = window._);
var Q = jr, sw = dn;
function dn() {
  var e = {};
  e._next = e._prev = e, this._sentinel = e;
}
dn.prototype.dequeue = function() {
  var e = this._sentinel, t = e._prev;
  if (t !== e)
    return jg(t), t;
};
dn.prototype.enqueue = function(e) {
  var t = this._sentinel;
  e._prev && e._next && jg(e), e._next = t._next, t._next._prev = e, t._next = e, e._prev = t;
};
dn.prototype.toString = function() {
  for (var e = [], t = this._sentinel, r = t._prev; r !== t; )
    e.push(JSON.stringify(r, ow)), r = r._prev;
  return "[" + e.join(", ") + "]";
};
function jg(e) {
  e._prev._next = e._next, e._next._prev = e._prev, delete e._next, delete e._prev;
}
function ow(e, t) {
  if (e !== "_next" && e !== "_prev")
    return t;
}
var Be = Q, uw = Ce.Graph, cw = sw, fw = hw, lw = Be.constant(1);
function hw(e, t) {
  if (e.nodeCount() <= 1)
    return [];
  var r = pw(e, t || lw), n = dw(r.graph, r.buckets, r.zeroIdx);
  return Be.flatten(Be.map(n, function(i) {
    return e.outEdges(i.v, i.w);
  }), !0);
}
function dw(e, t, r) {
  for (var n = [], i = t[t.length - 1], a = t[0], s; e.nodeCount(); ) {
    for (; s = a.dequeue(); )
      lu(e, t, r, s);
    for (; s = i.dequeue(); )
      lu(e, t, r, s);
    if (e.nodeCount()) {
      for (var o = t.length - 2; o > 0; --o)
        if (s = t[o].dequeue(), s) {
          n = n.concat(lu(e, t, r, s, !0));
          break;
        }
    }
  }
  return n;
}
function lu(e, t, r, n, i) {
  var a = i ? [] : void 0;
  return Be.forEach(e.inEdges(n.v), function(s) {
    var o = e.edge(s), u = e.node(s.v);
    i && a.push({ v: s.v, w: s.w }), u.out -= o, Ru(t, r, u);
  }), Be.forEach(e.outEdges(n.v), function(s) {
    var o = e.edge(s), u = s.w, f = e.node(u);
    f.in -= o, Ru(t, r, f);
  }), e.removeNode(n.v), a;
}
function pw(e, t) {
  var r = new uw(), n = 0, i = 0;
  Be.forEach(e.nodes(), function(o) {
    r.setNode(o, { v: o, in: 0, out: 0 });
  }), Be.forEach(e.edges(), function(o) {
    var u = r.edge(o.v, o.w) || 0, f = t(o), c = u + f;
    r.setEdge(o.v, o.w, c), i = Math.max(i, r.node(o.v).out += f), n = Math.max(n, r.node(o.w).in += f);
  });
  var a = Be.range(i + n + 3).map(function() {
    return new cw();
  }), s = n + 1;
  return Be.forEach(r.nodes(), function(o) {
    Ru(a, s, r.node(o));
  }), { graph: r, buckets: a, zeroIdx: s };
}
function Ru(e, t, r) {
  r.out ? r.in ? e[r.out - r.in + t].enqueue(r) : e[e.length - 1].enqueue(r) : e[0].enqueue(r);
}
var vt = Q, vw = fw, gw = {
  run: _w,
  undo: bw
};
function _w(e) {
  var t = e.graph().acyclicer === "greedy" ? vw(e, r(e)) : yw(e);
  vt.forEach(t, function(n) {
    var i = e.edge(n);
    e.removeEdge(n), i.forwardName = n.name, i.reversed = !0, e.setEdge(n.w, n.v, i, vt.uniqueId("rev"));
  });
  function r(n) {
    return function(i) {
      return n.edge(i).weight;
    };
  }
}
function yw(e) {
  var t = [], r = {}, n = {};
  function i(a) {
    vt.has(n, a) || (n[a] = !0, r[a] = !0, vt.forEach(e.outEdges(a), function(s) {
      vt.has(r, s.w) ? t.push(s) : i(s.w);
    }), delete r[a]);
  }
  return vt.forEach(e.nodes(), i), t;
}
function bw(e) {
  vt.forEach(e.edges(), function(t) {
    var r = e.edge(t);
    if (r.reversed) {
      e.removeEdge(t);
      var n = r.forwardName;
      delete r.reversed, delete r.forwardName, e.setEdge(t.w, t.v, r, n);
    }
  });
}
var K = Q, Bg = Ce.Graph, he = {
  addDummyNode: Gg,
  simplify: mw,
  asNonCompoundGraph: xw,
  successorWeights: ww,
  predecessorWeights: Ew,
  intersectRect: Aw,
  buildLayerMatrix: qw,
  normalizeRanks: $w,
  removeEmptyRanks: Sw,
  addBorderNode: Cw,
  maxRank: Ug,
  partition: Rw,
  time: Tw,
  notime: kw
};
function Gg(e, t, r, n) {
  var i;
  do
    i = K.uniqueId(n);
  while (e.hasNode(i));
  return r.dummy = t, e.setNode(i, r), i;
}
function mw(e) {
  var t = new Bg().setGraph(e.graph());
  return K.forEach(e.nodes(), function(r) {
    t.setNode(r, e.node(r));
  }), K.forEach(e.edges(), function(r) {
    var n = t.edge(r.v, r.w) || { weight: 0, minlen: 1 }, i = e.edge(r);
    t.setEdge(r.v, r.w, {
      weight: n.weight + i.weight,
      minlen: Math.max(n.minlen, i.minlen)
    });
  }), t;
}
function xw(e) {
  var t = new Bg({ multigraph: e.isMultigraph() }).setGraph(e.graph());
  return K.forEach(e.nodes(), function(r) {
    e.children(r).length || t.setNode(r, e.node(r));
  }), K.forEach(e.edges(), function(r) {
    t.setEdge(r, e.edge(r));
  }), t;
}
function ww(e) {
  var t = K.map(e.nodes(), function(r) {
    var n = {};
    return K.forEach(e.outEdges(r), function(i) {
      n[i.w] = (n[i.w] || 0) + e.edge(i).weight;
    }), n;
  });
  return K.zipObject(e.nodes(), t);
}
function Ew(e) {
  var t = K.map(e.nodes(), function(r) {
    var n = {};
    return K.forEach(e.inEdges(r), function(i) {
      n[i.v] = (n[i.v] || 0) + e.edge(i).weight;
    }), n;
  });
  return K.zipObject(e.nodes(), t);
}
function Aw(e, t) {
  var r = e.x, n = e.y, i = t.x - r, a = t.y - n, s = e.width / 2, o = e.height / 2;
  if (!i && !a)
    throw new Error("Not possible to find intersection inside of the rectangle");
  var u, f;
  return Math.abs(a) * s > Math.abs(i) * o ? (a < 0 && (o = -o), u = o * i / a, f = o) : (i < 0 && (s = -s), u = s, f = s * a / i), { x: r + u, y: n + f };
}
function qw(e) {
  var t = K.map(K.range(Ug(e) + 1), function() {
    return [];
  });
  return K.forEach(e.nodes(), function(r) {
    var n = e.node(r), i = n.rank;
    K.isUndefined(i) || (t[i][n.order] = r);
  }), t;
}
function $w(e) {
  var t = K.min(K.map(e.nodes(), function(r) {
    return e.node(r).rank;
  }));
  K.forEach(e.nodes(), function(r) {
    var n = e.node(r);
    K.has(n, "rank") && (n.rank -= t);
  });
}
function Sw(e) {
  var t = K.min(K.map(e.nodes(), function(a) {
    return e.node(a).rank;
  })), r = [];
  K.forEach(e.nodes(), function(a) {
    var s = e.node(a).rank - t;
    r[s] || (r[s] = []), r[s].push(a);
  });
  var n = 0, i = e.graph().nodeRankFactor;
  K.forEach(r, function(a, s) {
    K.isUndefined(a) && s % i !== 0 ? --n : n && K.forEach(a, function(o) {
      e.node(o).rank += n;
    });
  });
}
function Cw(e, t, r, n) {
  var i = {
    width: 0,
    height: 0
  };
  return arguments.length >= 4 && (i.rank = r, i.order = n), Gg(e, "border", i, t);
}
function Ug(e) {
  return K.max(K.map(e.nodes(), function(t) {
    var r = e.node(t).rank;
    if (!K.isUndefined(r))
      return r;
  }));
}
function Rw(e, t) {
  var r = { lhs: [], rhs: [] };
  return K.forEach(e, function(n) {
    t(n) ? r.lhs.push(n) : r.rhs.push(n);
  }), r;
}
function Tw(e, t) {
  var r = K.now();
  try {
    return t();
  } finally {
    console.log(e + " time: " + (K.now() - r) + "ms");
  }
}
function kw(e, t) {
  return t();
}
var Hg = Q, Iw = he, Ow = {
  run: Mw,
  undo: Nw
};
function Mw(e) {
  e.graph().dummyChains = [], Hg.forEach(e.edges(), function(t) {
    Pw(e, t);
  });
}
function Pw(e, t) {
  var r = t.v, n = e.node(r).rank, i = t.w, a = e.node(i).rank, s = t.name, o = e.edge(t), u = o.labelRank;
  if (a !== n + 1) {
    e.removeEdge(t);
    var f, c, l;
    for (l = 0, ++n; n < a; ++l, ++n)
      o.points = [], c = {
        width: 0,
        height: 0,
        edgeLabel: o,
        edgeObj: t,
        rank: n
      }, f = Iw.addDummyNode(e, "edge", c, "_d"), n === u && (c.width = o.width, c.height = o.height, c.dummy = "edge-label", c.labelpos = o.labelpos), e.setEdge(r, f, { weight: o.weight }, s), l === 0 && e.graph().dummyChains.push(f), r = f;
    e.setEdge(r, i, { weight: o.weight }, s);
  }
}
function Nw(e) {
  Hg.forEach(e.graph().dummyChains, function(t) {
    var r = e.node(t), n = r.edgeLabel, i;
    for (e.setEdge(r.edgeObj, n); r.dummy; )
      i = e.successors(t)[0], e.removeNode(t), n.points.push({ x: r.x, y: r.y }), r.dummy === "edge-label" && (n.x = r.x, n.y = r.y, n.width = r.width, n.height = r.height), t = i, r = e.node(t);
  });
}
var Ar = Q, pn = {
  longestPath: Lw,
  slack: Fw
};
function Lw(e) {
  var t = {};
  function r(n) {
    var i = e.node(n);
    if (Ar.has(t, n))
      return i.rank;
    t[n] = !0;
    var a = Ar.min(Ar.map(e.outEdges(n), function(s) {
      return r(s.w) - e.edge(s).minlen;
    }));
    return (a === Number.POSITIVE_INFINITY || // return value of _.map([]) for Lodash 3
    a === void 0 || // return value of _.map([]) for Lodash 4
    a === null) && (a = 0), i.rank = a;
  }
  Ar.forEach(e.sources(), r);
}
function Fw(e, t) {
  return e.node(t.w).rank - e.node(t.v).rank - e.edge(t).minlen;
}
var Br = Q, Dw = Ce.Graph, Gr = pn.slack, Vg = zw;
function zw(e) {
  var t = new Dw({ directed: !1 }), r = e.nodes()[0], n = e.nodeCount();
  t.setNode(r, {});
  for (var i, a; jw(t, e) < n; )
    i = Bw(t, e), a = t.hasNode(i.v) ? Gr(e, i) : -Gr(e, i), Gw(t, e, a);
  return t;
}
function jw(e, t) {
  function r(n) {
    Br.forEach(t.nodeEdges(n), function(i) {
      var a = i.v, s = n === a ? i.w : a;
      !e.hasNode(s) && !Gr(t, i) && (e.setNode(s, {}), e.setEdge(n, s, {}), r(s));
    });
  }
  return Br.forEach(e.nodes(), r), e.nodeCount();
}
function Bw(e, t) {
  return Br.minBy(t.edges(), function(r) {
    if (e.hasNode(r.v) !== e.hasNode(r.w))
      return Gr(t, r);
  });
}
function Gw(e, t, r) {
  Br.forEach(e.nodes(), function(n) {
    t.node(n).rank += r;
  });
}
var He = Q, Uw = Vg, Hw = pn.slack, Vw = pn.longestPath, Kw = Ce.alg.preorder, Ww = Ce.alg.postorder, Yw = he.simplify, Xw = qt;
qt.initLowLimValues = cc;
qt.initCutValues = uc;
qt.calcCutValue = Kg;
qt.leaveEdge = Yg;
qt.enterEdge = Xg;
qt.exchangeEdges = Zg;
function qt(e) {
  e = Yw(e), Vw(e);
  var t = Uw(e);
  cc(t), uc(t, e);
  for (var r, n; r = Yg(t); )
    n = Xg(t, e, r), Zg(t, e, r, n);
}
function uc(e, t) {
  var r = Ww(e, e.nodes());
  r = r.slice(0, r.length - 1), He.forEach(r, function(n) {
    Zw(e, t, n);
  });
}
function Zw(e, t, r) {
  var n = e.node(r), i = n.parent;
  e.edge(r, i).cutvalue = Kg(e, t, r);
}
function Kg(e, t, r) {
  var n = e.node(r), i = n.parent, a = !0, s = t.edge(r, i), o = 0;
  return s || (a = !1, s = t.edge(i, r)), o = s.weight, He.forEach(t.nodeEdges(r), function(u) {
    var f = u.v === r, c = f ? u.w : u.v;
    if (c !== i) {
      var l = f === a, d = t.edge(u).weight;
      if (o += l ? d : -d, Qw(e, r, c)) {
        var h = e.edge(r, c).cutvalue;
        o += l ? -h : h;
      }
    }
  }), o;
}
function cc(e, t) {
  arguments.length < 2 && (t = e.nodes()[0]), Wg(e, {}, 1, t);
}
function Wg(e, t, r, n, i) {
  var a = r, s = e.node(n);
  return t[n] = !0, He.forEach(e.neighbors(n), function(o) {
    He.has(t, o) || (r = Wg(e, t, r, o, n));
  }), s.low = a, s.lim = r++, i ? s.parent = i : delete s.parent, r;
}
function Yg(e) {
  return He.find(e.edges(), function(t) {
    return e.edge(t).cutvalue < 0;
  });
}
function Xg(e, t, r) {
  var n = r.v, i = r.w;
  t.hasEdge(n, i) || (n = r.w, i = r.v);
  var a = e.node(n), s = e.node(i), o = a, u = !1;
  a.lim > s.lim && (o = s, u = !0);
  var f = He.filter(t.edges(), function(c) {
    return u === jp(e, e.node(c.v), o) && u !== jp(e, e.node(c.w), o);
  });
  return He.minBy(f, function(c) {
    return Hw(t, c);
  });
}
function Zg(e, t, r, n) {
  var i = r.v, a = r.w;
  e.removeEdge(i, a), e.setEdge(n.v, n.w, {}), cc(e), uc(e, t), Jw(e, t);
}
function Jw(e, t) {
  var r = He.find(e.nodes(), function(i) {
    return !t.node(i).parent;
  }), n = Kw(e, r);
  n = n.slice(1), He.forEach(n, function(i) {
    var a = e.node(i).parent, s = t.edge(i, a), o = !1;
    s || (s = t.edge(a, i), o = !0), t.node(i).rank = t.node(a).rank + (o ? s.minlen : -s.minlen);
  });
}
function Qw(e, t, r) {
  return e.hasEdge(t, r);
}
function jp(e, t, r) {
  return r.low <= t.lim && t.lim <= r.lim;
}
var eE = pn, Jg = eE.longestPath, tE = Vg, rE = Xw, nE = iE;
function iE(e) {
  switch (e.graph().ranker) {
    case "network-simplex":
      Bp(e);
      break;
    case "tight-tree":
      sE(e);
      break;
    case "longest-path":
      aE(e);
      break;
    default:
      Bp(e);
  }
}
var aE = Jg;
function sE(e) {
  Jg(e), tE(e);
}
function Bp(e) {
  rE(e);
}
var Tu = Q, oE = uE;
function uE(e) {
  var t = fE(e);
  Tu.forEach(e.graph().dummyChains, function(r) {
    for (var n = e.node(r), i = n.edgeObj, a = cE(e, t, i.v, i.w), s = a.path, o = a.lca, u = 0, f = s[u], c = !0; r !== i.w; ) {
      if (n = e.node(r), c) {
        for (; (f = s[u]) !== o && e.node(f).maxRank < n.rank; )
          u++;
        f === o && (c = !1);
      }
      if (!c) {
        for (; u < s.length - 1 && e.node(f = s[u + 1]).minRank <= n.rank; )
          u++;
        f = s[u];
      }
      e.setParent(r, f), r = e.successors(r)[0];
    }
  });
}
function cE(e, t, r, n) {
  var i = [], a = [], s = Math.min(t[r].low, t[n].low), o = Math.max(t[r].lim, t[n].lim), u, f;
  u = r;
  do
    u = e.parent(u), i.push(u);
  while (u && (t[u].low > s || o > t[u].lim));
  for (f = u, u = n; (u = e.parent(u)) !== f; )
    a.push(u);
  return { path: i.concat(a.reverse()), lca: f };
}
function fE(e) {
  var t = {}, r = 0;
  function n(i) {
    var a = r;
    Tu.forEach(e.children(i), n), t[i] = { low: a, lim: r++ };
  }
  return Tu.forEach(e.children(), n), t;
}
var Ge = Q, ku = he, lE = {
  run: hE,
  cleanup: vE
};
function hE(e) {
  var t = ku.addDummyNode(e, "root", {}, "_root"), r = dE(e), n = Ge.max(Ge.values(r)) - 1, i = 2 * n + 1;
  e.graph().nestingRoot = t, Ge.forEach(e.edges(), function(s) {
    e.edge(s).minlen *= i;
  });
  var a = pE(e) + 1;
  Ge.forEach(e.children(), function(s) {
    Qg(e, t, i, a, n, r, s);
  }), e.graph().nodeRankFactor = i;
}
function Qg(e, t, r, n, i, a, s) {
  var o = e.children(s);
  if (!o.length) {
    s !== t && e.setEdge(t, s, { weight: 0, minlen: r });
    return;
  }
  var u = ku.addBorderNode(e, "_bt"), f = ku.addBorderNode(e, "_bb"), c = e.node(s);
  e.setParent(u, s), c.borderTop = u, e.setParent(f, s), c.borderBottom = f, Ge.forEach(o, function(l) {
    Qg(e, t, r, n, i, a, l);
    var d = e.node(l), h = d.borderTop ? d.borderTop : l, v = d.borderBottom ? d.borderBottom : l, p = d.borderTop ? n : 2 * n, g = h !== v ? 1 : i - a[s] + 1;
    e.setEdge(u, h, {
      weight: p,
      minlen: g,
      nestingEdge: !0
    }), e.setEdge(v, f, {
      weight: p,
      minlen: g,
      nestingEdge: !0
    });
  }), e.parent(s) || e.setEdge(t, u, { weight: 0, minlen: i + a[s] });
}
function dE(e) {
  var t = {};
  function r(n, i) {
    var a = e.children(n);
    a && a.length && Ge.forEach(a, function(s) {
      r(s, i + 1);
    }), t[n] = i;
  }
  return Ge.forEach(e.children(), function(n) {
    r(n, 1);
  }), t;
}
function pE(e) {
  return Ge.reduce(e.edges(), function(t, r) {
    return t + e.edge(r).weight;
  }, 0);
}
function vE(e) {
  var t = e.graph();
  e.removeNode(t.nestingRoot), delete t.nestingRoot, Ge.forEach(e.edges(), function(r) {
    var n = e.edge(r);
    n.nestingEdge && e.removeEdge(r);
  });
}
var hu = Q, gE = he, _E = yE;
function yE(e) {
  function t(r) {
    var n = e.children(r), i = e.node(r);
    if (n.length && hu.forEach(n, t), hu.has(i, "minRank")) {
      i.borderLeft = [], i.borderRight = [];
      for (var a = i.minRank, s = i.maxRank + 1; a < s; ++a)
        Gp(e, "borderLeft", "_bl", r, i, a), Gp(e, "borderRight", "_br", r, i, a);
    }
  }
  hu.forEach(e.children(), t);
}
function Gp(e, t, r, n, i, a) {
  var s = { width: 0, height: 0, rank: a, borderType: t }, o = i[t][a - 1], u = gE.addDummyNode(e, "border", s, r);
  i[t][a] = u, e.setParent(u, n), o && e.setEdge(o, u, { weight: 1 });
}
var Oe = Q, bE = {
  adjust: mE,
  undo: xE
};
function mE(e) {
  var t = e.graph().rankdir.toLowerCase();
  (t === "lr" || t === "rl") && e_(e);
}
function xE(e) {
  var t = e.graph().rankdir.toLowerCase();
  (t === "bt" || t === "rl") && wE(e), (t === "lr" || t === "rl") && (EE(e), e_(e));
}
function e_(e) {
  Oe.forEach(e.nodes(), function(t) {
    Up(e.node(t));
  }), Oe.forEach(e.edges(), function(t) {
    Up(e.edge(t));
  });
}
function Up(e) {
  var t = e.width;
  e.width = e.height, e.height = t;
}
function wE(e) {
  Oe.forEach(e.nodes(), function(t) {
    du(e.node(t));
  }), Oe.forEach(e.edges(), function(t) {
    var r = e.edge(t);
    Oe.forEach(r.points, du), Oe.has(r, "y") && du(r);
  });
}
function du(e) {
  e.y = -e.y;
}
function EE(e) {
  Oe.forEach(e.nodes(), function(t) {
    pu(e.node(t));
  }), Oe.forEach(e.edges(), function(t) {
    var r = e.edge(t);
    Oe.forEach(r.points, pu), Oe.has(r, "x") && pu(r);
  });
}
function pu(e) {
  var t = e.x;
  e.x = e.y, e.y = t;
}
var De = Q, AE = qE;
function qE(e) {
  var t = {}, r = De.filter(e.nodes(), function(o) {
    return !e.children(o).length;
  }), n = De.max(De.map(r, function(o) {
    return e.node(o).rank;
  })), i = De.map(De.range(n + 1), function() {
    return [];
  });
  function a(o) {
    if (!De.has(t, o)) {
      t[o] = !0;
      var u = e.node(o);
      i[u.rank].push(o), De.forEach(e.successors(o), a);
    }
  }
  var s = De.sortBy(r, function(o) {
    return e.node(o).rank;
  });
  return De.forEach(s, a), i;
}
var Je = Q, $E = SE;
function SE(e, t) {
  for (var r = 0, n = 1; n < t.length; ++n)
    r += CE(e, t[n - 1], t[n]);
  return r;
}
function CE(e, t, r) {
  for (var n = Je.zipObject(
    r,
    Je.map(r, function(f, c) {
      return c;
    })
  ), i = Je.flatten(Je.map(t, function(f) {
    return Je.sortBy(Je.map(e.outEdges(f), function(c) {
      return { pos: n[c.w], weight: e.edge(c).weight };
    }), "pos");
  }), !0), a = 1; a < r.length; ) a <<= 1;
  var s = 2 * a - 1;
  a -= 1;
  var o = Je.map(new Array(s), function() {
    return 0;
  }), u = 0;
  return Je.forEach(i.forEach(function(f) {
    var c = f.pos + a;
    o[c] += f.weight;
    for (var l = 0; c > 0; )
      c % 2 && (l += o[c + 1]), c = c - 1 >> 1, o[c] += f.weight;
    u += f.weight * l;
  })), u;
}
var Hp = Q, RE = TE;
function TE(e, t) {
  return Hp.map(t, function(r) {
    var n = e.inEdges(r);
    if (n.length) {
      var i = Hp.reduce(n, function(a, s) {
        var o = e.edge(s), u = e.node(s.v);
        return {
          sum: a.sum + o.weight * u.order,
          weight: a.weight + o.weight
        };
      }, { sum: 0, weight: 0 });
      return {
        v: r,
        barycenter: i.sum / i.weight,
        weight: i.weight
      };
    } else
      return { v: r };
  });
}
var ve = Q, kE = IE;
function IE(e, t) {
  var r = {};
  ve.forEach(e, function(i, a) {
    var s = r[i.v] = {
      indegree: 0,
      in: [],
      out: [],
      vs: [i.v],
      i: a
    };
    ve.isUndefined(i.barycenter) || (s.barycenter = i.barycenter, s.weight = i.weight);
  }), ve.forEach(t.edges(), function(i) {
    var a = r[i.v], s = r[i.w];
    !ve.isUndefined(a) && !ve.isUndefined(s) && (s.indegree++, a.out.push(r[i.w]));
  });
  var n = ve.filter(r, function(i) {
    return !i.indegree;
  });
  return OE(n);
}
function OE(e) {
  var t = [];
  function r(a) {
    return function(s) {
      s.merged || (ve.isUndefined(s.barycenter) || ve.isUndefined(a.barycenter) || s.barycenter >= a.barycenter) && ME(a, s);
    };
  }
  function n(a) {
    return function(s) {
      s.in.push(a), --s.indegree === 0 && e.push(s);
    };
  }
  for (; e.length; ) {
    var i = e.pop();
    t.push(i), ve.forEach(i.in.reverse(), r(i)), ve.forEach(i.out, n(i));
  }
  return ve.map(
    ve.filter(t, function(a) {
      return !a.merged;
    }),
    function(a) {
      return ve.pick(a, ["vs", "i", "barycenter", "weight"]);
    }
  );
}
function ME(e, t) {
  var r = 0, n = 0;
  e.weight && (r += e.barycenter * e.weight, n += e.weight), t.weight && (r += t.barycenter * t.weight, n += t.weight), e.vs = t.vs.concat(e.vs), e.barycenter = r / n, e.weight = n, e.i = Math.min(t.i, e.i), t.merged = !0;
}
var Xt = Q, PE = he, NE = LE;
function LE(e, t) {
  var r = PE.partition(e, function(c) {
    return Xt.has(c, "barycenter");
  }), n = r.lhs, i = Xt.sortBy(r.rhs, function(c) {
    return -c.i;
  }), a = [], s = 0, o = 0, u = 0;
  n.sort(FE(!!t)), u = Vp(a, i, u), Xt.forEach(n, function(c) {
    u += c.vs.length, a.push(c.vs), s += c.barycenter * c.weight, o += c.weight, u = Vp(a, i, u);
  });
  var f = { vs: Xt.flatten(a, !0) };
  return o && (f.barycenter = s / o, f.weight = o), f;
}
function Vp(e, t, r) {
  for (var n; t.length && (n = Xt.last(t)).i <= r; )
    t.pop(), e.push(n.vs), r++;
  return r;
}
function FE(e) {
  return function(t, r) {
    return t.barycenter < r.barycenter ? -1 : t.barycenter > r.barycenter ? 1 : e ? r.i - t.i : t.i - r.i;
  };
}
var tt = Q, DE = RE, zE = kE, jE = NE, BE = t_;
function t_(e, t, r, n) {
  var i = e.children(t), a = e.node(t), s = a ? a.borderLeft : void 0, o = a ? a.borderRight : void 0, u = {};
  s && (i = tt.filter(i, function(v) {
    return v !== s && v !== o;
  }));
  var f = DE(e, i);
  tt.forEach(f, function(v) {
    if (e.children(v.v).length) {
      var p = t_(e, v.v, r, n);
      u[v.v] = p, tt.has(p, "barycenter") && UE(v, p);
    }
  });
  var c = zE(f, r);
  GE(c, u);
  var l = jE(c, n);
  if (s && (l.vs = tt.flatten([s, l.vs, o], !0), e.predecessors(s).length)) {
    var d = e.node(e.predecessors(s)[0]), h = e.node(e.predecessors(o)[0]);
    tt.has(l, "barycenter") || (l.barycenter = 0, l.weight = 0), l.barycenter = (l.barycenter * l.weight + d.order + h.order) / (l.weight + 2), l.weight += 2;
  }
  return l;
}
function GE(e, t) {
  tt.forEach(e, function(r) {
    r.vs = tt.flatten(r.vs.map(function(n) {
      return t[n] ? t[n].vs : n;
    }), !0);
  });
}
function UE(e, t) {
  tt.isUndefined(e.barycenter) ? (e.barycenter = t.barycenter, e.weight = t.weight) : (e.barycenter = (e.barycenter * e.weight + t.barycenter * t.weight) / (e.weight + t.weight), e.weight += t.weight);
}
var Zt = Q, HE = Ce.Graph, VE = KE;
function KE(e, t, r) {
  var n = WE(e), i = new HE({ compound: !0 }).setGraph({ root: n }).setDefaultNodeLabel(function(a) {
    return e.node(a);
  });
  return Zt.forEach(e.nodes(), function(a) {
    var s = e.node(a), o = e.parent(a);
    (s.rank === t || s.minRank <= t && t <= s.maxRank) && (i.setNode(a), i.setParent(a, o || n), Zt.forEach(e[r](a), function(u) {
      var f = u.v === a ? u.w : u.v, c = i.edge(f, a), l = Zt.isUndefined(c) ? 0 : c.weight;
      i.setEdge(f, a, { weight: e.edge(u).weight + l });
    }), Zt.has(s, "minRank") && i.setNode(a, {
      borderLeft: s.borderLeft[t],
      borderRight: s.borderRight[t]
    }));
  }), i;
}
function WE(e) {
  for (var t; e.hasNode(t = Zt.uniqueId("_root")); ) ;
  return t;
}
var YE = Q, XE = ZE;
function ZE(e, t, r) {
  var n = {}, i;
  YE.forEach(r, function(a) {
    for (var s = e.parent(a), o, u; s; ) {
      if (o = e.parent(s), o ? (u = n[o], n[o] = s) : (u = i, i = s), u && u !== s) {
        t.setEdge(u, s);
        return;
      }
      s = o;
    }
  });
}
var nt = Q, JE = AE, QE = $E, eA = BE, tA = VE, rA = XE, nA = Ce.Graph, Kp = he, iA = aA;
function aA(e) {
  var t = Kp.maxRank(e), r = Wp(e, nt.range(1, t + 1), "inEdges"), n = Wp(e, nt.range(t - 1, -1, -1), "outEdges"), i = JE(e);
  Yp(e, i);
  for (var a = Number.POSITIVE_INFINITY, s, o = 0, u = 0; u < 4; ++o, ++u) {
    sA(o % 2 ? r : n, o % 4 >= 2), i = Kp.buildLayerMatrix(e);
    var f = QE(e, i);
    f < a && (u = 0, s = nt.cloneDeep(i), a = f);
  }
  Yp(e, s);
}
function Wp(e, t, r) {
  return nt.map(t, function(n) {
    return tA(e, n, r);
  });
}
function sA(e, t) {
  var r = new nA();
  nt.forEach(e, function(n) {
    var i = n.graph().root, a = eA(n, i, r, t);
    nt.forEach(a.vs, function(s, o) {
      n.node(s).order = o;
    }), rA(n, r, a.vs);
  });
}
function Yp(e, t) {
  nt.forEach(t, function(r) {
    nt.forEach(r, function(n, i) {
      e.node(n).order = i;
    });
  });
}
var F = Q, oA = Ce.Graph, uA = he, cA = {
  positionX: mA
};
function fA(e, t) {
  var r = {};
  function n(i, a) {
    var s = 0, o = 0, u = i.length, f = F.last(a);
    return F.forEach(a, function(c, l) {
      var d = hA(e, c), h = d ? e.node(d).order : u;
      (d || c === f) && (F.forEach(a.slice(o, l + 1), function(v) {
        F.forEach(e.predecessors(v), function(p) {
          var g = e.node(p), _ = g.order;
          (_ < s || h < _) && !(g.dummy && e.node(v).dummy) && r_(r, p, v);
        });
      }), o = l + 1, s = h);
    }), a;
  }
  return F.reduce(t, n), r;
}
function lA(e, t) {
  var r = {};
  function n(a, s, o, u, f) {
    var c;
    F.forEach(F.range(s, o), function(l) {
      c = a[l], e.node(c).dummy && F.forEach(e.predecessors(c), function(d) {
        var h = e.node(d);
        h.dummy && (h.order < u || h.order > f) && r_(r, d, c);
      });
    });
  }
  function i(a, s) {
    var o = -1, u, f = 0;
    return F.forEach(s, function(c, l) {
      if (e.node(c).dummy === "border") {
        var d = e.predecessors(c);
        d.length && (u = e.node(d[0]).order, n(s, f, l, o, u), f = l, o = u);
      }
      n(s, f, s.length, u, a.length);
    }), s;
  }
  return F.reduce(t, i), r;
}
function hA(e, t) {
  if (e.node(t).dummy)
    return F.find(e.predecessors(t), function(r) {
      return e.node(r).dummy;
    });
}
function r_(e, t, r) {
  if (t > r) {
    var n = t;
    t = r, r = n;
  }
  var i = e[t];
  i || (e[t] = i = {}), i[r] = !0;
}
function dA(e, t, r) {
  if (t > r) {
    var n = t;
    t = r, r = n;
  }
  return F.has(e[t], r);
}
function pA(e, t, r, n) {
  var i = {}, a = {}, s = {};
  return F.forEach(t, function(o) {
    F.forEach(o, function(u, f) {
      i[u] = u, a[u] = u, s[u] = f;
    });
  }), F.forEach(t, function(o) {
    var u = -1;
    F.forEach(o, function(f) {
      var c = n(f);
      if (c.length) {
        c = F.sortBy(c, function(p) {
          return s[p];
        });
        for (var l = (c.length - 1) / 2, d = Math.floor(l), h = Math.ceil(l); d <= h; ++d) {
          var v = c[d];
          a[f] === f && u < s[v] && !dA(r, f, v) && (a[v] = f, a[f] = i[f] = i[v], u = s[v]);
        }
      }
    });
  }), { root: i, align: a };
}
function vA(e, t, r, n, i) {
  var a = {}, s = gA(e, t, r, i), o = i ? "borderLeft" : "borderRight";
  function u(l, d) {
    for (var h = s.nodes(), v = h.pop(), p = {}; v; )
      p[v] ? l(v) : (p[v] = !0, h.push(v), h = h.concat(d(v))), v = h.pop();
  }
  function f(l) {
    a[l] = s.inEdges(l).reduce(function(d, h) {
      return Math.max(d, a[h.v] + s.edge(h));
    }, 0);
  }
  function c(l) {
    var d = s.outEdges(l).reduce(function(v, p) {
      return Math.min(v, a[p.w] - s.edge(p));
    }, Number.POSITIVE_INFINITY), h = e.node(l);
    d !== Number.POSITIVE_INFINITY && h.borderType !== o && (a[l] = Math.max(a[l], d));
  }
  return u(f, s.predecessors.bind(s)), u(c, s.successors.bind(s)), F.forEach(n, function(l) {
    a[l] = a[r[l]];
  }), a;
}
function gA(e, t, r, n) {
  var i = new oA(), a = e.graph(), s = xA(a.nodesep, a.edgesep, n);
  return F.forEach(t, function(o) {
    var u;
    F.forEach(o, function(f) {
      var c = r[f];
      if (i.setNode(c), u) {
        var l = r[u], d = i.edge(l, c);
        i.setEdge(l, c, Math.max(s(e, f, u), d || 0));
      }
      u = f;
    });
  }), i;
}
function _A(e, t) {
  return F.minBy(F.values(t), function(r) {
    var n = Number.NEGATIVE_INFINITY, i = Number.POSITIVE_INFINITY;
    return F.forIn(r, function(a, s) {
      var o = wA(e, s) / 2;
      n = Math.max(a + o, n), i = Math.min(a - o, i);
    }), n - i;
  });
}
function yA(e, t) {
  var r = F.values(t), n = F.min(r), i = F.max(r);
  F.forEach(["u", "d"], function(a) {
    F.forEach(["l", "r"], function(s) {
      var o = a + s, u = e[o], f;
      if (u !== t) {
        var c = F.values(u);
        f = s === "l" ? n - F.min(c) : i - F.max(c), f && (e[o] = F.mapValues(u, function(l) {
          return l + f;
        }));
      }
    });
  });
}
function bA(e, t) {
  return F.mapValues(e.ul, function(r, n) {
    if (t)
      return e[t.toLowerCase()][n];
    var i = F.sortBy(F.map(e, n));
    return (i[1] + i[2]) / 2;
  });
}
function mA(e) {
  var t = uA.buildLayerMatrix(e), r = F.merge(
    fA(e, t),
    lA(e, t)
  ), n = {}, i;
  F.forEach(["u", "d"], function(s) {
    i = s === "u" ? t : F.values(t).reverse(), F.forEach(["l", "r"], function(o) {
      o === "r" && (i = F.map(i, function(l) {
        return F.values(l).reverse();
      }));
      var u = (s === "u" ? e.predecessors : e.successors).bind(e), f = pA(e, i, r, u), c = vA(
        e,
        i,
        f.root,
        f.align,
        o === "r"
      );
      o === "r" && (c = F.mapValues(c, function(l) {
        return -l;
      })), n[s + o] = c;
    });
  });
  var a = _A(e, n);
  return yA(n, a), bA(n, e.graph().align);
}
function xA(e, t, r) {
  return function(n, i, a) {
    var s = n.node(i), o = n.node(a), u = 0, f;
    if (u += s.width / 2, F.has(s, "labelpos"))
      switch (s.labelpos.toLowerCase()) {
        case "l":
          f = -s.width / 2;
          break;
        case "r":
          f = s.width / 2;
          break;
      }
    if (f && (u += r ? f : -f), f = 0, u += (s.dummy ? t : e) / 2, u += (o.dummy ? t : e) / 2, u += o.width / 2, F.has(o, "labelpos"))
      switch (o.labelpos.toLowerCase()) {
        case "l":
          f = o.width / 2;
          break;
        case "r":
          f = -o.width / 2;
          break;
      }
    return f && (u += r ? f : -f), f = 0, u;
  };
}
function wA(e, t) {
  return e.node(t).width;
}
var Jt = Q, n_ = he, EA = cA.positionX, AA = qA;
function qA(e) {
  e = n_.asNonCompoundGraph(e), $A(e), Jt.forEach(EA(e), function(t, r) {
    e.node(r).x = t;
  });
}
function $A(e) {
  var t = n_.buildLayerMatrix(e), r = e.graph().ranksep, n = 0;
  Jt.forEach(t, function(i) {
    var a = Jt.max(Jt.map(i, function(s) {
      return e.node(s).height;
    }));
    Jt.forEach(i, function(s) {
      e.node(s).y = n + a / 2;
    }), n += a + r;
  });
}
var j = Q, Xp = gw, Zp = Ow, SA = nE, CA = he.normalizeRanks, RA = oE, TA = he.removeEmptyRanks, Jp = lE, kA = _E, Qp = bE, IA = iA, OA = AA, it = he, MA = Ce.Graph, PA = NA;
function NA(e, t) {
  var r = t && t.debugTiming ? it.time : it.notime;
  r("layout", function() {
    var n = r("  buildLayoutGraph", function() {
      return KA(e);
    });
    r("  runLayout", function() {
      LA(n, r);
    }), r("  updateInputGraph", function() {
      FA(e, n);
    });
  });
}
function LA(e, t) {
  t("    makeSpaceForEdgeLabels", function() {
    WA(e);
  }), t("    removeSelfEdges", function() {
    n2(e);
  }), t("    acyclic", function() {
    Xp.run(e);
  }), t("    nestingGraph.run", function() {
    Jp.run(e);
  }), t("    rank", function() {
    SA(it.asNonCompoundGraph(e));
  }), t("    injectEdgeLabelProxies", function() {
    YA(e);
  }), t("    removeEmptyRanks", function() {
    TA(e);
  }), t("    nestingGraph.cleanup", function() {
    Jp.cleanup(e);
  }), t("    normalizeRanks", function() {
    CA(e);
  }), t("    assignRankMinMax", function() {
    XA(e);
  }), t("    removeEdgeLabelProxies", function() {
    ZA(e);
  }), t("    normalize.run", function() {
    Zp.run(e);
  }), t("    parentDummyChains", function() {
    RA(e);
  }), t("    addBorderSegments", function() {
    kA(e);
  }), t("    order", function() {
    IA(e);
  }), t("    insertSelfEdges", function() {
    i2(e);
  }), t("    adjustCoordinateSystem", function() {
    Qp.adjust(e);
  }), t("    position", function() {
    OA(e);
  }), t("    positionSelfEdges", function() {
    a2(e);
  }), t("    removeBorderNodes", function() {
    r2(e);
  }), t("    normalize.undo", function() {
    Zp.undo(e);
  }), t("    fixupEdgeLabelCoords", function() {
    e2(e);
  }), t("    undoCoordinateSystem", function() {
    Qp.undo(e);
  }), t("    translateGraph", function() {
    JA(e);
  }), t("    assignNodeIntersects", function() {
    QA(e);
  }), t("    reversePoints", function() {
    t2(e);
  }), t("    acyclic.undo", function() {
    Xp.undo(e);
  });
}
function FA(e, t) {
  j.forEach(e.nodes(), function(r) {
    var n = e.node(r), i = t.node(r);
    n && (n.x = i.x, n.y = i.y, t.children(r).length && (n.width = i.width, n.height = i.height));
  }), j.forEach(e.edges(), function(r) {
    var n = e.edge(r), i = t.edge(r);
    n.points = i.points, j.has(i, "x") && (n.x = i.x, n.y = i.y);
  }), e.graph().width = t.graph().width, e.graph().height = t.graph().height;
}
var DA = ["nodesep", "edgesep", "ranksep", "marginx", "marginy"], zA = { ranksep: 50, edgesep: 20, nodesep: 50, rankdir: "tb" }, jA = ["acyclicer", "ranker", "rankdir", "align"], BA = ["width", "height"], GA = { width: 0, height: 0 }, UA = ["minlen", "weight", "width", "height", "labeloffset"], HA = {
  minlen: 1,
  weight: 1,
  width: 0,
  height: 0,
  labeloffset: 10,
  labelpos: "r"
}, VA = ["labelpos"];
function KA(e) {
  var t = new MA({ multigraph: !0, compound: !0 }), r = gu(e.graph());
  return t.setGraph(j.merge(
    {},
    zA,
    vu(r, DA),
    j.pick(r, jA)
  )), j.forEach(e.nodes(), function(n) {
    var i = gu(e.node(n));
    t.setNode(n, j.defaults(vu(i, BA), GA)), t.setParent(n, e.parent(n));
  }), j.forEach(e.edges(), function(n) {
    var i = gu(e.edge(n));
    t.setEdge(n, j.merge(
      {},
      HA,
      vu(i, UA),
      j.pick(i, VA)
    ));
  }), t;
}
function WA(e) {
  var t = e.graph();
  t.ranksep /= 2, j.forEach(e.edges(), function(r) {
    var n = e.edge(r);
    n.minlen *= 2, n.labelpos.toLowerCase() !== "c" && (t.rankdir === "TB" || t.rankdir === "BT" ? n.width += n.labeloffset : n.height += n.labeloffset);
  });
}
function YA(e) {
  j.forEach(e.edges(), function(t) {
    var r = e.edge(t);
    if (r.width && r.height) {
      var n = e.node(t.v), i = e.node(t.w), a = { rank: (i.rank - n.rank) / 2 + n.rank, e: t };
      it.addDummyNode(e, "edge-proxy", a, "_ep");
    }
  });
}
function XA(e) {
  var t = 0;
  j.forEach(e.nodes(), function(r) {
    var n = e.node(r);
    n.borderTop && (n.minRank = e.node(n.borderTop).rank, n.maxRank = e.node(n.borderBottom).rank, t = j.max(t, n.maxRank));
  }), e.graph().maxRank = t;
}
function ZA(e) {
  j.forEach(e.nodes(), function(t) {
    var r = e.node(t);
    r.dummy === "edge-proxy" && (e.edge(r.e).labelRank = r.rank, e.removeNode(t));
  });
}
function JA(e) {
  var t = Number.POSITIVE_INFINITY, r = 0, n = Number.POSITIVE_INFINITY, i = 0, a = e.graph(), s = a.marginx || 0, o = a.marginy || 0;
  function u(f) {
    var c = f.x, l = f.y, d = f.width, h = f.height;
    t = Math.min(t, c - d / 2), r = Math.max(r, c + d / 2), n = Math.min(n, l - h / 2), i = Math.max(i, l + h / 2);
  }
  j.forEach(e.nodes(), function(f) {
    u(e.node(f));
  }), j.forEach(e.edges(), function(f) {
    var c = e.edge(f);
    j.has(c, "x") && u(c);
  }), t -= s, n -= o, j.forEach(e.nodes(), function(f) {
    var c = e.node(f);
    c.x -= t, c.y -= n;
  }), j.forEach(e.edges(), function(f) {
    var c = e.edge(f);
    j.forEach(c.points, function(l) {
      l.x -= t, l.y -= n;
    }), j.has(c, "x") && (c.x -= t), j.has(c, "y") && (c.y -= n);
  }), a.width = r - t + s, a.height = i - n + o;
}
function QA(e) {
  j.forEach(e.edges(), function(t) {
    var r = e.edge(t), n = e.node(t.v), i = e.node(t.w), a, s;
    r.points ? (a = r.points[0], s = r.points[r.points.length - 1]) : (r.points = [], a = i, s = n), r.points.unshift(it.intersectRect(n, a)), r.points.push(it.intersectRect(i, s));
  });
}
function e2(e) {
  j.forEach(e.edges(), function(t) {
    var r = e.edge(t);
    if (j.has(r, "x"))
      switch ((r.labelpos === "l" || r.labelpos === "r") && (r.width -= r.labeloffset), r.labelpos) {
        case "l":
          r.x -= r.width / 2 + r.labeloffset;
          break;
        case "r":
          r.x += r.width / 2 + r.labeloffset;
          break;
      }
  });
}
function t2(e) {
  j.forEach(e.edges(), function(t) {
    var r = e.edge(t);
    r.reversed && r.points.reverse();
  });
}
function r2(e) {
  j.forEach(e.nodes(), function(t) {
    if (e.children(t).length) {
      var r = e.node(t), n = e.node(r.borderTop), i = e.node(r.borderBottom), a = e.node(j.last(r.borderLeft)), s = e.node(j.last(r.borderRight));
      r.width = Math.abs(s.x - a.x), r.height = Math.abs(i.y - n.y), r.x = a.x + r.width / 2, r.y = n.y + r.height / 2;
    }
  }), j.forEach(e.nodes(), function(t) {
    e.node(t).dummy === "border" && e.removeNode(t);
  });
}
function n2(e) {
  j.forEach(e.edges(), function(t) {
    if (t.v === t.w) {
      var r = e.node(t.v);
      r.selfEdges || (r.selfEdges = []), r.selfEdges.push({ e: t, label: e.edge(t) }), e.removeEdge(t);
    }
  });
}
function i2(e) {
  var t = it.buildLayerMatrix(e);
  j.forEach(t, function(r) {
    var n = 0;
    j.forEach(r, function(i, a) {
      var s = e.node(i);
      s.order = a + n, j.forEach(s.selfEdges, function(o) {
        it.addDummyNode(e, "selfedge", {
          width: o.label.width,
          height: o.label.height,
          rank: s.rank,
          order: a + ++n,
          e: o.e,
          label: o.label
        }, "_se");
      }), delete s.selfEdges;
    });
  });
}
function a2(e) {
  j.forEach(e.nodes(), function(t) {
    var r = e.node(t);
    if (r.dummy === "selfedge") {
      var n = e.node(r.e.v), i = n.x + n.width / 2, a = n.y, s = r.x - i, o = n.height / 2;
      e.setEdge(r.e, r.label), e.removeNode(t), r.label.points = [
        { x: i + 2 * s / 3, y: a - o },
        { x: i + 5 * s / 6, y: a - o },
        { x: i + s, y: a },
        { x: i + 5 * s / 6, y: a + o },
        { x: i + 2 * s / 3, y: a + o }
      ], r.label.x = r.x, r.label.y = r.y;
    }
  });
}
function vu(e, t) {
  return j.mapValues(j.pick(e, t), Number);
}
function gu(e) {
  var t = {};
  return j.forEach(e, function(r, n) {
    t[n.toLowerCase()] = r;
  }), t;
}
var qr = Q, s2 = he, o2 = Ce.Graph, u2 = {
  debugOrdering: c2
};
function c2(e) {
  var t = s2.buildLayerMatrix(e), r = new o2({ compound: !0, multigraph: !0 }).setGraph({});
  return qr.forEach(e.nodes(), function(n) {
    r.setNode(n, { label: n }), r.setParent(n, "layer" + e.node(n).rank);
  }), qr.forEach(e.edges(), function(n) {
    r.setEdge(n.v, n.w, {}, n.name);
  }), qr.forEach(t, function(n, i) {
    var a = "layer" + i;
    r.setNode(a, { rank: "same" }), qr.reduce(n, function(s, o) {
      return r.setEdge(s, o, { style: "invis" }), o;
    });
  }), r;
}
var f2 = "0.8.5", l2 = {
  graphlib: Ce,
  layout: PA,
  debug: u2,
  util: {
    time: he.time,
    notime: he.notime
  },
  version: f2
};
const ev = /* @__PURE__ */ v0(l2), tv = "1.2.0", Iu = 380, h2 = 32, d2 = 80, p2 = 26, Ur = h2, i_ = d2, a_ = p2, kt = 28, gt = 24, v2 = { labels: !1 };
function rv(e) {
  return `<ha-icon icon="mdi:cog-outline"
    style="display:block;margin:0 auto;width:${e}px;height:${e}px;
           --mdc-icon-size:${e}px;pointer-events:none">
  </ha-icon>`;
}
function ze(e) {
  return String(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function Ut(e) {
  return `onclick="(function(el,txt){
    var _legacy=function(t){
      try{
        var ta=document.createElement('textarea');
        ta.value=t;
        ta.style.cssText='position:fixed;top:-999px;left:-999px;opacity:0';
        document.body.appendChild(ta);ta.focus();ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }catch(e){}
    };
    if(navigator.clipboard){
      navigator.clipboard.writeText(txt).catch(function(){_legacy(txt);});
    }else{
      _legacy(txt);
    }
    el.style.outline='2px solid #4CAF50';
    el.style.borderRadius='3px';
    setTimeout(function(){el.style.outline='';},1500);
    var preview=txt.length>45?txt.substring(0,45)+'...':txt;
    var toast=document.createElement('div');
    toast.innerText='Copied: '+preview;
    toast.style.cssText=[
      'position:fixed','bottom:32px','left:50%','transform:translateX(-50%)',
      'background:#323232','color:#fff','padding:10px 24px','border-radius:24px',
      'font-size:13px','font-family:Segoe UI,Arial,sans-serif','z-index:999999',
      'pointer-events:none','box-shadow:0 4px 16px rgba(0,0,0,0.35)',
      'opacity:1','transition:opacity 0.4s ease'
    ].join(';');
    document.body.appendChild(toast);
    setTimeout(function(){toast.style.opacity='0';},1200);
    setTimeout(function(){ if(toast.parentNode)toast.parentNode.removeChild(toast); },1650);
  })(this,'${String(e).replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\r/g, "").replace(/\n/g, " ").replace(/&/g, "&amp;").replace(/"/g, "&quot;")}');event.stopPropagation();" title="Click to copy"`;
}
const $r = '<span style="color:#666;font-size:10px">None</span>';
function g2(e, t, r, n, i = !0, a = {}, s = null) {
  var ye, ot, ut, z, H, fe, St;
  const o = e.entity_id, u = ((ye = e.attributes) == null ? void 0 : ye.friendly_name) || o, f = hv(o), c = C_(o), l = R_(e), d = l ? "#F44336" : f, h = "";
  i && ((ot = e.attributes) != null && ot.voice_label);
  const [v] = ke(e), p = v.filter((D) => n.has(D)), g = v.filter((D) => !n.has(D)), { text: _, bg: w, unit: E } = qc(o, t), q = `${p.length} Groups / ${g.length} Entities`, I = (a.entities || {})[o] || {}, T = Array.isArray(I.labels) ? I.labels : [], C = Array.isArray(I.aliases) ? I.aliases : [], L = I.hidden_by || null, x = T.map((D) => {
    const Z = (a.labels || {})[D];
    return Z ? { name: Z.name || D, color: Z.color || "#607D8B" } : { name: D, color: "#607D8B" };
  }), O = x.map(
    (D) => `<span style="display:inline-block;background:${D.color};color:#111;font-size:10px;font-weight:700;padding:3px 10px;border-radius:10px;margin:2px 4px 2px 0;box-shadow:0 1px 2px rgba(0,0,0,0.18);white-space:nowrap;border:1.5px solid rgba(0,0,0,0.35);">${ze(D.name)}</span>`
  ).join("");
  let m = "";
  const k = L ? ` <span title="${ze("Hidden entities will not be included in auto-populated dashboards or when their area, device or label is referenced. Their history is still tracked and you can still interact with them with actions.")}" style="display:inline-flex;align-items:center;gap:3px;background:rgba(0,0,0,0.30);color:#fff;font-size:11px;font-weight:700;padding:2px 9px;border-radius:10px;letter-spacing:0.3px;vertical-align:middle;border:1.5px solid rgba(0,0,0,0.18);cursor:help"><ha-icon icon="mdi:eye-off" style="--mdc-icon-size:13px;width:13px;height:13px;display:block"></ha-icon>Hidden</span>` : "";
  m += `<tr><td colspan="2" style="background:${f};color:#fff;font-size:11px;font-weight:bold;padding:5px 10px;letter-spacing:1px;border-radius:3px 3px 0 0;border-bottom:2px solid rgba(0,0,0,0.15)">${c}${h}${k}</td></tr>`;
  const y = l ? "#c62828" : "#111", A = l ? "#c62828" : "#888";
  m += `<tr>
    <td rowspan="2" data-more-info="1" data-entity-id="${o}" title="Open settings"
      style="cursor:pointer;vertical-align:middle;
             padding:4px 0;background:#fafafa;
             border-bottom:2px solid #e0e0e0;
             display:table-cell;text-align:center">
      ${rv(46)}
    </td>
    <td ${Ut(u)} style="font-weight:bold;font-size:13px;padding:6px 10px 3px 8px;
      color:${y};word-wrap:break-word;white-space:normal;line-height:1.4;
      border-bottom:1px solid #ebebeb;background:#fafafa;cursor:pointer">
      ${ze(u)}
    </td>
  </tr>
  <tr>
    <td ${Ut(o)} style="font-size:10px;color:${A};padding:3px 10px 7px 8px;
      word-break:break-all;line-height:1.3;border-bottom:2px solid #e0e0e0;
      background:#f5f5f5;cursor:pointer;
      font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,'Liberation Mono','Courier New',monospace">
      ${o}
    </td>
  </tr>`;
  const b = /* @__PURE__ */ new Set(["switch", "light", "fan", "group"]), S = b.has(o.split(".")[0]) ? 'title="Toggle"' : "";
  if (m += `<tr><td colspan="2" style="padding:7px 10px;text-align:center;border-bottom:2px solid #e0e0e0;background:#fff">
    <span data-state-badge="1" data-entity-id="${o}" data-unit="${ze(E)}"
      ${S}
      style="display:inline-block;background:${w};color:#fff;
             font-size:12px;font-weight:bold;padding:5px 28px;border-radius:4px;
             min-width:80px;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,0.2);
             cursor:pointer;user-select:none;">
      ${_}
    </span>
  </td></tr>`, m += `<tr><td colspan="2" style="font-size:10px;color:#777;padding:4px 10px 6px;text-align:center;border-bottom:2px solid #e0e0e0;font-style:italic;background:#fafafa">${q}</td></tr>`, !(x.length === 0 && v2.labels)) {
    const D = x.length > 0;
    m += `<tr><td colspan="2" style="padding:5px 10px 4px;border-bottom:1px solid #e8e8e8;background:#fafafa">
      <div style="border-radius:6px;overflow:hidden;border:1.5px solid ${D ? "#1976D2" : "#ccc"}">
        <div style="background:${D ? "#1976D2" : "#e0e0e0"};color:${D ? "#fff" : "#999"};font-size:9px;font-weight:700;letter-spacing:0.6px;padding:3px 8px">Group Labels</div>
        <div style="background:#fff;padding:4px 8px">
          ${D ? `<div style="display:flex;flex-wrap:wrap;gap:3px;line-height:1.8">${O}</div>` : $r}
        </div>
      </div>
    </td></tr>`;
  }
  const $ = r[o], N = $ ? (a.entities || {})[$] || {} : {}, M = Array.isArray(N.aliases) ? N.aliases : [], P = [.../* @__PURE__ */ new Set([...C, ...M])], B = P.includes(null), Y = P.filter((D) => D != null && D !== ""), V = B || Y.length > 0;
  m += `<tr><td colspan="2" style="padding:5px 10px 4px;border-bottom:2px solid #e0e0e0;background:#fafafa">
    <div style="border-radius:6px;overflow:hidden;border:1.5px solid ${V ? "#7B1FA2" : "#ccc"}">
      <div style="background:${V ? "#7B1FA2" : "#e0e0e0"};color:${V ? "#fff" : "#999"};font-size:9px;font-weight:700;letter-spacing:0.6px;padding:3px 8px">Group voice assistant</div>
      <div style="background:#fff;padding:4px 8px">
        ${V ? (B ? `<div style="display:inline-flex;align-items:center;gap:5px;background:#E8F5E9;border:1.5px solid #4CAF50;border-radius:6px;padding:2px 8px;margin-bottom:3px;font-size:10px;font-weight:700;color:#2E7D32">
                  <ha-icon icon="mdi:check-circle" style="--mdc-icon-size:12px;width:12px;height:12px;display:block;color:#2E7D32"></ha-icon>
                  Default name: ${ze(u)}
                </div>` : `<div style="display:inline-flex;align-items:center;gap:5px;background:#FAFAFA;border:1.5px solid #BDBDBD;border-radius:6px;padding:2px 8px;margin-bottom:3px;font-size:10px;font-weight:700;color:#757575">
                  <ha-icon icon="mdi:close-circle" style="--mdc-icon-size:12px;width:12px;height:12px;display:block;color:#9E9E9E"></ha-icon>
                  Default name: off
                </div>`) + Y.map((D) => `<div ${Ut(D)} style="font-size:12px;color:#000;font-weight:600;cursor:pointer;padding:2px 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">💬 ${ze(D)}</div>`).join("") : $r}
      </div>
    </div>
  </td></tr>`;
  const re = {
    "cloud.alexa": { label: "Alexa", icon: "mdi:microphone" },
    "cloud.google_assistant": { label: "Google", icon: "mdi:google-assistant" },
    conversation: { label: "HA Voice", icon: "mdi:home-assistant" }
  }, ce = (a.expose || {})[o] || {}, ie = { ...$ ? (a.expose || {})[$] || {} : {}, ...ce }, de = Object.keys(ie), pe = de.length > 0, st = pe ? "#00695C" : "#e0e0e0", U = pe ? "#fff" : "#999", Re = pe ? "#00695C" : "#ccc", G = de.map((D) => {
    var Ee;
    const Z = re[D] || { label: D, icon: "mdi:microphone" };
    return `<div style="display:inline-flex;align-items:center;gap:4px;background:#00695C;color:#fff;font-size:10px;font-weight:700;padding:3px 9px;border-radius:8px;margin:2px 3px 2px 0;white-space:nowrap;box-shadow:0 1px 2px rgba(0,0,0,0.18);opacity:${((Ee = ie[D]) == null ? void 0 : Ee.should_expose) === !1 ? "0.45" : "1"}">
      <ha-icon icon="${Z.icon}" style="--mdc-icon-size:13px;width:13px;height:13px;display:block"></ha-icon>
      ${Z.label}
    </div>`;
  }).join(""), Te = Y.length > 0 && !pe ? `<div style="display:flex;align-items:center;gap:6px;margin-top:5px;padding:5px 8px;background:#FFF8E1;border:1.5px solid #FFB300;border-radius:6px">
        <ha-icon icon="mdi:alert" style="--mdc-icon-size:15px;width:15px;height:15px;display:block;flex-shrink:0;color:#F57F17"></ha-icon>
        <span style="font-size:11px;font-weight:700;color:#B71C1C;line-height:1.3">Voice aliases defined but not exposed to any assistant</span>
       </div>` : "";
  m += `<tr><td colspan="2" style="padding:5px 10px 4px;border-bottom:2px solid #e0e0e0;background:#fafafa">
    <div style="border-radius:6px;overflow:hidden;border:1.5px solid ${Re}">
      <div style="background:${st};color:${U};font-size:9px;font-weight:700;letter-spacing:0.6px;padding:3px 8px">Voice exposure</div>
      <div style="background:#fff;padding:4px 8px">
        ${pe ? `<div style="display:flex;flex-wrap:wrap">${G}</div>` : $r}
        ${Te}
      </div>
    </div>
  </td></tr>`;
  const oe = (a.automations || {})[o] || [], $t = oe.length > 0 ? "#E65100" : "#ccc", We = oe.length > 0 ? "#E65100" : "#e0e0e0", X = oe.length > 0 ? "#fff" : "#999", ne = { trigger: "#E65100", condition: "#6A1B9A", action: "#1565C0" }, _e = oe.slice(0, 8).map((D) => {
    const Z = ze(D.name || D.id), J = String(D.name || D.id || "").replace(/\\/g, "\\\\").replace(/'/g, "\\'"), we = (D.id || "").replace(/'/g, ""), Ee = D.count || 1, ct = Array.isArray(D.sections) ? D.sections : [], be = ct.map((ae) => `<span style="display:inline-block;background:${ne[ae] || "#555"};color:#fff;font-size:9px;font-weight:700;padding:1px 6px;border-radius:8px;margin-right:3px;letter-spacing:0.3px">${ae}</span>`).join(""), Ye = Ee > 1 ? `<span style="display:inline-block;background:#f5f5f5;color:#888;font-size:9px;font-weight:700;padding:1px 5px;border-radius:8px;border:1px solid #ddd;margin-left:2px">×${Ee}</span>` : "", Le = we ? `onclick="window.open('/config/automation/edit/${we}','_blank');event.stopPropagation();" title="Open automation editor in new tab"` : "", Xe = `onclick="(function(t){var _l=function(x){try{var a=document.createElement('textarea');a.value=x;a.style.cssText='position:fixed;top:-999px;opacity:0';document.body.appendChild(a);a.focus();a.select();document.execCommand('copy');document.body.removeChild(a);}catch(e){}};if(navigator.clipboard){navigator.clipboard.writeText(t).catch(function(){_l(t);});}else{_l(t);}var p=t.length>45?t.substring(0,45)+'...':t;var d=document.createElement('div');d.innerText='Copied: '+p;d.style.cssText='position:fixed;bottom:32px;left:50%;transform:translateX(-50%);background:#323232;color:#fff;padding:10px 24px;border-radius:24px;font-size:13px;z-index:999999;pointer-events:none;opacity:1;transition:opacity 0.4s ease';document.body.appendChild(d);setTimeout(function(){d.style.opacity='0';},1200);setTimeout(function(){if(d.parentNode)d.parentNode.removeChild(d);},1650);})('${J}');event.stopPropagation();" title="Click to copy name"`;
    return '<div style="display:flex;align-items:flex-start;gap:6px;padding:5px 0;border-bottom:1px solid #f0f0f0">' + (we ? `<span ${Le} style="flex-shrink:0;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;line-height:0;width:24px;height:24px;border-radius:8px;background:linear-gradient(145deg,#6A1B9A,#AB47BC);box-shadow:0 2px 6px rgba(106,27,154,0.45)"><ha-icon icon="mdi:pencil-outline" style="--mdc-icon-size:14px;width:14px;height:14px;display:flex;color:#fff"></ha-icon></span>` : "") + `<div style="flex:1;min-width:0">  <div ${Xe} style="font-size:11px;color:#333;font-weight:600;line-height:1.4;cursor:pointer;word-break:break-word">${Z}</div>` + (ct.length || Ee > 1 ? `<div style="margin-top:3px;display:flex;flex-wrap:wrap;align-items:center;gap:2px">${be}${Ye}</div>` : "") + "</div></div>";
  }).join("");
  if (m += `<tr><td colspan="2" style="padding:5px 10px 4px;border-bottom:2px solid #e0e0e0;background:#fafafa">
    <div style="border-radius:6px;overflow:hidden;border:1.5px solid ${$t}">
      <div style="background:${We};color:${X};font-size:9px;font-weight:700;letter-spacing:0.6px;padding:3px 8px">Used in Automations (${oe.length})</div>
      <div style="background:#fff;padding:4px 8px">
        ${oe.length > 0 ? _e + (oe.length > 8 ? `<div style="font-size:9px;color:#aaa;font-style:italic;padding-top:2px">+${oe.length - 8} more...</div>` : "") : $r}
      </div>
    </div>
  </td></tr>`, g.length > 0) {
    m += `<tr><td colspan="2" style="font-size:10px;color:#444;font-weight:bold;padding:5px 10px 3px;border-bottom:1px solid #e0e0e0;background:#f0f4ff">Entities (${g.length}):</td></tr>`;
    const D = Math.min(g.length, 10);
    for (let Z = 0; Z < D; Z++) {
      const J = g[Z], we = ((z = (ut = t[J]) == null ? void 0 : ut.attributes) == null ? void 0 : z.friendly_name) || J, { text: Ee, bg: ct } = qc(J, t), be = Z % 2 === 0 ? "#ffffff" : "#f8f8f8", Ye = b.has(J.split(".")[0]) ? 'title="Toggle"' : "", Le = (((fe = (H = t[J]) == null ? void 0 : H.attributes) == null ? void 0 : fe.unit_of_measurement) || "").trim(), Xe = ((St = t[J]) == null ? void 0 : St.state) || "", ae = Le && !isNaN(parseFloat(Xe)) ? `${Xe} ${Le}` : Ee;
      m += `<tr><td colspan="2" style="font-size:10px;padding:5px 10px;border-bottom:1px solid #e8e8e8;background:${be}">
        <div style="display:flex;align-items:center;gap:6px">
          <span data-more-info="1" data-entity-id="${J}" title="Open settings"
            style="flex-shrink:0;cursor:pointer;line-height:0">${rv(34)}</span>
          <div style="overflow:hidden;flex:1;min-width:0">
            <div ${Ut(we)} style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#333;font-size:11px;font-weight:600;cursor:pointer">${ze(we)}</div>
            <div ${Ut(J)} style="margin-top:1px;color:#888;font-size:10px;line-height:1.2;cursor:pointer;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,'Liberation Mono','Courier New',monospace">${J}</div>
          </div>
          <span data-state-badge="1" data-entity-id="${J}" data-unit="${ze(Le)}"
            ${Ye}
            style="flex-shrink:0;background:${ct};color:#fff;font-size:9px;
                   padding:2px 7px;border-radius:3px;
                   white-space:nowrap;font-weight:bold;cursor:pointer;user-select:none;">
            ${ae}
          </span>
        </div>
      </td></tr>`;
    }
    g.length > 10 && (m += `<tr><td colspan="2" style="font-size:9px;color:#aaa;padding:3px 10px 5px;font-style:italic;background:#f8f8f8">+${g.length - 10} more...</td></tr>`);
  }
  return `<table style="border-collapse:collapse;width:100%;background:#fff;border-radius:4px;border:3px solid ${d};box-shadow:0 3px 10px rgba(0,0,0,0.2);font-family:Segoe UI,Arial,sans-serif;table-layout:fixed;word-wrap:break-word">
    <colgroup><col style="width:56px"><col></colgroup>
    ${m}
  </table>`;
}
function _2(e) {
  const t = document.createElement("div");
  t.style.cssText = [
    "position:absolute",
    "left:-99999px",
    "top:0",
    "visibility:hidden",
    "pointer-events:none",
    `width:${Iu}px`,
    "font-family:Segoe UI,Arial,sans-serif",
    "font-size:12px"
  ].join(";"), document.body.appendChild(t);
  const r = {};
  return e.forEach((n, i) => {
    const a = document.createElement("div");
    a.style.width = Iu + "px", a.innerHTML = n, t.appendChild(a), r[i] = a.offsetHeight + 16, t.removeChild(a);
  }), document.body.removeChild(t), r;
}
function y2(e, t, r, n, i, a) {
  const s = /* @__PURE__ */ new Map(), o = [], u = /* @__PURE__ */ new Set(), f = (g) => {
    const _ = g.entity_id;
    if (u.has(_)) return;
    if (u.add(_), s.set(_, g2(g, t, r, n, i, a, c)), r[_]) {
      const E = t[r[_]];
      E && (f(E), o.push({ from: _, to: r[_], style: "dashed", color: "#FF9800", width: 2.5, marker: "url(#arrow-dashed)", label: "wraps" }));
    }
    const [w] = ke(g);
    w.forEach((E) => {
      if (!n.has(E)) return;
      const q = t[E];
      q && (f(q), o.push({ from: _, to: E, color: hv(E), width: 2.5, marker: "url(#arrow)", label: "" }));
    });
  }, c = new Set(Object.values(r));
  e.forEach((g) => f(g));
  const l = _2(s), d = {};
  s.forEach((g, _) => {
    const E = ((a.entities || {})[_] || {}).area_id;
    if (!E) return;
    const q = (a.areas || {})[E];
    if (q) {
      if (!d[E]) {
        const I = (Array.isArray(q.aliases) ? q.aliases : []).slice(0, 3), C = 86 + Math.max(I.length, 1) * 26;
        d[E] = { name: q.name || E, aliases: I, topPad: C, node_ids: [] };
      }
      d[E].node_ids.push(_);
    }
  });
  const h = /* @__PURE__ */ new Set(), v = new ev.graphlib.Graph({ compound: !0 }).setDefaultEdgeLabel(() => ({}));
  v.setGraph({
    rankdir: "TB",
    // Generous spacing so edges have wide corridors between area boxes
    ranksep: 120,
    nodesep: 90,
    marginx: 80,
    marginy: 80
  }), Object.keys(d).forEach((g) => {
    const _ = `__area__${g}`;
    h.add(_), v.setNode(_, {
      label: "",
      width: 1,
      height: 1,
      paddingLeft: Ur,
      paddingRight: Ur,
      paddingTop: d[g].topPad,
      paddingBottom: a_
    });
  }), s.forEach((g, _) => {
    v.setNode(_, {
      label: g,
      width: Iu,
      height: l[_] || 160
    });
  }), Object.entries(d).forEach(([g, { node_ids: _ }]) => {
    const w = `__area__${g}`;
    _.forEach((E) => {
      try {
        v.setParent(E, w);
      } catch (q) {
        console.warn("[groups-visualizer] setParent failed", E, q);
      }
    });
  });
  const p = {};
  return o.forEach((g) => {
    p[`${g.from}|${g.to}`] = g, v.setEdge(g.from, g.to, {});
  }), ev.layout(v), { dagreGraph: v, edgeMeta: p, measuredHeights: l, areaMap: d, clusterIds: h };
}
const Sr = [
  { fill: "rgba(21,101,192,0.14)", border: "#1565C0" },
  { fill: "rgba(106,27,154,0.14)", border: "#6A1B9A" },
  { fill: "rgba(46,125,50,0.14)", border: "#2E7D32" },
  { fill: "rgba(230,81,0,0.14)", border: "#E65100" },
  { fill: "rgba(136,14,79,0.14)", border: "#880E4F" },
  { fill: "rgba(0,96,100,0.14)", border: "#006064" },
  { fill: "rgba(85,139,47,0.14)", border: "#558B2F" },
  { fill: "rgba(183,28,28,0.14)", border: "#B71C1C" },
  { fill: "rgba(49,27,146,0.14)", border: "#311B92" },
  { fill: "rgba(1,87,155,0.14)", border: "#01579B" }
];
function b2(e, t) {
  const r = {};
  return e && Object.entries(e).forEach(([n, { node_ids: i, topPad: a }]) => {
    const s = i.map((u) => t.get(u)).filter(Boolean);
    if (!s.length) return;
    const o = a !== void 0 ? a : i_;
    r[n] = {
      x1: Math.min(...s.map((u) => u.x)) - Ur,
      y1: Math.min(...s.map((u) => u.y)) - o,
      x2: Math.max(...s.map((u) => u.x + u.w)) + Ur,
      y2: Math.max(...s.map((u) => u.y + u.h)) + a_
    };
  }), r;
}
function nv(e, t) {
  if (!t) return null;
  for (const [r, { node_ids: n }] of Object.entries(t))
    if (n.includes(e)) return r;
  return null;
}
function m2(e, t, r, n, i) {
  const a = i.get(e), s = i.get(t);
  if (!a || !s) return null;
  const o = a.x + a.w / 2, u = a.y + a.h, f = s.x + s.w / 2, c = s.y, l = 28;
  if (n.y1 >= r.y2 - l) {
    const v = (r.y2 + n.y1) / 2;
    return [
      { x: o, y: u },
      { x: o, y: v },
      { x: f, y: v },
      { x: f, y: c }
    ];
  }
  if (r.y1 >= n.y2 - l) {
    const v = (n.y2 + r.y1) / 2;
    return [
      { x: o, y: u },
      { x: o, y: r.y1 - l },
      { x: o, y: v },
      { x: f, y: v },
      { x: f, y: n.y2 + l },
      { x: f, y: c }
    ];
  }
  const d = (u + c) / 2;
  if (n.x1 >= r.x2 - l) {
    const v = (r.x2 + n.x1) / 2;
    return [
      { x: o, y: u },
      { x: o, y: d },
      { x: v, y: d },
      { x: f, y: d },
      { x: f, y: c }
    ];
  }
  if (r.x1 >= n.x2 - l) {
    const v = (n.x2 + r.x1) / 2;
    return [
      { x: o, y: u },
      { x: o, y: d },
      { x: v, y: d },
      { x: f, y: d },
      { x: f, y: c }
    ];
  }
  const h = Math.max(r.y2, n.y2) + l * 2;
  return [
    { x: o, y: u },
    { x: o, y: h },
    { x: f, y: h },
    { x: f, y: c }
  ];
}
function x2(e) {
  return !e || !e.length ? { x: 0, y: 0 } : e[Math.floor(e.length / 2)];
}
function w2(e) {
  let t = e.select("defs");
  t.empty() && (t = e.insert("defs", ":first-child")), t.select("#area-shadow").empty() && t.append("filter").attr("id", "area-shadow").attr("x", "-12%").attr("y", "-12%").attr("width", "124%").attr("height", "124%").append("feDropShadow").attr("dx", 0).attr("dy", 5).attr("stdDeviation", 10).attr("flood-color", "rgba(0,0,0,0.28)");
}
function E2(e, t, r, n, i) {
  const a = kt * 2.2, s = Math.max(t.length * (kt * 0.65) + 36, 90);
  return e.append("rect").attr("x", n + 3).attr("y", i + 3).attr("width", s).attr("height", a).attr("rx", a / 2).attr("ry", a / 2).attr("fill", "rgba(0,0,0,0.28)"), e.append("rect").attr("x", n).attr("y", i).attr("width", s).attr("height", a).attr("rx", a / 2).attr("ry", a / 2).attr("fill", r).attr("stroke", "rgba(255,255,255,0.4)").attr("stroke-width", 1.5), e.append("text").attr("x", n + s / 2).attr("y", i + a / 2).attr("text-anchor", "middle").attr("dominant-baseline", "middle").style("font-size", `${kt}px`).style("font-family", "Segoe UI, Arial, sans-serif").style("font-weight", "bold").style("fill", "#ffffff").style("letter-spacing", "0.5px").style("pointer-events", "none").text(t), { lblW: s, lblH: a };
}
function A2(e, t, r, n, i) {
  const a = `${t} node${t > 1 ? "s" : ""}`, s = a.length * (gt * 0.65) + 20, o = gt * 2;
  return e.append("rect").attr("x", n + 2).attr("y", i + 2).attr("width", s).attr("height", o).attr("rx", o / 2).attr("ry", o / 2).attr("fill", "rgba(0,0,0,0.18)"), e.append("rect").attr("x", n).attr("y", i).attr("width", s).attr("height", o).attr("rx", o / 2).attr("ry", o / 2).attr("fill", "#ffffff").attr("stroke", r).attr("stroke-width", 2.5), e.append("text").attr("x", n + s / 2).attr("y", i + o / 2).attr("text-anchor", "middle").attr("dominant-baseline", "middle").style("font-size", `${gt}px`).style("font-family", "Segoe UI, Arial, sans-serif").style("fill", r).style("font-weight", "bold").style("pointer-events", "none").text(a), { cw: s, ch: o };
}
function q2(e, t, r, n, i, a, s, o, u, f, c) {
  t.selectAll("*").remove(), n.selectAll("*").remove(), w2(e);
  const l = t.append("g").attr("class", "area-layer"), d = t.append("g").attr("class", "node-layer"), h = n, v = /* @__PURE__ */ new Map();
  a.nodes().forEach((m) => {
    if (c && c.has(m)) return;
    const R = a.node(m);
    if (!R) return;
    const k = o[m] || R.height, y = d.append("foreignObject").attr("x", R.x - R.width / 2).attr("y", R.y - k / 2).attr("width", R.width).attr("height", k), A = y.append("xhtml:div").style("width", R.width + "px").style("overflow", "visible");
    A.html(R.label), v.set(m, { fo: y, inner: A.node(), node: R, measuredH: k });
  });
  let p = 0, g = 0;
  const _ = /* @__PURE__ */ new Map();
  v.forEach(({ fo: m, inner: R, node: k, measuredH: y }, A) => {
    const b = Math.max(y, R.scrollHeight + 8);
    b !== y && (m.attr("height", b), m.attr("y", k.y - b / 2));
    const S = k.x - k.width / 2, $ = k.y - b / 2;
    _.set(A, { x: S, y: $, w: k.width, h: b }), p = Math.max(p, S + k.width + 60), g = Math.max(g, $ + b + 60);
  });
  const w = b2(f, _);
  if (f && Object.keys(f).length > 0) {
    let m = 0;
    Object.entries(f).forEach(([R, k]) => {
      const { name: y, node_ids: A } = k, b = w[R];
      if (!b) return;
      const S = A.map((ue) => _.get(ue)).filter(Boolean);
      if (!S.length) return;
      const { fill: $, border: N } = Sr[m % Sr.length];
      m++;
      const M = b.x1, P = b.y1, B = b.x2 - b.x1, Y = b.y2 - b.y1;
      p = Math.max(p, b.x2 + 60), g = Math.max(g, b.y2 + 40), l.append("rect").attr("x", M - 6).attr("y", P - 6).attr("width", B + 12).attr("height", Y + 12).attr("rx", 24).attr("ry", 24).attr("fill", "none").attr("stroke", N).attr("stroke-width", 10).attr("opacity", 0.15), l.append("rect").attr("x", M).attr("y", P).attr("width", B).attr("height", Y).attr("rx", 18).attr("ry", 18).attr("fill", $).attr("stroke", N).attr("stroke-width", 5).attr("filter", "url(#area-shadow)"), l.append("rect").attr("x", M).attr("y", P).attr("width", B).attr("height", 12).attr("rx", 18).attr("ry", 18).attr("fill", N).attr("stroke", "none");
      const { lblH: V } = E2(
        l,
        y,
        N,
        M + 18,
        // lblX
        P + 12
        // lblY
      ), te = P + 12 + (V - gt * 2) / 2;
      A2(
        l,
        S.length,
        N,
        b.x2 - 18,
        // cx � will be adjusted by cw inside helper
        te
      );
    });
  }
  if (l.selectAll("*").remove(), f && Object.keys(f).length > 0) {
    let m = 0;
    Object.entries(f).forEach(([R, k]) => {
      const { name: y, node_ids: A, aliases: b = [], topPad: S = i_ } = k, $ = w[R];
      if (!$) return;
      const N = A.map((ae) => _.get(ae)).filter(Boolean);
      if (!N.length) return;
      const { fill: M, border: P } = Sr[m % Sr.length];
      m++;
      const B = $.x1, Y = $.y1, V = $.x2 - $.x1, te = $.y2 - $.y1;
      p = Math.max(p, $.x2 + 60), g = Math.max(g, $.y2 + 40), l.append("rect").attr("x", B - 6).attr("y", Y - 6).attr("width", V + 12).attr("height", te + 12).attr("rx", 24).attr("ry", 24).attr("fill", "none").attr("stroke", P).attr("stroke-width", 10).attr("opacity", 0.15), l.append("rect").attr("x", B).attr("y", Y).attr("width", V).attr("height", te).attr("rx", 18).attr("ry", 18).attr("fill", M).attr("stroke", P).attr("stroke-width", 5).attr("filter", "url(#area-shadow)"), l.append("rect").attr("x", B).attr("y", Y).attr("width", V).attr("height", 12).attr("rx", 18).attr("ry", 18).attr("fill", P).attr("stroke", "none");
      const ue = kt * 0.62, W = Math.round(kt * 2.2), re = Math.round(W * 0.48), ce = (W - re) / 2, _r = re / 24, ie = 12, de = 24, pe = 6, st = 5, U = 12, Re = 7, G = 18, Te = Math.min(V - 28, 600), oe = ce + 4 + re + 8 + y.length * ue + 20, $t = b.map((ae) => ({ alias: ae, cw: Math.min(ae.length * 7.5 + 42, 300) })), We = $t.reduce((ae, Ze) => ae + Ze.cw + pe, 2 * U - pe), X = Math.min(Math.max(oe, b.length ? We : 0, 120), Te), ne = X - 2 * U, _e = [[]];
      let ye = 0;
      $t.forEach((ae) => {
        const Ze = Math.min(ae.cw, ne);
        ye > 0 && ye + Ze + pe > ne && (_e.push([]), ye = 0), _e[_e.length - 1].push({ alias: ae.alias, cw: Ze }), ye += Ze + pe;
      });
      const ot = b.length > 0, ut = G + Re + (ot ? _e.length * (de + st) - st : de) + Re, z = B + 18, H = Y + 8, fe = W + ut;
      l.append("rect").attr("x", z + 3).attr("y", H + 3).attr("width", X).attr("height", fe).attr("rx", ie).attr("ry", ie).attr("fill", "rgba(0,0,0,0.22)");
      const St = `M${z + ie} ${H} L${z + X - ie} ${H} Q${z + X} ${H} ${z + X} ${H + ie} L${z + X} ${H + W} L${z} ${H + W} L${z} ${H + ie} Q${z} ${H} ${z + ie} ${H}Z`;
      l.append("path").attr("d", St).attr("fill", P).attr("data-copy-text", y).style("cursor", "copy");
      const D = `M${z} ${H + W} L${z + X} ${H + W} L${z + X} ${H + fe - ie} Q${z + X} ${H + fe} ${z + X - ie} ${H + fe} L${z + ie} ${H + fe} Q${z} ${H + fe} ${z} ${H + fe - ie} L${z} ${H + W}Z`;
      l.append("path").attr("d", D).attr("fill", "rgba(255,255,255,0.97)"), l.append("rect").attr("x", z).attr("y", H).attr("width", X).attr("height", fe).attr("rx", ie).attr("ry", ie).attr("fill", "none").attr("stroke", P).attr("stroke-width", 2), l.append("line").attr("x1", z).attr("y1", H + W).attr("x2", z + X).attr("y2", H + W).attr("stroke", P).attr("stroke-width", 1.5).style("pointer-events", "none"), l.append("rect").attr("x", z).attr("y", H).attr("width", ce + 2 + re + ce).attr("height", W).attr("fill", "rgba(0,0,0,0)").attr("data-area-nav", "1").attr("data-area-id", R).style("cursor", "pointer"), l.append("g").attr("transform", `translate(${z + ce + 2},${H + ce}) scale(${_r})`).style("pointer-events", "none").selectAll("path").data([
        "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",
        "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
      ]).enter().append("path").attr("d", (ae) => ae).attr("fill", "none").attr("stroke", "rgba(255,255,255,0.9)").attr("stroke-width", 2).attr("stroke-linecap", "round").attr("stroke-linejoin", "round");
      const J = (z + ce + 2 + re + 10 + z + X) / 2;
      l.append("text").attr("x", J).attr("y", H + W / 2).attr("text-anchor", "middle").attr("dominant-baseline", "middle").style("font-size", `${kt}px`).style("font-family", "Segoe UI, Arial, sans-serif").style("font-weight", "bold").style("fill", "#ffffff").style("letter-spacing", "0.5px").style("pointer-events", "none").text(y), l.append("text").attr("x", z + U).attr("y", H + W + G / 2 + 1).attr("dominant-baseline", "middle").style("font-size", "9px").style("font-family", "Segoe UI, Arial, sans-serif").style("font-weight", "700").style("letter-spacing", "0.6px").style("fill", "#111111").style("pointer-events", "none").text("Area voice assistant");
      const we = H + W + G + Re;
      ot ? _e.forEach((ae, Ze) => {
        const fc = we + Ze * (de + st);
        let vn = z + U;
        ae.forEach(({ alias: lc, cw: hc }) => {
          l.append("rect").attr("x", vn).attr("y", fc).attr("width", hc).attr("height", de).attr("rx", de / 2).attr("ry", de / 2).attr("fill", "#ffffff").attr("stroke", P).attr("stroke-width", 1.5).attr("data-copy-text", lc).style("cursor", "copy"), l.append("text").attr("x", vn + 10).attr("y", fc + de / 2).attr("dominant-baseline", "middle").style("font-size", "11px").style("font-family", "Segoe UI, Arial, sans-serif").style("font-weight", "600").style("fill", "#333333").style("pointer-events", "none").text("💬 " + lc), vn += hc + pe;
        });
      }) : l.append("text").attr("x", z + U).attr("y", we + de / 2).attr("dominant-baseline", "middle").style("font-size", "11px").style("font-family", "Segoe UI, Arial, sans-serif").style("font-style", "italic").style("fill", "#999999").style("pointer-events", "none").text("None");
      const Ee = N.length, ct = `${Ee} node${Ee > 1 ? "s" : ""}`, be = gt * 2, Ye = ct.length * (gt * 0.65) + 20, Le = $.x2 - Ye - 18, Xe = H + (W - be) / 2;
      l.append("rect").attr("x", Le + 2).attr("y", Xe + 2).attr("width", Ye).attr("height", be).attr("rx", be / 2).attr("ry", be / 2).attr("fill", "rgba(0,0,0,0.18)"), l.append("rect").attr("x", Le).attr("y", Xe).attr("width", Ye).attr("height", be).attr("rx", be / 2).attr("ry", be / 2).attr("fill", "#ffffff").attr("stroke", P).attr("stroke-width", 2.5), l.append("text").attr("x", Le + Ye / 2).attr("y", Xe + be / 2).attr("text-anchor", "middle").attr("dominant-baseline", "middle").style("font-size", `${gt}px`).style("font-family", "Segoe UI, Arial, sans-serif").style("fill", P).style("font-weight", "bold").style("pointer-events", "none").text(ct);
    });
  }
  const E = Kc().x((m) => m.x).y((m) => m.y).curve(o0), q = Kc().x((m) => m.x).y((m) => m.y).curve(jv);
  a.edges().forEach((m) => {
    if (c != null && c.has(m.v) || c != null && c.has(m.w)) return;
    const R = a.edge(m);
    if (!(R != null && R.points)) return;
    const k = s[`${m.v}|${m.w}`] || {}, y = nv(m.v, f), A = nv(m.w, f);
    let b, S;
    if (y && A && y !== A ? (b = m2(m.v, m.w, w[y], w[A], _) || R.points, S = q) : (b = R.points, S = E), h.append("path").attr("d", S(b)).attr("stroke", "#ffffff").attr("stroke-width", (k.width || 2.5) + 4).attr("fill", "none").attr("opacity", 0.75), h.append("path").attr("d", S(b)).attr("stroke", k.color || "#555").attr("stroke-width", k.width || 2.5).attr("stroke-dasharray", k.style === "dashed" ? "10,5" : null).attr("fill", "none").attr(
      "marker-end",
      k.marker === "url(#arrow-dashed)" ? "url(#arrow-dashed2)" : "url(#arrow2)"
    ), k.label) {
      const $ = x2(b);
      h.append("circle").attr("cx", $.x).attr("cy", $.y).attr("r", 5).attr("fill", k.color || "#FF9800").attr("stroke", "#ffffff").attr("stroke-width", 2);
    }
  });
  const I = Math.max(p, u), T = Math.max(g, 400);
  e.attr("width", I).attr("height", T), r.attr("width", I).attr("height", T);
  let C = 1 / 0;
  v.forEach(({ node: m }) => {
    C = Math.min(C, m.x - m.width / 2);
  }), C === 1 / 0 && (C = 0);
  const L = p - C, x = L > u ? Math.max(u / (L + 120), 0.08) : 1, O = u / 2 - L * x / 2 - C * x + 30;
  return e.call(i.transform, Gu.translate(O, 40).scale(x)), { svgWidth: I, svgHeight: T };
}
class $2 {
  constructor(t, r) {
    this.container = t, this.width = r || 1400, Ie(t).style("position", "relative"), this.svg = Ie(t).append("svg").attr("width", this.width).attr("height", 600).style("display", "block");
    const n = this.svg.append("defs");
    n.append("marker").attr("id", "arrow").attr("viewBox", "0 -8 16 16").attr("refX", 15).attr("refY", 0).attr("markerWidth", 12).attr("markerHeight", 12).attr("orient", "auto").append("path").attr("d", "M0,-8L16,0L0,8Z").attr("fill", "#555"), n.append("marker").attr("id", "arrow-dashed").attr("viewBox", "0 -8 16 16").attr("refX", 15).attr("refY", 0).attr("markerWidth", 12).attr("markerHeight", 12).attr("orient", "auto").append("path").attr("d", "M0,-8L16,0L0,8Z").attr("fill", "#FF9800"), this.svgG = this.svg.append("g"), this.svgEdge = Ie(t).append("svg").attr("width", this.width).attr("height", 600).style("position", "absolute").style("top", "0").style("left", "0").style("pointer-events", "none");
    const i = this.svgEdge.append("defs");
    i.append("marker").attr("id", "arrow2").attr("viewBox", "0 -8 16 16").attr("refX", 15).attr("refY", 0).attr("markerWidth", 12).attr("markerHeight", 12).attr("orient", "auto").append("path").attr("d", "M0,-8L16,0L0,8Z").attr("fill", "#555"), i.append("marker").attr("id", "arrow-dashed2").attr("viewBox", "0 -8 16 16").attr("refX", 15).attr("refY", 0).attr("markerWidth", 12).attr("markerHeight", 12).attr("orient", "auto").append("path").attr("d", "M0,-8L16,0L0,8Z").attr("fill", "#FF9800"), this.svgEdgeG = this.svgEdge.append("g"), this.zoom = p0().scaleExtent([0.05, 3]).on("zoom", (a) => {
      this.svgG.attr("transform", a.transform), this.svgEdgeG.attr("transform", a.transform);
    }), this.svg.call(this.zoom);
  }
  build_graph(t, r, n, i, a = !0, s = {}) {
    const { dagreGraph: o, edgeMeta: u, measuredHeights: f, areaMap: c, clusterIds: l } = y2(t, r, n, i, a, s);
    this._dagreGraph = o, this._edgeMeta = u, this._measuredHeights = f, this._areaMap = c, this._clusterIds = l;
  }
  render() {
    return q2(
      this.svg,
      this.svgG,
      this.svgEdge,
      this.svgEdgeG,
      this.zoom,
      this._dagreGraph,
      this._edgeMeta,
      this._measuredHeights,
      this.width,
      this._areaMap,
      this._clusterIds
    );
  }
}
function iv(e, t) {
  !t || !e || e.querySelectorAll("[data-state-badge]").forEach((r) => {
    const n = r.getAttribute("data-entity-id");
    if (!n) return;
    const i = t.states[n];
    if (!i) return;
    const a = i.state || "unknown", s = a.toLowerCase(), o = (r.getAttribute("data-unit") || "").trim(), u = o && !isNaN(parseFloat(a)), f = s === "on" ? "ON" : s === "off" ? "OFF" : u ? `${a} ${o}` : a.substring(0, 8).toUpperCase(), c = s === "on" ? "#4CAF50" : s === "off" ? "#9E9E9E" : "#2196F3";
    r.textContent.trim() !== f && (r.textContent = f), r.style.background !== c && (r.style.background = c);
  });
}
function S2(e, t, r, n, i, a, s, o) {
  var v;
  if (!e) return;
  const u = t == null ? void 0 : t.querySelector(`#graph-${CSS.escape(e)}`);
  if (!u) return;
  if (o && o[e])
    if (u.childElementCount === 0)
      delete o[e];
    else
      return;
  u.innerHTML = "";
  const f = ((v = u.parentElement) == null ? void 0 : v.clientWidth) || window.innerWidth || 1400, c = r[e];
  if (!c) return;
  const l = new $2(u, f);
  l.build_graph(
    [c],
    r,
    n,
    i,
    a,
    s
  );
  const { svgWidth: d, svgHeight: h } = l.render();
  u.style.width = d + "px", u.style.height = h + "px", o[e] = l;
}
function C2(e, t, r, n) {
  const i = /* @__PURE__ */ new Set(), a = (s) => {
    const o = s.entity_id;
    if (i.has(o)) return 0;
    i.add(o);
    let u = 1;
    if (t[o]) {
      const l = r[t[o]];
      l && (u += a(l));
    }
    const f = s.attributes || {};
    return (Array.isArray(f.entity_id) ? f.entity_id : Array.isArray(f.lights) ? f.lights : []).forEach((l) => {
      n.has(l) && r[l] && (u += a(r[l]));
    }), u;
  };
  return a(e);
}
customElements.define("groups-visualizer", class extends tr {
  static get properties() {
    return {
      hass: { attribute: !1 },
      config: { attribute: !1 },
      _tabs: { state: !0 },
      _activeTab: { state: !0 },
      _activeSubTab: { state: !0 },
      _loading: { state: !0 },
      _timestamp: { state: !0 },
      _areaPopup: { state: !0 }
    };
  }
  static get styles() {
    return $_;
  }
  static getStubConfig() {
    return { show_domains: {}, show_voice_labels: !0 };
  }
  constructor() {
    super(), this._tabs = {}, this._activeTab = null, this._activeSubTab = {}, this._loading = !0, this._graphCache = {}, this._pairs = {}, this._lookup = {}, this._group_ids = /* @__PURE__ */ new Set(), this._registry = { entities: {}, areas: {}, labels: {} }, this._timestamp = null, this._debug = null, this._buildInProgress = !1, this._buildDone = !1, this._stateUpdatePending = !1, this._lastHassRef = null, this._areaPopup = null, this._onBadgeClick = this._onBadgeClick.bind(this);
  }
  // Capture-phase click delegation — re-attached on every connect so
  // back-navigation (which re-inserts the element) keeps clicks working.
  connectedCallback() {
    super.connectedCallback(), this.shadowRoot.addEventListener("click", this._onBadgeClick, { capture: !0 });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.shadowRoot.removeEventListener("click", this._onBadgeClick, { capture: !0 });
  }
  setConfig(t) {
    const r = this.config;
    this.config = t, this._buildDone && JSON.stringify(r) !== JSON.stringify(t) && (this._graphCache = {}, this._triggerBuild());
  }
  updated(t) {
    !t.has("hass") || !this.hass || this.hass !== this._lastHassRef && (this._lastHassRef = this.hass, this._buildDone ? this._stateUpdatePending || (this._stateUpdatePending = !0, requestAnimationFrame(() => {
      this._stateUpdatePending = !1, iv(this.shadowRoot, this.hass);
    })) : this._triggerBuild());
  }
  _triggerBuild() {
    this._buildInProgress || this._buildGraph();
  }
  async _buildGraph() {
    if (!this.hass) return;
    this._buildInProgress = !0, this._buildDone || (this._loading = !0);
    const { roots: t, pairs: r, lookup: n, group_ids: i, registry: a, _debug: s } = await $c(this.hass);
    this._pairs = r, this._lookup = n, this._group_ids = i, this._registry = a, this._debug = s, this._timestamp = Rc(), this._tabs = Sc(t, this.config), this._activeSubTab = Cc(this._tabs, this._activeSubTab), (!this._activeTab || !this._tabs[this._activeTab]) && (this._activeTab = Object.keys(this._tabs)[0] || null), this._graphCache = {}, this._loading = !1, this._buildDone = !0, this._buildInProgress = !1, this.requestUpdate(), this.updateComplete.then(() => {
      const o = this._activeSubTab[this._activeTab];
      o && this._doRender(o);
    });
  }
  _showMainTab(t) {
    this._activeTab = t, this._graphCache = {}, this.requestUpdate(), this.updateComplete.then(() => {
      const r = this._activeSubTab[t];
      r && this._doRender(r);
    });
  }
  _showSubTab(t, r) {
    this._activeSubTab = { ...this._activeSubTab, [t]: r }, this.requestUpdate(), this.updateComplete.then(() => this._doRender(r));
  }
  _doRender(t) {
    var r;
    S2(
      t,
      this.shadowRoot,
      this._lookup,
      this._pairs,
      this._group_ids,
      ((r = this.config) == null ? void 0 : r.show_voice_labels) !== !1,
      this._registry,
      this._graphCache
    );
  }
  // ---------- Header actions ----------
  _rebuildCurrentTree() {
    var r;
    const t = (r = this._activeSubTab) == null ? void 0 : r[this._activeTab];
    t && (this._graphCache && this._graphCache[t] && delete this._graphCache[t], this._doRender(t));
  }
  async _fullRebuildCurrentTree() {
    var c;
    if (!this.hass) return;
    const t = this._activeTab, r = ((c = this._activeSubTab) == null ? void 0 : c[t]) || null, { roots: n, pairs: i, lookup: a, group_ids: s, registry: o } = await $c(this.hass);
    this._pairs = i, this._lookup = a, this._group_ids = s, this._registry = o, this._timestamp = Rc(), this._tabs = Sc(n, this.config), this._activeSubTab = Cc(this._tabs, this._activeSubTab), (!this._activeTab || !this._tabs[this._activeTab]) && (this._activeTab = Object.keys(this._tabs)[0] || null);
    let u = r;
    u && Object.values(this._tabs).flat().find((l) => l.entity_id === u) || (u = this._activeSubTab[this._activeTab] || null), u && this._graphCache && this._graphCache[u] && delete this._graphCache[u], this.requestUpdate(), this.updateComplete.then(() => {
      u && this._doRender(u);
    });
  }
  // ---------- Clickable ON/OFF badge ----------
  async _onBadgeClick(t) {
    var h, v;
    const r = t.composedPath ? t.composedPath() : [];
    let n = null, i = null, a = null, s = null;
    for (const p of r) {
      if (p && p.dataset) {
        if (p.dataset.stateBadge) {
          n = p;
          break;
        }
        if (p.dataset.moreInfo) {
          i = p;
          break;
        }
        if (p.dataset.areaNav) {
          a = p;
          break;
        }
        if (p.dataset.copyText !== void 0) {
          s = p;
          break;
        }
      }
      if (p === this.shadowRoot) break;
    }
    if (i) {
      t.preventDefault(), t.stopImmediatePropagation();
      const p = i.getAttribute("data-entity-id");
      p && this.dispatchEvent(new CustomEvent("hass-more-info", {
        detail: { entityId: p },
        bubbles: !0,
        composed: !0
      }));
      return;
    }
    if (a) {
      t.preventDefault(), t.stopImmediatePropagation();
      const p = a.getAttribute("data-area-id");
      p && this._openAreaPopup(p);
      return;
    }
    if (s) {
      t.preventDefault(), t.stopImmediatePropagation();
      const p = s.getAttribute("data-copy-text") || "";
      if (!p) return;
      const g = (E) => {
        try {
          const q = document.createElement("textarea");
          q.value = E, q.style.cssText = "position:fixed;top:-999px;opacity:0", document.body.appendChild(q), q.focus(), q.select(), document.execCommand("copy"), document.body.removeChild(q);
        } catch {
        }
      };
      navigator.clipboard ? navigator.clipboard.writeText(p).catch(() => g(p)) : g(p);
      const _ = p.length > 45 ? p.substring(0, 45) + "..." : p, w = document.createElement("div");
      w.innerText = "Copied: " + _, w.style.cssText = "position:fixed;bottom:32px;left:50%;transform:translateX(-50%);background:#323232;color:#fff;padding:10px 24px;border-radius:24px;font-size:13px;z-index:999999;pointer-events:none;opacity:1;transition:opacity 0.4s ease", document.body.appendChild(w), setTimeout(() => {
        w.style.opacity = "0";
      }, 1200), setTimeout(() => {
        w.parentNode && w.parentNode.removeChild(w);
      }, 1650);
      return;
    }
    if (!n) return;
    t.preventDefault(), t.stopImmediatePropagation();
    const o = n.getAttribute("data-entity-id");
    if (!o || !this.hass) return;
    const u = o.split(".")[0];
    if (!(/* @__PURE__ */ new Set(["switch", "light", "fan", "group"])).has(u)) return;
    const d = (((v = (h = this.hass.states) == null ? void 0 : h[o]) == null ? void 0 : v.state) || "unknown").toLowerCase() !== "on" ? "turn_on" : "turn_off";
    try {
      await this.hass.callService(u, d, { entity_id: o }), iv(this.shadowRoot, this.hass);
    } catch (p) {
      console.error("[groups-visualizer] toggle failed", u, d, o, p);
    }
  }
  _openAreaPopup(t) {
    var i, a;
    const r = (((i = this._registry) == null ? void 0 : i.areas) || {})[t], n = Object.entries(((a = this._registry) == null ? void 0 : a.entities) || {}).filter(([, s]) => s.area_id === t).map(([s]) => {
      var o, u;
      return {
        eid: s,
        name: ((u = (o = this._lookup[s]) == null ? void 0 : o.attributes) == null ? void 0 : u.friendly_name) || s
      };
    }).sort((s, o) => s.name.localeCompare(o.name));
    this._areaPopup = { areaId: t, area: r, entities: n };
  }
  _closeAreaPopup() {
    this._areaPopup = null;
  }
  _openAreaPage(t) {
    this._areaPopup = null, history.pushState(null, "", `/config/areas/area/${t}`), window.dispatchEvent(new CustomEvent("location-changed", { bubbles: !1 }));
  }
  _renderAreaPopup() {
    const { areaId: t, area: r, entities: n } = this._areaPopup, i = (r == null ? void 0 : r.name) || t, a = Array.isArray(r == null ? void 0 : r.aliases) ? r.aliases : [];
    return Ae`
      <div class="area-popup-overlay"
           @click=${(s) => {
      s.target === s.currentTarget && this._closeAreaPopup();
    }}>
        <div class="area-popup">

          <div class="area-popup-header">
            <span>${i}</span>
            <button class="area-popup-close" @click=${() => this._closeAreaPopup()}>✕</button>
          </div>

          ${a.length ? Ae`
            <div class="area-popup-section">
              <div class="area-popup-label">Voice Aliases</div>
              ${a.map((s) => Ae`<div class="area-popup-alias">💬 ${s}</div>`)}
            </div>` : ""}

          <div class="area-popup-section">
            <div class="area-popup-label">Entities (${n.length})</div>
            ${n.length === 0 ? Ae`<div class="area-popup-none">No entities assigned</div>` : n.map(({ eid: s, name: o }) => Ae`
                  <div class="area-popup-entity"
                       @click=${() => this.dispatchEvent(new CustomEvent(
      "hass-more-info",
      { detail: { entityId: s }, bubbles: !0, composed: !0 }
    ))}>
                    <span class="area-popup-entity-name">${o}</span>
                    <span class="area-popup-eid">${s}</span>
                  </div>`)}
          </div>

          <div class="area-popup-footer">
            <button class="area-popup-btn" @click=${() => this._openAreaPage(t)}>
              Open Area Settings ↗
            </button>
          </div>

        </div>
      </div>`;
  }
  render() {
    if (this._loading)
      return Ae`<ha-card><div class="loading">Loading groups...</div></ha-card>`;
    if (!this._tabs || !Object.keys(this._tabs).length) {
      const a = this._debug;
      return Ae`<ha-card><div class="loading" style="font-size:11px;text-align:left;padding:12px;font-family:monospace;white-space:pre-wrap">No groups found (v${tv}).
${a ? `states: ${a.total_states}  entity_reg: ${a.entity_reg_size}  reg[platform=group]: ${a.reg_group_platform.length}
group.* in states: ${a.group_domain_states.length}
  ${a.group_domain_states.map((s) => `${s.id} [${s.state}] members=${JSON.stringify(s.members)}`).join(`
  `)}
groups with members: ${a.groups_with_members.length}
  ${a.groups_with_members.map((s) => `${s.id} -> [${s.members.join(", ")}]`).join(`
  `)}
hierarchical: [${a.hierarchical.join(", ")}]
roots: [${a.roots.join(", ")}]` : "(debug unavailable)"}
</div></ha-card>`;
    }
    const t = Object.keys(this._tabs), r = this._activeTab, n = this._tabs[r] || [], i = this._activeSubTab[r];
    return Ae`
      <ha-card>

        <div class="header">
          <div>
            <div class="header-title">Group Visualizer <span class="header-version">v${tv}</span></div>
            <div class="header-subtitle">Color by type - Entity ID - Voice labels</div>
          </div>
          <div class="header-actions">
            <button class="refresh-btn" title="Full rebuild (re-fetch data)"
              @click=${() => this._fullRebuildCurrentTree()}>
              Rebuild
            </button>
            <div class="header-timestamp"><span style="opacity:0.7;font-family:Segoe UI,Arial,sans-serif;font-size:10px;margin-right:5px">Last rebuild:</span>${this._timestamp || "..."}</div>
          </div>
        </div>

        <div class="main-tabs">
          ${t.map((a) => Ae`
            <button class="main-tab ${a === r ? "active" : ""}"
              @click=${() => this._showMainTab(a)}>
              ${a} (${this._tabs[a].length})
            </button>`)}
        </div>

        <div class="sub-tabs">
          ${n.map((a) => {
      var f;
      const s = a.entity_id, o = ((f = a.attributes) == null ? void 0 : f.friendly_name) || s, u = C2(a, this._pairs, this._lookup, this._group_ids);
      return Ae`
              <button class="sub-tab ${s === i ? "active" : ""}"
                title="${o} � ${u} nodes"
                @click=${() => this._showSubTab(r, s)}>
                ${o}
              </button>`;
    })}
        </div>

        <div class="graph-viewport">
          ${n.map((a) => {
      const s = a.entity_id;
      return Ae`
              <div style="display:${s === i ? "block" : "none"}"
                   class="graph-canvas">
                <div id="graph-${s}"></div>
              </div>`;
    })}
        </div>

      </ha-card>

      ${this._areaPopup ? this._renderAreaPopup() : ""}`;
  }
});
