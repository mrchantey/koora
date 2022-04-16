/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../node_modules/lodash.debounce/index.js":
/*!***************************************************!*\
  !*** ../../node_modules/lodash.debounce/index.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = debounce;


/***/ }),

/***/ "./src/constants/index.ts":
/*!********************************!*\
  !*** ./src/constants/index.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KeyboardCode": () => (/* reexport safe */ _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode),
/* harmony export */   "keyboardCodeMap": () => (/* reexport safe */ _keyboardCodeMap__WEBPACK_IMPORTED_MODULE_1__.keyboardCodeMap)
/* harmony export */ });
/* harmony import */ var _keyboardCode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./keyboardCode */ "./src/constants/keyboardCode.ts");
/* harmony import */ var _keyboardCodeMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./keyboardCodeMap */ "./src/constants/keyboardCodeMap.ts");




/***/ }),

/***/ "./src/constants/keyboardCode.ts":
/*!***************************************!*\
  !*** ./src/constants/keyboardCode.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KeyboardCode": () => (/* binding */ KeyboardCode)
/* harmony export */ });
var KeyboardCode;
(function (KeyboardCode) {
    KeyboardCode[KeyboardCode["Backspace"] = 0] = "Backspace";
    KeyboardCode[KeyboardCode["Tab"] = 1] = "Tab";
    KeyboardCode[KeyboardCode["Enter"] = 2] = "Enter";
    KeyboardCode[KeyboardCode["ShiftLeft"] = 3] = "ShiftLeft";
    KeyboardCode[KeyboardCode["ShiftRight"] = 4] = "ShiftRight";
    KeyboardCode[KeyboardCode["ControlLeft"] = 5] = "ControlLeft";
    KeyboardCode[KeyboardCode["ControlRight"] = 6] = "ControlRight";
    KeyboardCode[KeyboardCode["AltLeft"] = 7] = "AltLeft";
    KeyboardCode[KeyboardCode["AltRight"] = 8] = "AltRight";
    KeyboardCode[KeyboardCode["Pause"] = 9] = "Pause";
    KeyboardCode[KeyboardCode["CapsLock"] = 10] = "CapsLock";
    KeyboardCode[KeyboardCode["Escape"] = 11] = "Escape";
    KeyboardCode[KeyboardCode["Space"] = 12] = "Space";
    KeyboardCode[KeyboardCode["PageUp"] = 13] = "PageUp";
    KeyboardCode[KeyboardCode["PageDown"] = 14] = "PageDown";
    KeyboardCode[KeyboardCode["End"] = 15] = "End";
    KeyboardCode[KeyboardCode["Home"] = 16] = "Home";
    KeyboardCode[KeyboardCode["ArrowLeft"] = 17] = "ArrowLeft";
    KeyboardCode[KeyboardCode["ArrowUp"] = 18] = "ArrowUp";
    KeyboardCode[KeyboardCode["ArrowRight"] = 19] = "ArrowRight";
    KeyboardCode[KeyboardCode["ArrowDown"] = 20] = "ArrowDown";
    KeyboardCode[KeyboardCode["PrintScreen"] = 21] = "PrintScreen";
    KeyboardCode[KeyboardCode["Insert"] = 22] = "Insert";
    KeyboardCode[KeyboardCode["Delete"] = 23] = "Delete";
    KeyboardCode[KeyboardCode["Digit0"] = 24] = "Digit0";
    KeyboardCode[KeyboardCode["Digit1"] = 25] = "Digit1";
    KeyboardCode[KeyboardCode["Digit2"] = 26] = "Digit2";
    KeyboardCode[KeyboardCode["Digit3"] = 27] = "Digit3";
    KeyboardCode[KeyboardCode["Digit4"] = 28] = "Digit4";
    KeyboardCode[KeyboardCode["Digit5"] = 29] = "Digit5";
    KeyboardCode[KeyboardCode["Digit6"] = 30] = "Digit6";
    KeyboardCode[KeyboardCode["Digit7"] = 31] = "Digit7";
    KeyboardCode[KeyboardCode["Digit8"] = 32] = "Digit8";
    KeyboardCode[KeyboardCode["Digit9"] = 33] = "Digit9";
    KeyboardCode[KeyboardCode["AudioVolumeMute"] = 34] = "AudioVolumeMute";
    KeyboardCode[KeyboardCode["AudioVolumeDown"] = 35] = "AudioVolumeDown";
    KeyboardCode[KeyboardCode["AudioVolumeUp"] = 36] = "AudioVolumeUp";
    KeyboardCode[KeyboardCode["KeyA"] = 37] = "KeyA";
    KeyboardCode[KeyboardCode["KeyB"] = 38] = "KeyB";
    KeyboardCode[KeyboardCode["KeyC"] = 39] = "KeyC";
    KeyboardCode[KeyboardCode["KeyD"] = 40] = "KeyD";
    KeyboardCode[KeyboardCode["KeyE"] = 41] = "KeyE";
    KeyboardCode[KeyboardCode["KeyF"] = 42] = "KeyF";
    KeyboardCode[KeyboardCode["KeyG"] = 43] = "KeyG";
    KeyboardCode[KeyboardCode["KeyH"] = 44] = "KeyH";
    KeyboardCode[KeyboardCode["KeyI"] = 45] = "KeyI";
    KeyboardCode[KeyboardCode["KeyJ"] = 46] = "KeyJ";
    KeyboardCode[KeyboardCode["KeyK"] = 47] = "KeyK";
    KeyboardCode[KeyboardCode["KeyL"] = 48] = "KeyL";
    KeyboardCode[KeyboardCode["KeyM"] = 49] = "KeyM";
    KeyboardCode[KeyboardCode["KeyN"] = 50] = "KeyN";
    KeyboardCode[KeyboardCode["KeyO"] = 51] = "KeyO";
    KeyboardCode[KeyboardCode["KeyP"] = 52] = "KeyP";
    KeyboardCode[KeyboardCode["KeyQ"] = 53] = "KeyQ";
    KeyboardCode[KeyboardCode["KeyR"] = 54] = "KeyR";
    KeyboardCode[KeyboardCode["KeyS"] = 55] = "KeyS";
    KeyboardCode[KeyboardCode["KeyT"] = 56] = "KeyT";
    KeyboardCode[KeyboardCode["KeyU"] = 57] = "KeyU";
    KeyboardCode[KeyboardCode["KeyV"] = 58] = "KeyV";
    KeyboardCode[KeyboardCode["KeyW"] = 59] = "KeyW";
    KeyboardCode[KeyboardCode["KeyX"] = 60] = "KeyX";
    KeyboardCode[KeyboardCode["KeyY"] = 61] = "KeyY";
    KeyboardCode[KeyboardCode["KeyZ"] = 62] = "KeyZ";
    KeyboardCode[KeyboardCode["MetaLeft"] = 63] = "MetaLeft";
    KeyboardCode[KeyboardCode["MetaRight"] = 64] = "MetaRight";
    KeyboardCode[KeyboardCode["ContextMenu"] = 65] = "ContextMenu";
    KeyboardCode[KeyboardCode["Numpad0"] = 66] = "Numpad0";
    KeyboardCode[KeyboardCode["Numpad1"] = 67] = "Numpad1";
    KeyboardCode[KeyboardCode["Numpad2"] = 68] = "Numpad2";
    KeyboardCode[KeyboardCode["Numpad3"] = 69] = "Numpad3";
    KeyboardCode[KeyboardCode["Numpad4"] = 70] = "Numpad4";
    KeyboardCode[KeyboardCode["Numpad5"] = 71] = "Numpad5";
    KeyboardCode[KeyboardCode["Numpad6"] = 72] = "Numpad6";
    KeyboardCode[KeyboardCode["Numpad7"] = 73] = "Numpad7";
    KeyboardCode[KeyboardCode["Numpad8"] = 74] = "Numpad8";
    KeyboardCode[KeyboardCode["Numpad9"] = 75] = "Numpad9";
    KeyboardCode[KeyboardCode["NumpadMultiply"] = 76] = "NumpadMultiply";
    KeyboardCode[KeyboardCode["NumpadAdd"] = 77] = "NumpadAdd";
    KeyboardCode[KeyboardCode["NumpadSubtract"] = 78] = "NumpadSubtract";
    KeyboardCode[KeyboardCode["NumpadDecimal"] = 79] = "NumpadDecimal";
    KeyboardCode[KeyboardCode["NumpadDivide"] = 80] = "NumpadDivide";
    KeyboardCode[KeyboardCode["F1"] = 81] = "F1";
    KeyboardCode[KeyboardCode["F2"] = 82] = "F2";
    KeyboardCode[KeyboardCode["F3"] = 83] = "F3";
    KeyboardCode[KeyboardCode["F4"] = 84] = "F4";
    KeyboardCode[KeyboardCode["F5"] = 85] = "F5";
    KeyboardCode[KeyboardCode["F6"] = 86] = "F6";
    KeyboardCode[KeyboardCode["F7"] = 87] = "F7";
    KeyboardCode[KeyboardCode["F8"] = 88] = "F8";
    KeyboardCode[KeyboardCode["F9"] = 89] = "F9";
    KeyboardCode[KeyboardCode["F10"] = 90] = "F10";
    KeyboardCode[KeyboardCode["F11"] = 91] = "F11";
    KeyboardCode[KeyboardCode["F12"] = 92] = "F12";
    KeyboardCode[KeyboardCode["NumLock"] = 93] = "NumLock";
    KeyboardCode[KeyboardCode["ScrollLock"] = 94] = "ScrollLock";
    KeyboardCode[KeyboardCode["Semicolon"] = 95] = "Semicolon";
    KeyboardCode[KeyboardCode["Equal"] = 96] = "Equal";
    KeyboardCode[KeyboardCode["Comma"] = 97] = "Comma";
    KeyboardCode[KeyboardCode["Minus"] = 98] = "Minus";
    KeyboardCode[KeyboardCode["Period"] = 99] = "Period";
    KeyboardCode[KeyboardCode["Slash"] = 100] = "Slash";
    KeyboardCode[KeyboardCode["Backquote"] = 101] = "Backquote";
    KeyboardCode[KeyboardCode["BracketLeft"] = 102] = "BracketLeft";
    KeyboardCode[KeyboardCode["Backslash"] = 103] = "Backslash";
    KeyboardCode[KeyboardCode["BracketRight"] = 104] = "BracketRight";
    KeyboardCode[KeyboardCode["Quote"] = 105] = "Quote";
})(KeyboardCode || (KeyboardCode = {}));


/***/ }),

/***/ "./src/constants/keyboardCodeMap.ts":
/*!******************************************!*\
  !*** ./src/constants/keyboardCodeMap.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "keyboardCodeMap": () => (/* binding */ keyboardCodeMap)
/* harmony export */ });
/* harmony import */ var _keyboardCode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./keyboardCode */ "./src/constants/keyboardCode.ts");

const keyboardCodeMap = {
    Backspace: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.Backspace,
    Tab: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.Tab,
    Enter: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.Enter,
    ShiftLeft: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.ShiftLeft,
    ShiftRight: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.ShiftRight,
    ControlLeft: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.ControlLeft,
    ControlRight: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.ControlRight,
    AltLeft: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.AltLeft,
    AltRight: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.AltRight,
    Pause: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.Pause,
    CapsLock: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.CapsLock,
    Escape: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.Escape,
    Space: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.Space,
    PageUp: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.PageUp,
    PageDown: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.PageDown,
    End: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.End,
    Home: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.Home,
    ArrowLeft: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.ArrowLeft,
    ArrowUp: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.ArrowUp,
    ArrowRight: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.ArrowRight,
    ArrowDown: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.ArrowDown,
    PrintScreen: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.PrintScreen,
    Insert: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.Insert,
    Delete: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.Delete,
    Digit0: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.Digit0,
    Digit1: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.Digit1,
    Digit2: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.Digit2,
    Digit3: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.Digit3,
    Digit4: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.Digit4,
    Digit5: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.Digit5,
    Digit6: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.Digit6,
    Digit7: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.Digit7,
    Digit8: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.Digit8,
    Digit9: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.Digit9,
    AudioVolumeMute: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.AudioVolumeMute,
    AudioVolumeDown: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.AudioVolumeDown,
    AudioVolumeUp: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.AudioVolumeUp,
    KeyA: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.KeyA,
    KeyB: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.KeyB,
    KeyC: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.KeyC,
    KeyD: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.KeyD,
    KeyE: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.KeyE,
    KeyF: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.KeyF,
    KeyG: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.KeyG,
    KeyH: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.KeyH,
    KeyI: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.KeyI,
    KeyJ: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.KeyJ,
    KeyK: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.KeyK,
    KeyL: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.KeyL,
    KeyM: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.KeyM,
    KeyN: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.KeyN,
    KeyO: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.KeyO,
    KeyP: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.KeyP,
    KeyQ: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.KeyQ,
    KeyR: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.KeyR,
    KeyS: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.KeyS,
    KeyT: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.KeyT,
    KeyU: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.KeyU,
    KeyV: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.KeyV,
    KeyW: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.KeyW,
    KeyX: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.KeyX,
    KeyY: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.KeyY,
    KeyZ: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.KeyZ,
    MetaLeft: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.MetaLeft,
    MetaRight: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.MetaRight,
    ContextMenu: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.ContextMenu,
    Numpad0: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.Numpad0,
    Numpad1: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.Numpad1,
    Numpad2: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.Numpad2,
    Numpad3: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.Numpad3,
    Numpad4: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.Numpad4,
    Numpad5: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.Numpad5,
    Numpad6: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.Numpad6,
    Numpad7: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.Numpad7,
    Numpad8: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.Numpad8,
    Numpad9: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.Numpad9,
    NumpadMultiply: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.NumpadMultiply,
    NumpadAdd: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.NumpadAdd,
    NumpadSubtract: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.NumpadSubtract,
    NumpadDecimal: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.NumpadDecimal,
    NumpadDivide: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.NumpadDivide,
    F1: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.F1,
    F2: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.F2,
    F3: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.F3,
    F4: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.F4,
    F5: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.F5,
    F6: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.F6,
    F7: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.F7,
    F8: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.F8,
    F9: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.F9,
    F10: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.F10,
    F11: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.F11,
    F12: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.F12,
    NumLock: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.NumLock,
    ScrollLock: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.ScrollLock,
    Semicolon: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.Semicolon,
    Equal: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.Equal,
    Comma: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.Comma,
    Minus: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.Minus,
    Period: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.Period,
    Slash: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.Slash,
    Backquote: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.Backquote,
    BracketLeft: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.BracketLeft,
    Backslash: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.Backslash,
    BracketRight: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.BracketRight,
    Quote: _keyboardCode__WEBPACK_IMPORTED_MODULE_0__.KeyboardCode.Quote
};


/***/ }),

/***/ "./src/loader/GlueBase.ts":
/*!********************************!*\
  !*** ./src/loader/GlueBase.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GlueBase": () => (/* binding */ GlueBase)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils/index.ts");

class GlueBase {
    constructor(gl) {
        this.gl = gl;
        (0,_utils__WEBPACK_IMPORTED_MODULE_0__.autoBind)(this);
    }
    onLoad(wasmExports) {
        this.wasmExports = wasmExports;
    }
}


/***/ }),

/***/ "./src/loader/InputGlue.ts":
/*!*********************************!*\
  !*** ./src/loader/InputGlue.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InputGlue": () => (/* binding */ InputGlue)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/constants/index.ts");
/* harmony import */ var _GlueBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GlueBase */ "./src/loader/GlueBase.ts");


class InputGlue extends _GlueBase__WEBPACK_IMPORTED_MODULE_1__.GlueBase {
    constructor(gl, canvas) {
        super(gl);
        this.canvas = canvas;
    }
    onLoad(wasmExports) {
        super.onLoad(wasmExports);
        window.addEventListener('mousedown', this.handleMouseDown);
        window.addEventListener('mouseup', this.handleMouseUp);
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUp);
        window.addEventListener('wheel', this.handleWheel);
    }
    handleWheel(e) {
        this.wasmExports.handleMouseWheel(e.deltaX, e.deltaY);
    }
    handleMouseDown(e) {
        this.wasmExports.handleMouseDown();
    }
    handleMouseUp(e) {
        this.wasmExports.handleMouseUp();
    }
    handleKeyDown(e) {
        this.wasmExports.handleKeyDown(_constants__WEBPACK_IMPORTED_MODULE_0__.keyboardCodeMap[e.code]);
    }
    handleKeyUp(e) {
        this.wasmExports.handleKeyUp(_constants__WEBPACK_IMPORTED_MODULE_0__.keyboardCodeMap[e.code]);
    }
    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        let x = (e.clientX - rect.left) / rect.width;
        let y = (e.clientY - rect.top) / rect.height;
        x = x * 2 - 1;
        y = y * 2 - 1;
        this.wasmExports.handleMouseMove(x, y);
    }
    dispose() {
        window.removeEventListener('mousedown', this.handleMouseDown);
        window.removeEventListener('mouseup', this.handleMouseUp);
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('keyup', this.handleKeyUp);
        window.removeEventListener('wheel', this.handleWheel);
    }
}


/***/ }),

/***/ "./src/loader/KooraLoader.ts":
/*!***********************************!*\
  !*** ./src/loader/KooraLoader.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KooraLoader": () => (/* binding */ KooraLoader),
/* harmony export */   "initKoora": () => (/* binding */ initKoora)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils/index.ts");
/* harmony import */ var _GlueBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GlueBase */ "./src/loader/GlueBase.ts");
/* harmony import */ var _InputGlue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./InputGlue */ "./src/loader/InputGlue.ts");
/* harmony import */ var _kooraBindings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./kooraBindings */ "./src/loader/kooraBindings.ts");
/* harmony import */ var _RenderGlue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./RenderGlue */ "./src/loader/RenderGlue.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





const listen = (gl, val) => {
    const func = gl[val];
    gl[val] = (...args) => {
        console.log(`${val} - `, args);
        func(...args);
    };
};
class KooraLoader extends _GlueBase__WEBPACK_IMPORTED_MODULE_1__.GlueBase {
    constructor(canvas) {
        canvas !== null && canvas !== void 0 ? canvas : (canvas = document.getElementById('koora-canvas'));
        canvas !== null && canvas !== void 0 ? canvas : (canvas = document.body.appendChild(document.createElement('canvas')));
        const gl = canvas.getContext('webgl2');
        super(gl);
        this.glues = [];
        this.externId = 0;
        this.externMap = new Map();
        (0,_utils__WEBPACK_IMPORTED_MODULE_0__.autoBind)(gl);
        (0,_utils__WEBPACK_IMPORTED_MODULE_0__.applyGLOverloads)(gl);
        this.renderGlue = new _RenderGlue__WEBPACK_IMPORTED_MODULE_4__.RenderGlue(gl, canvas);
        this.glues.push(this);
        this.glues.push(this.renderGlue);
        this.glues.push(new _InputGlue__WEBPACK_IMPORTED_MODULE_2__.InputGlue(gl, canvas));
        //zero means null
        this.externMap.set(this.externId++, null);
    }
    externSet(val) {
        if (val === null || val === undefined)
            return 0;
        const id = this.externId++;
        this.externMap.set(id, val);
        return id;
    }
    externGet(id) {
        const val = this.externMap.get(id);
        // console.dir(val)
        return val;
    }
    externRemove(id) {
        return this.externMap.delete(id);
    }
    load(wasmUrl, bindings) {
        return __awaiter(this, void 0, void 0, function* () {
            wasmUrl !== null && wasmUrl !== void 0 ? wasmUrl : (wasmUrl = '/debug.wasm');
            bindings !== null && bindings !== void 0 ? bindings : (bindings = _kooraBindings__WEBPACK_IMPORTED_MODULE_3__.kooraBindings);
            const wasmImports = {
                gl: this.gl,
                host: {
                    log: console.log.bind(console),
                    elapsed: performance.now.bind(performance),
                    now: Date.now.bind(Date),
                    set: this.externSet,
                    get: this.externGet,
                    remove: this.externRemove
                },
                env: {}
            };
            // console.dir(wasmImports)
            const wasmModule = yield WebAssembly.compileStreaming(fetch(wasmUrl));
            const wasmExports = yield bindings.instantiate(wasmModule, wasmImports);
            for (const glue of this.glues)
                glue.onLoad(wasmExports);
            return this;
        });
    }
    start(options = {}) {
        if (options !== false)
            this.wasmExports.defaultWorld(Object.assign({ lights: true, camera: true, gizmos: true, cameraKeyboardController: false, cameraMouseController: false, helloCube: false }, options));
        this.renderGlue.resize();
        this.update();
        return this;
    }
    update() {
        this.wasmExports.update();
        this.animFrameId = requestAnimationFrame(this.update);
    }
    runOnce() {
        this.start();
        cancelAnimationFrame(this.animFrameId);
        return this;
    }
}
const initKoora = ({ canvas, wasmUrl, bindings, defaultWorld } = {}) => __awaiter(void 0, void 0, void 0, function* () {
    const loader = new KooraLoader(canvas);
    yield loader.load(wasmUrl, bindings);
    loader.start(defaultWorld);
    return loader;
});
//@ts-ignore
window.initKoora = initKoora;


/***/ }),

/***/ "./src/loader/RenderGlue.ts":
/*!**********************************!*\
  !*** ./src/loader/RenderGlue.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RenderGlue": () => (/* binding */ RenderGlue)
/* harmony export */ });
/* harmony import */ var _GlueBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GlueBase */ "./src/loader/GlueBase.ts");

class RenderGlue extends _GlueBase__WEBPACK_IMPORTED_MODULE_0__.GlueBase {
    constructor(gl, canvas) {
        super(gl);
        this.canvas = canvas;
        this.resizeObserver = new ResizeObserver(this.resize);
        this.resizeObserver.observe(this.canvas.parentElement);
    }
    resize() {
        var _a, _b;
        const width = this.canvas.clientWidth;
        const height = this.canvas.clientHeight;
        this.canvas.width = width;
        this.canvas.height = height;
        (_a = this.wasmExports) === null || _a === void 0 ? void 0 : _a.handleResize(width, height);
        (_b = this.wasmExports) === null || _b === void 0 ? void 0 : _b.update();
    }
}


/***/ }),

/***/ "./src/loader/kooraBindings.ts":
/*!*************************************!*\
  !*** ./src/loader/kooraBindings.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "kooraBindings": () => (/* reexport module object */ _wasm_debug__WEBPACK_IMPORTED_MODULE_0__)
/* harmony export */ });
/* harmony import */ var _wasm_debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_wasm/debug */ "./src/_wasm/debug.js");




/***/ }),

/***/ "./src/loader/testRun.ts":
/*!*******************************!*\
  !*** ./src/loader/testRun.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tryTestRun": () => (/* binding */ tryTestRun)
/* harmony export */ });
/* harmony import */ var _KooraLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./KooraLoader */ "./src/loader/KooraLoader.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const tryTestRun = () => __awaiter(void 0, void 0, void 0, function* () {
    const params = new URLSearchParams(window.location.search);
    if (!params.has('ktest'))
        return;
    const cameraKeyboardController = !(params.get('board') === 'false');
    const cameraMouseController = !(params.get('mouse') === 'false');
    //@ts-ignore
    yield __webpack_require__.e(/*! import() */ "src_loader_testRunStyle_css").then(__webpack_require__.bind(__webpack_require__, /*! ./testRunStyle.css */ "./src/loader/testRunStyle.css"));
    const { wasmExports } = yield (0,_KooraLoader__WEBPACK_IMPORTED_MODULE_0__.initKoora)({
        defaultWorld: {
            cameraKeyboardController,
            cameraMouseController,
        }
    });
    const a = wasmExports.rotatingCube(wasmExports.litShader.value);
});
tryTestRun();


/***/ }),

/***/ "./src/utils/DebounceResizeObserver.ts":
/*!*********************************************!*\
  !*** ./src/utils/DebounceResizeObserver.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DebounceResizeObserver": () => (/* binding */ DebounceResizeObserver)
/* harmony export */ });
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash.debounce */ "../../node_modules/lodash.debounce/index.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_0__);

const DebounceResizeObserver = (cb, delay = 1) => new ResizeObserver(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(cb, delay));


/***/ }),

/***/ "./src/utils/autoBind.ts":
/*!*******************************!*\
  !*** ./src/utils/autoBind.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "autoBind": () => (/* binding */ autoBind)
/* harmony export */ });
/* eslint-disable */
//@ts-nocheck
// Gets all non-builtin properties up the prototype chain.
const getAllProperties = object => {
    const properties = new Set();
    do {
        for (const key of Reflect.ownKeys(object)) {
            properties.add([object, key]);
        }
    } while ((object = Reflect.getPrototypeOf(object)) && object !== Object.prototype);
    return properties;
};
function autoBind(self, { include, exclude } = {}) {
    const filter = key => {
        const match = pattern => typeof pattern === 'string' ? key === pattern : pattern.test(key);
        if (include) {
            return include.some(match); // eslint-disable-line unicorn/no-array-callback-reference
        }
        if (exclude) {
            return !exclude.some(match); // eslint-disable-line unicorn/no-array-callback-reference
        }
        return true;
    };
    for (const [object, key] of getAllProperties(self.constructor.prototype)) {
        if (key === 'constructor' || !filter(key)) {
            continue;
        }
        const descriptor = Reflect.getOwnPropertyDescriptor(object, key);
        if (descriptor && typeof descriptor.value === 'function') {
            self[key] = self[key].bind(self);
        }
    }
    return self;
}


/***/ }),

/***/ "./src/utils/classUtils.ts":
/*!*********************************!*\
  !*** ./src/utils/classUtils.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "applyGLOverloads": () => (/* binding */ applyGLOverloads)
/* harmony export */ });
const applyGLOverloads = (gl) => {
    const glOverloads = [
        ['compressedTexImage3D', 2],
        ['compressedTexSubImage3D', 2],
        ['getActiveUniformBlockParameter', 2],
        ['getActiveUniforms', 2],
        ['texImage3D', 4],
        ['texSubImage3D', 3],
        ['bufferData', 7],
        ['bufferSubData', 2],
        ['compressedTexImage2D', 2],
        ['compressedTexSubImage2D', 2],
        ['readPixels', 3],
        ['texImage2D', 6],
        ['texSubImage2D', 5],
        ['getBufferParameter', 2],
        ['getProgramParameter', 2],
        ['getShaderParameter', 2],
    ];
    glOverloads.forEach(([key, count]) => {
        for (let i = 0; i < count; i++)
            gl[`${key}__${i + 1}`] = gl[key];
    });
};


/***/ }),

/***/ "./src/utils/index.ts":
/*!****************************!*\
  !*** ./src/utils/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DebounceResizeObserver": () => (/* reexport safe */ _DebounceResizeObserver__WEBPACK_IMPORTED_MODULE_0__.DebounceResizeObserver),
/* harmony export */   "applyGLOverloads": () => (/* reexport safe */ _classUtils__WEBPACK_IMPORTED_MODULE_1__.applyGLOverloads),
/* harmony export */   "autoBind": () => (/* reexport safe */ _autoBind__WEBPACK_IMPORTED_MODULE_2__.autoBind)
/* harmony export */ });
/* harmony import */ var _DebounceResizeObserver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DebounceResizeObserver */ "./src/utils/DebounceResizeObserver.ts");
/* harmony import */ var _classUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classUtils */ "./src/utils/classUtils.ts");
/* harmony import */ var _autoBind__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./autoBind */ "./src/utils/autoBind.ts");





/***/ }),

/***/ "./src/_wasm/debug.js":
/*!****************************!*\
  !*** ./src/_wasm/debug.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "instantiate": () => (/* binding */ instantiate)
/* harmony export */ });
async function instantiate(module, imports = {}) {
  const __module0 = imports.gl;
  const __module1 = imports.host;
  const adaptedImports = {
    env: Object.assign(Object.create(globalThis), imports.env || {}, {
      seed() {
        // ~lib/builtins/seed() => f64
        return (() => {
          // @external.js
          return Date.now() * Math.random();
        })();
      },
      abort(message, fileName, lineNumber, columnNumber) {
        // ~lib/builtins/abort(~lib/string/String | null?, ~lib/string/String | null?, u32?, u32?) => void
        message = __liftString(message >>> 0);
        fileName = __liftString(fileName >>> 0);
        lineNumber = lineNumber >>> 0;
        columnNumber = columnNumber >>> 0;
        (() => {
          // @external.js
          throw Error(`${message} in ${fileName}:${lineNumber}:${columnNumber}`);
        })();
      },
    }),
    gl: Object.assign(Object.create(__module0), {
      clear(mask) {
        // src-as/WebGL2/imports/_types/clear(u32) => void
        mask = mask >>> 0;
        __module0.clear(mask);
      },
      createShader(type) {
        // src-as/WebGL2/imports/_types/createShader(u32) => externref
        type = type >>> 0;
        return __module0.createShader(type);
      },
      shaderSource(shader, source) {
        // src-as/WebGL2/imports/_types/shaderSource(externref, ~lib/string/String) => void
        source = __liftString(source >>> 0);
        __module0.shaderSource(shader, source);
      },
      getShaderParameter__1(shader, pname) {
        // src-as/WebGL2/imports/_types/getShaderParameter__1(externref, u32) => bool
        pname = pname >>> 0;
        return __module0.getShaderParameter__1(shader, pname) ? 1 : 0;
      },
      getShaderInfoLog(shader) {
        // src-as/WebGL2/imports/_types/getShaderInfoLog(externref) => ~lib/string/String
        return __lowerString(__module0.getShaderInfoLog(shader)) || __notnull();
      },
      transformFeedbackVaryings(program, varyings, bufferMode) {
        // src-as/WebGL2/imports/_types/transformFeedbackVaryings(externref, ~lib/array/Array<~lib/string/String>, u32) => void
        varyings = __liftArray(pointer => __liftString(new Uint32Array(memory.buffer)[pointer >>> 2]), 2, varyings >>> 0);
        bufferMode = bufferMode >>> 0;
        __module0.transformFeedbackVaryings(program, varyings, bufferMode);
      },
      getProgramParameter__1(program, pname) {
        // src-as/WebGL2/imports/_types/getProgramParameter__1(externref, u32) => bool
        pname = pname >>> 0;
        return __module0.getProgramParameter__1(program, pname) ? 1 : 0;
      },
      getProgramInfoLog(program) {
        // src-as/WebGL2/imports/_types/getProgramInfoLog(externref) => ~lib/string/String
        return __lowerString(__module0.getProgramInfoLog(program)) || __notnull();
      },
      bindBuffer(target, buffer) {
        // src-as/WebGL2/imports/_types/bindBuffer(u32, externref) => void
        target = target >>> 0;
        __module0.bindBuffer(target, buffer);
      },
      bufferData__3(target, srcData, usage) {
        // src-as/WebGL2/imports/_types/bufferData__3(u32, ~lib/typedarray/Float32Array, u32) => void
        target = target >>> 0;
        srcData = __liftTypedArray(Float32Array, srcData >>> 0);
        usage = usage >>> 0;
        __module0.bufferData__3(target, srcData, usage);
      },
      bufferData__4(target, srcData, usage) {
        // src-as/WebGL2/imports/_types/bufferData__4(u32, ~lib/typedarray/Uint8Array, u32) => void
        target = target >>> 0;
        srcData = __liftTypedArray(Uint8Array, srcData >>> 0);
        usage = usage >>> 0;
        __module0.bufferData__4(target, srcData, usage);
      },
      getAttribLocation(program, name) {
        // src-as/WebGL2/imports/_types/getAttribLocation(externref, ~lib/string/String) => i32
        name = __liftString(name >>> 0);
        return __module0.getAttribLocation(program, name);
      },
      enableVertexAttribArray(index) {
        // src-as/WebGL2/imports/_types/enableVertexAttribArray(u32) => void
        index = index >>> 0;
        __module0.enableVertexAttribArray(index);
      },
      vertexAttribPointer(index, size, type, normalized, stride, offset) {
        // src-as/WebGL2/imports/_types/vertexAttribPointer(u32, i32, u32, bool, i32, i32) => void
        index = index >>> 0;
        type = type >>> 0;
        normalized = normalized != 0;
        __module0.vertexAttribPointer(index, size, type, normalized, stride, offset);
      },
      vertexAttribDivisor(index, divisor) {
        // src-as/WebGL2/imports/_types/vertexAttribDivisor(u32, u32) => void
        index = index >>> 0;
        divisor = divisor >>> 0;
        __module0.vertexAttribDivisor(index, divisor);
      },
      bufferData__5(target, srcData, usage) {
        // src-as/WebGL2/imports/_types/bufferData__5(u32, ~lib/typedarray/Uint16Array, u32) => void
        target = target >>> 0;
        srcData = __liftTypedArray(Uint16Array, srcData >>> 0);
        usage = usage >>> 0;
        __module0.bufferData__5(target, srcData, usage);
      },
      bindTransformFeedback(target, tf) {
        // src-as/WebGL2/imports/_types/bindTransformFeedback(u32, externref) => void
        target = target >>> 0;
        __module0.bindTransformFeedback(target, tf);
      },
      bindBufferBase(target, index, buffer) {
        // src-as/WebGL2/imports/_types/bindBufferBase(u32, u32, externref) => void
        target = target >>> 0;
        index = index >>> 0;
        __module0.bindBufferBase(target, index, buffer);
      },
      getUniformBlockIndex(program, uniformBlockName) {
        // src-as/WebGL2/imports/_types/getUniformBlockIndex(externref, ~lib/string/String) => u32
        uniformBlockName = __liftString(uniformBlockName >>> 0);
        return __module0.getUniformBlockIndex(program, uniformBlockName);
      },
      getActiveUniformBlockParameter__1(program, uniformBlockIndex, pname) {
        // src-as/WebGL2/imports/_types/getActiveUniformBlockParameter__1(externref, u32, u32) => u32
        uniformBlockIndex = uniformBlockIndex >>> 0;
        pname = pname >>> 0;
        return __module0.getActiveUniformBlockParameter__1(program, uniformBlockIndex, pname);
      },
      bufferData__1(target, size, usage) {
        // src-as/WebGL2/imports/_types/bufferData__1(u32, u32, u32) => void
        target = target >>> 0;
        size = size >>> 0;
        usage = usage >>> 0;
        __module0.bufferData__1(target, size, usage);
      },
      getUniformIndices(program, uniformNames) {
        // src-as/WebGL2/imports/_types/getUniformIndices(externref, ~lib/array/Array<~lib/string/String>) => ~lib/array/Array<u32>
        uniformNames = __liftArray(pointer => __liftString(new Uint32Array(memory.buffer)[pointer >>> 2]), 2, uniformNames >>> 0);
        return __lowerArray((pointer, value) => { new Uint32Array(memory.buffer)[pointer >>> 2] = value; }, 87, 2, __module0.getUniformIndices(program, uniformNames)) || __notnull();
      },
      getActiveUniforms__1(program, uniformIndices, pname) {
        // src-as/WebGL2/imports/_types/getActiveUniforms__1(externref, ~lib/array/Array<u32>, u32) => ~lib/array/Array<u32>
        uniformIndices = __liftArray(pointer => new Uint32Array(memory.buffer)[pointer >>> 2], 2, uniformIndices >>> 0);
        pname = pname >>> 0;
        return __lowerArray((pointer, value) => { new Uint32Array(memory.buffer)[pointer >>> 2] = value; }, 87, 2, __module0.getActiveUniforms__1(program, uniformIndices, pname)) || __notnull();
      },
      uniformBlockBinding(program, uniformBlockIndex, uniformBlockBinding) {
        // src-as/WebGL2/imports/_types/uniformBlockBinding(externref, u32, u32) => void
        uniformBlockIndex = uniformBlockIndex >>> 0;
        uniformBlockBinding = uniformBlockBinding >>> 0;
        __module0.uniformBlockBinding(program, uniformBlockIndex, uniformBlockBinding);
      },
      getUniformLocation(program, name) {
        // src-as/WebGL2/imports/_types/getUniformLocation(externref, ~lib/string/String) => externref
        name = __liftString(name >>> 0);
        return __module0.getUniformLocation(program, name);
      },
      activeTexture(texture) {
        // src-as/WebGL2/imports/_types/activeTexture(u32) => void
        texture = texture >>> 0;
        __module0.activeTexture(texture);
      },
      bindTexture(target, texture) {
        // src-as/WebGL2/imports/_types/bindTexture(u32, externref) => void
        target = target >>> 0;
        __module0.bindTexture(target, texture);
      },
      texImage2D__6(target, level, internalformat, width, height, border, format, type, pixels) {
        // src-as/WebGL2/imports/_types/texImage2D__6(u32, i32, i32, i32, i32, i32, u32, u32, ~lib/typedarray/Uint8Array) => void
        target = target >>> 0;
        format = format >>> 0;
        type = type >>> 0;
        pixels = __liftTypedArray(Uint8Array, pixels >>> 0);
        __module0.texImage2D__6(target, level, internalformat, width, height, border, format, type, pixels);
      },
      generateMipmap(target) {
        // src-as/WebGL2/imports/_types/generateMipmap(u32) => void
        target = target >>> 0;
        __module0.generateMipmap(target);
      },
      texParameteri(target, pname, param) {
        // src-as/WebGL2/imports/_types/texParameteri(u32, u32, i32) => void
        target = target >>> 0;
        pname = pname >>> 0;
        __module0.texParameteri(target, pname, param);
      },
      bufferSubData__2(target, dstByteOffset, srcData, srcOffset, length) {
        // src-as/WebGL2/imports/_types/bufferSubData__2(u32, i32, ~lib/typedarray/Float32Array, u32, u32?) => void
        target = target >>> 0;
        srcData = __liftTypedArray(Float32Array, srcData >>> 0);
        srcOffset = srcOffset >>> 0;
        length = length >>> 0;
        __module0.bufferSubData__2(target, dstByteOffset, srcData, srcOffset, length);
      },
      enable(cap) {
        // src-as/WebGL2/imports/_types/enable(u32) => void
        cap = cap >>> 0;
        __module0.enable(cap);
      },
      depthFunc(func) {
        // src-as/WebGL2/imports/_types/depthFunc(u32) => void
        func = func >>> 0;
        __module0.depthFunc(func);
      },
      disable(cap) {
        // src-as/WebGL2/imports/_types/disable(u32) => void
        cap = cap >>> 0;
        __module0.disable(cap);
      },
      cullFace(mode) {
        // src-as/WebGL2/imports/_types/cullFace(u32) => void
        mode = mode >>> 0;
        __module0.cullFace(mode);
      },
      beginTransformFeedback(primitiveMode) {
        // src-as/WebGL2/imports/_types/beginTransformFeedback(u32) => void
        primitiveMode = primitiveMode >>> 0;
        __module0.beginTransformFeedback(primitiveMode);
      },
      drawArrays(mode, first, count) {
        // src-as/WebGL2/imports/_types/drawArrays(u32, i32, i32) => void
        mode = mode >>> 0;
        __module0.drawArrays(mode, first, count);
      },
      drawElementsInstanced(mode, count, type, offset, instanceCount) {
        // src-as/WebGL2/imports/_types/drawElementsInstanced(u32, i32, u32, i32, i32) => void
        mode = mode >>> 0;
        type = type >>> 0;
        __module0.drawElementsInstanced(mode, count, type, offset, instanceCount);
      },
      drawArraysInstanced(mode, first, count, instanceCount) {
        // src-as/WebGL2/imports/_types/drawArraysInstanced(u32, i32, i32, i32) => void
        mode = mode >>> 0;
        __module0.drawArraysInstanced(mode, first, count, instanceCount);
      },
      drawElements(mode, count, type, offset) {
        // src-as/WebGL2/imports/_types/drawElements(u32, i32, u32, i32) => void
        mode = mode >>> 0;
        type = type >>> 0;
        __module0.drawElements(mode, count, type, offset);
      },
      blendFunc(sfactor, dfactor) {
        // src-as/WebGL2/imports/_types/blendFunc(u32, u32) => void
        sfactor = sfactor >>> 0;
        dfactor = dfactor >>> 0;
        __module0.blendFunc(sfactor, dfactor);
      },
      uniform1fv(location, data, srcOffset, srcLength) {
        // src-as/WebGL2/imports/_types/uniform1fv(externref, ~lib/typedarray/Float32Array, u32?, u32?) => void
        data = __liftTypedArray(Float32Array, data >>> 0);
        srcOffset = srcOffset >>> 0;
        srcLength = srcLength >>> 0;
        __module0.uniform1fv(location, data, srcOffset, srcLength);
      },
      uniform2fv(location, data, srcOffset, srcLength) {
        // src-as/WebGL2/imports/_types/uniform2fv(externref, ~lib/typedarray/Float32Array, u32?, u32?) => void
        data = __liftTypedArray(Float32Array, data >>> 0);
        srcOffset = srcOffset >>> 0;
        srcLength = srcLength >>> 0;
        __module0.uniform2fv(location, data, srcOffset, srcLength);
      },
      uniform3fv(location, data, srcOffset, srcLength) {
        // src-as/WebGL2/imports/_types/uniform3fv(externref, ~lib/typedarray/Float32Array, u32?, u32?) => void
        data = __liftTypedArray(Float32Array, data >>> 0);
        srcOffset = srcOffset >>> 0;
        srcLength = srcLength >>> 0;
        __module0.uniform3fv(location, data, srcOffset, srcLength);
      },
      uniform4fv(location, data, srcOffset, srcLength) {
        // src-as/WebGL2/imports/_types/uniform4fv(externref, ~lib/typedarray/Float32Array, u32?, u32?) => void
        data = __liftTypedArray(Float32Array, data >>> 0);
        srcOffset = srcOffset >>> 0;
        srcLength = srcLength >>> 0;
        __module0.uniform4fv(location, data, srcOffset, srcLength);
      },
      uniformMatrix4fv(location, transpose, data, srcOffset, srcLength) {
        // src-as/WebGL2/imports/_types/uniformMatrix4fv(externref, bool, ~lib/typedarray/Float32Array, u32?, u32?) => void
        transpose = transpose != 0;
        data = __liftTypedArray(Float32Array, data >>> 0);
        srcOffset = srcOffset >>> 0;
        srcLength = srcLength >>> 0;
        __module0.uniformMatrix4fv(location, transpose, data, srcOffset, srcLength);
      },
    }),
    host: Object.assign(Object.create(__module1), {
      get(id) {
        // src-as/imports/_host/get(u32) => externref
        id = id >>> 0;
        return __module1.get(id);
      },
    }),
  };
  const { exports } = await WebAssembly.instantiate(module, adaptedImports);
  const memory = exports.memory || imports.env.memory;
  const adaptedExports = Object.setPrototypeOf({
    createDefaultCamera(keyboardControls, mouseControls) {
      // src-as/exports/camera/createDefaultCamera(bool?, bool?) => src-as/base/Entity/Entity
      keyboardControls = keyboardControls ? 1 : 0;
      mouseControls = mouseControls ? 1 : 0;
      exports.__setArgumentsLength(arguments.length);
      return __liftInternref(exports.createDefaultCamera(keyboardControls, mouseControls) >>> 0);
    },
    unlitVertexColorShader: {
      // src-as/rendering/shader/unlit/unlitVertexColors/unlitVertexColorShader: src-as/rendering/shader/Shader/Shader
      valueOf() { return this.value; },
      get value() {
        return __liftInternref(exports.unlitVertexColorShader.value >>> 0);
      }
    },
    litShader: {
      // src-as/rendering/shader/lit/litShader/litShader: src-as/rendering/shader/Shader/Shader
      valueOf() { return this.value; },
      get value() {
        return __liftInternref(exports.litShader.value >>> 0);
      }
    },
    defaultWorld(options) {
      // src-as/exports/defaultWorld/defaultWorld(src-as/exports/defaultWorld/DefaultWorldOptions) => src-as/base/World/World
      options = __lowerRecord124(options) || __notnull();
      return __liftInternref(exports.defaultWorld(options) >>> 0);
    },
    rotatingCube(_shader) {
      // src-as/exports/demos/rotatingCube(src-as/rendering/shader/Shader/Shader | null) => src-as/base/Entity/Entity
      _shader = __lowerInternref(_shader);
      return __liftInternref(exports.rotatingCube(_shader) >>> 0);
    },
  }, exports);
  function __lowerRecord124(value) {
    // src-as/exports/defaultWorld/DefaultWorldOptions
    // Hint: Opt-out from lowering as a record by providing an empty constructor
    if (value == null) return 0;
    const pointer = exports.__pin(exports.__new(6, 124));
    new Uint8Array(memory.buffer)[pointer + 0 >>> 0] = value.camera ? 1 : 0;
    new Uint8Array(memory.buffer)[pointer + 1 >>> 0] = value.cameraKeyboardController ? 1 : 0;
    new Uint8Array(memory.buffer)[pointer + 2 >>> 0] = value.cameraMouseController ? 1 : 0;
    new Uint8Array(memory.buffer)[pointer + 3 >>> 0] = value.lights ? 1 : 0;
    new Uint8Array(memory.buffer)[pointer + 4 >>> 0] = value.gizmos ? 1 : 0;
    new Uint8Array(memory.buffer)[pointer + 5 >>> 0] = value.helloCube ? 1 : 0;
    exports.__unpin(pointer);
    return pointer;
  }
  function __liftString(pointer) {
    if (!pointer) return null;
    const
      end = pointer + new Uint32Array(memory.buffer)[pointer - 4 >>> 2] >>> 1,
      memoryU16 = new Uint16Array(memory.buffer);
    let
      start = pointer >>> 1,
      string = "";
    while (end - start > 1024) string += String.fromCharCode(...memoryU16.subarray(start, start += 1024));
    return string + String.fromCharCode(...memoryU16.subarray(start, end));
  }
  function __lowerString(value) {
    if (value == null) return 0;
    const
      length = value.length,
      pointer = exports.__new(length << 1, 1) >>> 0,
      memoryU16 = new Uint16Array(memory.buffer);
    for (let i = 0; i < length; ++i) memoryU16[(pointer >>> 1) + i] = value.charCodeAt(i);
    return pointer;
  }
  function __liftArray(liftElement, align, pointer) {
    if (!pointer) return null;
    const
      memoryU32 = new Uint32Array(memory.buffer),
      dataStart = memoryU32[pointer + 4 >>> 2],
      length = memoryU32[pointer + 12 >>> 2],
      values = new Array(length);
    for (let i = 0; i < length; ++i) values[i] = liftElement(dataStart + (i << align >>> 0));
    return values;
  }
  function __lowerArray(lowerElement, id, align, values) {
    if (values == null) return 0;
    const
      length = values.length,
      buffer = exports.__pin(exports.__new(length << align, 0)) >>> 0,
      header = exports.__pin(exports.__new(16, id)) >>> 0,
      memoryU32 = new Uint32Array(memory.buffer);
    memoryU32[header + 0 >>> 2] = buffer;
    memoryU32[header + 4 >>> 2] = buffer;
    memoryU32[header + 8 >>> 2] = length << align;
    memoryU32[header + 12 >>> 2] = length;
    for (let i = 0; i < length; ++i) lowerElement(buffer + (i << align >>> 0), values[i]);
    exports.__unpin(buffer);
    exports.__unpin(header);
    return header;
  }
  function __liftTypedArray(constructor, pointer) {
    if (!pointer) return null;
    const memoryU32 = new Uint32Array(memory.buffer);
    return new constructor(
      memory.buffer,
      memoryU32[pointer + 4 >>> 2],
      memoryU32[pointer + 8 >>> 2] / constructor.BYTES_PER_ELEMENT
    ).slice();
  }
  const registry = new FinalizationRegistry(__release);
  class Internref extends Number {}
  function __liftInternref(pointer) {
    if (!pointer) return null;
    const sentinel = new Internref(__retain(pointer));
    registry.register(sentinel, pointer);
    return sentinel;
  }
  function __lowerInternref(value) {
    if (value == null) return 0;
    if (value instanceof Internref) return value.valueOf();
    throw TypeError("internref expected");
  }
  const refcounts = new Map();
  function __retain(pointer) {
    if (pointer) {
      const refcount = refcounts.get(pointer);
      if (refcount) refcounts.set(pointer, refcount + 1);
      else refcounts.set(exports.__pin(pointer), 1);
    }
    return pointer;
  }
  function __release(pointer) {
    if (pointer) {
      const refcount = refcounts.get(pointer);
      if (refcount === 1) exports.__unpin(pointer), refcounts.delete(pointer);
      else if (refcount) refcounts.set(pointer, refcount - 1);
      else throw Error(`invalid refcount '${refcount}' for reference '${pointer}'`);
    }
  }
  function __notnull() {
    throw TypeError("value must not be null");
  }
  return adaptedExports;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".bundle.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "koora:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			;
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						} else installedChunks[chunkId] = 0;
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkkoora"] = self["webpackChunkkoora"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/entry.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KooraLoader": () => (/* reexport safe */ _loader_KooraLoader__WEBPACK_IMPORTED_MODULE_0__.KooraLoader),
/* harmony export */   "initKoora": () => (/* reexport safe */ _loader_KooraLoader__WEBPACK_IMPORTED_MODULE_0__.initKoora),
/* harmony export */   "tryTestRun": () => (/* reexport safe */ _loader_testRun__WEBPACK_IMPORTED_MODULE_1__.tryTestRun)
/* harmony export */ });
/* harmony import */ var _loader_KooraLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loader/KooraLoader */ "./src/loader/KooraLoader.ts");
/* harmony import */ var _loader_testRun__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loader/testRun */ "./src/loader/testRun.ts");



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LFNBQVMsS0FBSyxTQUFTLEdBQUcsV0FBVyxHQUFHLGFBQWE7QUFDOUUsU0FBUztBQUNULE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxrREFBa0Qsd0RBQXdEO0FBQzFHLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCx3REFBd0Q7QUFDMUcsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0EsVUFBVSxVQUFVO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLGtC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RUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JGb0M7QUFDSiIsInNvdXJjZXMiOlsid2VicGFjazovL2tvb3JhLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2guZGVib3VuY2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8va29vcmEvLi9zcmMvY29uc3RhbnRzL2luZGV4LnRzIiwid2VicGFjazovL2tvb3JhLy4vc3JjL2NvbnN0YW50cy9rZXlib2FyZENvZGUudHMiLCJ3ZWJwYWNrOi8va29vcmEvLi9zcmMvY29uc3RhbnRzL2tleWJvYXJkQ29kZU1hcC50cyIsIndlYnBhY2s6Ly9rb29yYS8uL3NyYy9sb2FkZXIvR2x1ZUJhc2UudHMiLCJ3ZWJwYWNrOi8va29vcmEvLi9zcmMvbG9hZGVyL0lucHV0R2x1ZS50cyIsIndlYnBhY2s6Ly9rb29yYS8uL3NyYy9sb2FkZXIvS29vcmFMb2FkZXIudHMiLCJ3ZWJwYWNrOi8va29vcmEvLi9zcmMvbG9hZGVyL1JlbmRlckdsdWUudHMiLCJ3ZWJwYWNrOi8va29vcmEvLi9zcmMvbG9hZGVyL2tvb3JhQmluZGluZ3MudHMiLCJ3ZWJwYWNrOi8va29vcmEvLi9zcmMvbG9hZGVyL3Rlc3RSdW4udHMiLCJ3ZWJwYWNrOi8va29vcmEvLi9zcmMvdXRpbHMvRGVib3VuY2VSZXNpemVPYnNlcnZlci50cyIsIndlYnBhY2s6Ly9rb29yYS8uL3NyYy91dGlscy9hdXRvQmluZC50cyIsIndlYnBhY2s6Ly9rb29yYS8uL3NyYy91dGlscy9jbGFzc1V0aWxzLnRzIiwid2VicGFjazovL2tvb3JhLy4vc3JjL3V0aWxzL2luZGV4LnRzIiwid2VicGFjazovL2tvb3JhLy4vc3JjL193YXNtL2RlYnVnLmpzIiwid2VicGFjazovL2tvb3JhL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2tvb3JhL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2tvb3JhL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9rb29yYS93ZWJwYWNrL3J1bnRpbWUvZW5zdXJlIGNodW5rIiwid2VicGFjazovL2tvb3JhL3dlYnBhY2svcnVudGltZS9nZXQgamF2YXNjcmlwdCBjaHVuayBmaWxlbmFtZSIsIndlYnBhY2s6Ly9rb29yYS93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2tvb3JhL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8va29vcmEvd2VicGFjay9ydW50aW1lL2xvYWQgc2NyaXB0Iiwid2VicGFjazovL2tvb3JhL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8va29vcmEvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8va29vcmEvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8va29vcmEvLi9zcmMvZW50cnkudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pxdWVyeS5vcmcvPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBVc2VkIGFzIHRoZSBgVHlwZUVycm9yYCBtZXNzYWdlIGZvciBcIkZ1bmN0aW9uc1wiIG1ldGhvZHMuICovXG52YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBOQU4gPSAwIC8gMDtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG4vKiogVXNlZCB0byBtYXRjaCBsZWFkaW5nIGFuZCB0cmFpbGluZyB3aGl0ZXNwYWNlLiAqL1xudmFyIHJlVHJpbSA9IC9eXFxzK3xcXHMrJC9nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmFkIHNpZ25lZCBoZXhhZGVjaW1hbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCYWRIZXggPSAvXlstK10weFswLTlhLWZdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJpbmFyeSBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCaW5hcnkgPSAvXjBiWzAxXSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBvY3RhbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNPY3RhbCA9IC9eMG9bMC03XSskL2k7XG5cbi8qKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB3aXRob3V0IGEgZGVwZW5kZW5jeSBvbiBgcm9vdGAuICovXG52YXIgZnJlZVBhcnNlSW50ID0gcGFyc2VJbnQ7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVNYXggPSBNYXRoLm1heCxcbiAgICBuYXRpdmVNaW4gPSBNYXRoLm1pbjtcblxuLyoqXG4gKiBHZXRzIHRoZSB0aW1lc3RhbXAgb2YgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdGhhdCBoYXZlIGVsYXBzZWQgc2luY2VcbiAqIHRoZSBVbml4IGVwb2NoICgxIEphbnVhcnkgMTk3MCAwMDowMDowMCBVVEMpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMi40LjBcbiAqIEBjYXRlZ29yeSBEYXRlXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSB0aW1lc3RhbXAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZGVmZXIoZnVuY3Rpb24oc3RhbXApIHtcbiAqICAgY29uc29sZS5sb2coXy5ub3coKSAtIHN0YW1wKTtcbiAqIH0sIF8ubm93KCkpO1xuICogLy8gPT4gTG9ncyB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBpdCB0b29rIGZvciB0aGUgZGVmZXJyZWQgaW52b2NhdGlvbi5cbiAqL1xudmFyIG5vdyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gcm9vdC5EYXRlLm5vdygpO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZGVib3VuY2VkIGZ1bmN0aW9uIHRoYXQgZGVsYXlzIGludm9raW5nIGBmdW5jYCB1bnRpbCBhZnRlciBgd2FpdGBcbiAqIG1pbGxpc2Vjb25kcyBoYXZlIGVsYXBzZWQgc2luY2UgdGhlIGxhc3QgdGltZSB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uIHdhc1xuICogaW52b2tlZC4gVGhlIGRlYm91bmNlZCBmdW5jdGlvbiBjb21lcyB3aXRoIGEgYGNhbmNlbGAgbWV0aG9kIHRvIGNhbmNlbFxuICogZGVsYXllZCBgZnVuY2AgaW52b2NhdGlvbnMgYW5kIGEgYGZsdXNoYCBtZXRob2QgdG8gaW1tZWRpYXRlbHkgaW52b2tlIHRoZW0uXG4gKiBQcm92aWRlIGBvcHRpb25zYCB0byBpbmRpY2F0ZSB3aGV0aGVyIGBmdW5jYCBzaG91bGQgYmUgaW52b2tlZCBvbiB0aGVcbiAqIGxlYWRpbmcgYW5kL29yIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIGB3YWl0YCB0aW1lb3V0LiBUaGUgYGZ1bmNgIGlzIGludm9rZWRcbiAqIHdpdGggdGhlIGxhc3QgYXJndW1lbnRzIHByb3ZpZGVkIHRvIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24uIFN1YnNlcXVlbnRcbiAqIGNhbGxzIHRvIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gcmV0dXJuIHRoZSByZXN1bHQgb2YgdGhlIGxhc3QgYGZ1bmNgXG4gKiBpbnZvY2F0aW9uLlxuICpcbiAqICoqTm90ZToqKiBJZiBgbGVhZGluZ2AgYW5kIGB0cmFpbGluZ2Agb3B0aW9ucyBhcmUgYHRydWVgLCBgZnVuY2AgaXNcbiAqIGludm9rZWQgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQgb25seSBpZiB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uXG4gKiBpcyBpbnZva2VkIG1vcmUgdGhhbiBvbmNlIGR1cmluZyB0aGUgYHdhaXRgIHRpbWVvdXQuXG4gKlxuICogSWYgYHdhaXRgIGlzIGAwYCBhbmQgYGxlYWRpbmdgIGlzIGBmYWxzZWAsIGBmdW5jYCBpbnZvY2F0aW9uIGlzIGRlZmVycmVkXG4gKiB1bnRpbCB0byB0aGUgbmV4dCB0aWNrLCBzaW1pbGFyIHRvIGBzZXRUaW1lb3V0YCB3aXRoIGEgdGltZW91dCBvZiBgMGAuXG4gKlxuICogU2VlIFtEYXZpZCBDb3JiYWNobydzIGFydGljbGVdKGh0dHBzOi8vY3NzLXRyaWNrcy5jb20vZGVib3VuY2luZy10aHJvdHRsaW5nLWV4cGxhaW5lZC1leGFtcGxlcy8pXG4gKiBmb3IgZGV0YWlscyBvdmVyIHRoZSBkaWZmZXJlbmNlcyBiZXR3ZWVuIGBfLmRlYm91bmNlYCBhbmQgYF8udGhyb3R0bGVgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gZGVib3VuY2UuXG4gKiBAcGFyYW0ge251bWJlcn0gW3dhaXQ9MF0gVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gZGVsYXkuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIFRoZSBvcHRpb25zIG9iamVjdC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVhZGluZz1mYWxzZV1cbiAqICBTcGVjaWZ5IGludm9raW5nIG9uIHRoZSBsZWFkaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWF4V2FpdF1cbiAqICBUaGUgbWF4aW11bSB0aW1lIGBmdW5jYCBpcyBhbGxvd2VkIHRvIGJlIGRlbGF5ZWQgYmVmb3JlIGl0J3MgaW52b2tlZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMudHJhaWxpbmc9dHJ1ZV1cbiAqICBTcGVjaWZ5IGludm9raW5nIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZGVib3VuY2VkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiAvLyBBdm9pZCBjb3N0bHkgY2FsY3VsYXRpb25zIHdoaWxlIHRoZSB3aW5kb3cgc2l6ZSBpcyBpbiBmbHV4LlxuICogalF1ZXJ5KHdpbmRvdykub24oJ3Jlc2l6ZScsIF8uZGVib3VuY2UoY2FsY3VsYXRlTGF5b3V0LCAxNTApKTtcbiAqXG4gKiAvLyBJbnZva2UgYHNlbmRNYWlsYCB3aGVuIGNsaWNrZWQsIGRlYm91bmNpbmcgc3Vic2VxdWVudCBjYWxscy5cbiAqIGpRdWVyeShlbGVtZW50KS5vbignY2xpY2snLCBfLmRlYm91bmNlKHNlbmRNYWlsLCAzMDAsIHtcbiAqICAgJ2xlYWRpbmcnOiB0cnVlLFxuICogICAndHJhaWxpbmcnOiBmYWxzZVxuICogfSkpO1xuICpcbiAqIC8vIEVuc3VyZSBgYmF0Y2hMb2dgIGlzIGludm9rZWQgb25jZSBhZnRlciAxIHNlY29uZCBvZiBkZWJvdW5jZWQgY2FsbHMuXG4gKiB2YXIgZGVib3VuY2VkID0gXy5kZWJvdW5jZShiYXRjaExvZywgMjUwLCB7ICdtYXhXYWl0JzogMTAwMCB9KTtcbiAqIHZhciBzb3VyY2UgPSBuZXcgRXZlbnRTb3VyY2UoJy9zdHJlYW0nKTtcbiAqIGpRdWVyeShzb3VyY2UpLm9uKCdtZXNzYWdlJywgZGVib3VuY2VkKTtcbiAqXG4gKiAvLyBDYW5jZWwgdGhlIHRyYWlsaW5nIGRlYm91bmNlZCBpbnZvY2F0aW9uLlxuICogalF1ZXJ5KHdpbmRvdykub24oJ3BvcHN0YXRlJywgZGVib3VuY2VkLmNhbmNlbCk7XG4gKi9cbmZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIHdhaXQsIG9wdGlvbnMpIHtcbiAgdmFyIGxhc3RBcmdzLFxuICAgICAgbGFzdFRoaXMsXG4gICAgICBtYXhXYWl0LFxuICAgICAgcmVzdWx0LFxuICAgICAgdGltZXJJZCxcbiAgICAgIGxhc3RDYWxsVGltZSxcbiAgICAgIGxhc3RJbnZva2VUaW1lID0gMCxcbiAgICAgIGxlYWRpbmcgPSBmYWxzZSxcbiAgICAgIG1heGluZyA9IGZhbHNlLFxuICAgICAgdHJhaWxpbmcgPSB0cnVlO1xuXG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihGVU5DX0VSUk9SX1RFWFQpO1xuICB9XG4gIHdhaXQgPSB0b051bWJlcih3YWl0KSB8fCAwO1xuICBpZiAoaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICBsZWFkaW5nID0gISFvcHRpb25zLmxlYWRpbmc7XG4gICAgbWF4aW5nID0gJ21heFdhaXQnIGluIG9wdGlvbnM7XG4gICAgbWF4V2FpdCA9IG1heGluZyA/IG5hdGl2ZU1heCh0b051bWJlcihvcHRpb25zLm1heFdhaXQpIHx8IDAsIHdhaXQpIDogbWF4V2FpdDtcbiAgICB0cmFpbGluZyA9ICd0cmFpbGluZycgaW4gb3B0aW9ucyA/ICEhb3B0aW9ucy50cmFpbGluZyA6IHRyYWlsaW5nO1xuICB9XG5cbiAgZnVuY3Rpb24gaW52b2tlRnVuYyh0aW1lKSB7XG4gICAgdmFyIGFyZ3MgPSBsYXN0QXJncyxcbiAgICAgICAgdGhpc0FyZyA9IGxhc3RUaGlzO1xuXG4gICAgbGFzdEFyZ3MgPSBsYXN0VGhpcyA9IHVuZGVmaW5lZDtcbiAgICBsYXN0SW52b2tlVGltZSA9IHRpbWU7XG4gICAgcmVzdWx0ID0gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gbGVhZGluZ0VkZ2UodGltZSkge1xuICAgIC8vIFJlc2V0IGFueSBgbWF4V2FpdGAgdGltZXIuXG4gICAgbGFzdEludm9rZVRpbWUgPSB0aW1lO1xuICAgIC8vIFN0YXJ0IHRoZSB0aW1lciBmb3IgdGhlIHRyYWlsaW5nIGVkZ2UuXG4gICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICAvLyBJbnZva2UgdGhlIGxlYWRpbmcgZWRnZS5cbiAgICByZXR1cm4gbGVhZGluZyA/IGludm9rZUZ1bmModGltZSkgOiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiByZW1haW5pbmdXYWl0KHRpbWUpIHtcbiAgICB2YXIgdGltZVNpbmNlTGFzdENhbGwgPSB0aW1lIC0gbGFzdENhbGxUaW1lLFxuICAgICAgICB0aW1lU2luY2VMYXN0SW52b2tlID0gdGltZSAtIGxhc3RJbnZva2VUaW1lLFxuICAgICAgICByZXN1bHQgPSB3YWl0IC0gdGltZVNpbmNlTGFzdENhbGw7XG5cbiAgICByZXR1cm4gbWF4aW5nID8gbmF0aXZlTWluKHJlc3VsdCwgbWF4V2FpdCAtIHRpbWVTaW5jZUxhc3RJbnZva2UpIDogcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gc2hvdWxkSW52b2tlKHRpbWUpIHtcbiAgICB2YXIgdGltZVNpbmNlTGFzdENhbGwgPSB0aW1lIC0gbGFzdENhbGxUaW1lLFxuICAgICAgICB0aW1lU2luY2VMYXN0SW52b2tlID0gdGltZSAtIGxhc3RJbnZva2VUaW1lO1xuXG4gICAgLy8gRWl0aGVyIHRoaXMgaXMgdGhlIGZpcnN0IGNhbGwsIGFjdGl2aXR5IGhhcyBzdG9wcGVkIGFuZCB3ZSdyZSBhdCB0aGVcbiAgICAvLyB0cmFpbGluZyBlZGdlLCB0aGUgc3lzdGVtIHRpbWUgaGFzIGdvbmUgYmFja3dhcmRzIGFuZCB3ZSdyZSB0cmVhdGluZ1xuICAgIC8vIGl0IGFzIHRoZSB0cmFpbGluZyBlZGdlLCBvciB3ZSd2ZSBoaXQgdGhlIGBtYXhXYWl0YCBsaW1pdC5cbiAgICByZXR1cm4gKGxhc3RDYWxsVGltZSA9PT0gdW5kZWZpbmVkIHx8ICh0aW1lU2luY2VMYXN0Q2FsbCA+PSB3YWl0KSB8fFxuICAgICAgKHRpbWVTaW5jZUxhc3RDYWxsIDwgMCkgfHwgKG1heGluZyAmJiB0aW1lU2luY2VMYXN0SW52b2tlID49IG1heFdhaXQpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRpbWVyRXhwaXJlZCgpIHtcbiAgICB2YXIgdGltZSA9IG5vdygpO1xuICAgIGlmIChzaG91bGRJbnZva2UodGltZSkpIHtcbiAgICAgIHJldHVybiB0cmFpbGluZ0VkZ2UodGltZSk7XG4gICAgfVxuICAgIC8vIFJlc3RhcnQgdGhlIHRpbWVyLlxuICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgcmVtYWluaW5nV2FpdCh0aW1lKSk7XG4gIH1cblxuICBmdW5jdGlvbiB0cmFpbGluZ0VkZ2UodGltZSkge1xuICAgIHRpbWVySWQgPSB1bmRlZmluZWQ7XG5cbiAgICAvLyBPbmx5IGludm9rZSBpZiB3ZSBoYXZlIGBsYXN0QXJnc2Agd2hpY2ggbWVhbnMgYGZ1bmNgIGhhcyBiZWVuXG4gICAgLy8gZGVib3VuY2VkIGF0IGxlYXN0IG9uY2UuXG4gICAgaWYgKHRyYWlsaW5nICYmIGxhc3RBcmdzKSB7XG4gICAgICByZXR1cm4gaW52b2tlRnVuYyh0aW1lKTtcbiAgICB9XG4gICAgbGFzdEFyZ3MgPSBsYXN0VGhpcyA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgIGlmICh0aW1lcklkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcklkKTtcbiAgICB9XG4gICAgbGFzdEludm9rZVRpbWUgPSAwO1xuICAgIGxhc3RBcmdzID0gbGFzdENhbGxUaW1lID0gbGFzdFRoaXMgPSB0aW1lcklkID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgZnVuY3Rpb24gZmx1c2goKSB7XG4gICAgcmV0dXJuIHRpbWVySWQgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IHRyYWlsaW5nRWRnZShub3coKSk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWJvdW5jZWQoKSB7XG4gICAgdmFyIHRpbWUgPSBub3coKSxcbiAgICAgICAgaXNJbnZva2luZyA9IHNob3VsZEludm9rZSh0aW1lKTtcblxuICAgIGxhc3RBcmdzID0gYXJndW1lbnRzO1xuICAgIGxhc3RUaGlzID0gdGhpcztcbiAgICBsYXN0Q2FsbFRpbWUgPSB0aW1lO1xuXG4gICAgaWYgKGlzSW52b2tpbmcpIHtcbiAgICAgIGlmICh0aW1lcklkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGxlYWRpbmdFZGdlKGxhc3RDYWxsVGltZSk7XG4gICAgICB9XG4gICAgICBpZiAobWF4aW5nKSB7XG4gICAgICAgIC8vIEhhbmRsZSBpbnZvY2F0aW9ucyBpbiBhIHRpZ2h0IGxvb3AuXG4gICAgICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgICAgIHJldHVybiBpbnZva2VGdW5jKGxhc3RDYWxsVGltZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aW1lcklkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgZGVib3VuY2VkLmNhbmNlbCA9IGNhbmNlbDtcbiAgZGVib3VuY2VkLmZsdXNoID0gZmx1c2g7XG4gIHJldHVybiBkZWJvdW5jZWQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN5bWJvbGAgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHN5bWJvbCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3ltYm9sKFN5bWJvbC5pdGVyYXRvcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N5bWJvbCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzeW1ib2wnIHx8XG4gICAgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gc3ltYm9sVGFnKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgbnVtYmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgbnVtYmVyLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvTnVtYmVyKDMuMik7XG4gKiAvLyA9PiAzLjJcbiAqXG4gKiBfLnRvTnVtYmVyKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gNWUtMzI0XG4gKlxuICogXy50b051bWJlcihJbmZpbml0eSk7XG4gKiAvLyA9PiBJbmZpbml0eVxuICpcbiAqIF8udG9OdW1iZXIoJzMuMicpO1xuICogLy8gPT4gMy4yXG4gKi9cbmZ1bmN0aW9uIHRvTnVtYmVyKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiBOQU47XG4gIH1cbiAgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHZhciBvdGhlciA9IHR5cGVvZiB2YWx1ZS52YWx1ZU9mID09ICdmdW5jdGlvbicgPyB2YWx1ZS52YWx1ZU9mKCkgOiB2YWx1ZTtcbiAgICB2YWx1ZSA9IGlzT2JqZWN0KG90aGVyKSA/IChvdGhlciArICcnKSA6IG90aGVyO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IDAgPyB2YWx1ZSA6ICt2YWx1ZTtcbiAgfVxuICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UocmVUcmltLCAnJyk7XG4gIHZhciBpc0JpbmFyeSA9IHJlSXNCaW5hcnkudGVzdCh2YWx1ZSk7XG4gIHJldHVybiAoaXNCaW5hcnkgfHwgcmVJc09jdGFsLnRlc3QodmFsdWUpKVxuICAgID8gZnJlZVBhcnNlSW50KHZhbHVlLnNsaWNlKDIpLCBpc0JpbmFyeSA/IDIgOiA4KVxuICAgIDogKHJlSXNCYWRIZXgudGVzdCh2YWx1ZSkgPyBOQU4gOiArdmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlYm91bmNlO1xuIiwiZXhwb3J0ICogZnJvbSAnLi9rZXlib2FyZENvZGUnXG5leHBvcnQgKiBmcm9tICcuL2tleWJvYXJkQ29kZU1hcCciLCJcbmV4cG9ydCBlbnVtIEtleWJvYXJkQ29kZSB7XG5cdEJhY2tzcGFjZSxcblx0VGFiLFxuXHRFbnRlcixcblx0U2hpZnRMZWZ0LFxuXHRTaGlmdFJpZ2h0LFxuXHRDb250cm9sTGVmdCxcblx0Q29udHJvbFJpZ2h0LFxuXHRBbHRMZWZ0LFxuXHRBbHRSaWdodCxcblx0UGF1c2UsXG5cdENhcHNMb2NrLFxuXHRFc2NhcGUsXG5cdFNwYWNlLFxuXHRQYWdlVXAsXG5cdFBhZ2VEb3duLFxuXHRFbmQsXG5cdEhvbWUsXG5cdEFycm93TGVmdCxcblx0QXJyb3dVcCxcblx0QXJyb3dSaWdodCxcblx0QXJyb3dEb3duLFxuXHRQcmludFNjcmVlbixcblx0SW5zZXJ0LFxuXHREZWxldGUsXG5cdERpZ2l0MCxcblx0RGlnaXQxLFxuXHREaWdpdDIsXG5cdERpZ2l0Myxcblx0RGlnaXQ0LFxuXHREaWdpdDUsXG5cdERpZ2l0Nixcblx0RGlnaXQ3LFxuXHREaWdpdDgsXG5cdERpZ2l0OSxcblx0QXVkaW9Wb2x1bWVNdXRlLFxuXHRBdWRpb1ZvbHVtZURvd24sXG5cdEF1ZGlvVm9sdW1lVXAsXG5cdEtleUEsXG5cdEtleUIsXG5cdEtleUMsXG5cdEtleUQsXG5cdEtleUUsXG5cdEtleUYsXG5cdEtleUcsXG5cdEtleUgsXG5cdEtleUksXG5cdEtleUosXG5cdEtleUssXG5cdEtleUwsXG5cdEtleU0sXG5cdEtleU4sXG5cdEtleU8sXG5cdEtleVAsXG5cdEtleVEsXG5cdEtleVIsXG5cdEtleVMsXG5cdEtleVQsXG5cdEtleVUsXG5cdEtleVYsXG5cdEtleVcsXG5cdEtleVgsXG5cdEtleVksXG5cdEtleVosXG5cdE1ldGFMZWZ0LFxuXHRNZXRhUmlnaHQsXG5cdENvbnRleHRNZW51LFxuXHROdW1wYWQwLFxuXHROdW1wYWQxLFxuXHROdW1wYWQyLFxuXHROdW1wYWQzLFxuXHROdW1wYWQ0LFxuXHROdW1wYWQ1LFxuXHROdW1wYWQ2LFxuXHROdW1wYWQ3LFxuXHROdW1wYWQ4LFxuXHROdW1wYWQ5LFxuXHROdW1wYWRNdWx0aXBseSxcblx0TnVtcGFkQWRkLFxuXHROdW1wYWRTdWJ0cmFjdCxcblx0TnVtcGFkRGVjaW1hbCxcblx0TnVtcGFkRGl2aWRlLFxuXHRGMSxcblx0RjIsXG5cdEYzLFxuXHRGNCxcblx0RjUsXG5cdEY2LFxuXHRGNyxcblx0RjgsXG5cdEY5LFxuXHRGMTAsXG5cdEYxMSxcblx0RjEyLFxuXHROdW1Mb2NrLFxuXHRTY3JvbGxMb2NrLFxuXHRTZW1pY29sb24sXG5cdEVxdWFsLFxuXHRDb21tYSxcblx0TWludXMsXG5cdFBlcmlvZCxcblx0U2xhc2gsXG5cdEJhY2txdW90ZSxcblx0QnJhY2tldExlZnQsXG5cdEJhY2tzbGFzaCxcblx0QnJhY2tldFJpZ2h0LFxuXHRRdW90ZSxcbn1cbiIsImltcG9ydCB7IEtleWJvYXJkQ29kZSB9IGZyb20gJy4va2V5Ym9hcmRDb2RlJ1xuXG5leHBvcnQgY29uc3Qga2V5Ym9hcmRDb2RlTWFwOiBSZWNvcmQ8c3RyaW5nLCBLZXlib2FyZENvZGU+ID0ge1xuXHRCYWNrc3BhY2U6IEtleWJvYXJkQ29kZS5CYWNrc3BhY2UsXG5cdFRhYjogS2V5Ym9hcmRDb2RlLlRhYixcblx0RW50ZXI6IEtleWJvYXJkQ29kZS5FbnRlcixcblx0U2hpZnRMZWZ0OiBLZXlib2FyZENvZGUuU2hpZnRMZWZ0LFxuXHRTaGlmdFJpZ2h0OiBLZXlib2FyZENvZGUuU2hpZnRSaWdodCxcblx0Q29udHJvbExlZnQ6IEtleWJvYXJkQ29kZS5Db250cm9sTGVmdCxcblx0Q29udHJvbFJpZ2h0OiBLZXlib2FyZENvZGUuQ29udHJvbFJpZ2h0LFxuXHRBbHRMZWZ0OiBLZXlib2FyZENvZGUuQWx0TGVmdCxcblx0QWx0UmlnaHQ6IEtleWJvYXJkQ29kZS5BbHRSaWdodCxcblx0UGF1c2U6IEtleWJvYXJkQ29kZS5QYXVzZSxcblx0Q2Fwc0xvY2s6IEtleWJvYXJkQ29kZS5DYXBzTG9jayxcblx0RXNjYXBlOiBLZXlib2FyZENvZGUuRXNjYXBlLFxuXHRTcGFjZTogS2V5Ym9hcmRDb2RlLlNwYWNlLFxuXHRQYWdlVXA6IEtleWJvYXJkQ29kZS5QYWdlVXAsXG5cdFBhZ2VEb3duOiBLZXlib2FyZENvZGUuUGFnZURvd24sXG5cdEVuZDogS2V5Ym9hcmRDb2RlLkVuZCxcblx0SG9tZTogS2V5Ym9hcmRDb2RlLkhvbWUsXG5cdEFycm93TGVmdDogS2V5Ym9hcmRDb2RlLkFycm93TGVmdCxcblx0QXJyb3dVcDogS2V5Ym9hcmRDb2RlLkFycm93VXAsXG5cdEFycm93UmlnaHQ6IEtleWJvYXJkQ29kZS5BcnJvd1JpZ2h0LFxuXHRBcnJvd0Rvd246IEtleWJvYXJkQ29kZS5BcnJvd0Rvd24sXG5cdFByaW50U2NyZWVuOiBLZXlib2FyZENvZGUuUHJpbnRTY3JlZW4sXG5cdEluc2VydDogS2V5Ym9hcmRDb2RlLkluc2VydCxcblx0RGVsZXRlOiBLZXlib2FyZENvZGUuRGVsZXRlLFxuXHREaWdpdDA6IEtleWJvYXJkQ29kZS5EaWdpdDAsXG5cdERpZ2l0MTogS2V5Ym9hcmRDb2RlLkRpZ2l0MSxcblx0RGlnaXQyOiBLZXlib2FyZENvZGUuRGlnaXQyLFxuXHREaWdpdDM6IEtleWJvYXJkQ29kZS5EaWdpdDMsXG5cdERpZ2l0NDogS2V5Ym9hcmRDb2RlLkRpZ2l0NCxcblx0RGlnaXQ1OiBLZXlib2FyZENvZGUuRGlnaXQ1LFxuXHREaWdpdDY6IEtleWJvYXJkQ29kZS5EaWdpdDYsXG5cdERpZ2l0NzogS2V5Ym9hcmRDb2RlLkRpZ2l0Nyxcblx0RGlnaXQ4OiBLZXlib2FyZENvZGUuRGlnaXQ4LFxuXHREaWdpdDk6IEtleWJvYXJkQ29kZS5EaWdpdDksXG5cdEF1ZGlvVm9sdW1lTXV0ZTogS2V5Ym9hcmRDb2RlLkF1ZGlvVm9sdW1lTXV0ZSxcblx0QXVkaW9Wb2x1bWVEb3duOiBLZXlib2FyZENvZGUuQXVkaW9Wb2x1bWVEb3duLFxuXHRBdWRpb1ZvbHVtZVVwOiBLZXlib2FyZENvZGUuQXVkaW9Wb2x1bWVVcCxcblx0S2V5QTogS2V5Ym9hcmRDb2RlLktleUEsXG5cdEtleUI6IEtleWJvYXJkQ29kZS5LZXlCLFxuXHRLZXlDOiBLZXlib2FyZENvZGUuS2V5Qyxcblx0S2V5RDogS2V5Ym9hcmRDb2RlLktleUQsXG5cdEtleUU6IEtleWJvYXJkQ29kZS5LZXlFLFxuXHRLZXlGOiBLZXlib2FyZENvZGUuS2V5Rixcblx0S2V5RzogS2V5Ym9hcmRDb2RlLktleUcsXG5cdEtleUg6IEtleWJvYXJkQ29kZS5LZXlILFxuXHRLZXlJOiBLZXlib2FyZENvZGUuS2V5SSxcblx0S2V5SjogS2V5Ym9hcmRDb2RlLktleUosXG5cdEtleUs6IEtleWJvYXJkQ29kZS5LZXlLLFxuXHRLZXlMOiBLZXlib2FyZENvZGUuS2V5TCxcblx0S2V5TTogS2V5Ym9hcmRDb2RlLktleU0sXG5cdEtleU46IEtleWJvYXJkQ29kZS5LZXlOLFxuXHRLZXlPOiBLZXlib2FyZENvZGUuS2V5Tyxcblx0S2V5UDogS2V5Ym9hcmRDb2RlLktleVAsXG5cdEtleVE6IEtleWJvYXJkQ29kZS5LZXlRLFxuXHRLZXlSOiBLZXlib2FyZENvZGUuS2V5Uixcblx0S2V5UzogS2V5Ym9hcmRDb2RlLktleVMsXG5cdEtleVQ6IEtleWJvYXJkQ29kZS5LZXlULFxuXHRLZXlVOiBLZXlib2FyZENvZGUuS2V5VSxcblx0S2V5VjogS2V5Ym9hcmRDb2RlLktleVYsXG5cdEtleVc6IEtleWJvYXJkQ29kZS5LZXlXLFxuXHRLZXlYOiBLZXlib2FyZENvZGUuS2V5WCxcblx0S2V5WTogS2V5Ym9hcmRDb2RlLktleVksXG5cdEtleVo6IEtleWJvYXJkQ29kZS5LZXlaLFxuXHRNZXRhTGVmdDogS2V5Ym9hcmRDb2RlLk1ldGFMZWZ0LFxuXHRNZXRhUmlnaHQ6IEtleWJvYXJkQ29kZS5NZXRhUmlnaHQsXG5cdENvbnRleHRNZW51OiBLZXlib2FyZENvZGUuQ29udGV4dE1lbnUsXG5cdE51bXBhZDA6IEtleWJvYXJkQ29kZS5OdW1wYWQwLFxuXHROdW1wYWQxOiBLZXlib2FyZENvZGUuTnVtcGFkMSxcblx0TnVtcGFkMjogS2V5Ym9hcmRDb2RlLk51bXBhZDIsXG5cdE51bXBhZDM6IEtleWJvYXJkQ29kZS5OdW1wYWQzLFxuXHROdW1wYWQ0OiBLZXlib2FyZENvZGUuTnVtcGFkNCxcblx0TnVtcGFkNTogS2V5Ym9hcmRDb2RlLk51bXBhZDUsXG5cdE51bXBhZDY6IEtleWJvYXJkQ29kZS5OdW1wYWQ2LFxuXHROdW1wYWQ3OiBLZXlib2FyZENvZGUuTnVtcGFkNyxcblx0TnVtcGFkODogS2V5Ym9hcmRDb2RlLk51bXBhZDgsXG5cdE51bXBhZDk6IEtleWJvYXJkQ29kZS5OdW1wYWQ5LFxuXHROdW1wYWRNdWx0aXBseTogS2V5Ym9hcmRDb2RlLk51bXBhZE11bHRpcGx5LFxuXHROdW1wYWRBZGQ6IEtleWJvYXJkQ29kZS5OdW1wYWRBZGQsXG5cdE51bXBhZFN1YnRyYWN0OiBLZXlib2FyZENvZGUuTnVtcGFkU3VidHJhY3QsXG5cdE51bXBhZERlY2ltYWw6IEtleWJvYXJkQ29kZS5OdW1wYWREZWNpbWFsLFxuXHROdW1wYWREaXZpZGU6IEtleWJvYXJkQ29kZS5OdW1wYWREaXZpZGUsXG5cdEYxOiBLZXlib2FyZENvZGUuRjEsXG5cdEYyOiBLZXlib2FyZENvZGUuRjIsXG5cdEYzOiBLZXlib2FyZENvZGUuRjMsXG5cdEY0OiBLZXlib2FyZENvZGUuRjQsXG5cdEY1OiBLZXlib2FyZENvZGUuRjUsXG5cdEY2OiBLZXlib2FyZENvZGUuRjYsXG5cdEY3OiBLZXlib2FyZENvZGUuRjcsXG5cdEY4OiBLZXlib2FyZENvZGUuRjgsXG5cdEY5OiBLZXlib2FyZENvZGUuRjksXG5cdEYxMDogS2V5Ym9hcmRDb2RlLkYxMCxcblx0RjExOiBLZXlib2FyZENvZGUuRjExLFxuXHRGMTI6IEtleWJvYXJkQ29kZS5GMTIsXG5cdE51bUxvY2s6IEtleWJvYXJkQ29kZS5OdW1Mb2NrLFxuXHRTY3JvbGxMb2NrOiBLZXlib2FyZENvZGUuU2Nyb2xsTG9jayxcblx0U2VtaWNvbG9uOiBLZXlib2FyZENvZGUuU2VtaWNvbG9uLFxuXHRFcXVhbDogS2V5Ym9hcmRDb2RlLkVxdWFsLFxuXHRDb21tYTogS2V5Ym9hcmRDb2RlLkNvbW1hLFxuXHRNaW51czogS2V5Ym9hcmRDb2RlLk1pbnVzLFxuXHRQZXJpb2Q6IEtleWJvYXJkQ29kZS5QZXJpb2QsXG5cdFNsYXNoOiBLZXlib2FyZENvZGUuU2xhc2gsXG5cdEJhY2txdW90ZTogS2V5Ym9hcmRDb2RlLkJhY2txdW90ZSxcblx0QnJhY2tldExlZnQ6IEtleWJvYXJkQ29kZS5CcmFja2V0TGVmdCxcblx0QmFja3NsYXNoOiBLZXlib2FyZENvZGUuQmFja3NsYXNoLFxuXHRCcmFja2V0UmlnaHQ6IEtleWJvYXJkQ29kZS5CcmFja2V0UmlnaHQsXG5cdFF1b3RlOiBLZXlib2FyZENvZGUuUXVvdGVcbn1cbiIsImltcG9ydCB7IGF1dG9CaW5kIH0gZnJvbSAnLi4vdXRpbHMnXG5pbXBvcnQgeyBLb29yYUV4cG9ydHMgfSBmcm9tICcuL2tvb3JhQmluZGluZ3MnXG5cblxuZXhwb3J0IGNsYXNzIEdsdWVCYXNle1xuXG5cdGdsOiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0XG5cdHdhc21FeHBvcnRzOiBLb29yYUV4cG9ydHNcblxuXHRjb25zdHJ1Y3RvcihnbCl7XG5cdFx0dGhpcy5nbCA9IGdsXG5cdFx0YXV0b0JpbmQodGhpcylcblx0fVxuXG5cdG9uTG9hZCh3YXNtRXhwb3J0czogS29vcmFFeHBvcnRzKXtcblx0XHR0aGlzLndhc21FeHBvcnRzID0gd2FzbUV4cG9ydHNcblx0fVxuXG59IiwiaW1wb3J0IHsga2V5Ym9hcmRDb2RlTWFwIH0gZnJvbSAnLi4vY29uc3RhbnRzJ1xuaW1wb3J0IHsgX19BZGFwdGVkRXhwb3J0cyB9IGZyb20gJy4uL193YXNtL2RlYnVnJ1xuaW1wb3J0IHsgR2x1ZUJhc2UgfSBmcm9tICcuL0dsdWVCYXNlJ1xuaW1wb3J0IHsgS29vcmFFeHBvcnRzIH0gZnJvbSAnLi9rb29yYUJpbmRpbmdzJ1xuXG5cbmV4cG9ydCBjbGFzcyBJbnB1dEdsdWUgZXh0ZW5kcyBHbHVlQmFzZXtcblxuXG5cdGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnRcblxuXHRjb25zdHJ1Y3RvcihnbDogV2ViR0wyUmVuZGVyaW5nQ29udGV4dCwgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCl7XG5cdFx0c3VwZXIoZ2wpXG5cdFx0dGhpcy5jYW52YXMgPSBjYW52YXNcblx0fVxuXHRcblx0b25Mb2FkKHdhc21FeHBvcnRzOiBLb29yYUV4cG9ydHMpOiB2b2lkIHtcblx0XHRzdXBlci5vbkxvYWQod2FzbUV4cG9ydHMpXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlTW91c2VEb3duKVxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVNb3VzZVVwKVxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmhhbmRsZU1vdXNlTW92ZSlcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuaGFuZGxlS2V5RG93bilcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLmhhbmRsZUtleVVwKVxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIHRoaXMuaGFuZGxlV2hlZWwpXG5cdH1cblx0XG5cdGhhbmRsZVdoZWVsKGU6IFdoZWVsRXZlbnQpe1xuXHRcdHRoaXMud2FzbUV4cG9ydHMuaGFuZGxlTW91c2VXaGVlbChlLmRlbHRhWCwgZS5kZWx0YVkpXG5cdH1cblx0aGFuZGxlTW91c2VEb3duKGU6IE1vdXNlRXZlbnQpe1xuXHRcdHRoaXMud2FzbUV4cG9ydHMuaGFuZGxlTW91c2VEb3duKClcblx0fVxuXHRoYW5kbGVNb3VzZVVwKGU6IE1vdXNlRXZlbnQpe1xuXHRcdHRoaXMud2FzbUV4cG9ydHMuaGFuZGxlTW91c2VVcCgpXG5cdH1cblx0XG5cdGhhbmRsZUtleURvd24oZTogS2V5Ym9hcmRFdmVudCl7XG5cdFx0dGhpcy53YXNtRXhwb3J0cy5oYW5kbGVLZXlEb3duKGtleWJvYXJkQ29kZU1hcFtlLmNvZGVdKVx0XHRcblx0fVxuXHRoYW5kbGVLZXlVcChlOiBLZXlib2FyZEV2ZW50KXtcblx0XHR0aGlzLndhc21FeHBvcnRzLmhhbmRsZUtleVVwKGtleWJvYXJkQ29kZU1hcFtlLmNvZGVdKVxuXHR9XG5cdFxuXHRoYW5kbGVNb3VzZU1vdmUoZTogTW91c2VFdmVudCl7XG5cdFx0Y29uc3QgcmVjdCA9IHRoaXMuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cdFx0bGV0IHggPSAoZS5jbGllbnRYIC0gcmVjdC5sZWZ0KSAvIHJlY3Qud2lkdGhcblx0XHRsZXQgeSA9IChlLmNsaWVudFkgLSByZWN0LnRvcCkgLyByZWN0LmhlaWdodFxuXHRcdHggPSB4ICogMiAtIDFcblx0XHR5ID0geSAqIDIgLSAxXG5cdFx0dGhpcy53YXNtRXhwb3J0cy5oYW5kbGVNb3VzZU1vdmUoeCwgeSlcblx0fVxuXHRcblx0ZGlzcG9zZSgpe1xuXHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZU1vdXNlRG93bilcblx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlTW91c2VVcClcblx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5oYW5kbGVNb3VzZU1vdmUpXG5cdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleURvd24pXG5cdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5oYW5kbGVLZXlVcClcblx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2hlZWwnLCB0aGlzLmhhbmRsZVdoZWVsKVxuXHR9XG59IiwiaW1wb3J0IHsgYXBwbHlHTE92ZXJsb2FkcywgYXV0b0JpbmQgfSBmcm9tICcuLi91dGlscydcbmltcG9ydCB7IEdsdWVCYXNlIH0gZnJvbSAnLi9HbHVlQmFzZSdcbmltcG9ydCB7IElucHV0R2x1ZSB9IGZyb20gJy4vSW5wdXRHbHVlJ1xuaW1wb3J0IHsgRGVmYXVsdFdvcmxkT3B0aW9ucywgS29vcmFCaW5kaW5ncywga29vcmFCaW5kaW5ncyB9IGZyb20gJy4va29vcmFCaW5kaW5ncydcbmltcG9ydCB7IFJlbmRlckdsdWUgfSBmcm9tICcuL1JlbmRlckdsdWUnXG5cbmNvbnN0IGxpc3RlbiA9IChnbCwgdmFsKSA9PiB7XG5cdGNvbnN0IGZ1bmMgPSBnbFt2YWxdXG5cdGdsW3ZhbF0gPSAoLi4uYXJncykgPT4ge1xuXHRcdGNvbnNvbGUubG9nKGAke3ZhbH0gLSBgLCBhcmdzKVxuXHRcdGZ1bmMoLi4uYXJncylcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgS29vcmFMb2FkZXIgZXh0ZW5kcyBHbHVlQmFzZXtcblxuXHRnbHVlczogR2x1ZUJhc2VbXSA9IFtdXG5cdGV4dGVybklkOiBudW1iZXIgPSAwXG5cdGV4dGVybk1hcDogTWFwPG51bWJlciwgYW55PiA9IG5ldyBNYXAoKVxuXG5cdHJlbmRlckdsdWU6IFJlbmRlckdsdWVcblx0YW5pbUZyYW1lSWQ6IG51bWJlclxuXHRjb25zdHJ1Y3RvcihjYW52YXM/OiBIVE1MQ2FudmFzRWxlbWVudCl7XG5cdFx0Y2FudmFzID8/PSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgna29vcmEtY2FudmFzJykgYXMgSFRNTENhbnZhc0VsZW1lbnRcblx0XHRjYW52YXMgPz89IGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJykpXG5cdFx0Y29uc3QgZ2wgPSBjYW52YXMuZ2V0Q29udGV4dCgnd2ViZ2wyJylcblx0XHRzdXBlcihnbClcblx0XHRhdXRvQmluZChnbClcblx0XHRhcHBseUdMT3ZlcmxvYWRzKGdsKVxuXG5cdFx0dGhpcy5yZW5kZXJHbHVlID0gbmV3IFJlbmRlckdsdWUoZ2wsIGNhbnZhcylcblx0XHR0aGlzLmdsdWVzLnB1c2godGhpcylcblx0XHR0aGlzLmdsdWVzLnB1c2godGhpcy5yZW5kZXJHbHVlKVxuXHRcdHRoaXMuZ2x1ZXMucHVzaChuZXcgSW5wdXRHbHVlKGdsLCBjYW52YXMpKVxuXG5cdFx0Ly96ZXJvIG1lYW5zIG51bGxcblx0XHR0aGlzLmV4dGVybk1hcC5zZXQodGhpcy5leHRlcm5JZCsrLCBudWxsKVxuXHR9XG5cdGV4dGVyblNldCh2YWw6IGFueSl7XG5cdFx0aWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZClcblx0XHRcdHJldHVybiAwXG5cdFx0Y29uc3QgaWQgPSB0aGlzLmV4dGVybklkKytcblx0XHR0aGlzLmV4dGVybk1hcC5zZXQoaWQsIHZhbClcblx0XHRyZXR1cm4gaWRcblx0fVxuXHRleHRlcm5HZXQoaWQ6IG51bWJlcil7XG5cdFx0Y29uc3QgdmFsID0gdGhpcy5leHRlcm5NYXAuZ2V0KGlkKVxuXHRcdC8vIGNvbnNvbGUuZGlyKHZhbClcblx0XHRyZXR1cm4gdmFsXG5cdH1cblx0ZXh0ZXJuUmVtb3ZlKGlkOiBudW1iZXIpe1xuXHRcdHJldHVybiB0aGlzLmV4dGVybk1hcC5kZWxldGUoaWQpXG5cdH1cblxuXHRhc3luYyBsb2FkKHdhc21Vcmw/OiBzdHJpbmcsIGJpbmRpbmdzPzogS29vcmFCaW5kaW5ncyk6IFByb21pc2U8S29vcmFMb2FkZXI+e1xuXHRcdHdhc21VcmwgPz89ICcvZGVidWcud2FzbSdcblx0XHRiaW5kaW5ncyA/Pz0ga29vcmFCaW5kaW5nc1xuXHRcdGNvbnN0IHdhc21JbXBvcnRzID0ge1xuXHRcdFx0Z2w6IHRoaXMuZ2wsXG5cdFx0XHRob3N0OiB7XG5cdFx0XHRcdGxvZzogY29uc29sZS5sb2cuYmluZChjb25zb2xlKSxcblx0XHRcdFx0ZWxhcHNlZDogcGVyZm9ybWFuY2Uubm93LmJpbmQocGVyZm9ybWFuY2UpLFxuXHRcdFx0XHRub3c6IERhdGUubm93LmJpbmQoRGF0ZSksXG5cdFx0XHRcdHNldDogdGhpcy5leHRlcm5TZXQsXG5cdFx0XHRcdGdldDogdGhpcy5leHRlcm5HZXQsXG5cdFx0XHRcdHJlbW92ZTogdGhpcy5leHRlcm5SZW1vdmVcblx0XHRcdH0sXG5cdFx0XHRlbnY6IHt9XG5cdFx0fVxuXHRcdC8vIGNvbnNvbGUuZGlyKHdhc21JbXBvcnRzKVxuXHRcdGNvbnN0IHdhc21Nb2R1bGUgPSBhd2FpdCBXZWJBc3NlbWJseS5jb21waWxlU3RyZWFtaW5nKGZldGNoKHdhc21VcmwpKVxuXHRcdGNvbnN0IHdhc21FeHBvcnRzID0gYXdhaXQgYmluZGluZ3MuaW5zdGFudGlhdGUod2FzbU1vZHVsZSwgd2FzbUltcG9ydHMpXG5cdFx0Zm9yIChjb25zdCBnbHVlIG9mIHRoaXMuZ2x1ZXMpXG5cdFx0XHRnbHVlLm9uTG9hZCh3YXNtRXhwb3J0cylcblx0XHRcblx0XHRyZXR1cm4gdGhpc1xuXHR9XG5cdHN0YXJ0KG9wdGlvbnM6IGZhbHNlIHwgUGFydGlhbDxEZWZhdWx0V29ybGRPcHRpb25zPiA9IHt9KTogS29vcmFMb2FkZXJ7XHRcdFxuXHRcdGlmIChvcHRpb25zICE9PSBmYWxzZSlcblx0XHRcdHRoaXMud2FzbUV4cG9ydHMuZGVmYXVsdFdvcmxkKHtcblx0XHRcdFx0bGlnaHRzOiB0cnVlLFxuXHRcdFx0XHRjYW1lcmE6IHRydWUsXG5cdFx0XHRcdGdpem1vczogdHJ1ZSxcblx0XHRcdFx0Y2FtZXJhS2V5Ym9hcmRDb250cm9sbGVyOiBmYWxzZSxcblx0XHRcdFx0Y2FtZXJhTW91c2VDb250cm9sbGVyOiBmYWxzZSxcblx0XHRcdFx0aGVsbG9DdWJlOiBmYWxzZSxcblx0XHRcdFx0Li4ub3B0aW9uc1xuXHRcdFx0fSlcblx0XHR0aGlzLnJlbmRlckdsdWUucmVzaXplKClcblx0XHR0aGlzLnVwZGF0ZSgpXG5cdFx0cmV0dXJuIHRoaXNcblx0fVxuXHR1cGRhdGUoKXtcblx0XHR0aGlzLndhc21FeHBvcnRzLnVwZGF0ZSgpXG5cdFx0dGhpcy5hbmltRnJhbWVJZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZSlcblx0fVxuXHRcblx0cnVuT25jZSgpOiBLb29yYUxvYWRlcntcblx0XHR0aGlzLnN0YXJ0KClcblx0XHRjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1GcmFtZUlkKVxuXHRcdHJldHVybiB0aGlzXG5cdH1cblxufVxuXG5pbnRlcmZhY2UgSW5pdE9wdGlvbnN7XG5cdGNhbnZhcz86IEhUTUxDYW52YXNFbGVtZW50XG5cdHdhc21Vcmw/OiBzdHJpbmdcblx0YmluZGluZ3M/OiBLb29yYUJpbmRpbmdzXG5cdGRlZmF1bHRXb3JsZD86IGZhbHNlIHwgUGFydGlhbDxEZWZhdWx0V29ybGRPcHRpb25zPlxufVxuXG5leHBvcnQgY29uc3QgaW5pdEtvb3JhID0gYXN5bmMoeyBjYW52YXMsIHdhc21VcmwsIGJpbmRpbmdzLCBkZWZhdWx0V29ybGQgfTogSW5pdE9wdGlvbnMgPSB7fSkgPT4ge1x0XG5cdGNvbnN0IGxvYWRlciA9IG5ldyBLb29yYUxvYWRlcihjYW52YXMpXG5cdGF3YWl0IGxvYWRlci5sb2FkKHdhc21VcmwsIGJpbmRpbmdzKVxuXHRsb2FkZXIuc3RhcnQoZGVmYXVsdFdvcmxkKVxuXHRyZXR1cm4gbG9hZGVyXG59XG4vL0B0cy1pZ25vcmVcbndpbmRvdy5pbml0S29vcmEgPSBpbml0S29vcmFcbiIsImltcG9ydCB7IERlYm91bmNlUmVzaXplT2JzZXJ2ZXIgfSBmcm9tICcuLi91dGlscydcbmltcG9ydCB7IEdsdWVCYXNlIH0gZnJvbSAnLi9HbHVlQmFzZSdcbmltcG9ydCB7IEtvb3JhRXhwb3J0cyB9IGZyb20gJy4va29vcmFCaW5kaW5ncydcblxuZXhwb3J0IGNsYXNzIFJlbmRlckdsdWUgZXh0ZW5kcyBHbHVlQmFzZXtcblxuXHRjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50XG5cdHJlc2l6ZU9ic2VydmVyOiBEZWJvdW5jZVJlc2l6ZU9ic2VydmVyXG5cblx0Y29uc3RydWN0b3IoZ2w6IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQsIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpe1xuXHRcdHN1cGVyKGdsKVxuXHRcdHRoaXMuY2FudmFzID0gY2FudmFzXG5cdFx0dGhpcy5yZXNpemVPYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcih0aGlzLnJlc2l6ZSlcblx0XHR0aGlzLnJlc2l6ZU9ic2VydmVyLm9ic2VydmUodGhpcy5jYW52YXMucGFyZW50RWxlbWVudClcblx0fVxuXG5cdHJlc2l6ZSgpe1xuXHRcdGNvbnN0IHdpZHRoID0gdGhpcy5jYW52YXMuY2xpZW50V2lkdGhcblx0XHRjb25zdCBoZWlnaHQgPSB0aGlzLmNhbnZhcy5jbGllbnRIZWlnaHRcblx0XHR0aGlzLmNhbnZhcy53aWR0aCA9IHdpZHRoXG5cdFx0dGhpcy5jYW52YXMuaGVpZ2h0ID0gaGVpZ2h0XG5cdFx0dGhpcy53YXNtRXhwb3J0cz8uaGFuZGxlUmVzaXplKHdpZHRoLCBoZWlnaHQpXG5cdFx0dGhpcy53YXNtRXhwb3J0cz8udXBkYXRlKClcblx0fVxufSIsImltcG9ydCAqIGFzIGtvb3JhQmluZGluZ3MgZnJvbSAnLi4vX3dhc20vZGVidWcnXG5leHBvcnQgdHlwZSBLb29yYUV4cG9ydHMgPSB0eXBlb2Yga29vcmFCaW5kaW5ncy5fX0FkYXB0ZWRFeHBvcnRzXG5leHBvcnQgdHlwZSBLb29yYUJpbmRpbmdzID0gdHlwZW9mIGtvb3JhQmluZGluZ3NcbmV4cG9ydCB0eXBlIERlZmF1bHRXb3JsZE9wdGlvbnMgPSBQYXJhbWV0ZXJzPHR5cGVvZiBrb29yYUJpbmRpbmdzLl9fQWRhcHRlZEV4cG9ydHMuZGVmYXVsdFdvcmxkPlswXVxuZXhwb3J0IHtcblx0a29vcmFCaW5kaW5nc1xufSIsImltcG9ydCB7IGluaXRLb29yYSB9IGZyb20gJy4vS29vcmFMb2FkZXInXG5cblxuXG5leHBvcnQgY29uc3QgdHJ5VGVzdFJ1biA9IGFzeW5jKCkgPT4ge1xuXHRjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpXG5cdGlmICghcGFyYW1zLmhhcygna3Rlc3QnKSlcblx0XHRyZXR1cm5cblx0XG5cdGNvbnN0IGNhbWVyYUtleWJvYXJkQ29udHJvbGxlciA9ICEocGFyYW1zLmdldCgnYm9hcmQnKSA9PT0gJ2ZhbHNlJylcblx0Y29uc3QgY2FtZXJhTW91c2VDb250cm9sbGVyID0gIShwYXJhbXMuZ2V0KCdtb3VzZScpID09PSAnZmFsc2UnKVxuXG5cdC8vQHRzLWlnbm9yZVxuXHRhd2FpdCBpbXBvcnQoJy4vdGVzdFJ1blN0eWxlLmNzcycpXG5cdGNvbnN0IHsgd2FzbUV4cG9ydHMgfSA9IGF3YWl0IGluaXRLb29yYSh7XG5cdFx0ZGVmYXVsdFdvcmxkOiB7XG5cdFx0XHRjYW1lcmFLZXlib2FyZENvbnRyb2xsZXIsXG5cdFx0XHRjYW1lcmFNb3VzZUNvbnRyb2xsZXIsXG5cdFx0fVxuXHR9KVxuXHRjb25zdCBhID0gd2FzbUV4cG9ydHMucm90YXRpbmdDdWJlKHdhc21FeHBvcnRzLmxpdFNoYWRlci52YWx1ZSlcbn1cblxudHJ5VGVzdFJ1bigpIiwiXG5pbXBvcnQgZGVib3VuY2UgZnJvbSAnbG9kYXNoLmRlYm91bmNlJ1xuXG5leHBvcnQgY29uc3QgRGVib3VuY2VSZXNpemVPYnNlcnZlciA9IChjYjogUmVzaXplT2JzZXJ2ZXJDYWxsYmFjaywgZGVsYXkgPSAxKSA9PiBcblx0bmV3IFJlc2l6ZU9ic2VydmVyKGRlYm91bmNlKGNiLCBkZWxheSkpXG5cbmV4cG9ydCB0eXBlIERlYm91bmNlUmVzaXplT2JzZXJ2ZXIgPSBSZXR1cm5UeXBlPHR5cGVvZiBEZWJvdW5jZVJlc2l6ZU9ic2VydmVyPlxuIiwiLyogZXNsaW50LWRpc2FibGUgKi9cbi8vQHRzLW5vY2hlY2tcbi8vIEdldHMgYWxsIG5vbi1idWlsdGluIHByb3BlcnRpZXMgdXAgdGhlIHByb3RvdHlwZSBjaGFpbi5cbmNvbnN0IGdldEFsbFByb3BlcnRpZXMgPSBvYmplY3QgPT4ge1xuXHRjb25zdCBwcm9wZXJ0aWVzID0gbmV3IFNldCgpXG5cblx0ZG8ge1xuXHRcdGZvciAoY29uc3Qga2V5IG9mIFJlZmxlY3Qub3duS2V5cyhvYmplY3QpKSB7XG5cdFx0XHRwcm9wZXJ0aWVzLmFkZChbb2JqZWN0LCBrZXldKVxuXHRcdH1cblx0fSB3aGlsZSAoKG9iamVjdCA9IFJlZmxlY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KSkgJiYgb2JqZWN0ICE9PSBPYmplY3QucHJvdG90eXBlKVxuXG5cdHJldHVybiBwcm9wZXJ0aWVzXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhdXRvQmluZDxUPihzZWxmOlQsIHsgaW5jbHVkZSwgZXhjbHVkZSB9ID0ge30pOlQge1xuXHRjb25zdCBmaWx0ZXIgPSBrZXkgPT4ge1xuXHRcdGNvbnN0IG1hdGNoID0gcGF0dGVybiA9PiB0eXBlb2YgcGF0dGVybiA9PT0gJ3N0cmluZycgPyBrZXkgPT09IHBhdHRlcm4gOiBwYXR0ZXJuLnRlc3Qoa2V5KVxuXG5cdFx0aWYgKGluY2x1ZGUpIHtcblx0XHRcdHJldHVybiBpbmNsdWRlLnNvbWUobWF0Y2gpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgdW5pY29ybi9uby1hcnJheS1jYWxsYmFjay1yZWZlcmVuY2Vcblx0XHR9XG5cblx0XHRpZiAoZXhjbHVkZSkge1xuXHRcdFx0cmV0dXJuICFleGNsdWRlLnNvbWUobWF0Y2gpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgdW5pY29ybi9uby1hcnJheS1jYWxsYmFjay1yZWZlcmVuY2Vcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZVxuXHR9XG5cblx0Zm9yIChjb25zdCBbb2JqZWN0LCBrZXldIG9mIGdldEFsbFByb3BlcnRpZXMoc2VsZi5jb25zdHJ1Y3Rvci5wcm90b3R5cGUpKSB7XG5cdFx0aWYgKGtleSA9PT0gJ2NvbnN0cnVjdG9yJyB8fCAhZmlsdGVyKGtleSkpIHtcblx0XHRcdGNvbnRpbnVlXG5cdFx0fVxuXG5cdFx0Y29uc3QgZGVzY3JpcHRvciA9IFJlZmxlY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwga2V5KVxuXHRcdGlmIChkZXNjcmlwdG9yICYmIHR5cGVvZiBkZXNjcmlwdG9yLnZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRzZWxmW2tleV0gPSBzZWxmW2tleV0uYmluZChzZWxmKVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBzZWxmXG59XG4iLCJcbmV4cG9ydCBjb25zdCBhcHBseUdMT3ZlcmxvYWRzID0gKGdsOiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0KSA9PiB7XG5cdGNvbnN0IGdsT3ZlcmxvYWRzID0gW1xuXHRcdFsnY29tcHJlc3NlZFRleEltYWdlM0QnLCAyXSxcblx0XHRbJ2NvbXByZXNzZWRUZXhTdWJJbWFnZTNEJywgMl0sXG5cdFx0WydnZXRBY3RpdmVVbmlmb3JtQmxvY2tQYXJhbWV0ZXInLCAyXSxcblx0XHRbJ2dldEFjdGl2ZVVuaWZvcm1zJywgMl0sXG5cdFx0Wyd0ZXhJbWFnZTNEJywgNF0sXG5cdFx0Wyd0ZXhTdWJJbWFnZTNEJywgM10sXG5cdFx0WydidWZmZXJEYXRhJywgN10sXG5cdFx0WydidWZmZXJTdWJEYXRhJywgMl0sXG5cdFx0Wydjb21wcmVzc2VkVGV4SW1hZ2UyRCcsIDJdLFxuXHRcdFsnY29tcHJlc3NlZFRleFN1YkltYWdlMkQnLCAyXSxcblx0XHRbJ3JlYWRQaXhlbHMnLCAzXSxcblx0XHRbJ3RleEltYWdlMkQnLCA2XSxcblx0XHRbJ3RleFN1YkltYWdlMkQnLCA1XSxcblx0XHRbJ2dldEJ1ZmZlclBhcmFtZXRlcicsIDJdLFxuXHRcdFsnZ2V0UHJvZ3JhbVBhcmFtZXRlcicsIDJdLFxuXHRcdFsnZ2V0U2hhZGVyUGFyYW1ldGVyJywgMl0sXG5cdF1cblx0Z2xPdmVybG9hZHMuZm9yRWFjaCgoW2tleSwgY291bnRdKSA9PiB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKVxuXHRcdFx0Z2xbYCR7a2V5fV9fJHtpICsgMX1gXSA9IGdsW2tleV1cblx0fSlcbn0iLCJleHBvcnQgKiBmcm9tICcuL0RlYm91bmNlUmVzaXplT2JzZXJ2ZXInXG5leHBvcnQgKiBmcm9tICcuL2NsYXNzVXRpbHMnXG5leHBvcnQgKiBmcm9tICcuL2F1dG9CaW5kJyIsImV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbnN0YW50aWF0ZShtb2R1bGUsIGltcG9ydHMgPSB7fSkge1xuICBjb25zdCBfX21vZHVsZTAgPSBpbXBvcnRzLmdsO1xuICBjb25zdCBfX21vZHVsZTEgPSBpbXBvcnRzLmhvc3Q7XG4gIGNvbnN0IGFkYXB0ZWRJbXBvcnRzID0ge1xuICAgIGVudjogT2JqZWN0LmFzc2lnbihPYmplY3QuY3JlYXRlKGdsb2JhbFRoaXMpLCBpbXBvcnRzLmVudiB8fCB7fSwge1xuICAgICAgc2VlZCgpIHtcbiAgICAgICAgLy8gfmxpYi9idWlsdGlucy9zZWVkKCkgPT4gZjY0XG4gICAgICAgIHJldHVybiAoKCkgPT4ge1xuICAgICAgICAgIC8vIEBleHRlcm5hbC5qc1xuICAgICAgICAgIHJldHVybiBEYXRlLm5vdygpICogTWF0aC5yYW5kb20oKTtcbiAgICAgICAgfSkoKTtcbiAgICAgIH0sXG4gICAgICBhYm9ydChtZXNzYWdlLCBmaWxlTmFtZSwgbGluZU51bWJlciwgY29sdW1uTnVtYmVyKSB7XG4gICAgICAgIC8vIH5saWIvYnVpbHRpbnMvYWJvcnQofmxpYi9zdHJpbmcvU3RyaW5nIHwgbnVsbD8sIH5saWIvc3RyaW5nL1N0cmluZyB8IG51bGw/LCB1MzI/LCB1MzI/KSA9PiB2b2lkXG4gICAgICAgIG1lc3NhZ2UgPSBfX2xpZnRTdHJpbmcobWVzc2FnZSA+Pj4gMCk7XG4gICAgICAgIGZpbGVOYW1lID0gX19saWZ0U3RyaW5nKGZpbGVOYW1lID4+PiAwKTtcbiAgICAgICAgbGluZU51bWJlciA9IGxpbmVOdW1iZXIgPj4+IDA7XG4gICAgICAgIGNvbHVtbk51bWJlciA9IGNvbHVtbk51bWJlciA+Pj4gMDtcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICAvLyBAZXh0ZXJuYWwuanNcbiAgICAgICAgICB0aHJvdyBFcnJvcihgJHttZXNzYWdlfSBpbiAke2ZpbGVOYW1lfToke2xpbmVOdW1iZXJ9OiR7Y29sdW1uTnVtYmVyfWApO1xuICAgICAgICB9KSgpO1xuICAgICAgfSxcbiAgICB9KSxcbiAgICBnbDogT2JqZWN0LmFzc2lnbihPYmplY3QuY3JlYXRlKF9fbW9kdWxlMCksIHtcbiAgICAgIGNsZWFyKG1hc2spIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9jbGVhcih1MzIpID0+IHZvaWRcbiAgICAgICAgbWFzayA9IG1hc2sgPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC5jbGVhcihtYXNrKTtcbiAgICAgIH0sXG4gICAgICBjcmVhdGVTaGFkZXIodHlwZSkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2NyZWF0ZVNoYWRlcih1MzIpID0+IGV4dGVybnJlZlxuICAgICAgICB0eXBlID0gdHlwZSA+Pj4gMDtcbiAgICAgICAgcmV0dXJuIF9fbW9kdWxlMC5jcmVhdGVTaGFkZXIodHlwZSk7XG4gICAgICB9LFxuICAgICAgc2hhZGVyU291cmNlKHNoYWRlciwgc291cmNlKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvc2hhZGVyU291cmNlKGV4dGVybnJlZiwgfmxpYi9zdHJpbmcvU3RyaW5nKSA9PiB2b2lkXG4gICAgICAgIHNvdXJjZSA9IF9fbGlmdFN0cmluZyhzb3VyY2UgPj4+IDApO1xuICAgICAgICBfX21vZHVsZTAuc2hhZGVyU291cmNlKHNoYWRlciwgc291cmNlKTtcbiAgICAgIH0sXG4gICAgICBnZXRTaGFkZXJQYXJhbWV0ZXJfXzEoc2hhZGVyLCBwbmFtZSkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2dldFNoYWRlclBhcmFtZXRlcl9fMShleHRlcm5yZWYsIHUzMikgPT4gYm9vbFxuICAgICAgICBwbmFtZSA9IHBuYW1lID4+PiAwO1xuICAgICAgICByZXR1cm4gX19tb2R1bGUwLmdldFNoYWRlclBhcmFtZXRlcl9fMShzaGFkZXIsIHBuYW1lKSA/IDEgOiAwO1xuICAgICAgfSxcbiAgICAgIGdldFNoYWRlckluZm9Mb2coc2hhZGVyKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvZ2V0U2hhZGVySW5mb0xvZyhleHRlcm5yZWYpID0+IH5saWIvc3RyaW5nL1N0cmluZ1xuICAgICAgICByZXR1cm4gX19sb3dlclN0cmluZyhfX21vZHVsZTAuZ2V0U2hhZGVySW5mb0xvZyhzaGFkZXIpKSB8fCBfX25vdG51bGwoKTtcbiAgICAgIH0sXG4gICAgICB0cmFuc2Zvcm1GZWVkYmFja1ZhcnlpbmdzKHByb2dyYW0sIHZhcnlpbmdzLCBidWZmZXJNb2RlKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvdHJhbnNmb3JtRmVlZGJhY2tWYXJ5aW5ncyhleHRlcm5yZWYsIH5saWIvYXJyYXkvQXJyYXk8fmxpYi9zdHJpbmcvU3RyaW5nPiwgdTMyKSA9PiB2b2lkXG4gICAgICAgIHZhcnlpbmdzID0gX19saWZ0QXJyYXkocG9pbnRlciA9PiBfX2xpZnRTdHJpbmcobmV3IFVpbnQzMkFycmF5KG1lbW9yeS5idWZmZXIpW3BvaW50ZXIgPj4+IDJdKSwgMiwgdmFyeWluZ3MgPj4+IDApO1xuICAgICAgICBidWZmZXJNb2RlID0gYnVmZmVyTW9kZSA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLnRyYW5zZm9ybUZlZWRiYWNrVmFyeWluZ3MocHJvZ3JhbSwgdmFyeWluZ3MsIGJ1ZmZlck1vZGUpO1xuICAgICAgfSxcbiAgICAgIGdldFByb2dyYW1QYXJhbWV0ZXJfXzEocHJvZ3JhbSwgcG5hbWUpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9nZXRQcm9ncmFtUGFyYW1ldGVyX18xKGV4dGVybnJlZiwgdTMyKSA9PiBib29sXG4gICAgICAgIHBuYW1lID0gcG5hbWUgPj4+IDA7XG4gICAgICAgIHJldHVybiBfX21vZHVsZTAuZ2V0UHJvZ3JhbVBhcmFtZXRlcl9fMShwcm9ncmFtLCBwbmFtZSkgPyAxIDogMDtcbiAgICAgIH0sXG4gICAgICBnZXRQcm9ncmFtSW5mb0xvZyhwcm9ncmFtKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvZ2V0UHJvZ3JhbUluZm9Mb2coZXh0ZXJucmVmKSA9PiB+bGliL3N0cmluZy9TdHJpbmdcbiAgICAgICAgcmV0dXJuIF9fbG93ZXJTdHJpbmcoX19tb2R1bGUwLmdldFByb2dyYW1JbmZvTG9nKHByb2dyYW0pKSB8fCBfX25vdG51bGwoKTtcbiAgICAgIH0sXG4gICAgICBiaW5kQnVmZmVyKHRhcmdldCwgYnVmZmVyKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvYmluZEJ1ZmZlcih1MzIsIGV4dGVybnJlZikgPT4gdm9pZFxuICAgICAgICB0YXJnZXQgPSB0YXJnZXQgPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC5iaW5kQnVmZmVyKHRhcmdldCwgYnVmZmVyKTtcbiAgICAgIH0sXG4gICAgICBidWZmZXJEYXRhX18zKHRhcmdldCwgc3JjRGF0YSwgdXNhZ2UpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9idWZmZXJEYXRhX18zKHUzMiwgfmxpYi90eXBlZGFycmF5L0Zsb2F0MzJBcnJheSwgdTMyKSA9PiB2b2lkXG4gICAgICAgIHRhcmdldCA9IHRhcmdldCA+Pj4gMDtcbiAgICAgICAgc3JjRGF0YSA9IF9fbGlmdFR5cGVkQXJyYXkoRmxvYXQzMkFycmF5LCBzcmNEYXRhID4+PiAwKTtcbiAgICAgICAgdXNhZ2UgPSB1c2FnZSA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLmJ1ZmZlckRhdGFfXzModGFyZ2V0LCBzcmNEYXRhLCB1c2FnZSk7XG4gICAgICB9LFxuICAgICAgYnVmZmVyRGF0YV9fNCh0YXJnZXQsIHNyY0RhdGEsIHVzYWdlKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvYnVmZmVyRGF0YV9fNCh1MzIsIH5saWIvdHlwZWRhcnJheS9VaW50OEFycmF5LCB1MzIpID0+IHZvaWRcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0ID4+PiAwO1xuICAgICAgICBzcmNEYXRhID0gX19saWZ0VHlwZWRBcnJheShVaW50OEFycmF5LCBzcmNEYXRhID4+PiAwKTtcbiAgICAgICAgdXNhZ2UgPSB1c2FnZSA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLmJ1ZmZlckRhdGFfXzQodGFyZ2V0LCBzcmNEYXRhLCB1c2FnZSk7XG4gICAgICB9LFxuICAgICAgZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgbmFtZSkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2dldEF0dHJpYkxvY2F0aW9uKGV4dGVybnJlZiwgfmxpYi9zdHJpbmcvU3RyaW5nKSA9PiBpMzJcbiAgICAgICAgbmFtZSA9IF9fbGlmdFN0cmluZyhuYW1lID4+PiAwKTtcbiAgICAgICAgcmV0dXJuIF9fbW9kdWxlMC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCBuYW1lKTtcbiAgICAgIH0sXG4gICAgICBlbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShpbmRleCkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2VuYWJsZVZlcnRleEF0dHJpYkFycmF5KHUzMikgPT4gdm9pZFxuICAgICAgICBpbmRleCA9IGluZGV4ID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoaW5kZXgpO1xuICAgICAgfSxcbiAgICAgIHZlcnRleEF0dHJpYlBvaW50ZXIoaW5kZXgsIHNpemUsIHR5cGUsIG5vcm1hbGl6ZWQsIHN0cmlkZSwgb2Zmc2V0KSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvdmVydGV4QXR0cmliUG9pbnRlcih1MzIsIGkzMiwgdTMyLCBib29sLCBpMzIsIGkzMikgPT4gdm9pZFxuICAgICAgICBpbmRleCA9IGluZGV4ID4+PiAwO1xuICAgICAgICB0eXBlID0gdHlwZSA+Pj4gMDtcbiAgICAgICAgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZWQgIT0gMDtcbiAgICAgICAgX19tb2R1bGUwLnZlcnRleEF0dHJpYlBvaW50ZXIoaW5kZXgsIHNpemUsIHR5cGUsIG5vcm1hbGl6ZWQsIHN0cmlkZSwgb2Zmc2V0KTtcbiAgICAgIH0sXG4gICAgICB2ZXJ0ZXhBdHRyaWJEaXZpc29yKGluZGV4LCBkaXZpc29yKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvdmVydGV4QXR0cmliRGl2aXNvcih1MzIsIHUzMikgPT4gdm9pZFxuICAgICAgICBpbmRleCA9IGluZGV4ID4+PiAwO1xuICAgICAgICBkaXZpc29yID0gZGl2aXNvciA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLnZlcnRleEF0dHJpYkRpdmlzb3IoaW5kZXgsIGRpdmlzb3IpO1xuICAgICAgfSxcbiAgICAgIGJ1ZmZlckRhdGFfXzUodGFyZ2V0LCBzcmNEYXRhLCB1c2FnZSkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2J1ZmZlckRhdGFfXzUodTMyLCB+bGliL3R5cGVkYXJyYXkvVWludDE2QXJyYXksIHUzMikgPT4gdm9pZFxuICAgICAgICB0YXJnZXQgPSB0YXJnZXQgPj4+IDA7XG4gICAgICAgIHNyY0RhdGEgPSBfX2xpZnRUeXBlZEFycmF5KFVpbnQxNkFycmF5LCBzcmNEYXRhID4+PiAwKTtcbiAgICAgICAgdXNhZ2UgPSB1c2FnZSA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLmJ1ZmZlckRhdGFfXzUodGFyZ2V0LCBzcmNEYXRhLCB1c2FnZSk7XG4gICAgICB9LFxuICAgICAgYmluZFRyYW5zZm9ybUZlZWRiYWNrKHRhcmdldCwgdGYpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9iaW5kVHJhbnNmb3JtRmVlZGJhY2sodTMyLCBleHRlcm5yZWYpID0+IHZvaWRcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0ID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAuYmluZFRyYW5zZm9ybUZlZWRiYWNrKHRhcmdldCwgdGYpO1xuICAgICAgfSxcbiAgICAgIGJpbmRCdWZmZXJCYXNlKHRhcmdldCwgaW5kZXgsIGJ1ZmZlcikge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2JpbmRCdWZmZXJCYXNlKHUzMiwgdTMyLCBleHRlcm5yZWYpID0+IHZvaWRcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0ID4+PiAwO1xuICAgICAgICBpbmRleCA9IGluZGV4ID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAuYmluZEJ1ZmZlckJhc2UodGFyZ2V0LCBpbmRleCwgYnVmZmVyKTtcbiAgICAgIH0sXG4gICAgICBnZXRVbmlmb3JtQmxvY2tJbmRleChwcm9ncmFtLCB1bmlmb3JtQmxvY2tOYW1lKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvZ2V0VW5pZm9ybUJsb2NrSW5kZXgoZXh0ZXJucmVmLCB+bGliL3N0cmluZy9TdHJpbmcpID0+IHUzMlxuICAgICAgICB1bmlmb3JtQmxvY2tOYW1lID0gX19saWZ0U3RyaW5nKHVuaWZvcm1CbG9ja05hbWUgPj4+IDApO1xuICAgICAgICByZXR1cm4gX19tb2R1bGUwLmdldFVuaWZvcm1CbG9ja0luZGV4KHByb2dyYW0sIHVuaWZvcm1CbG9ja05hbWUpO1xuICAgICAgfSxcbiAgICAgIGdldEFjdGl2ZVVuaWZvcm1CbG9ja1BhcmFtZXRlcl9fMShwcm9ncmFtLCB1bmlmb3JtQmxvY2tJbmRleCwgcG5hbWUpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9nZXRBY3RpdmVVbmlmb3JtQmxvY2tQYXJhbWV0ZXJfXzEoZXh0ZXJucmVmLCB1MzIsIHUzMikgPT4gdTMyXG4gICAgICAgIHVuaWZvcm1CbG9ja0luZGV4ID0gdW5pZm9ybUJsb2NrSW5kZXggPj4+IDA7XG4gICAgICAgIHBuYW1lID0gcG5hbWUgPj4+IDA7XG4gICAgICAgIHJldHVybiBfX21vZHVsZTAuZ2V0QWN0aXZlVW5pZm9ybUJsb2NrUGFyYW1ldGVyX18xKHByb2dyYW0sIHVuaWZvcm1CbG9ja0luZGV4LCBwbmFtZSk7XG4gICAgICB9LFxuICAgICAgYnVmZmVyRGF0YV9fMSh0YXJnZXQsIHNpemUsIHVzYWdlKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvYnVmZmVyRGF0YV9fMSh1MzIsIHUzMiwgdTMyKSA9PiB2b2lkXG4gICAgICAgIHRhcmdldCA9IHRhcmdldCA+Pj4gMDtcbiAgICAgICAgc2l6ZSA9IHNpemUgPj4+IDA7XG4gICAgICAgIHVzYWdlID0gdXNhZ2UgPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC5idWZmZXJEYXRhX18xKHRhcmdldCwgc2l6ZSwgdXNhZ2UpO1xuICAgICAgfSxcbiAgICAgIGdldFVuaWZvcm1JbmRpY2VzKHByb2dyYW0sIHVuaWZvcm1OYW1lcykge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2dldFVuaWZvcm1JbmRpY2VzKGV4dGVybnJlZiwgfmxpYi9hcnJheS9BcnJheTx+bGliL3N0cmluZy9TdHJpbmc+KSA9PiB+bGliL2FycmF5L0FycmF5PHUzMj5cbiAgICAgICAgdW5pZm9ybU5hbWVzID0gX19saWZ0QXJyYXkocG9pbnRlciA9PiBfX2xpZnRTdHJpbmcobmV3IFVpbnQzMkFycmF5KG1lbW9yeS5idWZmZXIpW3BvaW50ZXIgPj4+IDJdKSwgMiwgdW5pZm9ybU5hbWVzID4+PiAwKTtcbiAgICAgICAgcmV0dXJuIF9fbG93ZXJBcnJheSgocG9pbnRlciwgdmFsdWUpID0+IHsgbmV3IFVpbnQzMkFycmF5KG1lbW9yeS5idWZmZXIpW3BvaW50ZXIgPj4+IDJdID0gdmFsdWU7IH0sIDg3LCAyLCBfX21vZHVsZTAuZ2V0VW5pZm9ybUluZGljZXMocHJvZ3JhbSwgdW5pZm9ybU5hbWVzKSkgfHwgX19ub3RudWxsKCk7XG4gICAgICB9LFxuICAgICAgZ2V0QWN0aXZlVW5pZm9ybXNfXzEocHJvZ3JhbSwgdW5pZm9ybUluZGljZXMsIHBuYW1lKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvZ2V0QWN0aXZlVW5pZm9ybXNfXzEoZXh0ZXJucmVmLCB+bGliL2FycmF5L0FycmF5PHUzMj4sIHUzMikgPT4gfmxpYi9hcnJheS9BcnJheTx1MzI+XG4gICAgICAgIHVuaWZvcm1JbmRpY2VzID0gX19saWZ0QXJyYXkocG9pbnRlciA9PiBuZXcgVWludDMyQXJyYXkobWVtb3J5LmJ1ZmZlcilbcG9pbnRlciA+Pj4gMl0sIDIsIHVuaWZvcm1JbmRpY2VzID4+PiAwKTtcbiAgICAgICAgcG5hbWUgPSBwbmFtZSA+Pj4gMDtcbiAgICAgICAgcmV0dXJuIF9fbG93ZXJBcnJheSgocG9pbnRlciwgdmFsdWUpID0+IHsgbmV3IFVpbnQzMkFycmF5KG1lbW9yeS5idWZmZXIpW3BvaW50ZXIgPj4+IDJdID0gdmFsdWU7IH0sIDg3LCAyLCBfX21vZHVsZTAuZ2V0QWN0aXZlVW5pZm9ybXNfXzEocHJvZ3JhbSwgdW5pZm9ybUluZGljZXMsIHBuYW1lKSkgfHwgX19ub3RudWxsKCk7XG4gICAgICB9LFxuICAgICAgdW5pZm9ybUJsb2NrQmluZGluZyhwcm9ncmFtLCB1bmlmb3JtQmxvY2tJbmRleCwgdW5pZm9ybUJsb2NrQmluZGluZykge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL3VuaWZvcm1CbG9ja0JpbmRpbmcoZXh0ZXJucmVmLCB1MzIsIHUzMikgPT4gdm9pZFxuICAgICAgICB1bmlmb3JtQmxvY2tJbmRleCA9IHVuaWZvcm1CbG9ja0luZGV4ID4+PiAwO1xuICAgICAgICB1bmlmb3JtQmxvY2tCaW5kaW5nID0gdW5pZm9ybUJsb2NrQmluZGluZyA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLnVuaWZvcm1CbG9ja0JpbmRpbmcocHJvZ3JhbSwgdW5pZm9ybUJsb2NrSW5kZXgsIHVuaWZvcm1CbG9ja0JpbmRpbmcpO1xuICAgICAgfSxcbiAgICAgIGdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCBuYW1lKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvZ2V0VW5pZm9ybUxvY2F0aW9uKGV4dGVybnJlZiwgfmxpYi9zdHJpbmcvU3RyaW5nKSA9PiBleHRlcm5yZWZcbiAgICAgICAgbmFtZSA9IF9fbGlmdFN0cmluZyhuYW1lID4+PiAwKTtcbiAgICAgICAgcmV0dXJuIF9fbW9kdWxlMC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgbmFtZSk7XG4gICAgICB9LFxuICAgICAgYWN0aXZlVGV4dHVyZSh0ZXh0dXJlKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvYWN0aXZlVGV4dHVyZSh1MzIpID0+IHZvaWRcbiAgICAgICAgdGV4dHVyZSA9IHRleHR1cmUgPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC5hY3RpdmVUZXh0dXJlKHRleHR1cmUpO1xuICAgICAgfSxcbiAgICAgIGJpbmRUZXh0dXJlKHRhcmdldCwgdGV4dHVyZSkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2JpbmRUZXh0dXJlKHUzMiwgZXh0ZXJucmVmKSA9PiB2b2lkXG4gICAgICAgIHRhcmdldCA9IHRhcmdldCA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLmJpbmRUZXh0dXJlKHRhcmdldCwgdGV4dHVyZSk7XG4gICAgICB9LFxuICAgICAgdGV4SW1hZ2UyRF9fNih0YXJnZXQsIGxldmVsLCBpbnRlcm5hbGZvcm1hdCwgd2lkdGgsIGhlaWdodCwgYm9yZGVyLCBmb3JtYXQsIHR5cGUsIHBpeGVscykge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL3RleEltYWdlMkRfXzYodTMyLCBpMzIsIGkzMiwgaTMyLCBpMzIsIGkzMiwgdTMyLCB1MzIsIH5saWIvdHlwZWRhcnJheS9VaW50OEFycmF5KSA9PiB2b2lkXG4gICAgICAgIHRhcmdldCA9IHRhcmdldCA+Pj4gMDtcbiAgICAgICAgZm9ybWF0ID0gZm9ybWF0ID4+PiAwO1xuICAgICAgICB0eXBlID0gdHlwZSA+Pj4gMDtcbiAgICAgICAgcGl4ZWxzID0gX19saWZ0VHlwZWRBcnJheShVaW50OEFycmF5LCBwaXhlbHMgPj4+IDApO1xuICAgICAgICBfX21vZHVsZTAudGV4SW1hZ2UyRF9fNih0YXJnZXQsIGxldmVsLCBpbnRlcm5hbGZvcm1hdCwgd2lkdGgsIGhlaWdodCwgYm9yZGVyLCBmb3JtYXQsIHR5cGUsIHBpeGVscyk7XG4gICAgICB9LFxuICAgICAgZ2VuZXJhdGVNaXBtYXAodGFyZ2V0KSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvZ2VuZXJhdGVNaXBtYXAodTMyKSA9PiB2b2lkXG4gICAgICAgIHRhcmdldCA9IHRhcmdldCA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLmdlbmVyYXRlTWlwbWFwKHRhcmdldCk7XG4gICAgICB9LFxuICAgICAgdGV4UGFyYW1ldGVyaSh0YXJnZXQsIHBuYW1lLCBwYXJhbSkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL3RleFBhcmFtZXRlcmkodTMyLCB1MzIsIGkzMikgPT4gdm9pZFxuICAgICAgICB0YXJnZXQgPSB0YXJnZXQgPj4+IDA7XG4gICAgICAgIHBuYW1lID0gcG5hbWUgPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC50ZXhQYXJhbWV0ZXJpKHRhcmdldCwgcG5hbWUsIHBhcmFtKTtcbiAgICAgIH0sXG4gICAgICBidWZmZXJTdWJEYXRhX18yKHRhcmdldCwgZHN0Qnl0ZU9mZnNldCwgc3JjRGF0YSwgc3JjT2Zmc2V0LCBsZW5ndGgpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9idWZmZXJTdWJEYXRhX18yKHUzMiwgaTMyLCB+bGliL3R5cGVkYXJyYXkvRmxvYXQzMkFycmF5LCB1MzIsIHUzMj8pID0+IHZvaWRcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0ID4+PiAwO1xuICAgICAgICBzcmNEYXRhID0gX19saWZ0VHlwZWRBcnJheShGbG9hdDMyQXJyYXksIHNyY0RhdGEgPj4+IDApO1xuICAgICAgICBzcmNPZmZzZXQgPSBzcmNPZmZzZXQgPj4+IDA7XG4gICAgICAgIGxlbmd0aCA9IGxlbmd0aCA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLmJ1ZmZlclN1YkRhdGFfXzIodGFyZ2V0LCBkc3RCeXRlT2Zmc2V0LCBzcmNEYXRhLCBzcmNPZmZzZXQsIGxlbmd0aCk7XG4gICAgICB9LFxuICAgICAgZW5hYmxlKGNhcCkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2VuYWJsZSh1MzIpID0+IHZvaWRcbiAgICAgICAgY2FwID0gY2FwID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAuZW5hYmxlKGNhcCk7XG4gICAgICB9LFxuICAgICAgZGVwdGhGdW5jKGZ1bmMpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9kZXB0aEZ1bmModTMyKSA9PiB2b2lkXG4gICAgICAgIGZ1bmMgPSBmdW5jID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAuZGVwdGhGdW5jKGZ1bmMpO1xuICAgICAgfSxcbiAgICAgIGRpc2FibGUoY2FwKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvZGlzYWJsZSh1MzIpID0+IHZvaWRcbiAgICAgICAgY2FwID0gY2FwID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAuZGlzYWJsZShjYXApO1xuICAgICAgfSxcbiAgICAgIGN1bGxGYWNlKG1vZGUpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9jdWxsRmFjZSh1MzIpID0+IHZvaWRcbiAgICAgICAgbW9kZSA9IG1vZGUgPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC5jdWxsRmFjZShtb2RlKTtcbiAgICAgIH0sXG4gICAgICBiZWdpblRyYW5zZm9ybUZlZWRiYWNrKHByaW1pdGl2ZU1vZGUpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9iZWdpblRyYW5zZm9ybUZlZWRiYWNrKHUzMikgPT4gdm9pZFxuICAgICAgICBwcmltaXRpdmVNb2RlID0gcHJpbWl0aXZlTW9kZSA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLmJlZ2luVHJhbnNmb3JtRmVlZGJhY2socHJpbWl0aXZlTW9kZSk7XG4gICAgICB9LFxuICAgICAgZHJhd0FycmF5cyhtb2RlLCBmaXJzdCwgY291bnQpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9kcmF3QXJyYXlzKHUzMiwgaTMyLCBpMzIpID0+IHZvaWRcbiAgICAgICAgbW9kZSA9IG1vZGUgPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC5kcmF3QXJyYXlzKG1vZGUsIGZpcnN0LCBjb3VudCk7XG4gICAgICB9LFxuICAgICAgZHJhd0VsZW1lbnRzSW5zdGFuY2VkKG1vZGUsIGNvdW50LCB0eXBlLCBvZmZzZXQsIGluc3RhbmNlQ291bnQpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9kcmF3RWxlbWVudHNJbnN0YW5jZWQodTMyLCBpMzIsIHUzMiwgaTMyLCBpMzIpID0+IHZvaWRcbiAgICAgICAgbW9kZSA9IG1vZGUgPj4+IDA7XG4gICAgICAgIHR5cGUgPSB0eXBlID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAuZHJhd0VsZW1lbnRzSW5zdGFuY2VkKG1vZGUsIGNvdW50LCB0eXBlLCBvZmZzZXQsIGluc3RhbmNlQ291bnQpO1xuICAgICAgfSxcbiAgICAgIGRyYXdBcnJheXNJbnN0YW5jZWQobW9kZSwgZmlyc3QsIGNvdW50LCBpbnN0YW5jZUNvdW50KSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvZHJhd0FycmF5c0luc3RhbmNlZCh1MzIsIGkzMiwgaTMyLCBpMzIpID0+IHZvaWRcbiAgICAgICAgbW9kZSA9IG1vZGUgPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC5kcmF3QXJyYXlzSW5zdGFuY2VkKG1vZGUsIGZpcnN0LCBjb3VudCwgaW5zdGFuY2VDb3VudCk7XG4gICAgICB9LFxuICAgICAgZHJhd0VsZW1lbnRzKG1vZGUsIGNvdW50LCB0eXBlLCBvZmZzZXQpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9kcmF3RWxlbWVudHModTMyLCBpMzIsIHUzMiwgaTMyKSA9PiB2b2lkXG4gICAgICAgIG1vZGUgPSBtb2RlID4+PiAwO1xuICAgICAgICB0eXBlID0gdHlwZSA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLmRyYXdFbGVtZW50cyhtb2RlLCBjb3VudCwgdHlwZSwgb2Zmc2V0KTtcbiAgICAgIH0sXG4gICAgICBibGVuZEZ1bmMoc2ZhY3RvciwgZGZhY3Rvcikge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2JsZW5kRnVuYyh1MzIsIHUzMikgPT4gdm9pZFxuICAgICAgICBzZmFjdG9yID0gc2ZhY3RvciA+Pj4gMDtcbiAgICAgICAgZGZhY3RvciA9IGRmYWN0b3IgPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC5ibGVuZEZ1bmMoc2ZhY3RvciwgZGZhY3Rvcik7XG4gICAgICB9LFxuICAgICAgdW5pZm9ybTFmdihsb2NhdGlvbiwgZGF0YSwgc3JjT2Zmc2V0LCBzcmNMZW5ndGgpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy91bmlmb3JtMWZ2KGV4dGVybnJlZiwgfmxpYi90eXBlZGFycmF5L0Zsb2F0MzJBcnJheSwgdTMyPywgdTMyPykgPT4gdm9pZFxuICAgICAgICBkYXRhID0gX19saWZ0VHlwZWRBcnJheShGbG9hdDMyQXJyYXksIGRhdGEgPj4+IDApO1xuICAgICAgICBzcmNPZmZzZXQgPSBzcmNPZmZzZXQgPj4+IDA7XG4gICAgICAgIHNyY0xlbmd0aCA9IHNyY0xlbmd0aCA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLnVuaWZvcm0xZnYobG9jYXRpb24sIGRhdGEsIHNyY09mZnNldCwgc3JjTGVuZ3RoKTtcbiAgICAgIH0sXG4gICAgICB1bmlmb3JtMmZ2KGxvY2F0aW9uLCBkYXRhLCBzcmNPZmZzZXQsIHNyY0xlbmd0aCkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL3VuaWZvcm0yZnYoZXh0ZXJucmVmLCB+bGliL3R5cGVkYXJyYXkvRmxvYXQzMkFycmF5LCB1MzI/LCB1MzI/KSA9PiB2b2lkXG4gICAgICAgIGRhdGEgPSBfX2xpZnRUeXBlZEFycmF5KEZsb2F0MzJBcnJheSwgZGF0YSA+Pj4gMCk7XG4gICAgICAgIHNyY09mZnNldCA9IHNyY09mZnNldCA+Pj4gMDtcbiAgICAgICAgc3JjTGVuZ3RoID0gc3JjTGVuZ3RoID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAudW5pZm9ybTJmdihsb2NhdGlvbiwgZGF0YSwgc3JjT2Zmc2V0LCBzcmNMZW5ndGgpO1xuICAgICAgfSxcbiAgICAgIHVuaWZvcm0zZnYobG9jYXRpb24sIGRhdGEsIHNyY09mZnNldCwgc3JjTGVuZ3RoKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvdW5pZm9ybTNmdihleHRlcm5yZWYsIH5saWIvdHlwZWRhcnJheS9GbG9hdDMyQXJyYXksIHUzMj8sIHUzMj8pID0+IHZvaWRcbiAgICAgICAgZGF0YSA9IF9fbGlmdFR5cGVkQXJyYXkoRmxvYXQzMkFycmF5LCBkYXRhID4+PiAwKTtcbiAgICAgICAgc3JjT2Zmc2V0ID0gc3JjT2Zmc2V0ID4+PiAwO1xuICAgICAgICBzcmNMZW5ndGggPSBzcmNMZW5ndGggPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC51bmlmb3JtM2Z2KGxvY2F0aW9uLCBkYXRhLCBzcmNPZmZzZXQsIHNyY0xlbmd0aCk7XG4gICAgICB9LFxuICAgICAgdW5pZm9ybTRmdihsb2NhdGlvbiwgZGF0YSwgc3JjT2Zmc2V0LCBzcmNMZW5ndGgpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy91bmlmb3JtNGZ2KGV4dGVybnJlZiwgfmxpYi90eXBlZGFycmF5L0Zsb2F0MzJBcnJheSwgdTMyPywgdTMyPykgPT4gdm9pZFxuICAgICAgICBkYXRhID0gX19saWZ0VHlwZWRBcnJheShGbG9hdDMyQXJyYXksIGRhdGEgPj4+IDApO1xuICAgICAgICBzcmNPZmZzZXQgPSBzcmNPZmZzZXQgPj4+IDA7XG4gICAgICAgIHNyY0xlbmd0aCA9IHNyY0xlbmd0aCA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLnVuaWZvcm00ZnYobG9jYXRpb24sIGRhdGEsIHNyY09mZnNldCwgc3JjTGVuZ3RoKTtcbiAgICAgIH0sXG4gICAgICB1bmlmb3JtTWF0cml4NGZ2KGxvY2F0aW9uLCB0cmFuc3Bvc2UsIGRhdGEsIHNyY09mZnNldCwgc3JjTGVuZ3RoKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvdW5pZm9ybU1hdHJpeDRmdihleHRlcm5yZWYsIGJvb2wsIH5saWIvdHlwZWRhcnJheS9GbG9hdDMyQXJyYXksIHUzMj8sIHUzMj8pID0+IHZvaWRcbiAgICAgICAgdHJhbnNwb3NlID0gdHJhbnNwb3NlICE9IDA7XG4gICAgICAgIGRhdGEgPSBfX2xpZnRUeXBlZEFycmF5KEZsb2F0MzJBcnJheSwgZGF0YSA+Pj4gMCk7XG4gICAgICAgIHNyY09mZnNldCA9IHNyY09mZnNldCA+Pj4gMDtcbiAgICAgICAgc3JjTGVuZ3RoID0gc3JjTGVuZ3RoID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAudW5pZm9ybU1hdHJpeDRmdihsb2NhdGlvbiwgdHJhbnNwb3NlLCBkYXRhLCBzcmNPZmZzZXQsIHNyY0xlbmd0aCk7XG4gICAgICB9LFxuICAgIH0pLFxuICAgIGhvc3Q6IE9iamVjdC5hc3NpZ24oT2JqZWN0LmNyZWF0ZShfX21vZHVsZTEpLCB7XG4gICAgICBnZXQoaWQpIHtcbiAgICAgICAgLy8gc3JjLWFzL2ltcG9ydHMvX2hvc3QvZ2V0KHUzMikgPT4gZXh0ZXJucmVmXG4gICAgICAgIGlkID0gaWQgPj4+IDA7XG4gICAgICAgIHJldHVybiBfX21vZHVsZTEuZ2V0KGlkKTtcbiAgICAgIH0sXG4gICAgfSksXG4gIH07XG4gIGNvbnN0IHsgZXhwb3J0cyB9ID0gYXdhaXQgV2ViQXNzZW1ibHkuaW5zdGFudGlhdGUobW9kdWxlLCBhZGFwdGVkSW1wb3J0cyk7XG4gIGNvbnN0IG1lbW9yeSA9IGV4cG9ydHMubWVtb3J5IHx8IGltcG9ydHMuZW52Lm1lbW9yeTtcbiAgY29uc3QgYWRhcHRlZEV4cG9ydHMgPSBPYmplY3Quc2V0UHJvdG90eXBlT2Yoe1xuICAgIGNyZWF0ZURlZmF1bHRDYW1lcmEoa2V5Ym9hcmRDb250cm9scywgbW91c2VDb250cm9scykge1xuICAgICAgLy8gc3JjLWFzL2V4cG9ydHMvY2FtZXJhL2NyZWF0ZURlZmF1bHRDYW1lcmEoYm9vbD8sIGJvb2w/KSA9PiBzcmMtYXMvYmFzZS9FbnRpdHkvRW50aXR5XG4gICAgICBrZXlib2FyZENvbnRyb2xzID0ga2V5Ym9hcmRDb250cm9scyA/IDEgOiAwO1xuICAgICAgbW91c2VDb250cm9scyA9IG1vdXNlQ29udHJvbHMgPyAxIDogMDtcbiAgICAgIGV4cG9ydHMuX19zZXRBcmd1bWVudHNMZW5ndGgoYXJndW1lbnRzLmxlbmd0aCk7XG4gICAgICByZXR1cm4gX19saWZ0SW50ZXJucmVmKGV4cG9ydHMuY3JlYXRlRGVmYXVsdENhbWVyYShrZXlib2FyZENvbnRyb2xzLCBtb3VzZUNvbnRyb2xzKSA+Pj4gMCk7XG4gICAgfSxcbiAgICB1bmxpdFZlcnRleENvbG9yU2hhZGVyOiB7XG4gICAgICAvLyBzcmMtYXMvcmVuZGVyaW5nL3NoYWRlci91bmxpdC91bmxpdFZlcnRleENvbG9ycy91bmxpdFZlcnRleENvbG9yU2hhZGVyOiBzcmMtYXMvcmVuZGVyaW5nL3NoYWRlci9TaGFkZXIvU2hhZGVyXG4gICAgICB2YWx1ZU9mKCkgeyByZXR1cm4gdGhpcy52YWx1ZTsgfSxcbiAgICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIF9fbGlmdEludGVybnJlZihleHBvcnRzLnVubGl0VmVydGV4Q29sb3JTaGFkZXIudmFsdWUgPj4+IDApO1xuICAgICAgfVxuICAgIH0sXG4gICAgbGl0U2hhZGVyOiB7XG4gICAgICAvLyBzcmMtYXMvcmVuZGVyaW5nL3NoYWRlci9saXQvbGl0U2hhZGVyL2xpdFNoYWRlcjogc3JjLWFzL3JlbmRlcmluZy9zaGFkZXIvU2hhZGVyL1NoYWRlclxuICAgICAgdmFsdWVPZigpIHsgcmV0dXJuIHRoaXMudmFsdWU7IH0sXG4gICAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiBfX2xpZnRJbnRlcm5yZWYoZXhwb3J0cy5saXRTaGFkZXIudmFsdWUgPj4+IDApO1xuICAgICAgfVxuICAgIH0sXG4gICAgZGVmYXVsdFdvcmxkKG9wdGlvbnMpIHtcbiAgICAgIC8vIHNyYy1hcy9leHBvcnRzL2RlZmF1bHRXb3JsZC9kZWZhdWx0V29ybGQoc3JjLWFzL2V4cG9ydHMvZGVmYXVsdFdvcmxkL0RlZmF1bHRXb3JsZE9wdGlvbnMpID0+IHNyYy1hcy9iYXNlL1dvcmxkL1dvcmxkXG4gICAgICBvcHRpb25zID0gX19sb3dlclJlY29yZDEyNChvcHRpb25zKSB8fCBfX25vdG51bGwoKTtcbiAgICAgIHJldHVybiBfX2xpZnRJbnRlcm5yZWYoZXhwb3J0cy5kZWZhdWx0V29ybGQob3B0aW9ucykgPj4+IDApO1xuICAgIH0sXG4gICAgcm90YXRpbmdDdWJlKF9zaGFkZXIpIHtcbiAgICAgIC8vIHNyYy1hcy9leHBvcnRzL2RlbW9zL3JvdGF0aW5nQ3ViZShzcmMtYXMvcmVuZGVyaW5nL3NoYWRlci9TaGFkZXIvU2hhZGVyIHwgbnVsbCkgPT4gc3JjLWFzL2Jhc2UvRW50aXR5L0VudGl0eVxuICAgICAgX3NoYWRlciA9IF9fbG93ZXJJbnRlcm5yZWYoX3NoYWRlcik7XG4gICAgICByZXR1cm4gX19saWZ0SW50ZXJucmVmKGV4cG9ydHMucm90YXRpbmdDdWJlKF9zaGFkZXIpID4+PiAwKTtcbiAgICB9LFxuICB9LCBleHBvcnRzKTtcbiAgZnVuY3Rpb24gX19sb3dlclJlY29yZDEyNCh2YWx1ZSkge1xuICAgIC8vIHNyYy1hcy9leHBvcnRzL2RlZmF1bHRXb3JsZC9EZWZhdWx0V29ybGRPcHRpb25zXG4gICAgLy8gSGludDogT3B0LW91dCBmcm9tIGxvd2VyaW5nIGFzIGEgcmVjb3JkIGJ5IHByb3ZpZGluZyBhbiBlbXB0eSBjb25zdHJ1Y3RvclxuICAgIGlmICh2YWx1ZSA9PSBudWxsKSByZXR1cm4gMDtcbiAgICBjb25zdCBwb2ludGVyID0gZXhwb3J0cy5fX3BpbihleHBvcnRzLl9fbmV3KDYsIDEyNCkpO1xuICAgIG5ldyBVaW50OEFycmF5KG1lbW9yeS5idWZmZXIpW3BvaW50ZXIgKyAwID4+PiAwXSA9IHZhbHVlLmNhbWVyYSA/IDEgOiAwO1xuICAgIG5ldyBVaW50OEFycmF5KG1lbW9yeS5idWZmZXIpW3BvaW50ZXIgKyAxID4+PiAwXSA9IHZhbHVlLmNhbWVyYUtleWJvYXJkQ29udHJvbGxlciA/IDEgOiAwO1xuICAgIG5ldyBVaW50OEFycmF5KG1lbW9yeS5idWZmZXIpW3BvaW50ZXIgKyAyID4+PiAwXSA9IHZhbHVlLmNhbWVyYU1vdXNlQ29udHJvbGxlciA/IDEgOiAwO1xuICAgIG5ldyBVaW50OEFycmF5KG1lbW9yeS5idWZmZXIpW3BvaW50ZXIgKyAzID4+PiAwXSA9IHZhbHVlLmxpZ2h0cyA/IDEgOiAwO1xuICAgIG5ldyBVaW50OEFycmF5KG1lbW9yeS5idWZmZXIpW3BvaW50ZXIgKyA0ID4+PiAwXSA9IHZhbHVlLmdpem1vcyA/IDEgOiAwO1xuICAgIG5ldyBVaW50OEFycmF5KG1lbW9yeS5idWZmZXIpW3BvaW50ZXIgKyA1ID4+PiAwXSA9IHZhbHVlLmhlbGxvQ3ViZSA/IDEgOiAwO1xuICAgIGV4cG9ydHMuX191bnBpbihwb2ludGVyKTtcbiAgICByZXR1cm4gcG9pbnRlcjtcbiAgfVxuICBmdW5jdGlvbiBfX2xpZnRTdHJpbmcocG9pbnRlcikge1xuICAgIGlmICghcG9pbnRlcikgcmV0dXJuIG51bGw7XG4gICAgY29uc3RcbiAgICAgIGVuZCA9IHBvaW50ZXIgKyBuZXcgVWludDMyQXJyYXkobWVtb3J5LmJ1ZmZlcilbcG9pbnRlciAtIDQgPj4+IDJdID4+PiAxLFxuICAgICAgbWVtb3J5VTE2ID0gbmV3IFVpbnQxNkFycmF5KG1lbW9yeS5idWZmZXIpO1xuICAgIGxldFxuICAgICAgc3RhcnQgPSBwb2ludGVyID4+PiAxLFxuICAgICAgc3RyaW5nID0gXCJcIjtcbiAgICB3aGlsZSAoZW5kIC0gc3RhcnQgPiAxMDI0KSBzdHJpbmcgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSguLi5tZW1vcnlVMTYuc3ViYXJyYXkoc3RhcnQsIHN0YXJ0ICs9IDEwMjQpKTtcbiAgICByZXR1cm4gc3RyaW5nICsgU3RyaW5nLmZyb21DaGFyQ29kZSguLi5tZW1vcnlVMTYuc3ViYXJyYXkoc3RhcnQsIGVuZCkpO1xuICB9XG4gIGZ1bmN0aW9uIF9fbG93ZXJTdHJpbmcodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuIDA7XG4gICAgY29uc3RcbiAgICAgIGxlbmd0aCA9IHZhbHVlLmxlbmd0aCxcbiAgICAgIHBvaW50ZXIgPSBleHBvcnRzLl9fbmV3KGxlbmd0aCA8PCAxLCAxKSA+Pj4gMCxcbiAgICAgIG1lbW9yeVUxNiA9IG5ldyBVaW50MTZBcnJheShtZW1vcnkuYnVmZmVyKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSBtZW1vcnlVMTZbKHBvaW50ZXIgPj4+IDEpICsgaV0gPSB2YWx1ZS5jaGFyQ29kZUF0KGkpO1xuICAgIHJldHVybiBwb2ludGVyO1xuICB9XG4gIGZ1bmN0aW9uIF9fbGlmdEFycmF5KGxpZnRFbGVtZW50LCBhbGlnbiwgcG9pbnRlcikge1xuICAgIGlmICghcG9pbnRlcikgcmV0dXJuIG51bGw7XG4gICAgY29uc3RcbiAgICAgIG1lbW9yeVUzMiA9IG5ldyBVaW50MzJBcnJheShtZW1vcnkuYnVmZmVyKSxcbiAgICAgIGRhdGFTdGFydCA9IG1lbW9yeVUzMltwb2ludGVyICsgNCA+Pj4gMl0sXG4gICAgICBsZW5ndGggPSBtZW1vcnlVMzJbcG9pbnRlciArIDEyID4+PiAyXSxcbiAgICAgIHZhbHVlcyA9IG5ldyBBcnJheShsZW5ndGgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHZhbHVlc1tpXSA9IGxpZnRFbGVtZW50KGRhdGFTdGFydCArIChpIDw8IGFsaWduID4+PiAwKSk7XG4gICAgcmV0dXJuIHZhbHVlcztcbiAgfVxuICBmdW5jdGlvbiBfX2xvd2VyQXJyYXkobG93ZXJFbGVtZW50LCBpZCwgYWxpZ24sIHZhbHVlcykge1xuICAgIGlmICh2YWx1ZXMgPT0gbnVsbCkgcmV0dXJuIDA7XG4gICAgY29uc3RcbiAgICAgIGxlbmd0aCA9IHZhbHVlcy5sZW5ndGgsXG4gICAgICBidWZmZXIgPSBleHBvcnRzLl9fcGluKGV4cG9ydHMuX19uZXcobGVuZ3RoIDw8IGFsaWduLCAwKSkgPj4+IDAsXG4gICAgICBoZWFkZXIgPSBleHBvcnRzLl9fcGluKGV4cG9ydHMuX19uZXcoMTYsIGlkKSkgPj4+IDAsXG4gICAgICBtZW1vcnlVMzIgPSBuZXcgVWludDMyQXJyYXkobWVtb3J5LmJ1ZmZlcik7XG4gICAgbWVtb3J5VTMyW2hlYWRlciArIDAgPj4+IDJdID0gYnVmZmVyO1xuICAgIG1lbW9yeVUzMltoZWFkZXIgKyA0ID4+PiAyXSA9IGJ1ZmZlcjtcbiAgICBtZW1vcnlVMzJbaGVhZGVyICsgOCA+Pj4gMl0gPSBsZW5ndGggPDwgYWxpZ247XG4gICAgbWVtb3J5VTMyW2hlYWRlciArIDEyID4+PiAyXSA9IGxlbmd0aDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSBsb3dlckVsZW1lbnQoYnVmZmVyICsgKGkgPDwgYWxpZ24gPj4+IDApLCB2YWx1ZXNbaV0pO1xuICAgIGV4cG9ydHMuX191bnBpbihidWZmZXIpO1xuICAgIGV4cG9ydHMuX191bnBpbihoZWFkZXIpO1xuICAgIHJldHVybiBoZWFkZXI7XG4gIH1cbiAgZnVuY3Rpb24gX19saWZ0VHlwZWRBcnJheShjb25zdHJ1Y3RvciwgcG9pbnRlcikge1xuICAgIGlmICghcG9pbnRlcikgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgbWVtb3J5VTMyID0gbmV3IFVpbnQzMkFycmF5KG1lbW9yeS5idWZmZXIpO1xuICAgIHJldHVybiBuZXcgY29uc3RydWN0b3IoXG4gICAgICBtZW1vcnkuYnVmZmVyLFxuICAgICAgbWVtb3J5VTMyW3BvaW50ZXIgKyA0ID4+PiAyXSxcbiAgICAgIG1lbW9yeVUzMltwb2ludGVyICsgOCA+Pj4gMl0gLyBjb25zdHJ1Y3Rvci5CWVRFU19QRVJfRUxFTUVOVFxuICAgICkuc2xpY2UoKTtcbiAgfVxuICBjb25zdCByZWdpc3RyeSA9IG5ldyBGaW5hbGl6YXRpb25SZWdpc3RyeShfX3JlbGVhc2UpO1xuICBjbGFzcyBJbnRlcm5yZWYgZXh0ZW5kcyBOdW1iZXIge31cbiAgZnVuY3Rpb24gX19saWZ0SW50ZXJucmVmKHBvaW50ZXIpIHtcbiAgICBpZiAoIXBvaW50ZXIpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IHNlbnRpbmVsID0gbmV3IEludGVybnJlZihfX3JldGFpbihwb2ludGVyKSk7XG4gICAgcmVnaXN0cnkucmVnaXN0ZXIoc2VudGluZWwsIHBvaW50ZXIpO1xuICAgIHJldHVybiBzZW50aW5lbDtcbiAgfVxuICBmdW5jdGlvbiBfX2xvd2VySW50ZXJucmVmKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybiAwO1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEludGVybnJlZikgcmV0dXJuIHZhbHVlLnZhbHVlT2YoKTtcbiAgICB0aHJvdyBUeXBlRXJyb3IoXCJpbnRlcm5yZWYgZXhwZWN0ZWRcIik7XG4gIH1cbiAgY29uc3QgcmVmY291bnRzID0gbmV3IE1hcCgpO1xuICBmdW5jdGlvbiBfX3JldGFpbihwb2ludGVyKSB7XG4gICAgaWYgKHBvaW50ZXIpIHtcbiAgICAgIGNvbnN0IHJlZmNvdW50ID0gcmVmY291bnRzLmdldChwb2ludGVyKTtcbiAgICAgIGlmIChyZWZjb3VudCkgcmVmY291bnRzLnNldChwb2ludGVyLCByZWZjb3VudCArIDEpO1xuICAgICAgZWxzZSByZWZjb3VudHMuc2V0KGV4cG9ydHMuX19waW4ocG9pbnRlciksIDEpO1xuICAgIH1cbiAgICByZXR1cm4gcG9pbnRlcjtcbiAgfVxuICBmdW5jdGlvbiBfX3JlbGVhc2UocG9pbnRlcikge1xuICAgIGlmIChwb2ludGVyKSB7XG4gICAgICBjb25zdCByZWZjb3VudCA9IHJlZmNvdW50cy5nZXQocG9pbnRlcik7XG4gICAgICBpZiAocmVmY291bnQgPT09IDEpIGV4cG9ydHMuX191bnBpbihwb2ludGVyKSwgcmVmY291bnRzLmRlbGV0ZShwb2ludGVyKTtcbiAgICAgIGVsc2UgaWYgKHJlZmNvdW50KSByZWZjb3VudHMuc2V0KHBvaW50ZXIsIHJlZmNvdW50IC0gMSk7XG4gICAgICBlbHNlIHRocm93IEVycm9yKGBpbnZhbGlkIHJlZmNvdW50ICcke3JlZmNvdW50fScgZm9yIHJlZmVyZW5jZSAnJHtwb2ludGVyfSdgKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gX19ub3RudWxsKCkge1xuICAgIHRocm93IFR5cGVFcnJvcihcInZhbHVlIG11c3Qgbm90IGJlIG51bGxcIik7XG4gIH1cbiAgcmV0dXJuIGFkYXB0ZWRFeHBvcnRzO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZiA9IHt9O1xuLy8gVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgdGhlIGVudHJ5IGNodW5rLlxuLy8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSAoY2h1bmtJZCkgPT4ge1xuXHRyZXR1cm4gUHJvbWlzZS5hbGwoT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5mKS5yZWR1Y2UoKHByb21pc2VzLCBrZXkpID0+IHtcblx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmZba2V5XShjaHVua0lkLCBwcm9taXNlcyk7XG5cdFx0cmV0dXJuIHByb21pc2VzO1xuXHR9LCBbXSkpO1xufTsiLCIvLyBUaGlzIGZ1bmN0aW9uIGFsbG93IHRvIHJlZmVyZW5jZSBhc3luYyBjaHVua3Ncbl9fd2VicGFja19yZXF1aXJlX18udSA9IChjaHVua0lkKSA9PiB7XG5cdC8vIHJldHVybiB1cmwgZm9yIGZpbGVuYW1lcyBiYXNlZCBvbiB0ZW1wbGF0ZVxuXHRyZXR1cm4gXCJcIiArIGNodW5rSWQgKyBcIi5idW5kbGUuanNcIjtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwidmFyIGluUHJvZ3Jlc3MgPSB7fTtcbnZhciBkYXRhV2VicGFja1ByZWZpeCA9IFwia29vcmE6XCI7XG4vLyBsb2FkU2NyaXB0IGZ1bmN0aW9uIHRvIGxvYWQgYSBzY3JpcHQgdmlhIHNjcmlwdCB0YWdcbl9fd2VicGFja19yZXF1aXJlX18ubCA9ICh1cmwsIGRvbmUsIGtleSwgY2h1bmtJZCkgPT4ge1xuXHRpZihpblByb2dyZXNzW3VybF0pIHsgaW5Qcm9ncmVzc1t1cmxdLnB1c2goZG9uZSk7IHJldHVybjsgfVxuXHR2YXIgc2NyaXB0LCBuZWVkQXR0YWNoO1xuXHRpZihrZXkgIT09IHVuZGVmaW5lZCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHNjcmlwdHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBzID0gc2NyaXB0c1tpXTtcblx0XHRcdGlmKHMuZ2V0QXR0cmlidXRlKFwic3JjXCIpID09IHVybCB8fCBzLmdldEF0dHJpYnV0ZShcImRhdGEtd2VicGFja1wiKSA9PSBkYXRhV2VicGFja1ByZWZpeCArIGtleSkgeyBzY3JpcHQgPSBzOyBicmVhazsgfVxuXHRcdH1cblx0fVxuXHRpZighc2NyaXB0KSB7XG5cdFx0bmVlZEF0dGFjaCA9IHRydWU7XG5cdFx0c2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cblx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG5cdFx0c2NyaXB0LnRpbWVvdXQgPSAxMjA7XG5cdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcblx0XHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKTtcblx0XHR9XG5cdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcImRhdGEtd2VicGFja1wiLCBkYXRhV2VicGFja1ByZWZpeCArIGtleSk7XG5cdFx0c2NyaXB0LnNyYyA9IHVybDtcblx0fVxuXHRpblByb2dyZXNzW3VybF0gPSBbZG9uZV07XG5cdHZhciBvblNjcmlwdENvbXBsZXRlID0gKHByZXYsIGV2ZW50KSA9PiB7XG5cdFx0Ly8gYXZvaWQgbWVtIGxlYWtzIGluIElFLlxuXHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG51bGw7XG5cdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdHZhciBkb25lRm5zID0gaW5Qcm9ncmVzc1t1cmxdO1xuXHRcdGRlbGV0ZSBpblByb2dyZXNzW3VybF07XG5cdFx0c2NyaXB0LnBhcmVudE5vZGUgJiYgc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcblx0XHRkb25lRm5zICYmIGRvbmVGbnMuZm9yRWFjaCgoZm4pID0+IChmbihldmVudCkpKTtcblx0XHRpZihwcmV2KSByZXR1cm4gcHJldihldmVudCk7XG5cdH1cblx0O1xuXHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQob25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHVuZGVmaW5lZCwgeyB0eXBlOiAndGltZW91dCcsIHRhcmdldDogc2NyaXB0IH0pLCAxMjAwMDApO1xuXHRzY3JpcHQub25lcnJvciA9IG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCBzY3JpcHQub25lcnJvcik7XG5cdHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgc2NyaXB0Lm9ubG9hZCk7XG5cdG5lZWRBdHRhY2ggJiYgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xufTsiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5mLmogPSAoY2h1bmtJZCwgcHJvbWlzZXMpID0+IHtcblx0XHQvLyBKU09OUCBjaHVuayBsb2FkaW5nIGZvciBqYXZhc2NyaXB0XG5cdFx0dmFyIGluc3RhbGxlZENodW5rRGF0YSA9IF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpID8gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdIDogdW5kZWZpbmVkO1xuXHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgeyAvLyAwIG1lYW5zIFwiYWxyZWFkeSBpbnN0YWxsZWRcIi5cblxuXHRcdFx0Ly8gYSBQcm9taXNlIG1lYW5zIFwiY3VycmVudGx5IGxvYWRpbmdcIi5cblx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZih0cnVlKSB7IC8vIGFsbCBjaHVua3MgaGF2ZSBKU1xuXHRcdFx0XHRcdC8vIHNldHVwIFByb21pc2UgaW4gY2h1bmsgY2FjaGVcblx0XHRcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IChpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbcmVzb2x2ZSwgcmVqZWN0XSkpO1xuXHRcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdID0gcHJvbWlzZSk7XG5cblx0XHRcdFx0XHQvLyBzdGFydCBjaHVuayBsb2FkaW5nXG5cdFx0XHRcdFx0dmFyIHVybCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIF9fd2VicGFja19yZXF1aXJlX18udShjaHVua0lkKTtcblx0XHRcdFx0XHQvLyBjcmVhdGUgZXJyb3IgYmVmb3JlIHN0YWNrIHVud291bmQgdG8gZ2V0IHVzZWZ1bCBzdGFja3RyYWNlIGxhdGVyXG5cdFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCk7XG5cdFx0XHRcdFx0dmFyIGxvYWRpbmdFbmRlZCA9IChldmVudCkgPT4ge1xuXHRcdFx0XHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkpIHtcblx0XHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuXHRcdFx0XHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcblx0XHRcdFx0XHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9yLm1lc3NhZ2UgPSAnTG9hZGluZyBjaHVuayAnICsgY2h1bmtJZCArICcgZmFpbGVkLlxcbignICsgZXJyb3JUeXBlICsgJzogJyArIHJlYWxTcmMgKyAnKSc7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IubmFtZSA9ICdDaHVua0xvYWRFcnJvcic7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IudHlwZSA9IGVycm9yVHlwZTtcblx0XHRcdFx0XHRcdFx0XHRlcnJvci5yZXF1ZXN0ID0gcmVhbFNyYztcblx0XHRcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGFbMV0oZXJyb3IpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmwodXJsLCBsb2FkaW5nRW5kZWQsIFwiY2h1bmstXCIgKyBjaHVua0lkLCBjaHVua0lkKTtcblx0XHRcdFx0fSBlbHNlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdFx0XHR9XG5cdFx0fVxufTtcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblxufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2tvb3JhXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2tvb3JhXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCJleHBvcnQgKiBmcm9tICcuL2xvYWRlci9Lb29yYUxvYWRlcidcbmV4cG9ydCAqIGZyb20gJy4vbG9hZGVyL3Rlc3RSdW4nIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9