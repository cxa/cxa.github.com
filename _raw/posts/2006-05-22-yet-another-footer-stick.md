---
title: 我也来玩footerStick
---
需要在内容高度不足的时候把页脚放置在屏幕最下方（footerStick）？如果不想`position: fixed`还有什么办法吗？有的，你可以看看下面这些精彩文章：

* [最小高度100%，页脚保持在底部的布局方法][0]，来自[踩IE][1]
* [自适应高度布局][2]，来自[一葉の千鳥's Blog][3]
* [footerStick][4]，来自[solardreamstudios][5]
* [footerStickAlt][6]，来自[The Man in Blue][7]

我个人编写xhtml的风格是，对于`div`，我是能不加就不加的，可是在这个footerStick的问题上，还真没找到完美的解决方案，研究了这么多的footerStick，没有一个不加额外的`div`的，多少而已。

我也不能幸免，但我这种方案只需一个额外的`div`，而且易于理解。开讲：

现在组织布局结构的标准一般是这样的：

```html
<div id="wrap">
	<div id="header"></div>
	<div id="main"></div>
	<div id="footer"></div>
</div>
```

为了实现footerStick，我需要在id为`#main`的`div`加上一个`#m_ext`，如下：

```html
<div id="wrap">
	<div id="header"></div>
	<div id="main"><div id="m_ext"></div></div>
	<div id="footer"></div>
</div>
```

首先，为了让`body`内的元素能够实现100%的高度，需要：

```css
html, body {
	height: 100%;
	height: 100%;
}
```

然后，我们就可以让`#wrap`的高度为100%了：

```css
#wrap {
	position: relative;
	height: 100%;
}
```

为何要`position: relative;`？这是我实现footerStick的关键了。首先声明的是，我这个footerStick是有前提的：`#header`和`#footer`的高度是固定的。在`#wrap`的定位为`relative`后，其内定位为`absolute`的元素就可以脱离文档流而存在。

其实你可以猜到，如何才能让footer在底端？内容不足的`#main`必须有一定高度才能把`#footer`挤开。考虑到各种不同的分辨率和窗口的大小等不同因素，`#main`很难有一个精确的高度，那么只能：

```css
#main {
	min-height: 100%;
	_height: 100%;
}
```

嗯，如果你看过上述文章，一定知道什么原因了。IE 6- 不支持`min-height`，但`height: 100%`却可以达到相同目的。感谢这个bug。

让`#header`脱离文档流：

```css
#header {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 96px;
}
```

由于CSS到目前为止并不支持百分比与像素的运算（大家快祈祷吧，CSS3支持各种不同长度单位的运算），因此此时由`#m_ext`来模拟这个运算：

```css
#m_ext {
	padding-top: 96px;
}
```

`#footer`占据一定高度以后，会超出100%，因此要用负margin值等于其高度：

```css
#footer {
	height: 64px;
	margin-top: -64px;
}
```

为了不影响内容超出一屏时`#footer`会挡住`#main`的内容，需要用`#m_ext`再次模拟运算剪去可能被挡得高度：

```css
#m_ext {
	padding-top: 96px;
	padding-bottom: 64px;
}
```

Perfect! 兼容IE 5.0+, Firefox 1.5, Opera 8.5（我手头所有的浏览器），麻烦大家用其他浏览器帮忙测试：[http://realazy.com/lab/footerstick/footerstick_with_less_content.html][8]，还有一个内容超出一屏的版本，用以检验超过一屏内容是否正常：[http://realazy.com/lab/footerstick/footerstick_with_more_content.html][9]。

[0]: http://my.opera.com/tifa/blog/show.dml/251210
[1]: http://my.opera.com/tifa/blog/
[2]: http://www.rexsong.com/blog/article.asp?id=308
[3]: http://www.rexsong.com/blog/
[4]: http://solardreamstudios.com/learn/css/footerstick/
[5]: http://solardreamstudios.com/
[6]: http://www.themaninblue.com/experiment/footerStickAlt/
[7]: http://www.themaninblue.com/
[8]: http://realazy.com/lab/footerstick/footerstick_with_less_content.html
[9]: http://realazy.com/lab/footerstick/footerstick_with_more_content.html
