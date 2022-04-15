"use strict";
(self["webpackChunkkoora"] = self["webpackChunkkoora"] || []).push([["main"],{

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _loader_kooraLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loader/kooraLoader */ "./src/loader/kooraLoader.ts");



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
    onLoad(wasmExports) {
        this.wasmExports = wasmExports;
    }
}


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

/***/ "./src/loader/kooraLoader.ts":
/*!***********************************!*\
  !*** ./src/loader/kooraLoader.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* unused harmony exports KooraLoader, initKoora */
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
const initKoora = (canvas, wasmLocation) => __awaiter(void 0, void 0, void 0, function* () {
    const loader = new KooraLoader(canvas);
    yield loader.load(wasmLocation);
    loader.start();
    return loader;
});
//@ts-ignore
window.initKoora = initKoora;


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

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor-sync"], () => (__webpack_exec__("./src/index.ts")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi44NmI5ZmNjMWFmNDU2YjkyZDBmYS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQW9DOzs7Ozs7Ozs7Ozs7OztBQ003QixNQUFNLFFBQVE7SUFLcEIsWUFBWSxFQUFFO1FBQ2IsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFO0lBQ2IsQ0FBQztJQUVELE1BQU0sQ0FBQyxXQUFXO1FBQ2pCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVztJQUMvQixDQUFDO0NBRUQ7Ozs7Ozs7Ozs7Ozs7OztBQ2xCb0M7QUFFOUIsTUFBTSxVQUFXLFNBQVEsK0NBQVE7SUFLdkMsWUFBWSxFQUEwQixFQUFFLE1BQXlCO1FBQ2hFLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDVCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU07UUFDcEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQztJQUN2RCxDQUFDO0lBQ0QsTUFBTTs7UUFDTCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVc7UUFDckMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUs7UUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTTtRQUMzQixVQUFJLENBQUMsV0FBVywwQ0FBRSxZQUFZLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQztRQUM3QyxVQUFJLENBQUMsV0FBVywwQ0FBRSxNQUFNLEVBQUU7SUFDM0IsQ0FBQztDQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEJvRDtBQUNoQjtBQUNFO0FBQ0U7QUFFekMsTUFBTSxNQUFNLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUU7SUFDMUIsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQztJQUNwQixFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksRUFBRSxFQUFFO1FBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEtBQUssRUFBRSxJQUFJLENBQUM7UUFDOUIsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQ2QsQ0FBQztBQUNGLENBQUM7QUFFTSxNQUFNLFdBQVksU0FBUSwrQ0FBUTtJQVF4QyxZQUFZLE1BQTBCO1FBQ3JDLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxJQUFOLE1BQU0sR0FBSyxRQUFRLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBc0I7UUFDdkUsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLElBQU4sTUFBTSxHQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEUsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7UUFDdEMsS0FBSyxDQUFDLEVBQUUsQ0FBQztRQVZWLFVBQUssR0FBZSxFQUFFO1FBQ3RCLGFBQVEsR0FBVyxDQUFDO1FBQ3BCLGNBQVMsR0FBcUIsSUFBSSxHQUFHLEVBQUU7UUFTdEMsZ0RBQVEsQ0FBQyxFQUFFLENBQUM7UUFDWix3REFBZ0IsQ0FBQyxFQUFFLENBQUM7UUFFcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLG1EQUFVLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQztRQUM1QyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUVoQyxpQkFBaUI7UUFDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQztJQUMxQyxDQUFDO0lBQ0QsU0FBUyxDQUFDLEdBQVE7UUFDakIsSUFBSSxHQUFHLEtBQUssSUFBSSxJQUFJLEdBQUcsS0FBSyxTQUFTO1lBQ3BDLE9BQU8sQ0FBQztRQUNULE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQztRQUMzQixPQUFPLEVBQUU7SUFDVixDQUFDO0lBQ0QsU0FBUyxDQUFDLEVBQVU7UUFDbkIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQ2xDLG1CQUFtQjtRQUNuQixPQUFPLEdBQUc7SUFDWCxDQUFDO0lBQ0QsWUFBWSxDQUFDLEVBQVU7UUFDdEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVLLElBQUksQ0FBQyxPQUFPLEdBQUcsYUFBYTs7WUFDakMsTUFBTSxXQUFXLEdBQUc7Z0JBQ25CLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTtnQkFDWCxJQUFJLEVBQUU7b0JBQ0wsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztvQkFDOUIsT0FBTyxFQUFFLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztvQkFDMUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDeEIsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDOUIsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDOUIsTUFBTSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztpQkFDcEM7Z0JBQ0QsR0FBRyxFQUFFLEVBQUU7YUFDUDtZQUNELDJCQUEyQjtZQUMzQixNQUFNLFVBQVUsR0FBRyxNQUFNLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDckUsTUFBTSxXQUFXLEdBQUcsTUFBTSw2REFBcUIsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDO1lBQ3hFLEtBQUssTUFBTSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUs7Z0JBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1lBRXpCLE9BQU8sSUFBSTtRQUNaLENBQUM7S0FBQTtJQUNELEtBQUs7UUFDSixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRTtRQUM3Qyw0QkFBNEI7UUFDNUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUU7UUFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDcEMsSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUNiLE9BQU8sS0FBSztJQUNiLENBQUM7SUFDRCxNQUFNO1FBQ0wsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUU7UUFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3RELENBQUM7SUFFRCxPQUFPO1FBQ04sSUFBSSxDQUFDLEtBQUssRUFBRTtRQUNaLG9CQUFvQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDdEMsT0FBTyxJQUFJO0lBQ1osQ0FBQztDQUVEO0FBRU0sTUFBTSxTQUFTLEdBQUcsQ0FBTSxNQUEwQixFQUFFLFlBQXFCLEVBQUUsRUFBRTtJQUNuRixNQUFNLE1BQU0sR0FBRyxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUM7SUFDdEMsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMvQixNQUFNLENBQUMsS0FBSyxFQUFFO0lBQ2QsT0FBTyxNQUFNO0FBQ2QsQ0FBQztBQUNELFlBQVk7QUFDWixNQUFNLENBQUMsU0FBUyxHQUFHLFNBQVM7Ozs7Ozs7Ozs7Ozs7OztBQ3JHZTtBQUkxQzs7Ozs7Ozs7Ozs7Ozs7QUNIcUM7QUFFL0IsTUFBTSxzQkFBc0IsR0FBRyxDQUFDLEVBQTBCLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQy9FLElBQUksY0FBYyxDQUFDLHNEQUFRLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNEakMsTUFBTSxRQUFRLEdBQUcsQ0FBQyxHQUFRLEVBQUUsRUFBRTtJQUNwQyxLQUFLLE1BQU0sS0FBSyxJQUFJLEdBQUcsRUFBQztRQUN2QixJQUFJLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLFVBQVU7WUFDbkMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO0tBQ2xDO0FBQ0YsQ0FBQztBQUdNLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxFQUEwQixFQUFFLEVBQUU7SUFDOUQsTUFBTSxXQUFXLEdBQUc7UUFDbkIsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLENBQUM7UUFDM0IsQ0FBQyx5QkFBeUIsRUFBRSxDQUFDLENBQUM7UUFDOUIsQ0FBQyxnQ0FBZ0MsRUFBRSxDQUFDLENBQUM7UUFDckMsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUM7UUFDeEIsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBQ2pCLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQztRQUNwQixDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7UUFDakIsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDO1FBQ3BCLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxDQUFDO1FBQzNCLENBQUMseUJBQXlCLEVBQUUsQ0FBQyxDQUFDO1FBQzlCLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztRQUNqQixDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7UUFDakIsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDO1FBQ3BCLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO1FBQ3pCLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxDQUFDO1FBQzFCLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO0tBQ3pCO0lBQ0QsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUU7UUFDcEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLEVBQUU7WUFDN0IsRUFBRSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUM7SUFDbEMsQ0FBQyxDQUFDO0FBQ0gsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQ3VDO0FBQ1o7Ozs7Ozs7Ozs7Ozs7OztBQ0RyQiwrQ0FBK0M7QUFDdEQ7QUFDQTtBQUNBO0FBQ0EsbUVBQW1FO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsU0FBUyxLQUFLLFNBQVMsR0FBRyxXQUFXLEdBQUcsYUFBYTtBQUM5RSxTQUFTO0FBQ1QsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCx3REFBd0Q7QUFDMUcsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELHdEQUF3RDtBQUMxRyxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQSxVQUFVLFVBQVU7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLGtCQUFrQixvQkFBb0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxrQkFBa0Isb0JBQW9CO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsU0FBUyxtQkFBbUIsUUFBUTtBQUNoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2tvb3JhLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL2tvb3JhLy4vc3JjL2xvYWRlci9HbHVlQmFzZS50cyIsIndlYnBhY2s6Ly9rb29yYS8uL3NyYy9sb2FkZXIvUmVuZGVyR2x1ZS50cyIsIndlYnBhY2s6Ly9rb29yYS8uL3NyYy9sb2FkZXIva29vcmFMb2FkZXIudHMiLCJ3ZWJwYWNrOi8va29vcmEvLi9zcmMvbG9hZGVyL2tvb3JhV2FzbS50cyIsIndlYnBhY2s6Ly9rb29yYS8uL3NyYy91dGlscy9EZWJvdW5jZVJlc2l6ZU9ic2VydmVyLnRzIiwid2VicGFjazovL2tvb3JhLy4vc3JjL3V0aWxzL2NsYXNzVXRpbHMudHMiLCJ3ZWJwYWNrOi8va29vcmEvLi9zcmMvdXRpbHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8va29vcmEvLi9zcmMvX3dhc20vZGVidWcuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0ICogZnJvbSAnLi9sb2FkZXIva29vcmFMb2FkZXInIiwiaW1wb3J0IHsga29vcmFFeHBvcnRzIH0gZnJvbSAnLi9rb29yYVdhc20nXG5cblxuXG5cblxuZXhwb3J0IGNsYXNzIEdsdWVCYXNle1xuXG5cdGdsOiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0XG5cdHdhc21FeHBvcnRzOiBrb29yYUV4cG9ydHNcblxuXHRjb25zdHJ1Y3RvcihnbCl7XG5cdFx0dGhpcy5nbCA9IGdsXG5cdH1cblxuXHRvbkxvYWQod2FzbUV4cG9ydHMpe1xuXHRcdHRoaXMud2FzbUV4cG9ydHMgPSB3YXNtRXhwb3J0c1xuXHR9XG5cbn0iLCJpbXBvcnQgeyBEZWJvdW5jZVJlc2l6ZU9ic2VydmVyIH0gZnJvbSAnLi4vdXRpbHMnXG5pbXBvcnQgeyBHbHVlQmFzZSB9IGZyb20gJy4vR2x1ZUJhc2UnXG5cbmV4cG9ydCBjbGFzcyBSZW5kZXJHbHVlIGV4dGVuZHMgR2x1ZUJhc2V7XG5cblx0Y2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudFxuXHRyZXNpemVPYnNlcnZlcjogRGVib3VuY2VSZXNpemVPYnNlcnZlclxuXG5cdGNvbnN0cnVjdG9yKGdsOiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0LCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KXtcblx0XHRzdXBlcihnbClcblx0XHR0aGlzLmNhbnZhcyA9IGNhbnZhc1xuXHRcdHRoaXMucmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIodGhpcy5yZXNpemUuYmluZCh0aGlzKSlcblx0XHR0aGlzLnJlc2l6ZU9ic2VydmVyLm9ic2VydmUodGhpcy5jYW52YXMucGFyZW50RWxlbWVudClcblx0fVxuXHRyZXNpemUoKXtcblx0XHRjb25zdCB3aWR0aCA9IHRoaXMuY2FudmFzLmNsaWVudFdpZHRoXG5cdFx0Y29uc3QgaGVpZ2h0ID0gdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0XG5cdFx0dGhpcy5jYW52YXMud2lkdGggPSB3aWR0aFxuXHRcdHRoaXMuY2FudmFzLmhlaWdodCA9IGhlaWdodFxuXHRcdHRoaXMud2FzbUV4cG9ydHM/LmhhbmRsZVJlc2l6ZSh3aWR0aCwgaGVpZ2h0KVxuXHRcdHRoaXMud2FzbUV4cG9ydHM/LnVwZGF0ZSgpXG5cdH1cbn0iLCJpbXBvcnQgeyBhcHBseUdMT3ZlcmxvYWRzLCBhdXRvQmluZCB9IGZyb20gJy4uL3V0aWxzJ1xuaW1wb3J0IHsgR2x1ZUJhc2UgfSBmcm9tICcuL0dsdWVCYXNlJ1xuaW1wb3J0IHsga29vcmFXYXNtIH0gZnJvbSAnLi9rb29yYVdhc20nXG5pbXBvcnQgeyBSZW5kZXJHbHVlIH0gZnJvbSAnLi9SZW5kZXJHbHVlJ1xuXG5jb25zdCBsaXN0ZW4gPSAoZ2wsIHZhbCkgPT4ge1xuXHRjb25zdCBmdW5jID0gZ2xbdmFsXVxuXHRnbFt2YWxdID0gKC4uLmFyZ3MpID0+IHtcblx0XHRjb25zb2xlLmxvZyhgJHt2YWx9IC0gYCwgYXJncylcblx0XHRmdW5jKC4uLmFyZ3MpXG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIEtvb3JhTG9hZGVyIGV4dGVuZHMgR2x1ZUJhc2V7XG5cblx0Z2x1ZXM6IEdsdWVCYXNlW10gPSBbXVxuXHRleHRlcm5JZDogbnVtYmVyID0gMFxuXHRleHRlcm5NYXA6IE1hcDxudW1iZXIsIGFueT4gPSBuZXcgTWFwKClcblxuXHRyZW5kZXJHbHVlOiBSZW5kZXJHbHVlXG5cdGFuaW1GcmFtZUlkOiBudW1iZXJcblx0Y29uc3RydWN0b3IoY2FudmFzPzogSFRNTENhbnZhc0VsZW1lbnQpe1xuXHRcdGNhbnZhcyA/Pz0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2tvb3JhLWNhbnZhcycpIGFzIEhUTUxDYW52YXNFbGVtZW50XG5cdFx0Y2FudmFzID8/PSBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpKVxuXHRcdGNvbnN0IGdsID0gY2FudmFzLmdldENvbnRleHQoJ3dlYmdsMicpXG5cdFx0c3VwZXIoZ2wpXG5cdFx0YXV0b0JpbmQoZ2wpXG5cdFx0YXBwbHlHTE92ZXJsb2FkcyhnbClcblxuXHRcdHRoaXMucmVuZGVyR2x1ZSA9IG5ldyBSZW5kZXJHbHVlKGdsLCBjYW52YXMpXG5cdFx0dGhpcy5nbHVlcy5wdXNoKHRoaXMpXG5cdFx0dGhpcy5nbHVlcy5wdXNoKHRoaXMucmVuZGVyR2x1ZSlcblxuXHRcdC8vemVybyBtZWFucyBudWxsXG5cdFx0dGhpcy5leHRlcm5NYXAuc2V0KHRoaXMuZXh0ZXJuSWQrKywgbnVsbClcblx0fVxuXHRleHRlcm5TZXQodmFsOiBhbnkpe1xuXHRcdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpXG5cdFx0XHRyZXR1cm4gMFxuXHRcdGNvbnN0IGlkID0gdGhpcy5leHRlcm5JZCsrXG5cdFx0dGhpcy5leHRlcm5NYXAuc2V0KGlkLCB2YWwpXG5cdFx0cmV0dXJuIGlkXG5cdH1cblx0ZXh0ZXJuR2V0KGlkOiBudW1iZXIpe1xuXHRcdGNvbnN0IHZhbCA9IHRoaXMuZXh0ZXJuTWFwLmdldChpZClcblx0XHQvLyBjb25zb2xlLmRpcih2YWwpXG5cdFx0cmV0dXJuIHZhbFxuXHR9XG5cdGV4dGVyblJlbW92ZShpZDogbnVtYmVyKXtcblx0XHRyZXR1cm4gdGhpcy5leHRlcm5NYXAuZGVsZXRlKGlkKVxuXHR9XG5cblx0YXN5bmMgbG9hZCh3YXNtVXJsID0gJy9kZWJ1Zy53YXNtJyk6IFByb21pc2U8S29vcmFMb2FkZXI+e1xuXHRcdGNvbnN0IHdhc21JbXBvcnRzID0ge1xuXHRcdFx0Z2w6IHRoaXMuZ2wsXG5cdFx0XHRob3N0OiB7XG5cdFx0XHRcdGxvZzogY29uc29sZS5sb2cuYmluZChjb25zb2xlKSxcblx0XHRcdFx0ZWxhcHNlZDogcGVyZm9ybWFuY2Uubm93LmJpbmQocGVyZm9ybWFuY2UpLFxuXHRcdFx0XHRub3c6IERhdGUubm93LmJpbmQoRGF0ZSksXG5cdFx0XHRcdHNldDogdGhpcy5leHRlcm5TZXQuYmluZCh0aGlzKSxcblx0XHRcdFx0Z2V0OiB0aGlzLmV4dGVybkdldC5iaW5kKHRoaXMpLFxuXHRcdFx0XHRyZW1vdmU6IHRoaXMuZXh0ZXJuUmVtb3ZlLmJpbmQodGhpcylcblx0XHRcdH0sXG5cdFx0XHRlbnY6IHt9XG5cdFx0fVxuXHRcdC8vIGNvbnNvbGUuZGlyKHdhc21JbXBvcnRzKVxuXHRcdGNvbnN0IHdhc21Nb2R1bGUgPSBhd2FpdCBXZWJBc3NlbWJseS5jb21waWxlU3RyZWFtaW5nKGZldGNoKHdhc21VcmwpKVxuXHRcdGNvbnN0IHdhc21FeHBvcnRzID0gYXdhaXQga29vcmFXYXNtLmluc3RhbnRpYXRlKHdhc21Nb2R1bGUsIHdhc21JbXBvcnRzKVxuXHRcdGZvciAoY29uc3QgZ2x1ZSBvZiB0aGlzLmdsdWVzKVxuXHRcdFx0Z2x1ZS5vbkxvYWQod2FzbUV4cG9ydHMpXG5cdFx0XG5cdFx0cmV0dXJuIHRoaXNcblx0fVxuXHRzdGFydCgpOiBrb29yYVdhc20uX19JbnRlcm5yZWY3MXtcblx0XHRjb25zdCB3b3JsZCA9IHRoaXMud2FzbUV4cG9ydHMuZGVmYXVsdFdvcmxkKClcblx0XHQvLyBjb25zb2xlLmRpcihhLnRvU3RyaW5nKCkpXG5cdFx0dGhpcy5yZW5kZXJHbHVlLnJlc2l6ZSgpXG5cdFx0dGhpcy51cGRhdGUgPSB0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpXG5cdFx0dGhpcy51cGRhdGUoKVxuXHRcdHJldHVybiB3b3JsZFxuXHR9XG5cdHVwZGF0ZSgpe1xuXHRcdHRoaXMud2FzbUV4cG9ydHMudXBkYXRlKClcblx0XHR0aGlzLmFuaW1GcmFtZUlkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlKVxuXHR9XG5cdFxuXHRydW5PbmNlKCk6IEtvb3JhTG9hZGVye1xuXHRcdHRoaXMuc3RhcnQoKVxuXHRcdGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbUZyYW1lSWQpXG5cdFx0cmV0dXJuIHRoaXNcblx0fVxuXG59XG5cbmV4cG9ydCBjb25zdCBpbml0S29vcmEgPSBhc3luYyhjYW52YXM/OiBIVE1MQ2FudmFzRWxlbWVudCwgd2FzbUxvY2F0aW9uPzogc3RyaW5nKSA9PiB7XHRcblx0Y29uc3QgbG9hZGVyID0gbmV3IEtvb3JhTG9hZGVyKGNhbnZhcylcblx0YXdhaXQgbG9hZGVyLmxvYWQod2FzbUxvY2F0aW9uKVxuXHRsb2FkZXIuc3RhcnQoKVxuXHRyZXR1cm4gbG9hZGVyXG59XG4vL0B0cy1pZ25vcmVcbndpbmRvdy5pbml0S29vcmEgPSBpbml0S29vcmFcblxuXG4iLCJpbXBvcnQgKiBhcyBrb29yYVdhc20gZnJvbSAnLi4vX3dhc20vZGVidWcnXG5leHBvcnQgdHlwZSBrb29yYUV4cG9ydHMgPSB0eXBlb2Yga29vcmFXYXNtLl9fQWRhcHRlZEV4cG9ydHNcbmV4cG9ydCB7XG5cdGtvb3JhV2FzbVxufSIsIlxuaW1wb3J0IGRlYm91bmNlIGZyb20gJ2xvZGFzaC5kZWJvdW5jZSdcblxuZXhwb3J0IGNvbnN0IERlYm91bmNlUmVzaXplT2JzZXJ2ZXIgPSAoY2I6IFJlc2l6ZU9ic2VydmVyQ2FsbGJhY2ssIGRlbGF5ID0gMSkgPT4gXG5cdG5ldyBSZXNpemVPYnNlcnZlcihkZWJvdW5jZShjYiwgZGVsYXkpKVxuXG5leHBvcnQgdHlwZSBEZWJvdW5jZVJlc2l6ZU9ic2VydmVyID0gUmV0dXJuVHlwZTx0eXBlb2YgRGVib3VuY2VSZXNpemVPYnNlcnZlcj5cbiIsIlxuXG5cbmV4cG9ydCBjb25zdCBhdXRvQmluZCA9IChvYmo6IGFueSkgPT4ge1xuXHRmb3IgKGNvbnN0IGZpZWxkIGluIG9iail7XG5cdFx0aWYgKHR5cGVvZiBvYmpbZmllbGRdID09PSAnZnVuY3Rpb24nKVxuXHRcdFx0b2JqW2ZpZWxkXSA9IG9ialtmaWVsZF0uYmluZChvYmopXG5cdH1cbn1cblxuXG5leHBvcnQgY29uc3QgYXBwbHlHTE92ZXJsb2FkcyA9IChnbDogV2ViR0wyUmVuZGVyaW5nQ29udGV4dCkgPT4ge1xuXHRjb25zdCBnbE92ZXJsb2FkcyA9IFtcblx0XHRbJ2NvbXByZXNzZWRUZXhJbWFnZTNEJywgMl0sXG5cdFx0Wydjb21wcmVzc2VkVGV4U3ViSW1hZ2UzRCcsIDJdLFxuXHRcdFsnZ2V0QWN0aXZlVW5pZm9ybUJsb2NrUGFyYW1ldGVyJywgMl0sXG5cdFx0WydnZXRBY3RpdmVVbmlmb3JtcycsIDJdLFxuXHRcdFsndGV4SW1hZ2UzRCcsIDRdLFxuXHRcdFsndGV4U3ViSW1hZ2UzRCcsIDNdLFxuXHRcdFsnYnVmZmVyRGF0YScsIDddLFxuXHRcdFsnYnVmZmVyU3ViRGF0YScsIDJdLFxuXHRcdFsnY29tcHJlc3NlZFRleEltYWdlMkQnLCAyXSxcblx0XHRbJ2NvbXByZXNzZWRUZXhTdWJJbWFnZTJEJywgMl0sXG5cdFx0WydyZWFkUGl4ZWxzJywgM10sXG5cdFx0Wyd0ZXhJbWFnZTJEJywgNl0sXG5cdFx0Wyd0ZXhTdWJJbWFnZTJEJywgNV0sXG5cdFx0WydnZXRCdWZmZXJQYXJhbWV0ZXInLCAyXSxcblx0XHRbJ2dldFByb2dyYW1QYXJhbWV0ZXInLCAyXSxcblx0XHRbJ2dldFNoYWRlclBhcmFtZXRlcicsIDJdLFxuXHRdXG5cdGdsT3ZlcmxvYWRzLmZvckVhY2goKFtrZXksIGNvdW50XSkgPT4ge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKylcblx0XHRcdGdsW2Ake2tleX1fXyR7aSArIDF9YF0gPSBnbFtrZXldXG5cdH0pXG59IiwiZXhwb3J0ICogZnJvbSAnLi9EZWJvdW5jZVJlc2l6ZU9ic2VydmVyJ1xuZXhwb3J0ICogZnJvbSAnLi9jbGFzc1V0aWxzJyIsImV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbnN0YW50aWF0ZShtb2R1bGUsIGltcG9ydHMgPSB7fSkge1xuICBjb25zdCBfX21vZHVsZTAgPSBpbXBvcnRzLmdsO1xuICBjb25zdCBfX21vZHVsZTEgPSBpbXBvcnRzLmhvc3Q7XG4gIGNvbnN0IGFkYXB0ZWRJbXBvcnRzID0ge1xuICAgIGVudjogT2JqZWN0LmFzc2lnbihPYmplY3QuY3JlYXRlKGdsb2JhbFRoaXMpLCBpbXBvcnRzLmVudiB8fCB7fSwge1xuICAgICAgc2VlZCgpIHtcbiAgICAgICAgLy8gfmxpYi9idWlsdGlucy9zZWVkKCkgPT4gZjY0XG4gICAgICAgIHJldHVybiAoKCkgPT4ge1xuICAgICAgICAgIC8vIEBleHRlcm5hbC5qc1xuICAgICAgICAgIHJldHVybiBEYXRlLm5vdygpICogTWF0aC5yYW5kb20oKTtcbiAgICAgICAgfSkoKTtcbiAgICAgIH0sXG4gICAgICBhYm9ydChtZXNzYWdlLCBmaWxlTmFtZSwgbGluZU51bWJlciwgY29sdW1uTnVtYmVyKSB7XG4gICAgICAgIC8vIH5saWIvYnVpbHRpbnMvYWJvcnQofmxpYi9zdHJpbmcvU3RyaW5nIHwgbnVsbD8sIH5saWIvc3RyaW5nL1N0cmluZyB8IG51bGw/LCB1MzI/LCB1MzI/KSA9PiB2b2lkXG4gICAgICAgIG1lc3NhZ2UgPSBfX2xpZnRTdHJpbmcobWVzc2FnZSA+Pj4gMCk7XG4gICAgICAgIGZpbGVOYW1lID0gX19saWZ0U3RyaW5nKGZpbGVOYW1lID4+PiAwKTtcbiAgICAgICAgbGluZU51bWJlciA9IGxpbmVOdW1iZXIgPj4+IDA7XG4gICAgICAgIGNvbHVtbk51bWJlciA9IGNvbHVtbk51bWJlciA+Pj4gMDtcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICAvLyBAZXh0ZXJuYWwuanNcbiAgICAgICAgICB0aHJvdyBFcnJvcihgJHttZXNzYWdlfSBpbiAke2ZpbGVOYW1lfToke2xpbmVOdW1iZXJ9OiR7Y29sdW1uTnVtYmVyfWApO1xuICAgICAgICB9KSgpO1xuICAgICAgfSxcbiAgICB9KSxcbiAgICBnbDogT2JqZWN0LmFzc2lnbihPYmplY3QuY3JlYXRlKF9fbW9kdWxlMCksIHtcbiAgICAgIGNsZWFyKG1hc2spIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9jbGVhcih1MzIpID0+IHZvaWRcbiAgICAgICAgbWFzayA9IG1hc2sgPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC5jbGVhcihtYXNrKTtcbiAgICAgIH0sXG4gICAgICBiaW5kQnVmZmVyKHRhcmdldCwgYnVmZmVyKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvYmluZEJ1ZmZlcih1MzIsIGV4dGVybnJlZikgPT4gdm9pZFxuICAgICAgICB0YXJnZXQgPSB0YXJnZXQgPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC5iaW5kQnVmZmVyKHRhcmdldCwgYnVmZmVyKTtcbiAgICAgIH0sXG4gICAgICBidWZmZXJTdWJEYXRhX18yKHRhcmdldCwgZHN0Qnl0ZU9mZnNldCwgc3JjRGF0YSwgc3JjT2Zmc2V0LCBsZW5ndGgpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9idWZmZXJTdWJEYXRhX18yKHUzMiwgaTMyLCB+bGliL3R5cGVkYXJyYXkvRmxvYXQzMkFycmF5LCB1MzIsIHUzMj8pID0+IHZvaWRcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0ID4+PiAwO1xuICAgICAgICBzcmNEYXRhID0gX19saWZ0VHlwZWRBcnJheShGbG9hdDMyQXJyYXksIHNyY0RhdGEgPj4+IDApO1xuICAgICAgICBzcmNPZmZzZXQgPSBzcmNPZmZzZXQgPj4+IDA7XG4gICAgICAgIGxlbmd0aCA9IGxlbmd0aCA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLmJ1ZmZlclN1YkRhdGFfXzIodGFyZ2V0LCBkc3RCeXRlT2Zmc2V0LCBzcmNEYXRhLCBzcmNPZmZzZXQsIGxlbmd0aCk7XG4gICAgICB9LFxuICAgICAgZW5hYmxlKGNhcCkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2VuYWJsZSh1MzIpID0+IHZvaWRcbiAgICAgICAgY2FwID0gY2FwID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAuZW5hYmxlKGNhcCk7XG4gICAgICB9LFxuICAgICAgZGVwdGhGdW5jKGZ1bmMpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9kZXB0aEZ1bmModTMyKSA9PiB2b2lkXG4gICAgICAgIGZ1bmMgPSBmdW5jID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAuZGVwdGhGdW5jKGZ1bmMpO1xuICAgICAgfSxcbiAgICAgIGRpc2FibGUoY2FwKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvZGlzYWJsZSh1MzIpID0+IHZvaWRcbiAgICAgICAgY2FwID0gY2FwID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAuZGlzYWJsZShjYXApO1xuICAgICAgfSxcbiAgICAgIGN1bGxGYWNlKG1vZGUpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9jdWxsRmFjZSh1MzIpID0+IHZvaWRcbiAgICAgICAgbW9kZSA9IG1vZGUgPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC5jdWxsRmFjZShtb2RlKTtcbiAgICAgIH0sXG4gICAgICBiaW5kVHJhbnNmb3JtRmVlZGJhY2sodGFyZ2V0LCB0Zikge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2JpbmRUcmFuc2Zvcm1GZWVkYmFjayh1MzIsIGV4dGVybnJlZikgPT4gdm9pZFxuICAgICAgICB0YXJnZXQgPSB0YXJnZXQgPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC5iaW5kVHJhbnNmb3JtRmVlZGJhY2sodGFyZ2V0LCB0Zik7XG4gICAgICB9LFxuICAgICAgYmVnaW5UcmFuc2Zvcm1GZWVkYmFjayhwcmltaXRpdmVNb2RlKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvYmVnaW5UcmFuc2Zvcm1GZWVkYmFjayh1MzIpID0+IHZvaWRcbiAgICAgICAgcHJpbWl0aXZlTW9kZSA9IHByaW1pdGl2ZU1vZGUgPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC5iZWdpblRyYW5zZm9ybUZlZWRiYWNrKHByaW1pdGl2ZU1vZGUpO1xuICAgICAgfSxcbiAgICAgIGRyYXdBcnJheXMobW9kZSwgZmlyc3QsIGNvdW50KSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvZHJhd0FycmF5cyh1MzIsIGkzMiwgaTMyKSA9PiB2b2lkXG4gICAgICAgIG1vZGUgPSBtb2RlID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAuZHJhd0FycmF5cyhtb2RlLCBmaXJzdCwgY291bnQpO1xuICAgICAgfSxcbiAgICAgIGRyYXdFbGVtZW50c0luc3RhbmNlZChtb2RlLCBjb3VudCwgdHlwZSwgb2Zmc2V0LCBpbnN0YW5jZUNvdW50KSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvZHJhd0VsZW1lbnRzSW5zdGFuY2VkKHUzMiwgaTMyLCB1MzIsIGkzMiwgaTMyKSA9PiB2b2lkXG4gICAgICAgIG1vZGUgPSBtb2RlID4+PiAwO1xuICAgICAgICB0eXBlID0gdHlwZSA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLmRyYXdFbGVtZW50c0luc3RhbmNlZChtb2RlLCBjb3VudCwgdHlwZSwgb2Zmc2V0LCBpbnN0YW5jZUNvdW50KTtcbiAgICAgIH0sXG4gICAgICBkcmF3QXJyYXlzSW5zdGFuY2VkKG1vZGUsIGZpcnN0LCBjb3VudCwgaW5zdGFuY2VDb3VudCkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2RyYXdBcnJheXNJbnN0YW5jZWQodTMyLCBpMzIsIGkzMiwgaTMyKSA9PiB2b2lkXG4gICAgICAgIG1vZGUgPSBtb2RlID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAuZHJhd0FycmF5c0luc3RhbmNlZChtb2RlLCBmaXJzdCwgY291bnQsIGluc3RhbmNlQ291bnQpO1xuICAgICAgfSxcbiAgICAgIGRyYXdFbGVtZW50cyhtb2RlLCBjb3VudCwgdHlwZSwgb2Zmc2V0KSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvZHJhd0VsZW1lbnRzKHUzMiwgaTMyLCB1MzIsIGkzMikgPT4gdm9pZFxuICAgICAgICBtb2RlID0gbW9kZSA+Pj4gMDtcbiAgICAgICAgdHlwZSA9IHR5cGUgPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC5kcmF3RWxlbWVudHMobW9kZSwgY291bnQsIHR5cGUsIG9mZnNldCk7XG4gICAgICB9LFxuICAgICAgYmxlbmRGdW5jKHNmYWN0b3IsIGRmYWN0b3IpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9ibGVuZEZ1bmModTMyLCB1MzIpID0+IHZvaWRcbiAgICAgICAgc2ZhY3RvciA9IHNmYWN0b3IgPj4+IDA7XG4gICAgICAgIGRmYWN0b3IgPSBkZmFjdG9yID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAuYmxlbmRGdW5jKHNmYWN0b3IsIGRmYWN0b3IpO1xuICAgICAgfSxcbiAgICAgIGNyZWF0ZVNoYWRlcih0eXBlKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvY3JlYXRlU2hhZGVyKHUzMikgPT4gZXh0ZXJucmVmXG4gICAgICAgIHR5cGUgPSB0eXBlID4+PiAwO1xuICAgICAgICByZXR1cm4gX19tb2R1bGUwLmNyZWF0ZVNoYWRlcih0eXBlKTtcbiAgICAgIH0sXG4gICAgICBzaGFkZXJTb3VyY2Uoc2hhZGVyLCBzb3VyY2UpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9zaGFkZXJTb3VyY2UoZXh0ZXJucmVmLCB+bGliL3N0cmluZy9TdHJpbmcpID0+IHZvaWRcbiAgICAgICAgc291cmNlID0gX19saWZ0U3RyaW5nKHNvdXJjZSA+Pj4gMCk7XG4gICAgICAgIF9fbW9kdWxlMC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCBzb3VyY2UpO1xuICAgICAgfSxcbiAgICAgIGdldFNoYWRlclBhcmFtZXRlcl9fMShzaGFkZXIsIHBuYW1lKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvZ2V0U2hhZGVyUGFyYW1ldGVyX18xKGV4dGVybnJlZiwgdTMyKSA9PiBib29sXG4gICAgICAgIHBuYW1lID0gcG5hbWUgPj4+IDA7XG4gICAgICAgIHJldHVybiBfX21vZHVsZTAuZ2V0U2hhZGVyUGFyYW1ldGVyX18xKHNoYWRlciwgcG5hbWUpID8gMSA6IDA7XG4gICAgICB9LFxuICAgICAgZ2V0U2hhZGVySW5mb0xvZyhzaGFkZXIpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9nZXRTaGFkZXJJbmZvTG9nKGV4dGVybnJlZikgPT4gfmxpYi9zdHJpbmcvU3RyaW5nXG4gICAgICAgIHJldHVybiBfX2xvd2VyU3RyaW5nKF9fbW9kdWxlMC5nZXRTaGFkZXJJbmZvTG9nKHNoYWRlcikpIHx8IF9fbm90bnVsbCgpO1xuICAgICAgfSxcbiAgICAgIHRyYW5zZm9ybUZlZWRiYWNrVmFyeWluZ3MocHJvZ3JhbSwgdmFyeWluZ3MsIGJ1ZmZlck1vZGUpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy90cmFuc2Zvcm1GZWVkYmFja1ZhcnlpbmdzKGV4dGVybnJlZiwgfmxpYi9hcnJheS9BcnJheTx+bGliL3N0cmluZy9TdHJpbmc+LCB1MzIpID0+IHZvaWRcbiAgICAgICAgdmFyeWluZ3MgPSBfX2xpZnRBcnJheShwb2ludGVyID0+IF9fbGlmdFN0cmluZyhuZXcgVWludDMyQXJyYXkobWVtb3J5LmJ1ZmZlcilbcG9pbnRlciA+Pj4gMl0pLCAyLCB2YXJ5aW5ncyA+Pj4gMCk7XG4gICAgICAgIGJ1ZmZlck1vZGUgPSBidWZmZXJNb2RlID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAudHJhbnNmb3JtRmVlZGJhY2tWYXJ5aW5ncyhwcm9ncmFtLCB2YXJ5aW5ncywgYnVmZmVyTW9kZSk7XG4gICAgICB9LFxuICAgICAgZ2V0UHJvZ3JhbVBhcmFtZXRlcl9fMShwcm9ncmFtLCBwbmFtZSkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2dldFByb2dyYW1QYXJhbWV0ZXJfXzEoZXh0ZXJucmVmLCB1MzIpID0+IGJvb2xcbiAgICAgICAgcG5hbWUgPSBwbmFtZSA+Pj4gMDtcbiAgICAgICAgcmV0dXJuIF9fbW9kdWxlMC5nZXRQcm9ncmFtUGFyYW1ldGVyX18xKHByb2dyYW0sIHBuYW1lKSA/IDEgOiAwO1xuICAgICAgfSxcbiAgICAgIGdldFByb2dyYW1JbmZvTG9nKHByb2dyYW0pIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9nZXRQcm9ncmFtSW5mb0xvZyhleHRlcm5yZWYpID0+IH5saWIvc3RyaW5nL1N0cmluZ1xuICAgICAgICByZXR1cm4gX19sb3dlclN0cmluZyhfX21vZHVsZTAuZ2V0UHJvZ3JhbUluZm9Mb2cocHJvZ3JhbSkpIHx8IF9fbm90bnVsbCgpO1xuICAgICAgfSxcbiAgICAgIGJ1ZmZlckRhdGFfXzModGFyZ2V0LCBzcmNEYXRhLCB1c2FnZSkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2J1ZmZlckRhdGFfXzModTMyLCB+bGliL3R5cGVkYXJyYXkvRmxvYXQzMkFycmF5LCB1MzIpID0+IHZvaWRcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0ID4+PiAwO1xuICAgICAgICBzcmNEYXRhID0gX19saWZ0VHlwZWRBcnJheShGbG9hdDMyQXJyYXksIHNyY0RhdGEgPj4+IDApO1xuICAgICAgICB1c2FnZSA9IHVzYWdlID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAuYnVmZmVyRGF0YV9fMyh0YXJnZXQsIHNyY0RhdGEsIHVzYWdlKTtcbiAgICAgIH0sXG4gICAgICBidWZmZXJEYXRhX180KHRhcmdldCwgc3JjRGF0YSwgdXNhZ2UpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9idWZmZXJEYXRhX180KHUzMiwgfmxpYi90eXBlZGFycmF5L1VpbnQ4QXJyYXksIHUzMikgPT4gdm9pZFxuICAgICAgICB0YXJnZXQgPSB0YXJnZXQgPj4+IDA7XG4gICAgICAgIHNyY0RhdGEgPSBfX2xpZnRUeXBlZEFycmF5KFVpbnQ4QXJyYXksIHNyY0RhdGEgPj4+IDApO1xuICAgICAgICB1c2FnZSA9IHVzYWdlID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAuYnVmZmVyRGF0YV9fNCh0YXJnZXQsIHNyY0RhdGEsIHVzYWdlKTtcbiAgICAgIH0sXG4gICAgICBnZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCBuYW1lKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvZ2V0QXR0cmliTG9jYXRpb24oZXh0ZXJucmVmLCB+bGliL3N0cmluZy9TdHJpbmcpID0+IGkzMlxuICAgICAgICBuYW1lID0gX19saWZ0U3RyaW5nKG5hbWUgPj4+IDApO1xuICAgICAgICByZXR1cm4gX19tb2R1bGUwLmdldEF0dHJpYkxvY2F0aW9uKHByb2dyYW0sIG5hbWUpO1xuICAgICAgfSxcbiAgICAgIGVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGluZGV4KSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodTMyKSA9PiB2b2lkXG4gICAgICAgIGluZGV4ID0gaW5kZXggPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShpbmRleCk7XG4gICAgICB9LFxuICAgICAgdmVydGV4QXR0cmliUG9pbnRlcihpbmRleCwgc2l6ZSwgdHlwZSwgbm9ybWFsaXplZCwgc3RyaWRlLCBvZmZzZXQpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy92ZXJ0ZXhBdHRyaWJQb2ludGVyKHUzMiwgaTMyLCB1MzIsIGJvb2wsIGkzMiwgaTMyKSA9PiB2b2lkXG4gICAgICAgIGluZGV4ID0gaW5kZXggPj4+IDA7XG4gICAgICAgIHR5cGUgPSB0eXBlID4+PiAwO1xuICAgICAgICBub3JtYWxpemVkID0gbm9ybWFsaXplZCAhPSAwO1xuICAgICAgICBfX21vZHVsZTAudmVydGV4QXR0cmliUG9pbnRlcihpbmRleCwgc2l6ZSwgdHlwZSwgbm9ybWFsaXplZCwgc3RyaWRlLCBvZmZzZXQpO1xuICAgICAgfSxcbiAgICAgIHZlcnRleEF0dHJpYkRpdmlzb3IoaW5kZXgsIGRpdmlzb3IpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy92ZXJ0ZXhBdHRyaWJEaXZpc29yKHUzMiwgdTMyKSA9PiB2b2lkXG4gICAgICAgIGluZGV4ID0gaW5kZXggPj4+IDA7XG4gICAgICAgIGRpdmlzb3IgPSBkaXZpc29yID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAudmVydGV4QXR0cmliRGl2aXNvcihpbmRleCwgZGl2aXNvcik7XG4gICAgICB9LFxuICAgICAgYnVmZmVyRGF0YV9fNSh0YXJnZXQsIHNyY0RhdGEsIHVzYWdlKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvYnVmZmVyRGF0YV9fNSh1MzIsIH5saWIvdHlwZWRhcnJheS9VaW50MTZBcnJheSwgdTMyKSA9PiB2b2lkXG4gICAgICAgIHRhcmdldCA9IHRhcmdldCA+Pj4gMDtcbiAgICAgICAgc3JjRGF0YSA9IF9fbGlmdFR5cGVkQXJyYXkoVWludDE2QXJyYXksIHNyY0RhdGEgPj4+IDApO1xuICAgICAgICB1c2FnZSA9IHVzYWdlID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAuYnVmZmVyRGF0YV9fNSh0YXJnZXQsIHNyY0RhdGEsIHVzYWdlKTtcbiAgICAgIH0sXG4gICAgICBiaW5kQnVmZmVyQmFzZSh0YXJnZXQsIGluZGV4LCBidWZmZXIpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9iaW5kQnVmZmVyQmFzZSh1MzIsIHUzMiwgZXh0ZXJucmVmKSA9PiB2b2lkXG4gICAgICAgIHRhcmdldCA9IHRhcmdldCA+Pj4gMDtcbiAgICAgICAgaW5kZXggPSBpbmRleCA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLmJpbmRCdWZmZXJCYXNlKHRhcmdldCwgaW5kZXgsIGJ1ZmZlcik7XG4gICAgICB9LFxuICAgICAgZ2V0VW5pZm9ybUJsb2NrSW5kZXgocHJvZ3JhbSwgdW5pZm9ybUJsb2NrTmFtZSkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2dldFVuaWZvcm1CbG9ja0luZGV4KGV4dGVybnJlZiwgfmxpYi9zdHJpbmcvU3RyaW5nKSA9PiB1MzJcbiAgICAgICAgdW5pZm9ybUJsb2NrTmFtZSA9IF9fbGlmdFN0cmluZyh1bmlmb3JtQmxvY2tOYW1lID4+PiAwKTtcbiAgICAgICAgcmV0dXJuIF9fbW9kdWxlMC5nZXRVbmlmb3JtQmxvY2tJbmRleChwcm9ncmFtLCB1bmlmb3JtQmxvY2tOYW1lKTtcbiAgICAgIH0sXG4gICAgICBnZXRBY3RpdmVVbmlmb3JtQmxvY2tQYXJhbWV0ZXJfXzEocHJvZ3JhbSwgdW5pZm9ybUJsb2NrSW5kZXgsIHBuYW1lKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvZ2V0QWN0aXZlVW5pZm9ybUJsb2NrUGFyYW1ldGVyX18xKGV4dGVybnJlZiwgdTMyLCB1MzIpID0+IHUzMlxuICAgICAgICB1bmlmb3JtQmxvY2tJbmRleCA9IHVuaWZvcm1CbG9ja0luZGV4ID4+PiAwO1xuICAgICAgICBwbmFtZSA9IHBuYW1lID4+PiAwO1xuICAgICAgICByZXR1cm4gX19tb2R1bGUwLmdldEFjdGl2ZVVuaWZvcm1CbG9ja1BhcmFtZXRlcl9fMShwcm9ncmFtLCB1bmlmb3JtQmxvY2tJbmRleCwgcG5hbWUpO1xuICAgICAgfSxcbiAgICAgIGJ1ZmZlckRhdGFfXzEodGFyZ2V0LCBzaXplLCB1c2FnZSkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2J1ZmZlckRhdGFfXzEodTMyLCB1MzIsIHUzMikgPT4gdm9pZFxuICAgICAgICB0YXJnZXQgPSB0YXJnZXQgPj4+IDA7XG4gICAgICAgIHNpemUgPSBzaXplID4+PiAwO1xuICAgICAgICB1c2FnZSA9IHVzYWdlID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAuYnVmZmVyRGF0YV9fMSh0YXJnZXQsIHNpemUsIHVzYWdlKTtcbiAgICAgIH0sXG4gICAgICBnZXRVbmlmb3JtSW5kaWNlcyhwcm9ncmFtLCB1bmlmb3JtTmFtZXMpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9nZXRVbmlmb3JtSW5kaWNlcyhleHRlcm5yZWYsIH5saWIvYXJyYXkvQXJyYXk8fmxpYi9zdHJpbmcvU3RyaW5nPikgPT4gfmxpYi9hcnJheS9BcnJheTx1MzI+XG4gICAgICAgIHVuaWZvcm1OYW1lcyA9IF9fbGlmdEFycmF5KHBvaW50ZXIgPT4gX19saWZ0U3RyaW5nKG5ldyBVaW50MzJBcnJheShtZW1vcnkuYnVmZmVyKVtwb2ludGVyID4+PiAyXSksIDIsIHVuaWZvcm1OYW1lcyA+Pj4gMCk7XG4gICAgICAgIHJldHVybiBfX2xvd2VyQXJyYXkoKHBvaW50ZXIsIHZhbHVlKSA9PiB7IG5ldyBVaW50MzJBcnJheShtZW1vcnkuYnVmZmVyKVtwb2ludGVyID4+PiAyXSA9IHZhbHVlOyB9LCA4MCwgMiwgX19tb2R1bGUwLmdldFVuaWZvcm1JbmRpY2VzKHByb2dyYW0sIHVuaWZvcm1OYW1lcykpIHx8IF9fbm90bnVsbCgpO1xuICAgICAgfSxcbiAgICAgIGdldEFjdGl2ZVVuaWZvcm1zX18xKHByb2dyYW0sIHVuaWZvcm1JbmRpY2VzLCBwbmFtZSkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2dldEFjdGl2ZVVuaWZvcm1zX18xKGV4dGVybnJlZiwgfmxpYi9hcnJheS9BcnJheTx1MzI+LCB1MzIpID0+IH5saWIvYXJyYXkvQXJyYXk8dTMyPlxuICAgICAgICB1bmlmb3JtSW5kaWNlcyA9IF9fbGlmdEFycmF5KHBvaW50ZXIgPT4gbmV3IFVpbnQzMkFycmF5KG1lbW9yeS5idWZmZXIpW3BvaW50ZXIgPj4+IDJdLCAyLCB1bmlmb3JtSW5kaWNlcyA+Pj4gMCk7XG4gICAgICAgIHBuYW1lID0gcG5hbWUgPj4+IDA7XG4gICAgICAgIHJldHVybiBfX2xvd2VyQXJyYXkoKHBvaW50ZXIsIHZhbHVlKSA9PiB7IG5ldyBVaW50MzJBcnJheShtZW1vcnkuYnVmZmVyKVtwb2ludGVyID4+PiAyXSA9IHZhbHVlOyB9LCA4MCwgMiwgX19tb2R1bGUwLmdldEFjdGl2ZVVuaWZvcm1zX18xKHByb2dyYW0sIHVuaWZvcm1JbmRpY2VzLCBwbmFtZSkpIHx8IF9fbm90bnVsbCgpO1xuICAgICAgfSxcbiAgICAgIHVuaWZvcm1CbG9ja0JpbmRpbmcocHJvZ3JhbSwgdW5pZm9ybUJsb2NrSW5kZXgsIHVuaWZvcm1CbG9ja0JpbmRpbmcpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy91bmlmb3JtQmxvY2tCaW5kaW5nKGV4dGVybnJlZiwgdTMyLCB1MzIpID0+IHZvaWRcbiAgICAgICAgdW5pZm9ybUJsb2NrSW5kZXggPSB1bmlmb3JtQmxvY2tJbmRleCA+Pj4gMDtcbiAgICAgICAgdW5pZm9ybUJsb2NrQmluZGluZyA9IHVuaWZvcm1CbG9ja0JpbmRpbmcgPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC51bmlmb3JtQmxvY2tCaW5kaW5nKHByb2dyYW0sIHVuaWZvcm1CbG9ja0luZGV4LCB1bmlmb3JtQmxvY2tCaW5kaW5nKTtcbiAgICAgIH0sXG4gICAgICBnZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgbmFtZSkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2dldFVuaWZvcm1Mb2NhdGlvbihleHRlcm5yZWYsIH5saWIvc3RyaW5nL1N0cmluZykgPT4gZXh0ZXJucmVmXG4gICAgICAgIG5hbWUgPSBfX2xpZnRTdHJpbmcobmFtZSA+Pj4gMCk7XG4gICAgICAgIHJldHVybiBfX21vZHVsZTAuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sIG5hbWUpO1xuICAgICAgfSxcbiAgICAgIGFjdGl2ZVRleHR1cmUodGV4dHVyZSkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2FjdGl2ZVRleHR1cmUodTMyKSA9PiB2b2lkXG4gICAgICAgIHRleHR1cmUgPSB0ZXh0dXJlID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAuYWN0aXZlVGV4dHVyZSh0ZXh0dXJlKTtcbiAgICAgIH0sXG4gICAgICBiaW5kVGV4dHVyZSh0YXJnZXQsIHRleHR1cmUpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy9iaW5kVGV4dHVyZSh1MzIsIGV4dGVybnJlZikgPT4gdm9pZFxuICAgICAgICB0YXJnZXQgPSB0YXJnZXQgPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC5iaW5kVGV4dHVyZSh0YXJnZXQsIHRleHR1cmUpO1xuICAgICAgfSxcbiAgICAgIHRleEltYWdlMkRfXzYodGFyZ2V0LCBsZXZlbCwgaW50ZXJuYWxmb3JtYXQsIHdpZHRoLCBoZWlnaHQsIGJvcmRlciwgZm9ybWF0LCB0eXBlLCBwaXhlbHMpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy90ZXhJbWFnZTJEX182KHUzMiwgaTMyLCBpMzIsIGkzMiwgaTMyLCBpMzIsIHUzMiwgdTMyLCB+bGliL3R5cGVkYXJyYXkvVWludDhBcnJheSkgPT4gdm9pZFxuICAgICAgICB0YXJnZXQgPSB0YXJnZXQgPj4+IDA7XG4gICAgICAgIGZvcm1hdCA9IGZvcm1hdCA+Pj4gMDtcbiAgICAgICAgdHlwZSA9IHR5cGUgPj4+IDA7XG4gICAgICAgIHBpeGVscyA9IF9fbGlmdFR5cGVkQXJyYXkoVWludDhBcnJheSwgcGl4ZWxzID4+PiAwKTtcbiAgICAgICAgX19tb2R1bGUwLnRleEltYWdlMkRfXzYodGFyZ2V0LCBsZXZlbCwgaW50ZXJuYWxmb3JtYXQsIHdpZHRoLCBoZWlnaHQsIGJvcmRlciwgZm9ybWF0LCB0eXBlLCBwaXhlbHMpO1xuICAgICAgfSxcbiAgICAgIGdlbmVyYXRlTWlwbWFwKHRhcmdldCkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL2dlbmVyYXRlTWlwbWFwKHUzMikgPT4gdm9pZFxuICAgICAgICB0YXJnZXQgPSB0YXJnZXQgPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC5nZW5lcmF0ZU1pcG1hcCh0YXJnZXQpO1xuICAgICAgfSxcbiAgICAgIHRleFBhcmFtZXRlcmkodGFyZ2V0LCBwbmFtZSwgcGFyYW0pIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy90ZXhQYXJhbWV0ZXJpKHUzMiwgdTMyLCBpMzIpID0+IHZvaWRcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0ID4+PiAwO1xuICAgICAgICBwbmFtZSA9IHBuYW1lID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAudGV4UGFyYW1ldGVyaSh0YXJnZXQsIHBuYW1lLCBwYXJhbSk7XG4gICAgICB9LFxuICAgICAgdW5pZm9ybTFmdihsb2NhdGlvbiwgZGF0YSwgc3JjT2Zmc2V0LCBzcmNMZW5ndGgpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy91bmlmb3JtMWZ2KGV4dGVybnJlZiwgfmxpYi90eXBlZGFycmF5L0Zsb2F0MzJBcnJheSwgdTMyPywgdTMyPykgPT4gdm9pZFxuICAgICAgICBkYXRhID0gX19saWZ0VHlwZWRBcnJheShGbG9hdDMyQXJyYXksIGRhdGEgPj4+IDApO1xuICAgICAgICBzcmNPZmZzZXQgPSBzcmNPZmZzZXQgPj4+IDA7XG4gICAgICAgIHNyY0xlbmd0aCA9IHNyY0xlbmd0aCA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLnVuaWZvcm0xZnYobG9jYXRpb24sIGRhdGEsIHNyY09mZnNldCwgc3JjTGVuZ3RoKTtcbiAgICAgIH0sXG4gICAgICB1bmlmb3JtMmZ2KGxvY2F0aW9uLCBkYXRhLCBzcmNPZmZzZXQsIHNyY0xlbmd0aCkge1xuICAgICAgICAvLyBzcmMtYXMvV2ViR0wyL2ltcG9ydHMvX3R5cGVzL3VuaWZvcm0yZnYoZXh0ZXJucmVmLCB+bGliL3R5cGVkYXJyYXkvRmxvYXQzMkFycmF5LCB1MzI/LCB1MzI/KSA9PiB2b2lkXG4gICAgICAgIGRhdGEgPSBfX2xpZnRUeXBlZEFycmF5KEZsb2F0MzJBcnJheSwgZGF0YSA+Pj4gMCk7XG4gICAgICAgIHNyY09mZnNldCA9IHNyY09mZnNldCA+Pj4gMDtcbiAgICAgICAgc3JjTGVuZ3RoID0gc3JjTGVuZ3RoID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAudW5pZm9ybTJmdihsb2NhdGlvbiwgZGF0YSwgc3JjT2Zmc2V0LCBzcmNMZW5ndGgpO1xuICAgICAgfSxcbiAgICAgIHVuaWZvcm0zZnYobG9jYXRpb24sIGRhdGEsIHNyY09mZnNldCwgc3JjTGVuZ3RoKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvdW5pZm9ybTNmdihleHRlcm5yZWYsIH5saWIvdHlwZWRhcnJheS9GbG9hdDMyQXJyYXksIHUzMj8sIHUzMj8pID0+IHZvaWRcbiAgICAgICAgZGF0YSA9IF9fbGlmdFR5cGVkQXJyYXkoRmxvYXQzMkFycmF5LCBkYXRhID4+PiAwKTtcbiAgICAgICAgc3JjT2Zmc2V0ID0gc3JjT2Zmc2V0ID4+PiAwO1xuICAgICAgICBzcmNMZW5ndGggPSBzcmNMZW5ndGggPj4+IDA7XG4gICAgICAgIF9fbW9kdWxlMC51bmlmb3JtM2Z2KGxvY2F0aW9uLCBkYXRhLCBzcmNPZmZzZXQsIHNyY0xlbmd0aCk7XG4gICAgICB9LFxuICAgICAgdW5pZm9ybTRmdihsb2NhdGlvbiwgZGF0YSwgc3JjT2Zmc2V0LCBzcmNMZW5ndGgpIHtcbiAgICAgICAgLy8gc3JjLWFzL1dlYkdMMi9pbXBvcnRzL190eXBlcy91bmlmb3JtNGZ2KGV4dGVybnJlZiwgfmxpYi90eXBlZGFycmF5L0Zsb2F0MzJBcnJheSwgdTMyPywgdTMyPykgPT4gdm9pZFxuICAgICAgICBkYXRhID0gX19saWZ0VHlwZWRBcnJheShGbG9hdDMyQXJyYXksIGRhdGEgPj4+IDApO1xuICAgICAgICBzcmNPZmZzZXQgPSBzcmNPZmZzZXQgPj4+IDA7XG4gICAgICAgIHNyY0xlbmd0aCA9IHNyY0xlbmd0aCA+Pj4gMDtcbiAgICAgICAgX19tb2R1bGUwLnVuaWZvcm00ZnYobG9jYXRpb24sIGRhdGEsIHNyY09mZnNldCwgc3JjTGVuZ3RoKTtcbiAgICAgIH0sXG4gICAgICB1bmlmb3JtTWF0cml4NGZ2KGxvY2F0aW9uLCB0cmFuc3Bvc2UsIGRhdGEsIHNyY09mZnNldCwgc3JjTGVuZ3RoKSB7XG4gICAgICAgIC8vIHNyYy1hcy9XZWJHTDIvaW1wb3J0cy9fdHlwZXMvdW5pZm9ybU1hdHJpeDRmdihleHRlcm5yZWYsIGJvb2wsIH5saWIvdHlwZWRhcnJheS9GbG9hdDMyQXJyYXksIHUzMj8sIHUzMj8pID0+IHZvaWRcbiAgICAgICAgdHJhbnNwb3NlID0gdHJhbnNwb3NlICE9IDA7XG4gICAgICAgIGRhdGEgPSBfX2xpZnRUeXBlZEFycmF5KEZsb2F0MzJBcnJheSwgZGF0YSA+Pj4gMCk7XG4gICAgICAgIHNyY09mZnNldCA9IHNyY09mZnNldCA+Pj4gMDtcbiAgICAgICAgc3JjTGVuZ3RoID0gc3JjTGVuZ3RoID4+PiAwO1xuICAgICAgICBfX21vZHVsZTAudW5pZm9ybU1hdHJpeDRmdihsb2NhdGlvbiwgdHJhbnNwb3NlLCBkYXRhLCBzcmNPZmZzZXQsIHNyY0xlbmd0aCk7XG4gICAgICB9LFxuICAgIH0pLFxuICAgIGhvc3Q6IE9iamVjdC5hc3NpZ24oT2JqZWN0LmNyZWF0ZShfX21vZHVsZTEpLCB7XG4gICAgICBnZXQoaWQpIHtcbiAgICAgICAgLy8gc3JjLWFzL2ltcG9ydHMvX2hvc3QvZ2V0KHUzMikgPT4gZXh0ZXJucmVmXG4gICAgICAgIGlkID0gaWQgPj4+IDA7XG4gICAgICAgIHJldHVybiBfX21vZHVsZTEuZ2V0KGlkKTtcbiAgICAgIH0sXG4gICAgfSksXG4gIH07XG4gIGNvbnN0IHsgZXhwb3J0cyB9ID0gYXdhaXQgV2ViQXNzZW1ibHkuaW5zdGFudGlhdGUobW9kdWxlLCBhZGFwdGVkSW1wb3J0cyk7XG4gIGNvbnN0IG1lbW9yeSA9IGV4cG9ydHMubWVtb3J5IHx8IGltcG9ydHMuZW52Lm1lbW9yeTtcbiAgY29uc3QgYWRhcHRlZEV4cG9ydHMgPSBPYmplY3Quc2V0UHJvdG90eXBlT2Yoe1xuICAgIGRlZmF1bHRXb3JsZCgpIHtcbiAgICAgIC8vIHNyYy1hcy9leHBvcnRzL21haW5GYWN0b3JpZXMvZGVmYXVsdFdvcmxkKCkgPT4gc3JjLWFzL2Jhc2UvV29ybGQvV29ybGRcbiAgICAgIHJldHVybiBfX2xpZnRJbnRlcm5yZWYoZXhwb3J0cy5kZWZhdWx0V29ybGQoKSA+Pj4gMCk7XG4gICAgfSxcbiAgICBkZWZhdWx0Q2FtZXJhKCkge1xuICAgICAgLy8gc3JjLWFzL2V4cG9ydHMvY2FtZXJhRmFjdG9yaWVzL2RlZmF1bHRDYW1lcmEoKSA9PiBzcmMtYXMvYmFzZS9FbnRpdHkvRW50aXR5XG4gICAgICByZXR1cm4gX19saWZ0SW50ZXJucmVmKGV4cG9ydHMuZGVmYXVsdENhbWVyYSgpID4+PiAwKTtcbiAgICB9LFxuICAgIHJvdGF0aW5nQ3ViZShfc2hhZGVyKSB7XG4gICAgICAvLyBzcmMtYXMvZXhwb3J0cy9kZW1vcy9yb3RhdGluZ0N1YmUoc3JjLWFzL3JlbmRlcmluZy9zaGFkZXIvU2hhZGVyL1NoYWRlciB8IG51bGwpID0+IHNyYy1hcy9iYXNlL0VudGl0eS9FbnRpdHlcbiAgICAgIF9zaGFkZXIgPSBfX2xvd2VySW50ZXJucmVmKF9zaGFkZXIpO1xuICAgICAgcmV0dXJuIF9fbGlmdEludGVybnJlZihleHBvcnRzLnJvdGF0aW5nQ3ViZShfc2hhZGVyKSA+Pj4gMCk7XG4gICAgfSxcbiAgICB1bmxpdFZlcnRleENvbG9yU2hhZGVyOiB7XG4gICAgICAvLyBzcmMtYXMvcmVuZGVyaW5nL3NoYWRlci91bmxpdC91bmxpdFZlcnRleENvbG9ycy91bmxpdFZlcnRleENvbG9yU2hhZGVyOiBzcmMtYXMvcmVuZGVyaW5nL3NoYWRlci9TaGFkZXIvU2hhZGVyXG4gICAgICB2YWx1ZU9mKCkgeyByZXR1cm4gdGhpcy52YWx1ZTsgfSxcbiAgICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIF9fbGlmdEludGVybnJlZihleHBvcnRzLnVubGl0VmVydGV4Q29sb3JTaGFkZXIudmFsdWUgPj4+IDApO1xuICAgICAgfVxuICAgIH0sXG4gICAgbGl0U2hhZGVyOiB7XG4gICAgICAvLyBzcmMtYXMvcmVuZGVyaW5nL3NoYWRlci9saXQvbGl0U2hhZGVyL2xpdFNoYWRlcjogc3JjLWFzL3JlbmRlcmluZy9zaGFkZXIvU2hhZGVyL1NoYWRlclxuICAgICAgdmFsdWVPZigpIHsgcmV0dXJuIHRoaXMudmFsdWU7IH0sXG4gICAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiBfX2xpZnRJbnRlcm5yZWYoZXhwb3J0cy5saXRTaGFkZXIudmFsdWUgPj4+IDApO1xuICAgICAgfVxuICAgIH0sXG4gIH0sIGV4cG9ydHMpO1xuICBmdW5jdGlvbiBfX2xpZnRTdHJpbmcocG9pbnRlcikge1xuICAgIGlmICghcG9pbnRlcikgcmV0dXJuIG51bGw7XG4gICAgY29uc3RcbiAgICAgIGVuZCA9IHBvaW50ZXIgKyBuZXcgVWludDMyQXJyYXkobWVtb3J5LmJ1ZmZlcilbcG9pbnRlciAtIDQgPj4+IDJdID4+PiAxLFxuICAgICAgbWVtb3J5VTE2ID0gbmV3IFVpbnQxNkFycmF5KG1lbW9yeS5idWZmZXIpO1xuICAgIGxldFxuICAgICAgc3RhcnQgPSBwb2ludGVyID4+PiAxLFxuICAgICAgc3RyaW5nID0gXCJcIjtcbiAgICB3aGlsZSAoZW5kIC0gc3RhcnQgPiAxMDI0KSBzdHJpbmcgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSguLi5tZW1vcnlVMTYuc3ViYXJyYXkoc3RhcnQsIHN0YXJ0ICs9IDEwMjQpKTtcbiAgICByZXR1cm4gc3RyaW5nICsgU3RyaW5nLmZyb21DaGFyQ29kZSguLi5tZW1vcnlVMTYuc3ViYXJyYXkoc3RhcnQsIGVuZCkpO1xuICB9XG4gIGZ1bmN0aW9uIF9fbG93ZXJTdHJpbmcodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuIDA7XG4gICAgY29uc3RcbiAgICAgIGxlbmd0aCA9IHZhbHVlLmxlbmd0aCxcbiAgICAgIHBvaW50ZXIgPSBleHBvcnRzLl9fbmV3KGxlbmd0aCA8PCAxLCAxKSA+Pj4gMCxcbiAgICAgIG1lbW9yeVUxNiA9IG5ldyBVaW50MTZBcnJheShtZW1vcnkuYnVmZmVyKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSBtZW1vcnlVMTZbKHBvaW50ZXIgPj4+IDEpICsgaV0gPSB2YWx1ZS5jaGFyQ29kZUF0KGkpO1xuICAgIHJldHVybiBwb2ludGVyO1xuICB9XG4gIGZ1bmN0aW9uIF9fbGlmdEFycmF5KGxpZnRFbGVtZW50LCBhbGlnbiwgcG9pbnRlcikge1xuICAgIGlmICghcG9pbnRlcikgcmV0dXJuIG51bGw7XG4gICAgY29uc3RcbiAgICAgIG1lbW9yeVUzMiA9IG5ldyBVaW50MzJBcnJheShtZW1vcnkuYnVmZmVyKSxcbiAgICAgIGRhdGFTdGFydCA9IG1lbW9yeVUzMltwb2ludGVyICsgNCA+Pj4gMl0sXG4gICAgICBsZW5ndGggPSBtZW1vcnlVMzJbcG9pbnRlciArIDEyID4+PiAyXSxcbiAgICAgIHZhbHVlcyA9IG5ldyBBcnJheShsZW5ndGgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHZhbHVlc1tpXSA9IGxpZnRFbGVtZW50KGRhdGFTdGFydCArIChpIDw8IGFsaWduID4+PiAwKSk7XG4gICAgcmV0dXJuIHZhbHVlcztcbiAgfVxuICBmdW5jdGlvbiBfX2xvd2VyQXJyYXkobG93ZXJFbGVtZW50LCBpZCwgYWxpZ24sIHZhbHVlcykge1xuICAgIGlmICh2YWx1ZXMgPT0gbnVsbCkgcmV0dXJuIDA7XG4gICAgY29uc3RcbiAgICAgIGxlbmd0aCA9IHZhbHVlcy5sZW5ndGgsXG4gICAgICBidWZmZXIgPSBleHBvcnRzLl9fcGluKGV4cG9ydHMuX19uZXcobGVuZ3RoIDw8IGFsaWduLCAwKSkgPj4+IDAsXG4gICAgICBoZWFkZXIgPSBleHBvcnRzLl9fcGluKGV4cG9ydHMuX19uZXcoMTYsIGlkKSkgPj4+IDAsXG4gICAgICBtZW1vcnlVMzIgPSBuZXcgVWludDMyQXJyYXkobWVtb3J5LmJ1ZmZlcik7XG4gICAgbWVtb3J5VTMyW2hlYWRlciArIDAgPj4+IDJdID0gYnVmZmVyO1xuICAgIG1lbW9yeVUzMltoZWFkZXIgKyA0ID4+PiAyXSA9IGJ1ZmZlcjtcbiAgICBtZW1vcnlVMzJbaGVhZGVyICsgOCA+Pj4gMl0gPSBsZW5ndGggPDwgYWxpZ247XG4gICAgbWVtb3J5VTMyW2hlYWRlciArIDEyID4+PiAyXSA9IGxlbmd0aDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSBsb3dlckVsZW1lbnQoYnVmZmVyICsgKGkgPDwgYWxpZ24gPj4+IDApLCB2YWx1ZXNbaV0pO1xuICAgIGV4cG9ydHMuX191bnBpbihidWZmZXIpO1xuICAgIGV4cG9ydHMuX191bnBpbihoZWFkZXIpO1xuICAgIHJldHVybiBoZWFkZXI7XG4gIH1cbiAgZnVuY3Rpb24gX19saWZ0VHlwZWRBcnJheShjb25zdHJ1Y3RvciwgcG9pbnRlcikge1xuICAgIGlmICghcG9pbnRlcikgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgbWVtb3J5VTMyID0gbmV3IFVpbnQzMkFycmF5KG1lbW9yeS5idWZmZXIpO1xuICAgIHJldHVybiBuZXcgY29uc3RydWN0b3IoXG4gICAgICBtZW1vcnkuYnVmZmVyLFxuICAgICAgbWVtb3J5VTMyW3BvaW50ZXIgKyA0ID4+PiAyXSxcbiAgICAgIG1lbW9yeVUzMltwb2ludGVyICsgOCA+Pj4gMl0gLyBjb25zdHJ1Y3Rvci5CWVRFU19QRVJfRUxFTUVOVFxuICAgICkuc2xpY2UoKTtcbiAgfVxuICBjb25zdCByZWdpc3RyeSA9IG5ldyBGaW5hbGl6YXRpb25SZWdpc3RyeShfX3JlbGVhc2UpO1xuICBjbGFzcyBJbnRlcm5yZWYgZXh0ZW5kcyBOdW1iZXIge31cbiAgZnVuY3Rpb24gX19saWZ0SW50ZXJucmVmKHBvaW50ZXIpIHtcbiAgICBpZiAoIXBvaW50ZXIpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IHNlbnRpbmVsID0gbmV3IEludGVybnJlZihfX3JldGFpbihwb2ludGVyKSk7XG4gICAgcmVnaXN0cnkucmVnaXN0ZXIoc2VudGluZWwsIHBvaW50ZXIpO1xuICAgIHJldHVybiBzZW50aW5lbDtcbiAgfVxuICBmdW5jdGlvbiBfX2xvd2VySW50ZXJucmVmKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybiAwO1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEludGVybnJlZikgcmV0dXJuIHZhbHVlLnZhbHVlT2YoKTtcbiAgICB0aHJvdyBUeXBlRXJyb3IoXCJpbnRlcm5yZWYgZXhwZWN0ZWRcIik7XG4gIH1cbiAgY29uc3QgcmVmY291bnRzID0gbmV3IE1hcCgpO1xuICBmdW5jdGlvbiBfX3JldGFpbihwb2ludGVyKSB7XG4gICAgaWYgKHBvaW50ZXIpIHtcbiAgICAgIGNvbnN0IHJlZmNvdW50ID0gcmVmY291bnRzLmdldChwb2ludGVyKTtcbiAgICAgIGlmIChyZWZjb3VudCkgcmVmY291bnRzLnNldChwb2ludGVyLCByZWZjb3VudCArIDEpO1xuICAgICAgZWxzZSByZWZjb3VudHMuc2V0KGV4cG9ydHMuX19waW4ocG9pbnRlciksIDEpO1xuICAgIH1cbiAgICByZXR1cm4gcG9pbnRlcjtcbiAgfVxuICBmdW5jdGlvbiBfX3JlbGVhc2UocG9pbnRlcikge1xuICAgIGlmIChwb2ludGVyKSB7XG4gICAgICBjb25zdCByZWZjb3VudCA9IHJlZmNvdW50cy5nZXQocG9pbnRlcik7XG4gICAgICBpZiAocmVmY291bnQgPT09IDEpIGV4cG9ydHMuX191bnBpbihwb2ludGVyKSwgcmVmY291bnRzLmRlbGV0ZShwb2ludGVyKTtcbiAgICAgIGVsc2UgaWYgKHJlZmNvdW50KSByZWZjb3VudHMuc2V0KHBvaW50ZXIsIHJlZmNvdW50IC0gMSk7XG4gICAgICBlbHNlIHRocm93IEVycm9yKGBpbnZhbGlkIHJlZmNvdW50ICcke3JlZmNvdW50fScgZm9yIHJlZmVyZW5jZSAnJHtwb2ludGVyfSdgKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gX19ub3RudWxsKCkge1xuICAgIHRocm93IFR5cGVFcnJvcihcInZhbHVlIG11c3Qgbm90IGJlIG51bGxcIik7XG4gIH1cbiAgcmV0dXJuIGFkYXB0ZWRFeHBvcnRzO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9