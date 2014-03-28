/*
 * scrollLock
 * https://github.com/MohammadYounes/jquery-scrollLock
 *
 * Copyright (c) 2014 Mohammad Younes
 * Licensed under the MIT license.
 */
(function ($) {

  var eventName = "onmousewheel" in window ? (("ActiveXObject" in window) ? "wheel" : "mousewheel") : "DOMMouseScroll";
  var eventNamespace = ".scrollLock";

  var old = $.fn.scrollLock;
  $.fn.scrollLock = function (action) {
    if (action == 'off')
      return this.each(function () {
        $(this).off(eventNamespace);
      });
    else
      return this.each(function () {
        $(this).on(eventName + eventNamespace, function (event) {
          var $this = $(this),
              scrollTop = $this.scrollTop(),
              scrollHeight = $this.prop('scrollHeight'),
              clientHeight = $this.prop('clientHeight'),
              delta = event.originalEvent.wheelDelta || (-1 * event.originalEvent.detail) || (-1 * event.originalEvent.deltaY),
              deltaY = event.type == "wheel" ? event.originalEvent.deltaY : 0
          ;
          if (delta > 0 && scrollTop + deltaY <= 0 || delta < 0 && scrollTop + deltaY >= scrollHeight - clientHeight) {
            event.stopPropagation();
            event.preventDefault();
            if (deltaY)
              $this.scrollTop(scrollTop + deltaY)
          }
        });
      });
  }
  // no conflict
  $.fn.scrollLock.noConflict = function () {
    $.fn.scrollLock = old
    return this;
  }

})(jQuery);
