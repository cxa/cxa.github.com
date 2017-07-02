// timestamp: Fri, 23 Mar 2007 13:39:16

/*
	base2.js - copyright 2007, Dean Edwards
	http://www.opensource.org/licenses/mit-license
*/

var base2 = {};

new function() { ////////////////////  BEGIN: CLOSURE  ////////////////////

// ========================================================================
// base2/JS.js
// ========================================================================

var JS = window;

// ========================================================================
// base2/Base.js
// ========================================================================

// version 1.1

var Base = function() {
	// call this method from any other method to invoke that method's ancestor
};

Base.prototype = {	
	extend: function(source) {
		if (arguments.length > 1) { // extending with a name/value pair
			var ancestor = this[source];
			var value = arguments[1];
			if (typeof value == "function" && ancestor && /\bbase\b/.test(value)) {
				var method = value;				
				value = function() { // override
					var previous = this.base;
					this.base = ancestor;
					var returnValue = method.apply(this, arguments);
					this.base = previous;
					return returnValue;
				};
				value.method = method;
				value.ancestor = ancestor;
			}
			this[source] = value;
		} else if (source) { // extending with an object literal
			var extend = Base.prototype.extend;
			if (Base._prototyping) {
				var key, i = 0, members = ["constructor", "toString", "valueOf"];
				while (key = members[i++]) if (source[key] != Object.prototype[key]) {
					extend.call(this, key, source[key]);
				}
			} else if (typeof this != "function") {
				// if the object has a customised extend() method then use it
				extend = this.extend || extend;
			}			
			// copy each of the source object's properties to this object
			for (key in source) if (!Object.prototype[key]) {
				extend.call(this, key, source[key]);
			}
		}
		return this;
	},

	base: Base
};

Base.extend = function(_instance, _static) { // subclass
	var extend = Base.prototype.extend;
	
	// build the prototype
	Base._prototyping = true;
	var proto = new this;
	extend.call(proto, _instance);
	delete Base._prototyping;
	
	// create the wrapper for the constructor function
	var constructor = proto.constructor;
	var klass = proto.constructor = function() {
		if (!Base._prototyping) {
			if (Base._constructing || this.constructor == klass) { // instantiation
				Base._constructing = true;
				constructor.apply(this, arguments);
				delete Base._constructing;
			} else { // casting
				var object = arguments[0];
				if (object != null) {
					(object.extend || extend).call(object, proto);
				}
				return object;
			}
		}
	};
	
	// build the class interface
	for (var i in Base) klass[i] = this[i];
	klass.ancestor = this;
	klass.base = Base.base;
	klass.prototype = proto;
	klass.toString = this.toString;
	extend.call(klass, _static);
	// class initialisation
	if (typeof klass.init == "function") klass.init();
	return klass;
};

// initialise
Base = Base.extend({
	constructor: function() {
		this.extend(arguments[0]);
	}
}, {
	ancestor: Object,
	base: Base,
	
	implement: function(_interface) {
		if (typeof _interface == "function") {
			// if it's a function, call it
			_interface(this.prototype);
		} else {
			// add the interface using the extend() method
			this.prototype.extend(_interface);
		}
		return this;
	}
});

// ========================================================================
// /main.js
// ========================================================================

var $Legacy = window.$Legacy || {};

var K = function(k) {return k};

var assert = function(condition, message, Error) {
	if (!condition) {
		throw new (Error || window.Error)(message || "Assertion failed.");
	}
};

var assertType = function(object, type, message) {
	if (type) {
		var condition = typeof type == "function" ? instanceOf(object, type) : typeof object == type;
		assert(condition, message || "Invalid type.", TypeError);
	}
};

var format = function(string) {
	// replace %n with arguments[n]
	// e.g. format("%1 %2%3 %2a %1%3", "she", "se", "lls");
	// ==> "she sells sea shells"
	// only supports nine replacements: %1 - %9
	var args = arguments;
	return String(string).replace(/%([1-9])/g, function(match, index) {
		return index < args.length ? args[index] : match;
	});
};

var $instanceOf = $Legacy.instanceOf || new Function("o,k", "return o instanceof k");
var instanceOf = function(object, klass) {
	assertType(klass, "function", "Invalid 'instanceOf' operand.");
	if ($instanceOf(object, klass)) return true;
	// handle exceptions where the target object originates from another frame
	//  this is handy for JSON parsing (amongst other things)
	if (object != null) switch (klass) {
		case Object:
			return true;
		case Number:
		case Boolean:
		case Function:
		case String:
			return typeof object == typeof klass.prototype.valueOf();
		case Array:
			// this is the only troublesome one
			return object.join && object.splice && !arguments.callee(object, Function);
		case Date:
			return !!object.getTimezoneOffset;
		case RegExp:
			return String(object.constructor.prototype) == String(new RegExp);
	}
	return false;
};
	
var match = function(string, expression) {
	// same as String.match() except that this function will return an empty 
	// array if there is no match
	return String(string).match(expression) || [];
};

var RESCAPE = /([\/()[\]{}|*+-.,^$?\\])/g;
var rescape = function(string) {
	// make a string safe for creating a RegExp
	return String(string).replace(RESCAPE, "\\$1");
};

var slice = function(object) {
	// slice a string or array-like object
	var slice = (typeof object == "string" ? String : Array).prototype.slice;
	return slice.apply(object, slice.call(arguments, 1));
};

var TRIM = /^\s+|\s+$/g;
var trim = function(string) {
	return String(string).replace(TRIM, "");	
};

// ========================================================================
// /extend.js
// ========================================================================

var base = function(object, args) {
	// invoke the base method with all supplied arguments
	return object.base.apply(object, args);
};

var extend = function(object) {
	assert(object != Object.prototype, "Object.prototype is verboten!");
	return Base.prototype.extend.apply(object, slice(arguments, 1));
};

// ========================================================================
// /assignID.js
// ========================================================================

var $ID = 1;
var assignID = function(object) {
	// assign a unique id
	if (!object.base2ID) object.base2ID = "base2_" + $ID++;
	return object.base2ID;
};

// ========================================================================
// /forEach.js
// ========================================================================

if (typeof StopIteration == "undefined") {
	StopIteration = new Error("StopIteration");
}

var forEach = function(object, block, context) {
	if (object == null) return;
	if (typeof object == "function") {
		// functions are a special case
		var fn = Function;
	} else if (typeof object.forEach == "function" && object.forEach != arguments.callee) {
		// the object implements a custom forEach method
		object.forEach(block, context);
		return;
	} else if (typeof object.length == "number") {
		// the object is array-like
		forEach.Array(object, block, context);
		return;
	}
	forEach.Function(fn || Object, object, block, context);
};

// these are the two core enumeration methods. all other forEach methods
//  eventually call one of these two.

forEach.Array = function(array, block, context) {
	try {
		var i, length = array.length; // preserve
		if (typeof array == "string") {
			for (i = 0; i < length; i++) {
				block.call(context, array.charAt(i), i, array);
			}
		} else {
			for (i = 0; i < length; i++) {
				block.call(context, array[i], i, array);
			}
		}
	} catch (error) {
		if (error != StopIteration) throw error;
	}
};

forEach.Function = function(fn, object, block, context) {
	// enumerate object and compare its keys with fn's prototype
	try {
		for (var key in object) {
			if (fn.prototype[key] === undefined) {
				block.call(context, object[key], key, object);
			}
		}
	} catch (error) {
		if (error != StopIteration) throw error;
	}
};

// ========================================================================
// base2/Base/forEach.js
// ========================================================================

Base.forEach = function(object, block, context) {
	forEach.Function(this, object, block, context);
};

// ========================================================================
// base2/../IEnumerable.js
// ========================================================================

var IEnumerable = {
	every: function(object, test, context) {
		var result = true;
		this.forEach (object, function(value, key) {
			result = test.call(context, value, key, object);
			if (!result) throw StopIteration;
		});
		return !!result; // cast to boolean
	},
	
	filter: function(object, test, context) {
		return this.reduce(object, new JS.Array, function(result, value, key) {
			if (test.call(context, value, key, object)) {
				result[result.length] = value;
			}
			return result;
		});
	},

	invoke: function(object, method) {
		// apply a method to each item in the enumerated object
		var args = slice(arguments, 2);
		return this.map(object, (typeof method == "function") ? function(item) {
			if (item != null) return method.apply(item, args);
		} : function(item) {
			if (item != null) return item[method].apply(item, args);
		});
	},
	
	map: function(object, block, context) {
		var result = new JS.Array;
		this.forEach (object, function(value, key) {
			result[result.length] = block.call(context, value, key, object);
		});
		return result;
	},
	
	pluck: function(object, key) {
		return this.map(object, function(item) {
			if (item != null) return item[key];
		});
	},
	
	reduce: function(object, result, block, context) {
		this.forEach (object, function(value, key) {
			result = block.call(context, result, value, key, object);
		});
		return result;
	},
	
	some: function(object, test, context) {
		return !this.every(object, function(value, key) {
			return !test.call(context, value, key, object);
		});
	}
};

// ========================================================================
// base2/../String.js
// ========================================================================

// fix String.replace (Safari/IE5.0)

var $fixString = function(klass) {
	if (new klass().replace(/^/, K)) {
		extend(klass.prototype, "replace", function(expression, replacement) {
			if (typeof replacement == "function") { // Safari doesn't like functions
				if (instanceOf(expression, RegExp)) {
					var regexp = expression;
					var global = regexp.global;
					if (global == null) global = /(g|gi)$/.test(regexp);
					// we have to convert global RexpExps for exec() to work consistently
					if (global) regexp = new RegExp(regexp.source); // non-global
				} else {
					regexp = new RegExp(rescape(expression));
				}
				var match, string = this, result = "";
				while (string && (match = regexp.exec(string))) {
					result += string.slice(0, match.index) + replacement.apply(this, match);
					string = string.slice(match.index + match[0].length);
					if (!global) break;
				}
				return result + string;
			} else {
				return base(this, arguments);
			}
		});
	}
};

$fixString(String);

// ========================================================================
// base2/Abstract.js
// ========================================================================

var Abstract = Base.extend({
	constructor: function() {
		throw new TypeError("Class cannot be instantiated.");
	}
});

// ========================================================================
// base2/Module.js
// ========================================================================

// based on ruby's Module class and Mozilla's Array generics:
//   http://www.ruby-doc.org/core/classes/Module.html
//   http://developer.mozilla.org/en/docs/New_in_JavaScript_1.6#Array_and_String_generics

// A Module is used as the basis for creating interfaces that can be
// applied to other classes. *All* properties and methods are static.
// When a module is used as a mixin, methods defined on what would normally be
// the instance interface become instance methods of the target object.

// Modules cannot be instantiated. Static properties and methods are inherited.

var Module = Abstract.extend(null, {
	extend: function(_interface, _static) {
		// extend a module to create a new module
		var module = this.base();
		// inherit static methods
		forEach (this, function(property, name) {
			if (!Module[name] && name != "init") {
				extend(module, name, property);
			}
		});
		// implement module (instance AND static) methods
		module.implement(_interface);
		// implement static properties and methods
		extend(module, _static);
		// Make the submarine noises Larry!
		if (typeof module.init == "function") module.init();
		return module;
	},
	
	implement: function(_interface) {
		// implement an interface on BOTH the instance and static interfaces
		var module = this;
		if (typeof _interface == "function") {
			module.base(_interface);
			forEach (_interface, function(property, name) {
				if (!Module[name]) extend(module, name, property);
			});
		} else {
			// create the instance interface
			forEach (extend({}, _interface), function(property, name) {
				// instance methods call the equivalent static method
				if (typeof property == "function") {
					property = function() {
						var base; // force inheritance
						return module[name].apply(module, [this].concat(slice(arguments)));
					};
				}
				if (!Module[name]) extend(this, name, property);
			}, module.prototype);
			// add the static interface
			extend(module, _interface);
		}
		return module;
	}
});


// ========================================================================
// base2/Enumerable.js
// ========================================================================

var Enumerable = Module.extend(IEnumerable, {
	forEach: forEach
});

// ========================================================================
// base2/RegGrp.js
// ========================================================================

var RegGrp = Base.extend({
	constructor: function(values, flags) {
		this.keys = new JS.Array;
		this.values = {};
		this.merge(this.constructor.seed, values);
	},

	global: true, // global is the default setting
	ignoreCase: false,
	keys: null,
	values: null,

	exec: function(string, replacement) {
		if (arguments.length == 1) {
			var self = this;
			replacement = function(match) {
				if (!match) return "";
				var offset = 1, i = 0;
				// loop through the values
				while (match = self.item(i++)) {
					// do we have a result?
					if (arguments[offset]) {
						var replacement = match.replacement;
						switch (typeof replacement) {
							case "function":
								return replacement.apply(null, slice(arguments, offset));
							case "number":
								return arguments[offset + replacement];
							default:
								return replacement;
						}
					// no? then skip over references to sub-expressions
					} else offset += match.length + 1;
				}
			};
		}
		var flags = (this.global ? "g" : "") + (this.ignoreCase ? "i" : "");
		return String(string).replace(new RegExp(this, flags), replacement);
	},

	item: function(index) {
		return this.values["#" + this.keys[index]];
	},
	
	merge: function(values) {
		forEach (arguments, function(values, index) {
			forEach (values, function(replacement, expression) {
				if (!this.values["#" + expression]) this.keys.push(String(expression));
				this.values["#" + expression] = new RegGrp.Item(expression, replacement);
			}, this);
		}, this);
	},

	test: function(string) {
		return this.exec(string) != string;
	},
	
	toString: function() {
		return "(" + this.keys.join(")|(") + ")";
	}
}, {
	IGNORE: "$0"
});

// ========================================================================
// base2/RegGrp/Item.js
// ========================================================================

RegGrp.Item = Base.extend({
	constructor: function(expression, replacement) {
		var ESCAPE = /\\./g, STRING = /(['"])\1\+(.*)\+\1\1$/;
	
		expression = instanceOf(expression, RegExp) ? expression.source : String(expression);
		
		if (/\\(\d+)/.test(expression)) throw new Error("Back references not supported (yet).");
		
		if (typeof replacement == "number") replacement = String(replacement);
		else if (replacement == null) replacement = "";
		
		// count the number of sub-expressions
		//  - add one because each pattern is itself a sub-expression
		this.length = match(expression.replace(ESCAPE, ""), /\(/g).length;
		
		// does the pattern use sub-expressions?
		if (typeof replacement == "string" &&/\$(\d+)/.test(replacement)) {
			// a simple lookup? (e.g. "$2")
			if (/^\$\d+$/.test(replacement)) {
				// store the index (used for fast retrieval of matched strings)
				replacement = parseInt(replacement.slice(1));
			} else { // a complicated lookup (e.g. "Hello $2 $1")
				// build a function to do the lookup
				var i = this.length + 1;
				var Q = /'/.test(replacement.replace(ESCAPE, "")) ? '"' : "'";
				replacement = replacement.replace(/\$(\d+)/g, Q + "+arguments[$1]+" + Q);
				replacement = new Function("return " + Q + replacement.replace(STRING, "$1") + Q);
			}
		}
		this.replacement = replacement;
		this.toString = function() {
			return expression || "";
		};
	},
	
	length: 0,
	replacement: ""
});

// ========================================================================
// base2/Namespace.js
// ========================================================================

var Namespace = Base.extend({
	constructor: function(_private, _public) {
		this.base(_public);
		this.toString = function() {
			return format("[base2.%1]", this.name);
		};
		
		// initialise
		if (typeof this.init == "function") this.init();
		
		if (this.name != "base2") {
			this.namespace = format("var %1=base2.%1;", this.name);
		}
		
		var namespace = "var base=" + base + ";";
		var imports = ("base2,lang," + this.imports).split(",");
		_private.imports = Enumerable.reduce(imports, namespace, function(namespace, name) {
			if (base2[name]) namespace += base2[name].namespace;
			return namespace;
		});
		
		var namespace = format("base2.%1=%1;", this.name);
		var exports = this.exports.split(",");
		_private.exports = Enumerable.reduce(exports, namespace, function(namespace, name) {
			if (name) {
				this.namespace += format("var %2=%1.%2;", this.name, name);
				namespace += format("if(!%1.%2)%1.%2=%2;base2.%2=%1.%2;", this.name, name);
			}
			return namespace;
		}, this);
	},

	exports: "",
	imports: "",
	namespace: "",
	name: ""
});

base2 = new Namespace(this, {
	exports: "Base,Abstract,Module,Enumerable,RegGrp,Namespace",
	name: "base2",
	version: "0.6 (alpha)"
});

base2.toString = function() {
	return "[base2]";
};

eval(this.exports);

// ========================================================================
// base2/lang/namespace.js
// ========================================================================

var lang = new Namespace(this, {
	exports: "K,assert,assertType,assignID,instanceOf,extend,format,forEach,match,rescape,slice,trim",
	name: "lang",
	
	init: function() {
		this.extend = extend;
		// add the Enumerable methods to the lang object
		forEach (Enumerable.prototype, function(method, name) {
			if (!Module[name]) {
				this[name] = function() {
					return Enumerable[name].apply(Enumerable, arguments);
				};
				this.exports += "," + name;
			}
		}, this);
	}
});

eval(this.exports);

base2.namespace += lang.namespace;

}; ////////////////////  END: CLOSURE  ////////////////////////////////////
