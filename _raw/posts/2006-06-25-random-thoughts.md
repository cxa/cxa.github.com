---
title: 杂感
---
很多朋友对我说，她/他有代码洁癖，即，让她/他写XHTML的话，从来不愿意加上额外的标签（tag）。举个简单的例子，相信很多人从很多地方都看到过的：

```html
<div id="nav">
	<ul>
		<li></li>
		<li></li>
		……
	</ul>
</div>
```

很多人，包括许多业界大牛，都建议你这样写即可：

```html
<ul id="nav">
	<li></li>
	<li></li>
	……
</ul>
```

当然，我个人很欣赏第二种写法，没错，简洁明了，语义（semantic）确凿。但请等一等，如果需要样式化（stylish）它，哪一种可以提供更多的控制（controll）? 很明显，第一种。

然后，这个问题就有点让人抓狂了。一句话：你是结构（markup）优先呢，还是表现（presentation）优先？我相信，在如今这个不美好的时代，表现优先是第一准则。很多有理想的人，包括我，最后为了实现表现上的需要，标签汤（tag soup）实际上难以避免。

所以，这只能是个**度**的问题。**别滥用**。怎么不算滥用，也没有什么准则。我个人的准则是：如果要实现一个表现上的需要，你使用超过三层的外围标签（wrappers?），就应该停下来仔细想想了。尽管有点老，但我还是建议你看一看[SimpleQuiz][0]上面一些有趣的讨论。

为什么会这样？因为一切都不完美。试想一下，如果CSS能够提供更多的规则来控制页面上的元素，或许就不会这么尴尬。比方说，background-image支持trlb（上右下左）四个方向不同的图片的话，我们就不必为处理圆角而绞尽脑汁；支持从页面上产生元素，如content的话，那么也可以大大减少tag的使用……

XHTML？笑话。实际上目前为止没有多少人在用XHTML，一切都是自欺欺人。[XHTML is Dead][1]! XHTML是**xml**，具有**xml**的一切优越性，但是，我们现在看到的，都是**text**。如果把text当作xml来处理，这是有害的（[Sending XHTML as text/html Considered Harmful][2]）。

尽管我们在Doctype上都标明了我们用的是XHTML，但是实际上我们都在用HTML。这是现实。要不那些错误百出的非良构的页面怎么可能在宽容的当代浏览器中显示呢……也难怪，XHTML 1只是HTML 4的改良而已。但是，未来的XHTML 2并不向后兼容，我不知道我们使用XHTML 1的必要性何在。另外，别拿accessibility来反驳我，分离结构与表现的HTML 4并没有跟XHTML 1有任何区别。

因此，可能，使用XHTML 1的意义在于，宣称我们已经有了这样的思想，并且为未来的XHTML 2做好了准备。

这也是我为什么，强烈建议使用HTML 4.01 Strict Doctype的原因。从公司/企业来说，要求整个团队都具有web standards的思想，并贯彻相关原则并非易事，各种上个世纪遗留的思想仍然负隅顽抗。如果真的使用XHTML 1，很多只能兼容html的JavaScript脚本会失效，编辑某个不经意的未转义的字符会导致整个页面出错（xml parsing error），等等。为了避免问题，或许，HTML 4.01 Strict Doctype是现在的最佳选择。

[0]: http://www.simplebits.com/bits/simplequiz/
[1]: http://www.autisticcuckoo.net/archive.php?id=2005/03/14/xhtml-is-dead
[2]: http://www.hixie.ch/advocacy/xhtml
