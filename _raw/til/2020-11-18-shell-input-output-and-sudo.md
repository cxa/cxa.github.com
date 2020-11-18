# Shell 输入输出与 `sudo`

::shell::sudo::

了解 `sudo` 后，大家伙可能会毫不犹豫地使用类似的命令：

```sh
sudo echo "127.0.0.1 realazy.com" >> /etc/hosts
```

duang！一般你会收到类似 `permission denied: /etc/hosts` 的反馈。瓦特，权限不足？不是已经 `sudo` 了吗？！

还真是权限不足，在这里，`sudo` 管的是 `echo`，像 `>>`、`>`、`<` 和 `|` 等操作符，是由 shell 掌管的，而不是 `echo` 等具体程序。`echo` 及其他的 shell 程序，是不知道 `|` 等操作符存在的，只管读输入，写输出。因此，你需要将 `echo` 的输出交给其他程序如 `tee`，`sudo` 权限也赋予 `tee`，才能成功完成相关操作：

```sh
echo "127.0.0.1 realazy.com" | sudo tee -a /etc/hosts
```

详情请参阅：<https://missing-semester-cn.github.io/2020/course-shell/#一个功能全面又强大的工具>
