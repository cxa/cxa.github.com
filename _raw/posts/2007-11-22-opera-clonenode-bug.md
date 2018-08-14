# Opera下cloneNode的bug

Opera, 作为 [A-Grade][0] 浏览器，在现在的前端开发中务必支持。它很优秀，很不幸，bug是每个浏览器都不可避免的问题，Opera亦难免。说说我发现的一个关于 `cloneNode` 的问题。

## 问题

假设我们有一个 Form 节点（node）的引用，姑且名之为 `elForm`，现在需要克隆一份，可以这么做：`var elFormClone = elForm.cloneNode(true)`.

在插入这份克隆到 DOM 树中后，IE, Firefox 均未发现问题。Opera会产生这样的问题：表单内的字段无法引用。比如，假设刚才我们的`elForm` 有一个 `<input name="title" ... />`, 此时你无法通过 `elFormClone.title` 或者 `elFormClone['title']` 获取它。

## 解决方案

使用 `document.createElement` 创建 form 元素，然后设置该元素的 `innerHTML`(感谢 MS 发明了它) 为`elForm` 的 `innerHTML` 即可：

```js
var elFormClone = document.createElement('form');
// 设置一些elForm的原属性，有必要的话
...
elFormClone.innerHTML = elForm.innerHTML;
// 处理这个clone, 该咋办就咋办了
...
```

[0]: http://developer.yahoo.com/yui/articles/gbs/#gbschart