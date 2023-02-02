# 作为命令行编辑器的 Emacs

在终端编辑多行命令会非常不顺手和容易出错，此时你应该将 `EDITOR` 环境变量设置为你顺手的编辑器。起初我直接 `export EDITOR=emacs`，但这样会调起桌面端 Emacs 编辑器；然后我买了个乖 `export EDITOR=emacs -nw`，这样 Emacs 直接在终端启动了，但需从头到尾加载 Emacs 的配置，无论时间长短，打断感极强。好在 Emacs 提供 C/S 模式，即是说，配置加载只发生在 server 启动阶段，client 启动时间约等于连接 server 的时间，瞬间。

## 启动 server

启动 server 最简单的方式，是在终端输入 `emacs --daemon`，或者在已打开的 Emacs 编辑器内 `M-x server-start`。

如果需要随系统自启动，由于我用的是 macOS 系统，特别说明下该系统下的自启动方法：

1. 使用 `brew` 安装 [`emacs-plus`](https://github.com/d12frosted/homebrew-emacs-plus)，它附赠了 service：`brew services start emacs-plus@29`。（注意 `@29` 需更换为你所安装的版本)
2. 开启 Script Editor（位于 `/Applications/Utilities/` 内，或用 Spotlight 搜索），新建文件，输入以下内容：
```applescript
tell application "Terminal"
	do shell script "/Applications/Emacs.app/Contents/MacOS/Emacs --daemon"
end tell
```
并保存为 `Application` 的文件格式。进入 `System Settings -> General -> Login Items`，将刚才保存的文件拖入 `Open at Login`。

其他操作系统可参考：<https://www.emacswiki.org/emacs/EmacsClient>。

## 启动 client

在 `~/.zshrc`（如果你还用 `bash`，则是 `~/.profile`）中设置 `EDITOR`：

```sh
export EDITOR="emacsclient -a '' -c"
```

在终端中，编辑命令时，按 `C-x e` 就会调出 Emacs。如果上述一切准备就绪的话，Emacs 就会瞬间开启，没有任何配置加载过程。在开启的 Emacs 内编辑完毕，可按 `C-x #` 完成编辑返回到终端。

## 免应答优雅退出

`C-x #` 退出时，如果产生了编辑，Emacs 会询问是否保存。绝大部分情况下肯定都是编辑过，这个询问非常干扰多此一举。搜索一番并无定制的选项可禁止，只好自己去阅读下源码，看有没有解决方案。

首先，需要了解该快捷键调用了哪个方法。在 Emacs 中，可以在 `C-h k` 后键入 `C-x #` 一探究竟。一通操作猛如虎，最终发现在 <https://github.com/emacs-mirror/emacs/blob/emacs-29/lisp/server.el#L1626> 中执行了 `y-or-n-p` 这个询问函数。这里没有给任何的 hook，override 整个 `server-done` 显然是下下策。如果能在 `server-done` 内临时让 `y-or-n-p` 返回 `t` 就能皆大欢喜了。我的解决方案如下：

```elisp
(defun cxa/yes-never-no (&rest _args)
  "Override `y-or-n-p' to always retrun t."
  t)

(defun cxa/yes-then-restore (orig-fun &rest args)
  "Make `y-or-n-p' always return t before ORIG-FUN, and restore after applied ARGS."
  (advice-add 'y-or-n-p :override 'cxa/yes-never-no)
  (apply orig-fun args)
  (advice-remove 'y-or-n-p 'cxa/yes-never-no))

(advice-add 'server-done :around 'cxa/yes-then-restore)
```

代码即解释。如果是首次加入这段配置，记得重启 Emacs server。
