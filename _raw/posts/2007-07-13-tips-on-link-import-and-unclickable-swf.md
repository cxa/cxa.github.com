---
title: 小巧三条
---
这两条是关于IE环境中的CSS的。

1. 不要使用`import`引入CSS，可以避免内容的无样式瞬间（[FOUC][0]）问题。
2. 不要把样式的`link`放到页面后（</body\>之前），以防止页面6-10秒的空白。

这条是关于Firefox的。

在Firefox里，嵌入flash影片的HTML代码存在`wmode`特性时，在某些`position:relative`的元素内，会产生不可点击的现象（很遗憾，我总结不出具体条件，只知道必备条件是这个）。解决方法，只能依赖于JavaScript。思路是，暂时改变的了的元素的`position`为`static`, 然后恢复。JavaScript代码大致如下：

```js
function fixSWFUnclickable(wrapper){
    wrapper.style.position = 'static';
    setTimeout(function(){wrapper.style.position = 'relative';}, 1);
}
``

以上。

[0]: http://bluerobot.com/web/css/fouc.asp/