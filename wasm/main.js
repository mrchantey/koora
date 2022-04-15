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
class GlueBase {
    constructor(gl) {
        this.gl = gl;
    }
    onLoad(wasmExports) {
        this.wasmExports = wasmExports;
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
/* harmony import */ var _kooraBindings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./kooraBindings */ "./src/loader/kooraBindings.ts");
/* harmony import */ var _RenderGlue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./RenderGlue */ "./src/loader/RenderGlue.ts");
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
        this.renderGlue = new _RenderGlue__WEBPACK_IMPORTED_MODULE_3__.RenderGlue(gl, canvas);
        this.glues.push(this);
        this.glues.push(this.renderGlue);
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
            bindings !== null && bindings !== void 0 ? bindings : (bindings = _kooraBindings__WEBPACK_IMPORTED_MODULE_2__.kooraBindings);
            const wasmImports = {
                gl: this.gl,
                host: {
                    log: console.log.bind(console),
                    elapsed: performance.now.bind(performance),
                    now: Date.now.bind(Date),
                    set: this.externSet.bind(this),
                    get: this.externGet.bind(this),
                    remove: this.externRemove.bind(this)
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
    start() {
        const world = this.wasmExports.defaultWorld();
        // console.dir(a.toString())
        this.renderGlue.resize();
        this.update = this.update.bind(this);
        this.update();
        return world;
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
const initKoora = ({ canvas, wasmUrl, bindings } = {}) => __awaiter(void 0, void 0, void 0, function* () {
    const loader = new KooraLoader(canvas);
    yield loader.load(wasmUrl, bindings);
    loader.start();
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
        this.resizeObserver = new ResizeObserver(this.resize.bind(this));
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

/***/ "./src/utils/classUtils.ts":
/*!*********************************!*\
  !*** ./src/utils/classUtils.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "applyGLOverloads": () => (/* binding */ applyGLOverloads),
/* harmony export */   "autoBind": () => (/* binding */ autoBind)
/* harmony export */ });
const autoBind = (obj) => {
    for (const field in obj) {
        if (typeof obj[field] === 'function')
            obj[field] = obj[field].bind(obj);
    }
};
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
/* harmony export */   "autoBind": () => (/* reexport safe */ _classUtils__WEBPACK_IMPORTED_MODULE_1__.autoBind)
/* harmony export */ });
/* harmony import */ var _DebounceResizeObserver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DebounceResizeObserver */ "./src/utils/DebounceResizeObserver.ts");
/* harmony import */ var _classUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classUtils */ "./src/utils/classUtils.ts");




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
      bindBuffer(target, buffer) {
        // src-as/WebGL2/imports/_types/bindBuffer(u32, externref) => void
        target = target >>> 0;
        __module0.bindBuffer(target, buffer);
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
      bindTransformFeedback(target, tf) {
        // src-as/WebGL2/imports/_types/bindTransformFeedback(u32, externref) => void
        target = target >>> 0;
        __module0.bindTransformFeedback(target, tf);
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
        return __lowerArray((pointer, value) => { new Uint32Array(memory.buffer)[pointer >>> 2] = value; }, 80, 2, __module0.getUniformIndices(program, uniformNames)) || __notnull();
      },
      getActiveUniforms__1(program, uniformIndices, pname) {
        // src-as/WebGL2/imports/_types/getActiveUniforms__1(externref, ~lib/array/Array<u32>, u32) => ~lib/array/Array<u32>
        uniformIndices = __liftArray(pointer => new Uint32Array(memory.buffer)[pointer >>> 2], 2, uniformIndices >>> 0);
        pname = pname >>> 0;
        return __lowerArray((pointer, value) => { new Uint32Array(memory.buffer)[pointer >>> 2] = value; }, 80, 2, __module0.getActiveUniforms__1(program, uniformIndices, pname)) || __notnull();
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
    defaultWorld() {
      // src-as/exports/mainFactories/defaultWorld() => src-as/base/World/World
      return __liftInternref(exports.defaultWorld() >>> 0);
    },
    defaultCamera() {
      // src-as/exports/cameraFactories/defaultCamera() => src-as/base/Entity/Entity
      return __liftInternref(exports.defaultCamera() >>> 0);
    },
    rotatingCube(_shader) {
      // src-as/exports/demos/rotatingCube(src-as/rendering/shader/Shader/Shader | null) => src-as/base/Entity/Entity
      _shader = __lowerInternref(_shader);
      return __liftInternref(exports.rotatingCube(_shader) >>> 0);
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
  }, exports);
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
/******/ 			// no module.id needed
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KooraLoader": () => (/* reexport safe */ _loader_KooraLoader__WEBPACK_IMPORTED_MODULE_0__.KooraLoader),
/* harmony export */   "initKoora": () => (/* reexport safe */ _loader_KooraLoader__WEBPACK_IMPORTED_MODULE_0__.initKoora)
/* harmony export */ });
/* harmony import */ var _loader_KooraLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loader/KooraLoader */ "./src/loader/KooraLoader.ts");


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YTtBQUM5RSxTQUFTO0FBQ1QsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCx3REFBd0Q7QUFDMUcsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELHdEQUF3RDtBQUMxRyxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQSxVQUFVLFVBQVU7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLGtCQUFrQixvQkFBb0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxrQkFBa0Isb0JBQW9CO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsU0FBUyxtQkFBbUIsUUFBUTtBQUNoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ25hQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOb0MiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9rb29yYS8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLmRlYm91bmNlL2luZGV4LmpzIiwid2VicGFjazovL2tvb3JhLy4vc3JjL2xvYWRlci9HbHVlQmFzZS50cyIsIndlYnBhY2s6Ly9rb29yYS8uL3NyYy9sb2FkZXIvS29vcmFMb2FkZXIudHMiLCJ3ZWJwYWNrOi8va29vcmEvLi9zcmMvbG9hZGVyL1JlbmRlckdsdWUudHMiLCJ3ZWJwYWNrOi8va29vcmEvLi9zcmMvbG9hZGVyL2tvb3JhQmluZGluZ3MudHMiLCJ3ZWJwYWNrOi8va29vcmEvLi9zcmMvdXRpbHMvRGVib3VuY2VSZXNpemVPYnNlcnZlci50cyIsIndlYnBhY2s6Ly9rb29yYS8uL3NyYy91dGlscy9jbGFzc1V0aWxzLnRzIiwid2VicGFjazovL2tvb3JhLy4vc3JjL3V0aWxzL2luZGV4LnRzIiwid2VicGFjazovL2tvb3JhLy4vc3JjL193YXNtL2RlYnVnLmpzIiwid2VicGFjazovL2tvb3JhL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2tvb3JhL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2tvb3JhL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9rb29yYS93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2tvb3JhL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8va29vcmEvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9rb29yYS8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGxvZGFzaCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMgPGh0dHBzOi8vanF1ZXJ5Lm9yZy8+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKi9cblxuLyoqIFVzZWQgYXMgdGhlIGBUeXBlRXJyb3JgIG1lc3NhZ2UgZm9yIFwiRnVuY3Rpb25zXCIgbWV0aG9kcy4gKi9cbnZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE5BTiA9IDAgLyAwO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2UuICovXG52YXIgcmVUcmltID0gL15cXHMrfFxccyskL2c7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiYWQgc2lnbmVkIGhleGFkZWNpbWFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JhZEhleCA9IC9eWy0rXTB4WzAtOWEtZl0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmluYXJ5IHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JpbmFyeSA9IC9eMGJbMDFdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG9jdGFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc09jdGFsID0gL14wb1swLTddKyQvaTtcblxuLyoqIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHdpdGhvdXQgYSBkZXBlbmRlbmN5IG9uIGByb290YC4gKi9cbnZhciBmcmVlUGFyc2VJbnQgPSBwYXJzZUludDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZU1heCA9IE1hdGgubWF4LFxuICAgIG5hdGl2ZU1pbiA9IE1hdGgubWluO1xuXG4vKipcbiAqIEdldHMgdGhlIHRpbWVzdGFtcCBvZiB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0aGF0IGhhdmUgZWxhcHNlZCBzaW5jZVxuICogdGhlIFVuaXggZXBvY2ggKDEgSmFudWFyeSAxOTcwIDAwOjAwOjAwIFVUQykuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAyLjQuMFxuICogQGNhdGVnb3J5IERhdGVcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIHRpbWVzdGFtcC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5kZWZlcihmdW5jdGlvbihzdGFtcCkge1xuICogICBjb25zb2xlLmxvZyhfLm5vdygpIC0gc3RhbXApO1xuICogfSwgXy5ub3coKSk7XG4gKiAvLyA9PiBMb2dzIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGl0IHRvb2sgZm9yIHRoZSBkZWZlcnJlZCBpbnZvY2F0aW9uLlxuICovXG52YXIgbm93ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiByb290LkRhdGUubm93KCk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBkZWJvdW5jZWQgZnVuY3Rpb24gdGhhdCBkZWxheXMgaW52b2tpbmcgYGZ1bmNgIHVudGlsIGFmdGVyIGB3YWl0YFxuICogbWlsbGlzZWNvbmRzIGhhdmUgZWxhcHNlZCBzaW5jZSB0aGUgbGFzdCB0aW1lIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gd2FzXG4gKiBpbnZva2VkLiBUaGUgZGVib3VuY2VkIGZ1bmN0aW9uIGNvbWVzIHdpdGggYSBgY2FuY2VsYCBtZXRob2QgdG8gY2FuY2VsXG4gKiBkZWxheWVkIGBmdW5jYCBpbnZvY2F0aW9ucyBhbmQgYSBgZmx1c2hgIG1ldGhvZCB0byBpbW1lZGlhdGVseSBpbnZva2UgdGhlbS5cbiAqIFByb3ZpZGUgYG9wdGlvbnNgIHRvIGluZGljYXRlIHdoZXRoZXIgYGZ1bmNgIHNob3VsZCBiZSBpbnZva2VkIG9uIHRoZVxuICogbGVhZGluZyBhbmQvb3IgdHJhaWxpbmcgZWRnZSBvZiB0aGUgYHdhaXRgIHRpbWVvdXQuIFRoZSBgZnVuY2AgaXMgaW52b2tlZFxuICogd2l0aCB0aGUgbGFzdCBhcmd1bWVudHMgcHJvdmlkZWQgdG8gdGhlIGRlYm91bmNlZCBmdW5jdGlvbi4gU3Vic2VxdWVudFxuICogY2FsbHMgdG8gdGhlIGRlYm91bmNlZCBmdW5jdGlvbiByZXR1cm4gdGhlIHJlc3VsdCBvZiB0aGUgbGFzdCBgZnVuY2BcbiAqIGludm9jYXRpb24uXG4gKlxuICogKipOb3RlOioqIElmIGBsZWFkaW5nYCBhbmQgYHRyYWlsaW5nYCBvcHRpb25zIGFyZSBgdHJ1ZWAsIGBmdW5jYCBpc1xuICogaW52b2tlZCBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dCBvbmx5IGlmIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb25cbiAqIGlzIGludm9rZWQgbW9yZSB0aGFuIG9uY2UgZHVyaW5nIHRoZSBgd2FpdGAgdGltZW91dC5cbiAqXG4gKiBJZiBgd2FpdGAgaXMgYDBgIGFuZCBgbGVhZGluZ2AgaXMgYGZhbHNlYCwgYGZ1bmNgIGludm9jYXRpb24gaXMgZGVmZXJyZWRcbiAqIHVudGlsIHRvIHRoZSBuZXh0IHRpY2ssIHNpbWlsYXIgdG8gYHNldFRpbWVvdXRgIHdpdGggYSB0aW1lb3V0IG9mIGAwYC5cbiAqXG4gKiBTZWUgW0RhdmlkIENvcmJhY2hvJ3MgYXJ0aWNsZV0oaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9kZWJvdW5jaW5nLXRocm90dGxpbmctZXhwbGFpbmVkLWV4YW1wbGVzLylcbiAqIGZvciBkZXRhaWxzIG92ZXIgdGhlIGRpZmZlcmVuY2VzIGJldHdlZW4gYF8uZGVib3VuY2VgIGFuZCBgXy50aHJvdHRsZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBkZWJvdW5jZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbd2FpdD0wXSBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byBkZWxheS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gVGhlIG9wdGlvbnMgb2JqZWN0LlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWFkaW5nPWZhbHNlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIGxlYWRpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tYXhXYWl0XVxuICogIFRoZSBtYXhpbXVtIHRpbWUgYGZ1bmNgIGlzIGFsbG93ZWQgdG8gYmUgZGVsYXllZCBiZWZvcmUgaXQncyBpbnZva2VkLlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy50cmFpbGluZz10cnVlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBkZWJvdW5jZWQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIC8vIEF2b2lkIGNvc3RseSBjYWxjdWxhdGlvbnMgd2hpbGUgdGhlIHdpbmRvdyBzaXplIGlzIGluIGZsdXguXG4gKiBqUXVlcnkod2luZG93KS5vbigncmVzaXplJywgXy5kZWJvdW5jZShjYWxjdWxhdGVMYXlvdXQsIDE1MCkpO1xuICpcbiAqIC8vIEludm9rZSBgc2VuZE1haWxgIHdoZW4gY2xpY2tlZCwgZGVib3VuY2luZyBzdWJzZXF1ZW50IGNhbGxzLlxuICogalF1ZXJ5KGVsZW1lbnQpLm9uKCdjbGljaycsIF8uZGVib3VuY2Uoc2VuZE1haWwsIDMwMCwge1xuICogICAnbGVhZGluZyc6IHRydWUsXG4gKiAgICd0cmFpbGluZyc6IGZhbHNlXG4gKiB9KSk7XG4gKlxuICogLy8gRW5zdXJlIGBiYXRjaExvZ2AgaXMgaW52b2tlZCBvbmNlIGFmdGVyIDEgc2Vjb25kIG9mIGRlYm91bmNlZCBjYWxscy5cbiAqIHZhciBkZWJvdW5jZWQgPSBfLmRlYm91bmNlKGJhdGNoTG9nLCAyNTAsIHsgJ21heFdhaXQnOiAxMDAwIH0pO1xuICogdmFyIHNvdXJjZSA9IG5ldyBFdmVudFNvdXJjZSgnL3N0cmVhbScpO1xuICogalF1ZXJ5KHNvdXJjZSkub24oJ21lc3NhZ2UnLCBkZWJvdW5jZWQpO1xuICpcbiAqIC8vIENhbmNlbCB0aGUgdHJhaWxpbmcgZGVib3VuY2VkIGludm9jYXRpb24uXG4gKiBqUXVlcnkod2luZG93KS5vbigncG9wc3RhdGUnLCBkZWJvdW5jZWQuY2FuY2VsKTtcbiAqL1xuZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCwgb3B0aW9ucykge1xuICB2YXIgbGFzdEFyZ3MsXG4gICAgICBsYXN0VGhpcyxcbiAgICAgIG1heFdhaXQsXG4gICAgICByZXN1bHQsXG4gICAgICB0aW1lcklkLFxuICAgICAgbGFzdENhbGxUaW1lLFxuICAgICAgbGFzdEludm9rZVRpbWUgPSAwLFxuICAgICAgbGVhZGluZyA9IGZhbHNlLFxuICAgICAgbWF4aW5nID0gZmFsc2UsXG4gICAgICB0cmFpbGluZyA9IHRydWU7XG5cbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgd2FpdCA9IHRvTnVtYmVyKHdhaXQpIHx8IDA7XG4gIGlmIChpc09iamVjdChvcHRpb25zKSkge1xuICAgIGxlYWRpbmcgPSAhIW9wdGlvbnMubGVhZGluZztcbiAgICBtYXhpbmcgPSAnbWF4V2FpdCcgaW4gb3B0aW9ucztcbiAgICBtYXhXYWl0ID0gbWF4aW5nID8gbmF0aXZlTWF4KHRvTnVtYmVyKG9wdGlvbnMubWF4V2FpdCkgfHwgMCwgd2FpdCkgOiBtYXhXYWl0O1xuICAgIHRyYWlsaW5nID0gJ3RyYWlsaW5nJyBpbiBvcHRpb25zID8gISFvcHRpb25zLnRyYWlsaW5nIDogdHJhaWxpbmc7XG4gIH1cblxuICBmdW5jdGlvbiBpbnZva2VGdW5jKHRpbWUpIHtcbiAgICB2YXIgYXJncyA9IGxhc3RBcmdzLFxuICAgICAgICB0aGlzQXJnID0gbGFzdFRoaXM7XG5cbiAgICBsYXN0QXJncyA9IGxhc3RUaGlzID0gdW5kZWZpbmVkO1xuICAgIGxhc3RJbnZva2VUaW1lID0gdGltZTtcbiAgICByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBsZWFkaW5nRWRnZSh0aW1lKSB7XG4gICAgLy8gUmVzZXQgYW55IGBtYXhXYWl0YCB0aW1lci5cbiAgICBsYXN0SW52b2tlVGltZSA9IHRpbWU7XG4gICAgLy8gU3RhcnQgdGhlIHRpbWVyIGZvciB0aGUgdHJhaWxpbmcgZWRnZS5cbiAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgIC8vIEludm9rZSB0aGUgbGVhZGluZyBlZGdlLlxuICAgIHJldHVybiBsZWFkaW5nID8gaW52b2tlRnVuYyh0aW1lKSA6IHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbWFpbmluZ1dhaXQodGltZSkge1xuICAgIHZhciB0aW1lU2luY2VMYXN0Q2FsbCA9IHRpbWUgLSBsYXN0Q2FsbFRpbWUsXG4gICAgICAgIHRpbWVTaW5jZUxhc3RJbnZva2UgPSB0aW1lIC0gbGFzdEludm9rZVRpbWUsXG4gICAgICAgIHJlc3VsdCA9IHdhaXQgLSB0aW1lU2luY2VMYXN0Q2FsbDtcblxuICAgIHJldHVybiBtYXhpbmcgPyBuYXRpdmVNaW4ocmVzdWx0LCBtYXhXYWl0IC0gdGltZVNpbmNlTGFzdEludm9rZSkgOiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBzaG91bGRJbnZva2UodGltZSkge1xuICAgIHZhciB0aW1lU2luY2VMYXN0Q2FsbCA9IHRpbWUgLSBsYXN0Q2FsbFRpbWUsXG4gICAgICAgIHRpbWVTaW5jZUxhc3RJbnZva2UgPSB0aW1lIC0gbGFzdEludm9rZVRpbWU7XG5cbiAgICAvLyBFaXRoZXIgdGhpcyBpcyB0aGUgZmlyc3QgY2FsbCwgYWN0aXZpdHkgaGFzIHN0b3BwZWQgYW5kIHdlJ3JlIGF0IHRoZVxuICAgIC8vIHRyYWlsaW5nIGVkZ2UsIHRoZSBzeXN0ZW0gdGltZSBoYXMgZ29uZSBiYWNrd2FyZHMgYW5kIHdlJ3JlIHRyZWF0aW5nXG4gICAgLy8gaXQgYXMgdGhlIHRyYWlsaW5nIGVkZ2UsIG9yIHdlJ3ZlIGhpdCB0aGUgYG1heFdhaXRgIGxpbWl0LlxuICAgIHJldHVybiAobGFzdENhbGxUaW1lID09PSB1bmRlZmluZWQgfHwgKHRpbWVTaW5jZUxhc3RDYWxsID49IHdhaXQpIHx8XG4gICAgICAodGltZVNpbmNlTGFzdENhbGwgPCAwKSB8fCAobWF4aW5nICYmIHRpbWVTaW5jZUxhc3RJbnZva2UgPj0gbWF4V2FpdCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gdGltZXJFeHBpcmVkKCkge1xuICAgIHZhciB0aW1lID0gbm93KCk7XG4gICAgaWYgKHNob3VsZEludm9rZSh0aW1lKSkge1xuICAgICAgcmV0dXJuIHRyYWlsaW5nRWRnZSh0aW1lKTtcbiAgICB9XG4gICAgLy8gUmVzdGFydCB0aGUgdGltZXIuXG4gICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCByZW1haW5pbmdXYWl0KHRpbWUpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyYWlsaW5nRWRnZSh0aW1lKSB7XG4gICAgdGltZXJJZCA9IHVuZGVmaW5lZDtcblxuICAgIC8vIE9ubHkgaW52b2tlIGlmIHdlIGhhdmUgYGxhc3RBcmdzYCB3aGljaCBtZWFucyBgZnVuY2AgaGFzIGJlZW5cbiAgICAvLyBkZWJvdW5jZWQgYXQgbGVhc3Qgb25jZS5cbiAgICBpZiAodHJhaWxpbmcgJiYgbGFzdEFyZ3MpIHtcbiAgICAgIHJldHVybiBpbnZva2VGdW5jKHRpbWUpO1xuICAgIH1cbiAgICBsYXN0QXJncyA9IGxhc3RUaGlzID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgaWYgKHRpbWVySWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVySWQpO1xuICAgIH1cbiAgICBsYXN0SW52b2tlVGltZSA9IDA7XG4gICAgbGFzdEFyZ3MgPSBsYXN0Q2FsbFRpbWUgPSBsYXN0VGhpcyA9IHRpbWVySWQgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBmdW5jdGlvbiBmbHVzaCgpIHtcbiAgICByZXR1cm4gdGltZXJJZCA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogdHJhaWxpbmdFZGdlKG5vdygpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlYm91bmNlZCgpIHtcbiAgICB2YXIgdGltZSA9IG5vdygpLFxuICAgICAgICBpc0ludm9raW5nID0gc2hvdWxkSW52b2tlKHRpbWUpO1xuXG4gICAgbGFzdEFyZ3MgPSBhcmd1bWVudHM7XG4gICAgbGFzdFRoaXMgPSB0aGlzO1xuICAgIGxhc3RDYWxsVGltZSA9IHRpbWU7XG5cbiAgICBpZiAoaXNJbnZva2luZykge1xuICAgICAgaWYgKHRpbWVySWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gbGVhZGluZ0VkZ2UobGFzdENhbGxUaW1lKTtcbiAgICAgIH1cbiAgICAgIGlmIChtYXhpbmcpIHtcbiAgICAgICAgLy8gSGFuZGxlIGludm9jYXRpb25zIGluIGEgdGlnaHQgbG9vcC5cbiAgICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICAgICAgcmV0dXJuIGludm9rZUZ1bmMobGFzdENhbGxUaW1lKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRpbWVySWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBkZWJvdW5jZWQuY2FuY2VsID0gY2FuY2VsO1xuICBkZWJvdW5jZWQuZmx1c2ggPSBmbHVzaDtcbiAgcmV0dXJuIGRlYm91bmNlZDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3ltYm9sYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3ltYm9sLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N5bWJvbCcgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBzeW1ib2xUYWcpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBudW1iZXIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBudW1iZXIuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9OdW1iZXIoMy4yKTtcbiAqIC8vID0+IDMuMlxuICpcbiAqIF8udG9OdW1iZXIoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiA1ZS0zMjRcbiAqXG4gKiBfLnRvTnVtYmVyKEluZmluaXR5KTtcbiAqIC8vID0+IEluZmluaXR5XG4gKlxuICogXy50b051bWJlcignMy4yJyk7XG4gKiAvLyA9PiAzLjJcbiAqL1xuZnVuY3Rpb24gdG9OdW1iZXIodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAoaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIE5BTjtcbiAgfVxuICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgdmFyIG90aGVyID0gdHlwZW9mIHZhbHVlLnZhbHVlT2YgPT0gJ2Z1bmN0aW9uJyA/IHZhbHVlLnZhbHVlT2YoKSA6IHZhbHVlO1xuICAgIHZhbHVlID0gaXNPYmplY3Qob3RoZXIpID8gKG90aGVyICsgJycpIDogb3RoZXI7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gMCA/IHZhbHVlIDogK3ZhbHVlO1xuICB9XG4gIHZhbHVlID0gdmFsdWUucmVwbGFjZShyZVRyaW0sICcnKTtcbiAgdmFyIGlzQmluYXJ5ID0gcmVJc0JpbmFyeS50ZXN0KHZhbHVlKTtcbiAgcmV0dXJuIChpc0JpbmFyeSB8fCByZUlzT2N0YWwudGVzdCh2YWx1ZSkpXG4gICAgPyBmcmVlUGFyc2VJbnQodmFsdWUuc2xpY2UoMiksIGlzQmluYXJ5ID8gMiA6IDgpXG4gICAgOiAocmVJc0JhZEhleC50ZXN0KHZhbHVlKSA/IE5BTiA6ICt2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGVib3VuY2U7XG4iLCJpbXBvcnQgeyBrb29yYUV4cG9ydHMgfSBmcm9tICcuL2tvb3JhQmluZGluZ3MnXG5cblxuZXhwb3J0IGNsYXNzIEdsdWVCYXNle1xuXG5cdGdsOiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0XG5cdHdhc21FeHBvcnRzOiBrb29yYUV4cG9ydHNcblxuXHRjb25zdHJ1Y3RvcihnbCl7XG5cdFx0dGhpcy5nbCA9IGdsXG5cdH1cblxuXHRvbkxvYWQod2FzbUV4cG9ydHMpe1xuXHRcdHRoaXMud2FzbUV4cG9ydHMgPSB3YXNtRXhwb3J0c1xuXHR9XG5cbn0iLCJpbXBvcnQgeyBhcHBseUdMT3ZlcmxvYWRzLCBhdXRvQmluZCB9IGZyb20gJy4uL3V0aWxzJ1xuaW1wb3J0IHsgR2x1ZUJhc2UgfSBmcm9tICcuL0dsdWVCYXNlJ1xuaW1wb3J0IHsgS29vcmFCaW5kaW5ncywga29vcmFCaW5kaW5ncyB9IGZyb20gJy4va29vcmFCaW5kaW5ncydcbmltcG9ydCB7IFJlbmRlckdsdWUgfSBmcm9tICcuL1JlbmRlckdsdWUnXG5cbmNvbnN0IGxpc3RlbiA9IChnbCwgdmFsKSA9PiB7XG5cdGNvbnN0IGZ1bmMgPSBnbFt2YWxdXG5cdGdsW3ZhbF0gPSAoLi4uYXJncykgPT4ge1xuXHRcdGNvbnNvbGUubG9nKGAke3ZhbH0gLSBgLCBhcmdzKVxuXHRcdGZ1bmMoLi4uYXJncylcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgS29vcmFMb2FkZXIgZXh0ZW5kcyBHbHVlQmFzZXtcblxuXHRnbHVlczogR2x1ZUJhc2VbXSA9IFtdXG5cdGV4dGVybklkOiBudW1iZXIgPSAwXG5cdGV4dGVybk1hcDogTWFwPG51bWJlciwgYW55PiA9IG5ldyBNYXAoKVxuXG5cdHJlbmRlckdsdWU6IFJlbmRlckdsdWVcblx0YW5pbUZyYW1lSWQ6IG51bWJlclxuXHRjb25zdHJ1Y3RvcihjYW52YXM/OiBIVE1MQ2FudmFzRWxlbWVudCl7XG5cdFx0Y2FudmFzID8/PSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgna29vcmEtY2FudmFzJykgYXMgSFRNTENhbnZhc0VsZW1lbnRcblx0XHRjYW52YXMgPz89IGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJykpXG5cdFx0Y29uc3QgZ2wgPSBjYW52YXMuZ2V0Q29udGV4dCgnd2ViZ2wyJylcblx0XHRzdXBlcihnbClcblx0XHRhdXRvQmluZChnbClcblx0XHRhcHBseUdMT3ZlcmxvYWRzKGdsKVxuXG5cdFx0dGhpcy5yZW5kZXJHbHVlID0gbmV3IFJlbmRlckdsdWUoZ2wsIGNhbnZhcylcblx0XHR0aGlzLmdsdWVzLnB1c2godGhpcylcblx0XHR0aGlzLmdsdWVzLnB1c2godGhpcy5yZW5kZXJHbHVlKVxuXG5cdFx0Ly96ZXJvIG1lYW5zIG51bGxcblx0XHR0aGlzLmV4dGVybk1hcC5zZXQodGhpcy5leHRlcm5JZCsrLCBudWxsKVxuXHR9XG5cdGV4dGVyblNldCh2YWw6IGFueSl7XG5cdFx0aWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZClcblx0XHRcdHJldHVybiAwXG5cdFx0Y29uc3QgaWQgPSB0aGlzLmV4dGVybklkKytcblx0XHR0aGlzLmV4dGVybk1hcC5zZXQoaWQsIHZhbClcblx0XHRyZXR1cm4gaWRcblx0fVxuXHRleHRlcm5HZXQoaWQ6IG51bWJlcil7XG5cdFx0Y29uc3QgdmFsID0gdGhpcy5leHRlcm5NYXAuZ2V0KGlkKVxuXHRcdC8vIGNvbnNvbGUuZGlyKHZhbClcblx0XHRyZXR1cm4gdmFsXG5cdH1cblx0ZXh0ZXJuUmVtb3ZlKGlkOiBudW1iZXIpe1xuXHRcdHJldHVybiB0aGlzLmV4dGVybk1hcC5kZWxldGUoaWQpXG5cdH1cblxuXHRhc3luYyBsb2FkKHdhc21Vcmw/OiBzdHJpbmcsIGJpbmRpbmdzPzogS29vcmFCaW5kaW5ncyk6IFByb21pc2U8S29vcmFMb2FkZXI+e1xuXHRcdHdhc21VcmwgPz89ICcvZGVidWcud2FzbSdcblx0XHRiaW5kaW5ncyA/Pz0ga29vcmFCaW5kaW5nc1xuXHRcdGNvbnN0IHdhc21JbXBvcnRzID0ge1xuXHRcdFx0Z2w6IHRoaXMuZ2wsXG5cdFx0XHRob3N0OiB7XG5cdFx0XHRcdGxvZzogY29uc29sZS5sb2cuYmluZChjb25zb2xlKSxcblx0XHRcdFx0ZWxhcHNlZDogcGVyZm9ybWFuY2Uubm93LmJpbmQocGVyZm9ybWFuY2UpLFxuXHRcdFx0XHRub3c6IERhdGUubm93LmJpbmQoRGF0ZSksXG5cdFx0XHRcdHNldDogdGhpcy5leHRlcm5TZXQuYmluZCh0aGlzKSxcblx0XHRcdFx0Z2V0OiB0aGlzLmV4dGVybkdldC5iaW5kKHRoaXMpLFxuXHRcdFx0XHRyZW1vdmU6IHRoaXMuZXh0ZXJuUmVtb3ZlLmJpbmQodGhpcylcblx0XHRcdH0sXG5cdFx0XHRlbnY6IHt9XG5cdFx0fVxuXHRcdC8vIGNvbnNvbGUuZGlyKHdhc21JbXBvcnRzKVxuXHRcdGNvbnN0IHdhc21Nb2R1bGUgPSBhd2FpdCBXZWJBc3NlbWJseS5jb21waWxlU3RyZWFtaW5nKGZldGNoKHdhc21VcmwpKVxuXHRcdGNvbnN0IHdhc21FeHBvcnRzID0gYXdhaXQgYmluZGluZ3MuaW5zdGFudGlhdGUod2FzbU1vZHVsZSwgd2FzbUltcG9ydHMpXG5cdFx0Zm9yIChjb25zdCBnbHVlIG9mIHRoaXMuZ2x1ZXMpXG5cdFx0XHRnbHVlLm9uTG9hZCh3YXNtRXhwb3J0cylcblx0XHRcblx0XHRyZXR1cm4gdGhpc1xuXHR9XG5cdHN0YXJ0KCk6IGtvb3JhQmluZGluZ3MuX19JbnRlcm5yZWY3MXtcblx0XHRjb25zdCB3b3JsZCA9IHRoaXMud2FzbUV4cG9ydHMuZGVmYXVsdFdvcmxkKClcblx0XHQvLyBjb25zb2xlLmRpcihhLnRvU3RyaW5nKCkpXG5cdFx0dGhpcy5yZW5kZXJHbHVlLnJlc2l6ZSgpXG5cdFx0dGhpcy51cGRhdGUgPSB0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpXG5cdFx0dGhpcy51cGRhdGUoKVxuXHRcdHJldHVybiB3b3JsZFxuXHR9XG5cdHVwZGF0ZSgpe1xuXHRcdHRoaXMud2FzbUV4cG9ydHMudXBkYXRlKClcblx0XHR0aGlzLmFuaW1GcmFtZUlkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlKVxuXHR9XG5cdFxuXHRydW5PbmNlKCk6IEtvb3JhTG9hZGVye1xuXHRcdHRoaXMuc3RhcnQoKVxuXHRcdGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbUZyYW1lSWQpXG5cdFx0cmV0dXJuIHRoaXNcblx0fVxuXG59XG5cbmludGVyZmFjZSBJbml0T3B0aW9uc3tcblx0Y2FudmFzPzogSFRNTENhbnZhc0VsZW1lbnRcblx0d2FzbVVybD86IHN0cmluZ1xuXHRiaW5kaW5ncz86IEtvb3JhQmluZGluZ3Ncbn1cblxuZXhwb3J0IGNvbnN0IGluaXRLb29yYSA9IGFzeW5jKHsgY2FudmFzLCB3YXNtVXJsLCBiaW5kaW5ncyB9OiBJbml0T3B0aW9ucyA9IHt9KSA9PiB7XHRcblx0Y29uc3QgbG9hZGVyID0gbmV3IEtvb3JhTG9hZGVyKGNhbnZhcylcblx0YXdhaXQgbG9hZGVyLmxvYWQod2FzbVVybCwgYmluZGluZ3MpXG5cdGxvYWRlci5zdGFydCgpXG5cdHJldHVybiBsb2FkZXJcbn1cbi8vQHRzLWlnbm9yZVxud2luZG93LmluaXRLb29yYSA9IGluaXRLb29yYVxuXG5cbiIsImltcG9ydCB7IERlYm91bmNlUmVzaXplT2JzZXJ2ZXIgfSBmcm9tICcuLi91dGlscydcbmltcG9ydCB7IEdsdWVCYXNlIH0gZnJvbSAnLi9HbHVlQmFzZSdcblxuZXhwb3J0IGNsYXNzIFJlbmRlckdsdWUgZXh0ZW5kcyBHbHVlQmFzZXtcblxuXHRjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50XG5cdHJlc2l6ZU9ic2VydmVyOiBEZWJvdW5jZVJlc2l6ZU9ic2VydmVyXG5cblx0Y29uc3RydWN0b3IoZ2w6IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQsIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpe1xuXHRcdHN1cGVyKGdsKVxuXHRcdHRoaXMuY2FudmFzID0gY2FudmFzXG5cdFx0dGhpcy5yZXNpemVPYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcih0aGlzLnJlc2l6ZS5iaW5kKHRoaXMpKVxuXHRcdHRoaXMucmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmNhbnZhcy5wYXJlbnRFbGVtZW50KVxuXHR9XG5cdHJlc2l6ZSgpe1xuXHRcdGNvbnN0IHdpZHRoID0gdGhpcy5jYW52YXMuY2xpZW50V2lkdGhcblx0XHRjb25zdCBoZWlnaHQgPSB0aGlzLmNhbnZhcy5jbGllbnRIZWlnaHRcblx0XHR0aGlzLmNhbnZhcy53aWR0aCA9IHdpZHRoXG5cdFx0dGhpcy5jYW52YXMuaGVpZ2h0ID0gaGVpZ2h0XG5cdFx0dGhpcy53YXNtRXhwb3J0cz8uaGFuZGxlUmVzaXplKHdpZHRoLCBoZWlnaHQpXG5cdFx0dGhpcy53YXNtRXhwb3J0cz8udXBkYXRlKClcblx0fVxufSIsImltcG9ydCAqIGFzIGtvb3JhQmluZGluZ3MgZnJvbSAnLi4vX3dhc20vZGVidWcnXG5leHBvcnQgdHlwZSBrb29yYUV4cG9ydHMgPSB0eXBlb2Yga29vcmFCaW5kaW5ncy5fX0FkYXB0ZWRFeHBvcnRzXG5leHBvcnQgdHlwZSBLb29yYUJpbmRpbmdzID0gdHlwZW9mIGtvb3JhQmluZGluZ3NcbmV4cG9ydCB7XG5cdGtvb3JhQmluZGluZ3Ncbn0iLCJcbmltcG9ydCBkZWJvdW5jZSBmcm9tICdsb2Rhc2guZGVib3VuY2UnXG5cbmV4cG9ydCBjb25zdCBEZWJvdW5jZVJlc2l6ZU9ic2VydmVyID0gKGNiOiBSZXNpemVPYnNlcnZlckNhbGxiYWNrLCBkZWxheSA9IDEpID0+IFxuXHRuZXcgUmVzaXplT2JzZXJ2ZXIoZGVib3VuY2UoY2IsIGRlbGF5KSlcblxuZXhwb3J0IHR5cGUgRGVib3VuY2VSZXNpemVPYnNlcnZlciA9IFJldHVyblR5cGU8dHlwZW9mIERlYm91bmNlUmVzaXplT2JzZXJ2ZXI+XG4iLCJcblxuXG5leHBvcnQgY29uc3QgYXV0b0JpbmQgPSAob2JqOiBhbnkpID0+IHtcblx0Zm9yIChjb25zdCBmaWVsZCBpbiBvYmope1xuXHRcdGlmICh0eXBlb2Ygb2JqW2ZpZWxkXSA9PT0gJ2Z1bmN0aW9uJylcblx0XHRcdG9ialtmaWVsZF0gPSBvYmpbZmllbGRdLmJpbmQob2JqKVxuXHR9XG59XG5cblxuZXhwb3J0IGNvbnN0IGFwcGx5R0xPdmVybG9hZHMgPSAoZ2w6IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQpID0+IHtcblx0Y29uc3QgZ2xPdmVybG9hZHMgPSBbXG5cdFx0Wydjb21wcmVzc2VkVGV4SW1hZ2UzRCcsIDJdLFxuXHRcdFsnY29tcHJlc3NlZFRleFN1YkltYWdlM0QnLCAyXSxcblx0XHRbJ2dldEFjdGl2ZVVuaWZvcm1CbG9ja1BhcmFtZXRlcicsIDJdLFxuXHRcdFsnZ2V0QWN0aXZlVW5pZm9ybXMnLCAyXSxcblx0XHRbJ3RleEltYWdlM0QnLCA0XSxcblx0XHRbJ3RleFN1YkltYWdlM0QnLCAzXSxcblx0XHRbJ2J1ZmZlckRhdGEnLCA3XSxcblx0XHRbJ2J1ZmZlclN1YkRhdGEnLCAyXSxcblx0XHRbJ2NvbXByZXNzZWRUZXhJbWFnZTJEJywgMl0sXG5cdFx0Wydjb21wcmVzc2VkVGV4U3ViSW1hZ2UyRCcsIDJdLFxuXHRcdFsncmVhZFBpeGVscycsIDNdLFxuXHRcdFsndGV4SW1hZ2UyRCcsIDZdLFxuXHRcdFsndGV4U3ViSW1hZ2UyRCcsIDVdLFxuXHRcdFsnZ2V0QnVmZmVyUGFyYW1ldGVyJywgMl0sXG5cdFx0WydnZXRQcm9ncmFtUGFyYW1ldGVyJywgMl0sXG5cdFx0WydnZXRTaGFkZXJQYXJhbWV0ZXInLCAyXSxcblx0XVxuXHRnbE92ZXJsb2Fkcy5mb3JFYWNoKChba2V5LCBjb3VudF0pID0+IHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspXG5cdFx0XHRnbFtgJHtrZXl9X18ke2kgKyAxfWBdID0gZ2xba2V5XVxuXHR9KVxufSIsImV4cG9ydCAqIGZyb20gJy4vRGVib3VuY2VSZXNpemVPYnNlcnZlcidcbmV4cG9ydCAqIGZyb20gJy4vY2xhc3NVdGlscyciLCJleHBvcnQgYXN5bmMgZnVuY3Rpb24gaW5zdGFudGlhdGUobW9kdWxlLCBpbXBvcnRzID0ge30pIHtcbiAgY29uc3QgX19tb2R1bGUwID0gaW1wb3J0cy5nbDtcbiAgY29uc3QgX19tb2R1bGUxID0gaW1wb3J0cy5ob3N0O1xuICBjb25zdCBhZGFwdGVkSW1wb3J0cyA9IHtcbiAgICBlbnY6IE9iamVjdC5hc3NpZ24oT2JqZWN0LmNyZWF0ZShnbG9iYWxUaGlzKSwgaW1wb3J0cy5lbnYgfHwge30sIHtcbiAgICAgIHNlZWQoKSB7XG4gICAgICAgIC8vIH5saWIvYnVpbHRpbnMvc2VlZCgpID0+IGY2NFxuICAgICAgICByZXR1cm4gKCgpID0+IHtcbiAgICAgICAgICAvLyBAZXh0ZXJuYWwuanNcbiAgICAgICAgICByZXR1cm4gRGF0ZS5ub3coKSAqIE1hdGgucmFuZG9tKCk7XG4gICAgICAgIH0pKCk7XG4gICAgICB9LFxuICAgICAgYWJvcnQobWVzc2FnZSwgZmlsZU5hbWUsIGxpbmVOdW1iZXIsIGNvbHVtbk51bWJlcikge1xuICAgICAgICAvLyB+bGliL2J1aWx0aW5zL2Fib3J0KH5saWIvc3RyaW5nL1N0cmluZyB8IG51bGw/LCB+bGliL3N0cmluZy9TdHJpbmcgfCBudWxsPywgdTMyPywgdTMyPykgPT4gdm9pZFxuICAgICAgICBtZXNzYWdlID0gX19saWZ0U3RyaW5nKG1lc3NhZ2UgPj4+IDApO1xuICAgICAgICBmaWxlTmFtZSA9IF9fbGlmdFN0cmluZyhmaWxlTmFtZSA+Pj4gMCk7XG4gICAgICAgIGxpbmVOdW1iZXIgPSBsaW5lTnVtYmVyID4+PiAwO1xuICAgICAgICBjb2x1bW5OdW1iZXIgPSBjb2x1bW5OdW1iZXIgPj4+IDA7XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgLy8gQGV4dGVybmFsLmpzXG4gICAgICAgICAgdGhyb3cgRXJyb3IoYCR7bWVzc2FnZX0gaW4gJHtmaWxlTmFtZX06JHtsaW5lTnVtYmVyfToke2NvbHVtbk51bWJlcn1gKTtcbiAgICAgICAgfSkoKTtcbiAgICAgIH0sXG4gICAgfSksXG4gICAgZ2w6IE9iamVjdC5hc3NpZ24oT2JqZWN0LmNyZWF0ZShfX21vZHVsZTApLCB7XG4gICAgICBjbGVhcihtYXNrKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvY2xlYXIodTMyKSA9PiB2b2lkXG4gICAgICAgIG1hc2sgPSBtYXNrID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAuY2xlYXIobWFzayk7XG4gICAgICB9LFxuICAgICAgYmluZEJ1ZmZlcih0YXJnZXQsIGJ1ZmZlcikge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2JpbmRCdWZmZXIodTMyLCBleHRlcm5yZWYpID0+IHZvaWRcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0ID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAuYmluZEJ1ZmZlcih0YXJnZXQsIGJ1ZmZlcik7XG4gICAgICB9LFxuICAgICAgYnVmZmVyU3ViRGF0YV9fMih0YXJnZXQsIGRzdEJ5dGVPZmZzZXQsIHNyY0RhdGEsIHNyY09mZnNldCwgbGVuZ3RoKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvYnVmZmVyU3ViRGF0YV9fMih1MzIsIGkzMiwgfmxpYi90eXBlZGFycmF5L0Zsb2F0MzJBcnJheSwgdTMyLCB1MzI/KSA9PiB2b2lkXG4gICAgICAgIHRhcmdldCA9IHRhcmdldCA+Pj4gMDtcbiAgICAgICAgc3JjRGF0YSA9IF9fbGlmdFR5cGVkQXJyYXkoRmxvYXQzMkFycmF5LCBzcmNEYXRhID4+PiAwKTtcbiAgICAgICAgc3JjT2Zmc2V0ID0gc3JjT2Zmc2V0ID4+PiAwO1xuICAgICAgICBsZW5ndGggPSBsZW5ndGggPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC5idWZmZXJTdWJEYXRhX18yKHRhcmdldCwgZHN0Qnl0ZU9mZnNldCwgc3JjRGF0YSwgc3JjT2Zmc2V0LCBsZW5ndGgpO1xuICAgICAgfSxcbiAgICAgIGVuYWJsZShjYXApIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9lbmFibGUodTMyKSA9PiB2b2lkXG4gICAgICAgIGNhcCA9IGNhcCA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLmVuYWJsZShjYXApO1xuICAgICAgfSxcbiAgICAgIGRlcHRoRnVuYyhmdW5jKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvZGVwdGhGdW5jKHUzMikgPT4gdm9pZFxuICAgICAgICBmdW5jID0gZnVuYyA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLmRlcHRoRnVuYyhmdW5jKTtcbiAgICAgIH0sXG4gICAgICBkaXNhYmxlKGNhcCkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2Rpc2FibGUodTMyKSA9PiB2b2lkXG4gICAgICAgIGNhcCA9IGNhcCA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLmRpc2FibGUoY2FwKTtcbiAgICAgIH0sXG4gICAgICBjdWxsRmFjZShtb2RlKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvY3VsbEZhY2UodTMyKSA9PiB2b2lkXG4gICAgICAgIG1vZGUgPSBtb2RlID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAuY3VsbEZhY2UobW9kZSk7XG4gICAgICB9LFxuICAgICAgYmluZFRyYW5zZm9ybUZlZWRiYWNrKHRhcmdldCwgdGYpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9iaW5kVHJhbnNmb3JtRmVlZGJhY2sodTMyLCBleHRlcm5yZWYpID0+IHZvaWRcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0ID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAuYmluZFRyYW5zZm9ybUZlZWRiYWNrKHRhcmdldCwgdGYpO1xuICAgICAgfSxcbiAgICAgIGJlZ2luVHJhbnNmb3JtRmVlZGJhY2socHJpbWl0aXZlTW9kZSkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2JlZ2luVHJhbnNmb3JtRmVlZGJhY2sodTMyKSA9PiB2b2lkXG4gICAgICAgIHByaW1pdGl2ZU1vZGUgPSBwcmltaXRpdmVNb2RlID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAuYmVnaW5UcmFuc2Zvcm1GZWVkYmFjayhwcmltaXRpdmVNb2RlKTtcbiAgICAgIH0sXG4gICAgICBkcmF3QXJyYXlzKG1vZGUsIGZpcnN0LCBjb3VudCkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2RyYXdBcnJheXModTMyLCBpMzIsIGkzMikgPT4gdm9pZFxuICAgICAgICBtb2RlID0gbW9kZSA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLmRyYXdBcnJheXMobW9kZSwgZmlyc3QsIGNvdW50KTtcbiAgICAgIH0sXG4gICAgICBkcmF3RWxlbWVudHNJbnN0YW5jZWQobW9kZSwgY291bnQsIHR5cGUsIG9mZnNldCwgaW5zdGFuY2VDb3VudCkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2RyYXdFbGVtZW50c0luc3RhbmNlZCh1MzIsIGkzMiwgdTMyLCBpMzIsIGkzMikgPT4gdm9pZFxuICAgICAgICBtb2RlID0gbW9kZSA+Pj4gMDtcbiAgICAgICAgdHlwZSA9IHR5cGUgPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC5kcmF3RWxlbWVudHNJbnN0YW5jZWQobW9kZSwgY291bnQsIHR5cGUsIG9mZnNldCwgaW5zdGFuY2VDb3VudCk7XG4gICAgICB9LFxuICAgICAgZHJhd0FycmF5c0luc3RhbmNlZChtb2RlLCBmaXJzdCwgY291bnQsIGluc3RhbmNlQ291bnQpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9kcmF3QXJyYXlzSW5zdGFuY2VkKHUzMiwgaTMyLCBpMzIsIGkzMikgPT4gdm9pZFxuICAgICAgICBtb2RlID0gbW9kZSA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLmRyYXdBcnJheXNJbnN0YW5jZWQobW9kZSwgZmlyc3QsIGNvdW50LCBpbnN0YW5jZUNvdW50KTtcbiAgICAgIH0sXG4gICAgICBkcmF3RWxlbWVudHMobW9kZSwgY291bnQsIHR5cGUsIG9mZnNldCkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2RyYXdFbGVtZW50cyh1MzIsIGkzMiwgdTMyLCBpMzIpID0+IHZvaWRcbiAgICAgICAgbW9kZSA9IG1vZGUgPj4+IDA7XG4gICAgICAgIHR5cGUgPSB0eXBlID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAuZHJhd0VsZW1lbnRzKG1vZGUsIGNvdW50LCB0eXBlLCBvZmZzZXQpO1xuICAgICAgfSxcbiAgICAgIGJsZW5kRnVuYyhzZmFjdG9yLCBkZmFjdG9yKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvYmxlbmRGdW5jKHUzMiwgdTMyKSA9PiB2b2lkXG4gICAgICAgIHNmYWN0b3IgPSBzZmFjdG9yID4+PiAwO1xuICAgICAgICBkZmFjdG9yID0gZGZhY3RvciA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLmJsZW5kRnVuYyhzZmFjdG9yLCBkZmFjdG9yKTtcbiAgICAgIH0sXG4gICAgICBjcmVhdGVTaGFkZXIodHlwZSkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2NyZWF0ZVNoYWRlcih1MzIpID0+IGV4dGVybnJlZlxuICAgICAgICB0eXBlID0gdHlwZSA+Pj4gMDtcbiAgICAgICAgcmV0dXJuIF9fbW9kdWxlMC5jcmVhdGVTaGFkZXIodHlwZSk7XG4gICAgICB9LFxuICAgICAgc2hhZGVyU291cmNlKHNoYWRlciwgc291cmNlKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvc2hhZGVyU291cmNlKGV4dGVybnJlZiwgfmxpYi9zdHJpbmcvU3RyaW5nKSA9PiB2b2lkXG4gICAgICAgIHNvdXJjZSA9IF9fbGlmdFN0cmluZyhzb3VyY2UgPj4+IDApO1xuICAgICAgICBfX21vZHVsZTAuc2hhZGVyU291cmNlKHNoYWRlciwgc291cmNlKTtcbiAgICAgIH0sXG4gICAgICBnZXRTaGFkZXJQYXJhbWV0ZXJfXzEoc2hhZGVyLCBwbmFtZSkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2dldFNoYWRlclBhcmFtZXRlcl9fMShleHRlcm5yZWYsIHUzMikgPT4gYm9vbFxuICAgICAgICBwbmFtZSA9IHBuYW1lID4+PiAwO1xuICAgICAgICByZXR1cm4gX19tb2R1bGUwLmdldFNoYWRlclBhcmFtZXRlcl9fMShzaGFkZXIsIHBuYW1lKSA/IDEgOiAwO1xuICAgICAgfSxcbiAgICAgIGdldFNoYWRlckluZm9Mb2coc2hhZGVyKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvZ2V0U2hhZGVySW5mb0xvZyhleHRlcm5yZWYpID0+IH5saWIvc3RyaW5nL1N0cmluZ1xuICAgICAgICByZXR1cm4gX19sb3dlclN0cmluZyhfX21vZHVsZTAuZ2V0U2hhZGVySW5mb0xvZyhzaGFkZXIpKSB8fCBfX25vdG51bGwoKTtcbiAgICAgIH0sXG4gICAgICB0cmFuc2Zvcm1GZWVkYmFja1ZhcnlpbmdzKHByb2dyYW0sIHZhcnlpbmdzLCBidWZmZXJNb2RlKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvdHJhbnNmb3JtRmVlZGJhY2tWYXJ5aW5ncyhleHRlcm5yZWYsIH5saWIvYXJyYXkvQXJyYXk8fmxpYi9zdHJpbmcvU3RyaW5nPiwgdTMyKSA9PiB2b2lkXG4gICAgICAgIHZhcnlpbmdzID0gX19saWZ0QXJyYXkocG9pbnRlciA9PiBfX2xpZnRTdHJpbmcobmV3IFVpbnQzMkFycmF5KG1lbW9yeS5idWZmZXIpW3BvaW50ZXIgPj4+IDJdKSwgMiwgdmFyeWluZ3MgPj4+IDApO1xuICAgICAgICBidWZmZXJNb2RlID0gYnVmZmVyTW9kZSA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLnRyYW5zZm9ybUZlZWRiYWNrVmFyeWluZ3MocHJvZ3JhbSwgdmFyeWluZ3MsIGJ1ZmZlck1vZGUpO1xuICAgICAgfSxcbiAgICAgIGdldFByb2dyYW1QYXJhbWV0ZXJfXzEocHJvZ3JhbSwgcG5hbWUpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9nZXRQcm9ncmFtUGFyYW1ldGVyX18xKGV4dGVybnJlZiwgdTMyKSA9PiBib29sXG4gICAgICAgIHBuYW1lID0gcG5hbWUgPj4+IDA7XG4gICAgICAgIHJldHVybiBfX21vZHVsZTAuZ2V0UHJvZ3JhbVBhcmFtZXRlcl9fMShwcm9ncmFtLCBwbmFtZSkgPyAxIDogMDtcbiAgICAgIH0sXG4gICAgICBnZXRQcm9ncmFtSW5mb0xvZyhwcm9ncmFtKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvZ2V0UHJvZ3JhbUluZm9Mb2coZXh0ZXJucmVmKSA9PiB+bGliL3N0cmluZy9TdHJpbmdcbiAgICAgICAgcmV0dXJuIF9fbG93ZXJTdHJpbmcoX19tb2R1bGUwLmdldFByb2dyYW1JbmZvTG9nKHByb2dyYW0pKSB8fCBfX25vdG51bGwoKTtcbiAgICAgIH0sXG4gICAgICBidWZmZXJEYXRhX18zKHRhcmdldCwgc3JjRGF0YSwgdXNhZ2UpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9idWZmZXJEYXRhX18zKHUzMiwgfmxpYi90eXBlZGFycmF5L0Zsb2F0MzJBcnJheSwgdTMyKSA9PiB2b2lkXG4gICAgICAgIHRhcmdldCA9IHRhcmdldCA+Pj4gMDtcbiAgICAgICAgc3JjRGF0YSA9IF9fbGlmdFR5cGVkQXJyYXkoRmxvYXQzMkFycmF5LCBzcmNEYXRhID4+PiAwKTtcbiAgICAgICAgdXNhZ2UgPSB1c2FnZSA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLmJ1ZmZlckRhdGFfXzModGFyZ2V0LCBzcmNEYXRhLCB1c2FnZSk7XG4gICAgICB9LFxuICAgICAgYnVmZmVyRGF0YV9fNCh0YXJnZXQsIHNyY0RhdGEsIHVzYWdlKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvYnVmZmVyRGF0YV9fNCh1MzIsIH5saWIvdHlwZWRhcnJheS9VaW50OEFycmF5LCB1MzIpID0+IHZvaWRcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0ID4+PiAwO1xuICAgICAgICBzcmNEYXRhID0gX19saWZ0VHlwZWRBcnJheShVaW50OEFycmF5LCBzcmNEYXRhID4+PiAwKTtcbiAgICAgICAgdXNhZ2UgPSB1c2FnZSA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLmJ1ZmZlckRhdGFfXzQodGFyZ2V0LCBzcmNEYXRhLCB1c2FnZSk7XG4gICAgICB9LFxuICAgICAgZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgbmFtZSkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2dldEF0dHJpYkxvY2F0aW9uKGV4dGVybnJlZiwgfmxpYi9zdHJpbmcvU3RyaW5nKSA9PiBpMzJcbiAgICAgICAgbmFtZSA9IF9fbGlmdFN0cmluZyhuYW1lID4+PiAwKTtcbiAgICAgICAgcmV0dXJuIF9fbW9kdWxlMC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCBuYW1lKTtcbiAgICAgIH0sXG4gICAgICBlbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShpbmRleCkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2VuYWJsZVZlcnRleEF0dHJpYkFycmF5KHUzMikgPT4gdm9pZFxuICAgICAgICBpbmRleCA9IGluZGV4ID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoaW5kZXgpO1xuICAgICAgfSxcbiAgICAgIHZlcnRleEF0dHJpYlBvaW50ZXIoaW5kZXgsIHNpemUsIHR5cGUsIG5vcm1hbGl6ZWQsIHN0cmlkZSwgb2Zmc2V0KSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvdmVydGV4QXR0cmliUG9pbnRlcih1MzIsIGkzMiwgdTMyLCBib29sLCBpMzIsIGkzMikgPT4gdm9pZFxuICAgICAgICBpbmRleCA9IGluZGV4ID4+PiAwO1xuICAgICAgICB0eXBlID0gdHlwZSA+Pj4gMDtcbiAgICAgICAgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZWQgIT0gMDtcbiAgICAgICAgX19tb2R1bGUwLnZlcnRleEF0dHJpYlBvaW50ZXIoaW5kZXgsIHNpemUsIHR5cGUsIG5vcm1hbGl6ZWQsIHN0cmlkZSwgb2Zmc2V0KTtcbiAgICAgIH0sXG4gICAgICB2ZXJ0ZXhBdHRyaWJEaXZpc29yKGluZGV4LCBkaXZpc29yKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvdmVydGV4QXR0cmliRGl2aXNvcih1MzIsIHUzMikgPT4gdm9pZFxuICAgICAgICBpbmRleCA9IGluZGV4ID4+PiAwO1xuICAgICAgICBkaXZpc29yID0gZGl2aXNvciA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLnZlcnRleEF0dHJpYkRpdmlzb3IoaW5kZXgsIGRpdmlzb3IpO1xuICAgICAgfSxcbiAgICAgIGJ1ZmZlckRhdGFfXzUodGFyZ2V0LCBzcmNEYXRhLCB1c2FnZSkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2J1ZmZlckRhdGFfXzUodTMyLCB+bGliL3R5cGVkYXJyYXkvVWludDE2QXJyYXksIHUzMikgPT4gdm9pZFxuICAgICAgICB0YXJnZXQgPSB0YXJnZXQgPj4+IDA7XG4gICAgICAgIHNyY0RhdGEgPSBfX2xpZnRUeXBlZEFycmF5KFVpbnQxNkFycmF5LCBzcmNEYXRhID4+PiAwKTtcbiAgICAgICAgdXNhZ2UgPSB1c2FnZSA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLmJ1ZmZlckRhdGFfXzUodGFyZ2V0LCBzcmNEYXRhLCB1c2FnZSk7XG4gICAgICB9LFxuICAgICAgYmluZEJ1ZmZlckJhc2UodGFyZ2V0LCBpbmRleCwgYnVmZmVyKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvYmluZEJ1ZmZlckJhc2UodTMyLCB1MzIsIGV4dGVybnJlZikgPT4gdm9pZFxuICAgICAgICB0YXJnZXQgPSB0YXJnZXQgPj4+IDA7XG4gICAgICAgIGluZGV4ID0gaW5kZXggPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC5iaW5kQnVmZmVyQmFzZSh0YXJnZXQsIGluZGV4LCBidWZmZXIpO1xuICAgICAgfSxcbiAgICAgIGdldFVuaWZvcm1CbG9ja0luZGV4KHByb2dyYW0sIHVuaWZvcm1CbG9ja05hbWUpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9nZXRVbmlmb3JtQmxvY2tJbmRleChleHRlcm5yZWYsIH5saWIvc3RyaW5nL1N0cmluZykgPT4gdTMyXG4gICAgICAgIHVuaWZvcm1CbG9ja05hbWUgPSBfX2xpZnRTdHJpbmcodW5pZm9ybUJsb2NrTmFtZSA+Pj4gMCk7XG4gICAgICAgIHJldHVybiBfX21vZHVsZTAuZ2V0VW5pZm9ybUJsb2NrSW5kZXgocHJvZ3JhbSwgdW5pZm9ybUJsb2NrTmFtZSk7XG4gICAgICB9LFxuICAgICAgZ2V0QWN0aXZlVW5pZm9ybUJsb2NrUGFyYW1ldGVyX18xKHByb2dyYW0sIHVuaWZvcm1CbG9ja0luZGV4LCBwbmFtZSkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2dldEFjdGl2ZVVuaWZvcm1CbG9ja1BhcmFtZXRlcl9fMShleHRlcm5yZWYsIHUzMiwgdTMyKSA9PiB1MzJcbiAgICAgICAgdW5pZm9ybUJsb2NrSW5kZXggPSB1bmlmb3JtQmxvY2tJbmRleCA+Pj4gMDtcbiAgICAgICAgcG5hbWUgPSBwbmFtZSA+Pj4gMDtcbiAgICAgICAgcmV0dXJuIF9fbW9kdWxlMC5nZXRBY3RpdmVVbmlmb3JtQmxvY2tQYXJhbWV0ZXJfXzEocHJvZ3JhbSwgdW5pZm9ybUJsb2NrSW5kZXgsIHBuYW1lKTtcbiAgICAgIH0sXG4gICAgICBidWZmZXJEYXRhX18xKHRhcmdldCwgc2l6ZSwgdXNhZ2UpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9idWZmZXJEYXRhX18xKHUzMiwgdTMyLCB1MzIpID0+IHZvaWRcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0ID4+PiAwO1xuICAgICAgICBzaXplID0gc2l6ZSA+Pj4gMDtcbiAgICAgICAgdXNhZ2UgPSB1c2FnZSA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLmJ1ZmZlckRhdGFfXzEodGFyZ2V0LCBzaXplLCB1c2FnZSk7XG4gICAgICB9LFxuICAgICAgZ2V0VW5pZm9ybUluZGljZXMocHJvZ3JhbSwgdW5pZm9ybU5hbWVzKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvZ2V0VW5pZm9ybUluZGljZXMoZXh0ZXJucmVmLCB+bGliL2FycmF5L0FycmF5PH5saWIvc3RyaW5nL1N0cmluZz4pID0+IH5saWIvYXJyYXkvQXJyYXk8dTMyPlxuICAgICAgICB1bmlmb3JtTmFtZXMgPSBfX2xpZnRBcnJheShwb2ludGVyID0+IF9fbGlmdFN0cmluZyhuZXcgVWludDMyQXJyYXkobWVtb3J5LmJ1ZmZlcilbcG9pbnRlciA+Pj4gMl0pLCAyLCB1bmlmb3JtTmFtZXMgPj4+IDApO1xuICAgICAgICByZXR1cm4gX19sb3dlckFycmF5KChwb2ludGVyLCB2YWx1ZSkgPT4geyBuZXcgVWludDMyQXJyYXkobWVtb3J5LmJ1ZmZlcilbcG9pbnRlciA+Pj4gMl0gPSB2YWx1ZTsgfSwgODAsIDIsIF9fbW9kdWxlMC5nZXRVbmlmb3JtSW5kaWNlcyhwcm9ncmFtLCB1bmlmb3JtTmFtZXMpKSB8fCBfX25vdG51bGwoKTtcbiAgICAgIH0sXG4gICAgICBnZXRBY3RpdmVVbmlmb3Jtc19fMShwcm9ncmFtLCB1bmlmb3JtSW5kaWNlcywgcG5hbWUpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9nZXRBY3RpdmVVbmlmb3Jtc19fMShleHRlcm5yZWYsIH5saWIvYXJyYXkvQXJyYXk8dTMyPiwgdTMyKSA9PiB+bGliL2FycmF5L0FycmF5PHUzMj5cbiAgICAgICAgdW5pZm9ybUluZGljZXMgPSBfX2xpZnRBcnJheShwb2ludGVyID0+IG5ldyBVaW50MzJBcnJheShtZW1vcnkuYnVmZmVyKVtwb2ludGVyID4+PiAyXSwgMiwgdW5pZm9ybUluZGljZXMgPj4+IDApO1xuICAgICAgICBwbmFtZSA9IHBuYW1lID4+PiAwO1xuICAgICAgICByZXR1cm4gX19sb3dlckFycmF5KChwb2ludGVyLCB2YWx1ZSkgPT4geyBuZXcgVWludDMyQXJyYXkobWVtb3J5LmJ1ZmZlcilbcG9pbnRlciA+Pj4gMl0gPSB2YWx1ZTsgfSwgODAsIDIsIF9fbW9kdWxlMC5nZXRBY3RpdmVVbmlmb3Jtc19fMShwcm9ncmFtLCB1bmlmb3JtSW5kaWNlcywgcG5hbWUpKSB8fCBfX25vdG51bGwoKTtcbiAgICAgIH0sXG4gICAgICB1bmlmb3JtQmxvY2tCaW5kaW5nKHByb2dyYW0sIHVuaWZvcm1CbG9ja0luZGV4LCB1bmlmb3JtQmxvY2tCaW5kaW5nKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvdW5pZm9ybUJsb2NrQmluZGluZyhleHRlcm5yZWYsIHUzMiwgdTMyKSA9PiB2b2lkXG4gICAgICAgIHVuaWZvcm1CbG9ja0luZGV4ID0gdW5pZm9ybUJsb2NrSW5kZXggPj4+IDA7XG4gICAgICAgIHVuaWZvcm1CbG9ja0JpbmRpbmcgPSB1bmlmb3JtQmxvY2tCaW5kaW5nID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAudW5pZm9ybUJsb2NrQmluZGluZyhwcm9ncmFtLCB1bmlmb3JtQmxvY2tJbmRleCwgdW5pZm9ybUJsb2NrQmluZGluZyk7XG4gICAgICB9LFxuICAgICAgZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sIG5hbWUpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9nZXRVbmlmb3JtTG9jYXRpb24oZXh0ZXJucmVmLCB+bGliL3N0cmluZy9TdHJpbmcpID0+IGV4dGVybnJlZlxuICAgICAgICBuYW1lID0gX19saWZ0U3RyaW5nKG5hbWUgPj4+IDApO1xuICAgICAgICByZXR1cm4gX19tb2R1bGUwLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCBuYW1lKTtcbiAgICAgIH0sXG4gICAgICBhY3RpdmVUZXh0dXJlKHRleHR1cmUpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9hY3RpdmVUZXh0dXJlKHUzMikgPT4gdm9pZFxuICAgICAgICB0ZXh0dXJlID0gdGV4dHVyZSA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLmFjdGl2ZVRleHR1cmUodGV4dHVyZSk7XG4gICAgICB9LFxuICAgICAgYmluZFRleHR1cmUodGFyZ2V0LCB0ZXh0dXJlKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvYmluZFRleHR1cmUodTMyLCBleHRlcm5yZWYpID0+IHZvaWRcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0ID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAuYmluZFRleHR1cmUodGFyZ2V0LCB0ZXh0dXJlKTtcbiAgICAgIH0sXG4gICAgICB0ZXhJbWFnZTJEX182KHRhcmdldCwgbGV2ZWwsIGludGVybmFsZm9ybWF0LCB3aWR0aCwgaGVpZ2h0LCBib3JkZXIsIGZvcm1hdCwgdHlwZSwgcGl4ZWxzKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvdGV4SW1hZ2UyRF9fNih1MzIsIGkzMiwgaTMyLCBpMzIsIGkzMiwgaTMyLCB1MzIsIHUzMiwgfmxpYi90eXBlZGFycmF5L1VpbnQ4QXJyYXkpID0+IHZvaWRcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0ID4+PiAwO1xuICAgICAgICBmb3JtYXQgPSBmb3JtYXQgPj4+IDA7XG4gICAgICAgIHR5cGUgPSB0eXBlID4+PiAwO1xuICAgICAgICBwaXhlbHMgPSBfX2xpZnRUeXBlZEFycmF5KFVpbnQ4QXJyYXksIHBpeGVscyA+Pj4gMCk7XG4gICAgICAgIF9fbW9kdWxlMC50ZXhJbWFnZTJEX182KHRhcmdldCwgbGV2ZWwsIGludGVybmFsZm9ybWF0LCB3aWR0aCwgaGVpZ2h0LCBib3JkZXIsIGZvcm1hdCwgdHlwZSwgcGl4ZWxzKTtcbiAgICAgIH0sXG4gICAgICBnZW5lcmF0ZU1pcG1hcCh0YXJnZXQpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9nZW5lcmF0ZU1pcG1hcCh1MzIpID0+IHZvaWRcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0ID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAuZ2VuZXJhdGVNaXBtYXAodGFyZ2V0KTtcbiAgICAgIH0sXG4gICAgICB0ZXhQYXJhbWV0ZXJpKHRhcmdldCwgcG5hbWUsIHBhcmFtKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvdGV4UGFyYW1ldGVyaSh1MzIsIHUzMiwgaTMyKSA9PiB2b2lkXG4gICAgICAgIHRhcmdldCA9IHRhcmdldCA+Pj4gMDtcbiAgICAgICAgcG5hbWUgPSBwbmFtZSA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLnRleFBhcmFtZXRlcmkodGFyZ2V0LCBwbmFtZSwgcGFyYW0pO1xuICAgICAgfSxcbiAgICAgIHVuaWZvcm0xZnYobG9jYXRpb24sIGRhdGEsIHNyY09mZnNldCwgc3JjTGVuZ3RoKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvdW5pZm9ybTFmdihleHRlcm5yZWYsIH5saWIvdHlwZWRhcnJheS9GbG9hdDMyQXJyYXksIHUzMj8sIHUzMj8pID0+IHZvaWRcbiAgICAgICAgZGF0YSA9IF9fbGlmdFR5cGVkQXJyYXkoRmxvYXQzMkFycmF5LCBkYXRhID4+PiAwKTtcbiAgICAgICAgc3JjT2Zmc2V0ID0gc3JjT2Zmc2V0ID4+PiAwO1xuICAgICAgICBzcmNMZW5ndGggPSBzcmNMZW5ndGggPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC51bmlmb3JtMWZ2KGxvY2F0aW9uLCBkYXRhLCBzcmNPZmZzZXQsIHNyY0xlbmd0aCk7XG4gICAgICB9LFxuICAgICAgdW5pZm9ybTJmdihsb2NhdGlvbiwgZGF0YSwgc3JjT2Zmc2V0LCBzcmNMZW5ndGgpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy91bmlmb3JtMmZ2KGV4dGVybnJlZiwgfmxpYi90eXBlZGFycmF5L0Zsb2F0MzJBcnJheSwgdTMyPywgdTMyPykgPT4gdm9pZFxuICAgICAgICBkYXRhID0gX19saWZ0VHlwZWRBcnJheShGbG9hdDMyQXJyYXksIGRhdGEgPj4+IDApO1xuICAgICAgICBzcmNPZmZzZXQgPSBzcmNPZmZzZXQgPj4+IDA7XG4gICAgICAgIHNyY0xlbmd0aCA9IHNyY0xlbmd0aCA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLnVuaWZvcm0yZnYobG9jYXRpb24sIGRhdGEsIHNyY09mZnNldCwgc3JjTGVuZ3RoKTtcbiAgICAgIH0sXG4gICAgICB1bmlmb3JtM2Z2KGxvY2F0aW9uLCBkYXRhLCBzcmNPZmZzZXQsIHNyY0xlbmd0aCkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL3VuaWZvcm0zZnYoZXh0ZXJucmVmLCB+bGliL3R5cGVkYXJyYXkvRmxvYXQzMkFycmF5LCB1MzI/LCB1MzI/KSA9PiB2b2lkXG4gICAgICAgIGRhdGEgPSBfX2xpZnRUeXBlZEFycmF5KEZsb2F0MzJBcnJheSwgZGF0YSA+Pj4gMCk7XG4gICAgICAgIHNyY09mZnNldCA9IHNyY09mZnNldCA+Pj4gMDtcbiAgICAgICAgc3JjTGVuZ3RoID0gc3JjTGVuZ3RoID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAudW5pZm9ybTNmdihsb2NhdGlvbiwgZGF0YSwgc3JjT2Zmc2V0LCBzcmNMZW5ndGgpO1xuICAgICAgfSxcbiAgICAgIHVuaWZvcm00ZnYobG9jYXRpb24sIGRhdGEsIHNyY09mZnNldCwgc3JjTGVuZ3RoKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvdW5pZm9ybTRmdihleHRlcm5yZWYsIH5saWIvdHlwZWRhcnJheS9GbG9hdDMyQXJyYXksIHUzMj8sIHUzMj8pID0+IHZvaWRcbiAgICAgICAgZGF0YSA9IF9fbGlmdFR5cGVkQXJyYXkoRmxvYXQzMkFycmF5LCBkYXRhID4+PiAwKTtcbiAgICAgICAgc3JjT2Zmc2V0ID0gc3JjT2Zmc2V0ID4+PiAwO1xuICAgICAgICBzcmNMZW5ndGggPSBzcmNMZW5ndGggPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC51bmlmb3JtNGZ2KGxvY2F0aW9uLCBkYXRhLCBzcmNPZmZzZXQsIHNyY0xlbmd0aCk7XG4gICAgICB9LFxuICAgICAgdW5pZm9ybU1hdHJpeDRmdihsb2NhdGlvbiwgdHJhbnNwb3NlLCBkYXRhLCBzcmNPZmZzZXQsIHNyY0xlbmd0aCkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL3VuaWZvcm1NYXRyaXg0ZnYoZXh0ZXJucmVmLCBib29sLCB+bGliL3R5cGVkYXJyYXkvRmxvYXQzMkFycmF5LCB1MzI/LCB1MzI/KSA9PiB2b2lkXG4gICAgICAgIHRyYW5zcG9zZSA9IHRyYW5zcG9zZSAhPSAwO1xuICAgICAgICBkYXRhID0gX19saWZ0VHlwZWRBcnJheShGbG9hdDMyQXJyYXksIGRhdGEgPj4+IDApO1xuICAgICAgICBzcmNPZmZzZXQgPSBzcmNPZmZzZXQgPj4+IDA7XG4gICAgICAgIHNyY0xlbmd0aCA9IHNyY0xlbmd0aCA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLnVuaWZvcm1NYXRyaXg0ZnYobG9jYXRpb24sIHRyYW5zcG9zZSwgZGF0YSwgc3JjT2Zmc2V0LCBzcmNMZW5ndGgpO1xuICAgICAgfSxcbiAgICB9KSxcbiAgICBob3N0OiBPYmplY3QuYXNzaWduKE9iamVjdC5jcmVhdGUoX19tb2R1bGUxKSwge1xuICAgICAgZ2V0KGlkKSB7XG4gICAgICAgIC8vIHNyYy1hcy9pbXBvcnRzL19ob3N0L2dldCh1MzIpID0+IGV4dGVybnJlZlxuICAgICAgICBpZCA9IGlkID4+PiAwO1xuICAgICAgICByZXR1cm4gX19tb2R1bGUxLmdldChpZCk7XG4gICAgICB9LFxuICAgIH0pLFxuICB9O1xuICBjb25zdCB7IGV4cG9ydHMgfSA9IGF3YWl0IFdlYkFzc2VtYmx5Lmluc3RhbnRpYXRlKG1vZHVsZSwgYWRhcHRlZEltcG9ydHMpO1xuICBjb25zdCBtZW1vcnkgPSBleHBvcnRzLm1lbW9yeSB8fCBpbXBvcnRzLmVudi5tZW1vcnk7XG4gIGNvbnN0IGFkYXB0ZWRFeHBvcnRzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mKHtcbiAgICBkZWZhdWx0V29ybGQoKSB7XG4gICAgICAvLyBzcmMtYXMvZXhwb3J0cy9tYWluRmFjdG9yaWVzL2RlZmF1bHRXb3JsZCgpID0+IHNyYy1hcy9iYXNlL1dvcmxkL1dvcmxkXG4gICAgICByZXR1cm4gX19saWZ0SW50ZXJucmVmKGV4cG9ydHMuZGVmYXVsdFdvcmxkKCkgPj4+IDApO1xuICAgIH0sXG4gICAgZGVmYXVsdENhbWVyYSgpIHtcbiAgICAgIC8vIHNyYy1hcy9leHBvcnRzL2NhbWVyYUZhY3Rvcmllcy9kZWZhdWx0Q2FtZXJhKCkgPT4gc3JjLWFzL2Jhc2UvRW50aXR5L0VudGl0eVxuICAgICAgcmV0dXJuIF9fbGlmdEludGVybnJlZihleHBvcnRzLmRlZmF1bHRDYW1lcmEoKSA+Pj4gMCk7XG4gICAgfSxcbiAgICByb3RhdGluZ0N1YmUoX3NoYWRlcikge1xuICAgICAgLy8gc3JjLWFzL2V4cG9ydHMvZGVtb3Mvcm90YXRpbmdDdWJlKHNyYy1hcy9yZW5kZXJpbmcvc2hhZGVyL1NoYWRlci9TaGFkZXIgfCBudWxsKSA9PiBzcmMtYXMvYmFzZS9FbnRpdHkvRW50aXR5XG4gICAgICBfc2hhZGVyID0gX19sb3dlckludGVybnJlZihfc2hhZGVyKTtcbiAgICAgIHJldHVybiBfX2xpZnRJbnRlcm5yZWYoZXhwb3J0cy5yb3RhdGluZ0N1YmUoX3NoYWRlcikgPj4+IDApO1xuICAgIH0sXG4gICAgdW5saXRWZXJ0ZXhDb2xvclNoYWRlcjoge1xuICAgICAgLy8gc3JjLWFzL3JlbmRlcmluZy9zaGFkZXIvdW5saXQvdW5saXRWZXJ0ZXhDb2xvcnMvdW5saXRWZXJ0ZXhDb2xvclNoYWRlcjogc3JjLWFzL3JlbmRlcmluZy9zaGFkZXIvU2hhZGVyL1NoYWRlclxuICAgICAgdmFsdWVPZigpIHsgcmV0dXJuIHRoaXMudmFsdWU7IH0sXG4gICAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiBfX2xpZnRJbnRlcm5yZWYoZXhwb3J0cy51bmxpdFZlcnRleENvbG9yU2hhZGVyLnZhbHVlID4+PiAwKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGxpdFNoYWRlcjoge1xuICAgICAgLy8gc3JjLWFzL3JlbmRlcmluZy9zaGFkZXIvbGl0L2xpdFNoYWRlci9saXRTaGFkZXI6IHNyYy1hcy9yZW5kZXJpbmcvc2hhZGVyL1NoYWRlci9TaGFkZXJcbiAgICAgIHZhbHVlT2YoKSB7IHJldHVybiB0aGlzLnZhbHVlOyB9LFxuICAgICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gX19saWZ0SW50ZXJucmVmKGV4cG9ydHMubGl0U2hhZGVyLnZhbHVlID4+PiAwKTtcbiAgICAgIH1cbiAgICB9LFxuICB9LCBleHBvcnRzKTtcbiAgZnVuY3Rpb24gX19saWZ0U3RyaW5nKHBvaW50ZXIpIHtcbiAgICBpZiAoIXBvaW50ZXIpIHJldHVybiBudWxsO1xuICAgIGNvbnN0XG4gICAgICBlbmQgPSBwb2ludGVyICsgbmV3IFVpbnQzMkFycmF5KG1lbW9yeS5idWZmZXIpW3BvaW50ZXIgLSA0ID4+PiAyXSA+Pj4gMSxcbiAgICAgIG1lbW9yeVUxNiA9IG5ldyBVaW50MTZBcnJheShtZW1vcnkuYnVmZmVyKTtcbiAgICBsZXRcbiAgICAgIHN0YXJ0ID0gcG9pbnRlciA+Pj4gMSxcbiAgICAgIHN0cmluZyA9IFwiXCI7XG4gICAgd2hpbGUgKGVuZCAtIHN0YXJ0ID4gMTAyNCkgc3RyaW5nICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoLi4ubWVtb3J5VTE2LnN1YmFycmF5KHN0YXJ0LCBzdGFydCArPSAxMDI0KSk7XG4gICAgcmV0dXJuIHN0cmluZyArIFN0cmluZy5mcm9tQ2hhckNvZGUoLi4ubWVtb3J5VTE2LnN1YmFycmF5KHN0YXJ0LCBlbmQpKTtcbiAgfVxuICBmdW5jdGlvbiBfX2xvd2VyU3RyaW5nKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybiAwO1xuICAgIGNvbnN0XG4gICAgICBsZW5ndGggPSB2YWx1ZS5sZW5ndGgsXG4gICAgICBwb2ludGVyID0gZXhwb3J0cy5fX25ldyhsZW5ndGggPDwgMSwgMSkgPj4+IDAsXG4gICAgICBtZW1vcnlVMTYgPSBuZXcgVWludDE2QXJyYXkobWVtb3J5LmJ1ZmZlcik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkgbWVtb3J5VTE2Wyhwb2ludGVyID4+PiAxKSArIGldID0gdmFsdWUuY2hhckNvZGVBdChpKTtcbiAgICByZXR1cm4gcG9pbnRlcjtcbiAgfVxuICBmdW5jdGlvbiBfX2xpZnRBcnJheShsaWZ0RWxlbWVudCwgYWxpZ24sIHBvaW50ZXIpIHtcbiAgICBpZiAoIXBvaW50ZXIpIHJldHVybiBudWxsO1xuICAgIGNvbnN0XG4gICAgICBtZW1vcnlVMzIgPSBuZXcgVWludDMyQXJyYXkobWVtb3J5LmJ1ZmZlciksXG4gICAgICBkYXRhU3RhcnQgPSBtZW1vcnlVMzJbcG9pbnRlciArIDQgPj4+IDJdLFxuICAgICAgbGVuZ3RoID0gbWVtb3J5VTMyW3BvaW50ZXIgKyAxMiA+Pj4gMl0sXG4gICAgICB2YWx1ZXMgPSBuZXcgQXJyYXkobGVuZ3RoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB2YWx1ZXNbaV0gPSBsaWZ0RWxlbWVudChkYXRhU3RhcnQgKyAoaSA8PCBhbGlnbiA+Pj4gMCkpO1xuICAgIHJldHVybiB2YWx1ZXM7XG4gIH1cbiAgZnVuY3Rpb24gX19sb3dlckFycmF5KGxvd2VyRWxlbWVudCwgaWQsIGFsaWduLCB2YWx1ZXMpIHtcbiAgICBpZiAodmFsdWVzID09IG51bGwpIHJldHVybiAwO1xuICAgIGNvbnN0XG4gICAgICBsZW5ndGggPSB2YWx1ZXMubGVuZ3RoLFxuICAgICAgYnVmZmVyID0gZXhwb3J0cy5fX3BpbihleHBvcnRzLl9fbmV3KGxlbmd0aCA8PCBhbGlnbiwgMCkpID4+PiAwLFxuICAgICAgaGVhZGVyID0gZXhwb3J0cy5fX3BpbihleHBvcnRzLl9fbmV3KDE2LCBpZCkpID4+PiAwLFxuICAgICAgbWVtb3J5VTMyID0gbmV3IFVpbnQzMkFycmF5KG1lbW9yeS5idWZmZXIpO1xuICAgIG1lbW9yeVUzMltoZWFkZXIgKyAwID4+PiAyXSA9IGJ1ZmZlcjtcbiAgICBtZW1vcnlVMzJbaGVhZGVyICsgNCA+Pj4gMl0gPSBidWZmZXI7XG4gICAgbWVtb3J5VTMyW2hlYWRlciArIDggPj4+IDJdID0gbGVuZ3RoIDw8IGFsaWduO1xuICAgIG1lbW9yeVUzMltoZWFkZXIgKyAxMiA+Pj4gMl0gPSBsZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkgbG93ZXJFbGVtZW50KGJ1ZmZlciArIChpIDw8IGFsaWduID4+PiAwKSwgdmFsdWVzW2ldKTtcbiAgICBleHBvcnRzLl9fdW5waW4oYnVmZmVyKTtcbiAgICBleHBvcnRzLl9fdW5waW4oaGVhZGVyKTtcbiAgICByZXR1cm4gaGVhZGVyO1xuICB9XG4gIGZ1bmN0aW9uIF9fbGlmdFR5cGVkQXJyYXkoY29uc3RydWN0b3IsIHBvaW50ZXIpIHtcbiAgICBpZiAoIXBvaW50ZXIpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IG1lbW9yeVUzMiA9IG5ldyBVaW50MzJBcnJheShtZW1vcnkuYnVmZmVyKTtcbiAgICByZXR1cm4gbmV3IGNvbnN0cnVjdG9yKFxuICAgICAgbWVtb3J5LmJ1ZmZlcixcbiAgICAgIG1lbW9yeVUzMltwb2ludGVyICsgNCA+Pj4gMl0sXG4gICAgICBtZW1vcnlVMzJbcG9pbnRlciArIDggPj4+IDJdIC8gY29uc3RydWN0b3IuQllURVNfUEVSX0VMRU1FTlRcbiAgICApLnNsaWNlKCk7XG4gIH1cbiAgY29uc3QgcmVnaXN0cnkgPSBuZXcgRmluYWxpemF0aW9uUmVnaXN0cnkoX19yZWxlYXNlKTtcbiAgY2xhc3MgSW50ZXJucmVmIGV4dGVuZHMgTnVtYmVyIHt9XG4gIGZ1bmN0aW9uIF9fbGlmdEludGVybnJlZihwb2ludGVyKSB7XG4gICAgaWYgKCFwb2ludGVyKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBzZW50aW5lbCA9IG5ldyBJbnRlcm5yZWYoX19yZXRhaW4ocG9pbnRlcikpO1xuICAgIHJlZ2lzdHJ5LnJlZ2lzdGVyKHNlbnRpbmVsLCBwb2ludGVyKTtcbiAgICByZXR1cm4gc2VudGluZWw7XG4gIH1cbiAgZnVuY3Rpb24gX19sb3dlckludGVybnJlZih2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKSByZXR1cm4gMDtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBJbnRlcm5yZWYpIHJldHVybiB2YWx1ZS52YWx1ZU9mKCk7XG4gICAgdGhyb3cgVHlwZUVycm9yKFwiaW50ZXJucmVmIGV4cGVjdGVkXCIpO1xuICB9XG4gIGNvbnN0IHJlZmNvdW50cyA9IG5ldyBNYXAoKTtcbiAgZnVuY3Rpb24gX19yZXRhaW4ocG9pbnRlcikge1xuICAgIGlmIChwb2ludGVyKSB7XG4gICAgICBjb25zdCByZWZjb3VudCA9IHJlZmNvdW50cy5nZXQocG9pbnRlcik7XG4gICAgICBpZiAocmVmY291bnQpIHJlZmNvdW50cy5zZXQocG9pbnRlciwgcmVmY291bnQgKyAxKTtcbiAgICAgIGVsc2UgcmVmY291bnRzLnNldChleHBvcnRzLl9fcGluKHBvaW50ZXIpLCAxKTtcbiAgICB9XG4gICAgcmV0dXJuIHBvaW50ZXI7XG4gIH1cbiAgZnVuY3Rpb24gX19yZWxlYXNlKHBvaW50ZXIpIHtcbiAgICBpZiAocG9pbnRlcikge1xuICAgICAgY29uc3QgcmVmY291bnQgPSByZWZjb3VudHMuZ2V0KHBvaW50ZXIpO1xuICAgICAgaWYgKHJlZmNvdW50ID09PSAxKSBleHBvcnRzLl9fdW5waW4ocG9pbnRlciksIHJlZmNvdW50cy5kZWxldGUocG9pbnRlcik7XG4gICAgICBlbHNlIGlmIChyZWZjb3VudCkgcmVmY291bnRzLnNldChwb2ludGVyLCByZWZjb3VudCAtIDEpO1xuICAgICAgZWxzZSB0aHJvdyBFcnJvcihgaW52YWxpZCByZWZjb3VudCAnJHtyZWZjb3VudH0nIGZvciByZWZlcmVuY2UgJyR7cG9pbnRlcn0nYCk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIF9fbm90bnVsbCgpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoXCJ2YWx1ZSBtdXN0IG5vdCBiZSBudWxsXCIpO1xuICB9XG4gIHJldHVybiBhZGFwdGVkRXhwb3J0cztcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImV4cG9ydCAqIGZyb20gJy4vbG9hZGVyL0tvb3JhTG9hZGVyJyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==