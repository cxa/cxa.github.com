# IE, FireFox, Opera 浏览器支持 Alpha 透明的方法

先请看如下代码：

```css
filter: alpha(opacity=50); /* IE */
-moz-opacity: 0.5; /* Moz + FF */
opacity: 0.5; /* 支持 CSS3的浏览器（FF 1.5也支持）*/
```

简单解释，IE 使用私有属性 `filter:alpha(opacity)`，Moz Family 使用私有属性 `-moz-opacity`，而标准的属性是 `opacity`（CSS 3, Moz Family 部分支持 CSS3）。后面的数值是透明度，使用百分比或者小数（`alpha(opacity)`）使用大于 0 小于 100 的数值，其实也是百分比）。

从上面的代码中你没有看到 Opera。没错，Opera 还未支持标准的 `opacity`，也没有其私有的可支持 Alpha 透明的属性。

但是，我们知道，Opera 是支持 Alpha 透明的 [PNG][0] 图片的（当然 Moz Family 也支持）。所以我们可以使用背景图片来实现 Alpha 透明效果。

例子：[http://realazy.com/lab/alpha/][1]

关键在于：

```css
background: transparent url(alpha80.png) left top repeat !important;
background: #ccc;
filter: alpha(opacity=50);
```

既然 Moz Family 支持 Alpha 透明的 PNG，所以我们没有必要使用其私有属性了。当然，你可以使用标准的 `opacity`，但别同时使用 Alpha 透明图片和 `opacity`，这样的话就成了两者的混合了。你可以把上面的例子下载过来，然后 `/*opacity: .5;*/` 的注释看看。

[0]: http://www.libpng.org/pub/png/
[1]: http://realazy.com/lab/alpha/
