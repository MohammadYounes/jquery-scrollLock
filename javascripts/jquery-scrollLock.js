/*!
 * Scroll Lock v3.1.3
 * https://github.com/MohammadYounes/jquery-scrollLock
 *
 * Copyright (c) 2017 Mohammad Younes
 * Licensed under GPL 3.
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
  var keys = { space: 32, pageup: 33, pagedown: 34, end: 35, home: 36,  up: 38, down: 40 }
  var processScrollEvent = function (event, $element) {
    var scrollTop = $element.scrollTop(),
      scrollHeight = $element.prop('scrollHeight'),
      clientHeight = $element.prop('clientHeight'),
      delta = event.originalEvent.wheelDelta || (-1 * event.originalEvent.detail) || (-1 * event.originalEvent.deltaY),
      deltaY = 0
    if (event.type === 'wheel') {
      var ratio = $element.height() / $(window).height()
      deltaY = event.originalEvent.deltaY * ratio
    } else if (this.options.touch && event.type === 'touchmove') {
      delta = event.originalEvent.changedTouches[0].clientY - this.startClientY
    }
    var top, prevent
    prevent = (top = delta > 0 && scrollTop + deltaY <= 0) || delta < 0 && scrollTop + deltaY >= scrollHeight - clientHeight
    return {prevent: prevent, top: top, scrollTop: scrollTop, deltaY: deltaY }
  }
  var processKeyboardEvent = function (event, $element) {
    var scrollTop = $element.scrollTop(),
      result = {top: false, bottom: false}
    result.top = scrollTop === 0 && (event.keyCode === keys.pageup || event.keyCode === keys.home || event.keyCode === keys.up)
    if (!result.top) {
      var scrollHeight = $element.prop('scrollHeight'),
        clientHeight = $element.prop('clientHeight')
      result.bottom = scrollHeight === scrollTop + clientHeight && (event.keyCode === keys.space || event.keyCode === keys.pagedown || event.keyCode === keys.end || event.keyCode === keys.down)
    }
    return result
  }
  var ScrollLock = function ($element, options) {
    this.$element = $element
    this.options = $.extend({}, ScrollLock.DEFAULTS, this.$element.data(), options)
    this.enabled = true
    this.startClientY = 0
    if (this.options.unblock) {
      this.$element.on(ScrollLock.CORE.wheelEventName + ScrollLock.NAMESPACE, this.options.unblock, $.proxy(ScrollLock.CORE.unblockHandler, this))
    }
    this.$element.on(ScrollLock.CORE.wheelEventName + ScrollLock.NAMESPACE, this.options.selector, $.proxy(ScrollLock.CORE.handler, this))
    if (this.options.touch) {
      this.$element.on('touchstart' + ScrollLock.NAMESPACE, this.options.selector, $.proxy(ScrollLock.CORE.touchHandler, this))
      this.$element.on('touchmove' + ScrollLock.NAMESPACE, this.options.selector, $.proxy(ScrollLock.CORE.handler, this))
      
      if (this.options.unblock) {
        this.$element.on('touchmove' + ScrollLock.NAMESPACE, this.options.unblock, $.proxy(ScrollLock.CORE.unblockHandler, this))
      }
    }
    if (this.options.keyboard) {
      this.$element.attr('tabindex', this.options.keyboard.tabindex || 0)
      this.$element.on('keydown' + ScrollLock.NAMESPACE, this.options.selector, $.proxy(ScrollLock.CORE.keyboardHandler, this))

      if (this.options.unblock) {
        this.$element.on('keydown' + ScrollLock.NAMESPACE, this.options.unblock, $.proxy(ScrollLock.CORE.unblockHandler, this))
      }
    }
  }
  ScrollLock.NAME = 'ScrollLock'
  ScrollLock.VERSION = '3.1.2'
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
    keyboard: false,
    unblock: false
  }
  ScrollLock.CORE = {
    wheelEventName: 'onwheel' in document.createElement('div') ? 'wheel' : // Modern browsers support "wheel"
      document.onmousewheel !== undefined ? 'mousewheel' : // Webkit and IE support at least "mousewheel"
        'DOMMouseScroll', // let's assume that remaining browsers are older Firefox,
    animationEventName: [
        'webkitAnimationEnd',
        'mozAnimationEnd',
        'MSAnimationEnd',
        'oanimationend',
        'animationend'
      ].join(ScrollLock.ANIMATION_NAMESPACE + ' ') + ScrollLock.ANIMATION_NAMESPACE,
    unblockHandler: function (event) {
      event.__currentTarget = event.currentTarget
    },
    handler: function (event) {
      // allow zooming
      if (this.enabled && !event.ctrlKey) {
        var $this = $(event.currentTarget)
        if (this.options.strict !== true || this.options.strictFn($this)) {
          // Support for nested scrollable blocks (see https://github.com/MohammadYounes/jquery-scrollLock/issues/4)
          event.stopPropagation()
          var result = $.proxy(processScrollEvent, this)(event, $this)
          if (event.__currentTarget)
            result.prevent &= $.proxy(processScrollEvent, this)(event, $(event.__currentTarget)).prevent
          if (result.prevent) {
            event.preventDefault()
            if (result.deltaY) {
              $this.scrollTop(result.scrollTop + result.deltaY)
            }
            var key = result.top ? 'top' : 'bottom'
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
    },
    animationHandler: function ($element, key) {
      var css = this.options.animation[key],
        all = this.options.animation.top + ' ' + this.options.animation.bottom
      $element.off(ScrollLock.ANIMATION_NAMESPACE)
        .removeClass(all)
        .addClass(css)
        .one(ScrollLock.CORE.animationEventName,
          function () {
            $element.removeClass(css)
          })
    },
    keyboardHandler: function (event) {
      var $this = $(event.currentTarget),
        scrollTop = $this.scrollTop(),
        result = processKeyboardEvent(event, $this)
      if (event.__currentTarget) {
        var result2 = processKeyboardEvent(event, $(event.__currentTarget))
        result.top &= result2.top
        result.bottom &= result2.bottom
      }
      if (result.top) {
        $this.trigger($.Event('top' + ScrollLock.NAMESPACE))
        if (this.options.animation) {
          setTimeout(ScrollLock.CORE.animationHandler.bind(this, $this, 'top'), 0)
        }
        return false
      } else if (result.bottom) {
        $this.trigger($.Event('bottom' + ScrollLock.NAMESPACE))
        if (this.options.animation) {
          setTimeout(ScrollLock.CORE.animationHandler.bind(this, $this, 'bottom'), 0)
        }
        return false
      }
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
}));
