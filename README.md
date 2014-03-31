Scroll Lock 
=================

Scroll Lock is a jQuery plugin that fully addresses the issue of locking mouse wheel scroll inside a given container, preventing it from propagating to parent element.

> View [demo](http://mohammadyounes.github.io/jquery-scrollLock/example/)

##Features

* It does not change wheel scrolling speed, user experience will not be affected. 
* You get the same behavior regardless of the OS mouse wheel vertical scrolling speed.

  > On Windows it can be set to one screen or one line up to 100 lines per notch.


##Usage

```

//Lock
$('target').scrollLock();

//Unlock
$('target').scrollLock('off');

```




------

Have a suggestion or a bug ? please [open a new issue.](https://github.com/MohammadYounes/jquery-scrollLock/issues?state=open)
