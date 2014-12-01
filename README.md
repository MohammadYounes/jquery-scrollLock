[![GitHub version](https://badge.fury.io/gh/MohammadYounes%2Fjquery-scrollLock.svg)](http://badge.fury.io/gh/MohammadYounes%2Fjquery-scrollLock)
[![Bower version](https://badge.fury.io/bo/jquery-scrollLock.svg)](http://badge.fury.io/bo/jquery-scrollLock)
[![NuGet version](https://badge.fury.io/nu/jquery-scrollLock.svg)](http://badge.fury.io/nu/jquery-scrollLock)

Scroll Lock
=================

Scroll Lock is a jQuery plugin that fully addresses the issue of locking mouse wheel scroll inside a given container, preventing it from propagating to parent element.

> View [demo](http://mohammadyounes.github.io/jquery-scrollLock/example/)

## Features

* It does not change wheel scrolling speed, user experience will not be affected. 
* You get the same behavior regardless of the OS mouse wheel vertical scrolling speed.

  > On Windows it can be set to one screen or one line up to 100 lines per notch.

## Usage
```
// Lock
$('target').scrollLock();

// Unlock
$('target').scrollLock('off');

```
#### Delegated handler
```
// .scrollLock(toggle, selector, force);
// @toggle: any true value other than 'off' to lock, otherwise unlock
// @selector: string to filter the descendants of the selected elements
// @force: forces lock even if element doesn't have a vertical scroll

// lock all divs inside a given container
$('#container').scrollLock('on', 'div');

```
### Install using Bower
```
bower install jquery-scrollLock
```

### Install using NuGet
```
PM> Install-Package jquery-scrollLock
```

------

Have a suggestion or a bug ? please [open a new issue.](https://github.com/MohammadYounes/jquery-scrollLock/issues?state=open)
