$(function () {
  var transition = (function () {
    var t, type
    var supported = false
    var transitions = {
      'animation': 'animationend',
      'OAnimation': 'oAnimationEnd oanimationend',
      'msAnimation': 'MSAnimationEnd',
      'MozAnimation': 'animationend',
      'WebkitAnimation': 'webkitAnimationEnd'
    }
    for (t in transitions) {
      if (document.documentElement.style[t] !== undefined) {
        type = transitions[t]
        supported = true
        break
      }
    }
    return {
      type: type,
      supported: supported
    }
  }())

  function handler (event, css) {
    clearTimeout(event.target.timer)
    var $this = $(event.target).off('.animation')
    if (transition.supported) {
      $this.one(transition.type + '.animation', function () {
        $this.removeClass(css)
      })
    } else {
      event.target.timer = setTimeout(function (e) {
        $this.removeClass(css)
      }, 2000)
    }
    $this.removeClass('top bottom').addClass(css)
  }

  $('.checkbox.enable').checkbox({onChange: function (e) {
      var $this = $(this).closest('.checkbox')
      var enabled = $this.checkbox('is enabled')
      $this.closest('.segment')
        .find('.top.label')
        .toggleClass('green', enabled)
        .toggleClass('red', !enabled)
        .end()
        .find('.example')
        .scrollLock(enabled ? 'enable' : 'disable')
        .end()
        .find('.checkbox.strict>input').prop('disabled', !enabled)
  }})

  $('.checkbox.strict').checkbox({onChange: function (e) {
      var $this = $(this).closest('.checkbox')
      $this.closest('.segment')
        .find('.example')
        .scrollLock('toggleStrict')
  }})

  $('.example')
    .scrollLock()
    .on('top.scrollLock', function (event) {
      console.log('locked at top')
      handler(event, 'top')
    })
    .on('bottom.scrollLock', function (event) {
      console.log('locked at bottom')
      handler(event, 'bottom')
    })
    
    $('[data-content]').popup();
})
