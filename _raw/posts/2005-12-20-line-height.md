---
title: line-height
---
`line-height`很容易被人忽视。

这个CSS性质（Property）不仅对文本排版有十分重要的作用，同时也可以做些hacks and tricks（不要忘了，在这个CSS如此烂的年代，web标准靠这些hacks and tricks维持生计）。

对一些装饰性的border，当与字体等高时会有比较良好的观感。比如[http://link.eyou.com][0]最上面的整站导航。许多人可能会给这个需要等高的border搞得很郁闷，不得不用图片代替。其实解决方法很简单，把该区块的`line-height`设置为1即可。

另外，不知道为什么`vertical-align`形同虚设，现在使用CSS来控制元素的垂直居中是一个很富挑战的课题。当元素只有一行字，比如标题，此时可以使用`line-height`来控制。把`line-height`的值（value）设置为该区块的高度，则文本可以居中了。

[0]: http://link.eyou.com
