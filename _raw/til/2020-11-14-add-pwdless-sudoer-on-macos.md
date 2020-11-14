# sudo 免密码

::macOS::sudo::

升级 macOS Big Sur 后，[yabai](https://github.com/koekeishiya/yabai) scripting-addition 无法再直接运行，需手动或在 `.yabairc` 里执行 `sudo yabai --load-sa`。涉及到 `sudo`，默认的帐户配置是需要输入密码的，如果在 `sudo` 在背景执行的脚本里，没有机会输入密码导致启动失败。手动执行每次输入也会非常的繁琐。因此需给当前帐户加上免密执行 `sudo` 的权限。

运行：

```sh
sudo visudo -f /etc/sudoers.d/sudoers
```

添加：

```sh
# 替换 `your-user-name` 为你的帐户名
your-user-name ALL=(ALL) NOPASSWD: ALL
```
