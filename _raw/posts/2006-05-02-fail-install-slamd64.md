# wtf! Slamd64的bzImage不认vfat

昨天忙活了一整天，在[老韩][0]的慷慨解囊下，终于攒到一台AMD A64的机子。

一向就是[Slackware Linux][1]爱好者的我，早就想试试它的64bit版本[Slamd64][2]了。按照我一贯的作风，我当然是去把current目录下过来，然后通过[loadlin][3]或者[Grub for Dos][4]引导安装了。

很顺利，跟Slackware的硬盘安装模式一样嘛，可是，可是，到了选择安装方式时，我一如既往的键入安装文件所在分区时，它竟然告诉我它mount不了盘！Alt + F2切换终端，试着mount一下盘，才知道，Slamd64压根不认vfat格式的盘，讽刺的是，在安装的提示中有"fat or linux partition"，抄过来也不擦擦屁股的……

我想起了[Zenwalk][5]，它也是这样，在安装时只支持mount linux格式的分区。我靠，这什么世道！就是说，如果你机器没有事先安装有linux的话，基本上，你要硬盘安装它们是十分费劲的了。难道加一个vfat的mod很困难吗？真搞不懂！这些版本难道认为世界上的人都很有钱，都可以刻盘安装吗？（呜呜，发泄一下，俺昨天装机就是没钱买刻录机……）这只会减少他们的用户。Slackware是我最喜欢的版本，它的一切，包括安装，都交给了你自力更生。为什么这些衍生版本都要把这些优秀的东西抛弃？真真搞不懂！！

虽然有些工具可以在win下读写linux分区，或者我可以先装个最简板的Slackware……但是，我还是决定睡觉先，累死我了，天亮了还要去老韩家……

[0]: http://itican.net
[1]: http://slackware.com
[2]: http://www.slamd64.com
[3]: http://elserv.ffm.fgan.de/~lermen/
[4]: http://sourceforge.net/projects/grub4dos/
[5]: http://zenwalk.org
