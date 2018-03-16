---
title: Mac OS 和 Emacs
---
最近入手了一台 MacBook 061\.

由于 Mac OS 身上淌着 Unix 的血液，要找到一些不用花钱的生产力工具还是很容易的。最近习惯了 GNU Emacs (以下简称 Emacs), 所以不管三七二十一，找一个来安装上再说。

才发现 Mac OS 下的 Emacs 版本如此之多。我分别尝试了 [Emacs.app][0], [Carbon Emacs][1] 和 [Aquamacs][2].

首先，Emacs.app 基于还在开发中的 Emacs 23，这个版本最大的改动之一就是字体的处理方式，无疑，在 Mac OS 下，三者中也是它的字体支持最好。Carbon Emacs 和 Aquamacs 都是基于 Emacs 22 的，对字体的支持不足（比如中英混排，或者对字型的选择都比较奇怪）。我对Carbon Emacs 没有什么印象，倒是因为 Aquamacs 解决一个至关重要的问题，我才不得不选择它。

如果你用过 Emacs, 你就知道它是多么依赖于各种快捷键。问题在于，MacBook 键盘右边没有 control 键。当然可以通过设置来让 command 或者 option 来充当 control 键来解决问题，但是为了一个 Emacs 而改变整个系统的键盘布局方式，有点得不偿失。而 Aquamacs 可以使得这样的设置只在 Emacs 内生效而不影响系统：

```lisp
(setq mac-command-modifier 'control)
(setq mac-control-modifier 'alt)
(setq mac-option-modifier 'meta)
```

p.s. 至于 Textmate, 先慢慢尝试一下吧。我的工作环境不可能不处理中文，Textmate 不支持中文严重降低了我去使用它的频度。

更新：后来又折腾一下 Emacs.app, 发现它其实也可以 remap 键位的。无疑，我马上把 Aquamacs 抛弃了。

[0]: http://emacs-app.sourceforge.net/
[1]: http://homepage.mac.com/zenitani/emacs-e.html
[2]: http://aquamacs.org/