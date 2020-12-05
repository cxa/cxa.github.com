# Emacs 特定字符对齐

::Emacs::Tips::

经常看到一些字段和值排列的代码对齐非常整洁，即便字段长度和值长度不一。举个例子：

![
(js-mode	 . eglot-ensure)
(html-mode	 . eglot-ensure)
(css-mode	 . eglot-ensure)
(json-mode	 . eglot-ensure)
(svelte-mode . eglot-ensure)
](/assets/til/2020-12-06.png)

在 Emacs 里，这类对齐有内置支持，使用命令 `align-regexp`，输入需要对齐的字符（此处为 `.`），立马见效。
