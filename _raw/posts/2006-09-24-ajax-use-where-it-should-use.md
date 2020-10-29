# Ajax, 用该所用

我经历的一个项目倒下了。倒不是因为技术落后，反而是因为技术太过先进——整站，所有前端页面都是 Ajax 处理而产生的。

我们现来看看 Ajax 是啥（汗，你以为读者是白痴咩～），根据发明人 [Jesse James Garrett (jjg)][0] 在 [adaptive path][1] 的一篇文章 [Ajax: A New Approach to Web Applications][2] 中定义，Ajax 由几种蓬勃发展的技术以新的强大方式组合而成。Ajax 包含：

> - 基于 XHTML 和 CSS 标准的表示；
> - 使用 Document Object Model 进行动态显示和交互；
> - 使用 XMLHttpRequest 与服务器进行异步通信；
> - 使用 JavaScript 绑定一切。

可以看到，这是一种以 JavaScript 为核心的技术，从广义上说，除了服务器端技术，剩下的都是 Web 标准。

但上一句话并不是重点，做 Web 标准的读者不用窃喜 XD。

我们来了解一下 Jesse James Garrett 的背景，他著有一本有名的书，叫做 [The Elements of User Experience - User-Centered Design for the Web][3]. 啥？**User Experience**? 没错，jjg 是一位资深用户体验专家。

我没有深入调查过，但我身边的人，接触并运用 Ajax 的清一色都是程序员。我对程序员当然没有什么成见，但术业有专攻，程序员看到这个 Ajax 定义，理所当然是从技术上入手，为新技术滥用 Ajax 不亦乐乎无法自拔而不自知，为 Ajax 而 Ajax，忽略了非技术层面的东西，比如，**用户体验**和**亲和力**（accessiblity）。

所以我认为 jjg 对于他自己发明的 Ajax 的定义是不及格的。实际上，按照 jjg 本来的意思，技术也是为用户体验服务的。[About Face 2][4] 说，Web 的出现让交互设计至少倒退十年，Ajax 的出现实际上为了弥补这十年而生，让 Web 界面操作可以一样或至少接近「正常软件」的操作方式。但 jjg 的定义对技术层面的东西阐述过了头，缺乏用户体验背景的程序员只能依瓢画葫芦，为 Ajax 而 Ajax。

所以我觉得，哪里该用 Ajax，怎么使用 Ajax，如何才能做到符合用户体验的需求，这是产品/策划的事情。事实是很悲哀的，产品认为这属于技术问题（至少我身边所碰到的情况都这样）而不加过问。我们可以看到很多大举 2.0 旗帜的网站，**看起来很酷，用起来很苦**。漫长的等待没有提示，用户未知情的情况下刷新内容，鼠标一不小心就会犯错，不能后退（这倒是普遍问题），不能撤销等等，很多用户患上了**2.0 恐惧症**。

由于我实际上对用户体验并没有研究，不好夸大其词，不好妄加评论，上面只是我的个人想法，有错的话各位看官一定要批评指正，一起学习，共同进步。我着重谈谈亲和力的问题。

众所周知，JavaScript 不是什么时候都能用。老旧的浏览器，高安全的环境（比如银行，或者用户设置），文本浏览器（如 lynx, w3m），屏幕阅读器，手机浏览器等等，很多场景都限制了 JS 的发挥与使用。对于正常人，你可以觉得无所谓，反正现在换个或者升级浏览器也是轻而易举的事情，但是，很多障碍人士，却只有很少的选择。**Web 2.0 并不意味不能用**。

所以我们必须采取适度降级(graceful degradation)的策略。对于一些非必须由 Ajax 驱动产生内容的前端页面（比如分页，提示内容的展示），我们就可以采取此策略。我们必须保证，在没有 JS 的情况下，这些内容可以使用传统（Web 1.0?）的方式来交互产生。这是保证 Web 具备亲和力的基础。有此保证后，我们就可以采取逐步增强(progressive enhancement)的策略来加入 Ajax，使用 JS 来控制前端的交互，达到用户体验的目的。实际上，读者的疑问可能就在这，如何能够保证适度降级的基础上能逐步增强？实践证明，Unobtrusive Javascript(不冒昧的 Javascript? 天，这该怎么翻译？)的思想能够帮助我们做到。何谓 Unobtrusive？那就是说，在没有 JS 的情况下，网页内容依然能够访问（accessible）。概念很抽象，那么我们举个例子说明吧。假如网页有几块内容：

```html
<a href="#a">Show a</a> <a href="#b">Show b</a> <a href="#c">Show c</a>
<div id="a">a</div>
<div id="b">b</div>
<div id="c">c</div>
```

我们需要按照用户的点击展示每一块内容。通常的做法是，我们会给 `a` 标签加上占位符，然后写上 `onclick=""` 之类的代码，在某些 `div` 加上 `style="display: none;"`，让其在默认情况下不可见，然后再让 JS 操纵其可见性。这是一种不好的，非 Unobtrusive 的做法。

Unobtrusive 的做法是，我们需要让 `a` 有意义，而不是只为 JS 而存在。`a` 应该依照实际情况指向一个实际连接，或者跳到本页的一块内容。我们应该讲 JS 完全分离出来，不要在 HTML 混杂 `onclick` 之类的事件代码。而且，我们也不应该在默认情况下隐藏内容，应该在页面载入后交给 JS 来控制，这样，用户在没有或禁止掉 JS 的时候，她/他还有机会能够看到所需的内容。这是一个最简单的 Unobtrusive 例子。

所以，结论是，我们要建设具备亲和力的 Web 2.0 的网站，graceful degradation, progressive enhancement, Unobtrusive 是基础。当然，某些完全依靠 Ajax 的网站，比如 Google Maps，得另外讨论。我们可以看到，即使是 Gmail，它也有一个非 Ajax 版本备用。当然，我的意思不是每个网站都应该开发、维护两个以上的版本，我们应该，在保证亲和力的基础上，才逐步 Ajax 化，而且 Ajax 应该是用在构建一种新的交互方式，用在用户体验上。

[0]: http://jjg.net/
[1]: http://www.adaptivepath.com
[2]: http://www.adaptivepath.com/publications/essays/archives/000385.php
[3]: http://www.jjg.net/elements/
[4]: http://www.dearbook.com.cn/book/viewbook.aspx?pno=TS0029148
