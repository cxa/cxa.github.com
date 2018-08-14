# JavaScript的9个陷阱及评点

来自[Nine Javascript Gotchas][0], 以下是JavaScript容易犯错的九个陷阱。虽然不是什么很高深的技术问题，但注意一下，会使您的编程轻松些，即所谓make life easier. 笔者对某些陷阱会混杂一些评点。

## 最后一个逗号

如这段代码，注意最后一个逗号，按语言学角度来说应该是不错的（python的类似数据类型辞典dictionary就允许如此）。IE会报语法错误，但语焉不详，你只能用人眼从几千行代码中扫描。

```js
var theObj = {
    city : "Boston",
    state : "MA",
}
```

## `this`的引用会改变

如这段代码：

```html
<input type="button" value="Gotcha!" id="MyButton" >
```

```js
var MyObject = function () {
    this.alertMessage = "Javascript rules";
    this.ClickHandler = function() {
        alert(this.alertMessage );
    }
}();
document.getElementById("theText").onclick = MyObject.ClickHandler
```

并不如你所愿，答案并不是"JavaScript rules"。在执行`MyObject.ClickHandler`时，代码中红色这行，`this`的引用实际上指向的是`document.getElementById("theText")`的引用。可以这么解决：

```html
<input type="button" value="Gotcha!" id="theText" >
```

```js
var MyObject = function () {
    var self = this;
    this.alertMessage = "Javascript rules";
    this.OnClick = function() {
        alert(self.value);
    }
}();
document.getElementById("theText").onclick = MyObject.OnClick
```

实质上，这就是[JavaScript作用域的问题][1]。如果你看过，你会发现解决方案不止一种。

## 标识盗贼

在JavaScript中不要使用跟HTML的id一样的变量名。如下代码：

```html
<input type="button" id="TheButton">
<script>
    TheButton = get("TheButton");
</script>
```

IE会报对象未定义的错误。我只能说：IE sucks.

## 字符串只替换第一个匹配

如下代码：

```js
var fileName = "This is a title".replace(" ","_");
```

而实际上，结果是"`This_is a title`". 在JavaScript中，`String.replace`的第一个参数应该是正则表达式。所以，正确的做法是这样：

```js
var fileName = "This is a title".replace(/ /g,"_");
```

## mouseout意味着mousein

事实上，这是由于事件冒泡导致的。IE中有`mouseenter`和`mouseleave`，但不是标准的。作者在此建议大家使用库比如YUI来解决问题。

## `parseInt`是基于进制体系的

这个是常识，可是很多人给忽略了`parseInt`还有第二个参数，用以指明进制。比如，`parseInt("09")`，如果你认为答案是9，那就错了。因为，在此，字符串以0开头，`parseInt`以八进制来处理它，在八进制中，`09`是非法，返回`false`，布尔值`false`转化成数值就是0\. 因此，正确的做法是`parseInt("09", 10)`.

## `for...in...`会遍历所有的东西

有一段这样的代码：

```js
var arr = [5,10,15]
var total = 1;
for ( var x in arr) {
    total = total * arr[x];
}
```

运行得好好的，不是吗？但是有一天它不干了，给我返回的值变成了`NaN`, 晕。我只不过引入了一个库而已啊。原来是这个库改写了`Array`的`prototype`，这样，我们的`arr`平白无过多出了一个属性（方法），而`for...in...`会把它给遍历出来。所以这样做才是比较安全的：

```js
for ( var x = 0; x < arr.length; x++) {
    total = total * arr[x];
}
```

其实，这也是污染基本类的`prototype`会带来危害的一个例证。

## 事件处理器的陷阱

这其实只会存在使用作为对象属性的事件处理器才会存在的问题。比如`window.onclick = MyOnClickMethod``这样的代码，这会复写掉之前的``window.onclick`事件，还可能导致IE的内容泄露（sucks again）。在IE还没有支持DOM 2的事件注册之前，作者建议使用库来解决问题，比如使用YUI:

```js
YAHOO.util.Event.addListener(window, "click", MyOnClickMethod);
```

这应该也属于常识问题，但新手可能容易犯错。

## Focus Pocus

新建一个`input`文本元素，然后把焦点挪到它上面，按理说，这样的代码应该很自然：

```js
var newInput = document.createElement("input");
document.body.appendChild(newInput);
newInput.focus();
newInput.select();
```

但是IE会报错（sucks again and again）。理由可能是当你执行`fouce()`的时候，元素尚未可用。因此，我们可以延迟执行：

```js
var newInput = document.createElement("input");
newInput.id = "TheNewInput";
document.body.appendChild(newInput);
setTimeout(function(){ //这里我使用闭包改写过，若有兴趣可以对比原文
    document.getElementById('TheNewInput').focus();
    document.getElementById('TheNewInput').select();
}, 10);
```

在实践中，JavaScript的陷阱还有很多很多，大多是由于解析器的实现不到位而引起。这些东西一般都不会在教科书中出现，只能靠开发者之间的经验分享。谢天谢地，我们生活在网络时代，很多碰到的问题，一般都可以在Google中找到答案。

[0]: http://www.fitzblog.com/tabid/17782/bid/2127/Nine-Javascript-Gotchas.aspx
[1]: /posts/2007-07-18-scope-in-javascript.html
