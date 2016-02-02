/*!
 * Scroll Lock v2.0.0
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
  var wheelEventName = 'onmousewheel' in window ? (('ActiveXObject' in window) ? 'wheel' : 'mousewheel') : 'DOMMouseScroll'
  var hasVerticalScroll = function ($element) {
    var clientWidth = $element.prop('clientWidth'),
      offsetWidth = $element.prop('offsetWidth'),
      borderRightWidth = parseInt($element.css('border-right-width'), 10),
      borderLeftWidth = parseInt($element.css('border-left-width'), 10)
    return clientWidth + borderLeftWidth + borderRightWidth < offsetWidth
  }
  var ScrollLock = function ($element, options) {
    this.$element = $element
    this.options = $.extend({}, ScrollLock.DEFAULTS, this.$element.data(), options)
    this.enabled = true
    this.$element.on(wheelEventName + ScrollLock.NAMESPACE,
      this.options.selector,
      $.proxy(function (event) {
        // allow zooming
        if (this.enabled && !event.ctrlKey) {
          var $this = $(event.currentTarget)
          if (this.options.strict !== true || hasVerticalScroll($this)) {
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
            }
            var top
            if ((top = delta > 0 && scrollTop + deltaY <= 0) || delta < 0 && scrollTop + deltaY >= scrollHeight - clientHeight) {
              event.preventDefault()
              if (deltaY)
                $this.scrollTop(scrollTop + deltaY)
              $this.trigger($.Event((top ? 'top' : 'bottom') + ScrollLock.NAMESPACE))
            }
          }
        }
      }, this))
  }
  ScrollLock.NAME = 'ScrollLock'
  ScrollLock.VERSION = '2.0.0'
  ScrollLock.NAMESPACE = '.scrollLock'
  ScrollLock.DEFAULTS = {
    strict: false,
    selector: false
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
