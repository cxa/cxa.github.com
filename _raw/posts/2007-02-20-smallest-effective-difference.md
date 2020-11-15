# Smallest effective difference

抱歉还没有找到合适的词来翻译这三个单词的组合。它出自 [Edward Tufte][0]，意思是："Make all visual distinctions as subtle as possible, but still clear and effective"，翻译过来就是说，让元素视觉差别尽可能细微，但依然保证清晰和效率。一个典型的例子是：

![nytimes navigation](/assets/posts/2007_02_20/difffont.png)

（图片来自 [Typographical Contrast][1]）

这是 [The New York Times][2] 的导航系统。看上去有什么特别的吗？没有。但是可以很明确地知道哪些是主导航，哪些是次级导航吗？答案是明确的，但是从视觉上说，并不见得是显而易见的，但你却可以明确区分主次，何也？难道真只可意会而不可言传？让我们来分析一下吧。

最重大的视觉差别在哪？颜色？确实次级导航颜色稍微浅一点。等等，我们来做个实验。以下是我处理过的图片：

![nyt navigation with same font](/assets/posts/2007_02_20/samefont.png)

这下，仔细看，依然可以区分主次，但是得费更大的劲。注意，我只是把次级导航的字体族（font family）改了一下，从视觉上说，这是很细微的变化，如果不细心根本感觉不出来。但是给你的感觉发生了很大的变化，很明显，主次的清晰性大打折扣，即使是细微到很难觉察（当然，如果你是一个称职的视觉设计师，你一眼就能看出来）的变化。

这就是**Smallest effective difference**。如果感兴趣，推荐你继续这篇：[Design Decisions: Basecamp help][3].

让我们看看百度之前的首页（由于找不到相关截图，这是我自己加工的，估计就这么个样，如有不对或者你有之前的真实截图，请指出或者提供，谢谢）：

![百度推行空间前的首页](/assets/posts/2007_02_20/baidu_prev.png)

有一天李老板说，我们要强势推广空间，设计师给我想个方案，在首页上重点突出空间。相信，设计师也准备了大量的方案，套红，加粗，加大等等，这些都是突出的手段。但是，太过突兀会不会伤害用户体验？有没有可能保证空间这一条目跟其他条目之间的差异尽可能小，但是能够重点突出它，吸引用户的注意而又不会让用户产生惊怵？

现在的首页，把空间拎出来，放到了搜索条的下方：

![百度现在的首页](/assets/posts/2007_02_20/baidu_now.png)

空间两字没有套红，也没有加粗加大，只是挪动了一下位置。但是效果就出来了，搜索条产生的非平衡感（不知道这算优点还是缺点，看久了会产生不安，还好用户在这停留的时间很短）让用户迅速把注意力集中到了空间上。Bingo! 目的达到。

尽管我不知道最终决定了这个方案的设计师是否知道 Smallest effective difference，但是这确实是一个 Smallest effective difference 的经典案例。

更新：根据 Seven 的留言，我的加工图是错误的，而且说是空间跟前面内容逻辑不符而另拎出来（小疑问：那怎么更多就可以跟空间在一块呢），当并妨碍我们的 Smallest effective difference 的理论，即使百度设计师真的没有过这样的想法。为我的错误图片感到抱歉，但还是不更换了，留着对比能有说服力。

自然，如果没有参与，永远不要去猜测设计师背后的动机或者支持理论是什么，就像机遇只可遇不可求一样。很多事情往往是无心插柳而成，百度如此设计无意中支持 Smallest effective difference 了，从而也加大了空间的举重。

[0]: http://en.wikipedia.org/wiki/Edward_Tufte
[1]: http://garrettdimon.com/archives/2007/2/19/typographical_contrast/
[2]: http://nytimes.com/
[3]: http://www.37signals.com/svn/posts/137-design-decisions-basecamp-help
