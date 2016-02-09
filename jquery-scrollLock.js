/*!
 * Scroll Lock v2.2.0
 * https://github.com/MohammadYounes/jquery-scrollLock
 *
 * Copyright (c) 2016 Mohammad Younes
 * Licensed under the MIT license.
 */
;(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory)
  } else {
    // Browser globals
    factory(jQuery)
  }
}(function ($) {
  'use strict'
  var ScrollLock = function ($element, options) {
    this.$element = $element
    this.options = $.extend({}, ScrollLock.DEFAULTS, this.$element.data(), options)
    this.enabled = true
    this.startClientY = 0
    this.$element.on(ScrollLock.CORE.wheelEventName + ScrollLock.NAMESPACE, this.options.selector, $.proxy(ScrollLock.CORE.handler, this))
    if (this.options.touch) {
      this.$element.on('touchstart' + ScrollLock.NAMESPACE, this.options.selector, $.proxy(ScrollLock.CORE.touchHandler, this))
      this.$element.on('touchmove' + ScrollLock.NAMESPACE, this.options.selector, $.proxy(ScrollLock.CORE.handler, this))
    }
  }
  ScrollLock.NAME = 'ScrollLock'
  ScrollLock.VERSION = '2.2.0'
  ScrollLock.NAMESPACE = '.scrollLock'
  ScrollLock.ANIMATION_NAMESPACE = ScrollLock.NAMESPACE + '.effect'
  ScrollLock.DEFAULTS = {
    strict: false,
    strictFn: function ($element) {
      return $element.prop('scrollHeight') > $element.prop('clientHeight')
    },
    selector: false,
    animation: false,
    touch: 'ontouchstart' in window,
  }
  ScrollLock.CORE = {
    wheelEventName: 'onmousewheel' in window ? (('ActiveXObject' in window) ? 'wheel' : 'mousewheel') : 'DOMMouseScroll',
    animationEventName: [
        'webkitAnimationEnd',
        'mozAnimationEnd',
        'MSAnimationEnd',
        'oanimationend',
        'animationend'
      ].join(ScrollLock.ANIMATION_NAMESPACE + ' ') + ScrollLock.ANIMATION_NAMESPACE,
    handler: function (event) {
      // allow zooming
      if (this.enabled && !event.ctrlKey) {
        var $this = $(event.currentTarget)
        if (this.options.strict !== true || this.options.strictFn($this)) {
          // Support for nested scrollable blocks (see https://github.com/MohammadYounes/jquery-scrollLock/issues/4)
          event.stopPropagation()
          var scrollTop = $this.scrollTop(),
            scrollHeight = $this.prop('scrollHeight'),
            clientHeight = $this.prop('clientHeight'),
            delta = event.originalEvent.wheelDelta || (-1 * event.originalEvent.detail) || (-1 * event.originalEvent.deltaY),
            deltaY = 0
          if (event.type === 'wheel') {
            var ratio = $this.height() / $(window).height()
            deltaY = event.originalEvent.deltaY * ratio
          } else if (this.options.touch && event.type === 'touchmove') {
            delta = event.originalEvent.changedTouches[0].clientY - this.startClientY
          }
          var top
          if ((top = delta > 0 && scrollTop + deltaY <= 0) || delta < 0 && scrollTop + deltaY >= scrollHeight - clientHeight) {
            event.preventDefault()
            if (deltaY) {
              $this.scrollTop(scrollTop + deltaY)
            }
            var key = top ? 'top' : 'bottom'
            if (this.options.animation) {
              setTimeout(ScrollLock.CORE.animationHandler.bind(this, $this, key), 0)
            }
            $this.trigger($.Event(key + ScrollLock.NAMESPACE))
          }
        }
      }
    },
    touchHandler: function (event) {
      this.startClientY = event.originalEvent.touches[0].clientY
    },animationHandler: function ($element, key) {
      var css = this.options.animation[key],
        all = this.options.animation.top + ' ' + this.options.animation.bottom
      $element.off(ScrollLock.ANIMATION_NAMESPACE)
        .removeClass(all)
        .addClass(css)
        .one(ScrollLock.CORE.animationEventName,
          function () {
            $element.removeClass(css)
          })
    }
  }
  ScrollLock.prototype.toggleStrict = function () {
    this.options.strict = !this.options.strict
  }
  ScrollLock.prototype.enable = function () {
    this.enabled = true
  }
  ScrollLock.prototype.disable = function () {
    this.enabled = false
  }
  ScrollLock.prototype.destroy = function () {
    this.disable()
    this.$element.off(ScrollLock.NAMESPACE)
    this.$element = null
    this.options = null
  }
  // plugin defintion.
  var old = $.fn.scrollLock
  $.fn.scrollLock = function (option) {
    return this.each(function () {
      var $this = $(this)
      var options = typeof option == 'object' && option
      var data = $this.data(ScrollLock.NAME)
      if (!data && 'destroy' === option) return
      if (!data) $this.data(ScrollLock.NAME, (data = new ScrollLock($this, options)))
      if (typeof option == 'string') data[option]()
    })
  }
  $.fn.scrollLock.defaults = ScrollLock.DEFAULTS
  // no conflict
  $.fn.scrollLock.noConflict = function () {
    $.fn.scrollLock = old
    return this
  }
}))
