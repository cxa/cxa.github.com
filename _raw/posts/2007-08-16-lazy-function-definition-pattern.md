---
title: 惰性函数定义模式
---
这篇文章阐述的是一种函数式编程（functional-programming）设计模式，我称之为惰性函数定义（Lazy Function Definition）。我不止一次发现这种模式在JavaScript中大有用处，尤其是编写跨浏览器的、高效运行的库之时。

## 热身问题

编写一个函数`foo`，它返回的是`Date`对象，这个对象保存的是`foo`首次调用的时间。

### 方法一：上古时代的技术

这个最简陋的解决方案使用了全局变量`t`来保存`Date`对象。`foo`首次调用时会把时间保存到`t`中。接下来的再次调用，`foo`只会返回保存在`t`中的值。

```js
var t;
function foo() {
    if (t) {
        return t;
    }
    t = new Date();
    return t;
}
```

但是这样的代码有两个问题。第一，变量`t`是一个多余的全局变量，并且在` foo`调用的间隔期间有可能被更改。第二，在调用时这些代码的效率并没有得到优化因为每次调用` foo`都必须去求值条件。虽然在这个例子中，求值条件并不显得低效，但在现实世界的实践例子中常常会有极为昂贵的条件求值，比如在if-else-else-...的结构中。

### 方法二：模块模式

我们可以通过被认为归功于[Cornford][0] 和 [Crockford][1] 的[模块模式][2]来弥补第一种方法的缺陷。使用闭包可以隐藏全局变量`t`，只有在` foo`内的代码才可以访问它。

```js
var foo = (function() {
    var t;
    return function() {
        if (t) {
            return t;
        }
        t = new Date();
        return t;
    }
})();
```

但这仍然没有优化调用时的效率，因为每次调用`foo`依然需要求值条件。

虽然模块模式是一个强大的工具，但我坚信在这种情形下它用错了地方。

### 方法三：函数作为对象

由于JavaScript的函数也是对象，所以它可以带有属性，我们可以据此实现一种跟模块模式质量差不多的解决方案。

```js
function foo() {
    if (foo.t) {
        return foo.t;
    }
    foo.t = new Date();
    return foo.t;
}
```

在一些情形中，带有属性的函数对象可以产生比较清晰的解决方案。我认为，这个方法在理念上要比模式模块方法更为简单。

这个解决方案避免了第一种方法中的全局变量`t`，但仍然解决不了`foo`每次调用所带来的条件求值。

### 方法四：惰性函数定义

现在，这是你阅读这篇文章的理由：

    var foo = function() {
        var t = new Date();
        foo = function() {
            return t;
        };
        return foo();
    };

当`foo`首次调用，我们实例化一个新的`Date`对象并重置 `foo`到一个新的函数上，它在其闭包内包含`Date`对象。在首次调用结束之前，`foo`的新函数值也已调用并提供返回值。

接下来的`foo`调用都只会简单地返回`t`保留在其闭包内的值。这是非常快的查找，尤其是，如果之前那些例子的条件非常多和复杂的话，就会显得很高效。

弄清这种模式的另一种途径是，外围（outer）函数对`foo`的首次调用是一个保证（promise）。它保证了首次调用会重定义`foo`为一个非常有用的函数。笼统地说，术语"保证" 来自于Scheme的惰性求值机制（lazy evaluation mechanism）。每一位JavaScript程序员真的都应该[学习Scheme][3]，因为它有很多函数式编程相关的东西，而这些东西会出现在JavaScript中。

## 确定页面滚动距离

编写跨浏览器的JavaScript, 经常会把不同的浏览器特定的算法包裹在一个独立的JavaScript函数中。这就可以通过隐藏浏览器差异来标准化浏览器API，并让构建和维护复杂的页面特性的JavaScript更容易。当包裹函数被调用，就会执行恰当的浏览器特定的算法。

在拖放库中，经常需要使用由鼠标事件提供的光标位置信息。鼠标事件给予的光标坐标相对于浏览器窗口而不是页面。加上页面滚动距离鼠标的窗口坐标的距离即可得到鼠标相对于页面的坐标。所以我们需要一个反馈页面滚动的函数。演示起见，这个例子定义了一个函数`getScrollY`。因为拖放库在拖拽期间会持续运行，我们的`getScrollY`必须尽可能高效。

不过却有四种不同的浏览器特定的页面滚动反馈算法。Richard Cornford在他的[feature detection article][4]文章中提到这些算法。最大的陷阱在于这四种页面滚动反馈算法其中之一使用了` document.body`. JavaScript库通常会在HTML文档的`<head>`加载，与此同时`docment.body`并不存在。所以在库载入的时候，我们并不能使用特性检查（feature detection）来确定使用哪种算法。

考虑到这些问题，大部分JavaScript库会选择以下两种方法中的一种。第一个选择是使用浏览器嗅探`navigator.userAgent`，为该浏览器创建高效、简洁的`getScrollY`. 第二个更好些的选择是`getScrollY`在每一次调用时都使用特性检查来决定合适的算法。但是第二个选择并不高效。

好消息是拖放库中的`getScrollY`只会在用户与页面的元素交互时才会用到。如果元素业已出现在页面中，那么`document.body`也会同时存在。`getScrollY`的首次调用，我们可以使用惰性函数定义模式结合特性检查来创建高效的`getScrollY`.

```js
var getScrollY = function() {

    if (typeof window.pageYOffset == 'number') {
        getScrollY = function() {
            return window.pageYOffset;
        };

    } else if ((typeof document.compatMode == 'string') &&
                (document.compatMode.indexOf('CSS') >= 0) &&
                (document.documentElement) &&
                (typeof document.documentElement.scrollTop == 'number')) {
        getScrollY = function() {
            return document.documentElement.scrollTop;
        };

    } else if ((document.body) &&
                (typeof document.body.scrollTop == 'number')) {
        getScrollY = function() {
            return document.body.scrollTop;
        }

    } else {
        getScrollY = function() {
            return NaN;
        };

    }

    return getScrollY();
}
```

## 总结

惰性函数定义模式让我可以编写一些紧凑、健壮、高效的代码。用到这个模式的每一次，我都会抽空赞叹JavaScript的函数式编程能力。

JavaScript同时支持函数式和面向对象便程。市面上有很多重点着墨于面向对象设计模式的书都可以应用到JavaScript编程中。不过却没有多少书涉及函数式设计模式的例子。对于JavaScript社区来说，还需要很长时间来积累良好的函数式模式。

原文：[Lazy Function Definition Pattern][5]. 转载没有我的信息没有关系，但你一定得写上原文信息，谢谢。

**更新**：

这个模式虽然有趣，但由于大量使用闭包，可能会由于内存管理的不善而导致性能问题。来自[FCKeditor][6]的FredCK改进了`getScrollY`，既使用了这种模式，也避免了闭包：

```js
var getScrollY = function() {
    if (typeof window.pageYOffset == 'number')
        return (getScrollY = getScrollY.case1)();

    var compatMode = document.compatMode;
    var documentElement = document.documentElement;
    if ((typeof compatMode == 'string') &&
                (compatMode.indexOf('CSS') >= 0) &&
                (documentElement) &&
                (typeof documentElement.scrollTop == 'number'))
        return (getScrollY = getScrollY.case2)();

    var body = document.body ;
    if ((body) &&
                (typeof body.scrollTop == 'number'))
        return (getScrollY = getScrollY.case3)();

    return (getScrollY = getScrollY.case4)();
};

getScrollY.case1 = function() {
    return window.pageYOffset;
};

getScrollY.case2 = function() {
    return documentElement.scrollTop;
};

getScrollY.case3 = function() {
    return body.scrollTop;
};

getScrollY.case4 = function() {
        return NaN;
};
```

请看具体的[评论][7]。

[0]: http://www.jibbering.com/faq/faq_notes/closures.html#clEncap
[1]: http://www.crockford.com/javascript/private.html
[2]: http://yuiblog.com/blog/2007/06/12/module-pattern/
[3]: http://www.amazon.com/Scheme-Programming-Language-3rd/dp/0262541483/ref=pd_bbs_sr_1/102-4214146-5559331?ie=UTF8&s=books&qid=1186852441&sr=8-1
[4]: http://www.jibbering.com/faq/faq_notes/not_browser_detect.html#bdScroll
[5]: http://peter.michaux.ca/article/3556
[6]: http://www.fckeditor.net/
[7]: http://peter.michaux.ca/article/3556#comment-3661