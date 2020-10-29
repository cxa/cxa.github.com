# day 是保留字

记住，在设计的时候不要给 id 赋予 `day` 的名字，在 Firefox 下正常，但 IE 却解析错乱。至今发现的问题是，会导致连接不正常。比如这段代码：

```html
<li><a href="calendar.php" id="day">日</a></li>
```

本来连接应该是 `calendar.php`，但是，在 IE 下，我的测试是奇怪的 `32`，不知何故，只能解读为 `day` 是 IE 的保留字，或者说是一个 bug。谁能帮我向 MS BugZilla 一下呢？我希望 IE7 不会出现这个问题。
