# CSS `background-size` 妙用一则

::CSS::

最近发现有个设计风格（不知道是不是趋势），如下图，是一种浸入式的底边框。

![浸入式边框](/assets/til/2020-12-07.png)

直接用 `border-bottom` 肯定不行，来个 `:after` 伪元素细调，比较麻烦。使用 `background` 来平铺纯色背景是一个不错的主意，但如果定死图片高度，不够 responsive。通过 CSS 来画背景，具体要显示多少，我们则可以拜托 `background-size`：

```css
display: inline-block; /* 让背景宽度跟随元素自身宽度 */
background: linear-gradient(#6ee7b7, #6ee7b7) left bottom no-repeat;
background-size: 100% 40%; /* 划重点 */
```

访问 [demo][0]。

`backgroud-size` 可参考 <https://developer.mozilla.org/en-US/docs/Web/CSS/background-size>。

[0]: /assets/til/2020-12-07.html
