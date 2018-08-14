# <code>abbr</code>和<code>acronym</code>

`abbr`和`acronym`是两个很容易被人忽略的标签（tag）。它们貌似没什么意义，但对网站的亲和力（accessibility）起到很重要的作用。

这两个标签在html 4中已经存在，但目前为止IE并没有能够识别`abbr`。好消息是，IE7会支持`abbr`。如果您需要让IE6也支持`abbr`，可以参考：[http://www.sovavsiti.cz/css/abbr.html][0], [这是中文版][1]。

至于什么时候用`abbr`，什么时候用`acronym`，这个问题让人头痛。先说说个人看法吧，目前IE支持`acronym`，如果你不是**基本教义派**，大可不管什么`abbr`, `acronym`, 放心用`acronym`就是。

如果真的那么较真，你可以[google一把][2]，会发现有一大堆区别`abbr`和`acronym`的文章，但是保证你越看越糊涂，因为老外自己也不是那么清楚的。

今天跟公司同事讨论了一下，我是这么理解的：**名词性语句的缩写，比如HTML, CSS, UN, HTTP, WWW等属于`abbr`；非名词性语句，比如FYI ( For Your Information), IMHO ( In My Honest Opinion )则等属于`acronym`.** 按照这个理解去衡量，似乎到目前为止我所碰到的缩写词都能够正确理解。

**2006-06-02 Update:**今早又看了看资料，我彻底晕倒了。以上规则似乎是错误的，现在我所理解的规则是：如果缩写后可以按单词拼读，而不是必须一个一个字母念，则属于`acronym`, 比如**Radar**:**Ra**dio **d**etecting **a**nd **r**anging。总之，An acronym is a **word**就是。反之，abbr则是一堆**letters**而已，不是**word**。

**如果您有更好的区分方法，请务必告诉我，谢谢！**

最后要告诉大家的是，如果你真的很费劲的去区别`abbr`和`acronym`，那么很不好意思地告诉你，未来的XHTML 2只保留了一个：`abbr`. 估计老外自己也晕了。

**只生一个好！** XD

[0]: http://www.sovavsiti.cz/css/abbr.html
[1]: http://www.w3cn.org/article/translate/2005/115.html
[2]: http://www.google.cn/search?hl=zh-CN&newwindow=1&q=abbr+acronym&btnG=%E6%90%9C%E7%B4%A2&meta=