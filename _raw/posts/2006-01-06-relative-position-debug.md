# 笔记：消除 IE absolute/relative 下某些 border,background 神秘消失之 bug

## bug 描述

某个元素如 `div` 使用了 `position: relative;` 后，其内的元素设置了 `border` 或者 `background`，在 IE 浏览器下，这些 `border` 或者 `background` 展现出来的线条或者图片会神秘消失，拖动滚动条偶会出现。如图：

![](/assets/missing.png)

## 解决办法

暂时发现的方法是给设置了 `border` 或者 `background` 的元素也设置成 `position: relative;`。

还有什么办法，欢迎大家交流、分享经验。
