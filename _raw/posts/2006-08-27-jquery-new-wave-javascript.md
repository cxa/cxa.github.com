---
title: jQuery——JavaScript冲击波
---
[jQuery 1.0已经于美国时间2006年8月26日发布][0]。这是一个好消息，世界上又多了一个超级优秀的JavaScript Framework。

我本身不是JavaScript行家，只懂些编程中最基本的东西，甚至连门都没入。但我却能从[jQuery -- New Wave JavaScript][1]做很多事情，而我相信，如果使用最原始的JavaScript编写方法，我还得费上至少一年时间来学习，才能达到相同的效果。

这当然不是我喜欢它的主要理由。它的CSS选择器和XPath操作器让我最兴奋。写JavaScript，最基本的就是对DOM的选择与操作。JavaScript自然提供有大量的API供使用，但是要精确地选择某个（些／类）元素还是相当苦难，最简单的例子，需要选择class，我们没有现成的getElementsByClassName可用，要达到目的，[甚至连正则表达式都用上][2]，而jQuery只需 `$(".class")`，像CSS中选择元素一样对DOM进行选择。所以，假如你也是一个CSS写手，你会迅速明白这些 `$("div.class")`, `$("#id + .class")`, `$(".class > a")`是啥意思。而`$(".class/../p")`这种最基本的XPath的东西也不难懂，总之，DOM选择就用CSS选择器的思维来思考即可。这对我来说，实在太方便了。

而操作，jQuery提供的API也十分浅显易懂，我们不用管它背后用什么实现。比如 `$("p.surprise").addClass("ohmy").show("slow");`，表示，给`class`为`.surprise`的`p`元素赋予`.ohmy`的`class`，然后显示(show)出来。我相信，即使第一次见到的人都知道它在干嘛。实际上，我就是第一次见到它就深深爱上了jQuery。

从上句中也得知，实际上jQuery对象的操作是可以Chainable（咋翻译好呢），你可以对一个jQuery对象传送不止一个信息（函数），这实在也太方便了。

还有一点，基本上，jQuery的代码都简洁易读，个人看法，这要归功于函数式编程（functional programing）方式，我认为这是一种强大的，优雅的编程方式，所以我更喜欢。

当然，我说过，我并不会编程，我说的东西可能都很肤浅，但它确实让我从中找到编程的乐趣，Thank you, [John][3]!

**Update:**来自[jQuery Eases JavaScript, AJAX Development][4]的一段话，个人深表赞同：

> jQuery is "not a huge, bloated framework promising the best in AJAX---nor is just a set of needlessly complex enhancements---**jQuery is designed to change the way that you write JavaScript.**"
> 

[0]: http://jquery.com/blog/2006/08/26/jquery-10/
[1]: http://jquery.com/
[2]: http://www.dustindiaz.com/top-ten-javascript/
[3]: http://ejohn.org/
[4]: http://www.eweek.com/article2/0,1895,2010602,00.asp