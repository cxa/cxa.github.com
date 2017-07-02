---
title: 未知高度的非表格垂直对齐
---
非已知高度的垂直对齐的条件：

* 表格单元格
* 行内块（`inline-block`）

第一个比较好理解，第二个很多人可能会忽略。比如，很多人在图片与文本混排的时候想让图片相对于文本垂直居中除了用IE的私有特性` valign="absmiddle"`别无他法。记住，默认下图片就是属于`inline-block`，你只需简单的`img {vertical-align:middle;}`即可。

那么，我们进入主题。现在我们由于某些特殊需要两个并排的`div`想实现垂直居中。如前所述，`div`非表格，但是当代的浏览器中除了IE都支持`display:table-cell`。恰好，IE支持`dispaly:inline-block`，那么我们就用两种方式为当代浏览器实现非表格的垂直居中，殊途同归。

HTML如下：

    <div id="div1">blah blah...看见我居中了吗？</div>
    <div id="div2">
    	<p>blah blah...</p>
    	....
    </div>

CSS如下：

    #div1, #div2 {display:table-cell; *display: inline; zoom:1; vertical-align:middle;}

我们来重点分析CSS。如您所知，`*property`是一个只有IE（包括IE7）才能解析的hack. 那么为何是`inline`而不是`inline-block`呢？这跟IE的变态工作方式有关，具体不深究。在此你只需知道加上`zoom:1`后，就等价于`inline-block`。另外，如果是`a`, `span`等非`block`的元素，则按正常方式`display:inline-block`。

OK, 既然是tip, 废话不宜多，自己看例子：[http://realazy.com/lab/div-valign/][0].

**Update:**严格地说，IE确实不支持`inline-block`，这就是为什么直接赋予`div`会不生效的问题。准确地说，在IE中，为`inline`赋予`inline-block`会使IE触发hasLayout，从而获得部分`inline-block`的表现。请参考：[http://cn.autos.yahoo.com/as2007/sub1/index.html ][1].

[0]: http://realazy.com/lab/div-valign/
[1]: http://cn.autos.yahoo.com/as2007/sub1/index.html
