var YMiniWeather = function(){
	var wrapper, normal, more;
	var getId = function(id){
		return document.getElementById(id);
	};
	var setOpacity = function(el, level){
	    if (el.filters) elem.style.filters = 'alpha(opacity=' + level + ')';
	    else el.style.opacity = level / 100;
	};
	var show = function(el){
	    el.style.display = 'block';
	};
	var hide = function(el){
	    el.style.display = 'none';
	};
	var getTarget = function(e){
    	var targ;
    	if (e.target) targ = e.target;
    	else if (e.srcElement) targ = e.srcElement;
    	if (targ.nodeType == 3) // defeat Safari bug
    		targ = targ.parentNode;
        return targ;
	}
	return {
		init: function(){
			wrapper = getId('wrapper');
			normal = getId('normal');
			more = getId('more');
			YMiniWeather.addEvent(wrapper, 'mouseover', YMiniWeather.mOver);
			YMiniWeather.addEvent(wrapper, 'mouseout', YMiniWeather.mOut);
		},
		mOver: function(){
			YMiniWeather.fadeIn(more);
			YMiniWeather.fadeOut(normal);
		},
		mOut: function(){
    		YMiniWeather.fadeIn(normal);
    		YMiniWeather.fadeOut(more);
		},
		addEvent: function(obj, type, fn){
			if (obj.attachEvent) {
				obj['e'+type+fn] = fn;
				obj[type+fn] = function(){obj['e'+type+fn](window.event);}
				obj.attachEvent('on'+type, obj[type+fn]);
			} else
				obj.addEventListener(type, fn, false);
		},
		fadeIn: function(el){
		    show(el);
			for (var i = 0; i < 100; i += 10){
				(function(){
					var p = i;
					setTimeout(function(){setOpacity(el, p)}, Math.abs(p) * 10);
				})();
			}
		},
		fadeOut: function(el){
			for (var i = -25; i < 1; i += 5){
				(function(){
					var p = i;
					setTimeout(function(){el.style.top = p + 'px';}, (25 + p) * 10);
				})();
			}
			hide(el);
		}
	}
}();

YMiniWeather.addEvent(window, 'load', YMiniWeather.init);
