---
title: JavaScript习作--优化IE的表单交互
---
说起网页标准（Web Standards），我一直以来都只关注结构（markup）和表现（presentation），很少涉及行为（behavior），因为这涉及到编程，呵呵，不怕见笑，俺是半路出家了，对编程始终不得法门而入。

工作以来，接触牛人，耳濡目染，近朱者赤，不知不觉也知道了些结构语法什么的。上周某日无聊至极心血来潮，决定搞搞JavaScript看看。嘿嘿，想不到，我胡乱写了一通，竟然达到了我预想的效果！于是我抛下看了将近一个月的色彩管理啊，设计什么的啊，抱起了那本去年[O'reilly][0]送我的[《JavaScript权威指南(第四版)》][1]，一看入迷，那个DOM，对于手写XHTML代码的我来说，太熟悉了……于是上班途中的公交也不忘K一下她。

几年过去了……哦不，几天过去了……

当前的IE并不支持[属性选择器][2]，所以对于表单，你得不厌其烦地为每种类型（type）加上相应的class。最让人不能接受的是，IE不支持`:focus`，所以不得不求助于JavaScript。

我做了一个[表单例子][3]，使用属性选择器`input[type="text"]等及其伪类``:focus`实现我想要的效果，在没有任何JavaScript的情况下，Firefox, Opera工作完美。但是，你知道我要说什么了，对，是IE，没有丝毫的作用。在我加入额外的class的情况下可以为IE进行样式化，然而遗憾的是，要支持**focus**行为，CSS再也无能为力，所以，让JavaScript出马吧。

我的实现思想是这样的。对于表单的每种`type`的`input`，使用JavaScript为其添加相应的class，我的例子中，我设置class的名字等于其`type`，即`type="text"`则其class为`class="text"`，依此类推。而其`fucos`的效果则增加一个相应的class来实现，命名就是`type`加上focus这个单词，即`type="text"`则其`fucos`的class为`class="textfocus"`，依此类推。

好了，那么，我就用`onfocus`和`onblur`事件（events）来实现了。当然，这只针对IE，所以在JavaScript中判断了一下浏览器。嗯，这就是今天的习作：[http://realazy.com/lab/enform/][3]（用IE看哦）。各位大牛有心的话不妨看看，多指正和优化一下，感激不尽 :)

继续努力学习中……[K书][4]again....

[0]: http://oreilly.com.cn
[1]: http://oreilly.com.cn/book.php?bn=7-111-11091-9
[2]: /posts/2005-08-29-css-attrib-selector.html
[3]: http://realazy.com/lab/enform/
[4]: http://www.douban.com/people/realazy/
