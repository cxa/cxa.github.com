# JavaScript 习作——优化 IE 的表单交互

说起网页标准（Web Standards），我一直以来都只关注结构（markup）和表现（presentation），很少涉及行为（behavior），因为这涉及到编程，呵呵，不怕见笑，俺是半路出家了，对编程始终不得法门而入。

工作以来，接触牛人，耳濡目染，近朱者赤，不知不觉也知道了些结构语法什么的。上周某日无聊至极心血来潮，决定搞搞 JavaScript 看看。嘿嘿，想不到，我胡乱写了一通，竟然达到了我预想的效果！于是我抛下看了将近一个月的色彩管理啊，设计什么的啊，抱起了那本去年 [O'reilly][0] 送我的 [《JavaScript 权威指南(第四版)》][1]，一看入迷，那个 DOM，对于手写 XHTML 代码的我来说，太熟悉了……于是上班途中的公交也不忘 K 一下她。

几年过去了……哦不，几天过去了……

当前的 IE 并不支持 [属性选择器][2]，所以对于表单，你得不厌其烦地为每种类型（type）加上相应的 class。最让人不能接受的是，IE 不支持 `:focus`，所以不得不求助于 JavaScript。

我做了一个 [表单例子][3]，使用属性选择器 ` input[type="text"] 等及其伪类 ``:focus ` 实现我想要的效果，在没有任何 JavaScript 的情况下，Firefox, Opera 工作完美。但是，你知道我要说什么了，对，是 IE，没有丝毫的作用。在我加入额外的 class 的情况下可以为 IE 进行样式化，然而遗憾的是，要支持**focus**行为，CSS 再也无能为力，所以，让 JavaScript 出马吧。

我的实现思想是这样的。对于表单的每种 `type` 的 `input`，使用 JavaScript 为其添加相应的 class，我的例子中，我设置 class 的名字等于其 `type`，即 `type="text"` 则其 class 为 `class="text"`，依此类推。而其 `fucos` 的效果则增加一个相应的 class 来实现，命名就是 `type` 加上 focus 这个单词，即 `type="text"` 则其 `fucos` 的 class 为 `class="textfocus"`，依此类推。

好了，那么，我就用 `onfocus` 和 `onblur` 事件（events）来实现了。当然，这只针对 IE，所以在 JavaScript 中判断了一下浏览器。嗯，这就是今天的习作：[http://realazy.com/lab/enform/][3]（用 IE 看哦）。各位大牛有心的话不妨看看，多指正和优化一下，感激不尽 :)

继续努力学习中……[K 书][4]again...

[0]: http://oreilly.com.cn
[1]: http://oreilly.com.cn/book.php?bn=7-111-11091-9
[2]: /posts/2005-08-29-css-attrib-selector.html
[3]: http://realazy.com/lab/enform/
[4]: http://www.douban.com/people/realazy/
