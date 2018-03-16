---
title: 与臭虫为友——浏览器补救办法，臭虫以及解决方案（第二部分）
---
## IE 6

这个仅运行在Windows平台上的浏览器对许多CSS设计者/开发者来说简直就是毒药。自2001年发布以来，它的Trident引擎和CSS解析器没有升级过。跟Windows平台上的IE 5.x（首次发布于1999年）相比，最大的差别在于引进Doctype开关并在"标准模式"(Standards Mode)下修正了大量CSS1的臭虫。

因为它的引擎自首次发布以来都没有升级过，所以关于它的臭虫和解决方案的文档都基本完善了，您可以从[http://www.positioniseverything.net/explorer.html][0]找到更详细的信息。

只对IE 5+显示所需样式，可以使用[Tan Hack][1]，或者，也可以称之为\* html Hack。

```css
div {
    color: green;
}
* html div { /* IE5+将会使用它 */
    color: red;
}
```

在(X)HTML中，`html`是根元素（即老大，它上面没有父元素了）。Tank Hack实际上是要选择一个元素（在这个例子中，是`div`），它属于`html`的后代，而这个`html`又是任何元素（您所看到的型号\*）的后代。在理论上，这是不可以的，所以解析正确的浏览器都会忽略`* html`，但是似乎IE 5+还有实现了某些在`html`的父元素（是什么我们不得而知），从而讽刺地，意外地让我们可以解决很多难题，感谢Bill，大家面向太平洋方向鞠一躬……

至于对IE 5+隐藏样式，那真是太简单了，使用CSS2中的子选择符，相邻选择符，属性选择符等，IE都不可识别（CSS规范中也有说明，对于不可识别的都忽略，IE也有严格遵循规范的时候），从而忽略整条规则。比如：

```css
body > #content {...}
div + #content {...}
div[id="content"] {...}
```

但是我并不建议您这么做，因为您要承担浏览器升级的风险。IE7已经支持这些"先进"的选择符，所以我不建议对过时的非兼容浏览器使用"先进"选择符来做修补工作。

当我们使用CSS hack和filter的时候，如果可以，仅对老式/过时/废弃的浏览器使用，不要对当前版本的浏览器使用，以免升级时失效。另外，我也希望使用hack和filter能够尽量合法（valid），能通过CSS校验器的检查。所以对于星号\*/下划线_加属性（property，也叫性质），还有在属性和值之间添加空注释的非法hack，我不在这里提了，我也不建议你去查。针对这个问题，我建议大家可以看看[CSSZenGarden][2]创始人[Dave Shea][3]的[Stop Hacking, or be Stopped][4]。

那么，我们来列一下IE5+/Windows主要臭虫及解决方案，我希望在使用这个方案的时候，能考虑一下前面提到的[Dave Shea][3]和我的想法。

<table summary="IE5+/Win的臭虫及解决方案" width="96%">
    <caption>IE5+/Win的臭虫及解决方案一览表</caption>
    <thead>
        <tr>
        <th>臭虫</th>
        <th>解决方案</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <p>在一个液态的（liquid）的盒内，跟在一个浮动的元素后的内容会莫名其妙消失（只有IE6会发生）。学名<a href="http://web.archive.org/web/20100218144305/http://www.positioniseverything.net/explorer/peekaboo.html">Peek-a-boo Bug</a>.</p>
            </td>
            <td>
                <p>给该盒定义<code>height: 1%;</code>（但要注意对IE 5.x/Mac隐藏）。</p>
    <pre><code>/*\\*/ * html div {
        height: 1%;
    }/**/</code></pre>
            <p>这个就是有名的Holly Hack（救世hack？神圣hack？）。它通过给一个块设置一个十分小的高度值（1%几乎成了通用准则）来工作。但IE 5+/Win能够依据内容来扩展这个盒子到足够的高度，就是说，把<code>height</code>当作<code>min-height</code>来用。在大部分情况下，Holly Hack能够使IE5+/Win按照实质的行为来表现。</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>在列表元素（<code>dl</code>, <code>ul</code>, <code>ol</code>），定义在相对或浮动定位的块级元素的背景会消失。学名<a href="http://web.archive.org/web/20100218144305/http://www.positioniseverything.net/explorer/ie-listbug.html">Disappearing List-Background Bug</a></p>
            </td>
            <td>
            <p>给列表元素定义相对定位（但同样注意对IE5.x/Mac隐藏，因为它没有这个虫虫——相同名字，表现却咋这么不同呢？）</p>
<pre><code>/*\\*/ * html ul {
    position: relative;
}/**/</code></pre>
            <p>尽管不是一个很有技术含量的hack，但使用<code>position: relative;</code>能够让你从IE5+/Win的大部分困境中解脱出来。同时很多场合下你也不愿意使用，因为它产生的块（block）或许是你不需要的，所以还是省着点用吧。</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>浮动元素内某些连接hover时，该元素的底部会被砍掉。学名<a href="http://web.archive.org/web/20100218144305/http://www.positioniseverything.net/explorer/guillotine.html">Guillotine Bug</a></p>
            </td>
            <td>
                <p>对包含元素使用Holly Hack.</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>一个相对定位元素内的绝对定位元素，其内容超出页面底部时不会触发滚动条。学名<a href="http://web.archive.org/web/20100218144305/http://www.positioniseverything.net/explorer/unscrollable.html">Unscrollable Content Bug</a>.</p>
            </td>
            <td>
                <p>对包含元素使用Holly Hack.</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>当多个浮动的元素彼此跟随，中间加注释的时候，最后一个浮动元素内的文本偶尔会复制到最下面去。学名<a href="http://web.archive.org/web/20100218144305/http://www.positioniseverything.net/explorer/dup-characters.html">Duplicate Characters Bug</a>.</p>
            </td>
            <td>
                <p>不要给浮动元素设置多宽度，使其不会到达包含元素的底部，或者对最后一个元素设置<code>margin-right: -3px;</code>或者更小。</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>浮动元素相同浮动方向上的边界是所设置值的两倍。</p>
<pre><code>div {
    float: left;
    margin-left: 100px;
}</code></pre>
            </td>
            <td>
                <p>为浮动元素设置<code>display: inline;</code>。注意：根据<a href="http://web.archive.org/web/20100218144305/http://www.w3.org/TR/CSS21/visuren.html#floats">W3C的建议</a>，除非值是<code>none</code>，否则不应该在浮动元素上使用<code>display</code>。</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>一个块级元素内的文本跟浮动元素之间有一个3像素的间隔。学名<a href="http://web.archive.org/web/20100218144305/http://www.positioniseverything.net/explorer/threepxtest.html">Three Pixel Text-Jog Bug</a>.</p>
            </td>
            <td>
                <p>对块级元素使用Holly Hack.</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>内容中包含未达到底部的浮动元素，清除（clear）浮动的块级元素的<code>padding-top</code>会加倍。</p>
            </td>
            <td>
                <p>给该清除浮动的元素使用Holly Hack.</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>相对定位容器内连接的<code>background-image</code>失效。</p>
            </td>
            <td>
                <p>给连接相对定位。</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>一个有<code>padding</code>的盒子内嵌套一个有<code>margin</code>的盒子，外围盒子的<code>padding-top</code>和里面盒子的<code>margin-top</code>不会相加。</p>
            </td>
            <td>
                <p>里面盒子的<code>margin-top</code>设置双倍值。</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>以下划线开头的class和id会被忽略。</p>
            </td>
            <td>
                <p>防止以下划线开头命名class和id.</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>一个绝对定位元素的<code>left</code>值依据容器内第一个元素的左边缘计算，而不是容器本身。</p>
            </td>
            <td>
                <p>根据实际情况调整<code>left</code>的值或者绝对定位容器。</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>为<code>table</code>设置margin会被忽略（IE6忽略所有，IE5.x/Win只忽略<code>margin-top</code>和<code>margin-bottom</code>）。</p>
            </td>
            <td>
                <p>给<code>table</code>外包一个<code>div</code>，然后对该<code>div</code>设置<code>margin</code>.</p>
            </td>
        </tr>
    </tbody>
</table>

你恨IE6不？它可以占据我这么多版面独成一部分……你恨IE不？前两部分都在写它们……实际上我们的第三部分会非常少，精华都在这一部分了。

[0]: http://www.positioniseverything.net/explorer.html
[1]: http://www.info.com.ph/~etan/w3pantheon/style/starhtmlbug.html
[2]: http://csszengarden.com
[3]: http://www.mezzoblue.com/
[4]: http://www.thinkvitamin.com/features/css/stop-css-hacking
[5]: http://www.positioniseverything.net/explorer/peekaboo.html
[6]: http://www.positioniseverything.net/explorer/ie-listbug.html
[7]: http://www.positioniseverything.net/explorer/guillotine.html
[8]: http://www.positioniseverything.net/explorer/unscrollable.html
[9]: http://www.positioniseverything.net/explorer/dup-characters.html
[10]: http://www.w3.org/TR/CSS21/visuren.html#floats
[11]: http://www.positioniseverything.net/explorer/threepxtest.html
