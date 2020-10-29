# 表格的 web 标准解决方案（一）

来自 [Dan Cederholm][0] 的 Web Standards Solutions: The Markup and Style Handbook 的第三章 Tables are Evil?，事关表格在 web 标准下的正确使用。我利用工作的空余时间，将这一章节完全翻译奉上。今天送上 A Table that Everyone Can Sit At，还不是很精彩。

待翻译完整章后我会整理成传承标准的一个栏目。由于工作关系，大伙不要催我，我会自觉完成的。:)

## 完全表格式

完全没有理由不用表格来标记表格式的数据。但是等等，什么叫表格式数据？这是一些例子：

- 日历
- 电子数据表
- 制图
- 时间进度表

这些例子和其他更多的，（不使用表格的话）可能需要很多 CSS 高难度技术来标记以便看起来像是一个表格。你可以想象一下，试着用狡诈的 CSS 规则来浮动和定位每一项，但往往只能以沮丧的结局告终。不要说没有 CSS 就能精确的读出数据是一个恶梦。事实是，我们不应该害怕表格——并且应该在正确的场合使用它们。

## 人人适合的表格

表格受到谴责的一个原因是，如果使用不小心，它们会导致易用性的问题。比如，屏幕阅读器要正确读取十分艰难，小屏幕设备常常因用以布局的表格而备受干扰。但是还有一些细小的事情我们可以做到，以提高数据表格的易用性，同时创建了一个苗条的结构，然后可以轻易地用 CSS 来样式化。

让我们来看看一个简单的表格例子，如图，描述了一支美国棒球队的长期战败。

![](/assets/missing.png)

尽管 Red Sox 迷看到会极度失望，但这还是一个极为完美表格式数据的例子。有三个表格**头部(Header)，包括 Year, Opponent, and Season Record (W-L)**，跟随着该队四年中表现的数据。表格之上的是说明(Caption)，定义表格所包含的内容。

标记这样的数据表格是很直截了当的，我们可能会这样做：

```html
<p align="center">Boston Red Sox World Series Championships</p>
<table>
  <tr>
    <td align="center"><b>Year</b></td>
    <td align="center"><b>Opponent</b></td>
    <td align="center"><b>Season Record (W-L)</b></td>
  </tr>
  <tr>
    <td>1918</td>
    <td>Chicago Cubs</td>
    <td>75-51</td>
  </tr>
  <tr>
    <td>1916</td>
    <td>Brooklyn Robins</td>
    <td>91-63</td>
  </tr>
  <tr>
    <td>1915</td>
    <td>Philadelphia Phillies</td>
    <td>101-50</td>
  </tr>
  <tr>
    <td>1912</td>
    <td>New York Giants</td>
    <td>105-47</td>
  </tr>
</table>
```

这将会产生跟图十分接近的效果，但是，有些东西我们还可以改进。

首先，我们马上可以把表格的标题"Boston Red Sox World Series Championships" ，修正成更具语义性的 `<caption>` 标签。`<caption>` 需要马上跟随 `<table>` 起始标签之后，通常包含标题，和/或说明在表格内的内容的本质。

显而易见地，表格地用意很容易为视力正常的人们所理解，同时能够帮助使用非可视化工具浏览的人。

让我们用恰当的 `<caption>` 来取代开始的段落吧：

```html
<table>
  **
  <caption>
    Boston Red Sox World Series Championships
  </caption>
  **
  <tr>
    <td align="center"><b>Year</b></td>
    <td align="center"><b>Opponent</b></td>
    <td align="center"><b>Season Record (W-L)</b></td>
  </tr>
  <tr>
    <td>1918</td>
    <td>Chicago Cubs</td>
    <td>75-51</td>
  </tr>
  <tr>
    <td>1916</td>
    <td>Brooklyn Robins</td>
    <td>91-63</td>
  </tr>
  <tr>
    <td>1915</td>
    <td>Philadelphia Phillies</td>
    <td>101-50</td>
  </tr>
  <tr>
    <td>1912</td>
    <td>New York Giants</td>
    <td>105-47</td>
  </tr>
</table>
```

用以传递表格内容信息的说明是很重要的。默认下，大部分可视化浏览器将会把 `<caption>` 标签内的文字放置在表格上方中间处。我们可以，当然，更改默认的样式——后面我们还有例子演示。现在只需了解，表格本身独特的标签让这更漂亮和简单。

[0]: http://simplebits.com
