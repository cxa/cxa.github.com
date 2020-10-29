# 解决 IE 在 JS 下不渲染的 bug

有时候，你会发现，在一些 JS 应用中，涉及到 CSS 的重新渲染（即页面样式需要更新）的话，IE 死活不变。

此时你需要让 IE 重新渲染一下：

```js
function handleIEhasLayout() {
  //trigger re-rendering
  document.body.style.zoom = 1.1;
  //restore it
  document.body.style.zoom = "";
}
```

有问题，记得执行一下 handleIEhasLayout，万事 OK。

bug 重现以及延伸阅读：[http://old9.blogsome.com/2006/07/26/ie6-reflow-bug/][0]

[0]: http://old9.blogsome.com/2006/07/26/ie6-reflow-bug/
