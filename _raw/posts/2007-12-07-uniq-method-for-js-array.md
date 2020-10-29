# JavaScript 数组的 uniq 方法

来自某个 nb 招聘的题目：

> 请给 Array 本地对象增加一个原型方法，它的用途是删除数组条目中重复的条目(可能有多个)，返回值是一个包含被删除的重复条目的新数组。这是我的答案：

## 新解

```js
Array.prototype.uniq = function () {
  var resultArr = [],
    returnArr = [],
    i = 1,
    origLen = this.length,
    resultLen;
  function include(arr, value) {
    for (var i = 0, n = arr.length; i < n; ++i) {
      if (arr[i] === value) {
        return true;
      }
    }
    return false;
  }
  resultArr.push(this[0]);
  for (i; i < origLen; ++i) {
    if (include(resultArr, this[i])) {
      returnArr.push(this[i]);
    } else {
      resultArr.push(this[i]);
    }
  }
  resultLen = resultArr.length;
  this.length = resultLen;
  for (i = 0; i < resultLen; ++i) {
    this[i] = resultArr[i];
  }
  return returnArr;
};
```

这种解法在整个过程对原有数组的改变只有两次，效率比其他两种高了 2 个数量级左右！可 [在此测试][0] 三种解法的性能。

## 旧解

以下至「关于测试案例」之间皆为旧文，若阅读不顺，忽略之。

```js
Array.prototype.uniq_slow = function () {
  var ret = [],
    i = 0,
    j = 0;
  while (undefined !== this[i]) {
    j = i + 1;
    while (undefined !== this[j]) {
      if (this[i] === this[j]) {
        ret.push(this.splice(j, 1)[0]);
      } else {
        ++j;
      }
    }
    ++i;
  }
  return ret;
};
```

感谢猫仔提示，这道题目很容易让人产生误读。看清了题目后更新了。

为何用 `while` 而不是 `for`? 因为这个数组总是在变化，每次循环都得重新计算 `length`. 按理说，使用 `while` 效率会更高，尤其数组很大的时候。

欢迎大家交流讨论。

感谢 fdcn 提示，更新之。这里确实是容易犯错。

猜想由于强类型判断导致性能不高（可 [在此测试][0]），因此此种做法未见有性能的提升（还稍微慢了一些），而且还不能传递类似 `[1,,,2,,]` 这样的数组。所以还是 [淘宝 UED 上的解法][1] 比较科学（当然不是没有改进之处，比如不应该在 `for` 循环中声明变量）。

其实，这篇 blog 的意义在探讨如何避免无意义的消耗（比如计算 `length`）。但是鱼和熊掌不能兼得是自古之理，顾此失彼。当然，办法不是没有，比如数组的 `forEach`, `map` 方法等，可惜只有 `gecko` 浏览器才支持。

## 关于测试案例

数组是随机产生的 1-100 之间的整数，长度为 5000，每个相同的大约重复 5 次。三个测试数组的元素构成是一致的。

## 总结

对数组的改变开销巨大，如果可能，尽量在不改变原有数组的情况下进行操作，如最终需要改变数组自身，可将结果赋予原有数组来操作。另外，对于 `length` 的计算，似乎效率并未受其影响。

啥时候我也该进补算法了，唉。软肋啊。

**推荐阅读：** 王元涛同学的 [JavaScript 数组的 uniq 方法][2]。

[0]: http://realazy.com/lab/uniq.html
[1]: http://ued.taobao.com/blog/2007/11/20/job_test_explanation/
[2]: http://www.pkblogs.com/todwang/2007/12/javascript-uniq.html
