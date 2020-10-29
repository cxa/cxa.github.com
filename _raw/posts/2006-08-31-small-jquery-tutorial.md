# 小试牛刀——一篇 jQuery 小教程

写个小教程，以期能让大家对 [jQuery](http://jquery.com)有所了解，甚至喜欢上它（请不要怪我）。

不废话，先说明我们的目的。我们知道，当代浏览器（modern browsers）的文本框的聚焦(focus)样式可以通过 CSS 的伪类 `:focus` 来设置。假设我们有这么一段代码：

```html
<form>
  <dl>
    <dt>Name:</dt>
    <dt></dt>
    <dd><input type="text" /></dd>
    <dt>Password:</dt>
    <dt></dt>
    <dd><input type="password" /></dd>
    <dt>Textarea:</dt>
    <dt></dt>
    <dd><textarea></textarea></dd>
  </dl>
</form>
```

则我们这样的 CSS 就可以搞定 focus 样式：

```css
input[type="text"]:focus,
input[type="password"]:focus,
textarea:focus {
  border: 1px solid #f00;
  background: #fcc;
}
```

简单不过，对不？你可以拿任何一款当代浏览器来测试（Firefox, Safari, IE7）： [http://realazy.com/lab/jquery/tut/form_hover_step1.html](http://realazy.com/lab/jquery/tut/form_hover_step1.html)。IE6? 呵呵，这就是本篇教程的目的所在，没错，既然 IE 不支持 `:focus`，我们只能 [Using DOM Scripting to Plug the Holes in CSS](http://domscripting.com/presentations/atmedia2006/slides/)，不过我们用 jQuery 来实现。

先来看看 jQuery 的工作方式。jQuery 使用美元符号**`$`**来返回一个 jQuery 对象，然后我们就可以使用 jQuery 提供的 API（接口。很多很多很实用，赶紧参考 [Visual JQuery](http://visualjquery.com/index.xml)）进行操作了。

我们都不懂程序，对，我假设你跟我这样，只是了解一些最基本的语法（对不起大虾了，高手不要自扁身份）。既然我们不懂，我们就用 CSS 的方式来思维。

首先我们要从 DOM 中获得 `type="text"`, `type="password"` 的 `input` 和 `textarea`。对，我们伟大的美金出场了，哦，是美元符号。参考 [http://proj.jquery.com/docs/Base/Expression/CSS/](http://proj.jquery.com/docs/Base/Expression/CSS/)，我们知道，我们可以这样选择到他们：

```js
$("input[@type='text'], input[@type='password'], textarea");
```

选中它们以后呢？我们就要靠事件（event）来处理了。`:focus` 对应的的事件是 `onfocus`，然而 jQuery 讨厌 on，于是就是 `focus` 了，多好 :) （参考 [http://proj.jquery.com/docs/EventModule/](http://proj.jquery.com/docs/EventModule/)）。于是我们知道我们该这么做：

```js
$("input[@type='text'], input[@type='password'], textarea").focus();
```

嘿嘿，我们已经迈出一大步了！我们要继续告诉 `focus` 该做些什么。在 jQuery 中，我们通常需要一些匿名函数来帮我们干些事情，不理解不打紧，让我们继续：

```js
$(
  "input[@type='text'], input[@type='password'], textarea"
).focus(function () {});
```

我们的目的是什么？对，是给聚焦的文本框加上样式。jQuery 有一个 `css (prop)` 的 API，参考前面的 CSS，我们可以这么写：

```js
css({ background: "#fcc", border: "1px solid #f00" });
```

bingo! 离成功仅一步之遥。我假设你知道，返回对象自身使用 `this`。在 jQuery 中，返回自身当然也是 this, 但是，需要返回的对象还是 jQuery 对象，我们还必须使用美元符号。所以是 `$(this)`。那么：

```js
$("input[@type='text'], input[@type='password'], textarea").focus(function () {
  $(this).css({ background: "#fcc", border: "1px solid #f00" });
});
```

That's it! 然后我们该怎么执行这段代码呢？ 我们知道有一个 `body onload=""` 可以用，也知道有一个 `window.onload` 可以用，但 jQuery 提供了一个更佳的方案，让我们可以进一步分离结构与交互。

```js
$(document).ready(function () {
  // Your code here...
});
```

所以我们只需将我们的代码放到里面去：

```js
$(document).ready(function () {
  $("input[@type='text'], input[@type='password'], textarea").focus(
    function () {
      $(this).css({ background: "#fcc", border: "1px solid #f00" });
    }
  );
});
```

呵呵……貌似成功了。等等，我们要送佛送到西天，好人做到底……在上面的交互中，只有聚焦的情况，那么失焦的时候呢？嗯，我们不要想当然，失焦？那么聚焦的样式就自动清楚清除了嘛~不会的，除非我们明确告诉它。依瓢画葫芦：

```js
$(this).blur(function () {
  $(this).css({ background: "transparent", border: "1px solid #ccc" });
});
```

嗯，说到 jQuery 的强大之处了，jQuery 对象可以接受无数个函数回调/消息/方法（哪一种是正确说法，请高手指教），也就是传说中的**Chainability**。也就是说我们不必要分两行写，一气呵成：

```js
$(document).ready(function () {
  $("input[@type='text'], input[@type='password'], textarea")
    .focus(function () {
      $(this).css({ background: "#fcc", border: "1px solid #f00" });
    })
    .blur(function () {
      $(this).css({ background: "transparent", border: "1px solid #ccc" });
    });
});
```

啊呵，又一次貌似完成……又等一等，我们只需要针对 IE 啊，其他浏览器都可以使用 CSS 来实现，我们何苦要用 JS 来降低它们的处理效率呢，所以，我们用了 jQuery 自带的定义：

```js
$(document).ready(function () {
  if ($.browser.msie) {
    $("input[@type='text'], input[@type='password'], textarea")
      .focus(function () {
        $(this).css({ background: "#fcc", border: "1px solid #f00" });
      })
      .blur(function () {
        $(this).css({ background: "transparent", border: "1px solid #ccc" });
      });
  }
});
```

耶！我们真的完成了！嗯哪，要判断浏览器版本？似乎 jQuery 没有提供，但可以看看这个 jQuery 插件（plugin）：[jQBrowser](http://davecardwell.co.uk/geekery/javascript/jquery/jqbrowser/). 嗯嗯，似乎忘了跟大家说，jQuery 还拥有许多超强的插件！有时间我整理几个出来奉献给大家。

对，看看我们这一步的成果：[http://realazy.com/lab/jquery/tut/form_hover_step2.html](http://realazy.com/lab/jquery/tut/form_hover_step2.html)，一定记得用 IE6 查看。

貌似又完成了一次（汗，前边不是说我们真的完成了么），不！大家看得爽的时候还记得我是做什么的吗？对对对，是**Web 标准**！Web 标准提倡什么？结构，表现，交互相分离啊，我们把样式写到了 JS 里边，相信这不是好事情。难不倒我们 jQuery 的！我们换种思路，我们把样式在一个 `class` 里定义好，在 `focus` 的时候加上的这个 `class`，`blur` 的时候去掉这个 `class` 不就 OK 了吗？聪明……jQuery 相应的 API 是 `addClass` 和 `removeClass`。过程不累赘了，否则篇幅又得增加一半（我还要睡觉，明天还要上班，可怜的上班族），代码如下：

```js
$(document).ready(function () {
  if ($.browser.msie) {
    $("input[@type='text'], input[@type='password'], textarea")
      .focus(function () {
        $(this).addClass("ie_focus");
      })
      .blur(function () {
        $(this).removeClass("ie_focus");
      });
  }
});
```

我必须承认，我把这个 `class` 命名为 `ie_focus` 是有点变态。嗯，进一步，虽然我们这个代码不大，但我们也分离出来一个独立文件吧。这是我们的最后步骤的演示：[http://realazy.com/lab/jquery/tut/form_hover_step3.html](http://realazy.com/lab/jquery/tut/form_hover_step3.html)，记得看源码哦。

很简单，对不？jQuery 的威力不止于此，还有需多更酷更强的功能留待，你，和，我，共同探索。

P.S. jQuery 的代码也很优美，对不？这种函数式编程风格我个人是十分喜欢的，但是大括号，小括号敲到我手疼……所有我又深深地爱上了基本上看不到括号的 [Ruby](http://www.ruby-lang.org/)，**Orz**...阿门，晚安……
N
