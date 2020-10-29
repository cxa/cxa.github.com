# 让 IE6 去死——对 IE6 隐藏样式表

我们都知道使用 `@import` 可以对 NS4 隐藏样式表。

我们知道 `@import` 的格式是：

```css
@import url(path/to/css.css) mediatype;
```

后边的 `mediatype` 是可选的。

但加上 mediatype 后，无论是一个还是两个还是多个，IE6 就会过滤（filter）掉整个 CSS，郁闷啊，呵呵。

如果你着实要使用 mediatype，你可以在 `style` 标记（tag）指定。比如

```html
<style type="text/css" media="screen,projection">
```
