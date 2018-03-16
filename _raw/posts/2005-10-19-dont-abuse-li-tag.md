---
title: 不要滥用<code>li</code>
---
准备对eYou的免费邮件界面全面优化，以增进"换皮"的灵活性和手机浏览体验。

回头一看我半年前做的的东西，有点让人不好意思……不过现在开发已告一段落，终于有机会让我细心打造精品了。

用[Opera][0]的Smallscreen模式看了看，哗，单导航就有几屏。主要原因是，我大量使用了`li`，使得没有CSS支援的情况下导航菜单竖排。这让我重新思考使用`li`的适用性和必要性。

依稀记得，我刚入道时受到的严重影响：全世界都在鼓吹菜单使用`li`你就web标准化了……确实，有阵子全世界都是`li`……菜单为什么必须使用列表？没有人告诉我。这只是一些大牛的使用习惯，后来影响了很多人，不仅仅你我，还有千千万万不知道web标准为何物的初哥。

我不反对菜单使用列表，尤其是单项比较长的时候。但是菜单单项比较短，比如只是一个单词，三三两两个汉字时，没有必要。使用`a`就够了（不要告诉我你的菜单不是连接）。
比如：

```html
<div id="toolbar">
	<a href="compose.php?folder={{$smarty.get.folder|escape:'url'}}" id="writemail"><b>写邮件</b></a>
	<a href="refresh.php?uid={{$eyou.UID}}&url=listmail.php&folder={{$onFolderInfo.folder_path|escape:url}}" id="receivemail"><b>检查新邮件</b></a>
	<a href="pop_mail.php" id="popmail"><b>POP收信</b></a>
	<a href="javascript:fake_func();" id="move"><b>移 动</b></a>
	<a href="javascript:move('垃圾箱');" id="delete"><b>删 除</b></a>
	<a href="search.php?folder={{$smarty.get.folder|escape:'url'}}" id="search";><b>查 找</b></a>
</div>
```

你可以打开[CSSZenGarden][1]参考参考，它对于footer和linkList是怎么写的。

如果嫌一个`a`不够用，你可以在里面添加代码，`span`呀，`strong`呀等等。假如你是一个想像我一样狂热，你可以使用过时的`b`，原因无它，就一个字，省。况且，你不觉得`a`后跟着`b`不是很优雅吗？:)

[0]: http://opera.com
[1]: http://csszengarden.com
