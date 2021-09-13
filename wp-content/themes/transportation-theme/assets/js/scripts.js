function checkThatCurrentElementExistsOutside(objectOutsideWhichWeAreChecking, currentElement) {
  let currentElementExistsInObjectOutsideWhichWeAreChecking,
      childElementsOfObjectOutsideWhichWeAreChecking = Array.from(objectOutsideWhichWeAreChecking.getElementsByTagName('*')),
      childElementsOfObjectOutsideWhichWeAreCheckingLength = childElementsOfObjectOutsideWhichWeAreChecking.length;
  for (let i = 0; i < childElementsOfObjectOutsideWhichWeAreCheckingLength; i++) {
    const element = childElementsOfObjectOutsideWhichWeAreChecking[i];
    if (element == currentElement) {
      currentElementExistsInObjectOutsideWhichWeAreChecking = true;
      break;
    } else {
      currentElementExistsInObjectOutsideWhichWeAreChecking = false;
    }
  }
  if (
    objectOutsideWhichWeAreChecking != currentElement &&
    !currentElementExistsInObjectOutsideWhichWeAreChecking
  ) {
    return true;
  } else {
    return false;
  }
}
function checkThatObjectIsInScrollArea(object, topOffset = 200, bottomOffset = topOffset) {
  return (object.getBoundingClientRect().y - topOffset <= window.innerHeight && object.getBoundingClientRect().y + bottomOffset + object.offsetHeight > 0) || false;
}
function checkTopElementVisibility(element, offset = 0) {
  let bottomScreenY = window.pageYOffset + window.innerHeight,
      yElementPositionRelativeToTheScreen = window.pageYOffset + element.getBoundingClientRect().y;
  return (yElementPositionRelativeToTheScreen < bottomScreenY) && element.getBoundingClientRect().y > offset;
}
function checkElementVisibilityByScreenCenter(element) {
  let bottomScreenY = window.pageYOffset + (window.innerHeight / 2),
      yElementPositionRelativeToTheScreen = window.pageYOffset + element.getBoundingClientRect().y;
  return (yElementPositionRelativeToTheScreen < bottomScreenY);
}
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.IMask = {}));
}(this, (function (exports) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var check = function (it) {
	  return it && it.Math == Math && it;
	}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


	var global_1 = // eslint-disable-next-line no-undef
	check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || check(typeof self == 'object' && self) || check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func
	Function('return this')();

	var fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty


	var descriptors = !fails(function () {
	  return Object.defineProperty({}, 1, {
	    get: function () {
	      return 7;
	    }
	  })[1] != 7;
	});

	var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

	var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({
	  1: 2
	}, 1); // `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable

	var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable;

	var objectPropertyIsEnumerable = {
		f: f
	};

	var createPropertyDescriptor = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var toString = {}.toString;

	var classofRaw = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	var split = ''.split; // fallback for non-array-like ES3 and non-enumerable old V8 strings

	var indexedObject = fails(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings




	var toIndexedObject = function (it) {
	  return indexedObject(requireObjectCoercible(it));
	};

	var isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	// `ToPrimitive` abstract operation
	// https://tc39.github.io/ecma262/#sec-toprimitive
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string


	var toPrimitive = function (input, PREFERRED_STRING) {
	  if (!isObject(input)) return input;
	  var fn, val;
	  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var hasOwnProperty = {}.hasOwnProperty;

	var has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var document$1 = global_1.document; // typeof document.createElement is 'object' in old IE

	var EXISTS = isObject(document$1) && isObject(document$1.createElement);

	var documentCreateElement = function (it) {
	  return EXISTS ? document$1.createElement(it) : {};
	};

	// Thank's IE8 for his funny defineProperty


	var ie8DomDefine = !descriptors && !fails(function () {
	  return Object.defineProperty(documentCreateElement('div'), 'a', {
	    get: function () {
	      return 7;
	    }
	  }).a != 7;
	});

	var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor

	var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPrimitive(P, true);
	  if (ie8DomDefine) try {
	    return nativeGetOwnPropertyDescriptor(O, P);
	  } catch (error) {
	    /* empty */
	  }
	  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
	};

	var objectGetOwnPropertyDescriptor = {
		f: f$1
	};

	var anObject = function (it) {
	  if (!isObject(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  }

	  return it;
	};

	var nativeDefineProperty = Object.defineProperty; // `Object.defineProperty` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperty

	var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (ie8DomDefine) try {
	    return nativeDefineProperty(O, P, Attributes);
	  } catch (error) {
	    /* empty */
	  }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var objectDefineProperty = {
		f: f$2
	};

	var createNonEnumerableProperty = descriptors ? function (object, key, value) {
	  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var setGlobal = function (key, value) {
	  try {
	    createNonEnumerableProperty(global_1, key, value);
	  } catch (error) {
	    global_1[key] = value;
	  }

	  return value;
	};

	var SHARED = '__core-js_shared__';
	var store = global_1[SHARED] || setGlobal(SHARED, {});
	var sharedStore = store;

	var functionToString = Function.toString; // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper

	if (typeof sharedStore.inspectSource != 'function') {
	  sharedStore.inspectSource = function (it) {
	    return functionToString.call(it);
	  };
	}

	var inspectSource = sharedStore.inspectSource;

	var WeakMap = global_1.WeakMap;
	var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

	var shared = createCommonjsModule(function (module) {
	(module.exports = function (key, value) {
	  return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.6.4',
	  mode:  'global',
	  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id = 0;
	var postfix = Math.random();

	var uid = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
	};

	var keys = shared('keys');

	var sharedKey = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};

	var hiddenKeys = {};

	var WeakMap$1 = global_1.WeakMap;
	var set, get, has$1;

	var enforce = function (it) {
	  return has$1(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;

	    if (!isObject(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    }

	    return state;
	  };
	};

	if (nativeWeakMap) {
	  var store$1 = new WeakMap$1();
	  var wmget = store$1.get;
	  var wmhas = store$1.has;
	  var wmset = store$1.set;

	  set = function (it, metadata) {
	    wmset.call(store$1, it, metadata);
	    return metadata;
	  };

	  get = function (it) {
	    return wmget.call(store$1, it) || {};
	  };

	  has$1 = function (it) {
	    return wmhas.call(store$1, it);
	  };
	} else {
	  var STATE = sharedKey('state');
	  hiddenKeys[STATE] = true;

	  set = function (it, metadata) {
	    createNonEnumerableProperty(it, STATE, metadata);
	    return metadata;
	  };

	  get = function (it) {
	    return has(it, STATE) ? it[STATE] : {};
	  };

	  has$1 = function (it) {
	    return has(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has$1,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var redefine = createCommonjsModule(function (module) {
	var getInternalState = internalState.get;
	var enforceInternalState = internalState.enforce;
	var TEMPLATE = String(String).split('String');
	(module.exports = function (O, key, value, options) {
	  var unsafe = options ? !!options.unsafe : false;
	  var simple = options ? !!options.enumerable : false;
	  var noTargetGet = options ? !!options.noTargetGet : false;

	  if (typeof value == 'function') {
	    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
	    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
	  }

	  if (O === global_1) {
	    if (simple) O[key] = value;else setGlobal(key, value);
	    return;
	  } else if (!unsafe) {
	    delete O[key];
	  } else if (!noTargetGet && O[key]) {
	    simple = true;
	  }

	  if (simple) O[key] = value;else createNonEnumerableProperty(O, key, value); // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, 'toString', function toString() {
	  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
	});
	});

	var path = global_1;

	var aFunction = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	var getBuiltIn = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace]) : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
	};

	var ceil = Math.ceil;
	var floor = Math.floor; // `ToInteger` abstract operation
	// https://tc39.github.io/ecma262/#sec-tointeger

	var toInteger = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
	};

	var min = Math.min; // `ToLength` abstract operation
	// https://tc39.github.io/ecma262/#sec-tolength

	var toLength = function (argument) {
	  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min; // Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

	var toAbsoluteIndex = function (index, length) {
	  var integer = toInteger(index);
	  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
	};

	// `Array.prototype.{ indexOf, includes }` methods implementation


	var createMethod = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value; // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare

	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++]; // eslint-disable-next-line no-self-compare

	      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
	    } else for (; length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    }
	    return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
	  includes: createMethod(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod(false)
	};

	var indexOf = arrayIncludes.indexOf;



	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;

	  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key); // Don't enum bug & hidden keys


	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~indexOf(result, key) || result.push(key);
	  }

	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

	var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertynames

	var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return objectKeysInternal(O, hiddenKeys$1);
	};

	var objectGetOwnPropertyNames = {
		f: f$3
	};

	var f$4 = Object.getOwnPropertySymbols;

	var objectGetOwnPropertySymbols = {
		f: f$4
	};

	// all object keys, includes non-enumerable and symbols


	var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = objectGetOwnPropertyNames.f(anObject(it));
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
	};

	var copyConstructorProperties = function (target, source) {
	  var keys = ownKeys(source);
	  var defineProperty = objectDefineProperty.f;
	  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;

	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	  }
	};

	var replacement = /#|\.prototype\./;

	var isForced = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == 'function' ? fails(detection) : !!detection;
	};

	var normalize = isForced.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced.data = {};
	var NATIVE = isForced.NATIVE = 'N';
	var POLYFILL = isForced.POLYFILL = 'P';
	var isForced_1 = isForced;

	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;










	/*
	  options.target      - name of the target object
	  options.global      - target is the global object
	  options.stat        - export as static methods of target
	  options.proto       - export as prototype methods of target
	  options.real        - real prototype method for the `pure` version
	  options.forced      - export even if the native feature is available
	  options.bind        - bind methods to the target, required for the `pure` version
	  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
	  options.sham        - add a flag to not completely full polyfills
	  options.enumerable  - export as enumerable property
	  options.noTargetGet - prevent calling a getter on target
	*/


	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;

	  if (GLOBAL) {
	    target = global_1;
	  } else if (STATIC) {
	    target = global_1[TARGET] || setGlobal(TARGET, {});
	  } else {
	    target = (global_1[TARGET] || {}).prototype;
	  }

	  if (target) for (key in source) {
	    sourceProperty = source[key];

	    if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor$1(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];

	    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty === typeof targetProperty) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    } // add a flag to not completely full polyfills


	    if (options.sham || targetProperty && targetProperty.sham) {
	      createNonEnumerableProperty(sourceProperty, 'sham', true);
	    } // extend global


	    redefine(target, key, sourceProperty, options);
	  }
	};

	// `Object.keys` method
	// https://tc39.github.io/ecma262/#sec-object.keys


	var objectKeys = Object.keys || function keys(O) {
	  return objectKeysInternal(O, enumBugKeys);
	};

	// `ToObject` abstract operation
	// https://tc39.github.io/ecma262/#sec-toobject


	var toObject = function (argument) {
	  return Object(requireObjectCoercible(argument));
	};

	var nativeAssign = Object.assign;
	var defineProperty = Object.defineProperty; // `Object.assign` method
	// https://tc39.github.io/ecma262/#sec-object.assign

	var objectAssign = !nativeAssign || fails(function () {
	  // should have correct order of operations (Edge bug)
	  if (descriptors && nativeAssign({
	    b: 1
	  }, nativeAssign(defineProperty({}, 'a', {
	    enumerable: true,
	    get: function () {
	      defineProperty(this, 'b', {
	        value: 3,
	        enumerable: false
	      });
	    }
	  }), {
	    b: 2
	  })).b !== 1) return true; // should work with symbols and should have deterministic property order (V8 bug)

	  var A = {};
	  var B = {}; // eslint-disable-next-line no-undef

	  var symbol = Symbol();
	  var alphabet = 'abcdefghijklmnopqrst';
	  A[symbol] = 7;
	  alphabet.split('').forEach(function (chr) {
	    B[chr] = chr;
	  });
	  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
	}) ? function assign(target, source) {
	  // eslint-disable-line no-unused-vars
	  var T = toObject(target);
	  var argumentsLength = arguments.length;
	  var index = 1;
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  var propertyIsEnumerable = objectPropertyIsEnumerable.f;

	  while (argumentsLength > index) {
	    var S = indexedObject(arguments[index++]);
	    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;

	    while (length > j) {
	      key = keys[j++];
	      if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
	    }
	  }

	  return T;
	} : nativeAssign;

	// `Object.assign` method
	// https://tc39.github.io/ecma262/#sec-object.assign


	_export({
	  target: 'Object',
	  stat: true,
	  forced: Object.assign !== objectAssign
	}, {
	  assign: objectAssign
	});

	// `String.prototype.repeat` method implementation
	// https://tc39.github.io/ecma262/#sec-string.prototype.repeat


	var stringRepeat = ''.repeat || function repeat(count) {
	  var str = String(requireObjectCoercible(this));
	  var result = '';
	  var n = toInteger(count);
	  if (n < 0 || n == Infinity) throw RangeError('Wrong number of repetitions');

	  for (; n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;

	  return result;
	};

	// https://github.com/tc39/proposal-string-pad-start-end






	var ceil$1 = Math.ceil; // `String.prototype.{ padStart, padEnd }` methods implementation

	var createMethod$1 = function (IS_END) {
	  return function ($this, maxLength, fillString) {
	    var S = String(requireObjectCoercible($this));
	    var stringLength = S.length;
	    var fillStr = fillString === undefined ? ' ' : String(fillString);
	    var intMaxLength = toLength(maxLength);
	    var fillLen, stringFiller;
	    if (intMaxLength <= stringLength || fillStr == '') return S;
	    fillLen = intMaxLength - stringLength;
	    stringFiller = stringRepeat.call(fillStr, ceil$1(fillLen / fillStr.length));
	    if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
	    return IS_END ? S + stringFiller : stringFiller + S;
	  };
	};

	var stringPad = {
	  // `String.prototype.padStart` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.padstart
	  start: createMethod$1(false),
	  // `String.prototype.padEnd` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.padend
	  end: createMethod$1(true)
	};

	var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

	// https://github.com/zloirock/core-js/issues/280
	 // eslint-disable-next-line unicorn/no-unsafe-regex


	var stringPadWebkitBug = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(engineUserAgent);

	var $padEnd = stringPad.end;

	 // `String.prototype.padEnd` method
	// https://tc39.github.io/ecma262/#sec-string.prototype.padend


	_export({
	  target: 'String',
	  proto: true,
	  forced: stringPadWebkitBug
	}, {
	  padEnd: function padEnd(maxLength
	  /* , fillString = ' ' */
	  ) {
	    return $padEnd(this, maxLength, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var $padStart = stringPad.start;

	 // `String.prototype.padStart` method
	// https://tc39.github.io/ecma262/#sec-string.prototype.padstart


	_export({
	  target: 'String',
	  proto: true,
	  forced: stringPadWebkitBug
	}, {
	  padStart: function padStart(maxLength
	  /* , fillString = ' ' */
	  ) {
	    return $padStart(this, maxLength, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// `String.prototype.repeat` method
	// https://tc39.github.io/ecma262/#sec-string.prototype.repeat


	_export({
	  target: 'String',
	  proto: true
	}, {
	  repeat: stringRepeat
	});

	// `globalThis` object
	// https://github.com/tc39/proposal-global


	_export({
	  global: true
	}, {
	  globalThis: global_1
	});

	function _typeof(obj) {
	  "@babel/helpers - typeof";

	  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	    _typeof = function (obj) {
	      return typeof obj;
	    };
	  } else {
	    _typeof = function (obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };
	  }

	  return _typeof(obj);
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf(subClass, superClass);
	}

	function _getPrototypeOf(o) {
	  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}

	function _setPrototypeOf(o, p) {
	  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	function _objectWithoutPropertiesLoose(source, excluded) {
	  if (source == null) return {};
	  var target = {};
	  var sourceKeys = Object.keys(source);
	  var key, i;

	  for (i = 0; i < sourceKeys.length; i++) {
	    key = sourceKeys[i];
	    if (excluded.indexOf(key) >= 0) continue;
	    target[key] = source[key];
	  }

	  return target;
	}

	function _objectWithoutProperties(source, excluded) {
	  if (source == null) return {};

	  var target = _objectWithoutPropertiesLoose(source, excluded);

	  var key, i;

	  if (Object.getOwnPropertySymbols) {
	    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

	    for (i = 0; i < sourceSymbolKeys.length; i++) {
	      key = sourceSymbolKeys[i];
	      if (excluded.indexOf(key) >= 0) continue;
	      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
	      target[key] = source[key];
	    }
	  }

	  return target;
	}

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	function _possibleConstructorReturn(self, call) {
	  if (call && (typeof call === "object" || typeof call === "function")) {
	    return call;
	  }

	  return _assertThisInitialized(self);
	}

	function _superPropBase(object, property) {
	  while (!Object.prototype.hasOwnProperty.call(object, property)) {
	    object = _getPrototypeOf(object);
	    if (object === null) break;
	  }

	  return object;
	}

	function _get(target, property, receiver) {
	  if (typeof Reflect !== "undefined" && Reflect.get) {
	    _get = Reflect.get;
	  } else {
	    _get = function _get(target, property, receiver) {
	      var base = _superPropBase(target, property);

	      if (!base) return;
	      var desc = Object.getOwnPropertyDescriptor(base, property);

	      if (desc.get) {
	        return desc.get.call(receiver);
	      }

	      return desc.value;
	    };
	  }

	  return _get(target, property, receiver || target);
	}

	function set$1(target, property, value, receiver) {
	  if (typeof Reflect !== "undefined" && Reflect.set) {
	    set$1 = Reflect.set;
	  } else {
	    set$1 = function set(target, property, value, receiver) {
	      var base = _superPropBase(target, property);

	      var desc;

	      if (base) {
	        desc = Object.getOwnPropertyDescriptor(base, property);

	        if (desc.set) {
	          desc.set.call(receiver, value);
	          return true;
	        } else if (!desc.writable) {
	          return false;
	        }
	      }

	      desc = Object.getOwnPropertyDescriptor(receiver, property);

	      if (desc) {
	        if (!desc.writable) {
	          return false;
	        }

	        desc.value = value;
	        Object.defineProperty(receiver, property, desc);
	      } else {
	        _defineProperty(receiver, property, value);
	      }

	      return true;
	    };
	  }

	  return set$1(target, property, value, receiver);
	}

	function _set(target, property, value, receiver, isStrict) {
	  var s = set$1(target, property, value, receiver || target);

	  if (!s && isStrict) {
	    throw new Error('failed to set property');
	  }

	  return value;
	}

	function _slicedToArray(arr, i) {
	  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
	}

	function _arrayWithHoles(arr) {
	  if (Array.isArray(arr)) return arr;
	}

	function _iterableToArrayLimit(arr, i) {
	  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
	    return;
	  }

	  var _arr = [];
	  var _n = true;
	  var _d = false;
	  var _e = undefined;

	  try {
	    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	      _arr.push(_s.value);

	      if (i && _arr.length === i) break;
	    }
	  } catch (err) {
	    _d = true;
	    _e = err;
	  } finally {
	    try {
	      if (!_n && _i["return"] != null) _i["return"]();
	    } finally {
	      if (_d) throw _e;
	    }
	  }

	  return _arr;
	}

	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance");
	}

	/** Checks if value is string */
	function isString(str) {
	  return typeof str === 'string' || str instanceof String;
	}
	/**
	  Direction
	  @prop {string} NONE
	  @prop {string} LEFT
	  @prop {string} FORCE_LEFT
	  @prop {string} RIGHT
	  @prop {string} FORCE_RIGHT
	*/

	var DIRECTION = {
	  NONE: 'NONE',
	  LEFT: 'LEFT',
	  FORCE_LEFT: 'FORCE_LEFT',
	  RIGHT: 'RIGHT',
	  FORCE_RIGHT: 'FORCE_RIGHT'
	};
	/** */

	function forceDirection(direction) {
	  switch (direction) {
	    case DIRECTION.LEFT:
	      return DIRECTION.FORCE_LEFT;

	    case DIRECTION.RIGHT:
	      return DIRECTION.FORCE_RIGHT;

	    default:
	      return direction;
	  }
	}
	/** Escapes regular expression control chars */

	function escapeRegExp(str) {
	  return str.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1');
	} // cloned from https://github.com/epoberezkin/fast-deep-equal with small changes

	function objectIncludes(b, a) {
	  if (a === b) return true;
	  var arrA = Array.isArray(a),
	      arrB = Array.isArray(b),
	      i;

	  if (arrA && arrB) {
	    if (a.length != b.length) return false;

	    for (i = 0; i < a.length; i++) {
	      if (!objectIncludes(a[i], b[i])) return false;
	    }

	    return true;
	  }

	  if (arrA != arrB) return false;

	  if (a && b && _typeof(a) === 'object' && _typeof(b) === 'object') {
	    var dateA = a instanceof Date,
	        dateB = b instanceof Date;
	    if (dateA && dateB) return a.getTime() == b.getTime();
	    if (dateA != dateB) return false;
	    var regexpA = a instanceof RegExp,
	        regexpB = b instanceof RegExp;
	    if (regexpA && regexpB) return a.toString() == b.toString();
	    if (regexpA != regexpB) return false;
	    var keys = Object.keys(a); // if (keys.length !== Object.keys(b).length) return false;

	    for (i = 0; i < keys.length; i++) {
	      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
	    }

	    for (i = 0; i < keys.length; i++) {
	      if (!objectIncludes(b[keys[i]], a[keys[i]])) return false;
	    }

	    return true;
	  } else if (a && b && typeof a === 'function' && typeof b === 'function') {
	    return a.toString() === b.toString();
	  }

	  return false;
	}
	/** Selection range */

	/** Provides details of changing input */

	var ActionDetails =
	/*#__PURE__*/
	function () {
	  /** Current input value */

	  /** Current cursor position */

	  /** Old input value */

	  /** Old selection */
	  function ActionDetails(value, cursorPos, oldValue, oldSelection) {
	    _classCallCheck(this, ActionDetails);

	    this.value = value;
	    this.cursorPos = cursorPos;
	    this.oldValue = oldValue;
	    this.oldSelection = oldSelection; // double check if left part was changed (autofilling, other non-standard input triggers)

	    while (this.value.slice(0, this.startChangePos) !== this.oldValue.slice(0, this.startChangePos)) {
	      --this.oldSelection.start;
	    }
	  }
	  /**
	    Start changing position
	    @readonly
	  */


	  _createClass(ActionDetails, [{
	    key: "startChangePos",
	    get: function get() {
	      return Math.min(this.cursorPos, this.oldSelection.start);
	    }
	    /**
	      Inserted symbols count
	      @readonly
	    */

	  }, {
	    key: "insertedCount",
	    get: function get() {
	      return this.cursorPos - this.startChangePos;
	    }
	    /**
	      Inserted symbols
	      @readonly
	    */

	  }, {
	    key: "inserted",
	    get: function get() {
	      return this.value.substr(this.startChangePos, this.insertedCount);
	    }
	    /**
	      Removed symbols count
	      @readonly
	    */

	  }, {
	    key: "removedCount",
	    get: function get() {
	      // Math.max for opposite operation
	      return Math.max(this.oldSelection.end - this.startChangePos || // for Delete
	      this.oldValue.length - this.value.length, 0);
	    }
	    /**
	      Removed symbols
	      @readonly
	    */

	  }, {
	    key: "removed",
	    get: function get() {
	      return this.oldValue.substr(this.startChangePos, this.removedCount);
	    }
	    /**
	      Unchanged head symbols
	      @readonly
	    */

	  }, {
	    key: "head",
	    get: function get() {
	      return this.value.substring(0, this.startChangePos);
	    }
	    /**
	      Unchanged tail symbols
	      @readonly
	    */

	  }, {
	    key: "tail",
	    get: function get() {
	      return this.value.substring(this.startChangePos + this.insertedCount);
	    }
	    /**
	      Remove direction
	      @readonly
	    */

	  }, {
	    key: "removeDirection",
	    get: function get() {
	      if (!this.removedCount || this.insertedCount) return DIRECTION.NONE; // align right if delete at right or if range removed (event with backspace)

	      return this.oldSelection.end === this.cursorPos || this.oldSelection.start === this.cursorPos ? DIRECTION.RIGHT : DIRECTION.LEFT;
	    }
	  }]);

	  return ActionDetails;
	}();

	/**
	  Provides details of changing model value
	  @param {Object} [details]
	  @param {string} [details.inserted] - Inserted symbols
	  @param {boolean} [details.skip] - Can skip chars
	  @param {number} [details.removeCount] - Removed symbols count
	  @param {number} [details.tailShift] - Additional offset if any changes occurred before tail
	*/
	var ChangeDetails =
	/*#__PURE__*/
	function () {
	  /** Inserted symbols */

	  /** Can skip chars */

	  /** Additional offset if any changes occurred before tail */

	  /** Raw inserted is used by dynamic mask */
	  function ChangeDetails(details) {
	    _classCallCheck(this, ChangeDetails);

	    Object.assign(this, {
	      inserted: '',
	      rawInserted: '',
	      skip: false,
	      tailShift: 0
	    }, details);
	  }
	  /**
	    Aggregate changes
	    @returns {ChangeDetails} `this`
	  */


	  _createClass(ChangeDetails, [{
	    key: "aggregate",
	    value: function aggregate(details) {
	      this.rawInserted += details.rawInserted;
	      this.skip = this.skip || details.skip;
	      this.inserted += details.inserted;
	      this.tailShift += details.tailShift;
	      return this;
	    }
	    /** Total offset considering all changes */

	  }, {
	    key: "offset",
	    get: function get() {
	      return this.tailShift + this.inserted.length;
	    }
	  }]);

	  return ChangeDetails;
	}();

	/** Provides details of continuous extracted tail */
	var ContinuousTailDetails =
	/*#__PURE__*/
	function () {
	  /** Tail value as string */

	  /** Tail start position */

	  /** Start position */
	  function ContinuousTailDetails() {
	    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	    var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	    var stop = arguments.length > 2 ? arguments[2] : undefined;

	    _classCallCheck(this, ContinuousTailDetails);

	    this.value = value;
	    this.from = from;
	    this.stop = stop;
	  }

	  _createClass(ContinuousTailDetails, [{
	    key: "toString",
	    value: function toString() {
	      return this.value;
	    }
	  }, {
	    key: "extend",
	    value: function extend(tail) {
	      this.value += String(tail);
	    }
	  }, {
	    key: "appendTo",
	    value: function appendTo(masked) {
	      return masked.append(this.toString(), {
	        tail: true
	      }).aggregate(masked._appendPlaceholder());
	    }
	  }, {
	    key: "shiftBefore",
	    value: function shiftBefore(pos) {
	      if (this.from >= pos || !this.value.length) return '';
	      var shiftChar = this.value[0];
	      this.value = this.value.slice(1);
	      return shiftChar;
	    }
	  }, {
	    key: "state",
	    get: function get() {
	      return {
	        value: this.value,
	        from: this.from,
	        stop: this.stop
	      };
	    },
	    set: function set(state) {
	      Object.assign(this, state);
	    }
	  }]);

	  return ContinuousTailDetails;
	}();

	/**
	 * Applies mask on element.
	 * @constructor
	 * @param {HTMLInputElement|HTMLTextAreaElement|MaskElement} el - Element to apply mask
	 * @param {Object} opts - Custom mask options
	 * @return {InputMask}
	 */
	function IMask(el) {
	  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  // currently available only for input-like elements
	  return new IMask.InputMask(el, opts);
	}

	/** Supported mask type */

	/** Provides common masking stuff */
	var Masked =
	/*#__PURE__*/
	function () {
	  // $Shape<MaskedOptions>; TODO after fix https://github.com/facebook/flow/issues/4773

	  /** @type {Mask} */

	  /** */
	  // $FlowFixMe no ideas

	  /** Transforms value before mask processing */

	  /** Validates if value is acceptable */

	  /** Does additional processing in the end of editing */

	  /** Format typed value to string */

	  /** Parse strgin to get typed value */

	  /** Enable characters overwriting */

	  /** */
	  function Masked(opts) {
	    _classCallCheck(this, Masked);

	    this._value = '';

	    this._update(Object.assign({}, Masked.DEFAULTS, {}, opts));

	    this.isInitialized = true;
	  }
	  /** Sets and applies new options */


	  _createClass(Masked, [{
	    key: "updateOptions",
	    value: function updateOptions(opts) {
	      if (!Object.keys(opts).length) return;
	      this.withValueRefresh(this._update.bind(this, opts));
	    }
	    /**
	      Sets new options
	      @protected
	    */

	  }, {
	    key: "_update",
	    value: function _update(opts) {
	      Object.assign(this, opts);
	    }
	    /** Mask state */

	  }, {
	    key: "reset",

	    /** Resets value */
	    value: function reset() {
	      this._value = '';
	    }
	    /** */

	  }, {
	    key: "resolve",

	    /** Resolve new value */
	    value: function resolve(value) {
	      this.reset();
	      this.append(value, {
	        input: true
	      }, '');
	      this.doCommit();
	      return this.value;
	    }
	    /** */

	  }, {
	    key: "nearestInputPos",

	    /** Finds nearest input position in direction */
	    value: function nearestInputPos(cursorPos, direction) {
	      return cursorPos;
	    }
	    /** Extracts value in range considering flags */

	  }, {
	    key: "extractInput",
	    value: function extractInput() {
	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	      return this.value.slice(fromPos, toPos);
	    }
	    /** Extracts tail in range */

	  }, {
	    key: "extractTail",
	    value: function extractTail() {
	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	      return new ContinuousTailDetails(this.extractInput(fromPos, toPos), fromPos);
	    }
	    /** Appends tail */
	    // $FlowFixMe no ideas

	  }, {
	    key: "appendTail",
	    value: function appendTail(tail) {
	      if (isString(tail)) tail = new ContinuousTailDetails(String(tail));
	      return tail.appendTo(this);
	    }
	    /** Appends char */

	  }, {
	    key: "_appendCharRaw",
	    value: function _appendCharRaw(ch) {
	      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      ch = this.doPrepare(ch, flags);
	      if (!ch) return new ChangeDetails();
	      this._value += ch;
	      return new ChangeDetails({
	        inserted: ch,
	        rawInserted: ch
	      });
	    }
	    /** Appends char */

	  }, {
	    key: "_appendChar",
	    value: function _appendChar(ch) {
	      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      var checkTail = arguments.length > 2 ? arguments[2] : undefined;
	      var consistentState = this.state;

	      var details = this._appendCharRaw(ch, flags);

	      if (details.inserted) {
	        var consistentTail;
	        var appended = this.doValidate(flags) !== false;

	        if (appended && checkTail != null) {
	          // validation ok, check tail
	          var beforeTailState = this.state;

	          if (this.overwrite) {
	            consistentTail = checkTail.state;
	            checkTail.shiftBefore(this.value.length);
	          }

	          var tailDetails = this.appendTail(checkTail);
	          appended = tailDetails.rawInserted === checkTail.toString(); // if ok, rollback state after tail

	          if (appended && tailDetails.inserted) this.state = beforeTailState;
	        } // revert all if something went wrong


	        if (!appended) {
	          details = new ChangeDetails();
	          this.state = consistentState;
	          if (checkTail && consistentTail) checkTail.state = consistentTail;
	        }
	      }

	      return details;
	    }
	    /** Appends optional placeholder at end */

	  }, {
	    key: "_appendPlaceholder",
	    value: function _appendPlaceholder() {
	      return new ChangeDetails();
	    }
	    /** Appends symbols considering flags */
	    // $FlowFixMe no ideas

	  }, {
	    key: "append",
	    value: function append(str, flags, tail) {
	      if (!isString(str)) throw new Error('value should be string');
	      var details = new ChangeDetails();
	      var checkTail = isString(tail) ? new ContinuousTailDetails(String(tail)) : tail;
	      if (flags.tail) flags._beforeTailState = this.state;

	      for (var ci = 0; ci < str.length; ++ci) {
	        details.aggregate(this._appendChar(str[ci], flags, checkTail));
	      } // append tail but aggregate only tailShift


	      if (checkTail != null) {
	        details.tailShift += this.appendTail(checkTail).tailShift; // TODO it's a good idea to clear state after appending ends
	        // but it causes bugs when one append calls another (when dynamic dispatch set rawInputValue)
	        // this._resetBeforeTailState();
	      }

	      return details;
	    }
	    /** */

	  }, {
	    key: "remove",
	    value: function remove() {
	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	      this._value = this.value.slice(0, fromPos) + this.value.slice(toPos);
	      return new ChangeDetails();
	    }
	    /** Calls function and reapplies current value */

	  }, {
	    key: "withValueRefresh",
	    value: function withValueRefresh(fn) {
	      if (this._refreshing || !this.isInitialized) return fn();
	      this._refreshing = true;
	      var rawInput = this.rawInputValue;
	      var value = this.value;
	      var ret = fn();
	      this.rawInputValue = rawInput; // append lost trailing chars at end

	      if (this.value !== value && value.indexOf(this.value) === 0) {
	        this.append(value.slice(this.value.length), {}, '');
	      }

	      delete this._refreshing;
	      return ret;
	    }
	    /** */

	  }, {
	    key: "runIsolated",
	    value: function runIsolated(fn) {
	      if (this._isolated || !this.isInitialized) return fn(this);
	      this._isolated = true;
	      var state = this.state;
	      var ret = fn(this);
	      this.state = state;
	      delete this._isolated;
	      return ret;
	    }
	    /**
	      Prepares string before mask processing
	      @protected
	    */

	  }, {
	    key: "doPrepare",
	    value: function doPrepare(str) {
	      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      return this.prepare ? this.prepare(str, this, flags) : str;
	    }
	    /**
	      Validates if value is acceptable
	      @protected
	    */

	  }, {
	    key: "doValidate",
	    value: function doValidate(flags) {
	      return (!this.validate || this.validate(this.value, this, flags)) && (!this.parent || this.parent.doValidate(flags));
	    }
	    /**
	      Does additional processing in the end of editing
	      @protected
	    */

	  }, {
	    key: "doCommit",
	    value: function doCommit() {
	      if (this.commit) this.commit(this.value, this);
	    }
	    /** */

	  }, {
	    key: "doFormat",
	    value: function doFormat(value) {
	      return this.format ? this.format(value, this) : value;
	    }
	    /** */

	  }, {
	    key: "doParse",
	    value: function doParse(str) {
	      return this.parse ? this.parse(str, this) : str;
	    }
	    /** */

	  }, {
	    key: "splice",
	    value: function splice(start, deleteCount, inserted, removeDirection) {
	      var tailPos = start + deleteCount;
	      var tail = this.extractTail(tailPos);
	      var startChangePos = this.nearestInputPos(start, removeDirection);
	      var changeDetails = new ChangeDetails({
	        tailShift: startChangePos - start // adjust tailShift if start was aligned

	      }).aggregate(this.remove(startChangePos)).aggregate(this.append(inserted, {
	        input: true
	      }, tail));
	      return changeDetails;
	    }
	  }, {
	    key: "state",
	    get: function get() {
	      return {
	        _value: this.value
	      };
	    },
	    set: function set(state) {
	      this._value = state._value;
	    }
	  }, {
	    key: "value",
	    get: function get() {
	      return this._value;
	    },
	    set: function set(value) {
	      this.resolve(value);
	    }
	  }, {
	    key: "unmaskedValue",
	    get: function get() {
	      return this.value;
	    },
	    set: function set(value) {
	      this.reset();
	      this.append(value, {}, '');
	      this.doCommit();
	    }
	    /** */

	  }, {
	    key: "typedValue",
	    get: function get() {
	      return this.doParse(this.value);
	    },
	    set: function set(value) {
	      this.value = this.doFormat(value);
	    }
	    /** Value that includes raw user input */

	  }, {
	    key: "rawInputValue",
	    get: function get() {
	      return this.extractInput(0, this.value.length, {
	        raw: true
	      });
	    },
	    set: function set(value) {
	      this.reset();
	      this.append(value, {
	        raw: true
	      }, '');
	      this.doCommit();
	    }
	    /** */

	  }, {
	    key: "isComplete",
	    get: function get() {
	      return true;
	    }
	  }]);

	  return Masked;
	}();
	Masked.DEFAULTS = {
	  format: function format(v) {
	    return v;
	  },
	  parse: function parse(v) {
	    return v;
	  }
	};
	IMask.Masked = Masked;

	/** Get Masked class by mask type */

	function maskedClass(mask) {
	  if (mask == null) {
	    throw new Error('mask property should be defined');
	  } // $FlowFixMe


	  if (mask instanceof RegExp) return IMask.MaskedRegExp; // $FlowFixMe

	  if (isString(mask)) return IMask.MaskedPattern; // $FlowFixMe

	  if (mask instanceof Date || mask === Date) return IMask.MaskedDate; // $FlowFixMe

	  if (mask instanceof Number || typeof mask === 'number' || mask === Number) return IMask.MaskedNumber; // $FlowFixMe

	  if (Array.isArray(mask) || mask === Array) return IMask.MaskedDynamic; // $FlowFixMe

	  if (IMask.Masked && mask.prototype instanceof IMask.Masked) return mask; // $FlowFixMe

	  if (mask instanceof Function) return IMask.MaskedFunction; // $FlowFixMe

	  if (mask instanceof IMask.Masked) return mask.constructor;
	  console.warn('Mask not found for mask', mask); // eslint-disable-line no-console
	  // $FlowFixMe

	  return IMask.Masked;
	}
	/** Creates new {@link Masked} depending on mask type */

	function createMask(opts) {
	  // $FlowFixMe
	  if (IMask.Masked && opts instanceof IMask.Masked) return opts;
	  opts = Object.assign({}, opts);
	  var mask = opts.mask; // $FlowFixMe

	  if (IMask.Masked && mask instanceof IMask.Masked) return mask;
	  var MaskedClass = maskedClass(mask);
	  if (!MaskedClass) throw new Error('Masked class is not found for provided mask, appropriate module needs to be import manually before creating mask.');
	  return new MaskedClass(opts);
	}
	IMask.createMask = createMask;

	var DEFAULT_INPUT_DEFINITIONS = {
	  '0': /\d/,
	  'a': /[\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
	  // http://stackoverflow.com/a/22075070
	  '*': /./
	};
	/** */

	var PatternInputDefinition =
	/*#__PURE__*/
	function () {
	  /** */

	  /** */

	  /** */

	  /** */

	  /** */

	  /** */
	  function PatternInputDefinition(opts) {
	    _classCallCheck(this, PatternInputDefinition);

	    var mask = opts.mask,
	        blockOpts = _objectWithoutProperties(opts, ["mask"]);

	    this.masked = createMask({
	      mask: mask
	    });
	    Object.assign(this, blockOpts);
	  }

	  _createClass(PatternInputDefinition, [{
	    key: "reset",
	    value: function reset() {
	      this._isFilled = false;
	      this.masked.reset();
	    }
	  }, {
	    key: "remove",
	    value: function remove() {
	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;

	      if (fromPos === 0 && toPos >= 1) {
	        this._isFilled = false;
	        return this.masked.remove(fromPos, toPos);
	      }

	      return new ChangeDetails();
	    }
	  }, {
	    key: "_appendChar",
	    value: function _appendChar(str) {
	      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      if (this._isFilled) return new ChangeDetails();
	      var state = this.masked.state; // simulate input

	      var details = this.masked._appendChar(str, flags);

	      if (details.inserted && this.doValidate(flags) === false) {
	        details.inserted = details.rawInserted = '';
	        this.masked.state = state;
	      }

	      if (!details.inserted && !this.isOptional && !this.lazy && !flags.input) {
	        details.inserted = this.placeholderChar;
	      }

	      details.skip = !details.inserted && !this.isOptional;
	      this._isFilled = Boolean(details.inserted);
	      return details;
	    }
	  }, {
	    key: "append",
	    value: function append() {
	      var _this$masked;

	      return (_this$masked = this.masked).append.apply(_this$masked, arguments);
	    }
	  }, {
	    key: "_appendPlaceholder",
	    value: function _appendPlaceholder() {
	      var details = new ChangeDetails();
	      if (this._isFilled || this.isOptional) return details;
	      this._isFilled = true;
	      details.inserted = this.placeholderChar;
	      return details;
	    }
	  }, {
	    key: "extractTail",
	    value: function extractTail() {
	      var _this$masked2;

	      return (_this$masked2 = this.masked).extractTail.apply(_this$masked2, arguments);
	    }
	  }, {
	    key: "appendTail",
	    value: function appendTail() {
	      var _this$masked3;

	      return (_this$masked3 = this.masked).appendTail.apply(_this$masked3, arguments);
	    }
	  }, {
	    key: "extractInput",
	    value: function extractInput() {
	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	      var flags = arguments.length > 2 ? arguments[2] : undefined;
	      return this.masked.extractInput(fromPos, toPos, flags);
	    }
	  }, {
	    key: "nearestInputPos",
	    value: function nearestInputPos(cursorPos) {
	      var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DIRECTION.NONE;
	      var minPos = 0;
	      var maxPos = this.value.length;
	      var boundPos = Math.min(Math.max(cursorPos, minPos), maxPos);

	      switch (direction) {
	        case DIRECTION.LEFT:
	        case DIRECTION.FORCE_LEFT:
	          return this.isComplete ? boundPos : minPos;

	        case DIRECTION.RIGHT:
	        case DIRECTION.FORCE_RIGHT:
	          return this.isComplete ? boundPos : maxPos;

	        case DIRECTION.NONE:
	        default:
	          return boundPos;
	      }
	    }
	  }, {
	    key: "doValidate",
	    value: function doValidate() {
	      var _this$masked4, _this$parent;

	      return (_this$masked4 = this.masked).doValidate.apply(_this$masked4, arguments) && (!this.parent || (_this$parent = this.parent).doValidate.apply(_this$parent, arguments));
	    }
	  }, {
	    key: "doCommit",
	    value: function doCommit() {
	      this.masked.doCommit();
	    }
	  }, {
	    key: "value",
	    get: function get() {
	      return this.masked.value || (this._isFilled && !this.isOptional ? this.placeholderChar : '');
	    }
	  }, {
	    key: "unmaskedValue",
	    get: function get() {
	      return this.masked.unmaskedValue;
	    }
	  }, {
	    key: "isComplete",
	    get: function get() {
	      return Boolean(this.masked.value) || this.isOptional;
	    }
	  }, {
	    key: "state",
	    get: function get() {
	      return {
	        masked: this.masked.state,
	        _isFilled: this._isFilled
	      };
	    },
	    set: function set(state) {
	      this.masked.state = state.masked;
	      this._isFilled = state._isFilled;
	    }
	  }]);

	  return PatternInputDefinition;
	}();

	var PatternFixedDefinition =
	/*#__PURE__*/
	function () {
	  /** */

	  /** */

	  /** */

	  /** */
	  function PatternFixedDefinition(opts) {
	    _classCallCheck(this, PatternFixedDefinition);

	    Object.assign(this, opts);
	    this._value = '';
	  }

	  _createClass(PatternFixedDefinition, [{
	    key: "reset",
	    value: function reset() {
	      this._isRawInput = false;
	      this._value = '';
	    }
	  }, {
	    key: "remove",
	    value: function remove() {
	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._value.length;
	      this._value = this._value.slice(0, fromPos) + this._value.slice(toPos);
	      if (!this._value) this._isRawInput = false;
	      return new ChangeDetails();
	    }
	  }, {
	    key: "nearestInputPos",
	    value: function nearestInputPos(cursorPos) {
	      var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DIRECTION.NONE;
	      var minPos = 0;
	      var maxPos = this._value.length;

	      switch (direction) {
	        case DIRECTION.LEFT:
	        case DIRECTION.FORCE_LEFT:
	          return minPos;

	        case DIRECTION.NONE:
	        case DIRECTION.RIGHT:
	        case DIRECTION.FORCE_RIGHT:
	        default:
	          return maxPos;
	      }
	    }
	  }, {
	    key: "extractInput",
	    value: function extractInput() {
	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._value.length;
	      var flags = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	      return flags.raw && this._isRawInput && this._value.slice(fromPos, toPos) || '';
	    }
	  }, {
	    key: "_appendChar",
	    value: function _appendChar(str) {
	      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      var details = new ChangeDetails();
	      if (this._value) return details;
	      var appended = this.char === str[0];
	      var isResolved = appended && (this.isUnmasking || flags.input || flags.raw) && !flags.tail;
	      if (isResolved) details.rawInserted = this.char;
	      this._value = details.inserted = this.char;
	      this._isRawInput = isResolved && (flags.raw || flags.input);
	      return details;
	    }
	  }, {
	    key: "_appendPlaceholder",
	    value: function _appendPlaceholder() {
	      var details = new ChangeDetails();
	      if (this._value) return details;
	      this._value = details.inserted = this.char;
	      return details;
	    }
	  }, {
	    key: "extractTail",
	    value: function extractTail() {
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	      return new ContinuousTailDetails('');
	    } // $FlowFixMe no ideas

	  }, {
	    key: "appendTail",
	    value: function appendTail(tail) {
	      if (isString(tail)) tail = new ContinuousTailDetails(String(tail));
	      return tail.appendTo(this);
	    }
	  }, {
	    key: "append",
	    value: function append(str, flags, tail) {
	      var details = this._appendChar(str, flags);

	      if (tail != null) {
	        details.tailShift += this.appendTail(tail).tailShift;
	      }

	      return details;
	    }
	  }, {
	    key: "doCommit",
	    value: function doCommit() {}
	  }, {
	    key: "value",
	    get: function get() {
	      return this._value;
	    }
	  }, {
	    key: "unmaskedValue",
	    get: function get() {
	      return this.isUnmasking ? this.value : '';
	    }
	  }, {
	    key: "isComplete",
	    get: function get() {
	      return true;
	    }
	  }, {
	    key: "state",
	    get: function get() {
	      return {
	        _value: this._value,
	        _isRawInput: this._isRawInput
	      };
	    },
	    set: function set(state) {
	      Object.assign(this, state);
	    }
	  }]);

	  return PatternFixedDefinition;
	}();

	var ChunksTailDetails =
	/*#__PURE__*/
	function () {
	  /** */
	  function ChunksTailDetails() {
	    var chunks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	    var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	    _classCallCheck(this, ChunksTailDetails);

	    this.chunks = chunks;
	    this.from = from;
	  }

	  _createClass(ChunksTailDetails, [{
	    key: "toString",
	    value: function toString() {
	      return this.chunks.map(String).join('');
	    } // $FlowFixMe no ideas

	  }, {
	    key: "extend",
	    value: function extend(tailChunk) {
	      if (!String(tailChunk)) return;
	      if (isString(tailChunk)) tailChunk = new ContinuousTailDetails(String(tailChunk));
	      var lastChunk = this.chunks[this.chunks.length - 1];
	      var extendLast = lastChunk && ( // if stops are same or tail has no stop
	      lastChunk.stop === tailChunk.stop || tailChunk.stop == null) && // if tail chunk goes just after last chunk
	      tailChunk.from === lastChunk.from + lastChunk.toString().length;

	      if (tailChunk instanceof ContinuousTailDetails) {
	        // check the ability to extend previous chunk
	        if (extendLast) {
	          // extend previous chunk
	          lastChunk.extend(tailChunk.toString());
	        } else {
	          // append new chunk
	          this.chunks.push(tailChunk);
	        }
	      } else if (tailChunk instanceof ChunksTailDetails) {
	        if (tailChunk.stop == null) {
	          // unwrap floating chunks to parent, keeping `from` pos
	          var firstTailChunk;

	          while (tailChunk.chunks.length && tailChunk.chunks[0].stop == null) {
	            firstTailChunk = tailChunk.chunks.shift();
	            firstTailChunk.from += tailChunk.from;
	            this.extend(firstTailChunk);
	          }
	        } // if tail chunk still has value


	        if (tailChunk.toString()) {
	          // if chunks contains stops, then popup stop to container
	          tailChunk.stop = tailChunk.blockIndex;
	          this.chunks.push(tailChunk);
	        }
	      }
	    }
	  }, {
	    key: "appendTo",
	    value: function appendTo(masked) {
	      // $FlowFixMe
	      if (!(masked instanceof IMask.MaskedPattern)) {
	        var tail = new ContinuousTailDetails(this.toString());
	        return tail.appendTo(masked);
	      }

	      var details = new ChangeDetails();

	      for (var ci = 0; ci < this.chunks.length && !details.skip; ++ci) {
	        var chunk = this.chunks[ci];

	        var lastBlockIter = masked._mapPosToBlock(masked.value.length);

	        var stop = chunk.stop;
	        var chunkBlock = void 0;

	        if (stop != null && ( // if block not found or stop is behind lastBlock
	        !lastBlockIter || lastBlockIter.index <= stop)) {
	          if (chunk instanceof ChunksTailDetails || // for continuous block also check if stop is exist
	          masked._stops.indexOf(stop) >= 0) {
	            details.aggregate(masked._appendPlaceholder(stop));
	          }

	          chunkBlock = chunk instanceof ChunksTailDetails && masked._blocks[stop];
	        }

	        if (chunkBlock) {
	          var tailDetails = chunkBlock.appendTail(chunk);
	          tailDetails.skip = false; // always ignore skip, it will be set on last

	          details.aggregate(tailDetails);
	          masked._value += tailDetails.inserted; // get not inserted chars

	          var remainChars = chunk.toString().slice(tailDetails.rawInserted.length);
	          if (remainChars) details.aggregate(masked.append(remainChars, {
	            tail: true
	          }));
	        } else {
	          details.aggregate(masked.append(chunk.toString(), {
	            tail: true
	          }));
	        }
	      }
	      return details;
	    }
	  }, {
	    key: "shiftBefore",
	    value: function shiftBefore(pos) {
	      if (this.from >= pos || !this.chunks.length) return '';
	      var chunkShiftPos = pos - this.from;
	      var ci = 0;

	      while (ci < this.chunks.length) {
	        var chunk = this.chunks[ci];
	        var shiftChar = chunk.shiftBefore(chunkShiftPos);

	        if (chunk.toString()) {
	          // chunk still contains value
	          // but not shifted - means no more available chars to shift
	          if (!shiftChar) break;
	          ++ci;
	        } else {
	          // clean if chunk has no value
	          this.chunks.splice(ci, 1);
	        }

	        if (shiftChar) return shiftChar;
	      }

	      return '';
	    }
	  }, {
	    key: "state",
	    get: function get() {
	      return {
	        chunks: this.chunks.map(function (c) {
	          return c.state;
	        }),
	        from: this.from,
	        stop: this.stop,
	        blockIndex: this.blockIndex
	      };
	    },
	    set: function set(state) {
	      var chunks = state.chunks,
	          props = _objectWithoutProperties(state, ["chunks"]);

	      Object.assign(this, props);
	      this.chunks = chunks.map(function (cstate) {
	        var chunk = "chunks" in cstate ? new ChunksTailDetails() : new ContinuousTailDetails(); // $FlowFixMe already checked above

	        chunk.state = cstate;
	        return chunk;
	      });
	    }
	  }]);

	  return ChunksTailDetails;
	}();

	/** Masking by RegExp */

	var MaskedRegExp =
	/*#__PURE__*/
	function (_Masked) {
	  _inherits(MaskedRegExp, _Masked);

	  function MaskedRegExp() {
	    _classCallCheck(this, MaskedRegExp);

	    return _possibleConstructorReturn(this, _getPrototypeOf(MaskedRegExp).apply(this, arguments));
	  }

	  _createClass(MaskedRegExp, [{
	    key: "_update",

	    /**
	      @override
	      @param {Object} opts
	    */
	    value: function _update(opts) {
	      if (opts.mask) opts.validate = function (value) {
	        return value.search(opts.mask) >= 0;
	      };

	      _get(_getPrototypeOf(MaskedRegExp.prototype), "_update", this).call(this, opts);
	    }
	  }]);

	  return MaskedRegExp;
	}(Masked);
	IMask.MaskedRegExp = MaskedRegExp;

	/**
	  Pattern mask
	  @param {Object} opts
	  @param {Object} opts.blocks
	  @param {Object} opts.definitions
	  @param {string} opts.placeholderChar
	  @param {boolean} opts.lazy
	*/
	var MaskedPattern =
	/*#__PURE__*/
	function (_Masked) {
	  _inherits(MaskedPattern, _Masked);

	  /** */

	  /** */

	  /** Single char for empty input */

	  /** Show placeholder only when needed */
	  function MaskedPattern() {
	    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck(this, MaskedPattern);

	    // TODO type $Shape<MaskedPatternOptions>={} does not work
	    opts.definitions = Object.assign({}, DEFAULT_INPUT_DEFINITIONS, opts.definitions);
	    return _possibleConstructorReturn(this, _getPrototypeOf(MaskedPattern).call(this, Object.assign({}, MaskedPattern.DEFAULTS, {}, opts)));
	  }
	  /**
	    @override
	    @param {Object} opts
	  */


	  _createClass(MaskedPattern, [{
	    key: "_update",
	    value: function _update() {
	      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      opts.definitions = Object.assign({}, this.definitions, opts.definitions);

	      _get(_getPrototypeOf(MaskedPattern.prototype), "_update", this).call(this, opts);

	      this._rebuildMask();
	    }
	    /** */

	  }, {
	    key: "_rebuildMask",
	    value: function _rebuildMask() {
	      var _this = this;

	      var defs = this.definitions;
	      this._blocks = [];
	      this._stops = [];
	      this._maskedBlocks = {};
	      var pattern = this.mask;
	      if (!pattern || !defs) return;
	      var unmaskingBlock = false;
	      var optionalBlock = false;

	      for (var i = 0; i < pattern.length; ++i) {
	        if (this.blocks) {
	          var _ret = function () {
	            var p = pattern.slice(i);
	            var bNames = Object.keys(_this.blocks).filter(function (bName) {
	              return p.indexOf(bName) === 0;
	            }); // order by key length

	            bNames.sort(function (a, b) {
	              return b.length - a.length;
	            }); // use block name with max length

	            var bName = bNames[0];

	            if (bName) {
	              var maskedBlock = createMask(Object.assign({
	                parent: _this,
	                lazy: _this.lazy,
	                placeholderChar: _this.placeholderChar,
	                overwrite: _this.overwrite
	              }, _this.blocks[bName]));

	              if (maskedBlock) {
	                _this._blocks.push(maskedBlock); // store block index


	                if (!_this._maskedBlocks[bName]) _this._maskedBlocks[bName] = [];

	                _this._maskedBlocks[bName].push(_this._blocks.length - 1);
	              }

	              i += bName.length - 1;
	              return "continue";
	            }
	          }();

	          if (_ret === "continue") continue;
	        }

	        var char = pattern[i];

	        var _isInput = char in defs;

	        if (char === MaskedPattern.STOP_CHAR) {
	          this._stops.push(this._blocks.length);

	          continue;
	        }

	        if (char === '{' || char === '}') {
	          unmaskingBlock = !unmaskingBlock;
	          continue;
	        }

	        if (char === '[' || char === ']') {
	          optionalBlock = !optionalBlock;
	          continue;
	        }

	        if (char === MaskedPattern.ESCAPE_CHAR) {
	          ++i;
	          char = pattern[i];
	          if (!char) break;
	          _isInput = false;
	        }

	        var def = _isInput ? new PatternInputDefinition({
	          parent: this,
	          lazy: this.lazy,
	          placeholderChar: this.placeholderChar,
	          mask: defs[char],
	          isOptional: optionalBlock
	        }) : new PatternFixedDefinition({
	          char: char,
	          isUnmasking: unmaskingBlock
	        });

	        this._blocks.push(def);
	      }
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "reset",

	    /**
	      @override
	    */
	    value: function reset() {
	      _get(_getPrototypeOf(MaskedPattern.prototype), "reset", this).call(this);

	      this._blocks.forEach(function (b) {
	        return b.reset();
	      });
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "doCommit",

	    /**
	      @override
	    */
	    value: function doCommit() {
	      this._blocks.forEach(function (b) {
	        return b.doCommit();
	      });

	      _get(_getPrototypeOf(MaskedPattern.prototype), "doCommit", this).call(this);
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "appendTail",

	    /**
	      @override
	    */
	    value: function appendTail(tail) {
	      return _get(_getPrototypeOf(MaskedPattern.prototype), "appendTail", this).call(this, tail).aggregate(this._appendPlaceholder());
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "_appendCharRaw",
	    value: function _appendCharRaw(ch) {
	      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      ch = this.doPrepare(ch, flags);

	      var blockIter = this._mapPosToBlock(this.value.length);

	      var details = new ChangeDetails();
	      if (!blockIter) return details;

	      for (var bi = blockIter.index;; ++bi) {
	        var _block = this._blocks[bi];
	        if (!_block) break;

	        var blockDetails = _block._appendChar(ch, flags);

	        var skip = blockDetails.skip;
	        details.aggregate(blockDetails);
	        if (skip || blockDetails.rawInserted) break; // go next char
	      }

	      return details;
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "extractTail",
	    value: function extractTail() {
	      var _this2 = this;

	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	      var chunkTail = new ChunksTailDetails();
	      if (fromPos === toPos) return chunkTail;

	      this._forEachBlocksInRange(fromPos, toPos, function (b, bi, bFromPos, bToPos) {
	        var blockChunk = b.extractTail(bFromPos, bToPos);
	        blockChunk.stop = _this2._findStopBefore(bi);
	        blockChunk.from = _this2._blockStartPos(bi);
	        if (blockChunk instanceof ChunksTailDetails) blockChunk.blockIndex = bi;
	        chunkTail.extend(blockChunk);
	      });

	      return chunkTail;
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "extractInput",
	    value: function extractInput() {
	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	      var flags = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	      if (fromPos === toPos) return '';
	      var input = '';

	      this._forEachBlocksInRange(fromPos, toPos, function (b, _, fromPos, toPos) {
	        input += b.extractInput(fromPos, toPos, flags);
	      });

	      return input;
	    }
	  }, {
	    key: "_findStopBefore",
	    value: function _findStopBefore(blockIndex) {
	      var stopBefore;

	      for (var si = 0; si < this._stops.length; ++si) {
	        var stop = this._stops[si];
	        if (stop <= blockIndex) stopBefore = stop;else break;
	      }

	      return stopBefore;
	    }
	    /** Appends placeholder depending on laziness */

	  }, {
	    key: "_appendPlaceholder",
	    value: function _appendPlaceholder(toBlockIndex) {
	      var _this3 = this;

	      var details = new ChangeDetails();
	      if (this.lazy && toBlockIndex == null) return details;

	      var startBlockIter = this._mapPosToBlock(this.value.length);

	      if (!startBlockIter) return details;
	      var startBlockIndex = startBlockIter.index;
	      var endBlockIndex = toBlockIndex != null ? toBlockIndex : this._blocks.length;

	      this._blocks.slice(startBlockIndex, endBlockIndex).forEach(function (b) {
	        if (!b.lazy || toBlockIndex != null) {
	          // $FlowFixMe `_blocks` may not be present
	          var args = b._blocks != null ? [b._blocks.length] : [];

	          var bDetails = b._appendPlaceholder.apply(b, args);

	          _this3._value += bDetails.inserted;
	          details.aggregate(bDetails);
	        }
	      });

	      return details;
	    }
	    /** Finds block in pos */

	  }, {
	    key: "_mapPosToBlock",
	    value: function _mapPosToBlock(pos) {
	      var accVal = '';

	      for (var bi = 0; bi < this._blocks.length; ++bi) {
	        var _block2 = this._blocks[bi];
	        var blockStartPos = accVal.length;
	        accVal += _block2.value;

	        if (pos <= accVal.length) {
	          return {
	            index: bi,
	            offset: pos - blockStartPos
	          };
	        }
	      }
	    }
	    /** */

	  }, {
	    key: "_blockStartPos",
	    value: function _blockStartPos(blockIndex) {
	      return this._blocks.slice(0, blockIndex).reduce(function (pos, b) {
	        return pos += b.value.length;
	      }, 0);
	    }
	    /** */

	  }, {
	    key: "_forEachBlocksInRange",
	    value: function _forEachBlocksInRange(fromPos) {
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	      var fn = arguments.length > 2 ? arguments[2] : undefined;

	      var fromBlockIter = this._mapPosToBlock(fromPos);

	      if (fromBlockIter) {
	        var toBlockIter = this._mapPosToBlock(toPos); // process first block


	        var isSameBlock = toBlockIter && fromBlockIter.index === toBlockIter.index;
	        var fromBlockStartPos = fromBlockIter.offset;
	        var fromBlockEndPos = toBlockIter && isSameBlock ? toBlockIter.offset : this._blocks[fromBlockIter.index].value.length;
	        fn(this._blocks[fromBlockIter.index], fromBlockIter.index, fromBlockStartPos, fromBlockEndPos);

	        if (toBlockIter && !isSameBlock) {
	          // process intermediate blocks
	          for (var bi = fromBlockIter.index + 1; bi < toBlockIter.index; ++bi) {
	            fn(this._blocks[bi], bi, 0, this._blocks[bi].value.length);
	          } // process last block


	          fn(this._blocks[toBlockIter.index], toBlockIter.index, 0, toBlockIter.offset);
	        }
	      }
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "remove",
	    value: function remove() {
	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;

	      var removeDetails = _get(_getPrototypeOf(MaskedPattern.prototype), "remove", this).call(this, fromPos, toPos);

	      this._forEachBlocksInRange(fromPos, toPos, function (b, _, bFromPos, bToPos) {
	        removeDetails.aggregate(b.remove(bFromPos, bToPos));
	      });

	      return removeDetails;
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "nearestInputPos",
	    value: function nearestInputPos(cursorPos) {
	      var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DIRECTION.NONE;
	      // TODO refactor - extract alignblock
	      var beginBlockData = this._mapPosToBlock(cursorPos) || {
	        index: 0,
	        offset: 0
	      };
	      var beginBlockOffset = beginBlockData.offset,
	          beginBlockIndex = beginBlockData.index;
	      var beginBlock = this._blocks[beginBlockIndex];
	      if (!beginBlock) return cursorPos;
	      var beginBlockCursorPos = beginBlockOffset; // if position inside block - try to adjust it

	      if (beginBlockCursorPos !== 0 && beginBlockCursorPos < beginBlock.value.length) {
	        beginBlockCursorPos = beginBlock.nearestInputPos(beginBlockOffset, forceDirection(direction));
	      }

	      var cursorAtRight = beginBlockCursorPos === beginBlock.value.length;
	      var cursorAtLeft = beginBlockCursorPos === 0; //  cursor is INSIDE first block (not at bounds)

	      if (!cursorAtLeft && !cursorAtRight) return this._blockStartPos(beginBlockIndex) + beginBlockCursorPos;
	      var searchBlockIndex = cursorAtRight ? beginBlockIndex + 1 : beginBlockIndex;

	      if (direction === DIRECTION.NONE) {
	        // NONE direction used to calculate start input position if no chars were removed
	        // FOR NONE:
	        // -
	        // input|any
	        // ->
	        //  any|input
	        // <-
	        //  filled-input|any
	        // check if first block at left is input
	        if (searchBlockIndex > 0) {
	          var blockIndexAtLeft = searchBlockIndex - 1;
	          var blockAtLeft = this._blocks[blockIndexAtLeft];
	          var blockInputPos = blockAtLeft.nearestInputPos(0, DIRECTION.NONE); // is input

	          if (!blockAtLeft.value.length || blockInputPos !== blockAtLeft.value.length) {
	            return this._blockStartPos(searchBlockIndex);
	          }
	        } // ->


	        var firstInputAtRight = searchBlockIndex;

	        for (var bi = firstInputAtRight; bi < this._blocks.length; ++bi) {
	          var blockAtRight = this._blocks[bi];

	          var _blockInputPos = blockAtRight.nearestInputPos(0, DIRECTION.NONE);

	          if (!blockAtRight.value.length || _blockInputPos !== blockAtRight.value.length) {
	            return this._blockStartPos(bi) + _blockInputPos;
	          }
	        } // <-
	        // find first non-fixed symbol


	        for (var _bi = searchBlockIndex - 1; _bi >= 0; --_bi) {
	          var _block3 = this._blocks[_bi];

	          var _blockInputPos2 = _block3.nearestInputPos(0, DIRECTION.NONE); // is input


	          if (!_block3.value.length || _blockInputPos2 !== _block3.value.length) {
	            return this._blockStartPos(_bi) + _block3.value.length;
	          }
	        }

	        return cursorPos;
	      }

	      if (direction === DIRECTION.LEFT || direction === DIRECTION.FORCE_LEFT) {
	        // -
	        //  any|filled-input
	        // <-
	        //  any|first not empty is not-len-aligned
	        //  not-0-aligned|any
	        // ->
	        //  any|not-len-aligned or end
	        // check if first block at right is filled input
	        var firstFilledBlockIndexAtRight;

	        for (var _bi2 = searchBlockIndex; _bi2 < this._blocks.length; ++_bi2) {
	          if (this._blocks[_bi2].value) {
	            firstFilledBlockIndexAtRight = _bi2;
	            break;
	          }
	        }

	        if (firstFilledBlockIndexAtRight != null) {
	          var filledBlock = this._blocks[firstFilledBlockIndexAtRight];

	          var _blockInputPos3 = filledBlock.nearestInputPos(0, DIRECTION.RIGHT);

	          if (_blockInputPos3 === 0 && filledBlock.unmaskedValue.length) {
	            // filled block is input
	            return this._blockStartPos(firstFilledBlockIndexAtRight) + _blockInputPos3;
	          }
	        } // <-
	        // find this vars


	        var firstFilledInputBlockIndex = -1;
	        var firstEmptyInputBlockIndex; // TODO consider nested empty inputs

	        for (var _bi3 = searchBlockIndex - 1; _bi3 >= 0; --_bi3) {
	          var _block4 = this._blocks[_bi3];

	          var _blockInputPos4 = _block4.nearestInputPos(_block4.value.length, DIRECTION.FORCE_LEFT);

	          if (!_block4.value || _blockInputPos4 !== 0) firstEmptyInputBlockIndex = _bi3;

	          if (_blockInputPos4 !== 0) {
	            if (_blockInputPos4 !== _block4.value.length) {
	              // aligned inside block - return immediately
	              return this._blockStartPos(_bi3) + _blockInputPos4;
	            } else {
	              // found filled
	              firstFilledInputBlockIndex = _bi3;
	              break;
	            }
	          }
	        }

	        if (direction === DIRECTION.LEFT) {
	          // try find first empty input before start searching position only when not forced
	          for (var _bi4 = firstFilledInputBlockIndex + 1; _bi4 <= Math.min(searchBlockIndex, this._blocks.length - 1); ++_bi4) {
	            var _block5 = this._blocks[_bi4];

	            var _blockInputPos5 = _block5.nearestInputPos(0, DIRECTION.NONE);

	            var blockAlignedPos = this._blockStartPos(_bi4) + _blockInputPos5;

	            if (blockAlignedPos > cursorPos) break; // if block is not lazy input

	            if (_blockInputPos5 !== _block5.value.length) return blockAlignedPos;
	          }
	        } // process overflow


	        if (firstFilledInputBlockIndex >= 0) {
	          return this._blockStartPos(firstFilledInputBlockIndex) + this._blocks[firstFilledInputBlockIndex].value.length;
	        } // for lazy if has aligned left inside fixed and has came to the start - use start position


	        if (direction === DIRECTION.FORCE_LEFT || this.lazy && !this.extractInput() && !isInput(this._blocks[searchBlockIndex])) {
	          return 0;
	        }

	        if (firstEmptyInputBlockIndex != null) {
	          return this._blockStartPos(firstEmptyInputBlockIndex);
	        } // find first input


	        for (var _bi5 = searchBlockIndex; _bi5 < this._blocks.length; ++_bi5) {
	          var _block6 = this._blocks[_bi5];

	          var _blockInputPos6 = _block6.nearestInputPos(0, DIRECTION.NONE); // is input


	          if (!_block6.value.length || _blockInputPos6 !== _block6.value.length) {
	            return this._blockStartPos(_bi5) + _blockInputPos6;
	          }
	        }

	        return 0;
	      }

	      if (direction === DIRECTION.RIGHT || direction === DIRECTION.FORCE_RIGHT) {
	        // ->
	        //  any|not-len-aligned and filled
	        //  any|not-len-aligned
	        // <-
	        //  not-0-aligned or start|any
	        var firstInputBlockAlignedIndex;
	        var firstInputBlockAlignedPos;

	        for (var _bi6 = searchBlockIndex; _bi6 < this._blocks.length; ++_bi6) {
	          var _block7 = this._blocks[_bi6];

	          var _blockInputPos7 = _block7.nearestInputPos(0, DIRECTION.NONE);

	          if (_blockInputPos7 !== _block7.value.length) {
	            firstInputBlockAlignedPos = this._blockStartPos(_bi6) + _blockInputPos7;
	            firstInputBlockAlignedIndex = _bi6;
	            break;
	          }
	        }

	        if (firstInputBlockAlignedIndex != null && firstInputBlockAlignedPos != null) {
	          for (var _bi7 = firstInputBlockAlignedIndex; _bi7 < this._blocks.length; ++_bi7) {
	            var _block8 = this._blocks[_bi7];

	            var _blockInputPos8 = _block8.nearestInputPos(0, DIRECTION.FORCE_RIGHT);

	            if (_blockInputPos8 !== _block8.value.length) {
	              return this._blockStartPos(_bi7) + _blockInputPos8;
	            }
	          }

	          return direction === DIRECTION.FORCE_RIGHT ? this.value.length : firstInputBlockAlignedPos;
	        }

	        for (var _bi8 = Math.min(searchBlockIndex, this._blocks.length - 1); _bi8 >= 0; --_bi8) {
	          var _block9 = this._blocks[_bi8];

	          var _blockInputPos9 = _block9.nearestInputPos(_block9.value.length, DIRECTION.LEFT);

	          if (_blockInputPos9 !== 0) {
	            var alignedPos = this._blockStartPos(_bi8) + _blockInputPos9;

	            if (alignedPos >= cursorPos) return alignedPos;
	            break;
	          }
	        }
	      }

	      return cursorPos;
	    }
	    /** Get block by name */

	  }, {
	    key: "maskedBlock",
	    value: function maskedBlock(name) {
	      return this.maskedBlocks(name)[0];
	    }
	    /** Get all blocks by name */

	  }, {
	    key: "maskedBlocks",
	    value: function maskedBlocks(name) {
	      var _this4 = this;

	      var indices = this._maskedBlocks[name];
	      if (!indices) return [];
	      return indices.map(function (gi) {
	        return _this4._blocks[gi];
	      });
	    }
	  }, {
	    key: "state",
	    get: function get() {
	      return Object.assign({}, _get(_getPrototypeOf(MaskedPattern.prototype), "state", this), {
	        _blocks: this._blocks.map(function (b) {
	          return b.state;
	        })
	      });
	    },
	    set: function set(state) {
	      var _blocks = state._blocks,
	          maskedState = _objectWithoutProperties(state, ["_blocks"]);

	      this._blocks.forEach(function (b, bi) {
	        return b.state = _blocks[bi];
	      });

	      _set(_getPrototypeOf(MaskedPattern.prototype), "state", maskedState, this, true);
	    }
	  }, {
	    key: "isComplete",
	    get: function get() {
	      return this._blocks.every(function (b) {
	        return b.isComplete;
	      });
	    }
	  }, {
	    key: "unmaskedValue",
	    get: function get() {
	      return this._blocks.reduce(function (str, b) {
	        return str += b.unmaskedValue;
	      }, '');
	    },
	    set: function set(unmaskedValue) {
	      _set(_getPrototypeOf(MaskedPattern.prototype), "unmaskedValue", unmaskedValue, this, true);
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "value",
	    get: function get() {
	      // TODO return _value when not in change?
	      return this._blocks.reduce(function (str, b) {
	        return str += b.value;
	      }, '');
	    },
	    set: function set(value) {
	      _set(_getPrototypeOf(MaskedPattern.prototype), "value", value, this, true);
	    }
	  }]);

	  return MaskedPattern;
	}(Masked);
	MaskedPattern.DEFAULTS = {
	  lazy: true,
	  placeholderChar: '_'
	};
	MaskedPattern.STOP_CHAR = '`';
	MaskedPattern.ESCAPE_CHAR = '\\';
	MaskedPattern.InputDefinition = PatternInputDefinition;
	MaskedPattern.FixedDefinition = PatternFixedDefinition;

	function isInput(block) {
	  if (!block) return false;
	  var value = block.value;
	  return !value || block.nearestInputPos(0, DIRECTION.NONE) !== value.length;
	}

	IMask.MaskedPattern = MaskedPattern;

	/** Pattern which accepts ranges */

	var MaskedRange =
	/*#__PURE__*/
	function (_MaskedPattern) {
	  _inherits(MaskedRange, _MaskedPattern);

	  function MaskedRange() {
	    _classCallCheck(this, MaskedRange);

	    return _possibleConstructorReturn(this, _getPrototypeOf(MaskedRange).apply(this, arguments));
	  }

	  _createClass(MaskedRange, [{
	    key: "_update",

	    /**
	      @override
	    */
	    value: function _update(opts) {
	      // TODO type
	      opts = Object.assign({
	        to: this.to || 0,
	        from: this.from || 0
	      }, opts);
	      var maxLength = String(opts.to).length;
	      if (opts.maxLength != null) maxLength = Math.max(maxLength, opts.maxLength);
	      opts.maxLength = maxLength;
	      var fromStr = String(opts.from).padStart(maxLength, '0');
	      var toStr = String(opts.to).padStart(maxLength, '0');
	      var sameCharsCount = 0;

	      while (sameCharsCount < toStr.length && toStr[sameCharsCount] === fromStr[sameCharsCount]) {
	        ++sameCharsCount;
	      }

	      opts.mask = toStr.slice(0, sameCharsCount).replace(/0/g, '\\0') + '0'.repeat(maxLength - sameCharsCount);

	      _get(_getPrototypeOf(MaskedRange.prototype), "_update", this).call(this, opts);
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "boundaries",
	    value: function boundaries(str) {
	      var minstr = '';
	      var maxstr = '';

	      var _ref = str.match(/^(\D*)(\d*)(\D*)/) || [],
	          _ref2 = _slicedToArray(_ref, 3),
	          placeholder = _ref2[1],
	          num = _ref2[2];

	      if (num) {
	        minstr = '0'.repeat(placeholder.length) + num;
	        maxstr = '9'.repeat(placeholder.length) + num;
	      }

	      minstr = minstr.padEnd(this.maxLength, '0');
	      maxstr = maxstr.padEnd(this.maxLength, '9');
	      return [minstr, maxstr];
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "doPrepare",
	    value: function doPrepare(str) {
	      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      str = _get(_getPrototypeOf(MaskedRange.prototype), "doPrepare", this).call(this, str, flags).replace(/\D/g, '');
	      if (!this.autofix) return str;
	      var fromStr = String(this.from).padStart(this.maxLength, '0');
	      var toStr = String(this.to).padStart(this.maxLength, '0');
	      var val = this.value;
	      var prepStr = '';

	      for (var ci = 0; ci < str.length; ++ci) {
	        var nextVal = val + prepStr + str[ci];

	        var _this$boundaries = this.boundaries(nextVal),
	            _this$boundaries2 = _slicedToArray(_this$boundaries, 2),
	            minstr = _this$boundaries2[0],
	            maxstr = _this$boundaries2[1];

	        if (Number(maxstr) < this.from) prepStr += fromStr[nextVal.length - 1];else if (Number(minstr) > this.to) prepStr += toStr[nextVal.length - 1];else prepStr += str[ci];
	      }

	      return prepStr;
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "doValidate",
	    value: function doValidate() {
	      var _get2;

	      var str = this.value;
	      var firstNonZero = str.search(/[^0]/);
	      if (firstNonZero === -1 && str.length <= this._matchFrom) return true;

	      var _this$boundaries3 = this.boundaries(str),
	          _this$boundaries4 = _slicedToArray(_this$boundaries3, 2),
	          minstr = _this$boundaries4[0],
	          maxstr = _this$boundaries4[1];

	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      return this.from <= Number(maxstr) && Number(minstr) <= this.to && (_get2 = _get(_getPrototypeOf(MaskedRange.prototype), "doValidate", this)).call.apply(_get2, [this].concat(args));
	    }
	  }, {
	    key: "_matchFrom",

	    /**
	      Optionally sets max length of pattern.
	      Used when pattern length is longer then `to` param length. Pads zeros at start in this case.
	    */

	    /** Min bound */

	    /** Max bound */

	    /** */
	    get: function get() {
	      return this.maxLength - String(this.from).length;
	    }
	  }, {
	    key: "isComplete",
	    get: function get() {
	      return _get(_getPrototypeOf(MaskedRange.prototype), "isComplete", this) && Boolean(this.value);
	    }
	  }]);

	  return MaskedRange;
	}(MaskedPattern);
	IMask.MaskedRange = MaskedRange;

	/** Date mask */

	var MaskedDate =
	/*#__PURE__*/
	function (_MaskedPattern) {
	  _inherits(MaskedDate, _MaskedPattern);

	  /** Pattern mask for date according to {@link MaskedDate#format} */

	  /** Start date */

	  /** End date */

	  /** */

	  /**
	    @param {Object} opts
	  */
	  function MaskedDate(opts) {
	    _classCallCheck(this, MaskedDate);

	    return _possibleConstructorReturn(this, _getPrototypeOf(MaskedDate).call(this, Object.assign({}, MaskedDate.DEFAULTS, {}, opts)));
	  }
	  /**
	    @override
	  */


	  _createClass(MaskedDate, [{
	    key: "_update",
	    value: function _update(opts) {
	      if (opts.mask === Date) delete opts.mask;
	      if (opts.pattern) opts.mask = opts.pattern;
	      var blocks = opts.blocks;
	      opts.blocks = Object.assign({}, MaskedDate.GET_DEFAULT_BLOCKS()); // adjust year block

	      if (opts.min) opts.blocks.Y.from = opts.min.getFullYear();
	      if (opts.max) opts.blocks.Y.to = opts.max.getFullYear();

	      if (opts.min && opts.max && opts.blocks.Y.from === opts.blocks.Y.to) {
	        opts.blocks.m.from = opts.min.getMonth() + 1;
	        opts.blocks.m.to = opts.max.getMonth() + 1;

	        if (opts.blocks.m.from === opts.blocks.m.to) {
	          opts.blocks.d.from = opts.min.getDate();
	          opts.blocks.d.to = opts.max.getDate();
	        }
	      }

	      Object.assign(opts.blocks, blocks); // add autofix

	      Object.keys(opts.blocks).forEach(function (bk) {
	        var b = opts.blocks[bk];
	        if (!('autofix' in b)) b.autofix = opts.autofix;
	      });

	      _get(_getPrototypeOf(MaskedDate.prototype), "_update", this).call(this, opts);
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "doValidate",
	    value: function doValidate() {
	      var _get2;

	      var date = this.date;

	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      return (_get2 = _get(_getPrototypeOf(MaskedDate.prototype), "doValidate", this)).call.apply(_get2, [this].concat(args)) && (!this.isComplete || this.isDateExist(this.value) && date != null && (this.min == null || this.min <= date) && (this.max == null || date <= this.max));
	    }
	    /** Checks if date is exists */

	  }, {
	    key: "isDateExist",
	    value: function isDateExist(str) {
	      return this.format(this.parse(str, this), this).indexOf(str) >= 0;
	    }
	    /** Parsed Date */

	  }, {
	    key: "date",
	    get: function get() {
	      return this.typedValue;
	    },
	    set: function set(date) {
	      this.typedValue = date;
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "typedValue",
	    get: function get() {
	      return this.isComplete ? _get(_getPrototypeOf(MaskedDate.prototype), "typedValue", this) : null;
	    },
	    set: function set(value) {
	      _set(_getPrototypeOf(MaskedDate.prototype), "typedValue", value, this, true);
	    }
	  }]);

	  return MaskedDate;
	}(MaskedPattern);
	MaskedDate.DEFAULTS = {
	  pattern: 'd{.}`m{.}`Y',
	  format: function format(date) {
	    var day = String(date.getDate()).padStart(2, '0');
	    var month = String(date.getMonth() + 1).padStart(2, '0');
	    var year = date.getFullYear();
	    return [day, month, year].join('.');
	  },
	  parse: function parse(str) {
	    var _str$split = str.split('.'),
	        _str$split2 = _slicedToArray(_str$split, 3),
	        day = _str$split2[0],
	        month = _str$split2[1],
	        year = _str$split2[2];

	    return new Date(year, month - 1, day);
	  }
	};

	MaskedDate.GET_DEFAULT_BLOCKS = function () {
	  return {
	    d: {
	      mask: MaskedRange,
	      from: 1,
	      to: 31,
	      maxLength: 2
	    },
	    m: {
	      mask: MaskedRange,
	      from: 1,
	      to: 12,
	      maxLength: 2
	    },
	    Y: {
	      mask: MaskedRange,
	      from: 1900,
	      to: 9999
	    }
	  };
	};

	IMask.MaskedDate = MaskedDate;

	/**
	  Generic element API to use with mask
	  @interface
	*/
	var MaskElement =
	/*#__PURE__*/
	function () {
	  function MaskElement() {
	    _classCallCheck(this, MaskElement);
	  }

	  _createClass(MaskElement, [{
	    key: "select",

	    /** Safely sets element selection */
	    value: function select(start, end) {
	      if (start == null || end == null || start === this.selectionStart && end === this.selectionEnd) return;

	      try {
	        this._unsafeSelect(start, end);
	      } catch (e) {}
	    }
	    /** Should be overriden in subclasses */

	  }, {
	    key: "_unsafeSelect",
	    value: function _unsafeSelect(start, end) {}
	    /** Should be overriden in subclasses */

	  }, {
	    key: "bindEvents",

	    /** Should be overriden in subclasses */
	    value: function bindEvents(handlers) {}
	    /** Should be overriden in subclasses */

	  }, {
	    key: "unbindEvents",
	    value: function unbindEvents() {}
	  }, {
	    key: "selectionStart",

	    /** */

	    /** */

	    /** */

	    /** Safely returns selection start */
	    get: function get() {
	      var start;

	      try {
	        start = this._unsafeSelectionStart;
	      } catch (e) {}

	      return start != null ? start : this.value.length;
	    }
	    /** Safely returns selection end */

	  }, {
	    key: "selectionEnd",
	    get: function get() {
	      var end;

	      try {
	        end = this._unsafeSelectionEnd;
	      } catch (e) {}

	      return end != null ? end : this.value.length;
	    }
	  }, {
	    key: "isActive",
	    get: function get() {
	      return false;
	    }
	  }]);

	  return MaskElement;
	}();
	IMask.MaskElement = MaskElement;

	/** Bridge between HTMLElement and {@link Masked} */

	var HTMLMaskElement =
	/*#__PURE__*/
	function (_MaskElement) {
	  _inherits(HTMLMaskElement, _MaskElement);

	  /** Mapping between HTMLElement events and mask internal events */

	  /** HTMLElement to use mask on */

	  /**
	    @param {HTMLInputElement|HTMLTextAreaElement} input
	  */
	  function HTMLMaskElement(input) {
	    var _this;

	    _classCallCheck(this, HTMLMaskElement);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(HTMLMaskElement).call(this));
	    _this.input = input;
	    _this._handlers = {};
	    return _this;
	  }
	  /** */
	  // $FlowFixMe https://github.com/facebook/flow/issues/2839


	  _createClass(HTMLMaskElement, [{
	    key: "_unsafeSelect",

	    /**
	      Sets HTMLElement selection
	      @override
	    */
	    value: function _unsafeSelect(start, end) {
	      this.input.setSelectionRange(start, end);
	    }
	    /**
	      HTMLElement value
	      @override
	    */

	  }, {
	    key: "bindEvents",

	    /**
	      Binds HTMLElement events to mask internal events
	      @override
	    */
	    value: function bindEvents(handlers) {
	      var _this2 = this;

	      Object.keys(handlers).forEach(function (event) {
	        return _this2._toggleEventHandler(HTMLMaskElement.EVENTS_MAP[event], handlers[event]);
	      });
	    }
	    /**
	      Unbinds HTMLElement events to mask internal events
	      @override
	    */

	  }, {
	    key: "unbindEvents",
	    value: function unbindEvents() {
	      var _this3 = this;

	      Object.keys(this._handlers).forEach(function (event) {
	        return _this3._toggleEventHandler(event);
	      });
	    }
	    /** */

	  }, {
	    key: "_toggleEventHandler",
	    value: function _toggleEventHandler(event, handler) {
	      if (this._handlers[event]) {
	        this.input.removeEventListener(event, this._handlers[event]);
	        delete this._handlers[event];
	      }

	      if (handler) {
	        this.input.addEventListener(event, handler);
	        this._handlers[event] = handler;
	      }
	    }
	  }, {
	    key: "rootElement",
	    get: function get() {
	      return this.input.getRootNode ? this.input.getRootNode() : document;
	    }
	    /**
	      Is element in focus
	      @readonly
	    */

	  }, {
	    key: "isActive",
	    get: function get() {
	      //$FlowFixMe
	      return this.input === this.rootElement.activeElement;
	    }
	    /**
	      Returns HTMLElement selection start
	      @override
	    */

	  }, {
	    key: "_unsafeSelectionStart",
	    get: function get() {
	      return this.input.selectionStart;
	    }
	    /**
	      Returns HTMLElement selection end
	      @override
	    */

	  }, {
	    key: "_unsafeSelectionEnd",
	    get: function get() {
	      return this.input.selectionEnd;
	    }
	  }, {
	    key: "value",
	    get: function get() {
	      return this.input.value;
	    },
	    set: function set(value) {
	      this.input.value = value;
	    }
	  }]);

	  return HTMLMaskElement;
	}(MaskElement);
	HTMLMaskElement.EVENTS_MAP = {
	  selectionChange: 'keydown',
	  input: 'input',
	  drop: 'drop',
	  click: 'click',
	  focus: 'focus',
	  commit: 'blur'
	};
	IMask.HTMLMaskElement = HTMLMaskElement;

	var HTMLContenteditableMaskElement =
	/*#__PURE__*/
	function (_HTMLMaskElement) {
	  _inherits(HTMLContenteditableMaskElement, _HTMLMaskElement);

	  function HTMLContenteditableMaskElement() {
	    _classCallCheck(this, HTMLContenteditableMaskElement);

	    return _possibleConstructorReturn(this, _getPrototypeOf(HTMLContenteditableMaskElement).apply(this, arguments));
	  }

	  _createClass(HTMLContenteditableMaskElement, [{
	    key: "_unsafeSelect",

	    /**
	      Sets HTMLElement selection
	      @override
	    */
	    value: function _unsafeSelect(start, end) {
	      if (!this.rootElement.createRange) return;
	      var range = this.rootElement.createRange();
	      range.setStart(this.input.firstChild || this.input, start);
	      range.setEnd(this.input.lastChild || this.input, end);
	      var root = this.rootElement;
	      var selection = root.getSelection && root.getSelection();

	      if (selection) {
	        selection.removeAllRanges();
	        selection.addRange(range);
	      }
	    }
	    /**
	      HTMLElement value
	      @override
	    */

	  }, {
	    key: "_unsafeSelectionStart",

	    /**
	      Returns HTMLElement selection start
	      @override
	    */
	    get: function get() {
	      var root = this.rootElement;
	      var selection = root.getSelection && root.getSelection();
	      return selection && selection.anchorOffset;
	    }
	    /**
	      Returns HTMLElement selection end
	      @override
	    */

	  }, {
	    key: "_unsafeSelectionEnd",
	    get: function get() {
	      var root = this.rootElement;
	      var selection = root.getSelection && root.getSelection();
	      return selection && this._unsafeSelectionStart + String(selection).length;
	    }
	  }, {
	    key: "value",
	    get: function get() {
	      // $FlowFixMe
	      return this.input.textContent;
	    },
	    set: function set(value) {
	      this.input.textContent = value;
	    }
	  }]);

	  return HTMLContenteditableMaskElement;
	}(HTMLMaskElement);
	IMask.HTMLContenteditableMaskElement = HTMLContenteditableMaskElement;

	/** Listens to element events and controls changes between element and {@link Masked} */

	var InputMask =
	/*#__PURE__*/
	function () {
	  /**
	    View element
	    @readonly
	  */

	  /**
	    Internal {@link Masked} model
	    @readonly
	  */

	  /**
	    @param {MaskElement|HTMLInputElement|HTMLTextAreaElement} el
	    @param {Object} opts
	  */
	  function InputMask(el, opts) {
	    _classCallCheck(this, InputMask);

	    this.el = el instanceof MaskElement ? el : el.isContentEditable && el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA' ? new HTMLContenteditableMaskElement(el) : new HTMLMaskElement(el);
	    this.masked = createMask(opts);
	    this._listeners = {};
	    this._value = '';
	    this._unmaskedValue = '';
	    this._saveSelection = this._saveSelection.bind(this);
	    this._onInput = this._onInput.bind(this);
	    this._onChange = this._onChange.bind(this);
	    this._onDrop = this._onDrop.bind(this);
	    this._onFocus = this._onFocus.bind(this);
	    this._onClick = this._onClick.bind(this);
	    this.alignCursor = this.alignCursor.bind(this);
	    this.alignCursorFriendly = this.alignCursorFriendly.bind(this);

	    this._bindEvents(); // refresh


	    this.updateValue();

	    this._onChange();
	  }
	  /** Read or update mask */


	  _createClass(InputMask, [{
	    key: "maskEquals",
	    value: function maskEquals(mask) {
	      return mask == null || mask === this.masked.mask || mask === Date && this.masked instanceof MaskedDate;
	    }
	  }, {
	    key: "_bindEvents",

	    /**
	      Starts listening to element events
	      @protected
	    */
	    value: function _bindEvents() {
	      this.el.bindEvents({
	        selectionChange: this._saveSelection,
	        input: this._onInput,
	        drop: this._onDrop,
	        click: this._onClick,
	        focus: this._onFocus,
	        commit: this._onChange
	      });
	    }
	    /**
	      Stops listening to element events
	      @protected
	     */

	  }, {
	    key: "_unbindEvents",
	    value: function _unbindEvents() {
	      if (this.el) this.el.unbindEvents();
	    }
	    /**
	      Fires custom event
	      @protected
	     */

	  }, {
	    key: "_fireEvent",
	    value: function _fireEvent(ev) {
	      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      var listeners = this._listeners[ev];
	      if (!listeners) return;
	      listeners.forEach(function (l) {
	        return l.apply(void 0, args);
	      });
	    }
	    /**
	      Current selection start
	      @readonly
	    */

	  }, {
	    key: "_saveSelection",

	    /**
	      Stores current selection
	      @protected
	    */
	    value: function _saveSelection()
	    /* ev */
	    {
	      if (this.value !== this.el.value) {
	        console.warn('Element value was changed outside of mask. Syncronize mask using `mask.updateValue()` to work properly.'); // eslint-disable-line no-console
	      }

	      this._selection = {
	        start: this.selectionStart,
	        end: this.cursorPos
	      };
	    }
	    /** Syncronizes model value from view */

	  }, {
	    key: "updateValue",
	    value: function updateValue() {
	      this.masked.value = this.el.value;
	      this._value = this.masked.value;
	    }
	    /** Syncronizes view from model value, fires change events */

	  }, {
	    key: "updateControl",
	    value: function updateControl() {
	      var newUnmaskedValue = this.masked.unmaskedValue;
	      var newValue = this.masked.value;
	      var isChanged = this.unmaskedValue !== newUnmaskedValue || this.value !== newValue;
	      this._unmaskedValue = newUnmaskedValue;
	      this._value = newValue;
	      if (this.el.value !== newValue) this.el.value = newValue;
	      if (isChanged) this._fireChangeEvents();
	    }
	    /** Updates options with deep equal check, recreates @{link Masked} model if mask type changes */

	  }, {
	    key: "updateOptions",
	    value: function updateOptions(opts) {
	      var mask = opts.mask,
	          restOpts = _objectWithoutProperties(opts, ["mask"]);

	      var updateMask = !this.maskEquals(mask);
	      var updateOpts = !objectIncludes(this.masked, restOpts);
	      if (updateMask) this.mask = mask;
	      if (updateOpts) this.masked.updateOptions(restOpts);
	      if (updateMask || updateOpts) this.updateControl();
	    }
	    /** Updates cursor */

	  }, {
	    key: "updateCursor",
	    value: function updateCursor(cursorPos) {
	      if (cursorPos == null) return;
	      this.cursorPos = cursorPos; // also queue change cursor for mobile browsers

	      this._delayUpdateCursor(cursorPos);
	    }
	    /**
	      Delays cursor update to support mobile browsers
	      @private
	    */

	  }, {
	    key: "_delayUpdateCursor",
	    value: function _delayUpdateCursor(cursorPos) {
	      var _this = this;

	      this._abortUpdateCursor();

	      this._changingCursorPos = cursorPos;
	      this._cursorChanging = setTimeout(function () {
	        if (!_this.el) return; // if was destroyed

	        _this.cursorPos = _this._changingCursorPos;

	        _this._abortUpdateCursor();
	      }, 10);
	    }
	    /**
	      Fires custom events
	      @protected
	    */

	  }, {
	    key: "_fireChangeEvents",
	    value: function _fireChangeEvents() {
	      this._fireEvent('accept', this._inputEvent);

	      if (this.masked.isComplete) this._fireEvent('complete', this._inputEvent);
	    }
	    /**
	      Aborts delayed cursor update
	      @private
	    */

	  }, {
	    key: "_abortUpdateCursor",
	    value: function _abortUpdateCursor() {
	      if (this._cursorChanging) {
	        clearTimeout(this._cursorChanging);
	        delete this._cursorChanging;
	      }
	    }
	    /** Aligns cursor to nearest available position */

	  }, {
	    key: "alignCursor",
	    value: function alignCursor() {
	      this.cursorPos = this.masked.nearestInputPos(this.cursorPos, DIRECTION.LEFT);
	    }
	    /** Aligns cursor only if selection is empty */

	  }, {
	    key: "alignCursorFriendly",
	    value: function alignCursorFriendly() {
	      if (this.selectionStart !== this.cursorPos) return; // skip if range is selected

	      this.alignCursor();
	    }
	    /** Adds listener on custom event */

	  }, {
	    key: "on",
	    value: function on(ev, handler) {
	      if (!this._listeners[ev]) this._listeners[ev] = [];

	      this._listeners[ev].push(handler);

	      return this;
	    }
	    /** Removes custom event listener */

	  }, {
	    key: "off",
	    value: function off(ev, handler) {
	      if (!this._listeners[ev]) return this;

	      if (!handler) {
	        delete this._listeners[ev];
	        return this;
	      }

	      var hIndex = this._listeners[ev].indexOf(handler);

	      if (hIndex >= 0) this._listeners[ev].splice(hIndex, 1);
	      return this;
	    }
	    /** Handles view input event */

	  }, {
	    key: "_onInput",
	    value: function _onInput(e) {
	      this._inputEvent = e;

	      this._abortUpdateCursor(); // fix strange IE behavior


	      if (!this._selection) return this.updateValue();
	      var details = new ActionDetails( // new state
	      this.el.value, this.cursorPos, // old state
	      this.value, this._selection);
	      var oldRawValue = this.masked.rawInputValue;
	      var offset = this.masked.splice(details.startChangePos, details.removed.length, details.inserted, details.removeDirection).offset; // force align in remove direction only if no input chars were removed
	      // otherwise we still need to align with NONE (to get out from fixed symbols for instance)

	      var removeDirection = oldRawValue === this.masked.rawInputValue ? details.removeDirection : DIRECTION.NONE;
	      var cursorPos = this.masked.nearestInputPos(details.startChangePos + offset, removeDirection);
	      this.updateControl();
	      this.updateCursor(cursorPos);
	      delete this._inputEvent;
	    }
	    /** Handles view change event and commits model value */

	  }, {
	    key: "_onChange",
	    value: function _onChange() {
	      if (this.value !== this.el.value) {
	        this.updateValue();
	      }

	      this.masked.doCommit();
	      this.updateControl();

	      this._saveSelection();
	    }
	    /** Handles view drop event, prevents by default */

	  }, {
	    key: "_onDrop",
	    value: function _onDrop(ev) {
	      ev.preventDefault();
	      ev.stopPropagation();
	    }
	    /** Restore last selection on focus */

	  }, {
	    key: "_onFocus",
	    value: function _onFocus(ev) {
	      this.alignCursorFriendly();
	    }
	    /** Restore last selection on focus */

	  }, {
	    key: "_onClick",
	    value: function _onClick(ev) {
	      this.alignCursorFriendly();
	    }
	    /** Unbind view events and removes element reference */

	  }, {
	    key: "destroy",
	    value: function destroy() {
	      this._unbindEvents(); // $FlowFixMe why not do so?


	      this._listeners.length = 0; // $FlowFixMe

	      delete this.el;
	    }
	  }, {
	    key: "mask",
	    get: function get() {
	      return this.masked.mask;
	    },
	    set: function set(mask) {
	      if (this.maskEquals(mask)) return;

	      if (!(mask instanceof IMask.Masked) && this.masked.constructor === maskedClass(mask)) {
	        this.masked.updateOptions({
	          mask: mask
	        });
	        return;
	      }

	      var masked = createMask({
	        mask: mask
	      });
	      masked.unmaskedValue = this.masked.unmaskedValue;
	      this.masked = masked;
	    }
	    /** Raw value */

	  }, {
	    key: "value",
	    get: function get() {
	      return this._value;
	    },
	    set: function set(str) {
	      this.masked.value = str;
	      this.updateControl();
	      this.alignCursor();
	    }
	    /** Unmasked value */

	  }, {
	    key: "unmaskedValue",
	    get: function get() {
	      return this._unmaskedValue;
	    },
	    set: function set(str) {
	      this.masked.unmaskedValue = str;
	      this.updateControl();
	      this.alignCursor();
	    }
	    /** Typed unmasked value */

	  }, {
	    key: "typedValue",
	    get: function get() {
	      return this.masked.typedValue;
	    },
	    set: function set(val) {
	      this.masked.typedValue = val;
	      this.updateControl();
	      this.alignCursor();
	    }
	  }, {
	    key: "selectionStart",
	    get: function get() {
	      return this._cursorChanging ? this._changingCursorPos : this.el.selectionStart;
	    }
	    /** Current cursor position */

	  }, {
	    key: "cursorPos",
	    get: function get() {
	      return this._cursorChanging ? this._changingCursorPos : this.el.selectionEnd;
	    },
	    set: function set(pos) {
	      if (!this.el || !this.el.isActive) return;
	      this.el.select(pos, pos);

	      this._saveSelection();
	    }
	  }]);

	  return InputMask;
	}();
	IMask.InputMask = InputMask;

	/** Pattern which validates enum values */

	var MaskedEnum =
	/*#__PURE__*/
	function (_MaskedPattern) {
	  _inherits(MaskedEnum, _MaskedPattern);

	  function MaskedEnum() {
	    _classCallCheck(this, MaskedEnum);

	    return _possibleConstructorReturn(this, _getPrototypeOf(MaskedEnum).apply(this, arguments));
	  }

	  _createClass(MaskedEnum, [{
	    key: "_update",

	    /**
	      @override
	      @param {Object} opts
	    */
	    value: function _update(opts) {
	      // TODO type
	      if (opts.enum) opts.mask = '*'.repeat(opts.enum[0].length);

	      _get(_getPrototypeOf(MaskedEnum.prototype), "_update", this).call(this, opts);
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "doValidate",
	    value: function doValidate() {
	      var _this = this,
	          _get2;

	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      return this.enum.some(function (e) {
	        return e.indexOf(_this.unmaskedValue) >= 0;
	      }) && (_get2 = _get(_getPrototypeOf(MaskedEnum.prototype), "doValidate", this)).call.apply(_get2, [this].concat(args));
	    }
	  }]);

	  return MaskedEnum;
	}(MaskedPattern);
	IMask.MaskedEnum = MaskedEnum;

	/**
	  Number mask
	  @param {Object} opts
	  @param {string} opts.radix - Single char
	  @param {string} opts.thousandsSeparator - Single char
	  @param {Array<string>} opts.mapToRadix - Array of single chars
	  @param {number} opts.min
	  @param {number} opts.max
	  @param {number} opts.scale - Digits after point
	  @param {boolean} opts.signed - Allow negative
	  @param {boolean} opts.normalizeZeros - Flag to remove leading and trailing zeros in the end of editing
	  @param {boolean} opts.padFractionalZeros - Flag to pad trailing zeros after point in the end of editing
	*/
	var MaskedNumber =
	/*#__PURE__*/
	function (_Masked) {
	  _inherits(MaskedNumber, _Masked);

	  /** Single char */

	  /** Single char */

	  /** Array of single chars */

	  /** */

	  /** */

	  /** Digits after point */

	  /** */

	  /** Flag to remove leading and trailing zeros in the end of editing */

	  /** Flag to pad trailing zeros after point in the end of editing */
	  function MaskedNumber(opts) {
	    _classCallCheck(this, MaskedNumber);

	    return _possibleConstructorReturn(this, _getPrototypeOf(MaskedNumber).call(this, Object.assign({}, MaskedNumber.DEFAULTS, {}, opts)));
	  }
	  /**
	    @override
	  */


	  _createClass(MaskedNumber, [{
	    key: "_update",
	    value: function _update(opts) {
	      _get(_getPrototypeOf(MaskedNumber.prototype), "_update", this).call(this, opts);

	      this._updateRegExps();
	    }
	    /** */

	  }, {
	    key: "_updateRegExps",
	    value: function _updateRegExps() {
	      // use different regexp to process user input (more strict, input suffix) and tail shifting
	      var start = '^' + (this.allowNegative ? '[+|\\-]?' : '');
	      var midInput = '(0|([1-9]+\\d*))?';
	      var mid = '\\d*';
	      var end = (this.scale ? '(' + escapeRegExp(this.radix) + '\\d{0,' + this.scale + '})?' : '') + '$';
	      this._numberRegExpInput = new RegExp(start + midInput + end);
	      this._numberRegExp = new RegExp(start + mid + end);
	      this._mapToRadixRegExp = new RegExp('[' + this.mapToRadix.map(escapeRegExp).join('') + ']', 'g');
	      this._thousandsSeparatorRegExp = new RegExp(escapeRegExp(this.thousandsSeparator), 'g');
	    }
	    /** */

	  }, {
	    key: "_removeThousandsSeparators",
	    value: function _removeThousandsSeparators(value) {
	      return value.replace(this._thousandsSeparatorRegExp, '');
	    }
	    /** */

	  }, {
	    key: "_insertThousandsSeparators",
	    value: function _insertThousandsSeparators(value) {
	      // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
	      var parts = value.split(this.radix);
	      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, this.thousandsSeparator);
	      return parts.join(this.radix);
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "doPrepare",
	    value: function doPrepare(str) {
	      var _get2;

	      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      return (_get2 = _get(_getPrototypeOf(MaskedNumber.prototype), "doPrepare", this)).call.apply(_get2, [this, this._removeThousandsSeparators(str.replace(this._mapToRadixRegExp, this.radix))].concat(args));
	    }
	    /** */

	  }, {
	    key: "_separatorsCount",
	    value: function _separatorsCount(to) {
	      var extendOnSeparators = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	      var count = 0;

	      for (var pos = 0; pos < to; ++pos) {
	        if (this._value.indexOf(this.thousandsSeparator, pos) === pos) {
	          ++count;
	          if (extendOnSeparators) to += this.thousandsSeparator.length;
	        }
	      }

	      return count;
	    }
	    /** */

	  }, {
	    key: "_separatorsCountFromSlice",
	    value: function _separatorsCountFromSlice() {
	      var slice = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._value;
	      return this._separatorsCount(this._removeThousandsSeparators(slice).length, true);
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "extractInput",
	    value: function extractInput() {
	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	      var flags = arguments.length > 2 ? arguments[2] : undefined;

	      var _this$_adjustRangeWit = this._adjustRangeWithSeparators(fromPos, toPos);

	      var _this$_adjustRangeWit2 = _slicedToArray(_this$_adjustRangeWit, 2);

	      fromPos = _this$_adjustRangeWit2[0];
	      toPos = _this$_adjustRangeWit2[1];
	      return this._removeThousandsSeparators(_get(_getPrototypeOf(MaskedNumber.prototype), "extractInput", this).call(this, fromPos, toPos, flags));
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "_appendCharRaw",
	    value: function _appendCharRaw(ch) {
	      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      if (!this.thousandsSeparator) return _get(_getPrototypeOf(MaskedNumber.prototype), "_appendCharRaw", this).call(this, ch, flags);
	      var prevBeforeTailValue = flags.tail && flags._beforeTailState ? flags._beforeTailState._value : this._value;

	      var prevBeforeTailSeparatorsCount = this._separatorsCountFromSlice(prevBeforeTailValue);

	      this._value = this._removeThousandsSeparators(this.value);

	      var appendDetails = _get(_getPrototypeOf(MaskedNumber.prototype), "_appendCharRaw", this).call(this, ch, flags);

	      this._value = this._insertThousandsSeparators(this._value);
	      var beforeTailValue = flags.tail && flags._beforeTailState ? flags._beforeTailState._value : this._value;

	      var beforeTailSeparatorsCount = this._separatorsCountFromSlice(beforeTailValue);

	      appendDetails.tailShift += (beforeTailSeparatorsCount - prevBeforeTailSeparatorsCount) * this.thousandsSeparator.length;
	      appendDetails.skip = !appendDetails.rawInserted && ch === this.thousandsSeparator;
	      return appendDetails;
	    }
	    /** */

	  }, {
	    key: "_findSeparatorAround",
	    value: function _findSeparatorAround(pos) {
	      if (this.thousandsSeparator) {
	        var searchFrom = pos - this.thousandsSeparator.length + 1;
	        var separatorPos = this.value.indexOf(this.thousandsSeparator, searchFrom);
	        if (separatorPos <= pos) return separatorPos;
	      }

	      return -1;
	    }
	  }, {
	    key: "_adjustRangeWithSeparators",
	    value: function _adjustRangeWithSeparators(from, to) {
	      var separatorAroundFromPos = this._findSeparatorAround(from);

	      if (separatorAroundFromPos >= 0) from = separatorAroundFromPos;

	      var separatorAroundToPos = this._findSeparatorAround(to);

	      if (separatorAroundToPos >= 0) to = separatorAroundToPos + this.thousandsSeparator.length;
	      return [from, to];
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "remove",
	    value: function remove() {
	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;

	      var _this$_adjustRangeWit3 = this._adjustRangeWithSeparators(fromPos, toPos);

	      var _this$_adjustRangeWit4 = _slicedToArray(_this$_adjustRangeWit3, 2);

	      fromPos = _this$_adjustRangeWit4[0];
	      toPos = _this$_adjustRangeWit4[1];
	      var valueBeforePos = this.value.slice(0, fromPos);
	      var valueAfterPos = this.value.slice(toPos);

	      var prevBeforeTailSeparatorsCount = this._separatorsCount(valueBeforePos.length);

	      this._value = this._insertThousandsSeparators(this._removeThousandsSeparators(valueBeforePos + valueAfterPos));

	      var beforeTailSeparatorsCount = this._separatorsCountFromSlice(valueBeforePos);

	      return new ChangeDetails({
	        tailShift: (beforeTailSeparatorsCount - prevBeforeTailSeparatorsCount) * this.thousandsSeparator.length
	      });
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "nearestInputPos",
	    value: function nearestInputPos(cursorPos, direction) {
	      if (!this.thousandsSeparator) return cursorPos;

	      switch (direction) {
	        case DIRECTION.NONE:
	        case DIRECTION.LEFT:
	        case DIRECTION.FORCE_LEFT:
	          {
	            var separatorAtLeftPos = this._findSeparatorAround(cursorPos - 1);

	            if (separatorAtLeftPos >= 0) {
	              var separatorAtLeftEndPos = separatorAtLeftPos + this.thousandsSeparator.length;

	              if (cursorPos < separatorAtLeftEndPos || this.value.length <= separatorAtLeftEndPos || direction === DIRECTION.FORCE_LEFT) {
	                return separatorAtLeftPos;
	              }
	            }

	            break;
	          }

	        case DIRECTION.RIGHT:
	        case DIRECTION.FORCE_RIGHT:
	          {
	            var separatorAtRightPos = this._findSeparatorAround(cursorPos);

	            if (separatorAtRightPos >= 0) {
	              return separatorAtRightPos + this.thousandsSeparator.length;
	            }
	          }
	      }

	      return cursorPos;
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "doValidate",
	    value: function doValidate(flags) {
	      var regexp = flags.input ? this._numberRegExpInput : this._numberRegExp; // validate as string

	      var valid = regexp.test(this._removeThousandsSeparators(this.value));

	      if (valid) {
	        // validate as number
	        var number = this.number;
	        valid = valid && !isNaN(number) && ( // check min bound for negative values
	        this.min == null || this.min >= 0 || this.min <= this.number) && ( // check max bound for positive values
	        this.max == null || this.max <= 0 || this.number <= this.max);
	      }

	      return valid && _get(_getPrototypeOf(MaskedNumber.prototype), "doValidate", this).call(this, flags);
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "doCommit",
	    value: function doCommit() {
	      if (this.value) {
	        var number = this.number;
	        var validnum = number; // check bounds

	        if (this.min != null) validnum = Math.max(validnum, this.min);
	        if (this.max != null) validnum = Math.min(validnum, this.max);
	        if (validnum !== number) this.unmaskedValue = String(validnum);
	        var formatted = this.value;
	        if (this.normalizeZeros) formatted = this._normalizeZeros(formatted);
	        if (this.padFractionalZeros) formatted = this._padFractionalZeros(formatted);
	        this._value = formatted;
	      }

	      _get(_getPrototypeOf(MaskedNumber.prototype), "doCommit", this).call(this);
	    }
	    /** */

	  }, {
	    key: "_normalizeZeros",
	    value: function _normalizeZeros(value) {
	      var parts = this._removeThousandsSeparators(value).split(this.radix); // remove leading zeros


	      parts[0] = parts[0].replace(/^(\D*)(0*)(\d*)/, function (match, sign, zeros, num) {
	        return sign + num;
	      }); // add leading zero

	      if (value.length && !/\d$/.test(parts[0])) parts[0] = parts[0] + '0';

	      if (parts.length > 1) {
	        parts[1] = parts[1].replace(/0*$/, ''); // remove trailing zeros

	        if (!parts[1].length) parts.length = 1; // remove fractional
	      }

	      return this._insertThousandsSeparators(parts.join(this.radix));
	    }
	    /** */

	  }, {
	    key: "_padFractionalZeros",
	    value: function _padFractionalZeros(value) {
	      if (!value) return value;
	      var parts = value.split(this.radix);
	      if (parts.length < 2) parts.push('');
	      parts[1] = parts[1].padEnd(this.scale, '0');
	      return parts.join(this.radix);
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "unmaskedValue",
	    get: function get() {
	      return this._removeThousandsSeparators(this._normalizeZeros(this.value)).replace(this.radix, '.');
	    },
	    set: function set(unmaskedValue) {
	      _set(_getPrototypeOf(MaskedNumber.prototype), "unmaskedValue", unmaskedValue.replace('.', this.radix), this, true);
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "typedValue",
	    get: function get() {
	      return Number(this.unmaskedValue);
	    },
	    set: function set(n) {
	      _set(_getPrototypeOf(MaskedNumber.prototype), "unmaskedValue", String(n), this, true);
	    }
	    /** Parsed Number */

	  }, {
	    key: "number",
	    get: function get() {
	      return this.typedValue;
	    },
	    set: function set(number) {
	      this.typedValue = number;
	    }
	    /**
	      Is negative allowed
	      @readonly
	    */

	  }, {
	    key: "allowNegative",
	    get: function get() {
	      return this.signed || this.min != null && this.min < 0 || this.max != null && this.max < 0;
	    }
	  }]);

	  return MaskedNumber;
	}(Masked);
	MaskedNumber.DEFAULTS = {
	  radix: ',',
	  thousandsSeparator: '',
	  mapToRadix: ['.'],
	  scale: 2,
	  signed: false,
	  normalizeZeros: true,
	  padFractionalZeros: false
	};
	IMask.MaskedNumber = MaskedNumber;

	/** Masking by custom Function */

	var MaskedFunction =
	/*#__PURE__*/
	function (_Masked) {
	  _inherits(MaskedFunction, _Masked);

	  function MaskedFunction() {
	    _classCallCheck(this, MaskedFunction);

	    return _possibleConstructorReturn(this, _getPrototypeOf(MaskedFunction).apply(this, arguments));
	  }

	  _createClass(MaskedFunction, [{
	    key: "_update",

	    /**
	      @override
	      @param {Object} opts
	    */
	    value: function _update(opts) {
	      if (opts.mask) opts.validate = opts.mask;

	      _get(_getPrototypeOf(MaskedFunction.prototype), "_update", this).call(this, opts);
	    }
	  }]);

	  return MaskedFunction;
	}(Masked);
	IMask.MaskedFunction = MaskedFunction;

	/** Dynamic mask for choosing apropriate mask in run-time */
	var MaskedDynamic =
	/*#__PURE__*/
	function (_Masked) {
	  _inherits(MaskedDynamic, _Masked);

	  /** Currently chosen mask */

	  /** Compliled {@link Masked} options */

	  /** Chooses {@link Masked} depending on input value */

	  /**
	    @param {Object} opts
	  */
	  function MaskedDynamic(opts) {
	    var _this;

	    _classCallCheck(this, MaskedDynamic);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(MaskedDynamic).call(this, Object.assign({}, MaskedDynamic.DEFAULTS, {}, opts)));
	    _this.currentMask = null;
	    return _this;
	  }
	  /**
	    @override
	  */


	  _createClass(MaskedDynamic, [{
	    key: "_update",
	    value: function _update(opts) {
	      _get(_getPrototypeOf(MaskedDynamic.prototype), "_update", this).call(this, opts);

	      if ('mask' in opts) {
	        // mask could be totally dynamic with only `dispatch` option
	        this.compiledMasks = Array.isArray(opts.mask) ? opts.mask.map(function (m) {
	          return createMask(m);
	        }) : [];
	      }
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "_appendCharRaw",
	    value: function _appendCharRaw() {
	      var details = this._applyDispatch.apply(this, arguments);

	      if (this.currentMask) {
	        var _this$currentMask;

	        details.aggregate((_this$currentMask = this.currentMask)._appendChar.apply(_this$currentMask, arguments));
	      }

	      return details;
	    }
	  }, {
	    key: "_applyDispatch",
	    value: function _applyDispatch() {
	      var appended = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      var prevValueBeforeTail = flags.tail && flags._beforeTailState != null ? flags._beforeTailState._value : this.value;
	      var inputValue = this.rawInputValue;
	      var insertValue = flags.tail && flags._beforeTailState != null ? // $FlowFixMe - tired to fight with type system
	      flags._beforeTailState._rawInputValue : inputValue;
	      var tailValue = inputValue.slice(insertValue.length);
	      var prevMask = this.currentMask;
	      var details = new ChangeDetails();
	      var prevMaskState = prevMask && prevMask.state; // clone flags to prevent overwriting `_beforeTailState`

	      this.currentMask = this.doDispatch(appended, Object.assign({}, flags)); // restore state after dispatch

	      if (this.currentMask) {
	        if (this.currentMask !== prevMask) {
	          // if mask changed reapply input
	          this.currentMask.reset(); // $FlowFixMe - it's ok, we don't change current mask above

	          var d = this.currentMask.append(insertValue, {
	            raw: true
	          });
	          details.tailShift = d.inserted.length - prevValueBeforeTail.length;

	          if (tailValue) {
	            // $FlowFixMe - it's ok, we don't change current mask above
	            details.tailShift += this.currentMask.append(tailValue, {
	              raw: true,
	              tail: true
	            }).tailShift;
	          }
	        } else {
	          // Dispatch can do something bad with state, so
	          // restore prev mask state
	          this.currentMask.state = prevMaskState;
	        }
	      }

	      return details;
	    }
	  }, {
	    key: "_appendPlaceholder",
	    value: function _appendPlaceholder() {
	      var details = this._applyDispatch.apply(this, arguments);

	      if (this.currentMask) {
	        details.aggregate(this.currentMask._appendPlaceholder());
	      }

	      return details;
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "doDispatch",
	    value: function doDispatch(appended) {
	      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      return this.dispatch(appended, this, flags);
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "doValidate",
	    value: function doValidate() {
	      var _get2, _this$currentMask2;

	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      return (_get2 = _get(_getPrototypeOf(MaskedDynamic.prototype), "doValidate", this)).call.apply(_get2, [this].concat(args)) && (!this.currentMask || (_this$currentMask2 = this.currentMask).doValidate.apply(_this$currentMask2, args));
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "reset",
	    value: function reset() {
	      if (this.currentMask) this.currentMask.reset();
	      this.compiledMasks.forEach(function (m) {
	        return m.reset();
	      });
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "remove",

	    /**
	      @override
	    */
	    value: function remove() {
	      var details = new ChangeDetails();

	      if (this.currentMask) {
	        var _this$currentMask3;

	        details.aggregate((_this$currentMask3 = this.currentMask).remove.apply(_this$currentMask3, arguments)) // update with dispatch
	        .aggregate(this._applyDispatch());
	      }

	      return details;
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "extractInput",

	    /**
	      @override
	    */
	    value: function extractInput() {
	      var _this$currentMask4;

	      return this.currentMask ? (_this$currentMask4 = this.currentMask).extractInput.apply(_this$currentMask4, arguments) : '';
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "extractTail",
	    value: function extractTail() {
	      var _this$currentMask5, _get3;

	      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }

	      return this.currentMask ? (_this$currentMask5 = this.currentMask).extractTail.apply(_this$currentMask5, args) : (_get3 = _get(_getPrototypeOf(MaskedDynamic.prototype), "extractTail", this)).call.apply(_get3, [this].concat(args));
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "doCommit",
	    value: function doCommit() {
	      if (this.currentMask) this.currentMask.doCommit();

	      _get(_getPrototypeOf(MaskedDynamic.prototype), "doCommit", this).call(this);
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "nearestInputPos",
	    value: function nearestInputPos() {
	      var _this$currentMask6, _get4;

	      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	        args[_key3] = arguments[_key3];
	      }

	      return this.currentMask ? (_this$currentMask6 = this.currentMask).nearestInputPos.apply(_this$currentMask6, args) : (_get4 = _get(_getPrototypeOf(MaskedDynamic.prototype), "nearestInputPos", this)).call.apply(_get4, [this].concat(args));
	    }
	  }, {
	    key: "value",
	    get: function get() {
	      return this.currentMask ? this.currentMask.value : '';
	    },
	    set: function set(value) {
	      _set(_getPrototypeOf(MaskedDynamic.prototype), "value", value, this, true);
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "unmaskedValue",
	    get: function get() {
	      return this.currentMask ? this.currentMask.unmaskedValue : '';
	    },
	    set: function set(unmaskedValue) {
	      _set(_getPrototypeOf(MaskedDynamic.prototype), "unmaskedValue", unmaskedValue, this, true);
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "typedValue",
	    get: function get() {
	      return this.currentMask ? this.currentMask.typedValue : '';
	    } // probably typedValue should not be used with dynamic
	    ,
	    set: function set(value) {
	      var unmaskedValue = String(value); // double check it

	      if (this.currentMask) {
	        this.currentMask.typedValue = value;
	        unmaskedValue = this.currentMask.unmaskedValue;
	      }

	      this.unmaskedValue = unmaskedValue;
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "isComplete",
	    get: function get() {
	      return !!this.currentMask && this.currentMask.isComplete;
	    }
	  }, {
	    key: "state",
	    get: function get() {
	      return Object.assign({}, _get(_getPrototypeOf(MaskedDynamic.prototype), "state", this), {
	        _rawInputValue: this.rawInputValue,
	        compiledMasks: this.compiledMasks.map(function (m) {
	          return m.state;
	        }),
	        currentMaskRef: this.currentMask,
	        currentMask: this.currentMask && this.currentMask.state
	      });
	    },
	    set: function set(state) {
	      var compiledMasks = state.compiledMasks,
	          currentMaskRef = state.currentMaskRef,
	          currentMask = state.currentMask,
	          maskedState = _objectWithoutProperties(state, ["compiledMasks", "currentMaskRef", "currentMask"]);

	      this.compiledMasks.forEach(function (m, mi) {
	        return m.state = compiledMasks[mi];
	      });

	      if (currentMaskRef != null) {
	        this.currentMask = currentMaskRef;
	        this.currentMask.state = currentMask;
	      }

	      _set(_getPrototypeOf(MaskedDynamic.prototype), "state", maskedState, this, true);
	    }
	  }, {
	    key: "overwrite",
	    get: function get() {
	      return this.currentMask ? this.currentMask.overwrite : _get(_getPrototypeOf(MaskedDynamic.prototype), "overwrite", this);
	    },
	    set: function set(overwrite) {
	      console.warn('"overwrite" option is not available in dynamic mask, use this option in siblings');
	    }
	  }]);

	  return MaskedDynamic;
	}(Masked);
	MaskedDynamic.DEFAULTS = {
	  dispatch: function dispatch(appended, masked, flags) {
	    if (!masked.compiledMasks.length) return;
	    var inputValue = masked.rawInputValue; // simulate input

	    var inputs = masked.compiledMasks.map(function (m, index) {
	      m.reset();
	      m.append(inputValue, {
	        raw: true
	      });
	      m.append(appended, flags);
	      var weight = m.rawInputValue.length;
	      return {
	        weight: weight,
	        index: index
	      };
	    }); // pop masks with longer values first

	    inputs.sort(function (i1, i2) {
	      return i2.weight - i1.weight;
	    });
	    return masked.compiledMasks[inputs[0].index];
	  }
	};
	IMask.MaskedDynamic = MaskedDynamic;

	/** Mask pipe source and destination types */

	var PIPE_TYPE = {
	  MASKED: 'value',
	  UNMASKED: 'unmaskedValue',
	  TYPED: 'typedValue'
	};
	/** Creates new pipe function depending on mask type, source and destination options */

	function createPipe(mask) {
	  var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : PIPE_TYPE.MASKED;
	  var to = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : PIPE_TYPE.MASKED;
	  var masked = createMask(mask);
	  return function (value) {
	    return masked.runIsolated(function (m) {
	      m[from] = value;
	      return m[to];
	    });
	  };
	}
	/** Pipes value through mask depending on mask type, source and destination options */

	function pipe(value) {
	  for (var _len = arguments.length, pipeArgs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    pipeArgs[_key - 1] = arguments[_key];
	  }

	  return createPipe.apply(void 0, pipeArgs)(value);
	}
	IMask.PIPE_TYPE = PIPE_TYPE;
	IMask.createPipe = createPipe;
	IMask.pipe = pipe;

	try {
	  globalThis.IMask = IMask;
	} catch (e) {}

	exports.HTMLContenteditableMaskElement = HTMLContenteditableMaskElement;
	exports.HTMLMaskElement = HTMLMaskElement;
	exports.InputMask = InputMask;
	exports.MaskElement = MaskElement;
	exports.Masked = Masked;
	exports.MaskedDate = MaskedDate;
	exports.MaskedDynamic = MaskedDynamic;
	exports.MaskedEnum = MaskedEnum;
	exports.MaskedFunction = MaskedFunction;
	exports.MaskedNumber = MaskedNumber;
	exports.MaskedPattern = MaskedPattern;
	exports.MaskedRange = MaskedRange;
	exports.MaskedRegExp = MaskedRegExp;
	exports.PIPE_TYPE = PIPE_TYPE;
	exports.createMask = createMask;
	exports.createPipe = createPipe;
	exports.default = IMask;
	exports.pipe = pipe;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
var tns=function(){Object.keys||(Object.keys=function(t){var e=[];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.push(n);return e}),"remove"in Element.prototype||(Element.prototype.remove=function(){this.parentNode&&this.parentNode.removeChild(this)});var t=window,Oi=t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||t.msRequestAnimationFrame||function(t){return setTimeout(t,16)},e=window,Di=e.cancelAnimationFrame||e.mozCancelAnimationFrame||function(t){clearTimeout(t)};function Hi(){for(var t,e,n,i=arguments[0]||{},a=1,r=arguments.length;a<r;a++)if(null!==(t=arguments[a]))for(e in t)i!==(n=t[e])&&void 0!==n&&(i[e]=n);return i}function ki(t){return 0<=["true","false"].indexOf(t)?JSON.parse(t):t}function Ri(t,e,n,i){if(i)try{t.setItem(e,n)}catch(t){}return n}function Ii(){var t=document,e=t.body;return e||((e=t.createElement("body")).fake=!0),e}var n=document.documentElement;function Pi(t){var e="";return t.fake&&(e=n.style.overflow,t.style.background="",t.style.overflow=n.style.overflow="hidden",n.appendChild(t)),e}function zi(t,e){t.fake&&(t.remove(),n.style.overflow=e,n.offsetHeight)}function Wi(t,e,n,i){"insertRule"in t?t.insertRule(e+"{"+n+"}",i):t.addRule(e,n,i)}function Fi(t){return("insertRule"in t?t.cssRules:t.rules).length}function qi(t,e,n){for(var i=0,a=t.length;i<a;i++)e.call(n,t[i],i)}var i="classList"in document.createElement("_"),ji=i?function(t,e){return t.classList.contains(e)}:function(t,e){return 0<=t.className.indexOf(e)},Vi=i?function(t,e){ji(t,e)||t.classList.add(e)}:function(t,e){ji(t,e)||(t.className+=" "+e)},Gi=i?function(t,e){ji(t,e)&&t.classList.remove(e)}:function(t,e){ji(t,e)&&(t.className=t.className.replace(e,""))};function Qi(t,e){return t.hasAttribute(e)}function Xi(t,e){return t.getAttribute(e)}function r(t){return void 0!==t.item}function Yi(t,e){if(t=r(t)||t instanceof Array?t:[t],"[object Object]"===Object.prototype.toString.call(e))for(var n=t.length;n--;)for(var i in e)t[n].setAttribute(i,e[i])}function Ki(t,e){t=r(t)||t instanceof Array?t:[t];for(var n=(e=e instanceof Array?e:[e]).length,i=t.length;i--;)for(var a=n;a--;)t[i].removeAttribute(e[a])}function Ji(t){for(var e=[],n=0,i=t.length;n<i;n++)e.push(t[n]);return e}function Ui(t,e){"none"!==t.style.display&&(t.style.display="none")}function _i(t,e){"none"===t.style.display&&(t.style.display="")}function Zi(t){return"none"!==window.getComputedStyle(t).display}function $i(e){if("string"==typeof e){var n=[e],i=e.charAt(0).toUpperCase()+e.substr(1);["Webkit","Moz","ms","O"].forEach(function(t){"ms"===t&&"transform"!==e||n.push(t+i)}),e=n}for(var t=document.createElement("fakeelement"),a=(e.length,0);a<e.length;a++){var r=e[a];if(void 0!==t.style[r])return r}return!1}function ta(t,e){var n=!1;return/^Webkit/.test(t)?n="webkit"+e+"End":/^O/.test(t)?n="o"+e+"End":t&&(n=e.toLowerCase()+"end"),n}var a=!1;try{var o=Object.defineProperty({},"passive",{get:function(){a=!0}});window.addEventListener("test",null,o)}catch(t){}var u=!!a&&{passive:!0};function ea(t,e,n){for(var i in e){var a=0<=["touchstart","touchmove"].indexOf(i)&&!n&&u;t.addEventListener(i,e[i],a)}}function na(t,e){for(var n in e){var i=0<=["touchstart","touchmove"].indexOf(n)&&u;t.removeEventListener(n,e[n],i)}}function ia(){return{topics:{},on:function(t,e){this.topics[t]=this.topics[t]||[],this.topics[t].push(e)},off:function(t,e){if(this.topics[t])for(var n=0;n<this.topics[t].length;n++)if(this.topics[t][n]===e){this.topics[t].splice(n,1);break}},emit:function(e,n){n.type=e,this.topics[e]&&this.topics[e].forEach(function(t){t(n,e)})}}}var aa=function(O){O=Hi({container:".slider",mode:"carousel",axis:"horizontal",items:1,gutter:0,edgePadding:0,fixedWidth:!1,autoWidth:!1,viewportMax:!1,slideBy:1,center:!1,controls:!0,controlsPosition:"top",controlsText:["prev","next"],controlsContainer:!1,prevButton:!1,nextButton:!1,nav:!0,navPosition:"top",navContainer:!1,navAsThumbnails:!1,arrowKeys:!1,speed:300,autoplay:!1,autoplayPosition:"top",autoplayTimeout:5e3,autoplayDirection:"forward",autoplayText:["start","stop"],autoplayHoverPause:!1,autoplayButton:!1,autoplayButtonOutput:!0,autoplayResetOnVisibility:!0,animateIn:"tns-fadeIn",animateOut:"tns-fadeOut",animateNormal:"tns-normal",animateDelay:!1,loop:!0,rewind:!1,autoHeight:!1,responsive:!1,lazyload:!1,lazyloadSelector:".tns-lazy-img",touch:!0,mouseDrag:!1,swipeAngle:15,nested:!1,preventActionWhenRunning:!1,preventScrollOnTouch:!1,freezable:!0,onInit:!1,useLocalStorage:!0},O||{});var D=document,h=window,a={ENTER:13,SPACE:32,LEFT:37,RIGHT:39},e={},n=O.useLocalStorage;if(n){var t=navigator.userAgent,i=new Date;try{(e=h.localStorage)?(e.setItem(i,i),n=e.getItem(i)==i,e.removeItem(i)):n=!1,n||(e={})}catch(t){n=!1}n&&(e.tnsApp&&e.tnsApp!==t&&["tC","tPL","tMQ","tTf","t3D","tTDu","tTDe","tADu","tADe","tTE","tAE"].forEach(function(t){e.removeItem(t)}),localStorage.tnsApp=t)}var r,o,u,l,s,c,f,y=e.tC?ki(e.tC):Ri(e,"tC",function(){var t=document,e=Ii(),n=Pi(e),i=t.createElement("div"),a=!1;e.appendChild(i);try{for(var r,o="(10px * 10)",u=["calc"+o,"-moz-calc"+o,"-webkit-calc"+o],l=0;l<3;l++)if(r=u[l],i.style.width=r,100===i.offsetWidth){a=r.replace(o,"");break}}catch(t){}return e.fake?zi(e,n):i.remove(),a}(),n),g=e.tPL?ki(e.tPL):Ri(e,"tPL",function(){var t,e=document,n=Ii(),i=Pi(n),a=e.createElement("div"),r=e.createElement("div"),o="";a.className="tns-t-subp2",r.className="tns-t-ct";for(var u=0;u<70;u++)o+="<div></div>";return r.innerHTML=o,a.appendChild(r),n.appendChild(a),t=Math.abs(a.getBoundingClientRect().left-r.children[67].getBoundingClientRect().left)<2,n.fake?zi(n,i):a.remove(),t}(),n),H=e.tMQ?ki(e.tMQ):Ri(e,"tMQ",(o=document,u=Ii(),l=Pi(u),s=o.createElement("div"),c=o.createElement("style"),f="@media all and (min-width:1px){.tns-mq-test{position:absolute}}",c.type="text/css",s.className="tns-mq-test",u.appendChild(c),u.appendChild(s),c.styleSheet?c.styleSheet.cssText=f:c.appendChild(o.createTextNode(f)),r=window.getComputedStyle?window.getComputedStyle(s).position:s.currentStyle.position,u.fake?zi(u,l):s.remove(),"absolute"===r),n),d=e.tTf?ki(e.tTf):Ri(e,"tTf",$i("transform"),n),v=e.t3D?ki(e.t3D):Ri(e,"t3D",function(t){if(!t)return!1;if(!window.getComputedStyle)return!1;var e,n=document,i=Ii(),a=Pi(i),r=n.createElement("p"),o=9<t.length?"-"+t.slice(0,-9).toLowerCase()+"-":"";return o+="transform",i.insertBefore(r,null),r.style[t]="translate3d(1px,1px,1px)",e=window.getComputedStyle(r).getPropertyValue(o),i.fake?zi(i,a):r.remove(),void 0!==e&&0<e.length&&"none"!==e}(d),n),x=e.tTDu?ki(e.tTDu):Ri(e,"tTDu",$i("transitionDuration"),n),p=e.tTDe?ki(e.tTDe):Ri(e,"tTDe",$i("transitionDelay"),n),b=e.tADu?ki(e.tADu):Ri(e,"tADu",$i("animationDuration"),n),m=e.tADe?ki(e.tADe):Ri(e,"tADe",$i("animationDelay"),n),C=e.tTE?ki(e.tTE):Ri(e,"tTE",ta(x,"Transition"),n),w=e.tAE?ki(e.tAE):Ri(e,"tAE",ta(b,"Animation"),n),M=h.console&&"function"==typeof h.console.warn,T=["container","controlsContainer","prevButton","nextButton","navContainer","autoplayButton"],E={};if(T.forEach(function(t){if("string"==typeof O[t]){var e=O[t],n=D.querySelector(e);if(E[t]=e,!n||!n.nodeName)return void(M&&console.warn("Can't find",O[t]));O[t]=n}}),!(O.container.children.length<1)){var k=O.responsive,R=O.nested,I="carousel"===O.mode;if(k){0 in k&&(O=Hi(O,k[0]),delete k[0]);var A={};for(var N in k){var L=k[N];L="number"==typeof L?{items:L}:L,A[N]=L}k=A,A=null}if(I||function t(e){for(var n in e)I||("slideBy"===n&&(e[n]="page"),"edgePadding"===n&&(e[n]=!1),"autoHeight"===n&&(e[n]=!1)),"responsive"===n&&t(e[n])}(O),!I){O.axis="horizontal",O.slideBy="page",O.edgePadding=!1;var P=O.animateIn,z=O.animateOut,B=O.animateDelay,W=O.animateNormal}var S,F,q="horizontal"===O.axis,j=D.createElement("div"),V=D.createElement("div"),G=O.container,Q=G.parentNode,X=G.outerHTML,Y=G.children,K=Y.length,J=sn(),U=!1;k&&Bn(),I&&(G.className+=" tns-vpfix");var _,Z,$,tt,et,nt,it,at,rt=O.autoWidth,ot=vn("fixedWidth"),ut=vn("edgePadding"),lt=vn("gutter"),st=fn(),ct=vn("center"),ft=rt?1:Math.floor(vn("items")),dt=vn("slideBy"),vt=O.viewportMax||O.fixedWidthViewportWidth,pt=vn("arrowKeys"),mt=vn("speed"),ht=O.rewind,yt=!ht&&O.loop,gt=vn("autoHeight"),xt=vn("controls"),bt=vn("controlsText"),Ct=vn("nav"),wt=vn("touch"),Mt=vn("mouseDrag"),Tt=vn("autoplay"),Et=vn("autoplayTimeout"),At=vn("autoplayText"),Nt=vn("autoplayHoverPause"),Lt=vn("autoplayResetOnVisibility"),Bt=(at=document.createElement("style"),it&&at.setAttribute("media",it),document.querySelector("head").appendChild(at),at.sheet?at.sheet:at.styleSheet),St=O.lazyload,Ot=(O.lazyloadSelector,[]),Dt=yt?(et=function(){{if(rt||ot&&!vt)return K-1;var t=ot?"fixedWidth":"items",e=[];if((ot||O[t]<K)&&e.push(O[t]),k)for(var n in k){var i=k[n][t];i&&(ot||i<K)&&e.push(i)}return e.length||e.push(0),Math.ceil(ot?vt/Math.min.apply(null,e):Math.max.apply(null,e))}}(),nt=I?Math.ceil((5*et-K)/2):4*et-K,nt=Math.max(et,nt),dn("edgePadding")?nt+1:nt):0,Ht=I?K+2*Dt:K+Dt,kt=!(!ot&&!rt||yt),Rt=ot?ni():null,It=!I||!yt,Pt=q?"left":"top",zt="",Wt="",Ft=ot?function(){return ct&&!yt?K-1:Math.ceil(-Rt/(ot+lt))}:rt?function(){for(var t=Ht;t--;)if(_[t]>=-Rt)return t}:function(){return ct&&I&&!yt?K-1:yt||I?Math.max(0,Ht-Math.ceil(ft)):Ht-1},qt=on(vn("startIndex")),jt=qt,Vt=(rn(),0),Gt=rt?null:Ft(),Qt=O.preventActionWhenRunning,Xt=O.swipeAngle,Yt=!Xt||"?",Kt=!1,Jt=O.onInit,Ut=new ia,_t=" tns-slider tns-"+O.mode,Zt=G.id||(tt=window.tnsId,window.tnsId=tt?tt+1:1,"tns"+window.tnsId),$t=vn("disable"),te=!1,ee=O.freezable,ne=!(!ee||rt)&&Ln(),ie=!1,ae={click:fi,keydown:function(t){t=xi(t);var e=[a.LEFT,a.RIGHT].indexOf(t.keyCode);0<=e&&(0===e?Ee.disabled||fi(t,-1):Ae.disabled||fi(t,1))}},re={click:function(t){if(Kt){if(Qt)return;si()}var e=bi(t=xi(t));for(;e!==Se&&!Qi(e,"data-nav");)e=e.parentNode;if(Qi(e,"data-nav")){var n=ke=Number(Xi(e,"data-nav")),i=ot||rt?n*K/De:n*ft,a=ve?n:Math.min(Math.ceil(i),K-1);ci(a,t),Re===n&&(qe&&hi(),ke=-1)}},keydown:function(t){t=xi(t);var e=D.activeElement;if(!Qi(e,"data-nav"))return;var n=[a.LEFT,a.RIGHT,a.ENTER,a.SPACE].indexOf(t.keyCode),i=Number(Xi(e,"data-nav"));0<=n&&(0===n?0<i&&gi(Be[i-1]):1===n?i<De-1&&gi(Be[i+1]):ci(ke=i,t))}},oe={mouseover:function(){qe&&(vi(),je=!0)},mouseout:function(){je&&(di(),je=!1)}},ue={visibilitychange:function(){D.hidden?qe&&(vi(),Ge=!0):Ge&&(di(),Ge=!1)}},le={keydown:function(t){t=xi(t);var e=[a.LEFT,a.RIGHT].indexOf(t.keyCode);0<=e&&fi(t,0===e?-1:1)}},se={touchstart:Ti,touchmove:Ei,touchend:Ai,touchcancel:Ai},ce={mousedown:Ti,mousemove:Ei,mouseup:Ai,mouseleave:Ai},fe=dn("controls"),de=dn("nav"),ve=!!rt||O.navAsThumbnails,pe=dn("autoplay"),me=dn("touch"),he=dn("mouseDrag"),ye="tns-slide-active",ge="tns-complete",xe={load:function(t){zn(bi(t))},error:function(t){e=bi(t),Vi(e,"failed"),Wn(e);var e}},be="force"===O.preventScrollOnTouch;if(fe)var Ce,we,Me=O.controlsContainer,Te=O.controlsContainer?O.controlsContainer.outerHTML:"",Ee=O.prevButton,Ae=O.nextButton,Ne=O.prevButton?O.prevButton.outerHTML:"",Le=O.nextButton?O.nextButton.outerHTML:"";if(de)var Be,Se=O.navContainer,Oe=O.navContainer?O.navContainer.outerHTML:"",De=rt?K:Li(),He=0,ke=-1,Re=ln(),Ie=Re,Pe="tns-nav-active",ze="Carousel Page ",We=" (Current Slide)";if(pe)var Fe,qe,je,Ve,Ge,Qe="forward"===O.autoplayDirection?1:-1,Xe=O.autoplayButton,Ye=O.autoplayButton?O.autoplayButton.outerHTML:"",Ke=["<span class='tns-visually-hidden'>"," animation</span>"];if(me||he)var Je,Ue,_e={},Ze={},$e=!1,tn=q?function(t,e){return t.x-e.x}:function(t,e){return t.y-e.y};rt||an($t||ne),d&&(Pt=d,zt="translate",v?(zt+=q?"3d(":"3d(0px, ",Wt=q?", 0px, 0px)":", 0px)"):(zt+=q?"X(":"Y(",Wt=")")),I&&(G.className=G.className.replace("tns-vpfix","")),function(){dn("gutter");j.className="tns-outer",V.className="tns-inner",j.id=Zt+"-ow",V.id=Zt+"-iw",""===G.id&&(G.id=Zt);_t+=g||rt?" tns-subpixel":" tns-no-subpixel",_t+=y?" tns-calc":" tns-no-calc",rt&&(_t+=" tns-autowidth");_t+=" tns-"+O.axis,G.className+=_t,I?((S=D.createElement("div")).id=Zt+"-mw",S.className="tns-ovh",j.appendChild(S),S.appendChild(V)):j.appendChild(V);if(gt){var t=S||V;t.className+=" tns-ah"}if(Q.insertBefore(j,G),V.appendChild(G),qi(Y,function(t,e){Vi(t,"tns-item"),t.id||(t.id=Zt+"-item"+e),!I&&W&&Vi(t,W),Yi(t,{"aria-hidden":"true",tabindex:"-1"})}),Dt){for(var e=D.createDocumentFragment(),n=D.createDocumentFragment(),i=Dt;i--;){var a=i%K,r=Y[a].cloneNode(!0);if(Ki(r,"id"),n.insertBefore(r,n.firstChild),I){var o=Y[K-1-a].cloneNode(!0);Ki(o,"id"),e.appendChild(o)}}G.insertBefore(e,G.firstChild),G.appendChild(n),Y=G.children}}(),function(){if(!I)for(var t=qt,e=qt+Math.min(K,ft);t<e;t++){var n=Y[t];n.style.left=100*(t-qt)/ft+"%",Vi(n,P),Gi(n,W)}q&&(g||rt?(Wi(Bt,"#"+Zt+" > .tns-item","font-size:"+h.getComputedStyle(Y[0]).fontSize+";",Fi(Bt)),Wi(Bt,"#"+Zt,"font-size:0;",Fi(Bt))):I&&qi(Y,function(t,e){var n;t.style.marginLeft=(n=e,y?y+"("+100*n+"% / "+Ht+")":100*n/Ht+"%")}));if(H){if(x){var i=S&&O.autoHeight?xn(O.speed):"";Wi(Bt,"#"+Zt+"-mw",i,Fi(Bt))}i=pn(O.edgePadding,O.gutter,O.fixedWidth,O.speed,O.autoHeight),Wi(Bt,"#"+Zt+"-iw",i,Fi(Bt)),I&&(i=q&&!rt?"width:"+mn(O.fixedWidth,O.gutter,O.items)+";":"",x&&(i+=xn(mt)),Wi(Bt,"#"+Zt,i,Fi(Bt))),i=q&&!rt?hn(O.fixedWidth,O.gutter,O.items):"",O.gutter&&(i+=yn(O.gutter)),I||(x&&(i+=xn(mt)),b&&(i+=bn(mt))),i&&Wi(Bt,"#"+Zt+" > .tns-item",i,Fi(Bt))}else{Gn(),V.style.cssText=pn(ut,lt,ot,gt),I&&q&&!rt&&(G.style.width=mn(ot,lt,ft));var i=q&&!rt?hn(ot,lt,ft):"";lt&&(i+=yn(lt)),i&&Wi(Bt,"#"+Zt+" > .tns-item",i,Fi(Bt))}if(k&&H)for(var a in k){a=parseInt(a);var r=k[a],i="",o="",u="",l="",s="",c=rt?null:vn("items",a),f=vn("fixedWidth",a),d=vn("speed",a),v=vn("edgePadding",a),p=vn("autoHeight",a),m=vn("gutter",a);x&&S&&vn("autoHeight",a)&&"speed"in r&&(o="#"+Zt+"-mw{"+xn(d)+"}"),("edgePadding"in r||"gutter"in r)&&(u="#"+Zt+"-iw{"+pn(v,m,f,d,p)+"}"),I&&q&&!rt&&("fixedWidth"in r||"items"in r||ot&&"gutter"in r)&&(l="width:"+mn(f,m,c)+";"),x&&"speed"in r&&(l+=xn(d)),l&&(l="#"+Zt+"{"+l+"}"),("fixedWidth"in r||ot&&"gutter"in r||!I&&"items"in r)&&(s+=hn(f,m,c)),"gutter"in r&&(s+=yn(m)),!I&&"speed"in r&&(x&&(s+=xn(d)),b&&(s+=bn(d))),s&&(s="#"+Zt+" > .tns-item{"+s+"}"),(i=o+u+l+s)&&Bt.insertRule("@media (min-width: "+a/16+"em) {"+i+"}",Bt.cssRules.length)}}(),Cn();var en=yt?I?function(){var t=Vt,e=Gt;t+=dt,e-=dt,ut?(t+=1,e-=1):ot&&(st+lt)%(ot+lt)&&(e-=1),Dt&&(e<qt?qt-=K:qt<t&&(qt+=K))}:function(){if(Gt<qt)for(;Vt+K<=qt;)qt-=K;else if(qt<Vt)for(;qt<=Gt-K;)qt+=K}:function(){qt=Math.max(Vt,Math.min(Gt,qt))},nn=I?function(){var e,n,i,a,t,r,o,u,l,s,c;ti(G,""),x||!mt?(ri(),mt&&Zi(G)||si()):(e=G,n=Pt,i=zt,a=Wt,t=ii(),r=mt,o=si,u=Math.min(r,10),l=0<=t.indexOf("%")?"%":"px",t=t.replace(l,""),s=Number(e.style[n].replace(i,"").replace(a,"").replace(l,"")),c=(t-s)/r*u,setTimeout(function t(){r-=u,s+=c,e.style[n]=i+s+l+a,0<r?setTimeout(t,u):o()},u)),q||Ni()}:function(){Ot=[];var t={};t[C]=t[w]=si,na(Y[jt],t),ea(Y[qt],t),oi(jt,P,z,!0),oi(qt,W,P),C&&w&&mt&&Zi(G)||si()};return{version:"2.9.2",getInfo:Si,events:Ut,goTo:ci,play:function(){Tt&&!qe&&(mi(),Ve=!1)},pause:function(){qe&&(hi(),Ve=!0)},isOn:U,updateSliderHeight:Xn,refresh:Cn,destroy:function(){if(Bt.disabled=!0,Bt.ownerNode&&Bt.ownerNode.remove(),na(h,{resize:An}),pt&&na(D,le),Me&&na(Me,ae),Se&&na(Se,re),na(G,oe),na(G,ue),Xe&&na(Xe,{click:yi}),Tt&&clearInterval(Fe),I&&C){var t={};t[C]=si,na(G,t)}wt&&na(G,se),Mt&&na(G,ce);var r=[X,Te,Ne,Le,Oe,Ye];for(var e in T.forEach(function(t,e){var n="container"===t?j:O[t];if("object"==typeof n){var i=!!n.previousElementSibling&&n.previousElementSibling,a=n.parentNode;n.outerHTML=r[e],O[t]=i?i.nextElementSibling:a.firstElementChild}}),T=P=z=B=W=q=j=V=G=Q=X=Y=K=F=J=rt=ot=ut=lt=st=ft=dt=vt=pt=mt=ht=yt=gt=Bt=St=_=Ot=Dt=Ht=kt=Rt=It=Pt=zt=Wt=Ft=qt=jt=Vt=Gt=Xt=Yt=Kt=Jt=Ut=_t=Zt=$t=te=ee=ne=ie=ae=re=oe=ue=le=se=ce=fe=de=ve=pe=me=he=ye=ge=xe=Z=xt=bt=Me=Te=Ee=Ae=Ce=we=Ct=Se=Oe=Be=De=He=ke=Re=Ie=Pe=ze=We=Tt=Et=Qe=At=Nt=Xe=Ye=Lt=Ke=Fe=qe=je=Ve=Ge=_e=Ze=Je=$e=Ue=tn=wt=Mt=null,this)"rebuild"!==e&&(this[e]=null);U=!1},rebuild:function(){return aa(Hi(O,E))}}}function an(t){t&&(xt=Ct=wt=Mt=pt=Tt=Nt=Lt=!1)}function rn(){for(var t=I?qt-Dt:qt;t<0;)t+=K;return t%K+1}function on(t){return t=t?Math.max(0,Math.min(yt?K-1:K-ft,t)):0,I?t+Dt:t}function un(t){for(null==t&&(t=qt),I&&(t-=Dt);t<0;)t+=K;return Math.floor(t%K)}function ln(){var t,e=un();return t=ve?e:ot||rt?Math.ceil((e+1)*De/K-1):Math.floor(e/ft),!yt&&I&&qt===Gt&&(t=De-1),t}function sn(){return h.innerWidth||D.documentElement.clientWidth||D.body.clientWidth}function cn(t){return"top"===t?"afterbegin":"beforeend"}function fn(){var t=ut?2*ut-lt:0;return function t(e){var n,i,a=D.createElement("div");return e.appendChild(a),i=(n=a.getBoundingClientRect()).right-n.left,a.remove(),i||t(e.parentNode)}(Q)-t}function dn(t){if(O[t])return!0;if(k)for(var e in k)if(k[e][t])return!0;return!1}function vn(t,e){if(null==e&&(e=J),"items"===t&&ot)return Math.floor((st+lt)/(ot+lt))||1;var n=O[t];if(k)for(var i in k)e>=parseInt(i)&&t in k[i]&&(n=k[i][t]);return"slideBy"===t&&"page"===n&&(n=vn("items")),I||"slideBy"!==t&&"items"!==t||(n=Math.floor(n)),n}function pn(t,e,n,i,a){var r="";if(void 0!==t){var o=t;e&&(o-=e),r=q?"margin: 0 "+o+"px 0 "+t+"px;":"margin: "+t+"px 0 "+o+"px 0;"}else if(e&&!n){var u="-"+e+"px";r="margin: 0 "+(q?u+" 0 0":"0 "+u+" 0")+";"}return!I&&a&&x&&i&&(r+=xn(i)),r}function mn(t,e,n){return t?(t+e)*Ht+"px":y?y+"("+100*Ht+"% / "+n+")":100*Ht/n+"%"}function hn(t,e,n){var i;if(t)i=t+e+"px";else{I||(n=Math.floor(n));var a=I?Ht:n;i=y?y+"(100% / "+a+")":100/a+"%"}return i="width:"+i,"inner"!==R?i+";":i+" !important;"}function yn(t){var e="";!1!==t&&(e=(q?"padding-":"margin-")+(q?"right":"bottom")+": "+t+"px;");return e}function gn(t,e){var n=t.substring(0,t.length-e).toLowerCase();return n&&(n="-"+n+"-"),n}function xn(t){return gn(x,18)+"transition-duration:"+t/1e3+"s;"}function bn(t){return gn(b,17)+"animation-duration:"+t/1e3+"s;"}function Cn(){if(dn("autoHeight")||rt||!q){var t=G.querySelectorAll("img");qi(t,function(t){var e=t.src;e&&e.indexOf("data:image")<0?(ea(t,xe),t.src="",t.src=e,Vi(t,"loading")):St||zn(t)}),Oi(function(){jn(Ji(t),function(){Z=!0})}),!rt&&q&&(t=Fn(qt,Math.min(qt+ft-1,Ht-1))),St?wn():Oi(function(){jn(Ji(t),wn)})}else I&&ai(),Tn(),En()}function wn(){if(rt){var e=yt?qt:K-1;!function t(){Y[e-1].getBoundingClientRect().right.toFixed(2)===Y[e].getBoundingClientRect().left.toFixed(2)?Mn():setTimeout(function(){t()},16)}()}else Mn()}function Mn(){q&&!rt||(Yn(),rt?(Rt=ni(),ee&&(ne=Ln()),Gt=Ft(),an($t||ne)):Ni()),I&&ai(),Tn(),En()}function Tn(){if(Kn(),j.insertAdjacentHTML("afterbegin",'<div class="tns-liveregion tns-visually-hidden" aria-live="polite" aria-atomic="true">slide <span class="current">'+Rn()+"</span>  of "+K+"</div>"),$=j.querySelector(".tns-liveregion .current"),pe){var t=Tt?"stop":"start";Xe?Yi(Xe,{"data-action":t}):O.autoplayButtonOutput&&(j.insertAdjacentHTML(cn(O.autoplayPosition),'<button data-action="'+t+'">'+Ke[0]+t+Ke[1]+At[0]+"</button>"),Xe=j.querySelector("[data-action]")),Xe&&ea(Xe,{click:yi}),Tt&&(mi(),Nt&&ea(G,oe),Lt&&ea(G,ue))}if(de){if(Se)Yi(Se,{"aria-label":"Carousel Pagination"}),qi(Be=Se.children,function(t,e){Yi(t,{"data-nav":e,tabindex:"-1","aria-label":ze+(e+1),"aria-controls":Zt})});else{for(var e="",n=ve?"":'style="display:none"',i=0;i<K;i++)e+='<button data-nav="'+i+'" tabindex="-1" aria-controls="'+Zt+'" '+n+' aria-label="'+ze+(i+1)+'"></button>';e='<div class="tns-nav" aria-label="Carousel Pagination">'+e+"</div>",j.insertAdjacentHTML(cn(O.navPosition),e),Se=j.querySelector(".tns-nav"),Be=Se.children}if(Bi(),x){var a=x.substring(0,x.length-18).toLowerCase(),r="transition: all "+mt/1e3+"s";a&&(r="-"+a+"-"+r),Wi(Bt,"[aria-controls^="+Zt+"-item]",r,Fi(Bt))}Yi(Be[Re],{"aria-label":ze+(Re+1)+We}),Ki(Be[Re],"tabindex"),Vi(Be[Re],Pe),ea(Se,re)}fe&&(Me||Ee&&Ae||(j.insertAdjacentHTML(cn(O.controlsPosition),'<div class="tns-controls" aria-label="Carousel Navigation" tabindex="0"><button data-controls="prev" tabindex="-1" aria-controls="'+Zt+'">'+bt[0]+'</button><button data-controls="next" tabindex="-1" aria-controls="'+Zt+'">'+bt[1]+"</button></div>"),Me=j.querySelector(".tns-controls")),Ee&&Ae||(Ee=Me.children[0],Ae=Me.children[1]),O.controlsContainer&&Yi(Me,{"aria-label":"Carousel Navigation",tabindex:"0"}),(O.controlsContainer||O.prevButton&&O.nextButton)&&Yi([Ee,Ae],{"aria-controls":Zt,tabindex:"-1"}),(O.controlsContainer||O.prevButton&&O.nextButton)&&(Yi(Ee,{"data-controls":"prev"}),Yi(Ae,{"data-controls":"next"})),Ce=Un(Ee),we=Un(Ae),$n(),Me?ea(Me,ae):(ea(Ee,ae),ea(Ae,ae))),Sn()}function En(){if(I&&C){var t={};t[C]=si,ea(G,t)}wt&&ea(G,se,O.preventScrollOnTouch),Mt&&ea(G,ce),pt&&ea(D,le),"inner"===R?Ut.on("outerResized",function(){Nn(),Ut.emit("innerLoaded",Si())}):(k||ot||rt||gt||!q)&&ea(h,{resize:An}),gt&&("outer"===R?Ut.on("innerLoaded",qn):$t||qn()),Pn(),$t?Hn():ne&&Dn(),Ut.on("indexChanged",Vn),"inner"===R&&Ut.emit("innerLoaded",Si()),"function"==typeof Jt&&Jt(Si()),U=!0}function An(t){Oi(function(){Nn(xi(t))})}function Nn(t){if(U){"outer"===R&&Ut.emit("outerResized",Si(t)),J=sn();var e,n=F,i=!1;k&&(Bn(),(e=n!==F)&&Ut.emit("newBreakpointStart",Si(t)));var a,r,o,u,l=ft,s=$t,c=ne,f=pt,d=xt,v=Ct,p=wt,m=Mt,h=Tt,y=Nt,g=Lt,x=qt;if(e){var b=ot,C=gt,w=bt,M=ct,T=At;if(!H)var E=lt,A=ut}if(pt=vn("arrowKeys"),xt=vn("controls"),Ct=vn("nav"),wt=vn("touch"),ct=vn("center"),Mt=vn("mouseDrag"),Tt=vn("autoplay"),Nt=vn("autoplayHoverPause"),Lt=vn("autoplayResetOnVisibility"),e&&($t=vn("disable"),ot=vn("fixedWidth"),mt=vn("speed"),gt=vn("autoHeight"),bt=vn("controlsText"),At=vn("autoplayText"),Et=vn("autoplayTimeout"),H||(ut=vn("edgePadding"),lt=vn("gutter"))),an($t),st=fn(),q&&!rt||$t||(Yn(),q||(Ni(),i=!0)),(ot||rt)&&(Rt=ni(),Gt=Ft()),(e||ot)&&(ft=vn("items"),dt=vn("slideBy"),(r=ft!==l)&&(ot||rt||(Gt=Ft()),en())),e&&$t!==s&&($t?Hn():function(){if(!te)return;if(Bt.disabled=!1,G.className+=_t,ai(),yt)for(var t=Dt;t--;)I&&_i(Y[t]),_i(Y[Ht-t-1]);if(!I)for(var e=qt,n=qt+K;e<n;e++){var i=Y[e],a=e<qt+ft?P:W;i.style.left=100*(e-qt)/ft+"%",Vi(i,a)}On(),te=!1}()),ee&&(e||ot||rt)&&(ne=Ln())!==c&&(ne?(ri(ii(on(0))),Dn()):(!function(){if(!ie)return;ut&&H&&(V.style.margin="");if(Dt)for(var t="tns-transparent",e=Dt;e--;)I&&Gi(Y[e],t),Gi(Y[Ht-e-1],t);On(),ie=!1}(),i=!0)),an($t||ne),Tt||(Nt=Lt=!1),pt!==f&&(pt?ea(D,le):na(D,le)),xt!==d&&(xt?Me?_i(Me):(Ee&&_i(Ee),Ae&&_i(Ae)):Me?Ui(Me):(Ee&&Ui(Ee),Ae&&Ui(Ae))),Ct!==v&&(Ct?_i(Se):Ui(Se)),wt!==p&&(wt?ea(G,se,O.preventScrollOnTouch):na(G,se)),Mt!==m&&(Mt?ea(G,ce):na(G,ce)),Tt!==h&&(Tt?(Xe&&_i(Xe),qe||Ve||mi()):(Xe&&Ui(Xe),qe&&hi())),Nt!==y&&(Nt?ea(G,oe):na(G,oe)),Lt!==g&&(Lt?ea(D,ue):na(D,ue)),e){if(ot===b&&ct===M||(i=!0),gt!==C&&(gt||(V.style.height="")),xt&&bt!==w&&(Ee.innerHTML=bt[0],Ae.innerHTML=bt[1]),Xe&&At!==T){var N=Tt?1:0,L=Xe.innerHTML,B=L.length-T[N].length;L.substring(B)===T[N]&&(Xe.innerHTML=L.substring(0,B)+At[N])}}else ct&&(ot||rt)&&(i=!0);if((r||ot&&!rt)&&(De=Li(),Bi()),(a=qt!==x)?(Ut.emit("indexChanged",Si()),i=!0):r?a||Vn():(ot||rt)&&(Pn(),Kn(),kn()),r&&!I&&function(){for(var t=qt+Math.min(K,ft),e=Ht;e--;){var n=Y[e];qt<=e&&e<t?(Vi(n,"tns-moving"),n.style.left=100*(e-qt)/ft+"%",Vi(n,P),Gi(n,W)):n.style.left&&(n.style.left="",Vi(n,W),Gi(n,P)),Gi(n,z)}setTimeout(function(){qi(Y,function(t){Gi(t,"tns-moving")})},300)}(),!$t&&!ne){if(e&&!H&&(gt===autoheightTem&&mt===speedTem||Gn(),ut===A&&lt===E||(V.style.cssText=pn(ut,lt,ot,mt,gt)),q)){I&&(G.style.width=mn(ot,lt,ft));var S=hn(ot,lt,ft)+yn(lt);u=Fi(o=Bt)-1,"deleteRule"in o?o.deleteRule(u):o.removeRule(u),Wi(Bt,"#"+Zt+" > .tns-item",S,Fi(Bt))}gt&&qn(),i&&(ai(),jt=qt)}e&&Ut.emit("newBreakpointEnd",Si(t))}}function Ln(){if(!ot&&!rt)return K<=(ct?ft-(ft-1)/2:ft);var t=ot?(ot+lt)*K:_[K],e=ut?st+2*ut:st+lt;return ct&&(e-=ot?(st-ot)/2:(st-(_[qt+1]-_[qt]-lt))/2),t<=e}function Bn(){for(var t in F=0,k)(t=parseInt(t))<=J&&(F=t)}function Sn(){!Tt&&Xe&&Ui(Xe),!Ct&&Se&&Ui(Se),xt||(Me?Ui(Me):(Ee&&Ui(Ee),Ae&&Ui(Ae)))}function On(){Tt&&Xe&&_i(Xe),Ct&&Se&&_i(Se),xt&&(Me?_i(Me):(Ee&&_i(Ee),Ae&&_i(Ae)))}function Dn(){if(!ie){if(ut&&(V.style.margin="0px"),Dt)for(var t="tns-transparent",e=Dt;e--;)I&&Vi(Y[e],t),Vi(Y[Ht-e-1],t);Sn(),ie=!0}}function Hn(){if(!te){if(Bt.disabled=!0,G.className=G.className.replace(_t.substring(1),""),Ki(G,["style"]),yt)for(var t=Dt;t--;)I&&Ui(Y[t]),Ui(Y[Ht-t-1]);if(q&&I||Ki(V,["style"]),!I)for(var e=qt,n=qt+K;e<n;e++){var i=Y[e];Ki(i,["style"]),Gi(i,P),Gi(i,W)}Sn(),te=!0}}function kn(){var t=Rn();$.innerHTML!==t&&($.innerHTML=t)}function Rn(){var t=In(),e=t[0]+1,n=t[1]+1;return e===n?e+"":e+" to "+n}function In(t){null==t&&(t=ii());var n,i,a,r=qt;if(ct||ut?(rt||ot)&&(i=-(parseFloat(t)+ut),a=i+st+2*ut):rt&&(i=_[qt],a=i+st),rt)_.forEach(function(t,e){e<Ht&&((ct||ut)&&t<=i+.5&&(r=e),.5<=a-t&&(n=e))});else{if(ot){var e=ot+lt;ct||ut?(r=Math.floor(i/e),n=Math.ceil(a/e-1)):n=r+Math.ceil(st/e)-1}else if(ct||ut){var o=ft-1;if(ct?(r-=o/2,n=qt+o/2):n=qt+o,ut){var u=ut*ft/st;r-=u,n+=u}r=Math.floor(r),n=Math.ceil(n)}else n=r+ft-1;r=Math.max(r,0),n=Math.min(n,Ht-1)}return[r,n]}function Pn(){St&&!$t&&Fn.apply(null,In()).forEach(function(t){if(!ji(t,ge)){var e={};e[C]=function(t){t.stopPropagation()},ea(t,e),ea(t,xe),t.src=Xi(t,"data-src");var n=Xi(t,"data-srcset");n&&(t.srcset=n),Vi(t,"loading")}})}function zn(t){Vi(t,"loaded"),Wn(t)}function Wn(t){Vi(t,"tns-complete"),Gi(t,"loading"),na(t,xe)}function Fn(t,e){for(var n=[];t<=e;)qi(Y[t].querySelectorAll("img"),function(t){n.push(t)}),t++;return n}function qn(){var t=Fn.apply(null,In());Oi(function(){jn(t,Xn)})}function jn(n,t){return Z?t():(n.forEach(function(t,e){ji(t,ge)&&n.splice(e,1)}),n.length?void Oi(function(){jn(n,t)}):t())}function Vn(){Pn(),Kn(),kn(),$n(),function(){if(Ct&&(Re=0<=ke?ke:ln(),ke=-1,Re!==Ie)){var t=Be[Ie],e=Be[Re];Yi(t,{tabindex:"-1","aria-label":ze+(Ie+1)}),Gi(t,Pe),Yi(e,{"aria-label":ze+(Re+1)+We}),Ki(e,"tabindex"),Vi(e,Pe),Ie=Re}}()}function Gn(){I&&gt&&(S.style[x]=mt/1e3+"s")}function Qn(t,e){for(var n=[],i=t,a=Math.min(t+e,Ht);i<a;i++)n.push(Y[i].offsetHeight);return Math.max.apply(null,n)}function Xn(){var t=gt?Qn(qt,ft):Qn(Dt,K),e=S||V;e.style.height!==t&&(e.style.height=t+"px")}function Yn(){_=[0];var n=q?"left":"top",i=q?"right":"bottom",a=Y[0].getBoundingClientRect()[n];qi(Y,function(t,e){e&&_.push(t.getBoundingClientRect()[n]-a),e===Ht-1&&_.push(t.getBoundingClientRect()[i]-a)})}function Kn(){var t=In(),n=t[0],i=t[1];qi(Y,function(t,e){n<=e&&e<=i?Qi(t,"aria-hidden")&&(Ki(t,["aria-hidden","tabindex"]),Vi(t,ye)):Qi(t,"aria-hidden")||(Yi(t,{"aria-hidden":"true",tabindex:"-1"}),Gi(t,ye))})}function Jn(t){return t.nodeName.toLowerCase()}function Un(t){return"button"===Jn(t)}function _n(t){return"true"===t.getAttribute("aria-disabled")}function Zn(t,e,n){t?e.disabled=n:e.setAttribute("aria-disabled",n.toString())}function $n(){if(xt&&!ht&&!yt){var t=Ce?Ee.disabled:_n(Ee),e=we?Ae.disabled:_n(Ae),n=qt<=Vt,i=!ht&&Gt<=qt;n&&!t&&Zn(Ce,Ee,!0),!n&&t&&Zn(Ce,Ee,!1),i&&!e&&Zn(we,Ae,!0),!i&&e&&Zn(we,Ae,!1)}}function ti(t,e){x&&(t.style[x]=e)}function ei(t){return null==t&&(t=qt),rt?(st-(ut?lt:0)-(_[t+1]-_[t]-lt))/2:ot?(st-ot)/2:(ft-1)/2}function ni(){var t=st+(ut?lt:0)-(ot?(ot+lt)*Ht:_[Ht]);return ct&&!yt&&(t=ot?-(ot+lt)*(Ht-1)-ei():ei(Ht-1)-_[Ht-1]),0<t&&(t=0),t}function ii(t){var e;if(null==t&&(t=qt),q&&!rt)if(ot)e=-(ot+lt)*t,ct&&(e+=ei());else{var n=d?Ht:ft;ct&&(t-=ei()),e=100*-t/n}else e=-_[t],ct&&rt&&(e+=ei());return kt&&(e=Math.max(e,Rt)),e+=!q||rt||ot?"px":"%"}function ai(t){ti(G,"0s"),ri(t)}function ri(t){null==t&&(t=ii()),G.style[Pt]=zt+t+Wt}function oi(t,e,n,i){var a=t+ft;yt||(a=Math.min(a,Ht));for(var r=t;r<a;r++){var o=Y[r];i||(o.style.left=100*(r-qt)/ft+"%"),B&&p&&(o.style[p]=o.style[m]=B*(r-t)/1e3+"s"),Gi(o,e),Vi(o,n),i&&Ot.push(o)}}function ui(t,e){It&&en(),(qt!==jt||e)&&(Ut.emit("indexChanged",Si()),Ut.emit("transitionStart",Si()),gt&&qn(),qe&&t&&0<=["click","keydown"].indexOf(t.type)&&hi(),Kt=!0,nn())}function li(t){return t.toLowerCase().replace(/-/g,"")}function si(t){if(I||Kt){if(Ut.emit("transitionEnd",Si(t)),!I&&0<Ot.length)for(var e=0;e<Ot.length;e++){var n=Ot[e];n.style.left="",m&&p&&(n.style[m]="",n.style[p]=""),Gi(n,z),Vi(n,W)}if(!t||!I&&t.target.parentNode===G||t.target===G&&li(t.propertyName)===li(Pt)){if(!It){var i=qt;en(),qt!==i&&(Ut.emit("indexChanged",Si()),ai())}"inner"===R&&Ut.emit("innerLoaded",Si()),Kt=!1,jt=qt}}}function ci(t,e){if(!ne)if("prev"===t)fi(e,-1);else if("next"===t)fi(e,1);else{if(Kt){if(Qt)return;si()}var n=un(),i=0;if("first"===t?i=-n:"last"===t?i=I?K-ft-n:K-1-n:("number"!=typeof t&&(t=parseInt(t)),isNaN(t)||(e||(t=Math.max(0,Math.min(K-1,t))),i=t-n)),!I&&i&&Math.abs(i)<ft){var a=0<i?1:-1;i+=Vt<=qt+i-K?K*a:2*K*a*-1}qt+=i,I&&yt&&(qt<Vt&&(qt+=K),Gt<qt&&(qt-=K)),un(qt)!==un(jt)&&ui(e)}}function fi(t,e){if(Kt){if(Qt)return;si()}var n;if(!e){for(var i=bi(t=xi(t));i!==Me&&[Ee,Ae].indexOf(i)<0;)i=i.parentNode;var a=[Ee,Ae].indexOf(i);0<=a&&(n=!0,e=0===a?-1:1)}if(ht){if(qt===Vt&&-1===e)return void ci("last",t);if(qt===Gt&&1===e)return void ci("first",t)}e&&(qt+=dt*e,rt&&(qt=Math.floor(qt)),ui(n||t&&"keydown"===t.type?t:null))}function di(){Fe=setInterval(function(){fi(null,Qe)},Et),qe=!0}function vi(){clearInterval(Fe),qe=!1}function pi(t,e){Yi(Xe,{"data-action":t}),Xe.innerHTML=Ke[0]+t+Ke[1]+e}function mi(){di(),Xe&&pi("stop",At[1])}function hi(){vi(),Xe&&pi("start",At[0])}function yi(){qe?(hi(),Ve=!0):(mi(),Ve=!1)}function gi(t){t.focus()}function xi(t){return Ci(t=t||h.event)?t.changedTouches[0]:t}function bi(t){return t.target||h.event.srcElement}function Ci(t){return 0<=t.type.indexOf("touch")}function wi(t){t.preventDefault?t.preventDefault():t.returnValue=!1}function Mi(){return a=Ze.y-_e.y,r=Ze.x-_e.x,t=Math.atan2(a,r)*(180/Math.PI),e=Xt,n=!1,i=Math.abs(90-Math.abs(t)),90-e<=i?n="horizontal":i<=e&&(n="vertical"),n===O.axis;var t,e,n,i,a,r}function Ti(t){if(Kt){if(Qt)return;si()}Tt&&qe&&vi(),$e=!0,Ue&&(Di(Ue),Ue=null);var e=xi(t);Ut.emit(Ci(t)?"touchStart":"dragStart",Si(t)),!Ci(t)&&0<=["img","a"].indexOf(Jn(bi(t)))&&wi(t),Ze.x=_e.x=e.clientX,Ze.y=_e.y=e.clientY,I&&(Je=parseFloat(G.style[Pt].replace(zt,"")),ti(G,"0s"))}function Ei(t){if($e){var e=xi(t);Ze.x=e.clientX,Ze.y=e.clientY,I?Ue||(Ue=Oi(function(){!function t(e){if(!Yt)return void($e=!1);Di(Ue);$e&&(Ue=Oi(function(){t(e)}));"?"===Yt&&(Yt=Mi());if(Yt){!be&&Ci(e)&&(be=!0);try{e.type&&Ut.emit(Ci(e)?"touchMove":"dragMove",Si(e))}catch(t){}var n=Je,i=tn(Ze,_e);if(!q||ot||rt)n+=i,n+="px";else{var a=d?i*ft*100/((st+lt)*Ht):100*i/(st+lt);n+=a,n+="%"}G.style[Pt]=zt+n+Wt}}(t)})):("?"===Yt&&(Yt=Mi()),Yt&&(be=!0)),be&&t.preventDefault()}}function Ai(i){if($e){Ue&&(Di(Ue),Ue=null),I&&ti(G,""),$e=!1;var t=xi(i);Ze.x=t.clientX,Ze.y=t.clientY;var a=tn(Ze,_e);if(Math.abs(a)){if(!Ci(i)){var n=bi(i);ea(n,{click:function t(e){wi(e),na(n,{click:t})}})}I?Ue=Oi(function(){if(q&&!rt){var t=-a*ft/(st+lt);t=0<a?Math.floor(t):Math.ceil(t),qt+=t}else{var e=-(Je+a);if(e<=0)qt=Vt;else if(e>=_[Ht-1])qt=Gt;else for(var n=0;n<Ht&&e>=_[n];)e>_[qt=n]&&a<0&&(qt+=1),n++}ui(i,a),Ut.emit(Ci(i)?"touchEnd":"dragEnd",Si(i))}):Yt&&fi(i,0<a?-1:1)}}"auto"===O.preventScrollOnTouch&&(be=!1),Xt&&(Yt="?"),Tt&&!qe&&di()}function Ni(){(S||V).style.height=_[qt+ft]-_[qt]+"px"}function Li(){var t=ot?(ot+lt)*K/st:K/ft;return Math.min(Math.ceil(t),K)}function Bi(){if(Ct&&!ve&&De!==He){var t=He,e=De,n=_i;for(De<He&&(t=De,e=He,n=Ui);t<e;)n(Be[t]),t++;He=De}}function Si(t){return{container:G,slideItems:Y,navContainer:Se,navItems:Be,controlsContainer:Me,hasControls:fe,prevButton:Ee,nextButton:Ae,items:ft,slideBy:dt,cloneCount:Dt,slideCount:K,slideCountNew:Ht,index:qt,indexCached:jt,displayIndex:rn(),navCurrentIndex:Re,navCurrentIndexCached:Ie,pages:De,pagesCached:He,sheet:Bt,isOn:U,event:t||{}}}M&&console.warn("No slides found in",O.container)};return aa}();
//# sourceMappingURL=../sourcemaps/tiny-slider.js.map

(function() {
  let animations = [
    'container',
    'planet',
  ];
  for (let defaultAnimationIteration = 0; defaultAnimationIteration < animations.length; defaultAnimationIteration++) {
    const animation = animations[defaultAnimationIteration];
    animationInit(animation);
  }
  for (let delayAnimationIteration = 0; delayAnimationIteration < animations.length; delayAnimationIteration++) {
    const animation = animations[delayAnimationIteration];
    animationInit(animation + '-delay');
  }
  for (let visibleAnimationIteration = 0; visibleAnimationIteration < animations.length; visibleAnimationIteration++) {
    const animation = animations[visibleAnimationIteration];
    animationInit(animation + '-visible');
  }
  
  function animationInit(animation) {
    const animationName = animation + '-animation',
          prepareToAnimationClass = 'prepare-' + animationName,
          elements = document.getElementsByClassName(prepareToAnimationClass),
          offsets = getOffsets(animation);
    for (let elementIteration = 0; elementIteration < elements.length; elementIteration++) {
      const element = elements[elementIteration],
            animationInfinitely = element.hasAttribute('data-animation-infinitely'),
            listener = function() {
              if (checkThatObjectIsInScrollArea(element, offsets[0], offsets[1])) {
                element.classList.add(animationName);
                if (!animationInfinitely) {
                  window.removeEventListener('scroll', listener);
                }
              } else if (animationInfinitely) {
                element.classList.remove(animationName);
              }
            };
      if (checkThatObjectIsInScrollArea(element, offsets[0], offsets[1])) {
        element.classList.add(animationName);
        if (animationInfinitely) {
          window.addEventListener('scroll', listener);
        }
      } else {
        window.addEventListener('scroll', listener);
      }
    }
  }

  let jsAnimationElements = document.querySelectorAll('[data-js-animation]');

  for (let jsAnimationIteration = 0; jsAnimationIteration < jsAnimationElements.length; jsAnimationIteration++) {
    const jsAnimationElement = jsAnimationElements[jsAnimationIteration];
    jsAnimation(jsAnimationElement);
  }

  function getOffsets(animation) {
    switch (animation) {
      case 'container':
        return [-500, 0];
    
      default:
        return [0, 0];
    }
  }

  function jsAnimation(element) {
    const animationInfinitely = element.hasAttribute('data-animation-infinitely'),
          removingClass = element.getAttribute('data-js-animation'),
          listener = function() {
            if (checkThatObjectIsInScrollArea(element, 0)) {
              element.classList.remove(removingClass);
              if (!animationInfinitely) {
                window.removeEventListener(element, listener);
              }
            } else if (animationInfinitely) {
              element.classList.add(removingClass);
            }
          };
    if (checkThatObjectIsInScrollArea(element, 0)) {
      element.classList.remove(removingClass);
      if (animationInfinitely) {
        window.addEventListener('scroll', listener);
      }
    } else {
      window.addEventListener('scroll', listener);
    }
  }
}());
(function() {
  let scrollImg = document.querySelectorAll('[data-async-scroll-img]'),
      scrollBackgrounds = document.querySelectorAll('[data-async-scroll-background]'),
      asyncImg = document.querySelectorAll('[data-async-img]'),
      asyncBackground = document.querySelectorAll('[data-async-background]');
    
  window.addEventListener('load', function() {
    let srcComplexAddFunctions = [],
        srcComplexAddFunctionsForBackground = [];
  
    for (let scrollImgIteration = 0; scrollImgIteration < scrollImg.length; scrollImgIteration++) {
      let img = scrollImg[scrollImgIteration],
          srcForAdd = img.getAttribute('data-async-scroll-img'),
          srcAdded = false;
      
      srcComplexAddFunctions[scrollImgIteration] = function() {
        if (!srcAdded && checkThatObjectIsInScrollArea(img, 200)) {
          img.src = srcForAdd;
          srcAdded = true;
          document.removeEventListener('scroll', srcComplexAddFunctions[scrollImgIteration]);
        }
      }
      
      setTimeout(() => {
        if (!srcAdded && checkThatObjectIsInScrollArea(img, 200)) {
          img.src = srcForAdd;
          srcAdded = true;
        } else {
          document.addEventListener('scroll', srcComplexAddFunctions[scrollImgIteration]);
        }
      }, 100);
      
    }
    for (let scrollBackgroundIteration = 0; scrollBackgroundIteration < scrollBackgrounds.length; scrollBackgroundIteration++) {
      let img = scrollBackgrounds[scrollBackgroundIteration],
          srcForAdd = img.getAttribute('data-async-scroll-background'),
          srcAdded = false;
      
      srcComplexAddFunctionsForBackground[scrollBackgroundIteration] = function() {
        if (!srcAdded && checkThatObjectIsInScrollArea(img, 400)) {
          img.style.backgroundImage = `url(${srcForAdd})`;
          srcAdded = true;
          document.removeEventListener('scroll', srcComplexAddFunctionsForBackground[scrollBackgroundIteration]);
        }
      }
      
      setTimeout(() => {
        if (!srcAdded && checkThatObjectIsInScrollArea(img, 400)) {
          img.style.backgroundImage = `url(${srcForAdd})`;
          srcAdded = true;
        } else {
          document.addEventListener('scroll', srcComplexAddFunctionsForBackground[scrollBackgroundIteration]);
        }
      }, 100);
      
    }
    
    for (let asyncImgIteration = 0; asyncImgIteration < asyncImg.length; asyncImgIteration++) {
      let img = asyncImg[asyncImgIteration],
          srcForAdd = img.getAttribute('data-async-img');
      img.src = srcForAdd;
    }
    
    for (let asyncBackgroundIteration = 0; asyncBackgroundIteration < asyncBackground.length; asyncBackgroundIteration++) {
      let img = asyncBackground[asyncBackgroundIteration],
          srcForAdd = img.getAttribute('data-async-background');
      img.style.backgroundImage = `url(${srcForAdd})`;
    }

  });
}());
let advancedElementsForScrollBlocking = document.getElementsByClassName('js-for-replace-scrollbar'),
    lastScrollBarWidth = getScrollBarWidth();

function blockScroll() {
  if (checkScrollbar()) {
    blockScrollBar();
  }
  document.documentElement.classList.add('block-scroll');
}
function unblockScroll() {
  document.documentElement.classList.remove('block-scroll');
  unblockScrollBar();
}

function blockScrollBar() {
  document.body.style.paddingRight = getScrollBarWidth() + 'px';
  for (let i = 0; i < advancedElementsForScrollBlocking.length; i++) {
    const advancedElementForScrollBlocking = advancedElementsForScrollBlocking[i];
    advancedElementForScrollBlocking.style.paddingRight = getScrollBarWidth() + 'px';
  }
}
function unblockScrollBar() {
  if (document.body.style.paddingRight != '') {
    document.body.style.paddingRight = '';
  }
  for (let i = 0; i < [...advancedElementsForScrollBlocking, ...document.getElementsByClassName('js-padding-instead-of-scrollbar')].length; i++) {
    const advancedElementForScrollBlocking = [...advancedElementsForScrollBlocking, ...document.getElementsByClassName('js-padding-instead-of-scrollbar')][i];
    if (advancedElementForScrollBlocking.style.paddingRight != '') {
      advancedElementForScrollBlocking.style.paddingRight = '';
    }
  }
}
function blockScrollBarIn(element, cached = false) {
  if (cached) {
    element.style.paddingRight = getScrollBarWidth() + 'px';
  } else {
    element.style.paddingRight = getScrollBarWidthFrom(element) + 'px';
  }
  element.classList.add('js-padding-instead-of-scrollbar');
}
function checkScrollbar() {
  return window.innerWidth > document.body.clientWidth;
}
function getScrollBarWidth() {
  try {
    const scrollBarWidth = window.innerWidth - document.body.clientWidth;
    lastScrollBarWidth = scrollBarWidth;
    return scrollBarWidth;
  } catch (error) {
    console.log(error);
    return 0;
  }
}
function checkScrollbarIn(element) {
  return element.offsetWidth > element.clientWidth;
}
function getScrollBarWidthFrom(element) {
  return element.offsetWidth - element.clientWidth;
}
const formulaAliases = {
        WVC : getWeightPriceOrVolumePrice,
        WC : getWeightPrice,
        VC : getVolumePrice,
        WV : getWeightOrVolume,
        V : getVolumeForOperations,
        W : getWeight,
      },
      sendingCitiesListElement = document.getElementsByClassName('js-calc-sending-cities')[0],
      recipientCitiesListElement = document.getElementsByClassName('js-calc-recipient-cities')[0],
      sendingCityOutput = document.getElementsByClassName('js-calc-sending-city-output')[0],
      recipientCityOutput = document.getElementsByClassName('js-calc-recipient-city-output')[0],
      weightElement = document.getElementsByClassName('js-calc-input-weight')[0],
      volumeElement = document.getElementsByClassName('js-calc-input-volume')[0],
      outputAddressFrom = document.getElementsByClassName('js-calc-address-from')[0],
      outputAddressTo = document.getElementsByClassName('js-calc-address-to')[0],
      outputVolume = document.getElementsByClassName('js-calc-volume')[0],
      outputWeight = document.getElementsByClassName('js-calc-weight')[0],
      outputTotalCost = document.getElementsByClassName('js-calc-total-cost')[0],
      symbolOfVolume = document.getElementsByClassName('js-calc-volume-symbol')[0],
      symbolOfWeight = document.getElementsByClassName('js-calc-weight-symbol')[0],
      calcStatus = document.getElementsByClassName('js-calc-status')[0],
      calcStatusOutput = document.getElementsByClassName('js-calc-status-output')[0];

if (typeof volumeElement != 'undefined' && typeof weightElement != 'undefined') {
  volumeElement.addEventListener('input', () => {
    let weight = getWeight(),
        volume = getVolume(),
        currentPath = getCurrentPathData();
    if (typeof volume == 'number') {
      if (typeof currentPath != 'string' && typeof weight == 'number' && !checkWeightUsing(weight, volume)) {
        symbolOfVolume.innerText = '₽./м³';
        outputVolume.innerText = breakNumberIntoThousands(currentPath.volume);
      } else {
        symbolOfVolume.innerText = 'м³';
        outputVolume.innerText = breakNumberIntoThousands(Math.ceil(volume));
      }
    } else {
      symbolOfVolume.innerText = 'м³';
      outputVolume.innerText = '0';
  
      if (symbolOfWeight.innerText == '₽./кг') {
        symbolOfWeight.innerText = 'кг';
        if (typeof weight == 'number') {
          outputWeight.innerText = breakNumberIntoThousands(Math.ceil(weight));
        } else {
          outputWeight.innerText = 0;
        }
      }
    }
  });
  weightElement.addEventListener('input', () => {
    let weight = getWeight(),
        volume = getVolume(),
        currentPath = getCurrentPathData();
    if (typeof weight == 'number') {
      if (typeof currentPath != 'string' && typeof volume == 'number' && checkWeightUsing(weight, volume)) {
        symbolOfWeight.innerText = '₽./кг';
        outputWeight.innerText = breakNumberIntoThousands(currentPath.weight);
      } else {
        symbolOfWeight.innerText = 'кг';
        outputWeight.innerText = breakNumberIntoThousands(Math.ceil(weight));
      }
    } else {
      symbolOfWeight.innerText = 'кг';
      outputWeight.innerText = '0';
  
      if (symbolOfVolume.innerText == '₽./м³') {
        symbolOfVolume.innerText = 'м³';
        if (typeof volume == 'number') {
          outputVolume.innerText = breakNumberIntoThousands(Math.ceil(volume));
        } else {
          outputVolume.innerText = '0';
        }
      }
    }
  });
}

function doFormula() {
  let formulaResult = calculateFormula(getFormulaWithValues()),
      weight = getWeight(),
      volume = getVolume(),
      currentPath = getCurrentPathData();

  if (typeof currentPath != 'string' && typeof volume == 'number' && typeof weight == 'number') {

    if (checkWeightUsing(weight, volume)) {
      symbolOfWeight.innerText = '₽./кг';
      outputWeight.innerText = breakNumberIntoThousands(currentPath.weight);

      symbolOfVolume.innerText = 'м³';
      outputVolume.innerText = breakNumberIntoThousands(Math.ceil(volume));
    } else {
      symbolOfVolume.innerText = '₽./м³';
      outputVolume.innerText = breakNumberIntoThousands(currentPath.volume);
      
      symbolOfWeight.innerText = 'кг';
      outputWeight.innerText = breakNumberIntoThousands(Math.ceil(weight));
    }
  }
  if (typeof formulaResult == 'number') {
    outputTotalCost.innerText = breakNumberIntoThousands(Math.ceil(formulaResult));
  } else {
    outputTotalCost.innerText = '0';
  }
  if (calcStatusOutput) {
    if (typeof formulaResult == 'string') {
      calcStatusOutput.innerText = formulaResult;
      if (calcStatus && calcStatus.classList.contains('hidden')) {
        calcStatus.classList.remove('hidden');
      }
    } else if (calcStatus && !calcStatus.classList.contains('hidden')) {
      calcStatus.classList.add('hidden');
    }
  }
}
function getFormulaWithValues() {
  let newFormula = calcFormula;
  for (const aliasName in formulaAliases) {
    if (formulaAliases.hasOwnProperty(aliasName)) {
      const aliasValueFunc = formulaAliases[aliasName],
            aliasValue = aliasValueFunc(),
            regExpForReplacement = new RegExp(aliasName, 'g');
      if (typeof aliasValue == 'string') {
        return aliasValue;
      }
      newFormula = newFormula.replace(regExpForReplacement, aliasValue);
    }
  }
  return {
    formula : newFormula
  };
}
function calculateFormula(formulaData) {
  if (typeof formulaData == 'string') {
    return formulaData;
  }
  return (new Function('return ' + formulaData.formula + ';'))();
}
function checkWeightUsing(weight, volume) {
  return weight / volume > densityThreshold;
}
function getWeightOrVolume() {
  const weight = getWeight(),
        volume = getVolumeForOperations();
  if (typeof volume == 'string') {
    return volume;
  }
  if (typeof weight == 'string') {
    return weight;
  }
  if (checkWeightUsing(weight, volume)) {
    return weight;
  } else {
    return volume;
  }
}
function getVolume() {
  return Number(volumeElement.value) || 'Введите объем';
}
function getVolumeForOperations() {
  const volume = getVolume();
  if (typeof volume == 'string') {
    return volume;
  }
  if (typeof volume == 'number') {
    return Math.max(volume, 1);
  }
}
function getWeight() {
  return Number(weightElement.value) || 'Введите вес';
}
function getWeightPriceOrVolumePrice() {
  let weightPrice = getWeightPrice(),
      volumePrice = getVolumePrice();
  if (typeof volumePrice == 'string') {
    return volumePrice;
  }
  if (typeof weightPrice == 'string') {
    return weightPrice;
  }
  let weight = getWeight(),
      volume = getVolumeForOperations();
  if (typeof volume == 'string') {
    return volume;
  }
  if (typeof weight == 'string') {
    return weight;
  }
  if (checkWeightUsing(weight, volume)) {
    return getWeightPrice();
  } else {
    return getVolumePrice();
  }
}
function getVolumePrice() {
  let data = getCurrentPathData();
  if (typeof data == 'string') {
    return data;
  } else {
    return Number(data.volume);
  }
}
function getWeightPrice() {
  let data = getCurrentPathData();
  if (typeof data == 'string') {
    return data;
  } else {
    return Number(data.weight);
  }
}
function getSendingCities() {
  const cities = [];
  for (let pathIteration = 0; pathIteration < calcCitiesData.length; pathIteration++) {
    const path = calcCitiesData[pathIteration],
          city = path[0].c;
    if (cities.indexOf(city) == -1) {
      cities.push(city);
    }
  }
  return cities.sort();
}
function getRecipientCities() {
  const cities = [];
  for (let pathIteration = 0; pathIteration < calcCitiesData.length; pathIteration++) {
    const path = calcCitiesData[pathIteration],
          city = path[1].c;
    if (cities.indexOf(city) == -1) {
      cities.push(city);
    }
  }
  return cities.sort();
}
function getPathsForSendingCity(sendingCity) {
  const paths = [];
  for (let pathIteration = 0; pathIteration < calcCitiesData.length; pathIteration++) {
    const path = calcCitiesData[pathIteration],
          city = path[0].c;
    if (city == sendingCity) {
      paths.push(path);
    }
  }
  return paths;
}
function getPathsNotForSendingCity(sendingCity) {
  const paths = [];
  for (let pathIteration = 0; pathIteration < calcCitiesData.length; pathIteration++) {
    const path = calcCitiesData[pathIteration],
          city = path[0].c;
    if (city != sendingCity) {
      paths.push(path);
    }
  }
  return paths;
}
function getPathsForRecipientCity(recipientCity) {
  const paths = [];
  for (let pathIteration = 0; pathIteration < calcCitiesData.length; pathIteration++) {
    const path = calcCitiesData[pathIteration],
          city = path[1].c;
    if (city == recipientCity) {
      paths.push(path);
    }
  }
  return paths;
}
function getPathsNotForRecipientCity(recipientCity) {
  const paths = [];
  for (let pathIteration = 0; pathIteration < calcCitiesData.length; pathIteration++) {
    const path = calcCitiesData[pathIteration],
          city = path[1].c;
    if (city != recipientCity) {
      paths.push(path);
    }
  }
  return paths;
}
function getRecipientCitiesFor(sendingCity) {
  const paths = getPathsForSendingCity(sendingCity),
        cities = [];
  for (let pathIteration = 0; pathIteration < paths.length; pathIteration++) {
    const path = paths[pathIteration],
          recipientCity = path[1].c;
    if (cities.indexOf(recipientCity) == -1) {
      cities.push(recipientCity);
    }
  }
  return cities.sort();
}
function getRecipientCitiesNotFor(sendingCity) {
  const paths = getPathsNotForSendingCity(sendingCity),
        cities = [];
  for (let pathIteration = 0; pathIteration < paths.length; pathIteration++) {
    const path = paths[pathIteration],
          recipientCity = path[1].c;
    if (cities.indexOf(recipientCity) == -1) {
      cities.push(recipientCity);
    }
  }

  const citiesForSending = getRecipientCitiesFor(sendingCity);
  return cities.filter(city => {
    return citiesForSending.indexOf(city) == -1;
  }).sort();
}
function getSendingCitiesFor(recipientCity) {
  const paths = getPathsForRecipientCity(recipientCity),
        cities = [];
  for (let pathIteration = 0; pathIteration < paths.length; pathIteration++) {
    const path = paths[pathIteration],
          sendingCity = path[0].c;
    if (cities.indexOf(sendingCity) == -1) {
      cities.push(sendingCity);
    }
  }
  return cities.sort();
}
function getSendingCitiesNotFor(recipientCity) {
  const paths = getPathsNotForRecipientCity(recipientCity),
        cities = [];
  for (let pathIteration = 0; pathIteration < paths.length; pathIteration++) {
    const path = paths[pathIteration],
          sendingCity = path[0].c;
    if (cities.indexOf(sendingCity) == -1) {
      cities.push(sendingCity);
    }
  }
  
  const citiesForRecipient = getSendingCitiesFor(recipientCity);
  return cities.filter(city => {
    return citiesForRecipient.indexOf(city) == -1;
  }).sort();
}
function getPathData(sendingCity, recipientCity) {
  if (sendingCity == '') {
    return 'Выберите город отправления';
  }
  if (recipientCity == '') {
    return 'Выберите город прибытия';
  }
  for (let pathIteration = 0; pathIteration < calcCitiesData.length; pathIteration++) {
    const path = calcCitiesData[pathIteration],
          sendingCityFromPath = path[0].c,
          recipientCityFromPath = path[1].c,
          weightPrice = path[2].c,
          volumePrice = path[3].c;
    if (sendingCityFromPath == sendingCity && recipientCityFromPath == recipientCity) {
      return {
        weight : Number(weightPrice),
        volume : Number(volumePrice)
      };
    }
  }
}

function getCurrentPathData() {
  return getPathData(getCurrentSendingCity(), getCurrentRecipientCity());
}

function getCurrentSendingCity() {
  return sendingCitiesListElement.getElementsByClassName('js-calc-list-output')[0].innerHTML;
}
function getCurrentRecipientCity() {
  return recipientCitiesListElement.getElementsByClassName('js-calc-list-output')[0].innerHTML;
}

function breakNumberIntoThousands(number) {
  let string = String(number),
      beforeAndAfterPoint = string.split('.'),
      beforePoint = beforeAndAfterPoint[0],
      afterPoint = beforeAndAfterPoint[1],
      inThousands = beforePoint.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 "),
      unitedString = afterPoint ? [inThousands, afterPoint].join('.') : inThousands;
  return unitedString;
}
function prepareValueForOperations(sourceValue) {
  return Number(sourceValue.replace(/\s/g, '').replace(/ /g, '').replace(/&nbsp/g, '').match(/[\d.\-\+]+/i));
}

function checkThousandsInNumber(number) {
  return String(number).match(/\d *\d\d\d$/);
}
function removeThousandsFromNumber(number) {
  if (checkThousandsInNumber(number)) {
    return Number(String(number).replace(/\d\d\d$/, ''));
  }
  return number;
}

function createTextDuplicateElement(inputValueElement) {
  const newElement = document.createElement('span');
  newElement.setAttribute('data-text-duplicate-for', inputValueElement.id);
  newElement.classList.add('text-duplicate_' + inputValueElement.id);
  newElement.classList.add('text-duplicate');
  document.body.appendChild(newElement);
}
function getTextWidth(inputValueElement) {
  const textDuplicateElement = document.querySelector(`[data-text-duplicate-for="${inputValueElement.id}"]`);
  textDuplicateElement.innerText = inputValueElement.value;
  if (textDuplicateElement.style.maxWidth != `${inputValueElement.offsetWidth}px`) {
    textDuplicateElement.style.maxWidth = `${inputValueElement.offsetWidth}px`;
  }
  return textDuplicateElement.offsetWidth;
}

function sendingCityOperations(cityElement, scriptOwner = false) {
  const sendingCity = cityElement.innerHTML,
        valueOutput = cityElement.parentElement.parentElement.parentElement.getElementsByClassName('js-calc-list-output')[0],
        values = getRecipientCitiesFor(sendingCity);
  valueOutput.innerHTML = sendingCity;
  outputAddressFrom.innerText = sendingCity;
  if (values.length > 0 && values.indexOf(recipientCityOutput.innerText) == -1) {
    outputAddressTo.innerHTML = 'Прибытие';
  }
  if (!scriptOwner) {
    insertValuesToList([
      {
        values : values,
        markedValues : getRecipientCitiesNotFor(sendingCity),
        list : recipientCitiesListElement,
        callback : recipientCityOperations,
        markedTitle : 'Нет доставки из города ' + sendingCity
      }
    ]);
  }
  doFormula();
}

function recipientCityOperations(cityElement, scriptOwner = false) {
  const recipientCity = cityElement.innerHTML,
        valueOutput = cityElement.parentElement.parentElement.parentElement.getElementsByClassName('js-calc-list-output')[0],
        values = getSendingCitiesFor(recipientCity);
  valueOutput.innerHTML = recipientCity;
  outputAddressTo.innerText = recipientCity;
  if (values.length > 0 && values.indexOf(sendingCityOutput.innerText) == -1) {
    outputAddressFrom.innerHTML = 'Отправление';
  }
  if (!scriptOwner) {
    insertValuesToList([
      {
        values : values,
        markedValues : getSendingCitiesNotFor(recipientCity),
        list : sendingCitiesListElement,
        callback : sendingCityOperations,
        markedTitle : 'Нет доставки в город ' + recipientCity
      }
    ]);
  }
  doFormula();
}

if (typeof calcFormula != 'undefined') {
  insertValuesToList([
    {
      values : getSendingCities(),
      list : sendingCitiesListElement,
      callback : sendingCityOperations
    },
    {
      values : getRecipientCities(),
      list : recipientCitiesListElement,
      callback : recipientCityOperations
    }
  ], 'init');
}

function insertValuesToList(allValues, init = false) {
  for (let i = 0; i < allValues.length; i++) {
    const valuesProperties = allValues[i],
          values = valuesProperties.values,
          markedValues = valuesProperties.markedValues || [],
          markedTitle = valuesProperties.markedTitle || 'Нет доставки',
          list = valuesProperties.list,
          valueOutput = list.getElementsByClassName('js-calc-list-output')[0],
          itemsOutput = list.getElementsByClassName('js-calc-list-items')[0];
    if (!init && values.length > 0 && values.indexOf(valueOutput.innerText) == -1) {
      deactivateListButton(list);
      valueOutput.innerHTML = '';
    }
    if (init && values.length == 1) {
      itemsOutput.innerHTML = '';
      const value = values[0],
            newElement = document.createElement('div');
      newElement.classList.add('calc__list-item');
      newElement.classList.add('js-calc-list-item');
      // newElement.setAttribute('onclick', `${valuesProperties.callback}(this);`);
      newElement.innerHTML = value;

      let elementOnPage = itemsOutput.appendChild(newElement);
      elementOnPage.addEventListener('click', () => {
        valuesProperties.callback(elementOnPage);
        selectItemInList(list);
      });
      setTimeout(() => {
        valuesProperties.callback(elementOnPage, 'scriptOwner');
        selectItemInList(list);
        list.classList.add('calc__list_one-item');
      }, 1);
      if (markedValues.length > 0) {
        itemsOutput.appendChild(document.createElement('hr'));
        for (let valuesIteration = 0; valuesIteration < markedValues.length; valuesIteration++) {
          const value = markedValues[valuesIteration],
                newElement = document.createElement('div');
          newElement.classList.add('calc__list-item');
          newElement.classList.add('calc__list-item_marked');
          newElement.classList.add('js-calc-list-item');
          newElement.setAttribute('title', markedTitle);
          // newElement.setAttribute('onclick', `${valuesProperties.callback}(this);`);
          newElement.innerHTML = value;
  
          let elementOnPage = itemsOutput.appendChild(newElement);
          elementOnPage.addEventListener('click', () => {
            valuesProperties.callback(elementOnPage);
            selectItemInList(list);
          });
        }
      }
    } else {
      if (list.classList.contains('calc__list_one-item') && (values.indexOf(valueOutput.innerText) == -1 || values.length > 1)) {
        list.classList.remove('calc__list_one-item');
      }
      if (init || (itemsOutput.innerHTML.indexOf(valueOutput.innerHTML) == -1)) {
        valueOutput.innerHTML = '';
      }
      itemsOutput.innerHTML = '';
      for (let valuesIteration = 0; valuesIteration < values.length; valuesIteration++) {
        const value = values[valuesIteration],
              newElement = document.createElement('div');
        newElement.classList.add('calc__list-item');
        newElement.classList.add('js-calc-list-item');
        // newElement.setAttribute('onclick', `${valuesProperties.callback}(this);`);
        newElement.innerHTML = value;

        let elementOnPage = itemsOutput.appendChild(newElement);
        elementOnPage.addEventListener('click', () => {
          valuesProperties.callback(elementOnPage);
          selectItemInList(list);
        });
      }
      if (markedValues.length > 0) {
        itemsOutput.appendChild(document.createElement('hr'));
        for (let valuesIteration = 0; valuesIteration < markedValues.length; valuesIteration++) {
          const value = markedValues[valuesIteration],
                newElement = document.createElement('div');
          newElement.classList.add('calc__list-item');
          newElement.classList.add('calc__list-item_marked');
          newElement.classList.add('js-calc-list-item');
          newElement.setAttribute('title', markedTitle);
          // newElement.setAttribute('onclick', `${valuesProperties.callback}(this);`);
          newElement.innerHTML = value;
  
          let elementOnPage = itemsOutput.appendChild(newElement);
          elementOnPage.addEventListener('click', () => {
            valuesProperties.callback(elementOnPage);
            selectItemInList(list);
          });
        }
      }
    }
  }
}

const inputs = document.getElementsByClassName('js-calc-input');
for (let inputIteration = 0; inputIteration < inputs.length; inputIteration++) {
  const input = inputs[inputIteration],
        inputValueElement = input.getElementsByClassName('js-calc-input-value')[0],
        inputValueSign = input.getElementsByClassName('js-calc-input-value-sign')[0];
  
  createTextDuplicateElement(inputValueElement);
  input.addEventListener('click', () => {
    input.classList.remove('deactivated');
  });
  inputValueElement.addEventListener('focus', () => {
    input.classList.remove('deactivated');
  });
  input.addEventListener('keydown', e => {
    if (e.keyCode == 9 && inputValueElement.value == '') {
      input.classList.add('deactivated');
    }
  });
  document.addEventListener('click', e => {
    if (!input.classList.contains('deactivated') && inputValueElement.value == '' && checkThatCurrentElementExistsOutside(input, e.target)) {
      input.classList.add('deactivated');
    }
  });
  window.addEventListener('blur', () => {
    if (!input.classList.contains('deactivated') && inputValueElement.value == '') {
      input.classList.add('deactivated');
    }
  });
  inputValueElement.addEventListener('input', () => {
    if (inputValueSign && inputValueElement.value != '') {
      inputValueSign.style.left = `${Math.max(getTextWidth(inputValueElement), 0)}px`;
    }
    if (typeof calcFormula != 'undefined') {
      doFormula();
    }
  });
  
  if (typeof inputValueSign != 'undefined') {
    inputValueElement.addEventListener('keyup', () => {
      if (inputValueSign && inputValueElement.value != '' && inputValueSign.classList.contains('hidden')) {
        inputValueSign.classList.remove('hidden');
      } else if (inputValueSign && inputValueElement.value == '' && !inputValueSign.classList.contains('hidden')) {
        inputValueSign.classList.add('hidden');
      }
    });
  }
}


const lists = document.getElementsByClassName('js-calc-list'),
      listsBackground = document.getElementsByClassName('js-calc-lists-background')[0];

let listCanToggle = true;
for (let listIteration = 0; listIteration < lists.length; listIteration++) {
  const list = lists[listIteration],
        listButton = list.getElementsByClassName('js-calc-list-button')[0],
        items = list.getElementsByClassName('js-calc-list-item'),
        input = list.getElementsByClassName('js-calc-list-items-search')[0];
  
  listButton.addEventListener('click', () => {
    if (listCanToggle && !list.classList.contains('calc__list_one-item')) {
      if (list.classList.contains('list-disabled')) {
        list.classList.remove('list-disabled');
        setTimeout(() => {
          list.classList.remove('collapsed');
        }, 1);
        showCalcListsBackground();
        if (window.innerWidth > 768) {
          input.focus();
        }
      } else {
        closeItemsList(list);
      }
    }
  });
  document.addEventListener('click', e => {
    if (!list.classList.contains('collapsed') && checkThatCurrentElementExistsOutside(listButton, e.target) && document.activeElement.tagName != 'INPUT' && !e.target.classList.contains('calc__list-items-search')) {
      closeItemsList(list);
    }
  });
  listsBackground.addEventListener('click', () => {
    if (!list.classList.contains('collapsed')) {
      closeItemsList(list);
    }
  });
  document.body.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !list.classList.contains('collapsed')) {
      closeItemsList(list);
    }
  });
  document.body.addEventListener('keyup', e => {
    let activeItem;
    if (
      e.key === 'Enter'
      && !list.classList.contains('collapsed')
      && Array.from(items).filter(item => {
        if (!item.classList.contains('disabled')) {
          activeItem = item;
          return true;
        } else {
          return false;
        }
      }).length == 1
    ) {
      // selectItemInList(list);
      activeItem.click();
    }
  });
}

function deactivateListButton(list) {
  const button = list.getElementsByClassName('js-calc-list-button')[0];
  
  button.classList.add('deactivated');
}
function selectItemInList(list) {
  const items = list.getElementsByClassName('js-calc-list-item'),
        searchInput = list.getElementsByClassName('js-calc-list-items-search')[0],
        button = list.getElementsByClassName('js-calc-list-button')[0];
  
  button.classList.remove('deactivated');
  closeItemsList(list);
  setTimeout(() => {
    searchInput.value = '';
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      item.classList.remove('disabled');
    }
  }, 250);
}
function closeItemsList(list) {
  listCanToggle = false;
  list.classList.add('collapsed');
  setTimeout(() => {
    list.classList.add('list-disabled');
  }, 200);
  hideCalcListsBackground();
}

function showCalcListsBackground() {
  listsBackground.classList.remove('disabled');
  setTimeout(() => {
    listsBackground.classList.remove('hidden');
  }, 1);
}
function hideCalcListsBackground() {
  listsBackground.classList.add('hidden');
  setTimeout(() => {
    listsBackground.classList.add('disabled');
    listCanToggle = true;
  }, 300);
}

const calcSearchInputs = document.getElementsByClassName('js-calc-list-items-search');
for (let calcSearchInputIteration = 0; calcSearchInputIteration < calcSearchInputs.length; calcSearchInputIteration++) {
  const input = calcSearchInputs[calcSearchInputIteration];
  input.addEventListener('input', () => {
    searchCity(input);
  });
}

function searchCity(searchElement) {
  const searchValue = searchElement.value.trim(),
        items = searchElement.parentElement.parentElement.getElementsByClassName('js-calc-list-item');
  
  if (searchValue != '') {
    const regExpForSearchValue = new RegExp('(^|- *)' + searchValue, 'i');
    for (let i = 0; i < items.length; i++) {
      const item = items[i],
            cityName = item.innerText;
      if (!cityName.match(regExpForSearchValue)) {
        item.classList.add('disabled');
      } else {
        item.classList.remove('disabled');
      }
    }
  } else {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      item.classList.remove('disabled');
    }
  }
}
(function() {
  const employeesContainer = document.getElementsByClassName('js-slider-employees')[0],
        employeesLeftButton = document.getElementsByClassName('js-slider-employees-left')[0],
        employeesRightButton = document.getElementsByClassName('js-slider-employees-right')[0];
  if (employeesContainer) {
    const employeesSlider = tns({
      container: employeesContainer,
      items: 4,
      slideBy: 1,
      prevButton: employeesLeftButton,
      nextButton: employeesRightButton,
      gutter: 30,
      fixedWidth: 272,
      nav: false,
      loop: false,
      swipeAngle: 30,
      preventScrollOnTouch: 'force',
      responsive: {
        1181: {
          fixedWidth: 272,
          gutter: 30,
        },
        556: {
          fixedWidth: 231,
          gutter: 34,
        },
        349: {
          fixedWidth: 272,
          gutter: 30,
        },
        1: {
          fixedWidth: 231,
          gutter: 34,
        }
      }
    });

    employeesRightButton.addEventListener('click', () => {
      const info = employeesSlider.getInfo();
      if (info.index >= info.slideItems.length - 1) {
        employeesRightButton.setAttribute('aria-disabled', 'true');
      }
    });
  }

  let imageGallery2Exists = false;
  const imageGallery2ShowingButton = document.getElementsByClassName('js-show-image-gallery-2')[0];
  if (imageGallery2ShowingButton) {
    imageGallery2ShowingButton.addEventListener('click', () => {
      if (!imageGallery2Exists) {
        imageGallery2Exists = true;
        setTimeout(() => {
          imageGalleryCarouselInit(
            document.getElementsByClassName('js-slider-image-gallery-2')[0],
            document.getElementsByClassName('js-slider-image-gallery-2-left')[0],
            document.getElementsByClassName('js-slider-image-gallery-2-right')[0]
          );
        }, 100);
      }
    });
  }

  const imageGallery1Container = document.getElementsByClassName('js-slider-image-gallery-1')[0],
        imageGallery1LeftButton = document.getElementsByClassName('js-slider-image-gallery-1-left')[0],
        imageGallery1RightButton = document.getElementsByClassName('js-slider-image-gallery-1-right')[0];
  if (imageGallery1Container) {
    imageGalleryCarouselInit(
      imageGallery1Container,
      imageGallery1LeftButton,
      imageGallery1RightButton,
    );
  }

  const imageGalleryInnerContainer = document.getElementsByClassName('js-slider-image-gallery-inner')[0],
        imageGalleryInnerLeftButton = document.getElementsByClassName('js-slider-image-gallery-inner-left')[0],
        imageGalleryInnerRightButton = document.getElementsByClassName('js-slider-image-gallery-inner-right')[0];
  if (imageGalleryInnerContainer && window.innerWidth > 1000) {
    imageGalleryCarouselInit(
      imageGalleryInnerContainer,
      imageGalleryInnerLeftButton,
      imageGalleryInnerRightButton,
      {
        fixedWidth: 200
      }
    );
  }
  
  function imageGalleryCarouselInit(container, leftButton, rightButton, settings = {
    fixedWidth: 272,
    responsive: {
      1251: {
        fixedWidth: 272,
      },
      701: {
        fixedWidth: 168,
      },
      1: {
        fixedWidth: false
      }
    }
  }) {
    let imageGallerySlider;

    imageGallerySlider = imageGalleryCarouselRegister(container, leftButton, rightButton, settings);
  }
  
  function imageGalleryCarouselRegister(container, leftButton, rightButton, settings) {
    let imageGallerySlider = tns({...{
      container: container,
      prevButton: leftButton,
      nextButton: rightButton,
      items: 1,
      slideBy: 1,
      gutter: 30,
      swipeAngle: 30,
      preventScrollOnTouch: 'force',
      nav: false,
      loop: false,
    }, ...settings})
    ;
    imageGalleryCarouselFunctional(imageGallerySlider, container);
  
    rightButton.addEventListener('click', () => {
      const info = imageGallerySlider.getInfo();
      if (info.index >= info.slideItems.length - 1) {
        rightButton.setAttribute('aria-disabled', 'true');
      }
    });

    return imageGallerySlider;
  }

  function imageGalleryCarouselFunctional(slider, sliderElement) {
    let initTouch, directionToRight;

    slider.events.on('indexChanged', (info, eventName) => {
      const currentItem = info.slideItems[info.index];
      if (currentItem) {
        if (!currentItem.classList.contains('tns-slide-move-position') && !currentItem.classList.contains('tns-slide-active')) {
          currentItem.classList.add('tns-slide-active');
        }
        
        if (currentItem.classList.contains('tns-slide-deactivated')) {
          currentItem.classList.remove('tns-slide-deactivated');
        }
        const lastIndexLength = info.index;
        for (let itemIteration = 0; itemIteration < lastIndexLength; itemIteration++) {
          const lastItem = info.slideItems[itemIteration];
          if (lastItem) {
            if (!lastItem.classList.contains('tns-slide-deactivated') && window.innerWidth > 700) {
              lastItem.classList.add('tns-slide-deactivated');
            }
          }
        }
        for (let itemIteration = 0; itemIteration < info.slideItems.length; itemIteration++) {
          const item = info.slideItems[itemIteration];
          if (item.classList.contains('tns-slide-move-position')) {
            item.classList.remove('tns-slide-move-position');
          }
        }
      }
    });
    slider.events.on('touchStart', (info, eventName) => {
      initTouch = info.event.changedTouches[0].clientX;
      
      for (let itemIteration = 0; itemIteration < info.slideItems.length; itemIteration++) {
        const item = info.slideItems[itemIteration];
        if (item) {
          if (!item.classList.contains('tns-slide-move-position')) {
            item.classList.add('tns-slide-move-position');
          }
          if (item.classList.contains('tns-slide-deactivated')) {
            item.classList.remove('tns-slide-deactivated');
          }
          if (item.classList.contains('tns-slide-active')) {
            item.classList.remove('tns-slide-active');
          }
        }
      }
    });
    slider.events.on('touchEnd', (info, eventName) => {
      for (let itemIteration = 0; itemIteration < info.slideItems.length; itemIteration++) {
        const item = info.slideItems[itemIteration];
        if (item) {
          if (item.classList.contains('tns-slide-move-position')) {
            item.classList.remove('tns-slide-move-position');
          }
        }
      }
      if (!directionToRight && info.index === 0) {
        const currentItem = info.slideItems[info.index];
        currentItem.classList.add('tns-slide-active');
      }
      if (directionToRight && info.index === info.slideItems.length - 1) {
        const lastElement = info.slideItems[info.index];
        lastElement.classList.add('tns-slide-active');
      }
    });
    sliderElement.addEventListener('touchmove', (e) => {
      const currentTouch = e.changedTouches[0].clientX;
      
      directionToRight = initTouch > currentTouch;
    });
  }
}());
const changingTransformViaScrollElements = document.getElementsByClassName('js-change-transform-via-scroll'),
      changingTransformViaElementPositionElements = document.getElementsByClassName('js-change-transform-via-element-position'),
      cacheOfChangingTransformViaElementPositionElements = [];

for (let i = 0; i < changingTransformViaScrollElements.length; i++) {
  const transformingElement = changingTransformViaScrollElements[i],
        scrollMod = transformingElement.getAttribute('data-scroll-mod') || 1;
  changeTransformViaScroll(transformingElement, scrollMod);
  window.addEventListener('scroll', () => {
    changeTransformViaScroll(transformingElement, scrollMod);
  });
}
for (let i2 = 0; i2 < changingTransformViaElementPositionElements.length; i2++) {
  const transformingElement = changingTransformViaElementPositionElements[i2],
        elementForMeasure = document.querySelector(transformingElement.getAttribute('data-element'));
  if (elementForMeasure) {
    changeTransformViaElementPosition(transformingElement, elementForMeasure);
    window.addEventListener('scroll', () => {
      changeTransformViaElementPosition(transformingElement, elementForMeasure);
    });
  }
}

function changeTransformViaScroll(element, scrollMod = 1) {
  const currentScroll = window.pageYOffset,
        newTransform = currentScroll * scrollMod - 100;
  if (newTransform >= 0) {
    element.style.transform = 'translateY(0%)';
  } else {
    element.style.transform = `translateY(${newTransform}%)`;
  }
}
function changeTransformViaElementPosition(transformingElement, elementForMeasure) {
  const elementForMeasurePosition = window.innerHeight - elementForMeasure.getBoundingClientRect().y,
        transformingElementHeightOffset = transformingElement.offsetHeight - 100,
        newTransform = 100 - (elementForMeasurePosition - transformingElementHeightOffset),
        elementInitHeight = cacheOfChangingTransformViaElementPositionElements[String(transformingElement.classList)] || transformingElement.offsetHeight;
  if (!cacheOfChangingTransformViaElementPositionElements[String(transformingElement.classList)]) {
    cacheOfChangingTransformViaElementPositionElements[String(transformingElement.classList)] = elementInitHeight;
  }
  if (newTransform <= 0) {
    transformingElement.style.transform = 'translateY(0px)';
  } else if (newTransform >= elementInitHeight) {
    transformingElement.style.transform = `translateY(${elementInitHeight}px)`;
  } else {
    transformingElement.style.transform = `translateY(${newTransform}px)`;
  }
}
(function() {
  const blockGroups = document.querySelectorAll('[data-block-group]');
  let registeredGroups = [];

  for (let blockGroupIteration = 0; blockGroupIteration < blockGroups.length; blockGroupIteration++) {
    const blockGroup = blockGroups[blockGroupIteration],
          blockGroupName = blockGroup.getAttribute('data-block-group');
    if (registeredGroups.indexOf(blockGroupName) == -1) {
      registeredGroups.push(blockGroupName);
      registerGroup(blockGroupName);
    }
  }

  function registerGroup(blockGroupName) {
    const allBlocks = document.querySelectorAll(`[data-block-group="${blockGroupName}"]`),
          blockChangers = document.querySelectorAll(`[data-block-group-of-changer="${blockGroupName}"]`);
    
    for (let blockChangerIteration = 0; blockChangerIteration < blockChangers.length; blockChangerIteration++) {
      const blockChanger = blockChangers[blockChangerIteration],
            blockName = blockChanger.getAttribute('data-block-changer'),
            block = document.querySelector(`[data-changing-block="${blockName}"]`),
            mainBlockHiddenToBottom = block.classList.contains('hidden-to-bottom');
      
      blockChanger.addEventListener('click', () => {
        if (!blockChanger.classList.contains('active') && block.classList.contains('disabled')) {
          blockChanger.classList.add('active');

          for (let otherBlockChangerIteration = 0; otherBlockChangerIteration < blockChangers.length; otherBlockChangerIteration++) {
            const otherBlockChanger = blockChangers[otherBlockChangerIteration],
                  otherBlockChangerName = otherBlockChanger.getAttribute('data-block-changer');
            if (otherBlockChangerName !== blockName) {
              otherBlockChanger.classList.remove('active');
            }
          }
          block.classList.remove('disabled');
          setTimeout(() => {
            if (mainBlockHiddenToBottom) {
              block.classList.remove('hidden-to-bottom');
            }
            if (!mainBlockHiddenToBottom) {
              block.classList.remove('hidden-to-top');
            }
          }, 100);

          for (let otherBlockIteration = 0; otherBlockIteration < allBlocks.length; otherBlockIteration++) {
            const otherBlock = allBlocks[otherBlockIteration],
                  otherBlockName = otherBlock.getAttribute('data-changing-block');
            if (otherBlockName !== blockName) {
              if (!otherBlock.classList.contains('hidden-to-top') && !otherBlock.classList.contains('hidden-to-bottom')) {
                if (mainBlockHiddenToBottom) {
                  otherBlock.classList.add('hidden-to-top');
                }
                if (!mainBlockHiddenToBottom) {
                  otherBlock.classList.add('hidden-to-bottom');
                }
                setTimeout(() => {
                  otherBlock.classList.add('disabled');
                }, 410);
              }
            }
          }
        }
      });
    }
  }
}());
function checkChangesInElement(element, callback) {
  const observer = new MutationObserver(function(mutations) {
          callback();
        }),
        config = { attributes: true, childList: true, characterData: true, subtree: true };
  
  observer.observe(element, config);
}
const form = document.getElementsByClassName('js-form')[0],
      phoneFields = document.getElementsByClassName('js-phone-field');

if (phoneFields && typeof callPopUpPhoneMask != 'undefined' && callPopUpPhoneMask === true) {
  for (let i = 0; i < phoneFields.length; i++) {
    const phoneField = phoneFields[i];
    IMask(phoneField, {
      mask : '{+}0{ (}`000{) }`000{ - }`00{ - }`00',
    });
  }
}

if (form) {
  form.onsubmit = () => {
    return formConfirmation(form);
  }
}

function lookAtMeAnimation(object) {
  if (!object.classList.contains('look-at-me')) {
    object.classList.add('look-at-me');
    setTimeout(() => {
      object.classList.remove('look-at-me');
    }, 750);
  }
}

function checkInputIsEmpty(input) {
  return (input.getAttribute('type') == 'checkbox' && !input.checked) || (input.getAttribute('type') == 'tel' && (input.value == '' || input.value == '+7 (___) ___ - __ - __' || !input.value.match(/\+*\d \(\d\d\d\) \d\d\d - \d\d - \d\d/))) || (input.tagName == 'INPUT' && input.value == '') || (input.tagName == 'DIV' && (input.innerText == '' || input.innerText == 'Не выбрано'));
}

function doFocusOnEmptyInput(form) {
  let fields = form.getElementsByClassName('js-form-field');
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i],
          input = field.getElementsByClassName('js-form-input')[0];
    if (checkInputIsEmpty(input)) {
      if (field.classList.contains('deactivated')) {
        field.classList.remove('deactivated');
      }
      if (input.getAttribute('type') == 'checkbox') {
        if (!checkElementVisibility(field)) {
          smoothScrollToElement(field, window.innerHeight / 2);
        }
      } else {
        if (!checkElementVisibility(field, -23)) {
          smoothScrollToElement(field, window.innerHeight / 2);
        }
        input.focus();
      }
      lookAtMeAnimation(field);
      return true;
    }
  }
  return false;
}

function formConfirmation(form) {
  return !doFocusOnEmptyInput(form);
}

function checkElementVisibility(element, offset = 0) {
  let bottomScreenY = window.pageYOffset + window.innerHeight,
      yElementPositionRelativeToTheScreen = window.pageYOffset + element.getBoundingClientRect().y;
  return (yElementPositionRelativeToTheScreen < bottomScreenY) && element.getBoundingClientRect().y > offset;
}
(function() {
  const headerMenu = document.getElementsByClassName('js-header-menu')[0],
        headerMenuContainer = document.getElementsByClassName('js-header-menu-container')[0],
        openingButtons = document.getElementsByClassName('js-open-header-menu'),
        closingButtons = document.getElementsByClassName('js-close-header-menu'),
        animationButtons = document.getElementsByClassName('js-header-button-animation'),
        links = headerMenu.getElementsByTagName('a');
  for (let i = 0; i < openingButtons.length; i++) {
    const openingButton = openingButtons[i];
    openingButton.addEventListener('click', () => {
      if (headerMenu.classList.contains('disabled')) {
        openHeaderMenu();
      }
    });
  }
  for (let i = 0; i < [...closingButtons, ...links].length; i++) {
    const closingButton = [...closingButtons, ...links][i];
    closingButton.addEventListener('click', () => {
      if (!headerMenu.classList.contains('hidden')) {
        closeHeaderMenu();
      }
    });
  }

  function openHeaderMenu() {
    headerMenu.classList.remove('disabled');
    if (!checkScrollbarIn(headerMenu)) {
      blockScrollBarIn(headerMenuContainer, 'cached');
    }
    headerMenu.classList.remove('hidden');
    blockScroll();
    turnOnAnimationForButtons();
  }
  function closeHeaderMenu() {
    turnOffAnimationForButtons();
    headerMenu.classList.add('hidden');
    setTimeout(() => {
      unblockScroll();
      headerMenu.classList.add('disabled');
    }, 220);
  }

  function turnOnAnimationForButtons() {
    for (let i = 0; i < animationButtons.length; i++) {
      const animationButton = animationButtons[i];
      if (!animationButton.classList.contains('active')) {
        animationButton.classList.add('active');
      }
    }
  }
  function turnOffAnimationForButtons() {
    for (let i = 0; i < animationButtons.length; i++) {
      const animationButton = animationButtons[i];
      if (animationButton.classList.contains('active')) {
        animationButton.classList.remove('active');
      }
    }
  }
  document.body.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !headerMenu.classList.contains('hidden')) {
      closeHeaderMenu();
    }
  });

  const headerMenuServicesButton = document.getElementsByClassName('js-header-menu-services-button')[0],
        headerMenuServicesList = document.getElementsByClassName('js-header-menu-services-list')[0];
  
  headerMenuServicesButton.addEventListener('click', () => {
    if (!headerMenuServicesButton.classList.contains('active')) {
      headerMenuServicesButton.classList.add('active');
      headerMenuServicesList.classList.remove('hidden');
    } else {
      headerMenuServicesList.classList.add('hidden');
      headerMenuServicesButton.classList.remove('active');
    }
  });
}());
function lookAtMe(object) {
  if (!object.classList.contains('look-at-me')) {
    object.classList.add('look-at-me');
    setTimeout(() => {
      object.classList.remove('look-at-me');
    }, 750);
  }
}
(function() {
  const popUps = document.querySelectorAll('[data-pop-up]');

  for (let i = 0; i < popUps.length; i++) {
    const popUp = popUps[i],
          popUpName = popUp.getAttribute('data-pop-up'),
          popUpButtons = document.querySelectorAll(`[data-pop-up-button="${popUpName}"]`),
          popUpContent = popUp.querySelector('[data-pop-up-content]');
    for (let buttonIteration = 0; buttonIteration < popUpButtons.length; buttonIteration++) {
      const popUpButton = popUpButtons[buttonIteration];
      popUpButton.addEventListener('click', () => {
        if (popUp.classList.contains('disabled')) {
          showPopUp(popUp);
        }
      });
    }
    popUp.addEventListener('click', e => {
      if (!popUp.classList.contains('hidden') && checkThatCurrentElementExistsOutside(popUpContent, e.target)) {
        hidePopUp(popUp);
      }
    });
    document.body.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !popUp.classList.contains('hidden')) {
        hidePopUp(popUp);
      }
    });
  }

  function showPopUp(popUp) {
    popUp.classList.remove('disabled');
    blockScroll();
    setTimeout(() => {
      popUp.classList.remove('hidden');
    }, 20);
  }
  
  function hidePopUp(popUp) {
    popUp.classList.add('hidden');
    setTimeout(() => {
      popUp.classList.add('disabled');
      unblockScroll();
    }, 220);
  }
}());
function smoothScrollTo(selector, offset = 0, mobileOffset = offset) {
  // try {
    let elementY;
    if (window.innerWidth > 380) {
      elementY = document.querySelector(selector).getBoundingClientRect().y + window.pageYOffset - offset;
    } else {
      elementY = document.querySelector(selector).getBoundingClientRect().y + window.pageYOffset - mobileOffset;
    }
    window.scrollTo({top: elementY, behavior: 'smooth'});
    return false;
  // } catch (error) {
  //   return true;
  // }
}

function smoothScrollToElement(element, offset = 0, mobileOffset = offset) {
  // try {
    let elementY;
    if (window.innerWidth > 380) {
      elementY = element.getBoundingClientRect().y + window.pageYOffset - offset;
    } else {
      elementY = element.getBoundingClientRect().y + window.pageYOffset - mobileOffset;
    }
    window.scrollTo({top: elementY, behavior: 'smooth'});
    return false;
  // } catch (error) {
  //   return true;
  // }
}

(function() {
  const links = document.getElementsByTagName('a');
  for (let i = 0; i < links.length; i++) {
    const link = links[i],
          anchorArray = link.href.match(/#\w+(-*\w+)*/i);
    if (anchorArray) {
      const anchor = anchorArray[0],
            targetElement = document.querySelector(anchor);
      if (targetElement) {
        link.setAttribute('onclick', `return smoothScrollTo("${anchor}");`);
      }
    }
  }
}());