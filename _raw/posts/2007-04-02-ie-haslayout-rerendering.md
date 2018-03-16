---
title: 解决IE在JS下不渲染的bug
---
有时候，你会发现，在一些JS应用中，涉及到CSS的重新渲染（即页面样式需要更新）的话，IE死活不变。

此时你需要让IE重新渲染一下：

```js
function handleIEhasLayout(){
	//trigger re-rendering
	document.body.style.zoom = 1.1;
	//restore it
	document.body.style.zoom = '';
}
```

有问题，记得执行一下handleIEhasLayout，万事OK。

bug重现以及延伸阅读：[http://old9.blogsome.com/2006/07/26/ie6-reflow-bug/][0]

[0]: http://old9.blogsome.com/2006/07/26/ie6-reflow-bug/