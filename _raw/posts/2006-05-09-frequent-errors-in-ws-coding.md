# 网页标准化编码中的常见错误

其实，这个文章你不必花精力去看，因为，假如你给 Firefox 装上 [Html Validator][0] 插件，在查看源代码的时候，它会忠实地指出你的错误所在。

结合我的工作经验，我想把我经常碰到的一些常见错误分享，引以为戒 :)。

**Doctype 前除了 xml 声明（`<?xml version="1.0" encoding="UTF-8" ?>`）外不要有任何东西，注释也不行。**IE 6-甚至连 xml 声明都不能要，否则会导致浏览器触发 quirksmode。对于我们在做网页的过程中，可能不会犯这样的错误。但交由程序员开发时，他们可能会在 html 文件中输出一些东西，当这些东西在 Doctype 之前，就会出现问题。如果你在 IE 中发觉你的网页不对劲，请看看源代码，是否 Doctype 前是否有乱七八糟的编码 :)。

**转义，请转义！关闭，请关闭！**<、\>、&是必须转义的。尤其是 URI 中的&很容易忘掉转义。至于关闭 xhtml 标签，这个错误太常见了，尤其是没有关闭标签的 `input`，`img`，`br`，`hr` 等。说到这，感概一下现在的浏览器，对 xhtml 的代码实在太宽容了，容许你犯很多很多的错误。但是 Opera for mobile 8+似乎就没有那么宽容了，如果你声明了 xhtml 的 Doctype，无论是 xhtml transitional, strict, frameset 还是 xhtml 1.1，它都严格以 `applications/xhtml+xml` 的 MIME-Type 来执行。这些不转义的实体，是造成 xml 非良构（not well-form）的常见原因。这样会导致不是那么宽容的浏览器（Opera for mobile 8+）拒绝处理（render）页面，直接输入源代码。

**别忘了 `type`。**相信大家在写 `style` 时都会加上 `type="text/css"`。但是写 js 时，我没有看到有多少人能够给它加上 `type="text/javascriot"`。根据标准的建议，js 的正确写法是 `<script type="text/javascript"...>`。为了兼容性，我认为最佳的写法是 `<script language="JavaScript" type="text/javascript"...>`（发现有人懒到连 `language` 都不要 ||-\_-）。你想想自己的编码，是不是忘了 `type` 呢？回去加上吧。

**请给标记写上必须的属性。**最常见的错误是，`img` 忘了或者压根不加 `alt` 属性。每个标签必须的属性有哪些？哦，God，我还真记不住，交给 Html Validator 告诉你好了。

暂时总结这些。这是一篇会随时更新的 blog，欢迎补充 ^\_^。

[0]: http://users.skynet.be/mgueury/mozilla/
