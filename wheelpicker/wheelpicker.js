/*!
 * WheelPicker v1.1.0
 * https://cople.github.io/WheelPicker
 * Licensed under the MIT License
 */
! function(t, e) {
  "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.WheelPicker = e() : t.WheelPicker = e()
}(this, function() {
  return function(t) {
    function e(s) {
      if (i[s]) return i[s].exports;
      var n = i[s] = {
        exports: {},
        id: s,
        loaded: !1
      };
      return t[s].call(n.exports, n, n.exports, e), n.loaded = !0, n.exports
    }
    var i = {};
    return e.m = t, e.c = i, e.p = "", e(0)
  }([function(t, e, i) {
    "use strict";

    function s(t) {
      if (this.options = n.extend({
          data: [],
          rows: 5,
          rowHeight: 34,
          hiddenInput: !1,
          parseValue: function(t) {
            return t.split(" ")
          },
          formatValue: function(t) {
            return t.join(" ")
          },
          formatHiddenValue: function(t) {
            return t.join(" ")
          }
        }, t), this.options.el) {
        var e = "string" == typeof this.options.el ? document.querySelector(this.options.el) : this.options.el;
        if (e.readOnly = !0, this.options.hiddenInput) {
          var i = e.cloneNode();
          i.classList.add("wheelpicker-control"), i.removeAttribute("id"), i.removeAttribute("name"), this.control = i, this.elType = e.type, e.type = "hidden", e.classList.add("wheelpicker-hiddeninput"), e.parentNode.insertBefore(this.control, e), this.hiddenInput = e
        } else e.classList.add("wheelpicker-control"), this.control = e;
        this.origEl = e
      }
      this.value = [], this.wheels = [], this.closed = !0, this.disabled = !1, this.transformName = n.prefixed("transform"), this.transitionName = n.prefixed("transition"), this.transitionendName = {
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionEnd",
        msTransition: "MSTransitionEnd",
        OTransition: "oTransitionEnd",
        transition: "transitionend"
      } [this.transitionName], this._init()
    }
    i(1);
    var n = i(3),
      o = i(4);
    s.prototype = {
      _init: function() {
        var t = this.options.value || (this.control && this.control.value ? this.options.parseValue(this.control.value) : null);
        this._createDOM();
        for (var e = 0, i = this.options.data.length; e < i; e++) this.wheels.push(new o(this.wheelsContainer, {
          rows: this.options.rows,
          rowHeight: this.options.rowHeight,
          data: this.options.data[e],
          value: t ? t[e] : null,
          onSelect: this._onChange.bind(this, e)
        }));
        this.options.title && (this.container.querySelector(".wheelpicker-title").innerHTML = this.options.title), this.container.querySelector(".wheelpicker-mask-top").style.height = this.container.querySelector(".wheelpicker-mask-btm").style.height = this.options.rowHeight * Math.floor(this.options.rows / 2) - 1 + "px", this._bindEvents(), t && this._set(!0)
      },
      _createDOM: function() {
        this.container = document.createElement("div"), this.container.className = "wheelpicker", this.origEl && (this.container.id = "wheelpicker-" + (this.origEl.name || this.origEl.id)), this.container.innerHTML = "<div class='wheelpicker-backdrop'></div><div class='wheelpicker-panel'><div class='wheelpicker-actions'><button type='button' class='btn-cancel'>Close</button><button type='button' class='btn-del'>Delete</button><h4 class='wheelpicker-title'></h4></div><div class='wheelpicker-main'><div class='wheelpicker-wheels'></div><div class='wheelpicker-mask wheelpicker-mask-top'></div><div class='wheelpicker-mask wheelpicker-mask-current'></div><div class='wheelpicker-mask wheelpicker-mask-btm'></div></div></div>", this.wheelsContainer = this.container.querySelector(".wheelpicker-wheels"), this.options.onRender && this.options.onRender.call(this, this.container), document.body.appendChild(this.container)
      },
      _bindEvents: function() {
        this._onFocus = function(t) {
          t.target.blur(), this.show()
        }.bind(this), this.control && this.control.addEventListener("focus", this._onFocus), this.options.hideOnBackdrop && this.container.querySelector(".wheelpicker-backdrop").addEventListener("click", this._cancel.bind(this)),this.container.querySelector(".wheelpicker-actions .btn-cancel").addEventListener("click", function(){document.getElementById("create").style.display = "initial";
              document.getElementById("collection").style.display = "initial";}), this.container.querySelector(".wheelpicker-actions .btn-cancel").addEventListener("click", this._cancel.bind(this)), this.container.querySelector(".wheelpicker-actions .btn-del").addEventListener("click", function(){document.getElementById("mainInput").value = document.getElementById("mainInput").value.slice(0, -1);}), this.container.querySelector(".wheelpicker-backdrop").addEventListener(this.transitionendName, this._backdropTransEnd.bind(this))
      },
      _onChange: function(t) {
        this.options.onChange && this.options.onChange.call(this, t, this.getSelectedItems()[t])
      },
      _backdropTransEnd: function() {
        this.container.classList.contains("shown") || (this.container.style.display = "none", this.closed = !0, this.restore && this.wheels.forEach(function(t, e) {
          t.setData(this._tempData[e])
        }, this), this.setValue(this.value))
      },
      _set: function(t) {
        var e = this.getSelectedItems();
        this.value = this.getValue(), this.control && !this.cancelled && (this.control.value = this.options.formatValue(e.map(function(t) {
          return t ? t.text : null
        })), this.hiddenInput && (this.hiddenInput.value = this.options.formatHiddenValue(e.map(function(t) {
          return t ? t.value : null
        })))), this.cancelled = !1, t !== !0 && (this.options.onSelect && this.options.onSelect.call(this, e), this.container.classList.remove("shown"))
      },
      _cancel: function() {
        this.cancelled = !0, this.changed && (this.restore = !0), this.options.onCancel && this.options.onCancel.call(this), this.container.classList.remove("shown")
      },
      show: function() {
        if (!this.disabled && this.closed) {
          var t = this.container;
          this.closed = this.changed = this.restore = !1, this._tempData = this.getData(), t.style.display = "block", setTimeout(function() {
            t.classList.add("shown")
          }, 10), this.options.onShow && this.options.onShow.call(this)
        }
      },
      hide: function() {
        this.disabled || this.closed || this._cancel()
      },
      getSelectedItems: function() {
        return this.wheels.map(function(t) {
          return t.getSelectedItem()
        })
      },
      getValue: function(t) {
        return "number" == typeof t ? this.wheels[t].getValue() : this.wheels.map(function(t) {
          return t.getValue()
        })
      },
      setValue: function(t, e) {
        if (!this.disabled) {
          var i = this.closed;
          "number" == typeof e ? this.wheels[e].setValue(t, i) : this.wheels.forEach(function(e, s) {
            e.setValue(t[s], i)
          }), this.closed && this._set(!0)
        }
      },
      getData: function(t) {
        return "number" == typeof t ? this.wheels[t].getData() : this.wheels.map(function(t) {
          return t.getData()
        })
      },
      setData: function(t, e, i) {
        this.disabled || (this.changed = !0, "number" == typeof e ? this.wheels[e].setData(t, i) : (n.isArray(e) && (i = e), this.wheels.forEach(function(e, s) {
          e.setData(t[s], i ? i[s] : null)
        })), this.closed && this._set(!0))
      },
      enable: function() {
        this.disabled = !1
      },
      disable: function() {
        this.disabled = !0
      },
      destory: function() {
        this.disable(), this.container.parentNode.removeChild(this.container), this.hiddenInput ? (this.control.parentNode.removeChild(this.control), this.hiddenInput.readOnly = !1, this.hiddenInput.type = this.elType, this.hiddenInput.classList.remove("wheelpicker-hiddeninput")) : this.control && (this.control.readOnly = !1, this.control.removeEventListener("focus", this._onFocus), this.control.classList.remove("wheelpicker-control"))
      }
    }, t.exports = s
  }, function(t, e) {}, , function(t, e) {
    "use strict";
    t.exports = {
      extend: Object.assign || function(t, e) {
        for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
        return t
      },
      prefixed: function(t) {
        var e, i = document.createElement("div").style,
          s = ["Webkit", "Moz", "ms", "O"];
        if (t in i) return t;
        for (var n = 0, o = s.length; n < o; n++)
          if (e = s[n] + t.charAt(0).toUpperCase() + t.substring(1), e in i) return e;
        return null
      },
      getStyle: function(t, e) {
        return e = e.replace(/([A-Z])/g, "-$1"), e = e.toLowerCase(), window.getComputedStyle(t, null).getPropertyValue(e)
      },
      isArray: Array.isArray || function(t) {
        return "[object Array]" === Object.prototype.toString.call(t)
      }
    }
  }, function(t, e, i) {
    "use strict";

    function s(t, e) {
      this.container = "string" == typeof t ? document.querySelector(t) : t, this.data = [], this.items = [], this.y = 0, this.selectedIndex = 0, this.isTransition = !1, this.isTouching = !1, this.easings = {
        scroll: "cubic-bezier(0.23, 1, 0.32, 1)",
        scrollBounce: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        bounce: "cubic-bezier(0.165, 0.84, 0.44, 1)"
      }, this.options = n.extend({
        data: [],
        rows: 5,
        rowHeight: 34,
        adjustTime: 400,
        bounceTime: 600,
        momentumThresholdTime: 300,
        momentumThresholdDistance: 10
      }, e), this.options.rows % 2 === 0 && this.options.rows++, this.pointerEvents = "ontouchstart" in window ? {
        start: "touchstart",
        move: "touchmove",
        end: "touchend",
        cancel: "touchcancel"
      } : {
        start: "mousedown",
        move: "mousemove",
        end: "mouseup",
        cancel: "mouseleave"
      }, this.transformName = n.prefixed("transform"), this.transitionName = n.prefixed("transition"), this.transitionendName = {
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionEnd",
        msTransition: "MSTransitionEnd",
        OTransition: "oTransitionEnd",
        transition: "transitionend"
      } [this.transitionName], this._init()
    }
    var n = i(3);
    s.prototype = {
      _init: function() {
        this._createDOM(), this._bindEvents()
      },
      _createDOM: function() {
        this.wheel = document.createElement("div"), this.wheel.className = "wheelpicker-wheel", this.scroller = document.createElement("ul"), this.scroller.className = "wheelpicker-wheel-scroller", this.setData(this.options.data, this.options.value), this.wheel.style.height = this.options.rowHeight * this.options.rows + "px", this.scroller.style.marginTop = this.options.rowHeight * Math.floor(this.options.rows / 2) + "px", this.wheelHeight = this.wheel.offsetHeight, this.wheel.appendChild(this.scroller), this.container.appendChild(this.wheel)
      },
      _momentum: function(t, e, i, s, n, o, h) {
        var r, a, l = t - e,
          c = Math.abs(l) / i;
        return o = void 0 === o ? 6e-4 : o, r = t + c * c / (2 * o) * (l < 0 ? -1 : 1), a = c / o, r = Math.round(r / h) * h, r < s ? (r = n ? s - n / 2.5 * (c / 8) : s, l = Math.abs(r - t), a = l / c) : r > 0 && (r = n ? n / 2.5 * (c / 8) : 0, l = Math.abs(t) + r, a = l / c), {
          destination: Math.round(r),
          duration: a
        }
      },
      _resetPosition: function(t) {
        var e = this.y;
        return t = t || 0, e > 0 && (e = 0), e < this.maxScrollY && (e = this.maxScrollY), e !== this.y && (this._scrollTo(e, t, this.easings.bounce), !0)
      },
      _getClosestSelectablePosition: function(t) {
        var e = Math.abs(Math.round(t / this.options.rowHeight));
        if (!this.data[e].disabled) return t;
        for (var i = Math.max(e, this.data.length - e), s = 1; s <= i; s++) {
          if (!this.data[e + s].disabled) {
            e += s;
            break
          }
          if (!this.data[e - s].disabled) {
            e -= s;
            break
          }
        }
        return e * -this.options.rowHeight
      },
      _scrollTo: function(t, e, i) {
        return this.y === t ? (this._scrollFinish(), !1) : (this.y = this._getClosestSelectablePosition(t), this.scroller.style[this.transformName] = "translate3d(0," + this.y + "px,0)", void(e && e > 0 ? (this.isTransition = !0, this.scroller.style[this.transitionName] = e + "ms " + i) : this._scrollFinish()))
      },
      _scrollFinish: function() {
        var t = Math.abs(this.y / this.options.rowHeight);
        this.selectedIndex != t && (this.items[this.selectedIndex].classList.remove("wheelpicker-item-selected"), this.items[t].classList.add("wheelpicker-item-selected"), this.selectedIndex = t, this.options.onSelect && this.options.onSelect(this.data[t], t))
      },
      _getCurrentY: function() {
        var t = n.getStyle(this.scroller, this.transformName).match(/-?\d+(\.\d+)?/g);
        return parseInt(t[t.length - 1])
      },
      _start: function(t) {
        t.preventDefault(), this.data.length && (this.isTransition && (this.isTransition = !1, this.y = this._getCurrentY(), this.scroller.style[this.transformName] = "translate3d(0," + this.y + "px,0)", this.scroller.style[this.transitionName] = ""), this.startY = this.y, this.lastY = t.touches ? t.touches[0].pageY : t.pageY, this.startTime = Date.now(), this.isTouching = !0)
      },
      _move: function(t) {
        if (!this.isTouching) return !1;
        var e = t.changedTouches ? t.changedTouches[0].pageY : t.pageY,
          i = e - this.lastY,
          s = this.y + i,
          n = Date.now();
        return this.lastY = e, (s > 0 || s < this.maxScrollY) && (s = this.y + i / 3), this.y = Math.round(s), this.scroller.style[this.transformName] = "translate3d(0," + this.y + "px,0)", n - this.startTime > this.momentumThresholdTime && (this.startTime = n, this.startY = e), !1
      },
      _end: function(t) {
        if (!this.isTouching) return !1;
        var e, i, s = Date.now() - this.startTime,
          n = this.options.adjustTime,
          o = this.easings.scroll,
          h = Math.abs(this.y - this.startY);
        return this.isTouching = !1, s < this.options.momentumThresholdTime && h <= 10 && t.target.classList.contains("wheelpicker-item") ? (this._scrollTo(t.target._wsIdx * -this.options.rowHeight, n, o), !1) : void(this._resetPosition(this.options.bounceTime) || (s < this.options.momentumThresholdTime && h > this.options.momentumThresholdDistance ? (e = this._momentum(this.y, this.startY, s, this.maxScrollY, this.wheelHeight, 7e-4, this.options.rowHeight), i = e.destination, n = e.duration) : i = Math.round(this.y / this.options.rowHeight) * this.options.rowHeight, (i > 0 || i < this.maxScrollY) && (o = this.easings.scrollBounce), this._scrollTo(i, n, o)))
      },
      _transitionEnd: function() {
        this.isTransition = !1, this.scroller.style[this.transitionName] = "", this._resetPosition(this.options.bounceTime) || this._scrollFinish()
      },
      _bindEvents: function() {
        this.wheel.addEventListener(this.pointerEvents.start, this._start.bind(this)), this.wheel.addEventListener(this.pointerEvents.move, this._move.bind(this)), this.wheel.addEventListener(this.pointerEvents.end, this._end.bind(this)), this.wheel.addEventListener(this.pointerEvents.cancel, this._end.bind(this)), this.scroller.addEventListener(this.transitionendName, this._transitionEnd.bind(this))
      },
      getData: function() {
        return this.data
      },
      setData: function(t, e) {
        var i = e || (t && t.length ? t[0].value || t[0] : null);
        this.items = [], this.scroller.innerHTML = "", this.data = t.map(function(t, e) {
          var s = document.createElement("li");
          return s.className = "wheelpicker-item", t = "object" == typeof t ? t : {
            text: t,
            value: t
          }, t.disabled && (s.className += " wheelpicker-item-disabled"), t.value === i && (s.className += " wheelpicker-item-selected", this.selectedIndex = e), s._wsIdx = e, s.innerHTML = t.text, this.items.push(s), this.scroller.appendChild(s), t
        }, this), this.y = this.selectedIndex * -this.options.rowHeight, this.scroller.style[this.transformName] = "translate3d(0," + this.y + "px,0)", this.maxScrollY = -this.options.rowHeight * (this.data.length - 1)
      },
      getSelectedItem: function() {
        return this.data[this.selectedIndex]
      },
      getValue: function() {
        var t = this.getSelectedItem();
        return t ? t.value : null
      },
      setValue: function(t, e) {
        for (var i, s, n = 0, o = this.data.length; n < o; n++)
          if (s = this.data[n], s.value === t) {
            s.disabled || (i = n);
            break
          } return i >= 0 && this._scrollTo(i * -this.options.rowHeight, e ? 0 : this.options.adjustTime, this.easings.scroll), i
      }
    }, t.exports = s
  }])
});
