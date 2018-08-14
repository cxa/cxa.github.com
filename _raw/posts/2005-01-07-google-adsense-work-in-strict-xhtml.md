# 如何使Google的广告在严格的XHTML中工作

我开始使用XHTML 1.1的时候，发现Google的AdSense广告在IE上正常，在Firefox和Opera中则一片空白，纳闷，对着代码检查了良久，终究无法得知问题于何处。幸亏还有Google，我终于找到了解决方案。我也不能不说，推广标准，还真的是任重道远，连Google都无法保证它的代码会在任何的 (X)HTML上工作。

这个解决方案就是这篇今天出炉的翻译文章：[使Google广告AdSense在XHTML中工作][0]，使用PHP来实现。对于ASP，相信难不倒聪明的你（呵呵，我不会ASP，是在对不起了，要怪，你怪原作者好了，谁叫他不写ASP，嗯……）。

我原本打算参考这篇文章，结合Ian Hickson的[Why document.write() doesn't work in XML][1]来写一篇原创文章，无奈实在是太懒，或者文笔不行，又或者会遥遥无期，还是直接翻译出来给大家一睹为快，尽快解决碰到的问题吧。

这其实是一个JavaScript的问题，假如你发现你在XHTML 1.0 Stric或者XHTML 1.1中无法使用JavaScript的调用，或许，这篇文章对你也有启示。

[0]: https://www.google.com/search?q=使Google广告AdSense在XHTML中工作&ie=UTF-8&oe=UTF-8
[1]: http://ln.hixie.ch/?start=1091626816&count=1
