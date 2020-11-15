# 也谈 Doctype

目前有一堆 Doctype 可供我们选择：

## HTML

- **HTML 4.0 Strict**: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0//EN" "http://www.w3.org/TR/REC-html40/strict.dtd">`
- **HTML 4.0 Transitional**: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">`
- **HTML 4.0 Frameset**: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">`
- **HTML 3.2**: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">`
- **HTML 2.0**: `<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML//EN">`

## XHTML

- **XHTML 1.0 Strict**: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">`
- **XHTML 1.0 Transitional**: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">`
- **XHTML 1.0 Frameset**: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">`
- **XHTML 1.1**: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">`

说明一下，XHTML 1 就是 HTML 4.01 的 XML 化，是一种不向前兼容的格式，未来的 XHTML 2 也不会向后兼容。汗……这是一个很可悲规范。

那么应该选择哪个？我相信很多人，尤其是接触了网页标准（Web Standards）的人，会毫不犹豫地选择 XHTML 1.0 Transitional。这是一股趋势，这是一股潮流，暗示着，嘿嘿，伙计，看见没，我们的网站使用最新技术构建了……

这里有一个[很有趣的统计][0]，使用 XHTML 1.0 Strict 和 Transitional 的占绝大多数，且对半开。那么，这个世界就那么美好了吗？

我们先来看看 [W3C 的建议][1]，总结出下表：

<table summary="This table summarizes recommendation for media type labeling of HTML and XHTML documents." class="mime_types">
  <caption>Media types summary for serving XHTML documents</caption>
  <thead>
    <tr>
      <th>Media Type</th>
      <th>text/html</th>
      <th>application/xhtml+xml</th>
      <th>application/xml</th>
      <th>text/xml</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>HTML 4</th>
      <td>SHOULD</td>
      <td>MUST NOT</td>
      <td>MUST NOT</td>
      <td>MUST NOT</td>
    </tr>
    <tr>
      <th>XHTML 1.0 (HTML Compatible)</th>
      <td>MAY</td>
      <td>SHOULD</td>
      <td>MAY</td>
      <td>MAY</td>
    </tr>
    <tr>
      <th>XHTML 1.0 (other)</th>
      <td>SHOULD NOT</td>
      <td>SHOULD</td>
      <td>MAY</td>
      <td>MAY</td>
    </tr>
    <tr>
      <th>XHTML Basic</th>
      <td>SHOULD NOT</td>
      <td>SHOULD</td>
      <td>MAY</td>
      <td>MAY</td>
    </tr>
    <tr>
      <th>XHTML 1.1</th>
      <td>SHOULD NOT</td>
      <td>SHOULD</td>
      <td>MAY</td>
      <td>MAY</td>
    </tr>
    <tr>
      <th>XHTML + MathML</th>
      <td>SHOULD NOT</td>
      <td>SHOULD</td>
      <td>MAY</td>
      <td>MAY</td>
    </tr>
  </tbody>
</table>

前面说到，XHTML 1 实际上是 HTML 4.01 的 XML 化。即时看起来，写起来，用起来都很像，但这是两种不同的规范。XHTML 的 MIME-TYPE 应该是 `application/xhtml+xml`，而 HTML 应该是 `text/html`。两者有何不同，简单的说，`application/xhtml+xml` 属于 XML，所以行为遵循一切 XML 规范，最重要的是良构（Well-Formed）这一点。

除了 XHTML 1.0 Transitional 和 Frameset，我们可以看到，XHTML 1.0 Strict 和 1.1 都**SHOULD**使用 `application/xhtml+xml`。然而，我们可以看到，前面提到的那个统计，并没有多少个网站使用 `application/xhtml+xml`，可以说他们是扯虎皮做大旗而已（如果您有心查看一下本 blog 的源码，您会发现我也是），它们非良构的内容依然可以通过支持 `application/xhtml+xml` 的浏览器（如 Firefox, Opera）来展现，因为它们本质上还是 `text/html`，而 `text/html` 并不需要良构。

可以看到，XHTML 1.0 Transitional 的地位很暧昧，它的**Transitional **使得其**MAY** `text/html`，**SHOULD** `application/xhtml+xml`。也就是说，怎么处理，实际上交由客户端（client side）来决定。在我所见到的桌面浏览器中，它们都毫不犹豫地选择 `text/html`，这跟它们一贯的**宽容**风格保持一致。

但是很不幸的是，就有这么一个浏览器，Opera for mobile，从 8.0 开始，凡是声明了 XHTML 的 Doctype，它都一律以 `application/xhtml+xml` 来处理。所以，你那不良构的网站，只好在它上面显示出错信息。

所以，推荐使用 XHTML 1.0 Transitional，是鼓励你从 HTML 向 XHTML 转化，且保持过渡性。但过渡性并不代表你就可以不重视 XML 的良构。

实际上，我们并没有能够发现 XHTML 1.0 Transitional 跟 HTML 4.01 Strict 有何不同，除了一个 `target`，一些过时的表现标签和属性（attribute）。只要我们在 HTML 中不写作那些 XHTML 中不存在的标签和属性，我们实际上就是在写 XHTML 1.0 Transitional，对我们并没有什么影响，什么 XML 的优越性完全不能在 XHTML 1.0 Transitional 中体现出来，所以与其让 Opera for mobile（或许还有其他变数）不能工作，还不如选择 HTML 4.01 Strict。在这点上，[456BereaStreet.com][2] 做出了一个十分不错的选择。当然，如果您能保证你的 XHTML 1.0 Transitional 百分百良构，使用它是一个更佳的选择。然后，请你告诉我，世界上，使用了 XHTML 1.0 Transitional 的网站，**非首页**的其他页面能有多少个是能够通过验证的？

结论是，如果你没有勇气保证整个站点百分百良构，请使用 HTML 4.01 Strict；如果您有勇气保证整个站点百分百良构，您可以直接选择 XHTML 1.1，像我所做的那样。

**推荐阅读：**

- [使用正确的 MIME 类型伺服 XHTML][3]
- [正确使用 XHTML 的冒险][4]
- [HTML vs. XHTML on standards compliant websites][5]

[0]: http://www.elementary-group-standards.com/archives/site-standards/why-xhtml.html
[1]: http://www.w3.org/TR/2002/NOTE-xhtml-media-types-20020801/
[2]: http://www.456bereastreet.com

[3]: https://www.google.com/search?q=使用正确的 MIME 类型伺服 XHTML&ie=UTF-8&oe=UTF-8
[4]: https://www.google.com/search?q=正确使用 XHTML 的冒险&ie=UTF-8&oe=UTF-8
[5]: http://www.456bereastreet.com/archive/200606/html_vs_xhtml_on_standards_compliant_websites/
