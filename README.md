Scroll Lock 
=================

Scroll Lock is a jQuery plugin that fully addresses the issue of locking mouse wheel scroll inside a given container, preventing it from propagating to parent element.


##Why Scoll Lock?

* It does not change wheel scrolling speed, user experience will not be affected. 
* You get the same behavior regardless of the operating system mouse wheel vertical scrolling speed setting.

  > On Windows it can be set to one screen or one line up to 100 lines per notch.


##Usage

```

//Lock
$('target').scrollLock();

//Unlock
$('target').scrollLock('off');

```




------

Have a bug? please [open a new issues.](https://github.com/MohammadYounes/jquery-scrollLock/issues?state=open)
