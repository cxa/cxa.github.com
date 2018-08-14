# ALA 4.0非专业分析

最近觉得怎么[A List Apart][0]没动静了，在[Web4C][1]了解到，原来它[Redesign][2]（重构？已经不是第一次了）了，升级为ALA 4.0。由于DNS解析问题（jjgod说的，我不知道）新版可以通过[http://alistapart.textdrive.com/][3]来访问。

ALA 4.0布局十分简洁：（点击看大图）

![](/assets/missing.png)

基本上就是一个static的一栏（navbar），float定位的三列（content、secondary和sidebar），外加一个absolute定位的masthead。因为使用到float，为保证布局的稳定，三列都定了宽度，即这并非是流动（fluid）的设计，最佳浏览分辨率是1024\*768。

navbar定义了`min-width: 750px;`，但IE并不买帐，所以还有了`overflow: hidden;`，很可怜，分辨率小的IE用户会损失后面的导航。

但是，分辨率小并没有影响到你的浏览体验，请看图：（点击看大图）

![](/assets/missing.png)

![](/assets/missing.png)

ALA的三列content、secondary和sidebar的宽度加上相应的padding值明显经过精确算计，在小分辨率下对浏览体验的影响很小（我是指1024\*768跟800\*600是目前主流的情况下）。

最后，发现一个很酷的效果：

![](/assets/missing.png)

想知道怎么做吗？显然，你要对我嗤之以鼻了，呵呵，这么简单的效果你也敢来显摆？在此我提示一下，字体必须为serif字体，行高必须为1，这样在放大缩小时，效果才不至于改变。

显然，ALA 4.0的CSS并没有什么出众之处，但这并没有妨碍她设计的优秀。学院派的风格，易用的导航，易读的文章等等，在web标准之外，我们还需要学习更多东西。

[0]: http://alistapart.com/
[1]: http://blog.jjgod.org
[2]: http://www.jasonsantamaria.com/archive/2005/08/23/a_list_apart_redesign.php
[3]: http://alistapart.textdrive.com/
