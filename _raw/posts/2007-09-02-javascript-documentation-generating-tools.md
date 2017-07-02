---
title: JavaScript文档生成工具
---
如果你看过YUI的RAW源码，会发现很多跟javadoc语法类似的注释。据说([via][0])是使用[JSDoc][1]这个工具。但我探索了一遍，发现YUI多出很多tag, 比如`@namespace`, `@static`之类，那么我只好怀疑YUI做了改良。一开始，我也试着使用了一下JSDoc，遗憾的是，除了缺少一些tag外，它还不支持未匿名函数内的文档生成。比如，有时候为了保证不产生额外的全局变量会这么写：

    (function(){
    /**
     * 注释
     * @tag
     */
    ....
    })();

或者我所喜欢的"[module pattern][2]":

    var module = function(){
      var private;
      return {
      /**
       * 注释
       * @tag
       */
       pub1: function(){},
       pub2: function(){},
       ...
      }
    }();

在这种情况下，在匿名函数内，和在return区块内的注释，JSDoc就，用北京话说，"葛屁"（音）了，就是不起作用了。遗憾的是我的水平尚未上升到改良perl脚本以能按我所需的程度，因此，我寻找的是下一个目标。

[JsDoc Toolkit][3]是一个不错的选择，虽然名称跟JSDoc不太容易区分。相比之下，它是使用JavaScript来处理文档的（当然，得通过rhino），而且支持我前面所列举的两种形式（单是这点，我就只能选择它了）。

两者在tag的处理方面有所不同，感觉JSDoc的全面一些，但缺乏某些关键的tag，比如JsDoc Toolkit中的`@scope`就很好用。

至于如何安装使用，直接上官网看吧 :)。欢迎同我交流。

粗粗看了一下jQuery，似乎它也是通过rhino来处理文档生成的，嗯，我也得钻研一下，hack出符合我要求的工具了。

[0]: http://www.phpied.com/running-jsdoc-on-windows/#comment-762
[1]: http://jsdoc.sourceforge.net/
[2]: http://yuiblog.com/blog/2007/06/12/module-pattern/
[3]: http://jsdoctoolkit.org/