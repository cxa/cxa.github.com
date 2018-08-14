# JavaScript风格要素

关于英文的写作有一本十分著名的书，[The
Elements of Style][0]（风格要素），编写程序也有一本[The Elements of Programming Style][1]（编程风格要素）。证明了在某种程度上，编写程序其实就是语文写作，清晰的风格对程序的质量有着重要的影响。草率含混的风格会隐蔽程序真性。

作为JavaScript Guru, [Douglas Crockford][2]提出了自己对JavaScript风格的创见（[第一部分][3]，[第二部分][4]）。

第一部分主要讨论JavaScript语言本身，包括：

* **淘汰过时的构建。**

讨论了在HTML页面引入JavaScript的方式。经典的写法是：

```html
<script language=javascript><!--
--></script>
```

`language`并不是W3C所认同的标准，建议使用的是`type`, 但作为`type`值的MIME type并没有标准化（有时是`text/javascript`, 有时是application/ecmascript），但目前所有的浏览器都是使用JavaScript作为默认的脚本语言，因此仅仅些`<script>就是安全的。随着NetScape 3的淘汰，``<-- -->`也不是必要的了。

（注：这个东西Web标准社区也有自己的看法，并认为应该写`type="text/javascript"`，我也赞成。）
* **在结构中始终使用区块。**

莫偷懒，省略区块（即`{ }`）会引发不经意的错误和麻烦。即使只有一句，也老老实实写上：

```js
if (expression) { ... }
```

* **避免在表达式中进行赋值。**虽然可以使代码紧凑，但会让控制流程难于理解。
* **使用对象扩充。**在不需要构造函数的对象中，不如先创建一个空对象，然后扩充它。
* **使用通用库。**注意提高代码的重用。

第二部分主要讲的是一些使程序更清晰和简洁的习惯用法：

* **使用`==`得当心强类型。**`1 == true`是真，但`1 === true`却为假。
* **使用`?:`运算符选择两值之一。**在这种操作中，三元运算符为此而生。
* **永远不要使用隐含的全局变量。**请记得声明变量时加上`var`.
* **不要使用`?:`来选择两种行为的其一。**写作`p.style.backgroundColor = z ? '#fff' : '#989898';`而不是`(z == 0) ? p.style.backgroundColor = '#fff' : p.style.backgroundColor = '#989898';`。
* **使用`||`来指定一个默认值。**最典型的莫过于处理事件参数了：`var e = e || event;`。
* **全局变量是邪恶的。**
* **使用内部函数来避免全局变量。**

这些风格是Crock在2005年提出的，现在有些已经深入人心（如不要使用全局变量），因而也没有必要多做解释了。如果你有所疑惑，不如详细看看这两篇风格文章，里面有大量的代码来举证这些风格的重要性。

**更新：**[Dojo的风格指南][5]也不错。

[0]: http://crockford.com/wrrrld/style.html
[1]: http://www.amazon.com/exec/obidos/ASIN/0070342075/wrrrldwideweb
[2]: http://www.crockford.com/
[3]: http://javascript.crockford.com/style1.html
[4]: http://javascript.crockford.com/style2.html
[5]: http://dojotoolkit.org/developer/StyleGuide