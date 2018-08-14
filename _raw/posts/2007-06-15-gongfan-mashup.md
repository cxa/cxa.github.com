# 第一个地图mashup——共饭

之前看过[TwitterVison][0]，便萌生使用[饭否][1]的数据搞一个类似的应用。遗憾的是谷歌地图不能使用地理译码（知道我为何不说Google Maps了吗），之前我想自己去搜集全国城市的经纬度，但觉得太浪费时间了。于是又研究了一下[我要地图网][2]，他们能够提供地理译码，但是地图观感和动画效果却比不上谷歌地图。

于是来个偷梁换柱法，使用我要地图网的API获取地理译码，然后交给谷歌地图来显示。从而诞生了我的我的第一个地图mashup——口号是"**海内存知己，天涯共饭否**"的共饭：[http://realazy.com/projects/gongfan/][3]。欢迎赏光 :) 动画效果和数据的抓取算法还比不上TwitterVison，有空会逐步改进的。

以上。

**更新：**整理出一份[地理译码索引][4]出来，这样就不用每次查询，效率提升不少。

JavaScript源文件[在此][5]，欢迎交流与指正。

[0]: http://twittervision.com
[1]: http://fanfou.com
[2]: http://51ditu.com/
[3]: http://realazy.com/projects/gongfan/
[4]: http://realazy.com/projects/gongfan/js/geocode.js
[5]: http://realazy.com/projects/gongfan/js/gongfan.js
