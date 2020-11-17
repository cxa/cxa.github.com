# HTTP HEAD method

::HTTP::JavaScript::

说到 HTTP method，平常我们打交道最多的莫过于 `GET` 和 `POST` 了。看看[这里][0]列出的 methods，是不是有些根本无用武之地？

比较有意思，也可能会用得上的，应该是 `HEAD` 这个 method。它只检查 HTTP head，不会下载 body。在一些场景，如只想检查某个资源是否存在/在线，或只想了解这个资源的大小（读取 ` Content-Length`），会非常有用。

以 `fetch` 来举个例子：

```javascript
(async () => {
  let resp;
  try {
    resp = await fetch("/resource", { method: "HEAD" });
  } catch (e) {
    // 无法 fetch，可能是网络原因
    return;
  }

  if (resp.ok) {
    // 好的，`/resource` 可用，让我们看看它有多大
    const len = resp.headers.get("Content-Length");
    console.info(len);
  } else {
    // Uh-oh
  }
})();
```

Discovered in <https://twitter.com/codepo8/status/1319691862270222338>

[0]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
