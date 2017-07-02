---
title: 从usb启动安装linux
---
遥想当年没有刻录机，硬是将50多个不同的linux distros从硬盘或者vmware安装到了实际硬盘上，练就了一手不需光驱/软驱安装linux的好功夫。

但是，我昨天碰到麻烦了，同样，我从硬盘给我的本本安装了vista之后，无福消受，本本罢机。更不幸的是，此时我才发现本本的光驱挂了，无法读盘。这下麻烦大了，即使不能装windows，至少得整个linux上去。

万幸万幸，在我的本本的BIOS里发现它可以boot from removable device，呵呵，就是说，它能从U盘启动。时代进步了，我玩linux那时U盘洛阳纸贵，加上那时的主板也没有支持，所以，我决定今天好好补补，这样，我的绝活——安装linux得以百尺竿头，更进一步。

我的安装目标是[Arch linux][0]. 当然，Google是最好的老师，很容易找到了[Usb Drive Arch Install][1]。它下面都是一些linux下的命令，虽然另一台我弟用的台式机上没有linux，但基本上都是拷贝文件的操作，所以对我没有影响。把arch base的光盘iso下载过来，解压出来，按照其步骤：

1. 把U盘（我的是读卡器+我手机的miniSD卡）格式为FAT16
2. 把光盘文件拷贝到U盘上
3. 把光盘`isolinux`内的`boot.*`, `initrd.img`,`isolinux.cfg`拷贝到U盘根目录下，并将`isolinux.cfg`更名为`syslinux.cfg`

ok, 最后一步需要`syslinux`，还好，这个由windows版，请到[http://syslinux.zytor.com/download.php][2]下载。打开`cmd`，假如你的U盘盘符是`F:`, 则使用`syslinux.exe F:`. （收获不小，发现大部分linux发行版其实都是用syslinux来做启动盘的）。

至此，你的可启动U盘已经完毕，记得设置BIOS从USB设备启动，你就可以像光盘启动一样安装linux了，比硬盘安装方便多了。

如果确认你的机器是可以从USB设备启动的，而你按照我上述步骤做了之后发现U盘无法启动，那么你可能需要一个叫[USBOOT][3]的工具帮助你把U盘重置参数（使用0或1）:

[![usboot](http://farm1.static.flickr.com/199/441700591_5f54a32216_o.png)][4]

我的miniSD卡就是经过使用1重置参数的洗礼后才被本本的启动认识……

[0]: http://archlinux.org/
[1]: http://wiki.archlinux.org/index.php/Usb_Drive_Arch_Install
[2]: http://syslinux.zytor.com/download.php
[3]: http://www.google.cn/search?complete=1&hl=zh-CN&q=USBoot&btnG=Google+%E6%90%9C%E7%B4%A2&meta=
[4]: http://www.flickr.com/photos/realazy/441700591/ "Photo Sharing"
