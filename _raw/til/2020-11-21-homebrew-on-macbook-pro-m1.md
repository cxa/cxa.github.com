# 在 MacBook Pro M1 上安装使用 Homebrew

::macOS::MacBookPro::M1::Homebrew::

## 安装 Homebrew (ARM/M1)

由于 Homebrew 尚未完全支持 ARM 架构的 Macbook Air/Pro M1，安装时不要用默认的安装脚本，那是默认给 Intel macOS 准备的。可以按此步骤：

```sh
sudo mkdir /opt/homebrew
sudo chown $(whoami) /opt/homebrew
curl -L https://github.com/Homebrew/brew/tarball/master | tar xz --strip 1 -C /opt/homebrew
```

别忘了把 `/opt/homebrew/bin` 添加到你的 `PATH` 里（如果你没概念，打开主目录的 `.zshrc` 文件，添加 `export PATH=/opt/homebrew/bin:$PATH`）。

这样，Homebrew 安装或编译的软件都将是 ARM 架构的，对 M1 来说也就是 native 的。

如果你发现某些程序无法用 Homebrew 编译通过，那么你还需要安装一份 Intel 架构的 Homebrew，使用罗塞塔来运行。

## 安装 Homebrew（Intel）

```sh
arch -x86_64 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

## 使用 Homebrew

为例避免两个 brew 相冲突，我的做法是：

```sh
alias xbrew="arch -x86_64 /usr/local/bin/brew"
alias abrew="/opt/homebrew/bin/brew"
```

我优先使用 `abrew`（即支持 **A**RM 架构），当我发现 `abrew` 无法安装时（毕竟 Homebrew 还有很多软件未兼容 ARM），我再使用 `xbrew`。

（2020-11-25 更新）
