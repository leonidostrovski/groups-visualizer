/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const wr = globalThis, Cu = wr.ShadowRoot && (wr.ShadyCSS === void 0 || wr.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Tu = Symbol(), hc = /* @__PURE__ */ new WeakMap();
let av = class {
  constructor(t, r, n) {
    if (this._$cssResult$ = !0, n !== Tu) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = r;
  }
  get styleSheet() {
    let t = this.o;
    const r = this.t;
    if (Cu && t === void 0) {
      const n = r !== void 0 && r.length === 1;
      n && (t = hc.get(r)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && hc.set(r, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ag = (e) => new av(typeof e == "string" ? e : e + "", void 0, Tu), sg = (e, ...t) => {
  const r = e.length === 1 ? e[0] : t.reduce((n, i, a) => n + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + e[a + 1], e[0]);
  return new av(r, e, Tu);
}, og = (e, t) => {
  if (Cu) e.adoptedStyleSheets = t.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else for (const r of t) {
    const n = document.createElement("style"), i = wr.litNonce;
    i !== void 0 && n.setAttribute("nonce", i), n.textContent = r.cssText, e.appendChild(n);
  }
}, dc = Cu ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let r = "";
  for (const n of t.cssRules) r += n.cssText;
  return ag(r);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ug, defineProperty: cg, getOwnPropertyDescriptor: fg, getOwnPropertyNames: lg, getOwnPropertySymbols: hg, getPrototypeOf: dg } = Object, We = globalThis, pc = We.trustedTypes, pg = pc ? pc.emptyScript : "", hn = We.reactiveElementPolyfillSupport, Ut = (e, t) => e, du = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? pg : null;
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
} }, sv = (e, t) => !ug(e, t), vc = { attribute: !0, type: String, converter: du, reflect: !1, useDefault: !1, hasChanged: sv };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), We.litPropertyMetadata ?? (We.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let bt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, r = vc) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((r = Object.create(r)).wrapped = !0), this.elementProperties.set(t, r), !r.noAccessor) {
      const n = Symbol(), i = this.getPropertyDescriptor(t, n, r);
      i !== void 0 && cg(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, r, n) {
    const { get: i, set: a } = fg(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? vc;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ut("elementProperties"))) return;
    const t = dg(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ut("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ut("properties"))) {
      const r = this.properties, n = [...lg(r), ...hg(r)];
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
      for (const i of n) r.unshift(dc(i));
    } else t !== void 0 && r.push(dc(t));
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
    return og(t, this.constructor.elementStyles), t;
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
      const s = (((a = n.converter) == null ? void 0 : a.toAttribute) !== void 0 ? n.converter : du).toAttribute(r, n.type);
      this._$Em = t, s == null ? this.removeAttribute(i) : this.setAttribute(i, s), this._$Em = null;
    }
  }
  _$AK(t, r) {
    var a, s;
    const n = this.constructor, i = n._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const o = n.getPropertyOptions(i), u = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((a = o.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? o.converter : du;
      this._$Em = i;
      const f = u.fromAttribute(r, o.type);
      this[i] = f ?? ((s = this._$Ej) == null ? void 0 : s.get(i)) ?? f, this._$Em = null;
    }
  }
  requestUpdate(t, r, n, i = !1, a) {
    var s;
    if (t !== void 0) {
      const o = this.constructor;
      if (i === !1 && (a = this[t]), n ?? (n = o.getPropertyOptions(t)), !((n.hasChanged ?? sv)(a, r) || n.useDefault && n.reflect && a === ((s = this._$Ej) == null ? void 0 : s.get(t)) && !this.hasAttribute(o._$Eu(t, n)))) return;
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
bt.elementStyles = [], bt.shadowRootOptions = { mode: "open" }, bt[Ut("elementProperties")] = /* @__PURE__ */ new Map(), bt[Ut("finalized")] = /* @__PURE__ */ new Map(), hn == null || hn({ ReactiveElement: bt }), (We.reactiveElementVersions ?? (We.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Bt = globalThis, _c = (e) => e, $r = Bt.trustedTypes, gc = $r ? $r.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ov = "$lit$", Ve = `lit$${Math.random().toFixed(9).slice(2)}$`, uv = "?" + Ve, vg = `<${uv}>`, ct = document, Vt = () => ct.createComment(""), Kt = (e) => e === null || typeof e != "object" && typeof e != "function", ku = Array.isArray, _g = (e) => ku(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", dn = `[ 	
\f\r]`, It = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, yc = /-->/g, bc = />/g, Qe = RegExp(`>|${dn}(?:([^\\s"'>=/]+)(${dn}*=${dn}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), mc = /'/g, wc = /"/g, cv = /^(?:script|style|textarea|title)$/i, gg = (e) => (t, ...r) => ({ _$litType$: e, strings: t, values: r }), pe = gg(1), xt = Symbol.for("lit-noChange"), te = Symbol.for("lit-nothing"), xc = /* @__PURE__ */ new WeakMap(), nt = ct.createTreeWalker(ct, 129);
function fv(e, t) {
  if (!ku(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return gc !== void 0 ? gc.createHTML(t) : t;
}
const yg = (e, t) => {
  const r = e.length - 1, n = [];
  let i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", s = It;
  for (let o = 0; o < r; o++) {
    const u = e[o];
    let f, c, l = -1, h = 0;
    for (; h < u.length && (s.lastIndex = h, c = s.exec(u), c !== null); ) h = s.lastIndex, s === It ? c[1] === "!--" ? s = yc : c[1] !== void 0 ? s = bc : c[2] !== void 0 ? (cv.test(c[2]) && (i = RegExp("</" + c[2], "g")), s = Qe) : c[3] !== void 0 && (s = Qe) : s === Qe ? c[0] === ">" ? (s = i ?? It, l = -1) : c[1] === void 0 ? l = -2 : (l = s.lastIndex - c[2].length, f = c[1], s = c[3] === void 0 ? Qe : c[3] === '"' ? wc : mc) : s === wc || s === mc ? s = Qe : s === yc || s === bc ? s = It : (s = Qe, i = void 0);
    const d = s === Qe && e[o + 1].startsWith("/>") ? " " : "";
    a += s === It ? u + vg : l >= 0 ? (n.push(f), u.slice(0, l) + ov + u.slice(l) + Ve + d) : u + Ve + (l === -2 ? o : d);
  }
  return [fv(e, a + (e[r] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class Wt {
  constructor({ strings: t, _$litType$: r }, n) {
    let i;
    this.parts = [];
    let a = 0, s = 0;
    const o = t.length - 1, u = this.parts, [f, c] = yg(t, r);
    if (this.el = Wt.createElement(f, n), nt.currentNode = this.el.content, r === 2 || r === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (i = nt.nextNode()) !== null && u.length < o; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const l of i.getAttributeNames()) if (l.endsWith(ov)) {
          const h = c[s++], d = i.getAttribute(l).split(Ve), p = /([.?@])?(.*)/.exec(h);
          u.push({ type: 1, index: a, name: p[2], strings: d, ctor: p[1] === "." ? mg : p[1] === "?" ? wg : p[1] === "@" ? xg : Fr }), i.removeAttribute(l);
        } else l.startsWith(Ve) && (u.push({ type: 6, index: a }), i.removeAttribute(l));
        if (cv.test(i.tagName)) {
          const l = i.textContent.split(Ve), h = l.length - 1;
          if (h > 0) {
            i.textContent = $r ? $r.emptyScript : "";
            for (let d = 0; d < h; d++) i.append(l[d], Vt()), nt.nextNode(), u.push({ type: 2, index: ++a });
            i.append(l[h], Vt());
          }
        }
      } else if (i.nodeType === 8) if (i.data === uv) u.push({ type: 2, index: a });
      else {
        let l = -1;
        for (; (l = i.data.indexOf(Ve, l + 1)) !== -1; ) u.push({ type: 7, index: a }), l += Ve.length - 1;
      }
      a++;
    }
  }
  static createElement(t, r) {
    const n = ct.createElement("template");
    return n.innerHTML = t, n;
  }
}
function Et(e, t, r = e, n) {
  var s, o;
  if (t === xt) return t;
  let i = n !== void 0 ? (s = r._$Co) == null ? void 0 : s[n] : r._$Cl;
  const a = Kt(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== a && ((o = i == null ? void 0 : i._$AO) == null || o.call(i, !1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, r, n)), n !== void 0 ? (r._$Co ?? (r._$Co = []))[n] = i : r._$Cl = i), i !== void 0 && (t = Et(e, i._$AS(e, t.values), i, n)), t;
}
class bg {
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
    const { el: { content: r }, parts: n } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? ct).importNode(r, !0);
    nt.currentNode = i;
    let a = nt.nextNode(), s = 0, o = 0, u = n[0];
    for (; u !== void 0; ) {
      if (s === u.index) {
        let f;
        u.type === 2 ? f = new Qt(a, a.nextSibling, this, t) : u.type === 1 ? f = new u.ctor(a, u.name, u.strings, this, t) : u.type === 6 && (f = new Eg(a, this, t)), this._$AV.push(f), u = n[++o];
      }
      s !== (u == null ? void 0 : u.index) && (a = nt.nextNode(), s++);
    }
    return nt.currentNode = ct, i;
  }
  p(t) {
    let r = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, r), r += n.strings.length - 2) : n._$AI(t[r])), r++;
  }
}
class Qt {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, r, n, i) {
    this.type = 2, this._$AH = te, this._$AN = void 0, this._$AA = t, this._$AB = r, this._$AM = n, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
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
    t = Et(this, t, r), Kt(t) ? t === te || t == null || t === "" ? (this._$AH !== te && this._$AR(), this._$AH = te) : t !== this._$AH && t !== xt && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : _g(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== te && Kt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(ct.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var a;
    const { values: r, _$litType$: n } = t, i = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = Wt.createElement(fv(n.h, n.h[0]), this.options)), n);
    if (((a = this._$AH) == null ? void 0 : a._$AD) === i) this._$AH.p(r);
    else {
      const s = new bg(i, this), o = s.u(this.options);
      s.p(r), this.T(o), this._$AH = s;
    }
  }
  _$AC(t) {
    let r = xc.get(t.strings);
    return r === void 0 && xc.set(t.strings, r = new Wt(t)), r;
  }
  k(t) {
    ku(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let n, i = 0;
    for (const a of t) i === r.length ? r.push(n = new Qt(this.O(Vt()), this.O(Vt()), this, this.options)) : n = r[i], n._$AI(a), i++;
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
class Fr {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, r, n, i, a) {
    this.type = 1, this._$AH = te, this._$AN = void 0, this.element = t, this.name = r, this._$AM = i, this.options = a, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = te;
  }
  _$AI(t, r = this, n, i) {
    const a = this.strings;
    let s = !1;
    if (a === void 0) t = Et(this, t, r, 0), s = !Kt(t) || t !== this._$AH && t !== xt, s && (this._$AH = t);
    else {
      const o = t;
      let u, f;
      for (t = a[0], u = 0; u < a.length - 1; u++) f = Et(this, o[n + u], r, u), f === xt && (f = this._$AH[u]), s || (s = !Kt(f) || f !== this._$AH[u]), f === te ? t = te : t !== te && (t += (f ?? "") + a[u + 1]), this._$AH[u] = f;
    }
    s && !i && this.j(t);
  }
  j(t) {
    t === te ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class mg extends Fr {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === te ? void 0 : t;
  }
}
class wg extends Fr {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== te);
  }
}
class xg extends Fr {
  constructor(t, r, n, i, a) {
    super(t, r, n, i, a), this.type = 5;
  }
  _$AI(t, r = this) {
    if ((t = Et(this, t, r, 0) ?? te) === xt) return;
    const n = this._$AH, i = t === te && n !== te || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, a = t !== te && (n === te || i);
    i && this.element.removeEventListener(this.name, this, n), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var r;
    typeof this._$AH == "function" ? this._$AH.call(((r = this.options) == null ? void 0 : r.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Eg {
  constructor(t, r, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Et(this, t);
  }
}
const pn = Bt.litHtmlPolyfillSupport;
pn == null || pn(Wt, Qt), (Bt.litHtmlVersions ?? (Bt.litHtmlVersions = [])).push("3.3.2");
const Ag = (e, t, r) => {
  const n = (r == null ? void 0 : r.renderBefore) ?? t;
  let i = n._$litPart$;
  if (i === void 0) {
    const a = (r == null ? void 0 : r.renderBefore) ?? null;
    n._$litPart$ = i = new Qt(t.insertBefore(Vt(), a), a, void 0, r ?? {});
  }
  return i._$AI(e), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ot = globalThis;
class Ht extends bt {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ag(r, this.renderRoot, this.renderOptions);
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
    return xt;
  }
}
var iv;
Ht._$litElement$ = !0, Ht.finalized = !0, (iv = ot.litElementHydrateSupport) == null || iv.call(ot, { LitElement: Ht });
const vn = ot.litElementPolyfillSupport;
vn == null || vn({ LitElement: Ht });
(ot.litElementVersions ?? (ot.litElementVersions = [])).push("4.2.2");
const qg = sg`
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
function Oe(e) {
  const t = (e == null ? void 0 : e.attributes) || {}, r = t.entity_id;
  if (Array.isArray(r) && r.length > 0) return [r, "entity_id"];
  const n = t.lights;
  return Array.isArray(n) && n.length > 0 ? [n, "lights"] : [[], null];
}
function $g(e) {
  const [t] = Oe(e);
  return t.length > 0;
}
function Sg(e) {
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
function lv(e) {
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
function Rg(e) {
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
function Cg(e) {
  if (!e) return !0;
  const t = (e.state || "").toLowerCase();
  return t === "unknown" || t === "unavailable";
}
function Ec(e, t) {
  var s;
  const r = t[e];
  if (!r) return { text: "UNKN", bg: "#F44336", unit: "" };
  const n = r.state || "unknown", i = n.toLowerCase();
  if (i === "on") return { text: "ON", bg: "#4CAF50", unit: "" };
  if (i === "off") return { text: "OFF", bg: "#9E9E9E", unit: "" };
  const a = (((s = r.attributes) == null ? void 0 : s.unit_of_measurement) || "").trim();
  return a && !isNaN(parseFloat(n)) ? { text: `${n} ${a}`, bg: "#2196F3", unit: a } : { text: n.substring(0, 8).toUpperCase(), bg: "#2196F3", unit: "" };
}
function Tg(e, t = {}) {
  const r = {};
  e.forEach((h) => {
    r[h.entity_id] = h;
  });
  const n = e.filter((h) => $g(h)), i = new Set(n.map((h) => h.entity_id));
  Object.entries(t).forEach(([h, d]) => {
    d.platform === "group" && i.add(h);
  }), e.forEach((h) => {
    h.entity_id.startsWith("group.") && i.add(h.entity_id);
  });
  const a = {};
  e.forEach((h) => {
    const d = h.entity_id;
    if (!d.startsWith("light.")) return;
    const p = d.replace("light.", "switch.");
    if (!r[p]) return;
    const [v] = Oe(r[p]);
    v.length > 0 && (a[d] = p, i.add(d));
  });
  const s = new Set(Object.values(a)), o = [];
  n.forEach((h) => {
    const [d] = Oe(h), p = d.some((_) => i.has(_)), v = s.has(h.entity_id);
    (p || v) && o.push(h);
  }), Object.keys(a).forEach((h) => {
    const d = r[h];
    d && !o.find((p) => p.entity_id === h) && o.push(d);
  });
  const u = /* @__PURE__ */ new Set();
  o.forEach((h) => {
    const [d] = Oe(h);
    d.filter((p) => i.has(p)).forEach((p) => u.add(p));
  }), Object.entries(a).forEach(([, h]) => {
    i.has(h) && u.add(h);
  });
  const f = o.filter((h) => !u.has(h.entity_id)).sort((h, d) => Oe(d)[0].length - Oe(h)[0].length), c = e.filter((h) => {
    const d = (h.state || "").toLowerCase();
    if (d !== "unavailable" && d !== "unknown") return !1;
    const p = t[h.entity_id], v = p && p.platform === "group", _ = h.entity_id.startsWith("group.");
    return v || _;
  }).map((h) => {
    var d, p, v;
    return {
      id: h.entity_id,
      state: h.state,
      members: ((d = h.attributes) == null ? void 0 : d.entity_id) ?? ((p = h.attributes) == null ? void 0 : p.lights) ?? null,
      in_group_ids: i.has(h.entity_id),
      reg_platform: ((v = t[h.entity_id]) == null ? void 0 : v.platform) ?? "(not in reg)"
    };
  }), l = {
    total_states: e.length,
    entity_reg_size: Object.keys(t).length,
    reg_group_platform: Object.entries(t).filter(([, h]) => h.platform === "group").map(([h]) => h),
    group_domain_states: e.filter((h) => h.entity_id.startsWith("group.")).map((h) => {
      var d, p;
      return { id: h.entity_id, state: h.state, members: ((d = h.attributes) == null ? void 0 : d.entity_id) ?? ((p = h.attributes) == null ? void 0 : p.lights) ?? null };
    }),
    groups_with_members: n.map((h) => ({
      id: h.entity_id,
      members: Oe(h)[0]
    })),
    hierarchical: o.map((h) => h.entity_id),
    roots: f.map((h) => h.entity_id),
    unavailable_group_candidates: c
  };
  return { roots: f, pairs: a, lookup: r, group_ids: i, _debug: l };
}
const hv = "gv_member_cache_v1";
function kg() {
  try {
    return JSON.parse(localStorage.getItem(hv) || "{}");
  } catch {
    return {};
  }
}
function Ig(e) {
  try {
    localStorage.setItem(hv, JSON.stringify(e));
  } catch {
  }
}
async function hr(e, t) {
  try {
    const r = await e.callWS({ type: t });
    if (Array.isArray(r)) return r;
    const n = Object.values(r || {}).find((i) => Array.isArray(i));
    return n || [];
  } catch (r) {
    return console.warn(`[groups-visualizer] WS ${t} failed:`, r), [];
  }
}
async function Ac(e) {
  const [t, r, n, i] = await Promise.all([
    hr(e, "get_states"),
    hr(e, "config/entity_registry/list"),
    hr(e, "config/area_registry/list"),
    hr(e, "config/label_registry/list")
  ]), a = {};
  r.forEach((b) => {
    b.entity_id && (a[b.entity_id] = b);
  });
  const s = r.filter((b) => {
    var x;
    return b.platform === "group" || ((x = b.entity_id) == null ? void 0 : x.startsWith("group."));
  }).map((b) => b.entity_id);
  (await Promise.all(
    s.map(
      (b) => e.callWS({ type: "config/entity_registry/get", entity_id: b }).catch(() => null)
    )
  )).forEach((b) => {
    b != null && b.entity_id && a[b.entity_id] && (a[b.entity_id].aliases = b.aliases || []);
  });
  const u = {};
  n.forEach((b) => {
    b.area_id && (u[b.area_id] = b);
  }), (await Promise.all(
    n.map(
      (b) => e.callWS({ type: "config/area_registry/get", area_id: b.area_id }).catch(() => null)
    )
  )).forEach((b) => {
    b != null && b.area_id && u[b.area_id] && (u[b.area_id].aliases = b.aliases || []);
  });
  const c = {};
  i.forEach((b) => {
    b.label_id && (c[b.label_id] = b);
  });
  const l = { entities: a, areas: u, labels: c }, h = kg();
  t.forEach((b) => {
    var R, $, q;
    const x = ((R = b.attributes) == null ? void 0 : R.entity_id) ?? (($ = b.attributes) == null ? void 0 : $.lights);
    Array.isArray(x) && x.length > 0 && (h[b.entity_id] = { attr: (q = b.attributes) != null && q.lights ? "lights" : "entity_id", ids: x });
  }), Ig(h);
  const d = t.map((b) => {
    var $, q;
    const x = (($ = b.attributes) == null ? void 0 : $.entity_id) ?? ((q = b.attributes) == null ? void 0 : q.lights);
    if (Array.isArray(x) && x.length > 0) return b;
    const R = h[b.entity_id];
    return R ? { ...b, attributes: { ...b.attributes, [R.attr]: R.ids } } : b;
  }), { roots: p, pairs: v, lookup: _, group_ids: y, _debug: w } = Tg(d, a);
  return { roots: p, pairs: v, lookup: _, group_ids: y, registry: l, _debug: w };
}
function qc(e, t) {
  const r = (t == null ? void 0 : t.show_domains) || {}, n = e.filter((a) => {
    const s = a.entity_id.split(".")[0];
    return Object.keys(r).length === 0 || r[s] === !0;
  }), i = {};
  return n.forEach((a) => {
    const s = Sg(a);
    i[s] || (i[s] = []), i[s].push(a);
  }), i;
}
function $c(e, t) {
  const r = {};
  return Object.entries(e).forEach(([n, i]) => {
    var o;
    const a = t[n], s = a && i.find((u) => u.entity_id === a);
    r[n] = s ? a : (o = i[0]) == null ? void 0 : o.entity_id;
  }), r;
}
function Sc() {
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
var Og = { value: () => {
} };
function Iu() {
  for (var e = 0, t = arguments.length, r = {}, n; e < t; ++e) {
    if (!(n = arguments[e] + "") || n in r || /[\s.]/.test(n)) throw new Error("illegal type: " + n);
    r[n] = [];
  }
  return new xr(r);
}
function xr(e) {
  this._ = e;
}
function Mg(e, t) {
  return e.trim().split(/^|\s+/).map(function(r) {
    var n = "", i = r.indexOf(".");
    if (i >= 0 && (n = r.slice(i + 1), r = r.slice(0, i)), r && !t.hasOwnProperty(r)) throw new Error("unknown type: " + r);
    return { type: r, name: n };
  });
}
xr.prototype = Iu.prototype = {
  constructor: xr,
  on: function(e, t) {
    var r = this._, n = Mg(e + "", r), i, a = -1, s = n.length;
    if (arguments.length < 2) {
      for (; ++a < s; ) if ((i = (e = n[a]).type) && (i = Pg(r[i], e.name))) return i;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++a < s; )
      if (i = (e = n[a]).type) r[i] = Rc(r[i], e.name, t);
      else if (t == null) for (i in r) r[i] = Rc(r[i], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var r in t) e[r] = t[r].slice();
    return new xr(e);
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
function Pg(e, t) {
  for (var r = 0, n = e.length, i; r < n; ++r)
    if ((i = e[r]).name === t)
      return i.value;
}
function Rc(e, t, r) {
  for (var n = 0, i = e.length; n < i; ++n)
    if (e[n].name === t) {
      e[n] = Og, e = e.slice(0, n).concat(e.slice(n + 1));
      break;
    }
  return r != null && e.push({ name: t, value: r }), e;
}
var pu = "http://www.w3.org/1999/xhtml";
const Cc = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: pu,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Dr(e) {
  var t = e += "", r = t.indexOf(":");
  return r >= 0 && (t = e.slice(0, r)) !== "xmlns" && (e = e.slice(r + 1)), Cc.hasOwnProperty(t) ? { space: Cc[t], local: e } : e;
}
function Ng(e) {
  return function() {
    var t = this.ownerDocument, r = this.namespaceURI;
    return r === pu && t.documentElement.namespaceURI === pu ? t.createElement(e) : t.createElementNS(r, e);
  };
}
function Lg(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function dv(e) {
  var t = Dr(e);
  return (t.local ? Lg : Ng)(t);
}
function Fg() {
}
function Ou(e) {
  return e == null ? Fg : function() {
    return this.querySelector(e);
  };
}
function Dg(e) {
  typeof e != "function" && (e = Ou(e));
  for (var t = this._groups, r = t.length, n = new Array(r), i = 0; i < r; ++i)
    for (var a = t[i], s = a.length, o = n[i] = new Array(s), u, f, c = 0; c < s; ++c)
      (u = a[c]) && (f = e.call(u, u.__data__, c, a)) && ("__data__" in u && (f.__data__ = u.__data__), o[c] = f);
  return new ce(n, this._parents);
}
function zg(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function jg() {
  return [];
}
function pv(e) {
  return e == null ? jg : function() {
    return this.querySelectorAll(e);
  };
}
function Gg(e) {
  return function() {
    return zg(e.apply(this, arguments));
  };
}
function Ug(e) {
  typeof e == "function" ? e = Gg(e) : e = pv(e);
  for (var t = this._groups, r = t.length, n = [], i = [], a = 0; a < r; ++a)
    for (var s = t[a], o = s.length, u, f = 0; f < o; ++f)
      (u = s[f]) && (n.push(e.call(u, u.__data__, f, s)), i.push(u));
  return new ce(n, i);
}
function vv(e) {
  return function() {
    return this.matches(e);
  };
}
function _v(e) {
  return function(t) {
    return t.matches(e);
  };
}
var Bg = Array.prototype.find;
function Hg(e) {
  return function() {
    return Bg.call(this.children, e);
  };
}
function Vg() {
  return this.firstElementChild;
}
function Kg(e) {
  return this.select(e == null ? Vg : Hg(typeof e == "function" ? e : _v(e)));
}
var Wg = Array.prototype.filter;
function Yg() {
  return Array.from(this.children);
}
function Xg(e) {
  return function() {
    return Wg.call(this.children, e);
  };
}
function Zg(e) {
  return this.selectAll(e == null ? Yg : Xg(typeof e == "function" ? e : _v(e)));
}
function Jg(e) {
  typeof e != "function" && (e = vv(e));
  for (var t = this._groups, r = t.length, n = new Array(r), i = 0; i < r; ++i)
    for (var a = t[i], s = a.length, o = n[i] = [], u, f = 0; f < s; ++f)
      (u = a[f]) && e.call(u, u.__data__, f, a) && o.push(u);
  return new ce(n, this._parents);
}
function gv(e) {
  return new Array(e.length);
}
function Qg() {
  return new ce(this._enter || this._groups.map(gv), this._parents);
}
function Sr(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
Sr.prototype = {
  constructor: Sr,
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
    (o = t[s]) ? (o.__data__ = a[s], n[s] = o) : r[s] = new Sr(e, a[s]);
  for (; s < u; ++s)
    (o = t[s]) && (i[s] = o);
}
function ry(e, t, r, n, i, a, s) {
  var o, u, f = /* @__PURE__ */ new Map(), c = t.length, l = a.length, h = new Array(c), d;
  for (o = 0; o < c; ++o)
    (u = t[o]) && (h[o] = d = s.call(u, u.__data__, o, t) + "", f.has(d) ? i[o] = u : f.set(d, u));
  for (o = 0; o < l; ++o)
    d = s.call(e, a[o], o, a) + "", (u = f.get(d)) ? (n[o] = u, u.__data__ = a[o], f.delete(d)) : r[o] = new Sr(e, a[o]);
  for (o = 0; o < c; ++o)
    (u = t[o]) && f.get(h[o]) === u && (i[o] = u);
}
function ny(e) {
  return e.__data__;
}
function iy(e, t) {
  if (!arguments.length) return Array.from(this, ny);
  var r = t ? ry : ty, n = this._parents, i = this._groups;
  typeof e != "function" && (e = ey(e));
  for (var a = i.length, s = new Array(a), o = new Array(a), u = new Array(a), f = 0; f < a; ++f) {
    var c = n[f], l = i[f], h = l.length, d = ay(e.call(c, c && c.__data__, f, n)), p = d.length, v = o[f] = new Array(p), _ = s[f] = new Array(p), y = u[f] = new Array(h);
    r(c, l, v, _, y, d, t);
    for (var w = 0, b = 0, x, R; w < p; ++w)
      if (x = v[w]) {
        for (w >= b && (b = w + 1); !(R = _[b]) && ++b < p; ) ;
        x._next = R || null;
      }
  }
  return s = new ce(s, n), s._enter = o, s._exit = u, s;
}
function ay(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function sy() {
  return new ce(this._exit || this._groups.map(gv), this._parents);
}
function oy(e, t, r) {
  var n = this.enter(), i = this, a = this.exit();
  return typeof e == "function" ? (n = e(n), n && (n = n.selection())) : n = n.append(e + ""), t != null && (i = t(i), i && (i = i.selection())), r == null ? a.remove() : r(a), n && i ? n.merge(i).order() : i;
}
function uy(e) {
  for (var t = e.selection ? e.selection() : e, r = this._groups, n = t._groups, i = r.length, a = n.length, s = Math.min(i, a), o = new Array(i), u = 0; u < s; ++u)
    for (var f = r[u], c = n[u], l = f.length, h = o[u] = new Array(l), d, p = 0; p < l; ++p)
      (d = f[p] || c[p]) && (h[p] = d);
  for (; u < i; ++u)
    o[u] = r[u];
  return new ce(o, this._parents);
}
function cy() {
  for (var e = this._groups, t = -1, r = e.length; ++t < r; )
    for (var n = e[t], i = n.length - 1, a = n[i], s; --i >= 0; )
      (s = n[i]) && (a && s.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(s, a), a = s);
  return this;
}
function fy(e) {
  e || (e = ly);
  function t(l, h) {
    return l && h ? e(l.__data__, h.__data__) : !l - !h;
  }
  for (var r = this._groups, n = r.length, i = new Array(n), a = 0; a < n; ++a) {
    for (var s = r[a], o = s.length, u = i[a] = new Array(o), f, c = 0; c < o; ++c)
      (f = s[c]) && (u[c] = f);
    u.sort(t);
  }
  return new ce(i, this._parents).order();
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
function _y() {
  return !this.node();
}
function gy(e) {
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
function wy(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function xy(e, t) {
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
  var r = Dr(e);
  if (arguments.length < 2) {
    var n = this.node();
    return r.local ? n.getAttributeNS(r.space, r.local) : n.getAttribute(r);
  }
  return this.each((t == null ? r.local ? by : yy : typeof t == "function" ? r.local ? Ey : xy : r.local ? wy : my)(r, t));
}
function yv(e) {
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
function Ry(e, t, r) {
  return arguments.length > 1 ? this.each((t == null ? qy : typeof t == "function" ? Sy : $y)(e, t, r ?? "")) : At(this.node(), e);
}
function At(e, t) {
  return e.style.getPropertyValue(t) || yv(e).getComputedStyle(e, null).getPropertyValue(t);
}
function Cy(e) {
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
  return arguments.length > 1 ? this.each((t == null ? Cy : typeof t == "function" ? ky : Ty)(e, t)) : this.node()[e];
}
function bv(e) {
  return e.trim().split(/^|\s+/);
}
function Mu(e) {
  return e.classList || new mv(e);
}
function mv(e) {
  this._node = e, this._names = bv(e.getAttribute("class") || "");
}
mv.prototype = {
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
  for (var r = Mu(e), n = -1, i = t.length; ++n < i; ) r.add(t[n]);
}
function xv(e, t) {
  for (var r = Mu(e), n = -1, i = t.length; ++n < i; ) r.remove(t[n]);
}
function Oy(e) {
  return function() {
    wv(this, e);
  };
}
function My(e) {
  return function() {
    xv(this, e);
  };
}
function Py(e, t) {
  return function() {
    (t.apply(this, arguments) ? wv : xv)(this, e);
  };
}
function Ny(e, t) {
  var r = bv(e + "");
  if (arguments.length < 2) {
    for (var n = Mu(this.node()), i = -1, a = r.length; ++i < a; ) if (!n.contains(r[i])) return !1;
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
function Gy(e) {
  return function() {
    this.innerHTML = e;
  };
}
function Uy(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function By(e) {
  return arguments.length ? this.each(e == null ? jy : (typeof e == "function" ? Uy : Gy)(e)) : this.node().innerHTML;
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
  var t = typeof e == "function" ? e : dv(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function Xy() {
  return null;
}
function Zy(e, t) {
  var r = typeof e == "function" ? e : dv(e), n = t == null ? Xy : typeof t == "function" ? t : Ou(t);
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
function Ev(e, t, r) {
  var n = yv(e), i = n.CustomEvent;
  typeof i == "function" ? i = new i(t, r) : (i = n.document.createEvent("Event"), r ? (i.initEvent(t, r.bubbles, r.cancelable), i.detail = r.detail) : i.initEvent(t, !1, !1)), e.dispatchEvent(i);
}
function cb(e, t) {
  return function() {
    return Ev(this, e, t);
  };
}
function fb(e, t) {
  return function() {
    return Ev(this, e, t.apply(this, arguments));
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
var Av = [null];
function ce(e, t) {
  this._groups = e, this._parents = t;
}
function er() {
  return new ce([[document.documentElement]], Av);
}
function db() {
  return this;
}
ce.prototype = er.prototype = {
  constructor: ce,
  select: Dg,
  selectAll: Ug,
  selectChild: Kg,
  selectChildren: Zg,
  filter: Jg,
  data: iy,
  enter: Qg,
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
  empty: _y,
  each: gy,
  attr: Ay,
  style: Ry,
  property: Iy,
  classed: Ny,
  text: zy,
  html: By,
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
function we(e) {
  return typeof e == "string" ? new ce([[document.querySelector(e)]], [document.documentElement]) : new ce([[e]], Av);
}
function pb(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function et(e, t) {
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
const vu = { capture: !0, passive: !1 };
function _u(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function vb(e) {
  var t = e.document.documentElement, r = we(e).on("dragstart.drag", _u, vu);
  "onselectstart" in t ? r.on("selectstart.drag", _u, vu) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function _b(e, t) {
  var r = e.document.documentElement, n = we(e).on("dragstart.drag", null);
  t && (n.on("click.drag", _u, vu), setTimeout(function() {
    n.on("click.drag", null);
  }, 0)), "onselectstart" in r ? n.on("selectstart.drag", null) : (r.style.MozUserSelect = r.__noselect, delete r.__noselect);
}
function Pu(e, t, r) {
  e.prototype = t.prototype = r, r.constructor = e;
}
function qv(e, t) {
  var r = Object.create(e.prototype);
  for (var n in t) r[n] = t[n];
  return r;
}
function tr() {
}
var Yt = 0.7, Rr = 1 / Yt, mt = "\\s*([+-]?\\d+)\\s*", Xt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Ee = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", gb = /^#([0-9a-f]{3,8})$/, yb = new RegExp(`^rgb\\(${mt},${mt},${mt}\\)$`), bb = new RegExp(`^rgb\\(${Ee},${Ee},${Ee}\\)$`), mb = new RegExp(`^rgba\\(${mt},${mt},${mt},${Xt}\\)$`), wb = new RegExp(`^rgba\\(${Ee},${Ee},${Ee},${Xt}\\)$`), xb = new RegExp(`^hsl\\(${Xt},${Ee},${Ee}\\)$`), Eb = new RegExp(`^hsla\\(${Xt},${Ee},${Ee},${Xt}\\)$`), Tc = {
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
Pu(tr, Zt, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: kc,
  // Deprecated! Use color.formatHex.
  formatHex: kc,
  formatHex8: Ab,
  formatHsl: qb,
  formatRgb: Ic,
  toString: Ic
});
function kc() {
  return this.rgb().formatHex();
}
function Ab() {
  return this.rgb().formatHex8();
}
function qb() {
  return $v(this).formatHsl();
}
function Ic() {
  return this.rgb().formatRgb();
}
function Zt(e) {
  var t, r;
  return e = (e + "").trim().toLowerCase(), (t = gb.exec(e)) ? (r = t[1].length, t = parseInt(t[1], 16), r === 6 ? Oc(t) : r === 3 ? new ae(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : r === 8 ? dr(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : r === 4 ? dr(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = yb.exec(e)) ? new ae(t[1], t[2], t[3], 1) : (t = bb.exec(e)) ? new ae(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = mb.exec(e)) ? dr(t[1], t[2], t[3], t[4]) : (t = wb.exec(e)) ? dr(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = xb.exec(e)) ? Nc(t[1], t[2] / 100, t[3] / 100, 1) : (t = Eb.exec(e)) ? Nc(t[1], t[2] / 100, t[3] / 100, t[4]) : Tc.hasOwnProperty(e) ? Oc(Tc[e]) : e === "transparent" ? new ae(NaN, NaN, NaN, 0) : null;
}
function Oc(e) {
  return new ae(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function dr(e, t, r, n) {
  return n <= 0 && (e = t = r = NaN), new ae(e, t, r, n);
}
function $b(e) {
  return e instanceof tr || (e = Zt(e)), e ? (e = e.rgb(), new ae(e.r, e.g, e.b, e.opacity)) : new ae();
}
function gu(e, t, r, n) {
  return arguments.length === 1 ? $b(e) : new ae(e, t, r, n ?? 1);
}
function ae(e, t, r, n) {
  this.r = +e, this.g = +t, this.b = +r, this.opacity = +n;
}
Pu(ae, gu, qv(tr, {
  brighter(e) {
    return e = e == null ? Rr : Math.pow(Rr, e), new ae(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Yt : Math.pow(Yt, e), new ae(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new ae(ut(this.r), ut(this.g), ut(this.b), Cr(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Mc,
  // Deprecated! Use color.formatHex.
  formatHex: Mc,
  formatHex8: Sb,
  formatRgb: Pc,
  toString: Pc
}));
function Mc() {
  return `#${it(this.r)}${it(this.g)}${it(this.b)}`;
}
function Sb() {
  return `#${it(this.r)}${it(this.g)}${it(this.b)}${it((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Pc() {
  const e = Cr(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${ut(this.r)}, ${ut(this.g)}, ${ut(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Cr(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function ut(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function it(e) {
  return e = ut(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Nc(e, t, r, n) {
  return n <= 0 ? e = t = r = NaN : r <= 0 || r >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new ve(e, t, r, n);
}
function $v(e) {
  if (e instanceof ve) return new ve(e.h, e.s, e.l, e.opacity);
  if (e instanceof tr || (e = Zt(e)), !e) return new ve();
  if (e instanceof ve) return e;
  e = e.rgb();
  var t = e.r / 255, r = e.g / 255, n = e.b / 255, i = Math.min(t, r, n), a = Math.max(t, r, n), s = NaN, o = a - i, u = (a + i) / 2;
  return o ? (t === a ? s = (r - n) / o + (r < n) * 6 : r === a ? s = (n - t) / o + 2 : s = (t - r) / o + 4, o /= u < 0.5 ? a + i : 2 - a - i, s *= 60) : o = u > 0 && u < 1 ? 0 : s, new ve(s, o, u, e.opacity);
}
function Rb(e, t, r, n) {
  return arguments.length === 1 ? $v(e) : new ve(e, t, r, n ?? 1);
}
function ve(e, t, r, n) {
  this.h = +e, this.s = +t, this.l = +r, this.opacity = +n;
}
Pu(ve, Rb, qv(tr, {
  brighter(e) {
    return e = e == null ? Rr : Math.pow(Rr, e), new ve(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Yt : Math.pow(Yt, e), new ve(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, r = this.l, n = r + (r < 0.5 ? r : 1 - r) * t, i = 2 * r - n;
    return new ae(
      _n(e >= 240 ? e - 240 : e + 120, i, n),
      _n(e, i, n),
      _n(e < 120 ? e + 240 : e - 120, i, n),
      this.opacity
    );
  },
  clamp() {
    return new ve(Lc(this.h), pr(this.s), pr(this.l), Cr(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = Cr(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Lc(this.h)}, ${pr(this.s) * 100}%, ${pr(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Lc(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function pr(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function _n(e, t, r) {
  return (e < 60 ? t + (r - t) * e / 60 : e < 180 ? r : e < 240 ? t + (r - t) * (240 - e) / 60 : t) * 255;
}
const Sv = (e) => () => e;
function Cb(e, t) {
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
    return r - t ? Tb(t, r, e) : Sv(isNaN(t) ? r : t);
  };
}
function Rv(e, t) {
  var r = t - e;
  return r ? Cb(e, r) : Sv(isNaN(e) ? t : e);
}
const Fc = function e(t) {
  var r = kb(t);
  function n(i, a) {
    var s = r((i = gu(i)).r, (a = gu(a)).r), o = r(i.g, a.g), u = r(i.b, a.b), f = Rv(i.opacity, a.opacity);
    return function(c) {
      return i.r = s(c), i.g = o(c), i.b = u(c), i.opacity = f(c), i + "";
    };
  }
  return n.gamma = e, n;
}(1);
function He(e, t) {
  return e = +e, t = +t, function(r) {
    return e * (1 - r) + t * r;
  };
}
var yu = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, gn = new RegExp(yu.source, "g");
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
  var r = yu.lastIndex = gn.lastIndex = 0, n, i, a, s = -1, o = [], u = [];
  for (e = e + "", t = t + ""; (n = yu.exec(e)) && (i = gn.exec(t)); )
    (a = i.index) > r && (a = t.slice(r, a), o[s] ? o[s] += a : o[++s] = a), (n = n[0]) === (i = i[0]) ? o[s] ? o[s] += i : o[++s] = i : (o[++s] = null, u.push({ i: s, x: He(n, i) })), r = gn.lastIndex;
  return r < t.length && (a = t.slice(r), o[s] ? o[s] += a : o[++s] = a), o.length < 2 ? u[0] ? Ob(u[0].x) : Ib(t) : (t = u.length, function(f) {
    for (var c = 0, l; c < t; ++c) o[(l = u[c]).i] = l.x(f);
    return o.join("");
  });
}
var Dc = 180 / Math.PI, bu = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Cv(e, t, r, n, i, a) {
  var s, o, u;
  return (s = Math.sqrt(e * e + t * t)) && (e /= s, t /= s), (u = e * r + t * n) && (r -= e * u, n -= t * u), (o = Math.sqrt(r * r + n * n)) && (r /= o, n /= o, u /= o), e * n < t * r && (e = -e, t = -t, u = -u, s = -s), {
    translateX: i,
    translateY: a,
    rotate: Math.atan2(t, e) * Dc,
    skewX: Math.atan(u) * Dc,
    scaleX: s,
    scaleY: o
  };
}
var vr;
function Pb(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? bu : Cv(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Nb(e) {
  return e == null || (vr || (vr = document.createElementNS("http://www.w3.org/2000/svg", "g")), vr.setAttribute("transform", e), !(e = vr.transform.baseVal.consolidate())) ? bu : (e = e.matrix, Cv(e.a, e.b, e.c, e.d, e.e, e.f));
}
function Tv(e, t, r, n) {
  function i(f) {
    return f.length ? f.pop() + " " : "";
  }
  function a(f, c, l, h, d, p) {
    if (f !== l || c !== h) {
      var v = d.push("translate(", null, t, null, r);
      p.push({ i: v - 4, x: He(f, l) }, { i: v - 2, x: He(c, h) });
    } else (l || h) && d.push("translate(" + l + t + h + r);
  }
  function s(f, c, l, h) {
    f !== c ? (f - c > 180 ? c += 360 : c - f > 180 && (f += 360), h.push({ i: l.push(i(l) + "rotate(", null, n) - 2, x: He(f, c) })) : c && l.push(i(l) + "rotate(" + c + n);
  }
  function o(f, c, l, h) {
    f !== c ? h.push({ i: l.push(i(l) + "skewX(", null, n) - 2, x: He(f, c) }) : c && l.push(i(l) + "skewX(" + c + n);
  }
  function u(f, c, l, h, d, p) {
    if (f !== l || c !== h) {
      var v = d.push(i(d) + "scale(", null, ",", null, ")");
      p.push({ i: v - 4, x: He(f, l) }, { i: v - 2, x: He(c, h) });
    } else (l !== 1 || h !== 1) && d.push(i(d) + "scale(" + l + "," + h + ")");
  }
  return function(f, c) {
    var l = [], h = [];
    return f = e(f), c = e(c), a(f.translateX, f.translateY, c.translateX, c.translateY, l, h), s(f.rotate, c.rotate, l, h), o(f.skewX, c.skewX, l, h), u(f.scaleX, f.scaleY, c.scaleX, c.scaleY, l, h), f = c = null, function(d) {
      for (var p = -1, v = h.length, _; ++p < v; ) l[(_ = h[p]).i] = _.x(d);
      return l.join("");
    };
  };
}
var Lb = Tv(Pb, "px, ", "px)", "deg)"), Fb = Tv(Nb, ", ", ")", ")"), Db = 1e-12;
function zc(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function zb(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function jb(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Gb = function e(t, r, n) {
  function i(a, s) {
    var o = a[0], u = a[1], f = a[2], c = s[0], l = s[1], h = s[2], d = c - o, p = l - u, v = d * d + p * p, _, y;
    if (v < Db)
      y = Math.log(h / f) / t, _ = function(q) {
        return [
          o + q * d,
          u + q * p,
          f * Math.exp(t * q * y)
        ];
      };
    else {
      var w = Math.sqrt(v), b = (h * h - f * f + n * v) / (2 * f * r * w), x = (h * h - f * f - n * v) / (2 * h * r * w), R = Math.log(Math.sqrt(b * b + 1) - b), $ = Math.log(Math.sqrt(x * x + 1) - x);
      y = ($ - R) / t, _ = function(q) {
        var k = q * y, F = zc(R), P = f / (r * w) * (F * jb(t * k + R) - zb(R));
        return [
          o + P * d,
          u + P * p,
          f * F / zc(t * k + R)
        ];
      };
    }
    return _.duration = y * 1e3 * t / Math.SQRT2, _;
  }
  return i.rho = function(a) {
    var s = Math.max(1e-3, +a), o = s * s, u = o * o;
    return e(s, o, u);
  }, i;
}(Math.SQRT2, 2, 4);
var qt = 0, Pt = 0, Ot = 0, kv = 1e3, Tr, Nt, kr = 0, ft = 0, zr = 0, Jt = typeof performance == "object" && performance.now ? performance : Date, Iv = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function Nu() {
  return ft || (Iv(Ub), ft = Jt.now() + zr);
}
function Ub() {
  ft = 0;
}
function Ir() {
  this._call = this._time = this._next = null;
}
Ir.prototype = Ov.prototype = {
  constructor: Ir,
  restart: function(e, t, r) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    r = (r == null ? Nu() : +r) + (t == null ? 0 : +t), !this._next && Nt !== this && (Nt ? Nt._next = this : Tr = this, Nt = this), this._call = e, this._time = r, mu();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, mu());
  }
};
function Ov(e, t, r) {
  var n = new Ir();
  return n.restart(e, t, r), n;
}
function Bb() {
  Nu(), ++qt;
  for (var e = Tr, t; e; )
    (t = ft - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --qt;
}
function jc() {
  ft = (kr = Jt.now()) + zr, qt = Pt = 0;
  try {
    Bb();
  } finally {
    qt = 0, Vb(), ft = 0;
  }
}
function Hb() {
  var e = Jt.now(), t = e - kr;
  t > kv && (zr -= t, kr = e);
}
function Vb() {
  for (var e, t = Tr, r, n = 1 / 0; t; )
    t._call ? (n > t._time && (n = t._time), e = t, t = t._next) : (r = t._next, t._next = null, t = e ? e._next = r : Tr = r);
  Nt = e, mu(n);
}
function mu(e) {
  if (!qt) {
    Pt && (Pt = clearTimeout(Pt));
    var t = e - ft;
    t > 24 ? (e < 1 / 0 && (Pt = setTimeout(jc, e - Jt.now() - zr)), Ot && (Ot = clearInterval(Ot))) : (Ot || (kr = Jt.now(), Ot = setInterval(Hb, kv)), qt = 1, Iv(jc));
  }
}
function Gc(e, t, r) {
  var n = new Ir();
  return t = t == null ? 0 : +t, n.restart((i) => {
    n.stop(), e(i + t);
  }, t, r), n;
}
var Kb = Iu("start", "end", "cancel", "interrupt"), Wb = [], Mv = 0, Uc = 1, wu = 2, Er = 3, Bc = 4, xu = 5, Ar = 6;
function jr(e, t, r, n, i, a) {
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
    state: Mv
  });
}
function Lu(e, t) {
  var r = _e(e, t);
  if (r.state > Mv) throw new Error("too late; already scheduled");
  return r;
}
function Ae(e, t) {
  var r = _e(e, t);
  if (r.state > Er) throw new Error("too late; already running");
  return r;
}
function _e(e, t) {
  var r = e.__transition;
  if (!r || !(r = r[t])) throw new Error("transition not found");
  return r;
}
function Yb(e, t, r) {
  var n = e.__transition, i;
  n[t] = r, r.timer = Ov(a, 0, r.time);
  function a(f) {
    r.state = Uc, r.timer.restart(s, r.delay, r.time), r.delay <= f && s(f - r.delay);
  }
  function s(f) {
    var c, l, h, d;
    if (r.state !== Uc) return u();
    for (c in n)
      if (d = n[c], d.name === r.name) {
        if (d.state === Er) return Gc(s);
        d.state === Bc ? (d.state = Ar, d.timer.stop(), d.on.call("interrupt", e, e.__data__, d.index, d.group), delete n[c]) : +c < t && (d.state = Ar, d.timer.stop(), d.on.call("cancel", e, e.__data__, d.index, d.group), delete n[c]);
      }
    if (Gc(function() {
      r.state === Er && (r.state = Bc, r.timer.restart(o, r.delay, r.time), o(f));
    }), r.state = wu, r.on.call("start", e, e.__data__, r.index, r.group), r.state === wu) {
      for (r.state = Er, i = new Array(h = r.tween.length), c = 0, l = -1; c < h; ++c)
        (d = r.tween[c].value.call(e, e.__data__, r.index, r.group)) && (i[++l] = d);
      i.length = l + 1;
    }
  }
  function o(f) {
    for (var c = f < r.duration ? r.ease.call(null, f / r.duration) : (r.timer.restart(u), r.state = xu, 1), l = -1, h = i.length; ++l < h; )
      i[l].call(e, c);
    r.state === xu && (r.on.call("end", e, e.__data__, r.index, r.group), u());
  }
  function u() {
    r.state = Ar, r.timer.stop(), delete n[t];
    for (var f in n) return;
    delete e.__transition;
  }
}
function qr(e, t) {
  var r = e.__transition, n, i, a = !0, s;
  if (r) {
    t = t == null ? null : t + "";
    for (s in r) {
      if ((n = r[s]).name !== t) {
        a = !1;
        continue;
      }
      i = n.state > wu && n.state < xu, n.state = Ar, n.timer.stop(), n.on.call(i ? "interrupt" : "cancel", e, e.__data__, n.index, n.group), delete r[s];
    }
    a && delete e.__transition;
  }
}
function Xb(e) {
  return this.each(function() {
    qr(this, e);
  });
}
function Zb(e, t) {
  var r, n;
  return function() {
    var i = Ae(this, e), a = i.tween;
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
    var a = Ae(this, e), s = a.tween;
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
    for (var n = _e(this.node(), r).tween, i = 0, a = n.length, s; i < a; ++i)
      if ((s = n[i]).name === e)
        return s.value;
    return null;
  }
  return this.each((t == null ? Zb : Jb)(r, e, t));
}
function Fu(e, t, r) {
  var n = e._id;
  return e.each(function() {
    var i = Ae(this, n);
    (i.value || (i.value = {}))[t] = r.apply(this, arguments);
  }), function(i) {
    return _e(i, n).value[t];
  };
}
function Pv(e, t) {
  var r;
  return (typeof t == "number" ? He : t instanceof Zt ? Fc : (r = Zt(t)) ? (t = r, Fc) : Mb)(e, t);
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
  var r = Dr(e), n = r === "transform" ? Fb : Pv;
  return this.attrTween(e, typeof t == "function" ? (r.local ? am : im)(r, n, Fu(this, "attr." + e, t)) : t == null ? (r.local ? tm : em)(r) : (r.local ? nm : rm)(r, n, t));
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
  var n = Dr(e);
  return this.tween(r, (n.local ? cm : fm)(n, t));
}
function hm(e, t) {
  return function() {
    Lu(this, e).delay = +t.apply(this, arguments);
  };
}
function dm(e, t) {
  return t = +t, function() {
    Lu(this, e).delay = t;
  };
}
function pm(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? hm : dm)(t, e)) : _e(this.node(), t).delay;
}
function vm(e, t) {
  return function() {
    Ae(this, e).duration = +t.apply(this, arguments);
  };
}
function _m(e, t) {
  return t = +t, function() {
    Ae(this, e).duration = t;
  };
}
function gm(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? vm : _m)(t, e)) : _e(this.node(), t).duration;
}
function ym(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    Ae(this, e).ease = t;
  };
}
function bm(e) {
  var t = this._id;
  return arguments.length ? this.each(ym(t, e)) : _e(this.node(), t).ease;
}
function mm(e, t) {
  return function() {
    var r = t.apply(this, arguments);
    if (typeof r != "function") throw new Error();
    Ae(this, e).ease = r;
  };
}
function wm(e) {
  if (typeof e != "function") throw new Error();
  return this.each(mm(this._id, e));
}
function xm(e) {
  typeof e != "function" && (e = vv(e));
  for (var t = this._groups, r = t.length, n = new Array(r), i = 0; i < r; ++i)
    for (var a = t[i], s = a.length, o = n[i] = [], u, f = 0; f < s; ++f)
      (u = a[f]) && e.call(u, u.__data__, f, a) && o.push(u);
  return new Le(n, this._parents, this._name, this._id);
}
function Em(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, r = e._groups, n = t.length, i = r.length, a = Math.min(n, i), s = new Array(n), o = 0; o < a; ++o)
    for (var u = t[o], f = r[o], c = u.length, l = s[o] = new Array(c), h, d = 0; d < c; ++d)
      (h = u[d] || f[d]) && (l[d] = h);
  for (; o < n; ++o)
    s[o] = t[o];
  return new Le(s, this._parents, this._name, this._id);
}
function Am(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var r = t.indexOf(".");
    return r >= 0 && (t = t.slice(0, r)), !t || t === "start";
  });
}
function qm(e, t, r) {
  var n, i, a = Am(t) ? Lu : Ae;
  return function() {
    var s = a(this, e), o = s.on;
    o !== n && (i = (n = o).copy()).on(t, r), s.on = i;
  };
}
function $m(e, t) {
  var r = this._id;
  return arguments.length < 2 ? _e(this.node(), r).on.on(e) : this.each(qm(r, e, t));
}
function Sm(e) {
  return function() {
    var t = this.parentNode;
    for (var r in this.__transition) if (+r !== e) return;
    t && t.removeChild(this);
  };
}
function Rm() {
  return this.on("end.remove", Sm(this._id));
}
function Cm(e) {
  var t = this._name, r = this._id;
  typeof e != "function" && (e = Ou(e));
  for (var n = this._groups, i = n.length, a = new Array(i), s = 0; s < i; ++s)
    for (var o = n[s], u = o.length, f = a[s] = new Array(u), c, l, h = 0; h < u; ++h)
      (c = o[h]) && (l = e.call(c, c.__data__, h, o)) && ("__data__" in c && (l.__data__ = c.__data__), f[h] = l, jr(f[h], t, r, h, f, _e(c, r)));
  return new Le(a, this._parents, t, r);
}
function Tm(e) {
  var t = this._name, r = this._id;
  typeof e != "function" && (e = pv(e));
  for (var n = this._groups, i = n.length, a = [], s = [], o = 0; o < i; ++o)
    for (var u = n[o], f = u.length, c, l = 0; l < f; ++l)
      if (c = u[l]) {
        for (var h = e.call(c, c.__data__, l, u), d, p = _e(c, r), v = 0, _ = h.length; v < _; ++v)
          (d = h[v]) && jr(d, t, r, v, h, p);
        a.push(h), s.push(c);
      }
  return new Le(a, s, t, r);
}
var km = er.prototype.constructor;
function Im() {
  return new km(this._groups, this._parents);
}
function Om(e, t) {
  var r, n, i;
  return function() {
    var a = At(this, e), s = (this.style.removeProperty(e), At(this, e));
    return a === s ? null : a === r && s === n ? i : i = t(r = a, n = s);
  };
}
function Nv(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Mm(e, t, r) {
  var n, i = r + "", a;
  return function() {
    var s = At(this, e);
    return s === i ? null : s === n ? a : a = t(n = s, r);
  };
}
function Pm(e, t, r) {
  var n, i, a;
  return function() {
    var s = At(this, e), o = r(this), u = o + "";
    return o == null && (u = o = (this.style.removeProperty(e), At(this, e))), s === u ? null : s === n && u === i ? a : (i = u, a = t(n = s, o));
  };
}
function Nm(e, t) {
  var r, n, i, a = "style." + t, s = "end." + a, o;
  return function() {
    var u = Ae(this, e), f = u.on, c = u.value[a] == null ? o || (o = Nv(t)) : void 0;
    (f !== r || i !== c) && (n = (r = f).copy()).on(s, i = c), u.on = n;
  };
}
function Lm(e, t, r) {
  var n = (e += "") == "transform" ? Lb : Pv;
  return t == null ? this.styleTween(e, Om(e, n)).on("end.style." + e, Nv(e)) : typeof t == "function" ? this.styleTween(e, Pm(e, n, Fu(this, "style." + e, t))).each(Nm(this._id, e)) : this.styleTween(e, Mm(e, n, t), r).on("end.style." + e, null);
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
function Gm(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function Um(e) {
  return this.tween("text", typeof e == "function" ? Gm(Fu(this, "text", e)) : jm(e == null ? "" : e + ""));
}
function Bm(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function Hm(e) {
  var t, r;
  function n() {
    var i = e.apply(this, arguments);
    return i !== r && (t = (r = i) && Bm(i)), t;
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
  for (var e = this._name, t = this._id, r = Lv(), n = this._groups, i = n.length, a = 0; a < i; ++a)
    for (var s = n[a], o = s.length, u, f = 0; f < o; ++f)
      if (u = s[f]) {
        var c = _e(u, t);
        jr(u, e, r, f, s, {
          time: c.time + c.delay + c.duration,
          delay: 0,
          duration: c.duration,
          ease: c.ease
        });
      }
  return new Le(n, this._parents, e, r);
}
function Wm() {
  var e, t, r = this, n = r._id, i = r.size();
  return new Promise(function(a, s) {
    var o = { value: s }, u = { value: function() {
      --i === 0 && a();
    } };
    r.each(function() {
      var f = Ae(this, n), c = f.on;
      c !== e && (t = (e = c).copy(), t._.cancel.push(o), t._.interrupt.push(o), t._.end.push(u)), f.on = t;
    }), i === 0 && a();
  });
}
var Ym = 0;
function Le(e, t, r, n) {
  this._groups = e, this._parents = t, this._name = r, this._id = n;
}
function Lv() {
  return ++Ym;
}
var ke = er.prototype;
Le.prototype = {
  constructor: Le,
  select: Cm,
  selectAll: Tm,
  selectChild: ke.selectChild,
  selectChildren: ke.selectChildren,
  filter: xm,
  merge: Em,
  selection: Im,
  transition: Km,
  call: ke.call,
  nodes: ke.nodes,
  node: ke.node,
  size: ke.size,
  empty: ke.empty,
  each: ke.each,
  on: $m,
  attr: sm,
  attrTween: lm,
  style: Lm,
  styleTween: zm,
  text: Um,
  textTween: Vm,
  remove: Rm,
  tween: Qb,
  delay: pm,
  duration: gm,
  ease: bm,
  easeVarying: wm,
  end: Wm,
  [Symbol.iterator]: ke[Symbol.iterator]
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
  e instanceof Le ? (t = e._id, e = e._name) : (t = Lv(), (r = Zm).time = Nu(), e = e == null ? null : e + "");
  for (var n = this._groups, i = n.length, a = 0; a < i; ++a)
    for (var s = n[a], o = s.length, u, f = 0; f < o; ++f)
      (u = s[f]) && jr(u, e, t, f, s, r || Jm(u, t));
  return new Le(n, this._parents, e, t);
}
er.prototype.interrupt = Xb;
er.prototype.transition = Qm;
const Eu = Math.PI, Au = 2 * Eu, rt = 1e-6, e0 = Au - rt;
function Fv(e) {
  this._ += e[0];
  for (let t = 1, r = e.length; t < r; ++t)
    this._ += arguments[t] + e[t];
}
function t0(e) {
  let t = Math.floor(e);
  if (!(t >= 0)) throw new Error(`invalid digits: ${e}`);
  if (t > 15) return Fv;
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
    this._x1 = this._y1 = null, this._ = "", this._append = t == null ? Fv : t0(t);
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
    let s = this._x1, o = this._y1, u = n - t, f = i - r, c = s - t, l = o - r, h = c * c + l * l;
    if (this._x1 === null)
      this._append`M${this._x1 = t},${this._y1 = r}`;
    else if (h > rt) if (!(Math.abs(l * u - f * c) > rt) || !a)
      this._append`L${this._x1 = t},${this._y1 = r}`;
    else {
      let d = n - s, p = i - o, v = u * u + f * f, _ = d * d + p * p, y = Math.sqrt(v), w = Math.sqrt(h), b = a * Math.tan((Eu - Math.acos((v + h - _) / (2 * y * w))) / 2), x = b / w, R = b / y;
      Math.abs(x - 1) > rt && this._append`L${t + x * c},${r + x * l}`, this._append`A${a},${a},0,0,${+(l * d > c * p)},${this._x1 = t + R * u},${this._y1 = r + R * f}`;
    }
  }
  arc(t, r, n, i, a, s) {
    if (t = +t, r = +r, n = +n, s = !!s, n < 0) throw new Error(`negative radius: ${n}`);
    let o = n * Math.cos(i), u = n * Math.sin(i), f = t + o, c = r + u, l = 1 ^ s, h = s ? i - a : a - i;
    this._x1 === null ? this._append`M${f},${c}` : (Math.abs(this._x1 - f) > rt || Math.abs(this._y1 - c) > rt) && this._append`L${f},${c}`, n && (h < 0 && (h = h % Au + Au), h > e0 ? this._append`A${n},${n},0,1,${l},${t - o},${r - u}A${n},${n},0,1,${l},${this._x1 = f},${this._y1 = c}` : h > rt && this._append`A${n},${n},0,${+(h >= Eu)},${l},${this._x1 = t + n * Math.cos(a)},${this._y1 = r + n * Math.sin(a)}`);
  }
  rect(t, r, n, i) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +r}h${n = +n}v${+i}h${-n}Z`;
  }
  toString() {
    return this._;
  }
}
function gt(e) {
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
function Dv(e) {
  this._context = e;
}
Dv.prototype = {
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
function zv(e) {
  return new Dv(e);
}
function a0(e) {
  return e[0];
}
function s0(e) {
  return e[1];
}
function Hc(e, t) {
  var r = gt(!0), n = null, i = zv, a = null, s = n0(o);
  e = typeof e == "function" ? e : e === void 0 ? a0 : gt(e), t = typeof t == "function" ? t : t === void 0 ? s0 : gt(t);
  function o(u) {
    var f, c = (u = i0(u)).length, l, h = !1, d;
    for (n == null && (a = i(d = s())), f = 0; f <= c; ++f)
      !(f < c && r(l = u[f], f, u)) === h && ((h = !h) ? a.lineStart() : a.lineEnd()), h && a.point(+e(l, f, u), +t(l, f, u));
    if (d) return a = null, d + "" || null;
  }
  return o.x = function(u) {
    return arguments.length ? (e = typeof u == "function" ? u : gt(+u), o) : e;
  }, o.y = function(u) {
    return arguments.length ? (t = typeof u == "function" ? u : gt(+u), o) : t;
  }, o.defined = function(u) {
    return arguments.length ? (r = typeof u == "function" ? u : gt(!!u), o) : r;
  }, o.curve = function(u) {
    return arguments.length ? (i = u, n != null && (a = i(n)), o) : i;
  }, o.context = function(u) {
    return arguments.length ? (u == null ? n = a = null : a = i(n = u), o) : n;
  }, o;
}
function Vc(e, t, r) {
  e._context.bezierCurveTo(
    (2 * e._x0 + e._x1) / 3,
    (2 * e._y0 + e._y1) / 3,
    (e._x0 + 2 * e._x1) / 3,
    (e._y0 + 2 * e._y1) / 3,
    (e._x0 + 4 * e._x1 + t) / 6,
    (e._y0 + 4 * e._y1 + r) / 6
  );
}
function jv(e) {
  this._context = e;
}
jv.prototype = {
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
        Vc(this, this._x1, this._y1);
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
        Vc(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function o0(e) {
  return new jv(e);
}
const _r = (e) => () => e;
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
function Me(e, t, r) {
  this.k = e, this.x = t, this.y = r;
}
Me.prototype = {
  constructor: Me,
  scale: function(e) {
    return e === 1 ? this : new Me(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new Me(this.k, this.x + this.k * e, this.y + this.k * t);
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
var Du = new Me(1, 0, 0);
Me.prototype;
function yn(e) {
  e.stopImmediatePropagation();
}
function Mt(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function c0(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function f0() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function Kc() {
  return this.__zoom || Du;
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
  var e = c0, t = f0, r = d0, n = l0, i = h0, a = [0, 1 / 0], s = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], o = 250, u = Gb, f = Iu("start", "zoom", "end"), c, l, h, d = 500, p = 150, v = 0, _ = 10;
  function y(g) {
    g.property("__zoom", Kc).on("wheel.zoom", k, { passive: !1 }).on("mousedown.zoom", F).on("dblclick.zoom", P).filter(i).on("touchstart.zoom", E).on("touchmove.zoom", I).on("touchend.zoom touchcancel.zoom", N).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  y.transform = function(g, A, m, S) {
    var C = g.selection ? g.selection() : g;
    C.property("__zoom", Kc), g !== C ? R(g, A, m, S) : C.interrupt().each(function() {
      $(this, arguments).event(S).start().zoom(null, typeof A == "function" ? A.apply(this, arguments) : A).end();
    });
  }, y.scaleBy = function(g, A, m, S) {
    y.scaleTo(g, function() {
      var C = this.__zoom.k, T = typeof A == "function" ? A.apply(this, arguments) : A;
      return C * T;
    }, m, S);
  }, y.scaleTo = function(g, A, m, S) {
    y.transform(g, function() {
      var C = t.apply(this, arguments), T = this.__zoom, O = m == null ? x(C) : typeof m == "function" ? m.apply(this, arguments) : m, M = T.invert(O), U = typeof A == "function" ? A.apply(this, arguments) : A;
      return r(b(w(T, U), O, M), C, s);
    }, m, S);
  }, y.translateBy = function(g, A, m, S) {
    y.transform(g, function() {
      return r(this.__zoom.translate(
        typeof A == "function" ? A.apply(this, arguments) : A,
        typeof m == "function" ? m.apply(this, arguments) : m
      ), t.apply(this, arguments), s);
    }, null, S);
  }, y.translateTo = function(g, A, m, S, C) {
    y.transform(g, function() {
      var T = t.apply(this, arguments), O = this.__zoom, M = S == null ? x(T) : typeof S == "function" ? S.apply(this, arguments) : S;
      return r(Du.translate(M[0], M[1]).scale(O.k).translate(
        typeof A == "function" ? -A.apply(this, arguments) : -A,
        typeof m == "function" ? -m.apply(this, arguments) : -m
      ), T, s);
    }, S, C);
  };
  function w(g, A) {
    return A = Math.max(a[0], Math.min(a[1], A)), A === g.k ? g : new Me(A, g.x, g.y);
  }
  function b(g, A, m) {
    var S = A[0] - m[0] * g.k, C = A[1] - m[1] * g.k;
    return S === g.x && C === g.y ? g : new Me(g.k, S, C);
  }
  function x(g) {
    return [(+g[0][0] + +g[1][0]) / 2, (+g[0][1] + +g[1][1]) / 2];
  }
  function R(g, A, m, S) {
    g.on("start.zoom", function() {
      $(this, arguments).event(S).start();
    }).on("interrupt.zoom end.zoom", function() {
      $(this, arguments).event(S).end();
    }).tween("zoom", function() {
      var C = this, T = arguments, O = $(C, T).event(S), M = t.apply(C, T), U = m == null ? x(M) : typeof m == "function" ? m.apply(C, T) : m, Z = Math.max(M[1][0] - M[0][0], M[1][1] - M[0][1]), W = C.__zoom, Q = typeof A == "function" ? A.apply(C, T) : A, D = u(W.invert(U).concat(Z / W.k), Q.invert(U).concat(Z / Q.k));
      return function(z) {
        if (z === 1) z = Q;
        else {
          var Y = D(z), ie = Z / Y[2];
          z = new Me(ie, U[0] - Y[0] * ie, U[1] - Y[1] * ie);
        }
        O.zoom(null, z);
      };
    });
  }
  function $(g, A, m) {
    return !m && g.__zooming || new q(g, A);
  }
  function q(g, A) {
    this.that = g, this.args = A, this.active = 0, this.sourceEvent = null, this.extent = t.apply(g, A), this.taps = 0;
  }
  q.prototype = {
    event: function(g) {
      return g && (this.sourceEvent = g), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(g, A) {
      return this.mouse && g !== "mouse" && (this.mouse[1] = A.invert(this.mouse[0])), this.touch0 && g !== "touch" && (this.touch0[1] = A.invert(this.touch0[0])), this.touch1 && g !== "touch" && (this.touch1[1] = A.invert(this.touch1[0])), this.that.__zoom = A, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(g) {
      var A = we(this.that).datum();
      f.call(
        g,
        this.that,
        new u0(g, {
          sourceEvent: this.sourceEvent,
          target: y,
          transform: this.that.__zoom,
          dispatch: f
        }),
        A
      );
    }
  };
  function k(g, ...A) {
    if (!e.apply(this, arguments)) return;
    var m = $(this, A).event(g), S = this.__zoom, C = Math.max(a[0], Math.min(a[1], S.k * Math.pow(2, n.apply(this, arguments)))), T = et(g);
    if (m.wheel)
      (m.mouse[0][0] !== T[0] || m.mouse[0][1] !== T[1]) && (m.mouse[1] = S.invert(m.mouse[0] = T)), clearTimeout(m.wheel);
    else {
      if (S.k === C) return;
      m.mouse = [T, S.invert(T)], qr(this), m.start();
    }
    Mt(g), m.wheel = setTimeout(O, p), m.zoom("mouse", r(b(w(S, C), m.mouse[0], m.mouse[1]), m.extent, s));
    function O() {
      m.wheel = null, m.end();
    }
  }
  function F(g, ...A) {
    if (h || !e.apply(this, arguments)) return;
    var m = g.currentTarget, S = $(this, A, !0).event(g), C = we(g.view).on("mousemove.zoom", U, !0).on("mouseup.zoom", Z, !0), T = et(g, m), O = g.clientX, M = g.clientY;
    vb(g.view), yn(g), S.mouse = [T, this.__zoom.invert(T)], qr(this), S.start();
    function U(W) {
      if (Mt(W), !S.moved) {
        var Q = W.clientX - O, D = W.clientY - M;
        S.moved = Q * Q + D * D > v;
      }
      S.event(W).zoom("mouse", r(b(S.that.__zoom, S.mouse[0] = et(W, m), S.mouse[1]), S.extent, s));
    }
    function Z(W) {
      C.on("mousemove.zoom mouseup.zoom", null), _b(W.view, S.moved), Mt(W), S.event(W).end();
    }
  }
  function P(g, ...A) {
    if (e.apply(this, arguments)) {
      var m = this.__zoom, S = et(g.changedTouches ? g.changedTouches[0] : g, this), C = m.invert(S), T = m.k * (g.shiftKey ? 0.5 : 2), O = r(b(w(m, T), S, C), t.apply(this, A), s);
      Mt(g), o > 0 ? we(this).transition().duration(o).call(R, O, S, g) : we(this).call(y.transform, O, S, g);
    }
  }
  function E(g, ...A) {
    if (e.apply(this, arguments)) {
      var m = g.touches, S = m.length, C = $(this, A, g.changedTouches.length === S).event(g), T, O, M, U;
      for (yn(g), O = 0; O < S; ++O)
        M = m[O], U = et(M, this), U = [U, this.__zoom.invert(U), M.identifier], C.touch0 ? !C.touch1 && C.touch0[2] !== U[2] && (C.touch1 = U, C.taps = 0) : (C.touch0 = U, T = !0, C.taps = 1 + !!c);
      c && (c = clearTimeout(c)), T && (C.taps < 2 && (l = U[0], c = setTimeout(function() {
        c = null;
      }, d)), qr(this), C.start());
    }
  }
  function I(g, ...A) {
    if (this.__zooming) {
      var m = $(this, A).event(g), S = g.changedTouches, C = S.length, T, O, M, U;
      for (Mt(g), T = 0; T < C; ++T)
        O = S[T], M = et(O, this), m.touch0 && m.touch0[2] === O.identifier ? m.touch0[0] = M : m.touch1 && m.touch1[2] === O.identifier && (m.touch1[0] = M);
      if (O = m.that.__zoom, m.touch1) {
        var Z = m.touch0[0], W = m.touch0[1], Q = m.touch1[0], D = m.touch1[1], z = (z = Q[0] - Z[0]) * z + (z = Q[1] - Z[1]) * z, Y = (Y = D[0] - W[0]) * Y + (Y = D[1] - W[1]) * Y;
        O = w(O, Math.sqrt(z / Y)), M = [(Z[0] + Q[0]) / 2, (Z[1] + Q[1]) / 2], U = [(W[0] + D[0]) / 2, (W[1] + D[1]) / 2];
      } else if (m.touch0) M = m.touch0[0], U = m.touch0[1];
      else return;
      m.zoom("touch", r(b(O, M, U), m.extent, s));
    }
  }
  function N(g, ...A) {
    if (this.__zooming) {
      var m = $(this, A).event(g), S = g.changedTouches, C = S.length, T, O;
      for (yn(g), h && clearTimeout(h), h = setTimeout(function() {
        h = null;
      }, d), T = 0; T < C; ++T)
        O = S[T], m.touch0 && m.touch0[2] === O.identifier ? delete m.touch0 : m.touch1 && m.touch1[2] === O.identifier && delete m.touch1;
      if (m.touch1 && !m.touch0 && (m.touch0 = m.touch1, delete m.touch1), m.touch0) m.touch0[1] = this.__zoom.invert(m.touch0[0]);
      else if (m.end(), m.taps === 2 && (O = et(O, this), Math.hypot(l[0] - O[0], l[1] - O[1]) < _)) {
        var M = we(this).on("dblclick.zoom");
        M && M.apply(this, arguments);
      }
    }
  }
  return y.wheelDelta = function(g) {
    return arguments.length ? (n = typeof g == "function" ? g : _r(+g), y) : n;
  }, y.filter = function(g) {
    return arguments.length ? (e = typeof g == "function" ? g : _r(!!g), y) : e;
  }, y.touchable = function(g) {
    return arguments.length ? (i = typeof g == "function" ? g : _r(!!g), y) : i;
  }, y.extent = function(g) {
    return arguments.length ? (t = typeof g == "function" ? g : _r([[+g[0][0], +g[0][1]], [+g[1][0], +g[1][1]]]), y) : t;
  }, y.scaleExtent = function(g) {
    return arguments.length ? (a[0] = +g[0], a[1] = +g[1], y) : [a[0], a[1]];
  }, y.translateExtent = function(g) {
    return arguments.length ? (s[0][0] = +g[0][0], s[1][0] = +g[1][0], s[0][1] = +g[0][1], s[1][1] = +g[1][1], y) : [[s[0][0], s[0][1]], [s[1][0], s[1][1]]];
  }, y.constrain = function(g) {
    return arguments.length ? (r = g, y) : r;
  }, y.duration = function(g) {
    return arguments.length ? (o = +g, y) : o;
  }, y.interpolate = function(g) {
    return arguments.length ? (u = g, y) : u;
  }, y.on = function() {
    var g = f.on.apply(f, arguments);
    return g === f ? y : g;
  }, y.clickDistance = function(g) {
    return arguments.length ? (v = (g = +g) * g, y) : Math.sqrt(v);
  }, y.tapDistance = function(g) {
    return arguments.length ? (_ = +g, y) : _;
  }, y;
}
var gr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function v0(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function zu(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var bn, Wc;
function _0() {
  if (Wc) return bn;
  Wc = 1;
  function e() {
    this.__data__ = [], this.size = 0;
  }
  return bn = e, bn;
}
var mn, Yc;
function $t() {
  if (Yc) return mn;
  Yc = 1;
  function e(t, r) {
    return t === r || t !== t && r !== r;
  }
  return mn = e, mn;
}
var wn, Xc;
function Gr() {
  if (Xc) return wn;
  Xc = 1;
  var e = $t();
  function t(r, n) {
    for (var i = r.length; i--; )
      if (e(r[i][0], n))
        return i;
    return -1;
  }
  return wn = t, wn;
}
var xn, Zc;
function g0() {
  if (Zc) return xn;
  Zc = 1;
  var e = Gr(), t = Array.prototype, r = t.splice;
  function n(i) {
    var a = this.__data__, s = e(a, i);
    if (s < 0)
      return !1;
    var o = a.length - 1;
    return s == o ? a.pop() : r.call(a, s, 1), --this.size, !0;
  }
  return xn = n, xn;
}
var En, Jc;
function y0() {
  if (Jc) return En;
  Jc = 1;
  var e = Gr();
  function t(r) {
    var n = this.__data__, i = e(n, r);
    return i < 0 ? void 0 : n[i][1];
  }
  return En = t, En;
}
var An, Qc;
function b0() {
  if (Qc) return An;
  Qc = 1;
  var e = Gr();
  function t(r) {
    return e(this.__data__, r) > -1;
  }
  return An = t, An;
}
var qn, ef;
function m0() {
  if (ef) return qn;
  ef = 1;
  var e = Gr();
  function t(r, n) {
    var i = this.__data__, a = e(i, r);
    return a < 0 ? (++this.size, i.push([r, n])) : i[a][1] = n, this;
  }
  return qn = t, qn;
}
var $n, tf;
function Ur() {
  if (tf) return $n;
  tf = 1;
  var e = _0(), t = g0(), r = y0(), n = b0(), i = m0();
  function a(s) {
    var o = -1, u = s == null ? 0 : s.length;
    for (this.clear(); ++o < u; ) {
      var f = s[o];
      this.set(f[0], f[1]);
    }
  }
  return a.prototype.clear = e, a.prototype.delete = t, a.prototype.get = r, a.prototype.has = n, a.prototype.set = i, $n = a, $n;
}
var Sn, rf;
function w0() {
  if (rf) return Sn;
  rf = 1;
  var e = Ur();
  function t() {
    this.__data__ = new e(), this.size = 0;
  }
  return Sn = t, Sn;
}
var Rn, nf;
function x0() {
  if (nf) return Rn;
  nf = 1;
  function e(t) {
    var r = this.__data__, n = r.delete(t);
    return this.size = r.size, n;
  }
  return Rn = e, Rn;
}
var Cn, af;
function E0() {
  if (af) return Cn;
  af = 1;
  function e(t) {
    return this.__data__.get(t);
  }
  return Cn = e, Cn;
}
var Tn, sf;
function A0() {
  if (sf) return Tn;
  sf = 1;
  function e(t) {
    return this.__data__.has(t);
  }
  return Tn = e, Tn;
}
var kn, of;
function Gv() {
  if (of) return kn;
  of = 1;
  var e = typeof gr == "object" && gr && gr.Object === Object && gr;
  return kn = e, kn;
}
var In, uf;
function ge() {
  if (uf) return In;
  uf = 1;
  var e = Gv(), t = typeof self == "object" && self && self.Object === Object && self, r = e || t || Function("return this")();
  return In = r, In;
}
var On, cf;
function St() {
  if (cf) return On;
  cf = 1;
  var e = ge(), t = e.Symbol;
  return On = t, On;
}
var Mn, ff;
function q0() {
  if (ff) return Mn;
  ff = 1;
  var e = St(), t = Object.prototype, r = t.hasOwnProperty, n = t.toString, i = e ? e.toStringTag : void 0;
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
  return Mn = a, Mn;
}
var Pn, lf;
function $0() {
  if (lf) return Pn;
  lf = 1;
  var e = Object.prototype, t = e.toString;
  function r(n) {
    return t.call(n);
  }
  return Pn = r, Pn;
}
var Nn, hf;
function lt() {
  if (hf) return Nn;
  hf = 1;
  var e = St(), t = q0(), r = $0(), n = "[object Null]", i = "[object Undefined]", a = e ? e.toStringTag : void 0;
  function s(o) {
    return o == null ? o === void 0 ? i : n : a && a in Object(o) ? t(o) : r(o);
  }
  return Nn = s, Nn;
}
var Ln, df;
function le() {
  if (df) return Ln;
  df = 1;
  function e(t) {
    var r = typeof t;
    return t != null && (r == "object" || r == "function");
  }
  return Ln = e, Ln;
}
var Fn, pf;
function rr() {
  if (pf) return Fn;
  pf = 1;
  var e = lt(), t = le(), r = "[object AsyncFunction]", n = "[object Function]", i = "[object GeneratorFunction]", a = "[object Proxy]";
  function s(o) {
    if (!t(o))
      return !1;
    var u = e(o);
    return u == n || u == i || u == r || u == a;
  }
  return Fn = s, Fn;
}
var Dn, vf;
function S0() {
  if (vf) return Dn;
  vf = 1;
  var e = ge(), t = e["__core-js_shared__"];
  return Dn = t, Dn;
}
var zn, _f;
function R0() {
  if (_f) return zn;
  _f = 1;
  var e = S0(), t = function() {
    var n = /[^.]+$/.exec(e && e.keys && e.keys.IE_PROTO || "");
    return n ? "Symbol(src)_1." + n : "";
  }();
  function r(n) {
    return !!t && t in n;
  }
  return zn = r, zn;
}
var jn, gf;
function Uv() {
  if (gf) return jn;
  gf = 1;
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
  return jn = r, jn;
}
var Gn, yf;
function C0() {
  if (yf) return Gn;
  yf = 1;
  var e = rr(), t = R0(), r = le(), n = Uv(), i = /[\\^$.*+?()[\]{}|]/g, a = /^\[object .+?Constructor\]$/, s = Function.prototype, o = Object.prototype, u = s.toString, f = o.hasOwnProperty, c = RegExp(
    "^" + u.call(f).replace(i, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function l(h) {
    if (!r(h) || t(h))
      return !1;
    var d = e(h) ? c : a;
    return d.test(n(h));
  }
  return Gn = l, Gn;
}
var Un, bf;
function T0() {
  if (bf) return Un;
  bf = 1;
  function e(t, r) {
    return t == null ? void 0 : t[r];
  }
  return Un = e, Un;
}
var Bn, mf;
function ht() {
  if (mf) return Bn;
  mf = 1;
  var e = C0(), t = T0();
  function r(n, i) {
    var a = t(n, i);
    return e(a) ? a : void 0;
  }
  return Bn = r, Bn;
}
var Hn, wf;
function ju() {
  if (wf) return Hn;
  wf = 1;
  var e = ht(), t = ge(), r = e(t, "Map");
  return Hn = r, Hn;
}
var Vn, xf;
function Br() {
  if (xf) return Vn;
  xf = 1;
  var e = ht(), t = e(Object, "create");
  return Vn = t, Vn;
}
var Kn, Ef;
function k0() {
  if (Ef) return Kn;
  Ef = 1;
  var e = Br();
  function t() {
    this.__data__ = e ? e(null) : {}, this.size = 0;
  }
  return Kn = t, Kn;
}
var Wn, Af;
function I0() {
  if (Af) return Wn;
  Af = 1;
  function e(t) {
    var r = this.has(t) && delete this.__data__[t];
    return this.size -= r ? 1 : 0, r;
  }
  return Wn = e, Wn;
}
var Yn, qf;
function O0() {
  if (qf) return Yn;
  qf = 1;
  var e = Br(), t = "__lodash_hash_undefined__", r = Object.prototype, n = r.hasOwnProperty;
  function i(a) {
    var s = this.__data__;
    if (e) {
      var o = s[a];
      return o === t ? void 0 : o;
    }
    return n.call(s, a) ? s[a] : void 0;
  }
  return Yn = i, Yn;
}
var Xn, $f;
function M0() {
  if ($f) return Xn;
  $f = 1;
  var e = Br(), t = Object.prototype, r = t.hasOwnProperty;
  function n(i) {
    var a = this.__data__;
    return e ? a[i] !== void 0 : r.call(a, i);
  }
  return Xn = n, Xn;
}
var Zn, Sf;
function P0() {
  if (Sf) return Zn;
  Sf = 1;
  var e = Br(), t = "__lodash_hash_undefined__";
  function r(n, i) {
    var a = this.__data__;
    return this.size += this.has(n) ? 0 : 1, a[n] = e && i === void 0 ? t : i, this;
  }
  return Zn = r, Zn;
}
var Jn, Rf;
function N0() {
  if (Rf) return Jn;
  Rf = 1;
  var e = k0(), t = I0(), r = O0(), n = M0(), i = P0();
  function a(s) {
    var o = -1, u = s == null ? 0 : s.length;
    for (this.clear(); ++o < u; ) {
      var f = s[o];
      this.set(f[0], f[1]);
    }
  }
  return a.prototype.clear = e, a.prototype.delete = t, a.prototype.get = r, a.prototype.has = n, a.prototype.set = i, Jn = a, Jn;
}
var Qn, Cf;
function L0() {
  if (Cf) return Qn;
  Cf = 1;
  var e = N0(), t = Ur(), r = ju();
  function n() {
    this.size = 0, this.__data__ = {
      hash: new e(),
      map: new (r || t)(),
      string: new e()
    };
  }
  return Qn = n, Qn;
}
var ei, Tf;
function F0() {
  if (Tf) return ei;
  Tf = 1;
  function e(t) {
    var r = typeof t;
    return r == "string" || r == "number" || r == "symbol" || r == "boolean" ? t !== "__proto__" : t === null;
  }
  return ei = e, ei;
}
var ti, kf;
function Hr() {
  if (kf) return ti;
  kf = 1;
  var e = F0();
  function t(r, n) {
    var i = r.__data__;
    return e(n) ? i[typeof n == "string" ? "string" : "hash"] : i.map;
  }
  return ti = t, ti;
}
var ri, If;
function D0() {
  if (If) return ri;
  If = 1;
  var e = Hr();
  function t(r) {
    var n = e(this, r).delete(r);
    return this.size -= n ? 1 : 0, n;
  }
  return ri = t, ri;
}
var ni, Of;
function z0() {
  if (Of) return ni;
  Of = 1;
  var e = Hr();
  function t(r) {
    return e(this, r).get(r);
  }
  return ni = t, ni;
}
var ii, Mf;
function j0() {
  if (Mf) return ii;
  Mf = 1;
  var e = Hr();
  function t(r) {
    return e(this, r).has(r);
  }
  return ii = t, ii;
}
var ai, Pf;
function G0() {
  if (Pf) return ai;
  Pf = 1;
  var e = Hr();
  function t(r, n) {
    var i = e(this, r), a = i.size;
    return i.set(r, n), this.size += i.size == a ? 0 : 1, this;
  }
  return ai = t, ai;
}
var si, Nf;
function Gu() {
  if (Nf) return si;
  Nf = 1;
  var e = L0(), t = D0(), r = z0(), n = j0(), i = G0();
  function a(s) {
    var o = -1, u = s == null ? 0 : s.length;
    for (this.clear(); ++o < u; ) {
      var f = s[o];
      this.set(f[0], f[1]);
    }
  }
  return a.prototype.clear = e, a.prototype.delete = t, a.prototype.get = r, a.prototype.has = n, a.prototype.set = i, si = a, si;
}
var oi, Lf;
function U0() {
  if (Lf) return oi;
  Lf = 1;
  var e = Ur(), t = ju(), r = Gu(), n = 200;
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
  return oi = i, oi;
}
var ui, Ff;
function Vr() {
  if (Ff) return ui;
  Ff = 1;
  var e = Ur(), t = w0(), r = x0(), n = E0(), i = A0(), a = U0();
  function s(o) {
    var u = this.__data__ = new e(o);
    this.size = u.size;
  }
  return s.prototype.clear = t, s.prototype.delete = r, s.prototype.get = n, s.prototype.has = i, s.prototype.set = a, ui = s, ui;
}
var ci, Df;
function Uu() {
  if (Df) return ci;
  Df = 1;
  function e(t, r) {
    for (var n = -1, i = t == null ? 0 : t.length; ++n < i && r(t[n], n, t) !== !1; )
      ;
    return t;
  }
  return ci = e, ci;
}
var fi, zf;
function Bv() {
  if (zf) return fi;
  zf = 1;
  var e = ht(), t = function() {
    try {
      var r = e(Object, "defineProperty");
      return r({}, "", {}), r;
    } catch {
    }
  }();
  return fi = t, fi;
}
var li, jf;
function Kr() {
  if (jf) return li;
  jf = 1;
  var e = Bv();
  function t(r, n, i) {
    n == "__proto__" && e ? e(r, n, {
      configurable: !0,
      enumerable: !0,
      value: i,
      writable: !0
    }) : r[n] = i;
  }
  return li = t, li;
}
var hi, Gf;
function Wr() {
  if (Gf) return hi;
  Gf = 1;
  var e = Kr(), t = $t(), r = Object.prototype, n = r.hasOwnProperty;
  function i(a, s, o) {
    var u = a[s];
    (!(n.call(a, s) && t(u, o)) || o === void 0 && !(s in a)) && e(a, s, o);
  }
  return hi = i, hi;
}
var di, Uf;
function nr() {
  if (Uf) return di;
  Uf = 1;
  var e = Wr(), t = Kr();
  function r(n, i, a, s) {
    var o = !a;
    a || (a = {});
    for (var u = -1, f = i.length; ++u < f; ) {
      var c = i[u], l = s ? s(a[c], n[c], c, a, n) : void 0;
      l === void 0 && (l = n[c]), o ? t(a, c, l) : e(a, c, l);
    }
    return a;
  }
  return di = r, di;
}
var pi, Bf;
function B0() {
  if (Bf) return pi;
  Bf = 1;
  function e(t, r) {
    for (var n = -1, i = Array(t); ++n < t; )
      i[n] = r(n);
    return i;
  }
  return pi = e, pi;
}
var vi, Hf;
function qe() {
  if (Hf) return vi;
  Hf = 1;
  function e(t) {
    return t != null && typeof t == "object";
  }
  return vi = e, vi;
}
var _i, Vf;
function H0() {
  if (Vf) return _i;
  Vf = 1;
  var e = lt(), t = qe(), r = "[object Arguments]";
  function n(i) {
    return t(i) && e(i) == r;
  }
  return _i = n, _i;
}
var gi, Kf;
function ir() {
  if (Kf) return gi;
  Kf = 1;
  var e = H0(), t = qe(), r = Object.prototype, n = r.hasOwnProperty, i = r.propertyIsEnumerable, a = e(/* @__PURE__ */ function() {
    return arguments;
  }()) ? e : function(s) {
    return t(s) && n.call(s, "callee") && !i.call(s, "callee");
  };
  return gi = a, gi;
}
var yi, Wf;
function ee() {
  if (Wf) return yi;
  Wf = 1;
  var e = Array.isArray;
  return yi = e, yi;
}
var Lt = { exports: {} }, bi, Yf;
function V0() {
  if (Yf) return bi;
  Yf = 1;
  function e() {
    return !1;
  }
  return bi = e, bi;
}
Lt.exports;
var Xf;
function Rt() {
  return Xf || (Xf = 1, function(e, t) {
    var r = ge(), n = V0(), i = t && !t.nodeType && t, a = i && !0 && e && !e.nodeType && e, s = a && a.exports === i, o = s ? r.Buffer : void 0, u = o ? o.isBuffer : void 0, f = u || n;
    e.exports = f;
  }(Lt, Lt.exports)), Lt.exports;
}
var mi, Zf;
function Yr() {
  if (Zf) return mi;
  Zf = 1;
  var e = 9007199254740991, t = /^(?:0|[1-9]\d*)$/;
  function r(n, i) {
    var a = typeof n;
    return i = i ?? e, !!i && (a == "number" || a != "symbol" && t.test(n)) && n > -1 && n % 1 == 0 && n < i;
  }
  return mi = r, mi;
}
var wi, Jf;
function Bu() {
  if (Jf) return wi;
  Jf = 1;
  var e = 9007199254740991;
  function t(r) {
    return typeof r == "number" && r > -1 && r % 1 == 0 && r <= e;
  }
  return wi = t, wi;
}
var xi, Qf;
function K0() {
  if (Qf) return xi;
  Qf = 1;
  var e = lt(), t = Bu(), r = qe(), n = "[object Arguments]", i = "[object Array]", a = "[object Boolean]", s = "[object Date]", o = "[object Error]", u = "[object Function]", f = "[object Map]", c = "[object Number]", l = "[object Object]", h = "[object RegExp]", d = "[object Set]", p = "[object String]", v = "[object WeakMap]", _ = "[object ArrayBuffer]", y = "[object DataView]", w = "[object Float32Array]", b = "[object Float64Array]", x = "[object Int8Array]", R = "[object Int16Array]", $ = "[object Int32Array]", q = "[object Uint8Array]", k = "[object Uint8ClampedArray]", F = "[object Uint16Array]", P = "[object Uint32Array]", E = {};
  E[w] = E[b] = E[x] = E[R] = E[$] = E[q] = E[k] = E[F] = E[P] = !0, E[n] = E[i] = E[_] = E[a] = E[y] = E[s] = E[o] = E[u] = E[f] = E[c] = E[l] = E[h] = E[d] = E[p] = E[v] = !1;
  function I(N) {
    return r(N) && t(N.length) && !!E[e(N)];
  }
  return xi = I, xi;
}
var Ei, el;
function Xr() {
  if (el) return Ei;
  el = 1;
  function e(t) {
    return function(r) {
      return t(r);
    };
  }
  return Ei = e, Ei;
}
var Ft = { exports: {} };
Ft.exports;
var tl;
function Hu() {
  return tl || (tl = 1, function(e, t) {
    var r = Gv(), n = t && !t.nodeType && t, i = n && !0 && e && !e.nodeType && e, a = i && i.exports === n, s = a && r.process, o = function() {
      try {
        var u = i && i.require && i.require("util").types;
        return u || s && s.binding && s.binding("util");
      } catch {
      }
    }();
    e.exports = o;
  }(Ft, Ft.exports)), Ft.exports;
}
var Ai, rl;
function ar() {
  if (rl) return Ai;
  rl = 1;
  var e = K0(), t = Xr(), r = Hu(), n = r && r.isTypedArray, i = n ? t(n) : e;
  return Ai = i, Ai;
}
var qi, nl;
function Hv() {
  if (nl) return qi;
  nl = 1;
  var e = B0(), t = ir(), r = ee(), n = Rt(), i = Yr(), a = ar(), s = Object.prototype, o = s.hasOwnProperty;
  function u(f, c) {
    var l = r(f), h = !l && t(f), d = !l && !h && n(f), p = !l && !h && !d && a(f), v = l || h || d || p, _ = v ? e(f.length, String) : [], y = _.length;
    for (var w in f)
      (c || o.call(f, w)) && !(v && // Safari 9 has enumerable `arguments.length` in strict mode.
      (w == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      d && (w == "offset" || w == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      p && (w == "buffer" || w == "byteLength" || w == "byteOffset") || // Skip index properties.
      i(w, y))) && _.push(w);
    return _;
  }
  return qi = u, qi;
}
var $i, il;
function Zr() {
  if (il) return $i;
  il = 1;
  var e = Object.prototype;
  function t(r) {
    var n = r && r.constructor, i = typeof n == "function" && n.prototype || e;
    return r === i;
  }
  return $i = t, $i;
}
var Si, al;
function Vv() {
  if (al) return Si;
  al = 1;
  function e(t, r) {
    return function(n) {
      return t(r(n));
    };
  }
  return Si = e, Si;
}
var Ri, sl;
function W0() {
  if (sl) return Ri;
  sl = 1;
  var e = Vv(), t = e(Object.keys, Object);
  return Ri = t, Ri;
}
var Ci, ol;
function Vu() {
  if (ol) return Ci;
  ol = 1;
  var e = Zr(), t = W0(), r = Object.prototype, n = r.hasOwnProperty;
  function i(a) {
    if (!e(a))
      return t(a);
    var s = [];
    for (var o in Object(a))
      n.call(a, o) && o != "constructor" && s.push(o);
    return s;
  }
  return Ci = i, Ci;
}
var Ti, ul;
function De() {
  if (ul) return Ti;
  ul = 1;
  var e = rr(), t = Bu();
  function r(n) {
    return n != null && t(n.length) && !e(n);
  }
  return Ti = r, Ti;
}
var ki, cl;
function Ze() {
  if (cl) return ki;
  cl = 1;
  var e = Hv(), t = Vu(), r = De();
  function n(i) {
    return r(i) ? e(i) : t(i);
  }
  return ki = n, ki;
}
var Ii, fl;
function Y0() {
  if (fl) return Ii;
  fl = 1;
  var e = nr(), t = Ze();
  function r(n, i) {
    return n && e(i, t(i), n);
  }
  return Ii = r, Ii;
}
var Oi, ll;
function X0() {
  if (ll) return Oi;
  ll = 1;
  function e(t) {
    var r = [];
    if (t != null)
      for (var n in Object(t))
        r.push(n);
    return r;
  }
  return Oi = e, Oi;
}
var Mi, hl;
function Z0() {
  if (hl) return Mi;
  hl = 1;
  var e = le(), t = Zr(), r = X0(), n = Object.prototype, i = n.hasOwnProperty;
  function a(s) {
    if (!e(s))
      return r(s);
    var o = t(s), u = [];
    for (var f in s)
      f == "constructor" && (o || !i.call(s, f)) || u.push(f);
    return u;
  }
  return Mi = a, Mi;
}
var Pi, dl;
function dt() {
  if (dl) return Pi;
  dl = 1;
  var e = Hv(), t = Z0(), r = De();
  function n(i) {
    return r(i) ? e(i, !0) : t(i);
  }
  return Pi = n, Pi;
}
var Ni, pl;
function J0() {
  if (pl) return Ni;
  pl = 1;
  var e = nr(), t = dt();
  function r(n, i) {
    return n && e(i, t(i), n);
  }
  return Ni = r, Ni;
}
var Dt = { exports: {} };
Dt.exports;
var vl;
function Kv() {
  return vl || (vl = 1, function(e, t) {
    var r = ge(), n = t && !t.nodeType && t, i = n && !0 && e && !e.nodeType && e, a = i && i.exports === n, s = a ? r.Buffer : void 0, o = s ? s.allocUnsafe : void 0;
    function u(f, c) {
      if (c)
        return f.slice();
      var l = f.length, h = o ? o(l) : new f.constructor(l);
      return f.copy(h), h;
    }
    e.exports = u;
  }(Dt, Dt.exports)), Dt.exports;
}
var Li, _l;
function Wv() {
  if (_l) return Li;
  _l = 1;
  function e(t, r) {
    var n = -1, i = t.length;
    for (r || (r = Array(i)); ++n < i; )
      r[n] = t[n];
    return r;
  }
  return Li = e, Li;
}
var Fi, gl;
function Yv() {
  if (gl) return Fi;
  gl = 1;
  function e(t, r) {
    for (var n = -1, i = t == null ? 0 : t.length, a = 0, s = []; ++n < i; ) {
      var o = t[n];
      r(o, n, t) && (s[a++] = o);
    }
    return s;
  }
  return Fi = e, Fi;
}
var Di, yl;
function Xv() {
  if (yl) return Di;
  yl = 1;
  function e() {
    return [];
  }
  return Di = e, Di;
}
var zi, bl;
function Ku() {
  if (bl) return zi;
  bl = 1;
  var e = Yv(), t = Xv(), r = Object.prototype, n = r.propertyIsEnumerable, i = Object.getOwnPropertySymbols, a = i ? function(s) {
    return s == null ? [] : (s = Object(s), e(i(s), function(o) {
      return n.call(s, o);
    }));
  } : t;
  return zi = a, zi;
}
var ji, ml;
function Q0() {
  if (ml) return ji;
  ml = 1;
  var e = nr(), t = Ku();
  function r(n, i) {
    return e(n, t(n), i);
  }
  return ji = r, ji;
}
var Gi, wl;
function Wu() {
  if (wl) return Gi;
  wl = 1;
  function e(t, r) {
    for (var n = -1, i = r.length, a = t.length; ++n < i; )
      t[a + n] = r[n];
    return t;
  }
  return Gi = e, Gi;
}
var Ui, xl;
function Jr() {
  if (xl) return Ui;
  xl = 1;
  var e = Vv(), t = e(Object.getPrototypeOf, Object);
  return Ui = t, Ui;
}
var Bi, El;
function Zv() {
  if (El) return Bi;
  El = 1;
  var e = Wu(), t = Jr(), r = Ku(), n = Xv(), i = Object.getOwnPropertySymbols, a = i ? function(s) {
    for (var o = []; s; )
      e(o, r(s)), s = t(s);
    return o;
  } : n;
  return Bi = a, Bi;
}
var Hi, Al;
function e1() {
  if (Al) return Hi;
  Al = 1;
  var e = nr(), t = Zv();
  function r(n, i) {
    return e(n, t(n), i);
  }
  return Hi = r, Hi;
}
var Vi, ql;
function Jv() {
  if (ql) return Vi;
  ql = 1;
  var e = Wu(), t = ee();
  function r(n, i, a) {
    var s = i(n);
    return t(n) ? s : e(s, a(n));
  }
  return Vi = r, Vi;
}
var Ki, $l;
function Qv() {
  if ($l) return Ki;
  $l = 1;
  var e = Jv(), t = Ku(), r = Ze();
  function n(i) {
    return e(i, r, t);
  }
  return Ki = n, Ki;
}
var Wi, Sl;
function t1() {
  if (Sl) return Wi;
  Sl = 1;
  var e = Jv(), t = Zv(), r = dt();
  function n(i) {
    return e(i, r, t);
  }
  return Wi = n, Wi;
}
var Yi, Rl;
function r1() {
  if (Rl) return Yi;
  Rl = 1;
  var e = ht(), t = ge(), r = e(t, "DataView");
  return Yi = r, Yi;
}
var Xi, Cl;
function n1() {
  if (Cl) return Xi;
  Cl = 1;
  var e = ht(), t = ge(), r = e(t, "Promise");
  return Xi = r, Xi;
}
var Zi, Tl;
function e_() {
  if (Tl) return Zi;
  Tl = 1;
  var e = ht(), t = ge(), r = e(t, "Set");
  return Zi = r, Zi;
}
var Ji, kl;
function i1() {
  if (kl) return Ji;
  kl = 1;
  var e = ht(), t = ge(), r = e(t, "WeakMap");
  return Ji = r, Ji;
}
var Qi, Il;
function Ct() {
  if (Il) return Qi;
  Il = 1;
  var e = r1(), t = ju(), r = n1(), n = e_(), i = i1(), a = lt(), s = Uv(), o = "[object Map]", u = "[object Object]", f = "[object Promise]", c = "[object Set]", l = "[object WeakMap]", h = "[object DataView]", d = s(e), p = s(t), v = s(r), _ = s(n), y = s(i), w = a;
  return (e && w(new e(new ArrayBuffer(1))) != h || t && w(new t()) != o || r && w(r.resolve()) != f || n && w(new n()) != c || i && w(new i()) != l) && (w = function(b) {
    var x = a(b), R = x == u ? b.constructor : void 0, $ = R ? s(R) : "";
    if ($)
      switch ($) {
        case d:
          return h;
        case p:
          return o;
        case v:
          return f;
        case _:
          return c;
        case y:
          return l;
      }
    return x;
  }), Qi = w, Qi;
}
var ea, Ol;
function a1() {
  if (Ol) return ea;
  Ol = 1;
  var e = Object.prototype, t = e.hasOwnProperty;
  function r(n) {
    var i = n.length, a = new n.constructor(i);
    return i && typeof n[0] == "string" && t.call(n, "index") && (a.index = n.index, a.input = n.input), a;
  }
  return ea = r, ea;
}
var ta, Ml;
function t_() {
  if (Ml) return ta;
  Ml = 1;
  var e = ge(), t = e.Uint8Array;
  return ta = t, ta;
}
var ra, Pl;
function Yu() {
  if (Pl) return ra;
  Pl = 1;
  var e = t_();
  function t(r) {
    var n = new r.constructor(r.byteLength);
    return new e(n).set(new e(r)), n;
  }
  return ra = t, ra;
}
var na, Nl;
function s1() {
  if (Nl) return na;
  Nl = 1;
  var e = Yu();
  function t(r, n) {
    var i = n ? e(r.buffer) : r.buffer;
    return new r.constructor(i, r.byteOffset, r.byteLength);
  }
  return na = t, na;
}
var ia, Ll;
function o1() {
  if (Ll) return ia;
  Ll = 1;
  var e = /\w*$/;
  function t(r) {
    var n = new r.constructor(r.source, e.exec(r));
    return n.lastIndex = r.lastIndex, n;
  }
  return ia = t, ia;
}
var aa, Fl;
function u1() {
  if (Fl) return aa;
  Fl = 1;
  var e = St(), t = e ? e.prototype : void 0, r = t ? t.valueOf : void 0;
  function n(i) {
    return r ? Object(r.call(i)) : {};
  }
  return aa = n, aa;
}
var sa, Dl;
function r_() {
  if (Dl) return sa;
  Dl = 1;
  var e = Yu();
  function t(r, n) {
    var i = n ? e(r.buffer) : r.buffer;
    return new r.constructor(i, r.byteOffset, r.length);
  }
  return sa = t, sa;
}
var oa, zl;
function c1() {
  if (zl) return oa;
  zl = 1;
  var e = Yu(), t = s1(), r = o1(), n = u1(), i = r_(), a = "[object Boolean]", s = "[object Date]", o = "[object Map]", u = "[object Number]", f = "[object RegExp]", c = "[object Set]", l = "[object String]", h = "[object Symbol]", d = "[object ArrayBuffer]", p = "[object DataView]", v = "[object Float32Array]", _ = "[object Float64Array]", y = "[object Int8Array]", w = "[object Int16Array]", b = "[object Int32Array]", x = "[object Uint8Array]", R = "[object Uint8ClampedArray]", $ = "[object Uint16Array]", q = "[object Uint32Array]";
  function k(F, P, E) {
    var I = F.constructor;
    switch (P) {
      case d:
        return e(F);
      case a:
      case s:
        return new I(+F);
      case p:
        return t(F, E);
      case v:
      case _:
      case y:
      case w:
      case b:
      case x:
      case R:
      case $:
      case q:
        return i(F, E);
      case o:
        return new I();
      case u:
      case l:
        return new I(F);
      case f:
        return r(F);
      case c:
        return new I();
      case h:
        return n(F);
    }
  }
  return oa = k, oa;
}
var ua, jl;
function n_() {
  if (jl) return ua;
  jl = 1;
  var e = le(), t = Object.create, r = /* @__PURE__ */ function() {
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
  return ua = r, ua;
}
var ca, Gl;
function i_() {
  if (Gl) return ca;
  Gl = 1;
  var e = n_(), t = Jr(), r = Zr();
  function n(i) {
    return typeof i.constructor == "function" && !r(i) ? e(t(i)) : {};
  }
  return ca = n, ca;
}
var fa, Ul;
function f1() {
  if (Ul) return fa;
  Ul = 1;
  var e = Ct(), t = qe(), r = "[object Map]";
  function n(i) {
    return t(i) && e(i) == r;
  }
  return fa = n, fa;
}
var la, Bl;
function l1() {
  if (Bl) return la;
  Bl = 1;
  var e = f1(), t = Xr(), r = Hu(), n = r && r.isMap, i = n ? t(n) : e;
  return la = i, la;
}
var ha, Hl;
function h1() {
  if (Hl) return ha;
  Hl = 1;
  var e = Ct(), t = qe(), r = "[object Set]";
  function n(i) {
    return t(i) && e(i) == r;
  }
  return ha = n, ha;
}
var da, Vl;
function d1() {
  if (Vl) return da;
  Vl = 1;
  var e = h1(), t = Xr(), r = Hu(), n = r && r.isSet, i = n ? t(n) : e;
  return da = i, da;
}
var pa, Kl;
function a_() {
  if (Kl) return pa;
  Kl = 1;
  var e = Vr(), t = Uu(), r = Wr(), n = Y0(), i = J0(), a = Kv(), s = Wv(), o = Q0(), u = e1(), f = Qv(), c = t1(), l = Ct(), h = a1(), d = c1(), p = i_(), v = ee(), _ = Rt(), y = l1(), w = le(), b = d1(), x = Ze(), R = dt(), $ = 1, q = 2, k = 4, F = "[object Arguments]", P = "[object Array]", E = "[object Boolean]", I = "[object Date]", N = "[object Error]", g = "[object Function]", A = "[object GeneratorFunction]", m = "[object Map]", S = "[object Number]", C = "[object Object]", T = "[object RegExp]", O = "[object Set]", M = "[object String]", U = "[object Symbol]", Z = "[object WeakMap]", W = "[object ArrayBuffer]", Q = "[object DataView]", D = "[object Float32Array]", z = "[object Float64Array]", Y = "[object Int8Array]", ie = "[object Int16Array]", kt = "[object Int32Array]", re = "[object Uint8Array]", fe = "[object Uint8ClampedArray]", $e = "[object Uint16Array]", Se = "[object Uint32Array]", B = {};
  B[F] = B[P] = B[W] = B[Q] = B[E] = B[I] = B[D] = B[z] = B[Y] = B[ie] = B[kt] = B[m] = B[S] = B[C] = B[T] = B[O] = B[M] = B[U] = B[re] = B[fe] = B[$e] = B[Se] = !0, B[N] = B[g] = B[Z] = !1;
  function be(H, je, Ge, or, _t, J) {
    var ne, me = je & $, Re = je & q, ur = je & k;
    if (Ge && (ne = _t ? Ge(H, or, _t, J) : Ge(H)), ne !== void 0)
      return ne;
    if (!w(H))
      return H;
    var cr = v(H);
    if (cr) {
      if (ne = h(H), !me)
        return s(H, ne);
    } else {
      var G = l(H), V = G == g || G == A;
      if (_(H))
        return a(H, me);
      if (G == C || G == F || V && !_t) {
        if (ne = Re || V ? {} : p(H), !me)
          return Re ? u(H, i(ne, H)) : o(H, n(ne, H));
      } else {
        if (!B[G])
          return _t ? H : {};
        ne = d(H, G, me);
      }
    }
    J || (J = new e());
    var de = J.get(H);
    if (de)
      return de;
    J.set(H, ne), b(H) ? H.forEach(function(Ce) {
      ne.add(be(Ce, je, Ge, Ce, H, J));
    }) : y(H) && H.forEach(function(Ce, Te) {
      ne.set(Te, be(Ce, je, Ge, Te, H, J));
    });
    var un = ur ? Re ? c : f : Re ? R : x, fr = cr ? void 0 : un(H);
    return t(fr || H, function(Ce, Te) {
      fr && (Te = Ce, Ce = H[Te]), r(ne, Te, be(Ce, je, Ge, Te, H, J));
    }), ne;
  }
  return pa = be, pa;
}
var va, Wl;
function p1() {
  if (Wl) return va;
  Wl = 1;
  var e = a_(), t = 4;
  function r(n) {
    return e(n, t);
  }
  return va = r, va;
}
var _a, Yl;
function Xu() {
  if (Yl) return _a;
  Yl = 1;
  function e(t) {
    return function() {
      return t;
    };
  }
  return _a = e, _a;
}
var ga, Xl;
function v1() {
  if (Xl) return ga;
  Xl = 1;
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
  return ga = e, ga;
}
var ya, Zl;
function Zu() {
  if (Zl) return ya;
  Zl = 1;
  var e = v1(), t = e();
  return ya = t, ya;
}
var ba, Jl;
function Ju() {
  if (Jl) return ba;
  Jl = 1;
  var e = Zu(), t = Ze();
  function r(n, i) {
    return n && e(n, i, t);
  }
  return ba = r, ba;
}
var ma, Ql;
function _1() {
  if (Ql) return ma;
  Ql = 1;
  var e = De();
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
  return ma = t, ma;
}
var wa, eh;
function Qr() {
  if (eh) return wa;
  eh = 1;
  var e = Ju(), t = _1(), r = t(e);
  return wa = r, wa;
}
var xa, th;
function pt() {
  if (th) return xa;
  th = 1;
  function e(t) {
    return t;
  }
  return xa = e, xa;
}
var Ea, rh;
function s_() {
  if (rh) return Ea;
  rh = 1;
  var e = pt();
  function t(r) {
    return typeof r == "function" ? r : e;
  }
  return Ea = t, Ea;
}
var Aa, nh;
function o_() {
  if (nh) return Aa;
  nh = 1;
  var e = Uu(), t = Qr(), r = s_(), n = ee();
  function i(a, s) {
    var o = n(a) ? e : t;
    return o(a, r(s));
  }
  return Aa = i, Aa;
}
var qa, ih;
function u_() {
  return ih || (ih = 1, qa = o_()), qa;
}
var $a, ah;
function g1() {
  if (ah) return $a;
  ah = 1;
  var e = Qr();
  function t(r, n) {
    var i = [];
    return e(r, function(a, s, o) {
      n(a, s, o) && i.push(a);
    }), i;
  }
  return $a = t, $a;
}
var Sa, sh;
function y1() {
  if (sh) return Sa;
  sh = 1;
  var e = "__lodash_hash_undefined__";
  function t(r) {
    return this.__data__.set(r, e), this;
  }
  return Sa = t, Sa;
}
var Ra, oh;
function b1() {
  if (oh) return Ra;
  oh = 1;
  function e(t) {
    return this.__data__.has(t);
  }
  return Ra = e, Ra;
}
var Ca, uh;
function c_() {
  if (uh) return Ca;
  uh = 1;
  var e = Gu(), t = y1(), r = b1();
  function n(i) {
    var a = -1, s = i == null ? 0 : i.length;
    for (this.__data__ = new e(); ++a < s; )
      this.add(i[a]);
  }
  return n.prototype.add = n.prototype.push = t, n.prototype.has = r, Ca = n, Ca;
}
var Ta, ch;
function m1() {
  if (ch) return Ta;
  ch = 1;
  function e(t, r) {
    for (var n = -1, i = t == null ? 0 : t.length; ++n < i; )
      if (r(t[n], n, t))
        return !0;
    return !1;
  }
  return Ta = e, Ta;
}
var ka, fh;
function f_() {
  if (fh) return ka;
  fh = 1;
  function e(t, r) {
    return t.has(r);
  }
  return ka = e, ka;
}
var Ia, lh;
function l_() {
  if (lh) return Ia;
  lh = 1;
  var e = c_(), t = m1(), r = f_(), n = 1, i = 2;
  function a(s, o, u, f, c, l) {
    var h = u & n, d = s.length, p = o.length;
    if (d != p && !(h && p > d))
      return !1;
    var v = l.get(s), _ = l.get(o);
    if (v && _)
      return v == o && _ == s;
    var y = -1, w = !0, b = u & i ? new e() : void 0;
    for (l.set(s, o), l.set(o, s); ++y < d; ) {
      var x = s[y], R = o[y];
      if (f)
        var $ = h ? f(R, x, y, o, s, l) : f(x, R, y, s, o, l);
      if ($ !== void 0) {
        if ($)
          continue;
        w = !1;
        break;
      }
      if (b) {
        if (!t(o, function(q, k) {
          if (!r(b, k) && (x === q || c(x, q, u, f, l)))
            return b.push(k);
        })) {
          w = !1;
          break;
        }
      } else if (!(x === R || c(x, R, u, f, l))) {
        w = !1;
        break;
      }
    }
    return l.delete(s), l.delete(o), w;
  }
  return Ia = a, Ia;
}
var Oa, hh;
function w1() {
  if (hh) return Oa;
  hh = 1;
  function e(t) {
    var r = -1, n = Array(t.size);
    return t.forEach(function(i, a) {
      n[++r] = [a, i];
    }), n;
  }
  return Oa = e, Oa;
}
var Ma, dh;
function Qu() {
  if (dh) return Ma;
  dh = 1;
  function e(t) {
    var r = -1, n = Array(t.size);
    return t.forEach(function(i) {
      n[++r] = i;
    }), n;
  }
  return Ma = e, Ma;
}
var Pa, ph;
function x1() {
  if (ph) return Pa;
  ph = 1;
  var e = St(), t = t_(), r = $t(), n = l_(), i = w1(), a = Qu(), s = 1, o = 2, u = "[object Boolean]", f = "[object Date]", c = "[object Error]", l = "[object Map]", h = "[object Number]", d = "[object RegExp]", p = "[object Set]", v = "[object String]", _ = "[object Symbol]", y = "[object ArrayBuffer]", w = "[object DataView]", b = e ? e.prototype : void 0, x = b ? b.valueOf : void 0;
  function R($, q, k, F, P, E, I) {
    switch (k) {
      case w:
        if ($.byteLength != q.byteLength || $.byteOffset != q.byteOffset)
          return !1;
        $ = $.buffer, q = q.buffer;
      case y:
        return !($.byteLength != q.byteLength || !E(new t($), new t(q)));
      case u:
      case f:
      case h:
        return r(+$, +q);
      case c:
        return $.name == q.name && $.message == q.message;
      case d:
      case v:
        return $ == q + "";
      case l:
        var N = i;
      case p:
        var g = F & s;
        if (N || (N = a), $.size != q.size && !g)
          return !1;
        var A = I.get($);
        if (A)
          return A == q;
        F |= o, I.set($, q);
        var m = n(N($), N(q), F, P, E, I);
        return I.delete($), m;
      case _:
        if (x)
          return x.call($) == x.call(q);
    }
    return !1;
  }
  return Pa = R, Pa;
}
var Na, vh;
function E1() {
  if (vh) return Na;
  vh = 1;
  var e = Qv(), t = 1, r = Object.prototype, n = r.hasOwnProperty;
  function i(a, s, o, u, f, c) {
    var l = o & t, h = e(a), d = h.length, p = e(s), v = p.length;
    if (d != v && !l)
      return !1;
    for (var _ = d; _--; ) {
      var y = h[_];
      if (!(l ? y in s : n.call(s, y)))
        return !1;
    }
    var w = c.get(a), b = c.get(s);
    if (w && b)
      return w == s && b == a;
    var x = !0;
    c.set(a, s), c.set(s, a);
    for (var R = l; ++_ < d; ) {
      y = h[_];
      var $ = a[y], q = s[y];
      if (u)
        var k = l ? u(q, $, y, s, a, c) : u($, q, y, a, s, c);
      if (!(k === void 0 ? $ === q || f($, q, o, u, c) : k)) {
        x = !1;
        break;
      }
      R || (R = y == "constructor");
    }
    if (x && !R) {
      var F = a.constructor, P = s.constructor;
      F != P && "constructor" in a && "constructor" in s && !(typeof F == "function" && F instanceof F && typeof P == "function" && P instanceof P) && (x = !1);
    }
    return c.delete(a), c.delete(s), x;
  }
  return Na = i, Na;
}
var La, _h;
function A1() {
  if (_h) return La;
  _h = 1;
  var e = Vr(), t = l_(), r = x1(), n = E1(), i = Ct(), a = ee(), s = Rt(), o = ar(), u = 1, f = "[object Arguments]", c = "[object Array]", l = "[object Object]", h = Object.prototype, d = h.hasOwnProperty;
  function p(v, _, y, w, b, x) {
    var R = a(v), $ = a(_), q = R ? c : i(v), k = $ ? c : i(_);
    q = q == f ? l : q, k = k == f ? l : k;
    var F = q == l, P = k == l, E = q == k;
    if (E && s(v)) {
      if (!s(_))
        return !1;
      R = !0, F = !1;
    }
    if (E && !F)
      return x || (x = new e()), R || o(v) ? t(v, _, y, w, b, x) : r(v, _, q, y, w, b, x);
    if (!(y & u)) {
      var I = F && d.call(v, "__wrapped__"), N = P && d.call(_, "__wrapped__");
      if (I || N) {
        var g = I ? v.value() : v, A = N ? _.value() : _;
        return x || (x = new e()), b(g, A, y, w, x);
      }
    }
    return E ? (x || (x = new e()), n(v, _, y, w, b, x)) : !1;
  }
  return La = p, La;
}
var Fa, gh;
function h_() {
  if (gh) return Fa;
  gh = 1;
  var e = A1(), t = qe();
  function r(n, i, a, s, o) {
    return n === i ? !0 : n == null || i == null || !t(n) && !t(i) ? n !== n && i !== i : e(n, i, a, s, r, o);
  }
  return Fa = r, Fa;
}
var Da, yh;
function q1() {
  if (yh) return Da;
  yh = 1;
  var e = Vr(), t = h_(), r = 1, n = 2;
  function i(a, s, o, u) {
    var f = o.length, c = f, l = !u;
    if (a == null)
      return !c;
    for (a = Object(a); f--; ) {
      var h = o[f];
      if (l && h[2] ? h[1] !== a[h[0]] : !(h[0] in a))
        return !1;
    }
    for (; ++f < c; ) {
      h = o[f];
      var d = h[0], p = a[d], v = h[1];
      if (l && h[2]) {
        if (p === void 0 && !(d in a))
          return !1;
      } else {
        var _ = new e();
        if (u)
          var y = u(p, v, d, a, s, _);
        if (!(y === void 0 ? t(v, p, r | n, u, _) : y))
          return !1;
      }
    }
    return !0;
  }
  return Da = i, Da;
}
var za, bh;
function d_() {
  if (bh) return za;
  bh = 1;
  var e = le();
  function t(r) {
    return r === r && !e(r);
  }
  return za = t, za;
}
var ja, mh;
function $1() {
  if (mh) return ja;
  mh = 1;
  var e = d_(), t = Ze();
  function r(n) {
    for (var i = t(n), a = i.length; a--; ) {
      var s = i[a], o = n[s];
      i[a] = [s, o, e(o)];
    }
    return i;
  }
  return ja = r, ja;
}
var Ga, wh;
function p_() {
  if (wh) return Ga;
  wh = 1;
  function e(t, r) {
    return function(n) {
      return n == null ? !1 : n[t] === r && (r !== void 0 || t in Object(n));
    };
  }
  return Ga = e, Ga;
}
var Ua, xh;
function S1() {
  if (xh) return Ua;
  xh = 1;
  var e = q1(), t = $1(), r = p_();
  function n(i) {
    var a = t(i);
    return a.length == 1 && a[0][2] ? r(a[0][0], a[0][1]) : function(s) {
      return s === i || e(s, i, a);
    };
  }
  return Ua = n, Ua;
}
var Ba, Eh;
function Tt() {
  if (Eh) return Ba;
  Eh = 1;
  var e = lt(), t = qe(), r = "[object Symbol]";
  function n(i) {
    return typeof i == "symbol" || t(i) && e(i) == r;
  }
  return Ba = n, Ba;
}
var Ha, Ah;
function ec() {
  if (Ah) return Ha;
  Ah = 1;
  var e = ee(), t = Tt(), r = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, n = /^\w*$/;
  function i(a, s) {
    if (e(a))
      return !1;
    var o = typeof a;
    return o == "number" || o == "symbol" || o == "boolean" || a == null || t(a) ? !0 : n.test(a) || !r.test(a) || s != null && a in Object(s);
  }
  return Ha = i, Ha;
}
var Va, qh;
function R1() {
  if (qh) return Va;
  qh = 1;
  var e = Gu(), t = "Expected a function";
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
  return r.Cache = e, Va = r, Va;
}
var Ka, $h;
function C1() {
  if ($h) return Ka;
  $h = 1;
  var e = R1(), t = 500;
  function r(n) {
    var i = e(n, function(s) {
      return a.size === t && a.clear(), s;
    }), a = i.cache;
    return i;
  }
  return Ka = r, Ka;
}
var Wa, Sh;
function T1() {
  if (Sh) return Wa;
  Sh = 1;
  var e = C1(), t = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, r = /\\(\\)?/g, n = e(function(i) {
    var a = [];
    return i.charCodeAt(0) === 46 && a.push(""), i.replace(t, function(s, o, u, f) {
      a.push(u ? f.replace(r, "$1") : o || s);
    }), a;
  });
  return Wa = n, Wa;
}
var Ya, Rh;
function en() {
  if (Rh) return Ya;
  Rh = 1;
  function e(t, r) {
    for (var n = -1, i = t == null ? 0 : t.length, a = Array(i); ++n < i; )
      a[n] = r(t[n], n, t);
    return a;
  }
  return Ya = e, Ya;
}
var Xa, Ch;
function k1() {
  if (Ch) return Xa;
  Ch = 1;
  var e = St(), t = en(), r = ee(), n = Tt(), i = e ? e.prototype : void 0, a = i ? i.toString : void 0;
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
  return Xa = s, Xa;
}
var Za, Th;
function v_() {
  if (Th) return Za;
  Th = 1;
  var e = k1();
  function t(r) {
    return r == null ? "" : e(r);
  }
  return Za = t, Za;
}
var Ja, kh;
function tn() {
  if (kh) return Ja;
  kh = 1;
  var e = ee(), t = ec(), r = T1(), n = v_();
  function i(a, s) {
    return e(a) ? a : t(a, s) ? [a] : r(n(a));
  }
  return Ja = i, Ja;
}
var Qa, Ih;
function sr() {
  if (Ih) return Qa;
  Ih = 1;
  var e = Tt();
  function t(r) {
    if (typeof r == "string" || e(r))
      return r;
    var n = r + "";
    return n == "0" && 1 / r == -1 / 0 ? "-0" : n;
  }
  return Qa = t, Qa;
}
var es, Oh;
function rn() {
  if (Oh) return es;
  Oh = 1;
  var e = tn(), t = sr();
  function r(n, i) {
    i = e(i, n);
    for (var a = 0, s = i.length; n != null && a < s; )
      n = n[t(i[a++])];
    return a && a == s ? n : void 0;
  }
  return es = r, es;
}
var ts, Mh;
function I1() {
  if (Mh) return ts;
  Mh = 1;
  var e = rn();
  function t(r, n, i) {
    var a = r == null ? void 0 : e(r, n);
    return a === void 0 ? i : a;
  }
  return ts = t, ts;
}
var rs, Ph;
function O1() {
  if (Ph) return rs;
  Ph = 1;
  function e(t, r) {
    return t != null && r in Object(t);
  }
  return rs = e, rs;
}
var ns, Nh;
function __() {
  if (Nh) return ns;
  Nh = 1;
  var e = tn(), t = ir(), r = ee(), n = Yr(), i = Bu(), a = sr();
  function s(o, u, f) {
    u = e(u, o);
    for (var c = -1, l = u.length, h = !1; ++c < l; ) {
      var d = a(u[c]);
      if (!(h = o != null && f(o, d)))
        break;
      o = o[d];
    }
    return h || ++c != l ? h : (l = o == null ? 0 : o.length, !!l && i(l) && n(d, l) && (r(o) || t(o)));
  }
  return ns = s, ns;
}
var is, Lh;
function g_() {
  if (Lh) return is;
  Lh = 1;
  var e = O1(), t = __();
  function r(n, i) {
    return n != null && t(n, i, e);
  }
  return is = r, is;
}
var as, Fh;
function M1() {
  if (Fh) return as;
  Fh = 1;
  var e = h_(), t = I1(), r = g_(), n = ec(), i = d_(), a = p_(), s = sr(), o = 1, u = 2;
  function f(c, l) {
    return n(c) && i(l) ? a(s(c), l) : function(h) {
      var d = t(h, c);
      return d === void 0 && d === l ? r(h, c) : e(l, d, o | u);
    };
  }
  return as = f, as;
}
var ss, Dh;
function y_() {
  if (Dh) return ss;
  Dh = 1;
  function e(t) {
    return function(r) {
      return r == null ? void 0 : r[t];
    };
  }
  return ss = e, ss;
}
var os, zh;
function P1() {
  if (zh) return os;
  zh = 1;
  var e = rn();
  function t(r) {
    return function(n) {
      return e(n, r);
    };
  }
  return os = t, os;
}
var us, jh;
function N1() {
  if (jh) return us;
  jh = 1;
  var e = y_(), t = P1(), r = ec(), n = sr();
  function i(a) {
    return r(a) ? e(n(a)) : t(a);
  }
  return us = i, us;
}
var cs, Gh;
function ze() {
  if (Gh) return cs;
  Gh = 1;
  var e = S1(), t = M1(), r = pt(), n = ee(), i = N1();
  function a(s) {
    return typeof s == "function" ? s : s == null ? r : typeof s == "object" ? n(s) ? t(s[0], s[1]) : e(s) : i(s);
  }
  return cs = a, cs;
}
var fs, Uh;
function b_() {
  if (Uh) return fs;
  Uh = 1;
  var e = Yv(), t = g1(), r = ze(), n = ee();
  function i(a, s) {
    var o = n(a) ? e : t;
    return o(a, r(s, 3));
  }
  return fs = i, fs;
}
var ls, Bh;
function L1() {
  if (Bh) return ls;
  Bh = 1;
  var e = Object.prototype, t = e.hasOwnProperty;
  function r(n, i) {
    return n != null && t.call(n, i);
  }
  return ls = r, ls;
}
var hs, Hh;
function m_() {
  if (Hh) return hs;
  Hh = 1;
  var e = L1(), t = __();
  function r(n, i) {
    return n != null && t(n, i, e);
  }
  return hs = r, hs;
}
var ds, Vh;
function F1() {
  if (Vh) return ds;
  Vh = 1;
  var e = Vu(), t = Ct(), r = ir(), n = ee(), i = De(), a = Rt(), s = Zr(), o = ar(), u = "[object Map]", f = "[object Set]", c = Object.prototype, l = c.hasOwnProperty;
  function h(d) {
    if (d == null)
      return !0;
    if (i(d) && (n(d) || typeof d == "string" || typeof d.splice == "function" || a(d) || o(d) || r(d)))
      return !d.length;
    var p = t(d);
    if (p == u || p == f)
      return !d.size;
    if (s(d))
      return !e(d).length;
    for (var v in d)
      if (l.call(d, v))
        return !1;
    return !0;
  }
  return ds = h, ds;
}
var ps, Kh;
function w_() {
  if (Kh) return ps;
  Kh = 1;
  function e(t) {
    return t === void 0;
  }
  return ps = e, ps;
}
var vs, Wh;
function x_() {
  if (Wh) return vs;
  Wh = 1;
  var e = Qr(), t = De();
  function r(n, i) {
    var a = -1, s = t(n) ? Array(n.length) : [];
    return e(n, function(o, u, f) {
      s[++a] = i(o, u, f);
    }), s;
  }
  return vs = r, vs;
}
var _s, Yh;
function E_() {
  if (Yh) return _s;
  Yh = 1;
  var e = en(), t = ze(), r = x_(), n = ee();
  function i(a, s) {
    var o = n(a) ? e : r;
    return o(a, t(s, 3));
  }
  return _s = i, _s;
}
var gs, Xh;
function D1() {
  if (Xh) return gs;
  Xh = 1;
  function e(t, r, n, i) {
    var a = -1, s = t == null ? 0 : t.length;
    for (i && s && (n = t[++a]); ++a < s; )
      n = r(n, t[a], a, t);
    return n;
  }
  return gs = e, gs;
}
var ys, Zh;
function z1() {
  if (Zh) return ys;
  Zh = 1;
  function e(t, r, n, i, a) {
    return a(t, function(s, o, u) {
      n = i ? (i = !1, s) : r(n, s, o, u);
    }), n;
  }
  return ys = e, ys;
}
var bs, Jh;
function A_() {
  if (Jh) return bs;
  Jh = 1;
  var e = D1(), t = Qr(), r = ze(), n = z1(), i = ee();
  function a(s, o, u) {
    var f = i(s) ? e : n, c = arguments.length < 3;
    return f(s, r(o, 4), u, c, t);
  }
  return bs = a, bs;
}
var ms, Qh;
function j1() {
  if (Qh) return ms;
  Qh = 1;
  var e = lt(), t = ee(), r = qe(), n = "[object String]";
  function i(a) {
    return typeof a == "string" || !t(a) && r(a) && e(a) == n;
  }
  return ms = i, ms;
}
var ws, ed;
function G1() {
  if (ed) return ws;
  ed = 1;
  var e = y_(), t = e("length");
  return ws = t, ws;
}
var xs, td;
function U1() {
  if (td) return xs;
  td = 1;
  var e = "\\ud800-\\udfff", t = "\\u0300-\\u036f", r = "\\ufe20-\\ufe2f", n = "\\u20d0-\\u20ff", i = t + r + n, a = "\\ufe0e\\ufe0f", s = "\\u200d", o = RegExp("[" + s + e + i + a + "]");
  function u(f) {
    return o.test(f);
  }
  return xs = u, xs;
}
var Es, rd;
function B1() {
  if (rd) return Es;
  rd = 1;
  var e = "\\ud800-\\udfff", t = "\\u0300-\\u036f", r = "\\ufe20-\\ufe2f", n = "\\u20d0-\\u20ff", i = t + r + n, a = "\\ufe0e\\ufe0f", s = "[" + e + "]", o = "[" + i + "]", u = "\\ud83c[\\udffb-\\udfff]", f = "(?:" + o + "|" + u + ")", c = "[^" + e + "]", l = "(?:\\ud83c[\\udde6-\\uddff]){2}", h = "[\\ud800-\\udbff][\\udc00-\\udfff]", d = "\\u200d", p = f + "?", v = "[" + a + "]?", _ = "(?:" + d + "(?:" + [c, l, h].join("|") + ")" + v + p + ")*", y = v + p + _, w = "(?:" + [c + o + "?", o, l, h, s].join("|") + ")", b = RegExp(u + "(?=" + u + ")|" + w + y, "g");
  function x(R) {
    for (var $ = b.lastIndex = 0; b.test(R); )
      ++$;
    return $;
  }
  return Es = x, Es;
}
var As, nd;
function H1() {
  if (nd) return As;
  nd = 1;
  var e = G1(), t = U1(), r = B1();
  function n(i) {
    return t(i) ? r(i) : e(i);
  }
  return As = n, As;
}
var qs, id;
function V1() {
  if (id) return qs;
  id = 1;
  var e = Vu(), t = Ct(), r = De(), n = j1(), i = H1(), a = "[object Map]", s = "[object Set]";
  function o(u) {
    if (u == null)
      return 0;
    if (r(u))
      return n(u) ? i(u) : u.length;
    var f = t(u);
    return f == a || f == s ? u.size : e(u).length;
  }
  return qs = o, qs;
}
var $s, ad;
function K1() {
  if (ad) return $s;
  ad = 1;
  var e = Uu(), t = n_(), r = Ju(), n = ze(), i = Jr(), a = ee(), s = Rt(), o = rr(), u = le(), f = ar();
  function c(l, h, d) {
    var p = a(l), v = p || s(l) || f(l);
    if (h = n(h, 4), d == null) {
      var _ = l && l.constructor;
      v ? d = p ? new _() : [] : u(l) ? d = o(_) ? t(i(l)) : {} : d = {};
    }
    return (v ? e : r)(l, function(y, w, b) {
      return h(d, y, w, b);
    }), d;
  }
  return $s = c, $s;
}
var Ss, sd;
function W1() {
  if (sd) return Ss;
  sd = 1;
  var e = St(), t = ir(), r = ee(), n = e ? e.isConcatSpreadable : void 0;
  function i(a) {
    return r(a) || t(a) || !!(n && a && a[n]);
  }
  return Ss = i, Ss;
}
var Rs, od;
function tc() {
  if (od) return Rs;
  od = 1;
  var e = Wu(), t = W1();
  function r(n, i, a, s, o) {
    var u = -1, f = n.length;
    for (a || (a = t), o || (o = []); ++u < f; ) {
      var c = n[u];
      i > 0 && a(c) ? i > 1 ? r(c, i - 1, a, s, o) : e(o, c) : s || (o[o.length] = c);
    }
    return o;
  }
  return Rs = r, Rs;
}
var Cs, ud;
function Y1() {
  if (ud) return Cs;
  ud = 1;
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
  return Cs = e, Cs;
}
var Ts, cd;
function q_() {
  if (cd) return Ts;
  cd = 1;
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
  return Ts = r, Ts;
}
var ks, fd;
function X1() {
  if (fd) return ks;
  fd = 1;
  var e = Xu(), t = Bv(), r = pt(), n = t ? function(i, a) {
    return t(i, "toString", {
      configurable: !0,
      enumerable: !1,
      value: e(a),
      writable: !0
    });
  } : r;
  return ks = n, ks;
}
var Is, ld;
function Z1() {
  if (ld) return Is;
  ld = 1;
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
  return Is = n, Is;
}
var Os, hd;
function $_() {
  if (hd) return Os;
  hd = 1;
  var e = X1(), t = Z1(), r = t(e);
  return Os = r, Os;
}
var Ms, dd;
function nn() {
  if (dd) return Ms;
  dd = 1;
  var e = pt(), t = q_(), r = $_();
  function n(i, a) {
    return r(t(i, a, e), i + "");
  }
  return Ms = n, Ms;
}
var Ps, pd;
function S_() {
  if (pd) return Ps;
  pd = 1;
  function e(t, r, n, i) {
    for (var a = t.length, s = n + (i ? 1 : -1); i ? s-- : ++s < a; )
      if (r(t[s], s, t))
        return s;
    return -1;
  }
  return Ps = e, Ps;
}
var Ns, vd;
function J1() {
  if (vd) return Ns;
  vd = 1;
  function e(t) {
    return t !== t;
  }
  return Ns = e, Ns;
}
var Ls, _d;
function Q1() {
  if (_d) return Ls;
  _d = 1;
  function e(t, r, n) {
    for (var i = n - 1, a = t.length; ++i < a; )
      if (t[i] === r)
        return i;
    return -1;
  }
  return Ls = e, Ls;
}
var Fs, gd;
function ew() {
  if (gd) return Fs;
  gd = 1;
  var e = S_(), t = J1(), r = Q1();
  function n(i, a, s) {
    return a === a ? r(i, a, s) : e(i, t, s);
  }
  return Fs = n, Fs;
}
var Ds, yd;
function tw() {
  if (yd) return Ds;
  yd = 1;
  var e = ew();
  function t(r, n) {
    var i = r == null ? 0 : r.length;
    return !!i && e(r, n, 0) > -1;
  }
  return Ds = t, Ds;
}
var zs, bd;
function rw() {
  if (bd) return zs;
  bd = 1;
  function e(t, r, n) {
    for (var i = -1, a = t == null ? 0 : t.length; ++i < a; )
      if (n(r, t[i]))
        return !0;
    return !1;
  }
  return zs = e, zs;
}
var js, md;
function nw() {
  if (md) return js;
  md = 1;
  function e() {
  }
  return js = e, js;
}
var Gs, wd;
function iw() {
  if (wd) return Gs;
  wd = 1;
  var e = e_(), t = nw(), r = Qu(), n = 1 / 0, i = e && 1 / r(new e([, -0]))[1] == n ? function(a) {
    return new e(a);
  } : t;
  return Gs = i, Gs;
}
var Us, xd;
function aw() {
  if (xd) return Us;
  xd = 1;
  var e = c_(), t = tw(), r = rw(), n = f_(), i = iw(), a = Qu(), s = 200;
  function o(u, f, c) {
    var l = -1, h = t, d = u.length, p = !0, v = [], _ = v;
    if (c)
      p = !1, h = r;
    else if (d >= s) {
      var y = f ? null : i(u);
      if (y)
        return a(y);
      p = !1, h = n, _ = new e();
    } else
      _ = f ? [] : v;
    e:
      for (; ++l < d; ) {
        var w = u[l], b = f ? f(w) : w;
        if (w = c || w !== 0 ? w : 0, p && b === b) {
          for (var x = _.length; x--; )
            if (_[x] === b)
              continue e;
          f && _.push(b), v.push(w);
        } else h(_, b, c) || (_ !== v && _.push(b), v.push(w));
      }
    return v;
  }
  return Us = o, Us;
}
var Bs, Ed;
function R_() {
  if (Ed) return Bs;
  Ed = 1;
  var e = De(), t = qe();
  function r(n) {
    return t(n) && e(n);
  }
  return Bs = r, Bs;
}
var Hs, Ad;
function sw() {
  if (Ad) return Hs;
  Ad = 1;
  var e = tc(), t = nn(), r = aw(), n = R_(), i = t(function(a) {
    return r(e(a, 1, n, !0));
  });
  return Hs = i, Hs;
}
var Vs, qd;
function ow() {
  if (qd) return Vs;
  qd = 1;
  var e = en();
  function t(r, n) {
    return e(n, function(i) {
      return r[i];
    });
  }
  return Vs = t, Vs;
}
var Ks, $d;
function C_() {
  if ($d) return Ks;
  $d = 1;
  var e = ow(), t = Ze();
  function r(n) {
    return n == null ? [] : e(n, t(n));
  }
  return Ks = r, Ks;
}
var Ws, Sd;
function he() {
  if (Sd) return Ws;
  Sd = 1;
  var e;
  if (typeof zu == "function")
    try {
      e = {
        clone: p1(),
        constant: Xu(),
        each: u_(),
        filter: b_(),
        has: m_(),
        isArray: ee(),
        isEmpty: F1(),
        isFunction: rr(),
        isUndefined: w_(),
        keys: Ze(),
        map: E_(),
        reduce: A_(),
        size: V1(),
        transform: K1(),
        union: sw(),
        values: C_()
      };
    } catch {
    }
  return e || (e = window._), Ws = e, Ws;
}
var Ys, Rd;
function rc() {
  if (Rd) return Ys;
  Rd = 1;
  var e = he();
  Ys = i;
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
    var h = arguments, d = this;
    return e.each(c, function(p) {
      h.length > 1 ? d.setNode(p, l) : d.setNode(p);
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
      var h = function(d) {
        l.removeEdge(l._edgeObjs[d]);
      };
      delete this._nodes[c], this._isCompound && (this._removeFromParentsChildList(c), delete this._parent[c], e.each(this.children(c), function(d) {
        l.setParent(d);
      }), delete this._children[c]), e.each(e.keys(this._in[c]), h), delete this._in[c], delete this._preds[c], e.each(e.keys(this._out[c]), h), delete this._out[c], delete this._sucs[c], --this._nodeCount;
    }
    return this;
  }, i.prototype.setParent = function(c, l) {
    if (!this._isCompound)
      throw new Error("Cannot set parent in a non-compound graph");
    if (e.isUndefined(l))
      l = r;
    else {
      l += "";
      for (var h = l; !e.isUndefined(h); h = this.parent(h))
        if (h === c)
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
    var h = this;
    e.each(this._nodes, function(v, _) {
      c(_) && l.setNode(_, v);
    }), e.each(this._edgeObjs, function(v) {
      l.hasNode(v.v) && l.hasNode(v.w) && l.setEdge(v, h.edge(v));
    });
    var d = {};
    function p(v) {
      var _ = h.parent(v);
      return _ === void 0 || l.hasNode(_) ? (d[v] = _, _) : _ in d ? d[_] : p(_);
    }
    return this._isCompound && e.each(l.nodes(), function(v) {
      l.setParent(v, p(v));
    }), l;
  }, i.prototype.setDefaultEdgeLabel = function(c) {
    return e.isFunction(c) || (c = e.constant(c)), this._defaultEdgeLabelFn = c, this;
  }, i.prototype.edgeCount = function() {
    return this._edgeCount;
  }, i.prototype.edges = function() {
    return e.values(this._edgeObjs);
  }, i.prototype.setPath = function(c, l) {
    var h = this, d = arguments;
    return e.reduce(c, function(p, v) {
      return d.length > 1 ? h.setEdge(p, v, l) : h.setEdge(p, v), v;
    }), this;
  }, i.prototype.setEdge = function() {
    var c, l, h, d, p = !1, v = arguments[0];
    typeof v == "object" && v !== null && "v" in v ? (c = v.v, l = v.w, h = v.name, arguments.length === 2 && (d = arguments[1], p = !0)) : (c = v, l = arguments[1], h = arguments[3], arguments.length > 2 && (d = arguments[2], p = !0)), c = "" + c, l = "" + l, e.isUndefined(h) || (h = "" + h);
    var _ = o(this._isDirected, c, l, h);
    if (e.has(this._edgeLabels, _))
      return p && (this._edgeLabels[_] = d), this;
    if (!e.isUndefined(h) && !this._isMultigraph)
      throw new Error("Cannot set a named edge when isMultigraph = false");
    this.setNode(c), this.setNode(l), this._edgeLabels[_] = p ? d : this._defaultEdgeLabelFn(c, l, h);
    var y = u(this._isDirected, c, l, h);
    return c = y.v, l = y.w, Object.freeze(y), this._edgeObjs[_] = y, a(this._preds[l], c), a(this._sucs[c], l), this._in[l][_] = y, this._out[c][_] = y, this._edgeCount++, this;
  }, i.prototype.edge = function(c, l, h) {
    var d = arguments.length === 1 ? f(this._isDirected, arguments[0]) : o(this._isDirected, c, l, h);
    return this._edgeLabels[d];
  }, i.prototype.hasEdge = function(c, l, h) {
    var d = arguments.length === 1 ? f(this._isDirected, arguments[0]) : o(this._isDirected, c, l, h);
    return e.has(this._edgeLabels, d);
  }, i.prototype.removeEdge = function(c, l, h) {
    var d = arguments.length === 1 ? f(this._isDirected, arguments[0]) : o(this._isDirected, c, l, h), p = this._edgeObjs[d];
    return p && (c = p.v, l = p.w, delete this._edgeLabels[d], delete this._edgeObjs[d], s(this._preds[l], c), s(this._sucs[c], l), delete this._in[l][d], delete this._out[c][d], this._edgeCount--), this;
  }, i.prototype.inEdges = function(c, l) {
    var h = this._in[c];
    if (h) {
      var d = e.values(h);
      return l ? e.filter(d, function(p) {
        return p.v === l;
      }) : d;
    }
  }, i.prototype.outEdges = function(c, l) {
    var h = this._out[c];
    if (h) {
      var d = e.values(h);
      return l ? e.filter(d, function(p) {
        return p.w === l;
      }) : d;
    }
  }, i.prototype.nodeEdges = function(c, l) {
    var h = this.inEdges(c, l);
    if (h)
      return h.concat(this.outEdges(c, l));
  };
  function a(c, l) {
    c[l] ? c[l]++ : c[l] = 1;
  }
  function s(c, l) {
    --c[l] || delete c[l];
  }
  function o(c, l, h, d) {
    var p = "" + l, v = "" + h;
    if (!c && p > v) {
      var _ = p;
      p = v, v = _;
    }
    return p + n + v + n + (e.isUndefined(d) ? t : d);
  }
  function u(c, l, h, d) {
    var p = "" + l, v = "" + h;
    if (!c && p > v) {
      var _ = p;
      p = v, v = _;
    }
    var y = { v: p, w: v };
    return d && (y.name = d), y;
  }
  function f(c, l) {
    return o(c, l.v, l.w, l.name);
  }
  return Ys;
}
var Xs, Cd;
function uw() {
  return Cd || (Cd = 1, Xs = "2.1.8"), Xs;
}
var Zs, Td;
function cw() {
  return Td || (Td = 1, Zs = {
    Graph: rc(),
    version: uw()
  }), Zs;
}
var Js, kd;
function fw() {
  if (kd) return Js;
  kd = 1;
  var e = he(), t = rc();
  Js = {
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
  return Js;
}
var Qs, Id;
function lw() {
  if (Id) return Qs;
  Id = 1;
  var e = he();
  Qs = t;
  function t(r) {
    var n = {}, i = [], a;
    function s(o) {
      e.has(n, o) || (n[o] = !0, a.push(o), e.each(r.successors(o), s), e.each(r.predecessors(o), s));
    }
    return e.each(r.nodes(), function(o) {
      a = [], s(o), a.length && i.push(a);
    }), i;
  }
  return Qs;
}
var eo, Od;
function T_() {
  if (Od) return eo;
  Od = 1;
  var e = he();
  eo = t;
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
  }, eo;
}
var to, Md;
function k_() {
  if (Md) return to;
  Md = 1;
  var e = he(), t = T_();
  to = n;
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
    var f = {}, c = new t(), l, h, d = function(p) {
      var v = p.v !== l ? p.v : p.w, _ = f[v], y = o(p), w = h.distance + y;
      if (y < 0)
        throw new Error("dijkstra does not allow negative edge weights. Bad edge: " + p + " Weight: " + y);
      w < _.distance && (_.distance = w, _.predecessor = l, c.decrease(v, w));
    };
    for (a.nodes().forEach(function(p) {
      var v = p === s ? 0 : Number.POSITIVE_INFINITY;
      f[p] = { distance: v }, c.add(p, v);
    }); c.size() > 0 && (l = c.removeMin(), h = f[l], h.distance !== Number.POSITIVE_INFINITY); )
      u(l).forEach(d);
    return f;
  }
  return to;
}
var ro, Pd;
function hw() {
  if (Pd) return ro;
  Pd = 1;
  var e = k_(), t = he();
  ro = r;
  function r(n, i, a) {
    return t.transform(n.nodes(), function(s, o) {
      s[o] = e(n, o, i, a);
    }, {});
  }
  return ro;
}
var no, Nd;
function I_() {
  if (Nd) return no;
  Nd = 1;
  var e = he();
  no = t;
  function t(r) {
    var n = 0, i = [], a = {}, s = [];
    function o(u) {
      var f = a[u] = {
        onStack: !0,
        lowlink: n,
        index: n++
      };
      if (i.push(u), r.successors(u).forEach(function(h) {
        e.has(a, h) ? a[h].onStack && (f.lowlink = Math.min(f.lowlink, a[h].index)) : (o(h), f.lowlink = Math.min(f.lowlink, a[h].lowlink));
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
  return no;
}
var io, Ld;
function dw() {
  if (Ld) return io;
  Ld = 1;
  var e = he(), t = I_();
  io = r;
  function r(n) {
    return e.filter(t(n), function(i) {
      return i.length > 1 || i.length === 1 && n.hasEdge(i[0], i[0]);
    });
  }
  return io;
}
var ao, Fd;
function pw() {
  if (Fd) return ao;
  Fd = 1;
  var e = he();
  ao = r;
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
        var l = c.v === f ? c.w : c.v, h = a(c);
        o[f][l] = { distance: h, predecessor: f };
      });
    }), u.forEach(function(f) {
      var c = o[f];
      u.forEach(function(l) {
        var h = o[l];
        u.forEach(function(d) {
          var p = h[f], v = c[d], _ = h[d], y = p.distance + v.distance;
          y < _.distance && (_.distance = y, _.predecessor = v.predecessor);
        });
      });
    }), o;
  }
  return ao;
}
var so, Dd;
function O_() {
  if (Dd) return so;
  Dd = 1;
  var e = he();
  so = t, t.CycleException = r;
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
  return r.prototype = new Error(), so;
}
var oo, zd;
function vw() {
  if (zd) return oo;
  zd = 1;
  var e = O_();
  oo = t;
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
  return oo;
}
var uo, jd;
function M_() {
  if (jd) return uo;
  jd = 1;
  var e = he();
  uo = t;
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
  return uo;
}
var co, Gd;
function _w() {
  if (Gd) return co;
  Gd = 1;
  var e = M_();
  co = t;
  function t(r, n) {
    return e(r, n, "post");
  }
  return co;
}
var fo, Ud;
function gw() {
  if (Ud) return fo;
  Ud = 1;
  var e = M_();
  fo = t;
  function t(r, n) {
    return e(r, n, "pre");
  }
  return fo;
}
var lo, Bd;
function yw() {
  if (Bd) return lo;
  Bd = 1;
  var e = he(), t = rc(), r = T_();
  lo = n;
  function n(i, a) {
    var s = new t(), o = {}, u = new r(), f;
    function c(h) {
      var d = h.v === f ? h.w : h.v, p = u.priority(d);
      if (p !== void 0) {
        var v = a(h);
        v < p && (o[d] = f, u.decrease(d, v));
      }
    }
    if (i.nodeCount() === 0)
      return s;
    e.each(i.nodes(), function(h) {
      u.add(h, Number.POSITIVE_INFINITY), s.setNode(h);
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
  return lo;
}
var ho, Hd;
function bw() {
  return Hd || (Hd = 1, ho = {
    components: lw(),
    dijkstra: k_(),
    dijkstraAll: hw(),
    findCycles: dw(),
    floydWarshall: pw(),
    isAcyclic: vw(),
    postorder: _w(),
    preorder: gw(),
    prim: yw(),
    tarjan: I_(),
    topsort: O_()
  }), ho;
}
var po, Vd;
function mw() {
  if (Vd) return po;
  Vd = 1;
  var e = cw();
  return po = {
    Graph: e.Graph,
    json: fw(),
    alg: bw(),
    version: e.version
  }, po;
}
var Or;
if (typeof zu == "function")
  try {
    Or = mw();
  } catch {
  }
Or || (Or = window.graphlib);
var ye = Or, vo, Kd;
function ww() {
  if (Kd) return vo;
  Kd = 1;
  var e = a_(), t = 1, r = 4;
  function n(i) {
    return e(i, t | r);
  }
  return vo = n, vo;
}
var _o, Wd;
function an() {
  if (Wd) return _o;
  Wd = 1;
  var e = $t(), t = De(), r = Yr(), n = le();
  function i(a, s, o) {
    if (!n(o))
      return !1;
    var u = typeof s;
    return (u == "number" ? t(o) && r(s, o.length) : u == "string" && s in o) ? e(o[s], a) : !1;
  }
  return _o = i, _o;
}
var go, Yd;
function xw() {
  if (Yd) return go;
  Yd = 1;
  var e = nn(), t = $t(), r = an(), n = dt(), i = Object.prototype, a = i.hasOwnProperty, s = e(function(o, u) {
    o = Object(o);
    var f = -1, c = u.length, l = c > 2 ? u[2] : void 0;
    for (l && r(u[0], u[1], l) && (c = 1); ++f < c; )
      for (var h = u[f], d = n(h), p = -1, v = d.length; ++p < v; ) {
        var _ = d[p], y = o[_];
        (y === void 0 || t(y, i[_]) && !a.call(o, _)) && (o[_] = h[_]);
      }
    return o;
  });
  return go = s, go;
}
var yo, Xd;
function Ew() {
  if (Xd) return yo;
  Xd = 1;
  var e = ze(), t = De(), r = Ze();
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
  return yo = n, yo;
}
var bo, Zd;
function Aw() {
  if (Zd) return bo;
  Zd = 1;
  var e = /\s/;
  function t(r) {
    for (var n = r.length; n-- && e.test(r.charAt(n)); )
      ;
    return n;
  }
  return bo = t, bo;
}
var mo, Jd;
function qw() {
  if (Jd) return mo;
  Jd = 1;
  var e = Aw(), t = /^\s+/;
  function r(n) {
    return n && n.slice(0, e(n) + 1).replace(t, "");
  }
  return mo = r, mo;
}
var wo, Qd;
function $w() {
  if (Qd) return wo;
  Qd = 1;
  var e = qw(), t = le(), r = Tt(), n = NaN, i = /^[-+]0x[0-9a-f]+$/i, a = /^0b[01]+$/i, s = /^0o[0-7]+$/i, o = parseInt;
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
  return wo = u, wo;
}
var xo, ep;
function P_() {
  if (ep) return xo;
  ep = 1;
  var e = $w(), t = 1 / 0, r = 17976931348623157e292;
  function n(i) {
    if (!i)
      return i === 0 ? i : 0;
    if (i = e(i), i === t || i === -t) {
      var a = i < 0 ? -1 : 1;
      return a * r;
    }
    return i === i ? i : 0;
  }
  return xo = n, xo;
}
var Eo, tp;
function Sw() {
  if (tp) return Eo;
  tp = 1;
  var e = P_();
  function t(r) {
    var n = e(r), i = n % 1;
    return n === n ? i ? n - i : n : 0;
  }
  return Eo = t, Eo;
}
var Ao, rp;
function Rw() {
  if (rp) return Ao;
  rp = 1;
  var e = S_(), t = ze(), r = Sw(), n = Math.max;
  function i(a, s, o) {
    var u = a == null ? 0 : a.length;
    if (!u)
      return -1;
    var f = o == null ? 0 : r(o);
    return f < 0 && (f = n(u + f, 0)), e(a, t(s, 3), f);
  }
  return Ao = i, Ao;
}
var qo, np;
function Cw() {
  if (np) return qo;
  np = 1;
  var e = Ew(), t = Rw(), r = e(t);
  return qo = r, qo;
}
var $o, ip;
function N_() {
  if (ip) return $o;
  ip = 1;
  var e = tc();
  function t(r) {
    var n = r == null ? 0 : r.length;
    return n ? e(r, 1) : [];
  }
  return $o = t, $o;
}
var So, ap;
function Tw() {
  if (ap) return So;
  ap = 1;
  var e = Zu(), t = s_(), r = dt();
  function n(i, a) {
    return i == null ? i : e(i, t(a), r);
  }
  return So = n, So;
}
var Ro, sp;
function kw() {
  if (sp) return Ro;
  sp = 1;
  function e(t) {
    var r = t == null ? 0 : t.length;
    return r ? t[r - 1] : void 0;
  }
  return Ro = e, Ro;
}
var Co, op;
function Iw() {
  if (op) return Co;
  op = 1;
  var e = Kr(), t = Ju(), r = ze();
  function n(i, a) {
    var s = {};
    return a = r(a, 3), t(i, function(o, u, f) {
      e(s, u, a(o, u, f));
    }), s;
  }
  return Co = n, Co;
}
var To, up;
function nc() {
  if (up) return To;
  up = 1;
  var e = Tt();
  function t(r, n, i) {
    for (var a = -1, s = r.length; ++a < s; ) {
      var o = r[a], u = n(o);
      if (u != null && (f === void 0 ? u === u && !e(u) : i(u, f)))
        var f = u, c = o;
    }
    return c;
  }
  return To = t, To;
}
var ko, cp;
function Ow() {
  if (cp) return ko;
  cp = 1;
  function e(t, r) {
    return t > r;
  }
  return ko = e, ko;
}
var Io, fp;
function Mw() {
  if (fp) return Io;
  fp = 1;
  var e = nc(), t = Ow(), r = pt();
  function n(i) {
    return i && i.length ? e(i, r, t) : void 0;
  }
  return Io = n, Io;
}
var Oo, lp;
function L_() {
  if (lp) return Oo;
  lp = 1;
  var e = Kr(), t = $t();
  function r(n, i, a) {
    (a !== void 0 && !t(n[i], a) || a === void 0 && !(i in n)) && e(n, i, a);
  }
  return Oo = r, Oo;
}
var Mo, hp;
function Pw() {
  if (hp) return Mo;
  hp = 1;
  var e = lt(), t = Jr(), r = qe(), n = "[object Object]", i = Function.prototype, a = Object.prototype, s = i.toString, o = a.hasOwnProperty, u = s.call(Object);
  function f(c) {
    if (!r(c) || e(c) != n)
      return !1;
    var l = t(c);
    if (l === null)
      return !0;
    var h = o.call(l, "constructor") && l.constructor;
    return typeof h == "function" && h instanceof h && s.call(h) == u;
  }
  return Mo = f, Mo;
}
var Po, dp;
function F_() {
  if (dp) return Po;
  dp = 1;
  function e(t, r) {
    if (!(r === "constructor" && typeof t[r] == "function") && r != "__proto__")
      return t[r];
  }
  return Po = e, Po;
}
var No, pp;
function Nw() {
  if (pp) return No;
  pp = 1;
  var e = nr(), t = dt();
  function r(n) {
    return e(n, t(n));
  }
  return No = r, No;
}
var Lo, vp;
function Lw() {
  if (vp) return Lo;
  vp = 1;
  var e = L_(), t = Kv(), r = r_(), n = Wv(), i = i_(), a = ir(), s = ee(), o = R_(), u = Rt(), f = rr(), c = le(), l = Pw(), h = ar(), d = F_(), p = Nw();
  function v(_, y, w, b, x, R, $) {
    var q = d(_, w), k = d(y, w), F = $.get(k);
    if (F) {
      e(_, w, F);
      return;
    }
    var P = R ? R(q, k, w + "", _, y, $) : void 0, E = P === void 0;
    if (E) {
      var I = s(k), N = !I && u(k), g = !I && !N && h(k);
      P = k, I || N || g ? s(q) ? P = q : o(q) ? P = n(q) : N ? (E = !1, P = t(k, !0)) : g ? (E = !1, P = r(k, !0)) : P = [] : l(k) || a(k) ? (P = q, a(q) ? P = p(q) : (!c(q) || f(q)) && (P = i(k))) : E = !1;
    }
    E && ($.set(k, P), x(P, k, b, R, $), $.delete(k)), e(_, w, P);
  }
  return Lo = v, Lo;
}
var Fo, _p;
function Fw() {
  if (_p) return Fo;
  _p = 1;
  var e = Vr(), t = L_(), r = Zu(), n = Lw(), i = le(), a = dt(), s = F_();
  function o(u, f, c, l, h) {
    u !== f && r(f, function(d, p) {
      if (h || (h = new e()), i(d))
        n(u, f, p, c, o, l, h);
      else {
        var v = l ? l(s(u, p), d, p + "", u, f, h) : void 0;
        v === void 0 && (v = d), t(u, p, v);
      }
    }, a);
  }
  return Fo = o, Fo;
}
var Do, gp;
function Dw() {
  if (gp) return Do;
  gp = 1;
  var e = nn(), t = an();
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
  return Do = r, Do;
}
var zo, yp;
function zw() {
  if (yp) return zo;
  yp = 1;
  var e = Fw(), t = Dw(), r = t(function(n, i, a) {
    e(n, i, a);
  });
  return zo = r, zo;
}
var jo, bp;
function D_() {
  if (bp) return jo;
  bp = 1;
  function e(t, r) {
    return t < r;
  }
  return jo = e, jo;
}
var Go, mp;
function jw() {
  if (mp) return Go;
  mp = 1;
  var e = nc(), t = D_(), r = pt();
  function n(i) {
    return i && i.length ? e(i, r, t) : void 0;
  }
  return Go = n, Go;
}
var Uo, wp;
function Gw() {
  if (wp) return Uo;
  wp = 1;
  var e = nc(), t = ze(), r = D_();
  function n(i, a) {
    return i && i.length ? e(i, t(a, 2), r) : void 0;
  }
  return Uo = n, Uo;
}
var Bo, xp;
function Uw() {
  if (xp) return Bo;
  xp = 1;
  var e = ge(), t = function() {
    return e.Date.now();
  };
  return Bo = t, Bo;
}
var Ho, Ep;
function Bw() {
  if (Ep) return Ho;
  Ep = 1;
  var e = Wr(), t = tn(), r = Yr(), n = le(), i = sr();
  function a(s, o, u, f) {
    if (!n(s))
      return s;
    o = t(o, s);
    for (var c = -1, l = o.length, h = l - 1, d = s; d != null && ++c < l; ) {
      var p = i(o[c]), v = u;
      if (p === "__proto__" || p === "constructor" || p === "prototype")
        return s;
      if (c != h) {
        var _ = d[p];
        v = f ? f(_, p, d) : void 0, v === void 0 && (v = n(_) ? _ : r(o[c + 1]) ? [] : {});
      }
      e(d, p, v), d = d[p];
    }
    return s;
  }
  return Ho = a, Ho;
}
var Vo, Ap;
function Hw() {
  if (Ap) return Vo;
  Ap = 1;
  var e = rn(), t = Bw(), r = tn();
  function n(i, a, s) {
    for (var o = -1, u = a.length, f = {}; ++o < u; ) {
      var c = a[o], l = e(i, c);
      s(l, c) && t(f, r(c, i), l);
    }
    return f;
  }
  return Vo = n, Vo;
}
var Ko, qp;
function Vw() {
  if (qp) return Ko;
  qp = 1;
  var e = Hw(), t = g_();
  function r(n, i) {
    return e(n, i, function(a, s) {
      return t(n, s);
    });
  }
  return Ko = r, Ko;
}
var Wo, $p;
function Kw() {
  if ($p) return Wo;
  $p = 1;
  var e = N_(), t = q_(), r = $_();
  function n(i) {
    return r(t(i, void 0, e), i + "");
  }
  return Wo = n, Wo;
}
var Yo, Sp;
function Ww() {
  if (Sp) return Yo;
  Sp = 1;
  var e = Vw(), t = Kw(), r = t(function(n, i) {
    return n == null ? {} : e(n, i);
  });
  return Yo = r, Yo;
}
var Xo, Rp;
function Yw() {
  if (Rp) return Xo;
  Rp = 1;
  var e = Math.ceil, t = Math.max;
  function r(n, i, a, s) {
    for (var o = -1, u = t(e((i - n) / (a || 1)), 0), f = Array(u); u--; )
      f[s ? u : ++o] = n, n += a;
    return f;
  }
  return Xo = r, Xo;
}
var Zo, Cp;
function Xw() {
  if (Cp) return Zo;
  Cp = 1;
  var e = Yw(), t = an(), r = P_();
  function n(i) {
    return function(a, s, o) {
      return o && typeof o != "number" && t(a, s, o) && (s = o = void 0), a = r(a), s === void 0 ? (s = a, a = 0) : s = r(s), o = o === void 0 ? a < s ? 1 : -1 : r(o), e(a, s, o, i);
    };
  }
  return Zo = n, Zo;
}
var Jo, Tp;
function Zw() {
  if (Tp) return Jo;
  Tp = 1;
  var e = Xw(), t = e();
  return Jo = t, Jo;
}
var Qo, kp;
function Jw() {
  if (kp) return Qo;
  kp = 1;
  function e(t, r) {
    var n = t.length;
    for (t.sort(r); n--; )
      t[n] = t[n].value;
    return t;
  }
  return Qo = e, Qo;
}
var eu, Ip;
function Qw() {
  if (Ip) return eu;
  Ip = 1;
  var e = Tt();
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
  return eu = t, eu;
}
var tu, Op;
function ex() {
  if (Op) return tu;
  Op = 1;
  var e = Qw();
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
  return tu = t, tu;
}
var ru, Mp;
function tx() {
  if (Mp) return ru;
  Mp = 1;
  var e = en(), t = rn(), r = ze(), n = x_(), i = Jw(), a = Xr(), s = ex(), o = pt(), u = ee();
  function f(c, l, h) {
    l.length ? l = e(l, function(v) {
      return u(v) ? function(_) {
        return t(_, v.length === 1 ? v[0] : v);
      } : v;
    }) : l = [o];
    var d = -1;
    l = e(l, a(r));
    var p = n(c, function(v, _, y) {
      var w = e(l, function(b) {
        return b(v);
      });
      return { criteria: w, index: ++d, value: v };
    });
    return i(p, function(v, _) {
      return s(v, _, h);
    });
  }
  return ru = f, ru;
}
var nu, Pp;
function rx() {
  if (Pp) return nu;
  Pp = 1;
  var e = tc(), t = tx(), r = nn(), n = an(), i = r(function(a, s) {
    if (a == null)
      return [];
    var o = s.length;
    return o > 1 && n(a, s[0], s[1]) ? s = [] : o > 2 && n(s[0], s[1], s[2]) && (s = [s[0]]), t(a, e(s, 1), []);
  });
  return nu = i, nu;
}
var iu, Np;
function nx() {
  if (Np) return iu;
  Np = 1;
  var e = v_(), t = 0;
  function r(n) {
    var i = ++t;
    return e(n) + i;
  }
  return iu = r, iu;
}
var au, Lp;
function ix() {
  if (Lp) return au;
  Lp = 1;
  function e(t, r, n) {
    for (var i = -1, a = t.length, s = r.length, o = {}; ++i < a; ) {
      var u = i < s ? r[i] : void 0;
      n(o, t[i], u);
    }
    return o;
  }
  return au = e, au;
}
var su, Fp;
function ax() {
  if (Fp) return su;
  Fp = 1;
  var e = Wr(), t = ix();
  function r(n, i) {
    return t(n || [], i || [], e);
  }
  return su = r, su;
}
var Mr;
if (typeof zu == "function")
  try {
    Mr = {
      cloneDeep: ww(),
      constant: Xu(),
      defaults: xw(),
      each: u_(),
      filter: b_(),
      find: Cw(),
      flatten: N_(),
      forEach: o_(),
      forIn: Tw(),
      has: m_(),
      isUndefined: w_(),
      last: kw(),
      map: E_(),
      mapValues: Iw(),
      max: Mw(),
      merge: zw(),
      min: jw(),
      minBy: Gw(),
      now: Uw(),
      pick: Ww(),
      range: Zw(),
      reduce: A_(),
      sortBy: rx(),
      uniqueId: nx(),
      values: C_(),
      zipObject: ax()
    };
  } catch {
  }
Mr || (Mr = window._);
var X = Mr, sx = sn;
function sn() {
  var e = {};
  e._next = e._prev = e, this._sentinel = e;
}
sn.prototype.dequeue = function() {
  var e = this._sentinel, t = e._prev;
  if (t !== e)
    return z_(t), t;
};
sn.prototype.enqueue = function(e) {
  var t = this._sentinel;
  e._prev && e._next && z_(e), e._next = t._next, t._next._prev = e, t._next = e, e._prev = t;
};
sn.prototype.toString = function() {
  for (var e = [], t = this._sentinel, r = t._prev; r !== t; )
    e.push(JSON.stringify(r, ox)), r = r._prev;
  return "[" + e.join(", ") + "]";
};
function z_(e) {
  e._prev._next = e._next, e._next._prev = e._prev, delete e._next, delete e._prev;
}
function ox(e, t) {
  if (e !== "_next" && e !== "_prev")
    return t;
}
var Pe = X, ux = ye.Graph, cx = sx, fx = hx, lx = Pe.constant(1);
function hx(e, t) {
  if (e.nodeCount() <= 1)
    return [];
  var r = px(e, t || lx), n = dx(r.graph, r.buckets, r.zeroIdx);
  return Pe.flatten(Pe.map(n, function(i) {
    return e.outEdges(i.v, i.w);
  }), !0);
}
function dx(e, t, r) {
  for (var n = [], i = t[t.length - 1], a = t[0], s; e.nodeCount(); ) {
    for (; s = a.dequeue(); )
      ou(e, t, r, s);
    for (; s = i.dequeue(); )
      ou(e, t, r, s);
    if (e.nodeCount()) {
      for (var o = t.length - 2; o > 0; --o)
        if (s = t[o].dequeue(), s) {
          n = n.concat(ou(e, t, r, s, !0));
          break;
        }
    }
  }
  return n;
}
function ou(e, t, r, n, i) {
  var a = i ? [] : void 0;
  return Pe.forEach(e.inEdges(n.v), function(s) {
    var o = e.edge(s), u = e.node(s.v);
    i && a.push({ v: s.v, w: s.w }), u.out -= o, qu(t, r, u);
  }), Pe.forEach(e.outEdges(n.v), function(s) {
    var o = e.edge(s), u = s.w, f = e.node(u);
    f.in -= o, qu(t, r, f);
  }), e.removeNode(n.v), a;
}
function px(e, t) {
  var r = new ux(), n = 0, i = 0;
  Pe.forEach(e.nodes(), function(o) {
    r.setNode(o, { v: o, in: 0, out: 0 });
  }), Pe.forEach(e.edges(), function(o) {
    var u = r.edge(o.v, o.w) || 0, f = t(o), c = u + f;
    r.setEdge(o.v, o.w, c), i = Math.max(i, r.node(o.v).out += f), n = Math.max(n, r.node(o.w).in += f);
  });
  var a = Pe.range(i + n + 3).map(function() {
    return new cx();
  }), s = n + 1;
  return Pe.forEach(r.nodes(), function(o) {
    qu(a, s, r.node(o));
  }), { graph: r, buckets: a, zeroIdx: s };
}
function qu(e, t, r) {
  r.out ? r.in ? e[r.out - r.in + t].enqueue(r) : e[e.length - 1].enqueue(r) : e[0].enqueue(r);
}
var at = X, vx = fx, _x = {
  run: gx,
  undo: bx
};
function gx(e) {
  var t = e.graph().acyclicer === "greedy" ? vx(e, r(e)) : yx(e);
  at.forEach(t, function(n) {
    var i = e.edge(n);
    e.removeEdge(n), i.forwardName = n.name, i.reversed = !0, e.setEdge(n.w, n.v, i, at.uniqueId("rev"));
  });
  function r(n) {
    return function(i) {
      return n.edge(i).weight;
    };
  }
}
function yx(e) {
  var t = [], r = {}, n = {};
  function i(a) {
    at.has(n, a) || (n[a] = !0, r[a] = !0, at.forEach(e.outEdges(a), function(s) {
      at.has(r, s.w) ? t.push(s) : i(s.w);
    }), delete r[a]);
  }
  return at.forEach(e.nodes(), i), t;
}
function bx(e) {
  at.forEach(e.edges(), function(t) {
    var r = e.edge(t);
    if (r.reversed) {
      e.removeEdge(t);
      var n = r.forwardName;
      delete r.reversed, delete r.forwardName, e.setEdge(t.w, t.v, r, n);
    }
  });
}
var K = X, j_ = ye.Graph, se = {
  addDummyNode: G_,
  simplify: mx,
  asNonCompoundGraph: wx,
  successorWeights: xx,
  predecessorWeights: Ex,
  intersectRect: Ax,
  buildLayerMatrix: qx,
  normalizeRanks: $x,
  removeEmptyRanks: Sx,
  addBorderNode: Rx,
  maxRank: U_,
  partition: Cx,
  time: Tx,
  notime: kx
};
function G_(e, t, r, n) {
  var i;
  do
    i = K.uniqueId(n);
  while (e.hasNode(i));
  return r.dummy = t, e.setNode(i, r), i;
}
function mx(e) {
  var t = new j_().setGraph(e.graph());
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
function wx(e) {
  var t = new j_({ multigraph: e.isMultigraph() }).setGraph(e.graph());
  return K.forEach(e.nodes(), function(r) {
    e.children(r).length || t.setNode(r, e.node(r));
  }), K.forEach(e.edges(), function(r) {
    t.setEdge(r, e.edge(r));
  }), t;
}
function xx(e) {
  var t = K.map(e.nodes(), function(r) {
    var n = {};
    return K.forEach(e.outEdges(r), function(i) {
      n[i.w] = (n[i.w] || 0) + e.edge(i).weight;
    }), n;
  });
  return K.zipObject(e.nodes(), t);
}
function Ex(e) {
  var t = K.map(e.nodes(), function(r) {
    var n = {};
    return K.forEach(e.inEdges(r), function(i) {
      n[i.v] = (n[i.v] || 0) + e.edge(i).weight;
    }), n;
  });
  return K.zipObject(e.nodes(), t);
}
function Ax(e, t) {
  var r = e.x, n = e.y, i = t.x - r, a = t.y - n, s = e.width / 2, o = e.height / 2;
  if (!i && !a)
    throw new Error("Not possible to find intersection inside of the rectangle");
  var u, f;
  return Math.abs(a) * s > Math.abs(i) * o ? (a < 0 && (o = -o), u = o * i / a, f = o) : (i < 0 && (s = -s), u = s, f = s * a / i), { x: r + u, y: n + f };
}
function qx(e) {
  var t = K.map(K.range(U_(e) + 1), function() {
    return [];
  });
  return K.forEach(e.nodes(), function(r) {
    var n = e.node(r), i = n.rank;
    K.isUndefined(i) || (t[i][n.order] = r);
  }), t;
}
function $x(e) {
  var t = K.min(K.map(e.nodes(), function(r) {
    return e.node(r).rank;
  }));
  K.forEach(e.nodes(), function(r) {
    var n = e.node(r);
    K.has(n, "rank") && (n.rank -= t);
  });
}
function Sx(e) {
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
function Rx(e, t, r, n) {
  var i = {
    width: 0,
    height: 0
  };
  return arguments.length >= 4 && (i.rank = r, i.order = n), G_(e, "border", i, t);
}
function U_(e) {
  return K.max(K.map(e.nodes(), function(t) {
    var r = e.node(t).rank;
    if (!K.isUndefined(r))
      return r;
  }));
}
function Cx(e, t) {
  var r = { lhs: [], rhs: [] };
  return K.forEach(e, function(n) {
    t(n) ? r.lhs.push(n) : r.rhs.push(n);
  }), r;
}
function Tx(e, t) {
  var r = K.now();
  try {
    return t();
  } finally {
    console.log(e + " time: " + (K.now() - r) + "ms");
  }
}
function kx(e, t) {
  return t();
}
var B_ = X, Ix = se, Ox = {
  run: Mx,
  undo: Nx
};
function Mx(e) {
  e.graph().dummyChains = [], B_.forEach(e.edges(), function(t) {
    Px(e, t);
  });
}
function Px(e, t) {
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
      }, f = Ix.addDummyNode(e, "edge", c, "_d"), n === u && (c.width = o.width, c.height = o.height, c.dummy = "edge-label", c.labelpos = o.labelpos), e.setEdge(r, f, { weight: o.weight }, s), l === 0 && e.graph().dummyChains.push(f), r = f;
    e.setEdge(r, i, { weight: o.weight }, s);
  }
}
function Nx(e) {
  B_.forEach(e.graph().dummyChains, function(t) {
    var r = e.node(t), n = r.edgeLabel, i;
    for (e.setEdge(r.edgeObj, n); r.dummy; )
      i = e.successors(t)[0], e.removeNode(t), n.points.push({ x: r.x, y: r.y }), r.dummy === "edge-label" && (n.x = r.x, n.y = r.y, n.width = r.width, n.height = r.height), t = i, r = e.node(t);
  });
}
var yr = X, on = {
  longestPath: Lx,
  slack: Fx
};
function Lx(e) {
  var t = {};
  function r(n) {
    var i = e.node(n);
    if (yr.has(t, n))
      return i.rank;
    t[n] = !0;
    var a = yr.min(yr.map(e.outEdges(n), function(s) {
      return r(s.w) - e.edge(s).minlen;
    }));
    return (a === Number.POSITIVE_INFINITY || // return value of _.map([]) for Lodash 3
    a === void 0 || // return value of _.map([]) for Lodash 4
    a === null) && (a = 0), i.rank = a;
  }
  yr.forEach(e.sources(), r);
}
function Fx(e, t) {
  return e.node(t.w).rank - e.node(t.v).rank - e.edge(t).minlen;
}
var Pr = X, Dx = ye.Graph, Nr = on.slack, H_ = zx;
function zx(e) {
  var t = new Dx({ directed: !1 }), r = e.nodes()[0], n = e.nodeCount();
  t.setNode(r, {});
  for (var i, a; jx(t, e) < n; )
    i = Gx(t, e), a = t.hasNode(i.v) ? Nr(e, i) : -Nr(e, i), Ux(t, e, a);
  return t;
}
function jx(e, t) {
  function r(n) {
    Pr.forEach(t.nodeEdges(n), function(i) {
      var a = i.v, s = n === a ? i.w : a;
      !e.hasNode(s) && !Nr(t, i) && (e.setNode(s, {}), e.setEdge(n, s, {}), r(s));
    });
  }
  return Pr.forEach(e.nodes(), r), e.nodeCount();
}
function Gx(e, t) {
  return Pr.minBy(t.edges(), function(r) {
    if (e.hasNode(r.v) !== e.hasNode(r.w))
      return Nr(t, r);
  });
}
function Ux(e, t, r) {
  Pr.forEach(e.nodes(), function(n) {
    t.node(n).rank += r;
  });
}
var Fe = X, Bx = H_, Hx = on.slack, Vx = on.longestPath, Kx = ye.alg.preorder, Wx = ye.alg.postorder, Yx = se.simplify, Xx = vt;
vt.initLowLimValues = ac;
vt.initCutValues = ic;
vt.calcCutValue = V_;
vt.leaveEdge = W_;
vt.enterEdge = Y_;
vt.exchangeEdges = X_;
function vt(e) {
  e = Yx(e), Vx(e);
  var t = Bx(e);
  ac(t), ic(t, e);
  for (var r, n; r = W_(t); )
    n = Y_(t, e, r), X_(t, e, r, n);
}
function ic(e, t) {
  var r = Wx(e, e.nodes());
  r = r.slice(0, r.length - 1), Fe.forEach(r, function(n) {
    Zx(e, t, n);
  });
}
function Zx(e, t, r) {
  var n = e.node(r), i = n.parent;
  e.edge(r, i).cutvalue = V_(e, t, r);
}
function V_(e, t, r) {
  var n = e.node(r), i = n.parent, a = !0, s = t.edge(r, i), o = 0;
  return s || (a = !1, s = t.edge(i, r)), o = s.weight, Fe.forEach(t.nodeEdges(r), function(u) {
    var f = u.v === r, c = f ? u.w : u.v;
    if (c !== i) {
      var l = f === a, h = t.edge(u).weight;
      if (o += l ? h : -h, Qx(e, r, c)) {
        var d = e.edge(r, c).cutvalue;
        o += l ? -d : d;
      }
    }
  }), o;
}
function ac(e, t) {
  arguments.length < 2 && (t = e.nodes()[0]), K_(e, {}, 1, t);
}
function K_(e, t, r, n, i) {
  var a = r, s = e.node(n);
  return t[n] = !0, Fe.forEach(e.neighbors(n), function(o) {
    Fe.has(t, o) || (r = K_(e, t, r, o, n));
  }), s.low = a, s.lim = r++, i ? s.parent = i : delete s.parent, r;
}
function W_(e) {
  return Fe.find(e.edges(), function(t) {
    return e.edge(t).cutvalue < 0;
  });
}
function Y_(e, t, r) {
  var n = r.v, i = r.w;
  t.hasEdge(n, i) || (n = r.w, i = r.v);
  var a = e.node(n), s = e.node(i), o = a, u = !1;
  a.lim > s.lim && (o = s, u = !0);
  var f = Fe.filter(t.edges(), function(c) {
    return u === Dp(e, e.node(c.v), o) && u !== Dp(e, e.node(c.w), o);
  });
  return Fe.minBy(f, function(c) {
    return Hx(t, c);
  });
}
function X_(e, t, r, n) {
  var i = r.v, a = r.w;
  e.removeEdge(i, a), e.setEdge(n.v, n.w, {}), ac(e), ic(e, t), Jx(e, t);
}
function Jx(e, t) {
  var r = Fe.find(e.nodes(), function(i) {
    return !t.node(i).parent;
  }), n = Kx(e, r);
  n = n.slice(1), Fe.forEach(n, function(i) {
    var a = e.node(i).parent, s = t.edge(i, a), o = !1;
    s || (s = t.edge(a, i), o = !0), t.node(i).rank = t.node(a).rank + (o ? s.minlen : -s.minlen);
  });
}
function Qx(e, t, r) {
  return e.hasEdge(t, r);
}
function Dp(e, t, r) {
  return r.low <= t.lim && t.lim <= r.lim;
}
var eE = on, Z_ = eE.longestPath, tE = H_, rE = Xx, nE = iE;
function iE(e) {
  switch (e.graph().ranker) {
    case "network-simplex":
      zp(e);
      break;
    case "tight-tree":
      sE(e);
      break;
    case "longest-path":
      aE(e);
      break;
    default:
      zp(e);
  }
}
var aE = Z_;
function sE(e) {
  Z_(e), tE(e);
}
function zp(e) {
  rE(e);
}
var $u = X, oE = uE;
function uE(e) {
  var t = fE(e);
  $u.forEach(e.graph().dummyChains, function(r) {
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
    $u.forEach(e.children(i), n), t[i] = { low: a, lim: r++ };
  }
  return $u.forEach(e.children(), n), t;
}
var Ne = X, Su = se, lE = {
  run: hE,
  cleanup: vE
};
function hE(e) {
  var t = Su.addDummyNode(e, "root", {}, "_root"), r = dE(e), n = Ne.max(Ne.values(r)) - 1, i = 2 * n + 1;
  e.graph().nestingRoot = t, Ne.forEach(e.edges(), function(s) {
    e.edge(s).minlen *= i;
  });
  var a = pE(e) + 1;
  Ne.forEach(e.children(), function(s) {
    J_(e, t, i, a, n, r, s);
  }), e.graph().nodeRankFactor = i;
}
function J_(e, t, r, n, i, a, s) {
  var o = e.children(s);
  if (!o.length) {
    s !== t && e.setEdge(t, s, { weight: 0, minlen: r });
    return;
  }
  var u = Su.addBorderNode(e, "_bt"), f = Su.addBorderNode(e, "_bb"), c = e.node(s);
  e.setParent(u, s), c.borderTop = u, e.setParent(f, s), c.borderBottom = f, Ne.forEach(o, function(l) {
    J_(e, t, r, n, i, a, l);
    var h = e.node(l), d = h.borderTop ? h.borderTop : l, p = h.borderBottom ? h.borderBottom : l, v = h.borderTop ? n : 2 * n, _ = d !== p ? 1 : i - a[s] + 1;
    e.setEdge(u, d, {
      weight: v,
      minlen: _,
      nestingEdge: !0
    }), e.setEdge(p, f, {
      weight: v,
      minlen: _,
      nestingEdge: !0
    });
  }), e.parent(s) || e.setEdge(t, u, { weight: 0, minlen: i + a[s] });
}
function dE(e) {
  var t = {};
  function r(n, i) {
    var a = e.children(n);
    a && a.length && Ne.forEach(a, function(s) {
      r(s, i + 1);
    }), t[n] = i;
  }
  return Ne.forEach(e.children(), function(n) {
    r(n, 1);
  }), t;
}
function pE(e) {
  return Ne.reduce(e.edges(), function(t, r) {
    return t + e.edge(r).weight;
  }, 0);
}
function vE(e) {
  var t = e.graph();
  e.removeNode(t.nestingRoot), delete t.nestingRoot, Ne.forEach(e.edges(), function(r) {
    var n = e.edge(r);
    n.nestingEdge && e.removeEdge(r);
  });
}
var uu = X, _E = se, gE = yE;
function yE(e) {
  function t(r) {
    var n = e.children(r), i = e.node(r);
    if (n.length && uu.forEach(n, t), uu.has(i, "minRank")) {
      i.borderLeft = [], i.borderRight = [];
      for (var a = i.minRank, s = i.maxRank + 1; a < s; ++a)
        jp(e, "borderLeft", "_bl", r, i, a), jp(e, "borderRight", "_br", r, i, a);
    }
  }
  uu.forEach(e.children(), t);
}
function jp(e, t, r, n, i, a) {
  var s = { width: 0, height: 0, rank: a, borderType: t }, o = i[t][a - 1], u = _E.addDummyNode(e, "border", s, r);
  i[t][a] = u, e.setParent(u, n), o && e.setEdge(o, u, { weight: 1 });
}
var xe = X, bE = {
  adjust: mE,
  undo: wE
};
function mE(e) {
  var t = e.graph().rankdir.toLowerCase();
  (t === "lr" || t === "rl") && Q_(e);
}
function wE(e) {
  var t = e.graph().rankdir.toLowerCase();
  (t === "bt" || t === "rl") && xE(e), (t === "lr" || t === "rl") && (EE(e), Q_(e));
}
function Q_(e) {
  xe.forEach(e.nodes(), function(t) {
    Gp(e.node(t));
  }), xe.forEach(e.edges(), function(t) {
    Gp(e.edge(t));
  });
}
function Gp(e) {
  var t = e.width;
  e.width = e.height, e.height = t;
}
function xE(e) {
  xe.forEach(e.nodes(), function(t) {
    cu(e.node(t));
  }), xe.forEach(e.edges(), function(t) {
    var r = e.edge(t);
    xe.forEach(r.points, cu), xe.has(r, "y") && cu(r);
  });
}
function cu(e) {
  e.y = -e.y;
}
function EE(e) {
  xe.forEach(e.nodes(), function(t) {
    fu(e.node(t));
  }), xe.forEach(e.edges(), function(t) {
    var r = e.edge(t);
    xe.forEach(r.points, fu), xe.has(r, "x") && fu(r);
  });
}
function fu(e) {
  var t = e.x;
  e.x = e.y, e.y = t;
}
var Ie = X, AE = qE;
function qE(e) {
  var t = {}, r = Ie.filter(e.nodes(), function(o) {
    return !e.children(o).length;
  }), n = Ie.max(Ie.map(r, function(o) {
    return e.node(o).rank;
  })), i = Ie.map(Ie.range(n + 1), function() {
    return [];
  });
  function a(o) {
    if (!Ie.has(t, o)) {
      t[o] = !0;
      var u = e.node(o);
      i[u.rank].push(o), Ie.forEach(e.successors(o), a);
    }
  }
  var s = Ie.sortBy(r, function(o) {
    return e.node(o).rank;
  });
  return Ie.forEach(s, a), i;
}
var Be = X, $E = SE;
function SE(e, t) {
  for (var r = 0, n = 1; n < t.length; ++n)
    r += RE(e, t[n - 1], t[n]);
  return r;
}
function RE(e, t, r) {
  for (var n = Be.zipObject(
    r,
    Be.map(r, function(f, c) {
      return c;
    })
  ), i = Be.flatten(Be.map(t, function(f) {
    return Be.sortBy(Be.map(e.outEdges(f), function(c) {
      return { pos: n[c.w], weight: e.edge(c).weight };
    }), "pos");
  }), !0), a = 1; a < r.length; ) a <<= 1;
  var s = 2 * a - 1;
  a -= 1;
  var o = Be.map(new Array(s), function() {
    return 0;
  }), u = 0;
  return Be.forEach(i.forEach(function(f) {
    var c = f.pos + a;
    o[c] += f.weight;
    for (var l = 0; c > 0; )
      c % 2 && (l += o[c + 1]), c = c - 1 >> 1, o[c] += f.weight;
    u += f.weight * l;
  })), u;
}
var Up = X, CE = TE;
function TE(e, t) {
  return Up.map(t, function(r) {
    var n = e.inEdges(r);
    if (n.length) {
      var i = Up.reduce(n, function(a, s) {
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
var ue = X, kE = IE;
function IE(e, t) {
  var r = {};
  ue.forEach(e, function(i, a) {
    var s = r[i.v] = {
      indegree: 0,
      in: [],
      out: [],
      vs: [i.v],
      i: a
    };
    ue.isUndefined(i.barycenter) || (s.barycenter = i.barycenter, s.weight = i.weight);
  }), ue.forEach(t.edges(), function(i) {
    var a = r[i.v], s = r[i.w];
    !ue.isUndefined(a) && !ue.isUndefined(s) && (s.indegree++, a.out.push(r[i.w]));
  });
  var n = ue.filter(r, function(i) {
    return !i.indegree;
  });
  return OE(n);
}
function OE(e) {
  var t = [];
  function r(a) {
    return function(s) {
      s.merged || (ue.isUndefined(s.barycenter) || ue.isUndefined(a.barycenter) || s.barycenter >= a.barycenter) && ME(a, s);
    };
  }
  function n(a) {
    return function(s) {
      s.in.push(a), --s.indegree === 0 && e.push(s);
    };
  }
  for (; e.length; ) {
    var i = e.pop();
    t.push(i), ue.forEach(i.in.reverse(), r(i)), ue.forEach(i.out, n(i));
  }
  return ue.map(
    ue.filter(t, function(a) {
      return !a.merged;
    }),
    function(a) {
      return ue.pick(a, ["vs", "i", "barycenter", "weight"]);
    }
  );
}
function ME(e, t) {
  var r = 0, n = 0;
  e.weight && (r += e.barycenter * e.weight, n += e.weight), t.weight && (r += t.barycenter * t.weight, n += t.weight), e.vs = t.vs.concat(e.vs), e.barycenter = r / n, e.weight = n, e.i = Math.min(t.i, e.i), t.merged = !0;
}
var zt = X, PE = se, NE = LE;
function LE(e, t) {
  var r = PE.partition(e, function(c) {
    return zt.has(c, "barycenter");
  }), n = r.lhs, i = zt.sortBy(r.rhs, function(c) {
    return -c.i;
  }), a = [], s = 0, o = 0, u = 0;
  n.sort(FE(!!t)), u = Bp(a, i, u), zt.forEach(n, function(c) {
    u += c.vs.length, a.push(c.vs), s += c.barycenter * c.weight, o += c.weight, u = Bp(a, i, u);
  });
  var f = { vs: zt.flatten(a, !0) };
  return o && (f.barycenter = s / o, f.weight = o), f;
}
function Bp(e, t, r) {
  for (var n; t.length && (n = zt.last(t)).i <= r; )
    t.pop(), e.push(n.vs), r++;
  return r;
}
function FE(e) {
  return function(t, r) {
    return t.barycenter < r.barycenter ? -1 : t.barycenter > r.barycenter ? 1 : e ? r.i - t.i : t.i - r.i;
  };
}
var Ke = X, DE = CE, zE = kE, jE = NE, GE = eg;
function eg(e, t, r, n) {
  var i = e.children(t), a = e.node(t), s = a ? a.borderLeft : void 0, o = a ? a.borderRight : void 0, u = {};
  s && (i = Ke.filter(i, function(p) {
    return p !== s && p !== o;
  }));
  var f = DE(e, i);
  Ke.forEach(f, function(p) {
    if (e.children(p.v).length) {
      var v = eg(e, p.v, r, n);
      u[p.v] = v, Ke.has(v, "barycenter") && BE(p, v);
    }
  });
  var c = zE(f, r);
  UE(c, u);
  var l = jE(c, n);
  if (s && (l.vs = Ke.flatten([s, l.vs, o], !0), e.predecessors(s).length)) {
    var h = e.node(e.predecessors(s)[0]), d = e.node(e.predecessors(o)[0]);
    Ke.has(l, "barycenter") || (l.barycenter = 0, l.weight = 0), l.barycenter = (l.barycenter * l.weight + h.order + d.order) / (l.weight + 2), l.weight += 2;
  }
  return l;
}
function UE(e, t) {
  Ke.forEach(e, function(r) {
    r.vs = Ke.flatten(r.vs.map(function(n) {
      return t[n] ? t[n].vs : n;
    }), !0);
  });
}
function BE(e, t) {
  Ke.isUndefined(e.barycenter) ? (e.barycenter = t.barycenter, e.weight = t.weight) : (e.barycenter = (e.barycenter * e.weight + t.barycenter * t.weight) / (e.weight + t.weight), e.weight += t.weight);
}
var jt = X, HE = ye.Graph, VE = KE;
function KE(e, t, r) {
  var n = WE(e), i = new HE({ compound: !0 }).setGraph({ root: n }).setDefaultNodeLabel(function(a) {
    return e.node(a);
  });
  return jt.forEach(e.nodes(), function(a) {
    var s = e.node(a), o = e.parent(a);
    (s.rank === t || s.minRank <= t && t <= s.maxRank) && (i.setNode(a), i.setParent(a, o || n), jt.forEach(e[r](a), function(u) {
      var f = u.v === a ? u.w : u.v, c = i.edge(f, a), l = jt.isUndefined(c) ? 0 : c.weight;
      i.setEdge(f, a, { weight: e.edge(u).weight + l });
    }), jt.has(s, "minRank") && i.setNode(a, {
      borderLeft: s.borderLeft[t],
      borderRight: s.borderRight[t]
    }));
  }), i;
}
function WE(e) {
  for (var t; e.hasNode(t = jt.uniqueId("_root")); ) ;
  return t;
}
var YE = X, XE = ZE;
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
var Ye = X, JE = AE, QE = $E, eA = GE, tA = VE, rA = XE, nA = ye.Graph, Hp = se, iA = aA;
function aA(e) {
  var t = Hp.maxRank(e), r = Vp(e, Ye.range(1, t + 1), "inEdges"), n = Vp(e, Ye.range(t - 1, -1, -1), "outEdges"), i = JE(e);
  Kp(e, i);
  for (var a = Number.POSITIVE_INFINITY, s, o = 0, u = 0; u < 4; ++o, ++u) {
    sA(o % 2 ? r : n, o % 4 >= 2), i = Hp.buildLayerMatrix(e);
    var f = QE(e, i);
    f < a && (u = 0, s = Ye.cloneDeep(i), a = f);
  }
  Kp(e, s);
}
function Vp(e, t, r) {
  return Ye.map(t, function(n) {
    return tA(e, n, r);
  });
}
function sA(e, t) {
  var r = new nA();
  Ye.forEach(e, function(n) {
    var i = n.graph().root, a = eA(n, i, r, t);
    Ye.forEach(a.vs, function(s, o) {
      n.node(s).order = o;
    }), rA(n, r, a.vs);
  });
}
function Kp(e, t) {
  Ye.forEach(t, function(r) {
    Ye.forEach(r, function(n, i) {
      e.node(n).order = i;
    });
  });
}
var L = X, oA = ye.Graph, uA = se, cA = {
  positionX: mA
};
function fA(e, t) {
  var r = {};
  function n(i, a) {
    var s = 0, o = 0, u = i.length, f = L.last(a);
    return L.forEach(a, function(c, l) {
      var h = hA(e, c), d = h ? e.node(h).order : u;
      (h || c === f) && (L.forEach(a.slice(o, l + 1), function(p) {
        L.forEach(e.predecessors(p), function(v) {
          var _ = e.node(v), y = _.order;
          (y < s || d < y) && !(_.dummy && e.node(p).dummy) && tg(r, v, p);
        });
      }), o = l + 1, s = d);
    }), a;
  }
  return L.reduce(t, n), r;
}
function lA(e, t) {
  var r = {};
  function n(a, s, o, u, f) {
    var c;
    L.forEach(L.range(s, o), function(l) {
      c = a[l], e.node(c).dummy && L.forEach(e.predecessors(c), function(h) {
        var d = e.node(h);
        d.dummy && (d.order < u || d.order > f) && tg(r, h, c);
      });
    });
  }
  function i(a, s) {
    var o = -1, u, f = 0;
    return L.forEach(s, function(c, l) {
      if (e.node(c).dummy === "border") {
        var h = e.predecessors(c);
        h.length && (u = e.node(h[0]).order, n(s, f, l, o, u), f = l, o = u);
      }
      n(s, f, s.length, u, a.length);
    }), s;
  }
  return L.reduce(t, i), r;
}
function hA(e, t) {
  if (e.node(t).dummy)
    return L.find(e.predecessors(t), function(r) {
      return e.node(r).dummy;
    });
}
function tg(e, t, r) {
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
  return L.has(e[t], r);
}
function pA(e, t, r, n) {
  var i = {}, a = {}, s = {};
  return L.forEach(t, function(o) {
    L.forEach(o, function(u, f) {
      i[u] = u, a[u] = u, s[u] = f;
    });
  }), L.forEach(t, function(o) {
    var u = -1;
    L.forEach(o, function(f) {
      var c = n(f);
      if (c.length) {
        c = L.sortBy(c, function(v) {
          return s[v];
        });
        for (var l = (c.length - 1) / 2, h = Math.floor(l), d = Math.ceil(l); h <= d; ++h) {
          var p = c[h];
          a[f] === f && u < s[p] && !dA(r, f, p) && (a[p] = f, a[f] = i[f] = i[p], u = s[p]);
        }
      }
    });
  }), { root: i, align: a };
}
function vA(e, t, r, n, i) {
  var a = {}, s = _A(e, t, r, i), o = i ? "borderLeft" : "borderRight";
  function u(l, h) {
    for (var d = s.nodes(), p = d.pop(), v = {}; p; )
      v[p] ? l(p) : (v[p] = !0, d.push(p), d = d.concat(h(p))), p = d.pop();
  }
  function f(l) {
    a[l] = s.inEdges(l).reduce(function(h, d) {
      return Math.max(h, a[d.v] + s.edge(d));
    }, 0);
  }
  function c(l) {
    var h = s.outEdges(l).reduce(function(p, v) {
      return Math.min(p, a[v.w] - s.edge(v));
    }, Number.POSITIVE_INFINITY), d = e.node(l);
    h !== Number.POSITIVE_INFINITY && d.borderType !== o && (a[l] = Math.max(a[l], h));
  }
  return u(f, s.predecessors.bind(s)), u(c, s.successors.bind(s)), L.forEach(n, function(l) {
    a[l] = a[r[l]];
  }), a;
}
function _A(e, t, r, n) {
  var i = new oA(), a = e.graph(), s = wA(a.nodesep, a.edgesep, n);
  return L.forEach(t, function(o) {
    var u;
    L.forEach(o, function(f) {
      var c = r[f];
      if (i.setNode(c), u) {
        var l = r[u], h = i.edge(l, c);
        i.setEdge(l, c, Math.max(s(e, f, u), h || 0));
      }
      u = f;
    });
  }), i;
}
function gA(e, t) {
  return L.minBy(L.values(t), function(r) {
    var n = Number.NEGATIVE_INFINITY, i = Number.POSITIVE_INFINITY;
    return L.forIn(r, function(a, s) {
      var o = xA(e, s) / 2;
      n = Math.max(a + o, n), i = Math.min(a - o, i);
    }), n - i;
  });
}
function yA(e, t) {
  var r = L.values(t), n = L.min(r), i = L.max(r);
  L.forEach(["u", "d"], function(a) {
    L.forEach(["l", "r"], function(s) {
      var o = a + s, u = e[o], f;
      if (u !== t) {
        var c = L.values(u);
        f = s === "l" ? n - L.min(c) : i - L.max(c), f && (e[o] = L.mapValues(u, function(l) {
          return l + f;
        }));
      }
    });
  });
}
function bA(e, t) {
  return L.mapValues(e.ul, function(r, n) {
    if (t)
      return e[t.toLowerCase()][n];
    var i = L.sortBy(L.map(e, n));
    return (i[1] + i[2]) / 2;
  });
}
function mA(e) {
  var t = uA.buildLayerMatrix(e), r = L.merge(
    fA(e, t),
    lA(e, t)
  ), n = {}, i;
  L.forEach(["u", "d"], function(s) {
    i = s === "u" ? t : L.values(t).reverse(), L.forEach(["l", "r"], function(o) {
      o === "r" && (i = L.map(i, function(l) {
        return L.values(l).reverse();
      }));
      var u = (s === "u" ? e.predecessors : e.successors).bind(e), f = pA(e, i, r, u), c = vA(
        e,
        i,
        f.root,
        f.align,
        o === "r"
      );
      o === "r" && (c = L.mapValues(c, function(l) {
        return -l;
      })), n[s + o] = c;
    });
  });
  var a = gA(e, n);
  return yA(n, a), bA(n, e.graph().align);
}
function wA(e, t, r) {
  return function(n, i, a) {
    var s = n.node(i), o = n.node(a), u = 0, f;
    if (u += s.width / 2, L.has(s, "labelpos"))
      switch (s.labelpos.toLowerCase()) {
        case "l":
          f = -s.width / 2;
          break;
        case "r":
          f = s.width / 2;
          break;
      }
    if (f && (u += r ? f : -f), f = 0, u += (s.dummy ? t : e) / 2, u += (o.dummy ? t : e) / 2, u += o.width / 2, L.has(o, "labelpos"))
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
function xA(e, t) {
  return e.node(t).width;
}
var Gt = X, rg = se, EA = cA.positionX, AA = qA;
function qA(e) {
  e = rg.asNonCompoundGraph(e), $A(e), Gt.forEach(EA(e), function(t, r) {
    e.node(r).x = t;
  });
}
function $A(e) {
  var t = rg.buildLayerMatrix(e), r = e.graph().ranksep, n = 0;
  Gt.forEach(t, function(i) {
    var a = Gt.max(Gt.map(i, function(s) {
      return e.node(s).height;
    }));
    Gt.forEach(i, function(s) {
      e.node(s).y = n + a / 2;
    }), n += a + r;
  });
}
var j = X, Wp = _x, Yp = Ox, SA = nE, RA = se.normalizeRanks, CA = oE, TA = se.removeEmptyRanks, Xp = lE, kA = gE, Zp = bE, IA = iA, OA = AA, Xe = se, MA = ye.Graph, PA = NA;
function NA(e, t) {
  var r = t && t.debugTiming ? Xe.time : Xe.notime;
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
    nq(e);
  }), t("    acyclic", function() {
    Wp.run(e);
  }), t("    nestingGraph.run", function() {
    Xp.run(e);
  }), t("    rank", function() {
    SA(Xe.asNonCompoundGraph(e));
  }), t("    injectEdgeLabelProxies", function() {
    YA(e);
  }), t("    removeEmptyRanks", function() {
    TA(e);
  }), t("    nestingGraph.cleanup", function() {
    Xp.cleanup(e);
  }), t("    normalizeRanks", function() {
    RA(e);
  }), t("    assignRankMinMax", function() {
    XA(e);
  }), t("    removeEdgeLabelProxies", function() {
    ZA(e);
  }), t("    normalize.run", function() {
    Yp.run(e);
  }), t("    parentDummyChains", function() {
    CA(e);
  }), t("    addBorderSegments", function() {
    kA(e);
  }), t("    order", function() {
    IA(e);
  }), t("    insertSelfEdges", function() {
    iq(e);
  }), t("    adjustCoordinateSystem", function() {
    Zp.adjust(e);
  }), t("    position", function() {
    OA(e);
  }), t("    positionSelfEdges", function() {
    aq(e);
  }), t("    removeBorderNodes", function() {
    rq(e);
  }), t("    normalize.undo", function() {
    Yp.undo(e);
  }), t("    fixupEdgeLabelCoords", function() {
    eq(e);
  }), t("    undoCoordinateSystem", function() {
    Zp.undo(e);
  }), t("    translateGraph", function() {
    JA(e);
  }), t("    assignNodeIntersects", function() {
    QA(e);
  }), t("    reversePoints", function() {
    tq(e);
  }), t("    acyclic.undo", function() {
    Wp.undo(e);
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
var DA = ["nodesep", "edgesep", "ranksep", "marginx", "marginy"], zA = { ranksep: 50, edgesep: 20, nodesep: 50, rankdir: "tb" }, jA = ["acyclicer", "ranker", "rankdir", "align"], GA = ["width", "height"], UA = { width: 0, height: 0 }, BA = ["minlen", "weight", "width", "height", "labeloffset"], HA = {
  minlen: 1,
  weight: 1,
  width: 0,
  height: 0,
  labeloffset: 10,
  labelpos: "r"
}, VA = ["labelpos"];
function KA(e) {
  var t = new MA({ multigraph: !0, compound: !0 }), r = hu(e.graph());
  return t.setGraph(j.merge(
    {},
    zA,
    lu(r, DA),
    j.pick(r, jA)
  )), j.forEach(e.nodes(), function(n) {
    var i = hu(e.node(n));
    t.setNode(n, j.defaults(lu(i, GA), UA)), t.setParent(n, e.parent(n));
  }), j.forEach(e.edges(), function(n) {
    var i = hu(e.edge(n));
    t.setEdge(n, j.merge(
      {},
      HA,
      lu(i, BA),
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
      Xe.addDummyNode(e, "edge-proxy", a, "_ep");
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
    var c = f.x, l = f.y, h = f.width, d = f.height;
    t = Math.min(t, c - h / 2), r = Math.max(r, c + h / 2), n = Math.min(n, l - d / 2), i = Math.max(i, l + d / 2);
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
    r.points ? (a = r.points[0], s = r.points[r.points.length - 1]) : (r.points = [], a = i, s = n), r.points.unshift(Xe.intersectRect(n, a)), r.points.push(Xe.intersectRect(i, s));
  });
}
function eq(e) {
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
function tq(e) {
  j.forEach(e.edges(), function(t) {
    var r = e.edge(t);
    r.reversed && r.points.reverse();
  });
}
function rq(e) {
  j.forEach(e.nodes(), function(t) {
    if (e.children(t).length) {
      var r = e.node(t), n = e.node(r.borderTop), i = e.node(r.borderBottom), a = e.node(j.last(r.borderLeft)), s = e.node(j.last(r.borderRight));
      r.width = Math.abs(s.x - a.x), r.height = Math.abs(i.y - n.y), r.x = a.x + r.width / 2, r.y = n.y + r.height / 2;
    }
  }), j.forEach(e.nodes(), function(t) {
    e.node(t).dummy === "border" && e.removeNode(t);
  });
}
function nq(e) {
  j.forEach(e.edges(), function(t) {
    if (t.v === t.w) {
      var r = e.node(t.v);
      r.selfEdges || (r.selfEdges = []), r.selfEdges.push({ e: t, label: e.edge(t) }), e.removeEdge(t);
    }
  });
}
function iq(e) {
  var t = Xe.buildLayerMatrix(e);
  j.forEach(t, function(r) {
    var n = 0;
    j.forEach(r, function(i, a) {
      var s = e.node(i);
      s.order = a + n, j.forEach(s.selfEdges, function(o) {
        Xe.addDummyNode(e, "selfedge", {
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
function aq(e) {
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
function lu(e, t) {
  return j.mapValues(j.pick(e, t), Number);
}
function hu(e) {
  var t = {};
  return j.forEach(e, function(r, n) {
    t[n.toLowerCase()] = r;
  }), t;
}
var br = X, sq = se, oq = ye.Graph, uq = {
  debugOrdering: cq
};
function cq(e) {
  var t = sq.buildLayerMatrix(e), r = new oq({ compound: !0, multigraph: !0 }).setGraph({});
  return br.forEach(e.nodes(), function(n) {
    r.setNode(n, { label: n }), r.setParent(n, "layer" + e.node(n).rank);
  }), br.forEach(e.edges(), function(n) {
    r.setEdge(n.v, n.w, {}, n.name);
  }), br.forEach(t, function(n, i) {
    var a = "layer" + i;
    r.setNode(a, { rank: "same" }), br.reduce(n, function(s, o) {
      return r.setEdge(s, o, { style: "invis" }), o;
    });
  }), r;
}
var fq = "0.8.5", lq = {
  graphlib: ye,
  layout: PA,
  debug: uq,
  util: {
    time: se.time,
    notime: se.notime
  },
  version: fq
};
const Jp = /* @__PURE__ */ v0(lq), Qp = "1.1.0", Ru = 380, Lr = 32, ng = 80, ig = 26, wt = 28, st = 24, hq = { labels: !1 };
function ev(e) {
  return `<ha-icon icon="mdi:cog-outline"
    style="display:block;margin:0 auto;width:${e}px;height:${e}px;
           --mdc-icon-size:${e}px;pointer-events:none">
  </ha-icon>`;
}
function tt(e) {
  return String(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function yt(e) {
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
const tv = '<span style="color:#666;font-size:10px">None</span>';
function dq(e, t, r, n, i = !0, a = {}, s = null) {
  var T, O, M, U, Z, W, Q;
  const o = e.entity_id, u = ((T = e.attributes) == null ? void 0 : T.friendly_name) || o, f = lv(o), c = Rg(o), l = Cg(e), h = l ? "#F44336" : f, d = "";
  i && ((O = e.attributes) != null && O.voice_label);
  const [p] = Oe(e), v = p.filter((D) => n.has(D)), _ = p.filter((D) => !n.has(D)), { text: y, bg: w, unit: b } = Ec(o, t), x = `${v.length} Groups / ${_.length} Entities`, R = (a.entities || {})[o] || {}, $ = Array.isArray(R.labels) ? R.labels : [], q = Array.isArray(R.aliases) ? R.aliases : [], k = $.map((D) => {
    const z = (a.labels || {})[D];
    return z ? { name: z.name || D, color: z.color || "#607D8B" } : { name: D, color: "#607D8B" };
  }), F = k.map(
    (D) => `<span style="display:inline-block;background:${D.color};color:#111;font-size:10px;font-weight:700;padding:3px 10px;border-radius:10px;margin:2px 4px 2px 0;box-shadow:0 1px 2px rgba(0,0,0,0.18);white-space:nowrap;border:1.5px solid rgba(0,0,0,0.35);">${tt(D.name)}</span>`
  ).join("");
  q.map(
    (D) => `<div ${yt(D)} style="font-size:10px;color:#444;padding:1px 0;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="Click to copy">� ${tt(D)}</div>`
  ).join("");
  let P = "";
  P += `<tr><td colspan="2" style="background:${f};color:#fff;font-size:11px;font-weight:bold;padding:5px 10px;letter-spacing:1px;border-radius:3px 3px 0 0;border-bottom:2px solid rgba(0,0,0,0.15)">${c}${d}</td></tr>`;
  const E = l ? "#c62828" : "#111", I = l ? "#c62828" : "#888";
  P += `<tr>
    <td rowspan="2" data-more-info="1" data-entity-id="${o}" title="Open settings"
      style="cursor:pointer;vertical-align:middle;
             padding:4px 0;background:#fafafa;
             border-bottom:2px solid #e0e0e0;
             display:table-cell;text-align:center">
      ${ev(46)}
    </td>
    <td ${yt(u)} style="font-weight:bold;font-size:13px;padding:6px 10px 3px 8px;
      color:${E};word-wrap:break-word;white-space:normal;line-height:1.4;
      border-bottom:1px solid #ebebeb;background:#fafafa;cursor:pointer">
      ${tt(u)}
    </td>
  </tr>
  <tr>
    <td ${yt(o)} style="font-size:10px;color:${I};padding:3px 10px 7px 8px;
      word-break:break-all;line-height:1.3;border-bottom:2px solid #e0e0e0;
      background:#f5f5f5;cursor:pointer;
      font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,'Liberation Mono','Courier New',monospace">
      ${o}
    </td>
  </tr>`;
  const N = /* @__PURE__ */ new Set(["switch", "light", "fan", "group"]), g = N.has(o.split(".")[0]) ? 'title="Toggle"' : "";
  if (P += `<tr><td colspan="2" style="padding:7px 10px;text-align:center;border-bottom:2px solid #e0e0e0;background:#fff">
    <span data-state-badge="1" data-entity-id="${o}" data-unit="${tt(b)}"
      ${g}
      style="display:inline-block;background:${w};color:#fff;
             font-size:12px;font-weight:bold;padding:5px 28px;border-radius:4px;
             min-width:80px;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,0.2);
             cursor:pointer;user-select:none;">
      ${y}
    </span>
  </td></tr>`, P += `<tr><td colspan="2" style="font-size:10px;color:#777;padding:4px 10px 6px;text-align:center;border-bottom:2px solid #e0e0e0;font-style:italic;background:#fafafa">${x}</td></tr>`, !(k.length === 0 && hq.labels)) {
    const D = k.length > 0;
    P += `<tr><td colspan="2" style="padding:5px 10px 4px;border-bottom:1px solid #e8e8e8;background:#fafafa">
      <div style="border-radius:6px;overflow:hidden;border:1.5px solid ${D ? "#1976D2" : "#ccc"}">
        <div style="background:${D ? "#1976D2" : "#e0e0e0"};color:${D ? "#fff" : "#999"};font-size:9px;font-weight:700;letter-spacing:0.6px;padding:3px 8px">Group Labels</div>
        <div style="background:#fff;padding:4px 8px">
          ${D ? `<div style="display:flex;flex-wrap:wrap;gap:3px;line-height:1.8">${F}</div>` : tv}
        </div>
      </div>
    </td></tr>`;
  }
  const A = q.length > 0;
  if (P += `<tr><td colspan="2" style="padding:5px 10px 4px;border-bottom:2px solid #e0e0e0;background:#fafafa">
    <div style="border-radius:6px;overflow:hidden;border:1.5px solid ${A ? "#7B1FA2" : "#ccc"}">
      <div style="background:${A ? "#7B1FA2" : "#e0e0e0"};color:${A ? "#fff" : "#999"};font-size:9px;font-weight:700;letter-spacing:0.6px;padding:3px 8px">Group voice assistant</div>
      <div style="background:#fff;padding:4px 8px">
        ${A ? q.map((D) => `<div ${yt(D)} style="font-size:12px;color:#000;font-weight:600;cursor:pointer;padding:2px 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">💬 ${tt(D)}</div>`).join("") : tv}
      </div>
    </div>
  </td></tr>`, _.length > 0) {
    P += `<tr><td colspan="2" style="font-size:10px;color:#444;font-weight:bold;padding:5px 10px 3px;border-bottom:1px solid #e0e0e0;background:#f0f4ff">Entities (${_.length}):</td></tr>`;
    const D = Math.min(_.length, 10);
    for (let z = 0; z < D; z++) {
      const Y = _[z], ie = ((U = (M = t[Y]) == null ? void 0 : M.attributes) == null ? void 0 : U.friendly_name) || Y, { text: kt, bg: re } = Ec(Y, t), fe = z % 2 === 0 ? "#ffffff" : "#f8f8f8", $e = N.has(Y.split(".")[0]) ? 'title="Toggle"' : "", Se = (((W = (Z = t[Y]) == null ? void 0 : Z.attributes) == null ? void 0 : W.unit_of_measurement) || "").trim(), B = ((Q = t[Y]) == null ? void 0 : Q.state) || "", be = Se && !isNaN(parseFloat(B)) ? `${B} ${Se}` : kt;
      P += `<tr><td colspan="2" style="font-size:10px;padding:5px 10px;border-bottom:1px solid #e8e8e8;background:${fe}">
        <div style="display:flex;align-items:center;gap:6px">
          <span data-more-info="1" data-entity-id="${Y}" title="Open settings"
            style="flex-shrink:0;cursor:pointer;line-height:0">${ev(34)}</span>
          <div style="overflow:hidden;flex:1;min-width:0">
            <div ${yt(ie)} style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#333;font-size:11px;font-weight:600;cursor:pointer">${tt(ie)}</div>
            <div ${yt(Y)} style="margin-top:1px;color:#888;font-size:10px;line-height:1.2;cursor:pointer;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,'Liberation Mono','Courier New',monospace">${Y}</div>
          </div>
          <span data-state-badge="1" data-entity-id="${Y}" data-unit="${tt(Se)}"
            ${$e}
            style="flex-shrink:0;background:${re};color:#fff;font-size:9px;
                   padding:2px 7px;border-radius:3px;
                   white-space:nowrap;font-weight:bold;cursor:pointer;user-select:none;">
            ${be}
          </span>
        </div>
      </td></tr>`;
    }
    _.length > 10 && (P += `<tr><td colspan="2" style="font-size:9px;color:#aaa;padding:3px 10px 5px;font-style:italic;background:#f8f8f8">+${_.length - 10} more...</td></tr>`);
  }
  return `<table style="border-collapse:collapse;width:100%;background:#fff;border-radius:4px;border:3px solid ${h};box-shadow:0 3px 10px rgba(0,0,0,0.2);font-family:Segoe UI,Arial,sans-serif;table-layout:fixed;word-wrap:break-word">
    <colgroup><col style="width:56px"><col></colgroup>
    ${P}
  </table>`;
}
function pq(e) {
  const t = document.createElement("div");
  t.style.cssText = [
    "position:absolute",
    "left:-99999px",
    "top:0",
    "visibility:hidden",
    "pointer-events:none",
    `width:${Ru}px`,
    "font-family:Segoe UI,Arial,sans-serif",
    "font-size:12px"
  ].join(";"), document.body.appendChild(t);
  const r = {};
  return e.forEach((n, i) => {
    const a = document.createElement("div");
    a.style.width = Ru + "px", a.innerHTML = n, t.appendChild(a), r[i] = a.offsetHeight + 16, t.removeChild(a);
  }), document.body.removeChild(t), r;
}
function vq(e, t, r, n, i, a) {
  const s = /* @__PURE__ */ new Map(), o = [], u = /* @__PURE__ */ new Set(), f = (_) => {
    const y = _.entity_id;
    if (u.has(y)) return;
    if (u.add(y), s.set(y, dq(_, t, r, n, i, a, c)), r[y]) {
      const b = t[r[y]];
      b && (f(b), o.push({ from: y, to: r[y], style: "dashed", color: "#FF9800", width: 2.5, marker: "url(#arrow-dashed)", label: "wraps" }));
    }
    const [w] = Oe(_);
    w.forEach((b) => {
      if (!n.has(b)) return;
      const x = t[b];
      x && (f(x), o.push({ from: y, to: b, color: lv(b), width: 2.5, marker: "url(#arrow)", label: "" }));
    });
  }, c = new Set(Object.values(r));
  e.forEach((_) => f(_));
  const l = pq(s), h = {};
  s.forEach((_, y) => {
    const b = ((a.entities || {})[y] || {}).area_id;
    if (!b) return;
    const x = (a.areas || {})[b];
    if (x) {
      if (!h[b]) {
        const R = (Array.isArray(x.aliases) ? x.aliases : []).slice(0, 3), q = 86 + Math.max(R.length, 1) * 26;
        h[b] = { name: x.name || b, aliases: R, topPad: q, node_ids: [] };
      }
      h[b].node_ids.push(y);
    }
  });
  const d = /* @__PURE__ */ new Set(), p = new Jp.graphlib.Graph({ compound: !0 }).setDefaultEdgeLabel(() => ({}));
  p.setGraph({
    rankdir: "TB",
    // Generous spacing so edges have wide corridors between area boxes
    ranksep: 120,
    nodesep: 90,
    marginx: 80,
    marginy: 80
  }), Object.keys(h).forEach((_) => {
    const y = `__area__${_}`;
    d.add(y), p.setNode(y, {
      label: "",
      width: 1,
      height: 1,
      paddingLeft: Lr,
      paddingRight: Lr,
      paddingTop: h[_].topPad,
      paddingBottom: ig
    });
  }), s.forEach((_, y) => {
    p.setNode(y, {
      label: _,
      width: Ru,
      height: l[y] || 160
    });
  }), Object.entries(h).forEach(([_, { node_ids: y }]) => {
    const w = `__area__${_}`;
    y.forEach((b) => {
      try {
        p.setParent(b, w);
      } catch (x) {
        console.warn("[groups-visualizer] setParent failed", b, x);
      }
    });
  });
  const v = {};
  return o.forEach((_) => {
    v[`${_.from}|${_.to}`] = _, p.setEdge(_.from, _.to, {});
  }), Jp.layout(p), { dagreGraph: p, edgeMeta: v, measuredHeights: l, areaMap: h, clusterIds: d };
}
const mr = [
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
function _q(e, t) {
  const r = {};
  return e && Object.entries(e).forEach(([n, { node_ids: i, topPad: a }]) => {
    const s = i.map((u) => t.get(u)).filter(Boolean);
    if (!s.length) return;
    const o = a !== void 0 ? a : ng;
    r[n] = {
      x1: Math.min(...s.map((u) => u.x)) - Lr,
      y1: Math.min(...s.map((u) => u.y)) - o,
      x2: Math.max(...s.map((u) => u.x + u.w)) + Lr,
      y2: Math.max(...s.map((u) => u.y + u.h)) + ig
    };
  }), r;
}
function rv(e, t) {
  if (!t) return null;
  for (const [r, { node_ids: n }] of Object.entries(t))
    if (n.includes(e)) return r;
  return null;
}
function gq(e, t, r, n, i) {
  const a = i.get(e), s = i.get(t);
  if (!a || !s) return null;
  const o = a.x + a.w / 2, u = a.y + a.h, f = s.x + s.w / 2, c = s.y, l = 28;
  if (n.y1 >= r.y2 - l) {
    const p = (r.y2 + n.y1) / 2;
    return [
      { x: o, y: u },
      { x: o, y: p },
      { x: f, y: p },
      { x: f, y: c }
    ];
  }
  if (r.y1 >= n.y2 - l) {
    const p = (n.y2 + r.y1) / 2;
    return [
      { x: o, y: u },
      { x: o, y: r.y1 - l },
      { x: o, y: p },
      { x: f, y: p },
      { x: f, y: n.y2 + l },
      { x: f, y: c }
    ];
  }
  const h = (u + c) / 2;
  if (n.x1 >= r.x2 - l) {
    const p = (r.x2 + n.x1) / 2;
    return [
      { x: o, y: u },
      { x: o, y: h },
      { x: p, y: h },
      { x: f, y: h },
      { x: f, y: c }
    ];
  }
  if (r.x1 >= n.x2 - l) {
    const p = (n.x2 + r.x1) / 2;
    return [
      { x: o, y: u },
      { x: o, y: h },
      { x: p, y: h },
      { x: f, y: h },
      { x: f, y: c }
    ];
  }
  const d = Math.max(r.y2, n.y2) + l * 2;
  return [
    { x: o, y: u },
    { x: o, y: d },
    { x: f, y: d },
    { x: f, y: c }
  ];
}
function yq(e) {
  return !e || !e.length ? { x: 0, y: 0 } : e[Math.floor(e.length / 2)];
}
function bq(e) {
  let t = e.select("defs");
  t.empty() && (t = e.insert("defs", ":first-child")), t.select("#area-shadow").empty() && t.append("filter").attr("id", "area-shadow").attr("x", "-12%").attr("y", "-12%").attr("width", "124%").attr("height", "124%").append("feDropShadow").attr("dx", 0).attr("dy", 5).attr("stdDeviation", 10).attr("flood-color", "rgba(0,0,0,0.28)");
}
function mq(e, t, r, n, i) {
  const a = wt * 2.2, s = Math.max(t.length * (wt * 0.65) + 36, 90);
  return e.append("rect").attr("x", n + 3).attr("y", i + 3).attr("width", s).attr("height", a).attr("rx", a / 2).attr("ry", a / 2).attr("fill", "rgba(0,0,0,0.28)"), e.append("rect").attr("x", n).attr("y", i).attr("width", s).attr("height", a).attr("rx", a / 2).attr("ry", a / 2).attr("fill", r).attr("stroke", "rgba(255,255,255,0.4)").attr("stroke-width", 1.5), e.append("text").attr("x", n + s / 2).attr("y", i + a / 2).attr("text-anchor", "middle").attr("dominant-baseline", "middle").style("font-size", `${wt}px`).style("font-family", "Segoe UI, Arial, sans-serif").style("font-weight", "bold").style("fill", "#ffffff").style("letter-spacing", "0.5px").style("pointer-events", "none").text(t), { lblW: s, lblH: a };
}
function wq(e, t, r, n, i) {
  const a = `${t} node${t > 1 ? "s" : ""}`, s = a.length * (st * 0.65) + 20, o = st * 2;
  return e.append("rect").attr("x", n + 2).attr("y", i + 2).attr("width", s).attr("height", o).attr("rx", o / 2).attr("ry", o / 2).attr("fill", "rgba(0,0,0,0.18)"), e.append("rect").attr("x", n).attr("y", i).attr("width", s).attr("height", o).attr("rx", o / 2).attr("ry", o / 2).attr("fill", "#ffffff").attr("stroke", r).attr("stroke-width", 2.5), e.append("text").attr("x", n + s / 2).attr("y", i + o / 2).attr("text-anchor", "middle").attr("dominant-baseline", "middle").style("font-size", `${st}px`).style("font-family", "Segoe UI, Arial, sans-serif").style("fill", r).style("font-weight", "bold").style("pointer-events", "none").text(a), { cw: s, ch: o };
}
function xq(e, t, r, n, i, a, s, o, u, f, c) {
  t.selectAll("*").remove(), n.selectAll("*").remove(), bq(e);
  const l = t.append("g").attr("class", "area-layer"), h = t.append("g").attr("class", "node-layer"), d = n, p = /* @__PURE__ */ new Map();
  a.nodes().forEach((E) => {
    if (c && c.has(E)) return;
    const I = a.node(E);
    if (!I) return;
    const N = o[E] || I.height, g = h.append("foreignObject").attr("x", I.x - I.width / 2).attr("y", I.y - N / 2).attr("width", I.width).attr("height", N), A = g.append("xhtml:div").style("width", I.width + "px").style("overflow", "visible");
    A.html(I.label), p.set(E, { fo: g, inner: A.node(), node: I, measuredH: N });
  });
  let v = 0, _ = 0;
  const y = /* @__PURE__ */ new Map();
  p.forEach(({ fo: E, inner: I, node: N, measuredH: g }, A) => {
    const m = Math.max(g, I.scrollHeight + 8);
    m !== g && (E.attr("height", m), E.attr("y", N.y - m / 2));
    const S = N.x - N.width / 2, C = N.y - m / 2;
    y.set(A, { x: S, y: C, w: N.width, h: m }), v = Math.max(v, S + N.width + 60), _ = Math.max(_, C + m + 60);
  });
  const w = _q(f, y);
  if (f && Object.keys(f).length > 0) {
    let E = 0;
    Object.entries(f).forEach(([I, N]) => {
      const { name: g, node_ids: A } = N, m = w[I];
      if (!m) return;
      const S = A.map((D) => y.get(D)).filter(Boolean);
      if (!S.length) return;
      const { fill: C, border: T } = mr[E % mr.length];
      E++;
      const O = m.x1, M = m.y1, U = m.x2 - m.x1, Z = m.y2 - m.y1;
      v = Math.max(v, m.x2 + 60), _ = Math.max(_, m.y2 + 40), l.append("rect").attr("x", O - 6).attr("y", M - 6).attr("width", U + 12).attr("height", Z + 12).attr("rx", 24).attr("ry", 24).attr("fill", "none").attr("stroke", T).attr("stroke-width", 10).attr("opacity", 0.15), l.append("rect").attr("x", O).attr("y", M).attr("width", U).attr("height", Z).attr("rx", 18).attr("ry", 18).attr("fill", C).attr("stroke", T).attr("stroke-width", 5).attr("filter", "url(#area-shadow)"), l.append("rect").attr("x", O).attr("y", M).attr("width", U).attr("height", 12).attr("rx", 18).attr("ry", 18).attr("fill", T).attr("stroke", "none");
      const { lblH: W } = mq(
        l,
        g,
        T,
        O + 18,
        // lblX
        M + 12
        // lblY
      ), Q = M + 12 + (W - st * 2) / 2;
      wq(
        l,
        S.length,
        T,
        m.x2 - 18,
        // cx � will be adjusted by cw inside helper
        Q
      );
    });
  }
  if (l.selectAll("*").remove(), f && Object.keys(f).length > 0) {
    let E = 0;
    Object.entries(f).forEach(([I, N]) => {
      const { name: g, node_ids: A, aliases: m = [], topPad: S = ng } = N, C = w[I];
      if (!C) return;
      const T = A.map((oe) => y.get(oe)).filter(Boolean);
      if (!T.length) return;
      const { fill: O, border: M } = mr[E % mr.length];
      E++;
      const U = C.x1, Z = C.y1, W = C.x2 - C.x1, Q = C.y2 - C.y1;
      v = Math.max(v, C.x2 + 60), _ = Math.max(_, C.y2 + 40), l.append("rect").attr("x", U - 6).attr("y", Z - 6).attr("width", W + 12).attr("height", Q + 12).attr("rx", 24).attr("ry", 24).attr("fill", "none").attr("stroke", M).attr("stroke-width", 10).attr("opacity", 0.15), l.append("rect").attr("x", U).attr("y", Z).attr("width", W).attr("height", Q).attr("rx", 18).attr("ry", 18).attr("fill", O).attr("stroke", M).attr("stroke-width", 5).attr("filter", "url(#area-shadow)"), l.append("rect").attr("x", U).attr("y", Z).attr("width", W).attr("height", 12).attr("rx", 18).attr("ry", 18).attr("fill", M).attr("stroke", "none");
      const D = wt * 0.62, z = Math.round(wt * 2.2), Y = Math.round(z * 0.48), ie = (z - Y) / 2, kt = Y / 24, re = 12, fe = 24, $e = 6, Se = 5, B = 12, be = 7, H = 18, je = Math.min(W - 28, 600), Ge = ie + 4 + Y + 8 + g.length * D + 20, or = m.map((oe) => ({ alias: oe, cw: Math.min(oe.length * 7.5 + 42, 300) })), _t = or.reduce((oe, Je) => oe + Je.cw + $e, 2 * B - $e), J = Math.min(Math.max(Ge, m.length ? _t : 0, 120), je), ne = J - 2 * B, me = [[]];
      let Re = 0;
      or.forEach((oe) => {
        const Je = Math.min(oe.cw, ne);
        Re > 0 && Re + Je + $e > ne && (me.push([]), Re = 0), me[me.length - 1].push({ alias: oe.alias, cw: Je }), Re += Je + $e;
      });
      const ur = m.length > 0, cr = H + be + (ur ? me.length * (fe + Se) - Se : fe) + be, G = U + 18, V = Z + 8, de = z + cr;
      l.append("rect").attr("x", G + 3).attr("y", V + 3).attr("width", J).attr("height", de).attr("rx", re).attr("ry", re).attr("fill", "rgba(0,0,0,0.22)");
      const un = `M${G + re} ${V} L${G + J - re} ${V} Q${G + J} ${V} ${G + J} ${V + re} L${G + J} ${V + z} L${G} ${V + z} L${G} ${V + re} Q${G} ${V} ${G + re} ${V}Z`;
      l.append("path").attr("d", un).attr("fill", M).attr("data-copy-text", g).style("cursor", "copy");
      const fr = `M${G} ${V + z} L${G + J} ${V + z} L${G + J} ${V + de - re} Q${G + J} ${V + de} ${G + J - re} ${V + de} L${G + re} ${V + de} Q${G} ${V + de} ${G} ${V + de - re} L${G} ${V + z}Z`;
      l.append("path").attr("d", fr).attr("fill", "rgba(255,255,255,0.97)"), l.append("rect").attr("x", G).attr("y", V).attr("width", J).attr("height", de).attr("rx", re).attr("ry", re).attr("fill", "none").attr("stroke", M).attr("stroke-width", 2), l.append("line").attr("x1", G).attr("y1", V + z).attr("x2", G + J).attr("y2", V + z).attr("stroke", M).attr("stroke-width", 1.5).style("pointer-events", "none"), l.append("rect").attr("x", G).attr("y", V).attr("width", ie + 2 + Y + ie).attr("height", z).attr("fill", "rgba(0,0,0,0)").attr("data-area-nav", "1").attr("data-area-id", I).style("cursor", "pointer"), l.append("g").attr("transform", `translate(${G + ie + 2},${V + ie}) scale(${kt})`).style("pointer-events", "none").selectAll("path").data([
        "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",
        "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
      ]).enter().append("path").attr("d", (oe) => oe).attr("fill", "none").attr("stroke", "rgba(255,255,255,0.9)").attr("stroke-width", 2).attr("stroke-linecap", "round").attr("stroke-linejoin", "round");
      const Te = (G + ie + 2 + Y + 10 + G + J) / 2;
      l.append("text").attr("x", Te).attr("y", V + z / 2).attr("text-anchor", "middle").attr("dominant-baseline", "middle").style("font-size", `${wt}px`).style("font-family", "Segoe UI, Arial, sans-serif").style("font-weight", "bold").style("fill", "#ffffff").style("letter-spacing", "0.5px").style("pointer-events", "none").text(g), l.append("text").attr("x", G + B).attr("y", V + z + H / 2 + 1).attr("dominant-baseline", "middle").style("font-size", "9px").style("font-family", "Segoe UI, Arial, sans-serif").style("font-weight", "700").style("letter-spacing", "0.6px").style("fill", "#111111").style("pointer-events", "none").text("Area voice assistant");
      const sc = V + z + H + be;
      ur ? me.forEach((oe, Je) => {
        const cc = sc + Je * (fe + Se);
        let ln = G + B;
        oe.forEach(({ alias: fc, cw: lc }) => {
          l.append("rect").attr("x", ln).attr("y", cc).attr("width", lc).attr("height", fe).attr("rx", fe / 2).attr("ry", fe / 2).attr("fill", "#ffffff").attr("stroke", M).attr("stroke-width", 1.5).attr("data-copy-text", fc).style("cursor", "copy"), l.append("text").attr("x", ln + 10).attr("y", cc + fe / 2).attr("dominant-baseline", "middle").style("font-size", "11px").style("font-family", "Segoe UI, Arial, sans-serif").style("font-weight", "600").style("fill", "#333333").style("pointer-events", "none").text("💬 " + fc), ln += lc + $e;
        });
      }) : l.append("text").attr("x", G + B).attr("y", sc + fe / 2).attr("dominant-baseline", "middle").style("font-size", "11px").style("font-family", "Segoe UI, Arial, sans-serif").style("font-style", "italic").style("fill", "#999999").style("pointer-events", "none").text("None");
      const oc = T.length, uc = `${oc} node${oc > 1 ? "s" : ""}`, Ue = st * 2, lr = uc.length * (st * 0.65) + 20, cn = C.x2 - lr - 18, fn = V + (z - Ue) / 2;
      l.append("rect").attr("x", cn + 2).attr("y", fn + 2).attr("width", lr).attr("height", Ue).attr("rx", Ue / 2).attr("ry", Ue / 2).attr("fill", "rgba(0,0,0,0.18)"), l.append("rect").attr("x", cn).attr("y", fn).attr("width", lr).attr("height", Ue).attr("rx", Ue / 2).attr("ry", Ue / 2).attr("fill", "#ffffff").attr("stroke", M).attr("stroke-width", 2.5), l.append("text").attr("x", cn + lr / 2).attr("y", fn + Ue / 2).attr("text-anchor", "middle").attr("dominant-baseline", "middle").style("font-size", `${st}px`).style("font-family", "Segoe UI, Arial, sans-serif").style("fill", M).style("font-weight", "bold").style("pointer-events", "none").text(uc);
    });
  }
  const b = Hc().x((E) => E.x).y((E) => E.y).curve(o0), x = Hc().x((E) => E.x).y((E) => E.y).curve(zv);
  a.edges().forEach((E) => {
    if (c != null && c.has(E.v) || c != null && c.has(E.w)) return;
    const I = a.edge(E);
    if (!(I != null && I.points)) return;
    const N = s[`${E.v}|${E.w}`] || {}, g = rv(E.v, f), A = rv(E.w, f);
    let m, S;
    if (g && A && g !== A ? (m = gq(E.v, E.w, w[g], w[A], y) || I.points, S = x) : (m = I.points, S = b), d.append("path").attr("d", S(m)).attr("stroke", "#ffffff").attr("stroke-width", (N.width || 2.5) + 4).attr("fill", "none").attr("opacity", 0.75), d.append("path").attr("d", S(m)).attr("stroke", N.color || "#555").attr("stroke-width", N.width || 2.5).attr("stroke-dasharray", N.style === "dashed" ? "10,5" : null).attr("fill", "none").attr(
      "marker-end",
      N.marker === "url(#arrow-dashed)" ? "url(#arrow-dashed2)" : "url(#arrow2)"
    ), N.label) {
      const C = yq(m);
      d.append("circle").attr("cx", C.x).attr("cy", C.y).attr("r", 5).attr("fill", N.color || "#FF9800").attr("stroke", "#ffffff").attr("stroke-width", 2);
    }
  });
  const R = Math.max(v, u), $ = Math.max(_, 400);
  e.attr("width", R).attr("height", $), r.attr("width", R).attr("height", $);
  let q = 1 / 0;
  p.forEach(({ node: E }) => {
    q = Math.min(q, E.x - E.width / 2);
  }), q === 1 / 0 && (q = 0);
  const k = v - q, F = k > u ? Math.max(u / (k + 120), 0.08) : 1, P = u / 2 - k * F / 2 - q * F + 30;
  return e.call(i.transform, Du.translate(P, 40).scale(F)), { svgWidth: R, svgHeight: $ };
}
class Eq {
  constructor(t, r) {
    this.container = t, this.width = r || 1400, we(t).style("position", "relative"), this.svg = we(t).append("svg").attr("width", this.width).attr("height", 600).style("display", "block");
    const n = this.svg.append("defs");
    n.append("marker").attr("id", "arrow").attr("viewBox", "0 -8 16 16").attr("refX", 15).attr("refY", 0).attr("markerWidth", 12).attr("markerHeight", 12).attr("orient", "auto").append("path").attr("d", "M0,-8L16,0L0,8Z").attr("fill", "#555"), n.append("marker").attr("id", "arrow-dashed").attr("viewBox", "0 -8 16 16").attr("refX", 15).attr("refY", 0).attr("markerWidth", 12).attr("markerHeight", 12).attr("orient", "auto").append("path").attr("d", "M0,-8L16,0L0,8Z").attr("fill", "#FF9800"), this.svgG = this.svg.append("g"), this.svgEdge = we(t).append("svg").attr("width", this.width).attr("height", 600).style("position", "absolute").style("top", "0").style("left", "0").style("pointer-events", "none");
    const i = this.svgEdge.append("defs");
    i.append("marker").attr("id", "arrow2").attr("viewBox", "0 -8 16 16").attr("refX", 15).attr("refY", 0).attr("markerWidth", 12).attr("markerHeight", 12).attr("orient", "auto").append("path").attr("d", "M0,-8L16,0L0,8Z").attr("fill", "#555"), i.append("marker").attr("id", "arrow-dashed2").attr("viewBox", "0 -8 16 16").attr("refX", 15).attr("refY", 0).attr("markerWidth", 12).attr("markerHeight", 12).attr("orient", "auto").append("path").attr("d", "M0,-8L16,0L0,8Z").attr("fill", "#FF9800"), this.svgEdgeG = this.svgEdge.append("g"), this.zoom = p0().scaleExtent([0.05, 3]).on("zoom", (a) => {
      this.svgG.attr("transform", a.transform), this.svgEdgeG.attr("transform", a.transform);
    }), this.svg.call(this.zoom);
  }
  build_graph(t, r, n, i, a = !0, s = {}) {
    const { dagreGraph: o, edgeMeta: u, measuredHeights: f, areaMap: c, clusterIds: l } = vq(t, r, n, i, a, s);
    this._dagreGraph = o, this._edgeMeta = u, this._measuredHeights = f, this._areaMap = c, this._clusterIds = l;
  }
  render() {
    return xq(
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
function nv(e, t) {
  !t || !e || e.querySelectorAll("[data-state-badge]").forEach((r) => {
    const n = r.getAttribute("data-entity-id");
    if (!n) return;
    const i = t.states[n];
    if (!i) return;
    const a = i.state || "unknown", s = a.toLowerCase(), o = (r.getAttribute("data-unit") || "").trim(), u = o && !isNaN(parseFloat(a)), f = s === "on" ? "ON" : s === "off" ? "OFF" : u ? `${a} ${o}` : a.substring(0, 8).toUpperCase(), c = s === "on" ? "#4CAF50" : s === "off" ? "#9E9E9E" : "#2196F3";
    r.textContent.trim() !== f && (r.textContent = f), r.style.background !== c && (r.style.background = c);
  });
}
function Aq(e, t, r, n, i, a, s, o) {
  var p;
  if (!e) return;
  const u = t == null ? void 0 : t.querySelector(`#graph-${CSS.escape(e)}`);
  if (!u) return;
  if (o && o[e])
    if (u.childElementCount === 0)
      delete o[e];
    else
      return;
  u.innerHTML = "";
  const f = ((p = u.parentElement) == null ? void 0 : p.clientWidth) || window.innerWidth || 1400, c = r[e];
  if (!c) return;
  const l = new Eq(u, f);
  l.build_graph(
    [c],
    r,
    n,
    i,
    a,
    s
  );
  const { svgWidth: h, svgHeight: d } = l.render();
  u.style.width = h + "px", u.style.height = d + "px", o[e] = l;
}
function qq(e, t, r, n) {
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
customElements.define("groups-visualizer", class extends Ht {
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
    return qg;
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
      this._stateUpdatePending = !1, nv(this.shadowRoot, this.hass);
    })) : this._triggerBuild());
  }
  _triggerBuild() {
    this._buildInProgress || this._buildGraph();
  }
  async _buildGraph() {
    if (!this.hass) return;
    this._buildInProgress = !0, this._buildDone || (this._loading = !0);
    const { roots: t, pairs: r, lookup: n, group_ids: i, registry: a, _debug: s } = await Ac(this.hass);
    this._pairs = r, this._lookup = n, this._group_ids = i, this._registry = a, this._debug = s, this._timestamp = Sc(), this._tabs = qc(t, this.config), this._activeSubTab = $c(this._tabs, this._activeSubTab), (!this._activeTab || !this._tabs[this._activeTab]) && (this._activeTab = Object.keys(this._tabs)[0] || null), this._graphCache = {}, this._loading = !1, this._buildDone = !0, this._buildInProgress = !1, this.requestUpdate(), this.updateComplete.then(() => {
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
    Aq(
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
    const t = this._activeTab, r = ((c = this._activeSubTab) == null ? void 0 : c[t]) || null, { roots: n, pairs: i, lookup: a, group_ids: s, registry: o } = await Ac(this.hass);
    this._pairs = i, this._lookup = a, this._group_ids = s, this._registry = o, this._timestamp = Sc(), this._tabs = qc(n, this.config), this._activeSubTab = $c(this._tabs, this._activeSubTab), (!this._activeTab || !this._tabs[this._activeTab]) && (this._activeTab = Object.keys(this._tabs)[0] || null);
    let u = r;
    u && Object.values(this._tabs).flat().find((l) => l.entity_id === u) || (u = this._activeSubTab[this._activeTab] || null), u && this._graphCache && this._graphCache[u] && delete this._graphCache[u], this.requestUpdate(), this.updateComplete.then(() => {
      u && this._doRender(u);
    });
  }
  // ---------- Clickable ON/OFF badge ----------
  async _onBadgeClick(t) {
    var d, p;
    const r = t.composedPath ? t.composedPath() : [];
    let n = null, i = null, a = null, s = null;
    for (const v of r) {
      if (v && v.dataset) {
        if (v.dataset.stateBadge) {
          n = v;
          break;
        }
        if (v.dataset.moreInfo) {
          i = v;
          break;
        }
        if (v.dataset.areaNav) {
          a = v;
          break;
        }
        if (v.dataset.copyText !== void 0) {
          s = v;
          break;
        }
      }
      if (v === this.shadowRoot) break;
    }
    if (i) {
      t.preventDefault(), t.stopImmediatePropagation();
      const v = i.getAttribute("data-entity-id");
      v && this.dispatchEvent(new CustomEvent("hass-more-info", {
        detail: { entityId: v },
        bubbles: !0,
        composed: !0
      }));
      return;
    }
    if (a) {
      t.preventDefault(), t.stopImmediatePropagation();
      const v = a.getAttribute("data-area-id");
      v && this._openAreaPopup(v);
      return;
    }
    if (s) {
      t.preventDefault(), t.stopImmediatePropagation();
      const v = s.getAttribute("data-copy-text") || "";
      if (!v) return;
      const _ = (b) => {
        try {
          const x = document.createElement("textarea");
          x.value = b, x.style.cssText = "position:fixed;top:-999px;opacity:0", document.body.appendChild(x), x.focus(), x.select(), document.execCommand("copy"), document.body.removeChild(x);
        } catch {
        }
      };
      navigator.clipboard ? navigator.clipboard.writeText(v).catch(() => _(v)) : _(v);
      const y = v.length > 45 ? v.substring(0, 45) + "..." : v, w = document.createElement("div");
      w.innerText = "Copied: " + y, w.style.cssText = "position:fixed;bottom:32px;left:50%;transform:translateX(-50%);background:#323232;color:#fff;padding:10px 24px;border-radius:24px;font-size:13px;z-index:999999;pointer-events:none;opacity:1;transition:opacity 0.4s ease", document.body.appendChild(w), setTimeout(() => {
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
    const h = (((p = (d = this.hass.states) == null ? void 0 : d[o]) == null ? void 0 : p.state) || "unknown").toLowerCase() !== "on" ? "turn_on" : "turn_off";
    try {
      await this.hass.callService(u, h, { entity_id: o }), nv(this.shadowRoot, this.hass);
    } catch (v) {
      console.error("[groups-visualizer] toggle failed", u, h, o, v);
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
    return pe`
      <div class="area-popup-overlay"
           @click=${(s) => {
      s.target === s.currentTarget && this._closeAreaPopup();
    }}>
        <div class="area-popup">

          <div class="area-popup-header">
            <span>${i}</span>
            <button class="area-popup-close" @click=${() => this._closeAreaPopup()}>✕</button>
          </div>

          ${a.length ? pe`
            <div class="area-popup-section">
              <div class="area-popup-label">Voice Aliases</div>
              ${a.map((s) => pe`<div class="area-popup-alias">💬 ${s}</div>`)}
            </div>` : ""}

          <div class="area-popup-section">
            <div class="area-popup-label">Entities (${n.length})</div>
            ${n.length === 0 ? pe`<div class="area-popup-none">No entities assigned</div>` : n.map(({ eid: s, name: o }) => pe`
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
      return pe`<ha-card><div class="loading">Loading groups...</div></ha-card>`;
    if (!this._tabs || !Object.keys(this._tabs).length) {
      const a = this._debug;
      return pe`<ha-card><div class="loading" style="font-size:11px;text-align:left;padding:12px;font-family:monospace;white-space:pre-wrap">No groups found (v${Qp}).
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
    return pe`
      <ha-card>

        <div class="header">
          <div>
            <div class="header-title">Group Visualizer <span class="header-version">v${Qp}</span></div>
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
          ${t.map((a) => pe`
            <button class="main-tab ${a === r ? "active" : ""}"
              @click=${() => this._showMainTab(a)}>
              ${a} (${this._tabs[a].length})
            </button>`)}
        </div>

        <div class="sub-tabs">
          ${n.map((a) => {
      var f;
      const s = a.entity_id, o = ((f = a.attributes) == null ? void 0 : f.friendly_name) || s, u = qq(a, this._pairs, this._lookup, this._group_ids);
      return pe`
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
      return pe`
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
