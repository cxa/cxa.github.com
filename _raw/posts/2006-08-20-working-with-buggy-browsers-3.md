---
title: 与臭虫为友——浏览器补救办法，臭虫以及解决方案（第三部分）
---
## Mozilla家族/Gecko

当上个世纪浏览器大战接近尾声，微软的IE实际上已经取胜，Netscape宣布它的浏览器开放源代码并成立了Mozilla组织。Mozilla组织放弃了所有Netscape Navigator的大部分代码，重写了引擎。这是一项艰苦的过程，Netscape没有能够在最快时间内发布它的新版浏览器，以致IE一家独大好多年。而被AOL收购后的Netscape，虽然在Mozilla的基础上发布过6.x, 7.x, 8.x的浏览器。但是除了忠实粉丝，加上Mozilla组织主推Firefox，没有人再认识它们。

Mozilla是一个大套件，包括浏览器，邮件客户端，IRC聊天，甚至可视化网页编辑器。庞杂的体系吓坏了仅仅需要浏览器的用户。为了各司其职，Mozilla组织在保留Mozilla Suite的基础上，衍生了浏览器Firefox，邮件客户端Thunderbird，而网页编辑器也有了个NVU。它们基于同一渲染引擎Gecko。基于这个引擎的浏览器还有linux下的Epiphany, Galleon，Mac下的Camino等。 习惯上把它们称为Mozilla家族（Mozilla Family）。

因为这一章涉及到的内容比较少（它们基本上是完美的，没有什么臭虫可以让我增加字数），我更倾向于谈谈历史，莫怪:) 。Firefox在名字还叫Firebird, Phoenix的时候就已经引起了CSS设计师们的注意。Gecko引擎跟W3C的规范很靠近，还有许多CSS3的新特性，莫不让设计师们兴奋。但依旧有些小小怪癖，但是能够马上得到修正，试想想那个5年都没有变化的Trident……

我宣布，目前版本的Gecko在CSS方面没有能够影响到设计的臭虫……

## Safari

2003年，Mac OS 10.3(Pather)发布以后，Safari成了默认的浏览器。它的引擎叫做WebCore，基于开源项目KDE下Konquerer的KHTML引擎。2005年随着Mac OS X 10.4(Tiger)的发布，Safari 2.0成为第一个通过WaSP Acid2测试的浏览器（正式发行版）。尽管1.x有许多臭虫和怪癖，但是，还是那句话，非IE用户都乐意或者不受约束地升级他们的浏览器器，以下只给出已知的Safari 2.x的臭虫和解决方案。
Safari 2.x的臭虫及解决方案一览表
臭虫
解决方案

对`fieldset`设置`display: inline;`会让表单不可点击。

相对定位`fieldset`：

    fieldset {
    	display: inline;
    	position: relative;
    }

使用`:hover`伪类的相邻选择器导致错误的行为：

    dt:hover + dd {
    	color: green;
    }

目前无解决方案

放大字体时，产生的内容会使文本超出其盒子范围。

目前无解决方案

## Opera

历史上，Opera也有一些CSS怪癖，有可能是想模仿IE行为导致的。但新版表现十分好，桌面版自从2005年9年8.5发布以来完全免费（去除广告），而且移动版大举进军手机市场，所以也是市场的一支生力军。开发Opera本身就有不少W3C规范的撰写人，技术专家，所以，Opera对标准的支持绝对让你满意。

Opera 9，最近发布的版本，使用了称为了Presto的引擎，也通过了Acid2的测试。

我宣布，目前版本（9.0+）的Opera在CSS方面没有能够影响到设计的臭虫……

## 手中无剑，心中也无剑

同理，Hack的最高境界就是没有Hack。我们这系列的文章，前两部分都在谈IE。我们来看一张有趣的图：

[![time breakdown of moder web design](http://static.flickr.com/63/206286819_fc25dea57f_o.jpg)]

可以发现，当代Web设计，问题绝大部分时间花在IE身上。我们身边有一大堆更好的浏览器，为它们设计也是一件轻松的事情，那么，可不可以把IE独立出来？对，区别对待浏览器，并让"补丁"式的CSS只对劣质浏览器可见。劣质？没错，你知道我指**IE5+/Win**。这样，我们可以专心于设计，实现，并在后期集中精力解决IE问题。而且，这样我们就没有必要使用hack（当然trick还是要的）了等可能会导致混乱等乱七八糟的东西了……什么，那你前面的两个部分写出来干什么的？

我们当然可以使用JavaScript或者其他技术来识别浏览器，但是我们有更安全的方法。首先我们来看看[Vitamin][1]的源代码，可以发现这一段：

    <!--[if lt IE 7]>
    <link type="text/css" media="all" rel="stylesheet" href="/css/main_IE.css" />
    <script type="text/javascript" src="/scripts/pngfix.js"></script>
    <![endif]-->

注释中的东西只有小于版本7的IE采取执行，其他浏览器都忽略。感谢MS，再次向太平洋方向鞠个躬……需要更详细了解条件注释，请查看[msdn的相关文档][2]。

甚至，如果我们都不在意IE 6以及以下版本浏览器，我们都不要搞那么多hacks或者tricks，直接用 [/IE7/][3]（这可不是IE7，是一个js）算了。虽然效率有点问题，呵呵，就让IE咎由自取吧……不过基本上是不可能的，尤其在中国的环境下，大家都把IE照顾好吧……

那么，我们这系列就结束了。我希望IE7能尽快出来并普及，尽管不完美，但足可以让生活更舒心了。Web标准本身并不复杂，只是当前IE6等浏览器对CSS支持的缺乏和误解，需要hack的东西太多，让初学者误认为很高深……我希望，将来无须再hack，无须再trick，做页面无须再分工，每个网页设计师都能够亲自操刀，嗯，我也可以失业了…… XD

[1]: http://www.thinkvitamin.com/
[2]: http://msdn.microsoft.com/workshop/author/dhtml/overview/ccomment_ovw.asp
[3]: http://dean.edwards.name/IE7/
