[![GitHub version](https://badge.fury.io/gh/MohammadYounes%2Fjquery-scrollLock.svg)](http://badge.fury.io/gh/MohammadYounes%2Fjquery-scrollLock)
[![Bower version](https://img.shields.io/bower/v/jquery-scrollLock.svg)](https://github.com/MohammadYounes/jquery-scrollLock)
[![NuGet version](https://img.shields.io/nuget/v/jquery-scrollLock.svg)](https://www.nuget.org/packages/jquery-scrollLock/)
[![NPM version](https://img.shields.io/npm/v/jquery-scroll-lock.svg)](https://www.npmjs.com/package/jquery-scroll-lock/)



Scroll Lock
=================

Scroll Lock is a jQuery plugin that fully addresses the issue of locking mouse wheel scroll inside a given container, preventing it from propagating to parent element.

> View [demo](http://mohammadyounes.github.io/jquery-scrollLock/#demo)

## Features

* It does not change wheel scrolling speed, user experience will not be affected. 
* You get the same behavior regardless of the OS mouse wheel vertical scrolling speed.

  > On Windows it can be set to one screen or one line up to 100 lines per notch.
* Supports touch screens.

### Install with [NuGet](https://www.nuget.org/packages/jquery-scrollLock/) 
```
Install-Package jquery-scrollLock
```

### Install with Bower
```
bower install jquery-scrollLock
```

### Install with [NPM](https://www.npmjs.com/package/jquery-scroll-lock/) 
```
npm install jquery-scroll-lock --save
```

## Usage

Trigger Scroll Lock via JavaScript: 

```js
$('#target').scrollLock();
```

Trigger Scroll Lock via Markup:
```html
<!-- HTML -->
<div data-scrollLock
     data-strict='true'
     data-selector='.child'
     data-animation='{"top":"top locked","bottom":"bottom locked"}'
     data-keyboard='{"tabindex":0}'
     data-unblock='.inner'>
     ...
</div>

<!-- JavaScript -->
<script type="text/javascript">
  $('[data-scrollLock]').scrollLock()
</script>
```

## Options

|   Options |   Type     | Default    |   Description
|:----------|:----------:|:----------:|:-------------
| animation | `object`   | `false`    | An object defining CSS class(es) to be applied when top or bottom edge is locked. (see [remarks<sup>1</sup>](#remarks1))
| keyboard  | `object`   | `false`    | When enabled, keys that causes scrolling will also be locked. (see [remarks<sup>2</sup>](#remarks2))
| selector  | `string`   | `false`    | When provided, matching descendants will be locked. Useful when dealing with dynamic HTML.
| strict    | `boolean`  | `false`    | When enabled, only elements passing the `strictFn` check will be locked.
| strictFn  | `function` | [remarks<sup>3</sup>](#remarks3) | This function is responsible for deciding if the element should be locked or not.
| touch     | `boolean`  | `auto`     | Indicates if an element's lock is enabled on touch screens.
| unblock	  | `string`   | `false`    | When provided, matching descendants scrolling will be unblocked. Useful when having a scrollable element inside a locked one.


### Remarks<sup>1</sup>

> This is pure JavaScript plugin, it *does not provide any CSS*. You need to implement your own!

The `animation` option has two keys:

```js
{
  "top": "top locked",
  "bottom": "bottom locked"
}
```

When an edge is locked, the value of both `animation.top + animation.bottom` will be removed from the locked element's class list.

Then based on the locked edge, the value of `animation.top` or `animation.bottom` is added to the class list, and removed once the browser `animationend` event is fired.

### Remarks<sup>2</sup>

In chrome, The following keys causes a scroll, which may propagate to parent element.

<kbd>space</kbd>, <kbd>pageup</kbd>, <kbd>pagedown</kbd> , <kbd>end</kbd> , <kbd>home</kbd>, <kbd>up</kbd>, <kbd>down</kbd>

The `keyboard` option has one key:

```js
{ "tabindex": 0 }
```

The `tabindex` is required to be able to listen to keyboard events on none input elements, such as a `div`. The side effect of adding a `tabindex` is the browser highlight when the element is focused.

Which can be avoided via CSS `outline` property.

```css
.scrollable{ outline:0; }
```

### Remarks<sup>3</sup>

The default `strictFn` implementation checks if the element requires a vertical scrollbar.
```javascript
strictFn = function($element){
  return $element.prop('scrollHeight') > $element.prop('clientHeight'); 
}
```
> In previous versions (&le; v2.1.0), The check was based on scrollbar visibility, In case you require such behavior, include the following in your script:
```javascript
$.fn.scrollLock.defaults.strictFn = function ($element) {
  var clientWidth = $element.prop('clientWidth'),
  offsetWidth = $element.prop('offsetWidth'),
  borderRightWidth = parseInt($element.css('border-right-width'), 10),
  borderLeftWidth = parseInt($element.css('border-left-width'), 10)
  return clientWidth + borderLeftWidth + borderRightWidth < offsetWidth
}
```

## Methods

|   Method                     |    Description
|:-----------------------------|:--------------
| `.scrollLock('enable')`      | Enables an element's Scroll Lock.
| `.scrollLock('disable')`     | Disables an element's Scroll Lock.
| `.scrollLock('toggleStrict')`| Toggles an element's strict option.
| `.scrollLock('destroy')`     | Disables and destroys an element's Scroll Lock.


## Events

|   Event             |   Description
|:--------------------|:-------------
| `top.scrollLock`    | This event fires immediately when the top edge scroll is locked.
| `bottom.scrollLock` | This event fires immediately when the bottom edge scroll is locked.

```
$('#target').on('top.scrollLock', function (evt) {
  // do magic :)
})
```

------
Have a suggestion or a bug ? please [open a new issue.](https://github.com/MohammadYounes/jquery-scrollLock/issues?state=open)



## Commercial License

If you want to use jquery-scrollLock.js to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary. Purchase a jquery-scrollLock.js Commercial License at http://www.uplabs.com/posts/scroll-lock-plugin
