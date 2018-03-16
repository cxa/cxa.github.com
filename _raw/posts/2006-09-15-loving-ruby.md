---
title: 爱上Ruby
---
我不是一个程序员，虽然书是买了一大堆，但从来没有系统学习过编程。大学四年级的时候想过一下计算机三级，所以就买了K&R啃了一下，最后只把 `if ...else`学到手，至今连指针是啥都不懂。但这并不能磨灭我的兴趣，呵呵。

我之前考虑过PHP, Python, Perl, Bash等等语言的学习，但都无疾而终，为自己汗一把……我不知道现在喜欢上的Ruby会不会是这样的结果，但终于能从中找到一些乐趣了，而且不像以前那些想学的语言那么费脑筋，短短几句语句就能做到很多事情，真的很爽。

得从[Ruby on Rails][0]说起。它是[37signals][1]公司的一个雇员，2005年最热门的黑客[DHH][2]在2004年创建的，据称其"敏捷开发"模式撼动了Java世界，并吸引不少Java牛人。这些对我来说意义不大。我买了一本[应用Rails进行敏捷Web开发][3]，并把书中的例子做了一遍，发现真的太爽了，几乎不能叫编程，只能叫"把问题描述清楚"。还有它的模板系统（rhtml），跟php的smarty有点类似，但简单多了，对我来说，真是为所欲为呢……

RoR的网站是基于Web标准建立的，还有最近上线的[Ruby官方网][4]也是，我敢打赌世界上没有哪门程序语言的网站能做得有Ruby的漂亮，呵呵。虽然这不是重点，但无疑大大地增加了我的好感，让我感觉它是最前卫的语言……

**最前卫**？的确如此。想想看，一个数组，不用遍历，直接拿过来用（`puts array`），而且排序简单（`array.sort`）,还可以做加减（`array1 - array2`，array1中就会pop掉array2中存在的元素）， 还有chainable（`puts gets.reverse.capitalize`）（呵呵，这也是我用jQuery的原因之一），这只是我刚学ruby就能体会的东西，更多精彩的还在后头。**一切都激动人心**。

所以我打算抽点时间好好学习一下Ruby，或许让它成为我的"程序母语"也未尝不可，然后再去玩玩Ruby on Rails。所以今天开了一个Ruby类别，好好学习，诸位看官，你们要多多监督啊～

最后，奉上今天的习作，用ruby搞了个playlist。看看，代码是不是很酷？

```ruby
File.open 'playlist.m3u', 'w' do |f|
    f.write Dir['/home/realazy/Music/*.{mp3,MP3}'].join("\\n")
end
```

[0]: http://www.rubyonrails.org/
[1]: http://www.37signals.com/
[2]: http://www.loudthinking.com/
[3]: http://www.china-pub.com/computers/common/info.asp?id=30058
[4]: http://www.ruby-lang.org/en/
