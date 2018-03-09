---
title: 认识延迟时间为 0 的 setTimeout
---
由 John Resig 的 [How JavaScript Timers Work][0] 可以知道，现有的 JavaScript 引擎是单线程处理任务的。它把任务放到队列中，不会同步去执行，必须在完成一个任务后才开始另外一个任务。

让我们看看我之前的文章：[JavaScript的9个陷阱及评点][1]，在第 9 点 Focus Pocus 中提到的问题。原作者对这个认识有所偏差，其实不只是 IE 的问题，而是现有 JavaScript 引擎对于线程实现的问题（关于线程，我的概念其实不多，如果不对，希望读者多多指教）。我们通过一个例子来说明，请访问 [http://realazy.com/lab/settimeout.html][2]. 我们来看 1 和 2。如果你能看看源代码，会发现我们的任务很简单，就是给文档增加一个 `input` 文本框，并聚焦和选中。请现在分别点击一下，可以看到，1 并没有能够聚焦和选中，而 2 可以。它们之间的区别在于，在执行

    input.focus();
    input.select();

时， 2 多了一个延迟时间为 0 的 `setTimeout` 的外围函数，即：

    setTimeout(function(){
    	input.focus();
    	input.select();
    }, 0);

按照 JavaScript: The Definitive Guide 5th 的 14.1 所说：

> 在实践中，`setTimeout` 会在其完成当前任何延宕事件的事件处理器的执行，以及完成文档当前状态更新后，告诉浏览器去启用 `setTimeout` 内注册的函数。

其实，这是一个把需要执行的任务从队列中跳脱的技巧。回到前面的例子，JavaScript 引擎在执行 `onkeypress` 时，由于没有多线程的同步执行，不可能同时去处理刚创建元素的 `focus` 和 `select` 事件，由于这两个事件都不在队列中，在完成 `onkeypress` 后，JavaScript 引擎已经丢弃了这两个事件，正如你看到的例子 1 的情况。而在例子 2 中，由于`setTimeout`可以把任务从某个队列中跳脱成为新队列，因而能够得到期望的结果。

这才是延迟事件为 0 的`setTimeout`的真正目的。在此，你可以看看例子 3，它的任务是实时更新输入的文本，现在请试试，你会发现预览区域总是落后一拍，比如你输 a, 预览区并没有出现 a, 在紧接输入 b 时， a 才不慌不忙地出现。其实我们是有办法让预览区跟输入框同步地，在此我没有给出答案，因为上面所说的，就是解决思路，try it yourself!

[0]: http://ejohn.org/blog/how-javascript-timers-work/
[1]: /posts/2007-08-20-nine-javascript-gotchas.html
[2]: http://realazy.com/lab/settimeout.html
