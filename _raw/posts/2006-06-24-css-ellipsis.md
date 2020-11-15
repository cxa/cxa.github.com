# 使用 CSS 截字

截字是一个很恶心的问题。为了照顾表现上的需要，通常需要把过长的句子，比如一个列表中的新闻标题，截短。

通常这由程序员使用后台技术（各种流行的语言，PHP, JSP 等）或者前台技术（JavaScript）来处理。我个人倾向于使用前台技术，因为这对提高网页的亲和力（accessibility）有好处。在非桌面型的浏览器中，用户可以更方便的掌握信息完整性。

[`text-overflow`][0] 是 CSS3 的一个性质（property），它可以截短过长的字符串，并依据值（value）来决定被截掉部分使用何种方式展现。目前，IE 已经实现对其的支持，Opera 也有了私有属性（-o-text-overflow）对其支持，Firefox 似乎落后一步……支持的两者都可使用 `ellipsis ` 值，把截掉部分替代成省略号（即 ellipsis）。

所以，你要做的只是，把需要截字的元素定好宽度，和 `overflow` 一起使用，即可实现效果。

但是 Firefox 不支持，所以大概你知道我下面要干什么了。　:)

先可以看看 Yahoo 某大牛的解决方案：[http://blog.360.yahoo.com/blog-ktYYK_s5fqJ2Hu1ryv2QSL0-?p=120][1]。大牛就是大牛，XBL 和 JavaScript 双管齐下。

然后，我的解决方案是，利用伪类 `:after` 增加省略号，再把它定位到右边即可。效果有点粗糙，但简洁明了，纯 CSS 实现。

具体过程不说了，看[案例][2]，有兴趣者看看源码，很容易理解的。

[0]: http://www.w3.org/TR/2003/CR-css3-text-20030514/#text-overflow
[1]: http://blog.360.yahoo.com/blog-ktYYK_s5fqJ2Hu1ryv2QSL0-?p=120
[2]: http://realazy.com/lab/ellipsis/
