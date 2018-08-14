# 跨浏览器使用剪贴板

一般情况下，访问或设置剪贴板，IE 只需使用 `window.clipboardData` 的 `getData` 或 `setData` 方法即可。Mozilla 家族的浏览器（如 Firefox）则比较麻烦，不仅开发者需要写一沱代码，用户也需要主动配合（就是需要设置允许访问剪贴板）才可以（参考 [Using the Clipboard][0]），以致几不可用。至于 Opera 则根本不提供剪贴板，Safari 可以在 onpaste 等非Dom 事件中访问剪贴板（参考 [Using the Pasteboard From JavaScript][1]）。

中国特色的网站上有一个很中国特色的应用就是，在一个输入框 focus 时自动帮你把内容复制到了剪贴板中。老实说访问剪贴板是个不安全的操作，因此即使是 IE, Windows 在后来的升级中都加入是否允许访问剪贴板的提醒。如果能够做到跨浏览器的"邪恶地悄无声息"地实现中国特色的剪贴板应用，确实是个不小的挑战。

遗憾的是老外在 2006 年就帮我们做到了：使用 Flash。参考 [Clipboard Copy][2]. 原版没有考虑不安装或禁止 Flash 的情况，我做了一个小改进：

```js
function copy(inElement) {
    var get = function(id){
        return document.getElementById(id);
    },
        elId = 'flashcopier',
        embedId = 'flashembed';

    if(!get(elId)) {
        var divholder = Document.createElement('div');
        divholder.setAttribute('id', elId);
        document.body.appendChild(divholder);
    }

    var divholder = get(elId);
    divholder.innerHTML = '<embed src="http://static.hainei.com/swf/cp.swf"\
                    FlashVars="clipboard='+encodeURIComponent(inElement.value)+'"\
                    width="0" height="0" type="application/x-shockwave-flash"\
                    id="'+embedId+'"></embed>';

    // 检测是否安装了 Flash
    var flashObj = window[embedId] || document[embedId] || {};
    if (!flashObj.SetVariable){// 没有 flash
        try {
            return window.clipboardData.setData("Text", inElement.value);
        }
        catch(ex){
            return false;
        }
    }

    return true;
}
```

原版是 GPL 的，这个版本也请爱咋咋用……

[0]: http://developer.mozilla.org/En/Using_the_Clipboard
[1]: http://developer.apple.com/documentation/AppleApplications/Conceptual/SafariJSProgTopics/Tasks/CopyAndPaste.html
[2]: http://www.jeffothy.com/weblog/clipboard-copy/
