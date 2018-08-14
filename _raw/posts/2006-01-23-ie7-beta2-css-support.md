# IE 7 Beta2的CSS支持

今早小试了一下IE 7 Beta2，其他的我就不多说了，我来谈谈它对CSS的支持吧。

第一，对`dotted`样式的`border`改进了，不再是`dashed`的样式。不过有时候显示还不是很细腻，刷新一下就好了（似乎是IE的通病，啥都刷一下就ok）

第二，对`fixed`和`absolute`的`position`定位支持更加好了。可以用IE 7 Beta2浏览[CSS Edge][0]来检验。

第三，非`a`的元素也可以使用`:hover`了，但`:focus`还是不行。

第四，已经修正了前几天我提到的bug。见[Removing dotted links?][1]。

发现中……

[0]: http://www.meyerweb.com/eric/css/edge/
[1]: /posts/2006-01-20-removing-dotted-links.html
