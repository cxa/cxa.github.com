---
title: Designing for the Web
---
来自[Digital Web Magazine][0]的[Designing for the Web][1]， 总结了一些针对**WEB**设计需要注意的问题。

## 第一，分辨率。显示器分辩率使用情况如下：

<table>
<tbody>
<tr>
<th>Screen Resolution</th>
<th>2005</th>
<th>2004</th>
</tr>
<tr>
<td>Larger</td>
<td>11%</td>
<td>10%</td>
</tr>
<tr>
<td>1024&nbsp;×&nbsp;768</td>
<td>56%</td>
<td>50%</td>
</tr>
<tr>
<td>800&nbsp;×&nbsp;600</td>
<td>28%</td>
<td>35%</td>
</tr>
<tr>
<td>Smaller/Unknown</td>
<td>5%</td>
<td>5%</td>
</tr>
</tbody>
</table>

我们不去追究数据的权威性，但至少可以反映个大概。依据中国国情，使用800x600的用户难说不会比上述数据大，所以，现在绝对不要抛弃我们的800x600的用户。

至于图片的分辨率，这篇文章说得太多了，我觉得web设计中，时刻记着72dpi就够。

## 第二，浏览器使用情况。

<table>
<tbody>
<tr>
<th>Browser</th>
<th>2005 (July)</th>
<th>2004 (December)</th>
</tr>
<tr>
<td>IE 6</td>
<td>67.90%</td>
<td>65.50%</td>
</tr>
<tr>
<td>IE 5</td>
<td>5.90%</td>
<td>9.90%</td>
</tr>
<tr>
<td>Firefox</td>
<td>19.80%</td>
<td>n/a</td>
</tr>
<tr>
<td>Opera</td>
<td>1.20%</td>
<td>1.80%</td>
</tr>
<tr>
<td>Mozilla</td>
<td>2.60%</td>
<td>17%</td>
</tr>
<tr>
<td>Netscape</td>
<td>0.50%</td>
<td>1.60%</td>
</tr>
</tbody>
</table>

如果不是特殊需求，我觉得Designing for IE 6+ & Gecko based (etc. Firefox)就够了。

而浏览器实际能够处理的分辨率如下：

<table>
<tbody>
<tr>
<th>Screen size</th>
<th>IE 6</th>
<th>Firefox</th>
<th>Opera</th>
<th>Mozilla</th>
<th>Netscape</th>
</tr>
<tr>
<td>800&nbsp;×&nbsp;600</td>
<td>779&nbsp;×&nbsp;400</td>
<td>781&nbsp;×&nbsp;434</td>
<td>777&nbsp;×&nbsp;427</td>
<td>779&nbsp;×&nbsp;420</td>
<td>781&nbsp;×&nbsp;389</td>
</tr>
<tr>
<td>1024&nbsp;×&nbsp;768</td>
<td>1003&nbsp;×&nbsp;568</td>
<td>1005&nbsp;×&nbsp;602</td>
<td>1001&nbsp;×&nbsp;595</td>
<td>1003&nbsp;×&nbsp;588</td>
<td>1005&nbsp;×&nbsp;557</td>
</tr>
</tbody>
</table>

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