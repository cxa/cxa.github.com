# 硬盘安装 Zenwalk 的注意事项

[Zenwalk][0]（刚开始的时候叫 MiniSlack）是一个轻量级的 Slackware 衍生版本，跟 Vector 差不多。两者比较大的区别是，Zenwalk 支持 ReiserFS 4，从而引起我一丝兴趣，决定安装一个试试。

既然是 Slackware 的衍生版本，那么按照 Slackware 的方法来安装它应该没有问题。Slackware 只要有 bzImage 和 color.gz 即可安装，把 Zenwalk 安装盘文件（iso）解压开来，可以在 kernel 目录下找到 bzImage（有 ata 和 scsi 两个版本），在 isolinux 目录下发现 initrd.img。有这两个文件就够了。

接着，使用 lilo/grub（Dos 版或者 linux 版都可以）进行引导，即可进入安装，安装界面跟 Slackware 差不多，配色稍微变化而已。加了 swap 区，分好 root 等分区后，即可开始了。这里要注意，选择硬盘安装方式后，Slackware 要你填入分区，然后填目录，Zenwalk 需要直接填写安装源，因此必须先把安装文件所在的盘 mount 好。

一切按照 Slackware 的方式进行，直到它叫你 Ctrl + Alt + Del。注意！！！此时不能这样做，你还不能重起！或许是由于 Zenwalk 对硬盘安装的支持还不是很完善，如果此时重起，你是没有机会进入 Zenwalk 的……因为，它还没有装上引导！

Alt + Fn(n=2-7)打开终端，把刚才所安装 Zenwalk 的 root 目录 mount 上，chroot 进去，编写/etc/lilo.conf（还没有就新建），写好后执行 lilo，这样才算大功告成。

好了，我可以试用我的 ReiserFS 4 版的 Slackware 了……

[0]: http://zenwalk.org
