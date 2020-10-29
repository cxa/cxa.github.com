# Removing dotted links?

看了 [Removing Dotted Links][0] 这篇文章。我早就注意到了（因为我之前使用过 Fx 1.5 的 Alpha 版）文中提到的关于连接虚线边框的问题：

![dotted links](http://sonspring.com/images/78.png)

该文提出了去除虚线边框的办法。

我反对去除连接的虚线边框，因为这是连接的一个浏览器默认**特性**。我怀疑去掉以后有些用户还认不认为（不是知不知道）它是一个连接。

我还认为 Firefox 这样做是对的。产生这种情况的原因是 CSS 中一种用图片取代文本的方法导致的。这个方法使用 `text-indent` 这个性质，把值设置到足够大，让文本超出屏幕的可视范围。只是超过而已，并没有消失，所以虚线边框的做法只是正确地把 CSS 的设置展现出来而已。

使用 `text-indent` 本身就是一个 hack，hack 一般都是很 dirty 的，呵呵。

由于这个原因，我建议使用 StopDesign 的 [Using Background-Image to Replace Text][1] 的方法，不过需要多加 `span` 标签，很不爽啊……

**Update:** 经 [old9][2] 在旧版 blog 中的留言（刚好在 blog 搬迁期间留言，所以没能整合过来）指教，其实可以通过 `overflow: hidden` 来去除超出的虚线框。感谢 old9，这确实是一个很好的方法。

[0]: http://sonspring.com/journal/removing-dotted-links
[1]: http://stopdesign.com/articles/replace_text/
[2]: http://old9.blogsome.com/
