function jsonFlickrFeed(source){
    var itemhtml = '';
    var preload = '';
    var items = source.items;
    for (var i = 0, n = items.length; i < n; ++i){
        itemhtml += '<a href="' + items[i].link + '" target="_blank"><img src="' + items[i].media.m.replace(/_m/g, '_s') + '"/></a>';
        preload += '<img src="' + items[i].media.m.replace(/_m/g, '') +'"/>';
    } 
    itemhtml += '<div id="boom"><img src=""></div>';
    $('#flake').html(itemhtml);
    $('#preload').html(preload);
    
    $('#flake a img').mouseover(function(){
            $(this).animate({
height: 95, width: 95, top: -10, left: -10, opacity: 1
}, 'fast');
            }).mouseout(function(){
                $(this).animate({
height: 75, width: 75, top: 0, left: 0, opacity: 0.5
}, 'fast');
            }).click(function(){
                photoZoom($('#boom'), this.getAttribute('src').replace(/_s/g, ''));
                $(this).trigger('mouseout');
                return false;
            });
            $('#boom').click(function(){
                $(this).animate({width: 'hide', height: 'hide', opacity: 'hide'}, 'slow');
            });

}

function tagHandle(tag){
    var url = 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=' + tag;
    var s = document.createElement('script');
    s.src = url;
    document.getElementsByTagName('head')[0].appendChild(s);
}

function photoZoom(boom, src){
    $('img', boom).attr('src', 'i/spinner.gif');
    $('img', boom).attr('src', src);
    boom.animate({width: 'show', height: 'show', opacity:'show'},'slow');
}

$(document).ready(function(){
        tagHandle('flower');
        $('#gettag form').submit(function(){
            tagHandle($('#q').val());
            return false;
            });

        });
