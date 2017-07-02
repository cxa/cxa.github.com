---
title: Designing for the Web
---
来自[Digital Web Magazine][0]的[Designing for the Web][1]， 总结了一些针对**WEB**设计需要注意的问题。

## 第一，分辨率。显示器分辩率使用情况如下：
Screen Resolution
2005
2004

Larger
11%
10%

1024 × 768
56%
50%

800 × 600
28%
35%

Smaller/Unknown
5%
5%

我们不去追究数据的权威性，但至少可以反映个大概。依据中国国情，使用800x600的用户难说不会比上述数据大，所以，现在绝对不要抛弃我们的800x600的用户。

至于图片的分辨率，这篇文章说得太多了，我觉得web设计中，时刻记着72dpi就够。

## 第二，浏览器使用情况。
Browser
2005 (July)
2004 (December)

IE 6
67.90%
65.50%

IE 5
5.90%
9.90%

Firefox
19.80%
n/a

Opera
1.20%
1.80%

Mozilla
2.60%
17%

Netscape
0.50%
1.60%

如果不是特殊需求，我觉得Designing for IE 6+ & Gecko based (etc. Firefox)就够了。

而浏览器实际能够处理的分辨率如下：
Screen size
IE 6
Firefox
Opera
Mozilla
Netscape

800 × 600
779 × 400
781 × 434
777 × 427
779 × 420
781 × 389

1024 × 768
1003 × 568
1005 × 602
1001 × 595
1003 × 588
1005 × 557

不知道为什么在宽度上Mozilla会比Firefox少2px？总之以最小值来衡量就ok了。文章还提到基于百分比设计（可伸缩、可扩展），但这确实是一个难题，得看实际情况，该文也没有给出什么能令人满意的答案。

## 第三、用色。

唯一能够跨平台的就是web216安全色。

## 第四、图片压缩

对比gif, jpg, png。我的感觉是，png未来比较有前途。我敢打赌，等IE支持alpha的png后（应该不远了），满世界都是png。

## 第五、文本（字体）

这个字体常用列表比较有用：

* Arial, Helvetica, sans-serif
* Times New Roman, Times, serif
* Courier New, Courier, mono
* Georgia, Times New Roman, Times, serif
* Verdana, Arial, Helvetica, sans-serif
* Geneva, Arial, Helvetica, sans-serif

## 其他相关

还需要注意易用性，可用性还有受众（Audience）的问题。

"As Web designers, everything we do is for the user. "

[0]: http://www.digital-web.com/
[1]: http://www.digital-web.com/articles/designing_for_the_web/