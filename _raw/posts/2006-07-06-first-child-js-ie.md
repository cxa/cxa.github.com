# 在 IE 中使用 first-child

使用 web standards 做网页，经常需要定义某个父元素下的第一个子(child)元素或最后一个元素，以便将其与其他元素区分开来，有利于实现某些特殊需求。最浅显的例子是，导航项目间的竖线，我们往往通过 `border` 或者 `background` 来实现。特殊需求是，第一项左边无竖线或最后一项右边无竖线。

那么区分第一项好呢，还是最后一项好？答案是明显的，逼不得已，不要用区别最后一项。按照一般的编程方法，**控制第一项要比控制最后一项容易得多**。

区分第一项的还有一个好处是，CSS 有一个 `:first-child` 的伪元素（pseudo element）可以让我们轻而易举的选择第一个子元素。

遗憾的是，当前全球占有率最高的浏览器，IE6，并不支持这个伪元素。我们可以手工给第一个元素加上 class 然后再定义它。但这不是一个万无一失的办法，尤其对于页面规模达到一定数量大型网站，很容易挂一漏万。那么，让 JavaScript 来帮我们完成这件工作如何？

查看 [http://realazy.com/lab/first-child-js/][0]。

在 IE 中，为每个属于 first-child 的 `li` 加上 `first-child` 的 class，则 CSS 则可以这样书写了：`:first-child, .first-child { some rules here...}`（有没有发现这样写很帅，一个是冒号，两点；一个是点号，一点 :)），十分便于维护和管理。

p.s.希望哪位高手能够写出通用的 first-child 来，我这里的例子只针对 `li`，能力有限 XD ...

[0]: http://realazy.com/lab/first-child-js/
