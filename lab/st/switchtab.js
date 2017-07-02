var hasClass = function(ele,cls) {
	return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}
var addClass = function(ele,cls) {
	if (!this.hasClass(ele,cls)) ele.className += " "+cls;
}
var removeClass = function(ele,cls) {
	if (hasClass(ele,cls)) {
		var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		ele.className=ele.className.replace(reg,' ');
	}
}

var switchTab = function(tabcontainer){
	var c = [];
	var t = document.getElementById(tabcontainer).getElementsByTagName('a');
	var flag = t[0];
	for (i = 0; i < t.length; i++ ) {
		c.push(t[i].hash);
	}
	for (j = 0; j < t.length ; j++){
		t[j].onclick = function(){
			for (k = 0; k < c.length; k++){
				var related = document.getElementById(c[k].replace('#',''));
				if (this.hash == c[k]) {
					related.style.display = 'block';
				} else {
					related.style.display = 'none';
				}
			}
			addClass(this, 'current');
			if (this != flag) removeClass(flag, 'current');
			flag = this;
			return false;
		}
	}
}