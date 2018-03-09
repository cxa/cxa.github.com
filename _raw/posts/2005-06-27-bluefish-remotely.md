---
title: 用Bluefish编辑远程文件
---

最近把工作平台转移到 Linux 下，熟悉的 Slackware current，漂亮的 Dropline Gnome current（似乎我永远是 current 的使用者，呵呵）界面，让我工作效率狂飙，上周五买了个索尼的低档耳机（愤青别扁我啊，我只是路过看见就买了，不是日货支持者），我喜爱的 Beatles 开始为我歌唱，困了的时候让 MC Hot Dog 和 LMF 来吼几声，总之，哈哈哈小笑几声，工作时间不再发困打瞌睡了……

而我最心爱的(X)HTML, CSS 编辑器，[Bluefish][0]，在我饱受 Editplus 的蹂躏下，终于回来了！公司使用 CVS，工作区在某台服务器上。虽然 Bluefish 尚未支持 CVS，但支持存取（access）远程文件。Bluefish 官方网的说法是：

> Support for remote files using gnome-vfs (depending on your gnome-vfs setup, you'll have FTP, SFTP, HTTP, HTTPS, WebDAV, Samba and more)

看，是不是比只能存取 FTP 的 Editplus 强悍得多呢？

如何让 Bluefish 存取远程文件，只要你编译的时候没有去掉 gnome-vfs 的支持，这是在是一件十分简单的事情。以我为例吧：打开 nautilus，Files -\> Connect to Server...，选择 FTP(with login)，填上所需登录信息，点击 Connect 后，你会发现桌面上有一个连接到 FTP 的图标了，此时填上 FTP 的登录密码，nautilus 已经进入 FTP 的目录中……

打开 Bluefish，按正常方式打开文件，你会发现 nautilus 的文件选择器（File Selector）有了 FTP 的选择，展开目录，选择你需要的文件编辑吧！

小技巧：如果要编辑的文件位于目录层深层，不妨设置为快捷方式（不知道表述是不是有问题），在文件选择器选中该目录时，点击左边下方的 Add 即可，下次不必再辛辛苦苦展开了。嗯，Nautilus 的这项功能我喜欢极了……

本人口才文笔均有限，如果您看不懂，看看这个 Flash 格式的教程吧：[Editing files remotely with bluefish][1]，是以 SSH 为例的。

[0]: http://bluefish.openoffice.nl/
[1]: http://www.borgerding.org/dropline/trovao/videos/e-remotely/
