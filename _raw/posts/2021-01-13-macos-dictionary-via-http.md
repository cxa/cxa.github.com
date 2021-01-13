# 记一款小工具的诞生

我用 [Calibre](https://calibre-ebook.com) 管理电子书籍已有很多年。它推出阅读器也有一段时间了，虽然没有 iBooks 那么美观，但胜在方便，而且直接支持 mobi 格式，渐渐我就用它替换了 iBooks。

Calibre 阅读器并非 native 的实现，选择文本后无法使用 macOS 的系统字典进行查询，也无法通过 PopClip 这种工具来转接。但它提供了一个自定义词典功能，可以通过 HTTP 地址进行查询。虽然有很多选择，但我最想用的还是系统字典。那么，能够通过 HTTP 查询系统字典，是我想做到的。

## 调研

一番搜索，`Core Services` 的 `Dictionary Services` 提供了查询接口，遗憾的是功能有限，没有能覆盖到 `Dictionary.app` 提供的功能。然而，API 是藏不住的，<https://nshipster.com/dictionary-services/> 提供了这些私有接口。

一开始我想直接创建一个原生应用程序提供 HTTP 服务，但仔细看 API，它的输出有纯文本，也有 HTML (带 CSS 或者不带)。既然有纯文本，做成一个命令行工具，用途可以更宽广。然后再通过 Node 简单封装一下 HTTP 服务，开发效率会高很多。

## 实现

### 命令行工具

我一直希望能脱离 Xcode 用 `make` 来管理一下项目，这个小项目正是一个好机会。`Core Services` 类型都是 `Core Foundation` 类型，我也决定不用 ObjC，用纯 C 来练练手。

最终我把它命名为 `dicmd`，开源在 <https://github.com/cxa/dicmd>。为了方便安装，学会了简单的 [homebrew formulae](https://github.com/cxa/homebrew-formulae/blob/main/dicmd.rb)。

### HTTP 服务

我选择了简单直接的 [micro](https://github.com/vercel/micro)，这个倒没有什么好说。难点在于，词条的输出就是一个完整的 HTML 文档，如何将多词条拼凑在同一个页面。iframe 并不能自适应尺寸，[Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) 是一个优雅的解决方案。具体可参考 `dicsrv`，开源在 <https://github.com/cxa/dicsrv>。

## 效果

如图。

![Screen shot](/assets/posts/2021_01_13_sample.png)
