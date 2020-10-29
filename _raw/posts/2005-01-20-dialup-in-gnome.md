# 在 Gnome 下拨号上网

我回家已经多天了，除了跑到小镇上的网吧，我还有一条上网途径：在家电话拨号上网。估计 Modem（调制解调器）已经进入博物馆，新一代亦不知拨号为何物……但在农村，似乎只有这一条上网途径，如果哪一天也想电话一样，村村通宽带就好了。尽管电话上网奇贵，奇慢，像一条在海中遨游的鱼进了水族馆，也像一群被圈养的鸽子，尽管失去了宽阔，但还是可以苟且偷生。

我使用的是 [Linux][0] 操作系统，[Slackware][1] 发行版，版本号为 current，桌面环境是 [Gnome][2]，[Dropline][3] 发行版。如果在 KDE 下，我们可以有 kppp 来拨号，但 Gnome，直到最近，才出现了 Gnome PPP，原谅我不能给你连接，因为这是我离线写作的，麻烦你 [Google][4] 一下，进入它的官方网站查看详情。

在 Slackware 的 Dropline Gnome 下如何拨号上网？

1. 首先，如果是内置 Modem 你的型号必须是 Conexant 的，ESS 的不能成功。从 [Linuxant][5] 下载 hsfmodem-7.18.00.02full.tar.gz，解开，`make install`，跟着提示设置就可以了。由于我们没有美元送给作者，所以最高速度只能是 14.4kbps，呵呵。
2. 其次，安装 gnome-ppp，二进制包可以从 slackware 的 pkgs 大本营 [LinuxPackages][6] 上搜索找到，或者到官方网站下载源代码自己编译。此外，gnome-ppp 依赖于 wvdial 和 wvstreams，也可以在 LinuxPackages 上找到。
3. 第三，不知道为何普通用户不能拨号成功。进入系统，普通用户没有使用/dev/modem 的权限，即使 `chmode 666 /dev/modem`，在拨通的一刹那会自动 crash 掉。办法是有的，我们的 Gnome 不是有一个 gnomesu 吗？运行它，使用 root 的身份来运行 `gnome-ppp` 即可。没有的话，在 terminal 用 su 来运行好了，不过 Dropline Gnome 是自带的，在 System tools 菜单里面，名字叫做 Run Program as Root。

不过如果不是为了在 Linux 下工作，你还是到 Windows 去拨号吧，因为毕竟简单点，假如你是双+系统的话。

[0]: http://kernel.org/
[1]: http://slackware.com/
[2]: http://gnome.org/
[3]: http://dropline.net/gnome
[4]: http://google.com/
[5]: http://linuxant.com
[6]: http://linuxpackages.net
