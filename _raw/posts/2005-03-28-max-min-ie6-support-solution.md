# 让 max-*, min-*在 IE6 中有效的解决方案

`max-width`、`max-height`、`min-width` 和 `min-height` 这四个性质（property）分别表示最大宽度、最大高度、最小宽度和最小高度。它们在 CSS 中有着很重要的作用，比如，它们可以用来很好地协调各种不同分辨率下用户端（client）的显示效果，举个例子，你设计的网页由于侧栏（sidebar）过宽，当用户使用 640\*480 或者更小的分辨率浏览网页的话，就会导致内容（content）栏过窄，影响用户的阅读，一个办法是，把内容或者包含内容的 div 的宽度固定一个最小值，姑且是 780px 吧，那么我们可以这样写：`min-width: 780px;`，这样，当用户端分辨率的宽度在小于 780px 时，会在水平位置上出现滚动条，不至于影响布局，用户稍微移动一下滚动条就可以方便阅读主要内容。

然后，十分不幸的是，你知道我要说什么，就是 IE，这个世界上使用者最多的浏览器，到目前的版本为止，对这四个性质没有一个能够，哪怕一点点的支持。这可让设计者吃尽了苦头，最明显的就是，当你使用 float 布局时，在 IE 中的一个臭毛病是，顶层 div 的宽度变小的时候（缩小窗口，分辨率低等），浮动的布局（一般是右边那一块跑到了下方）就会被破坏，变得一塌糊涂。这样即使是最开明的主管，也不能容忍你这样的设计……

天生不足，后天补上。web 设计世界的天才多如牛毛，我们随便 Google 就能找到不少解决方案（solution），在抱怨 IE 的同时请向西半球鞠躬。当我写到这里时，我才开始一一验证我所找到的方案，结果让我大失所望，令另我把标题从「让 max-\*, min-\*在 IE 中有效的解决方案」改成了「让 max-\*, min-\*在 IE6 中有效的解决方案」。真如 [Dave][0] 所说：[别指望 `min-width` 在 IE 中有用][1]。

我找到的第一种方案，在 [http://www.issociate.de/board/post/154073/min-width.html][2] 中说，可以在同层的 div 中加入例如 ` <div style="width: 300px; height: 0; line-height:0;></div>`。可惜，这种无异于插入空白占位透明的 GIF 图片（spacer GIF）无异，没有实际的效果和意义。诸君可以亲自一试……

第二种，请访问 [http://www.svendtofte.com/code/max_width_in_ie/][3]，此人研究 JavaScript 极为深入，在 CSS 中使用了极为罕用的 `expression`，虽然这会让 CSS 文件通不过校验（validation），但是我觉得，标准的意义在于分离结构和表现，而且未影响到 XHTML/HTML 的代码合法性，可以接受。我曾欢天喜地啊，因为我用 IE 各种版本测试了他的演示版（demo）均正常无比……我自己写的在 IE 5.x 中也测试通过，最后，在 IE6 中测试的时候，IE6 竟然当掉（crash）了。不解，极为痛苦……仔细检查代码，原来他的 demo 没有任何 DTD 声明（即 `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">` 这样的声明），莫非此方法只可以在怪癖模式（quirks mode）下起作用？我把我的 HTML 文件中的 DTD 去掉，果如其然。真是一个极大讽刺，想在标准下使用 CSS 却不能在标准下使用 XHTML/HTML……这个方法，嗯，假如你的网页在 quirks mode 下使用，可以使用这个方法……但是，在 IE 5.x 下可以使用，无论是标准模式（standard mode）还是怪癖模式下。具体方法在其网页上，在此不列出。

第三种方案，恰恰相反，在 IE6 中十分完美，而且也不用担心 CSS 代码的合法性。请访问 [http://www.doxdesk.com/software/js/minmax.html][4]。不像作者所说，可以支持非 mac 版的 IE 5 以上版本（make IE5+/Win support CSS min/max-width/height）,我的测试结果，只有 IE6 起作用，而且十分完美。如果你的网页已经不再面向 IE5.x，这个方法就是拯救你的灵丹妙药。方法十分简单，请下载 [http://www.doxdesk.com/file/software/js/minmax.js][5]，在 `head` 区域添加 `<script type="text/javascript" src="minmax.js"></script>` 就可以了。

从此，在 IE7 出来之前，你可以部分指望 ` min-width` 在 IE 中有用了。还有什么更好的办法，请留言，谢谢。

[0]: http://mezzoblue.com
[1]: http://www.onestab.net/a/csscribsheet.html
[2]: http://www.issociate.de/board/post/154073/min-width.html
[3]: http://www.svendtofte.com/code/max_width_in_ie/
[4]: http://www.doxdesk.com/software/js/minmax.html
[5]: http://www.doxdesk.com/file/software/js/minmax.js
