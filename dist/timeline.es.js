var vt = Object.defineProperty;
var gt = (e, i, t) => i in e ? vt(e, i, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[i] = t;
var z = (e, i, t) => (gt(e, typeof i != "symbol" ? i + "" : i, t), t), ht = (e, i, t) => {
  if (!i.has(e))
    throw TypeError("Cannot " + t);
};
var Y = (e, i, t) => (ht(e, i, "read from private field"), t ? t.call(e) : i.get(e)), G = (e, i, t) => {
  if (i.has(e))
    throw TypeError("Cannot add the same private member more than once");
  i instanceof WeakSet ? i.add(e) : i.set(e, t);
}, H = (e, i, t, a) => (ht(e, i, "write to private field"), a ? a.call(e, t) : i.set(e, t), t);
function pt(e) {
  return { all: e = e || /* @__PURE__ */ new Map(), on: function(i, t) {
    var a = e.get(i);
    a ? a.push(t) : e.set(i, [t]);
  }, off: function(i, t) {
    var a = e.get(i);
    a && (t ? a.splice(a.indexOf(t) >>> 0, 1) : e.set(i, []));
  }, emit: function(i, t) {
    var a = e.get(i);
    a && a.slice().map(function(v) {
      v(t);
    }), (a = e.get("*")) && a.slice().map(function(v) {
      v(i, t);
    });
  } };
}
var Q = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, lt = "Expected a function", ct = 0 / 0, xt = "[object Symbol]", Ct = /^\s+|\s+$/g, Mt = /^[-+]0x[0-9a-f]+$/i, bt = /^0b[01]+$/i, yt = /^0o[0-7]+$/i, Ot = parseInt, Tt = typeof Q == "object" && Q && Q.Object === Object && Q, Dt = typeof self == "object" && self && self.Object === Object && self, wt = Tt || Dt || Function("return this")(), St = Object.prototype, _t = St.toString, kt = Math.max, Yt = Math.min, ot = function() {
  return wt.Date.now();
};
function It(e, i, t) {
  var a, v, c, p, l, f, d = 0, M = !1, h = !1, C = !0;
  if (typeof e != "function")
    throw new TypeError(lt);
  i = ft(i) || 0, st(t) && (M = !!t.leading, h = "maxWait" in t, c = h ? kt(ft(t.maxWait) || 0, i) : c, C = "trailing" in t ? !!t.trailing : C);
  function u(y) {
    var W = a, B = v;
    return a = v = void 0, d = y, p = e.apply(B, W), p;
  }
  function b(y) {
    return d = y, l = setTimeout(A, i), M ? u(y) : p;
  }
  function s(y) {
    var W = y - f, B = y - d, D = i - W;
    return h ? Yt(D, c - B) : D;
  }
  function w(y) {
    var W = y - f, B = y - d;
    return f === void 0 || W >= i || W < 0 || h && B >= c;
  }
  function A() {
    var y = ot();
    if (w(y))
      return k(y);
    l = setTimeout(A, s(y));
  }
  function k(y) {
    return l = void 0, C && a ? u(y) : (a = v = void 0, p);
  }
  function I() {
    l !== void 0 && clearTimeout(l), d = 0, a = f = v = l = void 0;
  }
  function X() {
    return l === void 0 ? p : k(ot());
  }
  function Z() {
    var y = ot(), W = w(y);
    if (a = arguments, v = this, f = y, W) {
      if (l === void 0)
        return b(f);
      if (h)
        return l = setTimeout(A, i), u(f);
    }
    return l === void 0 && (l = setTimeout(A, i)), p;
  }
  return Z.cancel = I, Z.flush = X, Z;
}
function Wt(e, i, t) {
  var a = !0, v = !0;
  if (typeof e != "function")
    throw new TypeError(lt);
  return st(t) && (a = "leading" in t ? !!t.leading : a, v = "trailing" in t ? !!t.trailing : v), It(e, i, {
    leading: a,
    maxWait: i,
    trailing: v
  });
}
function st(e) {
  var i = typeof e;
  return !!e && (i == "object" || i == "function");
}
function jt(e) {
  return !!e && typeof e == "object";
}
function At(e) {
  return typeof e == "symbol" || jt(e) && _t.call(e) == xt;
}
function ft(e) {
  if (typeof e == "number")
    return e;
  if (At(e))
    return ct;
  if (st(e)) {
    var i = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = st(i) ? i + "" : i;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = e.replace(Ct, "");
  var t = bt.test(e);
  return t || yt.test(e) ? Ot(e.slice(2), t ? 2 : 8) : Mt.test(e) ? ct : +e;
}
var ut = Wt, dt = { exports: {} };
(function(e, i) {
  (function(t, a) {
    e.exports = a();
  })(Q, function() {
    var t = 1e3, a = 6e4, v = 36e5, c = "millisecond", p = "second", l = "minute", f = "hour", d = "day", M = "week", h = "month", C = "quarter", u = "year", b = "date", s = "Invalid Date", w = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, A = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, k = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(m) {
      var o = ["th", "st", "nd", "rd"], n = m % 100;
      return "[" + m + (o[(n - 20) % 10] || o[n] || o[0]) + "]";
    } }, I = function(m, o, n) {
      var $ = String(m);
      return !$ || $.length >= o ? m : "" + Array(o + 1 - $.length).join(n) + m;
    }, X = { s: I, z: function(m) {
      var o = -m.utcOffset(), n = Math.abs(o), $ = Math.floor(n / 60), r = n % 60;
      return (o <= 0 ? "+" : "-") + I($, 2, "0") + ":" + I(r, 2, "0");
    }, m: function m(o, n) {
      if (o.date() < n.date())
        return -m(n, o);
      var $ = 12 * (n.year() - o.year()) + (n.month() - o.month()), r = o.clone().add($, h), x = n - r < 0, g = o.clone().add($ + (x ? -1 : 1), h);
      return +(-($ + (n - r) / (x ? r - g : g - r)) || 0);
    }, a: function(m) {
      return m < 0 ? Math.ceil(m) || 0 : Math.floor(m);
    }, p: function(m) {
      return { M: h, y: u, w: M, d, D: b, h: f, m: l, s: p, ms: c, Q: C }[m] || String(m || "").toLowerCase().replace(/s$/, "");
    }, u: function(m) {
      return m === void 0;
    } }, Z = "en", y = {};
    y[Z] = k;
    var W = function(m) {
      return m instanceof et;
    }, B = function m(o, n, $) {
      var r;
      if (!o)
        return Z;
      if (typeof o == "string") {
        var x = o.toLowerCase();
        y[x] && (r = x), n && (y[x] = n, r = x);
        var g = o.split("-");
        if (!r && g.length > 1)
          return m(g[0]);
      } else {
        var O = o.name;
        y[O] = o, r = O;
      }
      return !$ && r && (Z = r), r || !$ && Z;
    }, D = function(m, o) {
      if (W(m))
        return m.clone();
      var n = typeof o == "object" ? o : {};
      return n.date = m, n.args = arguments, new et(n);
    }, T = X;
    T.l = B, T.i = W, T.w = function(m, o) {
      return D(m, { locale: o.$L, utc: o.$u, x: o.$x, $offset: o.$offset });
    };
    var et = function() {
      function m(n) {
        this.$L = B(n.locale, null, !0), this.parse(n);
      }
      var o = m.prototype;
      return o.parse = function(n) {
        this.$d = function($) {
          var r = $.date, x = $.utc;
          if (r === null)
            return new Date(NaN);
          if (T.u(r))
            return new Date();
          if (r instanceof Date)
            return new Date(r);
          if (typeof r == "string" && !/Z$/i.test(r)) {
            var g = r.match(w);
            if (g) {
              var O = g[2] - 1 || 0, _ = (g[7] || "0").substring(0, 3);
              return x ? new Date(Date.UTC(g[1], O, g[3] || 1, g[4] || 0, g[5] || 0, g[6] || 0, _)) : new Date(g[1], O, g[3] || 1, g[4] || 0, g[5] || 0, g[6] || 0, _);
            }
          }
          return new Date(r);
        }(n), this.$x = n.x || {}, this.init();
      }, o.init = function() {
        var n = this.$d;
        this.$y = n.getFullYear(), this.$M = n.getMonth(), this.$D = n.getDate(), this.$W = n.getDay(), this.$H = n.getHours(), this.$m = n.getMinutes(), this.$s = n.getSeconds(), this.$ms = n.getMilliseconds();
      }, o.$utils = function() {
        return T;
      }, o.isValid = function() {
        return this.$d.toString() !== s;
      }, o.isSame = function(n, $) {
        var r = D(n);
        return this.startOf($) <= r && r <= this.endOf($);
      }, o.isAfter = function(n, $) {
        return D(n) < this.startOf($);
      }, o.isBefore = function(n, $) {
        return this.endOf($) < D(n);
      }, o.$g = function(n, $, r) {
        return T.u(n) ? this[$] : this.set(r, n);
      }, o.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, o.valueOf = function() {
        return this.$d.getTime();
      }, o.startOf = function(n, $) {
        var r = this, x = !!T.u($) || $, g = T.p(n), O = function(q, U) {
          var J = T.w(r.$u ? Date.UTC(r.$y, U, q) : new Date(r.$y, U, q), r);
          return x ? J : J.endOf(d);
        }, _ = function(q, U) {
          return T.w(r.toDate()[q].apply(r.toDate("s"), (x ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(U)), r);
        }, S = this.$W, j = this.$M, P = this.$D, N = "set" + (this.$u ? "UTC" : "");
        switch (g) {
          case u:
            return x ? O(1, 0) : O(31, 11);
          case h:
            return x ? O(1, j) : O(0, j + 1);
          case M:
            var tt = this.$locale().weekStart || 0, it = (S < tt ? S + 7 : S) - tt;
            return O(x ? P - it : P + (6 - it), j);
          case d:
          case b:
            return _(N + "Hours", 0);
          case f:
            return _(N + "Minutes", 1);
          case l:
            return _(N + "Seconds", 2);
          case p:
            return _(N + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, o.endOf = function(n) {
        return this.startOf(n, !1);
      }, o.$set = function(n, $) {
        var r, x = T.p(n), g = "set" + (this.$u ? "UTC" : ""), O = (r = {}, r[d] = g + "Date", r[b] = g + "Date", r[h] = g + "Month", r[u] = g + "FullYear", r[f] = g + "Hours", r[l] = g + "Minutes", r[p] = g + "Seconds", r[c] = g + "Milliseconds", r)[x], _ = x === d ? this.$D + ($ - this.$W) : $;
        if (x === h || x === u) {
          var S = this.clone().set(b, 1);
          S.$d[O](_), S.init(), this.$d = S.set(b, Math.min(this.$D, S.daysInMonth())).$d;
        } else
          O && this.$d[O](_);
        return this.init(), this;
      }, o.set = function(n, $) {
        return this.clone().$set(n, $);
      }, o.get = function(n) {
        return this[T.p(n)]();
      }, o.add = function(n, $) {
        var r, x = this;
        n = Number(n);
        var g = T.p($), O = function(j) {
          var P = D(x);
          return T.w(P.date(P.date() + Math.round(j * n)), x);
        };
        if (g === h)
          return this.set(h, this.$M + n);
        if (g === u)
          return this.set(u, this.$y + n);
        if (g === d)
          return O(1);
        if (g === M)
          return O(7);
        var _ = (r = {}, r[l] = a, r[f] = v, r[p] = t, r)[g] || 1, S = this.$d.getTime() + n * _;
        return T.w(S, this);
      }, o.subtract = function(n, $) {
        return this.add(-1 * n, $);
      }, o.format = function(n) {
        var $ = this, r = this.$locale();
        if (!this.isValid())
          return r.invalidDate || s;
        var x = n || "YYYY-MM-DDTHH:mm:ssZ", g = T.z(this), O = this.$H, _ = this.$m, S = this.$M, j = r.weekdays, P = r.months, N = function(U, J, rt, nt) {
          return U && (U[J] || U($, x)) || rt[J].slice(0, nt);
        }, tt = function(U) {
          return T.s(O % 12 || 12, U, "0");
        }, it = r.meridiem || function(U, J, rt) {
          var nt = U < 12 ? "AM" : "PM";
          return rt ? nt.toLowerCase() : nt;
        }, q = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: S + 1, MM: T.s(S + 1, 2, "0"), MMM: N(r.monthsShort, S, P, 3), MMMM: N(P, S), D: this.$D, DD: T.s(this.$D, 2, "0"), d: String(this.$W), dd: N(r.weekdaysMin, this.$W, j, 2), ddd: N(r.weekdaysShort, this.$W, j, 3), dddd: j[this.$W], H: String(O), HH: T.s(O, 2, "0"), h: tt(1), hh: tt(2), a: it(O, _, !0), A: it(O, _, !1), m: String(_), mm: T.s(_, 2, "0"), s: String(this.$s), ss: T.s(this.$s, 2, "0"), SSS: T.s(this.$ms, 3, "0"), Z: g };
        return x.replace(A, function(U, J) {
          return J || q[U] || g.replace(":", "");
        });
      }, o.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, o.diff = function(n, $, r) {
        var x, g = T.p($), O = D(n), _ = (O.utcOffset() - this.utcOffset()) * a, S = this - O, j = T.m(this, O);
        return j = (x = {}, x[u] = j / 12, x[h] = j, x[C] = j / 3, x[M] = (S - _) / 6048e5, x[d] = (S - _) / 864e5, x[f] = S / v, x[l] = S / a, x[p] = S / t, x)[g] || S, r ? j : T.a(j);
      }, o.daysInMonth = function() {
        return this.endOf(h).$D;
      }, o.$locale = function() {
        return y[this.$L];
      }, o.locale = function(n, $) {
        if (!n)
          return this.$L;
        var r = this.clone(), x = B(n, $, !0);
        return x && (r.$L = x), r;
      }, o.clone = function() {
        return T.w(this.$d, this);
      }, o.toDate = function() {
        return new Date(this.valueOf());
      }, o.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, o.toISOString = function() {
        return this.$d.toISOString();
      }, o.toString = function() {
        return this.$d.toUTCString();
      }, m;
    }(), at = et.prototype;
    return D.prototype = at, [["$ms", c], ["$s", p], ["$m", l], ["$H", f], ["$W", d], ["$M", h], ["$y", u], ["$D", b]].forEach(function(m) {
      at[m[1]] = function(o) {
        return this.$g(o, m[0], m[1]);
      };
    }), D.extend = function(m, o) {
      return m.$i || (m(o, et, D), m.$i = !0), D;
    }, D.locale = B, D.isDayjs = W, D.unix = function(m) {
      return D(1e3 * m);
    }, D.en = y[Z], D.Ls = y, D.p = {}, D;
  });
})(dt);
const mt = dt.exports;
var $t = { exports: {} };
(function(e, i) {
  (function(t, a) {
    e.exports = a();
  })(Q, function() {
    var t = "minute", a = /[+-]\d\d(?::?\d\d)?/g, v = /([+-]|\d\d)/g;
    return function(c, p, l) {
      var f = p.prototype;
      l.utc = function(s) {
        var w = { date: s, utc: !0, args: arguments };
        return new p(w);
      }, f.utc = function(s) {
        var w = l(this.toDate(), { locale: this.$L, utc: !0 });
        return s ? w.add(this.utcOffset(), t) : w;
      }, f.local = function() {
        return l(this.toDate(), { locale: this.$L, utc: !1 });
      };
      var d = f.parse;
      f.parse = function(s) {
        s.utc && (this.$u = !0), this.$utils().u(s.$offset) || (this.$offset = s.$offset), d.call(this, s);
      };
      var M = f.init;
      f.init = function() {
        if (this.$u) {
          var s = this.$d;
          this.$y = s.getUTCFullYear(), this.$M = s.getUTCMonth(), this.$D = s.getUTCDate(), this.$W = s.getUTCDay(), this.$H = s.getUTCHours(), this.$m = s.getUTCMinutes(), this.$s = s.getUTCSeconds(), this.$ms = s.getUTCMilliseconds();
        } else
          M.call(this);
      };
      var h = f.utcOffset;
      f.utcOffset = function(s, w) {
        var A = this.$utils().u;
        if (A(s))
          return this.$u ? 0 : A(this.$offset) ? h.call(this) : this.$offset;
        if (typeof s == "string" && (s = function(Z) {
          Z === void 0 && (Z = "");
          var y = Z.match(a);
          if (!y)
            return null;
          var W = ("" + y[0]).match(v) || ["-", 0, 0], B = W[0], D = 60 * +W[1] + +W[2];
          return D === 0 ? 0 : B === "+" ? D : -D;
        }(s), s === null))
          return this;
        var k = Math.abs(s) <= 16 ? 60 * s : s, I = this;
        if (w)
          return I.$offset = k, I.$u = s === 0, I;
        if (s !== 0) {
          var X = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
          (I = this.local().add(k + X, t)).$offset = k, I.$x.$localOffset = X;
        } else
          I = this.utc();
        return I;
      };
      var C = f.format;
      f.format = function(s) {
        var w = s || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
        return C.call(this, w);
      }, f.valueOf = function() {
        var s = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
        return this.$d.valueOf() - 6e4 * s;
      }, f.isUTC = function() {
        return !!this.$u;
      }, f.toISOString = function() {
        return this.toDate().toISOString();
      }, f.toString = function() {
        return this.toDate().toUTCString();
      };
      var u = f.toDate;
      f.toDate = function(s) {
        return s === "s" && this.$offset ? l(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : u.call(this);
      };
      var b = f.diff;
      f.diff = function(s, w, A) {
        if (s && this.$u === s.$u)
          return b.call(this, s, w, A);
        var k = this.local(), I = l(s).local();
        return b.call(k, I, w, A);
      };
    };
  });
})($t);
const Et = $t.exports;
mt.extend(Et);
const E = (e, i = "HH:mm") => mt.utc(e * 1e3).format(i);
function Ut({
  pointWidth: e,
  timePerPixel: i,
  timeSpacing: t,
  screenScaleCount: a,
  scaleSpacing: v,
  scaleHeight: c,
  startTime: p,
  drawLine: l,
  drawText: f
}) {
  if (console.log("startTime", p), t === 1) {
    for (let d = 0; d < a; d++) {
      const M = d * v + e / 2, h = Math.ceil(p + d * t);
      if (!(h <= 0)) {
        if (h % 10 === 0) {
          l(M, c.height5), f(M, c.height5 + 13, `${E(h, "HH:mm:ss")}`);
          continue;
        }
        if (h % 5 === 0) {
          l(M, c.height3);
          continue;
        }
        if (h % 1 === 0) {
          l(M, c.height1);
          continue;
        }
      }
    }
    return;
  }
  if (t === 10) {
    const d = +E(p, "s") % 10, M = d / i;
    for (let h = 0; h < a; h++) {
      const C = h * v - M - e / 2, u = Math.ceil(p + h * t - d);
      if (!(u <= 0)) {
        if (u % 60 === 0) {
          l(C, c.height4), f(C, c.height5 + 13, `${E(u, "HH:mm")}`);
          continue;
        }
        if (u % 10 === 0) {
          l(C, c.height1);
          continue;
        }
      }
    }
    return;
  }
  if (t === 30) {
    const d = +E(p, "s") % 30, M = d / i;
    for (let h = 0; h < a; h++) {
      const C = h * v - M - e / 2, u = Math.ceil(p + h * t - d);
      if (!(u <= 0)) {
        if (u % (60 * 5) === 0) {
          l(C, c.height4), f(C, c.height5 + 13, `${E(u, "HH:mm")}`);
          continue;
        }
        if (u % 30 === 0) {
          l(C, c.height1);
          continue;
        }
      }
    }
    return;
  }
  if (t === 60) {
    const d = +E(p, "s") % 60, M = d / i;
    for (let h = 0; h < a; h++) {
      const C = h * v - M - e / 2, u = Math.ceil(p + h * t - d);
      if (!(u <= 0)) {
        if (u % (60 * 60) === 0) {
          l(C, c.height5), f(C, c.height5 + 13, `${E(u)}`);
          continue;
        }
        if (u % (60 * 5) === 0) {
          l(C, c.height3), u % (60 * 10) === 0 && f(C, c.height5 + 13, `${E(u, "HH:mm")}`);
          continue;
        }
        if (u % 60 === 0) {
          l(C, c.height1);
          continue;
        }
      }
    }
    return;
  }
  if (t === 120) {
    const d = E(p, "m:s").split(":"), h = (+d[0] * 60 + +d[1]) % 120, C = h / i;
    for (let u = 0; u < a; u++) {
      const b = u * v - C - e / 2, s = Math.ceil(p + u * t - h);
      if (!(s <= 0)) {
        if (s % (60 * 30) === 0) {
          l(b, c.height5), f(b, c.height5 + 13, `${E(s)}`);
          continue;
        }
        if (s % (60 * 10) === 0) {
          l(b, c.height3);
          continue;
        }
        if (s % (60 * 2) === 0) {
          l(b, c.height1);
          continue;
        }
      }
    }
    return;
  }
  if (t === 300) {
    const d = E(p, "m:s").split(":"), h = (+d[0] * 60 + +d[1]) % 300, C = h / i;
    for (let u = 0; u < a; u++) {
      const b = u * v - C - e / 2, s = Math.ceil(p + u * t - h);
      if (!(s <= 0)) {
        if (s % (60 * 60) === 0) {
          l(b, c.height5), f(b, c.height5 + 13, `${E(s)}`);
          continue;
        }
        if (s % (60 * 30) === 0) {
          l(b, c.height3);
          continue;
        }
        if (s % (60 * 5) === 0) {
          l(b, c.height1);
          continue;
        }
      }
    }
    return;
  }
  if (t === 600) {
    const d = E(p, "m:s").split(":"), h = (+d[0] * 60 + +d[1]) % 600, C = h / i;
    for (let u = 0; u < a; u++) {
      const b = u * v - C - e / 2, s = Math.ceil(p + u * t - h);
      if (!(s <= 0)) {
        if (s % (60 * 60) === 0) {
          l(b, c.height5), f(b, c.height5 + 13, `${E(s)}`);
          continue;
        }
        if (s % (60 * 30) === 0) {
          l(b, c.height3);
          continue;
        }
        if (s % (60 * 5) === 0) {
          l(b, c.height1);
          continue;
        }
      }
    }
    return;
  }
}
const Zt = {
  fill: !1,
  bgColor: "rgba(0,0,0,0.5)",
  textColor: "#ffffff",
  scaleColor: "#ffffff",
  areaBgColor: "#ffffff55",
  pointColor: "#00aeec",
  pointWidth: 3,
  scaleSpacing: 7,
  fps: 30,
  zoom: 2,
  maxZoom: 8,
  minZoom: 1
};
var L, R, F, K, V;
class Bt {
  constructor(i, t) {
    z(this, "$canvas");
    z(this, "canvasContext");
    G(this, L, void 0);
    z(this, "currentTime");
    z(this, "areas");
    G(this, R, void 0);
    G(this, F, void 0);
    z(this, "scaleSpacing");
    z(this, "bgColor");
    G(this, K, void 0);
    z(this, "pointWidth");
    z(this, "pointColor");
    z(this, "textColor");
    z(this, "scaleColor");
    z(this, "areaBgColor");
    G(this, V, void 0);
    z(this, "fps");
    if (!i)
      throw new Error("canvas id is required!");
    this.$canvas = document.getElementById(i), this.canvasContext = this.$canvas.getContext("2d");
    const { fill: a, width: v, height: c, bgColor: p, textColor: l, scaleColor: f, areaBgColor: d, pointColor: M, pointWidth: h, scaleSpacing: C, fps: u, zoom: b, maxZoom: s, minZoom: w } = { ...Zt, ...t };
    if (b < w || b > s || b % 1 !== 0)
      throw new Error(`zoom must be minZoom ~ maxZoom(${w} ~1 ${s}), and must be an integer`);
    if (s < 1 || s > 7 || s % 1 !== 0)
      throw new Error("maxZoom must be 1 ~ 7, and must be an integer");
    if (w < 1 || w > 7 || w % 1 !== 0)
      throw new Error("minZoom must be 1 ~ 7, and must be an integer");
    if (s < w)
      throw new Error("maxZoom must be greater than minZoom");
    if (a) {
      const k = this.$canvas.parentElement;
      this.$canvas.width = k.clientWidth, this.$canvas.height = k.clientHeight, new ResizeObserver(ut(this._onParentResize.bind(this), 200)).observe(k);
    } else
      v && (this.$canvas.width = v), c && (this.$canvas.height = c);
    H(this, V, !1), H(this, L, pt()), this.currentTime = 0;
    const A = [1, 10, 30, 60, 120, 300, 600];
    H(this, R, []);
    for (let k = w - 1; k < s; k++)
      Y(this, R).push(A[k]);
    H(this, F, A[b - 1]), this.scaleSpacing = C, H(this, K, {
      height6: this.$canvas.height / 2,
      height5: this.$canvas.height / 3,
      height4: this.$canvas.height / 4,
      height3: this.$canvas.height / 5,
      height2: this.$canvas.height / 8,
      height1: this.$canvas.height / 10
    }), this.bgColor = p, this.pointWidth = h, this.pointColor = M, this.textColor = l, this.scaleColor = f, this.areaBgColor = d, this.fps = u;
  }
  draw({ currentTime: i, areas: t, _privateFlag: a } = {}) {
    if (Y(this, V) && !a)
      return;
    this.currentTime = i || Math.floor(0), this.areas = t || [];
    const v = Math.ceil(this.$canvas.width / this.scaleSpacing), c = v * Y(this, F), p = this.currentTime - c / 2, l = this.currentTime + c / 2, f = this.$canvas.width / 2, d = c / this.$canvas.width;
    this.clear(), this.drawArea(0, 0, this.$canvas.width, this.$canvas.height, this.bgColor), this.areas.forEach((M) => {
      const h = M.startTime < p ? 0 : Math.floor((M.startTime - p) / d), C = M.endTime > l ? this.$canvas.width : Math.floor((M.endTime - p) / d);
      this.drawArea(h, 0, C, this.$canvas.height, M.bgColor || this.areaBgColor);
    }), Ut.bind(this)({
      pointWidth: this.pointWidth,
      timePerPixel: d,
      scaleHeight: Y(this, K),
      scaleSpacing: this.scaleSpacing,
      timeSpacing: Y(this, F),
      screenScaleCount: v,
      startTime: p,
      drawLine: this.drawLine.bind(this),
      drawText: this.drawText.bind(this)
    }), this.drawTimelineScale(Y(this, F)), this.drawLine(f - this.pointWidth / 2, this.$canvas.height, this.pointWidth, this.pointColor), this.drawArea(f - 54, 4, f + 54, 18, this.pointColor), this.drawText(f, 6, `${E(this.currentTime, "HH:mm:ss")}`, this.textColor, "center", "top"), this.$canvas.onwheel = this._onZoom.bind(this), this.$canvas.onmousedown = this._onDrag.bind(this);
  }
  _onDrag({ clientX: i }) {
    H(this, V, !0);
    let t = 0;
    document.onmousemove = ut((a) => {
      const v = a.clientX - i;
      let c = this.currentTime - Y(this, F) / this.scaleSpacing * (v - t);
      c = Math.max(c, 0), t = v, this.draw({
        currentTime: Math.round(c),
        areas: this.areas,
        _privateFlag: !0
      });
    }, Y(this, F) === 1 ? 100 : 1e3 / this.fps), document.onmouseup = () => {
      document.onmousemove = null, document.onmouseup = null, H(this, V, !1), this.emit("timeUpdate", this.currentTime);
    };
  }
  _onZoom(i) {
    i.preventDefault();
    const t = Y(this, R).findIndex((a) => a === Y(this, F));
    i.deltaY < 0 && t > 0 ? (H(this, F, Y(this, R)[t - 1]), this.draw({
      currentTime: this.currentTime,
      areas: this.areas,
      _privateFlag: !0
    })) : i.deltaY > 0 && t < Y(this, R).length - 1 && (H(this, F, Y(this, R)[t + 1]), this.draw({
      currentTime: this.currentTime,
      areas: this.areas,
      _privateFlag: !0
    }));
  }
  _onParentResize() {
    const i = this.$canvas.parentNode;
    !i || (this.$canvas.width = i.clientWidth, this.$canvas.height = i.clientHeight, H(this, K, {
      height6: this.$canvas.height / 2,
      height5: this.$canvas.height / 3,
      height4: this.$canvas.height / 4,
      height3: this.$canvas.height / 5,
      height2: this.$canvas.height / 8,
      height1: this.$canvas.height / 10
    }), this.draw({
      currentTime: this.currentTime,
      areas: this.areas
    }));
  }
  clear() {
    this.canvasContext && this.canvasContext.clearRect(0, 0, this.$canvas.width, this.$canvas.height), this.$canvas && (this.$canvas.onwheel = null, this.$canvas.onmousedown = null);
  }
  drawTimelineScale(i) {
    let t = "";
    switch (i) {
      case 1:
        t = "1s";
        break;
      case 10:
        t = "10s";
        break;
      case 30:
        t = "30s";
        break;
      case 60:
        t = "1min";
        break;
      case 120:
        t = "2min";
        break;
      case 300:
        t = "5min";
        break;
      case 600:
        t = "10min";
        break;
    }
    this.drawText(this.scaleSpacing + 12, 9, `${t}`, this.textColor, "left", "middle"), this.canvasContext.beginPath(), this.canvasContext.moveTo(5, 6), this.canvasContext.lineTo(5, 10), this.canvasContext.lineTo(this.scaleSpacing + 7, 10), this.canvasContext.lineTo(this.scaleSpacing + 7, 6), this.canvasContext.strokeStyle = this.scaleColor, this.canvasContext.lineWidth = 1.5, this.canvasContext.stroke();
  }
  drawLine(i, t, a = 1, v = this.scaleColor) {
    this.canvasContext.beginPath(), this.canvasContext.moveTo(i, this.$canvas.height), this.canvasContext.lineTo(i, this.$canvas.height - t), this.canvasContext.closePath(), this.canvasContext.strokeStyle = v, this.canvasContext.lineWidth = a, this.canvasContext.stroke();
  }
  drawText(i, t, a, v = this.textColor, c = "center", p = "alphabetic") {
    this.canvasContext.beginPath(), this.canvasContext.font = "11px Arial", this.canvasContext.fillStyle = v, this.canvasContext.textAlign = c, this.canvasContext.textBaseline = p, this.canvasContext.fillText(a, i, t);
  }
  drawArea(i, t, a, v, c) {
    this.canvasContext.beginPath(), this.canvasContext.rect(i, t, a - i, v - t), this.canvasContext.fillStyle = c, this.canvasContext.fill();
  }
  on(i, t) {
    Y(this, L).on(i, t);
  }
  off(i, t) {
    Y(this, L).off(i, t);
  }
  emit(...i) {
    Y(this, L).emit(...i);
  }
}
L = new WeakMap(), R = new WeakMap(), F = new WeakMap(), K = new WeakMap(), V = new WeakMap();
export {
  Bt as default
};
