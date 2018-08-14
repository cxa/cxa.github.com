# AIR 的尝试

最近利用 [Adobe AIR][0] 做了一个饭否客户端：[爱饭][1]，并将之[开源][2]。使用 HTML, CSS 和 JavaScript 对着 API 文档照虎画猫，大概三个星期完工，有一些感想和总结。

1. AIR 的开发对 Web 开发者非常友好，基本上不需要额外的程序知识了，甚至可以使用已有的 JS 库，爱饭就使用了 YUI。但是生成的程序有一通病，那就是占用内存高（爱饭在 Windows 下占用 40m 左右），而且不存在优化之说。做严肃的应用 AIR 还是上不了台面。很多时候觉得，打开一个 AIR 程序，其实就是打开了一个浏览器。
2. absolute 的 CSS 布局方式非常灵活，对窗口缩放这种情况具有非常好的适应性。使用 webkit 引擎的 AIR 对 absolute 完全支持。如果是 IE 这种支持残缺的引擎，那得费非常多的 JS 代码。在 AIR 下写 CSS 有一种莫名的快感。正好 24ways 上发布了一篇关于 absolute 方式布局的文章，免却了我的罗嗦，见：[Absolute Columns][3]。
3. AIR 对 Linux 的支持还是存在缺失，比如无法给窗口加阴影，看来是 Linux 下的 Flash 支持跟不上。

完毕。

[0]: http://www.adobe.com/products/air/
[1]: http://ifan.realazy.org/
[2]: http://code.google.com/p/ifan/
[3]: http://24ways.org/2008/absolute-columns