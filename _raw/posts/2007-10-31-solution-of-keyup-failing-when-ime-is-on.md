---
title: 输入法下keyup失效的解决方案
---
在某些情况下，比如自动补全（auto complete）的输入框中，需要使用`keyup`事件来监听键盘的输入以迅速作出回应。

关键在于`keyup`, 如果世界是美好的，那么就不会有这篇blog. 可是……

世界是不美好的。我们活在中文世界，我们要用输入法。在输入法开启的情况下，您会碰到不美好的事情：`keyup`失效。对于您绑定到`keyup`的任何回调函数，除非您把输入法切换回英文状态，否则它会无动于衷。如果能称之为bug，我会很高兴，因为bug会有修复的可能，如果是特征（feature），那么，我只好叹息一下。

## 问题

在开启输入法的情况下，三个浏览器的具体问题如下：

* **IE:**触发keydown和keyup, 不触发keypress. 能够获得输入值。
* **Firefox:**触发keydown和keypress, 不触发keyup. 输入值未能获得。在回车后会触发keyup, 可获得输入值。
* **Opera:**keydown, keypress和keyup都不触发，输入值也未能获。

（如果您能帮我试用一下Safari，我会很高兴并谢谢您。这里有一个测试页面：[http://tonextone.com/test/eventTest.html][0]）

## 解决方案

总结出以上问题，没有兴奋反而陷入绝望，因为没有google出解决方案（是的，对于拉丁语系的老外来说，不会存在输入法）。但是，wait, 谷歌搜索的自动补全不是工作得好好的吗？于是研究一下这个 [http://www.google.cn/ac.js][1]。嘿嘿，虽然混淆得还可以，但还是可以发现蛛丝马脚的。它使用一个计时器，当输入框处于聚焦（focus）状态时，每 10 毫秒执行一次回调函数。

虽然挺耗资源（所以建议在输入框失焦（blur）时，一定要清除这个计时器），但也只能如此了。作前端开发的，不仅要与语言（JavaScript, CSS, HTML） 斗，还要与浏览器斗，其乐无穷也。

**更新：**IE 有一个 `onpropertychange` 事件处理器可以随时检测变化，对应之，Firefox 和 Opera 有一个 `oninput` 事件处理器也可以达到目的。遗憾的是，在输入法开启的情况下，Opera对于 `oninput` 也没法随时监听（表现在：输入英文字母可以监听到，而中文则失效）。如果不考虑 Opera, IE使用 `onpropertychange` 而 Firefox 使用 `oninput`, 也可解决我们上述问题。

另外需要注意的是， `oninput` 比较诡异，您可以`<input oninput="jsFunc()" ... />`来绑定，也可以用`addEventListener`来绑定，就是不能使用 DOM 0 的`element.oninput = function(){}` 的形式来绑定，否则不生效。

未曾测试Safari, 有心者可自行测试之。

[0]: http://tonextone.com/test/eventTest.html
[1]: http://www.google.cn/ac.js
