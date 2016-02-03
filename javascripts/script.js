$(function () {
  var classes =
  ('ActiveXObject' in window)
    ? {all: 'top bottom dummy-top dummy-bottom', top: 'top dummy-top', bottom: 'bottom dummy-bottom' }
    : {all: 'top bottom', top: 'top', bottom: 'bottom'}
  function handler (event, css) {
    var $this = $(event.target)
    $this.off('.effect')
      .removeClass(classes.all)
      .addClass(css)
      .one('webkitAnimationEnd.effect mozAnimationEnd.effect MSAnimationEnd.effect oanimationend.effect animationend.effect',
        function () {
          $this.removeClass(css)
        })
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
      console.log('top locked')
      handler(event, classes.top)
    })
    .on('bottom.scrollLock', function (event) {
      console.log('bottom locked')
      handler(event, classes.bottom)
    })

  $('[data-content]').popup()
})
