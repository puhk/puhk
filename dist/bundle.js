(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("lodash"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "lodash"], factory);
	else if(typeof exports === 'object')
		exports["nojball-game-ui"] = factory(require("react"), require("lodash"));
	else
		root["nojball-game-ui"] = factory(root["React"], root["_"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_33__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 34);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory(__webpack_require__(33));
	else if(typeof define === 'function' && define.amd)
		define("nojball-game", ["lodash"], factory);
	else if(typeof exports === 'object')
		exports["nojball-game"] = factory(require("lodash"));
	else
		root["nojball-game"] = factory(root["_"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_62__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 138);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class Event {

    constructor(sender) {
        this.data = null;

        this.sender = sender;
    }

    apply(state, game) {}

    pack() {
        return {
            eventType: this.type,
            frame: this.frame,
            sender: this.sender,
            data: this.getData()
        };
    }

    getData() {
        return this.data;
    }

    toMessage() {
        return {
            type: 'event',
            event: this.pack()
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Event;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(54)('wks')
  , uid        = __webpack_require__(34)
  , Symbol     = __webpack_require__(2).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(13)
  , IE8_DOM_DEFINE = __webpack_require__(106)
  , toPrimitive    = __webpack_require__(122)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

exports = module.exports = Victor;

/**
 * # Victor - A JavaScript 2D vector class with methods for common vector operations
 */

/**
 * Constructor. Will also work without the `new` keyword
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = Victor(42, 1337);
 *
 * @param {Number} x Value of the x axis
 * @param {Number} y Value of the y axis
 * @return {Victor}
 * @api public
 */
function Victor (x, y) {
	if (!(this instanceof Victor)) {
		return new Victor(x, y);
	}

	/**
	 * The X axis
	 *
	 * ### Examples:
	 *     var vec = new Victor.fromArray(42, 21);
	 *
	 *     vec.x;
	 *     // => 42
	 *
	 * @api public
	 */
	this.x = x || 0;

	/**
	 * The Y axis
	 *
	 * ### Examples:
	 *     var vec = new Victor.fromArray(42, 21);
	 *
	 *     vec.y;
	 *     // => 21
	 *
	 * @api public
	 */
	this.y = y || 0;
};

/**
 * # Static
 */

/**
 * Creates a new instance from an array
 *
 * ### Examples:
 *     var vec = Victor.fromArray([42, 21]);
 *
 *     vec.toString();
 *     // => x:42, y:21
 *
 * @name Victor.fromArray
 * @param {Array} array Array with the x and y values at index 0 and 1 respectively
 * @return {Victor} The new instance
 * @api public
 */
Victor.fromArray = function (arr) {
	return new Victor(arr[0] || 0, arr[1] || 0);
};

/**
 * Creates a new instance from an object
 *
 * ### Examples:
 *     var vec = Victor.fromObject({ x: 42, y: 21 });
 *
 *     vec.toString();
 *     // => x:42, y:21
 *
 * @name Victor.fromObject
 * @param {Object} obj Object with the values for x and y
 * @return {Victor} The new instance
 * @api public
 */
Victor.fromObject = function (obj) {
	return new Victor(obj.x || 0, obj.y || 0);
};

/**
 * # Manipulation
 *
 * These functions are chainable.
 */

/**
 * Adds another vector's X axis to this one
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = new Victor(20, 30);
 *
 *     vec1.addX(vec2);
 *     vec1.toString();
 *     // => x:30, y:10
 *
 * @param {Victor} vector The other vector you want to add to this one
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.addX = function (vec) {
	this.x += vec.x;
	return this;
};

/**
 * Adds another vector's Y axis to this one
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = new Victor(20, 30);
 *
 *     vec1.addY(vec2);
 *     vec1.toString();
 *     // => x:10, y:40
 *
 * @param {Victor} vector The other vector you want to add to this one
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.addY = function (vec) {
	this.y += vec.y;
	return this;
};

/**
 * Adds another vector to this one
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = new Victor(20, 30);
 *
 *     vec1.add(vec2);
 *     vec1.toString();
 *     // => x:30, y:40
 *
 * @param {Victor} vector The other vector you want to add to this one
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.add = function (vec) {
	this.x += vec.x;
	this.y += vec.y;
	return this;
};

/**
 * Adds the given scalar to both vector axis
 *
 * ### Examples:
 *     var vec = new Victor(1, 2);
 *
 *     vec.addScalar(2);
 *     vec.toString();
 *     // => x: 3, y: 4
 *
 * @param {Number} scalar The scalar to add
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.addScalar = function (scalar) {
	this.x += scalar;
	this.y += scalar;
	return this;
};

/**
 * Adds the given scalar to the X axis
 *
 * ### Examples:
 *     var vec = new Victor(1, 2);
 *
 *     vec.addScalarX(2);
 *     vec.toString();
 *     // => x: 3, y: 2
 *
 * @param {Number} scalar The scalar to add
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.addScalarX = function (scalar) {
	this.x += scalar;
	return this;
};

/**
 * Adds the given scalar to the Y axis
 *
 * ### Examples:
 *     var vec = new Victor(1, 2);
 *
 *     vec.addScalarY(2);
 *     vec.toString();
 *     // => x: 1, y: 4
 *
 * @param {Number} scalar The scalar to add
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.addScalarY = function (scalar) {
	this.y += scalar;
	return this;
};

/**
 * Subtracts the X axis of another vector from this one
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(20, 30);
 *
 *     vec1.subtractX(vec2);
 *     vec1.toString();
 *     // => x:80, y:50
 *
 * @param {Victor} vector The other vector you want subtract from this one
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.subtractX = function (vec) {
	this.x -= vec.x;
	return this;
};

/**
 * Subtracts the Y axis of another vector from this one
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(20, 30);
 *
 *     vec1.subtractY(vec2);
 *     vec1.toString();
 *     // => x:100, y:20
 *
 * @param {Victor} vector The other vector you want subtract from this one
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.subtractY = function (vec) {
	this.y -= vec.y;
	return this;
};

/**
 * Subtracts another vector from this one
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(20, 30);
 *
 *     vec1.subtract(vec2);
 *     vec1.toString();
 *     // => x:80, y:20
 *
 * @param {Victor} vector The other vector you want subtract from this one
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.subtract = function (vec) {
	this.x -= vec.x;
	this.y -= vec.y;
	return this;
};

/**
 * Subtracts the given scalar from both axis
 *
 * ### Examples:
 *     var vec = new Victor(100, 200);
 *
 *     vec.subtractScalar(20);
 *     vec.toString();
 *     // => x: 80, y: 180
 *
 * @param {Number} scalar The scalar to subtract
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.subtractScalar = function (scalar) {
	this.x -= scalar;
	this.y -= scalar;
	return this;
};

/**
 * Subtracts the given scalar from the X axis
 *
 * ### Examples:
 *     var vec = new Victor(100, 200);
 *
 *     vec.subtractScalarX(20);
 *     vec.toString();
 *     // => x: 80, y: 200
 *
 * @param {Number} scalar The scalar to subtract
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.subtractScalarX = function (scalar) {
	this.x -= scalar;
	return this;
};

/**
 * Subtracts the given scalar from the Y axis
 *
 * ### Examples:
 *     var vec = new Victor(100, 200);
 *
 *     vec.subtractScalarY(20);
 *     vec.toString();
 *     // => x: 100, y: 180
 *
 * @param {Number} scalar The scalar to subtract
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.subtractScalarY = function (scalar) {
	this.y -= scalar;
	return this;
};

/**
 * Divides the X axis by the x component of given vector
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *     var vec2 = new Victor(2, 0);
 *
 *     vec.divideX(vec2);
 *     vec.toString();
 *     // => x:50, y:50
 *
 * @param {Victor} vector The other vector you want divide by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.divideX = function (vector) {
	this.x /= vector.x;
	return this;
};

/**
 * Divides the Y axis by the y component of given vector
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *     var vec2 = new Victor(0, 2);
 *
 *     vec.divideY(vec2);
 *     vec.toString();
 *     // => x:100, y:25
 *
 * @param {Victor} vector The other vector you want divide by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.divideY = function (vector) {
	this.y /= vector.y;
	return this;
};

/**
 * Divides both vector axis by a axis values of given vector
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *     var vec2 = new Victor(2, 2);
 *
 *     vec.divide(vec2);
 *     vec.toString();
 *     // => x:50, y:25
 *
 * @param {Victor} vector The vector to divide by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.divide = function (vector) {
	this.x /= vector.x;
	this.y /= vector.y;
	return this;
};

/**
 * Divides both vector axis by the given scalar value
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.divideScalar(2);
 *     vec.toString();
 *     // => x:50, y:25
 *
 * @param {Number} The scalar to divide by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.divideScalar = function (scalar) {
	if (scalar !== 0) {
		this.x /= scalar;
		this.y /= scalar;
	} else {
		this.x = 0;
		this.y = 0;
	}

	return this;
};

/**
 * Divides the X axis by the given scalar value
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.divideScalarX(2);
 *     vec.toString();
 *     // => x:50, y:50
 *
 * @param {Number} The scalar to divide by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.divideScalarX = function (scalar) {
	if (scalar !== 0) {
		this.x /= scalar;
	} else {
		this.x = 0;
	}
	return this;
};

/**
 * Divides the Y axis by the given scalar value
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.divideScalarY(2);
 *     vec.toString();
 *     // => x:100, y:25
 *
 * @param {Number} The scalar to divide by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.divideScalarY = function (scalar) {
	if (scalar !== 0) {
		this.y /= scalar;
	} else {
		this.y = 0;
	}
	return this;
};

/**
 * Inverts the X axis
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.invertX();
 *     vec.toString();
 *     // => x:-100, y:50
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.invertX = function () {
	this.x *= -1;
	return this;
};

/**
 * Inverts the Y axis
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.invertY();
 *     vec.toString();
 *     // => x:100, y:-50
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.invertY = function () {
	this.y *= -1;
	return this;
};

/**
 * Inverts both axis
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.invert();
 *     vec.toString();
 *     // => x:-100, y:-50
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.invert = function () {
	this.invertX();
	this.invertY();
	return this;
};

/**
 * Multiplies the X axis by X component of given vector
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *     var vec2 = new Victor(2, 0);
 *
 *     vec.multiplyX(vec2);
 *     vec.toString();
 *     // => x:200, y:50
 *
 * @param {Victor} vector The vector to multiply the axis with
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.multiplyX = function (vector) {
	this.x *= vector.x;
	return this;
};

/**
 * Multiplies the Y axis by Y component of given vector
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *     var vec2 = new Victor(0, 2);
 *
 *     vec.multiplyX(vec2);
 *     vec.toString();
 *     // => x:100, y:100
 *
 * @param {Victor} vector The vector to multiply the axis with
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.multiplyY = function (vector) {
	this.y *= vector.y;
	return this;
};

/**
 * Multiplies both vector axis by values from a given vector
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *     var vec2 = new Victor(2, 2);
 *
 *     vec.multiply(vec2);
 *     vec.toString();
 *     // => x:200, y:100
 *
 * @param {Victor} vector The vector to multiply by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.multiply = function (vector) {
	this.x *= vector.x;
	this.y *= vector.y;
	return this;
};

/**
 * Multiplies both vector axis by the given scalar value
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.multiplyScalar(2);
 *     vec.toString();
 *     // => x:200, y:100
 *
 * @param {Number} The scalar to multiply by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.multiplyScalar = function (scalar) {
	this.x *= scalar;
	this.y *= scalar;
	return this;
};

/**
 * Multiplies the X axis by the given scalar
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.multiplyScalarX(2);
 *     vec.toString();
 *     // => x:200, y:50
 *
 * @param {Number} The scalar to multiply the axis with
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.multiplyScalarX = function (scalar) {
	this.x *= scalar;
	return this;
};

/**
 * Multiplies the Y axis by the given scalar
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.multiplyScalarY(2);
 *     vec.toString();
 *     // => x:100, y:100
 *
 * @param {Number} The scalar to multiply the axis with
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.multiplyScalarY = function (scalar) {
	this.y *= scalar;
	return this;
};

/**
 * Normalize
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.normalize = function () {
	var length = this.length();

	if (length === 0) {
		this.x = 1;
		this.y = 0;
	} else {
		this.divide(Victor(length, length));
	}
	return this;
};

Victor.prototype.norm = Victor.prototype.normalize;

/**
 * If the absolute vector axis is greater than `max`, multiplies the axis by `factor`
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.limit(80, 0.9);
 *     vec.toString();
 *     // => x:90, y:50
 *
 * @param {Number} max The maximum value for both x and y axis
 * @param {Number} factor Factor by which the axis are to be multiplied with
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.limit = function (max, factor) {
	if (Math.abs(this.x) > max){ this.x *= factor; }
	if (Math.abs(this.y) > max){ this.y *= factor; }
	return this;
};

/**
 * Randomizes both vector axis with a value between 2 vectors
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.randomize(new Victor(50, 60), new Victor(70, 80`));
 *     vec.toString();
 *     // => x:67, y:73
 *
 * @param {Victor} topLeft first vector
 * @param {Victor} bottomRight second vector
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.randomize = function (topLeft, bottomRight) {
	this.randomizeX(topLeft, bottomRight);
	this.randomizeY(topLeft, bottomRight);

	return this;
};

/**
 * Randomizes the y axis with a value between 2 vectors
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.randomizeX(new Victor(50, 60), new Victor(70, 80`));
 *     vec.toString();
 *     // => x:55, y:50
 *
 * @param {Victor} topLeft first vector
 * @param {Victor} bottomRight second vector
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.randomizeX = function (topLeft, bottomRight) {
	var min = Math.min(topLeft.x, bottomRight.x);
	var max = Math.max(topLeft.x, bottomRight.x);
	this.x = random(min, max);
	return this;
};

/**
 * Randomizes the y axis with a value between 2 vectors
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.randomizeY(new Victor(50, 60), new Victor(70, 80`));
 *     vec.toString();
 *     // => x:100, y:66
 *
 * @param {Victor} topLeft first vector
 * @param {Victor} bottomRight second vector
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.randomizeY = function (topLeft, bottomRight) {
	var min = Math.min(topLeft.y, bottomRight.y);
	var max = Math.max(topLeft.y, bottomRight.y);
	this.y = random(min, max);
	return this;
};

/**
 * Randomly randomizes either axis between 2 vectors
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.randomizeAny(new Victor(50, 60), new Victor(70, 80));
 *     vec.toString();
 *     // => x:100, y:77
 *
 * @param {Victor} topLeft first vector
 * @param {Victor} bottomRight second vector
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.randomizeAny = function (topLeft, bottomRight) {
	if (!! Math.round(Math.random())) {
		this.randomizeX(topLeft, bottomRight);
	} else {
		this.randomizeY(topLeft, bottomRight);
	}
	return this;
};

/**
 * Rounds both axis to an integer value
 *
 * ### Examples:
 *     var vec = new Victor(100.2, 50.9);
 *
 *     vec.unfloat();
 *     vec.toString();
 *     // => x:100, y:51
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.unfloat = function () {
	this.x = Math.round(this.x);
	this.y = Math.round(this.y);
	return this;
};

/**
 * Rounds both axis to a certain precision
 *
 * ### Examples:
 *     var vec = new Victor(100.2, 50.9);
 *
 *     vec.unfloat();
 *     vec.toString();
 *     // => x:100, y:51
 *
 * @param {Number} Precision (default: 8)
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.toFixed = function (precision) {
	if (typeof precision === 'undefined') { precision = 8; }
	this.x = this.x.toFixed(precision);
	this.y = this.y.toFixed(precision);
	return this;
};

/**
 * Performs a linear blend / interpolation of the X axis towards another vector
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 100);
 *     var vec2 = new Victor(200, 200);
 *
 *     vec1.mixX(vec2, 0.5);
 *     vec.toString();
 *     // => x:150, y:100
 *
 * @param {Victor} vector The other vector
 * @param {Number} amount The blend amount (optional, default: 0.5)
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.mixX = function (vec, amount) {
	if (typeof amount === 'undefined') {
		amount = 0.5;
	}

	this.x = (1 - amount) * this.x + amount * vec.x;
	return this;
};

/**
 * Performs a linear blend / interpolation of the Y axis towards another vector
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 100);
 *     var vec2 = new Victor(200, 200);
 *
 *     vec1.mixY(vec2, 0.5);
 *     vec.toString();
 *     // => x:100, y:150
 *
 * @param {Victor} vector The other vector
 * @param {Number} amount The blend amount (optional, default: 0.5)
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.mixY = function (vec, amount) {
	if (typeof amount === 'undefined') {
		amount = 0.5;
	}

	this.y = (1 - amount) * this.y + amount * vec.y;
	return this;
};

/**
 * Performs a linear blend / interpolation towards another vector
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 100);
 *     var vec2 = new Victor(200, 200);
 *
 *     vec1.mix(vec2, 0.5);
 *     vec.toString();
 *     // => x:150, y:150
 *
 * @param {Victor} vector The other vector
 * @param {Number} amount The blend amount (optional, default: 0.5)
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.mix = function (vec, amount) {
	this.mixX(vec, amount);
	this.mixY(vec, amount);
	return this;
};

/**
 * # Products
 */

/**
 * Creates a clone of this vector
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = vec1.clone();
 *
 *     vec2.toString();
 *     // => x:10, y:10
 *
 * @return {Victor} A clone of the vector
 * @api public
 */
Victor.prototype.clone = function () {
	return new Victor(this.x, this.y);
};

/**
 * Copies another vector's X component in to its own
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = new Victor(20, 20);
 *     var vec2 = vec1.copyX(vec1);
 *
 *     vec2.toString();
 *     // => x:20, y:10
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.copyX = function (vec) {
	this.x = vec.x;
	return this;
};

/**
 * Copies another vector's Y component in to its own
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = new Victor(20, 20);
 *     var vec2 = vec1.copyY(vec1);
 *
 *     vec2.toString();
 *     // => x:10, y:20
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.copyY = function (vec) {
	this.y = vec.y;
	return this;
};

/**
 * Copies another vector's X and Y components in to its own
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = new Victor(20, 20);
 *     var vec2 = vec1.copy(vec1);
 *
 *     vec2.toString();
 *     // => x:20, y:20
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.copy = function (vec) {
	this.copyX(vec);
	this.copyY(vec);
	return this;
};

/**
 * Sets the vector to zero (0,0)
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *		 var1.zero();
 *     vec1.toString();
 *     // => x:0, y:0
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.zero = function () {
	this.x = this.y = 0;
	return this;
};

/**
 * Calculates the dot product of this vector and another
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.dot(vec2);
 *     // => 23000
 *
 * @param {Victor} vector The second vector
 * @return {Number} Dot product
 * @api public
 */
Victor.prototype.dot = function (vec2) {
	return this.x * vec2.x + this.y * vec2.y;
};

Victor.prototype.cross = function (vec2) {
	return (this.x * vec2.y ) - (this.y * vec2.x );
};

/**
 * Projects a vector onto another vector, setting itself to the result.
 *
 * ### Examples:
 *     var vec = new Victor(100, 0);
 *     var vec2 = new Victor(100, 100);
 *
 *     vec.projectOnto(vec2);
 *     vec.toString();
 *     // => x:50, y:50
 *
 * @param {Victor} vector The other vector you want to project this vector onto
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.projectOnto = function (vec2) {
    var coeff = ( (this.x * vec2.x)+(this.y * vec2.y) ) / ((vec2.x*vec2.x)+(vec2.y*vec2.y));
    this.x = coeff * vec2.x;
    this.y = coeff * vec2.y;
    return this;
};


Victor.prototype.horizontalAngle = function () {
	return Math.atan2(this.y, this.x);
};

Victor.prototype.horizontalAngleDeg = function () {
	return radian2degrees(this.horizontalAngle());
};

Victor.prototype.verticalAngle = function () {
	return Math.atan2(this.x, this.y);
};

Victor.prototype.verticalAngleDeg = function () {
	return radian2degrees(this.verticalAngle());
};

Victor.prototype.angle = Victor.prototype.horizontalAngle;
Victor.prototype.angleDeg = Victor.prototype.horizontalAngleDeg;
Victor.prototype.direction = Victor.prototype.horizontalAngle;

Victor.prototype.rotate = function (angle) {
	var nx = (this.x * Math.cos(angle)) - (this.y * Math.sin(angle));
	var ny = (this.x * Math.sin(angle)) + (this.y * Math.cos(angle));

	this.x = nx;
	this.y = ny;

	return this;
};

Victor.prototype.rotateDeg = function (angle) {
	angle = degrees2radian(angle);
	return this.rotate(angle);
};

Victor.prototype.rotateTo = function(rotation) {
	return this.rotate(rotation-this.angle());
};

Victor.prototype.rotateToDeg = function(rotation) {
	rotation = degrees2radian(rotation);
	return this.rotateTo(rotation);
};

Victor.prototype.rotateBy = function (rotation) {
	var angle = this.angle() + rotation;

	return this.rotate(angle);
};

Victor.prototype.rotateByDeg = function (rotation) {
	rotation = degrees2radian(rotation);
	return this.rotateBy(rotation);
};

/**
 * Calculates the distance of the X axis between this vector and another
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.distanceX(vec2);
 *     // => -100
 *
 * @param {Victor} vector The second vector
 * @return {Number} Distance
 * @api public
 */
Victor.prototype.distanceX = function (vec) {
	return this.x - vec.x;
};

/**
 * Same as `distanceX()` but always returns an absolute number
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.absDistanceX(vec2);
 *     // => 100
 *
 * @param {Victor} vector The second vector
 * @return {Number} Absolute distance
 * @api public
 */
Victor.prototype.absDistanceX = function (vec) {
	return Math.abs(this.distanceX(vec));
};

/**
 * Calculates the distance of the Y axis between this vector and another
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.distanceY(vec2);
 *     // => -10
 *
 * @param {Victor} vector The second vector
 * @return {Number} Distance
 * @api public
 */
Victor.prototype.distanceY = function (vec) {
	return this.y - vec.y;
};

/**
 * Same as `distanceY()` but always returns an absolute number
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.distanceY(vec2);
 *     // => 10
 *
 * @param {Victor} vector The second vector
 * @return {Number} Absolute distance
 * @api public
 */
Victor.prototype.absDistanceY = function (vec) {
	return Math.abs(this.distanceY(vec));
};

/**
 * Calculates the euclidean distance between this vector and another
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.distance(vec2);
 *     // => 100.4987562112089
 *
 * @param {Victor} vector The second vector
 * @return {Number} Distance
 * @api public
 */
Victor.prototype.distance = function (vec) {
	return Math.sqrt(this.distanceSq(vec));
};

/**
 * Calculates the squared euclidean distance between this vector and another
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.distanceSq(vec2);
 *     // => 10100
 *
 * @param {Victor} vector The second vector
 * @return {Number} Distance
 * @api public
 */
Victor.prototype.distanceSq = function (vec) {
	var dx = this.distanceX(vec),
		dy = this.distanceY(vec);

	return dx * dx + dy * dy;
};

/**
 * Calculates the length or magnitude of the vector
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.length();
 *     // => 111.80339887498948
 *
 * @return {Number} Length / Magnitude
 * @api public
 */
Victor.prototype.length = function () {
	return Math.sqrt(this.lengthSq());
};

/**
 * Squared length / magnitude
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.lengthSq();
 *     // => 12500
 *
 * @return {Number} Length / Magnitude
 * @api public
 */
Victor.prototype.lengthSq = function () {
	return this.x * this.x + this.y * this.y;
};

Victor.prototype.magnitude = Victor.prototype.length;

/**
 * Returns a true if vector is (0, 0)
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *     vec.zero();
 *
 *     // => true
 *
 * @return {Boolean}
 * @api public
 */
Victor.prototype.isZero = function() {
	return this.x === 0 && this.y === 0;
};

/**
 * Returns a true if this vector is the same as another
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(100, 50);
 *     vec1.isEqualTo(vec2);
 *
 *     // => true
 *
 * @return {Boolean}
 * @api public
 */
Victor.prototype.isEqualTo = function(vec2) {
	return this.x === vec2.x && this.y === vec2.y;
};

/**
 * # Utility Methods
 */

/**
 * Returns an string representation of the vector
 *
 * ### Examples:
 *     var vec = new Victor(10, 20);
 *
 *     vec.toString();
 *     // => x:10, y:20
 *
 * @return {String}
 * @api public
 */
Victor.prototype.toString = function () {
	return 'x:' + this.x + ', y:' + this.y;
};

/**
 * Returns an array representation of the vector
 *
 * ### Examples:
 *     var vec = new Victor(10, 20);
 *
 *     vec.toArray();
 *     // => [10, 20]
 *
 * @return {Array}
 * @api public
 */
Victor.prototype.toArray = function () {
	return [ this.x, this.y ];
};

/**
 * Returns an object representation of the vector
 *
 * ### Examples:
 *     var vec = new Victor(10, 20);
 *
 *     vec.toObject();
 *     // => { x: 10, y: 20 }
 *
 * @return {Object}
 * @api public
 */
Victor.prototype.toObject = function () {
	return { x: this.x, y: this.y };
};


var degrees = 180 / Math.PI;

function random (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function radian2degrees (rad) {
	return rad * degrees;
}

function degrees2radian (deg) {
	return deg / degrees;
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(15)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(3)
  , createDesc = __webpack_require__(29);
module.exports = __webpack_require__(6) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(2)
  , core      = __webpack_require__(5)
  , ctx       = __webpack_require__(14)
  , hide      = __webpack_require__(7)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_victor__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_victor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_victor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Base__ = __webpack_require__(70);



class Disc extends __WEBPACK_IMPORTED_MODULE_1__Base__["a" /* default */] {

    constructor(position, radius = 10, { id = -1, color = '#fff', damping = 0.96, invMass = 1 } = {}) {
        super(position);

        this.id = 0;
        this.bounce = 0.5;
        this.damping = 0.96;
        this.kickStrength = 5;
        this.kicking = false;
        this.invMass = 0.5;
        this.isMe = false;
        this.isBall = false;
        this.text = '';
        this.id = id !== -1 ? id : Disc.nextDiscId++;
        this.velocity = new __WEBPACK_IMPORTED_MODULE_0_victor___default.a(0, 0);
        this.radius = radius;
        this.color = color;
        this.damping = damping;
        this.invMass = invMass;
    }

    get mass() {
        return 1 / this.invMass;
    }

    clone() {
        let clone = new Disc(this.position.clone(), this.radius, {
            id: this.id,
            color: this.color,
            damping: this.damping,
            invMass: this.invMass
        });

        clone.id = this.id;
        clone.velocity = this.velocity.clone();
        clone.isMe = this.isMe;
        clone.isBall = this.isBall;
        clone.text = this.text;

        return clone;
    }

    pack() {
        return {
            id: this.id,
            pos: this.position.toArray(),
            velocity: this.velocity.toArray(),
            radius: this.radius,
            color: this.color,
            damping: this.damping,
            invMass: this.invMass,
            ball: this.isBall,
            text: this.text
        };
    }

    static parse(obj) {
        let disc = new Disc(__WEBPACK_IMPORTED_MODULE_0_victor___default.a.fromArray(obj.pos), obj.radius, {
            id: obj.id,
            color: obj.color,
            damping: obj.damping,
            invMass: obj.invMass
        });

        if (obj.velocity) {
            disc.velocity = __WEBPACK_IMPORTED_MODULE_0_victor___default.a.fromArray(obj.velocity);
        }

        disc.isBall = obj.ball;
        disc.text = obj.text;

        return disc;
    }

    draw(ctx) {
        const { x, y } = this.position;

        ctx.beginPath();
        ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.kicking ? '#fff' : '#000';
        ctx.fill();
        ctx.closePath();
        ctx.stroke();

        if (this.isMe) {
            ctx.beginPath();
            ctx.arc(x, y, this.radius + 10, 0, 2 * Math.PI);
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.closePath();
            ctx.stroke();
        }

        if (this.text) {
            ctx.beginPath();
            ctx.fillStyle = '#fff';
            ctx.font = '16px \'Open Sans\'';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.text, x, y);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Disc;


Disc.nextDiscId = 0;

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_array_from__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_array_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_array_from__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_map__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__events__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__entities_Stadium__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__entities_ChatMessage__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__entities_Disc__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__entities_Player__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__entities_Segment__ = __webpack_require__(40);









class State {
    constructor() {
        this.frame = 0;
        this.roomName = '';
        this.playing = false;
        this.discs = [];
        this.events = [];
        this.players = [];
        this.chatMessages = [];
        this.maxChatMessages = 50;
        this.matchState = State.STATE_KICKOFF;
        this.matchStateTimer = 0;
        this.scores = new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_map___default.a();
        this.scoreLimit = 3;
        this.timer = 0;
        this.timeLimit = 3;
    }

    initScores() {
        this.stadium.teams.forEach(team => {
            this.scores.set(team.name, 0);
        });
    }

    addPlayers(...players) {
        this.players = this.players.concat(players);
    }

    getPlayerById(id) {
        return this.players.find(player => player.clientId == id);
    }

    getPlayerFromDisc(discId) {
        return this.players.find(player => player.discId == discId);
    }

    getTeamPlayers(team) {
        return this.players.filter(player => player.team == team.name);
    }

    getTeamScore(team) {
        return this.scores.get(team.name);
    }

    addDiscs(discs) {
        this.discs = this.discs.concat(discs);
    }

    addDisc(disc) {
        this.discs.push(disc);
    }

    removeDisc(disc) {
        this.discs.splice(this.discs.indexOf(disc), 1);
    }

    getPlayerDisc(player) {
        return this.discs.find(disc => disc.id == player.discId);
    }

    addChatMessage(chatMessage) {
        this.chatMessages.push(chatMessage);

        if (this.chatMessages.length > this.maxChatMessages) {
            this.chatMessages.splice(0, this.chatMessages.length - this.maxChatMessages);
        }
    }

    clone() {
        let clone = new State();
        clone.frame = this.frame;
        clone.roomName = this.roomName;
        clone.stadium = this.stadium;
        clone.scores = new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_map___default.a(this.scores);
        clone.scoreLimit = this.scoreLimit;
        clone.timer = this.timer;
        clone.timeLimit = this.timeLimit;
        clone.playing = this.playing;
        clone.matchState = this.matchState;
        clone.matchStateTimer = this.matchStateTimer;

        clone.chatMessages = [...this.chatMessages];
        clone.players = this.players.map(player => player.clone());
        clone.discs = this.discs.map(disc => disc.clone());

        return clone;
    }

    pack() {
        return {
            frame: this.frame,
            roomName: this.roomName,
            discs: this.discs.map(disc => disc.pack()),
            events: this.events.map(event => event.pack()),
            players: this.players.map(player => player.pack()),
            stadium: this.stadium.pack(),
            scores: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_array_from___default()(this.scores),
            scoreLimit: this.scoreLimit,
            timer: this.timer,
            timeLimit: this.timeLimit,
            playing: this.playing,
            matchState: this.matchState,
            matchStateTimer: this.matchStateTimer
        };
    }

    static parse(json) {
        let state = new State();
        state.frame = json.frame;
        state.roomName = json.roomName;
        state.stadium = __WEBPACK_IMPORTED_MODULE_3__entities_Stadium__["a" /* default */].parse(json.stadium);
        state.scores = new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_map___default.a(json.scores);
        state.scoreLimit = json.scoreLimit;
        state.timer = json.timer;
        state.timeLimit = json.timeLimit;
        state.playing = json.playing;
        state.matchState = json.matchState;
        state.matchStateTimer = json.matchStateTimer;

        state.players = json.players.map(obj => __WEBPACK_IMPORTED_MODULE_6__entities_Player__["a" /* default */].parse(obj));
        state.discs = json.discs.map(obj => __WEBPACK_IMPORTED_MODULE_5__entities_Disc__["a" /* default */].parse(obj));

        state.events = json.events.map(e => {
            let event = __WEBPACK_IMPORTED_MODULE_2__events__[e.eventType].parse(e.sender, e.data);
            event.frame = e.frame;
            return event;
        });

        return state;
    }

    static createFromStadium(stadium) {
        let state = new State();

        state.stadium = stadium;
        state.discs = stadium.discs.map(disc => disc.clone());
        state.initScores();

        return state;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = State;


State.STATE_KICKOFF = 0;
State.STATE_INPLAY = 1;
State.STATE_GOALSCORED = 2;
State.STATE_ENDGAME = 3;

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ChangeRoomName__ = __webpack_require__(75);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ChangeRoomName", function() { return __WEBPACK_IMPORTED_MODULE_0__ChangeRoomName__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ChangeScoreLimit__ = __webpack_require__(76);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ChangeScoreLimit", function() { return __WEBPACK_IMPORTED_MODULE_1__ChangeScoreLimit__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ChangeStadium__ = __webpack_require__(77);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ChangeStadium", function() { return __WEBPACK_IMPORTED_MODULE_2__ChangeStadium__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ChangeTeam__ = __webpack_require__(78);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ChangeTeam", function() { return __WEBPACK_IMPORTED_MODULE_3__ChangeTeam__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ChangeTimeLimit__ = __webpack_require__(79);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ChangeTimeLimit", function() { return __WEBPACK_IMPORTED_MODULE_4__ChangeTimeLimit__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__PlayerAdmin__ = __webpack_require__(81);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerAdmin", function() { return __WEBPACK_IMPORTED_MODULE_5__PlayerAdmin__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__PlayerAvatar__ = __webpack_require__(82);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerAvatar", function() { return __WEBPACK_IMPORTED_MODULE_6__PlayerAvatar__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__PlayerChat__ = __webpack_require__(83);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerChat", function() { return __WEBPACK_IMPORTED_MODULE_7__PlayerChat__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__PlayerJoined__ = __webpack_require__(42);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerJoined", function() { return __WEBPACK_IMPORTED_MODULE_8__PlayerJoined__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Keypress__ = __webpack_require__(80);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Keypress", function() { return __WEBPACK_IMPORTED_MODULE_9__Keypress__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__StartGame__ = __webpack_require__(84);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "StartGame", function() { return __WEBPACK_IMPORTED_MODULE_10__StartGame__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__StopGame__ = __webpack_require__(85);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "StopGame", function() { return __WEBPACK_IMPORTED_MODULE_11__StopGame__["a"]; });













/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(9);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(94);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 16 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var defaultConfig = {'iceServers': [{ 'url': 'stun:stun.l.google.com:19302' }]};
var dataCount = 1;

var BinaryPack = __webpack_require__(57);
var RTCPeerConnection = __webpack_require__(24).RTCPeerConnection;

var util = {
  noop: function() {},

  CLOUD_HOST: '0.peerjs.com',
  CLOUD_PORT: 9000,

  // Browsers that need chunking:
  chunkedBrowsers: {'Chrome': 1},
  chunkedMTU: 16300, // The original 60000 bytes setting does not work when sending data from Firefox to Chrome, which is "cut off" after 16384 bytes and delivered individually.

  // Logging logic
  logLevel: 0,
  setLogLevel: function(level) {
    var debugLevel = parseInt(level, 10);
    if (!isNaN(parseInt(level, 10))) {
      util.logLevel = debugLevel;
    } else {
      // If they are using truthy/falsy values for debug
      util.logLevel = level ? 3 : 0;
    }
    util.log = util.warn = util.error = util.noop;
    if (util.logLevel > 0) {
      util.error = util._printWith('ERROR');
    }
    if (util.logLevel > 1) {
      util.warn = util._printWith('WARNING');
    }
    if (util.logLevel > 2) {
      util.log = util._print;
    }
  },
  setLogFunction: function(fn) {
    if (fn.constructor !== Function) {
      util.warn('The log function you passed in is not a function. Defaulting to regular logs.');
    } else {
      util._print = fn;
    }
  },

  _printWith: function(prefix) {
    return function() {
      var copy = Array.prototype.slice.call(arguments);
      copy.unshift(prefix);
      util._print.apply(util, copy);
    };
  },
  _print: function () {
    var err = false;
    var copy = Array.prototype.slice.call(arguments);
    copy.unshift('PeerJS: ');
    for (var i = 0, l = copy.length; i < l; i++){
      if (copy[i] instanceof Error) {
        copy[i] = '(' + copy[i].name + ') ' + copy[i].message;
        err = true;
      }
    }
    err ? console.error.apply(console, copy) : console.log.apply(console, copy);
  },
  //

  // Returns browser-agnostic default config
  defaultConfig: defaultConfig,
  //

  // Returns the current browser.
  browser: (function() {
    if (window.mozRTCPeerConnection) {
      return 'Firefox';
    } else if (window.webkitRTCPeerConnection) {
      return 'Chrome';
    } else if (window.RTCPeerConnection) {
      return 'Supported';
    } else {
      return 'Unsupported';
    }
  })(),
  //

  // Lists which features are supported
  supports: (function() {
    if (typeof RTCPeerConnection === 'undefined') {
      return {};
    }

    var data = true;
    var audioVideo = true;

    var binaryBlob = false;
    var sctp = false;
    var onnegotiationneeded = !!window.webkitRTCPeerConnection;

    var pc, dc;
    try {
      pc = new RTCPeerConnection(defaultConfig, {optional: [{RtpDataChannels: true}]});
    } catch (e) {
      data = false;
      audioVideo = false;
    }

    if (data) {
      try {
        dc = pc.createDataChannel('_PEERJSTEST');
      } catch (e) {
        data = false;
      }
    }

    if (data) {
      // Binary test
      try {
        dc.binaryType = 'blob';
        binaryBlob = true;
      } catch (e) {
      }

      // Reliable test.
      // Unfortunately Chrome is a bit unreliable about whether or not they
      // support reliable.
      var reliablePC = new RTCPeerConnection(defaultConfig, {});
      try {
        var reliableDC = reliablePC.createDataChannel('_PEERJSRELIABLETEST', {});
        sctp = reliableDC.reliable;
      } catch (e) {
      }
      reliablePC.close();
    }

    // FIXME: not really the best check...
    if (audioVideo) {
      audioVideo = !!pc.addStream;
    }

    // FIXME: this is not great because in theory it doesn't work for
    // av-only browsers (?).
    if (!onnegotiationneeded && data) {
      // sync default check.
      var negotiationPC = new RTCPeerConnection(defaultConfig, {optional: [{RtpDataChannels: true}]});
      negotiationPC.onnegotiationneeded = function() {
        onnegotiationneeded = true;
        // async check.
        if (util && util.supports) {
          util.supports.onnegotiationneeded = true;
        }
      };
      negotiationPC.createDataChannel('_PEERJSNEGOTIATIONTEST');

      setTimeout(function() {
        negotiationPC.close();
      }, 1000);
    }

    if (pc) {
      pc.close();
    }

    return {
      audioVideo: audioVideo,
      data: data,
      binaryBlob: binaryBlob,
      binary: sctp, // deprecated; sctp implies binary support.
      reliable: sctp, // deprecated; sctp implies reliable data.
      sctp: sctp,
      onnegotiationneeded: onnegotiationneeded
    };
  }()),
  //

  // Ensure alphanumeric ids
  validateId: function(id) {
    // Allow empty ids
    return !id || /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.exec(id);
  },

  validateKey: function(key) {
    // Allow empty keys
    return !key || /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.exec(key);
  },


  debug: false,

  inherits: function(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  },
  extend: function(dest, source) {
    for(var key in source) {
      if(source.hasOwnProperty(key)) {
        dest[key] = source[key];
      }
    }
    return dest;
  },
  pack: BinaryPack.pack,
  unpack: BinaryPack.unpack,

  log: function () {
    if (util.debug) {
      var err = false;
      var copy = Array.prototype.slice.call(arguments);
      copy.unshift('PeerJS: ');
      for (var i = 0, l = copy.length; i < l; i++){
        if (copy[i] instanceof Error) {
          copy[i] = '(' + copy[i].name + ') ' + copy[i].message;
          err = true;
        }
      }
      err ? console.error.apply(console, copy) : console.log.apply(console, copy);
    }
  },

  setZeroTimeout: (function(global) {
    var timeouts = [];
    var messageName = 'zero-timeout-message';

    // Like setTimeout, but only takes a function argument.	 There's
    // no time argument (always zero) and no arguments (you have to
    // use a closure).
    function setZeroTimeoutPostMessage(fn) {
      timeouts.push(fn);
      global.postMessage(messageName, '*');
    }

    function handleMessage(event) {
      if (event.source == global && event.data == messageName) {
        if (event.stopPropagation) {
          event.stopPropagation();
        }
        if (timeouts.length) {
          timeouts.shift()();
        }
      }
    }
    if (global.addEventListener) {
      global.addEventListener('message', handleMessage, true);
    } else if (global.attachEvent) {
      global.attachEvent('onmessage', handleMessage);
    }
    return setZeroTimeoutPostMessage;
  }(window)),

  // Binary stuff

  // chunks a blob.
  chunk: function(bl) {
    var chunks = [];
    var size = bl.size;
    var start = index = 0;
    var total = Math.ceil(size / util.chunkedMTU);
    while (start < size) {
      var end = Math.min(size, start + util.chunkedMTU);
      var b = bl.slice(start, end);

      var chunk = {
        __peerData: dataCount,
        n: index,
        data: b,
        total: total
      };

      chunks.push(chunk);

      start = end;
      index += 1;
    }
    dataCount += 1;
    return chunks;
  },

  blobToArrayBuffer: function(blob, cb){
    var fr = new FileReader();
    fr.onload = function(evt) {
      cb(evt.target.result);
    };
    fr.readAsArrayBuffer(blob);
  },
  blobToBinaryString: function(blob, cb){
    var fr = new FileReader();
    fr.onload = function(evt) {
      cb(evt.target.result);
    };
    fr.readAsBinaryString(blob);
  },
  binaryStringToArrayBuffer: function(binary) {
    var byteArray = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i++) {
      byteArray[i] = binary.charCodeAt(i) & 0xff;
    }
    return byteArray.buffer;
  },
  randomToken: function () {
    return Math.random().toString(36).substr(2);
  },
  //

  isSecure: function() {
    return location.protocol === 'https:';
  }
};

module.exports = util;


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_victor__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_victor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_victor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Background__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Disc__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Goal__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Segment__ = __webpack_require__(40);







class Stadium {

    constructor(name) {
        this.cameraConstraints = [0, 0];
        this.backgrounds = [];
        this.discs = [];
        this.goals = [];
        this.planes = [];
        this.segments = [];

        this.name = name;
    }

    getTeam(name) {
        return this.teams.find(team => team.name == name);
    }

    getTeams() {
        return this.teams;
    }

    pack() {
        return {
            name: this.name,
            cameraConstraints: this.cameraConstraints,
            backgrounds: this.backgrounds.map(background => background.pack()),
            discs: this.discs.map(disc => disc.pack()),
            goals: this.goals.map(goal => goal.pack()),
            segments: this.segments.map(segment => segment.pack()),
            teams: this.teams,
            player: this.playerPhysics
        };
    }

    static parse(json) {
        let stadium = new Stadium(json.name);
        stadium.cameraConstraints = json.cameraConstraints;
        stadium.teams = json.teams;
        stadium.playerPhysics = json.player;

        stadium.backgrounds = json.backgrounds.map(obj => __WEBPACK_IMPORTED_MODULE_1__Background__["a" /* default */].parse(obj));
        stadium.discs = json.discs.map(obj => __WEBPACK_IMPORTED_MODULE_2__Disc__["a" /* default */].parse(obj));
        stadium.goals = json.goals.map(obj => __WEBPACK_IMPORTED_MODULE_3__Goal__["a" /* default */].parse(obj));
        stadium.segments = json.segments.map(obj => __WEBPACK_IMPORTED_MODULE_4__Segment__["a" /* default */].parse(obj));

        return stadium;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Stadium;


/***/ }),
/* 20 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(32)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(20);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Representation of a single EventEmitter function.
 *
 * @param {Function} fn Event handler to be called.
 * @param {Mixed} context Context for function execution.
 * @param {Boolean} once Only emit once
 * @api private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Minimal EventEmitter interface that is molded against the Node.js
 * EventEmitter interface.
 *
 * @constructor
 * @api public
 */
function EventEmitter() { /* Nothing to set */ }

/**
 * Holds the assigned EventEmitters by name.
 *
 * @type {Object}
 * @private
 */
EventEmitter.prototype._events = undefined;

/**
 * Return a list of assigned event listeners.
 *
 * @param {String} event The events that should be listed.
 * @returns {Array}
 * @api public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  if (!this._events || !this._events[event]) return [];
  if (this._events[event].fn) return [this._events[event].fn];

  for (var i = 0, l = this._events[event].length, ee = new Array(l); i < l; i++) {
    ee[i] = this._events[event][i].fn;
  }

  return ee;
};

/**
 * Emit an event to all registered event listeners.
 *
 * @param {String} event The name of the event.
 * @returns {Boolean} Indication if we've emitted an event.
 * @api public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  if (!this._events || !this._events[event]) return false;

  var listeners = this._events[event]
    , len = arguments.length
    , args
    , i;

  if ('function' === typeof listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Register a new EventListener for the given event.
 *
 * @param {String} event Name of the event.
 * @param {Functon} fn Callback function.
 * @param {Mixed} context The context of the function.
 * @api public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  var listener = new EE(fn, context || this);

  if (!this._events) this._events = {};
  if (!this._events[event]) this._events[event] = listener;
  else {
    if (!this._events[event].fn) this._events[event].push(listener);
    else this._events[event] = [
      this._events[event], listener
    ];
  }

  return this;
};

/**
 * Add an EventListener that's only called once.
 *
 * @param {String} event Name of the event.
 * @param {Function} fn Callback function.
 * @param {Mixed} context The context of the function.
 * @api public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  var listener = new EE(fn, context || this, true);

  if (!this._events) this._events = {};
  if (!this._events[event]) this._events[event] = listener;
  else {
    if (!this._events[event].fn) this._events[event].push(listener);
    else this._events[event] = [
      this._events[event], listener
    ];
  }

  return this;
};

/**
 * Remove event listeners.
 *
 * @param {String} event The event we want to remove.
 * @param {Function} fn The listener that we need to find.
 * @param {Boolean} once Only remove once listeners.
 * @api public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, once) {
  if (!this._events || !this._events[event]) return this;

  var listeners = this._events[event]
    , events = [];

  if (fn) {
    if (listeners.fn && (listeners.fn !== fn || (once && !listeners.once))) {
      events.push(listeners);
    }
    if (!listeners.fn) for (var i = 0, length = listeners.length; i < length; i++) {
      if (listeners[i].fn !== fn || (once && !listeners[i].once)) {
        events.push(listeners[i]);
      }
    }
  }

  //
  // Reset the array, or remove it completely if we have no more listeners.
  //
  if (events.length) {
    this._events[event] = events.length === 1 ? events[0] : events;
  } else {
    delete this._events[event];
  }

  return this;
};

/**
 * Remove all listeners or only the listeners for the specified event.
 *
 * @param {String} event The event want to remove all listeners for.
 * @api public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  if (!this._events) return this;

  if (event) delete this._events[event];
  else this._events = {};

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// This function doesn't apply anymore.
//
EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
  return this;
};

//
// Expose the module.
//
EventEmitter.EventEmitter = EventEmitter;
EventEmitter.EventEmitter2 = EventEmitter;
EventEmitter.EventEmitter3 = EventEmitter;

//
// Expose the module.
//
module.exports = EventEmitter;


/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports.RTCSessionDescription = window.RTCSessionDescription ||
	window.mozRTCSessionDescription;
module.exports.RTCPeerConnection = window.RTCPeerConnection ||
	window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
module.exports.RTCIceCandidate = window.RTCIceCandidate ||
	window.mozRTCIceCandidate;


/***/ }),
/* 25 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var ctx         = __webpack_require__(14)
  , call        = __webpack_require__(48)
  , isArrayIter = __webpack_require__(47)
  , anObject    = __webpack_require__(13)
  , toLength    = __webpack_require__(21)
  , getIterFn   = __webpack_require__(55)
  , BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = call(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(25);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(110)
  , $export        = __webpack_require__(8)
  , redefine       = __webpack_require__(118)
  , hide           = __webpack_require__(7)
  , has            = __webpack_require__(16)
  , Iterators      = __webpack_require__(17)
  , $iterCreate    = __webpack_require__(108)
  , setToStringTag = __webpack_require__(30)
  , getPrototypeOf = __webpack_require__(115)
  , ITERATOR       = __webpack_require__(1)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(3).f
  , has = __webpack_require__(16)
  , TAG = __webpack_require__(1)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(54)('keys')
  , uid    = __webpack_require__(34);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 32 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(27)
  , defined = __webpack_require__(20);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 34 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_math_sign__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_math_sign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_math_sign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_victor__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_victor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_victor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__state_State__ = __webpack_require__(11);





class Renderer {

    constructor() {
        this.cameraPos = new __WEBPACK_IMPORTED_MODULE_1_victor___default.a(0, 0);
        this.cameraLerp = 0.04;

        this.canvas = this.createCanvas();
        let ctx = this.canvas.getContext('2d');

        if (!ctx) {
            throw new Error();
        }

        this.ctx = ctx;
    }

    setParent(parent) {
        this.parent = parent;
        return this;
    }

    setWidth(width) {
        this.canvas.width = width;
        this.translate();

        return this;
    }

    setHeight(height) {
        this.canvas.height = height;
        this.translate();

        return this;
    }

    render() {
        let parent = this.parent;

        if (!parent || parent == this.canvas.parentElement) {
            return;
        }

        this.remove();
        parent.appendChild(this.canvas);
        this.canvas.focus();
        this.translate();

        return this;
    }

    remove() {
        if (this.canvas.parentElement) {
            this.canvas.remove();
        }
    }

    createCanvas() {
        let canvas = document.createElement('canvas');
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        // canvas.oncontextmenu = (e: Event) => false;

        return canvas;
    }

    get centerPos() {
        return new __WEBPACK_IMPORTED_MODULE_1_victor___default.a(this.canvas.width / 2, this.canvas.height / 2);
    }

    translate() {
        let center = this.centerPos;
        this.ctx.translate(center.x - this.cameraPos.x, center.y - this.cameraPos.y);
        return this;
    }

    draw(state) {
        this.lerpCamera(state);

        let area = [-this.canvas.width / 2 + this.cameraPos.x, -this.canvas.height / 2 + this.cameraPos.y, this.canvas.width, this.canvas.height];

        this.ctx.clearRect(...area);
        this.ctx.fillStyle = '#718c5a';
        this.ctx.fillRect(...area);

        state.stadium.backgrounds.forEach(background => {
            background.draw(this.ctx);
        });

        state.stadium.segments.forEach(segment => {
            segment.draw(this.ctx);
        });

        state.stadium.goals.forEach(goal => {
            goal.draw(this.ctx);
        });

        state.discs.forEach(disc => {
            disc.draw(this.ctx);
        });
    }

    lerpCamera(state) {
        let { width, height } = this.canvas;
        let { cameraConstraints } = state.stadium;

        if (width >= cameraConstraints[0] * 2 && height >= cameraConstraints[1] * 2) {
            this.resetCamera();
            return;
        }

        let ball = state.discs.find(disc => disc.isBall);
        let player = state.discs.find(disc => disc.isMe);
        let target = new __WEBPACK_IMPORTED_MODULE_1_victor___default.a(0, 0);

        if (ball) {
            target = ball.position.clone();

            if (player) {
                let diff = player.position.clone().subtract(ball.position);
                target.add(diff.divideScalar(2));
            }
        } else if (player) {
            target = player.position.clone();
        }

        let diff = target.clone().subtract(this.cameraPos);
        let lerp = diff.multiplyScalar(this.cameraLerp);

        if (width / 2 + Math.abs(this.cameraPos.x) + lerp.x * __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_math_sign___default()(this.cameraPos.x) > cameraConstraints[0]) {
            lerp.x = (cameraConstraints[0] - width / 2 - Math.abs(this.cameraPos.x)) * __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_math_sign___default()(this.cameraPos.x);
        }

        if (height / 2 + Math.abs(this.cameraPos.y) + lerp.y * __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_math_sign___default()(this.cameraPos.y) > cameraConstraints[1]) {
            lerp.y = (cameraConstraints[1] - height / 2 - Math.abs(this.cameraPos.y)) * __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_math_sign___default()(this.cameraPos.y);
        }

        this.ctx.translate(-lerp.x, -lerp.y);
        this.cameraPos.add(lerp);
    }

    resetCamera() {
        this.ctx.translate(this.cameraPos.x, this.cameraPos.y);
        this.cameraPos.zero();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Renderer;


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_victor__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_victor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_victor__);


class Background {

    constructor(pos, width, height, type) {
        this.pos = pos;
        this.width = width;
        this.height = height;
        this.type = type;
    }

    draw(ctx) {
        let image = Background.images[this.type];

        if (!(image instanceof HTMLImageElement) || !image.complete) {
            return;
        }

        let pattern = ctx.createPattern(image, 'repeat');
        ctx.fillStyle = pattern;
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }

    pack() {
        return {
            pos: this.pos.toArray(),
            width: this.width,
            height: this.height,
            type: this.type
        };
    }

    static parse(obj) {
        return new Background(__WEBPACK_IMPORTED_MODULE_0_victor___default.a.fromArray(obj.pos), obj.width, obj.height, obj.type);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Background;


Background.images = {
    grass: null
};

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ChatMessage {

    constructor(playerId, msg) {
        this.playerId = playerId;
        this.msg = msg;
    }

    pack() {
        return {
            playerId: this.playerId,
            msg: this.msg
        };
    }

    static parse(data) {
        return new ChatMessage(data.playerId, data.msg);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ChatMessage;


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class Line {

    constructor(p0, p1) {
        this.p0 = p0;
        this.p1 = p1;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.p0.x, this.p0.y);
        ctx.lineTo(this.p1.x, this.p1.y);
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.closePath();
        ctx.stroke();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Line;


/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);



class Player {

    constructor(clientId, name) {
        this.name = '';
        this.admin = false;
        this.avatar = '';
        this.keys = {
            up: false,
            down: false,
            left: false,
            right: false,
            kick: false
        };

        this.clientId = clientId;
        this.name = name;

        if (this.clientId == -1) {
            this.admin = true;
        }
    }

    setAvatar(avatar) {
        this.avatar = (avatar + '').substr(0, 2);
    }

    clone() {
        let player = new Player(this.clientId, this.name);
        player.admin = this.admin;
        player.avatar = this.avatar;
        player.discId = this.discId;
        player.keys = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, this.keys);
        player.team = this.team;
        return player;
    }

    pack() {
        return {
            clientId: this.clientId,
            name: this.name,
            admin: this.admin,
            avatar: this.avatar,
            team: this.team,
            keys: this.keys,
            discId: this.discId
        };
    }

    static parse(obj) {
        let player = new Player(obj.clientId, obj.name, obj.team);
        player.admin = obj.admin;
        player.setAvatar(obj.avatar);
        player.discId = obj.discId;
        player.keys = obj.keys;
        return player;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Player;


/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_victor__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_victor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_victor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Line__ = __webpack_require__(38);



class Segment extends __WEBPACK_IMPORTED_MODULE_1__Line__["a" /* default */] {

    constructor(p0, p1, bounce = 1) {
        super(p0, p1);
        this.bounce = bounce;
    }

    clone() {
        return new Segment(this.p0.clone(), this.p1.clone(), this.bounce);
    }

    pack() {
        return {
            p0: this.p0.toArray(),
            p1: this.p1.toArray(),
            bounce: this.bounce
        };
    }

    static parse(obj) {
        return new Segment(__WEBPACK_IMPORTED_MODULE_0_victor___default.a.fromArray(obj.p0), __WEBPACK_IMPORTED_MODULE_0_victor___default.a.fromArray(obj.p1), obj.bounce);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Segment;


/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Base {}
/* harmony export (immutable) */ __webpack_exports__["a"] = Base;


/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Event__ = __webpack_require__(0);


class PlayerJoined extends __WEBPACK_IMPORTED_MODULE_0__Event__["a" /* default */] {

    constructor(sender, data) {
        super(sender);
        this.type = 'PlayerJoined';
        this.data = data;
    }

    apply(state, game) {
        this.player = game.createPlayer(this.data.clientId, this.data.name);
        this.player.setAvatar(this.data.avatar);

        state.addPlayers(this.player);

        game.eventAggregator.publish(this);
    }

    static parse(sender, data) {
        return new PlayerJoined(sender, data);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PlayerJoined;


/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(25)
  , TAG = __webpack_require__(1)('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(9)
  , document = __webpack_require__(2).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 46 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(17)
  , ITERATOR   = __webpack_require__(1)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(13);
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var META     = __webpack_require__(34)('meta')
  , isObject = __webpack_require__(9)
  , has      = __webpack_require__(16)
  , setDesc  = __webpack_require__(3).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(15)(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(13)
  , dPs         = __webpack_require__(113)
  , enumBugKeys = __webpack_require__(46)
  , IE_PROTO    = __webpack_require__(31)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(45)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(105).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(116)
  , enumBugKeys = __webpack_require__(46);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(7);
module.exports = function(target, src, safe){
  for(var key in src){
    if(safe && target[key])target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(44)
  , ITERATOR  = __webpack_require__(1)('iterator')
  , Iterators = __webpack_require__(17);
module.exports = __webpack_require__(5).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(120)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(28)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var BufferBuilder = __webpack_require__(58).BufferBuilder;
var binaryFeatures = __webpack_require__(58).binaryFeatures;

var BinaryPack = {
  unpack: function(data){
    var unpacker = new Unpacker(data);
    return unpacker.unpack();
  },
  pack: function(data){
    var packer = new Packer();
    packer.pack(data);
    var buffer = packer.getBuffer();
    return buffer;
  }
};

module.exports = BinaryPack;

function Unpacker (data){
  // Data is ArrayBuffer
  this.index = 0;
  this.dataBuffer = data;
  this.dataView = new Uint8Array(this.dataBuffer);
  this.length = this.dataBuffer.byteLength;
}

Unpacker.prototype.unpack = function(){
  var type = this.unpack_uint8();
  if (type < 0x80){
    var positive_fixnum = type;
    return positive_fixnum;
  } else if ((type ^ 0xe0) < 0x20){
    var negative_fixnum = (type ^ 0xe0) - 0x20;
    return negative_fixnum;
  }
  var size;
  if ((size = type ^ 0xa0) <= 0x0f){
    return this.unpack_raw(size);
  } else if ((size = type ^ 0xb0) <= 0x0f){
    return this.unpack_string(size);
  } else if ((size = type ^ 0x90) <= 0x0f){
    return this.unpack_array(size);
  } else if ((size = type ^ 0x80) <= 0x0f){
    return this.unpack_map(size);
  }
  switch(type){
    case 0xc0:
      return null;
    case 0xc1:
      return undefined;
    case 0xc2:
      return false;
    case 0xc3:
      return true;
    case 0xca:
      return this.unpack_float();
    case 0xcb:
      return this.unpack_double();
    case 0xcc:
      return this.unpack_uint8();
    case 0xcd:
      return this.unpack_uint16();
    case 0xce:
      return this.unpack_uint32();
    case 0xcf:
      return this.unpack_uint64();
    case 0xd0:
      return this.unpack_int8();
    case 0xd1:
      return this.unpack_int16();
    case 0xd2:
      return this.unpack_int32();
    case 0xd3:
      return this.unpack_int64();
    case 0xd4:
      return undefined;
    case 0xd5:
      return undefined;
    case 0xd6:
      return undefined;
    case 0xd7:
      return undefined;
    case 0xd8:
      size = this.unpack_uint16();
      return this.unpack_string(size);
    case 0xd9:
      size = this.unpack_uint32();
      return this.unpack_string(size);
    case 0xda:
      size = this.unpack_uint16();
      return this.unpack_raw(size);
    case 0xdb:
      size = this.unpack_uint32();
      return this.unpack_raw(size);
    case 0xdc:
      size = this.unpack_uint16();
      return this.unpack_array(size);
    case 0xdd:
      size = this.unpack_uint32();
      return this.unpack_array(size);
    case 0xde:
      size = this.unpack_uint16();
      return this.unpack_map(size);
    case 0xdf:
      size = this.unpack_uint32();
      return this.unpack_map(size);
  }
}

Unpacker.prototype.unpack_uint8 = function(){
  var byte = this.dataView[this.index] & 0xff;
  this.index++;
  return byte;
};

Unpacker.prototype.unpack_uint16 = function(){
  var bytes = this.read(2);
  var uint16 =
    ((bytes[0] & 0xff) * 256) + (bytes[1] & 0xff);
  this.index += 2;
  return uint16;
}

Unpacker.prototype.unpack_uint32 = function(){
  var bytes = this.read(4);
  var uint32 =
     ((bytes[0]  * 256 +
       bytes[1]) * 256 +
       bytes[2]) * 256 +
       bytes[3];
  this.index += 4;
  return uint32;
}

Unpacker.prototype.unpack_uint64 = function(){
  var bytes = this.read(8);
  var uint64 =
   ((((((bytes[0]  * 256 +
       bytes[1]) * 256 +
       bytes[2]) * 256 +
       bytes[3]) * 256 +
       bytes[4]) * 256 +
       bytes[5]) * 256 +
       bytes[6]) * 256 +
       bytes[7];
  this.index += 8;
  return uint64;
}


Unpacker.prototype.unpack_int8 = function(){
  var uint8 = this.unpack_uint8();
  return (uint8 < 0x80 ) ? uint8 : uint8 - (1 << 8);
};

Unpacker.prototype.unpack_int16 = function(){
  var uint16 = this.unpack_uint16();
  return (uint16 < 0x8000 ) ? uint16 : uint16 - (1 << 16);
}

Unpacker.prototype.unpack_int32 = function(){
  var uint32 = this.unpack_uint32();
  return (uint32 < Math.pow(2, 31) ) ? uint32 :
    uint32 - Math.pow(2, 32);
}

Unpacker.prototype.unpack_int64 = function(){
  var uint64 = this.unpack_uint64();
  return (uint64 < Math.pow(2, 63) ) ? uint64 :
    uint64 - Math.pow(2, 64);
}

Unpacker.prototype.unpack_raw = function(size){
  if ( this.length < this.index + size){
    throw new Error('BinaryPackFailure: index is out of range'
      + ' ' + this.index + ' ' + size + ' ' + this.length);
  }
  var buf = this.dataBuffer.slice(this.index, this.index + size);
  this.index += size;

    //buf = util.bufferToString(buf);

  return buf;
}

Unpacker.prototype.unpack_string = function(size){
  var bytes = this.read(size);
  var i = 0, str = '', c, code;
  while(i < size){
    c = bytes[i];
    if ( c < 128){
      str += String.fromCharCode(c);
      i++;
    } else if ((c ^ 0xc0) < 32){
      code = ((c ^ 0xc0) << 6) | (bytes[i+1] & 63);
      str += String.fromCharCode(code);
      i += 2;
    } else {
      code = ((c & 15) << 12) | ((bytes[i+1] & 63) << 6) |
        (bytes[i+2] & 63);
      str += String.fromCharCode(code);
      i += 3;
    }
  }
  this.index += size;
  return str;
}

Unpacker.prototype.unpack_array = function(size){
  var objects = new Array(size);
  for(var i = 0; i < size ; i++){
    objects[i] = this.unpack();
  }
  return objects;
}

Unpacker.prototype.unpack_map = function(size){
  var map = {};
  for(var i = 0; i < size ; i++){
    var key  = this.unpack();
    var value = this.unpack();
    map[key] = value;
  }
  return map;
}

Unpacker.prototype.unpack_float = function(){
  var uint32 = this.unpack_uint32();
  var sign = uint32 >> 31;
  var exp  = ((uint32 >> 23) & 0xff) - 127;
  var fraction = ( uint32 & 0x7fffff ) | 0x800000;
  return (sign == 0 ? 1 : -1) *
    fraction * Math.pow(2, exp - 23);
}

Unpacker.prototype.unpack_double = function(){
  var h32 = this.unpack_uint32();
  var l32 = this.unpack_uint32();
  var sign = h32 >> 31;
  var exp  = ((h32 >> 20) & 0x7ff) - 1023;
  var hfrac = ( h32 & 0xfffff ) | 0x100000;
  var frac = hfrac * Math.pow(2, exp - 20) +
    l32   * Math.pow(2, exp - 52);
  return (sign == 0 ? 1 : -1) * frac;
}

Unpacker.prototype.read = function(length){
  var j = this.index;
  if (j + length <= this.length) {
    return this.dataView.subarray(j, j + length);
  } else {
    throw new Error('BinaryPackFailure: read index out of range');
  }
}

function Packer(){
  this.bufferBuilder = new BufferBuilder();
}

Packer.prototype.getBuffer = function(){
  return this.bufferBuilder.getBuffer();
}

Packer.prototype.pack = function(value){
  var type = typeof(value);
  if (type == 'string'){
    this.pack_string(value);
  } else if (type == 'number'){
    if (Math.floor(value) === value){
      this.pack_integer(value);
    } else{
      this.pack_double(value);
    }
  } else if (type == 'boolean'){
    if (value === true){
      this.bufferBuilder.append(0xc3);
    } else if (value === false){
      this.bufferBuilder.append(0xc2);
    }
  } else if (type == 'undefined'){
    this.bufferBuilder.append(0xc0);
  } else if (type == 'object'){
    if (value === null){
      this.bufferBuilder.append(0xc0);
    } else {
      var constructor = value.constructor;
      if (constructor == Array){
        this.pack_array(value);
      } else if (constructor == Blob || constructor == File) {
        this.pack_bin(value);
      } else if (constructor == ArrayBuffer) {
        if(binaryFeatures.useArrayBufferView) {
          this.pack_bin(new Uint8Array(value));
        } else {
          this.pack_bin(value);
        }
      } else if ('BYTES_PER_ELEMENT' in value){
        if(binaryFeatures.useArrayBufferView) {
          this.pack_bin(new Uint8Array(value.buffer));
        } else {
          this.pack_bin(value.buffer);
        }
      } else if (constructor == Object){
        this.pack_object(value);
      } else if (constructor == Date){
        this.pack_string(value.toString());
      } else if (typeof value.toBinaryPack == 'function'){
        this.bufferBuilder.append(value.toBinaryPack());
      } else {
        throw new Error('Type "' + constructor.toString() + '" not yet supported');
      }
    }
  } else {
    throw new Error('Type "' + type + '" not yet supported');
  }
  this.bufferBuilder.flush();
}


Packer.prototype.pack_bin = function(blob){
  var length = blob.length || blob.byteLength || blob.size;
  if (length <= 0x0f){
    this.pack_uint8(0xa0 + length);
  } else if (length <= 0xffff){
    this.bufferBuilder.append(0xda) ;
    this.pack_uint16(length);
  } else if (length <= 0xffffffff){
    this.bufferBuilder.append(0xdb);
    this.pack_uint32(length);
  } else{
    throw new Error('Invalid length');
  }
  this.bufferBuilder.append(blob);
}

Packer.prototype.pack_string = function(str){
  var length = utf8Length(str);

  if (length <= 0x0f){
    this.pack_uint8(0xb0 + length);
  } else if (length <= 0xffff){
    this.bufferBuilder.append(0xd8) ;
    this.pack_uint16(length);
  } else if (length <= 0xffffffff){
    this.bufferBuilder.append(0xd9);
    this.pack_uint32(length);
  } else{
    throw new Error('Invalid length');
  }
  this.bufferBuilder.append(str);
}

Packer.prototype.pack_array = function(ary){
  var length = ary.length;
  if (length <= 0x0f){
    this.pack_uint8(0x90 + length);
  } else if (length <= 0xffff){
    this.bufferBuilder.append(0xdc)
    this.pack_uint16(length);
  } else if (length <= 0xffffffff){
    this.bufferBuilder.append(0xdd);
    this.pack_uint32(length);
  } else{
    throw new Error('Invalid length');
  }
  for(var i = 0; i < length ; i++){
    this.pack(ary[i]);
  }
}

Packer.prototype.pack_integer = function(num){
  if ( -0x20 <= num && num <= 0x7f){
    this.bufferBuilder.append(num & 0xff);
  } else if (0x00 <= num && num <= 0xff){
    this.bufferBuilder.append(0xcc);
    this.pack_uint8(num);
  } else if (-0x80 <= num && num <= 0x7f){
    this.bufferBuilder.append(0xd0);
    this.pack_int8(num);
  } else if ( 0x0000 <= num && num <= 0xffff){
    this.bufferBuilder.append(0xcd);
    this.pack_uint16(num);
  } else if (-0x8000 <= num && num <= 0x7fff){
    this.bufferBuilder.append(0xd1);
    this.pack_int16(num);
  } else if ( 0x00000000 <= num && num <= 0xffffffff){
    this.bufferBuilder.append(0xce);
    this.pack_uint32(num);
  } else if (-0x80000000 <= num && num <= 0x7fffffff){
    this.bufferBuilder.append(0xd2);
    this.pack_int32(num);
  } else if (-0x8000000000000000 <= num && num <= 0x7FFFFFFFFFFFFFFF){
    this.bufferBuilder.append(0xd3);
    this.pack_int64(num);
  } else if (0x0000000000000000 <= num && num <= 0xFFFFFFFFFFFFFFFF){
    this.bufferBuilder.append(0xcf);
    this.pack_uint64(num);
  } else{
    throw new Error('Invalid integer');
  }
}

Packer.prototype.pack_double = function(num){
  var sign = 0;
  if (num < 0){
    sign = 1;
    num = -num;
  }
  var exp  = Math.floor(Math.log(num) / Math.LN2);
  var frac0 = num / Math.pow(2, exp) - 1;
  var frac1 = Math.floor(frac0 * Math.pow(2, 52));
  var b32   = Math.pow(2, 32);
  var h32 = (sign << 31) | ((exp+1023) << 20) |
      (frac1 / b32) & 0x0fffff;
  var l32 = frac1 % b32;
  this.bufferBuilder.append(0xcb);
  this.pack_int32(h32);
  this.pack_int32(l32);
}

Packer.prototype.pack_object = function(obj){
  var keys = Object.keys(obj);
  var length = keys.length;
  if (length <= 0x0f){
    this.pack_uint8(0x80 + length);
  } else if (length <= 0xffff){
    this.bufferBuilder.append(0xde);
    this.pack_uint16(length);
  } else if (length <= 0xffffffff){
    this.bufferBuilder.append(0xdf);
    this.pack_uint32(length);
  } else{
    throw new Error('Invalid length');
  }
  for(var prop in obj){
    if (obj.hasOwnProperty(prop)){
      this.pack(prop);
      this.pack(obj[prop]);
    }
  }
}

Packer.prototype.pack_uint8 = function(num){
  this.bufferBuilder.append(num);
}

Packer.prototype.pack_uint16 = function(num){
  this.bufferBuilder.append(num >> 8);
  this.bufferBuilder.append(num & 0xff);
}

Packer.prototype.pack_uint32 = function(num){
  var n = num & 0xffffffff;
  this.bufferBuilder.append((n & 0xff000000) >>> 24);
  this.bufferBuilder.append((n & 0x00ff0000) >>> 16);
  this.bufferBuilder.append((n & 0x0000ff00) >>>  8);
  this.bufferBuilder.append((n & 0x000000ff));
}

Packer.prototype.pack_uint64 = function(num){
  var high = num / Math.pow(2, 32);
  var low  = num % Math.pow(2, 32);
  this.bufferBuilder.append((high & 0xff000000) >>> 24);
  this.bufferBuilder.append((high & 0x00ff0000) >>> 16);
  this.bufferBuilder.append((high & 0x0000ff00) >>>  8);
  this.bufferBuilder.append((high & 0x000000ff));
  this.bufferBuilder.append((low  & 0xff000000) >>> 24);
  this.bufferBuilder.append((low  & 0x00ff0000) >>> 16);
  this.bufferBuilder.append((low  & 0x0000ff00) >>>  8);
  this.bufferBuilder.append((low  & 0x000000ff));
}

Packer.prototype.pack_int8 = function(num){
  this.bufferBuilder.append(num & 0xff);
}

Packer.prototype.pack_int16 = function(num){
  this.bufferBuilder.append((num & 0xff00) >> 8);
  this.bufferBuilder.append(num & 0xff);
}

Packer.prototype.pack_int32 = function(num){
  this.bufferBuilder.append((num >>> 24) & 0xff);
  this.bufferBuilder.append((num & 0x00ff0000) >>> 16);
  this.bufferBuilder.append((num & 0x0000ff00) >>> 8);
  this.bufferBuilder.append((num & 0x000000ff));
}

Packer.prototype.pack_int64 = function(num){
  var high = Math.floor(num / Math.pow(2, 32));
  var low  = num % Math.pow(2, 32);
  this.bufferBuilder.append((high & 0xff000000) >>> 24);
  this.bufferBuilder.append((high & 0x00ff0000) >>> 16);
  this.bufferBuilder.append((high & 0x0000ff00) >>>  8);
  this.bufferBuilder.append((high & 0x000000ff));
  this.bufferBuilder.append((low  & 0xff000000) >>> 24);
  this.bufferBuilder.append((low  & 0x00ff0000) >>> 16);
  this.bufferBuilder.append((low  & 0x0000ff00) >>>  8);
  this.bufferBuilder.append((low  & 0x000000ff));
}

function _utf8Replace(m){
  var code = m.charCodeAt(0);

  if(code <= 0x7ff) return '00';
  if(code <= 0xffff) return '000';
  if(code <= 0x1fffff) return '0000';
  if(code <= 0x3ffffff) return '00000';
  return '000000';
}

function utf8Length(str){
  if (str.length > 600) {
    // Blob method faster for large strings
    return (new Blob([str])).size;
  } else {
    return str.replace(/[^\u0000-\u007F]/g, _utf8Replace).length;
  }
}


/***/ }),
/* 58 */
/***/ (function(module, exports) {

var binaryFeatures = {};
binaryFeatures.useBlobBuilder = (function(){
  try {
    new Blob([]);
    return false;
  } catch (e) {
    return true;
  }
})();

binaryFeatures.useArrayBufferView = !binaryFeatures.useBlobBuilder && (function(){
  try {
    return (new Blob([new Uint8Array([])])).size === 0;
  } catch (e) {
    return true;
  }
})();

module.exports.binaryFeatures = binaryFeatures;
var BlobBuilder = module.exports.BlobBuilder;
if (typeof window != 'undefined') {
  BlobBuilder = module.exports.BlobBuilder = window.WebKitBlobBuilder ||
    window.MozBlobBuilder || window.MSBlobBuilder || window.BlobBuilder;
}

function BufferBuilder(){
  this._pieces = [];
  this._parts = [];
}

BufferBuilder.prototype.append = function(data) {
  if(typeof data === 'number') {
    this._pieces.push(data);
  } else {
    this.flush();
    this._parts.push(data);
  }
};

BufferBuilder.prototype.flush = function() {
  if (this._pieces.length > 0) {
    var buf = new Uint8Array(this._pieces);
    if(!binaryFeatures.useArrayBufferView) {
      buf = buf.buffer;
    }
    this._parts.push(buf);
    this._pieces = [];
  }
};

BufferBuilder.prototype.getBuffer = function() {
  this.flush();
  if(binaryFeatures.useBlobBuilder) {
    var builder = new BlobBuilder();
    for(var i = 0, ii = this._parts.length; i < ii; i++) {
      builder.append(this._parts[i]);
    }
    return builder.getBlob();
  } else {
    return new Blob(this._parts);
  }
};

module.exports.BufferBuilder = BufferBuilder;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(18);
var RTCPeerConnection = __webpack_require__(24).RTCPeerConnection;
var RTCSessionDescription = __webpack_require__(24).RTCSessionDescription;
var RTCIceCandidate = __webpack_require__(24).RTCIceCandidate;

/**
 * Manages all negotiations between Peers.
 */
var Negotiator = {
  pcs: {
    data: {},
    media: {}
  }, // type => {peerId: {pc_id: pc}}.
  //providers: {}, // provider's id => providers (there may be multiple providers/client.
  queue: [] // connections that are delayed due to a PC being in use.
}

Negotiator._idPrefix = 'pc_';

/** Returns a PeerConnection object set up correctly (for data, media). */
Negotiator.startConnection = function(connection, options) {
  var pc = Negotiator._getPeerConnection(connection, options);

  if (connection.type === 'media' && options._stream) {
    // Add the stream.
    pc.addStream(options._stream);
  }

  // Set the connection's PC.
  connection.pc = connection.peerConnection = pc;
  // What do we need to do now?
  if (options.originator) {
    if (connection.type === 'data') {
      // Create the datachannel.
      var config = {};
      // Dropping reliable:false support, since it seems to be crashing
      // Chrome.
      /*if (util.supports.sctp && !options.reliable) {
        // If we have canonical reliable support...
        config = {maxRetransmits: 0};
      }*/
      // Fallback to ensure older browsers don't crash.
      if (!util.supports.sctp) {
        config = {reliable: options.reliable};
      }
      var dc = pc.createDataChannel(connection.label, config);
      connection.initialize(dc);
    }

    if (!util.supports.onnegotiationneeded) {
      Negotiator._makeOffer(connection);
    }
  } else {
    Negotiator.handleSDP('OFFER', connection, options.sdp);
  }
}

Negotiator._getPeerConnection = function(connection, options) {
  if (!Negotiator.pcs[connection.type]) {
    util.error(connection.type + ' is not a valid connection type. Maybe you overrode the `type` property somewhere.');
  }

  if (!Negotiator.pcs[connection.type][connection.peer]) {
    Negotiator.pcs[connection.type][connection.peer] = {};
  }
  var peerConnections = Negotiator.pcs[connection.type][connection.peer];

  var pc;
  // Not multiplexing while FF and Chrome have not-great support for it.
  /*if (options.multiplex) {
    ids = Object.keys(peerConnections);
    for (var i = 0, ii = ids.length; i < ii; i += 1) {
      pc = peerConnections[ids[i]];
      if (pc.signalingState === 'stable') {
        break; // We can go ahead and use this PC.
      }
    }
  } else */
  if (options.pc) { // Simplest case: PC id already provided for us.
    pc = Negotiator.pcs[connection.type][connection.peer][options.pc];
  }

  if (!pc || pc.signalingState !== 'stable') {
    pc = Negotiator._startPeerConnection(connection);
  }
  return pc;
}

/*
Negotiator._addProvider = function(provider) {
  if ((!provider.id && !provider.disconnected) || !provider.socket.open) {
    // Wait for provider to obtain an ID.
    provider.on('open', function(id) {
      Negotiator._addProvider(provider);
    });
  } else {
    Negotiator.providers[provider.id] = provider;
  }
}*/


/** Start a PC. */
Negotiator._startPeerConnection = function(connection) {
  util.log('Creating RTCPeerConnection.');

  var id = Negotiator._idPrefix + util.randomToken();
  var optional = {};

  if (connection.type === 'data' && !util.supports.sctp) {
    optional = {optional: [{RtpDataChannels: true}]};
  } else if (connection.type === 'media') {
    // Interop req for chrome.
    optional = {optional: [{DtlsSrtpKeyAgreement: true}]};
  }

  var pc = new RTCPeerConnection(connection.provider.options.config, optional);
  Negotiator.pcs[connection.type][connection.peer][id] = pc;

  Negotiator._setupListeners(connection, pc, id);

  return pc;
}

/** Set up various WebRTC listeners. */
Negotiator._setupListeners = function(connection, pc, pc_id) {
  var peerId = connection.peer;
  var connectionId = connection.id;
  var provider = connection.provider;

  // ICE CANDIDATES.
  util.log('Listening for ICE candidates.');
  pc.onicecandidate = function(evt) {
    if (evt.candidate) {
      util.log('Received ICE candidates for:', connection.peer);
      provider.socket.send({
        type: 'CANDIDATE',
        payload: {
          candidate: evt.candidate,
          type: connection.type,
          connectionId: connection.id
        },
        dst: peerId
      });
    }
  };

  pc.oniceconnectionstatechange = function() {
    switch (pc.iceConnectionState) {
      case 'disconnected':
      case 'failed':
        util.log('iceConnectionState is disconnected, closing connections to ' + peerId);
        connection.close();
        break;
      case 'completed':
        pc.onicecandidate = util.noop;
        break;
    }
  };

  // Fallback for older Chrome impls.
  pc.onicechange = pc.oniceconnectionstatechange;

  // ONNEGOTIATIONNEEDED (Chrome)
  util.log('Listening for `negotiationneeded`');
  pc.onnegotiationneeded = function() {
    util.log('`negotiationneeded` triggered');
    if (pc.signalingState == 'stable') {
      Negotiator._makeOffer(connection);
    } else {
      util.log('onnegotiationneeded triggered when not stable. Is another connection being established?');
    }
  };

  // DATACONNECTION.
  util.log('Listening for data channel');
  // Fired between offer and answer, so options should already be saved
  // in the options hash.
  pc.ondatachannel = function(evt) {
    util.log('Received data channel');
    var dc = evt.channel;
    var connection = provider.getConnection(peerId, connectionId);
    connection.initialize(dc);
  };

  // MEDIACONNECTION.
  util.log('Listening for remote stream');
  pc.onaddstream = function(evt) {
    util.log('Received remote stream');
    var stream = evt.stream;
    var connection = provider.getConnection(peerId, connectionId);
    // 10/10/2014: looks like in Chrome 38, onaddstream is triggered after
    // setting the remote description. Our connection object in these cases
    // is actually a DATA connection, so addStream fails.
    // TODO: This is hopefully just a temporary fix. We should try to
    // understand why this is happening.
    if (connection.type === 'media') {
      connection.addStream(stream);
    }
  };
}

Negotiator.cleanup = function(connection) {
  util.log('Cleaning up PeerConnection to ' + connection.peer);

  var pc = connection.pc;

  if (!!pc && (pc.readyState !== 'closed' || pc.signalingState !== 'closed')) {
    pc.close();
    connection.pc = null;
  }
}

Negotiator._makeOffer = function(connection) {
  var pc = connection.pc;
  pc.createOffer(function(offer) {
    util.log('Created offer.');

    if (!util.supports.sctp && connection.type === 'data' && connection.reliable) {
      offer.sdp = Reliable.higherBandwidthSDP(offer.sdp);
    }

    pc.setLocalDescription(offer, function() {
      util.log('Set localDescription: offer', 'for:', connection.peer);
      connection.provider.socket.send({
        type: 'OFFER',
        payload: {
          sdp: offer,
          type: connection.type,
          label: connection.label,
          connectionId: connection.id,
          reliable: connection.reliable,
          serialization: connection.serialization,
          metadata: connection.metadata,
          browser: util.browser
        },
        dst: connection.peer
      });
    }, function(err) {
      connection.provider.emitError('webrtc', err);
      util.log('Failed to setLocalDescription, ', err);
    });
  }, function(err) {
    connection.provider.emitError('webrtc', err);
    util.log('Failed to createOffer, ', err);
  }, connection.options.constraints);
}

Negotiator._makeAnswer = function(connection) {
  var pc = connection.pc;

  pc.createAnswer(function(answer) {
    util.log('Created answer.');

    if (!util.supports.sctp && connection.type === 'data' && connection.reliable) {
      answer.sdp = Reliable.higherBandwidthSDP(answer.sdp);
    }

    pc.setLocalDescription(answer, function() {
      util.log('Set localDescription: answer', 'for:', connection.peer);
      connection.provider.socket.send({
        type: 'ANSWER',
        payload: {
          sdp: answer,
          type: connection.type,
          connectionId: connection.id,
          browser: util.browser
        },
        dst: connection.peer
      });
    }, function(err) {
      connection.provider.emitError('webrtc', err);
      util.log('Failed to setLocalDescription, ', err);
    });
  }, function(err) {
    connection.provider.emitError('webrtc', err);
    util.log('Failed to create answer, ', err);
  });
}

/** Handle an SDP. */
Negotiator.handleSDP = function(type, connection, sdp) {
  sdp = new RTCSessionDescription(sdp);
  var pc = connection.pc;

  util.log('Setting remote description', sdp);
  pc.setRemoteDescription(sdp, function() {
    util.log('Set remoteDescription:', type, 'for:', connection.peer);

    if (type === 'OFFER') {
      Negotiator._makeAnswer(connection);
    }
  }, function(err) {
    connection.provider.emitError('webrtc', err);
    util.log('Failed to setRemoteDescription, ', err);
  });
}

/** Handle a candidate. */
Negotiator.handleCandidate = function(connection, ice) {
  var candidate = ice.candidate;
  var sdpMLineIndex = ice.sdpMLineIndex;
  connection.pc.addIceCandidate(new RTCIceCandidate({
    sdpMLineIndex: sdpMLineIndex,
    candidate: candidate
  }));
  util.log('Added ICE candidate for:', connection.peer);
}

module.exports = Negotiator;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(18);
var EventEmitter = __webpack_require__(23);
var Socket = __webpack_require__(134);
var MediaConnection = __webpack_require__(133);
var DataConnection = __webpack_require__(132);

/**
 * A peer who can initiate connections with other peers.
 */
function Peer(id, options) {
  if (!(this instanceof Peer)) return new Peer(id, options);
  EventEmitter.call(this);

  // Deal with overloading
  if (id && id.constructor == Object) {
    options = id;
    id = undefined;
  } else if (id) {
    // Ensure id is a string
    id = id.toString();
  }
  //

  // Configurize options
  options = util.extend({
    debug: 0, // 1: Errors, 2: Warnings, 3: All logs
    host: util.CLOUD_HOST,
    port: util.CLOUD_PORT,
    key: 'peerjs',
    path: '/',
    token: util.randomToken(),
    config: util.defaultConfig
  }, options);
  this.options = options;
  // Detect relative URL host.
  if (options.host === '/') {
    options.host = window.location.hostname;
  }
  // Set path correctly.
  if (options.path[0] !== '/') {
    options.path = '/' + options.path;
  }
  if (options.path[options.path.length - 1] !== '/') {
    options.path += '/';
  }

  // Set whether we use SSL to same as current host
  if (options.secure === undefined && options.host !== util.CLOUD_HOST) {
    options.secure = util.isSecure();
  }
  // Set a custom log function if present
  if (options.logFunction) {
    util.setLogFunction(options.logFunction);
  }
  util.setLogLevel(options.debug);
  //

  // Sanity checks
  // Ensure WebRTC supported
  if (!util.supports.audioVideo && !util.supports.data ) {
    this._delayedAbort('browser-incompatible', 'The current browser does not support WebRTC');
    return;
  }
  // Ensure alphanumeric id
  if (!util.validateId(id)) {
    this._delayedAbort('invalid-id', 'ID "' + id + '" is invalid');
    return;
  }
  // Ensure valid key
  if (!util.validateKey(options.key)) {
    this._delayedAbort('invalid-key', 'API KEY "' + options.key + '" is invalid');
    return;
  }
  // Ensure not using unsecure cloud server on SSL page
  if (options.secure && options.host === '0.peerjs.com') {
    this._delayedAbort('ssl-unavailable',
      'The cloud server currently does not support HTTPS. Please run your own PeerServer to use HTTPS.');
    return;
  }
  //

  // States.
  this.destroyed = false; // Connections have been killed
  this.disconnected = false; // Connection to PeerServer killed but P2P connections still active
  this.open = false; // Sockets and such are not yet open.
  //

  // References
  this.connections = {}; // DataConnections for this peer.
  this._lostMessages = {}; // src => [list of messages]
  //

  // Start the server connection
  this._initializeServerConnection();
  if (id) {
    this._initialize(id);
  } else {
    this._retrieveId();
  }
  //
}

util.inherits(Peer, EventEmitter);

// Initialize the 'socket' (which is actually a mix of XHR streaming and
// websockets.)
Peer.prototype._initializeServerConnection = function() {
  var self = this;
  this.socket = new Socket(this.options.secure, this.options.host, this.options.port, this.options.path, this.options.key);
  this.socket.on('message', function(data) {
    self._handleMessage(data);
  });
  this.socket.on('error', function(error) {
    self._abort('socket-error', error);
  });
  this.socket.on('disconnected', function() {
    // If we haven't explicitly disconnected, emit error and disconnect.
    if (!self.disconnected) {
      self.emitError('network', 'Lost connection to server.');
      self.disconnect();
    }
  });
  this.socket.on('close', function() {
    // If we haven't explicitly disconnected, emit error.
    if (!self.disconnected) {
      self._abort('socket-closed', 'Underlying socket is already closed.');
    }
  });
};

/** Get a unique ID from the server via XHR. */
Peer.prototype._retrieveId = function(cb) {
  var self = this;
  var http = new XMLHttpRequest();
  var protocol = this.options.secure ? 'https://' : 'http://';
  var url = protocol + this.options.host + ':' + this.options.port +
    this.options.path + this.options.key + '/id';
  var queryString = '?ts=' + new Date().getTime() + '' + Math.random();
  url += queryString;

  // If there's no ID we need to wait for one before trying to init socket.
  http.open('get', url, true);
  http.onerror = function(e) {
    util.error('Error retrieving ID', e);
    var pathError = '';
    if (self.options.path === '/' && self.options.host !== util.CLOUD_HOST) {
      pathError = ' If you passed in a `path` to your self-hosted PeerServer, ' +
        'you\'ll also need to pass in that same path when creating a new ' +
        'Peer.';
    }
    self._abort('server-error', 'Could not get an ID from the server.' + pathError);
  };
  http.onreadystatechange = function() {
    if (http.readyState !== 4) {
      return;
    }
    if (http.status !== 200) {
      http.onerror();
      return;
    }
    self._initialize(http.responseText);
  };
  http.send(null);
};

/** Initialize a connection with the server. */
Peer.prototype._initialize = function(id) {
  this.id = id;
  this.socket.start(this.id, this.options.token);
};

/** Handles messages from the server. */
Peer.prototype._handleMessage = function(message) {
  var type = message.type;
  var payload = message.payload;
  var peer = message.src;
  var connection;

  switch (type) {
    case 'OPEN': // The connection to the server is open.
      this.emit('open', this.id);
      this.open = true;
      break;
    case 'ERROR': // Server error.
      this._abort('server-error', payload.msg);
      break;
    case 'ID-TAKEN': // The selected ID is taken.
      this._abort('unavailable-id', 'ID `' + this.id + '` is taken');
      break;
    case 'INVALID-KEY': // The given API key cannot be found.
      this._abort('invalid-key', 'API KEY "' + this.options.key + '" is invalid');
      break;

    //
    case 'LEAVE': // Another peer has closed its connection to this peer.
      util.log('Received leave message from', peer);
      this._cleanupPeer(peer);
      break;

    case 'EXPIRE': // The offer sent to a peer has expired without response.
      this.emitError('peer-unavailable', 'Could not connect to peer ' + peer);
      break;
    case 'OFFER': // we should consider switching this to CALL/CONNECT, but this is the least breaking option.
      var connectionId = payload.connectionId;
      connection = this.getConnection(peer, connectionId);

      if (connection) {
        util.warn('Offer received for existing Connection ID:', connectionId);
        //connection.handleMessage(message);
      } else {
        // Create a new connection.
        if (payload.type === 'media') {
          connection = new MediaConnection(peer, this, {
            connectionId: connectionId,
            _payload: payload,
            metadata: payload.metadata
          });
          this._addConnection(peer, connection);
          this.emit('call', connection);
        } else if (payload.type === 'data') {
          connection = new DataConnection(peer, this, {
            connectionId: connectionId,
            _payload: payload,
            metadata: payload.metadata,
            label: payload.label,
            serialization: payload.serialization,
            reliable: payload.reliable
          });
          this._addConnection(peer, connection);
          this.emit('connection', connection);
        } else {
          util.warn('Received malformed connection type:', payload.type);
          return;
        }
        // Find messages.
        var messages = this._getMessages(connectionId);
        for (var i = 0, ii = messages.length; i < ii; i += 1) {
          connection.handleMessage(messages[i]);
        }
      }
      break;
    default:
      if (!payload) {
        util.warn('You received a malformed message from ' + peer + ' of type ' + type);
        return;
      }

      var id = payload.connectionId;
      connection = this.getConnection(peer, id);

      if (connection && connection.pc) {
        // Pass it on.
        connection.handleMessage(message);
      } else if (id) {
        // Store for possible later use
        this._storeMessage(id, message);
      } else {
        util.warn('You received an unrecognized message:', message);
      }
      break;
  }
};

/** Stores messages without a set up connection, to be claimed later. */
Peer.prototype._storeMessage = function(connectionId, message) {
  if (!this._lostMessages[connectionId]) {
    this._lostMessages[connectionId] = [];
  }
  this._lostMessages[connectionId].push(message);
};

/** Retrieve messages from lost message store */
Peer.prototype._getMessages = function(connectionId) {
  var messages = this._lostMessages[connectionId];
  if (messages) {
    delete this._lostMessages[connectionId];
    return messages;
  } else {
    return [];
  }
};

/**
 * Returns a DataConnection to the specified peer. See documentation for a
 * complete list of options.
 */
Peer.prototype.connect = function(peer, options) {
  if (this.disconnected) {
    util.warn('You cannot connect to a new Peer because you called ' +
      '.disconnect() on this Peer and ended your connection with the ' +
      'server. You can create a new Peer to reconnect, or call reconnect ' +
      'on this peer if you believe its ID to still be available.');
    this.emitError('disconnected', 'Cannot connect to new Peer after disconnecting from server.');
    return;
  }
  var connection = new DataConnection(peer, this, options);
  this._addConnection(peer, connection);
  return connection;
};

/**
 * Returns a MediaConnection to the specified peer. See documentation for a
 * complete list of options.
 */
Peer.prototype.call = function(peer, stream, options) {
  if (this.disconnected) {
    util.warn('You cannot connect to a new Peer because you called ' +
      '.disconnect() on this Peer and ended your connection with the ' +
      'server. You can create a new Peer to reconnect.');
    this.emitError('disconnected', 'Cannot connect to new Peer after disconnecting from server.');
    return;
  }
  if (!stream) {
    util.error('To call a peer, you must provide a stream from your browser\'s `getUserMedia`.');
    return;
  }
  options = options || {};
  options._stream = stream;
  var call = new MediaConnection(peer, this, options);
  this._addConnection(peer, call);
  return call;
};

/** Add a data/media connection to this peer. */
Peer.prototype._addConnection = function(peer, connection) {
  if (!this.connections[peer]) {
    this.connections[peer] = [];
  }
  this.connections[peer].push(connection);
};

/** Retrieve a data/media connection for this peer. */
Peer.prototype.getConnection = function(peer, id) {
  var connections = this.connections[peer];
  if (!connections) {
    return null;
  }
  for (var i = 0, ii = connections.length; i < ii; i++) {
    if (connections[i].id === id) {
      return connections[i];
    }
  }
  return null;
};

Peer.prototype._delayedAbort = function(type, message) {
  var self = this;
  util.setZeroTimeout(function(){
    self._abort(type, message);
  });
};

/**
 * Destroys the Peer and emits an error message.
 * The Peer is not destroyed if it's in a disconnected state, in which case
 * it retains its disconnected state and its existing connections.
 */
Peer.prototype._abort = function(type, message) {
  util.error('Aborting!');
  if (!this._lastServerId) {
    this.destroy();
  } else {
    this.disconnect();
  }
  this.emitError(type, message);
};

/** Emits a typed error message. */
Peer.prototype.emitError = function(type, err) {
  util.error('Error:', err);
  if (typeof err === 'string') {
    err = new Error(err);
  }
  err.type = type;
  this.emit('error', err);
};

/**
 * Destroys the Peer: closes all active connections as well as the connection
 *  to the server.
 * Warning: The peer can no longer create or accept connections after being
 *  destroyed.
 */
Peer.prototype.destroy = function() {
  if (!this.destroyed) {
    this._cleanup();
    this.disconnect();
    this.destroyed = true;
  }
};


/** Disconnects every connection on this peer. */
Peer.prototype._cleanup = function() {
  if (this.connections) {
    var peers = Object.keys(this.connections);
    for (var i = 0, ii = peers.length; i < ii; i++) {
      this._cleanupPeer(peers[i]);
    }
  }
  this.emit('close');
};

/** Closes all connections to this peer. */
Peer.prototype._cleanupPeer = function(peer) {
  var connections = this.connections[peer];
  for (var j = 0, jj = connections.length; j < jj; j += 1) {
    connections[j].close();
  }
};

/**
 * Disconnects the Peer's connection to the PeerServer. Does not close any
 *  active connections.
 * Warning: The peer can no longer create or accept connections after being
 *  disconnected. It also cannot reconnect to the server.
 */
Peer.prototype.disconnect = function() {
  var self = this;
  util.setZeroTimeout(function(){
    if (!self.disconnected) {
      self.disconnected = true;
      self.open = false;
      if (self.socket) {
        self.socket.close();
      }
      self.emit('disconnected', self.id);
      self._lastServerId = self.id;
      self.id = null;
    }
  });
};

/** Attempts to reconnect with the same ID. */
Peer.prototype.reconnect = function() {
  if (this.disconnected && !this.destroyed) {
    util.log('Attempting reconnection to server with ID ' + this._lastServerId);
    this.disconnected = false;
    this._initializeServerConnection();
    this._initialize(this._lastServerId);
  } else if (this.destroyed) {
    throw new Error('This peer cannot reconnect to the server. It has already been destroyed.');
  } else if (!this.disconnected && !this.open) {
    // Do nothing. We're still connecting the first time.
    util.error('In a hurry? We\'re still trying to make the initial connection!');
  } else {
    throw new Error('Peer ' + this.id + ' cannot reconnect because it is not disconnected from the server!');
  }
};

/**
 * Get a list of available peer IDs. If you're running your own server, you'll
 * want to set allow_discovery: true in the PeerServer options. If you're using
 * the cloud server, email team@peerjs.com to get the functionality enabled for
 * your key.
 */
Peer.prototype.listAllPeers = function(cb) {
  cb = cb || function() {};
  var self = this;
  var http = new XMLHttpRequest();
  var protocol = this.options.secure ? 'https://' : 'http://';
  var url = protocol + this.options.host + ':' + this.options.port +
    this.options.path + this.options.key + '/peers';
  var queryString = '?ts=' + new Date().getTime() + '' + Math.random();
  url += queryString;

  // If there's no ID we need to wait for one before trying to init socket.
  http.open('get', url, true);
  http.onerror = function(e) {
    self._abort('server-error', 'Could not get peers from the server.');
    cb([]);
  };
  http.onreadystatechange = function() {
    if (http.readyState !== 4) {
      return;
    }
    if (http.status === 401) {
      var helpfulError = '';
      if (self.options.host !== util.CLOUD_HOST) {
        helpfulError = 'It looks like you\'re using the cloud server. You can email ' +
          'team@peerjs.com to enable peer listing for your API key.';
      } else {
        helpfulError = 'You need to enable `allow_discovery` on your self-hosted ' +
          'PeerServer to use this feature.';
      }
      cb([]);
      throw new Error('It doesn\'t look like you have permission to list peers IDs. ' + helpfulError);
    } else if (http.status !== 200) {
      cb([]);
    } else {
      cb(JSON.parse(http.responseText));
    }
  };
  http.send(null);
};

module.exports = Peer;


/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = {
	"name": "Classic",
	"cameraConstraints": [
		420,
		200
	],
	"teams": [
		{
			"name": "red",
			"color": "#e56e56",
			"kickOffPos": [
				-250,
				0
			]
		},
		{
			"name": "blue",
			"color": "#5689e5",
			"kickOffPos": [
				250,
				0
			]
		}
	],
	"player": {
		"acceleration": 0.1,
		"damping": 0.96,
		"kickingAcceleration": 0.07,
		"kickStrength": 4,
		"invMass": 0.5,
		"radius": 15
	},
	"backgrounds": [
		{
			"pos": [
				-370,
				-170
			],
			"width": 740,
			"height": 340,
			"type": "grass"
		}
	],
	"segments": [
		{
			"p0": [
				-370,
				-170
			],
			"p1": [
				-370,
				-64
			]
		},
		{
			"p0": [
				-370,
				64
			],
			"p1": [
				-370,
				170
			]
		},
		{
			"p0": [
				-370,
				-64
			],
			"p1": [
				-400,
				-64
			],
			"bounce": 0.2
		},
		{
			"p0": [
				-400,
				-64
			],
			"p1": [
				-400,
				64
			],
			"bounce": 0.2
		},
		{
			"p0": [
				-400,
				64
			],
			"p1": [
				-370,
				64
			],
			"bounce": 0.2
		},
		{
			"p0": [
				370,
				-170
			],
			"p1": [
				370,
				-64
			]
		},
		{
			"p0": [
				370,
				64
			],
			"p1": [
				370,
				170
			]
		},
		{
			"p0": [
				370,
				-64
			],
			"p1": [
				400,
				-64
			],
			"bounce": 0.2
		},
		{
			"p0": [
				400,
				-64
			],
			"p1": [
				400,
				64
			],
			"bounce": 0.2
		},
		{
			"p0": [
				400,
				64
			],
			"p1": [
				370,
				64
			],
			"bounce": 0.2
		},
		{
			"p0": [
				-370,
				-170
			],
			"p1": [
				370,
				-170
			]
		},
		{
			"p0": [
				-370,
				170
			],
			"p1": [
				370,
				170
			]
		}
	],
	"goals": [
		{
			"p0": [
				-370,
				-64
			],
			"p1": [
				-370,
				64
			],
			"teamScored": "blue"
		},
		{
			"p0": [
				370,
				-64
			],
			"p1": [
				370,
				64
			],
			"teamScored": "red"
		}
	],
	"discs": [
		{
			"pos": [
				0,
				0
			],
			"ball": true,
			"color": "#FFF",
			"damping": 0.99,
			"invMass": 1,
			"radius": 10
		},
		{
			"pos": [
				-370,
				64
			],
			"color": "#FFCCCC",
			"bounce": 0.5,
			"radius": 8,
			"invMass": 0
		},
		{
			"pos": [
				-370,
				-64
			],
			"color": "#FFCCCC",
			"bounce": 0.5,
			"radius": 8,
			"invMass": 0
		},
		{
			"pos": [
				370,
				64
			],
			"color": "#CCCCFF",
			"bounce": 0.5,
			"radius": 8,
			"invMass": 0
		},
		{
			"pos": [
				370,
				-64
			],
			"color": "#CCCCFF",
			"bounce": 0.5,
			"radius": 8,
			"invMass": 0
		}
	]
};

/***/ }),
/* 62 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_62__;

/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entities_Stadium__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stadiums_classic_json__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stadiums_classic_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__stadiums_classic_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stadiums_big_json__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stadiums_big_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__stadiums_big_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__GameCreator__ = __webpack_require__(68);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "GameCreator", function() { return __WEBPACK_IMPORTED_MODULE_3__GameCreator__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Renderer__ = __webpack_require__(35);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Renderer", function() { return __WEBPACK_IMPORTED_MODULE_4__Renderer__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__entities_Background__ = __webpack_require__(36);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Background", function() { return __WEBPACK_IMPORTED_MODULE_5__entities_Background__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__state_events__ = __webpack_require__(12);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "Events", function() { return __WEBPACK_IMPORTED_MODULE_6__state_events__; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultStadiums", function() { return defaultStadiums; });




let defaultStadiums = [];
defaultStadiums.push(__WEBPACK_IMPORTED_MODULE_0__entities_Stadium__["a" /* default */].parse(__WEBPACK_IMPORTED_MODULE_1__stadiums_classic_json___default.a));
defaultStadiums.push(__WEBPACK_IMPORTED_MODULE_0__entities_Stadium__["a" /* default */].parse(__WEBPACK_IMPORTED_MODULE_2__stadiums_big_json___default.a));









/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventAggregator = undefined;
exports.includeEventsIn = includeEventsIn;
exports.configure = configure;

var _aureliaLogging = __webpack_require__(65);

var LogManager = _interopRequireWildcard(_aureliaLogging);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }



var logger = LogManager.getLogger('event-aggregator');

var Handler = function () {
  function Handler(messageType, callback) {
    

    this.messageType = messageType;
    this.callback = callback;
  }

  Handler.prototype.handle = function handle(message) {
    if (message instanceof this.messageType) {
      this.callback.call(null, message);
    }
  };

  return Handler;
}();

function invokeCallback(callback, data, event) {
  try {
    callback(data, event);
  } catch (e) {
    logger.error(e);
  }
}

function invokeHandler(handler, data) {
  try {
    handler.handle(data);
  } catch (e) {
    logger.error(e);
  }
}

var EventAggregator = exports.EventAggregator = function () {
  function EventAggregator() {
    

    this.eventLookup = {};
    this.messageHandlers = [];
  }

  EventAggregator.prototype.publish = function publish(event, data) {
    var subscribers = void 0;
    var i = void 0;

    if (!event) {
      throw new Error('Event was invalid.');
    }

    if (typeof event === 'string') {
      subscribers = this.eventLookup[event];
      if (subscribers) {
        subscribers = subscribers.slice();
        i = subscribers.length;

        while (i--) {
          invokeCallback(subscribers[i], data, event);
        }
      }
    } else {
      subscribers = this.messageHandlers.slice();
      i = subscribers.length;

      while (i--) {
        invokeHandler(subscribers[i], event);
      }
    }
  };

  EventAggregator.prototype.subscribe = function subscribe(event, callback) {
    var handler = void 0;
    var subscribers = void 0;

    if (!event) {
      throw new Error('Event channel/type was invalid.');
    }

    if (typeof event === 'string') {
      handler = callback;
      subscribers = this.eventLookup[event] || (this.eventLookup[event] = []);
    } else {
      handler = new Handler(event, callback);
      subscribers = this.messageHandlers;
    }

    subscribers.push(handler);

    return {
      dispose: function dispose() {
        var idx = subscribers.indexOf(handler);
        if (idx !== -1) {
          subscribers.splice(idx, 1);
        }
      }
    };
  };

  EventAggregator.prototype.subscribeOnce = function subscribeOnce(event, callback) {
    var sub = this.subscribe(event, function (a, b) {
      sub.dispose();
      return callback(a, b);
    });

    return sub;
  };

  return EventAggregator;
}();

function includeEventsIn(obj) {
  var ea = new EventAggregator();

  obj.subscribeOnce = function (event, callback) {
    return ea.subscribeOnce(event, callback);
  };

  obj.subscribe = function (event, callback) {
    return ea.subscribe(event, callback);
  };

  obj.publish = function (event, data) {
    ea.publish(event, data);
  };

  return ea;
}

function configure(config) {
  config.instance(EventAggregator, includeEventsIn(config.aurelia));
}

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLogger = getLogger;
exports.addAppender = addAppender;
exports.setLevel = setLevel;
exports.getLevel = getLevel;



var logLevel = exports.logLevel = {
  none: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4
};

var loggers = {};
var appenders = [];
var slice = Array.prototype.slice;
var loggerConstructionKey = {};
var globalDefaultLevel = logLevel.none;

function log(logger, level, args) {
  var i = appenders.length;
  var current = void 0;

  args = slice.call(args);
  args.unshift(logger);

  while (i--) {
    current = appenders[i];
    current[level].apply(current, args);
  }
}

function debug() {
  if (this.level < 4) {
    return;
  }

  log(this, 'debug', arguments);
}

function info() {
  if (this.level < 3) {
    return;
  }

  log(this, 'info', arguments);
}

function warn() {
  if (this.level < 2) {
    return;
  }

  log(this, 'warn', arguments);
}

function error() {
  if (this.level < 1) {
    return;
  }

  log(this, 'error', arguments);
}

function connectLogger(logger) {
  logger.debug = debug;
  logger.info = info;
  logger.warn = warn;
  logger.error = error;
}

function createLogger(id) {
  var logger = new Logger(id, loggerConstructionKey);
  logger.setLevel(globalDefaultLevel);

  if (appenders.length) {
    connectLogger(logger);
  }

  return logger;
}

function getLogger(id) {
  return loggers[id] || (loggers[id] = createLogger(id));
}

function addAppender(appender) {
  appenders.push(appender);

  if (appenders.length === 1) {
    for (var key in loggers) {
      connectLogger(loggers[key]);
    }
  }
}

function setLevel(level) {
  globalDefaultLevel = level;
  for (var key in loggers) {
    loggers[key].setLevel(level);
  }
}

function getLevel() {
  return globalDefaultLevel;
}

var Logger = exports.Logger = function () {
  function Logger(id, key) {
    

    this.level = logLevel.none;

    if (key !== loggerConstructionKey) {
      throw new Error('Cannot instantiate "Logger". Use "getLogger" instead.');
    }

    this.id = id;
  }

  Logger.prototype.debug = function debug(message) {};

  Logger.prototype.info = function info(message) {};

  Logger.prototype.warn = function warn(message) {};

  Logger.prototype.error = function error(message) {};

  Logger.prototype.setLevel = function setLevel(level) {
    this.level = level;
  };

  return Logger;
}();

/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_victor__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_victor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_victor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__entities_Disc__ = __webpack_require__(10);



class Engine {
    constructor() {
        this.prevBallPositions = {};
    }

    setGame(game) {
        this.game = game;
    }

    run(state, events) {
        this.state = state;
        this.applyEvents(events);

        if (state.playing) {
            this.update();
        }
    }

    applyEvents(events) {
        for (let event of events) {
            event.apply(this.state, this.game);
        }
    }

    update() {
        let stadium = this.state.stadium;

        this.state.discs.forEach((disc, i) => {
            if (!disc.isBall) {
                let player = this.state.getPlayerFromDisc(disc.id);

                if (player) {
                    disc.kicking = player.keys.kick;

                    let accel = stadium.playerPhysics[disc.kicking ? 'kickingAcceleration' : 'acceleration'];
                    let move = new __WEBPACK_IMPORTED_MODULE_0_victor___default.a(0, 0);

                    if (player.keys.left) {
                        move.x -= 1;
                    }

                    if (player.keys.right) {
                        move.x += 1;
                    }

                    if (player.keys.up) {
                        move.y -= 1;
                    }

                    if (player.keys.down) {
                        move.y += 1;
                    }

                    if (move.x != 0 || move.y != 0) {
                        disc.velocity.add(move.normalize().multiplyScalar(accel));
                    }
                }
            }

            disc.position.add(disc.velocity);
            disc.velocity.multiplyScalar(disc.damping);
        });

        this.state.discs.sort((a, b) => {
            return a.isBall ? 1 : -1;
        });

        this.state.discs.forEach((disc, i1) => {
            this.state.discs.forEach((disc2, i2) => {
                if (disc2 == disc || i1 >= i2) {
                    return;
                }

                this.handleCircleCollision(disc, disc2);
            });

            this.state.stadium.segments.forEach(segment => {
                // quick hack until collision masks to prevent player/segment collision
                if (this.state.getPlayerFromDisc(disc.id)) {
                    return;
                }

                this.handleSegmentCollision(disc, segment);
            });

            if (disc.isBall) {
                this.state.stadium.goals.forEach(goal => {
                    if (this.checkGoal(disc, goal)) {
                        this.game.goalScored(goal, this.state);
                    }
                });

                this.prevBallPositions[disc.id] = disc.position.clone();
            }
        });

        this.game.update(this.state);
    }

    handleCircleCollision(disc, disc2) {
        let distSq = disc.position.distanceSq(disc2.position);

        if (disc2.isBall && disc.position.distance(disc2.position) <= disc.radius + disc2.radius + 4) {
            let player = this.state.getPlayerFromDisc(disc.id);

            if (player && player.keys.kick) {
                this.kick(disc, disc2);
                player.keys.kick = false;
                disc.kicking = false;
            }
        }

        if (distSq <= Math.pow(disc.radius + disc2.radius, 2)) {
            this.collideCircles(disc, disc2);
        }
    }

    collideCircles(disc, disc2) {
        let diff = disc.position.clone().subtract(disc2.position);
        let direction = diff.clone().normalize();
        let totalMass = disc.mass + disc2.mass;

        // reposition
        let total = disc.invMass + disc2.invMass;
        let overlap = disc.radius + disc2.radius - diff.length();
        let amount = overlap * (disc.invMass / total);

        disc.position.add(direction.clone().multiplyScalar(amount));
        disc2.position.subtract(direction.clone().multiplyScalar(overlap - amount));

        // bounce?
        let speedDiff = disc.velocity.clone().subtract(disc2.velocity);
        let dot = direction.dot(speedDiff);

        if (dot < 0) {
            let totalBounce = disc.bounce * disc2.bounce;
            let bounceDir = direction.clone().multiplyScalar(dot * (totalBounce + 1));

            let bounce1 = bounceDir.clone().multiplyScalar(disc.invMass / total);
            let bounce2 = bounceDir.clone().multiplyScalar(disc2.invMass / total);

            disc.velocity.subtract(bounce1);
            disc2.velocity.add(bounce2);
        }
    }

    kick(disc, ball) {
        let direction = ball.position.clone().subtract(disc.position).normalize();

        let force = direction.multiplyScalar(disc.kickStrength * ball.invMass);
        ball.velocity.add(force);
    }

    discDistanceToLine(disc, line) {
        let lineDist = line.p1.clone().subtract(line.p0);
        let discToLine = disc.position.clone().subtract(line.p0);

        if (discToLine.dot(lineDist) < 0) {
            return false;
        }

        if (discToLine.dot(lineDist) > 0) {
            discToLine = disc.position.clone().subtract(line.p1);
        }

        if (discToLine.dot(lineDist) >= 0) {
            return false;
        }

        let direction = lineDist.clone().normalize();
        let normal = new __WEBPACK_IMPORTED_MODULE_0_victor___default.a(-direction.y, direction.x);

        return [normal.dot(discToLine), normal];
    }

    handleSegmentCollision(disc, segment) {
        let result = this.discDistanceToLine(disc, segment);

        if (result === false) {
            return;
        }

        let [dist, normal] = result;

        // otherside
        if (dist < 0) {
            dist *= -1;
            normal.invert();
        }

        if (dist >= disc.radius) {
            return;
        }

        let sep = normal.clone().multiplyScalar(disc.radius - dist);
        disc.position.add(sep);

        let movement = normal.dot(disc.velocity);

        if (movement < 0) {
            let bounceFactor = movement * (disc.bounce * segment.bounce + 1);
            let bounce = normal.clone().multiplyScalar(bounceFactor);

            disc.velocity.subtract(bounce);
        }
    }

    checkGoal(ball, goal) {
        if (!this.prevBallPositions[ball.id]) {
            return false;
        }

        let distBall = this.discDistanceToLine(ball, goal);
        let prevPos = this.prevBallPositions[ball.id];
        let prevDist = this.discDistanceToLine(new __WEBPACK_IMPORTED_MODULE_1__entities_Disc__["a" /* default */](prevPos), goal);

        if (distBall === false || prevDist === false) {
            return false;
        }

        return prevDist[0] > 0 && distBall[0] < 0 || prevDist[0] < 0 && distBall[0] > 0;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Engine;


/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mainloop_js__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mainloop_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mainloop_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_victor__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_victor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_victor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_aurelia_event_aggregator__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_aurelia_event_aggregator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_aurelia_event_aggregator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Keyboard__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Renderer__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__state_State__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__state_events__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__entities_Disc__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__entities_Player__ = __webpack_require__(39);














class Game {

    constructor(simulator, renderer) {
        this.inited = false;
        this.me = {
            id: -1,
            name: '',
            avatar: ''
        };

        this.simulator = simulator;
        this.renderer = renderer;
        this.eventAggregator = new __WEBPACK_IMPORTED_MODULE_2_aurelia_event_aggregator__["EventAggregator"]();
    }

    setLocalPlayer(playerInfo) {
        if (this.inited) {
            throw new Error('Game already init');
        }

        this.me.name = playerInfo.name;
        this.me.avatar = playerInfo.avatar;
    }

    init() {
        if (this.inited || !this.network) {
            return;
        }

        this.setupLoop();
        this.startLoop();
        this.inited = true;
    }

    destroy() {
        if (!this.inited) {
            return;
        }

        this.stopLoop();
        this.inited = false;
    }

    initKeyboard(element) {
        if (!this.keyboard) {
            const handler = (key, state) => {
                let event = new __WEBPACK_IMPORTED_MODULE_6__state_events__["Keypress"](this.me.id, { key, state, clientId: this.me.id });
                this.addEvent(event);
            };

            this.keyboard = new __WEBPACK_IMPORTED_MODULE_3__Keyboard__["a" /* default */](handler);
        }

        this.keyboard.bindTo(element);
    }

    initRenderer() {
        if (this.renderer instanceof __WEBPACK_IMPORTED_MODULE_4__Renderer__["a" /* default */]) {
            this.renderer.render();
        }
    }

    start() {
        this.addEvent(new __WEBPACK_IMPORTED_MODULE_6__state_events__["StartGame"](this.me.id));
    }

    stop() {
        this.addEvent(new __WEBPACK_IMPORTED_MODULE_6__state_events__["StopGame"](this.me.id));
    }

    addEvent(event, send = true) {
        this.simulator.addEvent(event);

        if (send) {
            this.network.sendMsg(event.toMessage());
        }
    }

    initLocalPlayer() {
        let event = new __WEBPACK_IMPORTED_MODULE_6__state_events__["PlayerJoined"](this.me.id, {
            clientId: this.me.id,
            name: this.me.name,
            avatar: this.me.avatar
        });

        this.addEvent(event, false);
    }

    createPlayer(clientId, name) {
        return new __WEBPACK_IMPORTED_MODULE_8__entities_Player__["a" /* default */](clientId, name);
    }

    createPlayerDisc(player) {
        if (!player.team) {
            return;
        }

        let stadium = this.simulator.currentState.stadium;
        let team = stadium.getTeam(player.team);

        if (player.team === null || !team) {
            return;
        }

        let disc = new __WEBPACK_IMPORTED_MODULE_7__entities_Disc__["a" /* default */](new __WEBPACK_IMPORTED_MODULE_1_victor___default.a(0, 0), stadium.playerPhysics.radius, {
            color: team.color,
            damping: stadium.playerPhysics.damping,
            invMass: stadium.playerPhysics.invMass
        });

        disc.kickStrength = stadium.playerPhysics.kickStrength;
        disc.isMe = player.clientId == this.me.id;
        disc.text = player.avatar;

        return disc;
    }

    createPlayerDiscs(state) {
        let discs = [];

        for (let player of state.players) {
            let disc = this.createPlayerDisc(player);

            if (!disc) {
                return;
            }

            player.discId = disc.id;
            discs.push(disc);
        }

        state.addDiscs(discs);
    }

    kickOffState(state) {
        if (!state.playing) {
            return;
        }

        state.matchState = __WEBPACK_IMPORTED_MODULE_5__state_State__["a" /* default */].STATE_KICKOFF;

        this.setKickOffPositions(state);

        state.discs.filter(disc => disc.isBall).forEach(ball => {
            ball.position = new __WEBPACK_IMPORTED_MODULE_1_victor___default.a(0, 0);
            ball.velocity = new __WEBPACK_IMPORTED_MODULE_1_victor___default.a(0, 0);
        });
    }

    setKickOffPositions(state) {
        if (!state.playing) {
            return;
        }

        state.players.forEach(player => {
            let disc = state.getPlayerDisc(player);
            let team = state.stadium.getTeam(player.team);

            if (!disc || !team) {
                return;
            }

            disc.position = __WEBPACK_IMPORTED_MODULE_1_victor___default.a.fromArray(team.kickOffPos);
            disc.velocity = new __WEBPACK_IMPORTED_MODULE_1_victor___default.a(0, 0);
        });
    }

    goalScored(goal, state) {
        let team = state.stadium.getTeam(goal.teamScored);

        if (state.matchState != __WEBPACK_IMPORTED_MODULE_5__state_State__["a" /* default */].STATE_INPLAY || !team) {
            return;
        }

        state.scores.set(team.name, state.scores.get(team.name) + 1);
        state.matchState = __WEBPACK_IMPORTED_MODULE_5__state_State__["a" /* default */].STATE_GOALSCORED;
        state.matchStateTimer = 150;

        this.eventAggregator.publish('goalScored', { goal, state });
    }

    scoresEqual() {
        let state = this.simulator.currentState;

        let scores = state.stadium.teams.map(team => {
            return state.scores.get(team.name);
        });

        return scores.every(score => score == scores[0]);
    }

    update(state) {
        switch (state.matchState) {
            case __WEBPACK_IMPORTED_MODULE_5__state_State__["a" /* default */].STATE_KICKOFF:
                state.discs.filter(disc => disc.isBall).forEach(ball => {
                    if (ball.velocity.x != 0 || ball.velocity.y != 0) {
                        state.matchState = __WEBPACK_IMPORTED_MODULE_5__state_State__["a" /* default */].STATE_INPLAY;
                    }
                });

                break;

            case __WEBPACK_IMPORTED_MODULE_5__state_State__["a" /* default */].STATE_INPLAY:
                state.timer += 1 / 60;

                if (state.timer >= state.timeLimit * 60 && !this.scoresEqual()) {
                    state.matchState = __WEBPACK_IMPORTED_MODULE_5__state_State__["a" /* default */].STATE_ENDGAME;
                    state.matchStateTimer = 300;
                }

                break;

            case __WEBPACK_IMPORTED_MODULE_5__state_State__["a" /* default */].STATE_GOALSCORED:
                --state.matchStateTimer;

                if (state.matchStateTimer > 0) {
                    return;
                }

                if (state.timer >= state.timeLimit * 60 && !this.scoresEqual()) {
                    state.matchState = __WEBPACK_IMPORTED_MODULE_5__state_State__["a" /* default */].STATE_ENDGAME;
                    state.matchStateTimer = 300;
                    return;
                }

                for (let team of state.stadium.teams) {
                    let score = state.scores.get(team.name);

                    if (score && score >= state.scoreLimit) {
                        state.matchState = __WEBPACK_IMPORTED_MODULE_5__state_State__["a" /* default */].STATE_ENDGAME;
                        state.matchStateTimer = 300;
                        return;
                    }
                }

                state.matchState = __WEBPACK_IMPORTED_MODULE_5__state_State__["a" /* default */].STATE_KICKOFF;
                this.kickOffState(state);

                break;

            case __WEBPACK_IMPORTED_MODULE_5__state_State__["a" /* default */].STATE_ENDGAME:
                --state.matchStateTimer;

                if (state.matchStateTimer <= 0) {
                    this.stop();
                }

                break;
        }
    }

    setupLoop() {
        __WEBPACK_IMPORTED_MODULE_0_mainloop_js___default.a.setUpdate(() => {
            this.simulator.advance();
        });

        __WEBPACK_IMPORTED_MODULE_0_mainloop_js___default.a.setDraw(() => {
            if (this.renderer) {
                this.renderer.draw(this.simulator.currentState);
            }
        });
    }

    startLoop() {
        __WEBPACK_IMPORTED_MODULE_0_mainloop_js___default.a.start();
    }

    stopLoop() {
        __WEBPACK_IMPORTED_MODULE_0_mainloop_js___default.a.stop();
    }

    get state() {
        return this.simulator.currentState;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Game;


/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Game__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Engine__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__entities_Stadium__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__network_Host__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__network_Client__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__state_Simulator__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__state_State__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__stadiums_classic_json__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__stadiums_classic_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__stadiums_classic_json__);










const createGame = renderer => {
    const engine = new __WEBPACK_IMPORTED_MODULE_1__Engine__["a" /* default */]();
    const simulator = new __WEBPACK_IMPORTED_MODULE_5__state_Simulator__["a" /* default */](engine);

    const game = new __WEBPACK_IMPORTED_MODULE_0__Game__["a" /* default */](simulator, renderer);
    engine.setGame(game);

    const state = __WEBPACK_IMPORTED_MODULE_6__state_State__["a" /* default */].createFromStadium(__WEBPACK_IMPORTED_MODULE_2__entities_Stadium__["a" /* default */].parse(__WEBPACK_IMPORTED_MODULE_7__stadiums_classic_json___default.a));
    simulator.addState(state);

    return game;
};

const GameCreator = {
    host(renderer) {
        const game = createGame(renderer);
        const network = new __WEBPACK_IMPORTED_MODULE_3__network_Host__["a" /* default */](game);

        network.peer.on('open', () => {
            game.initLocalPlayer();
            game.init();
        });

        return game;
    },

    join(host, renderer) {
        const game = createGame(renderer);
        const network = new __WEBPACK_IMPORTED_MODULE_4__network_Client__["a" /* default */](game);
        network.connectTo(host);

        return game;
    }
};

/* harmony default export */ __webpack_exports__["a"] = GameCreator;

/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const keyCodes = {
    [37]: 'left',
    [38]: 'up',
    [39]: 'right',
    [40]: 'down',
    [32]: 'kick',
    [88]: 'kick'
};

class Keyboard {

    constructor(callback) {
        _initialiseProps.call(this);

        this.callback = callback;

        this.keyDownHandler = e => {
            this.setKey(e, true);
        };

        this.keyUpHandler = e => {
            this.setKey(e, false);
        };
    }

    bindTo(element) {
        if (this.element) {
            this.unBind();
        }

        this.element = element;
        element.addEventListener('keydown', this.keyDownHandler);
        element.addEventListener('keyup', this.keyUpHandler);
    }

    unBind() {
        const element = this.element;

        if (!element) {
            return;
        }

        element.removeEventListener('keydown', this.keyDownHandler);
        element.removeEventListener('keyup', this.keyUpHandler);
        this.element = null;
    }

    setKey(e, state) {
        if (!keyCodes[e.keyCode]) {
            return;
        }

        let key = this.codeToKey(e.keyCode);
        e.preventDefault();

        if (typeof this.keyDown[key] != 'undefined' && this.keyDown[key] !== state) {
            this.keyDown[key] = state;
            this.callback(key, state);
        }
    }

    codeToKey(code) {
        return keyCodes[code];
    }

    isDown(key) {
        return this.keyDown[key];
    }

    isUp(key) {
        return !this.isDown(key);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Keyboard;


var _initialiseProps = function () {
    this.keyDown = {
        up: false,
        down: false,
        left: false,
        right: false,
        kick: false
    };
};

/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class Base {

    constructor(position) {
        this.position = position;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Base;


/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_victor__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_victor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_victor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Line__ = __webpack_require__(38);



class Goal extends __WEBPACK_IMPORTED_MODULE_1__Line__["a" /* default */] {

    constructor(p0, p1, teamScored) {
        super(p0, p1);
        this.teamScored = teamScored;
    }

    clone() {
        return new Goal(this.p0.clone(), this.p1.clone(), this.teamScored);
    }

    pack() {
        return {
            p0: this.p0.toArray(),
            p1: this.p1.toArray(),
            teamScored: this.teamScored
        };
    }

    static parse(obj) {
        return new Goal(__WEBPACK_IMPORTED_MODULE_0_victor___default.a.fromArray(obj.p0), __WEBPACK_IMPORTED_MODULE_0_victor___default.a.fromArray(obj.p1), obj.teamScored);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Goal;


/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_peerjs__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_peerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_peerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Base__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__state_events__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__state_State__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__entities_Disc__ = __webpack_require__(10);








let msgHandlers = {
    init(msg) {
        let state = __WEBPACK_IMPORTED_MODULE_4__state_State__["a" /* default */].parse(msg.state);

        __WEBPACK_IMPORTED_MODULE_5__entities_Disc__["a" /* default */].nextDiscId = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.max(state.discs, disc => disc.id).id + 1;

        this.game.simulator.resetState(state);
        let newState = this.game.simulator.advance();

        let player = newState.getPlayerById(msg.id);
        let myDisc = newState.getPlayerDisc(player);

        if (myDisc) {
            myDisc.isMe = true;
        }

        this.game.me.id = player.clientId;
        this.game.init();
        this.game.initRenderer();
    },

    sync(msg) {
        let currentFrame = this.game.simulator.currentFrame;

        // if sync state is earlier than the last synced state, we can ignore it
        if (msg.state.frame <= this.lastSyncFrame) {
            console.log('frame earlier than last sync');
            return;
        }

        // if sync state is before the current state we need to check if we have the states
        // after it so we can simulate forward again (ie oldest state should at least be the one after)
        if (msg.state.frame < currentFrame && this.game.simulator.oldestFrame > msg.state.frame + 1) {
            console.log('sync frame too far behind', currentFrame, msg.state.frame);
            return;
        }

        let predictedState = this.game.simulator.findStateFromFrame(msg.state.frame);

        /*if (predictedState) {
            msg.state.events = msg.state.events.concat(predictedState.events.map(event => event.pack()));
        }*/

        let syncState = __WEBPACK_IMPORTED_MODULE_4__state_State__["a" /* default */].parse(msg.state);
        this.game.simulator.resetState(syncState);
        this.lastSyncFrame = msg.state.frame;

        if (currentFrame > msg.state.frame) {
            this.game.simulator.fastForward(currentFrame);
        }
    },

    event(msg) {
        let event = __WEBPACK_IMPORTED_MODULE_3__state_events__[msg.event.eventType].parse(msg.event.sender, msg.event.data);
        event.frame = msg.event.frame;

        if (event.frame >= this.game.simulator.currentFrame) {
            this.game.simulator.addEvent(event, event.frame);
        } else if (this.game.simulator.hasFrameInHistory(event.frame)) {
            let currentFrame = this.game.simulator.currentFrame;

            this.game.simulator.rewind(event.frame);
            this.game.simulator.addEvent(event);
            this.game.simulator.fastForward(currentFrame);
        }
    }
};

class Client extends __WEBPACK_IMPORTED_MODULE_2__Base__["a" /* default */] {

    constructor(game) {
        super();
        this.name = 'sock';
        this.lastSyncFrame = 0;
        this.game = game;
        game.network = this;

        let ident = Math.random().toString(36).substring(7);
        this.peer = new __WEBPACK_IMPORTED_MODULE_1_peerjs___default.a(ident, { host: 'localhost', path: '/p2p' });
    }

    connectTo(host) {
        this.hostConn = this.peer.connect(host);
        this.hostConn.on('data', this.handleMsg.bind(this));

        this.hostConn.on('close', () => {
            this.game.destroy();
        });
    }

    handleMsg(msg) {
        if (!msgHandlers[msg.type] || typeof msgHandlers[msg.type] !== 'function') {
            throw new Error('Invalid msg type recieved: ' + msg.type);
        }

        msgHandlers[msg.type].call(this, msg);
    }

    sendMsg(msg) {
        this.hostConn.send(msg);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Client;


/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_peerjs__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_peerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_peerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Base__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__state_events__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__state_events_PlayerJoined__ = __webpack_require__(42);






class Host extends __WEBPACK_IMPORTED_MODULE_1__Base__["a" /* default */] {

    constructor(game) {
        super();
        this.clients = [];
        this.nextClientId = 0;
        this.nextSync = null;
        this.syncInterval = 1000 / 10;
        this.game = game;
        game.network = this;

        this.peer = new __WEBPACK_IMPORTED_MODULE_0_peerjs___default.a('host', { host: 'localhost', path: '/p2p' });
        this.peer.on('connection', this.handleConnection.bind(this));

        // this.nextSync = setInterval(this.sendSync.bind(this), this.syncInterval);
    }

    handleConnection(conn) {
        conn.on('open', () => {
            let client = new Client(this.nextClientId++, conn, this.game);
            conn.client = client;
            this.clients.push(client);

            let event = new __WEBPACK_IMPORTED_MODULE_3__state_events_PlayerJoined__["a" /* default */](this.game.me.id, {
                clientId: client.id,
                name: 'sock',
                avatar: ':)'
            });

            this.game.simulator.addEvent(event);

            conn.send({
                type: 'init',
                id: client.id,
                state: this.game.simulator.currentState.pack()
            });

            this.sendMsg(event.toMessage(), client);
        });
    }

    sendMsg(msg, excludeClient) {
        for (let client of this.clients) {
            if (!excludeClient || client !== excludeClient) {
                client.conn.send(msg);
            }
        }
    }

    sendSync() {
        if (!this.game.playing) {
            return;
        }

        let msg = {
            type: 'sync',
            state: this.game.simulator.currentState.pack()
        };

        this.sendMsg(msg);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Host;


let msgHandlers = {
    event(msg) {
        let event = __WEBPACK_IMPORTED_MODULE_2__state_events__[msg.event.eventType].parse(msg.event.sender, msg.event.data);
        event.frame = msg.event.frame;

        if (event instanceof __WEBPACK_IMPORTED_MODULE_2__state_events__["Keypress"]) {
            event.data.clientId = this.id;
        }

        if (event.frame >= this.game.simulator.currentFrame) {
            this.game.simulator.addEvent(event, event.frame);
        } else if (this.game.simulator.hasFrameInHistory(event.frame)) {
            let currentFrame = this.game.simulator.currentState.frame;

            this.game.stopLoop();
            this.game.simulator.rewind(event.frame);
            this.game.simulator.addEvent(event);
            this.game.simulator.fastForward(currentFrame);
            this.game.startLoop();
        }
    }
};

class Client {

    constructor(id, conn, game) {
        this.id = id;
        this.conn = conn;
        this.game = game;

        conn.on('data', this.handleMsg.bind(this));
    }

    handleMsg(msg) {
        if (!msgHandlers[msg.type] || typeof msgHandlers[msg.type] !== 'function') {
            throw new Error('Invalid msg type recieved: ' + msg.type);
        }

        msgHandlers[msg.type].call(this, msg);
    }
}

/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__State__ = __webpack_require__(11);



class Simulator {

    constructor(engine) {
        this.maxStatesToRemember = 120;
        this.futureEvents = [];
        this.states = [];

        this.engine = engine;
    }

    advance() {
        let newState = this.currentState.clone();
        newState.events = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.remove(this.futureEvents, { frame: ++newState.frame });

        let events = this.currentState.events;
        this.states.unshift(newState);
        this.engine.run(newState, events);

        if (this.states.length > this.maxStatesToRemember) {
            this.states.splice(this.maxStatesToRemember, this.states.length);
        }

        return newState;
    }

    fastForward(frame) {
        while (this.currentFrame < frame) {
            this.advance();
        }
    }

    rewind(frame) {
        let index = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.findIndex(this.states, { frame });
        this.states.splice(0, index);
    }

    resetState(state) {
        if (this.currentState && state.frame < this.currentFrame) {
            this.states.forEach(state => {
                this.futureEvents = this.futureEvents.concat(state.events);
            });
        }

        this.states.length = 0;
        this.states.unshift(state);
    }

    clear() {
        this.states.length = 0;
        this.futureEvents.length = 0;
    }

    addEvent(event, frame) {
        if (!frame || frame === this.currentFrame) {
            event.frame = this.currentFrame;
            this.currentState.events.push(event);
            return;
        }

        if (frame > this.currentFrame) {
            event.frame = frame;
            this.futureEvents.push(event);
            return;
        }

        throw new Error('Trying to add event to past frame');
    }

    findStateFromFrame(frame) {
        return this.states.find(state => state.frame == frame);
    }

    hasFrameInHistory(frame) {
        let state = this.findStateFromFrame(frame);
        return typeof state !== 'undefined';
    }

    addState(state) {
        this.states.unshift(state);
    }

    get currentState() {
        return this.states[0] || new __WEBPACK_IMPORTED_MODULE_1__State__["a" /* default */]();
    }

    get currentFrame() {
        return this.currentState.frame;
    }

    get oldestFrame() {
        return this.states[this.states.length - 1].frame;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Simulator;


/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Event__ = __webpack_require__(0);


class ChangeRoomName extends __WEBPACK_IMPORTED_MODULE_0__Event__["a" /* default */] {

    constructor(sender, data) {
        super(sender);
        this.type = 'ChangeRoomName';
        this.data = data;
    }

    apply(state, game) {
        state.roomName = this.data.name;
        game.eventAggregator.publish(this);
    }

    static parse(sender, data) {
        return new ChangeRoomName(sender, data);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ChangeRoomName;


/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Event__ = __webpack_require__(0);


class ChangeScoreLimit extends __WEBPACK_IMPORTED_MODULE_0__Event__["a" /* default */] {

    constructor(sender, data) {
        super(sender);
        this.type = 'ChangeScoreLimit';
        this.data = data;
    }

    apply(state, game) {
        state.scoreLimit = this.data.limit;
        game.eventAggregator.publish(this);
    }

    static parse(sender, data) {
        return new ChangeScoreLimit(sender, data);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ChangeScoreLimit;


/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Event__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__entities_Stadium__ = __webpack_require__(19);



class ChangeStadium extends __WEBPACK_IMPORTED_MODULE_0__Event__["a" /* default */] {

    constructor(sender, data) {
        super(sender);
        this.type = 'ChangeStadium';
        this.data = data;
    }

    apply(state, game) {
        if (state.playing) {
            throw new Error('Cant change stadium while game playing');
        }

        state.stadium = this.data.stadium;
        state.discs = this.data.stadium.discs.map(disc => disc.clone());
        state.initScores();

        this.stadium = this.data.stadium;
        game.eventAggregator.publish(this);
    }

    getData() {
        return { stadium: this.data.stadium.pack() };
    }

    static parse(sender, data) {
        let stadium = __WEBPACK_IMPORTED_MODULE_1__entities_Stadium__["a" /* default */].parse(data.stadium);
        return new ChangeStadium(sender, { stadium });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ChangeStadium;


/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Event__ = __webpack_require__(0);


class ChangeTeam extends __WEBPACK_IMPORTED_MODULE_0__Event__["a" /* default */] {

    constructor(sender, data) {
        super(sender);
        this.type = 'ChangeTeam';
        this.data = data;
    }

    apply(state, game) {
        let player = state.getPlayerById(this.data.clientId);

        if (!player) {
            return;
        }

        this.player = player;
        let currentDisc = state.getPlayerDisc(this.player);
        let team = state.stadium.getTeam(this.data.team);

        // check team exists if not specs
        if (this.data.team !== null && !state.stadium.getTeam(this.data.team)) {
            return;
        }

        // player already on team?
        if (this.player.team === this.data.team) {
            return;
        }

        this.player.team = this.data.team;

        if (currentDisc) {
            state.removeDisc(currentDisc);
            this.player.discId = null;
        }

        if (state.playing && this.data.team !== null) {
            let disc = game.createPlayerDisc(this.player);

            if (disc) {
                this.player.discId = disc.id;
                state.addDisc(disc);
            }
        }

        game.eventAggregator.publish(this);
    }

    static parse(sender, data) {
        return new ChangeTeam(sender, data);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ChangeTeam;


/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Event__ = __webpack_require__(0);


class ChangeTimeLimit extends __WEBPACK_IMPORTED_MODULE_0__Event__["a" /* default */] {

    constructor(sender, data) {
        super(sender);
        this.type = 'ChangeTimeLimit';
        this.data = data;
    }

    apply(state, game) {
        state.timeLimit = this.data.limit;
        game.eventAggregator.publish(this);
    }

    static parse(sender, data) {
        return new ChangeTimeLimit(sender, data);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ChangeTimeLimit;


/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Event__ = __webpack_require__(0);


class Keypress extends __WEBPACK_IMPORTED_MODULE_0__Event__["a" /* default */] {

    constructor(sender, data) {
        super(sender);
        this.type = 'Keypress';
        this.data = data;
    }

    apply(state, game) {
        let player = state.getPlayerById(this.data.clientId);

        if (!player) {
            throw new Error();
        }

        player.keys[this.data.key] = this.data.state;
    }

    static parse(sender, data) {
        return new Keypress(sender, data);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Keypress;


/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Event__ = __webpack_require__(0);


class PlayerAdmin extends __WEBPACK_IMPORTED_MODULE_0__Event__["a" /* default */] {

    constructor(sender, data) {
        super(sender);
        this.type = 'PlayerAdmin';
        this.data = data;
    }

    apply(state, game) {
        if (this.data.player === -1) {
            throw new Error('Cant change admin of host');
        }

        let player = state.getPlayerById(this.data.player);

        if (!player) {
            throw new Error(`Invalid player ${ this.data.player }`);
        }

        player.admin = this.data.isAdmin;

        game.eventAggregator.publish(this);
    }

    static parse(sender, data) {
        return new PlayerAdmin(sender, data);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PlayerAdmin;


/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Event__ = __webpack_require__(0);


class PlayerAvatar extends __WEBPACK_IMPORTED_MODULE_0__Event__["a" /* default */] {

    constructor(sender, data) {
        super(sender);
        this.type = 'PlayerAvatar';
        this.data = data;
    }

    apply(state, game) {
        let player = state.getPlayerById(this.sender);

        if (!player) {
            throw new Error(`Can't set avatar for player ${ this.sender }`);
        }

        player.setAvatar(this.data.avatar);
        let disc = state.getPlayerDisc(player);

        if (disc) {
            disc.text = player.avatar;
        }

        game.eventAggregator.publish(this);
    }

    static parse(sender, data) {
        return new PlayerAvatar(sender, data);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PlayerAvatar;


/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Event__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__entities_ChatMessage__ = __webpack_require__(37);



class PlayerChat extends __WEBPACK_IMPORTED_MODULE_0__Event__["a" /* default */] {

    constructor(sender, data) {
        super(sender);
        this.type = 'PlayerChat';
        this.data = data;
    }

    apply(state, game) {
        this.message = new __WEBPACK_IMPORTED_MODULE_1__entities_ChatMessage__["a" /* default */](this.sender, this.data.message);
        state.addChatMessage(this.message);

        game.eventAggregator.publish(this);
    }

    static parse(sender, data) {
        return new PlayerChat(sender, data);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PlayerChat;


/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Event__ = __webpack_require__(0);


class StartGame extends __WEBPACK_IMPORTED_MODULE_0__Event__["a" /* default */] {
    constructor(...args) {
        var _temp;

        return _temp = super(...args), this.type = 'StartGame', _temp;
    }

    apply(state, game) {
        if (state.playing) {
            return;
        }

        state.initScores();
        state.playing = true;
        state.timer = 0;

        game.initRenderer();
        game.createPlayerDiscs(state);
        game.kickOffState(state);

        game.eventAggregator.publish(this);
    }

    static parse(sender) {
        return new StartGame(sender);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StartGame;


/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Event__ = __webpack_require__(0);


class StopGame extends __WEBPACK_IMPORTED_MODULE_0__Event__["a" /* default */] {
    constructor(...args) {
        var _temp;

        return _temp = super(...args), this.type = 'StopGame', _temp;
    }

    apply(state, game) {
        if (!state.playing) {
            return;
        }

        state.playing = false;

        for (let player of state.players) {
            let disc = state.getPlayerDisc(player);

            if (disc) {
                state.removeDisc(disc);
            }
        }

        game.eventAggregator.publish(this);
    }

    static parse(sender) {
        return new StopGame(sender);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StopGame;


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(90), __esModule: true };

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(91), __esModule: true };

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(92), __esModule: true };

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(93), __esModule: true };

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(56);
__webpack_require__(123);
module.exports = __webpack_require__(5).Array.from;

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(128);
__webpack_require__(56);
__webpack_require__(130);
__webpack_require__(125);
__webpack_require__(129);
module.exports = __webpack_require__(5).Map;

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(126);
module.exports = __webpack_require__(5).Math.sign;

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(127);
module.exports = __webpack_require__(5).Object.assign;

/***/ }),
/* 94 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 95 */
/***/ (function(module, exports) {

module.exports = function(){ /* empty */ };

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(26);

module.exports = function(iter, ITERATOR){
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(33)
  , toLength  = __webpack_require__(21)
  , toIndex   = __webpack_require__(121);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx      = __webpack_require__(14)
  , IObject  = __webpack_require__(27)
  , toObject = __webpack_require__(22)
  , toLength = __webpack_require__(21)
  , asc      = __webpack_require__(100);
module.exports = function(TYPE, $create){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
    , create        = $create || asc;
  return function($this, callbackfn, that){
    var O      = toObject($this)
      , self   = IObject(O)
      , f      = ctx(callbackfn, that, 3)
      , length = toLength(self.length)
      , index  = 0
      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
      , val, res;
    for(;length > index; index++)if(NO_HOLES || index in self){
      val = self[index];
      res = f(val, index, O);
      if(TYPE){
        if(IS_MAP)result[index] = res;            // map
        else if(res)switch(TYPE){
          case 3: return true;                    // some
          case 5: return val;                     // find
          case 6: return index;                   // findIndex
          case 2: result.push(val);               // filter
        } else if(IS_EVERY)return false;          // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(9)
  , isArray  = __webpack_require__(107)
  , SPECIES  = __webpack_require__(1)('species');

module.exports = function(original){
  var C;
  if(isArray(original)){
    C = original.constructor;
    // cross-realm fallback
    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
    if(isObject(C)){
      C = C[SPECIES];
      if(C === null)C = undefined;
    }
  } return C === undefined ? Array : C;
};

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(99);

module.exports = function(original, length){
  return new (speciesConstructor(original))(length);
};

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP          = __webpack_require__(3).f
  , create      = __webpack_require__(51)
  , redefineAll = __webpack_require__(53)
  , ctx         = __webpack_require__(14)
  , anInstance  = __webpack_require__(43)
  , defined     = __webpack_require__(20)
  , forOf       = __webpack_require__(26)
  , $iterDefine = __webpack_require__(28)
  , step        = __webpack_require__(49)
  , setSpecies  = __webpack_require__(119)
  , DESCRIPTORS = __webpack_require__(6)
  , fastKey     = __webpack_require__(50).fastKey
  , SIZE        = DESCRIPTORS ? '_s' : 'size';

var getEntry = function(that, key){
  // fast case
  var index = fastKey(key), entry;
  if(index !== 'F')return that._i[index];
  // frozen object case
  for(entry = that._f; entry; entry = entry.n){
    if(entry.k == key)return entry;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear(){
        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
          entry.r = true;
          if(entry.p)entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function(key){
        var that  = this
          , entry = getEntry(that, key);
        if(entry){
          var next = entry.n
            , prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if(prev)prev.n = next;
          if(next)next.p = prev;
          if(that._f == entry)that._f = next;
          if(that._l == entry)that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /*, that = undefined */){
        anInstance(this, C, 'forEach');
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
          , entry;
        while(entry = entry ? entry.n : this._f){
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while(entry && entry.r)entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key){
        return !!getEntry(this, key);
      }
    });
    if(DESCRIPTORS)dP(C.prototype, 'size', {
      get: function(){
        return defined(this[SIZE]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var entry = getEntry(that, key)
      , prev, index;
    // change existing entry
    if(entry){
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if(!that._f)that._f = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      // add to index
      if(index !== 'F')that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function(C, NAME, IS_MAP){
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function(iterated, kind){
      this._t = iterated;  // target
      this._k = kind;      // kind
      this._l = undefined; // previous
    }, function(){
      var that  = this
        , kind  = that._k
        , entry = that._l;
      // revert to the last existing entry
      while(entry && entry.r)entry = entry.p;
      // get next entry
      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if(kind == 'keys'  )return step(0, entry.k);
      if(kind == 'values')return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(44)
  , from    = __webpack_require__(96);
module.exports = function(NAME){
  return function toJSON(){
    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global         = __webpack_require__(2)
  , $export        = __webpack_require__(8)
  , meta           = __webpack_require__(50)
  , fails          = __webpack_require__(15)
  , hide           = __webpack_require__(7)
  , redefineAll    = __webpack_require__(53)
  , forOf          = __webpack_require__(26)
  , anInstance     = __webpack_require__(43)
  , isObject       = __webpack_require__(9)
  , setToStringTag = __webpack_require__(30)
  , dP             = __webpack_require__(3).f
  , each           = __webpack_require__(98)(0)
  , DESCRIPTORS    = __webpack_require__(6);

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  if(!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
    new C().entries().next();
  }))){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    C = wrapper(function(target, iterable){
      anInstance(target, C, NAME, '_c');
      target._c = new Base;
      if(iterable != undefined)forOf(iterable, IS_MAP, target[ADDER], target);
    });
    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','),function(KEY){
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if(KEY in proto && !(IS_WEAK && KEY == 'clear'))hide(C.prototype, KEY, function(a, b){
        anInstance(this, C, KEY);
        if(!IS_ADDER && IS_WEAK && !isObject(a))return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    if('size' in proto)dP(C.prototype, 'size', {
      get: function(){
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(3)
  , createDesc      = __webpack_require__(29);

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2).document && document.documentElement;

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(6) && !__webpack_require__(15)(function(){
  return Object.defineProperty(__webpack_require__(45)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(25);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(51)
  , descriptor     = __webpack_require__(29)
  , setToStringTag = __webpack_require__(30)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(7)(IteratorPrototype, __webpack_require__(1)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR     = __webpack_require__(1)('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};

/***/ }),
/* 110 */
/***/ (function(module, exports) {

module.exports = true;

/***/ }),
/* 111 */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x){
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(52)
  , gOPS     = __webpack_require__(114)
  , pIE      = __webpack_require__(117)
  , toObject = __webpack_require__(22)
  , IObject  = __webpack_require__(27)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(15)(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(3)
  , anObject = __webpack_require__(13)
  , getKeys  = __webpack_require__(52);

module.exports = __webpack_require__(6) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 114 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(16)
  , toObject    = __webpack_require__(22)
  , IE_PROTO    = __webpack_require__(31)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(16)
  , toIObject    = __webpack_require__(33)
  , arrayIndexOf = __webpack_require__(97)(false)
  , IE_PROTO     = __webpack_require__(31)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 117 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global      = __webpack_require__(2)
  , core        = __webpack_require__(5)
  , dP          = __webpack_require__(3)
  , DESCRIPTORS = __webpack_require__(6)
  , SPECIES     = __webpack_require__(1)('species');

module.exports = function(KEY){
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(32)
  , defined   = __webpack_require__(20);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(32)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(9);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx            = __webpack_require__(14)
  , $export        = __webpack_require__(8)
  , toObject       = __webpack_require__(22)
  , call           = __webpack_require__(48)
  , isArrayIter    = __webpack_require__(47)
  , toLength       = __webpack_require__(21)
  , createProperty = __webpack_require__(104)
  , getIterFn      = __webpack_require__(55);

$export($export.S + $export.F * !__webpack_require__(109)(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(95)
  , step             = __webpack_require__(49)
  , Iterators        = __webpack_require__(17)
  , toIObject        = __webpack_require__(33);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(28)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(101);

// 23.1 Map Objects
module.exports = __webpack_require__(103)('Map', function(get){
  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key){
    var entry = strong.getEntry(this, key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value){
    return strong.def(this, key === 0 ? 0 : key, value);
  }
}, strong, true);

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(8);

$export($export.S, 'Math', {sign: __webpack_require__(111)});

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(8);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(112)});

/***/ }),
/* 128 */
/***/ (function(module, exports) {



/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = __webpack_require__(8);

$export($export.P + $export.R, 'Map', {toJSON: __webpack_require__(102)('Map')});

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(124);
var global        = __webpack_require__(2)
  , hide          = __webpack_require__(7)
  , Iterators     = __webpack_require__(17)
  , TO_STRING_TAG = __webpack_require__(1)('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * mainloop.js 1.0.3-20160320
 *
 * @author Isaac Sukin (http://www.isaacsukin.com/)
 * @license MIT
 */

!function(a){function b(a){if(v=o(b),!(e+j>a)){for(d+=a-e,e=a,r(a,d),a>g+1e3&&(f=.25*h+.75*f,g=a,h=0),h++,i=0;d>=c;)if(s(c),d-=c,++i>=240){m=!0;break}t(d/c),u(f,m),m=!1}}var c=1e3/60,d=0,e=0,f=60,g=0,h=0,i=0,j=0,k=!1,l=!1,m=!1,n="object"==typeof window?window:a,o=n.requestAnimationFrame||function(){var a=Date.now(),b,d;return function(e){return b=Date.now(),d=Math.max(0,c-(b-a)),a=b+d,setTimeout(function(){e(b+d)},d)}}(),p=n.cancelAnimationFrame||clearTimeout,q=function(){},r=q,s=q,t=q,u=q,v;a.MainLoop={getSimulationTimestep:function(){return c},setSimulationTimestep:function(a){return c=a,this},getFPS:function(){return f},getMaxAllowedFPS:function(){return 1e3/j},setMaxAllowedFPS:function(a){return"undefined"==typeof a&&(a=1/0),0===a?this.stop():j=1e3/a,this},resetFrameDelta:function(){var a=d;return d=0,a},setBegin:function(a){return r=a||r,this},setUpdate:function(a){return s=a||s,this},setDraw:function(a){return t=a||t,this},setEnd:function(a){return u=a||u,this},start:function(){return l||(l=!0,v=o(function(a){t(1),k=!0,e=a,g=a,h=0,v=o(b)})),this},stop:function(){return k=!1,l=!1,p(v),this},isRunning:function(){return k}}, true?!(__WEBPACK_AMD_DEFINE_FACTORY__ = (a.MainLoop),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"object"==typeof module&&null!==module&&"object"==typeof module.exports&&(module.exports=a.MainLoop)}(this);
//# sourceMappingURL=mainloop.min.js.map

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(18);
var EventEmitter = __webpack_require__(23);
var Negotiator = __webpack_require__(59);
var Reliable = __webpack_require__(135);

/**
 * Wraps a DataChannel between two Peers.
 */
function DataConnection(peer, provider, options) {
  if (!(this instanceof DataConnection)) return new DataConnection(peer, provider, options);
  EventEmitter.call(this);

  this.options = util.extend({
    serialization: 'binary',
    reliable: false
  }, options);

  // Connection is not open yet.
  this.open = false;
  this.type = 'data';
  this.peer = peer;
  this.provider = provider;

  this.id = this.options.connectionId || DataConnection._idPrefix + util.randomToken();

  this.label = this.options.label || this.id;
  this.metadata = this.options.metadata;
  this.serialization = this.options.serialization;
  this.reliable = this.options.reliable;

  // Data channel buffering.
  this._buffer = [];
  this._buffering = false;
  this.bufferSize = 0;

  // For storing large data.
  this._chunkedData = {};

  if (this.options._payload) {
    this._peerBrowser = this.options._payload.browser;
  }

  Negotiator.startConnection(
    this,
    this.options._payload || {
      originator: true
    }
  );
}

util.inherits(DataConnection, EventEmitter);

DataConnection._idPrefix = 'dc_';

/** Called by the Negotiator when the DataChannel is ready. */
DataConnection.prototype.initialize = function(dc) {
  this._dc = this.dataChannel = dc;
  this._configureDataChannel();
}

DataConnection.prototype._configureDataChannel = function() {
  var self = this;
  if (util.supports.sctp) {
    this._dc.binaryType = 'arraybuffer';
  }
  this._dc.onopen = function() {
    util.log('Data channel connection success');
    self.open = true;
    self.emit('open');
  }

  // Use the Reliable shim for non Firefox browsers
  if (!util.supports.sctp && this.reliable) {
    this._reliable = new Reliable(this._dc, util.debug);
  }

  if (this._reliable) {
    this._reliable.onmessage = function(msg) {
      self.emit('data', msg);
    };
  } else {
    this._dc.onmessage = function(e) {
      self._handleDataMessage(e);
    };
  }
  this._dc.onclose = function(e) {
    util.log('DataChannel closed for:', self.peer);
    self.close();
  };
}

// Handles a DataChannel message.
DataConnection.prototype._handleDataMessage = function(e) {
  var self = this;
  var data = e.data;
  var datatype = data.constructor;
  if (this.serialization === 'binary' || this.serialization === 'binary-utf8') {
    if (datatype === Blob) {
      // Datatype should never be blob
      util.blobToArrayBuffer(data, function(ab) {
        data = util.unpack(ab);
        self.emit('data', data);
      });
      return;
    } else if (datatype === ArrayBuffer) {
      data = util.unpack(data);
    } else if (datatype === String) {
      // String fallback for binary data for browsers that don't support binary yet
      var ab = util.binaryStringToArrayBuffer(data);
      data = util.unpack(ab);
    }
  } else if (this.serialization === 'json') {
    data = JSON.parse(data);
  }

  // Check if we've chunked--if so, piece things back together.
  // We're guaranteed that this isn't 0.
  if (data.__peerData) {
    var id = data.__peerData;
    var chunkInfo = this._chunkedData[id] || {data: [], count: 0, total: data.total};

    chunkInfo.data[data.n] = data.data;
    chunkInfo.count += 1;

    if (chunkInfo.total === chunkInfo.count) {
      // Clean up before making the recursive call to `_handleDataMessage`.
      delete this._chunkedData[id];

      // We've received all the chunks--time to construct the complete data.
      data = new Blob(chunkInfo.data);
      this._handleDataMessage({data: data});
    }

    this._chunkedData[id] = chunkInfo;
    return;
  }

  this.emit('data', data);
}

/**
 * Exposed functionality for users.
 */

/** Allows user to close connection. */
DataConnection.prototype.close = function() {
  if (!this.open) {
    return;
  }
  this.open = false;
  Negotiator.cleanup(this);
  this.emit('close');
}

/** Allows user to send data. */
DataConnection.prototype.send = function(data, chunked) {
  if (!this.open) {
    this.emit('error', new Error('Connection is not open. You should listen for the `open` event before sending messages.'));
    return;
  }
  if (this._reliable) {
    // Note: reliable shim sending will make it so that you cannot customize
    // serialization.
    this._reliable.send(data);
    return;
  }
  var self = this;
  if (this.serialization === 'json') {
    this._bufferedSend(JSON.stringify(data));
  } else if (this.serialization === 'binary' || this.serialization === 'binary-utf8') {
    var blob = util.pack(data);

    // For Chrome-Firefox interoperability, we need to make Firefox "chunk"
    // the data it sends out.
    var needsChunking = util.chunkedBrowsers[this._peerBrowser] || util.chunkedBrowsers[util.browser];
    if (needsChunking && !chunked && blob.size > util.chunkedMTU) {
      this._sendChunks(blob);
      return;
    }

    // DataChannel currently only supports strings.
    if (!util.supports.sctp) {
      util.blobToBinaryString(blob, function(str) {
        self._bufferedSend(str);
      });
    } else if (!util.supports.binaryBlob) {
      // We only do this if we really need to (e.g. blobs are not supported),
      // because this conversion is costly.
      util.blobToArrayBuffer(blob, function(ab) {
        self._bufferedSend(ab);
      });
    } else {
      this._bufferedSend(blob);
    }
  } else {
    this._bufferedSend(data);
  }
}

DataConnection.prototype._bufferedSend = function(msg) {
  if (this._buffering || !this._trySend(msg)) {
    this._buffer.push(msg);
    this.bufferSize = this._buffer.length;
  }
}

// Returns true if the send succeeds.
DataConnection.prototype._trySend = function(msg) {
  try {
    this._dc.send(msg);
  } catch (e) {
    this._buffering = true;

    var self = this;
    setTimeout(function() {
      // Try again.
      self._buffering = false;
      self._tryBuffer();
    }, 100);
    return false;
  }
  return true;
}

// Try to send the first message in the buffer.
DataConnection.prototype._tryBuffer = function() {
  if (this._buffer.length === 0) {
    return;
  }

  var msg = this._buffer[0];

  if (this._trySend(msg)) {
    this._buffer.shift();
    this.bufferSize = this._buffer.length;
    this._tryBuffer();
  }
}

DataConnection.prototype._sendChunks = function(blob) {
  var blobs = util.chunk(blob);
  for (var i = 0, ii = blobs.length; i < ii; i += 1) {
    var blob = blobs[i];
    this.send(blob, true);
  }
}

DataConnection.prototype.handleMessage = function(message) {
  var payload = message.payload;

  switch (message.type) {
    case 'ANSWER':
      this._peerBrowser = payload.browser;

      // Forward to negotiator
      Negotiator.handleSDP(message.type, this, payload.sdp);
      break;
    case 'CANDIDATE':
      Negotiator.handleCandidate(this, payload.candidate);
      break;
    default:
      util.warn('Unrecognized message type:', message.type, 'from peer:', this.peer);
      break;
  }
}

module.exports = DataConnection;


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(18);
var EventEmitter = __webpack_require__(23);
var Negotiator = __webpack_require__(59);

/**
 * Wraps the streaming interface between two Peers.
 */
function MediaConnection(peer, provider, options) {
  if (!(this instanceof MediaConnection)) return new MediaConnection(peer, provider, options);
  EventEmitter.call(this);

  this.options = util.extend({}, options);

  this.open = false;
  this.type = 'media';
  this.peer = peer;
  this.provider = provider;
  this.metadata = this.options.metadata;
  this.localStream = this.options._stream;

  this.id = this.options.connectionId || MediaConnection._idPrefix + util.randomToken();
  if (this.localStream) {
    Negotiator.startConnection(
      this,
      {_stream: this.localStream, originator: true}
    );
  }
};

util.inherits(MediaConnection, EventEmitter);

MediaConnection._idPrefix = 'mc_';

MediaConnection.prototype.addStream = function(remoteStream) {
  util.log('Receiving stream', remoteStream);

  this.remoteStream = remoteStream;
  this.emit('stream', remoteStream); // Should we call this `open`?

};

MediaConnection.prototype.handleMessage = function(message) {
  var payload = message.payload;

  switch (message.type) {
    case 'ANSWER':
      // Forward to negotiator
      Negotiator.handleSDP(message.type, this, payload.sdp);
      this.open = true;
      break;
    case 'CANDIDATE':
      Negotiator.handleCandidate(this, payload.candidate);
      break;
    default:
      util.warn('Unrecognized message type:', message.type, 'from peer:', this.peer);
      break;
  }
}

MediaConnection.prototype.answer = function(stream) {
  if (this.localStream) {
    util.warn('Local stream already exists on this MediaConnection. Are you answering a call twice?');
    return;
  }

  this.options._payload._stream = stream;

  this.localStream = stream;
  Negotiator.startConnection(
    this,
    this.options._payload
  )
  // Retrieve lost messages stored because PeerConnection not set up.
  var messages = this.provider._getMessages(this.id);
  for (var i = 0, ii = messages.length; i < ii; i += 1) {
    this.handleMessage(messages[i]);
  }
  this.open = true;
};

/**
 * Exposed functionality for users.
 */

/** Allows user to close connection. */
MediaConnection.prototype.close = function() {
  if (!this.open) {
    return;
  }
  this.open = false;
  Negotiator.cleanup(this);
  this.emit('close')
};

module.exports = MediaConnection;


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(18);
var EventEmitter = __webpack_require__(23);

/**
 * An abstraction on top of WebSockets and XHR streaming to provide fastest
 * possible connection for peers.
 */
function Socket(secure, host, port, path, key) {
  if (!(this instanceof Socket)) return new Socket(secure, host, port, path, key);

  EventEmitter.call(this);

  // Disconnected manually.
  this.disconnected = false;
  this._queue = [];

  var httpProtocol = secure ? 'https://' : 'http://';
  var wsProtocol = secure ? 'wss://' : 'ws://';
  this._httpUrl = httpProtocol + host + ':' + port + path + key;
  this._wsUrl = wsProtocol + host + ':' + port + path + 'peerjs?key=' + key;
}

util.inherits(Socket, EventEmitter);


/** Check in with ID or get one from server. */
Socket.prototype.start = function(id, token) {
  this.id = id;

  this._httpUrl += '/' + id + '/' + token;
  this._wsUrl += '&id=' + id + '&token=' + token;

  this._startXhrStream();
  this._startWebSocket();
}


/** Start up websocket communications. */
Socket.prototype._startWebSocket = function(id) {
  var self = this;

  if (this._socket) {
    return;
  }

  this._socket = new WebSocket(this._wsUrl);

  this._socket.onmessage = function(event) {
    try {
      var data = JSON.parse(event.data);
    } catch(e) {
      util.log('Invalid server message', event.data);
      return;
    }
    self.emit('message', data);
  };

  this._socket.onclose = function(event) {
    util.log('Socket closed.');
    self.disconnected = true;
    self.emit('disconnected');
  };

  // Take care of the queue of connections if necessary and make sure Peer knows
  // socket is open.
  this._socket.onopen = function() {
    if (self._timeout) {
      clearTimeout(self._timeout);
      setTimeout(function(){
        self._http.abort();
        self._http = null;
      }, 5000);
    }
    self._sendQueuedMessages();
    util.log('Socket open');
  };
}

/** Start XHR streaming. */
Socket.prototype._startXhrStream = function(n) {
  try {
    var self = this;
    this._http = new XMLHttpRequest();
    this._http._index = 1;
    this._http._streamIndex = n || 0;
    this._http.open('post', this._httpUrl + '/id?i=' + this._http._streamIndex, true);
    this._http.onerror = function() {
      // If we get an error, likely something went wrong.
      // Stop streaming.
      clearTimeout(self._timeout);
      self.emit('disconnected');
    }
    this._http.onreadystatechange = function() {
      if (this.readyState == 2 && this.old) {
        this.old.abort();
        delete this.old;
      } else if (this.readyState > 2 && this.status === 200 && this.responseText) {
        self._handleStream(this);
      }
    };
    this._http.send(null);
    this._setHTTPTimeout();
  } catch(e) {
    util.log('XMLHttpRequest not available; defaulting to WebSockets');
  }
}


/** Handles onreadystatechange response as a stream. */
Socket.prototype._handleStream = function(http) {
  // 3 and 4 are loading/done state. All others are not relevant.
  var messages = http.responseText.split('\n');

  // Check to see if anything needs to be processed on buffer.
  if (http._buffer) {
    while (http._buffer.length > 0) {
      var index = http._buffer.shift();
      var bufferedMessage = messages[index];
      try {
        bufferedMessage = JSON.parse(bufferedMessage);
      } catch(e) {
        http._buffer.shift(index);
        break;
      }
      this.emit('message', bufferedMessage);
    }
  }

  var message = messages[http._index];
  if (message) {
    http._index += 1;
    // Buffering--this message is incomplete and we'll get to it next time.
    // This checks if the httpResponse ended in a `\n`, in which case the last
    // element of messages should be the empty string.
    if (http._index === messages.length) {
      if (!http._buffer) {
        http._buffer = [];
      }
      http._buffer.push(http._index - 1);
    } else {
      try {
        message = JSON.parse(message);
      } catch(e) {
        util.log('Invalid server message', message);
        return;
      }
      this.emit('message', message);
    }
  }
}

Socket.prototype._setHTTPTimeout = function() {
  var self = this;
  this._timeout = setTimeout(function() {
    var old = self._http;
    if (!self._wsOpen()) {
      self._startXhrStream(old._streamIndex + 1);
      self._http.old = old;
    } else {
      old.abort();
    }
  }, 25000);
}

/** Is the websocket currently open? */
Socket.prototype._wsOpen = function() {
  return this._socket && this._socket.readyState == 1;
}

/** Send queued messages. */
Socket.prototype._sendQueuedMessages = function() {
  for (var i = 0, ii = this._queue.length; i < ii; i += 1) {
    this.send(this._queue[i]);
  }
}

/** Exposed send for DC & Peer. */
Socket.prototype.send = function(data) {
  if (this.disconnected) {
    return;
  }

  // If we didn't get an ID yet, we can't yet send anything so we should queue
  // up these messages.
  if (!this.id) {
    this._queue.push(data);
    return;
  }

  if (!data.type) {
    this.emit('error', 'Invalid message');
    return;
  }

  var message = JSON.stringify(data);
  if (this._wsOpen()) {
    this._socket.send(message);
  } else {
    var http = new XMLHttpRequest();
    var url = this._httpUrl + '/' + data.type.toLowerCase();
    http.open('post', url, true);
    http.setRequestHeader('Content-Type', 'application/json');
    http.send(message);
  }
}

Socket.prototype.close = function() {
  if (!this.disconnected && this._wsOpen()) {
    this._socket.close();
    this.disconnected = true;
  }
}

module.exports = Socket;


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(136);

/**
 * Reliable transfer for Chrome Canary DataChannel impl.
 * Author: @michellebu
 */
function Reliable(dc, debug) {
  if (!(this instanceof Reliable)) return new Reliable(dc);
  this._dc = dc;

  util.debug = debug;

  // Messages sent/received so far.
  // id: { ack: n, chunks: [...] }
  this._outgoing = {};
  // id: { ack: ['ack', id, n], chunks: [...] }
  this._incoming = {};
  this._received = {};

  // Window size.
  this._window = 1000;
  // MTU.
  this._mtu = 500;
  // Interval for setInterval. In ms.
  this._interval = 0;

  // Messages sent.
  this._count = 0;

  // Outgoing message queue.
  this._queue = [];

  this._setupDC();
};

// Send a message reliably.
Reliable.prototype.send = function(msg) {
  // Determine if chunking is necessary.
  var bl = util.pack(msg);
  if (bl.size < this._mtu) {
    this._handleSend(['no', bl]);
    return;
  }

  this._outgoing[this._count] = {
    ack: 0,
    chunks: this._chunk(bl)
  };

  if (util.debug) {
    this._outgoing[this._count].timer = new Date();
  }

  // Send prelim window.
  this._sendWindowedChunks(this._count);
  this._count += 1;
};

// Set up interval for processing queue.
Reliable.prototype._setupInterval = function() {
  // TODO: fail gracefully.

  var self = this;
  this._timeout = setInterval(function() {
    // FIXME: String stuff makes things terribly async.
    var msg = self._queue.shift();
    if (msg._multiple) {
      for (var i = 0, ii = msg.length; i < ii; i += 1) {
        self._intervalSend(msg[i]);
      }
    } else {
      self._intervalSend(msg);
    }
  }, this._interval);
};

Reliable.prototype._intervalSend = function(msg) {
  var self = this;
  msg = util.pack(msg);
  util.blobToBinaryString(msg, function(str) {
    self._dc.send(str);
  });
  if (self._queue.length === 0) {
    clearTimeout(self._timeout);
    self._timeout = null;
    //self._processAcks();
  }
};

// Go through ACKs to send missing pieces.
Reliable.prototype._processAcks = function() {
  for (var id in this._outgoing) {
    if (this._outgoing.hasOwnProperty(id)) {
      this._sendWindowedChunks(id);
    }
  }
};

// Handle sending a message.
// FIXME: Don't wait for interval time for all messages...
Reliable.prototype._handleSend = function(msg) {
  var push = true;
  for (var i = 0, ii = this._queue.length; i < ii; i += 1) {
    var item = this._queue[i];
    if (item === msg) {
      push = false;
    } else if (item._multiple && item.indexOf(msg) !== -1) {
      push = false;
    }
  }
  if (push) {
    this._queue.push(msg);
    if (!this._timeout) {
      this._setupInterval();
    }
  }
};

// Set up DataChannel handlers.
Reliable.prototype._setupDC = function() {
  // Handle various message types.
  var self = this;
  this._dc.onmessage = function(e) {
    var msg = e.data;
    var datatype = msg.constructor;
    // FIXME: msg is String until binary is supported.
    // Once that happens, this will have to be smarter.
    if (datatype === String) {
      var ab = util.binaryStringToArrayBuffer(msg);
      msg = util.unpack(ab);
      self._handleMessage(msg);
    }
  };
};

// Handles an incoming message.
Reliable.prototype._handleMessage = function(msg) {
  var id = msg[1];
  var idata = this._incoming[id];
  var odata = this._outgoing[id];
  var data;
  switch (msg[0]) {
    // No chunking was done.
    case 'no':
      var message = id;
      if (!!message) {
        this.onmessage(util.unpack(message));
      }
      break;
    // Reached the end of the message.
    case 'end':
      data = idata;

      // In case end comes first.
      this._received[id] = msg[2];

      if (!data) {
        break;
      }

      this._ack(id);
      break;
    case 'ack':
      data = odata;
      if (!!data) {
        var ack = msg[2];
        // Take the larger ACK, for out of order messages.
        data.ack = Math.max(ack, data.ack);

        // Clean up when all chunks are ACKed.
        if (data.ack >= data.chunks.length) {
          util.log('Time: ', new Date() - data.timer);
          delete this._outgoing[id];
        } else {
          this._processAcks();
        }
      }
      // If !data, just ignore.
      break;
    // Received a chunk of data.
    case 'chunk':
      // Create a new entry if none exists.
      data = idata;
      if (!data) {
        var end = this._received[id];
        if (end === true) {
          break;
        }
        data = {
          ack: ['ack', id, 0],
          chunks: []
        };
        this._incoming[id] = data;
      }

      var n = msg[2];
      var chunk = msg[3];
      data.chunks[n] = new Uint8Array(chunk);

      // If we get the chunk we're looking for, ACK for next missing.
      // Otherwise, ACK the same N again.
      if (n === data.ack[2]) {
        this._calculateNextAck(id);
      }
      this._ack(id);
      break;
    default:
      // Shouldn't happen, but would make sense for message to just go
      // through as is.
      this._handleSend(msg);
      break;
  }
};

// Chunks BL into smaller messages.
Reliable.prototype._chunk = function(bl) {
  var chunks = [];
  var size = bl.size;
  var start = 0;
  while (start < size) {
    var end = Math.min(size, start + this._mtu);
    var b = bl.slice(start, end);
    var chunk = {
      payload: b
    }
    chunks.push(chunk);
    start = end;
  }
  util.log('Created', chunks.length, 'chunks.');
  return chunks;
};

// Sends ACK N, expecting Nth blob chunk for message ID.
Reliable.prototype._ack = function(id) {
  var ack = this._incoming[id].ack;

  // if ack is the end value, then call _complete.
  if (this._received[id] === ack[2]) {
    this._complete(id);
    this._received[id] = true;
  }

  this._handleSend(ack);
};

// Calculates the next ACK number, given chunks.
Reliable.prototype._calculateNextAck = function(id) {
  var data = this._incoming[id];
  var chunks = data.chunks;
  for (var i = 0, ii = chunks.length; i < ii; i += 1) {
    // This chunk is missing!!! Better ACK for it.
    if (chunks[i] === undefined) {
      data.ack[2] = i;
      return;
    }
  }
  data.ack[2] = chunks.length;
};

// Sends the next window of chunks.
Reliable.prototype._sendWindowedChunks = function(id) {
  util.log('sendWindowedChunks for: ', id);
  var data = this._outgoing[id];
  var ch = data.chunks;
  var chunks = [];
  var limit = Math.min(data.ack + this._window, ch.length);
  for (var i = data.ack; i < limit; i += 1) {
    if (!ch[i].sent || i === data.ack) {
      ch[i].sent = true;
      chunks.push(['chunk', id, i, ch[i].payload]);
    }
  }
  if (data.ack + this._window >= ch.length) {
    chunks.push(['end', id, ch.length])
  }
  chunks._multiple = true;
  this._handleSend(chunks);
};

// Puts together a message from chunks.
Reliable.prototype._complete = function(id) {
  util.log('Completed called for', id);
  var self = this;
  var chunks = this._incoming[id].chunks;
  var bl = new Blob(chunks);
  util.blobToArrayBuffer(bl, function(ab) {
    self.onmessage(util.unpack(ab));
  });
  delete this._incoming[id];
};

// Ups bandwidth limit on SDP. Meant to be called during offer/answer.
Reliable.higherBandwidthSDP = function(sdp) {
  // AS stands for Application-Specific Maximum.
  // Bandwidth number is in kilobits / sec.
  // See RFC for more info: http://www.ietf.org/rfc/rfc2327.txt

  // Chrome 31+ doesn't want us munging the SDP, so we'll let them have their
  // way.
  var version = navigator.appVersion.match(/Chrome\/(.*?) /);
  if (version) {
    version = parseInt(version[1].split('.').shift());
    if (version < 31) {
      var parts = sdp.split('b=AS:30');
      var replace = 'b=AS:102400'; // 100 Mbps
      if (parts.length > 1) {
        return parts[0] + replace + parts[1];
      }
    }
  }

  return sdp;
};

// Overwritten, typically.
Reliable.prototype.onmessage = function(msg) {};

module.exports.Reliable = Reliable;


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

var BinaryPack = __webpack_require__(57);

var util = {
  debug: false,
  
  inherits: function(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  },
  extend: function(dest, source) {
    for(var key in source) {
      if(source.hasOwnProperty(key)) {
        dest[key] = source[key];
      }
    }
    return dest;
  },
  pack: BinaryPack.pack,
  unpack: BinaryPack.unpack,
  
  log: function () {
    if (util.debug) {
      var copy = [];
      for (var i = 0; i < arguments.length; i++) {
        copy[i] = arguments[i];
      }
      copy.unshift('Reliable: ');
      console.log.apply(console, copy);
    }
  },

  setZeroTimeout: (function(global) {
    var timeouts = [];
    var messageName = 'zero-timeout-message';

    // Like setTimeout, but only takes a function argument.	 There's
    // no time argument (always zero) and no arguments (you have to
    // use a closure).
    function setZeroTimeoutPostMessage(fn) {
      timeouts.push(fn);
      global.postMessage(messageName, '*');
    }		

    function handleMessage(event) {
      if (event.source == global && event.data == messageName) {
        if (event.stopPropagation) {
          event.stopPropagation();
        }
        if (timeouts.length) {
          timeouts.shift()();
        }
      }
    }
    if (global.addEventListener) {
      global.addEventListener('message', handleMessage, true);
    } else if (global.attachEvent) {
      global.attachEvent('onmessage', handleMessage);
    }
    return setZeroTimeoutPostMessage;
  }(this)),
  
  blobToArrayBuffer: function(blob, cb){
    var fr = new FileReader();
    fr.onload = function(evt) {
      cb(evt.target.result);
    };
    fr.readAsArrayBuffer(blob);
  },
  blobToBinaryString: function(blob, cb){
    var fr = new FileReader();
    fr.onload = function(evt) {
      cb(evt.target.result);
    };
    fr.readAsBinaryString(blob);
  },
  binaryStringToArrayBuffer: function(binary) {
    var byteArray = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i++) {
      byteArray[i] = binary.charCodeAt(i) & 0xff;
    }
    return byteArray.buffer;
  },
  randomToken: function () {
    return Math.random().toString(36).substr(2);
  }
};

module.exports = util;


/***/ }),
/* 137 */
/***/ (function(module, exports) {

module.exports = {
	"name": "Big",
	"cameraConstraints": [
		600,
		270
	],
	"teams": [
		{
			"name": "red",
			"color": "#e56e56",
			"kickOffPos": [
				-250,
				0
			]
		},
		{
			"name": "blue",
			"color": "#5689e5",
			"kickOffPos": [
				250,
				0
			]
		}
	],
	"player": {
		"acceleration": 0.1,
		"damping": 0.96,
		"kickingAcceleration": 0.07,
		"kickStrength": 4,
		"invMass": 0.5,
		"radius": 15
	},
	"backgrounds": [
		{
			"pos": [
				-550,
				-240
			],
			"width": 1100,
			"height": 480,
			"type": "grass"
		}
	],
	"segments": [
		{
			"p0": [
				-550,
				-240
			],
			"p1": [
				-550,
				-80
			]
		},
		{
			"p0": [
				-550,
				80
			],
			"p1": [
				-550,
				240
			]
		},
		{
			"p0": [
				-550,
				-80
			],
			"p1": [
				-580,
				-80
			],
			"bounce": 0.2
		},
		{
			"p0": [
				-580,
				-80
			],
			"p1": [
				-580,
				80
			],
			"bounce": 0.2
		},
		{
			"p0": [
				-580,
				80
			],
			"p1": [
				-550,
				80
			],
			"bounce": 0.2
		},
		{
			"p0": [
				550,
				-240
			],
			"p1": [
				550,
				-80
			]
		},
		{
			"p0": [
				550,
				80
			],
			"p1": [
				550,
				240
			]
		},
		{
			"p0": [
				550,
				-80
			],
			"p1": [
				580,
				-80
			],
			"bounce": 0.2
		},
		{
			"p0": [
				580,
				-80
			],
			"p1": [
				580,
				80
			],
			"bounce": 0.2
		},
		{
			"p0": [
				580,
				80
			],
			"p1": [
				550,
				80
			],
			"bounce": 0.2
		},
		{
			"p0": [
				-550,
				-240
			],
			"p1": [
				550,
				-240
			]
		},
		{
			"p0": [
				-550,
				240
			],
			"p1": [
				550,
				240
			]
		}
	],
	"goals": [
		{
			"p0": [
				-550,
				-80
			],
			"p1": [
				-550,
				80
			],
			"teamScored": "blue"
		},
		{
			"p0": [
				550,
				-80
			],
			"p1": [
				550,
				80
			],
			"teamScored": "red"
		}
	],
	"discs": [
		{
			"pos": [
				0,
				0
			],
			"ball": true,
			"color": "#FFF",
			"damping": 0.99,
			"invMass": 1,
			"radius": 10
		},
		{
			"pos": [
				-550,
				80
			],
			"color": "#FFCCCC",
			"bounce": 0.5,
			"radius": 8,
			"invMass": 0
		},
		{
			"pos": [
				-550,
				-80
			],
			"color": "#FFCCCC",
			"bounce": 0.5,
			"radius": 8,
			"invMass": 0
		},
		{
			"pos": [
				550,
				80
			],
			"color": "#CCCCFF",
			"bounce": 0.5,
			"radius": 8,
			"invMass": 0
		},
		{
			"pos": [
				550,
				-80
			],
			"color": "#CCCCFF",
			"bounce": 0.5,
			"radius": 8,
			"invMass": 0
		}
	]
};

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(63);


/***/ })
/******/ ]);
});

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _extends=Object.assign||function(a){for(var c,b=1;b<arguments.length;b++)for(var d in c=arguments[b],c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d]);return a};/* harmony default export */ __webpack_exports__["a"] = (a)=>{return class extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component{constructor(...b){var c;return c=super(...b),this.subscribers=[],this.createSubscriber=(d,e)=>{const f=this.props.game.eventAggregator.subscribe(d,e);this.subscribers.push(f)},c}componentWillUnmount(){for(const b of this.subscribers)b.dispose()}render(){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(a,_extends({createSubscriber:this.createSubscriber},this.props))}}};

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = callIfExists;
/* harmony export (immutable) */ __webpack_exports__["a"] = hasOwnProp;
/* harmony export (immutable) */ __webpack_exports__["e"] = uniqueId;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return cssClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return canUseDOM; });
function callIfExists(func) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    return typeof func === 'function' && func.apply(undefined, args);
}

function hasOwnProp(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}

function uniqueId() {
    return Math.random().toString(36).substring(7);
}

var cssClasses = {
    menu: 'react-contextmenu',
    menuVisible: 'react-contextmenu--visible',
    menuWrapper: 'react-contextmenu-wrapper',
    menuItem: 'react-contextmenu-item',
    menuItemActive: 'react-contextmenu-item--active',
    menuItemDisabled: 'react-contextmenu-item--disabled',
    menuItemDivider: 'react-contextmenu-item--divider',
    subMenu: 'react-contextmenu-submenu'
};

var store = {};

var canUseDOM = Boolean(typeof window !== 'undefined' && window.document && window.document.createElement);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return classNames;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
}());


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-disable no-unused-vars */
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (e) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (Object.getOwnPropertySymbols) {
			symbols = Object.getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_object_assign__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return MENU_SHOW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return MENU_HIDE; });
/* unused harmony export dispatchGlobalEvent */
/* harmony export (immutable) */ __webpack_exports__["b"] = showMenu;
/* harmony export (immutable) */ __webpack_exports__["a"] = hideMenu;




var MENU_SHOW = 'REACT_CONTEXTMENU_SHOW';
var MENU_HIDE = 'REACT_CONTEXTMENU_HIDE';

function dispatchGlobalEvent(eventName, opts) {
    var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window;

    // Compatibale with IE
    // @see http://stackoverflow.com/questions/26596123/internet-explorer-9-10-11-event-constructor-doesnt-work
    var event = void 0;

    if (typeof window.CustomEvent === 'function') {
        event = new window.CustomEvent(eventName, { detail: opts });
    } else {
        event = document.createEvent('CustomEvent');
        event.initCustomEvent(eventName, false, true, opts);
    }

    if (target) {
        target.dispatchEvent(event);
        __WEBPACK_IMPORTED_MODULE_0_object_assign___default()(__WEBPACK_IMPORTED_MODULE_1__helpers__["d" /* store */], opts);
    }
}

function showMenu() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var target = arguments[1];

    dispatchGlobalEvent(MENU_SHOW, __WEBPACK_IMPORTED_MODULE_0_object_assign___default()({}, opts, { type: MENU_SHOW }), target);
}

function hideMenu() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var target = arguments[1];

    dispatchGlobalEvent(MENU_HIDE, __WEBPACK_IMPORTED_MODULE_0_object_assign___default()({}, opts, { type: MENU_HIDE }), target);
}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__styles_main_scss__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__styles_main_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__styles_main_scss__);
/* harmony default export */ __webpack_exports__["default"] = __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */];

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__input__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__message_list__ = __webpack_require__(10);
/* harmony default export */ __webpack_exports__["a"] = ({game:a})=>__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'chat'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'messages'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__message_list__["a" /* default */],{game:a})),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__input__["a" /* default */],{game:a}));

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nojball_game__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nojball_game___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_nojball_game__);
class Input extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component{constructor(...a){var b;return b=super(...a),this.state={inputText:''},b}setMessageText(a){this.setState({inputText:a.target.value})}sendMessage(a){a.preventDefault();const{game:b}=this.props,c=this.state.inputText;b.addEvent(new __WEBPACK_IMPORTED_MODULE_1_nojball_game__["Events"].PlayerChat(b.me.id,{message:c})),this.setState({inputText:''})}render(){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('form',{onSubmit:(a)=>this.sendMessage(a)},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input',{type:'text',placeholder:'Type here to chat',tabIndex:'2',value:this.state.inputText,onChange:(a)=>this.setMessageText(a)}))}}
/* harmony export (immutable) */ __webpack_exports__["a"] = Input;


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nojball_game__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nojball_game___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_nojball_game__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__enhancers_with_subscribers__ = __webpack_require__(2);
class MessageList extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component{constructor(...a){var b;return b=super(...a),this.state={messages:[]},b}componentDidMount(){this.props.createSubscriber(__WEBPACK_IMPORTED_MODULE_1_nojball_game__["Events"].PlayerChat,()=>{this.setState({messages:this.props.game.state.chatMessages})})}componentDidUpdate(){this.element.scrollTop=this.element.scrollHeight}render(){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('ul',{ref:(a)=>this.element=a},this.state.messages.map((a,b)=>__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('li',{key:b},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('strong',null,this.props.game.state.getPlayerById(a.playerId).name,': '),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',null,a.msg))))}}/* harmony default export */ __webpack_exports__["a"] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__enhancers_with_subscribers__["a" /* default */])(MessageList);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nojball_game__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nojball_game___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_nojball_game__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chat__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__menu__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pitch__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sidebar__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__topbar__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__enhancers_with_subscribers__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__images_grass_png__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__images_grass_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__images_grass_png__);
class Game extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component{constructor(a){super(a),this.state={playing:!1,showMenu:!1},this.toggleMenu=()=>{this.setState({showMenu:!this.state.showMenu})},this.state.playing=a.game.state.playing}componentDidMount(){this.props.createSubscriber(__WEBPACK_IMPORTED_MODULE_1_nojball_game__["Events"].StartGame,()=>{this.setState({playing:!0,showMenu:!1})}),this.props.createSubscriber(__WEBPACK_IMPORTED_MODULE_1_nojball_game__["Events"].StopGame,()=>{this.setState({playing:!1})})}render(){const{game:a}=this.props;return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'game-container'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'main-area'},this.state.playing&&__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__topbar__["a" /* default */],{game:a}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'content'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__pitch__["a" /* default */],{game:a,renderer:this.props.renderer}),(this.state.showMenu||!this.state.playing)&&__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'menu-container'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__menu__["a" /* default */],{game:a}))),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'chat-container'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__chat__["a" /* default */],{game:a}))),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__sidebar__["a" /* default */],{game:a,toggleMenu:this.toggleMenu}))}}/* harmony default export */ __webpack_exports__["a"] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__enhancers_with_subscribers__["a" /* default */])(Game);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nojball_game__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nojball_game___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_nojball_game__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__enhancers_with_subscribers__ = __webpack_require__(2);
class Menu extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component{constructor(...a){var b;return b=super(...a),this.state={currentStadium:null,stadiums:__WEBPACK_IMPORTED_MODULE_1_nojball_game__["defaultStadiums"],roomName:'',scoreLimit:0,timeLimit:0},this.changeStadium=(c)=>{const d=this.state.stadiums.find((e)=>e.name==c.target.value);if(d){const e=new __WEBPACK_IMPORTED_MODULE_1_nojball_game__["Events"].ChangeStadium(this.props.game.me.id,{stadium:d});this.props.game.addEvent(e)}},this.changeRoomName=(c)=>{this.setState({roomName:c.target.value})},this.changeScoreLimit=(c)=>{const d=parseInt(c.target.value);this.props.game.addEvent(new __WEBPACK_IMPORTED_MODULE_1_nojball_game__["Events"].ChangeScoreLimit(this.props.game.me.id,{limit:d}))},this.changeTimeLimit=(c)=>{const d=parseInt(c.target.value);this.props.game.addEvent(new __WEBPACK_IMPORTED_MODULE_1_nojball_game__["Events"].ChangeTimeLimit(this.props.game.me.id,{limit:d}))},this.setRoomName=()=>{if(this.state.roomName!=this.props.game.state.roomName){const c=new __WEBPACK_IMPORTED_MODULE_1_nojball_game__["Events"].ChangeRoomName(this.props.game.me.id,{name:this.state.roomName});this.props.game.addEvent(c)}},b}componentDidMount(){const{game:a}=this.props;this.setState({currentStadium:a.state.stadium,roomName:a.state.roomName,scoreLimit:a.state.scoreLimit,timeLimit:a.state.timeLimit}),this.props.createSubscriber(__WEBPACK_IMPORTED_MODULE_1_nojball_game__["Events"].ChangeRoomName,(b)=>{this.setState({roomName:b.data.name})}),this.props.createSubscriber(__WEBPACK_IMPORTED_MODULE_1_nojball_game__["Events"].ChangeStadium,(b)=>{this.setState({currentStadium:b.stadium})}),this.props.createSubscriber(__WEBPACK_IMPORTED_MODULE_1_nojball_game__["Events"].ChangeScoreLimit,(b)=>{this.setState({scoreLimit:b.data.limit})}),this.props.createSubscriber(__WEBPACK_IMPORTED_MODULE_1_nojball_game__["Events"].ChangeTimeLimit,(b)=>{this.setState({timeLimit:b.data.limit})})}render(){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'menu'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'setting-group'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('h2',null,'Room Settings'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'input-group'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('label',null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',null,'Room name'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input',{type:'text',onChange:this.changeRoomName,onBlur:this.setRoomName,value:this.state.roomName}))),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'input-group'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('label',null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',null,'Password'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input',{type:'password'}))),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'input-group'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('label',null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',null,'Max players'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input',{type:'number'})))),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'setting-group'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('h2',null,'Match settings'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'input-group'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('label',null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',null,'Time limit'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input',{type:'number',min:'0',onChange:this.changeTimeLimit,value:this.state.timeLimit}))),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'input-group'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('label',null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',null,'Score limit'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input',{type:'number',min:'0',onChange:this.changeScoreLimit,value:this.state.scoreLimit}))),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'input-group'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('label',null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',null,'Stadium'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('select',{onChange:this.changeStadium,value:this.state.currentStadium&&this.state.currentStadium.name||'',disabled:this.props.game.state.playing},this.state.stadiums.map((a)=>__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('option',{value:a.name,key:a.name},a.name)))))))}}/* harmony default export */ __webpack_exports__["a"] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__enhancers_with_subscribers__["a" /* default */])(Menu);

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_resize_observer_polyfill__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_resize_observer_polyfill___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_resize_observer_polyfill__);
class Pitch extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component{constructor(a){super(a),this.resizeObserver=new __WEBPACK_IMPORTED_MODULE_1_resize_observer_polyfill___default.a((b)=>{for(const d of b){const{width:e,height:f}=d.contentRect;a.renderer.setWidth(e).setHeight(f)}})}componentDidMount(){this.props.game.initKeyboard(this.element),this.props.renderer.setParent(this.element).setWidth(this.element.offsetWidth).setHeight(this.element.offsetHeight).render(),this.resizeObserver.observe(this.element)}componentWillUnmount(){this.resizeObserver.unobserve(this.element)}render(){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'pitch',ref:(a)=>this.element=a,tabIndex:'-1'})}}
/* harmony export (immutable) */ __webpack_exports__["a"] = Pitch;


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nojball_game__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nojball_game___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_nojball_game__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__teamslist__ = __webpack_require__(17);
/* harmony default export */ __webpack_exports__["a"] = (a)=>{const{game:b}=a;return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'sidebar'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__teamslist__["a" /* default */],a),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',null,b.state.playing&&__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('button',{onClick:a.toggleMenu,className:'toggle-menu'},'Toggle menu'),b.state.playing?__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('button',{onClick:()=>b.stop(),className:'stop-game'},'Stop game'):__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('button',{onClick:()=>b.start(),className:'start-game'},'Start game')))};

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_contextmenu__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nojball_game__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nojball_game___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_nojball_game__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__enhancers_with_subscribers__ = __webpack_require__(2);
class PlayerClass extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component{constructor(...a){var b;return b=super(...a),this.state={isAdmin:!1},this.toggleAdmin=()=>{const c=new __WEBPACK_IMPORTED_MODULE_2_nojball_game__["Events"].PlayerAdmin(this.props.game.me.id,{player:this.props.player.clientId,isAdmin:!this.state.isAdmin});this.props.game.addEvent(c)},b}componentDidMount(){this.setState({isAdmin:this.props.player.admin}),this.props.createSubscriber(__WEBPACK_IMPORTED_MODULE_2_nojball_game__["Events"].PlayerAdmin,(a)=>{a.data.player==this.props.player.clientId&&this.setState({isAdmin:a.data.isAdmin})})}render(){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_contextmenu__["a" /* ContextMenuTrigger */],{id:`player-menu-${this.props.player.clientId}`},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img',{src:'https://cdn2.iconfinder.com/data/icons/flags/flags/48/united-kingdom-great-britain.png'}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',{className:`${this.state.isAdmin?'admin':''}`},this.props.player.name))),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_contextmenu__["b" /* ContextMenu */],{id:`player-menu-${this.props.player.clientId}`},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_contextmenu__["c" /* MenuItem */],{onClick:this.toggleAdmin},`${this.state.isAdmin?'Remove':'Make'} admin`)))}}/* harmony default export */ __webpack_exports__["a"] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__enhancers_with_subscribers__["a" /* default */])(PlayerClass);

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nojball_game__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nojball_game___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_nojball_game__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__player__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__enhancers_with_subscribers__ = __webpack_require__(2);
class Team extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component{constructor(...a){var b;return b=super(...a),this.state={players:[],score:0},b}componentDidMount(){const{game:a,team:b,specs:c}=this.props;return this.initChangeTeamListener(),c?void this.initPlayerJoinedListener():void(this.setState({players:a.state.getTeamPlayers(b),score:a.state.getTeamScore(b)}),this.initStartGameListener(),this.initGoalScoredSubscriber())}initChangeTeamListener(){this.props.createSubscriber(__WEBPACK_IMPORTED_MODULE_1_nojball_game__["Events"].ChangeTeam,(a)=>{const{player:b}=a;return b.team==this.props.team.name||this.props.specs&&!b.team?void this.setState({players:this.state.players.concat(b)}):void this.setState({players:this.state.players.filter((c)=>c.clientId!==b.clientId)})})}initPlayerJoinedListener(){this.props.createSubscriber(__WEBPACK_IMPORTED_MODULE_1_nojball_game__["Events"].PlayerJoined,(a)=>{this.setState({players:this.state.players.concat(a.player)})})}initStartGameListener(){this.props.createSubscriber(__WEBPACK_IMPORTED_MODULE_1_nojball_game__["Events"].StartGame,()=>{this.setState({score:0})})}initGoalScoredSubscriber(){this.props.createSubscriber('goalScored',({goal:a,state:b})=>{a.teamScored==this.props.team.name&&this.setState({score:this.state.score+1})})}switchTeam(){const{id:a}=this.props.game.me,b=new __WEBPACK_IMPORTED_MODULE_1_nojball_game__["Events"].ChangeTeam(a,{clientId:a,team:this.props.specs?null:this.props.team.name});this.props.game.addEvent(b)}render(){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('li',null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('a',{href:'#',onDoubleClick:()=>this.switchTeam()},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',{className:'color-block',style:{backgroundColor:this.props.team.color}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',null,this.props.team.name)),!this.props.specs&&__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',{className:'score'},this.state.score),0<this.state.players.length&&__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('ul',{className:'player-list'},this.state.players.map((a)=>__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('li',{key:a.clientId},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__player__["a" /* default */],{game:this.props.game,player:a})))))}}/* harmony default export */ __webpack_exports__["a"] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__enhancers_with_subscribers__["a" /* default */])(Team);

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__team__ = __webpack_require__(16);
const specTeam={name:'Spectators',color:'#ccc'};class TeamsList extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component{constructor(a){super(a),this.state={teams:[]},this.state.teams=this.props.game.state.stadium.getTeams()}render(){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('ul',{className:'teams-list'},this.state.teams.map((a)=>__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__team__["a" /* default */],{game:this.props.game,team:a,key:a.name})),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__team__["a" /* default */],{game:this.props.game,team:specTeam,specs:!0}))}}
/* harmony export (immutable) */ __webpack_exports__["a"] = TeamsList;


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _Mathfloor=Math.floor;class Timer extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component{constructor(...a){var b;return b=super(...a),this.state={timer:0},b}componentDidMount(){const a=this.props.game,b=()=>{this.timerInterval=requestAnimationFrame(b);const c=a.state.timer,d=_Mathfloor(this.state.timer%60),e=_Mathfloor(c%60);_Mathfloor(c)>_Mathfloor(this.state.timer)&&this.setState({timer:c})};this.timerInterval=requestAnimationFrame(b)}componentWillUnmount(){cancelAnimationFrame(this.timerInterval)}render(){const{timer:a}=this.state,{game:b}=this.props,c=_Mathfloor(a/60),d=_Mathfloor(a%60),e=`${10>c?'0':''}${c}:${10>d?'0':''}${d}`,f=60*b.state.timeLimit,g=a>f&&b.scoresEqual();return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'timer'},g&&__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',{className:'overtime'},'overtime'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',{className:`${a<=f&&a>f-30?'flash':''}`},e))}}
/* harmony export (immutable) */ __webpack_exports__["a"] = Timer;


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nojball_game__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nojball_game___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_nojball_game__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__timer__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__enhancers_with_subscribers__ = __webpack_require__(2);
class TopBar extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component{constructor(a){super(a),this.state={roomName:'',scores:new Map,teams:[]},this.state={roomName:a.game.state.roomName,teams:a.game.state.stadium.getTeams(),scores:a.game.state.scores}}componentDidMount(){this.props.createSubscriber('goalScored',(a)=>{this.setState({scores:a.state.scores})}),this.props.createSubscriber(__WEBPACK_IMPORTED_MODULE_1_nojball_game__["Events"].ChangeRoomName,(a)=>{this.setState({roomName:a.data.name})})}render(){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'top-bar'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('ul',{className:`scores teams-${this.state.teams.length}`},this.state.teams.map((a)=>__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('li',{key:a.name},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',{className:'color-block',style:{backgroundColor:a.color}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',{className:'score'},this.state.scores.get(a.name))))),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'room-name'},this.state.roomName),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__timer__["a" /* default */],{game:this.props.game}))}}/* harmony default export */ __webpack_exports__["a"] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__enhancers_with_subscribers__["a" /* default */])(TopBar);

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(21)();
// imports


// module
exports.push([module.i, ".chat {\n  background: rgba(0, 0, 0, 0.2);\n  display: flex;\n  flex-direction: column; }\n  .chat .messages {\n    color: #efefef;\n    font-size: 0.8rem;\n    flex: 1;\n    height: calc(100% - 25px);\n    margin: 0;\n    padding: 5px 8px; }\n    .chat .messages ul {\n      height: 100%;\n      list-style: none;\n      margin: 0;\n      padding-left: 0;\n      overflow: auto; }\n      .chat .messages ul::-webkit-scrollbar {\n        width: 10px; }\n      .chat .messages ul::-webkit-scrollbar-track, .chat .messages ul::-webkit-scrollbar-thumb {\n        background: rgba(0, 0, 0, 0.2);\n        border-radius: 5px; }\n  .chat form {\n    height: 25px; }\n    .chat form input {\n      background: rgba(0, 0, 0, 0.25);\n      border: none;\n      color: white;\n      display: block;\n      height: 100%;\n      margin: 0;\n      outline: none;\n      padding: 5px;\n      width: 100%; }\n\n.menu {\n  background: rgba(0, 0, 0, 0.6);\n  border-radius: 5px;\n  color: #efefef;\n  display: flex;\n  font-size: 0.9rem;\n  margin: 2% auto;\n  padding: 1%;\n  width: 75%; }\n  .menu .setting-group {\n    flex: 1; }\n  .menu h2 {\n    margin-top: 0; }\n  .menu .input-group {\n    margin-bottom: 2px; }\n  .menu label span {\n    display: inline-block;\n    width: 30%; }\n  .menu label input, .menu label select {\n    background: rgba(0, 0, 0, 0.6);\n    border: 0;\n    border-radius: 5px;\n    color: #efefef;\n    outline: none;\n    padding: 5px; }\n    .menu label input.block, .menu label select.block {\n      display: inline-block;\n      width: 70%; }\n\n.player-list {\n  background: #181d20;\n  font-size: 0.8rem;\n  margin-top: 8px;\n  list-style: none;\n  padding-left: 0px; }\n  .player-list li {\n    margin-bottom: 0;\n    padding: 4px 6px; }\n  .player-list img {\n    display: inline-block;\n    margin-right: 5px;\n    vertical-align: middle;\n    width: 16px; }\n  .player-list span.admin {\n    color: #f4ff65; }\n  .player-list .react-contextmenu {\n    background: #eee;\n    border-radius: 5px;\n    color: #111518; }\n    .player-list .react-contextmenu .react-contextmenu-item {\n      cursor: pointer;\n      padding: 5px; }\n\nbody {\n  font-family: 'Open Sans';\n  font-size: 1rem;\n  margin: 0; }\n\n#gameMount {\n  height: 100vh; }\n\n.game-container {\n  display: flex;\n  height: 100%; }\n  .game-container * {\n    box-sizing: border-box; }\n  .game-container .sidebar {\n    background-color: #111518;\n    color: #fff;\n    display: flex;\n    flex: 1;\n    flex-direction: column;\n    justify-content: space-between;\n    padding: 10px; }\n    .game-container .sidebar .teams-list {\n      font-size: 0.9rem;\n      margin: 0;\n      list-style: none;\n      padding: 0; }\n      .game-container .sidebar .teams-list > li {\n        border-bottom: 1px solid #000;\n        border-top: 1px solid #1f2528;\n        padding: 8px 2px; }\n        .game-container .sidebar .teams-list > li:first-child {\n          border-top: 0; }\n        .game-container .sidebar .teams-list > li:last-child {\n          border-bottom: 0; }\n        .game-container .sidebar .teams-list > li a {\n          color: #fff;\n          font-weight: bold;\n          text-decoration: none; }\n        .game-container .sidebar .teams-list > li .score {\n          float: right;\n          font-weight: bold; }\n    .game-container .sidebar button {\n      border: 0;\n      border-radius: 3px;\n      color: white;\n      cursor: pointer;\n      display: block;\n      outline: none;\n      padding: 5px;\n      width: 100%; }\n      .game-container .sidebar button:not(:last-child) {\n        margin-bottom: 5px; }\n      .game-container .sidebar button.toggle-menu {\n        background: #2a2d30; }\n      .game-container .sidebar button.start-game {\n        background: #234f71; }\n      .game-container .sidebar button.stop-game {\n        background: #a52424; }\n  .game-container .main-area {\n    display: flex;\n    flex: 5;\n    flex-direction: column;\n    position: relative; }\n    .game-container .main-area .top-bar {\n      background: #586d46;\n      border-bottom: 1px solid #4a4a4a;\n      color: #fff;\n      display: flex;\n      padding: 10px;\n      text-shadow: 1px 1px 0px #000; }\n      .game-container .main-area .top-bar > * {\n        flex: 1; }\n      .game-container .main-area .top-bar .scores {\n        list-style: none;\n        margin: 0;\n        padding: 0; }\n        .game-container .main-area .top-bar .scores li {\n          display: inline-flex;\n          margin-right: 10px;\n          vertical-align: middle; }\n          .game-container .main-area .top-bar .scores li .color-block {\n            box-shadow: 1px 1px 1px 0px #000;\n            height: 20px;\n            order: 0;\n            width: 20px; }\n          .game-container .main-area .top-bar .scores li .score {\n            order: 1; }\n        .game-container .main-area .top-bar .scores.teams-2 li:nth-child(2)::before {\n          content: '-';\n          margin-right: 10px; }\n        .game-container .main-area .top-bar .scores.teams-2 li:nth-child(2) .color-block {\n          margin-left: 5px;\n          margin-right: 0;\n          order: 1; }\n        .game-container .main-area .top-bar .scores.teams-2 li:nth-child(2) .score {\n          order: 0; }\n      .game-container .main-area .top-bar .room-name {\n        letter-spacing: 2px;\n        text-align: center; }\n      .game-container .main-area .top-bar .timer {\n        text-align: right; }\n        .game-container .main-area .top-bar .timer .overtime {\n          font-size: 0.6rem;\n          letter-spacing: 1px;\n          margin-right: 5px;\n          text-transform: uppercase; }\n        .game-container .main-area .top-bar .timer span.flash {\n          animation: timer-flash linear 500ms alternate infinite; }\n    .game-container .main-area .content {\n      flex: 1;\n      position: relative; }\n      .game-container .main-area .content .pitch {\n        height: 100%;\n        position: relative;\n        outline: none; }\n        .game-container .main-area .content .pitch canvas {\n          display: block;\n          position: absolute; }\n      .game-container .main-area .content .menu-container {\n        bottom: 0;\n        display: flex;\n        left: 0;\n        right: 0;\n        top: 0;\n        position: absolute; }\n    .game-container .main-area .chat-container {\n      background: #718c5a;\n      flex: 1;\n      max-height: 25%;\n      padding: 1%; }\n      .game-container .main-area .chat-container .chat {\n        height: 100%;\n        margin: 0 auto;\n        width: 75%; }\n  .game-container .color-block {\n    border-radius: 2px;\n    display: inline-block;\n    margin-right: 5px;\n    height: 15px;\n    width: 15px;\n    vertical-align: middle; }\n\n@keyframes timer-flash {\n  from {\n    color: white; }\n  to {\n    color: #e35252; } }\n", "", {"version":3,"sources":["/./styles/styles/chat.scss","/./styles/styles/menu.scss","/./styles/styles/player-list.scss","/./styles/styles/colors.scss","/./styles/styles/main.scss"],"names":[],"mappings":"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","file":"main.scss","sourcesContent":[".chat {\n    background: rgba(0, 0, 0, 0.2);\n    display: flex;\n    flex-direction: column;\n\n    .messages {\n        color: #efefef;\n        font-size: 0.8rem;\n        flex: 1;\n        height: calc(100% - 25px);\n        margin: 0;\n        padding: 5px 8px;\n\n        ul {\n            height: 100%;\n            list-style: none;\n            margin: 0;\n            padding-left: 0;\n            overflow: auto;\n\n            &::-webkit-scrollbar {\n                width: 10px;\n            }\n\n            &::-webkit-scrollbar-track, &::-webkit-scrollbar-thumb {\n                background: rgba(0, 0, 0, 0.2);\n                border-radius: 5px;\n            }\n        }\n    }\n\n    form {\n        height: 25px;\n\n        input {\n            background: rgba(0, 0, 0, 0.25);\n            border: none;\n            color: white;\n            display: block;\n            height: 100%;\n            margin: 0;\n            outline: none;\n            padding: 5px;\n            width: 100%;\n        }\n    }\n}\n",".menu {\n    background: rgba(0, 0, 0, 0.6);\n    border-radius: 5px;\n    color: #efefef;\n    display: flex;\n    font-size: 0.9rem;\n    margin: 2% auto;\n    padding: 1%;\n    width: 75%;\n\n    .setting-group {\n        flex: 1;\n    }\n\n    h2 {\n        margin-top: 0;\n    }\n\n    .input-group {\n        margin-bottom: 2px;\n    }\n\n    label {\n        span {\n            display: inline-block;\n            width: 30%;\n        }\n\n        input, select {\n            background: rgba(0, 0, 0, 0.6);\n            border: 0;\n            border-radius: 5px;\n            color: #efefef;\n            outline: none;\n            padding: 5px;\n\n            &.block {\n                display: inline-block;\n                width: 70%;\n            }\n        }\n    }\n}\n",".player-list {\n    background: #181d20;\n    font-size: 0.8rem;\n    margin-top: 8px;\n    list-style: none;\n    padding-left: 0px;\n\n    li {\n        margin-bottom: 0;\n        padding: 4px 6px;\n    }\n\n    img {\n        display: inline-block;\n        margin-right: 5px;\n        vertical-align: middle;\n        width: 16px;\n    }\n\n    span.admin {\n        color: $adminColor;\n    }\n\n    .react-contextmenu {\n        background: #eee;\n        border-radius: 5px;\n        color: $sidebarColor;\n\n        .react-contextmenu-item {\n            cursor: pointer;\n            padding: 5px;\n        }\n    }\n}\n","$bgColor: #718c5a;\n$sidebarColor: #111518;\n$adminColor: #f4ff65;\n","@import 'colors';\n@import 'chat';\n@import 'menu';\n@import 'player-list';\n\nbody {\n    font-family: 'Open Sans';\n    font-size: 1rem;\n    margin: 0;\n}\n\n#gameMount {\n    height: 100vh;\n}\n\n.game-container {\n    * {\n        box-sizing: border-box;\n    }\n\n    display: flex;\n    height: 100%;\n\n    .sidebar {\n        background-color: $sidebarColor;\n        color: #fff;\n        display: flex;\n        flex: 1;\n        flex-direction: column;\n        justify-content: space-between;\n        padding: 10px;\n\n        .teams-list {\n            font-size: 0.9rem;\n            margin: 0;\n            list-style: none;\n            padding: 0;\n\n            > li {\n                border-bottom: 1px solid #000;\n                border-top: 1px solid #1f2528;\n                padding: 8px 2px;\n\n                &:first-child {\n                    border-top: 0;\n                }\n\n                &:last-child {\n                    border-bottom: 0;\n                }\n\n                a {\n                    color: #fff;\n                    font-weight: bold;\n                    text-decoration: none;\n                }\n\n                .score {\n                    float: right;\n                    font-weight: bold;\n                }\n            }\n        }\n\n        button {\n            border: 0;\n            border-radius: 3px;\n            color: white;\n            cursor: pointer;\n            display: block;\n            outline: none;\n            padding: 5px;\n            width: 100%;\n\n            &:not(:last-child) {\n                margin-bottom: 5px;\n            }\n\n            &.toggle-menu {\n                background: #2a2d30;\n            }\n\n            &.start-game {\n                background: #234f71;\n            }\n\n            &.stop-game {\n                background: #a52424;\n            }\n        }\n    }\n\n    .main-area {\n        display: flex;\n        flex: 5;\n        flex-direction: column;\n        position: relative;\n\n        .top-bar {\n            background: darken($bgColor, 10%);\n            border-bottom: 1px solid #4a4a4a;\n            color: #fff;\n            display: flex;\n            padding: 10px;\n            text-shadow: 1px 1px 0px #000;\n\n            > * {\n                flex: 1;\n            }\n\n            .scores {\n                list-style: none;\n                margin: 0;\n                padding: 0;\n\n                li {\n                    display: inline-flex;\n                    margin-right: 10px;\n                    vertical-align: middle;\n\n                    .color-block {\n                        box-shadow: 1px 1px 1px 0px #000;\n                        height: 20px;\n                        order: 0;\n                        width: 20px;\n                    }\n\n                    .score {\n                        order: 1;\n                    }\n                }\n\n                &.teams-2 li:nth-child(2) {\n                    &::before {\n                        content: '-';\n                        margin-right: 10px;\n                    }\n\n                    .color-block {\n                        margin-left: 5px;\n                        margin-right: 0;\n                        order: 1;\n                    }\n\n                    .score {\n                        order: 0;\n                    }\n                }\n            }\n\n            .room-name {\n                letter-spacing: 2px;\n                text-align: center;\n            }\n\n            .timer {\n                text-align: right;\n\n                .overtime {\n                    font-size: 0.6rem;\n                    letter-spacing: 1px;\n                    margin-right: 5px;\n                    text-transform: uppercase;\n                }\n\n                span.flash {\n                    animation: timer-flash linear 500ms alternate infinite;\n                }\n            }\n        }\n\n        .content {\n            flex: 1;\n            position: relative;\n\n            .pitch {\n                height: 100%;\n                position: relative;\n                outline: none;\n\n                canvas {\n                    display: block;\n                    position: absolute;\n                }\n            }\n\n            .menu-container {\n                bottom: 0;\n                display: flex;\n                left: 0;\n                right: 0;\n                top: 0;\n                position: absolute;\n            }\n        }\n\n        .chat-container {\n            background: $bgColor;\n            flex: 1;\n            max-height: 25%;\n            padding: 1%;\n\n            .chat {\n                height: 100%;\n                margin: 0 auto;\n                width: 75%;\n            }\n        }\n    }\n\n    .color-block {\n        border-radius: 2px;\n        display: inline-block;\n        margin-right: 5px;\n        height: 15px;\n        width: 15px;\n        vertical-align: middle;\n    }\n}\n\n@keyframes timer-flash {\n    from {\n        color: white;\n    }\n\n    to {\n        color: #e35252;\n    }\n}\n"],"sourceRoot":"webpack://"}]);

// exports


/***/ }),
/* 21 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_object_assign__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__globalEventListener__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__actions__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__helpers__ = __webpack_require__(3);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









var ContextMenu = function (_Component) {
    _inherits(ContextMenu, _Component);

    function ContextMenu(props) {
        _classCallCheck(this, ContextMenu);

        var _this = _possibleConstructorReturn(this, (ContextMenu.__proto__ || Object.getPrototypeOf(ContextMenu)).call(this, props));

        _this.registerHandlers = function () {
            document.addEventListener('mousedown', _this.handleOutsideClick);
            document.addEventListener('ontouchstart', _this.handleOutsideClick);
            document.addEventListener('scroll', _this.handleHide);
            document.addEventListener('contextmenu', _this.handleHide);
            document.addEventListener('keyup', _this.handleEscape);
            window.addEventListener('resize', _this.handleHide);
        };

        _this.unregisterHandlers = function () {
            document.removeEventListener('mousedown', _this.handleOutsideClick);
            document.removeEventListener('ontouchstart', _this.handleOutsideClick);
            document.removeEventListener('scroll', _this.handleHide);
            document.removeEventListener('contextmenu', _this.handleHide);
            document.removeEventListener('keyup', _this.handleEscape);
            window.removeEventListener('resize', _this.handleHide);
        };

        _this.handleShow = function (e) {
            if (e.detail.id !== _this.props.id || _this.state.isVisible) return;

            var _e$detail$position = e.detail.position,
                x = _e$detail$position.x,
                y = _e$detail$position.y;


            _this.setState({ isVisible: true, x: x, y: y });
            _this.registerHandlers();
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__helpers__["c" /* callIfExists */])(_this.props.onShow, e);
        };

        _this.handleHide = function (e) {
            if (_this.state.isVisible) {
                _this.unregisterHandlers();
                _this.setState({ isVisible: false });
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__helpers__["c" /* callIfExists */])(_this.props.onHide, e);
            }
        };

        _this.handleEscape = function (e) {
            if (e.keyCode === 27) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__actions__["a" /* hideMenu */])();
            }
        };

        _this.handleOutsideClick = function (e) {
            if (!_this.menu.contains(e.target)) __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__actions__["a" /* hideMenu */])();
        };

        _this.handleMouseLeave = function (event) {
            event.preventDefault();

            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__helpers__["c" /* callIfExists */])(_this.props.onMouseLeave, event, __WEBPACK_IMPORTED_MODULE_2_object_assign___default()({}, _this.props.data, __WEBPACK_IMPORTED_MODULE_5__helpers__["d" /* store */].data), __WEBPACK_IMPORTED_MODULE_5__helpers__["d" /* store */].target);

            if (_this.props.hideOnLeave) __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__actions__["a" /* hideMenu */])();
        };

        _this.getMenuPosition = function () {
            var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var _window = window,
                innerWidth = _window.innerWidth,
                innerHeight = _window.innerHeight;

            var rect = _this.menu.getBoundingClientRect();
            var menuStyles = {
                top: y,
                left: x
            };

            if (y + rect.height > innerHeight) {
                menuStyles.top -= rect.height;
            }

            if (x + rect.width > innerWidth) {
                menuStyles.left -= rect.width;
            }

            if (menuStyles.top < 0) {
                menuStyles.top = rect.height < innerHeight ? (innerHeight - rect.height) / 2 : 0;
            }

            if (menuStyles.left < 0) {
                menuStyles.left = rect.width < innerWidth ? (innerWidth - rect.width) / 2 : 0;
            }

            return menuStyles;
        };

        _this.menuRef = function (c) {
            _this.menu = c;
        };

        _this.state = {
            x: 0,
            y: 0,
            isVisible: false
        };
        return _this;
    }

    _createClass(ContextMenu, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.listenId = __WEBPACK_IMPORTED_MODULE_3__globalEventListener__["a" /* default */].register(this.handleShow, this.handleHide);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var _this2 = this;

            if (this.state.isVisible) {
                window.requestAnimationFrame(function () {
                    var _state = _this2.state,
                        x = _state.x,
                        y = _state.y;

                    var _getMenuPosition = _this2.getMenuPosition(x, y),
                        top = _getMenuPosition.top,
                        left = _getMenuPosition.left;

                    window.requestAnimationFrame(function () {
                        _this2.menu.style.top = top + 'px';
                        _this2.menu.style.left = left + 'px';
                        _this2.menu.style.opacity = 1;
                        _this2.menu.style.pointerEvents = 'auto';
                    });
                });
            } else {
                this.menu.style.opacity = 0;
                this.menu.style.pointerEvents = 'none';
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.listenId) {
                __WEBPACK_IMPORTED_MODULE_3__globalEventListener__["a" /* default */].unregister(this.listenId);
            }

            this.unregisterHandlers();
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                className = _props.className;
            var isVisible = this.state.isVisible;

            var style = { position: 'fixed', opacity: 0, pointerEvents: 'none' };
            var menuClassnames = __WEBPACK_IMPORTED_MODULE_1_classnames___default()(__WEBPACK_IMPORTED_MODULE_5__helpers__["b" /* cssClasses */].menu, className, _defineProperty({}, __WEBPACK_IMPORTED_MODULE_5__helpers__["b" /* cssClasses */].menuVisible, isVisible));

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'nav',
                { ref: this.menuRef, style: style, className: menuClassnames,
                    onContextMenu: this.handleHide, onMouseLeave: this.handleMouseLeave },
                children
            );
        }
    }]);

    return ContextMenu;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

ContextMenu.propTypes = {
    id: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string.isRequired,
    className: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string,
    hideOnLeave: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].bool,
    onHide: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func,
    onMouseLeave: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func,
    onShow: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func
};
/* harmony default export */ __webpack_exports__["a"] = ContextMenu;

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_object_assign__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actions__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helpers__ = __webpack_require__(3);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var ContextMenuTrigger = function (_Component) {
    _inherits(ContextMenuTrigger, _Component);

    function ContextMenuTrigger() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ContextMenuTrigger);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ContextMenuTrigger.__proto__ || Object.getPrototypeOf(ContextMenuTrigger)).call.apply(_ref, [this].concat(args))), _this), _this.handleMouseDown = function (event) {
            if (_this.props.holdToDisplay >= 0 && event.button === 0) {
                event.persist();

                _this.mouseDownTimeoutId = setTimeout(function () {
                    return _this.handleContextClick(event);
                }, _this.props.holdToDisplay);
            }
        }, _this.handleMouseUp = function (event) {
            if (event.button === 0) {
                clearTimeout(_this.mouseDownTimeoutId);
            }
        }, _this.handleTouchstart = function (event) {
            if (_this.props.holdToDisplay >= 0) {
                event.persist();

                _this.touchstartTimeoutId = setTimeout(function () {
                    return _this.handleContextClick(event);
                }, _this.props.holdToDisplay);
            }
        }, _this.handleTouchEnd = function (event) {
            event.preventDefault();
            clearTimeout(_this.touchstartTimeoutId);
        }, _this.handleContextClick = function (event) {
            if (_this.props.disable) return;

            event.preventDefault();
            event.stopPropagation();

            var x = event.clientX || event.touches && event.touches[0].pageX;
            var y = event.clientY || event.touches && event.touches[0].pageY;

            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__actions__["a" /* hideMenu */])();

            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__actions__["b" /* showMenu */])({
                position: { x: x, y: y },
                target: _this.elem,
                id: _this.props.id,
                data: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__helpers__["c" /* callIfExists */])(_this.props.collect, _this.props)
            });
        }, _this.elemRef = function (c) {
            _this.elem = c;
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ContextMenuTrigger, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                renderTag = _props.renderTag,
                attributes = _props.attributes,
                children = _props.children;

            var newAttrs = __WEBPACK_IMPORTED_MODULE_2_object_assign___default()({}, attributes, {
                className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()(__WEBPACK_IMPORTED_MODULE_4__helpers__["b" /* cssClasses */].menuWrapper, attributes.className),
                onContextMenu: this.handleContextClick,
                onMouseDown: this.handleMouseDown,
                onMouseUp: this.handleMouseUp,
                onTouchStart: this.handleTouchstart,
                onTouchEnd: this.handleTouchEnd,
                onMouseOut: this.handleMouseUp,
                ref: this.elemRef
            });

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(renderTag, newAttrs, children);
        }
    }]);

    return ContextMenuTrigger;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

ContextMenuTrigger.propTypes = {
    id: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string.isRequired,
    attributes: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object,
    collect: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func,
    disable: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].bool,
    holdToDisplay: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].number,
    renderTag: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].node
};
ContextMenuTrigger.defaultProps = {
    attributes: {},
    disable: false,
    holdToDisplay: 1000,
    renderTag: 'div'
};
/* harmony default export */ __webpack_exports__["a"] = ContextMenuTrigger;

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_object_assign__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actions__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helpers__ = __webpack_require__(3);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var MenuItem = function (_Component) {
    _inherits(MenuItem, _Component);

    function MenuItem() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, MenuItem);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MenuItem.__proto__ || Object.getPrototypeOf(MenuItem)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (event) {
            event.preventDefault();

            if (_this.props.disabled) return;

            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__helpers__["c" /* callIfExists */])(_this.props.onClick, event, __WEBPACK_IMPORTED_MODULE_2_object_assign___default()({}, _this.props.data, __WEBPACK_IMPORTED_MODULE_4__helpers__["d" /* store */].data), __WEBPACK_IMPORTED_MODULE_4__helpers__["d" /* store */].target);

            if (_this.props.preventClose) return;

            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__actions__["a" /* hideMenu */])();
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(MenuItem, [{
        key: 'render',
        value: function render() {
            var _cx;

            var _props = this.props,
                disabled = _props.disabled,
                divider = _props.divider,
                children = _props.children,
                attributes = _props.attributes;

            var menuItemClassNames = __WEBPACK_IMPORTED_MODULE_1_classnames___default()(__WEBPACK_IMPORTED_MODULE_4__helpers__["b" /* cssClasses */].menuItem, attributes && attributes.className, (_cx = {}, _defineProperty(_cx, __WEBPACK_IMPORTED_MODULE_4__helpers__["b" /* cssClasses */].menuItemDisabled, disabled), _defineProperty(_cx, __WEBPACK_IMPORTED_MODULE_4__helpers__["b" /* cssClasses */].menuItemDivider, divider), _cx));

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                _extends({}, attributes, { className: menuItemClassNames,
                    onTouchEnd: this.handleClick, onClick: this.handleClick }),
                children
            );
        }
    }]);

    return MenuItem;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

MenuItem.propTypes = {
    attributes: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object,
    data: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object,
    disabled: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].bool,
    preventClose: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].bool,
    onClick: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func
};
MenuItem.defaultProps = {
    disabled: false,
    data: {},
    attributes: {}
};
/* harmony default export */ __webpack_exports__["a"] = MenuItem;

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helpers__ = __webpack_require__(3);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var SubMenu = function (_Component) {
    _inherits(SubMenu, _Component);

    function SubMenu(props) {
        _classCallCheck(this, SubMenu);

        var _this = _possibleConstructorReturn(this, (SubMenu.__proto__ || Object.getPrototypeOf(SubMenu)).call(this, props));

        _this.handleClick = function (e) {
            e.preventDefault();
        };

        _this.handleMouseEnter = function () {
            if (_this.closetimer) clearTimeout(_this.closetimer);

            if (_this.props.disabled || _this.state.visible) return;

            _this.opentimer = setTimeout(function () {
                return _this.setState({ visible: true });
            }, _this.props.hoverDelay);
        };

        _this.handleMouseLeave = function () {
            if (_this.opentimer) clearTimeout(_this.opentimer);

            if (!_this.state.visible) return;

            _this.closetimer = setTimeout(function () {
                return _this.setState({ visible: false });
            }, _this.props.hoverDelay);
        };

        _this.getMenuPosition = function () {
            var _window = window,
                innerWidth = _window.innerWidth,
                innerHeight = _window.innerHeight;

            var rect = _this.subMenu.getBoundingClientRect();
            var position = {};

            if (rect.bottom > innerHeight) {
                position.bottom = 0;
            } else {
                position.top = 0;
            }

            if (rect.right < innerWidth) {
                position.left = '100%';
            } else {
                position.right = '100%';
            }

            return position;
        };

        _this.getRTLMenuPosition = function () {
            var _window2 = window,
                innerHeight = _window2.innerHeight;

            var rect = _this.subMenu.getBoundingClientRect();
            var position = {};

            if (rect.bottom > innerHeight) {
                position.bottom = 0;
            } else {
                position.top = 0;
            }

            if (rect.left < 0) {
                position.left = '100%';
            } else {
                position.right = '100%';
            }

            return position;
        };

        _this.menuRef = function (c) {
            _this.menu = c;
        };

        _this.subMenuRef = function (c) {
            _this.subMenu = c;
        };

        _this.state = {
            visible: false
        };
        return _this;
    }

    _createClass(SubMenu, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            return this.state.isVisible !== nextState.visible;
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var _this2 = this;

            if (this.state.visible) {
                var wrapper = window.requestAnimationFrame || setTimeout;

                wrapper(function () {
                    var styles = _this2.props.rtl ? _this2.getRTLMenuPosition() : _this2.getMenuPosition();

                    _this2.subMenu.style.removeProperty('top');
                    _this2.subMenu.style.removeProperty('bottom');
                    _this2.subMenu.style.removeProperty('left');
                    _this2.subMenu.style.removeProperty('right');

                    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__helpers__["a" /* hasOwnProp */])(styles, 'top')) _this2.subMenu.style.top = styles.top;
                    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__helpers__["a" /* hasOwnProp */])(styles, 'left')) _this2.subMenu.style.left = styles.left;
                    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__helpers__["a" /* hasOwnProp */])(styles, 'bottom')) _this2.subMenu.style.bottom = styles.bottom;
                    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__helpers__["a" /* hasOwnProp */])(styles, 'right')) _this2.subMenu.style.right = styles.right;
                    _this2.subMenu.classList.add(__WEBPACK_IMPORTED_MODULE_2__helpers__["b" /* cssClasses */].menuVisible);
                });
            } else {
                this.subMenu.classList.remove(__WEBPACK_IMPORTED_MODULE_2__helpers__["b" /* cssClasses */].menuVisible);
                this.subMenu.style.removeProperty('bottom');
                this.subMenu.style.removeProperty('right');
                this.subMenu.style.top = 0;
                this.subMenu.style.left = '100%';
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.opentimer) clearTimeout(this.opentimer);

            if (this.closetimer) clearTimeout(this.closetimer);
        }
    }, {
        key: 'render',
        value: function render() {
            var _cx;

            var _props = this.props,
                children = _props.children,
                disabled = _props.disabled,
                title = _props.title;
            var visible = this.state.visible;

            var menuProps = {
                ref: this.menuRef,
                onMouseEnter: this.handleMouseEnter,
                onMouseLeave: this.handleMouseLeave,
                className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()(__WEBPACK_IMPORTED_MODULE_2__helpers__["b" /* cssClasses */].menuItem, __WEBPACK_IMPORTED_MODULE_2__helpers__["b" /* cssClasses */].subMenu),
                style: {
                    position: 'relative'
                }
            };
            var menuItemProps = {
                className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()(__WEBPACK_IMPORTED_MODULE_2__helpers__["b" /* cssClasses */].menuItem, (_cx = {}, _defineProperty(_cx, __WEBPACK_IMPORTED_MODULE_2__helpers__["b" /* cssClasses */].menuItemDisabled, disabled), _defineProperty(_cx, __WEBPACK_IMPORTED_MODULE_2__helpers__["b" /* cssClasses */].menuItemActive, visible), _cx)),
                onClick: this.handleClick
            };
            var subMenuProps = {
                ref: this.subMenuRef,
                style: {
                    position: 'absolute',
                    top: 0,
                    left: '100%'
                },
                className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()(__WEBPACK_IMPORTED_MODULE_2__helpers__["b" /* cssClasses */].menu, this.props.className)
            };

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'nav',
                menuProps,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    menuItemProps,
                    title
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'nav',
                    subMenuProps,
                    children
                )
            );
        }
    }]);

    return SubMenu;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

SubMenu.propTypes = {
    title: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].node.isRequired,
    className: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string,
    disabled: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].bool,
    hoverDelay: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].number,
    rtl: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].bool
};
SubMenu.defaultProps = {
    disabled: false,
    hoverDelay: 500
};
/* unused harmony default export */ var _unused_webpack_default_export = SubMenu;

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers__ = __webpack_require__(3);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var GlobalEventListener = function GlobalEventListener() {
    var _this = this;

    _classCallCheck(this, GlobalEventListener);

    this.handleShowEvent = function (event) {
        for (var id in _this.callbacks) {
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers__["a" /* hasOwnProp */])(_this.callbacks, id)) _this.callbacks[id].show(event);
        }
    };

    this.handleHideEvent = function (event) {
        for (var id in _this.callbacks) {
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers__["a" /* hasOwnProp */])(_this.callbacks, id)) _this.callbacks[id].hide(event);
        }
    };

    this.register = function (showCallback, hideCallback) {
        var id = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers__["e" /* uniqueId */])();

        _this.callbacks[id] = {
            show: showCallback,
            hide: hideCallback
        };

        return id;
    };

    this.unregister = function (id) {
        if (id && _this.callbacks[id]) {
            delete _this.callbacks[id];
        }
    };

    this.callbacks = {};

    if (__WEBPACK_IMPORTED_MODULE_1__helpers__["f" /* canUseDOM */]) {
        window.addEventListener(__WEBPACK_IMPORTED_MODULE_0__actions__["c" /* MENU_SHOW */], this.handleShowEvent);
        window.addEventListener(__WEBPACK_IMPORTED_MODULE_0__actions__["d" /* MENU_HIDE */], this.handleHideEvent);
    }
};

/* harmony default export */ __webpack_exports__["a"] = new GlobalEventListener();

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ContextMenu__ = __webpack_require__(22);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__ContextMenu__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ContextMenuTrigger__ = __webpack_require__(23);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__ContextMenuTrigger__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__MenuItem__ = __webpack_require__(24);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__MenuItem__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__SubMenu__ = __webpack_require__(25);
/* unused harmony reexport SubMenu */





/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {(function (global, factory) {
     true ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.ResizeObserver = factory());
}(this, (function () {
'use strict';

/**
 * Exports global object for the current environment.
 */
var global$1 = (function () {
    if (typeof self != 'undefined' && self.Math === Math) {
        return self;
    }

    if (typeof window != 'undefined' && window.Math === Math) {
        return window;
    }

    if (typeof global != 'undefined' && global.Math === Math) {
        return global;
    }

    // eslint-disable-next-line no-new-func
    return Function('return this')();
})();

var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
};

var createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

/**
 * A collection of shims that provides minimal
 * support of WeakMap and Map classes.
 *
 * These implementations are not meant to be used outside of
 * ResizeObserver modules as they cover only a limited range
 * of use cases.
 */
/* eslint-disable require-jsdoc */
var hasNativeCollections = typeof global$1.WeakMap === 'function' && typeof global$1.Map === 'function';

var WeakMap = function () {
    if (hasNativeCollections) {
        return global$1.WeakMap;
    }

    function getIndex(arr, key) {
        var result = -1;

        arr.some(function (entry, index) {
            var matches = entry[0] === key;

            if (matches) {
                result = index;
            }

            return matches;
        });

        return result;
    }

    return function () {
        function _class() {
            classCallCheck(this, _class);

            this.__entries__ = [];
        }

        _class.prototype.get = function get(key) {
            var index = getIndex(this.__entries__, key);

            return this.__entries__[index][1];
        };

        _class.prototype.set = function set(key, value) {
            var index = getIndex(this.__entries__, key);

            if (~index) {
                this.__entries__[index][1] = value;
            } else {
                this.__entries__.push([key, value]);
            }
        };

        _class.prototype.delete = function _delete(key) {
            var entries = this.__entries__,
                index = getIndex(entries, key);

            if (~index) {
                entries.splice(index, 1);
            }
        };

        _class.prototype.has = function has(key) {
            return !!~getIndex(this.__entries__, key);
        };

        return _class;
    }();
}();

var Map = function () {
    if (hasNativeCollections) {
        return global$1.Map;
    }

    return function (_WeakMap) {
        inherits(_class2, _WeakMap);

        function _class2() {
            classCallCheck(this, _class2);
            return possibleConstructorReturn(this, _WeakMap.apply(this, arguments));
        }

        _class2.prototype.clear = function clear() {
            this.__entries__.splice(0, this.__entries__.length);
        };

        _class2.prototype.entries = function entries() {
            return this.__entries__.slice();
        };

        _class2.prototype.keys = function keys() {
            return this.__entries__.map(function (entry) {
                return entry[0];
            });
        };

        _class2.prototype.values = function values() {
            return this.__entries__.map(function (entry) {
                return entry[1];
            });
        };

        _class2.prototype.forEach = function forEach(callback) {
            var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            for (var _iterator = this.__entries__, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                var _ref;

                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }

                var entry = _ref;

                callback.call(ctx, entry[1], entry[0]);
            }
        };

        createClass(_class2, [{
            key: 'size',
            get: function get() {
                return this.__entries__.length;
            }
        }]);
        return _class2;
    }(WeakMap);
}();

/**
 * Detects whether window and document objects are available in current environment.
 */
var isBrowser = global$1.window === global$1 && typeof document != 'undefined';

// Placeholder of an empty content rectangle.
var emptyRect = createContentRect(0, 0, 0, 0);

/**
 * Extracts computed styles of provided element.
 *
 * @param {Element} target
 * @returns {CSSStyleDeclaration}
 */
function getStyles(target) {
    return getComputedStyle(target);
}

/**
 * Converts provided string defined in q form of '{{value}}px' to number.
 *
 * @param {String} value
 * @returns {Number}
 */
function pixelsToNumber(value) {
    return parseFloat(value) || 0;
}

/**
 * Extracts borders size from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @param {...String} positions - Borders positions (top, right, ...)
 * @returns {Number}
 */
function getBordersSize(styles) {
    for (var _len = arguments.length, positions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        positions[_key - 1] = arguments[_key];
    }

    return positions.reduce(function (size, pos) {
        var value = styles['border-' + pos + '-width'];

        return size + pixelsToNumber(value);
    }, 0);
}

/**
 * Extracts paddings sizes from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @returns {Object} Paddings box.
 */
function getPaddings(styles) {
    var boxKeys = ['top', 'right', 'bottom', 'left'];
    var paddings = {};

    for (var _iterator = boxKeys, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var key = _ref;

        var value = styles['padding-' + key];

        paddings[key] = pixelsToNumber(value);
    }

    return paddings;
}

/**
 * Creates content rectangle based on the provided dimensions
 * and the top/left positions.
 *
 * @param {Number} width - Width of rectangle.
 * @param {Number} height - Height of rectangle.
 * @param {Number} top - Top position.
 * @param {Number} left - Left position.
 * @returns {ClientRect}
 */
function createContentRect(width, height, top, left) {
    return {
        width: width, height: height, top: top,
        right: width + left,
        bottom: height + top,
        left: left
    };
}

/**
 * Calculates content rectangle of provided SVG element.
 *
 * @param {SVGElement} target - Element whose content
 *      rectangle needs to be calculated.
 * @returns {ClientRect}
 */
function getSVGContentRect(target) {
    var bbox = target.getBBox();

    return createContentRect(bbox.width, bbox.height, 0, 0);
}

/**
 * Calculates content rectangle of a root element.
 *
 * @returns {ClientRect}
 */
function getDocElementRect() {
    // Neither scroll[Width/Height] nor offset[Width/Height] can be used to
    // define content dimensions as they give inconsistent results across
    // different browsers. E.g. in the Internet Explorer 10 and lower value of
    // these properties can't be less than the client dimensions (same thing
    // with the "getBoundingClientRect" method). And Firefox has the same
    // behavior with its "scroll" properties.
    var styles = getStyles(document.documentElement);

    var width = pixelsToNumber(styles.width);
    var height = pixelsToNumber(styles.height);

    return createContentRect(width, height, 0, 0);
}

/**
 * Calculates content rectangle of provided HTMLElement.
 *
 * @param {HTMLElement} target - Element whose content
 *      rectangle needs to be calculated.
 * @returns {ClientRect}
 */
function getHTMLElementContentRect(target) {
    // Client width & height properties can't be
    // used exclusively as they provide rounded values.
    var clientWidth = target.clientWidth,
        clientHeight = target.clientHeight;

    // By this condition we can catch all non-replaced inline, hidden and detached
    // elements. Though elements with width & height properties less than 0.5 will
    // be discarded as well.
    //
    // Without it we would need to implement separate methods for each of
    // those cases and it's not possible to perform a precise and performance
    // effective test for hidden elements. E.g. even jQuerys' ':visible' filter
    // gives wrong results for elements with width & height less than 0.5.

    if (!clientWidth && !clientHeight) {
        return emptyRect;
    }

    var styles = getStyles(target);
    var paddings = getPaddings(styles);
    var horizPad = paddings.left + paddings.right;
    var vertPad = paddings.top + paddings.bottom;

    // Computed styles of width & height are being used because they are the
    // only dimensions available to JS that contain non-rounded values. It could
    // be possible to utilize getBoundingClientRect if only its' data wasn't
    // affected by CSS transformations let alone paddings, borders and scroll bars.
    var width = pixelsToNumber(styles.width),
        height = pixelsToNumber(styles.height);

    // Width & height include paddings and borders
    // when 'border-box' box model is applied (except for IE).
    if (styles.boxSizing === 'border-box') {
        // Following conditions are required to handle Internet Explorer which
        // doesn't include paddings and borders to computed CSS dimensions.
        //
        // We can say that if CSS dimensions + paddings are equal to the "client"
        // properties then it's either IE, and thus we don't need to subtract
        // anything, or an element merely doesn't have paddings/borders styles.
        if (Math.round(width + horizPad) !== clientWidth) {
            width -= getBordersSize(styles, 'left', 'right') + horizPad;
        }

        if (Math.round(height + vertPad) !== clientHeight) {
            height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
        }
    }

    // In some browsers (only in Firefox, actually) CSS width & height
    // include scroll bars size which can be removed at this step as scroll bars
    // are the only difference between rounded dimensions + paddings and "client"
    // properties, though that is not always true in Chrome.
    var vertScrollbar = Math.round(width + horizPad) - clientWidth;
    var horizScrollbar = Math.round(height + vertPad) - clientHeight;

    // Chrome has a rather weird rounding of "client" properties.
    // E.g. for an element with content width of 314.2px it sometimes gives the
    // client width of 315px and for the width of 314.7px it may give 314px.
    // And it doesn't happen all the time. Such difference needs to be ignored.
    if (Math.abs(vertScrollbar) !== 1) {
        width -= vertScrollbar;
    }

    if (Math.abs(horizScrollbar) !== 1) {
        height -= horizScrollbar;
    }

    return createContentRect(width, height, paddings.top, paddings.left);
}

/**
 * Checks whether provided element is an instance of SVGElement.
 *
 * @param {Element} target - Element to be checked.
 * @returns {Boolean}
 */
function isSVGElement(target) {
    return target instanceof SVGElement;
}

/**
 * Checks whether provided element is a document element (root element of a document).
 *
 * @param {Element} target - Element to be checked.
 * @returns {Boolean}
 */
function isDocumentElement(target) {
    return target === document.documentElement;
}

/**
 * Calculates an appropriate content rectangle for provided html or svg element.
 *
 * @param {Element} target - Element whose content rectangle
 *      needs to be calculated.
 * @returns {ClientRect}
 */
function getContentRect(target) {
    // Return empty rectangle if running in a non-browser environment.
    if (!isBrowser) {
        return emptyRect;
    }

    if (isSVGElement(target)) {
        return getSVGContentRect(target);
    }

    if (isDocumentElement(target)) {
        return getDocElementRect();
    }

    return getHTMLElementContentRect(target);
}

/**
 * Class that is responsible for computations of the content rectangle of
 * provided DOM element and for keeping track of its' changes.
 */
var ResizeObservation = function () {
    /**
     * Creates an instance of ResizeObservation.
     *
     * @param {Element} target - Element to be observed.
     */
    function ResizeObservation(target) {
        classCallCheck(this, ResizeObservation);

        this.target = target;

        // Keeps reference to the last observed content rectangle.
        this._contentRect = emptyRect;

        // Broadcasted width of content rectangle.
        this.broadcastWidth = 0;

        // Broadcasted height of content rectangle.
        this.broadcastHeight = 0;
    }

    /**
     * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
     * from the corresponding properties of the last observed content rectangle.
     *
     * @returns {ClientRect} Last observed content rectangle.
     */
    ResizeObservation.prototype.broadcastRect = function broadcastRect() {
        var rect = this._contentRect;

        this.broadcastWidth = rect.width;
        this.broadcastHeight = rect.height;

        return rect;
    };

    /**
     * Updates content rectangle and tells whether its' width or height properties
     * have changed since the last broadcast.
     *
     * @returns {Boolean}
     */
    ResizeObservation.prototype.isActive = function isActive() {
        var rect = getContentRect(this.target);

        this._contentRect = rect;

        return rect.width !== this.broadcastWidth || rect.height !== this.broadcastHeight;
    };

    return ResizeObservation;
}();

/**
 * Defines properties of the provided target object.
 *
 * @param {Object} target - Object for which to define properties.
 * @param {Object} props - Properties to be defined.
 * @param {Object} [descr = {}] - Properties descriptor.
 * @returns {Object} Target object.
 */
function defineProperties(target, props) {
    var descr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var descriptor = {
        configurable: descr.configurable || false,
        writable: descr.writable || false,
        enumerable: descr.enumerable || false
    };

    for (var _iterator = Object.keys(props), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var key = _ref;

        descriptor.value = props[key];

        Object.defineProperty(target, key, descriptor);
    }

    return target;
}

var ResizeObserverEntry =
/**
 * Creates an instance of ResizeObserverEntry.
 *
 * @param {Element} target - Element that is being observed.
 * @param {ClientRect} rectData - Data of the elements' content rectangle.
 */
function ResizeObserverEntry(target, rectData) {
    classCallCheck(this, ResizeObserverEntry);

    // Content rectangle needs to be an instance of ClientRect if it's
    // available.
    var rectInterface = global$1.ClientRect || Object;
    var contentRect = Object.create(rectInterface.prototype);

    // According to the specification following properties are not writable
    // and are also not enumerable in the native implementation.
    //
    // Property accessors are not being used as they'd require to define a
    // private WeakMap storage which may cause memory leaks in browsers that
    // don't support this type of collections.
    defineProperties(contentRect, rectData, { configurable: true });

    defineProperties(this, {
        target: target, contentRect: contentRect
    }, { configurable: true });
};

var ResizeObserver$2 = function () {
    /**
     * Creates a new instance of ResizeObserver.
     *
     * @param {Function} callback - Callback function that is invoked when one
     *      of the observed elements changes it's content rectangle.
     * @param {ResizeObsreverController} controller - Controller instance which
     *      is responsible for the updates of observer.
     * @param {ResizeObserver} publicObserver - Reference to the public
     *      ResizeObserver instance which will be passed to callback function.
     */
    function ResizeObserver(callback, controller, publicObserver) {
        classCallCheck(this, ResizeObserver);

        if (typeof callback !== 'function') {
            throw new TypeError('The callback provided as parameter 1 is not a function.');
        }

        // Reference to the callback function.
        this._callback = callback;

        // Registry of ResizeObservation instances.
        this._targets = new Map();

        // Collection of resize observations that have detected changes in
        // dimensions of elements.
        this._activeTargets = [];

        // Reference to the associated ResizeObserverController.
        this._controller = controller;

        // Public ResizeObserver instance which will be passed to callback function.
        this._publicObserver = publicObserver;
    }

    /**
     * Starts observing provided element.
     *
     * @param {Element} target - Element to be observed.
     */
    ResizeObserver.prototype.observe = function observe(target) {
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }

        // Do nothing if current environment doesn't have the Element interface.
        if (!('Element' in global$1) || !(Element instanceof Object)) {
            return;
        }

        if (!(target instanceof Element)) {
            throw new TypeError('parameter 1 is not of type "Element".');
        }

        var targets = this._targets;

        // Do nothing if element is already being observed.
        if (targets.has(target)) {
            return;
        }

        // Register new ResizeObservation instance.
        targets.set(target, new ResizeObservation(target));

        // Add observer to controller if it hasn't been connected yet.
        if (!this._controller.isConnected(this)) {
            this._controller.connect(this);
        }

        // Update observations.
        this._controller.refresh();
    };

    /**
     * Stops observing provided element.
     *
     * @param {Element} target - Element to stop observing.
     */
    ResizeObserver.prototype.unobserve = function unobserve(target) {
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }

        // Do nothing if current environment doesn't have the Element interface.
        if (!('Element' in global$1) || !(Element instanceof Object)) {
            return;
        }

        if (!(target instanceof Element)) {
            throw new TypeError('parameter 1 is not of type "Element".');
        }

        var targets = this._targets;

        // Do nothing if element is not being observed.
        if (!targets.has(target)) {
            return;
        }

        // Remove element and associated with it ResizeObsrvation instance from
        // registry.
        targets.delete(target);

        // Set back the initial state if there is nothing to observe.
        if (!targets.size) {
            this.disconnect();
        }
    };

    /**
     * Stops observing all elements and clears the observations list.
     */
    ResizeObserver.prototype.disconnect = function disconnect() {
        this.clearActive();
        this._targets.clear();
        this._controller.disconnect(this);
    };

    /**
     * Clears an array of previously collected active observations and collects
     * observation instances which associated element has changed its' content
     * rectangle.
     */
    ResizeObserver.prototype.gatherActive = function gatherActive() {
        this.clearActive();

        var activeTargets = this._activeTargets;

        this._targets.forEach(function (observation) {
            if (observation.isActive()) {
                activeTargets.push(observation);
            }
        });
    };

    /**
     * Invokes initial callback function with a list of ResizeObserverEntry
     * instances collected from active resize observations.
     */
    ResizeObserver.prototype.broadcastActive = function broadcastActive() {
        // Do nothing if observer doesn't have active observations.
        if (!this.hasActive()) {
            return;
        }

        var observer = this._publicObserver;

        // Create ResizeObserverEntry instance for every active observation.
        var entries = this._activeTargets.map(function (observation) {
            return new ResizeObserverEntry(observation.target, observation.broadcastRect());
        });

        this.clearActive();
        this._callback.call(observer, entries, observer);
    };

    /**
     * Clears the collection of pending/active observations.
     */
    ResizeObserver.prototype.clearActive = function clearActive() {
        this._activeTargets.splice(0);
    };

    /**
     * Tells whether observer has pending observations.
     *
     * @returns {Boolean}
     */
    ResizeObserver.prototype.hasActive = function hasActive() {
        return !!this._activeTargets.length;
    };

    return ResizeObserver;
}();

/**
 * A shim for requestAnimationFrame which falls back
 * to setTimeout if the first one is not supported.
 *
 * @returns {Number} Requests' identifier.
 */
var requestAnimFrame = (function () {
    if (typeof requestAnimationFrame === 'function') {
        return requestAnimationFrame;
    }

    return function (callback) {
        return setTimeout(function () {
            return callback(Date.now());
        }, 1000 / 60);
    };
})();

/**
 * Creates a wrapper function that ensures that provided callback will
 * be invoked only once during the specified delay period. It caches the last
 * call and re-invokes it after pending activation is resolved.
 *
 * @param {Function} callback - Function to be invoked after the delay period.
 * @param {Number} [delay = 0] - Delay after which to invoke callback.
 * @param {Boolean} [afterRAF = false] - Whether function needs to be invoked as
 *      a requestAnimationFrame callback.
 * @returns {Function}
 */
var throttle = function (callback) {
    var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var afterRAF = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var leadCall = null,
        edgeCall = null;

    /**
     * Invokes the original callback function and schedules a new invocation if
     * the wrapper was called during current request.
     */
    function invokeCallback() {
        // Invoke original function.
        callback.apply.apply(callback, leadCall);

        leadCall = null;

        // Schedule new invocation if there was a call during delay period.
        if (edgeCall) {
            proxy.apply.apply(proxy, edgeCall);

            edgeCall = null;
        }
    }

    /**
     * Callback that will be invoked after the specified delay period. It will
     * delegate invocation of the original function to the requestAnimationFrame
     * if "afterRAF" parameter is set to "true".
     */
    function timeoutCallback() {
        afterRAF ? requestAnimFrame(invokeCallback) : invokeCallback();
    }

    /**
     * Schedules invocation of the initial function.
     */
    function proxy() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        // eslint-disable-next-line no-invalid-this
        var callData = [this, args];

        // Cache current call to be re-invoked later if there is already a
        // pending call.
        if (leadCall) {
            edgeCall = callData;
        } else {
            leadCall = callData;

            // Schedule new invocation.
            setTimeout(timeoutCallback, delay);
        }
    }

    return proxy;
};

// Define whether the MutationObserver is supported.
var mutationsSupported = typeof MutationObserver === 'function';

/**
 * Controller class which handles updates of ResizeObserver instances.
 * It decides when and for how long it's necessary to run updates by listening
 * to the windows "resize" event along with a tracking of DOM mutations
 * (nodes removal, changes of attributes, etc.).
 *
 * Transitions and animations are handled by running a repeatable update cycle
 * until the dimensions of observed elements are changing.
 *
 * Continuous update cycle will be used automatically in case MutationObserver
 * is not supported.
 */
var ResizeObserverController = function () {
    /**
     * Creates a new instance of ResizeObserverController.
     *
     * @param {Boolean} [continuousUpdates = false] - Whether to use a continuous
     *      update cycle.
     */
    function ResizeObserverController() {
        var continuousUpdates = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        classCallCheck(this, ResizeObserverController);

        // Continuous updates must be enabled if MutationObserver is not supported.
        this._isCycleContinuous = !mutationsSupported || continuousUpdates;

        // Indicates whether DOM listeners have been added.
        this._listenersEnabled = false;

        // Keeps reference to the instance of MutationObserver.
        this._mutationsObserver = null;

        // A list of connected observers.
        this._observers = [];

        // Make sure that the "refresh" method is invoked as a RAF callback and
        // that it happens only once during the period of 30 milliseconds.
        this.refresh = throttle(this.refresh.bind(this), 30, true);

        // Additionally postpone invocation of the continuous updates.
        this._continuousUpdateHandler = throttle(this.refresh, 70);
    }

    /**
     * Adds observer to observers list.
     *
     * @param {ResizeObserver} observer - Observer to be added.
     */
    ResizeObserverController.prototype.connect = function connect(observer) {
        if (!this.isConnected(observer)) {
            this._observers.push(observer);
        }

        // Add listeners if they haven't been added yet.
        if (!this._listenersEnabled) {
            this._addListeners();
        }
    };

    /**
     * Removes observer from observers list.
     *
     * @param {ResizeObserver} observer - Observer to be removed.
     */
    ResizeObserverController.prototype.disconnect = function disconnect(observer) {
        var observers = this._observers;
        var index = observers.indexOf(observer);

        // Remove observer if it's present in registry.
        if (~index) {
            observers.splice(index, 1);
        }

        // Remove listeners if controller has no connected observers.
        if (!observers.length && this._listenersEnabled) {
            this._removeListeners();
        }
    };

    /**
     * Tells whether the provided observer is connected to controller.
     *
     * @param {ResizeObserver} observer - Observer to be checked.
     * @returns {Boolean}
     */
    ResizeObserverController.prototype.isConnected = function isConnected(observer) {
        return !!~this._observers.indexOf(observer);
    };

    /**
     * Invokes the update of observers. It will continue running updates insofar
     * it detects changes or if continuous updates are enabled.
     */
    ResizeObserverController.prototype.refresh = function refresh() {
        var hasChanges = this._updateObservers();

        // Continue running updates if changes have been detected as there might
        // be future ones caused by CSS transitions.
        if (hasChanges) {
            this.refresh();
        } else if (this._isCycleContinuous && this._listenersEnabled) {
            // Automatically repeat cycle if it's necessary.
            this._continuousUpdateHandler();
        }
    };

    /**
     * Updates every observer from observers list and notifies them of queued
     * entries.
     *
     * @private
     * @returns {Boolean} Returns "true" if any observer has detected changes in
     *      dimensions of its' elements.
     */
    ResizeObserverController.prototype._updateObservers = function _updateObservers() {
        var hasChanges = false;

        for (var _iterator = this._observers, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var observer = _ref;

            // Collect active observations.
            observer.gatherActive();

            // Broadcast active observations and set the flag that changes have
            // been detected.
            if (observer.hasActive()) {
                hasChanges = true;

                observer.broadcastActive();
            }
        }

        return hasChanges;
    };

    /**
     * Initializes DOM listeners.
     *
     * @private
     */
    ResizeObserverController.prototype._addListeners = function _addListeners() {
        // Do nothing if running in a non-browser environment or if listeners
        // have been already added.
        if (!isBrowser || this._listenersEnabled) {
            return;
        }

        window.addEventListener('resize', this.refresh);

        // Subscribe to DOM mutations if it's possible as they may lead to
        // changes in the dimensions of elements.
        if (mutationsSupported) {
            this._mutationsObserver = new MutationObserver(this.refresh);

            this._mutationsObserver.observe(document, {
                attributes: true,
                childList: true,
                characterData: true,
                subtree: true
            });
        }

        this._listenersEnabled = true;

        // Don't wait for a possible event that might trigger the update of
        // observers and manually initiate the update process.
        if (this._isCycleContinuous) {
            this.refresh();
        }
    };

    /**
     * Removes DOM listeners.
     *
     * @private
     */
    ResizeObserverController.prototype._removeListeners = function _removeListeners() {
        // Do nothing if running in a non-browser environment or if listeners
        // have been already removed.
        if (!isBrowser || !this._listenersEnabled) {
            return;
        }

        window.removeEventListener('resize', this.refresh);

        if (this._mutationsObserver) {
            this._mutationsObserver.disconnect();
        }

        this._mutationsObserver = null;
        this._listenersEnabled = false;
    };

    createClass(ResizeObserverController, [{
        key: 'continuousUpdates',

        /**
         * Tells whether continuous updates are enabled.
         *
         * @returns {Boolean}
         */
        get: function get() {
            return this._isCycleContinuous;
        },

        /**
         * Enables or disables continuous updates.
         *
         * @param {Boolean} useContinuous - Whether to enable or disable continuous
         *      updates. Note that the value won't be applied if MutationObserver is
         *      not supported.
         */
        set: function set(useContinuous) {
            // The state of continuous updates should not be modified if
            // MutationObserver is not supported.
            if (!mutationsSupported) {
                return;
            }

            this._isCycleContinuous = useContinuous;

            // Immediately start the update cycle in order not to wait for a possible
            // event that might initiate it.
            if (this._listenersEnabled && useContinuous) {
                this.refresh();
            }
        }
    }]);
    return ResizeObserverController;
}();

// Controller that will be assigned to all instances of ResizeObserver.
var controller = new ResizeObserverController();

// Registry of the internal observers.
var observers = new WeakMap();

/**
 * ResizeObservers' "Proxy" class which is meant to hide private properties and
 * methods from public instances.
 *
 * Additionally implements the "continuousUpdates" static property accessor to
 * give control over the behavior of the ResizeObserverController instance.
 * Changes made to this property affect all future and existing observers.
 */
var ResizeObserver = function () {
    /**
     * Creates a new instance of ResizeObserver.
     *
     * @param {Function} callback - Callback that is invoked when dimensions of
     *      one of the observed elements change.
     */
    function ResizeObserver(callback) {
        classCallCheck(this, ResizeObserver);

        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }

        // Create a new instance of the internal ResizeObserver.
        var observer = new ResizeObserver$2(callback, controller, this);

        // Register internal observer.
        observers.set(this, observer);
    }

    createClass(ResizeObserver, null, [{
        key: 'continuousUpdates',

        /**
         * Tells whether continuous updates are enabled.
         *
         * @returns {Boolean}
         */
        get: function get() {
            return controller.continuousUpdates;
        },

        /**
         * Enables or disables continuous updates.
         *
         * @param {Boolean} value - Whether to enable or disable continuous updates.
         */
        set: function set(value) {
            if (typeof value !== 'boolean') {
                throw new TypeError('type of "continuousUpdates" value must be boolean.');
            }

            controller.continuousUpdates = value;
        }
    }]);
    return ResizeObserver;
}();

// Expose public methods of ResizeObserver.
['observe', 'unobserve', 'disconnect'].forEach(function (method) {
    ResizeObserver.prototype[method] = function () {
        var _observers$get;

        return (_observers$get = observers.get(this))[method].apply(_observers$get, arguments);
    };
});

var index = (function () {
    // Export existing implementation if it's available.
    if (typeof global$1.ResizeObserver === 'function') {
        return global$1.ResizeObserver;
    }

    return ResizeObserver;
})();

return index;
})));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32)))

/***/ }),
/* 29 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(20);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(29)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../node_modules/css-loader/index.js??ref--1-1!./../node_modules/sass-loader/index.js??ref--1-2!./main.scss", function() {
			var newContent = require("!!./../node_modules/css-loader/index.js??ref--1-1!./../node_modules/sass-loader/index.js??ref--1-2!./main.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 32 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_33__;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ })
/******/ ]);
});