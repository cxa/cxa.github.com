# 小巧三条

这两条是关于 IE 环境中的 CSS 的。

1. 不要使用 `import` 引入 CSS，可以避免内容的无样式瞬间（[FOUC][0]）问题。
2. 不要把样式的 `link` 放到页面后（</body\>之前），以防止页面 6-10 秒的空白。

这条是关于 Firefox 的。

在 Firefox 里，嵌入 flash 影片的 HTML 代码存在 `wmode` 特性时，在某些 `position:relative` 的元素内，会产生不可点击的现象（很遗憾，我总结不出具体条件，只知道必备条件是这个）。解决方法，只能依赖于 JavaScript。思路是，暂时改变的了的元素的 `position` 为 `static`, 然后恢复。JavaScript 代码大致如下：

```js
function fixSWFUnclickable(wrapper){
    wrapper.style.position = 'static';
    setTimeout(function(){wrapper.style.position = 'relative';}, 1);
}
``

以上。

[0]: http://bluerobot.com/web/css/fouc.asp/
```
