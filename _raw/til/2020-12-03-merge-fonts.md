# 合并字体

::Font::

我最近喜欢用 [Anonymous Pro][0] 这款字体作为代码字体，不过可能是年老昏花，只喜欢它的粗体，就是说我希望把粗体当常规体用。这样的话麻烦很多，英文是粗体，系统提供的中文字体，常规体不够粗，粗体又太粗了，无法搭配。于是我从[方正字库][1]找到一款相对般配的字体「方正方俊黑」（自用免费），寻思着怎么把它们合成一个新字体，英文部分用 Anonymous Pro，中文部分使用方正方俊黑。一番搜索，参考 <http://7thgen.info/blog/2008/07/merging-font-with-fontforge/>，使用 [fontforge][2] 搞定。

首先将所需字体拷贝到某个目录下，保存以下脚本为 merge.pe：

```sh
# 先处理中文字体，生成一个临时 tmp.ttf
Open("FZFangJHJW_Zhong.TTF")
SelectAll()
ScaleToEm(1024)
Generate("tmp.ttf")
Close()

# 打开英文字体，合并上面生产的 tmp.ttf
Open("Anonymous Pro Minus B.ttf")
SelectAll()
ScaleToEm(1024)
MergeFonts("tmp.ttf")

SetFontNames("AnonymousProFZFangJH", "AnonymousPro FZFangJH", "AnonymousPro FZFangJH Regular", "Regular", "")

# 必须覆盖原来字体的 name table
SetTTFName(0, 1, "AnonymousPro FZFangJH")
SetTTFName(0, 2, "Regular")
SetTTFName(0, 3, "AnonymousProFZFangJH:Regular")
SetTTFName(0, 4, "AnonymousPro FZFangJH Regular")
SetTTFName(0, 6, "AnonymousProFZFangJH-Regular")
SetTTFName(0, 16, "AnonymousPro FZFangJH")
SetTTFName(0, 17, "Regular")
SetTTFName(0x409, 1, "AnonymousPro FZFangJH")
SetTTFName(0x409, 2, "Regular")
SetTTFName(0x409, 3, "AnonymousProFZFangJH:Regular")
SetTTFName(0x409, 4, "AnonymousPro FZFangJH Regular")
SetTTFName(0x409, 6, "AnonymousProFZFangJH-Regular")
SetTTFName(0x409, 16, "AnonymousPro FZFangJH")
SetTTFName(0x409, 17, "Regular")

# 生成最终字体
Generate("AnonymousPro FZFangJH.ttf")
Close()
```

然后运行 `fontforge -script merge.pe`，最终安装生成的字体即可。

如果你想生成斜体（并不推荐，逼不得已的下下策），可以在 `SelectAll()` 之后添加：

```sh
Italic(-10, 0, 2, 2)
SetItalicAngle(-10)
```

附效果图一张（点击看原图）：

[![效果图](/assets/til/2020-12-03.gif)](/assets/til/2020-12-03.png)

[0]: https://www.marksimonson.com/fonts/view/anonymous-pro
[1]: http://www.foundertype.com
[2]: https://fontforge.org
