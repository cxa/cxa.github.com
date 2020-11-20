# 在 MacBook Pro M1 上安装使用 Homebrew

::macOS::MacBookPro::M1::Homebrew::

Homebrew 并未来得及原生支持 M1 芯片（ARM 架构）的 macOS Big Sur，因此还需要使用罗塞塔来运行。

## 安装 Homebrew

```sh
arch -x86_64 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

## 安装软件

```sh
arch -x86_64 brew install <formula>
```

为了更愉悦地使用，建议：

```sh
echo 'alias brew="arch -x86_64 brew"' >> ~/.zshrc
```

然后不必每次都 `arch -x86_64` 了，直接运行 `brew` 吧，直到它原生支持 ARM。
