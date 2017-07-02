
// fix JavaScript for IE5.0 (and others)
window.$Legacy = window.$Legacy || {};
window.undefined = window.undefined;
new function() {
	var E = window.Error, A = Array.prototype, slice = A.slice;
	
	try {
		new Function("o,k", "return o instanceof k");
	} catch (e) {
		$Legacy.instanceOf = function(o, k) {
			while (k && o.constructor != k) k = k.ancestor;
			return !!k;
		};
	}
	
	if (typeof encodeURIComponent == "undefined") {
		encodeURIComponent = function(s) {
			return escape(s).replace(/\%(21|7E|27|28|29)/g, unescape).replace(/[@+\/]/g, function(c) {
				return "%" + c.charCodeAt(0).toString(16).toUpperCase();
			});
		};
		decodeURIComponent = unescape;
	}
	
	Error = function(m) {
		this.name = "Error";
		this.message = m || "Error";
	};
	if (E) Error.prototype = new E;
	if (typeof TypeError == "undefined") {
		TypeError = SyntaxError = Error;
	}
	
	var $extend = function(N, n, p) {
		var c = window[N];
		if (!c.prototype[n]) {
			if (!$Legacy[N]) $Legacy[N] = {};
			$Legacy[N][n] = c.prototype[n] = p;
		}
	};
	
	$extend("Array", "push", function() {
		for (var i = 0; i < arguments.length; i++) {
			this[this.length] = arguments[i];
		}
		return this.length;
	});
	
	$extend("Array", "pop", function() {
		if (this.length) {
			var i = this[this.length - 1];
			this.length--;
			return i;
		}
	});
	
	$extend("Array", "shift", function() {
		var r = this[0];
		if (this.length) {
			var a = this.slice(1), i = a.length;
			while (i--) this[i] = a[i];
			this.length--;
		}
		return r;
	});
	
	$extend("Array", "unshift", function() {
		var a = A.concat.call(slice.apply(arguments, [0]), this), i = a.length;
		while (i--) this[i] = a[i];
		return this.length;
	});
	
	$extend("Array", "splice", function(i, c) {
		var r = c ? this.slice(i, i + c) : [];
		var a = this.slice(0, i).concat(slice.apply(arguments, [2])).concat(this.slice(i + c)), i = a.length;
		this.length = i;
		while (i--) this[i] = a[i];
		return r;
	});
	
	function fix(o) {
		if (o && o.documentElement) {
			o = o.documentElement.document || o;
		}
		return o;
	};
	
	var ns = this; // this is a frig :-(
	$extend("Function", "apply", function(o, a) {
		if (o === undefined) o = ns;
		else if (o == null) o = window;
		if (a[0]) a[0] = fix(a[0]);
		var $ = "#base_apply", r;
		if (typeof o == "string") o = new String(o);
		o[$] = this;
		switch (a.length) { // unroll for speed
			case 0: r = o[$](); break;
			case 1: r = o[$](a[0]); break;
			case 2: r = o[$](a[0],a[1]); break;
			case 3: r = o[$](a[0],a[1],a[2]); break;
			case 4: r = o[$](a[0],a[1],a[2],a[3]); break;
			case 5: r = o[$](a[0],a[1],a[2],a[3],a[4]); break;
			default:
				var b = [], i = a.length - 1;
				do b[i] = "a[" + i + "]"; while (i--);
				eval("r=o[$](" + b + ")");
		}
		try {
			delete o[$];
		} catch (e) {
			o[$] = undefined;
		}
		return fix(r);
	});
	
	$extend("Function", "call", function(o) {
		return this.apply(o, slice.apply(arguments, [1]));
	});
	
	$extend("Number", "toFixed", function(n) {
		var e = Math.pow(10, n);
		return Math.round(this * e) / e;
	});
};
