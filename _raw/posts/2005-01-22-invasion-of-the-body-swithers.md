---
title: 一个强大的样式转换器
---
[A List Apart][0]这篇[Invasion of the Body Switchers][1]介绍了一种可以在多种媒体类型中转换样式的方法，仅仅一个JavaScript和CSS文件就足够。并且不需要`#`伪连接，也不需要`javascript:`伪协议，让人感觉舒服多了。它的最大优点是，只需一个CSS文件就可以包含所有的媒体类型了，并且不需要`alternate stylesheet`，像文中所说，可以减轻服务器的访问负担。

什么方法都是有局限的，尽管这篇文章里声称自己是可以无限扩展的。在一个样式一些细小的变化上，比如仅仅改变字体或背景颜色（这篇文章的例子就是这样而已）当然有很大灵活性，但是如果涉及一个需要"面目全非"的整体改变的样式呢？还是要把它写进单一的CSS文件中去吗？那么这个CSS文件就会显得过大，所包含的样式也不是全部为用户所使用。这就会浪费带宽，减慢样式显示速度，得不偿失。最好的办法还是使用server-side语言，随用户的选择来下载不同的样式表。当然，两者可以结合起来使用。

不管怎么样，这都比如今流行的样式表转换器优秀得多。这就是我今天奉上的翻译作品：[武装body转换器][2]。

翻译花絮：从该文章的[演示样本][3]可以看到，该文章的标题灵感来源电影Invasion of the Body Snatchers，其中Invasion的意思是入侵、侵略，假如照直翻译，会让人不知所谓。为了达到原文之意境，于是我把它译为武装。希望不会曲解原文。

[0]: http://alistapart.com/
[1]: http://alistapart.com/articles/bodyswitchers/
[2]: https://www.google.com/search?q=武装body转换器&ie=UTF-8&oe=UTF-8
[3]: http://alistapart.com/d/bodyswitchers/iotbs.html
