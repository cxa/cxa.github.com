# Erlang 之父 Joe Armstrong 谈面向对象：糟心

译自 <http://www.cs.otago.ac.nz/staffpriv/ok/Joe-Hates-OO.htm>.

初识面向对象编程概念时，我总觉得哪儿不对劲，但又说不出来。面向对象编程一经面世就人气不衰（后面我会解释原因），批判它有点像「在教堂里念咒」（译注：我猜就是清风吹不起半点涟漪之意）。没有面向对象，你都不好意思说自己是门体面的语言。

随着 Erlang 进入大众视野，我们经常被人讨教「Erlang 是面向对象的吗」。显然，正确的答案是「绝对不是」。但我们不敢扯高嗓门，只好捏造一些机智的回答：不求甚解的话，你说是就是（（某种程度上）；观言察行，连书上小字也不放过的话，Erlang 并不面向对象。

说到这我想起了一件小事，巴黎第七届 IEEE Logic 编程会议上，一名后来担任 IBM 老大的家伙的讲演。在问到为何要给 IBM Prolog 语言添加了很多面向对象的扩展时，他回道：

“客户要，我们给。”

我还记得当时想：「多没脑子，不于心有愧，不反思，不问『这事对吗』……」

## 为何面向对象糟透了

面向对象编程，我最大的不苟同得追溯到基础概念，我会列出这些概念，以及我异议的理由。

### 异议一：数据结构和函数不应绑到一起

对象将函数和数据结构绑死到一个不可分割的单元中。我认为这是一个根本错误，因为函数和数据结构属于两个完全不同的世界：

- 函数是干活的。它们有入有出。输入和输出是会被函数改变的数据结构。大多数语言中，函数是靠命令流构建的：「先干这茬然后那茬……」。要理解函数必须理解执行结果的顺序。（惰性函数式语言和逻辑语言这个限制较为宽松。）
- 数据结构，如其名。它们不干活，只昭告自己是什么。「理解」数据结构比「理解」函数要容易得多。

函数是转换输入和输出的黑盒子。一旦理解了输入和输出，那么函数我就掌握了。**但这并不等于说我能够编写这个函数**。

人们对函数的认知，是它作为运算体系中的角色，职责是转换数据结构到另一种类型。

**函数和数据结构是风马牛，强行关在同一个笼子里根本就是错的。**

### 异议二：万物皆对象

举个例子，「时间」。在面向对象语言中，「时间」必须是对象（在 Smalltalk 里，甚至数字“3”也是对象）。在非面向对象语言中，「时间」只是某个数据类型的实例。例如，Erlang 中时间有各种不同表达，但可以使用类型声明清晰明了地描述：

```erlang
-deftype day()     = 1..31.
-deftype month()   = 1..12.
-deftype year()    = int().
-deftype hour()    = 1..24.
-deftype minute()  = 1..60.
-deftype second()  = 1..60.
-deftype abstime() = {abstime,year(),month(),day(),hour(),min(),sec()}.
-deftype hms()     = {hms,hour(),min(),sec()}.
…
```

注意这些定义不属于任何一个特定的对象。它们无处不在，系统里的函数也可以操作这些表述时间的数据类型。

而且并没有相应的方法（译注：指对象里的 method）。

### 面向对象语言中，数据类型定义散落在天涯

面向对象语言中，对象包养了数据类型定义，因此我不能在同一处一览众定义。Erlang 和 C 可以定义包含文件或数据字典，一个文件囊括所有；面向对象语言我却毫无办法，数据类型定义分散在各个对象中去了。

让我举个例子。假设我要设计一个全局的数据类型，「全局」是指整个系统可见。

Lisp 程序员已达成的一个长期共识是，尽量少全局数据类型及大量操作这些数据类型的小函数，相比大量全局数据类型及少数操作数据类型的函数，前者要比后者好。

链表、数组、哈希表，或更高级的东西如时间、日期、文件名。

要定义一个全局数据结构，面向对象语言要求我必须选择某个基类。所有其他欲使用这个数据结构的对象必须继承它。现在我要创建一个「时间」对象，它属于谁，在哪个对象里呢？

### 对象有私有状态

状态是万恶之源。特别是，带副作用的函数，应该离远点。

虽然状态在编程语言中不得人心，但它充斥着整个现实世界。我很在意银行账户状态，在存取款后我要求账户状态的更新是正确的。

既然现实世界存在着状态，编程语言应提供什么样的功能来处理它呢？

- 面向对象语言宣称“藏起来，不要把状态告诉程序员”。状态是隐藏的，只有调用函数才能把它呼唤出来。
- 传统编程语言（C，Pascal）称状态由语言本身的作用域规则来控制。
- 纯宣言式语言则表示，哪来的状态啊？系统全局状态进出所有函数。使用 monad（函数式编程语言）和 DCG（逻辑语言）等机制隐藏状态，程序员感觉「彷佛无关状态」，但如果有必要存取系统状态是完全可行的。

面向对象语言在「对程序员隐藏状态」上的选择可能是最糟糕的。不暴露状态，不找办法解决状态的麻烦，藏起来万事大吉。

## 面向对象流行的原因

1. 被认为容易学习
2. 被认为容易复用代码
3. 浮夸宣传
4. 催生了新的软件产业

1 和 2 我看不到证据。3 和 4 看似技术背后的驱动力。如果一门差劲的语言技术，刚好催生了一门解决自身问题的新产业，那么这真是赚大钱的好生意。

这才是面向对象编程背后真正的驱动力。
