
export type GLbitfield = u32;
export type GLboolean = bool;
export type GLclampf = f32;
export type GLenum = u32;
export type GLfloat = f32;
export type GLint = i32;
export type GLint64 = i64;
export type GLintptr = i32;
export type GLsizei = i32;
export type GLsizeiptr = u32;
export type GLuint = u32;
export type GLuint64 = u64;
//lists actually also accept GLfloat[], GLint[] etc
export type Float32List = Float32Array 
export type Int32List = Int32Array
export type Uint32List = Uint32Array
export type BufferSource = ArrayBuffer; // type BufferSource = ArrayBufferView | ArrayBuffer;
export type TexImageSource = externref // type TexImageSource = ImageBitmap | ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;

export type WebGLQuery = externref
export type WebGLBuffer = externref
export type WebGLSampler = externref
export type WebGLShader = externref
export type WebGLTransformFeedback = externref
export type WebGLVertexArrayObject = externref
export type WebGLUniformLocation = externref
export type WebGLSync = externref
export type WebGLTexture = externref
export type WebGLVertexArrayObjectOES = externref
export type WebGLFramebuffer = externref
export type WebGLProgram = externref
export type WebGLRenderbuffer = externref
export class WebGLContextAttributes {
    alpha: bool;
    antialias: bool;
    depth: bool;
    desynchronized: bool;
    failIfMajorPerformanceCaveat: bool;
    // powerPreference: WebGLPowerPreference;
    powerPreference: string;
    premultipliedAlpha: bool;
    preserveDrawingBuffer: bool;
    stencil: bool;
}
// export type WebGLPowerPreference = 'default' | 'high-performance' | 'low-power';

export class WebGLShaderPrecisionFormat{
	readonly precision: GLint;
	readonly rangeMax: GLint;
	readonly rangeMin: GLint;
}
export class WebGLActiveInfo {
    readonly name: string;
    readonly size: GLint;
    readonly type: GLenum;
}
// interface WebGLContextEvent extends Event {
//     readonly statusMessage: string;
// }





//----------------webgl2----------------





//@ts-ignore external
@external('gl', 'beginQuery')
export declare function beginQuery(target: GLenum, query: WebGLQuery): void

//@ts-ignore external
@external('gl', 'beginTransformFeedback')
export declare function beginTransformFeedback(primitiveMode: GLenum): void

//@ts-ignore external
@external('gl', 'bindBufferBase')
export declare function bindBufferBase(target: GLenum, index: GLuint, buffer: WebGLBuffer): void

//@ts-ignore external
@external('gl', 'bindBufferRange')
export declare function bindBufferRange(target: GLenum, index: GLuint, buffer: WebGLBuffer, offset: GLintptr, size: GLsizeiptr): void

//@ts-ignore external
@external('gl', 'bindSampler')
export declare function bindSampler(unit: GLuint, sampler: WebGLSampler): void

//@ts-ignore external
@external('gl', 'bindTransformFeedback')
export declare function bindTransformFeedback(target: GLenum, tf: WebGLTransformFeedback): void

//@ts-ignore external
@external('gl', 'bindVertexArray')
export declare function bindVertexArray(array: WebGLVertexArrayObject): void

//@ts-ignore external
@external('gl', 'blitFramebuffer')
export declare function blitFramebuffer(srcX0: GLint, srcY0: GLint, srcX1: GLint, srcY1: GLint, dstX0: GLint, dstY0: GLint, dstX1: GLint, dstY1: GLint, mask: GLbitfield, filter: GLenum): void

//@ts-ignore external
@external('gl', 'clearBufferfi')
export declare function clearBufferfi(buffer: GLenum, drawbuffer: GLint, depth: GLfloat, stencil: GLint): void

//@ts-ignore external
@external('gl', 'clearBufferfv')
export declare function clearBufferfv(buffer: GLenum, drawbuffer: GLint, values: Float32List, srcOffset?: GLuint): void

//@ts-ignore external
@external('gl', 'clearBufferiv')
export declare function clearBufferiv(buffer: GLenum, drawbuffer: GLint, values: Int32List, srcOffset?: GLuint): void

//@ts-ignore external
@external('gl', 'clearBufferuiv')
export declare function clearBufferuiv(buffer: GLenum, drawbuffer: GLint, values: Uint32List, srcOffset?: GLuint): void

//@ts-ignore external
@external('gl', 'clientWaitSync')
export declare function clientWaitSync(sync: WebGLSync, flags: GLbitfield, timeout: GLuint64): GLenum

//@ts-ignore external
@external('gl', 'compressedTexImage3D__1')
export declare function compressedTexImage3D__1(target: GLenum, level: GLint, internalformat: GLenum, width: GLsizei, height: GLsizei, depth: GLsizei, border: GLint, imageSize: GLsizei, offset: GLintptr): void

//@ts-ignore external
@external('gl', 'compressedTexImage3D__2')
export declare function compressedTexImage3D__2(target: GLenum, level: GLint, internalformat: GLenum, width: GLsizei, height: GLsizei, depth: GLsizei, border: GLint, srcData: ArrayBufferView, srcOffset?: GLuint, srcLengthOverride?: GLuint): void

//@ts-ignore external
@external('gl', 'compressedTexSubImage3D__1')
export declare function compressedTexSubImage3D__1(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GLenum, imageSize: GLsizei, offset: GLintptr): void

//@ts-ignore external
@external('gl', 'compressedTexSubImage3D__2')
export declare function compressedTexSubImage3D__2(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GLenum, srcData: ArrayBufferView, srcOffset?: GLuint, srcLengthOverride?: GLuint): void

//@ts-ignore external
@external('gl', 'copyBufferSubData')
export declare function copyBufferSubData(readTarget: GLenum, writeTarget: GLenum, readOffset: GLintptr, writeOffset: GLintptr, size: GLsizeiptr): void

//@ts-ignore external
@external('gl', 'copyTexSubImage3D')
export declare function copyTexSubImage3D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, x: GLint, y: GLint, width: GLsizei, height: GLsizei): void

//@ts-ignore external
@external('gl', 'createQuery')
export declare function createQuery(): WebGLQuery

//@ts-ignore external
@external('gl', 'createSampler')
export declare function createSampler(): WebGLSampler

//@ts-ignore external
@external('gl', 'createTransformFeedback')
export declare function createTransformFeedback(): WebGLTransformFeedback

//@ts-ignore external
@external('gl', 'createVertexArray')
export declare function createVertexArray(): WebGLVertexArrayObject

//@ts-ignore external
@external('gl', 'deleteQuery')
export declare function deleteQuery(query: WebGLQuery): void

//@ts-ignore external
@external('gl', 'deleteSampler')
export declare function deleteSampler(sampler: WebGLSampler): void

//@ts-ignore external
@external('gl', 'deleteSync')
export declare function deleteSync(sync: WebGLSync): void

//@ts-ignore external
@external('gl', 'deleteTransformFeedback')
export declare function deleteTransformFeedback(tf: WebGLTransformFeedback): void

//@ts-ignore external
@external('gl', 'deleteVertexArray')
export declare function deleteVertexArray(vertexArray: WebGLVertexArrayObject): void

//@ts-ignore external
@external('gl', 'drawArraysInstanced')
export declare function drawArraysInstanced(mode: GLenum, first: GLint, count: GLsizei, instanceCount: GLsizei): void

//@ts-ignore external
@external('gl', 'drawBuffers')
export declare function drawBuffers(buffers: GLenum[]): void

//@ts-ignore external
@external('gl', 'drawElementsInstanced')
export declare function drawElementsInstanced(mode: GLenum, count: GLsizei, type: GLenum, offset: GLintptr, instanceCount: GLsizei): void

//@ts-ignore external
@external('gl', 'drawRangeElements')
export declare function drawRangeElements(mode: GLenum, start: GLuint, end: GLuint, count: GLsizei, type: GLenum, offset: GLintptr): void

//@ts-ignore external
@external('gl', 'endQuery')
export declare function endQuery(target: GLenum): void

//@ts-ignore external
@external('gl', 'endTransformFeedback')
export declare function endTransformFeedback(): void

//@ts-ignore external
@external('gl', 'fenceSync')
export declare function fenceSync(condition: GLenum, flags: GLbitfield): WebGLSync

//@ts-ignore external
@external('gl', 'framebufferTextureLayer')
export declare function framebufferTextureLayer(target: GLenum, attachment: GLenum, texture: WebGLTexture, level: GLint, layer: GLint): void

//@ts-ignore external
@external('gl', 'getActiveUniformBlockName')
export declare function getActiveUniformBlockName(program: WebGLProgram, uniformBlockIndex: GLuint): string

//@ts-ignore external
@external('gl', 'getActiveUniformBlockParameter__1')
export declare function getActiveUniformBlockParameter__1(program: WebGLProgram, uniformBlockIndex: GLuint, pname: GLenum): GLsizeiptr

//@ts-ignore external
@external('gl', 'getActiveUniformBlockParameter__2')
export declare function getActiveUniformBlockParameter__2(program: WebGLProgram, uniformBlockIndex: GLuint, pname: GLenum): any

//@ts-ignore external
@external('gl', 'getActiveUniforms__1')
export declare function getActiveUniforms__1(program: WebGLProgram, uniformIndices: GLuint[], pname: GLenum): GLuint[]

//@ts-ignore external
@external('gl', 'getActiveUniforms__2')
export declare function getActiveUniforms__2(program: WebGLProgram, uniformIndices: GLuint[], pname: GLenum): any

//@ts-ignore external
@external('gl', 'getBufferSubData')
export declare function getBufferSubData(target: GLenum, srcByteOffset: GLintptr, dstBuffer: ArrayBufferView, dstOffset?: GLuint, length?: GLuint): void

//@ts-ignore external
@external('gl', 'getFragDataLocation')
export declare function getFragDataLocation(program: WebGLProgram, name: string): GLint

//@ts-ignore external
@external('gl', 'getIndexedParameter')
export declare function getIndexedParameter(target: GLenum, index: GLuint): any

//@ts-ignore external
@external('gl', 'getInternalformatParameter')
export declare function getInternalformatParameter(target: GLenum, internalformat: GLenum, pname: GLenum): any

//@ts-ignore external
@external('gl', 'getQuery')
export declare function getQuery(target: GLenum, pname: GLenum): WebGLQuery

//@ts-ignore external
@external('gl', 'getQueryParameter')
export declare function getQueryParameter(query: WebGLQuery, pname: GLenum): any

//@ts-ignore external
@external('gl', 'getSamplerParameter')
export declare function getSamplerParameter(sampler: WebGLSampler, pname: GLenum): any

//@ts-ignore external
@external('gl', 'getSyncParameter')
export declare function getSyncParameter(sync: WebGLSync, pname: GLenum): any

//@ts-ignore external
@external('gl', 'getTransformFeedbackVarying')
export declare function getTransformFeedbackVarying(program: WebGLProgram, index: GLuint): WebGLActiveInfo

//@ts-ignore external
@external('gl', 'getUniformBlockIndex')
export declare function getUniformBlockIndex(program: WebGLProgram, uniformBlockName: string): GLuint

//@ts-ignore external
@external('gl', 'getUniformIndices')
export declare function getUniformIndices(program: WebGLProgram, uniformNames: string[]): GLuint[]

//@ts-ignore external
@external('gl', 'invalidateFramebuffer')
export declare function invalidateFramebuffer(target: GLenum, attachments: GLenum[]): void

//@ts-ignore external
@external('gl', 'invalidateSubFramebuffer')
export declare function invalidateSubFramebuffer(target: GLenum, attachments: GLenum[], x: GLint, y: GLint, width: GLsizei, height: GLsizei): void

//@ts-ignore external
@external('gl', 'isQuery')
export declare function isQuery(query: WebGLQuery): GLboolean

//@ts-ignore external
@external('gl', 'isSampler')
export declare function isSampler(sampler: WebGLSampler): GLboolean

//@ts-ignore external
@external('gl', 'isSync')
export declare function isSync(sync: WebGLSync): GLboolean

//@ts-ignore external
@external('gl', 'isTransformFeedback')
export declare function isTransformFeedback(tf: WebGLTransformFeedback): GLboolean

//@ts-ignore external
@external('gl', 'isVertexArray')
export declare function isVertexArray(vertexArray: WebGLVertexArrayObject): GLboolean

//@ts-ignore external
@external('gl', 'pauseTransformFeedback')
export declare function pauseTransformFeedback(): void

//@ts-ignore external
@external('gl', 'readBuffer')
export declare function readBuffer(src: GLenum): void

//@ts-ignore external
@external('gl', 'renderbufferStorageMultisample')
export declare function renderbufferStorageMultisample(target: GLenum, samples: GLsizei, internalformat: GLenum, width: GLsizei, height: GLsizei): void

//@ts-ignore external
@external('gl', 'resumeTransformFeedback')
export declare function resumeTransformFeedback(): void

//@ts-ignore external
@external('gl', 'samplerParameterf')
export declare function samplerParameterf(sampler: WebGLSampler, pname: GLenum, param: GLfloat): void

//@ts-ignore external
@external('gl', 'samplerParameteri')
export declare function samplerParameteri(sampler: WebGLSampler, pname: GLenum, param: GLint): void

//@ts-ignore external
@external('gl', 'texImage3D__1')
export declare function texImage3D__1(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, border: GLint, format: GLenum, type: GLenum, pboOffset: GLintptr): void

//@ts-ignore external
@external('gl', 'texImage3D__2')
export declare function texImage3D__2(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, border: GLint, format: GLenum, type: GLenum, source: TexImageSource): void

//@ts-ignore external
@external('gl', 'texImage3D__3')
export declare function texImage3D__3(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, border: GLint, format: GLenum, type: GLenum, srcData: ArrayBufferView): void

//@ts-ignore external
@external('gl', 'texImage3D__4')
export declare function texImage3D__4(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, border: GLint, format: GLenum, type: GLenum, srcData: ArrayBufferView, srcOffset: GLuint): void

//@ts-ignore external
@external('gl', 'texStorage2D')
export declare function texStorage2D(target: GLenum, levels: GLsizei, internalformat: GLenum, width: GLsizei, height: GLsizei): void

//@ts-ignore external
@external('gl', 'texStorage3D')
export declare function texStorage3D(target: GLenum, levels: GLsizei, internalformat: GLenum, width: GLsizei, height: GLsizei, depth: GLsizei): void

//@ts-ignore external
@external('gl', 'texSubImage3D__1')
export declare function texSubImage3D__1(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GLenum, type: GLenum, pboOffset: GLintptr): void

//@ts-ignore external
@external('gl', 'texSubImage3D__2')
export declare function texSubImage3D__2(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GLenum, type: GLenum, source: TexImageSource): void

//@ts-ignore external
@external('gl', 'texSubImage3D__3')
export declare function texSubImage3D__3(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GLenum, type: GLenum, srcData: ArrayBufferView, srcOffset?: GLuint): void

//@ts-ignore external
@external('gl', 'transformFeedbackVaryings')
export declare function transformFeedbackVaryings(program: WebGLProgram, varyings: string[], bufferMode: GLenum): void

//@ts-ignore external
@external('gl', 'uniform1ui')
export declare function uniform1ui(location: WebGLUniformLocation, v0: GLuint): void

//@ts-ignore external
@external('gl', 'uniform1uiv')
export declare function uniform1uiv(location: WebGLUniformLocation, data: Uint32List, srcOffset?: GLuint, srcLength?: GLuint): void

//@ts-ignore external
@external('gl', 'uniform2ui')
export declare function uniform2ui(location: WebGLUniformLocation, v0: GLuint, v1: GLuint): void

//@ts-ignore external
@external('gl', 'uniform2uiv')
export declare function uniform2uiv(location: WebGLUniformLocation, data: Uint32List, srcOffset?: GLuint, srcLength?: GLuint): void

//@ts-ignore external
@external('gl', 'uniform3ui')
export declare function uniform3ui(location: WebGLUniformLocation, v0: GLuint, v1: GLuint, v2: GLuint): void

//@ts-ignore external
@external('gl', 'uniform3uiv')
export declare function uniform3uiv(location: WebGLUniformLocation, data: Uint32List, srcOffset?: GLuint, srcLength?: GLuint): void

//@ts-ignore external
@external('gl', 'uniform4ui')
export declare function uniform4ui(location: WebGLUniformLocation, v0: GLuint, v1: GLuint, v2: GLuint, v3: GLuint): void

//@ts-ignore external
@external('gl', 'uniform4uiv')
export declare function uniform4uiv(location: WebGLUniformLocation, data: Uint32List, srcOffset?: GLuint, srcLength?: GLuint): void

//@ts-ignore external
@external('gl', 'uniformBlockBinding')
export declare function uniformBlockBinding(program: WebGLProgram, uniformBlockIndex: GLuint, uniformBlockBinding: GLuint): void

//@ts-ignore external
@external('gl', 'uniformMatrix2x3fv')
export declare function uniformMatrix2x3fv(location: WebGLUniformLocation, transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void

//@ts-ignore external
@external('gl', 'uniformMatrix2x4fv')
export declare function uniformMatrix2x4fv(location: WebGLUniformLocation, transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void

//@ts-ignore external
@external('gl', 'uniformMatrix3x2fv')
export declare function uniformMatrix3x2fv(location: WebGLUniformLocation, transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void

//@ts-ignore external
@external('gl', 'uniformMatrix3x4fv')
export declare function uniformMatrix3x4fv(location: WebGLUniformLocation, transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void

//@ts-ignore external
@external('gl', 'uniformMatrix4x2fv')
export declare function uniformMatrix4x2fv(location: WebGLUniformLocation, transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void

//@ts-ignore external
@external('gl', 'uniformMatrix4x3fv')
export declare function uniformMatrix4x3fv(location: WebGLUniformLocation, transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void

//@ts-ignore external
@external('gl', 'vertexAttribDivisor')
export declare function vertexAttribDivisor(index: GLuint, divisor: GLuint): void

//@ts-ignore external
@external('gl', 'vertexAttribI4i')
export declare function vertexAttribI4i(index: GLuint, x: GLint, y: GLint, z: GLint, w: GLint): void

//@ts-ignore external
@external('gl', 'vertexAttribI4iv')
export declare function vertexAttribI4iv(index: GLuint, values: Int32List): void

//@ts-ignore external
@external('gl', 'vertexAttribI4ui')
export declare function vertexAttribI4ui(index: GLuint, x: GLuint, y: GLuint, z: GLuint, w: GLuint): void

//@ts-ignore external
@external('gl', 'vertexAttribI4uiv')
export declare function vertexAttribI4uiv(index: GLuint, values: Uint32List): void

//@ts-ignore external
@external('gl', 'vertexAttribIPointer')
export declare function vertexAttribIPointer(index: GLuint, size: GLint, type: GLenum, stride: GLsizei, offset: GLintptr): void

//@ts-ignore external
@external('gl', 'waitSync')
export declare function waitSync(sync: WebGLSync, flags: GLbitfield, timeout: GLint64): void





//----------------webgl2 overloads----------------




//@ts-ignore external
@external('gl', 'bufferData__1')
export declare function bufferData__1(target: GLenum, size: GLsizeiptr, usage: GLenum): void

//@ts-ignore external
@external('gl', 'bufferData__2')
export declare function bufferData__2(target: GLenum, srcData: BufferSource, usage: GLenum): void

//@ts-ignore external
@external('gl', 'bufferData__3')
export declare function bufferData__3(target: GLenum, srcData: Float32Array, usage: GLenum): void

//@ts-ignore external
@external('gl', 'bufferData__4')
export declare function bufferData__4(target: GLenum, srcData: Uint8Array, usage: GLenum): void

//@ts-ignore external
@external('gl', 'bufferData__5')
export declare function bufferData__5(target: GLenum, srcData: Uint16Array, usage: GLenum): void

//@ts-ignore external
@external('gl', 'bufferData__6')
export declare function bufferData__6(target: GLenum, srcData: Uint32Array, usage: GLenum): void

//@ts-ignore external
@external('gl', 'bufferData__7')
export declare function bufferData__7(target: GLenum, srcData: Int32Array, usage: GLenum): void

// //@ts-ignore external
// @external('gl', 'bufferData')
// export declare function bufferData__3(target: GLenum, srcData: ArrayBufferView, usage: GLenum, srcOffset: GLuint, length?: GLuint): void

//@ts-ignore external
@external('gl', 'bufferSubData__1')
export declare function bufferSubData__1(target: GLenum, dstByteOffset: GLintptr, srcData: BufferSource): void

//@ts-ignore external
@external('gl', 'bufferSubData__2')
export declare function bufferSubData__2(target: GLenum, dstByteOffset: GLintptr, srcData: Float32Array, srcOffset: GLuint, length?: GLuint): void

//@ts-ignore external
@external('gl', 'compressedTexImage2D__1')
export declare function compressedTexImage2D__1(target: GLenum, level: GLint, internalformat: GLenum, width: GLsizei, height: GLsizei, border: GLint, imageSize: GLsizei, offset: GLintptr): void

//@ts-ignore external
@external('gl', 'compressedTexImage2D__2')
export declare function compressedTexImage2D__2(target: GLenum, level: GLint, internalformat: GLenum, width: GLsizei, height: GLsizei, border: GLint, srcData: ArrayBufferView, srcOffset?: GLuint, srcLengthOverride?: GLuint): void

//@ts-ignore external
@external('gl', 'compressedTexSubImage2D__1')
export declare function compressedTexSubImage2D__1(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GLenum, imageSize: GLsizei, offset: GLintptr): void

//@ts-ignore external
@external('gl', 'compressedTexSubImage2D__2')
export declare function compressedTexSubImage2D__2(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GLenum, srcData: ArrayBufferView, srcOffset?: GLuint, srcLengthOverride?: GLuint): void

//@ts-ignore external
@external('gl', 'readPixels__1')
export declare function readPixels__1(x: GLint, y: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, dstData: ArrayBufferView): void

//@ts-ignore external
@external('gl', 'readPixels__2')
export declare function readPixels__2(x: GLint, y: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, offset: GLintptr): void

//@ts-ignore external
@external('gl', 'readPixels__3')
export declare function readPixels__3(x: GLint, y: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, dstData: ArrayBufferView, dstOffset: GLuint): void

//@ts-ignore external
@external('gl', 'texImage2D__1')
export declare function texImage2D__1(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, border: GLint, format: GLenum, type: GLenum, pixels: ArrayBufferView): void

//@ts-ignore external
@external('gl', 'texImage2D__2')
export declare function texImage2D__2(target: GLenum, level: GLint, internalformat: GLint, format: GLenum, type: GLenum, source: TexImageSource): void

//@ts-ignore external
@external('gl', 'texImage2D__3')
export declare function texImage2D__3(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, border: GLint, format: GLenum, type: GLenum, pboOffset: GLintptr): void

//@ts-ignore external
@external('gl', 'texImage2D__4')
export declare function texImage2D__4(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, border: GLint, format: GLenum, type: GLenum, source: TexImageSource): void

//@ts-ignore external
@external('gl', 'texImage2D__5')
export declare function texImage2D__5(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, border: GLint, format: GLenum, type: GLenum, srcData: ArrayBufferView, srcOffset: GLuint): void

//@ts-ignore external
@external('gl', 'texImage2D__6')
export declare function texImage2D__6(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, border: GLint, format: GLenum, type: GLenum, pixels: Uint8Array): void

//@ts-ignore external
@external('gl', 'texSubImage2D__1')
export declare function texSubImage2D__1(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, pixels: ArrayBufferView): void

//@ts-ignore external
@external('gl', 'texSubImage2D__2')
export declare function texSubImage2D__2(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, format: GLenum, type: GLenum, source: TexImageSource): void

//@ts-ignore external
@external('gl', 'texSubImage2D__3')
export declare function texSubImage2D__3(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, pboOffset: GLintptr): void

//@ts-ignore external
@external('gl', 'texSubImage2D__4')
export declare function texSubImage2D__4(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, source: TexImageSource): void

//@ts-ignore external
@external('gl', 'texSubImage2D__5')
export declare function texSubImage2D__5(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, srcData: ArrayBufferView, srcOffset: GLuint): void

//@ts-ignore external
@external('gl', 'uniform1fv')
export declare function uniform1fv(location: WebGLUniformLocation, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void

//@ts-ignore external
@external('gl', 'uniform1iv')
export declare function uniform1iv(location: WebGLUniformLocation, data: Int32List, srcOffset?: GLuint, srcLength?: GLuint): void

//@ts-ignore external
@external('gl', 'uniform2fv')
export declare function uniform2fv(location: WebGLUniformLocation, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void

//@ts-ignore external
@external('gl', 'uniform2iv')
export declare function uniform2iv(location: WebGLUniformLocation, data: Int32List, srcOffset?: GLuint, srcLength?: GLuint): void

//@ts-ignore external
@external('gl', 'uniform3fv')
export declare function uniform3fv(location: WebGLUniformLocation, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void

//@ts-ignore external
@external('gl', 'uniform3iv')
export declare function uniform3iv(location: WebGLUniformLocation, data: Int32List, srcOffset?: GLuint, srcLength?: GLuint): void

//@ts-ignore external
@external('gl', 'uniform4fv')
export declare function uniform4fv(location: WebGLUniformLocation, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void

//@ts-ignore external
@external('gl', 'uniform4iv')
export declare function uniform4iv(location: WebGLUniformLocation, data: Int32List, srcOffset?: GLuint, srcLength?: GLuint): void

//@ts-ignore external
@external('gl', 'uniformMatrix2fv')
export declare function uniformMatrix2fv(location: WebGLUniformLocation, transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void

//@ts-ignore external
@external('gl', 'uniformMatrix3fv')
export declare function uniformMatrix3fv(location: WebGLUniformLocation, transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void

//@ts-ignore external
@external('gl', 'uniformMatrix4fv')
export declare function uniformMatrix4fv(location: WebGLUniformLocation, transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void





//----------------webgl1----------------





//@ts-ignore external
@external('gl', 'activeTexture')
export declare function activeTexture(texture: GLenum): void

//@ts-ignore external
@external('gl', 'attachShader')
export declare function attachShader(program: WebGLProgram, shader: WebGLShader): void

//@ts-ignore external
@external('gl', 'bindAttribLocation')
export declare function bindAttribLocation(program: WebGLProgram, index: GLuint, name: string): void

//@ts-ignore external
@external('gl', 'bindBuffer')
export declare function bindBuffer(target: GLenum, buffer: WebGLBuffer): void

//@ts-ignore external
@external('gl', 'bindFramebuffer')
export declare function bindFramebuffer(target: GLenum, framebuffer: WebGLFramebuffer): void

//@ts-ignore external
@external('gl', 'bindRenderbuffer')
export declare function bindRenderbuffer(target: GLenum, renderbuffer: WebGLRenderbuffer): void

//@ts-ignore external
@external('gl', 'bindTexture')
export declare function bindTexture(target: GLenum, texture: WebGLTexture): void

//@ts-ignore external
@external('gl', 'blendColor')
export declare function blendColor(red: GLclampf, green: GLclampf, blue: GLclampf, alpha: GLclampf): void

//@ts-ignore external
@external('gl', 'blendEquation')
export declare function blendEquation(mode: GLenum): void

//@ts-ignore external
@external('gl', 'blendEquationSeparate')
export declare function blendEquationSeparate(modeRGB: GLenum, modeAlpha: GLenum): void

//@ts-ignore external
@external('gl', 'blendFunc')
export declare function blendFunc(sfactor: GLenum, dfactor: GLenum): void

//@ts-ignore external
@external('gl', 'blendFuncSeparate')
export declare function blendFuncSeparate(srcRGB: GLenum, dstRGB: GLenum, srcAlpha: GLenum, dstAlpha: GLenum): void

//@ts-ignore external
@external('gl', 'checkFramebufferStatus')
export declare function checkFramebufferStatus(target: GLenum): GLenum

//@ts-ignore external
@external('gl', 'clear')
export declare function clear(mask: GLbitfield): void

//@ts-ignore external
@external('gl', 'clearColor')
export declare function clearColor(red: GLclampf, green: GLclampf, blue: GLclampf, alpha: GLclampf): void

//@ts-ignore external
@external('gl', 'clearDepth')
export declare function clearDepth(depth: GLclampf): void

//@ts-ignore external
@external('gl', 'clearStencil')
export declare function clearStencil(s: GLint): void

//@ts-ignore external
@external('gl', 'colorMask')
export declare function colorMask(red: GLboolean, green: GLboolean, blue: GLboolean, alpha: GLboolean): void

//@ts-ignore external
@external('gl', 'compileShader')
export declare function compileShader(shader: WebGLShader): void

//@ts-ignore external
@external('gl', 'copyTexImage2D')
export declare function copyTexImage2D(target: GLenum, level: GLint, internalformat: GLenum, x: GLint, y: GLint, width: GLsizei, height: GLsizei, border: GLint): void

//@ts-ignore external
@external('gl', 'copyTexSubImage2D')
export declare function copyTexSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, x: GLint, y: GLint, width: GLsizei, height: GLsizei): void

//@ts-ignore external
@external('gl', 'createBuffer')
export declare function createBuffer(): WebGLBuffer

//@ts-ignore external
@external('gl', 'createFramebuffer')
export declare function createFramebuffer(): WebGLFramebuffer 

//@ts-ignore external
@external('gl', 'createProgram')
export declare function createProgram(): WebGLProgram 

//@ts-ignore external
@external('gl', 'createRenderbuffer')
export declare function createRenderbuffer(): WebGLRenderbuffer 

//@ts-ignore external
@external('gl', 'createShader')
export declare function createShader(type: GLenum): WebGLShader 

//@ts-ignore external
@external('gl', 'createTexture')
export declare function createTexture(): WebGLTexture 

//@ts-ignore external
@external('gl', 'cullFace')
export declare function cullFace(mode: GLenum): void

//@ts-ignore external
@external('gl', 'deleteBuffer')
export declare function deleteBuffer(buffer: WebGLBuffer): void

//@ts-ignore external
@external('gl', 'deleteFramebuffer')
export declare function deleteFramebuffer(framebuffer: WebGLFramebuffer): void

//@ts-ignore external
@external('gl', 'deleteProgram')
export declare function deleteProgram(program: WebGLProgram): void

//@ts-ignore external
@external('gl', 'deleteRenderbuffer')
export declare function deleteRenderbuffer(renderbuffer: WebGLRenderbuffer): void

//@ts-ignore external
@external('gl', 'deleteShader')
export declare function deleteShader(shader: WebGLShader): void

//@ts-ignore external
@external('gl', 'deleteTexture')
export declare function deleteTexture(texture: WebGLTexture): void

//@ts-ignore external
@external('gl', 'depthFunc')
export declare function depthFunc(func: GLenum): void

//@ts-ignore external
@external('gl', 'depthMask')
export declare function depthMask(flag: GLboolean): void

//@ts-ignore external
@external('gl', 'depthRange')
export declare function depthRange(zNear: GLclampf, zFar: GLclampf): void

//@ts-ignore external
@external('gl', 'detachShader')
export declare function detachShader(program: WebGLProgram, shader: WebGLShader): void

//@ts-ignore external
@external('gl', 'disable')
export declare function disable(cap: GLenum): void

//@ts-ignore external
@external('gl', 'disableVertexAttribArray')
export declare function disableVertexAttribArray(index: GLuint): void

//@ts-ignore external
@external('gl', 'drawArrays')
export declare function drawArrays(mode: GLenum, first: GLint, count: GLsizei): void

//@ts-ignore external
@external('gl', 'drawElements')
export declare function drawElements(mode: GLenum, count: GLsizei, type: GLenum, offset: GLintptr): void

//@ts-ignore external
@external('gl', 'enable')
export declare function enable(cap: GLenum): void

//@ts-ignore external
@external('gl', 'enableVertexAttribArray')
export declare function enableVertexAttribArray(index: GLuint): void

//@ts-ignore external
@external('gl', 'finish')
export declare function finish(): void

//@ts-ignore external
@external('gl', 'flush')
export declare function flush(): void

//@ts-ignore external
@external('gl', 'framebufferRenderbuffer')
export declare function framebufferRenderbuffer(target: GLenum, attachment: GLenum, renderbuffertarget: GLenum, renderbuffer: WebGLRenderbuffer): void

//@ts-ignore external
@external('gl', 'framebufferTexture2D')
export declare function framebufferTexture2D(target: GLenum, attachment: GLenum, textarget: GLenum, texture: WebGLTexture, level: GLint): void

//@ts-ignore external
@external('gl', 'frontFace')
export declare function frontFace(mode: GLenum): void

//@ts-ignore external
@external('gl', 'generateMipmap')
export declare function generateMipmap(target: GLenum): void

//@ts-ignore external
@external('gl', 'getActiveAttrib')
export declare function getActiveAttrib(program: WebGLProgram, index: GLuint): WebGLActiveInfo 

//@ts-ignore external
@external('gl', 'getActiveUniform')
export declare function getActiveUniform(program: WebGLProgram, index: GLuint): WebGLActiveInfo 

//@ts-ignore external
@external('gl', 'getAttachedShaders')
export declare function getAttachedShaders(program: WebGLProgram): WebGLShader[]

//@ts-ignore external
@external('gl', 'getAttribLocation')
export declare function getAttribLocation(program: WebGLProgram, name: string): GLint

//@ts-ignore external
@external('gl', 'getBufferParameter__1')
export declare function getBufferParameter__1(target: GLenum, pname: GLenum): GLuint

//@ts-ignore external
@external('gl', 'getBufferParameter__2')
export declare function getBufferParameter__2(target: GLenum, pname: GLenum): any

//@ts-ignore external
@external('gl', 'getContextAttributes')
export declare function getContextAttributes(): WebGLContextAttributes

//@ts-ignore external
@external('gl', 'getError')
export declare function getError(): GLenum

// //@ts-ignore external
// @external('gl', 'getExtension')
// export declare function getExtension(extensionName: 'EXT_blend_minmax'): EXT_blend_minmax

// //@ts-ignore external
// @external('gl', 'getExtension')
// export declare function getExtension(extensionName: 'EXT_color_buffer_float'): EXT_color_buffer_float

// //@ts-ignore external
// @external('gl', 'getExtension')
// export declare function getExtension(extensionName: 'EXT_color_buffer_half_float'): EXT_color_buffer_half_float

// //@ts-ignore external
// @external('gl', 'getExtension')
// export declare function getExtension(extensionName: 'EXT_float_blend'): EXT_float_blend

// //@ts-ignore external
// @external('gl', 'getExtension')
// export declare function getExtension(extensionName: 'EXT_texture_filter_anisotropic'): EXT_texture_filter_anisotropic

// //@ts-ignore external
// @external('gl', 'getExtension')
// export declare function getExtension(extensionName: 'EXT_frag_depth'): EXT_frag_depth

// //@ts-ignore external
// @external('gl', 'getExtension')
// export declare function getExtension(extensionName: 'EXT_shader_texture_lod'): EXT_shader_texture_lod

// //@ts-ignore external
// @external('gl', 'getExtension')
// export declare function getExtension(extensionName: 'EXT_sRGB'): EXT_sRGB

// //@ts-ignore external
// @external('gl', 'getExtension')
// export declare function getExtension(extensionName: 'KHR_parallel_shader_compile'): KHR_parallel_shader_compile

// //@ts-ignore external
// @external('gl', 'getExtension')
// export declare function getExtension(extensionName: 'OES_vertex_array_object'): OES_vertex_array_object

// //@ts-ignore external
// @external('gl', 'getExtension')
// export declare function getExtension(extensionName: 'OVR_multiview2'): OVR_multiview2

// //@ts-ignore external
// @external('gl', 'getExtension')
// export declare function getExtension(extensionName: 'WEBGL_color_buffer_float'): WEBGL_color_buffer_float

// //@ts-ignore external
// @external('gl', 'getExtension')
// export declare function getExtension(extensionName: 'WEBGL_compressed_texture_astc'): WEBGL_compressed_texture_astc

// //@ts-ignore external
// @external('gl', 'getExtension')
// export declare function getExtension(extensionName: 'WEBGL_compressed_texture_etc'): WEBGL_compressed_texture_etc

// //@ts-ignore external
// @external('gl', 'getExtension')
// export declare function getExtension(extensionName: 'WEBGL_compressed_texture_etc1'): WEBGL_compressed_texture_etc1

// //@ts-ignore external
// @external('gl', 'getExtension')
// export declare function getExtension(extensionName: 'WEBGL_compressed_texture_s3tc_srgb'): WEBGL_compressed_texture_s3tc_srgb

// //@ts-ignore external
// @external('gl', 'getExtension')
// export declare function getExtension(extensionName: 'WEBGL_debug_shaders'): WEBGL_debug_shaders

// //@ts-ignore external
// @external('gl', 'getExtension')
// export declare function getExtension(extensionName: 'WEBGL_draw_buffers'): WEBGL_draw_buffers

// //@ts-ignore external
// @external('gl', 'getExtension')
// export declare function getExtension(extensionName: 'WEBGL_lose_context'): WEBGL_lose_context

// //@ts-ignore external
// @external('gl', 'getExtension')
// export declare function getExtension(extensionName: 'WEBGL_depth_texture'): WEBGL_depth_texture

// //@ts-ignore external
// @external('gl', 'getExtension')
// export declare function getExtension(extensionName: 'WEBGL_debug_renderer_info'): WEBGL_debug_renderer_info

// //@ts-ignore external
// @external('gl', 'getExtension')
// export declare function getExtension(extensionName: 'WEBGL_compressed_texture_s3tc'): WEBGL_compressed_texture_s3tc

// //@ts-ignore external
// @external('gl', 'getExtension')
// export declare function getExtension(extensionName: 'OES_texture_half_float_linear'): OES_texture_half_float_linear

// //@ts-ignore external
// @external('gl', 'getExtension')
// export declare function getExtension(extensionName: 'OES_texture_half_float'): OES_texture_half_float

// //@ts-ignore external
// @external('gl', 'getExtension')
// export declare function getExtension(extensionName: 'OES_texture_float_linear'): OES_texture_float_linear

// //@ts-ignore external
// @external('gl', 'getExtension')
// export declare function getExtension(extensionName: 'OES_texture_float'): OES_texture_float

// //@ts-ignore external
// @external('gl', 'getExtension')
// export declare function getExtension(extensionName: 'OES_standard_derivatives'): OES_standard_derivatives

// //@ts-ignore external
// @external('gl', 'getExtension')
// export declare function getExtension(extensionName: 'OES_element_index_uint'): OES_element_index_uint

// //@ts-ignore external
// @external('gl', 'getExtension')
// export declare function getExtension(extensionName: 'ANGLE_instanced_arrays'): ANGLE_instanced_arrays

// //@ts-ignore external
// @external('gl', 'getExtension')
// export declare function getExtension(name: string): any

//@ts-ignore external
@external('gl', 'getFramebufferAttachmentParameter')
export declare function getFramebufferAttachmentParameter(target: GLenum, attachment: GLenum, pname: GLenum): any

//@ts-ignore external
@external('gl', 'getParameter')
export declare function getParameter(pname: GLenum): any

//@ts-ignore external
@external('gl', 'getProgramInfoLog')
export declare function getProgramInfoLog(program: WebGLProgram): string

//@ts-ignore external
@external('gl', 'getProgramParameter__1')
export declare function getProgramParameter__1(program: WebGLProgram, pname: GLenum): GLboolean

//@ts-ignore external
@external('gl', 'getProgramParameter__2')
export declare function getProgramParameter__2(program: WebGLProgram, pname: GLenum): GLint

//@ts-ignore external
@external('gl', 'getRenderbufferParameter')
export declare function getRenderbufferParameter(target: GLenum, pname: GLenum): any

//@ts-ignore external
@external('gl', 'getShaderInfoLog')
export declare function getShaderInfoLog(shader: WebGLShader): string

//@ts-ignore external
@external('gl', 'getShaderParameter__1')
export declare function getShaderParameter__1(shader: WebGLShader, pname: GLenum): GLboolean

//@ts-ignore external
@external('gl', 'getShaderParameter__2')
export declare function getShaderParameter__2(shader: WebGLShader, pname: GLenum): GLenum

//@ts-ignore external
@external('gl', 'getShaderPrecisionFormat')
export declare function getShaderPrecisionFormat(shadertype: GLenum, precisiontype: GLenum): WebGLShaderPrecisionFormat

//@ts-ignore external
@external('gl', 'getShaderSource')
export declare function getShaderSource(shader: WebGLShader): string

//@ts-ignore external
@external('gl', 'getSupportedExtensions')
export declare function getSupportedExtensions(): string[]

//@ts-ignore external
@external('gl', 'getTexParameter')
export declare function getTexParameter(target: GLenum, pname: GLenum): any

//@ts-ignore external
@external('gl', 'getUniform')
export declare function getUniform(program: WebGLProgram, location: WebGLUniformLocation): any

//@ts-ignore external
@external('gl', 'getUniformLocation')
export declare function getUniformLocation(program: WebGLProgram, name: string): WebGLUniformLocation 

//@ts-ignore external
@external('gl', 'getVertexAttrib')
export declare function getVertexAttrib(index: GLuint, pname: GLenum): any

//@ts-ignore external
@external('gl', 'getVertexAttribOffset')
export declare function getVertexAttribOffset(index: GLuint, pname: GLenum): GLintptr

//@ts-ignore external
@external('gl', 'hint')
export declare function hint(target: GLenum, mode: GLenum): void

//@ts-ignore external
@external('gl', 'isBuffer')
export declare function isBuffer(buffer: WebGLBuffer): GLboolean

//@ts-ignore external
@external('gl', 'isContextLost')
export declare function isContextLost(): boolean

//@ts-ignore external
@external('gl', 'isEnabled')
export declare function isEnabled(cap: GLenum): GLboolean

//@ts-ignore external
@external('gl', 'isFramebuffer')
export declare function isFramebuffer(framebuffer: WebGLFramebuffer): GLboolean

//@ts-ignore external
@external('gl', 'isProgram')
export declare function isProgram(program: WebGLProgram): GLboolean

//@ts-ignore external
@external('gl', 'isRenderbuffer')
export declare function isRenderbuffer(renderbuffer: WebGLRenderbuffer): GLboolean

//@ts-ignore external
@external('gl', 'isShader')
export declare function isShader(shader: WebGLShader): GLboolean

//@ts-ignore external
@external('gl', 'isTexture')
export declare function isTexture(texture: WebGLTexture): GLboolean

//@ts-ignore external
@external('gl', 'lineWidth')
export declare function lineWidth(width: GLfloat): void

//@ts-ignore external
@external('gl', 'linkProgram')
export declare function linkProgram(program: WebGLProgram): void

//CUSTOM HERE - seperate union of GLint and GLboolean

//@ts-ignore external
@external('gl', 'pixelStorei')
export declare function pixelStorei(pname: GLenum, param: GLint): void

//@ts-ignore external
@external('gl', 'pixelStorei')
export declare function pixelStorei_bool(pname: GLenum, param: GLboolean): void

//@ts-ignore external
@external('gl', 'polygonOffset')
export declare function polygonOffset(factor: GLfloat, units: GLfloat): void

//@ts-ignore external
@external('gl', 'renderbufferStorage')
export declare function renderbufferStorage(target: GLenum, internalformat: GLenum, width: GLsizei, height: GLsizei): void

//@ts-ignore external
@external('gl', 'sampleCoverage')
export declare function sampleCoverage(value: GLclampf, invert: GLboolean): void

//@ts-ignore external
@external('gl', 'scissor')
export declare function scissor(x: GLint, y: GLint, width: GLsizei, height: GLsizei): void

//@ts-ignore external
@external('gl', 'shaderSource')
export declare function shaderSource(shader: WebGLShader, source: string): void

//@ts-ignore external
@external('gl', 'stencilFunc')
export declare function stencilFunc(func: GLenum, ref: GLint, mask: GLuint): void

//@ts-ignore external
@external('gl', 'stencilFuncSeparate')
export declare function stencilFuncSeparate(face: GLenum, func: GLenum, ref: GLint, mask: GLuint): void

//@ts-ignore external
@external('gl', 'stencilMask')
export declare function stencilMask(mask: GLuint): void

//@ts-ignore external
@external('gl', 'stencilMaskSeparate')
export declare function stencilMaskSeparate(face: GLenum, mask: GLuint): void

//@ts-ignore external
@external('gl', 'stencilOp')
export declare function stencilOp(fail: GLenum, zfail: GLenum, zpass: GLenum): void

//@ts-ignore external
@external('gl', 'stencilOpSeparate')
export declare function stencilOpSeparate(face: GLenum, fail: GLenum, zfail: GLenum, zpass: GLenum): void

//@ts-ignore external
@external('gl', 'texParameterf')
export declare function texParameterf(target: GLenum, pname: GLenum, param: GLfloat): void

//@ts-ignore external
@external('gl', 'texParameteri')
export declare function texParameteri(target: GLenum, pname: GLenum, param: GLint): void

//@ts-ignore external
@external('gl', 'uniform1f')
export declare function uniform1f(location: WebGLUniformLocation, x: GLfloat): void

//@ts-ignore external
@external('gl', 'uniform1i')
export declare function uniform1i(location: WebGLUniformLocation, x: GLint): void

//@ts-ignore external
@external('gl', 'uniform2f')
export declare function uniform2f(location: WebGLUniformLocation, x: GLfloat, y: GLfloat): void

//@ts-ignore external
@external('gl', 'uniform2i')
export declare function uniform2i(location: WebGLUniformLocation, x: GLint, y: GLint): void

//@ts-ignore external
@external('gl', 'uniform3f')
export declare function uniform3f(location: WebGLUniformLocation, x: GLfloat, y: GLfloat, z: GLfloat): void

//@ts-ignore external
@external('gl', 'uniform3i')
export declare function uniform3i(location: WebGLUniformLocation, x: GLint, y: GLint, z: GLint): void

//@ts-ignore external
@external('gl', 'uniform4f')
export declare function uniform4f(location: WebGLUniformLocation, x: GLfloat, y: GLfloat, z: GLfloat, w: GLfloat): void

//@ts-ignore external
@external('gl', 'uniform4i')
export declare function uniform4i(location: WebGLUniformLocation, x: GLint, y: GLint, z: GLint, w: GLint): void

//@ts-ignore external
@external('gl', 'useProgram')
export declare function useProgram(program: WebGLProgram): void

//@ts-ignore external
@external('gl', 'validateProgram')
export declare function validateProgram(program: WebGLProgram): void

//@ts-ignore external
@external('gl', 'vertexAttrib1f')
export declare function vertexAttrib1f(index: GLuint, x: GLfloat): void

//@ts-ignore external
@external('gl', 'vertexAttrib1fv')
export declare function vertexAttrib1fv(index: GLuint, values: Float32List): void

//@ts-ignore external
@external('gl', 'vertexAttrib2f')
export declare function vertexAttrib2f(index: GLuint, x: GLfloat, y: GLfloat): void

//@ts-ignore external
@external('gl', 'vertexAttrib2fv')
export declare function vertexAttrib2fv(index: GLuint, values: Float32List): void

//@ts-ignore external
@external('gl', 'vertexAttrib3f')
export declare function vertexAttrib3f(index: GLuint, x: GLfloat, y: GLfloat, z: GLfloat): void

//@ts-ignore external
@external('gl', 'vertexAttrib3fv')
export declare function vertexAttrib3fv(index: GLuint, values: Float32List): void

//@ts-ignore external
@external('gl', 'vertexAttrib4f')
export declare function vertexAttrib4f(index: GLuint, x: GLfloat, y: GLfloat, z: GLfloat, w: GLfloat): void

//@ts-ignore external
@external('gl', 'vertexAttrib4fv')
export declare function vertexAttrib4fv(index: GLuint, values: Float32List): void

//@ts-ignore external
@external('gl', 'vertexAttribPointer')
export declare function vertexAttribPointer(index: GLuint, size: GLint, type: GLenum, normalized: GLboolean, stride: GLsizei, offset: GLintptr): void

//@ts-ignore external
@external('gl', 'viewport')
export declare function viewport(x: GLint, y: GLint, width: GLsizei, height: GLsizei): void