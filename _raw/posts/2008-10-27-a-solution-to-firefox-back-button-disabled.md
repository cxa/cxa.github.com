# Firebox 3 后退后按钮 diasabled 状态不恢复的一个解决方案

Firefox 3 有一个很让人讨厌的 bug：基于某种目的，在表单提交时 disable 掉提交按钮，通过后退键回到这个页面后，这个提交按钮的状态依旧保持为 `disabled` 的状态，重新载入（软硬刷新）也无法改变。

google 良久，从 [https://developer.mozilla.org/En/Using_Firefox_1.5_caching][0] 中发现一个 `window.onpageshow` 事件，`window.onload` 事件无法在后退的页面中出发，但这个可以，所以解决方案就是它了。

```js
window.addEventListener(
  "pageshow",
  function (e) {
    // 重置你不需要 disabled 的按钮
  },
  false
);
```

**更新：**网友岁月如歌的[解决方案][1]比我的方案简易和正宗多了：给提交按钮加上 `autocomplete="off"` 的属性。

[0]: https://developer.mozilla.org/En/Using_Firefox_1.5_caching
[1]: http://lifesinger.org/blog/?p=569
