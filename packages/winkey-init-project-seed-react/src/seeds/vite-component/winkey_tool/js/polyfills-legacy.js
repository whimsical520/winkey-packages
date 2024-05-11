!(function () {
  'use strict'
  var t =
      'undefined' != typeof globalThis
        ? globalThis
        : 'undefined' != typeof window
        ? window
        : 'undefined' != typeof global
        ? global
        : 'undefined' != typeof self
        ? self
        : {},
    e = function (t) {
      return t && t.Math == Math && t
    },
    r =
      e('object' == typeof globalThis && globalThis) ||
      e('object' == typeof window && window) ||
      e('object' == typeof self && self) ||
      e('object' == typeof t && t) ||
      (function () {
        return this
      })() ||
      Function('return this')(),
    n = {},
    o = function (t) {
      try {
        return !!t()
      } catch (e) {
        return !0
      }
    },
    i = !o(function () {
      return (
        7 !=
        Object.defineProperty({}, 1, {
          get: function () {
            return 7
          }
        })[1]
      )
    }),
    c = !o(function () {
      var t = function () {}.bind()
      return 'function' != typeof t || t.hasOwnProperty('prototype')
    }),
    u = c,
    a = Function.prototype.call,
    f = u
      ? a.bind(a)
      : function () {
          return a.apply(a, arguments)
        },
    s = {},
    l = {}.propertyIsEnumerable,
    h = Object.getOwnPropertyDescriptor,
    p = h && !l.call({ 1: 2 }, 1)
  s.f = p
    ? function (t) {
        var e = h(this, t)
        return !!e && e.enumerable
      }
    : l
  var v,
    d,
    y = function (t, e) {
      return { enumerable: !(1 & t), configurable: !(2 & t), writable: !(4 & t), value: e }
    },
    g = c,
    m = Function.prototype,
    b = m.bind,
    w = m.call,
    O = g && b.bind(w, w),
    S = g
      ? function (t) {
          return t && O(t)
        }
      : function (t) {
          return (
            t &&
            function () {
              return w.apply(t, arguments)
            }
          )
        },
    j = S,
    E = j({}.toString),
    T = j(''.slice),
    x = function (t) {
      return T(E(t), 8, -1)
    },
    L = o,
    P = x,
    R = Object,
    I = S(''.split),
    _ = L(function () {
      return !R('z').propertyIsEnumerable(0)
    })
      ? function (t) {
          return 'String' == P(t) ? I(t, '') : R(t)
        }
      : R,
    C = function (t) {
      return null == t
    },
    A = C,
    M = TypeError,
    k = function (t) {
      if (A(t)) throw M("Can't call method on " + t)
      return t
    },
    N = _,
    F = k,
    D = function (t) {
      return N(F(t))
    },
    G = 'object' == typeof document && document.all,
    U = { all: G, IS_HTMLDDA: void 0 === G && void 0 !== G },
    V = U.all,
    W = U.IS_HTMLDDA
      ? function (t) {
          return 'function' == typeof t || t === V
        }
      : function (t) {
          return 'function' == typeof t
        },
    z = W,
    B = U.all,
    H = U.IS_HTMLDDA
      ? function (t) {
          return 'object' == typeof t ? null !== t : z(t) || t === B
        }
      : function (t) {
          return 'object' == typeof t ? null !== t : z(t)
        },
    q = r,
    Y = W,
    J = function (t) {
      return Y(t) ? t : void 0
    },
    K = function (t, e) {
      return arguments.length < 2 ? J(q[t]) : q[t] && q[t][e]
    },
    X = S({}.isPrototypeOf),
    $ = K('navigator', 'userAgent') || '',
    Q = r,
    Z = $,
    tt = Q.process,
    et = Q.Deno,
    rt = (tt && tt.versions) || (et && et.version),
    nt = rt && rt.v8
  nt && (d = (v = nt.split('.'))[0] > 0 && v[0] < 4 ? 1 : +(v[0] + v[1])),
    !d &&
      Z &&
      (!(v = Z.match(/Edge\/(\d+)/)) || v[1] >= 74) &&
      (v = Z.match(/Chrome\/(\d+)/)) &&
      (d = +v[1])
  var ot = d,
    it = ot,
    ct = o,
    ut =
      !!Object.getOwnPropertySymbols &&
      !ct(function () {
        var t = Symbol()
        return !String(t) || !(Object(t) instanceof Symbol) || (!Symbol.sham && it && it < 41)
      }),
    at = ut && !Symbol.sham && 'symbol' == typeof Symbol.iterator,
    ft = K,
    st = W,
    lt = X,
    ht = Object,
    pt = at
      ? function (t) {
          return 'symbol' == typeof t
        }
      : function (t) {
          var e = ft('Symbol')
          return st(e) && lt(e.prototype, ht(t))
        },
    vt = String,
    dt = function (t) {
      try {
        return vt(t)
      } catch (e) {
        return 'Object'
      }
    },
    yt = W,
    gt = dt,
    mt = TypeError,
    bt = function (t) {
      if (yt(t)) return t
      throw mt(gt(t) + ' is not a function')
    },
    wt = bt,
    Ot = C,
    St = function (t, e) {
      var r = t[e]
      return Ot(r) ? void 0 : wt(r)
    },
    jt = f,
    Et = W,
    Tt = H,
    xt = TypeError,
    Lt = { exports: {} },
    Pt = r,
    Rt = Object.defineProperty,
    It = function (t, e) {
      try {
        Rt(Pt, t, { value: e, configurable: !0, writable: !0 })
      } catch (r) {
        Pt[t] = e
      }
      return e
    },
    _t = It,
    Ct = '__core-js_shared__',
    At = r[Ct] || _t(Ct, {}),
    Mt = At
  ;(Lt.exports = function (t, e) {
    return Mt[t] || (Mt[t] = void 0 !== e ? e : {})
  })('versions', []).push({
    version: '3.25.2',
    mode: 'global',
    copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
    license: 'https://github.com/zloirock/core-js/blob/v3.25.2/LICENSE',
    source: 'https://github.com/zloirock/core-js'
  })
  var kt = k,
    Nt = Object,
    Ft = function (t) {
      return Nt(kt(t))
    },
    Dt = Ft,
    Gt = S({}.hasOwnProperty),
    Ut =
      Object.hasOwn ||
      function (t, e) {
        return Gt(Dt(t), e)
      },
    Vt = S,
    Wt = 0,
    zt = Math.random(),
    Bt = Vt((1).toString),
    Ht = function (t) {
      return 'Symbol(' + (void 0 === t ? '' : t) + ')_' + Bt(++Wt + zt, 36)
    },
    qt = r,
    Yt = Lt.exports,
    Jt = Ut,
    Kt = Ht,
    Xt = ut,
    $t = at,
    Qt = Yt('wks'),
    Zt = qt.Symbol,
    te = Zt && Zt.for,
    ee = $t ? Zt : (Zt && Zt.withoutSetter) || Kt,
    re = function (t) {
      if (!Jt(Qt, t) || (!Xt && 'string' != typeof Qt[t])) {
        var e = 'Symbol.' + t
        Xt && Jt(Zt, t) ? (Qt[t] = Zt[t]) : (Qt[t] = $t && te ? te(e) : ee(e))
      }
      return Qt[t]
    },
    ne = f,
    oe = H,
    ie = pt,
    ce = St,
    ue = function (t, e) {
      var r, n
      if ('string' === e && Et((r = t.toString)) && !Tt((n = jt(r, t)))) return n
      if (Et((r = t.valueOf)) && !Tt((n = jt(r, t)))) return n
      if ('string' !== e && Et((r = t.toString)) && !Tt((n = jt(r, t)))) return n
      throw xt("Can't convert object to primitive value")
    },
    ae = TypeError,
    fe = re('toPrimitive'),
    se = function (t, e) {
      if (!oe(t) || ie(t)) return t
      var r,
        n = ce(t, fe)
      if (n) {
        if ((void 0 === e && (e = 'default'), (r = ne(n, t, e)), !oe(r) || ie(r))) return r
        throw ae("Can't convert object to primitive value")
      }
      return void 0 === e && (e = 'number'), ue(t, e)
    },
    le = pt,
    he = function (t) {
      var e = se(t, 'string')
      return le(e) ? e : e + ''
    },
    pe = H,
    ve = r.document,
    de = pe(ve) && pe(ve.createElement),
    ye = function (t) {
      return de ? ve.createElement(t) : {}
    },
    ge = ye,
    me =
      !i &&
      !o(function () {
        return (
          7 !=
          Object.defineProperty(ge('div'), 'a', {
            get: function () {
              return 7
            }
          }).a
        )
      }),
    be = i,
    we = f,
    Oe = s,
    Se = y,
    je = D,
    Ee = he,
    Te = Ut,
    xe = me,
    Le = Object.getOwnPropertyDescriptor
  n.f = be
    ? Le
    : function (t, e) {
        if (((t = je(t)), (e = Ee(e)), xe))
          try {
            return Le(t, e)
          } catch (r) {}
        if (Te(t, e)) return Se(!we(Oe.f, t, e), t[e])
      }
  var Pe = {},
    Re =
      i &&
      o(function () {
        return (
          42 !=
          Object.defineProperty(function () {}, 'prototype', { value: 42, writable: !1 }).prototype
        )
      }),
    Ie = H,
    _e = String,
    Ce = TypeError,
    Ae = function (t) {
      if (Ie(t)) return t
      throw Ce(_e(t) + ' is not an object')
    },
    Me = i,
    ke = me,
    Ne = Re,
    Fe = Ae,
    De = he,
    Ge = TypeError,
    Ue = Object.defineProperty,
    Ve = Object.getOwnPropertyDescriptor,
    We = 'enumerable',
    ze = 'configurable',
    Be = 'writable'
  Pe.f = Me
    ? Ne
      ? function (t, e, r) {
          if (
            (Fe(t),
            (e = De(e)),
            Fe(r),
            'function' == typeof t && 'prototype' === e && 'value' in r && Be in r && !r.writable)
          ) {
            var n = Ve(t, e)
            n &&
              n.writable &&
              ((t[e] = r.value),
              (r = {
                configurable: ze in r ? r.configurable : n.configurable,
                enumerable: We in r ? r.enumerable : n.enumerable,
                writable: !1
              }))
          }
          return Ue(t, e, r)
        }
      : Ue
    : function (t, e, r) {
        if ((Fe(t), (e = De(e)), Fe(r), ke))
          try {
            return Ue(t, e, r)
          } catch (n) {}
        if ('get' in r || 'set' in r) throw Ge('Accessors not supported')
        return 'value' in r && (t[e] = r.value), t
      }
  var He = Pe,
    qe = y,
    Ye = i
      ? function (t, e, r) {
          return He.f(t, e, qe(1, r))
        }
      : function (t, e, r) {
          return (t[e] = r), t
        },
    Je = { exports: {} },
    Ke = i,
    Xe = Ut,
    $e = Function.prototype,
    Qe = Ke && Object.getOwnPropertyDescriptor,
    Ze = Xe($e, 'name'),
    tr = {
      EXISTS: Ze,
      PROPER: Ze && 'something' === function () {}.name,
      CONFIGURABLE: Ze && (!Ke || (Ke && Qe($e, 'name').configurable))
    },
    er = W,
    rr = At,
    nr = S(Function.toString)
  er(rr.inspectSource) ||
    (rr.inspectSource = function (t) {
      return nr(t)
    })
  var or,
    ir,
    cr,
    ur = rr.inspectSource,
    ar = W,
    fr = r.WeakMap,
    sr = ar(fr) && /native code/.test(String(fr)),
    lr = Lt.exports,
    hr = Ht,
    pr = lr('keys'),
    vr = function (t) {
      return pr[t] || (pr[t] = hr(t))
    },
    dr = {},
    yr = sr,
    gr = r,
    mr = S,
    br = H,
    wr = Ye,
    Or = Ut,
    Sr = At,
    jr = vr,
    Er = dr,
    Tr = 'Object already initialized',
    xr = gr.TypeError,
    Lr = gr.WeakMap
  if (yr || Sr.state) {
    var Pr = Sr.state || (Sr.state = new Lr()),
      Rr = mr(Pr.get),
      Ir = mr(Pr.has),
      _r = mr(Pr.set)
    ;(or = function (t, e) {
      if (Ir(Pr, t)) throw xr(Tr)
      return (e.facade = t), _r(Pr, t, e), e
    }),
      (ir = function (t) {
        return Rr(Pr, t) || {}
      }),
      (cr = function (t) {
        return Ir(Pr, t)
      })
  } else {
    var Cr = jr('state')
    ;(Er[Cr] = !0),
      (or = function (t, e) {
        if (Or(t, Cr)) throw xr(Tr)
        return (e.facade = t), wr(t, Cr, e), e
      }),
      (ir = function (t) {
        return Or(t, Cr) ? t[Cr] : {}
      }),
      (cr = function (t) {
        return Or(t, Cr)
      })
  }
  var Ar = {
      set: or,
      get: ir,
      has: cr,
      enforce: function (t) {
        return cr(t) ? ir(t) : or(t, {})
      },
      getterFor: function (t) {
        return function (e) {
          var r
          if (!br(e) || (r = ir(e)).type !== t)
            throw xr('Incompatible receiver, ' + t + ' required')
          return r
        }
      }
    },
    Mr = o,
    kr = W,
    Nr = Ut,
    Fr = i,
    Dr = tr.CONFIGURABLE,
    Gr = ur,
    Ur = Ar.enforce,
    Vr = Ar.get,
    Wr = Object.defineProperty,
    zr =
      Fr &&
      !Mr(function () {
        return 8 !== Wr(function () {}, 'length', { value: 8 }).length
      }),
    Br = String(String).split('String'),
    Hr = (Je.exports = function (t, e, r) {
      'Symbol(' === String(e).slice(0, 7) &&
        (e = '[' + String(e).replace(/^Symbol\(([^)]*)\)/, '$1') + ']'),
        r && r.getter && (e = 'get ' + e),
        r && r.setter && (e = 'set ' + e),
        (!Nr(t, 'name') || (Dr && t.name !== e)) &&
          (Fr ? Wr(t, 'name', { value: e, configurable: !0 }) : (t.name = e)),
        zr && r && Nr(r, 'arity') && t.length !== r.arity && Wr(t, 'length', { value: r.arity })
      try {
        r && Nr(r, 'constructor') && r.constructor
          ? Fr && Wr(t, 'prototype', { writable: !1 })
          : t.prototype && (t.prototype = void 0)
      } catch (o) {}
      var n = Ur(t)
      return Nr(n, 'source') || (n.source = Br.join('string' == typeof e ? e : '')), t
    })
  Function.prototype.toString = Hr(function () {
    return (kr(this) && Vr(this).source) || Gr(this)
  }, 'toString')
  var qr = W,
    Yr = Pe,
    Jr = Je.exports,
    Kr = It,
    Xr = function (t, e, r, n) {
      n || (n = {})
      var o = n.enumerable,
        i = void 0 !== n.name ? n.name : e
      if ((qr(r) && Jr(r, i, n), n.global)) o ? (t[e] = r) : Kr(e, r)
      else {
        try {
          n.unsafe ? t[e] && (o = !0) : delete t[e]
        } catch (c) {}
        o
          ? (t[e] = r)
          : Yr.f(t, e, {
              value: r,
              enumerable: !1,
              configurable: !n.nonConfigurable,
              writable: !n.nonWritable
            })
      }
      return t
    },
    $r = {},
    Qr = Math.ceil,
    Zr = Math.floor,
    tn =
      Math.trunc ||
      function (t) {
        var e = +t
        return (e > 0 ? Zr : Qr)(e)
      },
    en = function (t) {
      var e = +t
      return e != e || 0 === e ? 0 : tn(e)
    },
    rn = en,
    nn = Math.max,
    on = Math.min,
    cn = en,
    un = Math.min,
    an = function (t) {
      return t > 0 ? un(cn(t), 9007199254740991) : 0
    },
    fn = function (t) {
      return an(t.length)
    },
    sn = D,
    ln = function (t, e) {
      var r = rn(t)
      return r < 0 ? nn(r + e, 0) : on(r, e)
    },
    hn = fn,
    pn = function (t) {
      return function (e, r, n) {
        var o,
          i = sn(e),
          c = hn(i),
          u = ln(n, c)
        if (t && r != r) {
          for (; c > u; ) if ((o = i[u++]) != o) return !0
        } else for (; c > u; u++) if ((t || u in i) && i[u] === r) return t || u || 0
        return !t && -1
      }
    },
    vn = { includes: pn(!0), indexOf: pn(!1) },
    dn = Ut,
    yn = D,
    gn = vn.indexOf,
    mn = dr,
    bn = S([].push),
    wn = function (t, e) {
      var r,
        n = yn(t),
        o = 0,
        i = []
      for (r in n) !dn(mn, r) && dn(n, r) && bn(i, r)
      for (; e.length > o; ) dn(n, (r = e[o++])) && (~gn(i, r) || bn(i, r))
      return i
    },
    On = [
      'constructor',
      'hasOwnProperty',
      'isPrototypeOf',
      'propertyIsEnumerable',
      'toLocaleString',
      'toString',
      'valueOf'
    ],
    Sn = wn,
    jn = On.concat('length', 'prototype')
  $r.f =
    Object.getOwnPropertyNames ||
    function (t) {
      return Sn(t, jn)
    }
  var En = {}
  En.f = Object.getOwnPropertySymbols
  var Tn = K,
    xn = $r,
    Ln = En,
    Pn = Ae,
    Rn = S([].concat),
    In =
      Tn('Reflect', 'ownKeys') ||
      function (t) {
        var e = xn.f(Pn(t)),
          r = Ln.f
        return r ? Rn(e, r(t)) : e
      },
    _n = Ut,
    Cn = In,
    An = n,
    Mn = Pe,
    kn = o,
    Nn = W,
    Fn = /#|\.prototype\./,
    Dn = function (t, e) {
      var r = Un[Gn(t)]
      return r == Wn || (r != Vn && (Nn(e) ? kn(e) : !!e))
    },
    Gn = (Dn.normalize = function (t) {
      return String(t).replace(Fn, '.').toLowerCase()
    }),
    Un = (Dn.data = {}),
    Vn = (Dn.NATIVE = 'N'),
    Wn = (Dn.POLYFILL = 'P'),
    zn = Dn,
    Bn = r,
    Hn = n.f,
    qn = Ye,
    Yn = Xr,
    Jn = It,
    Kn = function (t, e, r) {
      for (var n = Cn(e), o = Mn.f, i = An.f, c = 0; c < n.length; c++) {
        var u = n[c]
        _n(t, u) || (r && _n(r, u)) || o(t, u, i(e, u))
      }
    },
    Xn = zn,
    $n = function (t, e) {
      var r,
        n,
        o,
        i,
        c,
        u = t.target,
        a = t.global,
        f = t.stat
      if ((r = a ? Bn : f ? Bn[u] || Jn(u, {}) : (Bn[u] || {}).prototype))
        for (n in e) {
          if (
            ((i = e[n]),
            (o = t.dontCallGetSet ? (c = Hn(r, n)) && c.value : r[n]),
            !Xn(a ? n : u + (f ? '.' : '#') + n, t.forced) && void 0 !== o)
          ) {
            if (typeof i == typeof o) continue
            Kn(i, o)
          }
          ;(t.sham || (o && o.sham)) && qn(i, 'sham', !0), Yn(r, n, i, t)
        }
    },
    Qn = 'process' == x(r.process),
    Zn = W,
    to = String,
    eo = TypeError,
    ro = S,
    no = Ae,
    oo = function (t) {
      if ('object' == typeof t || Zn(t)) return t
      throw eo("Can't set " + to(t) + ' as a prototype')
    },
    io =
      Object.setPrototypeOf ||
      ('__proto__' in {}
        ? (function () {
            var t,
              e = !1,
              r = {}
            try {
              ;(t = ro(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set))(r, []),
                (e = r instanceof Array)
            } catch (n) {}
            return function (r, n) {
              return no(r), oo(n), e ? t(r, n) : (r.__proto__ = n), r
            }
          })()
        : void 0),
    co = Pe.f,
    uo = Ut,
    ao = re('toStringTag'),
    fo = function (t, e, r) {
      t && !r && (t = t.prototype), t && !uo(t, ao) && co(t, ao, { configurable: !0, value: e })
    },
    so = K,
    lo = Pe,
    ho = i,
    po = re('species'),
    vo = X,
    yo = TypeError,
    go = {}
  go[re('toStringTag')] = 'z'
  var mo = '[object z]' === String(go),
    bo = mo,
    wo = W,
    Oo = x,
    So = re('toStringTag'),
    jo = Object,
    Eo =
      'Arguments' ==
      Oo(
        (function () {
          return arguments
        })()
      ),
    To = bo
      ? Oo
      : function (t) {
          var e, r, n
          return void 0 === t
            ? 'Undefined'
            : null === t
            ? 'Null'
            : 'string' ==
              typeof (r = (function (t, e) {
                try {
                  return t[e]
                } catch (r) {}
              })((e = jo(t)), So))
            ? r
            : Eo
            ? Oo(e)
            : 'Object' == (n = Oo(e)) && wo(e.callee)
            ? 'Arguments'
            : n
        },
    xo = S,
    Lo = o,
    Po = W,
    Ro = To,
    Io = ur,
    _o = function () {},
    Co = [],
    Ao = K('Reflect', 'construct'),
    Mo = /^\s*(?:class|function)\b/,
    ko = xo(Mo.exec),
    No = !Mo.exec(_o),
    Fo = function (t) {
      if (!Po(t)) return !1
      try {
        return Ao(_o, Co, t), !0
      } catch (e) {
        return !1
      }
    },
    Do = function (t) {
      if (!Po(t)) return !1
      switch (Ro(t)) {
        case 'AsyncFunction':
        case 'GeneratorFunction':
        case 'AsyncGeneratorFunction':
          return !1
      }
      try {
        return No || !!ko(Mo, Io(t))
      } catch (e) {
        return !0
      }
    }
  Do.sham = !0
  var Go,
    Uo,
    Vo,
    Wo,
    zo =
      !Ao ||
      Lo(function () {
        var t
        return (
          Fo(Fo.call) ||
          !Fo(Object) ||
          !Fo(function () {
            t = !0
          }) ||
          t
        )
      })
        ? Do
        : Fo,
    Bo = zo,
    Ho = dt,
    qo = TypeError,
    Yo = Ae,
    Jo = function (t) {
      if (Bo(t)) return t
      throw qo(Ho(t) + ' is not a constructor')
    },
    Ko = C,
    Xo = re('species'),
    $o = c,
    Qo = Function.prototype,
    Zo = Qo.apply,
    ti = Qo.call,
    ei =
      ('object' == typeof Reflect && Reflect.apply) ||
      ($o
        ? ti.bind(Zo)
        : function () {
            return ti.apply(Zo, arguments)
          }),
    ri = bt,
    ni = c,
    oi = S(S.bind),
    ii = function (t, e) {
      return (
        ri(t),
        void 0 === e
          ? t
          : ni
          ? oi(t, e)
          : function () {
              return t.apply(e, arguments)
            }
      )
    },
    ci = K('document', 'documentElement'),
    ui = S([].slice),
    ai = TypeError,
    fi = /(?:ipad|iphone|ipod).*applewebkit/i.test($),
    si = r,
    li = ei,
    hi = ii,
    pi = W,
    vi = Ut,
    di = o,
    yi = ci,
    gi = ui,
    mi = ye,
    bi = function (t, e) {
      if (t < e) throw ai('Not enough arguments')
      return t
    },
    wi = fi,
    Oi = Qn,
    Si = si.setImmediate,
    ji = si.clearImmediate,
    Ei = si.process,
    Ti = si.Dispatch,
    xi = si.Function,
    Li = si.MessageChannel,
    Pi = si.String,
    Ri = 0,
    Ii = {},
    _i = 'onreadystatechange'
  try {
    Go = si.location
  } catch (il) {}
  var Ci = function (t) {
      if (vi(Ii, t)) {
        var e = Ii[t]
        delete Ii[t], e()
      }
    },
    Ai = function (t) {
      return function () {
        Ci(t)
      }
    },
    Mi = function (t) {
      Ci(t.data)
    },
    ki = function (t) {
      si.postMessage(Pi(t), Go.protocol + '//' + Go.host)
    }
  ;(Si && ji) ||
    ((Si = function (t) {
      bi(arguments.length, 1)
      var e = pi(t) ? t : xi(t),
        r = gi(arguments, 1)
      return (
        (Ii[++Ri] = function () {
          li(e, void 0, r)
        }),
        Uo(Ri),
        Ri
      )
    }),
    (ji = function (t) {
      delete Ii[t]
    }),
    Oi
      ? (Uo = function (t) {
          Ei.nextTick(Ai(t))
        })
      : Ti && Ti.now
      ? (Uo = function (t) {
          Ti.now(Ai(t))
        })
      : Li && !wi
      ? ((Wo = (Vo = new Li()).port2), (Vo.port1.onmessage = Mi), (Uo = hi(Wo.postMessage, Wo)))
      : si.addEventListener &&
        pi(si.postMessage) &&
        !si.importScripts &&
        Go &&
        'file:' !== Go.protocol &&
        !di(ki)
      ? ((Uo = ki), si.addEventListener('message', Mi, !1))
      : (Uo =
          _i in mi('script')
            ? function (t) {
                yi.appendChild(mi('script')).onreadystatechange = function () {
                  yi.removeChild(this), Ci(t)
                }
              }
            : function (t) {
                setTimeout(Ai(t), 0)
              }))
  var Ni,
    Fi,
    Di,
    Gi,
    Ui,
    Vi,
    Wi,
    zi,
    Bi = { set: Si, clear: ji },
    Hi = r,
    qi = /ipad|iphone|ipod/i.test($) && void 0 !== Hi.Pebble,
    Yi = /web0s(?!.*chrome)/i.test($),
    Ji = r,
    Ki = ii,
    Xi = n.f,
    $i = Bi.set,
    Qi = fi,
    Zi = qi,
    tc = Yi,
    ec = Qn,
    rc = Ji.MutationObserver || Ji.WebKitMutationObserver,
    nc = Ji.document,
    oc = Ji.process,
    ic = Ji.Promise,
    cc = Xi(Ji, 'queueMicrotask'),
    uc = cc && cc.value
  uc ||
    ((Ni = function () {
      var t, e
      for (ec && (t = oc.domain) && t.exit(); Fi; ) {
        ;(e = Fi.fn), (Fi = Fi.next)
        try {
          e()
        } catch (il) {
          throw (Fi ? Gi() : (Di = void 0), il)
        }
      }
      ;(Di = void 0), t && t.enter()
    }),
    Qi || ec || tc || !rc || !nc
      ? !Zi && ic && ic.resolve
        ? (((Wi = ic.resolve(void 0)).constructor = ic),
          (zi = Ki(Wi.then, Wi)),
          (Gi = function () {
            zi(Ni)
          }))
        : ec
        ? (Gi = function () {
            oc.nextTick(Ni)
          })
        : (($i = Ki($i, Ji)),
          (Gi = function () {
            $i(Ni)
          }))
      : ((Ui = !0),
        (Vi = nc.createTextNode('')),
        new rc(Ni).observe(Vi, { characterData: !0 }),
        (Gi = function () {
          Vi.data = Ui = !Ui
        })))
  var ac =
      uc ||
      function (t) {
        var e = { fn: t, next: void 0 }
        Di && (Di.next = e), Fi || ((Fi = e), Gi()), (Di = e)
      },
    fc = r,
    sc = function (t) {
      try {
        return { error: !1, value: t() }
      } catch (il) {
        return { error: !0, value: il }
      }
    },
    lc = function () {
      ;(this.head = null), (this.tail = null)
    }
  lc.prototype = {
    add: function (t) {
      var e = { item: t, next: null }
      this.head ? (this.tail.next = e) : (this.head = e), (this.tail = e)
    },
    get: function () {
      var t = this.head
      if (t) return (this.head = t.next), this.tail === t && (this.tail = null), t.item
    }
  }
  var hc = lc,
    pc = r.Promise,
    vc = 'object' == typeof Deno && Deno && 'object' == typeof Deno.version,
    dc = !vc && !Qn && 'object' == typeof window && 'object' == typeof document,
    yc = r,
    gc = pc,
    mc = W,
    bc = zn,
    wc = ur,
    Oc = re,
    Sc = dc,
    jc = vc,
    Ec = ot
  gc && gc.prototype
  var Tc = Oc('species'),
    xc = !1,
    Lc = mc(yc.PromiseRejectionEvent),
    Pc = bc('Promise', function () {
      var t = wc(gc),
        e = t !== String(gc)
      if (!e && 66 === Ec) return !0
      if (!Ec || Ec < 51 || !/native code/.test(t)) {
        var r = new gc(function (t) {
            t(1)
          }),
          n = function (t) {
            t(
              function () {},
              function () {}
            )
          }
        if ((((r.constructor = {})[Tc] = n), !(xc = r.then(function () {}) instanceof n))) return !0
      }
      return !e && (Sc || jc) && !Lc
    }),
    Rc = { CONSTRUCTOR: Pc, REJECTION_EVENT: Lc, SUBCLASSING: xc },
    Ic = {},
    _c = bt,
    Cc = TypeError,
    Ac = function (t) {
      var e, r
      ;(this.promise = new t(function (t, n) {
        if (void 0 !== e || void 0 !== r) throw Cc('Bad Promise constructor')
        ;(e = t), (r = n)
      })),
        (this.resolve = _c(e)),
        (this.reject = _c(r))
    }
  Ic.f = function (t) {
    return new Ac(t)
  }
  var Mc,
    kc,
    Nc,
    Fc = $n,
    Dc = Qn,
    Gc = r,
    Uc = f,
    Vc = Xr,
    Wc = io,
    zc = fo,
    Bc = function (t) {
      var e = so(t),
        r = lo.f
      ho &&
        e &&
        !e[po] &&
        r(e, po, {
          configurable: !0,
          get: function () {
            return this
          }
        })
    },
    Hc = bt,
    qc = W,
    Yc = H,
    Jc = function (t, e) {
      if (vo(e, t)) return t
      throw yo('Incorrect invocation')
    },
    Kc = function (t, e) {
      var r,
        n = Yo(t).constructor
      return void 0 === n || Ko((r = Yo(n)[Xo])) ? e : Jo(r)
    },
    Xc = Bi.set,
    $c = ac,
    Qc = function (t, e) {
      var r = fc.console
      r && r.error && (1 == arguments.length ? r.error(t) : r.error(t, e))
    },
    Zc = sc,
    tu = hc,
    eu = Ar,
    ru = pc,
    nu = Ic,
    ou = 'Promise',
    iu = Rc.CONSTRUCTOR,
    cu = Rc.REJECTION_EVENT,
    uu = Rc.SUBCLASSING,
    au = eu.getterFor(ou),
    fu = eu.set,
    su = ru && ru.prototype,
    lu = ru,
    hu = su,
    pu = Gc.TypeError,
    vu = Gc.document,
    du = Gc.process,
    yu = nu.f,
    gu = yu,
    mu = !!(vu && vu.createEvent && Gc.dispatchEvent),
    bu = 'unhandledrejection',
    wu = function (t) {
      var e
      return !(!Yc(t) || !qc((e = t.then))) && e
    },
    Ou = function (t, e) {
      var r,
        n,
        o,
        i = e.value,
        c = 1 == e.state,
        u = c ? t.ok : t.fail,
        a = t.resolve,
        f = t.reject,
        s = t.domain
      try {
        u
          ? (c || (2 === e.rejection && xu(e), (e.rejection = 1)),
            !0 === u ? (r = i) : (s && s.enter(), (r = u(i)), s && (s.exit(), (o = !0))),
            r === t.promise ? f(pu('Promise-chain cycle')) : (n = wu(r)) ? Uc(n, r, a, f) : a(r))
          : f(i)
      } catch (il) {
        s && !o && s.exit(), f(il)
      }
    },
    Su = function (t, e) {
      t.notified ||
        ((t.notified = !0),
        $c(function () {
          for (var r, n = t.reactions; (r = n.get()); ) Ou(r, t)
          ;(t.notified = !1), e && !t.rejection && Eu(t)
        }))
    },
    ju = function (t, e, r) {
      var n, o
      mu
        ? (((n = vu.createEvent('Event')).promise = e),
          (n.reason = r),
          n.initEvent(t, !1, !0),
          Gc.dispatchEvent(n))
        : (n = { promise: e, reason: r }),
        !cu && (o = Gc['on' + t]) ? o(n) : t === bu && Qc('Unhandled promise rejection', r)
    },
    Eu = function (t) {
      Uc(Xc, Gc, function () {
        var e,
          r = t.facade,
          n = t.value
        if (
          Tu(t) &&
          ((e = Zc(function () {
            Dc ? du.emit('unhandledRejection', n, r) : ju(bu, r, n)
          })),
          (t.rejection = Dc || Tu(t) ? 2 : 1),
          e.error)
        )
          throw e.value
      })
    },
    Tu = function (t) {
      return 1 !== t.rejection && !t.parent
    },
    xu = function (t) {
      Uc(Xc, Gc, function () {
        var e = t.facade
        Dc ? du.emit('rejectionHandled', e) : ju('rejectionhandled', e, t.value)
      })
    },
    Lu = function (t, e, r) {
      return function (n) {
        t(e, n, r)
      }
    },
    Pu = function (t, e, r) {
      t.done || ((t.done = !0), r && (t = r), (t.value = e), (t.state = 2), Su(t, !0))
    },
    Ru = function (t, e, r) {
      if (!t.done) {
        ;(t.done = !0), r && (t = r)
        try {
          if (t.facade === e) throw pu("Promise can't be resolved itself")
          var n = wu(e)
          n
            ? $c(function () {
                var r = { done: !1 }
                try {
                  Uc(n, e, Lu(Ru, r, t), Lu(Pu, r, t))
                } catch (il) {
                  Pu(r, il, t)
                }
              })
            : ((t.value = e), (t.state = 1), Su(t, !1))
        } catch (il) {
          Pu({ done: !1 }, il, t)
        }
      }
    }
  if (
    iu &&
    ((hu = (lu = function (t) {
      Jc(this, hu), Hc(t), Uc(Mc, this)
      var e = au(this)
      try {
        t(Lu(Ru, e), Lu(Pu, e))
      } catch (il) {
        Pu(e, il)
      }
    }).prototype),
    ((Mc = function (t) {
      fu(this, {
        type: ou,
        done: !1,
        notified: !1,
        parent: !1,
        reactions: new tu(),
        rejection: !1,
        state: 0,
        value: void 0
      })
    }).prototype = Vc(hu, 'then', function (t, e) {
      var r = au(this),
        n = yu(Kc(this, lu))
      return (
        (r.parent = !0),
        (n.ok = !qc(t) || t),
        (n.fail = qc(e) && e),
        (n.domain = Dc ? du.domain : void 0),
        0 == r.state
          ? r.reactions.add(n)
          : $c(function () {
              Ou(n, r)
            }),
        n.promise
      )
    })),
    (kc = function () {
      var t = new Mc(),
        e = au(t)
      ;(this.promise = t), (this.resolve = Lu(Ru, e)), (this.reject = Lu(Pu, e))
    }),
    (nu.f = yu =
      function (t) {
        return t === lu || undefined === t ? new kc(t) : gu(t)
      }),
    qc(ru) && su !== Object.prototype)
  ) {
    ;(Nc = su.then),
      uu ||
        Vc(
          su,
          'then',
          function (t, e) {
            var r = this
            return new lu(function (t, e) {
              Uc(Nc, r, t, e)
            }).then(t, e)
          },
          { unsafe: !0 }
        )
    try {
      delete su.constructor
    } catch (il) {}
    Wc && Wc(su, hu)
  }
  Fc({ global: !0, constructor: !0, wrap: !0, forced: iu }, { Promise: lu }), zc(lu, ou, !1), Bc(ou)
  var Iu = {},
    _u = Iu,
    Cu = re('iterator'),
    Au = Array.prototype,
    Mu = To,
    ku = St,
    Nu = C,
    Fu = Iu,
    Du = re('iterator'),
    Gu = function (t) {
      if (!Nu(t)) return ku(t, Du) || ku(t, '@@iterator') || Fu[Mu(t)]
    },
    Uu = f,
    Vu = bt,
    Wu = Ae,
    zu = dt,
    Bu = Gu,
    Hu = TypeError,
    qu = f,
    Yu = Ae,
    Ju = St,
    Ku = ii,
    Xu = f,
    $u = Ae,
    Qu = dt,
    Zu = function (t) {
      return void 0 !== t && (_u.Array === t || Au[Cu] === t)
    },
    ta = fn,
    ea = X,
    ra = function (t, e) {
      var r = arguments.length < 2 ? Bu(t) : e
      if (Vu(r)) return Wu(Uu(r, t))
      throw Hu(zu(t) + ' is not iterable')
    },
    na = Gu,
    oa = function (t, e, r) {
      var n, o
      Yu(t)
      try {
        if (!(n = Ju(t, 'return'))) {
          if ('throw' === e) throw r
          return r
        }
        n = qu(n, t)
      } catch (il) {
        ;(o = !0), (n = il)
      }
      if ('throw' === e) throw r
      if (o) throw n
      return Yu(n), r
    },
    ia = TypeError,
    ca = function (t, e) {
      ;(this.stopped = t), (this.result = e)
    },
    ua = ca.prototype,
    aa = function (t, e, r) {
      var n,
        o,
        i,
        c,
        u,
        a,
        f,
        s = r && r.that,
        l = !(!r || !r.AS_ENTRIES),
        h = !(!r || !r.IS_RECORD),
        p = !(!r || !r.IS_ITERATOR),
        v = !(!r || !r.INTERRUPTED),
        d = Ku(e, s),
        y = function (t) {
          return n && oa(n, 'normal', t), new ca(!0, t)
        },
        g = function (t) {
          return l ? ($u(t), v ? d(t[0], t[1], y) : d(t[0], t[1])) : v ? d(t, y) : d(t)
        }
      if (h) n = t.iterator
      else if (p) n = t
      else {
        if (!(o = na(t))) throw ia(Qu(t) + ' is not iterable')
        if (Zu(o)) {
          for (i = 0, c = ta(t); c > i; i++) if ((u = g(t[i])) && ea(ua, u)) return u
          return new ca(!1)
        }
        n = ra(t, o)
      }
      for (a = h ? t.next : n.next; !(f = Xu(a, n)).done; ) {
        try {
          u = g(f.value)
        } catch (il) {
          oa(n, 'throw', il)
        }
        if ('object' == typeof u && u && ea(ua, u)) return u
      }
      return new ca(!1)
    },
    fa = re('iterator'),
    sa = !1
  try {
    var la = 0,
      ha = {
        next: function () {
          return { done: !!la++ }
        },
        return: function () {
          sa = !0
        }
      }
    ;(ha[fa] = function () {
      return this
    }),
      Array.from(ha, function () {
        throw 2
      })
  } catch (il) {}
  var pa = pc,
    va = function (t, e) {
      if (!e && !sa) return !1
      var r = !1
      try {
        var n = {}
        ;(n[fa] = function () {
          return {
            next: function () {
              return { done: (r = !0) }
            }
          }
        }),
          t(n)
      } catch (il) {}
      return r
    },
    da =
      Rc.CONSTRUCTOR ||
      !va(function (t) {
        pa.all(t).then(void 0, function () {})
      }),
    ya = f,
    ga = bt,
    ma = Ic,
    ba = sc,
    wa = aa
  $n(
    { target: 'Promise', stat: !0, forced: da },
    {
      all: function (t) {
        var e = this,
          r = ma.f(e),
          n = r.resolve,
          o = r.reject,
          i = ba(function () {
            var r = ga(e.resolve),
              i = [],
              c = 0,
              u = 1
            wa(t, function (t) {
              var a = c++,
                f = !1
              u++,
                ya(r, e, t).then(function (t) {
                  f || ((f = !0), (i[a] = t), --u || n(i))
                }, o)
            }),
              --u || n(i)
          })
        return i.error && o(i.value), r.promise
      }
    }
  )
  var Oa = $n,
    Sa = Rc.CONSTRUCTOR,
    ja = pc,
    Ea = K,
    Ta = W,
    xa = Xr,
    La = ja && ja.prototype
  if (
    (Oa(
      { target: 'Promise', proto: !0, forced: Sa, real: !0 },
      {
        catch: function (t) {
          return this.then(void 0, t)
        }
      }
    ),
    Ta(ja))
  ) {
    var Pa = Ea('Promise').prototype.catch
    La.catch !== Pa && xa(La, 'catch', Pa, { unsafe: !0 })
  }
  var Ra = f,
    Ia = bt,
    _a = Ic,
    Ca = sc,
    Aa = aa
  $n(
    { target: 'Promise', stat: !0, forced: da },
    {
      race: function (t) {
        var e = this,
          r = _a.f(e),
          n = r.reject,
          o = Ca(function () {
            var o = Ia(e.resolve)
            Aa(t, function (t) {
              Ra(o, e, t).then(r.resolve, n)
            })
          })
        return o.error && n(o.value), r.promise
      }
    }
  )
  var Ma = f,
    ka = Ic
  $n(
    { target: 'Promise', stat: !0, forced: Rc.CONSTRUCTOR },
    {
      reject: function (t) {
        var e = ka.f(this)
        return Ma(e.reject, void 0, t), e.promise
      }
    }
  )
  var Na = Ae,
    Fa = H,
    Da = Ic,
    Ga = $n,
    Ua = Rc.CONSTRUCTOR,
    Va = function (t, e) {
      if ((Na(t), Fa(e) && e.constructor === t)) return e
      var r = Da.f(t)
      return (0, r.resolve)(e), r.promise
    }
  K('Promise'),
    Ga(
      { target: 'Promise', stat: !0, forced: Ua },
      {
        resolve: function (t) {
          return Va(this, t)
        }
      }
    )
  !(function (t) {
    var e = (function (t) {
      var e,
        r = Object.prototype,
        n = r.hasOwnProperty,
        o = 'function' == typeof Symbol ? Symbol : {},
        i = o.iterator || '@@iterator',
        c = o.asyncIterator || '@@asyncIterator',
        u = o.toStringTag || '@@toStringTag'
      function a(t, e, r) {
        return (
          Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }),
          t[e]
        )
      }
      try {
        a({}, '')
      } catch (_) {
        a = function (t, e, r) {
          return (t[e] = r)
        }
      }
      function f(t, e, r, n) {
        var o = e && e.prototype instanceof y ? e : y,
          i = Object.create(o.prototype),
          c = new P(n || [])
        return (
          (i._invoke = (function (t, e, r) {
            var n = l
            return function (o, i) {
              if (n === p) throw new Error('Generator is already running')
              if (n === v) {
                if ('throw' === o) throw i
                return I()
              }
              for (r.method = o, r.arg = i; ; ) {
                var c = r.delegate
                if (c) {
                  var u = T(c, r)
                  if (u) {
                    if (u === d) continue
                    return u
                  }
                }
                if ('next' === r.method) r.sent = r._sent = r.arg
                else if ('throw' === r.method) {
                  if (n === l) throw ((n = v), r.arg)
                  r.dispatchException(r.arg)
                } else 'return' === r.method && r.abrupt('return', r.arg)
                n = p
                var a = s(t, e, r)
                if ('normal' === a.type) {
                  if (((n = r.done ? v : h), a.arg === d)) continue
                  return { value: a.arg, done: r.done }
                }
                'throw' === a.type && ((n = v), (r.method = 'throw'), (r.arg = a.arg))
              }
            }
          })(t, r, c)),
          i
        )
      }
      function s(t, e, r) {
        try {
          return { type: 'normal', arg: t.call(e, r) }
        } catch (_) {
          return { type: 'throw', arg: _ }
        }
      }
      t.wrap = f
      var l = 'suspendedStart',
        h = 'suspendedYield',
        p = 'executing',
        v = 'completed',
        d = {}
      function y() {}
      function g() {}
      function m() {}
      var b = {}
      a(b, i, function () {
        return this
      })
      var w = Object.getPrototypeOf,
        O = w && w(w(R([])))
      O && O !== r && n.call(O, i) && (b = O)
      var S = (m.prototype = y.prototype = Object.create(b))
      function j(t) {
        ;['next', 'throw', 'return'].forEach(function (e) {
          a(t, e, function (t) {
            return this._invoke(e, t)
          })
        })
      }
      function E(t, e) {
        function r(o, i, c, u) {
          var a = s(t[o], t, i)
          if ('throw' !== a.type) {
            var f = a.arg,
              l = f.value
            return l && 'object' == typeof l && n.call(l, '__await')
              ? e.resolve(l.__await).then(
                  function (t) {
                    r('next', t, c, u)
                  },
                  function (t) {
                    r('throw', t, c, u)
                  }
                )
              : e.resolve(l).then(
                  function (t) {
                    ;(f.value = t), c(f)
                  },
                  function (t) {
                    return r('throw', t, c, u)
                  }
                )
          }
          u(a.arg)
        }
        var o
        this._invoke = function (t, n) {
          function i() {
            return new e(function (e, o) {
              r(t, n, e, o)
            })
          }
          return (o = o ? o.then(i, i) : i())
        }
      }
      function T(t, r) {
        var n = t.iterator[r.method]
        if (n === e) {
          if (((r.delegate = null), 'throw' === r.method)) {
            if (
              t.iterator.return &&
              ((r.method = 'return'), (r.arg = e), T(t, r), 'throw' === r.method)
            )
              return d
            ;(r.method = 'throw'),
              (r.arg = new TypeError("The iterator does not provide a 'throw' method"))
          }
          return d
        }
        var o = s(n, t.iterator, r.arg)
        if ('throw' === o.type) return (r.method = 'throw'), (r.arg = o.arg), (r.delegate = null), d
        var i = o.arg
        return i
          ? i.done
            ? ((r[t.resultName] = i.value),
              (r.next = t.nextLoc),
              'return' !== r.method && ((r.method = 'next'), (r.arg = e)),
              (r.delegate = null),
              d)
            : i
          : ((r.method = 'throw'),
            (r.arg = new TypeError('iterator result is not an object')),
            (r.delegate = null),
            d)
      }
      function x(t) {
        var e = { tryLoc: t[0] }
        1 in t && (e.catchLoc = t[1]),
          2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
          this.tryEntries.push(e)
      }
      function L(t) {
        var e = t.completion || {}
        ;(e.type = 'normal'), delete e.arg, (t.completion = e)
      }
      function P(t) {
        ;(this.tryEntries = [{ tryLoc: 'root' }]), t.forEach(x, this), this.reset(!0)
      }
      function R(t) {
        if (t) {
          var r = t[i]
          if (r) return r.call(t)
          if ('function' == typeof t.next) return t
          if (!isNaN(t.length)) {
            var o = -1,
              c = function r() {
                for (; ++o < t.length; ) if (n.call(t, o)) return (r.value = t[o]), (r.done = !1), r
                return (r.value = e), (r.done = !0), r
              }
            return (c.next = c)
          }
        }
        return { next: I }
      }
      function I() {
        return { value: e, done: !0 }
      }
      return (
        (g.prototype = m),
        a(S, 'constructor', m),
        a(m, 'constructor', g),
        (g.displayName = a(m, u, 'GeneratorFunction')),
        (t.isGeneratorFunction = function (t) {
          var e = 'function' == typeof t && t.constructor
          return !!e && (e === g || 'GeneratorFunction' === (e.displayName || e.name))
        }),
        (t.mark = function (t) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(t, m)
              : ((t.__proto__ = m), a(t, u, 'GeneratorFunction')),
            (t.prototype = Object.create(S)),
            t
          )
        }),
        (t.awrap = function (t) {
          return { __await: t }
        }),
        j(E.prototype),
        a(E.prototype, c, function () {
          return this
        }),
        (t.AsyncIterator = E),
        (t.async = function (e, r, n, o, i) {
          void 0 === i && (i = Promise)
          var c = new E(f(e, r, n, o), i)
          return t.isGeneratorFunction(r)
            ? c
            : c.next().then(function (t) {
                return t.done ? t.value : c.next()
              })
        }),
        j(S),
        a(S, u, 'Generator'),
        a(S, i, function () {
          return this
        }),
        a(S, 'toString', function () {
          return '[object Generator]'
        }),
        (t.keys = function (t) {
          var e = []
          for (var r in t) e.push(r)
          return (
            e.reverse(),
            function r() {
              for (; e.length; ) {
                var n = e.pop()
                if (n in t) return (r.value = n), (r.done = !1), r
              }
              return (r.done = !0), r
            }
          )
        }),
        (t.values = R),
        (P.prototype = {
          constructor: P,
          reset: function (t) {
            if (
              ((this.prev = 0),
              (this.next = 0),
              (this.sent = this._sent = e),
              (this.done = !1),
              (this.delegate = null),
              (this.method = 'next'),
              (this.arg = e),
              this.tryEntries.forEach(L),
              !t)
            )
              for (var r in this)
                't' === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = e)
          },
          stop: function () {
            this.done = !0
            var t = this.tryEntries[0].completion
            if ('throw' === t.type) throw t.arg
            return this.rval
          },
          dispatchException: function (t) {
            if (this.done) throw t
            var r = this
            function o(n, o) {
              return (
                (u.type = 'throw'),
                (u.arg = t),
                (r.next = n),
                o && ((r.method = 'next'), (r.arg = e)),
                !!o
              )
            }
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var c = this.tryEntries[i],
                u = c.completion
              if ('root' === c.tryLoc) return o('end')
              if (c.tryLoc <= this.prev) {
                var a = n.call(c, 'catchLoc'),
                  f = n.call(c, 'finallyLoc')
                if (a && f) {
                  if (this.prev < c.catchLoc) return o(c.catchLoc, !0)
                  if (this.prev < c.finallyLoc) return o(c.finallyLoc)
                } else if (a) {
                  if (this.prev < c.catchLoc) return o(c.catchLoc, !0)
                } else {
                  if (!f) throw new Error('try statement without catch or finally')
                  if (this.prev < c.finallyLoc) return o(c.finallyLoc)
                }
              }
            }
          },
          abrupt: function (t, e) {
            for (var r = this.tryEntries.length - 1; r >= 0; --r) {
              var o = this.tryEntries[r]
              if (o.tryLoc <= this.prev && n.call(o, 'finallyLoc') && this.prev < o.finallyLoc) {
                var i = o
                break
              }
            }
            i &&
              ('break' === t || 'continue' === t) &&
              i.tryLoc <= e &&
              e <= i.finallyLoc &&
              (i = null)
            var c = i ? i.completion : {}
            return (
              (c.type = t),
              (c.arg = e),
              i ? ((this.method = 'next'), (this.next = i.finallyLoc), d) : this.complete(c)
            )
          },
          complete: function (t, e) {
            if ('throw' === t.type) throw t.arg
            return (
              'break' === t.type || 'continue' === t.type
                ? (this.next = t.arg)
                : 'return' === t.type
                ? ((this.rval = this.arg = t.arg), (this.method = 'return'), (this.next = 'end'))
                : 'normal' === t.type && e && (this.next = e),
              d
            )
          },
          finish: function (t) {
            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
              var r = this.tryEntries[e]
              if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), L(r), d
            }
          },
          catch: function (t) {
            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
              var r = this.tryEntries[e]
              if (r.tryLoc === t) {
                var n = r.completion
                if ('throw' === n.type) {
                  var o = n.arg
                  L(r)
                }
                return o
              }
            }
            throw new Error('illegal catch attempt')
          },
          delegateYield: function (t, r, n) {
            return (
              (this.delegate = { iterator: R(t), resultName: r, nextLoc: n }),
              'next' === this.method && (this.arg = e),
              d
            )
          }
        }),
        t
      )
    })(t.exports)
    try {
      regeneratorRuntime = e
    } catch (r) {
      'object' == typeof globalThis
        ? (globalThis.regeneratorRuntime = e)
        : Function('r', 'regeneratorRuntime = r')(e)
    }
  })({ exports: {} })
  var Wa = To,
    za = mo
      ? {}.toString
      : function () {
          return '[object ' + Wa(this) + ']'
        }
  mo || Xr(Object.prototype, 'toString', za, { unsafe: !0 })
  var Ba = {},
    Ha = wn,
    qa = On,
    Ya =
      Object.keys ||
      function (t) {
        return Ha(t, qa)
      },
    Ja = i,
    Ka = Re,
    Xa = Pe,
    $a = Ae,
    Qa = D,
    Za = Ya
  Ba.f =
    Ja && !Ka
      ? Object.defineProperties
      : function (t, e) {
          $a(t)
          for (var r, n = Qa(e), o = Za(e), i = o.length, c = 0; i > c; )
            Xa.f(t, (r = o[c++]), n[r])
          return t
        }
  var tf,
    ef = Ae,
    rf = Ba,
    nf = On,
    of = dr,
    cf = ci,
    uf = ye,
    af = vr('IE_PROTO'),
    ff = function () {},
    sf = function (t) {
      return '<script>' + t + '</' + 'script>'
    },
    lf = function (t) {
      t.write(sf('')), t.close()
      var e = t.parentWindow.Object
      return (t = null), e
    },
    hf = function () {
      try {
        tf = new ActiveXObject('htmlfile')
      } catch (il) {}
      var t, e
      hf =
        'undefined' != typeof document
          ? document.domain && tf
            ? lf(tf)
            : (((e = uf('iframe')).style.display = 'none'),
              cf.appendChild(e),
              (e.src = String('javascript:')),
              (t = e.contentWindow.document).open(),
              t.write(sf('document.F=Object')),
              t.close(),
              t.F)
          : lf(tf)
      for (var r = nf.length; r--; ) delete hf.prototype[nf[r]]
      return hf()
    }
  of[af] = !0
  var pf =
      Object.create ||
      function (t, e) {
        var r
        return (
          null !== t
            ? ((ff.prototype = ef(t)), (r = new ff()), (ff.prototype = null), (r[af] = t))
            : (r = hf()),
          void 0 === e ? r : rf.f(r, e)
        )
      },
    vf = re,
    df = pf,
    yf = Pe.f,
    gf = vf('unscopables'),
    mf = Array.prototype
  null == mf[gf] && yf(mf, gf, { configurable: !0, value: df(null) })
  var bf,
    wf,
    Of,
    Sf = !o(function () {
      function t() {}
      return (t.prototype.constructor = null), Object.getPrototypeOf(new t()) !== t.prototype
    }),
    jf = Ut,
    Ef = W,
    Tf = Ft,
    xf = Sf,
    Lf = vr('IE_PROTO'),
    Pf = Object,
    Rf = Pf.prototype,
    If = xf
      ? Pf.getPrototypeOf
      : function (t) {
          var e = Tf(t)
          if (jf(e, Lf)) return e[Lf]
          var r = e.constructor
          return Ef(r) && e instanceof r ? r.prototype : e instanceof Pf ? Rf : null
        },
    _f = o,
    Cf = W,
    Af = H,
    Mf = If,
    kf = Xr,
    Nf = re('iterator'),
    Ff = !1
  ;[].keys &&
    ('next' in (Of = [].keys()) ? (wf = Mf(Mf(Of))) !== Object.prototype && (bf = wf) : (Ff = !0))
  var Df =
    !Af(bf) ||
    _f(function () {
      var t = {}
      return bf[Nf].call(t) !== t
    })
  Df && (bf = {}),
    Cf(bf[Nf]) ||
      kf(bf, Nf, function () {
        return this
      })
  var Gf = { IteratorPrototype: bf, BUGGY_SAFARI_ITERATORS: Ff },
    Uf = Gf.IteratorPrototype,
    Vf = pf,
    Wf = y,
    zf = fo,
    Bf = Iu,
    Hf = function () {
      return this
    },
    qf = $n,
    Yf = f,
    Jf = W,
    Kf = function (t, e, r, n) {
      var o = e + ' Iterator'
      return (t.prototype = Vf(Uf, { next: Wf(+!n, r) })), zf(t, o, !1), (Bf[o] = Hf), t
    },
    Xf = If,
    $f = io,
    Qf = fo,
    Zf = Ye,
    ts = Xr,
    es = Iu,
    rs = tr.PROPER,
    ns = tr.CONFIGURABLE,
    os = Gf.IteratorPrototype,
    is = Gf.BUGGY_SAFARI_ITERATORS,
    cs = re('iterator'),
    us = 'keys',
    as = 'values',
    fs = 'entries',
    ss = function () {
      return this
    },
    ls = function (t, e, r, n, o, i, c) {
      Kf(r, e, n)
      var u,
        a,
        f,
        s = function (t) {
          if (t === o && d) return d
          if (!is && t in p) return p[t]
          switch (t) {
            case us:
            case as:
            case fs:
              return function () {
                return new r(this, t)
              }
          }
          return function () {
            return new r(this)
          }
        },
        l = e + ' Iterator',
        h = !1,
        p = t.prototype,
        v = p[cs] || p['@@iterator'] || (o && p[o]),
        d = (!is && v) || s(o),
        y = ('Array' == e && p.entries) || v
      if (
        (y &&
          (u = Xf(y.call(new t()))) !== Object.prototype &&
          u.next &&
          (Xf(u) !== os && ($f ? $f(u, os) : Jf(u[cs]) || ts(u, cs, ss)), Qf(u, l, !0)),
        rs &&
          o == as &&
          v &&
          v.name !== as &&
          (ns
            ? Zf(p, 'name', as)
            : ((h = !0),
              (d = function () {
                return Yf(v, this)
              }))),
        o)
      )
        if (((a = { values: s(as), keys: i ? d : s(us), entries: s(fs) }), c))
          for (f in a) (is || h || !(f in p)) && ts(p, f, a[f])
        else qf({ target: e, proto: !0, forced: is || h }, a)
      return p[cs] !== d && ts(p, cs, d, { name: o }), (es[e] = d), a
    },
    hs = function (t, e) {
      return { value: t, done: e }
    },
    ps = D,
    vs = function (t) {
      mf[gf][t] = !0
    },
    ds = Iu,
    ys = Ar,
    gs = Pe.f,
    ms = ls,
    bs = hs,
    ws = i,
    Os = 'Array Iterator',
    Ss = ys.set,
    js = ys.getterFor(Os),
    Es = ms(
      Array,
      'Array',
      function (t, e) {
        Ss(this, { type: Os, target: ps(t), index: 0, kind: e })
      },
      function () {
        var t = js(this),
          e = t.target,
          r = t.kind,
          n = t.index++
        return !e || n >= e.length
          ? ((t.target = void 0), bs(void 0, !0))
          : bs('keys' == r ? n : 'values' == r ? e[n] : [n, e[n]], !1)
      },
      'values'
    ),
    Ts = (ds.Arguments = ds.Array)
  if ((vs('keys'), vs('values'), vs('entries'), ws && 'values' !== Ts.name))
    try {
      gs(Ts, 'name', { value: 'values' })
    } catch (il) {}
  var xs = To,
    Ls = String,
    Ps = function (t) {
      if ('Symbol' === xs(t)) throw TypeError('Cannot convert a Symbol value to a string')
      return Ls(t)
    },
    Rs = S,
    Is = en,
    _s = Ps,
    Cs = k,
    As = Rs(''.charAt),
    Ms = Rs(''.charCodeAt),
    ks = Rs(''.slice),
    Ns = function (t) {
      return function (e, r) {
        var n,
          o,
          i = _s(Cs(e)),
          c = Is(r),
          u = i.length
        return c < 0 || c >= u
          ? t
            ? ''
            : void 0
          : (n = Ms(i, c)) < 55296 ||
            n > 56319 ||
            c + 1 === u ||
            (o = Ms(i, c + 1)) < 56320 ||
            o > 57343
          ? t
            ? As(i, c)
            : n
          : t
          ? ks(i, c, c + 2)
          : o - 56320 + ((n - 55296) << 10) + 65536
      }
    },
    Fs = { codeAt: Ns(!1), charAt: Ns(!0) }.charAt,
    Ds = Ps,
    Gs = Ar,
    Us = ls,
    Vs = hs,
    Ws = 'String Iterator',
    zs = Gs.set,
    Bs = Gs.getterFor(Ws)
  Us(
    String,
    'String',
    function (t) {
      zs(this, { type: Ws, string: Ds(t), index: 0 })
    },
    function () {
      var t,
        e = Bs(this),
        r = e.string,
        n = e.index
      return n >= r.length ? Vs(void 0, !0) : ((t = Fs(r, n)), (e.index += t.length), Vs(t, !1))
    }
  )
  var Hs = ye('span').classList,
    qs = Hs && Hs.constructor && Hs.constructor.prototype,
    Ys = qs === Object.prototype ? void 0 : qs,
    Js = r,
    Ks = {
      CSSRuleList: 0,
      CSSStyleDeclaration: 0,
      CSSValueList: 0,
      ClientRectList: 0,
      DOMRectList: 0,
      DOMStringList: 0,
      DOMTokenList: 1,
      DataTransferItemList: 0,
      FileList: 0,
      HTMLAllCollection: 0,
      HTMLCollection: 0,
      HTMLFormElement: 0,
      HTMLSelectElement: 0,
      MediaList: 0,
      MimeTypeArray: 0,
      NamedNodeMap: 0,
      NodeList: 1,
      PaintRequestList: 0,
      Plugin: 0,
      PluginArray: 0,
      SVGLengthList: 0,
      SVGNumberList: 0,
      SVGPathSegList: 0,
      SVGPointList: 0,
      SVGStringList: 0,
      SVGTransformList: 0,
      SourceBufferList: 0,
      StyleSheetList: 0,
      TextTrackCueList: 0,
      TextTrackList: 0,
      TouchList: 0
    },
    Xs = Ys,
    $s = Es,
    Qs = Ye,
    Zs = re,
    tl = Zs('iterator'),
    el = Zs('toStringTag'),
    rl = $s.values,
    nl = function (t, e) {
      if (t) {
        if (t[tl] !== rl)
          try {
            Qs(t, tl, rl)
          } catch (il) {
            t[tl] = rl
          }
        if ((t[el] || Qs(t, el, e), Ks[e]))
          for (var r in $s)
            if (t[r] !== $s[r])
              try {
                Qs(t, r, $s[r])
              } catch (il) {
                t[r] = $s[r]
              }
      }
    }
  for (var ol in Ks) nl(Js[ol] && Js[ol].prototype, ol)
  nl(Xs, 'DOMTokenList'),
    (function () {
      function e(t, e) {
        return (
          (e || '') +
          ' (SystemJS https://github.com/systemjs/systemjs/blob/main/docs/errors.md#' +
          t +
          ')'
        )
      }
      function r(t, e) {
        if ((-1 !== t.indexOf('\\') && (t = t.replace(j, '/')), '/' === t[0] && '/' === t[1]))
          return e.slice(0, e.indexOf(':') + 1) + t
        if (
          ('.' === t[0] &&
            ('/' === t[1] ||
              ('.' === t[1] && ('/' === t[2] || (2 === t.length && (t += '/')))) ||
              (1 === t.length && (t += '/')))) ||
          '/' === t[0]
        ) {
          var r,
            n = e.slice(0, e.indexOf(':') + 1)
          if (
            ((r =
              '/' === e[n.length + 1]
                ? 'file:' !== n
                  ? (r = e.slice(n.length + 2)).slice(r.indexOf('/') + 1)
                  : e.slice(8)
                : e.slice(n.length + ('/' === e[n.length]))),
            '/' === t[0])
          )
            return e.slice(0, e.length - r.length - 1) + t
          for (
            var o = r.slice(0, r.lastIndexOf('/') + 1) + t, i = [], c = -1, u = 0;
            u < o.length;
            u++
          )
            -1 !== c
              ? '/' === o[u] && (i.push(o.slice(c, u + 1)), (c = -1))
              : '.' === o[u]
              ? '.' !== o[u + 1] || ('/' !== o[u + 2] && u + 2 !== o.length)
                ? '/' === o[u + 1] || u + 1 === o.length
                  ? (u += 1)
                  : (c = u)
                : (i.pop(), (u += 2))
              : (c = u)
          return -1 !== c && i.push(o.slice(c)), e.slice(0, e.length - r.length) + i.join('')
        }
      }
      function n(t, e) {
        return r(t, e) || (-1 !== t.indexOf(':') ? t : r('./' + t, e))
      }
      function o(t, e, n, o, i) {
        for (var c in t) {
          var f = r(c, n) || c,
            s = t[c]
          if ('string' == typeof s) {
            var l = a(o, r(s, n) || s, i)
            l ? (e[f] = l) : u('W1', c, s)
          }
        }
      }
      function i(t, e) {
        if (e[t]) return t
        var r = t.length
        do {
          var n = t.slice(0, r + 1)
          if (n in e) return n
        } while (-1 !== (r = t.lastIndexOf('/', r - 1)))
      }
      function c(t, e) {
        var r = i(t, e)
        if (r) {
          var n = e[r]
          if (null === n) return
          if (!(t.length > r.length && '/' !== n[n.length - 1])) return n + t.slice(r.length)
          u('W2', r, n)
        }
      }
      function u(t, r, n) {
        console.warn(e(t, [n, r].join(', ')))
      }
      function a(t, e, r) {
        for (var n = t.scopes, o = r && i(r, n); o; ) {
          var u = c(e, n[o])
          if (u) return u
          o = i(o.slice(0, o.lastIndexOf('/')), n)
        }
        return c(e, t.imports) || (-1 !== e.indexOf(':') && e)
      }
      function f() {
        this[T] = {}
      }
      function s(t, r, n) {
        var o = t[T][r]
        if (o) return o
        var i = [],
          c = Object.create(null)
        E && Object.defineProperty(c, E, { value: 'Module' })
        var u = Promise.resolve()
            .then(function () {
              return t.instantiate(r, n)
            })
            .then(
              function (n) {
                if (!n) throw Error(e(2, r))
                var u = n[1](
                  function (t, e) {
                    o.h = !0
                    var r = !1
                    if ('string' == typeof t) (t in c && c[t] === e) || ((c[t] = e), (r = !0))
                    else {
                      for (var n in t) (e = t[n]), (n in c && c[n] === e) || ((c[n] = e), (r = !0))
                      t && t.__esModule && (c.__esModule = t.__esModule)
                    }
                    if (r)
                      for (var u = 0; u < i.length; u++) {
                        var a = i[u]
                        a && a(c)
                      }
                    return e
                  },
                  2 === n[1].length
                    ? {
                        import: function (e) {
                          return t.import(e, r)
                        },
                        meta: t.createContext(r)
                      }
                    : void 0
                )
                return (o.e = u.execute || function () {}), [n[0], u.setters || []]
              },
              function (t) {
                throw ((o.e = null), (o.er = t), t)
              }
            ),
          a = u.then(function (e) {
            return Promise.all(
              e[0].map(function (n, o) {
                var i = e[1][o]
                return Promise.resolve(t.resolve(n, r)).then(function (e) {
                  var n = s(t, e, r)
                  return Promise.resolve(n.I).then(function () {
                    return i && (n.i.push(i), (!n.h && n.I) || i(n.n)), n
                  })
                })
              })
            ).then(function (t) {
              o.d = t
            })
          })
        return (o = t[T][r] =
          {
            id: r,
            i: i,
            n: c,
            I: u,
            L: a,
            h: !1,
            d: void 0,
            e: void 0,
            er: void 0,
            E: void 0,
            C: void 0,
            p: void 0
          })
      }
      function l(t, e, r, n) {
        if (!n[e.id])
          return (
            (n[e.id] = !0),
            Promise.resolve(e.L)
              .then(function () {
                return (
                  (e.p && null !== e.p.e) || (e.p = r),
                  Promise.all(
                    e.d.map(function (e) {
                      return l(t, e, r, n)
                    })
                  )
                )
              })
              .catch(function (t) {
                if (e.er) throw t
                throw ((e.e = null), t)
              })
          )
      }
      function h(t, e) {
        return (e.C = l(t, e, e, {})
          .then(function () {
            return p(t, e, {})
          })
          .then(function () {
            return e.n
          }))
      }
      function p(t, e, r) {
        function n() {
          try {
            var t = i.call(L)
            if (t)
              return (
                (t = t.then(
                  function () {
                    ;(e.C = e.n), (e.E = null)
                  },
                  function (t) {
                    throw ((e.er = t), (e.E = null), t)
                  }
                )),
                (e.E = t)
              )
            ;(e.C = e.n), (e.L = e.I = void 0)
          } catch (r) {
            throw ((e.er = r), r)
          }
        }
        if (!r[e.id]) {
          if (((r[e.id] = !0), !e.e)) {
            if (e.er) throw e.er
            return e.E ? e.E : void 0
          }
          var o,
            i = e.e
          return (
            (e.e = null),
            e.d.forEach(function (n) {
              try {
                var i = p(t, n, r)
                i && (o = o || []).push(i)
              } catch (u) {
                throw ((e.er = u), u)
              }
            }),
            o ? Promise.all(o).then(n) : n()
          )
        }
      }
      function v() {
        ;[].forEach.call(document.querySelectorAll('script'), function (t) {
          if (!t.sp)
            if ('systemjs-module' === t.type) {
              if (((t.sp = !0), !t.src)) return
              System.import('import:' === t.src.slice(0, 7) ? t.src.slice(7) : n(t.src, d)).catch(
                function (e) {
                  if (
                    e.message.indexOf(
                      'https://github.com/systemjs/systemjs/blob/main/docs/errors.md#3'
                    ) > -1
                  ) {
                    var r = document.createEvent('Event')
                    r.initEvent('error', !1, !1), t.dispatchEvent(r)
                  }
                  return Promise.reject(e)
                }
              )
            } else if ('systemjs-importmap' === t.type) {
              t.sp = !0
              var r = t.src
                ? (System.fetch || fetch)(t.src, { integrity: t.integrity, passThrough: !0 })
                    .then(function (t) {
                      if (!t.ok) throw Error(t.status)
                      return t.text()
                    })
                    .catch(function (r) {
                      return (
                        (r.message = e('W4', t.src) + '\n' + r.message),
                        console.warn(r),
                        'function' == typeof t.onerror && t.onerror(),
                        '{}'
                      )
                    })
                : t.innerHTML
              I = I.then(function () {
                return r
              }).then(function (r) {
                !(function (t, r, i) {
                  var c = {}
                  try {
                    c = JSON.parse(r)
                  } catch (a) {
                    console.warn(Error(e('W5')))
                  }
                  !(function (t, e, r) {
                    var i
                    for (i in (t.imports && o(t.imports, r.imports, e, r, null), t.scopes || {})) {
                      var c = n(i, e)
                      o(t.scopes[i], r.scopes[c] || (r.scopes[c] = {}), e, r, c)
                    }
                    for (i in t.depcache || {}) r.depcache[n(i, e)] = t.depcache[i]
                    for (i in t.integrity || {}) r.integrity[n(i, e)] = t.integrity[i]
                  })(c, i, t)
                })(_, r, t.src || d)
              })
            }
        })
      }
      var d,
        y = 'undefined' != typeof Symbol,
        g = 'undefined' != typeof self,
        m = 'undefined' != typeof document,
        b = g ? self : t
      if (m) {
        var w = document.querySelector('base[href]')
        w && (d = w.href)
      }
      if (!d && 'undefined' != typeof location) {
        var O = (d = location.href.split('#')[0].split('?')[0]).lastIndexOf('/')
        ;-1 !== O && (d = d.slice(0, O + 1))
      }
      var S,
        j = /\\/g,
        E = y && Symbol.toStringTag,
        T = y ? Symbol() : '@',
        x = f.prototype
      ;(x.import = function (t, e) {
        var r = this
        return Promise.resolve(r.prepareImport())
          .then(function () {
            return r.resolve(t, e)
          })
          .then(function (t) {
            var e = s(r, t)
            return e.C || h(r, e)
          })
      }),
        (x.createContext = function (t) {
          var e = this
          return {
            url: t,
            resolve: function (r, n) {
              return Promise.resolve(e.resolve(r, n || t))
            }
          }
        }),
        (x.register = function (t, e) {
          S = [t, e]
        }),
        (x.getRegister = function () {
          var t = S
          return (S = void 0), t
        })
      var L = Object.freeze(Object.create(null))
      b.System = new f()
      var P,
        R,
        I = Promise.resolve(),
        _ = { imports: {}, scopes: {}, depcache: {}, integrity: {} },
        C = m
      if (
        ((x.prepareImport = function (t) {
          return (C || t) && (v(), (C = !1)), I
        }),
        m && (v(), window.addEventListener('DOMContentLoaded', v)),
        m)
      ) {
        window.addEventListener('error', function (t) {
          ;(M = t.filename), (k = t.error)
        })
        var A = location.origin
      }
      x.createScript = function (t) {
        var e = document.createElement('script')
        ;(e.async = !0), t.indexOf(A + '/') && (e.crossOrigin = 'anonymous')
        var r = _.integrity[t]
        return r && (e.integrity = r), (e.src = t), e
      }
      var M,
        k,
        N = {},
        F = x.register
      ;(x.register = function (t, e) {
        if (m && 'loading' === document.readyState && 'string' != typeof t) {
          var r = document.querySelectorAll('script[src]'),
            n = r[r.length - 1]
          if (n) {
            P = t
            var o = this
            R = setTimeout(function () {
              ;(N[n.src] = [t, e]), o.import(n.src)
            })
          }
        } else P = void 0
        return F.call(this, t, e)
      }),
        (x.instantiate = function (t, r) {
          var n = N[t]
          if (n) return delete N[t], n
          var o = this
          return Promise.resolve(x.createScript(t)).then(function (n) {
            return new Promise(function (i, c) {
              n.addEventListener('error', function () {
                c(Error(e(3, [t, r].join(', '))))
              }),
                n.addEventListener('load', function () {
                  if ((document.head.removeChild(n), M === t)) c(k)
                  else {
                    var e = o.getRegister(t)
                    e && e[0] === P && clearTimeout(R), i(e)
                  }
                }),
                document.head.appendChild(n)
            })
          })
        }),
        (x.shouldFetch = function () {
          return !1
        }),
        'undefined' != typeof fetch && (x.fetch = fetch)
      var D = x.instantiate,
        G = /^(text|application)\/(x-)?javascript(;|$)/
      ;(x.instantiate = function (t, r) {
        var n = this
        return this.shouldFetch(t)
          ? this.fetch(t, { credentials: 'same-origin', integrity: _.integrity[t] }).then(function (
              o
            ) {
              if (!o.ok) throw Error(e(7, [o.status, o.statusText, t, r].join(', ')))
              var i = o.headers.get('content-type')
              if (!i || !G.test(i)) throw Error(e(4, i))
              return o.text().then(function (e) {
                return (
                  e.indexOf('//# sourceURL=') < 0 && (e += '\n//# sourceURL=' + t),
                  (0, eval)(e),
                  n.getRegister(t)
                )
              })
            })
          : D.apply(this, arguments)
      }),
        (x.resolve = function (t, n) {
          return (
            a(_, r(t, (n = n || d)) || t, n) ||
            (function (t, r) {
              throw Error(e(8, [t, r].join(', ')))
            })(t, n)
          )
        })
      var U = x.instantiate
      ;(x.instantiate = function (t, e) {
        var r = _.depcache[t]
        if (r) for (var n = 0; n < r.length; n++) s(this, this.resolve(r[n], t), t)
        return U.call(this, t, e)
      }),
        g &&
          'function' == typeof importScripts &&
          (x.instantiate = function (t) {
            var e = this
            return Promise.resolve().then(function () {
              return importScripts(t), e.getRegister(t)
            })
          })
    })()
})()
