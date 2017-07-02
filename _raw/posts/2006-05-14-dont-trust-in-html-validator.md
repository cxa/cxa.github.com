---
title: Html Validator不可全信
---
自从发现[Html Validator][0]这个超酷超方便的扩展以后，我基本上没有用过[W3C][1]的[Markup Validation Service][2]来校验我的XHtml了。

网友[Sparanoid][3] [留言][4]告知，我的页面有错误。我用Html Validator检查了一番，发现由于php判读语句的位置不对导致在没有留言的情况下会缺`div`，于是更改过来，HTML Validator也告诉我**0 errors, 0 warnings**。然后就自信满满地回复留言说没问题了。

晚上，心血来潮，用[Web Devloper][5]的Validate HTML（实际上就是使用W3C的Markup Validation Service）来校验一下页面。My Godness...有一个`dt`标签没有关闭，未能通过……这么说Html Validator欺骗了我一把……为了验证我的想法，我用Html Validator重新看了同一页的源码，对，它就是没有发现，还沾沾自喜地说：**0 errors, 0 warnings**……

还是W3的服务品质有保证。 XD

[0]: http://users.skynet.be/mgueury/mozilla/
[1]: http://w3.org
[2]: http://validator.w3.org/
[3]: http://blog.sparanoid.com/
[4]: http://realazy.com/blog/guestbook#comment-1682
[5]: http://chrispederick.com/work/webdeveloper/
