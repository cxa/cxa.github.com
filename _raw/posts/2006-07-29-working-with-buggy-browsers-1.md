---
title: 与臭虫为友——浏览器补救办法，臭虫以及解决方案（第一部分）
---
如果世界是美好的，浏览器都没有缺点，W3C的规范清晰明了，而这篇文章也永远不会出现。Welcome to the real world. 在这篇文章中，我们将会探讨几个主流浏览器的在Web标准（或者CSS规范）下存在的典型问题/臭虫，提供相应的解决方案（hacks/filters）。

## NN 4.x

很幸运我们生活在这个时代。这个10年前的古董浏览器,网景导航家（Netscape Navigator）4.x，终于只剩下0.3%的市场份额，大部分网站也声明不再支持。它有着最基本的CSS支持，而且依然有不少死忠（我相信越来越少），所以依然有设计师为它设计样式。但最多只能改变下字体，颜色等最基本的东西了。所以，我是说假如，你还要顾及NN 4.x的话，比较合适的做法是，做一个基本样式给它用，并对其隐藏不可识别的高级样式（给其他浏览器用）。很容易做到，因为NN 4.x不认`@import`。举例如下：

```html
<link rel="stylesheet" tyle="text/css" href="basic.css" />
<style type="text/css">@import(advance.css)</style>
```

这个方法屡试不爽。但请注意，这也不是没有副作用。假如只使用了`@import`而没有`link`的情况下，可能会导致IE的瞬间无样式（FOUC，详见[www.bluerobot.com/web/css/fouc.asp][0]。幸好，NN 4.x只能识别`screen`这个媒体类型（media type），所以，避免FOUC也不是没有办法：

```html
<link rel="stylesheet" tyle="text/css" media="screen, projection" href="advance.css" />
```

到此为止，我们不要为它浪费过多精力，除非你的老板还在用它。

## IE 5.x/Win

在此我们指Windows平台上的IE 5.0和IE 5.5。CSS的支持依然很糟糕，但是比起NN 4.x已经有了长足的改变。它们臭名昭著错误的盒状模型（Box model）可能是导致CSS界第一个hack的出现。我们先来看看盒状模型。W3C规范的盒子，可以使用"相加"来描述，即，一个元素的实际盒子宽度是由内容宽度（content `width`）,边框（`border`），边距（`padding`）堆积起来的。而IE 5.x/Win则可以用"相减"来描述，也被称为边框盒状模型（border box model），一个元素的实际宽度就是该元素的`width`设值，边框，边距都从中减去。

来看一个例子：

```css
div {
    width: 200px;
    margin: 20px;
    padding: 20px;
    border: 5px;
}
```

依照W3C规范，这个`div`实际所占宽度是5px + 20px + 200px + 20px + 5px。而对IE5.x/Win的边框盒状模型来说，这个`div`实际宽度就是200px，而内容宽度被压迫到只有150px：200px - 5px - 20px - 20px - 5px。这时候，传说中的牛人[Tantek Çelik][1]（负责IE5.x/Mac的前微软员工，现在经营[Technorati][2]，[Microformats][3]创始人和贡献者之一）出现了，带来了Box Model Hack. 该hack使用了IE 5.x/Win不支持的`voice-family`，并在值中设置一些CSS转义引号（CSS-escape quotes） ，欺骗IE 5.x/Win认为规则块（declaration block）已经闭合。

```css
div { /*为了更好说明，width调了一下写作习惯*/
    margin: 20px;
    padding: 20px;
    border: 5px;
    width: 240px;           /* 1. IE 5.x/Win需要的宽度 */
    voice-family: "\"}\"";  /* 2. IE 5.x/Win看见了}，认为规则已经结束了 */
    voice-family: inherit;  /* 3. 能够正确解析的浏览器重置该值 */
    width: 200px;           /* 4. 这才是我们需要的真正宽度 */
}
```

这条hack会导致同时期的Opera一些小问题，但新版已经没有任何问题了。考虑到非IE用户都乐意升级他们的浏览器，所以这个不是问题，不用多加考虑。

Tantek Çelik后来还发明了更佳的方式来对待IE 5.x/Win，叫做滤器（filter）。这跟对NN 4.x隐藏样式有类似之处，只不过这是针对其他浏览器隐藏，IE 5.x/Win自己可识别。不过这许多额外的CSS文件。Tantek Çelik称之为Band Pass Filter.

IE 5.0x/Win的filter：

```css
@media tty {
    i{content:"\";/*" "*/}}; @import 'ie50winbandpass.css'; {;}/*";}
}/* */
```

IE 5.5x/Win的filter：

```css
@media tty {
    i{content:"\";/*" "*/}}@m; @import 'ie55winbandpass.css'; /*";}
}/* */
```

这样，就可以将针对IE 5.0x/Win的CSS写到ie50winbandpass.css中了，同理，IE 5.5x/Win的则是ie55winbandpass.css。需要了解工作原理等更多东西，可以访问[http://tantek.com/CSS/Examples/][4]。

还有许多同样会在IE6中出现的问题，我们将在IE6部分中讨论。另外，如果您已经没有老机器或者老系统来跑这两个浏览器，可以到[http://browsers.evolt.org/?ie/32bit/standalone][5]中下载绿色版。

那么，我们要来讨论另外一个常被我们忽略的IE 5.x浏览器了，没错，Mac OS上的IE。

## IE 5.x/Mac

同时期，IE5.x/Mac（前面提到的Tantek Çelik领头开发的）是最先进的浏览器，它的Tasman引擎支持CSS 1, HTML 4.01, PNG 1.0，同时还支持在2000年看来十分先进的子选择器（child seletor）和相邻选择器（sibling selector）。就是说，它也有本身的毛病。

IE 5.x/Mac的问题主要体现在定位元素，浮动，不必要的滚动条，过宽的元素，不正确的覆盖，奇怪的边界等的处理上。见附表。

对IE 5.x/Mac隐藏CSS，最有名的hack叫做注释反斜杆hack（[Commented Backslash Hack][6]）：

```css
#isnotMacIE5 { display: none;  }
#isMacIE5 { display: block; background-color: #060; color: #fff; }

/* commented backslash hack v2 \*/
#isnotMacIE5 { display: block; background-color: #060; color: #fff; }
#isMacIE5 { display: none; }
/* end hack */
```

IE 5.x/Mac碰到了反斜杆（\\），就将\*号转义（escape），从而直到碰到下一条注释才认为注释结束，把一整段都当作注释对待，达到隐藏目的。

当然，还有hack能够让你的样式（表）只对IE 5.x/Mac**显示**。由Tantek Çelik开发，[Douglas Bowman][7] [文档][8]的[IE5/Mac Band Pass Filter][9]：

```css
/\*\\\*//\*/
@import "ie5mac.css";
/\*\*/
```

这反转了Commented Backslash Hack，对IE 5.x/Mac显示了ie5mac.css，而其他浏览器会视而不见。如果您需要为IE 5.x/Mac设计，IE5/Mac Band Pass Filter将是最有用的工具。
IE5.x/Mac的臭虫及解决方案一览表

<table summary="IE5.x/Mac的臭虫及解决方案">
    <caption>IE5.x/Mac的臭虫及解决方案一览表</caption>
    <thead>
        <tr>
            <th>臭虫</th>
            <th>解决方案</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
            <p>绝对定位到屏幕边缘右/下的元素导致垂直/水平滚动条。</p>
<pre><code>
div {
    position: absolute;
    right: 0;
    bottom: 0;
}
</code></pre>
            </td>
            <td>
                <p>取消被隐藏的15px边界。</p>
<pre><code>
div {
    right: 15px;
    margin-right: -15px;
    bottom: 15px;
    margin-bottom: -15px;
}
</code></pre>
            </td>
        </tr>
        <tr>
            <td>
                <p>快捷（shorthand）边界不会居中一个表格。</p>
<pre><code>
table {
    margin: 0 auto;
}
</code></pre>
            </td>
            <td>
                <p>使用完整（longhand）性质来设置边界。</p>
<pre><code>
table {
    margin-left: auto;
    margin-right: auto;
}
</code></pre>
            </td>
        </tr>
        <tr>
            <td>
                <p>赋予<code>background-image</code>的元素背景图片总是被边框覆盖。</p>
            </td>
            <td>
                <p>使用另外的元素来设置边框，如果要求边框必须在<code>background-image</code>的外围。</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>使用<code>overflow: auto</code>会导致页面扩展到能够适应元素的内容，就算不溢出，还是会产生滚动条。</p>
            </td>
            <td>
                <p>总是设置需要<code>overflow: auto</code>的宽度和高度。</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>元素的<code>clear</code>会继承设置了<code>clear</code>值的父级元素的值，就算该元素定义了<code>clear: none</code>也无效。</p>
            </td>
            <td>
                <p>目前尚未解决方案</p>
            </td>
        </tr>
    </tbody>
</table>

预告：第二部分讨论IE6，第三部分讨论基于Gecko的浏览器（Mozilla Suite, Firefox, Camino等），Safari和Opera。

[0]: http://www.bluerobot.com/web/css/fouc.asp
[1]: http://tantek.com/
[2]: http://technorati.com/
[3]: http://microformats.org/
[4]: http://tantek.com/CSS/Examples/
[5]: http://browsers.evolt.org/?ie/32bit/standalone
[6]: http://www.sam-i-am.com/work/sandbox/css/mac_ie5_hack.html
[7]: http://stopdesign.com/
[8]: http://www.stopdesign.com/examples/ie5mac-bpf/
[9]: http://tantek.com/log/2004/07.html#ie5macbandpass