# HTML/XHTML 声明语言指南

来自 [WaSP][0] 的 [Best Practices for Declaring Languages in HTML and XHTML][1]，这是在 HTML/XHTML 声明语言的几条指南，我简单翻一下，作为 [在 XHTML 和 HTML 中使用语言信息][2] 的补充。

何时何处如何在 HTML/XHTML 中声明一种或多种语言？根据 [GEO group][3] 的建议，声明语言的一些准则如下：

- 一定要为页面声明默认语言，使用 `html` 标签（tag）。除非页面的主要语言超过两种。
- 使用 `lang` 和/或 `xml:lang` 属性（attribute）来指出语言的变化。比如 `span xml:lang="zh-TW"`。
- 不要用 `Content-Language` 来声明页面的默认语言，也不要用语言属性来声明主要语言 metadata。
- 不要在文档的 `body` 标签上声明语言。
- HTML 中只用 `lang`，伺服为 `text/html` 的 XHTML 1.0 使用 `lang` 和 `xml:lang`，而伺服为 XML 的则只需使用 `xml:lang`。
- 如果属性值跟元素内容的语言不同，可以考虑使用 russian doll（一种 XML 组织模式？我也不懂）来处理。
- 对于一个多语言的页面，由你来决定是否在 `html` 中声明一种语言，或者不要定义它。

另外，[456 Berea Street][4] 建议不要在 `DOCTYPE` 中更换语言，即不要改变//EN。

[0]: http://www.webstandards.org/
[1]: http://www.webstandards.org/buzz/archive/2005_09.html#a000558

[2]: https://www.google.com/search?q=在 XHTML 和 HTML 中使用语言信息&ie=UTF-8&oe=UTF-8
[3]: http://www.w3.org/International/geo/
[4]: http://www.456bereastreet.com/archive/200509/declaring_languages_in_html_and_xhtml/
