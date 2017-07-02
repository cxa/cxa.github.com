// timestamp: Fri, 23 Mar 2007 13:40:02


new function() { ////////////////////  BEGIN: CLOSURE  ////////////////////

// ========================================================================
// BOM/object.js
// ========================================================================

// browser specific code

var MSIE = eval("false/*@cc_on||true@*/");

var BOM = {
	userAgent: "",

	init: function() {
		// initialise the user agent string
		var userAgent = navigator.userAgent;
		// fix opera's (and others) user agent string
		if (!MSIE) userAgent = userAgent.replace(/MSIE\s[\d.]+/, "");
		// close up the space between name and version number
		//  e.g. MSIE 6 -> MSIE6
		userAgent = userAgent.replace(/([a-z])[\s\/](\d)/gi, "$1$2");
		this.userAgent = navigator.platform + " " + userAgent;
		this._element = document.createElement("span");
	},

	detect: function(test) {
		var element = BOM._element;
		var returnValue = false;
		var not = test.charAt(0) == "!";
		test = test
			.replace(/^\!?(if\s*|platform\s+)?/, "")
			.replace(/^(["']?)([^\(].*)(\1)$/, "/$2/i.test(BOM.userAgent)");
		try {
			eval("returnValue=!!" + test);
		} catch (error) {
			// the test failed
		}
		return Boolean(not ^ returnValue);
	}
};

// ========================================================================
// BOM/namespace.js
// ========================================================================

// browser specific code
base2.extend(BOM, {
	exports: "detect,Window",
	name: "BOM",
	version: "0.9"
});
BOM = new base2.Namespace(this, BOM);

eval(this.imports);


// ========================================================================
// BOM/Base.js
// ========================================================================

extend(Base.prototype, "extend", function(source, value) {
	if (typeof source == "string" && source.charAt(0) == "@") {
		return BOM.detect(source.slice(1)) ? this.base(value) : this;
	}
	return base(this, arguments);
});

// ========================================================================
// BOM/MSIE.js
// ========================================================================

// avoid memory leaks

if (MSIE && window.attachEvent) {
	var $closures = {}; // all closures stored here
	
	BOM.$bind = function(method, element) {
		if (!element || element.nodeType != 1) {
			return method;
		}
		
		// unique id's for element and function
		var $element = element.uniqueID;
		var $method = assignID(method);
		
		// store the closure in a manageable scope
		$closures[$method] = method;			
		if (!$closures[$element]) $closures[$element] = {};		
		var closure = $closures[$element][$method];
		if (closure) return closure; // already stored
		
		// reset pointers
		element = null;
		method = null;
		
		// return a new closure with a manageable scope 
		var bound = function() {
			var element = document.all[$element];
			if (element) return $closures[$method].apply(element, arguments);
		};
		bound.cloneID = $method;
		$closures[$element][$method] = bound;
		return bound;
	};
	
	attachEvent("onunload", function() {
		$closures = null; // closures are destroyed when the page is unloaded
	});
}

// ========================================================================
// BOM/Window.js
// ========================================================================

var Window = Module.extend(null, {
	verify: function(window) {
		return (window && window.Infinity) ? window : null;
	},
	
	"@MSIE": {
		verify: function(window) {
			// A very weird bug...
			return (window == self) ? self : this.base();
		}
	}
});

eval(this.exports);

}; ////////////////////  END: CLOSURE  ////////////////////////////////////
