---
title: JavaScript Memoization
---
[Memoization][0] 是一种将函数返回值缓存起来的方法，在 Lisp, Ruby, Perl, Python 等语言中使用非常广泛。随着 Ajax 的兴起，客户端对服务器的请求越来越密集（经典如 autocomplete），如果有一个良好的缓存机制，那么客户端 JavaScript 程序的效率的提升是显而易见的。

Memoization 原理非常简单，就是把函数的每次执行结果都放入一个散列表中，在接下来的执行中，在散列表中查找是否已经有相应执行过的值，如果有，直接返回该值，没有才真正执行函数体的求值部分。很明显，找值，尤其是在散列中找值，比执行函数快多了。现代 JavaScript 的开发也已经大量使用这种技术。

我通过 Google [寻找][1]了好几种 JavaScript Memoization 的实现，都不太如人愿，有的实现不能缓存递归函数，有的需要修改函数的 `prototype`，于是自己实现一个：

```js
/**
 * JavaScript Momoization
 * @param {string} func name of function / method
 * @param {object} [obj] mothed's object or scope correction object
 *
 * MIT / BSD license
 */

function Memoize(func, obj){
    var obj = obj || window,
        func = obj[func],
        cache = {};
    return function(){
        var key = Array.prototype.join.call(arguments, "");
        var key = Array.prototype.join.call(arguments, "_")
        if (!(key in cache))
            cache[key] = func.apply(obj, arguments);
        return cache[key];
    }
}
```

并写了一个测试案例，空口无凭，让大家亲自看看 Memoization 的威力。

见：[http://realazy.com/lab/memoization.html][2]

另，例子中的 fibonacci 函数有很多更有效率的实现方法，在此我使用最无效率的递归实现，只是为了更直达地演示 memoization.

又，longwosion 留言所提到的 key 唯一性问题，我略作修正，但应该还有更好的办法，欢迎您留言探讨。

[0]: http://en.wikipedia.org/wiki/Memoization
[1]: http://www.google.com/search?hl=en&hs=y9z&q=JavaScript+Memoization
[2]: http://realazy.com/lab/memoization.html
