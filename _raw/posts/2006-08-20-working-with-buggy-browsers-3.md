---
title: 与臭虫为友——浏览器补救办法，臭虫以及解决方案（第三部分）
---

## Mozilla 家族/Gecko

当上个世纪浏览器大战接近尾声，微软的 IE 实际上已经取胜，Netscape 宣布它的浏览器开放源代码并成立了 Mozilla 组织。Mozilla 组织放弃了所有 Netscape Navigator 的大部分代码，重写了引擎。这是一项艰苦的过程，Netscape 没有能够在最快时间内发布它的新版浏览器，以致 IE 一家独大好多年。而被 AOL 收购后的 Netscape，虽然在 Mozilla 的基础上发布过 6.x, 7.x, 8.x 的浏览器。但是除了忠实粉丝，加上 Mozilla 组织主推 Firefox，没有人再认识它们。

Mozilla 是一个大套件，包括浏览器，邮件客户端，IRC 聊天，甚至可视化网页编辑器。庞杂的体系吓坏了仅仅需要浏览器的用户。为了各司其职，Mozilla 组织在保留 Mozilla Suite 的基础上，衍生了浏览器 Firefox，邮件客户端 Thunderbird，而网页编辑器也有了个 NVU。它们基于同一渲染引擎 Gecko。基于这个引擎的浏览器还有 linux 下的 Epiphany, Galleon，Mac 下的 Camino 等。 习惯上把它们称为 Mozilla 家族（Mozilla Family）。

因为这一章涉及到的内容比较少（它们基本上是完美的，没有什么臭虫可以让我增加字数），我更倾向于谈谈历史，莫怪:) 。Firefox 在名字还叫 Firebird, Phoenix 的时候就已经引起了 CSS 设计师们的注意。Gecko 引擎跟 W3C 的规范很靠近，还有许多 CSS3 的新特性，莫不让设计师们兴奋。但依旧有些小小怪癖，但是能够马上得到修正，试想想那个 5 年都没有变化的 Trident……

我宣布，目前版本的 Gecko 在 CSS 方面没有能够影响到设计的臭虫……

## Safari

2003 年，Mac OS 10.3(Pather)发布以后，Safari 成了默认的浏览器。它的引擎叫做 WebCore，基于开源项目 KDE 下 Konquerer 的 KHTML 引擎。2005 年随着 Mac OS X 10.4(Tiger)的发布，Safari 2.0 成为第一个通过 WaSP Acid2 测试的浏览器（正式发行版）。尽管 1.x 有许多臭虫和怪癖，但是，还是那句话，非 IE 用户都乐意或者不受约束地升级他们的浏览器器，以下只给出已知的 Safari 2.x 的臭虫和解决方案。
Safari 2.x 的臭虫及解决方案一览表臭虫解决方案

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

历史上，Opera 也有一些 CSS 怪癖，有可能是想模仿 IE 行为导致的。但新版表现十分好，桌面版自从 2005 年 9 年 8.5 发布以来完全免费（去除广告），而且移动版大举进军手机市场，所以也是市场的一支生力军。开发 Opera 本身就有不少 W3C 规范的撰写人，技术专家，所以，Opera 对标准的支持绝对让你满意。

Opera 9，最近发布的版本，使用了称为了 Presto 的引擎，也通过了 Acid2 的测试。

我宣布，目前版本（9.0+）的 Opera 在 CSS 方面没有能够影响到设计的臭虫……

## 手中无剑，心中也无剑

同理，Hack 的最高境界就是没有 Hack。我们这系列的文章，前两部分都在谈 IE。我们来看一张有趣的图：

![time breakdown of moder web design](http://static.flickr.com/63/206286819_fc25dea57f_o.jpg)

可以发现，当代 Web 设计，问题绝大部分时间花在 IE 身上。我们身边有一大堆更好的浏览器，为它们设计也是一件轻松的事情，那么，可不可以把 IE 独立出来？对，区别对待浏览器，并让"补丁"式的 CSS 只对劣质浏览器可见。劣质？没错，你知道我指**IE5+/Win**。这样，我们可以专心于设计，实现，并在后期集中精力解决 IE 问题。而且，这样我们就没有必要使用 hack（当然 trick 还是要的）了等可能会导致混乱等乱七八糟的东西了……什么，那你前面的两个部分写出来干什么的？

我们当然可以使用 JavaScript 或者其他技术来识别浏览器，但是我们有更安全的方法。首先我们来看看[Vitamin][1]的源代码，可以发现这一段：

    <!--[if lt IE 7]>
    <link type="text/css" media="all" rel="stylesheet" href="/css/main_IE.css" />
    <script type="text/javascript" src="/scripts/pngfix.js"></script>
    <![endif]-->

注释中的东西只有小于版本 7 的 IE 采取执行，其他浏览器都忽略。感谢 MS，再次向太平洋方向鞠个躬……需要更详细了解条件注释，请查看[msdn 的相关文档][2]。

甚至，如果我们都不在意 IE 6 以及以下版本浏览器，我们都不要搞那么多 hacks 或者 tricks，直接用 [/IE7/][3]（这可不是 IE7，是一个 js）算了。虽然效率有点问题，呵呵，就让 IE 咎由自取吧……不过基本上是不可能的，尤其在中国的环境下，大家都把 IE 照顾好吧……

那么，我们这系列就结束了。我希望 IE7 能尽快出来并普及，尽管不完美，但足可以让生活更舒心了。Web 标准本身并不复杂，只是当前 IE6 等浏览器对 CSS 支持的缺乏和误解，需要 hack 的东西太多，让初学者误认为很高深……我希望，将来无须再 hack，无须再 trick，做页面无须再分工，每个网页设计师都能够亲自操刀，嗯，我也可以失业了…… XD

[1]: http://www.thinkvitamin.com/
[2]: http://msdn.microsoft.com/workshop/author/dhtml/overview/ccomment_ovw.asp
[3]: http://dean.edwards.name/IE7/
