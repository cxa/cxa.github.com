# 使用 iframe 获取网页片段的一个好处

异步操作数据的方式有两种常见的方式：`XMLHttpRequest` 和 `iframe`. 孰优孰劣在此我们不争论，只是想举一个例子说明在获取网片片段上，使用 `iframe` 有一个比 `XMLHttpRequest` 更易企及的好处。

Ajax 常见的一种使用方法是加载网页片段填充某个区域。假设我们要在网页 foo.com/index 上请求 foo.com/partial。我们假设 partial 就是 HTML，不涉及 JSON 或 XML 格式。在这种情况下：

1. 使用 `XMLHttpRequest` 直接访问 partial，获取 responseText 后赋予 index 页面上某个元素的 innerHTML 即可完成。partial 必须是一个纯粹的 HTML 片段（基于以上假设）。
2. 在页面上创建一个隐藏的 iframe, 使用 iframe 的 src 请求 partial, partial 可以作为一个完整的页面，里面包含 JavaScript，由 partial 里的 JS 完成替换 index 上页面片段替换。

第二种看起来更繁琐，但能给我们更多控制权。例如，假如用户直接访问 foo.com/partial（这种情况很容易发生，假设您是 unobtrusive 的拥护者，机会更大，例如需要点击网页上的链接更新某部分内容时，用户使用新窗口打开了改链接）, 你希望她看到的是什么内容呢？

在第一种情况中，用户看到的是代码片段，绝大部分下没有任何样式，也没有任何额外提示，导致用户体验的下降。因为只是一个 HTML 片段，你什么事都干不了。

但在第二种情况下，用户看到内容可能也只是 HTML 片段，但这却是一个完整的页面，一个可以执行 JS 的完整页面。我们只需检查这个页面的 parent 对象有没有我们预设的值，就可以判断它是不是在 iframe 之内了，然后我们可以让它跳转到正常的页面。

Demo: [http://realazy.com/lab/xhrvsiframe/][0]

[0]: http://realazy.com/lab/xhrvsiframe/
