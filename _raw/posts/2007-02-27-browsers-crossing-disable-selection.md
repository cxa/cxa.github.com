---
title: 每周一巧开通暨第一巧发布
---
开通一个"每周一巧"的新分类，每周都会发布一条有关XHTML, CSS和JavaScript等的小技巧。一来分享经验，二来防止本人越来越懒，保证每周至少有一篇blog，也好让本人的feed被刷得勤快点。另外宣布一个消息，ppk on javascript已经中止笔记啦（虽然我已经读完了），因为这本书的中文版已经在翻译了（不是我），避免重复劳动，就决定停止了，总的来说，我认为精华都在我所做笔记的前两章里了 :)

那么，开篇第一巧是：**防止文本选择**。

当然啦，我没说禁止，因为我们的目的绝不是说防止读者从我们的网站拷贝东西（你想用于此目的也是可以的，但只能防菜鸟而已啦），我们的目的是防止一些默认的选择行为，以让我们的JavaScript程序运行起来更平滑。举个例子吧，现在的拖放程序是满天飞啊，你知道，在浏览器里，按着鼠标拖动的默认行为是：鼠标经过的文本会被选中，反白高亮，这就导致不好的用户体验（凡事说到这个**大词**，绝对有搞头，我也不能免俗，sorry）了。好吧，为避滥增字数的嫌疑，我就把本周的即时贴公布如下：

```js
function disableMouseSelection(element){
    if (element.onselectstart !== undefined){
        element.onselectstart = returnFalse;
    }
    else if (element.style.MozUserSelect !== undefined){
        element.style.MozUserSelect = "none";
    }
    else if (element.style.KhtmlUserSelect !== undefined){
        element.style.KhtmlUserSelect = "none";
    }
    else {
        element.onmousedown = returnFalse;
    }

    if (element.ondrag !== undefined){
        element.ondrag = returnFalse;
    }
}
disableMouseSelection(document.documentElement);//把document的根传入，就可以防止整个页面被选择的可能了
```

既然是巧，一切都是自我解释，就没有什么好阐述的了。彪悍的人生不需要XX，强悍的代码也不需要注释。其实无形中我也公布第二巧了，就是，在基于Gecko和KHTML的浏览器中，防止选择文本是可以通过样式设置来实现了，即

```css
selector {-moz-user-select: none; -khtml-user-select:none; user-select: none;}
```

废话既然已经一箩筐，我就继续展开吧。其实这是CSS3中User Interface的一个性质：`user-select`，Gecko和KHTML让我们超前体验。更多详细的，你问Google或者你觉得_百度一下，你就知道_，那就百度吧 XD。