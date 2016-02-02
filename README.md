[![GitHub version](https://badge.fury.io/gh/MohammadYounes%2Fjquery-scrollLock.svg)](http://badge.fury.io/gh/MohammadYounes%2Fjquery-scrollLock)
[![Bower version](https://badge.fury.io/bo/jquery-scrollLock.svg)](http://badge.fury.io/bo/jquery-scrollLock)
[![NuGet version](https://badge.fury.io/nu/jquery-scrollLock.svg)](http://badge.fury.io/nu/jquery-scrollLock)

Scroll Lock
=================

Scroll Lock is a jQuery plugin that fully addresses the issue of locking mouse wheel scroll inside a given container, preventing it from propagating to parent element.

> View [demo](http://mohammadyounes.github.io/jquery-scrollLock/#demo)

## Features

* It does not change wheel scrolling speed, user experience will not be affected. 
* You get the same behavior regardless of the OS mouse wheel vertical scrolling speed.

  > On Windows it can be set to one screen or one line up to 100 lines per notch.

### Install with [NuGet](https://www.nuget.org/packages/jquery-scrollLock/) 
```
Install-Package jquery-scrollLock
```

### Install with Bower
```
bower install jquery-scrollLock
```

## Usage

Trigger Scroll Lock via JavaScript: 

```
$('#target').scrollLock();

```

Trigger Scroll Lock via Markup:
```
<!-- HTML -->
<div data-scrollLock="true" data-strict="true" data-selector=".child" > ... </div>

<!-- JavaScript -->
$('[data-scrollLock="true"]').scrollLock()
```

### Options

|   Name    |   Type    | Default   |   Description
|:----------|:---------:|:---------:|:-------------
| selector  | `string`  | `false`   | When provided, matching elements will be locked.
| strict    | `boolean` | `false`   | When enabled, element will be locked even if it has no vertical scrollbar.

### Methods

|   Method                     |    Description
|:-----------------------------|:--------------
| `.scrollLock('enable')`      | Enables an element's Scroll Lock.
| `.scrollLock('disable')`     | Disables an element's Scroll Lock.
| `.scrollLock('toggleStrict')`| Toggles an element's strict option.
| `.scrollLock('destroy')`     | Disables and destroys an element's Scroll Lock.


### Events

|   Type              |   Description
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
