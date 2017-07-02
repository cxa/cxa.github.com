function jsonFlickrFeed(source){
    var itemhtml = '';
    var preload = '';
    var items = source.items;
    for (var i = 0, n = items.length; i < n; ++i){
        itemhtml += '<a href="' + items[i].link + '" target="_blank"><img src="' + items[i].media.m.replace(/_m/g, '_s') + '"/></a>';
        preload += '<img src="' + items[i].media.m.replace(/_m/g, '') +'"/>';
    } 
    itemhtml += '<div id="boom"><img src=""></div>';
    YAHOO.util.Dom.get('flake').innerHTML = itemhtml;
    YAHOO.util.Dom.get('preload').innerHTML = preload;
    var container = YAHOO.util.Dom.get('flake');
    YAHOO.util.Event.on(container, 'mouseover', handleMouseEvent);
    YAHOO.util.Event.on(container, 'mouseout', handleMouseEvent);
    YAHOO.util.Event.on(container, 'click', handleMouseEvent);

}

function handleMouseEvent(e){
    var rtg = YAHOO.util.Event.getRelatedTarget(e);
    var tg = YAHOO.util.Event.getTarget(e);
    var rtgNn = rtg && rtg.nodeName.toLowerCase();
    var tgNn = tg && tg.nodeName.toLowerCase();
    var rtgParent = rtg && rtg.parentNode && rtg.parentNode.nodeName.toLowerCase(); 
    var tgParent = tg && tg.parentNode && tg.parentNode.nodeName.toLowerCase(); 
    var eventType = e.type;

    if (eventType == 'mouseover' && tgNn == 'img' && tgParent == 'a'){
        var anim = new YAHOO.util.Anim(tg, {width: {to:95}, height: {to:95}, top: {to:-10}, left: {to:-10}, opacity: {to:1}}, 0.5, YAHOO.util.Easing.easeOut);
        anim.animate();
    } 
    if (eventType == 'mouseout' && rtg != tg && tgNn == 'img' && tgParent == 'a'){
        var anim = new YAHOO.util.Anim(tg, {width: {to:75}, height: {to:75}, top: {from:0, to:0}, left: {to:0}, opacity: {to:0.5}}, 0.5, YAHOO.util.Easing.easeOut);
        anim.animate();
    } 
    if (eventType == 'click'){
        var boom = YAHOO.util.Dom.get('boom');
        if (tgNn == 'img' && tgParent == 'a'){
            bimg = boom.getElementsByTagName('img')[0];
            bimg.setAttribute('src', 'i/spinner.gif'); //temp
            bimg.setAttribute('src', tg.getAttribute('src').replace(/_s/g, ''));
            var anim = new YAHOO.util.Anim(boom, {width:{from:0, to:379}, height:{from:0, to:304}, left:{to:-2}, top:{to:-2}, opacity: {from:0, to:1}}, 0.8, YAHOO.util.Easing.easeOut);
            boom.style.display = 'block';
            anim.animate();
        } else if ((tgNn == 'div' && tg.getAttribute('id') == 'boom') || (tgNn == 'img' && tgParent == 'div')){
            var anim = new YAHOO.util.Anim(boom, {width:{to:0}, height:{to:0}, right:{to:0}, bottom:{to:0}, opacity: {to:0}}, 0.8, YAHOO.util.Easing.easeOut);
            anim.animate();
            setTimeout(function(){boom.style.display = 'none';}, 800);
        }
        YAHOO.util.Event.stopEvent(e);
    }

}

function tagHandle(tag){
    var url = 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=' + tag;
    var s = document.createElement('script');
    s.src = url;
    document.getElementsByTagName('head')[0].appendChild(s);
}

function tagSearch(e){
    var tag = YAHOO.util.Dom.get('q').value;
    tagHandle(tag);    
    YAHOO.util.Event.stopEvent(e);
}

function init(){
    tagHandle('flower');
    YAHOO.util.Dom.get('q').value = 'flower';
    var frm = YAHOO.util.Dom.get('gettag').getElementsByTagName('form')[0];
    YAHOO.util.Event.on(frm, 'submit', tagSearch);
}

YAHOO.util.Event.on(window, 'load', init);
