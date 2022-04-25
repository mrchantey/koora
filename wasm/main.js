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
                    log_f64: console.log.bind(console),
                    elapsed: performance.now.bind(performance),
                    now: Date.now.bind(Date),
                    set: this.externSet,
                    get: this.externGet,
                    remove: this.externRemove
                },
                env: {
                    console: {
                        log: console.log.bind(console)
                    }
                }
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
/* harmony export */   "DebounceResizeObserver": () => (/* reexport safe */ _DebounceResizeObserver__WEBPACK_IMPORTED_MODULE_2__.DebounceResizeObserver),
/* harmony export */   "applyGLOverloads": () => (/* reexport safe */ _classUtils__WEBPACK_IMPORTED_MODULE_1__.applyGLOverloads),
/* harmony export */   "autoBind": () => (/* reexport safe */ _autoBind__WEBPACK_IMPORTED_MODULE_0__.autoBind)
/* harmony export */ });
/* harmony import */ var _autoBind__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./autoBind */ "./src/utils/autoBind.ts");
/* harmony import */ var _classUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classUtils */ "./src/utils/classUtils.ts");
/* harmony import */ var _DebounceResizeObserver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DebounceResizeObserver */ "./src/utils/DebounceResizeObserver.ts");





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
        return __lowerArray((pointer, value) => { new Uint32Array(memory.buffer)[pointer >>> 2] = value; }, 43, 2, __module0.getUniformIndices(program, uniformNames)) || __notnull();
      },
      getActiveUniforms__1(program, uniformIndices, pname) {
        // src-as/WebGL2/imports/_types/getActiveUniforms__1(externref, ~lib/array/Array<u32>, u32) => ~lib/array/Array<u32>
        uniformIndices = __liftArray(pointer => new Uint32Array(memory.buffer)[pointer >>> 2], 2, uniformIndices >>> 0);
        pname = pname >>> 0;
        return __lowerArray((pointer, value) => { new Uint32Array(memory.buffer)[pointer >>> 2] = value; }, 43, 2, __module0.getActiveUniforms__1(program, uniformIndices, pname)) || __notnull();
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
      options = __lowerRecord119(options) || __notnull();
      return __liftInternref(exports.defaultWorld(options) >>> 0);
    },
    rotatingCube(_shader) {
      // src-as/exports/demos/rotatingCube(src-as/rendering/shader/Shader/Shader | null) => src-as/base/Entity/Entity
      _shader = __lowerInternref(_shader);
      return __liftInternref(exports.rotatingCube(_shader) >>> 0);
    },
  }, exports);
  function __lowerRecord119(value) {
    // src-as/exports/defaultWorld/DefaultWorldOptions
    // Hint: Opt-out from lowering as a record by providing an empty constructor
    if (value == null) return 0;
    const pointer = exports.__pin(exports.__new(6, 119));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNQO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCx3REFBd0Q7QUFDMUcsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELHdEQUF3RDtBQUMxRyxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxL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Q0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTTtXQUNOO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7V0FDQTtXQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckZvQztBQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8va29vcmEvLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC5kZWJvdW5jZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9rb29yYS8uL3NyYy9jb25zdGFudHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8va29vcmEvLi9zcmMvY29uc3RhbnRzL2tleWJvYXJkQ29kZS50cyIsIndlYnBhY2s6Ly9rb29yYS8uL3NyYy9jb25zdGFudHMva2V5Ym9hcmRDb2RlTWFwLnRzIiwid2VicGFjazovL2tvb3JhLy4vc3JjL2xvYWRlci9HbHVlQmFzZS50cyIsIndlYnBhY2s6Ly9rb29yYS8uL3NyYy9sb2FkZXIvSW5wdXRHbHVlLnRzIiwid2VicGFjazovL2tvb3JhLy4vc3JjL2xvYWRlci9Lb29yYUxvYWRlci50cyIsIndlYnBhY2s6Ly9rb29yYS8uL3NyYy9sb2FkZXIvUmVuZGVyR2x1ZS50cyIsIndlYnBhY2s6Ly9rb29yYS8uL3NyYy9sb2FkZXIva29vcmFCaW5kaW5ncy50cyIsIndlYnBhY2s6Ly9rb29yYS8uL3NyYy9sb2FkZXIvdGVzdFJ1bi50cyIsIndlYnBhY2s6Ly9rb29yYS8uL3NyYy91dGlscy9EZWJvdW5jZVJlc2l6ZU9ic2VydmVyLnRzIiwid2VicGFjazovL2tvb3JhLy4vc3JjL3V0aWxzL2F1dG9CaW5kLnRzIiwid2VicGFjazovL2tvb3JhLy4vc3JjL3V0aWxzL2NsYXNzVXRpbHMudHMiLCJ3ZWJwYWNrOi8va29vcmEvLi9zcmMvdXRpbHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8va29vcmEvLi9zcmMvX3dhc20vZGVidWcuanMiLCJ3ZWJwYWNrOi8va29vcmEvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8va29vcmEvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8va29vcmEvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2tvb3JhL3dlYnBhY2svcnVudGltZS9lbnN1cmUgY2h1bmsiLCJ3ZWJwYWNrOi8va29vcmEvd2VicGFjay9ydW50aW1lL2dldCBqYXZhc2NyaXB0IGNodW5rIGZpbGVuYW1lIiwid2VicGFjazovL2tvb3JhL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8va29vcmEvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9rb29yYS93ZWJwYWNrL3J1bnRpbWUvbG9hZCBzY3JpcHQiLCJ3ZWJwYWNrOi8va29vcmEvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9rb29yYS93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9rb29yYS93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9rb29yYS8uL3NyYy9lbnRyeS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGxvZGFzaCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMgPGh0dHBzOi8vanF1ZXJ5Lm9yZy8+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKi9cblxuLyoqIFVzZWQgYXMgdGhlIGBUeXBlRXJyb3JgIG1lc3NhZ2UgZm9yIFwiRnVuY3Rpb25zXCIgbWV0aG9kcy4gKi9cbnZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE5BTiA9IDAgLyAwO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2UuICovXG52YXIgcmVUcmltID0gL15cXHMrfFxccyskL2c7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiYWQgc2lnbmVkIGhleGFkZWNpbWFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JhZEhleCA9IC9eWy0rXTB4WzAtOWEtZl0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmluYXJ5IHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JpbmFyeSA9IC9eMGJbMDFdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG9jdGFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc09jdGFsID0gL14wb1swLTddKyQvaTtcblxuLyoqIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHdpdGhvdXQgYSBkZXBlbmRlbmN5IG9uIGByb290YC4gKi9cbnZhciBmcmVlUGFyc2VJbnQgPSBwYXJzZUludDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZU1heCA9IE1hdGgubWF4LFxuICAgIG5hdGl2ZU1pbiA9IE1hdGgubWluO1xuXG4vKipcbiAqIEdldHMgdGhlIHRpbWVzdGFtcCBvZiB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0aGF0IGhhdmUgZWxhcHNlZCBzaW5jZVxuICogdGhlIFVuaXggZXBvY2ggKDEgSmFudWFyeSAxOTcwIDAwOjAwOjAwIFVUQykuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAyLjQuMFxuICogQGNhdGVnb3J5IERhdGVcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIHRpbWVzdGFtcC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5kZWZlcihmdW5jdGlvbihzdGFtcCkge1xuICogICBjb25zb2xlLmxvZyhfLm5vdygpIC0gc3RhbXApO1xuICogfSwgXy5ub3coKSk7XG4gKiAvLyA9PiBMb2dzIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGl0IHRvb2sgZm9yIHRoZSBkZWZlcnJlZCBpbnZvY2F0aW9uLlxuICovXG52YXIgbm93ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiByb290LkRhdGUubm93KCk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBkZWJvdW5jZWQgZnVuY3Rpb24gdGhhdCBkZWxheXMgaW52b2tpbmcgYGZ1bmNgIHVudGlsIGFmdGVyIGB3YWl0YFxuICogbWlsbGlzZWNvbmRzIGhhdmUgZWxhcHNlZCBzaW5jZSB0aGUgbGFzdCB0aW1lIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gd2FzXG4gKiBpbnZva2VkLiBUaGUgZGVib3VuY2VkIGZ1bmN0aW9uIGNvbWVzIHdpdGggYSBgY2FuY2VsYCBtZXRob2QgdG8gY2FuY2VsXG4gKiBkZWxheWVkIGBmdW5jYCBpbnZvY2F0aW9ucyBhbmQgYSBgZmx1c2hgIG1ldGhvZCB0byBpbW1lZGlhdGVseSBpbnZva2UgdGhlbS5cbiAqIFByb3ZpZGUgYG9wdGlvbnNgIHRvIGluZGljYXRlIHdoZXRoZXIgYGZ1bmNgIHNob3VsZCBiZSBpbnZva2VkIG9uIHRoZVxuICogbGVhZGluZyBhbmQvb3IgdHJhaWxpbmcgZWRnZSBvZiB0aGUgYHdhaXRgIHRpbWVvdXQuIFRoZSBgZnVuY2AgaXMgaW52b2tlZFxuICogd2l0aCB0aGUgbGFzdCBhcmd1bWVudHMgcHJvdmlkZWQgdG8gdGhlIGRlYm91bmNlZCBmdW5jdGlvbi4gU3Vic2VxdWVudFxuICogY2FsbHMgdG8gdGhlIGRlYm91bmNlZCBmdW5jdGlvbiByZXR1cm4gdGhlIHJlc3VsdCBvZiB0aGUgbGFzdCBgZnVuY2BcbiAqIGludm9jYXRpb24uXG4gKlxuICogKipOb3RlOioqIElmIGBsZWFkaW5nYCBhbmQgYHRyYWlsaW5nYCBvcHRpb25zIGFyZSBgdHJ1ZWAsIGBmdW5jYCBpc1xuICogaW52b2tlZCBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dCBvbmx5IGlmIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb25cbiAqIGlzIGludm9rZWQgbW9yZSB0aGFuIG9uY2UgZHVyaW5nIHRoZSBgd2FpdGAgdGltZW91dC5cbiAqXG4gKiBJZiBgd2FpdGAgaXMgYDBgIGFuZCBgbGVhZGluZ2AgaXMgYGZhbHNlYCwgYGZ1bmNgIGludm9jYXRpb24gaXMgZGVmZXJyZWRcbiAqIHVudGlsIHRvIHRoZSBuZXh0IHRpY2ssIHNpbWlsYXIgdG8gYHNldFRpbWVvdXRgIHdpdGggYSB0aW1lb3V0IG9mIGAwYC5cbiAqXG4gKiBTZWUgW0RhdmlkIENvcmJhY2hvJ3MgYXJ0aWNsZV0oaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9kZWJvdW5jaW5nLXRocm90dGxpbmctZXhwbGFpbmVkLWV4YW1wbGVzLylcbiAqIGZvciBkZXRhaWxzIG92ZXIgdGhlIGRpZmZlcmVuY2VzIGJldHdlZW4gYF8uZGVib3VuY2VgIGFuZCBgXy50aHJvdHRsZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBkZWJvdW5jZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbd2FpdD0wXSBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byBkZWxheS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gVGhlIG9wdGlvbnMgb2JqZWN0LlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWFkaW5nPWZhbHNlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIGxlYWRpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tYXhXYWl0XVxuICogIFRoZSBtYXhpbXVtIHRpbWUgYGZ1bmNgIGlzIGFsbG93ZWQgdG8gYmUgZGVsYXllZCBiZWZvcmUgaXQncyBpbnZva2VkLlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy50cmFpbGluZz10cnVlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBkZWJvdW5jZWQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIC8vIEF2b2lkIGNvc3RseSBjYWxjdWxhdGlvbnMgd2hpbGUgdGhlIHdpbmRvdyBzaXplIGlzIGluIGZsdXguXG4gKiBqUXVlcnkod2luZG93KS5vbigncmVzaXplJywgXy5kZWJvdW5jZShjYWxjdWxhdGVMYXlvdXQsIDE1MCkpO1xuICpcbiAqIC8vIEludm9rZSBgc2VuZE1haWxgIHdoZW4gY2xpY2tlZCwgZGVib3VuY2luZyBzdWJzZXF1ZW50IGNhbGxzLlxuICogalF1ZXJ5KGVsZW1lbnQpLm9uKCdjbGljaycsIF8uZGVib3VuY2Uoc2VuZE1haWwsIDMwMCwge1xuICogICAnbGVhZGluZyc6IHRydWUsXG4gKiAgICd0cmFpbGluZyc6IGZhbHNlXG4gKiB9KSk7XG4gKlxuICogLy8gRW5zdXJlIGBiYXRjaExvZ2AgaXMgaW52b2tlZCBvbmNlIGFmdGVyIDEgc2Vjb25kIG9mIGRlYm91bmNlZCBjYWxscy5cbiAqIHZhciBkZWJvdW5jZWQgPSBfLmRlYm91bmNlKGJhdGNoTG9nLCAyNTAsIHsgJ21heFdhaXQnOiAxMDAwIH0pO1xuICogdmFyIHNvdXJjZSA9IG5ldyBFdmVudFNvdXJjZSgnL3N0cmVhbScpO1xuICogalF1ZXJ5KHNvdXJjZSkub24oJ21lc3NhZ2UnLCBkZWJvdW5jZWQpO1xuICpcbiAqIC8vIENhbmNlbCB0aGUgdHJhaWxpbmcgZGVib3VuY2VkIGludm9jYXRpb24uXG4gKiBqUXVlcnkod2luZG93KS5vbigncG9wc3RhdGUnLCBkZWJvdW5jZWQuY2FuY2VsKTtcbiAqL1xuZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCwgb3B0aW9ucykge1xuICB2YXIgbGFzdEFyZ3MsXG4gICAgICBsYXN0VGhpcyxcbiAgICAgIG1heFdhaXQsXG4gICAgICByZXN1bHQsXG4gICAgICB0aW1lcklkLFxuICAgICAgbGFzdENhbGxUaW1lLFxuICAgICAgbGFzdEludm9rZVRpbWUgPSAwLFxuICAgICAgbGVhZGluZyA9IGZhbHNlLFxuICAgICAgbWF4aW5nID0gZmFsc2UsXG4gICAgICB0cmFpbGluZyA9IHRydWU7XG5cbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgd2FpdCA9IHRvTnVtYmVyKHdhaXQpIHx8IDA7XG4gIGlmIChpc09iamVjdChvcHRpb25zKSkge1xuICAgIGxlYWRpbmcgPSAhIW9wdGlvbnMubGVhZGluZztcbiAgICBtYXhpbmcgPSAnbWF4V2FpdCcgaW4gb3B0aW9ucztcbiAgICBtYXhXYWl0ID0gbWF4aW5nID8gbmF0aXZlTWF4KHRvTnVtYmVyKG9wdGlvbnMubWF4V2FpdCkgfHwgMCwgd2FpdCkgOiBtYXhXYWl0O1xuICAgIHRyYWlsaW5nID0gJ3RyYWlsaW5nJyBpbiBvcHRpb25zID8gISFvcHRpb25zLnRyYWlsaW5nIDogdHJhaWxpbmc7XG4gIH1cblxuICBmdW5jdGlvbiBpbnZva2VGdW5jKHRpbWUpIHtcbiAgICB2YXIgYXJncyA9IGxhc3RBcmdzLFxuICAgICAgICB0aGlzQXJnID0gbGFzdFRoaXM7XG5cbiAgICBsYXN0QXJncyA9IGxhc3RUaGlzID0gdW5kZWZpbmVkO1xuICAgIGxhc3RJbnZva2VUaW1lID0gdGltZTtcbiAgICByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBsZWFkaW5nRWRnZSh0aW1lKSB7XG4gICAgLy8gUmVzZXQgYW55IGBtYXhXYWl0YCB0aW1lci5cbiAgICBsYXN0SW52b2tlVGltZSA9IHRpbWU7XG4gICAgLy8gU3RhcnQgdGhlIHRpbWVyIGZvciB0aGUgdHJhaWxpbmcgZWRnZS5cbiAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgIC8vIEludm9rZSB0aGUgbGVhZGluZyBlZGdlLlxuICAgIHJldHVybiBsZWFkaW5nID8gaW52b2tlRnVuYyh0aW1lKSA6IHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbWFpbmluZ1dhaXQodGltZSkge1xuICAgIHZhciB0aW1lU2luY2VMYXN0Q2FsbCA9IHRpbWUgLSBsYXN0Q2FsbFRpbWUsXG4gICAgICAgIHRpbWVTaW5jZUxhc3RJbnZva2UgPSB0aW1lIC0gbGFzdEludm9rZVRpbWUsXG4gICAgICAgIHJlc3VsdCA9IHdhaXQgLSB0aW1lU2luY2VMYXN0Q2FsbDtcblxuICAgIHJldHVybiBtYXhpbmcgPyBuYXRpdmVNaW4ocmVzdWx0LCBtYXhXYWl0IC0gdGltZVNpbmNlTGFzdEludm9rZSkgOiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBzaG91bGRJbnZva2UodGltZSkge1xuICAgIHZhciB0aW1lU2luY2VMYXN0Q2FsbCA9IHRpbWUgLSBsYXN0Q2FsbFRpbWUsXG4gICAgICAgIHRpbWVTaW5jZUxhc3RJbnZva2UgPSB0aW1lIC0gbGFzdEludm9rZVRpbWU7XG5cbiAgICAvLyBFaXRoZXIgdGhpcyBpcyB0aGUgZmlyc3QgY2FsbCwgYWN0aXZpdHkgaGFzIHN0b3BwZWQgYW5kIHdlJ3JlIGF0IHRoZVxuICAgIC8vIHRyYWlsaW5nIGVkZ2UsIHRoZSBzeXN0ZW0gdGltZSBoYXMgZ29uZSBiYWNrd2FyZHMgYW5kIHdlJ3JlIHRyZWF0aW5nXG4gICAgLy8gaXQgYXMgdGhlIHRyYWlsaW5nIGVkZ2UsIG9yIHdlJ3ZlIGhpdCB0aGUgYG1heFdhaXRgIGxpbWl0LlxuICAgIHJldHVybiAobGFzdENhbGxUaW1lID09PSB1bmRlZmluZWQgfHwgKHRpbWVTaW5jZUxhc3RDYWxsID49IHdhaXQpIHx8XG4gICAgICAodGltZVNpbmNlTGFzdENhbGwgPCAwKSB8fCAobWF4aW5nICYmIHRpbWVTaW5jZUxhc3RJbnZva2UgPj0gbWF4V2FpdCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gdGltZXJFeHBpcmVkKCkge1xuICAgIHZhciB0aW1lID0gbm93KCk7XG4gICAgaWYgKHNob3VsZEludm9rZSh0aW1lKSkge1xuICAgICAgcmV0dXJuIHRyYWlsaW5nRWRnZSh0aW1lKTtcbiAgICB9XG4gICAgLy8gUmVzdGFydCB0aGUgdGltZXIuXG4gICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCByZW1haW5pbmdXYWl0KHRpbWUpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyYWlsaW5nRWRnZSh0aW1lKSB7XG4gICAgdGltZXJJZCA9IHVuZGVmaW5lZDtcblxuICAgIC8vIE9ubHkgaW52b2tlIGlmIHdlIGhhdmUgYGxhc3RBcmdzYCB3aGljaCBtZWFucyBgZnVuY2AgaGFzIGJlZW5cbiAgICAvLyBkZWJvdW5jZWQgYXQgbGVhc3Qgb25jZS5cbiAgICBpZiAodHJhaWxpbmcgJiYgbGFzdEFyZ3MpIHtcbiAgICAgIHJldHVybiBpbnZva2VGdW5jKHRpbWUpO1xuICAgIH1cbiAgICBsYXN0QXJncyA9IGxhc3RUaGlzID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgaWYgKHRpbWVySWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVySWQpO1xuICAgIH1cbiAgICBsYXN0SW52b2tlVGltZSA9IDA7XG4gICAgbGFzdEFyZ3MgPSBsYXN0Q2FsbFRpbWUgPSBsYXN0VGhpcyA9IHRpbWVySWQgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBmdW5jdGlvbiBmbHVzaCgpIHtcbiAgICByZXR1cm4gdGltZXJJZCA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogdHJhaWxpbmdFZGdlKG5vdygpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlYm91bmNlZCgpIHtcbiAgICB2YXIgdGltZSA9IG5vdygpLFxuICAgICAgICBpc0ludm9raW5nID0gc2hvdWxkSW52b2tlKHRpbWUpO1xuXG4gICAgbGFzdEFyZ3MgPSBhcmd1bWVudHM7XG4gICAgbGFzdFRoaXMgPSB0aGlzO1xuICAgIGxhc3RDYWxsVGltZSA9IHRpbWU7XG5cbiAgICBpZiAoaXNJbnZva2luZykge1xuICAgICAgaWYgKHRpbWVySWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gbGVhZGluZ0VkZ2UobGFzdENhbGxUaW1lKTtcbiAgICAgIH1cbiAgICAgIGlmIChtYXhpbmcpIHtcbiAgICAgICAgLy8gSGFuZGxlIGludm9jYXRpb25zIGluIGEgdGlnaHQgbG9vcC5cbiAgICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICAgICAgcmV0dXJuIGludm9rZUZ1bmMobGFzdENhbGxUaW1lKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRpbWVySWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBkZWJvdW5jZWQuY2FuY2VsID0gY2FuY2VsO1xuICBkZWJvdW5jZWQuZmx1c2ggPSBmbHVzaDtcbiAgcmV0dXJuIGRlYm91bmNlZDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3ltYm9sYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3ltYm9sLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N5bWJvbCcgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBzeW1ib2xUYWcpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBudW1iZXIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBudW1iZXIuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9OdW1iZXIoMy4yKTtcbiAqIC8vID0+IDMuMlxuICpcbiAqIF8udG9OdW1iZXIoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiA1ZS0zMjRcbiAqXG4gKiBfLnRvTnVtYmVyKEluZmluaXR5KTtcbiAqIC8vID0+IEluZmluaXR5XG4gKlxuICogXy50b051bWJlcignMy4yJyk7XG4gKiAvLyA9PiAzLjJcbiAqL1xuZnVuY3Rpb24gdG9OdW1iZXIodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAoaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIE5BTjtcbiAgfVxuICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgdmFyIG90aGVyID0gdHlwZW9mIHZhbHVlLnZhbHVlT2YgPT0gJ2Z1bmN0aW9uJyA/IHZhbHVlLnZhbHVlT2YoKSA6IHZhbHVlO1xuICAgIHZhbHVlID0gaXNPYmplY3Qob3RoZXIpID8gKG90aGVyICsgJycpIDogb3RoZXI7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gMCA/IHZhbHVlIDogK3ZhbHVlO1xuICB9XG4gIHZhbHVlID0gdmFsdWUucmVwbGFjZShyZVRyaW0sICcnKTtcbiAgdmFyIGlzQmluYXJ5ID0gcmVJc0JpbmFyeS50ZXN0KHZhbHVlKTtcbiAgcmV0dXJuIChpc0JpbmFyeSB8fCByZUlzT2N0YWwudGVzdCh2YWx1ZSkpXG4gICAgPyBmcmVlUGFyc2VJbnQodmFsdWUuc2xpY2UoMiksIGlzQmluYXJ5ID8gMiA6IDgpXG4gICAgOiAocmVJc0JhZEhleC50ZXN0KHZhbHVlKSA/IE5BTiA6ICt2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGVib3VuY2U7XG4iLCJleHBvcnQgKiBmcm9tICcuL2tleWJvYXJkQ29kZSdcbmV4cG9ydCAqIGZyb20gJy4va2V5Ym9hcmRDb2RlTWFwJyIsIlxuZXhwb3J0IGVudW0gS2V5Ym9hcmRDb2RlIHtcblx0QmFja3NwYWNlLFxuXHRUYWIsXG5cdEVudGVyLFxuXHRTaGlmdExlZnQsXG5cdFNoaWZ0UmlnaHQsXG5cdENvbnRyb2xMZWZ0LFxuXHRDb250cm9sUmlnaHQsXG5cdEFsdExlZnQsXG5cdEFsdFJpZ2h0LFxuXHRQYXVzZSxcblx0Q2Fwc0xvY2ssXG5cdEVzY2FwZSxcblx0U3BhY2UsXG5cdFBhZ2VVcCxcblx0UGFnZURvd24sXG5cdEVuZCxcblx0SG9tZSxcblx0QXJyb3dMZWZ0LFxuXHRBcnJvd1VwLFxuXHRBcnJvd1JpZ2h0LFxuXHRBcnJvd0Rvd24sXG5cdFByaW50U2NyZWVuLFxuXHRJbnNlcnQsXG5cdERlbGV0ZSxcblx0RGlnaXQwLFxuXHREaWdpdDEsXG5cdERpZ2l0Mixcblx0RGlnaXQzLFxuXHREaWdpdDQsXG5cdERpZ2l0NSxcblx0RGlnaXQ2LFxuXHREaWdpdDcsXG5cdERpZ2l0OCxcblx0RGlnaXQ5LFxuXHRBdWRpb1ZvbHVtZU11dGUsXG5cdEF1ZGlvVm9sdW1lRG93bixcblx0QXVkaW9Wb2x1bWVVcCxcblx0S2V5QSxcblx0S2V5Qixcblx0S2V5Qyxcblx0S2V5RCxcblx0S2V5RSxcblx0S2V5Rixcblx0S2V5Ryxcblx0S2V5SCxcblx0S2V5SSxcblx0S2V5Sixcblx0S2V5Syxcblx0S2V5TCxcblx0S2V5TSxcblx0S2V5Tixcblx0S2V5Tyxcblx0S2V5UCxcblx0S2V5USxcblx0S2V5Uixcblx0S2V5Uyxcblx0S2V5VCxcblx0S2V5VSxcblx0S2V5Vixcblx0S2V5Vyxcblx0S2V5WCxcblx0S2V5WSxcblx0S2V5Wixcblx0TWV0YUxlZnQsXG5cdE1ldGFSaWdodCxcblx0Q29udGV4dE1lbnUsXG5cdE51bXBhZDAsXG5cdE51bXBhZDEsXG5cdE51bXBhZDIsXG5cdE51bXBhZDMsXG5cdE51bXBhZDQsXG5cdE51bXBhZDUsXG5cdE51bXBhZDYsXG5cdE51bXBhZDcsXG5cdE51bXBhZDgsXG5cdE51bXBhZDksXG5cdE51bXBhZE11bHRpcGx5LFxuXHROdW1wYWRBZGQsXG5cdE51bXBhZFN1YnRyYWN0LFxuXHROdW1wYWREZWNpbWFsLFxuXHROdW1wYWREaXZpZGUsXG5cdEYxLFxuXHRGMixcblx0RjMsXG5cdEY0LFxuXHRGNSxcblx0RjYsXG5cdEY3LFxuXHRGOCxcblx0RjksXG5cdEYxMCxcblx0RjExLFxuXHRGMTIsXG5cdE51bUxvY2ssXG5cdFNjcm9sbExvY2ssXG5cdFNlbWljb2xvbixcblx0RXF1YWwsXG5cdENvbW1hLFxuXHRNaW51cyxcblx0UGVyaW9kLFxuXHRTbGFzaCxcblx0QmFja3F1b3RlLFxuXHRCcmFja2V0TGVmdCxcblx0QmFja3NsYXNoLFxuXHRCcmFja2V0UmlnaHQsXG5cdFF1b3RlLFxufVxuIiwiaW1wb3J0IHsgS2V5Ym9hcmRDb2RlIH0gZnJvbSAnLi9rZXlib2FyZENvZGUnXG5cbmV4cG9ydCBjb25zdCBrZXlib2FyZENvZGVNYXA6IFJlY29yZDxzdHJpbmcsIEtleWJvYXJkQ29kZT4gPSB7XG5cdEJhY2tzcGFjZTogS2V5Ym9hcmRDb2RlLkJhY2tzcGFjZSxcblx0VGFiOiBLZXlib2FyZENvZGUuVGFiLFxuXHRFbnRlcjogS2V5Ym9hcmRDb2RlLkVudGVyLFxuXHRTaGlmdExlZnQ6IEtleWJvYXJkQ29kZS5TaGlmdExlZnQsXG5cdFNoaWZ0UmlnaHQ6IEtleWJvYXJkQ29kZS5TaGlmdFJpZ2h0LFxuXHRDb250cm9sTGVmdDogS2V5Ym9hcmRDb2RlLkNvbnRyb2xMZWZ0LFxuXHRDb250cm9sUmlnaHQ6IEtleWJvYXJkQ29kZS5Db250cm9sUmlnaHQsXG5cdEFsdExlZnQ6IEtleWJvYXJkQ29kZS5BbHRMZWZ0LFxuXHRBbHRSaWdodDogS2V5Ym9hcmRDb2RlLkFsdFJpZ2h0LFxuXHRQYXVzZTogS2V5Ym9hcmRDb2RlLlBhdXNlLFxuXHRDYXBzTG9jazogS2V5Ym9hcmRDb2RlLkNhcHNMb2NrLFxuXHRFc2NhcGU6IEtleWJvYXJkQ29kZS5Fc2NhcGUsXG5cdFNwYWNlOiBLZXlib2FyZENvZGUuU3BhY2UsXG5cdFBhZ2VVcDogS2V5Ym9hcmRDb2RlLlBhZ2VVcCxcblx0UGFnZURvd246IEtleWJvYXJkQ29kZS5QYWdlRG93bixcblx0RW5kOiBLZXlib2FyZENvZGUuRW5kLFxuXHRIb21lOiBLZXlib2FyZENvZGUuSG9tZSxcblx0QXJyb3dMZWZ0OiBLZXlib2FyZENvZGUuQXJyb3dMZWZ0LFxuXHRBcnJvd1VwOiBLZXlib2FyZENvZGUuQXJyb3dVcCxcblx0QXJyb3dSaWdodDogS2V5Ym9hcmRDb2RlLkFycm93UmlnaHQsXG5cdEFycm93RG93bjogS2V5Ym9hcmRDb2RlLkFycm93RG93bixcblx0UHJpbnRTY3JlZW46IEtleWJvYXJkQ29kZS5QcmludFNjcmVlbixcblx0SW5zZXJ0OiBLZXlib2FyZENvZGUuSW5zZXJ0LFxuXHREZWxldGU6IEtleWJvYXJkQ29kZS5EZWxldGUsXG5cdERpZ2l0MDogS2V5Ym9hcmRDb2RlLkRpZ2l0MCxcblx0RGlnaXQxOiBLZXlib2FyZENvZGUuRGlnaXQxLFxuXHREaWdpdDI6IEtleWJvYXJkQ29kZS5EaWdpdDIsXG5cdERpZ2l0MzogS2V5Ym9hcmRDb2RlLkRpZ2l0Myxcblx0RGlnaXQ0OiBLZXlib2FyZENvZGUuRGlnaXQ0LFxuXHREaWdpdDU6IEtleWJvYXJkQ29kZS5EaWdpdDUsXG5cdERpZ2l0NjogS2V5Ym9hcmRDb2RlLkRpZ2l0Nixcblx0RGlnaXQ3OiBLZXlib2FyZENvZGUuRGlnaXQ3LFxuXHREaWdpdDg6IEtleWJvYXJkQ29kZS5EaWdpdDgsXG5cdERpZ2l0OTogS2V5Ym9hcmRDb2RlLkRpZ2l0OSxcblx0QXVkaW9Wb2x1bWVNdXRlOiBLZXlib2FyZENvZGUuQXVkaW9Wb2x1bWVNdXRlLFxuXHRBdWRpb1ZvbHVtZURvd246IEtleWJvYXJkQ29kZS5BdWRpb1ZvbHVtZURvd24sXG5cdEF1ZGlvVm9sdW1lVXA6IEtleWJvYXJkQ29kZS5BdWRpb1ZvbHVtZVVwLFxuXHRLZXlBOiBLZXlib2FyZENvZGUuS2V5QSxcblx0S2V5QjogS2V5Ym9hcmRDb2RlLktleUIsXG5cdEtleUM6IEtleWJvYXJkQ29kZS5LZXlDLFxuXHRLZXlEOiBLZXlib2FyZENvZGUuS2V5RCxcblx0S2V5RTogS2V5Ym9hcmRDb2RlLktleUUsXG5cdEtleUY6IEtleWJvYXJkQ29kZS5LZXlGLFxuXHRLZXlHOiBLZXlib2FyZENvZGUuS2V5Ryxcblx0S2V5SDogS2V5Ym9hcmRDb2RlLktleUgsXG5cdEtleUk6IEtleWJvYXJkQ29kZS5LZXlJLFxuXHRLZXlKOiBLZXlib2FyZENvZGUuS2V5Sixcblx0S2V5SzogS2V5Ym9hcmRDb2RlLktleUssXG5cdEtleUw6IEtleWJvYXJkQ29kZS5LZXlMLFxuXHRLZXlNOiBLZXlib2FyZENvZGUuS2V5TSxcblx0S2V5TjogS2V5Ym9hcmRDb2RlLktleU4sXG5cdEtleU86IEtleWJvYXJkQ29kZS5LZXlPLFxuXHRLZXlQOiBLZXlib2FyZENvZGUuS2V5UCxcblx0S2V5UTogS2V5Ym9hcmRDb2RlLktleVEsXG5cdEtleVI6IEtleWJvYXJkQ29kZS5LZXlSLFxuXHRLZXlTOiBLZXlib2FyZENvZGUuS2V5Uyxcblx0S2V5VDogS2V5Ym9hcmRDb2RlLktleVQsXG5cdEtleVU6IEtleWJvYXJkQ29kZS5LZXlVLFxuXHRLZXlWOiBLZXlib2FyZENvZGUuS2V5Vixcblx0S2V5VzogS2V5Ym9hcmRDb2RlLktleVcsXG5cdEtleVg6IEtleWJvYXJkQ29kZS5LZXlYLFxuXHRLZXlZOiBLZXlib2FyZENvZGUuS2V5WSxcblx0S2V5WjogS2V5Ym9hcmRDb2RlLktleVosXG5cdE1ldGFMZWZ0OiBLZXlib2FyZENvZGUuTWV0YUxlZnQsXG5cdE1ldGFSaWdodDogS2V5Ym9hcmRDb2RlLk1ldGFSaWdodCxcblx0Q29udGV4dE1lbnU6IEtleWJvYXJkQ29kZS5Db250ZXh0TWVudSxcblx0TnVtcGFkMDogS2V5Ym9hcmRDb2RlLk51bXBhZDAsXG5cdE51bXBhZDE6IEtleWJvYXJkQ29kZS5OdW1wYWQxLFxuXHROdW1wYWQyOiBLZXlib2FyZENvZGUuTnVtcGFkMixcblx0TnVtcGFkMzogS2V5Ym9hcmRDb2RlLk51bXBhZDMsXG5cdE51bXBhZDQ6IEtleWJvYXJkQ29kZS5OdW1wYWQ0LFxuXHROdW1wYWQ1OiBLZXlib2FyZENvZGUuTnVtcGFkNSxcblx0TnVtcGFkNjogS2V5Ym9hcmRDb2RlLk51bXBhZDYsXG5cdE51bXBhZDc6IEtleWJvYXJkQ29kZS5OdW1wYWQ3LFxuXHROdW1wYWQ4OiBLZXlib2FyZENvZGUuTnVtcGFkOCxcblx0TnVtcGFkOTogS2V5Ym9hcmRDb2RlLk51bXBhZDksXG5cdE51bXBhZE11bHRpcGx5OiBLZXlib2FyZENvZGUuTnVtcGFkTXVsdGlwbHksXG5cdE51bXBhZEFkZDogS2V5Ym9hcmRDb2RlLk51bXBhZEFkZCxcblx0TnVtcGFkU3VidHJhY3Q6IEtleWJvYXJkQ29kZS5OdW1wYWRTdWJ0cmFjdCxcblx0TnVtcGFkRGVjaW1hbDogS2V5Ym9hcmRDb2RlLk51bXBhZERlY2ltYWwsXG5cdE51bXBhZERpdmlkZTogS2V5Ym9hcmRDb2RlLk51bXBhZERpdmlkZSxcblx0RjE6IEtleWJvYXJkQ29kZS5GMSxcblx0RjI6IEtleWJvYXJkQ29kZS5GMixcblx0RjM6IEtleWJvYXJkQ29kZS5GMyxcblx0RjQ6IEtleWJvYXJkQ29kZS5GNCxcblx0RjU6IEtleWJvYXJkQ29kZS5GNSxcblx0RjY6IEtleWJvYXJkQ29kZS5GNixcblx0Rjc6IEtleWJvYXJkQ29kZS5GNyxcblx0Rjg6IEtleWJvYXJkQ29kZS5GOCxcblx0Rjk6IEtleWJvYXJkQ29kZS5GOSxcblx0RjEwOiBLZXlib2FyZENvZGUuRjEwLFxuXHRGMTE6IEtleWJvYXJkQ29kZS5GMTEsXG5cdEYxMjogS2V5Ym9hcmRDb2RlLkYxMixcblx0TnVtTG9jazogS2V5Ym9hcmRDb2RlLk51bUxvY2ssXG5cdFNjcm9sbExvY2s6IEtleWJvYXJkQ29kZS5TY3JvbGxMb2NrLFxuXHRTZW1pY29sb246IEtleWJvYXJkQ29kZS5TZW1pY29sb24sXG5cdEVxdWFsOiBLZXlib2FyZENvZGUuRXF1YWwsXG5cdENvbW1hOiBLZXlib2FyZENvZGUuQ29tbWEsXG5cdE1pbnVzOiBLZXlib2FyZENvZGUuTWludXMsXG5cdFBlcmlvZDogS2V5Ym9hcmRDb2RlLlBlcmlvZCxcblx0U2xhc2g6IEtleWJvYXJkQ29kZS5TbGFzaCxcblx0QmFja3F1b3RlOiBLZXlib2FyZENvZGUuQmFja3F1b3RlLFxuXHRCcmFja2V0TGVmdDogS2V5Ym9hcmRDb2RlLkJyYWNrZXRMZWZ0LFxuXHRCYWNrc2xhc2g6IEtleWJvYXJkQ29kZS5CYWNrc2xhc2gsXG5cdEJyYWNrZXRSaWdodDogS2V5Ym9hcmRDb2RlLkJyYWNrZXRSaWdodCxcblx0UXVvdGU6IEtleWJvYXJkQ29kZS5RdW90ZVxufVxuIiwiaW1wb3J0IHsgYXV0b0JpbmQgfSBmcm9tICcuLi91dGlscydcbmltcG9ydCB7IEtvb3JhRXhwb3J0cyB9IGZyb20gJy4va29vcmFCaW5kaW5ncydcblxuXG5leHBvcnQgY2xhc3MgR2x1ZUJhc2V7XG5cblx0Z2w6IFdlYkdMMlJlbmRlcmluZ0NvbnRleHRcblx0d2FzbUV4cG9ydHM6IEtvb3JhRXhwb3J0c1xuXG5cdGNvbnN0cnVjdG9yKGdsKXtcblx0XHR0aGlzLmdsID0gZ2xcblx0XHRhdXRvQmluZCh0aGlzKVxuXHR9XG5cblx0b25Mb2FkKHdhc21FeHBvcnRzOiBLb29yYUV4cG9ydHMpe1xuXHRcdHRoaXMud2FzbUV4cG9ydHMgPSB3YXNtRXhwb3J0c1xuXHR9XG5cbn0iLCJpbXBvcnQgeyBrZXlib2FyZENvZGVNYXAgfSBmcm9tICcuLi9jb25zdGFudHMnXG5pbXBvcnQgeyBfX0FkYXB0ZWRFeHBvcnRzIH0gZnJvbSAnLi4vX3dhc20vZGVidWcnXG5pbXBvcnQgeyBHbHVlQmFzZSB9IGZyb20gJy4vR2x1ZUJhc2UnXG5pbXBvcnQgeyBLb29yYUV4cG9ydHMgfSBmcm9tICcuL2tvb3JhQmluZGluZ3MnXG5cblxuZXhwb3J0IGNsYXNzIElucHV0R2x1ZSBleHRlbmRzIEdsdWVCYXNle1xuXG5cblx0Y2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudFxuXG5cdGNvbnN0cnVjdG9yKGdsOiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0LCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KXtcblx0XHRzdXBlcihnbClcblx0XHR0aGlzLmNhbnZhcyA9IGNhbnZhc1xuXHR9XG5cdFxuXHRvbkxvYWQod2FzbUV4cG9ydHM6IEtvb3JhRXhwb3J0cyk6IHZvaWQge1xuXHRcdHN1cGVyLm9uTG9hZCh3YXNtRXhwb3J0cylcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5oYW5kbGVNb3VzZURvd24pXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZU1vdXNlVXApXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuaGFuZGxlTW91c2VNb3ZlKVxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5oYW5kbGVLZXlEb3duKVxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuaGFuZGxlS2V5VXApXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgdGhpcy5oYW5kbGVXaGVlbClcblx0fVxuXHRcblx0aGFuZGxlV2hlZWwoZTogV2hlZWxFdmVudCl7XG5cdFx0dGhpcy53YXNtRXhwb3J0cy5oYW5kbGVNb3VzZVdoZWVsKGUuZGVsdGFYLCBlLmRlbHRhWSlcblx0fVxuXHRoYW5kbGVNb3VzZURvd24oZTogTW91c2VFdmVudCl7XG5cdFx0dGhpcy53YXNtRXhwb3J0cy5oYW5kbGVNb3VzZURvd24oKVxuXHR9XG5cdGhhbmRsZU1vdXNlVXAoZTogTW91c2VFdmVudCl7XG5cdFx0dGhpcy53YXNtRXhwb3J0cy5oYW5kbGVNb3VzZVVwKClcblx0fVxuXHRcblx0aGFuZGxlS2V5RG93bihlOiBLZXlib2FyZEV2ZW50KXtcblx0XHR0aGlzLndhc21FeHBvcnRzLmhhbmRsZUtleURvd24oa2V5Ym9hcmRDb2RlTWFwW2UuY29kZV0pXHRcdFxuXHR9XG5cdGhhbmRsZUtleVVwKGU6IEtleWJvYXJkRXZlbnQpe1xuXHRcdHRoaXMud2FzbUV4cG9ydHMuaGFuZGxlS2V5VXAoa2V5Ym9hcmRDb2RlTWFwW2UuY29kZV0pXG5cdH1cblx0XG5cdGhhbmRsZU1vdXNlTW92ZShlOiBNb3VzZUV2ZW50KXtcblx0XHRjb25zdCByZWN0ID0gdGhpcy5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblx0XHRsZXQgeCA9IChlLmNsaWVudFggLSByZWN0LmxlZnQpIC8gcmVjdC53aWR0aFxuXHRcdGxldCB5ID0gKGUuY2xpZW50WSAtIHJlY3QudG9wKSAvIHJlY3QuaGVpZ2h0XG5cdFx0eCA9IHggKiAyIC0gMVxuXHRcdHkgPSB5ICogMiAtIDFcblx0XHR0aGlzLndhc21FeHBvcnRzLmhhbmRsZU1vdXNlTW92ZSh4LCB5KVxuXHR9XG5cdFxuXHRkaXNwb3NlKCl7XG5cdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlTW91c2VEb3duKVxuXHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVNb3VzZVVwKVxuXHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmhhbmRsZU1vdXNlTW92ZSlcblx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuaGFuZGxlS2V5RG93bilcblx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLmhhbmRsZUtleVVwKVxuXHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd3aGVlbCcsIHRoaXMuaGFuZGxlV2hlZWwpXG5cdH1cbn0iLCJpbXBvcnQgeyBhcHBseUdMT3ZlcmxvYWRzLCBhdXRvQmluZCB9IGZyb20gJy4uL3V0aWxzJ1xuaW1wb3J0IHsgR2x1ZUJhc2UgfSBmcm9tICcuL0dsdWVCYXNlJ1xuaW1wb3J0IHsgSW5wdXRHbHVlIH0gZnJvbSAnLi9JbnB1dEdsdWUnXG5pbXBvcnQgeyBEZWZhdWx0V29ybGRPcHRpb25zLCBLb29yYUJpbmRpbmdzLCBrb29yYUJpbmRpbmdzIH0gZnJvbSAnLi9rb29yYUJpbmRpbmdzJ1xuaW1wb3J0IHsgUmVuZGVyR2x1ZSB9IGZyb20gJy4vUmVuZGVyR2x1ZSdcblxuY29uc3QgbGlzdGVuID0gKGdsLCB2YWwpID0+IHtcblx0Y29uc3QgZnVuYyA9IGdsW3ZhbF1cblx0Z2xbdmFsXSA9ICguLi5hcmdzKSA9PiB7XG5cdFx0Y29uc29sZS5sb2coYCR7dmFsfSAtIGAsIGFyZ3MpXG5cdFx0ZnVuYyguLi5hcmdzKVxuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBLb29yYUxvYWRlciBleHRlbmRzIEdsdWVCYXNle1xuXG5cdGdsdWVzOiBHbHVlQmFzZVtdID0gW11cblx0ZXh0ZXJuSWQ6IG51bWJlciA9IDBcblx0ZXh0ZXJuTWFwOiBNYXA8bnVtYmVyLCBhbnk+ID0gbmV3IE1hcCgpXG5cblx0cmVuZGVyR2x1ZTogUmVuZGVyR2x1ZVxuXHRhbmltRnJhbWVJZDogbnVtYmVyXG5cdGNvbnN0cnVjdG9yKGNhbnZhcz86IEhUTUxDYW52YXNFbGVtZW50KXtcblx0XHRjYW52YXMgPz89IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdrb29yYS1jYW52YXMnKSBhcyBIVE1MQ2FudmFzRWxlbWVudFxuXHRcdGNhbnZhcyA/Pz0gZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKSlcblx0XHRjb25zdCBnbCA9IGNhbnZhcy5nZXRDb250ZXh0KCd3ZWJnbDInKVxuXHRcdHN1cGVyKGdsKVxuXHRcdGF1dG9CaW5kKGdsKVxuXHRcdGFwcGx5R0xPdmVybG9hZHMoZ2wpXG5cblx0XHR0aGlzLnJlbmRlckdsdWUgPSBuZXcgUmVuZGVyR2x1ZShnbCwgY2FudmFzKVxuXHRcdHRoaXMuZ2x1ZXMucHVzaCh0aGlzKVxuXHRcdHRoaXMuZ2x1ZXMucHVzaCh0aGlzLnJlbmRlckdsdWUpXG5cdFx0dGhpcy5nbHVlcy5wdXNoKG5ldyBJbnB1dEdsdWUoZ2wsIGNhbnZhcykpXG5cblx0XHQvL3plcm8gbWVhbnMgbnVsbFxuXHRcdHRoaXMuZXh0ZXJuTWFwLnNldCh0aGlzLmV4dGVybklkKyssIG51bGwpXG5cdH1cblx0ZXh0ZXJuU2V0KHZhbDogYW55KXtcblx0XHRpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0cmV0dXJuIDBcblx0XHRjb25zdCBpZCA9IHRoaXMuZXh0ZXJuSWQrK1xuXHRcdHRoaXMuZXh0ZXJuTWFwLnNldChpZCwgdmFsKVxuXHRcdHJldHVybiBpZFxuXHR9XG5cdGV4dGVybkdldChpZDogbnVtYmVyKXtcblx0XHRjb25zdCB2YWwgPSB0aGlzLmV4dGVybk1hcC5nZXQoaWQpXG5cdFx0Ly8gY29uc29sZS5kaXIodmFsKVxuXHRcdHJldHVybiB2YWxcblx0fVxuXHRleHRlcm5SZW1vdmUoaWQ6IG51bWJlcil7XG5cdFx0cmV0dXJuIHRoaXMuZXh0ZXJuTWFwLmRlbGV0ZShpZClcblx0fVxuXG5cdGFzeW5jIGxvYWQod2FzbVVybD86IHN0cmluZywgYmluZGluZ3M/OiBLb29yYUJpbmRpbmdzKTogUHJvbWlzZTxLb29yYUxvYWRlcj57XG5cdFx0d2FzbVVybCA/Pz0gJy9kZWJ1Zy53YXNtJ1xuXHRcdGJpbmRpbmdzID8/PSBrb29yYUJpbmRpbmdzXG5cdFx0Y29uc3Qgd2FzbUltcG9ydHMgPSB7XG5cdFx0XHRnbDogdGhpcy5nbCxcblx0XHRcdGhvc3Q6IHtcblx0XHRcdFx0bG9nOiBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpLFxuXHRcdFx0XHRsb2dfZjY0OiBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpLFxuXHRcdFx0XHRlbGFwc2VkOiBwZXJmb3JtYW5jZS5ub3cuYmluZChwZXJmb3JtYW5jZSksXG5cdFx0XHRcdG5vdzogRGF0ZS5ub3cuYmluZChEYXRlKSxcblx0XHRcdFx0c2V0OiB0aGlzLmV4dGVyblNldCxcblx0XHRcdFx0Z2V0OiB0aGlzLmV4dGVybkdldCxcblx0XHRcdFx0cmVtb3ZlOiB0aGlzLmV4dGVyblJlbW92ZVxuXHRcdFx0fSxcblx0XHRcdGVudjoge1xuXHRcdFx0XHRjb25zb2xlOiB7XG5cdFx0XHRcdFx0bG9nOiBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0Ly8gY29uc29sZS5kaXIod2FzbUltcG9ydHMpXG5cdFx0Y29uc3Qgd2FzbU1vZHVsZSA9IGF3YWl0IFdlYkFzc2VtYmx5LmNvbXBpbGVTdHJlYW1pbmcoZmV0Y2god2FzbVVybCkpXG5cdFx0Y29uc3Qgd2FzbUV4cG9ydHMgPSBhd2FpdCBiaW5kaW5ncy5pbnN0YW50aWF0ZSh3YXNtTW9kdWxlLCB3YXNtSW1wb3J0cylcblx0XHRmb3IgKGNvbnN0IGdsdWUgb2YgdGhpcy5nbHVlcylcblx0XHRcdGdsdWUub25Mb2FkKHdhc21FeHBvcnRzKVxuXHRcdFxuXHRcdHJldHVybiB0aGlzXG5cdH1cblx0c3RhcnQob3B0aW9uczogZmFsc2UgfCBQYXJ0aWFsPERlZmF1bHRXb3JsZE9wdGlvbnM+ID0ge30pOiBLb29yYUxvYWRlcntcdFx0XG5cdFx0aWYgKG9wdGlvbnMgIT09IGZhbHNlKVxuXHRcdFx0dGhpcy53YXNtRXhwb3J0cy5kZWZhdWx0V29ybGQoe1xuXHRcdFx0XHRsaWdodHM6IHRydWUsXG5cdFx0XHRcdGNhbWVyYTogdHJ1ZSxcblx0XHRcdFx0Z2l6bW9zOiB0cnVlLFxuXHRcdFx0XHRjYW1lcmFLZXlib2FyZENvbnRyb2xsZXI6IGZhbHNlLFxuXHRcdFx0XHRjYW1lcmFNb3VzZUNvbnRyb2xsZXI6IGZhbHNlLFxuXHRcdFx0XHRoZWxsb0N1YmU6IGZhbHNlLFxuXHRcdFx0XHQuLi5vcHRpb25zXG5cdFx0XHR9KVxuXHRcdHRoaXMucmVuZGVyR2x1ZS5yZXNpemUoKVxuXHRcdHRoaXMudXBkYXRlKClcblx0XHRyZXR1cm4gdGhpc1xuXHR9XG5cdHVwZGF0ZSgpe1xuXHRcdHRoaXMud2FzbUV4cG9ydHMudXBkYXRlKClcblx0XHR0aGlzLmFuaW1GcmFtZUlkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlKVxuXHR9XG5cdFxuXHRydW5PbmNlKCk6IEtvb3JhTG9hZGVye1xuXHRcdHRoaXMuc3RhcnQoKVxuXHRcdGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbUZyYW1lSWQpXG5cdFx0cmV0dXJuIHRoaXNcblx0fVxuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW5pdEtvb3JhT3B0aW9uc3tcblx0Y2FudmFzPzogSFRNTENhbnZhc0VsZW1lbnRcblx0d2FzbVVybD86IHN0cmluZ1xuXHRiaW5kaW5ncz86IEtvb3JhQmluZGluZ3Ncblx0ZGVmYXVsdFdvcmxkPzogZmFsc2UgfCBQYXJ0aWFsPERlZmF1bHRXb3JsZE9wdGlvbnM+XG59XG5cbmV4cG9ydCBjb25zdCBpbml0S29vcmEgPSBhc3luYyh7IGNhbnZhcywgd2FzbVVybCwgYmluZGluZ3MsIGRlZmF1bHRXb3JsZCB9OiBJbml0S29vcmFPcHRpb25zID0ge30pID0+IHtcdFxuXHRjb25zdCBsb2FkZXIgPSBuZXcgS29vcmFMb2FkZXIoY2FudmFzKVxuXHRhd2FpdCBsb2FkZXIubG9hZCh3YXNtVXJsLCBiaW5kaW5ncylcblx0bG9hZGVyLnN0YXJ0KGRlZmF1bHRXb3JsZClcblx0cmV0dXJuIGxvYWRlclxufVxuLy9AdHMtaWdub3JlXG53aW5kb3cuaW5pdEtvb3JhID0gaW5pdEtvb3JhXG5leHBvcnQgaW50ZXJmYWNlIEtvb3JhV2luZG93IGV4dGVuZHMgV2luZG93e1xuXHRpbml0S29vcmE6IHR5cGVvZiBpbml0S29vcmFcbn0iLCJpbXBvcnQgeyBEZWJvdW5jZVJlc2l6ZU9ic2VydmVyIH0gZnJvbSAnLi4vdXRpbHMnXG5pbXBvcnQgeyBHbHVlQmFzZSB9IGZyb20gJy4vR2x1ZUJhc2UnXG5pbXBvcnQgeyBLb29yYUV4cG9ydHMgfSBmcm9tICcuL2tvb3JhQmluZGluZ3MnXG5cbmV4cG9ydCBjbGFzcyBSZW5kZXJHbHVlIGV4dGVuZHMgR2x1ZUJhc2V7XG5cblx0Y2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudFxuXHRyZXNpemVPYnNlcnZlcjogRGVib3VuY2VSZXNpemVPYnNlcnZlclxuXG5cdGNvbnN0cnVjdG9yKGdsOiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0LCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KXtcblx0XHRzdXBlcihnbClcblx0XHR0aGlzLmNhbnZhcyA9IGNhbnZhc1xuXHRcdHRoaXMucmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIodGhpcy5yZXNpemUpXG5cdFx0dGhpcy5yZXNpemVPYnNlcnZlci5vYnNlcnZlKHRoaXMuY2FudmFzLnBhcmVudEVsZW1lbnQpXG5cdH1cblxuXHRyZXNpemUoKXtcblx0XHRjb25zdCB3aWR0aCA9IHRoaXMuY2FudmFzLmNsaWVudFdpZHRoXG5cdFx0Y29uc3QgaGVpZ2h0ID0gdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0XG5cdFx0dGhpcy5jYW52YXMud2lkdGggPSB3aWR0aFxuXHRcdHRoaXMuY2FudmFzLmhlaWdodCA9IGhlaWdodFxuXHRcdHRoaXMud2FzbUV4cG9ydHM/LmhhbmRsZVJlc2l6ZSh3aWR0aCwgaGVpZ2h0KVxuXHRcdHRoaXMud2FzbUV4cG9ydHM/LnVwZGF0ZSgpXG5cdH1cbn0iLCJpbXBvcnQgKiBhcyBrb29yYUJpbmRpbmdzIGZyb20gJy4uL193YXNtL2RlYnVnJ1xuZXhwb3J0IHR5cGUgS29vcmFFeHBvcnRzID0gdHlwZW9mIGtvb3JhQmluZGluZ3MuX19BZGFwdGVkRXhwb3J0c1xuZXhwb3J0IHR5cGUgS29vcmFCaW5kaW5ncyA9IHR5cGVvZiBrb29yYUJpbmRpbmdzXG5leHBvcnQgdHlwZSBEZWZhdWx0V29ybGRPcHRpb25zID0gUGFyYW1ldGVyczx0eXBlb2Yga29vcmFCaW5kaW5ncy5fX0FkYXB0ZWRFeHBvcnRzLmRlZmF1bHRXb3JsZD5bMF1cbmV4cG9ydCB7XG5cdGtvb3JhQmluZGluZ3Ncbn0iLCJpbXBvcnQgeyBpbml0S29vcmEgfSBmcm9tICcuL0tvb3JhTG9hZGVyJ1xuXG5cblxuZXhwb3J0IGNvbnN0IHRyeVRlc3RSdW4gPSBhc3luYygpID0+IHtcblx0Y29uc3QgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKVxuXHRpZiAoIXBhcmFtcy5oYXMoJ2t0ZXN0JykpXG5cdFx0cmV0dXJuXG5cdFxuXHRjb25zdCBjYW1lcmFLZXlib2FyZENvbnRyb2xsZXIgPSAhKHBhcmFtcy5nZXQoJ2JvYXJkJykgPT09ICdmYWxzZScpXG5cdGNvbnN0IGNhbWVyYU1vdXNlQ29udHJvbGxlciA9ICEocGFyYW1zLmdldCgnbW91c2UnKSA9PT0gJ2ZhbHNlJylcblxuXHQvL0B0cy1pZ25vcmVcblx0YXdhaXQgaW1wb3J0KCcuL3Rlc3RSdW5TdHlsZS5jc3MnKVxuXHRjb25zdCB7IHdhc21FeHBvcnRzIH0gPSBhd2FpdCBpbml0S29vcmEoe1xuXHRcdGRlZmF1bHRXb3JsZDoge1xuXHRcdFx0Y2FtZXJhS2V5Ym9hcmRDb250cm9sbGVyLFxuXHRcdFx0Y2FtZXJhTW91c2VDb250cm9sbGVyLFxuXHRcdH1cblx0fSlcblx0Y29uc3QgYSA9IHdhc21FeHBvcnRzLnJvdGF0aW5nQ3ViZSh3YXNtRXhwb3J0cy5saXRTaGFkZXIudmFsdWUpXG59XG5cbnRyeVRlc3RSdW4oKSIsIlxuaW1wb3J0IGRlYm91bmNlIGZyb20gJ2xvZGFzaC5kZWJvdW5jZSdcblxuZXhwb3J0IGNvbnN0IERlYm91bmNlUmVzaXplT2JzZXJ2ZXIgPSAoY2I6IFJlc2l6ZU9ic2VydmVyQ2FsbGJhY2ssIGRlbGF5ID0gMSkgPT4gXG5cdG5ldyBSZXNpemVPYnNlcnZlcihkZWJvdW5jZShjYiwgZGVsYXkpKVxuXG5leHBvcnQgdHlwZSBEZWJvdW5jZVJlc2l6ZU9ic2VydmVyID0gUmV0dXJuVHlwZTx0eXBlb2YgRGVib3VuY2VSZXNpemVPYnNlcnZlcj5cbiIsIi8qIGVzbGludC1kaXNhYmxlICovXG4vL0B0cy1ub2NoZWNrXG4vLyBHZXRzIGFsbCBub24tYnVpbHRpbiBwcm9wZXJ0aWVzIHVwIHRoZSBwcm90b3R5cGUgY2hhaW4uXG5jb25zdCBnZXRBbGxQcm9wZXJ0aWVzID0gb2JqZWN0ID0+IHtcblx0Y29uc3QgcHJvcGVydGllcyA9IG5ldyBTZXQoKVxuXG5cdGRvIHtcblx0XHRmb3IgKGNvbnN0IGtleSBvZiBSZWZsZWN0Lm93bktleXMob2JqZWN0KSkge1xuXHRcdFx0cHJvcGVydGllcy5hZGQoW29iamVjdCwga2V5XSlcblx0XHR9XG5cdH0gd2hpbGUgKChvYmplY3QgPSBSZWZsZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCkpICYmIG9iamVjdCAhPT0gT2JqZWN0LnByb3RvdHlwZSlcblxuXHRyZXR1cm4gcHJvcGVydGllc1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXV0b0JpbmQ8VD4oc2VsZjpULCB7IGluY2x1ZGUsIGV4Y2x1ZGUgfSA9IHt9KTpUIHtcblx0Y29uc3QgZmlsdGVyID0ga2V5ID0+IHtcblx0XHRjb25zdCBtYXRjaCA9IHBhdHRlcm4gPT4gdHlwZW9mIHBhdHRlcm4gPT09ICdzdHJpbmcnID8ga2V5ID09PSBwYXR0ZXJuIDogcGF0dGVybi50ZXN0KGtleSlcblxuXHRcdGlmIChpbmNsdWRlKSB7XG5cdFx0XHRyZXR1cm4gaW5jbHVkZS5zb21lKG1hdGNoKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHVuaWNvcm4vbm8tYXJyYXktY2FsbGJhY2stcmVmZXJlbmNlXG5cdFx0fVxuXG5cdFx0aWYgKGV4Y2x1ZGUpIHtcblx0XHRcdHJldHVybiAhZXhjbHVkZS5zb21lKG1hdGNoKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHVuaWNvcm4vbm8tYXJyYXktY2FsbGJhY2stcmVmZXJlbmNlXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWVcblx0fVxuXG5cdGZvciAoY29uc3QgW29iamVjdCwga2V5XSBvZiBnZXRBbGxQcm9wZXJ0aWVzKHNlbGYuY29uc3RydWN0b3IucHJvdG90eXBlKSkge1xuXHRcdGlmIChrZXkgPT09ICdjb25zdHJ1Y3RvcicgfHwgIWZpbHRlcihrZXkpKSB7XG5cdFx0XHRjb250aW51ZVxuXHRcdH1cblxuXHRcdGNvbnN0IGRlc2NyaXB0b3IgPSBSZWZsZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIGtleSlcblx0XHRpZiAoZGVzY3JpcHRvciAmJiB0eXBlb2YgZGVzY3JpcHRvci52YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0c2VsZltrZXldID0gc2VsZltrZXldLmJpbmQoc2VsZilcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gc2VsZlxufVxuIiwiXG5leHBvcnQgY29uc3QgYXBwbHlHTE92ZXJsb2FkcyA9IChnbDogV2ViR0wyUmVuZGVyaW5nQ29udGV4dCkgPT4ge1xuXHRjb25zdCBnbE92ZXJsb2FkcyA9IFtcblx0XHRbJ2NvbXByZXNzZWRUZXhJbWFnZTNEJywgMl0sXG5cdFx0Wydjb21wcmVzc2VkVGV4U3ViSW1hZ2UzRCcsIDJdLFxuXHRcdFsnZ2V0QWN0aXZlVW5pZm9ybUJsb2NrUGFyYW1ldGVyJywgMl0sXG5cdFx0WydnZXRBY3RpdmVVbmlmb3JtcycsIDJdLFxuXHRcdFsndGV4SW1hZ2UzRCcsIDRdLFxuXHRcdFsndGV4U3ViSW1hZ2UzRCcsIDNdLFxuXHRcdFsnYnVmZmVyRGF0YScsIDddLFxuXHRcdFsnYnVmZmVyU3ViRGF0YScsIDJdLFxuXHRcdFsnY29tcHJlc3NlZFRleEltYWdlMkQnLCAyXSxcblx0XHRbJ2NvbXByZXNzZWRUZXhTdWJJbWFnZTJEJywgMl0sXG5cdFx0WydyZWFkUGl4ZWxzJywgM10sXG5cdFx0Wyd0ZXhJbWFnZTJEJywgNl0sXG5cdFx0Wyd0ZXhTdWJJbWFnZTJEJywgNV0sXG5cdFx0WydnZXRCdWZmZXJQYXJhbWV0ZXInLCAyXSxcblx0XHRbJ2dldFByb2dyYW1QYXJhbWV0ZXInLCAyXSxcblx0XHRbJ2dldFNoYWRlclBhcmFtZXRlcicsIDJdLFxuXHRdXG5cdGdsT3ZlcmxvYWRzLmZvckVhY2goKFtrZXksIGNvdW50XSkgPT4ge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKylcblx0XHRcdGdsW2Ake2tleX1fXyR7aSArIDF9YF0gPSBnbFtrZXldXG5cdH0pXG59IiwiZXhwb3J0ICogZnJvbSAnLi9hdXRvQmluZCdcbmV4cG9ydCAqIGZyb20gJy4vY2xhc3NVdGlscydcbmV4cG9ydCAqIGZyb20gJy4vRGVib3VuY2VSZXNpemVPYnNlcnZlciciLCJleHBvcnQgYXN5bmMgZnVuY3Rpb24gaW5zdGFudGlhdGUobW9kdWxlLCBpbXBvcnRzID0ge30pIHtcbiAgY29uc3QgX19tb2R1bGUwID0gaW1wb3J0cy5nbDtcbiAgY29uc3QgX19tb2R1bGUxID0gaW1wb3J0cy5ob3N0O1xuICBjb25zdCBhZGFwdGVkSW1wb3J0cyA9IHtcbiAgICBlbnY6IE9iamVjdC5hc3NpZ24oT2JqZWN0LmNyZWF0ZShnbG9iYWxUaGlzKSwgaW1wb3J0cy5lbnYgfHwge30sIHtcbiAgICAgIHNlZWQoKSB7XG4gICAgICAgIC8vIH5saWIvYnVpbHRpbnMvc2VlZCgpID0+IGY2NFxuICAgICAgICByZXR1cm4gKCgpID0+IHtcbiAgICAgICAgICAvLyBAZXh0ZXJuYWwuanNcbiAgICAgICAgICByZXR1cm4gRGF0ZS5ub3coKSAqIE1hdGgucmFuZG9tKCk7XG4gICAgICAgIH0pKCk7XG4gICAgICB9LFxuICAgICAgYWJvcnQobWVzc2FnZSwgZmlsZU5hbWUsIGxpbmVOdW1iZXIsIGNvbHVtbk51bWJlcikge1xuICAgICAgICAvLyB+bGliL2J1aWx0aW5zL2Fib3J0KH5saWIvc3RyaW5nL1N0cmluZyB8IG51bGw/LCB+bGliL3N0cmluZy9TdHJpbmcgfCBudWxsPywgdTMyPywgdTMyPykgPT4gdm9pZFxuICAgICAgICBtZXNzYWdlID0gX19saWZ0U3RyaW5nKG1lc3NhZ2UgPj4+IDApO1xuICAgICAgICBmaWxlTmFtZSA9IF9fbGlmdFN0cmluZyhmaWxlTmFtZSA+Pj4gMCk7XG4gICAgICAgIGxpbmVOdW1iZXIgPSBsaW5lTnVtYmVyID4+PiAwO1xuICAgICAgICBjb2x1bW5OdW1iZXIgPSBjb2x1bW5OdW1iZXIgPj4+IDA7XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgLy8gQGV4dGVybmFsLmpzXG4gICAgICAgICAgdGhyb3cgRXJyb3IoYCR7bWVzc2FnZX0gaW4gJHtmaWxlTmFtZX06JHtsaW5lTnVtYmVyfToke2NvbHVtbk51bWJlcn1gKTtcbiAgICAgICAgfSkoKTtcbiAgICAgIH0sXG4gICAgfSksXG4gICAgZ2w6IE9iamVjdC5hc3NpZ24oT2JqZWN0LmNyZWF0ZShfX21vZHVsZTApLCB7XG4gICAgICBjbGVhcihtYXNrKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvY2xlYXIodTMyKSA9PiB2b2lkXG4gICAgICAgIG1hc2sgPSBtYXNrID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAuY2xlYXIobWFzayk7XG4gICAgICB9LFxuICAgICAgY3JlYXRlU2hhZGVyKHR5cGUpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9jcmVhdGVTaGFkZXIodTMyKSA9PiBleHRlcm5yZWZcbiAgICAgICAgdHlwZSA9IHR5cGUgPj4+IDA7XG4gICAgICAgIHJldHVybiBfX21vZHVsZTAuY3JlYXRlU2hhZGVyKHR5cGUpO1xuICAgICAgfSxcbiAgICAgIHNoYWRlclNvdXJjZShzaGFkZXIsIHNvdXJjZSkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL3NoYWRlclNvdXJjZShleHRlcm5yZWYsIH5saWIvc3RyaW5nL1N0cmluZykgPT4gdm9pZFxuICAgICAgICBzb3VyY2UgPSBfX2xpZnRTdHJpbmcoc291cmNlID4+PiAwKTtcbiAgICAgICAgX19tb2R1bGUwLnNoYWRlclNvdXJjZShzaGFkZXIsIHNvdXJjZSk7XG4gICAgICB9LFxuICAgICAgZ2V0U2hhZGVyUGFyYW1ldGVyX18xKHNoYWRlciwgcG5hbWUpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9nZXRTaGFkZXJQYXJhbWV0ZXJfXzEoZXh0ZXJucmVmLCB1MzIpID0+IGJvb2xcbiAgICAgICAgcG5hbWUgPSBwbmFtZSA+Pj4gMDtcbiAgICAgICAgcmV0dXJuIF9fbW9kdWxlMC5nZXRTaGFkZXJQYXJhbWV0ZXJfXzEoc2hhZGVyLCBwbmFtZSkgPyAxIDogMDtcbiAgICAgIH0sXG4gICAgICBnZXRTaGFkZXJJbmZvTG9nKHNoYWRlcikge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2dldFNoYWRlckluZm9Mb2coZXh0ZXJucmVmKSA9PiB+bGliL3N0cmluZy9TdHJpbmdcbiAgICAgICAgcmV0dXJuIF9fbG93ZXJTdHJpbmcoX19tb2R1bGUwLmdldFNoYWRlckluZm9Mb2coc2hhZGVyKSkgfHwgX19ub3RudWxsKCk7XG4gICAgICB9LFxuICAgICAgdHJhbnNmb3JtRmVlZGJhY2tWYXJ5aW5ncyhwcm9ncmFtLCB2YXJ5aW5ncywgYnVmZmVyTW9kZSkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL3RyYW5zZm9ybUZlZWRiYWNrVmFyeWluZ3MoZXh0ZXJucmVmLCB+bGliL2FycmF5L0FycmF5PH5saWIvc3RyaW5nL1N0cmluZz4sIHUzMikgPT4gdm9pZFxuICAgICAgICB2YXJ5aW5ncyA9IF9fbGlmdEFycmF5KHBvaW50ZXIgPT4gX19saWZ0U3RyaW5nKG5ldyBVaW50MzJBcnJheShtZW1vcnkuYnVmZmVyKVtwb2ludGVyID4+PiAyXSksIDIsIHZhcnlpbmdzID4+PiAwKTtcbiAgICAgICAgYnVmZmVyTW9kZSA9IGJ1ZmZlck1vZGUgPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC50cmFuc2Zvcm1GZWVkYmFja1ZhcnlpbmdzKHByb2dyYW0sIHZhcnlpbmdzLCBidWZmZXJNb2RlKTtcbiAgICAgIH0sXG4gICAgICBnZXRQcm9ncmFtUGFyYW1ldGVyX18xKHByb2dyYW0sIHBuYW1lKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvZ2V0UHJvZ3JhbVBhcmFtZXRlcl9fMShleHRlcm5yZWYsIHUzMikgPT4gYm9vbFxuICAgICAgICBwbmFtZSA9IHBuYW1lID4+PiAwO1xuICAgICAgICByZXR1cm4gX19tb2R1bGUwLmdldFByb2dyYW1QYXJhbWV0ZXJfXzEocHJvZ3JhbSwgcG5hbWUpID8gMSA6IDA7XG4gICAgICB9LFxuICAgICAgZ2V0UHJvZ3JhbUluZm9Mb2cocHJvZ3JhbSkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2dldFByb2dyYW1JbmZvTG9nKGV4dGVybnJlZikgPT4gfmxpYi9zdHJpbmcvU3RyaW5nXG4gICAgICAgIHJldHVybiBfX2xvd2VyU3RyaW5nKF9fbW9kdWxlMC5nZXRQcm9ncmFtSW5mb0xvZyhwcm9ncmFtKSkgfHwgX19ub3RudWxsKCk7XG4gICAgICB9LFxuICAgICAgYmluZEJ1ZmZlcih0YXJnZXQsIGJ1ZmZlcikge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2JpbmRCdWZmZXIodTMyLCBleHRlcm5yZWYpID0+IHZvaWRcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0ID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAuYmluZEJ1ZmZlcih0YXJnZXQsIGJ1ZmZlcik7XG4gICAgICB9LFxuICAgICAgYnVmZmVyRGF0YV9fMyh0YXJnZXQsIHNyY0RhdGEsIHVzYWdlKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvYnVmZmVyRGF0YV9fMyh1MzIsIH5saWIvdHlwZWRhcnJheS9GbG9hdDMyQXJyYXksIHUzMikgPT4gdm9pZFxuICAgICAgICB0YXJnZXQgPSB0YXJnZXQgPj4+IDA7XG4gICAgICAgIHNyY0RhdGEgPSBfX2xpZnRUeXBlZEFycmF5KEZsb2F0MzJBcnJheSwgc3JjRGF0YSA+Pj4gMCk7XG4gICAgICAgIHVzYWdlID0gdXNhZ2UgPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC5idWZmZXJEYXRhX18zKHRhcmdldCwgc3JjRGF0YSwgdXNhZ2UpO1xuICAgICAgfSxcbiAgICAgIGJ1ZmZlckRhdGFfXzQodGFyZ2V0LCBzcmNEYXRhLCB1c2FnZSkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2J1ZmZlckRhdGFfXzQodTMyLCB+bGliL3R5cGVkYXJyYXkvVWludDhBcnJheSwgdTMyKSA9PiB2b2lkXG4gICAgICAgIHRhcmdldCA9IHRhcmdldCA+Pj4gMDtcbiAgICAgICAgc3JjRGF0YSA9IF9fbGlmdFR5cGVkQXJyYXkoVWludDhBcnJheSwgc3JjRGF0YSA+Pj4gMCk7XG4gICAgICAgIHVzYWdlID0gdXNhZ2UgPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC5idWZmZXJEYXRhX180KHRhcmdldCwgc3JjRGF0YSwgdXNhZ2UpO1xuICAgICAgfSxcbiAgICAgIGdldEF0dHJpYkxvY2F0aW9uKHByb2dyYW0sIG5hbWUpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9nZXRBdHRyaWJMb2NhdGlvbihleHRlcm5yZWYsIH5saWIvc3RyaW5nL1N0cmluZykgPT4gaTMyXG4gICAgICAgIG5hbWUgPSBfX2xpZnRTdHJpbmcobmFtZSA+Pj4gMCk7XG4gICAgICAgIHJldHVybiBfX21vZHVsZTAuZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgbmFtZSk7XG4gICAgICB9LFxuICAgICAgZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoaW5kZXgpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh1MzIpID0+IHZvaWRcbiAgICAgICAgaW5kZXggPSBpbmRleCA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGluZGV4KTtcbiAgICAgIH0sXG4gICAgICB2ZXJ0ZXhBdHRyaWJQb2ludGVyKGluZGV4LCBzaXplLCB0eXBlLCBub3JtYWxpemVkLCBzdHJpZGUsIG9mZnNldCkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL3ZlcnRleEF0dHJpYlBvaW50ZXIodTMyLCBpMzIsIHUzMiwgYm9vbCwgaTMyLCBpMzIpID0+IHZvaWRcbiAgICAgICAgaW5kZXggPSBpbmRleCA+Pj4gMDtcbiAgICAgICAgdHlwZSA9IHR5cGUgPj4+IDA7XG4gICAgICAgIG5vcm1hbGl6ZWQgPSBub3JtYWxpemVkICE9IDA7XG4gICAgICAgIF9fbW9kdWxlMC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGluZGV4LCBzaXplLCB0eXBlLCBub3JtYWxpemVkLCBzdHJpZGUsIG9mZnNldCk7XG4gICAgICB9LFxuICAgICAgdmVydGV4QXR0cmliRGl2aXNvcihpbmRleCwgZGl2aXNvcikge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL3ZlcnRleEF0dHJpYkRpdmlzb3IodTMyLCB1MzIpID0+IHZvaWRcbiAgICAgICAgaW5kZXggPSBpbmRleCA+Pj4gMDtcbiAgICAgICAgZGl2aXNvciA9IGRpdmlzb3IgPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC52ZXJ0ZXhBdHRyaWJEaXZpc29yKGluZGV4LCBkaXZpc29yKTtcbiAgICAgIH0sXG4gICAgICBidWZmZXJEYXRhX181KHRhcmdldCwgc3JjRGF0YSwgdXNhZ2UpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9idWZmZXJEYXRhX181KHUzMiwgfmxpYi90eXBlZGFycmF5L1VpbnQxNkFycmF5LCB1MzIpID0+IHZvaWRcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0ID4+PiAwO1xuICAgICAgICBzcmNEYXRhID0gX19saWZ0VHlwZWRBcnJheShVaW50MTZBcnJheSwgc3JjRGF0YSA+Pj4gMCk7XG4gICAgICAgIHVzYWdlID0gdXNhZ2UgPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC5idWZmZXJEYXRhX181KHRhcmdldCwgc3JjRGF0YSwgdXNhZ2UpO1xuICAgICAgfSxcbiAgICAgIGJpbmRUcmFuc2Zvcm1GZWVkYmFjayh0YXJnZXQsIHRmKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvYmluZFRyYW5zZm9ybUZlZWRiYWNrKHUzMiwgZXh0ZXJucmVmKSA9PiB2b2lkXG4gICAgICAgIHRhcmdldCA9IHRhcmdldCA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLmJpbmRUcmFuc2Zvcm1GZWVkYmFjayh0YXJnZXQsIHRmKTtcbiAgICAgIH0sXG4gICAgICBiaW5kQnVmZmVyQmFzZSh0YXJnZXQsIGluZGV4LCBidWZmZXIpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9iaW5kQnVmZmVyQmFzZSh1MzIsIHUzMiwgZXh0ZXJucmVmKSA9PiB2b2lkXG4gICAgICAgIHRhcmdldCA9IHRhcmdldCA+Pj4gMDtcbiAgICAgICAgaW5kZXggPSBpbmRleCA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLmJpbmRCdWZmZXJCYXNlKHRhcmdldCwgaW5kZXgsIGJ1ZmZlcik7XG4gICAgICB9LFxuICAgICAgZ2V0VW5pZm9ybUJsb2NrSW5kZXgocHJvZ3JhbSwgdW5pZm9ybUJsb2NrTmFtZSkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2dldFVuaWZvcm1CbG9ja0luZGV4KGV4dGVybnJlZiwgfmxpYi9zdHJpbmcvU3RyaW5nKSA9PiB1MzJcbiAgICAgICAgdW5pZm9ybUJsb2NrTmFtZSA9IF9fbGlmdFN0cmluZyh1bmlmb3JtQmxvY2tOYW1lID4+PiAwKTtcbiAgICAgICAgcmV0dXJuIF9fbW9kdWxlMC5nZXRVbmlmb3JtQmxvY2tJbmRleChwcm9ncmFtLCB1bmlmb3JtQmxvY2tOYW1lKTtcbiAgICAgIH0sXG4gICAgICBnZXRBY3RpdmVVbmlmb3JtQmxvY2tQYXJhbWV0ZXJfXzEocHJvZ3JhbSwgdW5pZm9ybUJsb2NrSW5kZXgsIHBuYW1lKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvZ2V0QWN0aXZlVW5pZm9ybUJsb2NrUGFyYW1ldGVyX18xKGV4dGVybnJlZiwgdTMyLCB1MzIpID0+IHUzMlxuICAgICAgICB1bmlmb3JtQmxvY2tJbmRleCA9IHVuaWZvcm1CbG9ja0luZGV4ID4+PiAwO1xuICAgICAgICBwbmFtZSA9IHBuYW1lID4+PiAwO1xuICAgICAgICByZXR1cm4gX19tb2R1bGUwLmdldEFjdGl2ZVVuaWZvcm1CbG9ja1BhcmFtZXRlcl9fMShwcm9ncmFtLCB1bmlmb3JtQmxvY2tJbmRleCwgcG5hbWUpO1xuICAgICAgfSxcbiAgICAgIGJ1ZmZlckRhdGFfXzEodGFyZ2V0LCBzaXplLCB1c2FnZSkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2J1ZmZlckRhdGFfXzEodTMyLCB1MzIsIHUzMikgPT4gdm9pZFxuICAgICAgICB0YXJnZXQgPSB0YXJnZXQgPj4+IDA7XG4gICAgICAgIHNpemUgPSBzaXplID4+PiAwO1xuICAgICAgICB1c2FnZSA9IHVzYWdlID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAuYnVmZmVyRGF0YV9fMSh0YXJnZXQsIHNpemUsIHVzYWdlKTtcbiAgICAgIH0sXG4gICAgICBnZXRVbmlmb3JtSW5kaWNlcyhwcm9ncmFtLCB1bmlmb3JtTmFtZXMpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9nZXRVbmlmb3JtSW5kaWNlcyhleHRlcm5yZWYsIH5saWIvYXJyYXkvQXJyYXk8fmxpYi9zdHJpbmcvU3RyaW5nPikgPT4gfmxpYi9hcnJheS9BcnJheTx1MzI+XG4gICAgICAgIHVuaWZvcm1OYW1lcyA9IF9fbGlmdEFycmF5KHBvaW50ZXIgPT4gX19saWZ0U3RyaW5nKG5ldyBVaW50MzJBcnJheShtZW1vcnkuYnVmZmVyKVtwb2ludGVyID4+PiAyXSksIDIsIHVuaWZvcm1OYW1lcyA+Pj4gMCk7XG4gICAgICAgIHJldHVybiBfX2xvd2VyQXJyYXkoKHBvaW50ZXIsIHZhbHVlKSA9PiB7IG5ldyBVaW50MzJBcnJheShtZW1vcnkuYnVmZmVyKVtwb2ludGVyID4+PiAyXSA9IHZhbHVlOyB9LCA0MywgMiwgX19tb2R1bGUwLmdldFVuaWZvcm1JbmRpY2VzKHByb2dyYW0sIHVuaWZvcm1OYW1lcykpIHx8IF9fbm90bnVsbCgpO1xuICAgICAgfSxcbiAgICAgIGdldEFjdGl2ZVVuaWZvcm1zX18xKHByb2dyYW0sIHVuaWZvcm1JbmRpY2VzLCBwbmFtZSkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2dldEFjdGl2ZVVuaWZvcm1zX18xKGV4dGVybnJlZiwgfmxpYi9hcnJheS9BcnJheTx1MzI+LCB1MzIpID0+IH5saWIvYXJyYXkvQXJyYXk8dTMyPlxuICAgICAgICB1bmlmb3JtSW5kaWNlcyA9IF9fbGlmdEFycmF5KHBvaW50ZXIgPT4gbmV3IFVpbnQzMkFycmF5KG1lbW9yeS5idWZmZXIpW3BvaW50ZXIgPj4+IDJdLCAyLCB1bmlmb3JtSW5kaWNlcyA+Pj4gMCk7XG4gICAgICAgIHBuYW1lID0gcG5hbWUgPj4+IDA7XG4gICAgICAgIHJldHVybiBfX2xvd2VyQXJyYXkoKHBvaW50ZXIsIHZhbHVlKSA9PiB7IG5ldyBVaW50MzJBcnJheShtZW1vcnkuYnVmZmVyKVtwb2ludGVyID4+PiAyXSA9IHZhbHVlOyB9LCA0MywgMiwgX19tb2R1bGUwLmdldEFjdGl2ZVVuaWZvcm1zX18xKHByb2dyYW0sIHVuaWZvcm1JbmRpY2VzLCBwbmFtZSkpIHx8IF9fbm90bnVsbCgpO1xuICAgICAgfSxcbiAgICAgIHVuaWZvcm1CbG9ja0JpbmRpbmcocHJvZ3JhbSwgdW5pZm9ybUJsb2NrSW5kZXgsIHVuaWZvcm1CbG9ja0JpbmRpbmcpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy91bmlmb3JtQmxvY2tCaW5kaW5nKGV4dGVybnJlZiwgdTMyLCB1MzIpID0+IHZvaWRcbiAgICAgICAgdW5pZm9ybUJsb2NrSW5kZXggPSB1bmlmb3JtQmxvY2tJbmRleCA+Pj4gMDtcbiAgICAgICAgdW5pZm9ybUJsb2NrQmluZGluZyA9IHVuaWZvcm1CbG9ja0JpbmRpbmcgPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC51bmlmb3JtQmxvY2tCaW5kaW5nKHByb2dyYW0sIHVuaWZvcm1CbG9ja0luZGV4LCB1bmlmb3JtQmxvY2tCaW5kaW5nKTtcbiAgICAgIH0sXG4gICAgICBnZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgbmFtZSkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2dldFVuaWZvcm1Mb2NhdGlvbihleHRlcm5yZWYsIH5saWIvc3RyaW5nL1N0cmluZykgPT4gZXh0ZXJucmVmXG4gICAgICAgIG5hbWUgPSBfX2xpZnRTdHJpbmcobmFtZSA+Pj4gMCk7XG4gICAgICAgIHJldHVybiBfX21vZHVsZTAuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sIG5hbWUpO1xuICAgICAgfSxcbiAgICAgIGFjdGl2ZVRleHR1cmUodGV4dHVyZSkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2FjdGl2ZVRleHR1cmUodTMyKSA9PiB2b2lkXG4gICAgICAgIHRleHR1cmUgPSB0ZXh0dXJlID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAuYWN0aXZlVGV4dHVyZSh0ZXh0dXJlKTtcbiAgICAgIH0sXG4gICAgICBiaW5kVGV4dHVyZSh0YXJnZXQsIHRleHR1cmUpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9iaW5kVGV4dHVyZSh1MzIsIGV4dGVybnJlZikgPT4gdm9pZFxuICAgICAgICB0YXJnZXQgPSB0YXJnZXQgPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC5iaW5kVGV4dHVyZSh0YXJnZXQsIHRleHR1cmUpO1xuICAgICAgfSxcbiAgICAgIHRleEltYWdlMkRfXzYodGFyZ2V0LCBsZXZlbCwgaW50ZXJuYWxmb3JtYXQsIHdpZHRoLCBoZWlnaHQsIGJvcmRlciwgZm9ybWF0LCB0eXBlLCBwaXhlbHMpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy90ZXhJbWFnZTJEX182KHUzMiwgaTMyLCBpMzIsIGkzMiwgaTMyLCBpMzIsIHUzMiwgdTMyLCB+bGliL3R5cGVkYXJyYXkvVWludDhBcnJheSkgPT4gdm9pZFxuICAgICAgICB0YXJnZXQgPSB0YXJnZXQgPj4+IDA7XG4gICAgICAgIGZvcm1hdCA9IGZvcm1hdCA+Pj4gMDtcbiAgICAgICAgdHlwZSA9IHR5cGUgPj4+IDA7XG4gICAgICAgIHBpeGVscyA9IF9fbGlmdFR5cGVkQXJyYXkoVWludDhBcnJheSwgcGl4ZWxzID4+PiAwKTtcbiAgICAgICAgX19tb2R1bGUwLnRleEltYWdlMkRfXzYodGFyZ2V0LCBsZXZlbCwgaW50ZXJuYWxmb3JtYXQsIHdpZHRoLCBoZWlnaHQsIGJvcmRlciwgZm9ybWF0LCB0eXBlLCBwaXhlbHMpO1xuICAgICAgfSxcbiAgICAgIGdlbmVyYXRlTWlwbWFwKHRhcmdldCkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2dlbmVyYXRlTWlwbWFwKHUzMikgPT4gdm9pZFxuICAgICAgICB0YXJnZXQgPSB0YXJnZXQgPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC5nZW5lcmF0ZU1pcG1hcCh0YXJnZXQpO1xuICAgICAgfSxcbiAgICAgIHRleFBhcmFtZXRlcmkodGFyZ2V0LCBwbmFtZSwgcGFyYW0pIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy90ZXhQYXJhbWV0ZXJpKHUzMiwgdTMyLCBpMzIpID0+IHZvaWRcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0ID4+PiAwO1xuICAgICAgICBwbmFtZSA9IHBuYW1lID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAudGV4UGFyYW1ldGVyaSh0YXJnZXQsIHBuYW1lLCBwYXJhbSk7XG4gICAgICB9LFxuICAgICAgYnVmZmVyU3ViRGF0YV9fMih0YXJnZXQsIGRzdEJ5dGVPZmZzZXQsIHNyY0RhdGEsIHNyY09mZnNldCwgbGVuZ3RoKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvYnVmZmVyU3ViRGF0YV9fMih1MzIsIGkzMiwgfmxpYi90eXBlZGFycmF5L0Zsb2F0MzJBcnJheSwgdTMyLCB1MzI/KSA9PiB2b2lkXG4gICAgICAgIHRhcmdldCA9IHRhcmdldCA+Pj4gMDtcbiAgICAgICAgc3JjRGF0YSA9IF9fbGlmdFR5cGVkQXJyYXkoRmxvYXQzMkFycmF5LCBzcmNEYXRhID4+PiAwKTtcbiAgICAgICAgc3JjT2Zmc2V0ID0gc3JjT2Zmc2V0ID4+PiAwO1xuICAgICAgICBsZW5ndGggPSBsZW5ndGggPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC5idWZmZXJTdWJEYXRhX18yKHRhcmdldCwgZHN0Qnl0ZU9mZnNldCwgc3JjRGF0YSwgc3JjT2Zmc2V0LCBsZW5ndGgpO1xuICAgICAgfSxcbiAgICAgIGVuYWJsZShjYXApIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9lbmFibGUodTMyKSA9PiB2b2lkXG4gICAgICAgIGNhcCA9IGNhcCA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLmVuYWJsZShjYXApO1xuICAgICAgfSxcbiAgICAgIGRlcHRoRnVuYyhmdW5jKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvZGVwdGhGdW5jKHUzMikgPT4gdm9pZFxuICAgICAgICBmdW5jID0gZnVuYyA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLmRlcHRoRnVuYyhmdW5jKTtcbiAgICAgIH0sXG4gICAgICBkaXNhYmxlKGNhcCkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2Rpc2FibGUodTMyKSA9PiB2b2lkXG4gICAgICAgIGNhcCA9IGNhcCA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLmRpc2FibGUoY2FwKTtcbiAgICAgIH0sXG4gICAgICBjdWxsRmFjZShtb2RlKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvY3VsbEZhY2UodTMyKSA9PiB2b2lkXG4gICAgICAgIG1vZGUgPSBtb2RlID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAuY3VsbEZhY2UobW9kZSk7XG4gICAgICB9LFxuICAgICAgYmVnaW5UcmFuc2Zvcm1GZWVkYmFjayhwcmltaXRpdmVNb2RlKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvYmVnaW5UcmFuc2Zvcm1GZWVkYmFjayh1MzIpID0+IHZvaWRcbiAgICAgICAgcHJpbWl0aXZlTW9kZSA9IHByaW1pdGl2ZU1vZGUgPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC5iZWdpblRyYW5zZm9ybUZlZWRiYWNrKHByaW1pdGl2ZU1vZGUpO1xuICAgICAgfSxcbiAgICAgIGRyYXdBcnJheXMobW9kZSwgZmlyc3QsIGNvdW50KSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvZHJhd0FycmF5cyh1MzIsIGkzMiwgaTMyKSA9PiB2b2lkXG4gICAgICAgIG1vZGUgPSBtb2RlID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAuZHJhd0FycmF5cyhtb2RlLCBmaXJzdCwgY291bnQpO1xuICAgICAgfSxcbiAgICAgIGRyYXdFbGVtZW50c0luc3RhbmNlZChtb2RlLCBjb3VudCwgdHlwZSwgb2Zmc2V0LCBpbnN0YW5jZUNvdW50KSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvZHJhd0VsZW1lbnRzSW5zdGFuY2VkKHUzMiwgaTMyLCB1MzIsIGkzMiwgaTMyKSA9PiB2b2lkXG4gICAgICAgIG1vZGUgPSBtb2RlID4+PiAwO1xuICAgICAgICB0eXBlID0gdHlwZSA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLmRyYXdFbGVtZW50c0luc3RhbmNlZChtb2RlLCBjb3VudCwgdHlwZSwgb2Zmc2V0LCBpbnN0YW5jZUNvdW50KTtcbiAgICAgIH0sXG4gICAgICBkcmF3QXJyYXlzSW5zdGFuY2VkKG1vZGUsIGZpcnN0LCBjb3VudCwgaW5zdGFuY2VDb3VudCkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2RyYXdBcnJheXNJbnN0YW5jZWQodTMyLCBpMzIsIGkzMiwgaTMyKSA9PiB2b2lkXG4gICAgICAgIG1vZGUgPSBtb2RlID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAuZHJhd0FycmF5c0luc3RhbmNlZChtb2RlLCBmaXJzdCwgY291bnQsIGluc3RhbmNlQ291bnQpO1xuICAgICAgfSxcbiAgICAgIGRyYXdFbGVtZW50cyhtb2RlLCBjb3VudCwgdHlwZSwgb2Zmc2V0KSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvZHJhd0VsZW1lbnRzKHUzMiwgaTMyLCB1MzIsIGkzMikgPT4gdm9pZFxuICAgICAgICBtb2RlID0gbW9kZSA+Pj4gMDtcbiAgICAgICAgdHlwZSA9IHR5cGUgPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC5kcmF3RWxlbWVudHMobW9kZSwgY291bnQsIHR5cGUsIG9mZnNldCk7XG4gICAgICB9LFxuICAgICAgYmxlbmRGdW5jKHNmYWN0b3IsIGRmYWN0b3IpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9ibGVuZEZ1bmModTMyLCB1MzIpID0+IHZvaWRcbiAgICAgICAgc2ZhY3RvciA9IHNmYWN0b3IgPj4+IDA7XG4gICAgICAgIGRmYWN0b3IgPSBkZmFjdG9yID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAuYmxlbmRGdW5jKHNmYWN0b3IsIGRmYWN0b3IpO1xuICAgICAgfSxcbiAgICAgIHVuaWZvcm0xZnYobG9jYXRpb24sIGRhdGEsIHNyY09mZnNldCwgc3JjTGVuZ3RoKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvdW5pZm9ybTFmdihleHRlcm5yZWYsIH5saWIvdHlwZWRhcnJheS9GbG9hdDMyQXJyYXksIHUzMj8sIHUzMj8pID0+IHZvaWRcbiAgICAgICAgZGF0YSA9IF9fbGlmdFR5cGVkQXJyYXkoRmxvYXQzMkFycmF5LCBkYXRhID4+PiAwKTtcbiAgICAgICAgc3JjT2Zmc2V0ID0gc3JjT2Zmc2V0ID4+PiAwO1xuICAgICAgICBzcmNMZW5ndGggPSBzcmNMZW5ndGggPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC51bmlmb3JtMWZ2KGxvY2F0aW9uLCBkYXRhLCBzcmNPZmZzZXQsIHNyY0xlbmd0aCk7XG4gICAgICB9LFxuICAgICAgdW5pZm9ybTJmdihsb2NhdGlvbiwgZGF0YSwgc3JjT2Zmc2V0LCBzcmNMZW5ndGgpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy91bmlmb3JtMmZ2KGV4dGVybnJlZiwgfmxpYi90eXBlZGFycmF5L0Zsb2F0MzJBcnJheSwgdTMyPywgdTMyPykgPT4gdm9pZFxuICAgICAgICBkYXRhID0gX19saWZ0VHlwZWRBcnJheShGbG9hdDMyQXJyYXksIGRhdGEgPj4+IDApO1xuICAgICAgICBzcmNPZmZzZXQgPSBzcmNPZmZzZXQgPj4+IDA7XG4gICAgICAgIHNyY0xlbmd0aCA9IHNyY0xlbmd0aCA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLnVuaWZvcm0yZnYobG9jYXRpb24sIGRhdGEsIHNyY09mZnNldCwgc3JjTGVuZ3RoKTtcbiAgICAgIH0sXG4gICAgICB1bmlmb3JtM2Z2KGxvY2F0aW9uLCBkYXRhLCBzcmNPZmZzZXQsIHNyY0xlbmd0aCkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL3VuaWZvcm0zZnYoZXh0ZXJucmVmLCB+bGliL3R5cGVkYXJyYXkvRmxvYXQzMkFycmF5LCB1MzI/LCB1MzI/KSA9PiB2b2lkXG4gICAgICAgIGRhdGEgPSBfX2xpZnRUeXBlZEFycmF5KEZsb2F0MzJBcnJheSwgZGF0YSA+Pj4gMCk7XG4gICAgICAgIHNyY09mZnNldCA9IHNyY09mZnNldCA+Pj4gMDtcbiAgICAgICAgc3JjTGVuZ3RoID0gc3JjTGVuZ3RoID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAudW5pZm9ybTNmdihsb2NhdGlvbiwgZGF0YSwgc3JjT2Zmc2V0LCBzcmNMZW5ndGgpO1xuICAgICAgfSxcbiAgICAgIHVuaWZvcm00ZnYobG9jYXRpb24sIGRhdGEsIHNyY09mZnNldCwgc3JjTGVuZ3RoKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvdW5pZm9ybTRmdihleHRlcm5yZWYsIH5saWIvdHlwZWRhcnJheS9GbG9hdDMyQXJyYXksIHUzMj8sIHUzMj8pID0+IHZvaWRcbiAgICAgICAgZGF0YSA9IF9fbGlmdFR5cGVkQXJyYXkoRmxvYXQzMkFycmF5LCBkYXRhID4+PiAwKTtcbiAgICAgICAgc3JjT2Zmc2V0ID0gc3JjT2Zmc2V0ID4+PiAwO1xuICAgICAgICBzcmNMZW5ndGggPSBzcmNMZW5ndGggPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC51bmlmb3JtNGZ2KGxvY2F0aW9uLCBkYXRhLCBzcmNPZmZzZXQsIHNyY0xlbmd0aCk7XG4gICAgICB9LFxuICAgICAgdW5pZm9ybU1hdHJpeDRmdihsb2NhdGlvbiwgdHJhbnNwb3NlLCBkYXRhLCBzcmNPZmZzZXQsIHNyY0xlbmd0aCkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL3VuaWZvcm1NYXRyaXg0ZnYoZXh0ZXJucmVmLCBib29sLCB+bGliL3R5cGVkYXJyYXkvRmxvYXQzMkFycmF5LCB1MzI/LCB1MzI/KSA9PiB2b2lkXG4gICAgICAgIHRyYW5zcG9zZSA9IHRyYW5zcG9zZSAhPSAwO1xuICAgICAgICBkYXRhID0gX19saWZ0VHlwZWRBcnJheShGbG9hdDMyQXJyYXksIGRhdGEgPj4+IDApO1xuICAgICAgICBzcmNPZmZzZXQgPSBzcmNPZmZzZXQgPj4+IDA7XG4gICAgICAgIHNyY0xlbmd0aCA9IHNyY0xlbmd0aCA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLnVuaWZvcm1NYXRyaXg0ZnYobG9jYXRpb24sIHRyYW5zcG9zZSwgZGF0YSwgc3JjT2Zmc2V0LCBzcmNMZW5ndGgpO1xuICAgICAgfSxcbiAgICB9KSxcbiAgICBob3N0OiBPYmplY3QuYXNzaWduKE9iamVjdC5jcmVhdGUoX19tb2R1bGUxKSwge1xuICAgICAgZ2V0KGlkKSB7XG4gICAgICAgIC8vIHNyYy1hcy9pbXBvcnRzL19ob3N0L2dldCh1MzIpID0+IGV4dGVybnJlZlxuICAgICAgICBpZCA9IGlkID4+PiAwO1xuICAgICAgICByZXR1cm4gX19tb2R1bGUxLmdldChpZCk7XG4gICAgICB9LFxuICAgIH0pLFxuICB9O1xuICBjb25zdCB7IGV4cG9ydHMgfSA9IGF3YWl0IFdlYkFzc2VtYmx5Lmluc3RhbnRpYXRlKG1vZHVsZSwgYWRhcHRlZEltcG9ydHMpO1xuICBjb25zdCBtZW1vcnkgPSBleHBvcnRzLm1lbW9yeSB8fCBpbXBvcnRzLmVudi5tZW1vcnk7XG4gIGNvbnN0IGFkYXB0ZWRFeHBvcnRzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mKHtcbiAgICBjcmVhdGVEZWZhdWx0Q2FtZXJhKGtleWJvYXJkQ29udHJvbHMsIG1vdXNlQ29udHJvbHMpIHtcbiAgICAgIC8vIHNyYy1hcy9leHBvcnRzL2NhbWVyYS9jcmVhdGVEZWZhdWx0Q2FtZXJhKGJvb2w/LCBib29sPykgPT4gc3JjLWFzL2Jhc2UvRW50aXR5L0VudGl0eVxuICAgICAga2V5Ym9hcmRDb250cm9scyA9IGtleWJvYXJkQ29udHJvbHMgPyAxIDogMDtcbiAgICAgIG1vdXNlQ29udHJvbHMgPSBtb3VzZUNvbnRyb2xzID8gMSA6IDA7XG4gICAgICBleHBvcnRzLl9fc2V0QXJndW1lbnRzTGVuZ3RoKGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgICAgcmV0dXJuIF9fbGlmdEludGVybnJlZihleHBvcnRzLmNyZWF0ZURlZmF1bHRDYW1lcmEoa2V5Ym9hcmRDb250cm9scywgbW91c2VDb250cm9scykgPj4+IDApO1xuICAgIH0sXG4gICAgdW5saXRWZXJ0ZXhDb2xvclNoYWRlcjoge1xuICAgICAgLy8gc3JjLWFzL3JlbmRlcmluZy9zaGFkZXIvdW5saXQvdW5saXRWZXJ0ZXhDb2xvcnMvdW5saXRWZXJ0ZXhDb2xvclNoYWRlcjogc3JjLWFzL3JlbmRlcmluZy9zaGFkZXIvU2hhZGVyL1NoYWRlclxuICAgICAgdmFsdWVPZigpIHsgcmV0dXJuIHRoaXMudmFsdWU7IH0sXG4gICAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiBfX2xpZnRJbnRlcm5yZWYoZXhwb3J0cy51bmxpdFZlcnRleENvbG9yU2hhZGVyLnZhbHVlID4+PiAwKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGxpdFNoYWRlcjoge1xuICAgICAgLy8gc3JjLWFzL3JlbmRlcmluZy9zaGFkZXIvbGl0L2xpdFNoYWRlci9saXRTaGFkZXI6IHNyYy1hcy9yZW5kZXJpbmcvc2hhZGVyL1NoYWRlci9TaGFkZXJcbiAgICAgIHZhbHVlT2YoKSB7IHJldHVybiB0aGlzLnZhbHVlOyB9LFxuICAgICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gX19saWZ0SW50ZXJucmVmKGV4cG9ydHMubGl0U2hhZGVyLnZhbHVlID4+PiAwKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGRlZmF1bHRXb3JsZChvcHRpb25zKSB7XG4gICAgICAvLyBzcmMtYXMvZXhwb3J0cy9kZWZhdWx0V29ybGQvZGVmYXVsdFdvcmxkKHNyYy1hcy9leHBvcnRzL2RlZmF1bHRXb3JsZC9EZWZhdWx0V29ybGRPcHRpb25zKSA9PiBzcmMtYXMvYmFzZS9Xb3JsZC9Xb3JsZFxuICAgICAgb3B0aW9ucyA9IF9fbG93ZXJSZWNvcmQxMTkob3B0aW9ucykgfHwgX19ub3RudWxsKCk7XG4gICAgICByZXR1cm4gX19saWZ0SW50ZXJucmVmKGV4cG9ydHMuZGVmYXVsdFdvcmxkKG9wdGlvbnMpID4+PiAwKTtcbiAgICB9LFxuICAgIHJvdGF0aW5nQ3ViZShfc2hhZGVyKSB7XG4gICAgICAvLyBzcmMtYXMvZXhwb3J0cy9kZW1vcy9yb3RhdGluZ0N1YmUoc3JjLWFzL3JlbmRlcmluZy9zaGFkZXIvU2hhZGVyL1NoYWRlciB8IG51bGwpID0+IHNyYy1hcy9iYXNlL0VudGl0eS9FbnRpdHlcbiAgICAgIF9zaGFkZXIgPSBfX2xvd2VySW50ZXJucmVmKF9zaGFkZXIpO1xuICAgICAgcmV0dXJuIF9fbGlmdEludGVybnJlZihleHBvcnRzLnJvdGF0aW5nQ3ViZShfc2hhZGVyKSA+Pj4gMCk7XG4gICAgfSxcbiAgfSwgZXhwb3J0cyk7XG4gIGZ1bmN0aW9uIF9fbG93ZXJSZWNvcmQxMTkodmFsdWUpIHtcbiAgICAvLyBzcmMtYXMvZXhwb3J0cy9kZWZhdWx0V29ybGQvRGVmYXVsdFdvcmxkT3B0aW9uc1xuICAgIC8vIEhpbnQ6IE9wdC1vdXQgZnJvbSBsb3dlcmluZyBhcyBhIHJlY29yZCBieSBwcm92aWRpbmcgYW4gZW1wdHkgY29uc3RydWN0b3JcbiAgICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuIDA7XG4gICAgY29uc3QgcG9pbnRlciA9IGV4cG9ydHMuX19waW4oZXhwb3J0cy5fX25ldyg2LCAxMTkpKTtcbiAgICBuZXcgVWludDhBcnJheShtZW1vcnkuYnVmZmVyKVtwb2ludGVyICsgMCA+Pj4gMF0gPSB2YWx1ZS5jYW1lcmEgPyAxIDogMDtcbiAgICBuZXcgVWludDhBcnJheShtZW1vcnkuYnVmZmVyKVtwb2ludGVyICsgMSA+Pj4gMF0gPSB2YWx1ZS5jYW1lcmFLZXlib2FyZENvbnRyb2xsZXIgPyAxIDogMDtcbiAgICBuZXcgVWludDhBcnJheShtZW1vcnkuYnVmZmVyKVtwb2ludGVyICsgMiA+Pj4gMF0gPSB2YWx1ZS5jYW1lcmFNb3VzZUNvbnRyb2xsZXIgPyAxIDogMDtcbiAgICBuZXcgVWludDhBcnJheShtZW1vcnkuYnVmZmVyKVtwb2ludGVyICsgMyA+Pj4gMF0gPSB2YWx1ZS5saWdodHMgPyAxIDogMDtcbiAgICBuZXcgVWludDhBcnJheShtZW1vcnkuYnVmZmVyKVtwb2ludGVyICsgNCA+Pj4gMF0gPSB2YWx1ZS5naXptb3MgPyAxIDogMDtcbiAgICBuZXcgVWludDhBcnJheShtZW1vcnkuYnVmZmVyKVtwb2ludGVyICsgNSA+Pj4gMF0gPSB2YWx1ZS5oZWxsb0N1YmUgPyAxIDogMDtcbiAgICBleHBvcnRzLl9fdW5waW4ocG9pbnRlcik7XG4gICAgcmV0dXJuIHBvaW50ZXI7XG4gIH1cbiAgZnVuY3Rpb24gX19saWZ0U3RyaW5nKHBvaW50ZXIpIHtcbiAgICBpZiAoIXBvaW50ZXIpIHJldHVybiBudWxsO1xuICAgIGNvbnN0XG4gICAgICBlbmQgPSBwb2ludGVyICsgbmV3IFVpbnQzMkFycmF5KG1lbW9yeS5idWZmZXIpW3BvaW50ZXIgLSA0ID4+PiAyXSA+Pj4gMSxcbiAgICAgIG1lbW9yeVUxNiA9IG5ldyBVaW50MTZBcnJheShtZW1vcnkuYnVmZmVyKTtcbiAgICBsZXRcbiAgICAgIHN0YXJ0ID0gcG9pbnRlciA+Pj4gMSxcbiAgICAgIHN0cmluZyA9IFwiXCI7XG4gICAgd2hpbGUgKGVuZCAtIHN0YXJ0ID4gMTAyNCkgc3RyaW5nICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoLi4ubWVtb3J5VTE2LnN1YmFycmF5KHN0YXJ0LCBzdGFydCArPSAxMDI0KSk7XG4gICAgcmV0dXJuIHN0cmluZyArIFN0cmluZy5mcm9tQ2hhckNvZGUoLi4ubWVtb3J5VTE2LnN1YmFycmF5KHN0YXJ0LCBlbmQpKTtcbiAgfVxuICBmdW5jdGlvbiBfX2xvd2VyU3RyaW5nKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybiAwO1xuICAgIGNvbnN0XG4gICAgICBsZW5ndGggPSB2YWx1ZS5sZW5ndGgsXG4gICAgICBwb2ludGVyID0gZXhwb3J0cy5fX25ldyhsZW5ndGggPDwgMSwgMSkgPj4+IDAsXG4gICAgICBtZW1vcnlVMTYgPSBuZXcgVWludDE2QXJyYXkobWVtb3J5LmJ1ZmZlcik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkgbWVtb3J5VTE2Wyhwb2ludGVyID4+PiAxKSArIGldID0gdmFsdWUuY2hhckNvZGVBdChpKTtcbiAgICByZXR1cm4gcG9pbnRlcjtcbiAgfVxuICBmdW5jdGlvbiBfX2xpZnRBcnJheShsaWZ0RWxlbWVudCwgYWxpZ24sIHBvaW50ZXIpIHtcbiAgICBpZiAoIXBvaW50ZXIpIHJldHVybiBudWxsO1xuICAgIGNvbnN0XG4gICAgICBtZW1vcnlVMzIgPSBuZXcgVWludDMyQXJyYXkobWVtb3J5LmJ1ZmZlciksXG4gICAgICBkYXRhU3RhcnQgPSBtZW1vcnlVMzJbcG9pbnRlciArIDQgPj4+IDJdLFxuICAgICAgbGVuZ3RoID0gbWVtb3J5VTMyW3BvaW50ZXIgKyAxMiA+Pj4gMl0sXG4gICAgICB2YWx1ZXMgPSBuZXcgQXJyYXkobGVuZ3RoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB2YWx1ZXNbaV0gPSBsaWZ0RWxlbWVudChkYXRhU3RhcnQgKyAoaSA8PCBhbGlnbiA+Pj4gMCkpO1xuICAgIHJldHVybiB2YWx1ZXM7XG4gIH1cbiAgZnVuY3Rpb24gX19sb3dlckFycmF5KGxvd2VyRWxlbWVudCwgaWQsIGFsaWduLCB2YWx1ZXMpIHtcbiAgICBpZiAodmFsdWVzID09IG51bGwpIHJldHVybiAwO1xuICAgIGNvbnN0XG4gICAgICBsZW5ndGggPSB2YWx1ZXMubGVuZ3RoLFxuICAgICAgYnVmZmVyID0gZXhwb3J0cy5fX3BpbihleHBvcnRzLl9fbmV3KGxlbmd0aCA8PCBhbGlnbiwgMCkpID4+PiAwLFxuICAgICAgaGVhZGVyID0gZXhwb3J0cy5fX3BpbihleHBvcnRzLl9fbmV3KDE2LCBpZCkpID4+PiAwLFxuICAgICAgbWVtb3J5VTMyID0gbmV3IFVpbnQzMkFycmF5KG1lbW9yeS5idWZmZXIpO1xuICAgIG1lbW9yeVUzMltoZWFkZXIgKyAwID4+PiAyXSA9IGJ1ZmZlcjtcbiAgICBtZW1vcnlVMzJbaGVhZGVyICsgNCA+Pj4gMl0gPSBidWZmZXI7XG4gICAgbWVtb3J5VTMyW2hlYWRlciArIDggPj4+IDJdID0gbGVuZ3RoIDw8IGFsaWduO1xuICAgIG1lbW9yeVUzMltoZWFkZXIgKyAxMiA+Pj4gMl0gPSBsZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkgbG93ZXJFbGVtZW50KGJ1ZmZlciArIChpIDw8IGFsaWduID4+PiAwKSwgdmFsdWVzW2ldKTtcbiAgICBleHBvcnRzLl9fdW5waW4oYnVmZmVyKTtcbiAgICBleHBvcnRzLl9fdW5waW4oaGVhZGVyKTtcbiAgICByZXR1cm4gaGVhZGVyO1xuICB9XG4gIGZ1bmN0aW9uIF9fbGlmdFR5cGVkQXJyYXkoY29uc3RydWN0b3IsIHBvaW50ZXIpIHtcbiAgICBpZiAoIXBvaW50ZXIpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IG1lbW9yeVUzMiA9IG5ldyBVaW50MzJBcnJheShtZW1vcnkuYnVmZmVyKTtcbiAgICByZXR1cm4gbmV3IGNvbnN0cnVjdG9yKFxuICAgICAgbWVtb3J5LmJ1ZmZlcixcbiAgICAgIG1lbW9yeVUzMltwb2ludGVyICsgNCA+Pj4gMl0sXG4gICAgICBtZW1vcnlVMzJbcG9pbnRlciArIDggPj4+IDJdIC8gY29uc3RydWN0b3IuQllURVNfUEVSX0VMRU1FTlRcbiAgICApLnNsaWNlKCk7XG4gIH1cbiAgY29uc3QgcmVnaXN0cnkgPSBuZXcgRmluYWxpemF0aW9uUmVnaXN0cnkoX19yZWxlYXNlKTtcbiAgY2xhc3MgSW50ZXJucmVmIGV4dGVuZHMgTnVtYmVyIHt9XG4gIGZ1bmN0aW9uIF9fbGlmdEludGVybnJlZihwb2ludGVyKSB7XG4gICAgaWYgKCFwb2ludGVyKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBzZW50aW5lbCA9IG5ldyBJbnRlcm5yZWYoX19yZXRhaW4ocG9pbnRlcikpO1xuICAgIHJlZ2lzdHJ5LnJlZ2lzdGVyKHNlbnRpbmVsLCBwb2ludGVyKTtcbiAgICByZXR1cm4gc2VudGluZWw7XG4gIH1cbiAgZnVuY3Rpb24gX19sb3dlckludGVybnJlZih2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKSByZXR1cm4gMDtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBJbnRlcm5yZWYpIHJldHVybiB2YWx1ZS52YWx1ZU9mKCk7XG4gICAgdGhyb3cgVHlwZUVycm9yKFwiaW50ZXJucmVmIGV4cGVjdGVkXCIpO1xuICB9XG4gIGNvbnN0IHJlZmNvdW50cyA9IG5ldyBNYXAoKTtcbiAgZnVuY3Rpb24gX19yZXRhaW4ocG9pbnRlcikge1xuICAgIGlmIChwb2ludGVyKSB7XG4gICAgICBjb25zdCByZWZjb3VudCA9IHJlZmNvdW50cy5nZXQocG9pbnRlcik7XG4gICAgICBpZiAocmVmY291bnQpIHJlZmNvdW50cy5zZXQocG9pbnRlciwgcmVmY291bnQgKyAxKTtcbiAgICAgIGVsc2UgcmVmY291bnRzLnNldChleHBvcnRzLl9fcGluKHBvaW50ZXIpLCAxKTtcbiAgICB9XG4gICAgcmV0dXJuIHBvaW50ZXI7XG4gIH1cbiAgZnVuY3Rpb24gX19yZWxlYXNlKHBvaW50ZXIpIHtcbiAgICBpZiAocG9pbnRlcikge1xuICAgICAgY29uc3QgcmVmY291bnQgPSByZWZjb3VudHMuZ2V0KHBvaW50ZXIpO1xuICAgICAgaWYgKHJlZmNvdW50ID09PSAxKSBleHBvcnRzLl9fdW5waW4ocG9pbnRlciksIHJlZmNvdW50cy5kZWxldGUocG9pbnRlcik7XG4gICAgICBlbHNlIGlmIChyZWZjb3VudCkgcmVmY291bnRzLnNldChwb2ludGVyLCByZWZjb3VudCAtIDEpO1xuICAgICAgZWxzZSB0aHJvdyBFcnJvcihgaW52YWxpZCByZWZjb3VudCAnJHtyZWZjb3VudH0nIGZvciByZWZlcmVuY2UgJyR7cG9pbnRlcn0nYCk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIF9fbm90bnVsbCgpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoXCJ2YWx1ZSBtdXN0IG5vdCBiZSBudWxsXCIpO1xuICB9XG4gIHJldHVybiBhZGFwdGVkRXhwb3J0cztcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmYgPSB7fTtcbi8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbi8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5lID0gKGNodW5rSWQpID0+IHtcblx0cmV0dXJuIFByb21pc2UuYWxsKE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uZikucmVkdWNlKChwcm9taXNlcywga2V5KSA9PiB7XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5mW2tleV0oY2h1bmtJZCwgcHJvbWlzZXMpO1xuXHRcdHJldHVybiBwcm9taXNlcztcblx0fSwgW10pKTtcbn07IiwiLy8gVGhpcyBmdW5jdGlvbiBhbGxvdyB0byByZWZlcmVuY2UgYXN5bmMgY2h1bmtzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnUgPSAoY2h1bmtJZCkgPT4ge1xuXHQvLyByZXR1cm4gdXJsIGZvciBmaWxlbmFtZXMgYmFzZWQgb24gdGVtcGxhdGVcblx0cmV0dXJuIFwiXCIgKyBjaHVua0lkICsgXCIuYnVuZGxlLmpzXCI7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsInZhciBpblByb2dyZXNzID0ge307XG52YXIgZGF0YVdlYnBhY2tQcmVmaXggPSBcImtvb3JhOlwiO1xuLy8gbG9hZFNjcmlwdCBmdW5jdGlvbiB0byBsb2FkIGEgc2NyaXB0IHZpYSBzY3JpcHQgdGFnXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmwgPSAodXJsLCBkb25lLCBrZXksIGNodW5rSWQpID0+IHtcblx0aWYoaW5Qcm9ncmVzc1t1cmxdKSB7IGluUHJvZ3Jlc3NbdXJsXS5wdXNoKGRvbmUpOyByZXR1cm47IH1cblx0dmFyIHNjcmlwdCwgbmVlZEF0dGFjaDtcblx0aWYoa2V5ICE9PSB1bmRlZmluZWQpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzY3JpcHRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgcyA9IHNjcmlwdHNbaV07XG5cdFx0XHRpZihzLmdldEF0dHJpYnV0ZShcInNyY1wiKSA9PSB1cmwgfHwgcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXdlYnBhY2tcIikgPT0gZGF0YVdlYnBhY2tQcmVmaXggKyBrZXkpIHsgc2NyaXB0ID0gczsgYnJlYWs7IH1cblx0XHR9XG5cdH1cblx0aWYoIXNjcmlwdCkge1xuXHRcdG5lZWRBdHRhY2ggPSB0cnVlO1xuXHRcdHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXG5cdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuXHRcdHNjcmlwdC50aW1lb3V0ID0gMTIwO1xuXHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKSB7XG5cdFx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgX193ZWJwYWNrX3JlcXVpcmVfXy5uYyk7XG5cdFx0fVxuXHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXdlYnBhY2tcIiwgZGF0YVdlYnBhY2tQcmVmaXggKyBrZXkpO1xuXHRcdHNjcmlwdC5zcmMgPSB1cmw7XG5cdH1cblx0aW5Qcm9ncmVzc1t1cmxdID0gW2RvbmVdO1xuXHR2YXIgb25TY3JpcHRDb21wbGV0ZSA9IChwcmV2LCBldmVudCkgPT4ge1xuXHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cblx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuXHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHR2YXIgZG9uZUZucyA9IGluUHJvZ3Jlc3NbdXJsXTtcblx0XHRkZWxldGUgaW5Qcm9ncmVzc1t1cmxdO1xuXHRcdHNjcmlwdC5wYXJlbnROb2RlICYmIHNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG5cdFx0ZG9uZUZucyAmJiBkb25lRm5zLmZvckVhY2goKGZuKSA9PiAoZm4oZXZlbnQpKSk7XG5cdFx0aWYocHJldikgcmV0dXJuIHByZXYoZXZlbnQpO1xuXHR9XG5cdDtcblx0dmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCB1bmRlZmluZWQsIHsgdHlwZTogJ3RpbWVvdXQnLCB0YXJnZXQ6IHNjcmlwdCB9KSwgMTIwMDAwKTtcblx0c2NyaXB0Lm9uZXJyb3IgPSBvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgc2NyaXB0Lm9uZXJyb3IpO1xuXHRzY3JpcHQub25sb2FkID0gb25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHNjcmlwdC5vbmxvYWQpO1xuXHRuZWVkQXR0YWNoICYmIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbn07IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbl9fd2VicGFja19yZXF1aXJlX18uZi5qID0gKGNodW5rSWQsIHByb21pc2VzKSA9PiB7XG5cdFx0Ly8gSlNPTlAgY2h1bmsgbG9hZGluZyBmb3IgamF2YXNjcmlwdFxuXHRcdHZhciBpbnN0YWxsZWRDaHVua0RhdGEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSA/IGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA6IHVuZGVmaW5lZDtcblx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIHsgLy8gMCBtZWFucyBcImFscmVhZHkgaW5zdGFsbGVkXCIuXG5cblx0XHRcdC8vIGEgUHJvbWlzZSBtZWFucyBcImN1cnJlbnRseSBsb2FkaW5nXCIuXG5cdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEpIHtcblx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYodHJ1ZSkgeyAvLyBhbGwgY2h1bmtzIGhhdmUgSlNcblx0XHRcdFx0XHQvLyBzZXR1cCBQcm9taXNlIGluIGNodW5rIGNhY2hlXG5cdFx0XHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiAoaW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gW3Jlc29sdmUsIHJlamVjdF0pKTtcblx0XHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSA9IHByb21pc2UpO1xuXG5cdFx0XHRcdFx0Ly8gc3RhcnQgY2h1bmsgbG9hZGluZ1xuXHRcdFx0XHRcdHZhciB1cmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBfX3dlYnBhY2tfcmVxdWlyZV9fLnUoY2h1bmtJZCk7XG5cdFx0XHRcdFx0Ly8gY3JlYXRlIGVycm9yIGJlZm9yZSBzdGFjayB1bndvdW5kIHRvIGdldCB1c2VmdWwgc3RhY2t0cmFjZSBsYXRlclxuXHRcdFx0XHRcdHZhciBlcnJvciA9IG5ldyBFcnJvcigpO1xuXHRcdFx0XHRcdHZhciBsb2FkaW5nRW5kZWQgPSAoZXZlbnQpID0+IHtcblx0XHRcdFx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpKSB7XG5cdFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcblx0XHRcdFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhICE9PSAwKSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuXHRcdFx0XHRcdFx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnID8gJ21pc3NpbmcnIDogZXZlbnQudHlwZSk7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIHJlYWxTcmMgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnNyYztcblx0XHRcdFx0XHRcdFx0XHRlcnJvci5tZXNzYWdlID0gJ0xvYWRpbmcgY2h1bmsgJyArIGNodW5rSWQgKyAnIGZhaWxlZC5cXG4oJyArIGVycm9yVHlwZSArICc6ICcgKyByZWFsU3JjICsgJyknO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9yLm5hbWUgPSAnQ2h1bmtMb2FkRXJyb3InO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9yLnR5cGUgPSBlcnJvclR5cGU7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IucmVxdWVzdCA9IHJlYWxTcmM7XG5cdFx0XHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhWzFdKGVycm9yKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5sKHVybCwgbG9hZGluZ0VuZGVkLCBcImNodW5rLVwiICsgY2h1bmtJZCwgY2h1bmtJZCk7XG5cdFx0XHRcdH0gZWxzZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHRcdFx0fVxuXHRcdH1cbn07XG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtrb29yYVwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtrb29yYVwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiZXhwb3J0ICogZnJvbSAnLi9sb2FkZXIvS29vcmFMb2FkZXInXG5leHBvcnQgKiBmcm9tICcuL2xvYWRlci90ZXN0UnVuJyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==