# Bookmarklet

按照维基的定义，"A bookmarklet is an applet, a small computer application, stored as the URL of a bookmark in a web browser or as a hyperlink on a web page". 最近，它在一些新兴的网站中比较流行，比如 facebook, friendfeed. 从技术角度来看，它通常是一段来自提供方的可执行 JavaScript, 用以捕获当前网页的某些元素如标题、图片等以加强当前网页与提供方网站之间的交互。

那么，从技术角度来说，bookmarklet 有什么需要注意的呢？我个人意见如下：

首先，因为它是一段 JavaScript, 所以应该遵循普世的 JavaScript 编程原则。最重要的一点是，不要污染当前网页的命名空间，否则可能会破坏当前网页的 JavaScript. 通常，可以使用 [闭包][0] 来隐藏你所有的变量。同样，如果您的 bookmarklet 的 CSS 可能会入侵当前网页（很遗憾，CSS 没有命名空间，也没有类似闭包的东西，很容易就会冲突），那么请考虑将 bookmarklet 的内容放到 `iframe` 中去。

其次，防止函数执行后不经意的副作用，一个比较好用的贴士是，使用不返回值始终返回 `undefined` 的 [`void`][1], 它**可以接受任何参数**，因此，把你的闭包放到 `void` 中是个不错的主意：

```js
javascript:void((function(){...})());
```

最后，有一个比较恼火的问题也需要加以注意。目前世界上最流行的浏览器，IE6, 它对 bookmarklet 所能容忍的长度仅为 **508**!

[0]: http://www.jibbering.com/faq/faq_notes/closures.html
[1]: http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Operators:Special_Operators:void_Operator
