"use strict";
(self["webpackChunkkoora"] = self["webpackChunkkoora"] || []).push([["main"],{

/***/ "./src/entry.ts":
/*!**********************!*\
  !*** ./src/entry.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _loader_KooraLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loader/KooraLoader */ "./src/loader/KooraLoader.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

// import './style.css'
const a = 2;
// console.log('hello', a)
function run(canvas, wasmLocation) {
    return __awaiter(this, void 0, void 0, function* () {
        const loader = new _loader_KooraLoader__WEBPACK_IMPORTED_MODULE_0__.KooraLoader(canvas);
        yield loader.load(wasmLocation);
        loader.start();
        return loader;
    });
}
//@ts-ignore
window.startKoora = (canvas) => {
    //@ts-ignore
    return run(canvas, '/wasm/debug.wasm');
};


/***/ }),

/***/ "./src/loader/GlueBase.ts":
/*!********************************!*\
  !*** ./src/loader/GlueBase.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GlueBase": () => (/* binding */ GlueBase)
/* harmony export */ });
class GlueBase {
    constructor(gl) {
        this.gl = gl;
    }
    init(wasmExports) {
        this.wasmExports = wasmExports;
    }
}


/***/ }),

/***/ "./src/loader/KooraLoader.ts":
/*!***********************************!*\
  !*** ./src/loader/KooraLoader.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KooraLoader": () => (/* binding */ KooraLoader)
/* harmony export */ });
/* unused harmony export initKoora */
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils/index.ts");
/* harmony import */ var _GlueBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GlueBase */ "./src/loader/GlueBase.ts");
/* harmony import */ var _kooraWasm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./kooraWasm */ "./src/loader/kooraWasm.ts");
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
    load(wasmUrl = '/debug.wasm') {
        return __awaiter(this, void 0, void 0, function* () {
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
            const wasmExports = yield _kooraWasm__WEBPACK_IMPORTED_MODULE_2__.kooraWasm.instantiate(wasmModule, wasmImports);
            for (const glue of this.glues)
                glue.init(wasmExports);
            return this;
        });
    }
    start() {
        this.wasmExports.start();
        this.renderGlue.resize();
        this.update = this.update.bind(this);
        requestAnimationFrame(this.update);
    }
    update() {
        this.wasmExports.update();
        requestAnimationFrame(this.update);
    }
    runOnce() {
        this.wasmExports.start();
        this.renderGlue.resize();
        this.wasmExports.update();
    }
}
const initKoora = (canvas) => __awaiter(void 0, void 0, void 0, function* () {
    //@type {HTMLCanvasElement}
});


/***/ }),

/***/ "./src/loader/RenderGlue.ts":
/*!**********************************!*\
  !*** ./src/loader/RenderGlue.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ "./src/loader/kooraWasm.ts":
/*!*********************************!*\
  !*** ./src/loader/kooraWasm.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "kooraWasm": () => (/* reexport module object */ _wasm_debug__WEBPACK_IMPORTED_MODULE_0__)
/* harmony export */ });
/* harmony import */ var _wasm_debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_wasm/debug */ "./src/_wasm/debug.js");




/***/ }),

/***/ "./src/utils/DebounceResizeObserver.ts":
/*!*********************************************!*\
  !*** ./src/utils/DebounceResizeObserver.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* unused harmony export DebounceResizeObserver */
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash.debounce */ "../../node_modules/lodash.debounce/index.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_0__);

const DebounceResizeObserver = (cb, delay = 1) => new ResizeObserver(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(cb, delay));


/***/ }),

/***/ "./src/utils/classUtils.ts":
/*!*********************************!*\
  !*** ./src/utils/classUtils.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
        ['texImage2D', 5],
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

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
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
      texImage2D__1(target, level, internalformat, width, height, border, format, type, pixels) {
        // src-as/WebGL2/imports/_types/texImage2D__1(u32, i32, i32, i32, i32, i32, u32, u32, ~lib/arraybuffer/ArrayBufferView) => void
        target = target >>> 0;
        format = format >>> 0;
        type = type >>> 0;
        pixels = __liftTypedArray(ArrayBufferView, pixels >>> 0);
        __module0.texImage2D__1(target, level, internalformat, width, height, border, format, type, pixels);
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
    defaultWorld() {
      // src-as/factories/mainFactories/defaultWorld() => src-as/base/World/World
      return __liftInternref(exports.defaultWorld() >>> 0);
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

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor-sync"], () => (__webpack_exec__("./src/entry.ts")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxrREFBa0Qsd0RBQXdEO0FBQzFHLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCx3REFBd0Q7QUFDMUcsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0EsVUFBVSxVQUFVO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsU0FBUyxtQkFBbUIsUUFBUTtBQUNoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2tvb3JhLy4vc3JjL2VudHJ5LnRzIiwid2VicGFjazovL2tvb3JhLy4vc3JjL2xvYWRlci9HbHVlQmFzZS50cyIsIndlYnBhY2s6Ly9rb29yYS8uL3NyYy9sb2FkZXIvS29vcmFMb2FkZXIudHMiLCJ3ZWJwYWNrOi8va29vcmEvLi9zcmMvbG9hZGVyL1JlbmRlckdsdWUudHMiLCJ3ZWJwYWNrOi8va29vcmEvLi9zcmMvbG9hZGVyL2tvb3JhV2FzbS50cyIsIndlYnBhY2s6Ly9rb29yYS8uL3NyYy91dGlscy9EZWJvdW5jZVJlc2l6ZU9ic2VydmVyLnRzIiwid2VicGFjazovL2tvb3JhLy4vc3JjL3V0aWxzL2NsYXNzVXRpbHMudHMiLCJ3ZWJwYWNrOi8va29vcmEvLi9zcmMvdXRpbHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8va29vcmEvLi9zcmMvX3dhc20vZGVidWcuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgS29vcmFMb2FkZXIgfSBmcm9tICcuL2xvYWRlci9Lb29yYUxvYWRlcidcbi8vIGltcG9ydCAnLi9zdHlsZS5jc3MnXG5jb25zdCBhOiBudW1iZXIgPSAyXG5cbi8vIGNvbnNvbGUubG9nKCdoZWxsbycsIGEpXG5cbmFzeW5jIGZ1bmN0aW9uIHJ1bihjYW52YXM/OiBIVE1MQ2FudmFzRWxlbWVudCwgd2FzbUxvY2F0aW9uPzogc3RyaW5nKXtcblx0Y29uc3QgbG9hZGVyID0gbmV3IEtvb3JhTG9hZGVyKGNhbnZhcylcblx0YXdhaXQgbG9hZGVyLmxvYWQod2FzbUxvY2F0aW9uKVxuXHRsb2FkZXIuc3RhcnQoKVxuXHRyZXR1cm4gbG9hZGVyXG59XG4vL0B0cy1pZ25vcmVcbndpbmRvdy5zdGFydEtvb3JhID0gKGNhbnZhcz86IEhUTUxDYW52YXNFbGVtZW50KSA9PiB7XG5cdC8vQHRzLWlnbm9yZVxuXHRyZXR1cm4gcnVuKGNhbnZhcywgJy93YXNtL2RlYnVnLndhc20nKVxufSIsImltcG9ydCB7IGtvb3JhRXhwb3J0cyB9IGZyb20gJy4va29vcmFXYXNtJ1xuXG5cblxuXG5cbmV4cG9ydCBjbGFzcyBHbHVlQmFzZXtcblxuXHRnbDogV2ViR0wyUmVuZGVyaW5nQ29udGV4dFxuXHR3YXNtRXhwb3J0czoga29vcmFFeHBvcnRzXG5cblx0Y29uc3RydWN0b3IoZ2wpe1xuXHRcdHRoaXMuZ2wgPSBnbFxuXHR9XG5cblx0aW5pdCh3YXNtRXhwb3J0cyl7XG5cdFx0dGhpcy53YXNtRXhwb3J0cyA9IHdhc21FeHBvcnRzXG5cdH1cblxufSIsImltcG9ydCB7IGFwcGx5R0xPdmVybG9hZHMsIGF1dG9CaW5kIH0gZnJvbSAnLi4vdXRpbHMnXG5pbXBvcnQgeyBHbHVlQmFzZSB9IGZyb20gJy4vR2x1ZUJhc2UnXG5pbXBvcnQgeyBrb29yYVdhc20gfSBmcm9tICcuL2tvb3JhV2FzbSdcbmltcG9ydCB7IFJlbmRlckdsdWUgfSBmcm9tICcuL1JlbmRlckdsdWUnXG5cblxuXG5jb25zdCBsaXN0ZW4gPSAoZ2wsIHZhbCkgPT4ge1xuXHRjb25zdCBmdW5jID0gZ2xbdmFsXVxuXHRnbFt2YWxdID0gKC4uLmFyZ3MpID0+IHtcblx0XHRjb25zb2xlLmxvZyhgJHt2YWx9IC0gYCwgYXJncylcblx0XHRmdW5jKC4uLmFyZ3MpXG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIEtvb3JhTG9hZGVyIGV4dGVuZHMgR2x1ZUJhc2V7XG5cblx0Z2x1ZXM6IEdsdWVCYXNlW10gPSBbXVxuXHRleHRlcm5JZDogbnVtYmVyID0gMFxuXHRleHRlcm5NYXA6IE1hcDxudW1iZXIsIGFueT4gPSBuZXcgTWFwKClcblxuXHRyZW5kZXJHbHVlOiBSZW5kZXJHbHVlXG5cdGNvbnN0cnVjdG9yKGNhbnZhcz86IEhUTUxDYW52YXNFbGVtZW50KXtcblx0XHRjYW52YXMgPz89IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdrb29yYS1jYW52YXMnKSBhcyBIVE1MQ2FudmFzRWxlbWVudFxuXHRcdGNhbnZhcyA/Pz0gZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKSlcblx0XHRjb25zdCBnbCA9IGNhbnZhcy5nZXRDb250ZXh0KCd3ZWJnbDInKVxuXHRcdHN1cGVyKGdsKVxuXHRcdGF1dG9CaW5kKGdsKVxuXHRcdGFwcGx5R0xPdmVybG9hZHMoZ2wpXG5cblx0XHR0aGlzLnJlbmRlckdsdWUgPSBuZXcgUmVuZGVyR2x1ZShnbCwgY2FudmFzKVxuXHRcdHRoaXMuZ2x1ZXMucHVzaCh0aGlzKVxuXHRcdHRoaXMuZ2x1ZXMucHVzaCh0aGlzLnJlbmRlckdsdWUpXG5cblx0XHQvL3plcm8gbWVhbnMgbnVsbFxuXHRcdHRoaXMuZXh0ZXJuTWFwLnNldCh0aGlzLmV4dGVybklkKyssIG51bGwpXG5cdH1cblx0ZXh0ZXJuU2V0KHZhbDogYW55KXtcblx0XHRpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0cmV0dXJuIDBcblx0XHRjb25zdCBpZCA9IHRoaXMuZXh0ZXJuSWQrK1xuXHRcdHRoaXMuZXh0ZXJuTWFwLnNldChpZCwgdmFsKVxuXHRcdHJldHVybiBpZFxuXHR9XG5cdGV4dGVybkdldChpZDogbnVtYmVyKXtcblx0XHRjb25zdCB2YWwgPSB0aGlzLmV4dGVybk1hcC5nZXQoaWQpXG5cdFx0Ly8gY29uc29sZS5kaXIodmFsKVxuXHRcdHJldHVybiB2YWxcblx0fVxuXHRleHRlcm5SZW1vdmUoaWQ6IG51bWJlcil7XG5cdFx0cmV0dXJuIHRoaXMuZXh0ZXJuTWFwLmRlbGV0ZShpZClcblx0fVxuXG5cdGFzeW5jIGxvYWQod2FzbVVybCA9ICcvZGVidWcud2FzbScpOiBQcm9taXNlPEtvb3JhTG9hZGVyPntcblx0XHRjb25zdCB3YXNtSW1wb3J0cyA9IHtcblx0XHRcdGdsOiB0aGlzLmdsLFxuXHRcdFx0aG9zdDoge1xuXHRcdFx0XHRsb2c6IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSksXG5cdFx0XHRcdGVsYXBzZWQ6IHBlcmZvcm1hbmNlLm5vdy5iaW5kKHBlcmZvcm1hbmNlKSxcblx0XHRcdFx0bm93OiBEYXRlLm5vdy5iaW5kKERhdGUpLFxuXHRcdFx0XHRzZXQ6IHRoaXMuZXh0ZXJuU2V0LmJpbmQodGhpcyksXG5cdFx0XHRcdGdldDogdGhpcy5leHRlcm5HZXQuYmluZCh0aGlzKSxcblx0XHRcdFx0cmVtb3ZlOiB0aGlzLmV4dGVyblJlbW92ZS5iaW5kKHRoaXMpXG5cdFx0XHR9LFxuXHRcdFx0ZW52OiB7fVxuXHRcdH1cblx0XHQvLyBjb25zb2xlLmRpcih3YXNtSW1wb3J0cylcblx0XHRjb25zdCB3YXNtTW9kdWxlID0gYXdhaXQgV2ViQXNzZW1ibHkuY29tcGlsZVN0cmVhbWluZyhmZXRjaCh3YXNtVXJsKSlcblx0XHRjb25zdCB3YXNtRXhwb3J0cyA9IGF3YWl0IGtvb3JhV2FzbS5pbnN0YW50aWF0ZSh3YXNtTW9kdWxlLCB3YXNtSW1wb3J0cylcblx0XHRmb3IgKGNvbnN0IGdsdWUgb2YgdGhpcy5nbHVlcylcblx0XHRcdGdsdWUuaW5pdCh3YXNtRXhwb3J0cylcblx0XHRcblx0XHRyZXR1cm4gdGhpc1xuXHR9XG5cdHN0YXJ0KCl7XG5cdFx0dGhpcy53YXNtRXhwb3J0cy5zdGFydCgpXG5cdFx0dGhpcy5yZW5kZXJHbHVlLnJlc2l6ZSgpXG5cdFx0dGhpcy51cGRhdGUgPSB0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpXG5cdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlKVxuXHR9XG5cdHVwZGF0ZSgpe1xuXHRcdHRoaXMud2FzbUV4cG9ydHMudXBkYXRlKClcblx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGUpXG5cdH1cblx0XG5cdHJ1bk9uY2UoKXtcblx0XHR0aGlzLndhc21FeHBvcnRzLnN0YXJ0KClcblx0XHR0aGlzLnJlbmRlckdsdWUucmVzaXplKClcblx0XHR0aGlzLndhc21FeHBvcnRzLnVwZGF0ZSgpXG5cdH1cblxufVxuXG5leHBvcnQgY29uc3QgaW5pdEtvb3JhID0gYXN5bmMoY2FudmFzPzogSFRNTENhbnZhc0VsZW1lbnQpID0+IHtcblx0Ly9AdHlwZSB7SFRNTENhbnZhc0VsZW1lbnR9XG5cbn0iLCJpbXBvcnQgeyBEZWJvdW5jZVJlc2l6ZU9ic2VydmVyIH0gZnJvbSAnLi4vdXRpbHMnXG5pbXBvcnQgeyBHbHVlQmFzZSB9IGZyb20gJy4vR2x1ZUJhc2UnXG5cbmV4cG9ydCBjbGFzcyBSZW5kZXJHbHVlIGV4dGVuZHMgR2x1ZUJhc2V7XG5cblx0Y2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudFxuXHRyZXNpemVPYnNlcnZlcjogRGVib3VuY2VSZXNpemVPYnNlcnZlclxuXG5cdGNvbnN0cnVjdG9yKGdsOiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0LCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KXtcblx0XHRzdXBlcihnbClcblx0XHR0aGlzLmNhbnZhcyA9IGNhbnZhc1xuXHRcdHRoaXMucmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIodGhpcy5yZXNpemUuYmluZCh0aGlzKSlcblx0XHR0aGlzLnJlc2l6ZU9ic2VydmVyLm9ic2VydmUodGhpcy5jYW52YXMucGFyZW50RWxlbWVudClcblx0fVxuXHRyZXNpemUoKXtcblx0XHRjb25zdCB3aWR0aCA9IHRoaXMuY2FudmFzLmNsaWVudFdpZHRoXG5cdFx0Y29uc3QgaGVpZ2h0ID0gdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0XG5cdFx0dGhpcy5jYW52YXMud2lkdGggPSB3aWR0aFxuXHRcdHRoaXMuY2FudmFzLmhlaWdodCA9IGhlaWdodFxuXHRcdHRoaXMud2FzbUV4cG9ydHM/LmhhbmRsZVJlc2l6ZSh3aWR0aCwgaGVpZ2h0KVxuXHRcdHRoaXMud2FzbUV4cG9ydHM/LnVwZGF0ZSgpXG5cdH1cbn0iLCJpbXBvcnQgKiBhcyBrb29yYVdhc20gZnJvbSAnLi4vX3dhc20vZGVidWcnXG5leHBvcnQgdHlwZSBrb29yYUV4cG9ydHMgPSB0eXBlb2Yga29vcmFXYXNtLl9fQWRhcHRlZEV4cG9ydHNcbmV4cG9ydCB7XG5cdGtvb3JhV2FzbVxufSIsIlxuaW1wb3J0IGRlYm91bmNlIGZyb20gJ2xvZGFzaC5kZWJvdW5jZSdcblxuZXhwb3J0IGNvbnN0IERlYm91bmNlUmVzaXplT2JzZXJ2ZXIgPSAoY2I6IFJlc2l6ZU9ic2VydmVyQ2FsbGJhY2ssIGRlbGF5ID0gMSkgPT4gXG5cdG5ldyBSZXNpemVPYnNlcnZlcihkZWJvdW5jZShjYiwgZGVsYXkpKVxuXG5leHBvcnQgdHlwZSBEZWJvdW5jZVJlc2l6ZU9ic2VydmVyID0gUmV0dXJuVHlwZTx0eXBlb2YgRGVib3VuY2VSZXNpemVPYnNlcnZlcj5cbiIsIlxuXG5cbmV4cG9ydCBjb25zdCBhdXRvQmluZCA9IChvYmo6IGFueSkgPT4ge1xuXHRmb3IgKGNvbnN0IGZpZWxkIGluIG9iail7XG5cdFx0aWYgKHR5cGVvZiBvYmpbZmllbGRdID09PSAnZnVuY3Rpb24nKVxuXHRcdFx0b2JqW2ZpZWxkXSA9IG9ialtmaWVsZF0uYmluZChvYmopXG5cdH1cbn1cblxuXG5leHBvcnQgY29uc3QgYXBwbHlHTE92ZXJsb2FkcyA9IChnbDogV2ViR0wyUmVuZGVyaW5nQ29udGV4dCkgPT4ge1xuXHRjb25zdCBnbE92ZXJsb2FkcyA9IFtcblx0XHRbJ2NvbXByZXNzZWRUZXhJbWFnZTNEJywgMl0sXG5cdFx0Wydjb21wcmVzc2VkVGV4U3ViSW1hZ2UzRCcsIDJdLFxuXHRcdFsnZ2V0QWN0aXZlVW5pZm9ybUJsb2NrUGFyYW1ldGVyJywgMl0sXG5cdFx0WydnZXRBY3RpdmVVbmlmb3JtcycsIDJdLFxuXHRcdFsndGV4SW1hZ2UzRCcsIDRdLFxuXHRcdFsndGV4U3ViSW1hZ2UzRCcsIDNdLFxuXHRcdFsnYnVmZmVyRGF0YScsIDddLFxuXHRcdFsnYnVmZmVyU3ViRGF0YScsIDJdLFxuXHRcdFsnY29tcHJlc3NlZFRleEltYWdlMkQnLCAyXSxcblx0XHRbJ2NvbXByZXNzZWRUZXhTdWJJbWFnZTJEJywgMl0sXG5cdFx0WydyZWFkUGl4ZWxzJywgM10sXG5cdFx0Wyd0ZXhJbWFnZTJEJywgNV0sXG5cdFx0Wyd0ZXhTdWJJbWFnZTJEJywgNV0sXG5cdFx0WydnZXRCdWZmZXJQYXJhbWV0ZXInLCAyXSxcblx0XHRbJ2dldFByb2dyYW1QYXJhbWV0ZXInLCAyXSxcblx0XHRbJ2dldFNoYWRlclBhcmFtZXRlcicsIDJdLFxuXHRdXG5cdGdsT3ZlcmxvYWRzLmZvckVhY2goKFtrZXksIGNvdW50XSkgPT4ge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKylcblx0XHRcdGdsW2Ake2tleX1fXyR7aSArIDF9YF0gPSBnbFtrZXldXG5cdH0pXG59IiwiZXhwb3J0ICogZnJvbSAnLi9EZWJvdW5jZVJlc2l6ZU9ic2VydmVyJ1xuZXhwb3J0ICogZnJvbSAnLi9jbGFzc1V0aWxzJyIsImV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbnN0YW50aWF0ZShtb2R1bGUsIGltcG9ydHMgPSB7fSkge1xuICBjb25zdCBfX21vZHVsZTAgPSBpbXBvcnRzLmdsO1xuICBjb25zdCBfX21vZHVsZTEgPSBpbXBvcnRzLmhvc3Q7XG4gIGNvbnN0IGFkYXB0ZWRJbXBvcnRzID0ge1xuICAgIGVudjogT2JqZWN0LmFzc2lnbihPYmplY3QuY3JlYXRlKGdsb2JhbFRoaXMpLCBpbXBvcnRzLmVudiB8fCB7fSwge1xuICAgICAgc2VlZCgpIHtcbiAgICAgICAgLy8gfmxpYi9idWlsdGlucy9zZWVkKCkgPT4gZjY0XG4gICAgICAgIHJldHVybiAoKCkgPT4ge1xuICAgICAgICAgIC8vIEBleHRlcm5hbC5qc1xuICAgICAgICAgIHJldHVybiBEYXRlLm5vdygpICogTWF0aC5yYW5kb20oKTtcbiAgICAgICAgfSkoKTtcbiAgICAgIH0sXG4gICAgICBhYm9ydChtZXNzYWdlLCBmaWxlTmFtZSwgbGluZU51bWJlciwgY29sdW1uTnVtYmVyKSB7XG4gICAgICAgIC8vIH5saWIvYnVpbHRpbnMvYWJvcnQofmxpYi9zdHJpbmcvU3RyaW5nIHwgbnVsbD8sIH5saWIvc3RyaW5nL1N0cmluZyB8IG51bGw/LCB1MzI/LCB1MzI/KSA9PiB2b2lkXG4gICAgICAgIG1lc3NhZ2UgPSBfX2xpZnRTdHJpbmcobWVzc2FnZSA+Pj4gMCk7XG4gICAgICAgIGZpbGVOYW1lID0gX19saWZ0U3RyaW5nKGZpbGVOYW1lID4+PiAwKTtcbiAgICAgICAgbGluZU51bWJlciA9IGxpbmVOdW1iZXIgPj4+IDA7XG4gICAgICAgIGNvbHVtbk51bWJlciA9IGNvbHVtbk51bWJlciA+Pj4gMDtcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICAvLyBAZXh0ZXJuYWwuanNcbiAgICAgICAgICB0aHJvdyBFcnJvcihgJHttZXNzYWdlfSBpbiAke2ZpbGVOYW1lfToke2xpbmVOdW1iZXJ9OiR7Y29sdW1uTnVtYmVyfWApO1xuICAgICAgICB9KSgpO1xuICAgICAgfSxcbiAgICB9KSxcbiAgICBnbDogT2JqZWN0LmFzc2lnbihPYmplY3QuY3JlYXRlKF9fbW9kdWxlMCksIHtcbiAgICAgIGNsZWFyKG1hc2spIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9jbGVhcih1MzIpID0+IHZvaWRcbiAgICAgICAgbWFzayA9IG1hc2sgPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC5jbGVhcihtYXNrKTtcbiAgICAgIH0sXG4gICAgICBjcmVhdGVTaGFkZXIodHlwZSkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2NyZWF0ZVNoYWRlcih1MzIpID0+IGV4dGVybnJlZlxuICAgICAgICB0eXBlID0gdHlwZSA+Pj4gMDtcbiAgICAgICAgcmV0dXJuIF9fbW9kdWxlMC5jcmVhdGVTaGFkZXIodHlwZSk7XG4gICAgICB9LFxuICAgICAgc2hhZGVyU291cmNlKHNoYWRlciwgc291cmNlKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvc2hhZGVyU291cmNlKGV4dGVybnJlZiwgfmxpYi9zdHJpbmcvU3RyaW5nKSA9PiB2b2lkXG4gICAgICAgIHNvdXJjZSA9IF9fbGlmdFN0cmluZyhzb3VyY2UgPj4+IDApO1xuICAgICAgICBfX21vZHVsZTAuc2hhZGVyU291cmNlKHNoYWRlciwgc291cmNlKTtcbiAgICAgIH0sXG4gICAgICBnZXRTaGFkZXJQYXJhbWV0ZXJfXzEoc2hhZGVyLCBwbmFtZSkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2dldFNoYWRlclBhcmFtZXRlcl9fMShleHRlcm5yZWYsIHUzMikgPT4gYm9vbFxuICAgICAgICBwbmFtZSA9IHBuYW1lID4+PiAwO1xuICAgICAgICByZXR1cm4gX19tb2R1bGUwLmdldFNoYWRlclBhcmFtZXRlcl9fMShzaGFkZXIsIHBuYW1lKSA/IDEgOiAwO1xuICAgICAgfSxcbiAgICAgIGdldFNoYWRlckluZm9Mb2coc2hhZGVyKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvZ2V0U2hhZGVySW5mb0xvZyhleHRlcm5yZWYpID0+IH5saWIvc3RyaW5nL1N0cmluZ1xuICAgICAgICByZXR1cm4gX19sb3dlclN0cmluZyhfX21vZHVsZTAuZ2V0U2hhZGVySW5mb0xvZyhzaGFkZXIpKSB8fCBfX25vdG51bGwoKTtcbiAgICAgIH0sXG4gICAgICB0cmFuc2Zvcm1GZWVkYmFja1ZhcnlpbmdzKHByb2dyYW0sIHZhcnlpbmdzLCBidWZmZXJNb2RlKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvdHJhbnNmb3JtRmVlZGJhY2tWYXJ5aW5ncyhleHRlcm5yZWYsIH5saWIvYXJyYXkvQXJyYXk8fmxpYi9zdHJpbmcvU3RyaW5nPiwgdTMyKSA9PiB2b2lkXG4gICAgICAgIHZhcnlpbmdzID0gX19saWZ0QXJyYXkocG9pbnRlciA9PiBfX2xpZnRTdHJpbmcobmV3IFVpbnQzMkFycmF5KG1lbW9yeS5idWZmZXIpW3BvaW50ZXIgPj4+IDJdKSwgMiwgdmFyeWluZ3MgPj4+IDApO1xuICAgICAgICBidWZmZXJNb2RlID0gYnVmZmVyTW9kZSA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLnRyYW5zZm9ybUZlZWRiYWNrVmFyeWluZ3MocHJvZ3JhbSwgdmFyeWluZ3MsIGJ1ZmZlck1vZGUpO1xuICAgICAgfSxcbiAgICAgIGdldFByb2dyYW1QYXJhbWV0ZXJfXzEocHJvZ3JhbSwgcG5hbWUpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9nZXRQcm9ncmFtUGFyYW1ldGVyX18xKGV4dGVybnJlZiwgdTMyKSA9PiBib29sXG4gICAgICAgIHBuYW1lID0gcG5hbWUgPj4+IDA7XG4gICAgICAgIHJldHVybiBfX21vZHVsZTAuZ2V0UHJvZ3JhbVBhcmFtZXRlcl9fMShwcm9ncmFtLCBwbmFtZSkgPyAxIDogMDtcbiAgICAgIH0sXG4gICAgICBnZXRQcm9ncmFtSW5mb0xvZyhwcm9ncmFtKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvZ2V0UHJvZ3JhbUluZm9Mb2coZXh0ZXJucmVmKSA9PiB+bGliL3N0cmluZy9TdHJpbmdcbiAgICAgICAgcmV0dXJuIF9fbG93ZXJTdHJpbmcoX19tb2R1bGUwLmdldFByb2dyYW1JbmZvTG9nKHByb2dyYW0pKSB8fCBfX25vdG51bGwoKTtcbiAgICAgIH0sXG4gICAgICBiaW5kQnVmZmVyKHRhcmdldCwgYnVmZmVyKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvYmluZEJ1ZmZlcih1MzIsIGV4dGVybnJlZikgPT4gdm9pZFxuICAgICAgICB0YXJnZXQgPSB0YXJnZXQgPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC5iaW5kQnVmZmVyKHRhcmdldCwgYnVmZmVyKTtcbiAgICAgIH0sXG4gICAgICBidWZmZXJEYXRhX18zKHRhcmdldCwgc3JjRGF0YSwgdXNhZ2UpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9idWZmZXJEYXRhX18zKHUzMiwgfmxpYi90eXBlZGFycmF5L0Zsb2F0MzJBcnJheSwgdTMyKSA9PiB2b2lkXG4gICAgICAgIHRhcmdldCA9IHRhcmdldCA+Pj4gMDtcbiAgICAgICAgc3JjRGF0YSA9IF9fbGlmdFR5cGVkQXJyYXkoRmxvYXQzMkFycmF5LCBzcmNEYXRhID4+PiAwKTtcbiAgICAgICAgdXNhZ2UgPSB1c2FnZSA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLmJ1ZmZlckRhdGFfXzModGFyZ2V0LCBzcmNEYXRhLCB1c2FnZSk7XG4gICAgICB9LFxuICAgICAgYnVmZmVyRGF0YV9fNCh0YXJnZXQsIHNyY0RhdGEsIHVzYWdlKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvYnVmZmVyRGF0YV9fNCh1MzIsIH5saWIvdHlwZWRhcnJheS9VaW50OEFycmF5LCB1MzIpID0+IHZvaWRcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0ID4+PiAwO1xuICAgICAgICBzcmNEYXRhID0gX19saWZ0VHlwZWRBcnJheShVaW50OEFycmF5LCBzcmNEYXRhID4+PiAwKTtcbiAgICAgICAgdXNhZ2UgPSB1c2FnZSA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLmJ1ZmZlckRhdGFfXzQodGFyZ2V0LCBzcmNEYXRhLCB1c2FnZSk7XG4gICAgICB9LFxuICAgICAgZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgbmFtZSkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2dldEF0dHJpYkxvY2F0aW9uKGV4dGVybnJlZiwgfmxpYi9zdHJpbmcvU3RyaW5nKSA9PiBpMzJcbiAgICAgICAgbmFtZSA9IF9fbGlmdFN0cmluZyhuYW1lID4+PiAwKTtcbiAgICAgICAgcmV0dXJuIF9fbW9kdWxlMC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCBuYW1lKTtcbiAgICAgIH0sXG4gICAgICBlbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShpbmRleCkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2VuYWJsZVZlcnRleEF0dHJpYkFycmF5KHUzMikgPT4gdm9pZFxuICAgICAgICBpbmRleCA9IGluZGV4ID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoaW5kZXgpO1xuICAgICAgfSxcbiAgICAgIHZlcnRleEF0dHJpYlBvaW50ZXIoaW5kZXgsIHNpemUsIHR5cGUsIG5vcm1hbGl6ZWQsIHN0cmlkZSwgb2Zmc2V0KSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvdmVydGV4QXR0cmliUG9pbnRlcih1MzIsIGkzMiwgdTMyLCBib29sLCBpMzIsIGkzMikgPT4gdm9pZFxuICAgICAgICBpbmRleCA9IGluZGV4ID4+PiAwO1xuICAgICAgICB0eXBlID0gdHlwZSA+Pj4gMDtcbiAgICAgICAgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZWQgIT0gMDtcbiAgICAgICAgX19tb2R1bGUwLnZlcnRleEF0dHJpYlBvaW50ZXIoaW5kZXgsIHNpemUsIHR5cGUsIG5vcm1hbGl6ZWQsIHN0cmlkZSwgb2Zmc2V0KTtcbiAgICAgIH0sXG4gICAgICB2ZXJ0ZXhBdHRyaWJEaXZpc29yKGluZGV4LCBkaXZpc29yKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvdmVydGV4QXR0cmliRGl2aXNvcih1MzIsIHUzMikgPT4gdm9pZFxuICAgICAgICBpbmRleCA9IGluZGV4ID4+PiAwO1xuICAgICAgICBkaXZpc29yID0gZGl2aXNvciA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLnZlcnRleEF0dHJpYkRpdmlzb3IoaW5kZXgsIGRpdmlzb3IpO1xuICAgICAgfSxcbiAgICAgIGJ1ZmZlckRhdGFfXzUodGFyZ2V0LCBzcmNEYXRhLCB1c2FnZSkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2J1ZmZlckRhdGFfXzUodTMyLCB+bGliL3R5cGVkYXJyYXkvVWludDE2QXJyYXksIHUzMikgPT4gdm9pZFxuICAgICAgICB0YXJnZXQgPSB0YXJnZXQgPj4+IDA7XG4gICAgICAgIHNyY0RhdGEgPSBfX2xpZnRUeXBlZEFycmF5KFVpbnQxNkFycmF5LCBzcmNEYXRhID4+PiAwKTtcbiAgICAgICAgdXNhZ2UgPSB1c2FnZSA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLmJ1ZmZlckRhdGFfXzUodGFyZ2V0LCBzcmNEYXRhLCB1c2FnZSk7XG4gICAgICB9LFxuICAgICAgYmluZFRyYW5zZm9ybUZlZWRiYWNrKHRhcmdldCwgdGYpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9iaW5kVHJhbnNmb3JtRmVlZGJhY2sodTMyLCBleHRlcm5yZWYpID0+IHZvaWRcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0ID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAuYmluZFRyYW5zZm9ybUZlZWRiYWNrKHRhcmdldCwgdGYpO1xuICAgICAgfSxcbiAgICAgIGJpbmRCdWZmZXJCYXNlKHRhcmdldCwgaW5kZXgsIGJ1ZmZlcikge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2JpbmRCdWZmZXJCYXNlKHUzMiwgdTMyLCBleHRlcm5yZWYpID0+IHZvaWRcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0ID4+PiAwO1xuICAgICAgICBpbmRleCA9IGluZGV4ID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAuYmluZEJ1ZmZlckJhc2UodGFyZ2V0LCBpbmRleCwgYnVmZmVyKTtcbiAgICAgIH0sXG4gICAgICBnZXRVbmlmb3JtQmxvY2tJbmRleChwcm9ncmFtLCB1bmlmb3JtQmxvY2tOYW1lKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvZ2V0VW5pZm9ybUJsb2NrSW5kZXgoZXh0ZXJucmVmLCB+bGliL3N0cmluZy9TdHJpbmcpID0+IHUzMlxuICAgICAgICB1bmlmb3JtQmxvY2tOYW1lID0gX19saWZ0U3RyaW5nKHVuaWZvcm1CbG9ja05hbWUgPj4+IDApO1xuICAgICAgICByZXR1cm4gX19tb2R1bGUwLmdldFVuaWZvcm1CbG9ja0luZGV4KHByb2dyYW0sIHVuaWZvcm1CbG9ja05hbWUpO1xuICAgICAgfSxcbiAgICAgIGdldEFjdGl2ZVVuaWZvcm1CbG9ja1BhcmFtZXRlcl9fMShwcm9ncmFtLCB1bmlmb3JtQmxvY2tJbmRleCwgcG5hbWUpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9nZXRBY3RpdmVVbmlmb3JtQmxvY2tQYXJhbWV0ZXJfXzEoZXh0ZXJucmVmLCB1MzIsIHUzMikgPT4gdTMyXG4gICAgICAgIHVuaWZvcm1CbG9ja0luZGV4ID0gdW5pZm9ybUJsb2NrSW5kZXggPj4+IDA7XG4gICAgICAgIHBuYW1lID0gcG5hbWUgPj4+IDA7XG4gICAgICAgIHJldHVybiBfX21vZHVsZTAuZ2V0QWN0aXZlVW5pZm9ybUJsb2NrUGFyYW1ldGVyX18xKHByb2dyYW0sIHVuaWZvcm1CbG9ja0luZGV4LCBwbmFtZSk7XG4gICAgICB9LFxuICAgICAgYnVmZmVyRGF0YV9fMSh0YXJnZXQsIHNpemUsIHVzYWdlKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvYnVmZmVyRGF0YV9fMSh1MzIsIHUzMiwgdTMyKSA9PiB2b2lkXG4gICAgICAgIHRhcmdldCA9IHRhcmdldCA+Pj4gMDtcbiAgICAgICAgc2l6ZSA9IHNpemUgPj4+IDA7XG4gICAgICAgIHVzYWdlID0gdXNhZ2UgPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC5idWZmZXJEYXRhX18xKHRhcmdldCwgc2l6ZSwgdXNhZ2UpO1xuICAgICAgfSxcbiAgICAgIGdldFVuaWZvcm1JbmRpY2VzKHByb2dyYW0sIHVuaWZvcm1OYW1lcykge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2dldFVuaWZvcm1JbmRpY2VzKGV4dGVybnJlZiwgfmxpYi9hcnJheS9BcnJheTx+bGliL3N0cmluZy9TdHJpbmc+KSA9PiB+bGliL2FycmF5L0FycmF5PHUzMj5cbiAgICAgICAgdW5pZm9ybU5hbWVzID0gX19saWZ0QXJyYXkocG9pbnRlciA9PiBfX2xpZnRTdHJpbmcobmV3IFVpbnQzMkFycmF5KG1lbW9yeS5idWZmZXIpW3BvaW50ZXIgPj4+IDJdKSwgMiwgdW5pZm9ybU5hbWVzID4+PiAwKTtcbiAgICAgICAgcmV0dXJuIF9fbG93ZXJBcnJheSgocG9pbnRlciwgdmFsdWUpID0+IHsgbmV3IFVpbnQzMkFycmF5KG1lbW9yeS5idWZmZXIpW3BvaW50ZXIgPj4+IDJdID0gdmFsdWU7IH0sIDgwLCAyLCBfX21vZHVsZTAuZ2V0VW5pZm9ybUluZGljZXMocHJvZ3JhbSwgdW5pZm9ybU5hbWVzKSkgfHwgX19ub3RudWxsKCk7XG4gICAgICB9LFxuICAgICAgZ2V0QWN0aXZlVW5pZm9ybXNfXzEocHJvZ3JhbSwgdW5pZm9ybUluZGljZXMsIHBuYW1lKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvZ2V0QWN0aXZlVW5pZm9ybXNfXzEoZXh0ZXJucmVmLCB+bGliL2FycmF5L0FycmF5PHUzMj4sIHUzMikgPT4gfmxpYi9hcnJheS9BcnJheTx1MzI+XG4gICAgICAgIHVuaWZvcm1JbmRpY2VzID0gX19saWZ0QXJyYXkocG9pbnRlciA9PiBuZXcgVWludDMyQXJyYXkobWVtb3J5LmJ1ZmZlcilbcG9pbnRlciA+Pj4gMl0sIDIsIHVuaWZvcm1JbmRpY2VzID4+PiAwKTtcbiAgICAgICAgcG5hbWUgPSBwbmFtZSA+Pj4gMDtcbiAgICAgICAgcmV0dXJuIF9fbG93ZXJBcnJheSgocG9pbnRlciwgdmFsdWUpID0+IHsgbmV3IFVpbnQzMkFycmF5KG1lbW9yeS5idWZmZXIpW3BvaW50ZXIgPj4+IDJdID0gdmFsdWU7IH0sIDgwLCAyLCBfX21vZHVsZTAuZ2V0QWN0aXZlVW5pZm9ybXNfXzEocHJvZ3JhbSwgdW5pZm9ybUluZGljZXMsIHBuYW1lKSkgfHwgX19ub3RudWxsKCk7XG4gICAgICB9LFxuICAgICAgdW5pZm9ybUJsb2NrQmluZGluZyhwcm9ncmFtLCB1bmlmb3JtQmxvY2tJbmRleCwgdW5pZm9ybUJsb2NrQmluZGluZykge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL3VuaWZvcm1CbG9ja0JpbmRpbmcoZXh0ZXJucmVmLCB1MzIsIHUzMikgPT4gdm9pZFxuICAgICAgICB1bmlmb3JtQmxvY2tJbmRleCA9IHVuaWZvcm1CbG9ja0luZGV4ID4+PiAwO1xuICAgICAgICB1bmlmb3JtQmxvY2tCaW5kaW5nID0gdW5pZm9ybUJsb2NrQmluZGluZyA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLnVuaWZvcm1CbG9ja0JpbmRpbmcocHJvZ3JhbSwgdW5pZm9ybUJsb2NrSW5kZXgsIHVuaWZvcm1CbG9ja0JpbmRpbmcpO1xuICAgICAgfSxcbiAgICAgIGdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCBuYW1lKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvZ2V0VW5pZm9ybUxvY2F0aW9uKGV4dGVybnJlZiwgfmxpYi9zdHJpbmcvU3RyaW5nKSA9PiBleHRlcm5yZWZcbiAgICAgICAgbmFtZSA9IF9fbGlmdFN0cmluZyhuYW1lID4+PiAwKTtcbiAgICAgICAgcmV0dXJuIF9fbW9kdWxlMC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgbmFtZSk7XG4gICAgICB9LFxuICAgICAgYWN0aXZlVGV4dHVyZSh0ZXh0dXJlKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvYWN0aXZlVGV4dHVyZSh1MzIpID0+IHZvaWRcbiAgICAgICAgdGV4dHVyZSA9IHRleHR1cmUgPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC5hY3RpdmVUZXh0dXJlKHRleHR1cmUpO1xuICAgICAgfSxcbiAgICAgIGJpbmRUZXh0dXJlKHRhcmdldCwgdGV4dHVyZSkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2JpbmRUZXh0dXJlKHUzMiwgZXh0ZXJucmVmKSA9PiB2b2lkXG4gICAgICAgIHRhcmdldCA9IHRhcmdldCA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLmJpbmRUZXh0dXJlKHRhcmdldCwgdGV4dHVyZSk7XG4gICAgICB9LFxuICAgICAgdGV4SW1hZ2UyRF9fMSh0YXJnZXQsIGxldmVsLCBpbnRlcm5hbGZvcm1hdCwgd2lkdGgsIGhlaWdodCwgYm9yZGVyLCBmb3JtYXQsIHR5cGUsIHBpeGVscykge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL3RleEltYWdlMkRfXzEodTMyLCBpMzIsIGkzMiwgaTMyLCBpMzIsIGkzMiwgdTMyLCB1MzIsIH5saWIvYXJyYXlidWZmZXIvQXJyYXlCdWZmZXJWaWV3KSA9PiB2b2lkXG4gICAgICAgIHRhcmdldCA9IHRhcmdldCA+Pj4gMDtcbiAgICAgICAgZm9ybWF0ID0gZm9ybWF0ID4+PiAwO1xuICAgICAgICB0eXBlID0gdHlwZSA+Pj4gMDtcbiAgICAgICAgcGl4ZWxzID0gX19saWZ0VHlwZWRBcnJheShBcnJheUJ1ZmZlclZpZXcsIHBpeGVscyA+Pj4gMCk7XG4gICAgICAgIF9fbW9kdWxlMC50ZXhJbWFnZTJEX18xKHRhcmdldCwgbGV2ZWwsIGludGVybmFsZm9ybWF0LCB3aWR0aCwgaGVpZ2h0LCBib3JkZXIsIGZvcm1hdCwgdHlwZSwgcGl4ZWxzKTtcbiAgICAgIH0sXG4gICAgICBnZW5lcmF0ZU1pcG1hcCh0YXJnZXQpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9nZW5lcmF0ZU1pcG1hcCh1MzIpID0+IHZvaWRcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0ID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAuZ2VuZXJhdGVNaXBtYXAodGFyZ2V0KTtcbiAgICAgIH0sXG4gICAgICB0ZXhQYXJhbWV0ZXJpKHRhcmdldCwgcG5hbWUsIHBhcmFtKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvdGV4UGFyYW1ldGVyaSh1MzIsIHUzMiwgaTMyKSA9PiB2b2lkXG4gICAgICAgIHRhcmdldCA9IHRhcmdldCA+Pj4gMDtcbiAgICAgICAgcG5hbWUgPSBwbmFtZSA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLnRleFBhcmFtZXRlcmkodGFyZ2V0LCBwbmFtZSwgcGFyYW0pO1xuICAgICAgfSxcbiAgICAgIGJ1ZmZlclN1YkRhdGFfXzIodGFyZ2V0LCBkc3RCeXRlT2Zmc2V0LCBzcmNEYXRhLCBzcmNPZmZzZXQsIGxlbmd0aCkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2J1ZmZlclN1YkRhdGFfXzIodTMyLCBpMzIsIH5saWIvdHlwZWRhcnJheS9GbG9hdDMyQXJyYXksIHUzMiwgdTMyPykgPT4gdm9pZFxuICAgICAgICB0YXJnZXQgPSB0YXJnZXQgPj4+IDA7XG4gICAgICAgIHNyY0RhdGEgPSBfX2xpZnRUeXBlZEFycmF5KEZsb2F0MzJBcnJheSwgc3JjRGF0YSA+Pj4gMCk7XG4gICAgICAgIHNyY09mZnNldCA9IHNyY09mZnNldCA+Pj4gMDtcbiAgICAgICAgbGVuZ3RoID0gbGVuZ3RoID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAuYnVmZmVyU3ViRGF0YV9fMih0YXJnZXQsIGRzdEJ5dGVPZmZzZXQsIHNyY0RhdGEsIHNyY09mZnNldCwgbGVuZ3RoKTtcbiAgICAgIH0sXG4gICAgICBlbmFibGUoY2FwKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvZW5hYmxlKHUzMikgPT4gdm9pZFxuICAgICAgICBjYXAgPSBjYXAgPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC5lbmFibGUoY2FwKTtcbiAgICAgIH0sXG4gICAgICBkZXB0aEZ1bmMoZnVuYykge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2RlcHRoRnVuYyh1MzIpID0+IHZvaWRcbiAgICAgICAgZnVuYyA9IGZ1bmMgPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC5kZXB0aEZ1bmMoZnVuYyk7XG4gICAgICB9LFxuICAgICAgZGlzYWJsZShjYXApIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9kaXNhYmxlKHUzMikgPT4gdm9pZFxuICAgICAgICBjYXAgPSBjYXAgPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC5kaXNhYmxlKGNhcCk7XG4gICAgICB9LFxuICAgICAgY3VsbEZhY2UobW9kZSkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2N1bGxGYWNlKHUzMikgPT4gdm9pZFxuICAgICAgICBtb2RlID0gbW9kZSA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLmN1bGxGYWNlKG1vZGUpO1xuICAgICAgfSxcbiAgICAgIGJlZ2luVHJhbnNmb3JtRmVlZGJhY2socHJpbWl0aXZlTW9kZSkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2JlZ2luVHJhbnNmb3JtRmVlZGJhY2sodTMyKSA9PiB2b2lkXG4gICAgICAgIHByaW1pdGl2ZU1vZGUgPSBwcmltaXRpdmVNb2RlID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAuYmVnaW5UcmFuc2Zvcm1GZWVkYmFjayhwcmltaXRpdmVNb2RlKTtcbiAgICAgIH0sXG4gICAgICBkcmF3QXJyYXlzKG1vZGUsIGZpcnN0LCBjb3VudCkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2RyYXdBcnJheXModTMyLCBpMzIsIGkzMikgPT4gdm9pZFxuICAgICAgICBtb2RlID0gbW9kZSA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLmRyYXdBcnJheXMobW9kZSwgZmlyc3QsIGNvdW50KTtcbiAgICAgIH0sXG4gICAgICBkcmF3RWxlbWVudHNJbnN0YW5jZWQobW9kZSwgY291bnQsIHR5cGUsIG9mZnNldCwgaW5zdGFuY2VDb3VudCkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2RyYXdFbGVtZW50c0luc3RhbmNlZCh1MzIsIGkzMiwgdTMyLCBpMzIsIGkzMikgPT4gdm9pZFxuICAgICAgICBtb2RlID0gbW9kZSA+Pj4gMDtcbiAgICAgICAgdHlwZSA9IHR5cGUgPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC5kcmF3RWxlbWVudHNJbnN0YW5jZWQobW9kZSwgY291bnQsIHR5cGUsIG9mZnNldCwgaW5zdGFuY2VDb3VudCk7XG4gICAgICB9LFxuICAgICAgZHJhd0FycmF5c0luc3RhbmNlZChtb2RlLCBmaXJzdCwgY291bnQsIGluc3RhbmNlQ291bnQpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9kcmF3QXJyYXlzSW5zdGFuY2VkKHUzMiwgaTMyLCBpMzIsIGkzMikgPT4gdm9pZFxuICAgICAgICBtb2RlID0gbW9kZSA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLmRyYXdBcnJheXNJbnN0YW5jZWQobW9kZSwgZmlyc3QsIGNvdW50LCBpbnN0YW5jZUNvdW50KTtcbiAgICAgIH0sXG4gICAgICBkcmF3RWxlbWVudHMobW9kZSwgY291bnQsIHR5cGUsIG9mZnNldCkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2RyYXdFbGVtZW50cyh1MzIsIGkzMiwgdTMyLCBpMzIpID0+IHZvaWRcbiAgICAgICAgbW9kZSA9IG1vZGUgPj4+IDA7XG4gICAgICAgIHR5cGUgPSB0eXBlID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAuZHJhd0VsZW1lbnRzKG1vZGUsIGNvdW50LCB0eXBlLCBvZmZzZXQpO1xuICAgICAgfSxcbiAgICAgIGJsZW5kRnVuYyhzZmFjdG9yLCBkZmFjdG9yKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvYmxlbmRGdW5jKHUzMiwgdTMyKSA9PiB2b2lkXG4gICAgICAgIHNmYWN0b3IgPSBzZmFjdG9yID4+PiAwO1xuICAgICAgICBkZmFjdG9yID0gZGZhY3RvciA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLmJsZW5kRnVuYyhzZmFjdG9yLCBkZmFjdG9yKTtcbiAgICAgIH0sXG4gICAgICB1bmlmb3JtMWZ2KGxvY2F0aW9uLCBkYXRhLCBzcmNPZmZzZXQsIHNyY0xlbmd0aCkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL3VuaWZvcm0xZnYoZXh0ZXJucmVmLCB+bGliL3R5cGVkYXJyYXkvRmxvYXQzMkFycmF5LCB1MzI/LCB1MzI/KSA9PiB2b2lkXG4gICAgICAgIGRhdGEgPSBfX2xpZnRUeXBlZEFycmF5KEZsb2F0MzJBcnJheSwgZGF0YSA+Pj4gMCk7XG4gICAgICAgIHNyY09mZnNldCA9IHNyY09mZnNldCA+Pj4gMDtcbiAgICAgICAgc3JjTGVuZ3RoID0gc3JjTGVuZ3RoID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAudW5pZm9ybTFmdihsb2NhdGlvbiwgZGF0YSwgc3JjT2Zmc2V0LCBzcmNMZW5ndGgpO1xuICAgICAgfSxcbiAgICAgIHVuaWZvcm0yZnYobG9jYXRpb24sIGRhdGEsIHNyY09mZnNldCwgc3JjTGVuZ3RoKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvdW5pZm9ybTJmdihleHRlcm5yZWYsIH5saWIvdHlwZWRhcnJheS9GbG9hdDMyQXJyYXksIHUzMj8sIHUzMj8pID0+IHZvaWRcbiAgICAgICAgZGF0YSA9IF9fbGlmdFR5cGVkQXJyYXkoRmxvYXQzMkFycmF5LCBkYXRhID4+PiAwKTtcbiAgICAgICAgc3JjT2Zmc2V0ID0gc3JjT2Zmc2V0ID4+PiAwO1xuICAgICAgICBzcmNMZW5ndGggPSBzcmNMZW5ndGggPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC51bmlmb3JtMmZ2KGxvY2F0aW9uLCBkYXRhLCBzcmNPZmZzZXQsIHNyY0xlbmd0aCk7XG4gICAgICB9LFxuICAgICAgdW5pZm9ybTNmdihsb2NhdGlvbiwgZGF0YSwgc3JjT2Zmc2V0LCBzcmNMZW5ndGgpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy91bmlmb3JtM2Z2KGV4dGVybnJlZiwgfmxpYi90eXBlZGFycmF5L0Zsb2F0MzJBcnJheSwgdTMyPywgdTMyPykgPT4gdm9pZFxuICAgICAgICBkYXRhID0gX19saWZ0VHlwZWRBcnJheShGbG9hdDMyQXJyYXksIGRhdGEgPj4+IDApO1xuICAgICAgICBzcmNPZmZzZXQgPSBzcmNPZmZzZXQgPj4+IDA7XG4gICAgICAgIHNyY0xlbmd0aCA9IHNyY0xlbmd0aCA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLnVuaWZvcm0zZnYobG9jYXRpb24sIGRhdGEsIHNyY09mZnNldCwgc3JjTGVuZ3RoKTtcbiAgICAgIH0sXG4gICAgICB1bmlmb3JtNGZ2KGxvY2F0aW9uLCBkYXRhLCBzcmNPZmZzZXQsIHNyY0xlbmd0aCkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL3VuaWZvcm00ZnYoZXh0ZXJucmVmLCB+bGliL3R5cGVkYXJyYXkvRmxvYXQzMkFycmF5LCB1MzI/LCB1MzI/KSA9PiB2b2lkXG4gICAgICAgIGRhdGEgPSBfX2xpZnRUeXBlZEFycmF5KEZsb2F0MzJBcnJheSwgZGF0YSA+Pj4gMCk7XG4gICAgICAgIHNyY09mZnNldCA9IHNyY09mZnNldCA+Pj4gMDtcbiAgICAgICAgc3JjTGVuZ3RoID0gc3JjTGVuZ3RoID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAudW5pZm9ybTRmdihsb2NhdGlvbiwgZGF0YSwgc3JjT2Zmc2V0LCBzcmNMZW5ndGgpO1xuICAgICAgfSxcbiAgICAgIHVuaWZvcm1NYXRyaXg0ZnYobG9jYXRpb24sIHRyYW5zcG9zZSwgZGF0YSwgc3JjT2Zmc2V0LCBzcmNMZW5ndGgpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy91bmlmb3JtTWF0cml4NGZ2KGV4dGVybnJlZiwgYm9vbCwgfmxpYi90eXBlZGFycmF5L0Zsb2F0MzJBcnJheSwgdTMyPywgdTMyPykgPT4gdm9pZFxuICAgICAgICB0cmFuc3Bvc2UgPSB0cmFuc3Bvc2UgIT0gMDtcbiAgICAgICAgZGF0YSA9IF9fbGlmdFR5cGVkQXJyYXkoRmxvYXQzMkFycmF5LCBkYXRhID4+PiAwKTtcbiAgICAgICAgc3JjT2Zmc2V0ID0gc3JjT2Zmc2V0ID4+PiAwO1xuICAgICAgICBzcmNMZW5ndGggPSBzcmNMZW5ndGggPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC51bmlmb3JtTWF0cml4NGZ2KGxvY2F0aW9uLCB0cmFuc3Bvc2UsIGRhdGEsIHNyY09mZnNldCwgc3JjTGVuZ3RoKTtcbiAgICAgIH0sXG4gICAgfSksXG4gICAgaG9zdDogT2JqZWN0LmFzc2lnbihPYmplY3QuY3JlYXRlKF9fbW9kdWxlMSksIHtcbiAgICAgIGdldChpZCkge1xuICAgICAgICAvLyBzcmMtYXMvaW1wb3J0cy9faG9zdC9nZXQodTMyKSA9PiBleHRlcm5yZWZcbiAgICAgICAgaWQgPSBpZCA+Pj4gMDtcbiAgICAgICAgcmV0dXJuIF9fbW9kdWxlMS5nZXQoaWQpO1xuICAgICAgfSxcbiAgICB9KSxcbiAgfTtcbiAgY29uc3QgeyBleHBvcnRzIH0gPSBhd2FpdCBXZWJBc3NlbWJseS5pbnN0YW50aWF0ZShtb2R1bGUsIGFkYXB0ZWRJbXBvcnRzKTtcbiAgY29uc3QgbWVtb3J5ID0gZXhwb3J0cy5tZW1vcnkgfHwgaW1wb3J0cy5lbnYubWVtb3J5O1xuICBjb25zdCBhZGFwdGVkRXhwb3J0cyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZih7XG4gICAgZGVmYXVsdFdvcmxkKCkge1xuICAgICAgLy8gc3JjLWFzL2ZhY3Rvcmllcy9tYWluRmFjdG9yaWVzL2RlZmF1bHRXb3JsZCgpID0+IHNyYy1hcy9iYXNlL1dvcmxkL1dvcmxkXG4gICAgICByZXR1cm4gX19saWZ0SW50ZXJucmVmKGV4cG9ydHMuZGVmYXVsdFdvcmxkKCkgPj4+IDApO1xuICAgIH0sXG4gIH0sIGV4cG9ydHMpO1xuICBmdW5jdGlvbiBfX2xpZnRTdHJpbmcocG9pbnRlcikge1xuICAgIGlmICghcG9pbnRlcikgcmV0dXJuIG51bGw7XG4gICAgY29uc3RcbiAgICAgIGVuZCA9IHBvaW50ZXIgKyBuZXcgVWludDMyQXJyYXkobWVtb3J5LmJ1ZmZlcilbcG9pbnRlciAtIDQgPj4+IDJdID4+PiAxLFxuICAgICAgbWVtb3J5VTE2ID0gbmV3IFVpbnQxNkFycmF5KG1lbW9yeS5idWZmZXIpO1xuICAgIGxldFxuICAgICAgc3RhcnQgPSBwb2ludGVyID4+PiAxLFxuICAgICAgc3RyaW5nID0gXCJcIjtcbiAgICB3aGlsZSAoZW5kIC0gc3RhcnQgPiAxMDI0KSBzdHJpbmcgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSguLi5tZW1vcnlVMTYuc3ViYXJyYXkoc3RhcnQsIHN0YXJ0ICs9IDEwMjQpKTtcbiAgICByZXR1cm4gc3RyaW5nICsgU3RyaW5nLmZyb21DaGFyQ29kZSguLi5tZW1vcnlVMTYuc3ViYXJyYXkoc3RhcnQsIGVuZCkpO1xuICB9XG4gIGZ1bmN0aW9uIF9fbG93ZXJTdHJpbmcodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuIDA7XG4gICAgY29uc3RcbiAgICAgIGxlbmd0aCA9IHZhbHVlLmxlbmd0aCxcbiAgICAgIHBvaW50ZXIgPSBleHBvcnRzLl9fbmV3KGxlbmd0aCA8PCAxLCAxKSA+Pj4gMCxcbiAgICAgIG1lbW9yeVUxNiA9IG5ldyBVaW50MTZBcnJheShtZW1vcnkuYnVmZmVyKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSBtZW1vcnlVMTZbKHBvaW50ZXIgPj4+IDEpICsgaV0gPSB2YWx1ZS5jaGFyQ29kZUF0KGkpO1xuICAgIHJldHVybiBwb2ludGVyO1xuICB9XG4gIGZ1bmN0aW9uIF9fbGlmdEFycmF5KGxpZnRFbGVtZW50LCBhbGlnbiwgcG9pbnRlcikge1xuICAgIGlmICghcG9pbnRlcikgcmV0dXJuIG51bGw7XG4gICAgY29uc3RcbiAgICAgIG1lbW9yeVUzMiA9IG5ldyBVaW50MzJBcnJheShtZW1vcnkuYnVmZmVyKSxcbiAgICAgIGRhdGFTdGFydCA9IG1lbW9yeVUzMltwb2ludGVyICsgNCA+Pj4gMl0sXG4gICAgICBsZW5ndGggPSBtZW1vcnlVMzJbcG9pbnRlciArIDEyID4+PiAyXSxcbiAgICAgIHZhbHVlcyA9IG5ldyBBcnJheShsZW5ndGgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHZhbHVlc1tpXSA9IGxpZnRFbGVtZW50KGRhdGFTdGFydCArIChpIDw8IGFsaWduID4+PiAwKSk7XG4gICAgcmV0dXJuIHZhbHVlcztcbiAgfVxuICBmdW5jdGlvbiBfX2xvd2VyQXJyYXkobG93ZXJFbGVtZW50LCBpZCwgYWxpZ24sIHZhbHVlcykge1xuICAgIGlmICh2YWx1ZXMgPT0gbnVsbCkgcmV0dXJuIDA7XG4gICAgY29uc3RcbiAgICAgIGxlbmd0aCA9IHZhbHVlcy5sZW5ndGgsXG4gICAgICBidWZmZXIgPSBleHBvcnRzLl9fcGluKGV4cG9ydHMuX19uZXcobGVuZ3RoIDw8IGFsaWduLCAwKSkgPj4+IDAsXG4gICAgICBoZWFkZXIgPSBleHBvcnRzLl9fcGluKGV4cG9ydHMuX19uZXcoMTYsIGlkKSkgPj4+IDAsXG4gICAgICBtZW1vcnlVMzIgPSBuZXcgVWludDMyQXJyYXkobWVtb3J5LmJ1ZmZlcik7XG4gICAgbWVtb3J5VTMyW2hlYWRlciArIDAgPj4+IDJdID0gYnVmZmVyO1xuICAgIG1lbW9yeVUzMltoZWFkZXIgKyA0ID4+PiAyXSA9IGJ1ZmZlcjtcbiAgICBtZW1vcnlVMzJbaGVhZGVyICsgOCA+Pj4gMl0gPSBsZW5ndGggPDwgYWxpZ247XG4gICAgbWVtb3J5VTMyW2hlYWRlciArIDEyID4+PiAyXSA9IGxlbmd0aDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSBsb3dlckVsZW1lbnQoYnVmZmVyICsgKGkgPDwgYWxpZ24gPj4+IDApLCB2YWx1ZXNbaV0pO1xuICAgIGV4cG9ydHMuX191bnBpbihidWZmZXIpO1xuICAgIGV4cG9ydHMuX191bnBpbihoZWFkZXIpO1xuICAgIHJldHVybiBoZWFkZXI7XG4gIH1cbiAgZnVuY3Rpb24gX19saWZ0VHlwZWRBcnJheShjb25zdHJ1Y3RvciwgcG9pbnRlcikge1xuICAgIGlmICghcG9pbnRlcikgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgbWVtb3J5VTMyID0gbmV3IFVpbnQzMkFycmF5KG1lbW9yeS5idWZmZXIpO1xuICAgIHJldHVybiBuZXcgY29uc3RydWN0b3IoXG4gICAgICBtZW1vcnkuYnVmZmVyLFxuICAgICAgbWVtb3J5VTMyW3BvaW50ZXIgKyA0ID4+PiAyXSxcbiAgICAgIG1lbW9yeVUzMltwb2ludGVyICsgOCA+Pj4gMl0gLyBjb25zdHJ1Y3Rvci5CWVRFU19QRVJfRUxFTUVOVFxuICAgICkuc2xpY2UoKTtcbiAgfVxuICBjb25zdCByZWdpc3RyeSA9IG5ldyBGaW5hbGl6YXRpb25SZWdpc3RyeShfX3JlbGVhc2UpO1xuICBjbGFzcyBJbnRlcm5yZWYgZXh0ZW5kcyBOdW1iZXIge31cbiAgZnVuY3Rpb24gX19saWZ0SW50ZXJucmVmKHBvaW50ZXIpIHtcbiAgICBpZiAoIXBvaW50ZXIpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IHNlbnRpbmVsID0gbmV3IEludGVybnJlZihfX3JldGFpbihwb2ludGVyKSk7XG4gICAgcmVnaXN0cnkucmVnaXN0ZXIoc2VudGluZWwsIHBvaW50ZXIpO1xuICAgIHJldHVybiBzZW50aW5lbDtcbiAgfVxuICBjb25zdCByZWZjb3VudHMgPSBuZXcgTWFwKCk7XG4gIGZ1bmN0aW9uIF9fcmV0YWluKHBvaW50ZXIpIHtcbiAgICBpZiAocG9pbnRlcikge1xuICAgICAgY29uc3QgcmVmY291bnQgPSByZWZjb3VudHMuZ2V0KHBvaW50ZXIpO1xuICAgICAgaWYgKHJlZmNvdW50KSByZWZjb3VudHMuc2V0KHBvaW50ZXIsIHJlZmNvdW50ICsgMSk7XG4gICAgICBlbHNlIHJlZmNvdW50cy5zZXQoZXhwb3J0cy5fX3Bpbihwb2ludGVyKSwgMSk7XG4gICAgfVxuICAgIHJldHVybiBwb2ludGVyO1xuICB9XG4gIGZ1bmN0aW9uIF9fcmVsZWFzZShwb2ludGVyKSB7XG4gICAgaWYgKHBvaW50ZXIpIHtcbiAgICAgIGNvbnN0IHJlZmNvdW50ID0gcmVmY291bnRzLmdldChwb2ludGVyKTtcbiAgICAgIGlmIChyZWZjb3VudCA9PT0gMSkgZXhwb3J0cy5fX3VucGluKHBvaW50ZXIpLCByZWZjb3VudHMuZGVsZXRlKHBvaW50ZXIpO1xuICAgICAgZWxzZSBpZiAocmVmY291bnQpIHJlZmNvdW50cy5zZXQocG9pbnRlciwgcmVmY291bnQgLSAxKTtcbiAgICAgIGVsc2UgdGhyb3cgRXJyb3IoYGludmFsaWQgcmVmY291bnQgJyR7cmVmY291bnR9JyBmb3IgcmVmZXJlbmNlICcke3BvaW50ZXJ9J2ApO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBfX25vdG51bGwoKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKFwidmFsdWUgbXVzdCBub3QgYmUgbnVsbFwiKTtcbiAgfVxuICByZXR1cm4gYWRhcHRlZEV4cG9ydHM7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=