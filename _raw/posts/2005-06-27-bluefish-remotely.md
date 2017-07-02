---
title: 用Bluefish编辑远程文件
---
最近把工作平台转移到Linux下，熟悉的Slackware current，漂亮的Dropline Gnome current（似乎我永远是current的使用者，呵呵）界面，让我工作效率狂飙，上周五买了个索尼的低档耳机（愤青别扁我啊，我只是路过看见就买了，不是日货支持者），我喜爱的Beatles开始为我歌唱，困了的时候让MC Hot Dog和LMF来吼几声，总之，哈哈哈小笑几声，工作时间不再发困打瞌睡了……

而我最心爱的(X)HTML, CSS编辑器，[Bluefish][0]，在我饱受Editplus的蹂躏下，终于回来了！公司使用CVS，工作区在某台服务器上。虽然Bluefish尚未支持CVS，但支持存取（access）远程文件。Bluefish官方网的说法是：  

> Support for remote files using gnome-vfs (depending on your gnome-vfs setup, you'll have FTP, SFTP, HTTP, HTTPS, WebDAV, Samba and more)
> 
> 

，看，是不是比只能存取FTP的Editplus强悍得多呢？

如何让Bluefish存取远程文件，只要你编译的时候没有去掉gnome-vfs的支持，这是在是一件十分简单的事情。以我为例吧：打开nautilus，Files -\> Connect to Server...，选择FTP(with login)，填上所需登录信息，点击Connect后，你会发现桌面上有一个连接到FTP的图标了，此时填上FTP的登录密码，nautilus已经进入FTP的目录中……

打开Bluefish，按正常方式打开文件，你会发现nautilus的文件选择器（File Selector）有了FTP的选择，展开目录，选择你需要的文件编辑吧！

小技巧：如果要编辑的文件位于目录层深层，不妨设置为快捷方式（不知道表述是不是有问题），在文件选择器选中该目录时，点击左边下方的Add即可，下次不必再辛辛苦苦展开了。嗯，Nautilus的这项功能我喜欢极了……

本人口才文笔均有限，如果您看不懂，看看这个Flash格式的教程吧：[Editing files remotely with bluefish][1]，是以SSH为例的。

[0]: http://bluefish.openoffice.nl/
[1]: http://www.borgerding.org/dropline/trovao/videos/e-remotely/
