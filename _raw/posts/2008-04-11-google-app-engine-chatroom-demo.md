---
title: 测试 Google App Engine
---
一不小心从某 blog 中第一时间发现 Google App Engine 发布，立马注册一个。当天晚上抽空看了看文档，做了做hello world，第二天晚上开始写一个聊天室程序，第三天晚上拿出 [Python 技术手册][0]，捣腾到今天才把一个简单的东西弄出来。去年学了一段时间的 Python, 还用 [webpy][1] 写了一个不成型的 blog 系统。某段时间认识自己不足，苦读了两个月的 C，后来买了 MacBoook, 又一头扎进 Objective-C 和 Cocoa, 哈哈哈，总之，一事无成吧。现在 GAE 出来了，突然发现一直寻找的 Python hosting 就这么从天上掉下来了，而且还是馅饼……重新激起 Python 兴趣，却发现又忘得差不多了……

废话太多了……这个测试 demo 叫 chatlazy, 位于 [http://chatlazy.appspot.com][2]. 是一个简易聊天室，后台部分，就是 Python 了，具体一点，是 webpy 0.3 (开发版，未发布)。机制十分简单，就是前端使用 JavaScript 隔 5 秒去提取后台的最新消息。有几个小细节还是值得总结一下的：

1. 由于 GAE 的数据 ID 使不能用在 Gql 中的，我只能通过时间戳来比对消息状态。把 `datetime` 和秒数 ＋ 毫秒数的互转，还是比较繁琐的。Python 技术手册帮了我很大忙。解决方案大致如此：

```python
str(time.mktime(d.timetuple()))[:-1] + str(d.microsecond)
```

反过来则是：

```python
p = str(t).split('.')
tp = time.localtime(float(p[0]))
dt = datetime(tp[0], tp[1], tp[2], tp[3], tp[4], tp[5]+1, int(p[1]))
```

2. 对于 `iterable` 的对象, 先要 `list` 它转成列表，才可以使用 `reversed` 等相关方法。
3. 需要取最新的 n 条信息，即数据库末尾的 n 条，但是又要顺序，可以先按逆序取 n 条，再反向排序（由此引发上条启示）。
4. 对于任何用户输入的东西都要做过滤，一开始我在用户名那块忽略了，结果马上有人 XSS 了。这应该是基本常识，应铭记于心。
5. 一定要处理异常。

由于 GAE 这个天上掉的馅饼，我想我近期的精力会放到 Python 上了，有计划地把 blog 迁徙到 GAE 上，并开发一些有趣地程序。GAE rocks. 老实说，这是搜索、Gmail 后，对我而言可以排到第三的 Google 服务了。

[0]: http://www.oreilly.com.cn/book.php?bn=7-5641-0576-3
[1]: http://webpy.org
[2]: http://chatlazy.appspot.com
