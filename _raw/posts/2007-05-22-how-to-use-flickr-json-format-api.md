# 如何使用 Flickr JSON 格式的 API

如果你曾经试图使用 Flickr JSON 格式的 API，第一眼一定会感到奇怪，这真的是 JSON 吗？不信请看 [http://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=flower][0].

诸如 `jsonFlickrFeed({...})` 看起来更像一个函数的调用。细心一看，确实不错，它把 JSON 作为 `jsonFlickrFeed` 函数的参数输出了。本人猜测这是安全方面的原因。不过这样一来，我们如何才能把 JSON 抽取出来为我所用？Flickr 能提供这种形式的 API，那也肯定能用。

其实，前面我已经一语道破天机，jsonFlickrFeed 是一个函数，那么我们先定义好它，然后通过 `script` 的 `src` 引入 API 地址执行即可。

请参考：[http://realazy.com/lab/flake/][1]

[0]: http://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=flower
[1]: http://realazy.com/lab/flake/
