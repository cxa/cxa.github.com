---
title: HTML 5新增的元素
---
在本人看来，HTML 5是一个妥协方案，虽不激进，但更能推动技术的继续进步。没有命名空间，元素也不要求闭合（当然这并不是优点），浏览器也可以宽大处理一些错误。一切沿袭上个世纪HTML 4的做法。对于HTML的渲染，浏览器一直停留在1999年的水平。为此，HTML 5是一个实用主义方案，这样不仅可以继续处理这么多年来散落在世界各个角落的HTML，也可以让浏览器厂商更容易添加新特性。这就叫degrade gracefully（优雅降级）。让我们来看看HTML 5增加的一些新元素。

## 结构元素

这真是大快人心。目前，我们定义结构只能通过一个"万能"的`div`, 试图通过设置它的特性`id`的值如header, footer, sidebar等来分别表达头部，底部或者侧栏等。有了它们，代码编写者不再需要为`id`的命名费尽心思，对于手机、阅读器等设备更有语义的好处。HTML 5增加了新的结构元素来表达这些最常用的结构：

* **`section`**: 这可以表达书本的一部分或一章，或者一章内的一节
* **`header`**: 页面主体上的头部。并非`head`元素
* **`footer`**: 页面的底部（页脚），可以是一封邮件签名的所在
* **`nav`**: 到其他页面的链接集合
* **`article`**: 诸如blog, 杂志，纲要等之中的一条独立记录。

举个例子，一个blog的首页，用HTML 5写的话，可以是这样（有省略）：

    <<!DOCTYPE HTML>
    <HTML>
      <head>
        <title>realazy</title>
      </head>
      <body>
        <header>
        <h1>realazy</h1>
        </header>
        <section>
        <article>
        <h2><a href="http://realazy.com/blog">标题</a></h2>
        <p>内容在此...（省略n字）</p>
        </article>
        <article>
        <h2><a href="http://realazy.com/blog">标题2</a></h2>
        <p>内容2在此...（省略n字）</p>
        </article>
        ...
        </section>
        <footer>
        <nav>
        <ul>
          <li><a href="http://realazy/blog">导航1</a></li>
          <li><a href="http://realazy/blog">导航2</a></li>
          ...
        </ul>
        </nav>
        <p>© 2007 realazy</p>
        </footer>
      </body>
    </HTML>

## 块级`block`的语义元素

HTML还增加以下三个块级元素：

* **`aside`**
* **`figure/code>`**
* **`dialog`**

`aside`可以用以表达注记、贴士、侧栏、摘要、插入的引用等诸如作为补充主体的内容。比如这样表达blog的侧栏：

    <aside>
      <h3>最新文章</h3>
      <ul>
        <li><a href="http://realazy.com/blog/">文章标题</a></li>
        ...
      </ul>
    </aside>

`figure`元素表示一个有说明的块级图片。比如：

    <figure>
      <legend>这是图片的说明</legend>
      <img alt="图片可替换文本" src="/path/to/img.png" />
    </figure>

`dialog``元素用于表达人们之间的对话。在HTML 5中，``dt`用于表示说话者，而`dd`则用来表示说话者的内容。如：

    <dialog>
      <dt>佛</dt>
      <dd>色即是空</dd>
      <dt>悟空</dt>
      <dd>我现在需要点空……

## 行内（inline）的语义元素

`m`元素用来标记一些不是那么需要着重强调的文本。现在尚有争议，可能最终会改为`mark`.

`time`元素如其名，用来表达时间。它需要一个`datetime`的特性来标明机器能够认识的时间，如：

    <time datetime="2008-08-08T20:08:08">2008年8月8日晚上8时8分8秒</tiem>

`meter`元素表达特定范围内的数值。可用于薪水、百分比、分数等。比如：

    很遗憾地告诉你，我只有<meter>150cm</meter>

它还有6个特性来表达各方面的含义，比如：

    <p>您的分数是：<meter value="88.7" min="0" max="100" low="65" high="96" optimum="100">B+</meter>.</p>

还有一个`progress`，也是义如其名，用以表达进度：

    目标完成度：<progress value="40" max="100">40%</progress>

## 嵌入多媒体

新增`video`和`audio`元素。顾名思义，分别是用来插入视频和声音的。至于格式，交由浏览器实现，HTML再也不需要特别的代码去播放特定的格式。就像`img`一样，不管是png, jpg还是gif都可以显示。值得注意的是，它们可以包含内容。比如，可以把歌词放到某段歌曲中去：

    <audio src="谁人伴你睡.mp3">
      <p>泪枯干</p>
      <p>难忍怎么委屈自已</p>
      <p>曾经有一刻悲与喜</p>
      ...
    </audio>

## 交互性

HTML 5同时也叫Web Applications 1.0, 因此也进一步发展交互能力。这些标签就是为提高页面的交互体验而生：

* **`details`**
* **`datagrid`**
* **`menu`**
* **`command`**

`details`用来表示一段具体的内容，但是内容默认可能不显示，通过某种手段（如点击）与`legend`交互才显示出来。这跟现在各种通过JavaScript隐藏一段内容，在点击后才显示出来的做法有些类似。比如：

    一句话记录生活中的点点滴滴，
    <details>
      <legend>更多</legend>
      <p>交流与分享，拉近你和朋友，支持 MSN/GTalk/QQ、短信、手机 WAP</p>
    </details>

它可以有一个`open`的特性，用来显示细节与否。

`datagrid`用来控制数据，可以由用户或者脚本来更新。

`menu`HTML 2就存在了，不过HTML 4把它废弃了。HTML 5废物利用，并在期内加上`command`元素。

参考：[New elements in HTML 5][0]

[0]: http://www.ibm.com/developerworks/web/library/x-html5/index.html
