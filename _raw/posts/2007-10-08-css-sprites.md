# CSS Sprites

CSS Sprites 技术不新鲜，早在 2005 年 [CSS Zengarden][0] 的园主 [Dave Shea][1] 就在 [ALA][2] 发表对该技术的 [详细阐述][3]。原先只在 CSS 玩家之间作为一种制作方法流传，后来出来个 [14 Rules for Faster-Loading Web Sites][4], 技术人员之间竞相传阅，其中第一条规则 Make Fewer HTTP Requests 就提到 CSS Sprites。于是这个小妖精就火了起来，甚至出现了 [在线生成工具][5]，势不可挡也。近来国内很多 blog 都提到 CSS Sprites，最著名的例子莫过于 [http://www.google.co.kr/][6] 下方的那几个动画。最新发布的 YUI 中，也是使用到 CSS Sprites，几乎都有的 CSS 装饰图都被一个 [40x2000 的图][7] 包办。社交大站 Facebook 最近也使用了一个 [22x1150 的图片][8] 承担了所有 icon. 一时间，CSS Sprites 无处不在。

## 原理

我们知道，自 CSS 革命以降，HTML 倾向于语义化，在一般情况下不再在标记里写装饰性的内容而是把呈现的任务交给了 CSS。GUI 是缤纷多彩的，少不了各种漂亮的图来装点。新时代的生产方式是，在 HTML 布满各种各样的钩子（hook），然后交由 CSS 来处理。在需要用到图片的时候，现阶段是通过 CSS 属性 `background-image` 组合 `background-repeat`, `background-position` 等来实现（题外话：为何我提现阶段，因为未来浏览器若支持 `content` 则又新增另外的实现方法）。我们的主角是，你一定猜到了，就是 `background-position`。通过调整 `background-position` 的数值，背景图片就能以不同的面貌出现在你眼前。其实图片整体面貌没有变，由于图片位置的改变，你看到只该看到的而已。就好比手表上的日期，你今天看到是 21，明天看到是 22，是因为它的**position**往上跳了一格。所以你也大概了解到，CSS Sprites 一般只能使用到固定大小的盒子（box）里，这样才能够遮挡住不应该看到的部分。

我们使用 YUI 的 sprite.png 举个例子，假如我们有这么一段代码，`max` 代表最大化，`min` 代表最小化，我们需要给它们配上相应的漂亮图片（这样我们的网站才能够吸引人，才可以卖钱，才可以到佛罗里达晒太阳:D）：

```html
<div class="max">最大化</div>
<div class="min">最小化</div>
```

这两个 `class` 都使用同一个图片：

```css
.min,
.max {
  width: 16px;
  height: 16px;
  background-image: url(http://developer.yahoo.com/yui/build/assets/skins/sam/sprite.png);
  background-repeat: no-repeat; /*我们并不想让它平铺*/
  text-indent: -999em; /*隐藏文本的一种方法*/
}
```

效果如下：

![](/assets/missing.png)

我们看到一团灰，没错，因为我们还没有指定 `background-position`，默认为 `0 0`，可以看下 [sprite.png][7], 处于这个位置正是灰块。好了，我们要找到代表最大化的加号和代表最小化的减号的位置找出来。经过测量，最大化按钮位于 Y 轴的 350px 处，最小化按钮位于 Y 轴 400px 处。想一想我们如何才能让它们能够显示出来呢，明显，要向上提升 sprite.png，得到代码如下：

```css
.max {
  background-position: 0 -350px;
}
.min {
  background-position: 0 -400px;
}
```

耶，我们成功了：

![](/assets/missing.png)

（注意：为了举例的方便，本例子直接在 HTML 内置样式，切勿在实践中的非特殊情况使用这种方式）。

## 优点

我们从前面了解到，CSS Sprites 为什么突然跑火，跟能够提升网站性能有关。显而易见，这是它的巨大优点之一。普通制作方式下的大量图片，现在合并成一个图片，大大减少了 HTTP 的连接数。HTTP 连接数对网站的加载性能有重要影响。

## 缺点

至于可维护性，这是一般双刃剑。可能有人喜欢，有人不喜欢，因为每次的图片改动都得往这个图片删除或添加内容，显得稍微繁琐。而且算图片的位置（尤其是这种上千 px 的图）也是一件颇为不爽的事情。当然，在性能的口号下，这些都是可以克服的。

由于图片的位置需要固定为某个绝对数值，这就失去了诸如 `center` 之类的灵活性。

前面我们也提到了，必须限制盒子的大小才能使用 CSS Sprites，否则可能会出现出现干扰图片的情况。这就是说，在一些需要非单向的平铺背景和需要网页缩放的情况下，CSS Sprites 并不合适。YUI 的解决方式是，加大图片之间的距离，这样可以保持有限度的缩放。

## 总结

性能压倒一切。CSS Sprites 是值得推广的一种技术。尤其适宜用于 [FIR][9]，比如固定大小的 icon 替换。为保持兼容性，图片中的各个部分保持一定的距离是一种不错的做法。

### 推荐阅读：

- [CSS Sprites: Image Slicing's Kiss of Death][3]
- [14 Rules for Faster-Loading Web Sites][4]
- [High Performance Web Sites][10]

**更新：**有网友问到 IE6 不支持 png 的问题。其实真相是，IE6 不支持的是半透明（alpha transparency）的 png，对于全透明的 png, IE6 并不存在问题。因此，在实践中，不涉及到半透明而需要透明背景的图片，其实都可以使用 png, 这是很安全的。

[0]: http://csszengarden.com/
[1]: http://www.mezzoblue.com/
[2]: http://www.alistapart.com/
[3]: http://www.alistapart.com/articles/sprites
[4]: http://stevesouders.com/examples/rules.php
[5]: http://www.csssprites.com/
[6]: http://www.google.co.kr/
[7]: http://developer.yahoo.com/yui/build/assets/skins/sam/sprite.png
[8]: http://static.ak.facebook.com/images/sprite/icons.png?db3
[9]: http://www.alistapart.com/articles/fir/
[10]: http://www.oreilly.com/catalog/9780596529307/index.html
