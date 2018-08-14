# 元素水平居中方案总结

先来看我一个简单XHTML/HTML文件代码（部分），我们的目的是让`#container`水平居中。

```html
<body>
    <div id="container">
        <h1>content</h1>
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Phasellus varius eleifend.</p>
    </div>
</body>
```

## 使用自适应边界（auto margin）

水平居中任意元素的首选办法是使用边界（`margin`）性质（property），并把左右之值设置为`auto`。但你必须为`#container`指定一个宽度。

```css
div#container {
    margin-left: auto;
    margin-right: auto;
    width: 168px;
}
```

这个方案在任何**当代**浏览器上都有效，即使是IE6，前提是在web标准兼容模式下（compliance mode）。不幸的是，它不会在先前版本的IE/Win中工作。我们为此列一个表格：

<table>
    <thead>
        <tr>
            <th colspan="3">浏览的自适应边界支持一览表</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th>浏览器</th><th>版本</th><th>支持</th>
        </tr>
        <tr>
            <td>Internet Explorer</td><td>6.0, compliance mode</td><td>是</td>
        </tr>
        <tr>
            <td>Internet Explorer</td><td>6.0, quirks mode</td><td>否</td>
        </tr>
        <tr>
            <td>Internet Explorer</td><td>5.5 Windows</td><td>否</td>
        <tr>
            <td>Internet Explorer</td><td>5.0 Windows</td><td>否</td>
        </tr>
        <tr>
            <td>Internet Explorer</td><td>5.2 Macintosh</td><td>是</td>
        </tr>
        <tr>
            <td>Mozilla</td><td>所有当前版本</td><td>是</td>
        </tr>
        <tr>
            <td>Mozilla Firefox</td><td>所有版本</td><td>是</td>
        </tr>
        <tr>
            <td>Netscape</td><td>4.x</td><td>否</td>
        </tr>
        <tr>
            <td>Netscape</td><td>6.x+</td><td>是</td>
        </tr>
        <tr>
            <td>Opera</td><td>6.0, 7.0 Macintosh and Windows</td><td>是</td>
        </tr>
        <tr>
            <td>Safari</td><td>1.2</td><td>是</td>
        </tr>
    </tbody>
</table>

尽管受到浏览器支持的限制，大部分设计师还是提倡你尽可能这样做。但我们依然可以使用CSS应付一切情况。

## 使用文本排列（`text-align`）

此方案需要使用到`text-align`性质，应用给`body`元素并且赋予`center`的值。

```css
body {
    text-align: center;
}
```

它公正地对待各种浏览器，十分彻底，唾手可得。然而，这是赋予文本的性质，它使`#container`中的文本也居中了。所以，在布局上我们还得做一些额外工作：

```css
div#container {
    text-align: left;
}
```

这样才可以把文本的对齐方式返回默认状状态。

## 综合边界和文本排列

因为文本排列向后兼容，当代浏览器也支持自适应边界，很多设计师把他们结合起来，实现跨浏览器使用。

```css
body {
text-align: center;
}
#container {
    margin-left: auto;
    margin-right: auto;
    border: 1px solid red;
    width: 168px;
    text-align: left
}
```

唉，依然不完美，因为还是一个黑客技巧 （hack）。你不得不为文本排列写下多余的规则。但现在，我们可以使用更完美的跨浏览器的方案。

## 负边界解决方案

此方案得结合使用绝对定位（absolute positioning ）。首先，把`#container`绝对定位并左偏移50%，这样，`#container`的左边界就是页面分辨率的一半。下一步，把`#container`的左边界设置为负值，值大小为`#container`宽度（width）的一半。

```css
#container {
    background: #ffc url(mid.jpg) repeat-y center;
    position: absolute;
    left: 50%;
    width: 760px;
    margin-left: -380px;
}
```

看，没有任何黑客技巧（no hacks）！连Netscape 4.x都支持！

**2005-08-12更新**：此方法在IE下会导致不能使用鼠标选择某个区段的元素，注意注意！

抄袭文献：[The Zen of CSS Design][0]

[0]: http://www.amazon.com/exec/obidos/tg/detail/-/0321303474/ref=pd_wt_2/104-5778529-9599942?coliid=IBZP0900M3B9T