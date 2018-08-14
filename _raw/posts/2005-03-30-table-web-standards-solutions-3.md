# 表格的web标准解决方案（三）

## 表头（head）

在构建数据表的时候利用表头是很重要的。不使用直觉的标签而代之以如`<b>`这样的过时标签来在视觉上暗示用户这个单元格是重要的，反之我们可以利用`<th>`标签的优点，跟我们使用`<h1>`这类的标题很类似。

可视化浏览器可能会以粗体来处理包含在`<th>`标签中的内容，但我们仍然可以用CSS样式化这个唯一的`<th>`标签，凸显该重要的单元格与其它包含在<td\>中的表格数据的不同之处。

我们的表格例子中表头分为4组：Year, Opponent, and Season Record (W-L)。我们使用正确的头来取代先前表现性的标记：

```html
<table summary="This table is a chart of all Boston Red Sox World Series wins.">
  <caption>Boston Red Sox World Series Championships</caption>
  <tr>
      <th>Year</th>
      <th>Opponent</th>
      <th>Season Record (W-L)</th>
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

使用`<th>`标签来标记头部单元格可以得到跟使用`<b>`相同的效果。让我们来看看为什么这是首选的方法：

* 我们终结使用额外的表现标签来标记与其他普通单元格不同的头部单元格。
* 默认上，大多数可视化浏览器将把`<th>`里边的内容加粗和居中——让容易地区分表头和数据。
* 因为与普通`<td>`不同的唯一性，我们可以样式化表头，从而把它同其它的表格单元格区分开来。

当然还有其它使用表头的理由，以后我们还会进一步讨论……
