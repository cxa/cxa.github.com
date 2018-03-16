---
title: ppk on JavaScript第二章：背景（一）
---

JavaScript 为网页而存在，它会被嵌入到一个同时使用 HTML 和 CSS 的环境中，而此环境中不可缺少可用性和无障碍。总而言之，脚本必须给站点增加用处，而站点在 JavaScript 失灵或者根本不存在的情况下依然能继续工作。兼容标准的 CSS 革命改变了 Web 开发，JavaScript 编程也受到这场运动的巨大影响。

## CSS 革命

1998 年，在 Netscape 和 IE4 无法达成任何协议时，一些先天下之忧而忧的 Web 开发者组成了[Web Standards Project][0](Web 标准工程，简称 WaSP)，为解决 JavaScript 某些荒唐的私有元素，并推动使用 CSS 来定义网站的外观。她们的重要使命是"追随标准"，不仅针对浏览器厂商，而且号召 Web 开发者。

最初，WaSP 及其支持者专注于 CSS. 究其原因，CSS 是一门比较新的技术，尚未被乱七八糟的东西污染，更容易成为历史的一个转折点，JavaScript 就没有这么幸运了，那时候的 JavaScript，无论是编程，还是人们对它的想法，都是完全非无障碍的。这也是导致某些标准支持者产生"JavaScript 就是障碍"观念的原因，无论是过去还是现在。其实，JavaScript 和无障碍可以和谐共存，只要您稍微谨慎。

### Unobtrusive 脚本编程

2002 年，Stuart Langridge 创造出 Unobtrusive 脚本编程（unobtrusive scripting, Stuart Langridge 的[原文][1]），这是首次重要的尝试——在基于 CSS，标准兼容的新理论中嵌入 JavaScript.

Unobtrusive 脚本应该具备一下所有的特征：

* 可用性，比如，赋予网站明确的可用性好处；
* 无障碍，比如，假使 JavaScript 失效，页面应该保持可读和可理解，尽管不可避免地丧失某些可用性；
* 容易实现，一个经典案例是，Web 开发者只需把脚本引入和增加一个 JavaScript 调用钩子(hook)，脚本就起作用；
* 分离，属于本身的`.js`文件而不是散落在 HTML 的各个角落。

理论上说，第一条自 JavaScript 诞生之日起就有的，但是经常会被程序员在炫耀 JavaScript 能力的热忱中忽略。如果没有可用性多酷都无关紧要。

其他三条都是新的。通常都认为无障碍和 JavaScript 是互斥的。容易的实现需要 JavaScript 钩子，W3C DOM 的降临使之成为可能。分离，是偷师于 CSS 革命的。如果需要分离 HTML 和 CSS, 逻辑上，也应该把 JavaScript 从它们中分离。

## 三个层面

网页包含三个层次（没错，它们都需要各自分离）：

![3layers](http://farm1.static.flickr.com/130/329082295_2d6875c146_o.png)

1.  HTML 结构
2.  CSS 表现
3.  JavaScript 行为

HTML 结构层是网页最重要的基础。HTML 标签给予内容含义。CSS 表现层则是定义您的 HTML 该如何显示。JavaScript 行为层为页面增加交互。

不管如何，一个网页必需 HTML 结构层。没有 HTML，没有网页。CSS 和 JavaScript 都是可选项，旧的，无名的，罕见的浏览器可能不支持 CSS 和/或 JavaScript，在这种情形下，这两层或其中一层都不起作用。后果是显而易见的，任何网站应能在行为层（或者表现层，但这种情形相比较少）的缺席下还能"存活"。也就是说，网站不能完全依赖于 JavaScript，但要保证无障碍即使 JavaScript 不起作用。

### 分离的关系

一般来说，最好单独管理好每一层。最基础的，确保：

* HTML 是结构性的，不要太复杂，没有 CSS 和 JavaScript 下保持语义。
* CSS 表现层和 JavaScript 表现层分别归属于独自的`.css`和`.js`文件。

分离更容易维护。您可以轻而易举地把分离的文件连接到整站的网页上，简单举个例子，您需要把字体从 12px 改成 0.8em，您只需打开 CSS 文件编辑它，这样网页变化即刻生效。除此之外，分离让您可以不需修改 HTML 结构层或者 JavaScript 行为层，只需修改整个 CSS 表现层就可让网站换上新衣。

## 分离表现和结构

表现和结构分离的基本思想是确保 HTML 定义结构，只有结构，所有的表现都定义到分离的 CSS 文件中去。不再允许`font`标签或者表现性的表格！在一本 JavaScript 的书中似乎没有什么余地来探讨 CSS 和 HTML 的分离。那么我们就来说说这个分离对我们编写 JavaScript 代码方式的影响吧。

### CSS 更改

JavaScript 可以让您修改 CSS，比如，您可以在 CSS 定义一个连接为红色，然后用 JavaScript 控制 CSS 再定义为绿色。有时候这是很有用的，样式的变化会使用户能注意变化的 HTML 的元素，比如出错信息。如果没有正确地分离 CSS 表现层，CSS 更改将会变得十分困难。改变元素的`className`通常是最佳的 CSS 更改方式。如下例子，假如表单验证程序发现用户输入错误，则改变该表单字段的 class:

```js
// obj is the form field
obj.className += ' errorMessage';

// in CSS
input.errorMessage {
    border: 1px solid #cc0000;
}
```

只有您正确分离了表现和结构，这样的方式才会起作用。class `errorMessage`必须定义在 CSS 中为了实现样式的更改，反过来，也只有您一开始就从正确的 CSS 表现层开始才有可能（或者说，可行）。

### 修改结构还是表现

JavaScript 实际上允许您改变网站的表现，也允许您改变 HTML 文档。用户并不关心我们改了什么。但还是有所不同的。改变一个应答用户行为的表单应该是修改结构而不是表现。相关表单元素不应该只是从视觉上隐藏而已，而应该从文档结构中移除。当一个表单提交时，浏览器为所有表单元素创建名称/值配对，并发送给服务器。如果仅仅是在 CSS 中隐藏，这些字段依然是表单的组成部分，尽管可能不是服务器所需要的。这只是理论上的东西，您可以不同意我。

## 分离行为和结构

分离行为与结构很容易理解：不要把任何 JavaScript 代码写入 HTML 页面中。采取这两步：

* 把所有的 JavaScript 函数定义在一个分离的`.js`文件中，让所需的 HTML 页面连接到它。
* 删除所有的事件处理器（注：即行内的那些诸如`onmouseover`）并归入同一`.js`文件中去。

### 分离文件中的函数

JavaScript 代码属于`.js`文件，而非 HTML 文件。

所以这是错误的：

```html
<script type="text/javascript">
function doAllKindsOfNiftyThings()
{
    // JavaScript code
}
</script>
</head>
<body>
<h1>My HTML page</h1>
[etc.]
```

这才是正确的：

```html
</head>
<body>
<h1>My HTML page</h1>
[etc.]

// 定义在分离的nifty.js中
function doAllKindsOfNiftyThings()
{
    // JavaScript code
}
```

### 删除事件处理器

第二步是把所有 HTML 内的 JavaScript 函数调用移到分离的`.js`中去。事实上，99%的 HTML 内的 JavaScript 代码是行内事件处理器。

以下，器在 HTML 内，但不应该属于 HTML 的：

```html
<a href="home.html" onMouseOver="mOv('home')" onMouseOut="mOut('home')">Home</a>
```

应该定义在分离的`.js`文件中去：

```html
<a href="home.html">Home</a>
```

```js
// in separate .js file
var nav = document.getElementById('navigation');
var navLinks = nav.getElementsByTagName('a');
for (var i=0;i<navLinks.length;i++){
    navLinks[i].onmouseover = [code];
    navLinks[i].onmouseout = [code];
}
```

该脚本处理`id="navigation"`的元素并处理其内的所有连接，然后再赋予连接事件处理器。

### `javascript:`伪协议

有些情况下你会看到像以下的`javascript:`伪协议：

```html
<a href="javascript:doAllKindsOfNiftyThings()">Do Nifty!</a>
```

这个复杂肮脏代码隐藏的含义是一个`onclick`时间处理器：当用户点击该连接，我们需要的是呼叫`doAllKindsOfNiftyThings()`函数。所以您应该从该连接中删除`javascript:`呼叫而用一个独立`.js`文件中的`onclick`时间处理器来取代之：

```html
<a href="somepage.html" id="nifty">Do Nifty!</a>
```

```js
// in separate .js file
document.getElementById('nifty').onclick = doAllKindsOfNiftyThings;
```

因此，对于`href`，应该包含一个完整的 url 以备没 script 的用户能够访问，否则整条连接都由 JavaScript 产生，不具备无障碍性。

**注意：以下内容非正文！**

p.s.有人[点名要爆隐][3]，没办法，只好完成指标：

1.  新千年，学会上网，为了能向心爱的女孩子炫耀，学做网页，想不到现在就跟网页打交道。
2.  新世纪，开日在江西某所大学无所事事，所念专业跟以后的工作一点关系都没有，世界真奇妙。
3.  继续无所事事……
4.  继续无所事事……
5.  继续无所事事……
6.  开始在网上写 blog, 让人知道我多多少少还是知道 web 标准的，在这行业资源匮乏的时候幸运地到了北京工作，并不断进步。
7.  跳了两次槽，希望有个好开始。
8.  不好意思，还有几天才到这个年龄。

[0]: http://webstandards.org/
[1]: http://www.kryogenix.org/code/browser/aqlists/
[3]: http://woooh.com/post/from16to25.html
