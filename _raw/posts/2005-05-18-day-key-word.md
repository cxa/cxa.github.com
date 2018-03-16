---
title: day是保留字
---
记住，在设计的时候不要给id赋予"`day`"的名字，在Firefox下正常，但IE却解析错乱。至今发现的问题是，会导致连接不正常。比如这段代码：

```html
<li><a href="calendar.php" id="day">日</a></li>
```

本来连接应该是`calendar.php`，但是，在IE下，我的测试是奇怪的`32`，不知何故，只能解读为`day`是IE的保留字，或者说是一个bug。谁能帮我向MS BugZilla一下呢？我希望IE7不会出现这个问题。