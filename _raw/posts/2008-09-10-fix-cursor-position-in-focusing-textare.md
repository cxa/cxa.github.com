---
title: focus 进 textarea 元素后光标位置的修复
---
## 问题

一个已经有内容的 `textarea` 元素，在执行该元素的 `.focus()` 方法后，不同的浏览器有不同表现。我们的预期是能够出现在内容后面，但只有 gecko 浏览器能做到。

## 修复

注意：这个函数不能直接运行，函数内的 isIE, isOpera 和 isWebkit 需要你的库提供或你编写，这并不难，对吧。

```js
function fixTextareaFocusCursorPosition(elTextarea){
    if (isIE || isOpera){
        var rng = elTextarea.createTextRange();
        rng.text = elTextarea.value;
        rng.collapse(false);
    } else if (isWebkit) {
        elTextarea.select();
        window.getSelection().collapseToEnd();
    }
}
```
