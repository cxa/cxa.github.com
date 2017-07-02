---
title: 垂直对齐的两个方案
---
垂直对齐一直让人头痛，想用`vertical-align`？它只对表格有效。没错，只对`display:table-cell`的元素有效。嗯，所以，怎么办？简单，让元素`display:table-cell`呗，然后你就可以随心所欲让`vertical-align`的`top`, `middle`（注意：不是`center`）, `bottom`了。很遗憾的是，IE不支持。另外需要注意的是，`display:table-cell`的元素的上一级元素必须是`display:table-row`。

例子：[http://realazy.com/lab/valign/align1.html][0]

下面这种方案使用相对定位和绝对定位相结合的办法。这种办法底对齐十分有效，但需要垂直居中或者水平居中，则需要强制定义该元素的宽度和高度。在此只举例底对齐，需要垂直/水平居中对齐留待大家研究，可以参考我以前的水平居中的文章：[元素水平居中方案总结][1]的"负边界解决方案"一节。

一个元素`position: relative`后，里面使用`position: absolute`的元素则可以相对上一级元素定位。该元素`bottom: 0`就可实现严格意义上的底对齐了。

例子：[http://realazy.com/lab/valign/align1.html][2]

[0]: http://realazy.com/lab/valign/align2.html
[1]: http://realazy.com/blog/?p=32
[2]: http://realazy.com/lab/valign/align1.html
