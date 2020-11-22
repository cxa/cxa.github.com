# 使用 Stow 管理 dotfiles

## dotfiles 困境

Unix 系统下，软件配置一般保存在 `$HOME` （即你的用户主目录）下，比如 `zsh` 的配置就保存在 `$HOME/.zshrc` 文件里。这些文件的特点是以 `.` (dot) 开头，因此我们姑且称之为 dotfiles。

由于这些文件直接位于 `$HOME` 下面，无论是备份、版本化管理、还是设备间共享，都会造成相当大的困扰，因为相关工具一般都以目录为单位，你又不可能版本化管理整个 `$HOME`。

## 粗糙解决方案

一个解决方案是，把这些 dotfiles 纳入同一个目录，`ln` 到正确位置。例如：把 `.zshrc` 放在 `~/dotfile` 目录里，然后 `ln -s ~/dotfiles/.zshrc ~/.zshrc`。之后只需管理 `~/dotfiles` 这个目录。

但是有些配置不止一个文件，手工 `ln` 难免挂一漏万，精神一恍惚也容易出错。

## GNU Stow

[GNU Stow][0] 原本目的是啥我不知道，不过它正好满足了我们的管理 dotfiles 的几乎所有需求。

首先安装 Stow，如果你是 macOS 系统，`brew install stow` 即可。

我们继续以 `.zshrc` 为例，读君代码几行，胜过千言万语：

```sh
mkdir -p ~/dotfiles/zsh
mv ~/.zshrc ~/dotfiles/zsh
cd ~/dotfiles
stow zsh
```

就是这么简单，先建立个总目录 `~/dotfiles`，在此目录下，以软件名称为单位再建目录，将已有配置迁移到该目录下，然后运行 `stow` 即可。

不过需要注意的是，`dotfiles` 目录直接建立在 `$HOME` 目录下，如果不属于这种父子层级，比如我的位于 `~/Dropbox/dotfiles`，那么需要以 `stow zsh -t ~` 的方式运行。有个简单的方案，运行一次，一劳永逸，再也不用加 `-t ~`：

```
cd ~/Dropbox/dotfiles
mkdir stow
echo '--target=~' > stow/.stowrc
stow stow -t ~
```

其他的软件配置类推，这样你的 dotfiles 就始终在一个目录下，你想备份，版本管理，设备间共享（Dropbox），开源共享（GitHub）都没问题啦。

## 设备间共享与私有配置

我自己有两台电脑运行 macOS，大部分配置都一致，但是一台私用，一台工作，我并不想把两者间不同的共享。

我的解决方法是，两台电脑用不同的用户名，在共享的配置中，加载各自的私有配置，以 `.zshrc` 为例：

```
# 省略了很长一段一段共享配置

zshrc_local=$HOME/.zshrc.$(whoami)
if [ -f "$zshrc_local" ]; then
  source "$zshrc_local"
fi
```

这种情况下，

- `cxa` 用户的加载 `.zshrc.cxa`；
- `realazy` 用户的加载 `.zshrc.realazy`。

[0]: https://www.gnu.org/software/stow/
