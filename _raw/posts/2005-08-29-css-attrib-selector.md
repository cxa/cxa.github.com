---
title: 更富弹性的CSS选择器——属性选择符
---
选择器，或者选择符，selector，是构建整个CSS的基础。

选择器，让我们可以样式化(X)HTML的元素（`h1`, `p`, `ul`, `ol`等）或者XML的元素（`BOOKTITLE`, `QUOTE`等，具体看XML的元素）；可以样式化id（`#header`, `#content`, `#foote`r等）；可以样式类（`.warning`, `.more`等）；可以样式化伪元素（`:first-letter`,` :first-line`, `:before`, `:after`等）；可以样式化伪类（`:link`, `:visited`,` :focus`, `:hover`, `:active`, `:first-child`, `:lang()`等）；可以样式化伪元素（`:first-letter`,` :first-line`, `:before`,` :after等）……`。

相信我上述所列举的选择器中，有几个你没有见过，就算见过就不知道怎么用，比如`:first-child`, `:lang()`，我无权责怪你，但希望你能冲出IE的束缚，即使在支持上IE缺席，我们还是可以学习了解更多更强大的CSS选择器，这不仅对支持的浏览器有好处，对IE也有好处，比如可以做针对IE的过滤器（filter），想想我们现在的web世界，全靠hacks , tricks and filters来应付。不是有本书叫做：[CSS Hacks and Filters : Making Cascading Stylesheets Work][0]么，呵呵。

针对CSS 2.x的这些不常用（还是那句话，IE支持的缺席使它们变得寂寞）但十分强大灵活得选择器，我将逐步讲述它们，今天，我要写的是，属性选择器，Attribute Selectors。

实际上，你不应该对属性选择器感到陌生，从本质上说，id跟类选择器其实就是属性选择器，只不过是选择了id或者类的值（value）而已。

属性选择器的格式是元素后跟中括号，中括号内带属性，或者属性表达式（不知道描述是否正确，自创的词），比如`h1[title]`, `h1[title="Logo"]`等，你可以从我下面的论述中看到4种具体形式。

## 简易属性选择器

只顾其名不顾其值，这是简易属性选择器的特点。

`h1[class] {color: silver;}`将会作用于任何带`class`的`h1`元素，不管`class`的值是什么。所以`<h1 class="hoopla">Hello</h1>`、`<h1 class="severe">Serenity</h1>`、`<h1 class="fancy">Fooling</h1>`的`h1`都会受到这条规则的影响。

当然，这个"属性"不仅仅是class或者id，可以是该元素所有合法属性，比如`img`的`alt`，这样`img[alt]{css declarations here;}`将会作用于任何带有`alt`属性的`img`元素。那么`a[href][title] {font-weight: bold;}`呢？聪明的你一定已经知道，这会作用于**同时**带`href`和`title`属性的`a`元素，比如`<a href="http://www.w3.org/" title="W3C Home">W3C</a>`。

## 精确属性值选择器

id和类本质上就是精确属性值选择器，没错，`h1#logo`等于`h1[id="logo"]`。如前所述，我们不要局限于id或者class，我们可以使用任何属性！例如`a[href="http://www.w3.org/"][title="W3C Home"] {font-size: 200%;}`将会作用于`<a href="http://www.w3.org/" title="W3C Home">W3C</a>`。

## 部分属性值选择器

如其名，只要属性值部分匹配（这里的部分，实际上要匹配整个单词）就会作用于该元素。让我们来看个例子：

    <p class="urgent warning">When handling plutonium, care must be taken to avoid the formation of a critical mass.</p>

`p[class~="warning"] {font-weight: bold;}  
`和`p[class~="urgent"] {font-weight: bold;}中任何一条都可以让这个``p`的字体变粗。

该选择器十分有用，比如你要样式化插图，其`title`中都含字符串"Figure"，如` title= "Figure 5：xxx说明"`，则你可以使用`img[title~="Figure"] `。

需要注意的是，如我第一句就强调的，你需要匹配的是整个单词，`img[title~="Figure"] `不会匹配` title= "Figure5：xxx说明"`。

另外，我做了个小小的测试，你把例子中的"Figure"改成"插图"，把`img[title~="Figure"] `改成`img[title~="插图"] `，在Firefox中依然可以匹配，不管编码（encoding）是GB2312还是UTF-8。看来CSS对中文的支持还不赖。

## 特殊属性选择器

有点怪，这个选择器。它是这样工作的，嗯，举个例子比描述更容易。

`*[lang|="en"] {color: white;}`，这条规则（rule）将会选择属性`lang`的值`en`或者`en-`打头的元素。就是说，它可以匹配`<h1 lang="en">Hello!</h1>`、`<p lang="en-us">Greetings!</p>`和`<div lang="en-au">G'day!</div>`而不匹配`<p lang="fr">Bonjour!</p>`和`<h3 lang="cy-en">Jrooana!</h3>`。

说完了，呼……CSS因你而强大，好好练吧。

参考文献：[Cascading Style Sheets: The Definitive Guide, 2nd Edition][1]。

[0]: http://www.amazon.com/exec/obidos/ASIN/0764579851/102-5724850-6955352
[1]: http://www.amazon.com/exec/obidos/ASIN/0596005253/qid=1124114266/sr=2-2/ref=pd_bbs_b_2_2/102-5724850-6955352
