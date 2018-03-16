---
title: 表格的web标准解决方案（二）
---
## 添加（表格）摘要

此外，我们可以为`<table>`标签添加`summary`属性（attribute），进一步阐释包含在表格中内容的目的和内容。摘要对使用非可视化工具来阅读信息的人尤其有用。

以下展示了为我们的表格例子添加摘要属性和值：

```html
<table **summary="This table is a chart of all Boston Red Sox World
    Series wins." **>
      <caption>Boston Red Sox World Series Championships</caption>
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
