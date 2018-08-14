# opera img onload重复执行

由于某些原因需要把函数直接放到 `img` 标签上的 `onload` 属性执行，比如：

For some reasons we have to execute the JavaScript function in the `img` tag's attribute `onload`, e.g.

```html
<img onload="javascript:jsFunction();" ...
```

开启 Opera, CPU 狂窜到 100%……

When using Opera browser, the CPU usage is up to 100%...

原来丫会重复执行 `jsFunction`……只好加个变量来记录是否已经执行。

Because Opera execute `jsFunction` repeatedly. The solution is adding an flag variable to track the function be executed or not.

Google 一下并没有发现这方面的资料，所以记下来，希望能帮助碰到这个问题的人。为了表现我的国际主义精神，特翻译了一下（至于这句，就不翻了……）。
