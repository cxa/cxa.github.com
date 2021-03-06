# JavaScript 中的作用域

原文：[http://www.digital-web.com/articles/scope_in_javascript/][0]

作用域（[scope][1]）是 JavaScript 语言的基石之一，在构建复杂程序时也可能是最令我头痛的东西。记不清多少次在函数之间传递控制后忘记 ` this` 关键字引用的究竟是哪个对象，甚至，我经常以各种不同的混乱方式来曲线救国，试图伪装成正常的代码，以我自己的理解方式来找到所需要访问的变量。

这篇文章将正面解决这个问题：简述上下文（context）和作用域的定义，分析可以让我们掌控上下文的两种方法，最后深入一种*高效的*方案，它能有效解决我所碰到的 90%的问题。

## 我在哪儿？你又是谁

JavaScript 程序的每一个字节都是在这个或那个运行上下文（execution context）中执行的。你可以把这些上下文想象为代码的邻居，它们可以给每一行代码指明：从何处来，朋友和邻居又是谁。没错，这是很重要的信息，因为 JavaScript 社会有相当严格的规则，规定谁可以跟谁交往。运行上下文则是有大门把守的社区而非其内开放的小门。

我们通常可以把这些社会边界称为**作用域**，并且有充足的重要性在每一位邻居的宪章里立法，而这个宪章就是我们要说的上下文的**作用域链**（scope chain）。在特定的邻里关系内，代码只能访问它的作用域链内的变量。与超出它邻里的变量比起来，代码更喜欢跟本地（local，即局部）的打交道。

具体地说，执行一个函数会创建一个不同的运行上下文，它会将局部作用域增加到它所定义的作用域链内。JavaScript 通过作用域链的局部向全局攀升方式，在特定的上下文中解析标识符。这表示，本级变量会优先于作用域链内上一级拥有相同名字的变量。显而易见，当我的好友们一起谈论"Mike West"（本文原作者）时，他们说的就是我，而非 [bluegrass singer][2] 或是 [Duke professor][3], 尽管（按理说）后两者著名多了。

让我们看些例子来探索这些含义：

```js
var ima_celebrity = "Everyone can see me! I'm famous!",
  the_president = "I'm the decider!";

function pleasantville() {
  var the_mayor = "I rule Pleasantville with an iron fist!",
    ima_celebrity = "All my neighbors know who I am!";

  function lonely_house() {
    var agoraphobic = "I fear the day star!",
      a_cat = "Meow.";
  }
}
```

我们的全明星，`ima_celebrity`, 家喻户晓（所有人都认识她）。她在政治上积极活跃，敢于在一个相当频繁的基层上叫嚣总统（即 `the_president`）。她会为碰到的每一个人签名和回答问题。就是说，她不会跟她的粉丝有私下的联系。她相当清楚粉丝们的*存在 *并有他们自己某种程度上的个人生活，但也可以肯定的是，她并不知道粉丝们在干嘛，甚至连粉丝的名字都不知道。

而在欢乐市（`pleasantville`）内，市长（`the_mayor`）是众所周知的。她经常在她的城镇内散步，跟她的选民聊天、握手并亲吻小孩。因为欢乐市（`pleasantville`）还算比较大且重要的邻居，市长在她办公室内放置一台红色电话，它是一条可以直通总统的 7x24 热线。她还可以看到市郊外山上的孤屋（`lonely_house`），但从不在意里面住着的是谁。

而孤屋（`lonely_house`）是一个自我的世界。旷恐患者时常在里面囔囔自语，玩纸牌和喂养一个小猫（`a_cat`）。他偶尔会给市长（`the_mayor`）打电话咨询一些本地的噪音管制，甚至在本地新闻看到 `ima_celebrity` 后会写些粉丝言语给她（当然，这是 `pleasantville` 内的 `ima_celebrity`）。

## `this`? 那是虾米？

每一个运行上下文除了建立一个作用域链外，还提供一个名为 `this` 的关键字。它的普遍用法是，`this` 作为一个独特的功能，为邻里们提供一个可访问到它的途径。但总是依赖于这个行为并不可靠：取决于我们如何进入一个特定邻居的具体情况，`this` 表示的完全可能是其他东西。事实上，*我们如何进去邻居家*本身，通常恰恰就是 `this` 所指。有四种情形值得特别注意：

### 呼叫对象的方法

在经典的面向对象编程中，我们需要识别和引用当前对象。`this` 极好地扮演了这个角色，为我们的对象提供了自我查找的能力，并指向它们本身的属性。

```js
var deep_thought = {
  the_answer: 42,
  ask_question: function () {
    return this.the_answer;
  },
};

var the_meaning = deep_thought.ask_question();
```

这个例子建立了一个名为 `deep_thought` 的对象，设置其属性 ` the_answer` 为 42，并创建了一个名为 `ask_question` 的方法（method）。当 `deep_thought.ask_question()` 执行时， JavaScript 为函数的呼叫建立了一个运行上下文，通过"`.`"运算符把 `this` 指向被引用的对象，在此是 `deep_thought` 这个对象。之后这个方法就可以通过 `this` 在镜子中找到它自身的属性，返回保存在 `this.the_answer` 中的值：42。

### 构造函数

类似地，当定义一个作为构造器的使用 `new` 关键字的函数时，`this` 可以用来引用刚创建的对象。让我们重写一个能反映这个情形的例子：

```js
function BigComputer(answer) {
  this.the_answer = answer;
  this.ask_question = function () {
    return this.the_answer;
  };
}

var deep_thought = new BigComputer(42);
var the_meaning = deep_thought.ask_question();
```

我们编写一个函数来创建 `BigComputer` 对象，而不是直白地创建 ` deep_thought` 对象，并通过 `new` 关键字实例化 `deep_thought` 为一个实例变量。当 `new BigComputer()` 被执行，后台透明地创建了一个崭新的对象。呼叫 `BigComputer` 后，它的 `this` 关键字被设置为指向新对象的引用。这个函数可以在 `this` 上设置属性和方法，最终它会在 `BigComputer` 执行后透明地返回。

尽管如此，需要注意的是，那个 `deep_thought.the_question()` 依然可以像从前一样执行。那这里发生了什么事？为何 `this` 在 `the_question` 内与 BigComputer 内会有所不同？简单地说，我们是通过 `new`_ 进入 _`BigComputer` 的，所以 `this` 表示「新（new）的对象」。在另一方面，我们通过 ` deep_thought`_ 进入 _`the_question`，所以当我们执行该方法时，`this` 表示 "`deep_thought` 所引用的对象"。`this` 并不像其他的变量一样从作用域链中读取，而是在上下文的基础上，在上下文中*重置*。

### 函数呼叫

假如没有任何相关对象的奇幻东西，我们只是呼叫一个普通的、常见的函数，在这种情形下 `this` 表示的又是什么呢？

```js
function test_this() {
  return this;
}
var i_wonder_what_this_is = test_this();
```

在这样的场合，我们并不通过 `new` 来提供上下文，也不会以某种对象形式在背后偷偷提供上下文。在此， `this` 默认下尽可能引用最全局的东西：对于网页来说，这就是 ` window` 对象。

### 事件处理函数

比普通函数的呼叫更复杂的状况，先假设我们使用函数去处理的是一个 `onclick` 事件。当事件触发我们的函数运行，此处的 `this` 表示的是什么呢？不凑巧，这个问题不会有简单的答案。

如果我们写的是行内（inline）事件处理函数，`this` 引用的是全局 `window` 对象：

```js
function click_handler() {
  alert(this); // 弹出 window 对象
}
```

```html
<button id="thebutton" onclick="click_handler()">Click me!</button>
```

但是，如果我们通过 JavaScript 来添加事件处理函数，`this` 引用的是生成该事件的 DOM 元素。（注意：此处的事件处理非常简洁和易于阅读，但其他的就别有洞天了。请使 [真正的 addEvent 函数][4]取而代之）：

````js
function click_handler() {
    alert(this); // 弹出按钮的 DOM 节点
}

function addhandler() {
    document.getElementById('thebutton').onclick = click_handler;
}

window.onload = addhandler;

```html
<button id='thebutton'>Click me!</button>
````

## 复杂情况

让我们来短暂地运行一下这个最后的例子。我们需要询问 `deep_thought` 一个问题，如果不是直接运行 `click_handler` 而是通过点击按钮的话，那会发生什么事情？解决此问题的代码貌似十分直接，我们可能会这样做：

```js
function BigComputer(answer) {
  this.the_answer = answer;
  this.ask_question = function () {
    alert(this.the_answer);
  };
}

function addhandler() {
  var deep_thought = new BigComputer(42),
    the_button = document.getElementById("thebutton");

  the_button.onclick = deep_thought.ask_question;
}

window.onload = addhandler;
```

很完美吧？想象一下，我们点击按钮，`deep_thought.ask_question` 被执行，我们也得到了"42"。但是为什么浏览器却给我们一个 `undefined`? 我们错在何处？

其实问题显而易见：我们给 `ask_question` 传递一个引用，它作为一个事件处理函数来执行，与作为对象方法来运行的上下文并不一样。简而言之，`ask_question` 中的 ` this` 关键字指向了产生事件的 DOM 元素，而不是在 `BigComputer` 的对象中。DOM 元素并不存在一个 `the_answer` 属性，所以我们得到的是 `undefined` 而不是"42". `setTimeout` 也有类似的行为，它在延迟函数执行的同时跑到了一个全局的上下文中去了。

这个问题会在程序的所有角落时不时突然冒出，如果不细致地追踪程序的每一个角落的话，还是一个非常难以排错的问题，尤其在你的对象有跟 DOM 元素或者 `window` 对象同名属性的时候。

## 使用 `.apply()` 和 `.call()` 掌控上下文

在点击按钮的时候，我们真正需要的是能够咨询 `deep_thought` 一个问题，更进一步说，我们真正需要的是，在应答事件和 `setTimeout` 的呼叫时，能够在自身的本原上下文中呼叫对象的方法。有两个鲜为人知的 JavaScript 方法，`apply` 和 `call`，在我们执行函数呼叫时，可以曲线救国帮我们达到目的，允许我们手工覆盖 `this` 的默认值。我们先来看 `call`：

```js
var first_object = {
  num: 42,
};
var second_object = {
  num: 24,
};

function multiply(mult) {
  return this.num * mult;
}

multiply.call(first_object, 5); // 返回 42 * 5
multiply.call(second_object, 5); // 返回 24 * 5
```

在这个例子中，我们首先定义了两个对象，`first_object` 和 `second_object`，它们分别有自己的 `num` 属性。然后定义了一个 `multiply` 函数，它只接受一个参数，并返回该参数与 `this` 所指对象的 `num` 属性的乘积。如果我们呼叫函数自身，返回的答案极大可能是 `undefined`，因为全局 `window` 对象并没有一个 `num` 属性除非有明确的指定。我们需要一些途径来告诉 `multiply` 里面的 `this` 关键字应该引用什么。而 `multiply` 的 `call` 方法正是我们所需要的。

`call` 的第一个参数定义了在业已执行的函数内 `this` 的所指对象。其余的参数则传入业已执行的函数内，如同函数的自身呼叫一般。所以，当执行 `multiply.call(first_object, 5)` 时，`multiply` 被呼叫，`5` 传入作为第一个参数，而 `this` 关键字被设置为 `first_object` 的引用。同样，当执行 `multiply.call(second_object, 5)` 时，`5` 传入作为第一个参数，而 `this` 关键字被设置为 `second_object` 的引用。

`apply` 以 `call` 一样的方式工作，但可以让你把参数包裹进一个数组再传递给呼叫函数，在程序性生成函数呼叫时尤为有用。使用 `apply` 重现上一段代码，其实区别并不大：

```js
...

multiply.apply(first_object, [5]); // 返回 42 * 5
multiply.apply(second_object, [5]); // 返回 24 * 5
```

`apply` 和 `call` 本身都非常有用，并值得贮藏于你的工具箱内，但对于事件处理函数所改变的上下文问题，也只是送佛到西天的中途而已，剩下的还是得我们来解决。在搭建处理函数时，我们自然而然地认为，只需简单地通过使用 `call` 来改变 `this` 的含义即可：

```js
function addhandler() {
  var deep_thought = new BigComputer(42),
    the_button = document.getElementById("thebutton");

  the_button.onclick = deep_thought.ask_question.call(deep_thought);
}
```

代码之所以有问题的理由很简单：`call`*立即*执行了函数（译注：其实可以用一个匿名函数封装，例如 `the_button.onclick = function(){deep_thought.ask_question.call(deep_thought);}`，但比起即将讨论的 `bind` 来，依然不够优雅）。我们给 `onclcik` 处理函数一个函数执行后的结果而非函数的引用。所以我们需要利用另一个 JavaScript 特色，以解决这个问题。

## `.bind()` 之美

我并不是 [Prototype JavaScript framework][5] 的忠实粉丝，但我对它的总体代码质量印象深刻。具体而言，它为 `Function` 对象增加一个简洁的补充，对我管理函数呼叫执行后的上下文产生了极大的正面影响：`bind` 跟 `call` 一样执行相同的常见任务，改变函数执行的上下文。不同之处在于 `bind` 返回的是函数引用可以备用，而不是 `call` 的立即执行而产生的最终结果。

如果需要简化一下 `bind` 函数以抓住概念的重点，我们可以先把它插进前面讨论的乘积例子中去，看它究竟是如何工作的。这是一个相当优雅的解决方案：

```js
var first_object = {
  num: 42,
};
var second_object = {
  num: 24,
};

function multiply(mult) {
  return this.num * mult;
}

Function.prototype.bind = function (obj) {
  var method = this,
    temp = function () {
      return method.apply(obj, arguments);
    };

  return temp;
};

var first_multiply = multiply.bind(first_object);
first_multiply(5); // 返回 42 * 5

var second_multiply = multiply.bind(second_object);
second_multiply(5); // 返回 24 * 5
```

首先，我们定义了 `first_object`, `second_object` 和 `multiply` 函数，一如既往。细心处理这些后，我们继续为 `Function` 对象的 [`prototype`][6] 定义一个 `bind` 方法，这样的话，我们程序里的函数都有一个 `bind` 方法可用。当执行 `multiply.bind(first_object)` 时，JavaScript 为 `bind` 方法创建一个运行上下文，把 `this` 置为 `multiply` 函数的引用，并把第一个参数 `obj` 置为 `first_object` 的引用。目前为止，一切皆顺。

这个解决方案的真正天才之处在于 `method` 的创建，置为 `this` 的引用所指（即 `multiply` 函数自身）。当下一行的匿名函数被创建，`method` 通过它的作用域链访问，obj 亦然（不要在此使用 `this`, 因为新创建的函数执行后，`this` 会被新的、局部的上下文覆盖）。这个 `this` 的别名让 `apply` 执行 `multiply` 函数成为可能，而传递 `obj` 则确保上下文的正确。用计算机科学的话说，`temp` 是一个闭包（[_closure_][7]），它可以保证，需要在 `first_object` 的上下文中执行 `multiply`，`bind` 呼叫的最终返回可以用在任何的上下文中。

这才是前面说到的事件处理函数和 `setTimeout` 情形所真正需要的。以下代码完全解决了这些问题，绑定 `deep_thought.ask_question` 方法到 `deep_thought` 的上下文中，因此能在任何事件触发时都能正确运行：

```js
function addhandler() {
  var deep_thought = new BigComputer(42),
    the_button = document.getElementById("thebutton");

  the_button.onclick = deep_thought.ask_question.bind(deep_thought);
}
```

漂亮。

[0]: http://www.digital-web.com/articles/scope_in_javascript/
[1]: http://en.wikipedia.org/wiki/Scope_%28programming%29
[2]: http://www.mikewest.net/
[3]: http://www.isds.duke.edu/%7Emw/
[4]: http://dean.edwards.name/weblog/2005/10/add-event2/
[5]: http://prototypejs.org/
[6]: http://en.wikipedia.org/wiki/Prototype-based_programming
[7]: http://www.jibbering.com/faq/faq_notes/closures.html
