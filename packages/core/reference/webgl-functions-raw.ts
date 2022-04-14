
interface WebGL2RenderingContext extends WebGL2RenderingContextBase, WebGL2RenderingContextOverloads, WebGLRenderingContextBase {
}

interface WebGL2RenderingContextBase {
    beginQuery(target: GLenum, query: WebGLQuery): void
    beginTransformFeedback(primitiveMode: GLenum): void
    bindBufferBase(target: GLenum, index: GLuint, buffer: WebGLBuffer | null): void
    bindBufferRange(target: GLenum, index: GLuint, buffer: WebGLBuffer | null, offset: GLintptr, size: GLsizeiptr): void
    bindSampler(unit: GLuint, sampler: WebGLSampler | null): void
    bindTransformFeedback(target: GLenum, tf: WebGLTransformFeedback | null): void
    bindVertexArray(array: WebGLVertexArrayObject | null): void
    blitFramebuffer(srcX0: GLint, srcY0: GLint, srcX1: GLint, srcY1: GLint, dstX0: GLint, dstY0: GLint, dstX1: GLint, dstY1: GLint, mask: GLbitfield, filter: GLenum): void
    clearBufferfi(buffer: GLenum, drawbuffer: GLint, depth: GLfloat, stencil: GLint): void
    clearBufferfv(buffer: GLenum, drawbuffer: GLint, values: Float32List, srcOffset?: GLuint): void
    clearBufferiv(buffer: GLenum, drawbuffer: GLint, values: Int32List, srcOffset?: GLuint): void
    clearBufferuiv(buffer: GLenum, drawbuffer: GLint, values: Uint32List, srcOffset?: GLuint): void
    clientWaitSync(sync: WebGLSync, flags: GLbitfield, timeout: GLuint64): GLenum
    compressedTexImage3D(target: GLenum, level: GLint, internalformat: GLenum, width: GLsizei, height: GLsizei, depth: GLsizei, border: GLint, imageSize: GLsizei, offset: GLintptr): void
    compressedTexImage3D(target: GLenum, level: GLint, internalformat: GLenum, width: GLsizei, height: GLsizei, depth: GLsizei, border: GLint, srcData: ArrayBufferView, srcOffset?: GLuint, srcLengthOverride?: GLuint): void
    compressedTexSubImage3D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GLenum, imageSize: GLsizei, offset: GLintptr): void
    compressedTexSubImage3D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GLenum, srcData: ArrayBufferView, srcOffset?: GLuint, srcLengthOverride?: GLuint): void
    copyBufferSubData(readTarget: GLenum, writeTarget: GLenum, readOffset: GLintptr, writeOffset: GLintptr, size: GLsizeiptr): void
    copyTexSubImage3D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, x: GLint, y: GLint, width: GLsizei, height: GLsizei): void
    createQuery(): WebGLQuery | null
    createSampler(): WebGLSampler | null
    createTransformFeedback(): WebGLTransformFeedback | null
    createVertexArray(): WebGLVertexArrayObject | null
    deleteQuery(query: WebGLQuery | null): void
    deleteSampler(sampler: WebGLSampler | null): void
    deleteSync(sync: WebGLSync | null): void
    deleteTransformFeedback(tf: WebGLTransformFeedback | null): void
    deleteVertexArray(vertexArray: WebGLVertexArrayObject | null): void
    drawArraysInstanced(mode: GLenum, first: GLint, count: GLsizei, instanceCount: GLsizei): void
    drawBuffers(buffers: GLenum[]): void
    drawElementsInstanced(mode: GLenum, count: GLsizei, type: GLenum, offset: GLintptr, instanceCount: GLsizei): void
    drawRangeElements(mode: GLenum, start: GLuint, end: GLuint, count: GLsizei, type: GLenum, offset: GLintptr): void
    endQuery(target: GLenum): void
    endTransformFeedback(): void
    fenceSync(condition: GLenum, flags: GLbitfield): WebGLSync | null
    framebufferTextureLayer(target: GLenum, attachment: GLenum, texture: WebGLTexture | null, level: GLint, layer: GLint): void
    getActiveUniformBlockName(program: WebGLProgram, uniformBlockIndex: GLuint): string | null
    getActiveUniformBlockParameter(program: WebGLProgram, uniformBlockIndex: GLuint, pname: GLenum): any
    getActiveUniforms(program: WebGLProgram, uniformIndices: GLuint[], pname: GLenum): any
    getBufferSubData(target: GLenum, srcByteOffset: GLintptr, dstBuffer: ArrayBufferView, dstOffset?: GLuint, length?: GLuint): void
    getFragDataLocation(program: WebGLProgram, name: string): GLint
    getIndexedParameter(target: GLenum, index: GLuint): any
    getInternalformatParameter(target: GLenum, internalformat: GLenum, pname: GLenum): any
    getQuery(target: GLenum, pname: GLenum): WebGLQuery | null
    getQueryParameter(query: WebGLQuery, pname: GLenum): any
    getSamplerParameter(sampler: WebGLSampler, pname: GLenum): any
    getSyncParameter(sync: WebGLSync, pname: GLenum): any
    getTransformFeedbackVarying(program: WebGLProgram, index: GLuint): WebGLActiveInfo | null
    getUniformBlockIndex(program: WebGLProgram, uniformBlockName: string): GLuint
    getUniformIndices(program: WebGLProgram, uniformNames: string[]): GLuint[] | null
    invalidateFramebuffer(target: GLenum, attachments: GLenum[]): void
    invalidateSubFramebuffer(target: GLenum, attachments: GLenum[], x: GLint, y: GLint, width: GLsizei, height: GLsizei): void
    isQuery(query: WebGLQuery | null): GLboolean
    isSampler(sampler: WebGLSampler | null): GLboolean
    isSync(sync: WebGLSync | null): GLboolean
    isTransformFeedback(tf: WebGLTransformFeedback | null): GLboolean
    isVertexArray(vertexArray: WebGLVertexArrayObject | null): GLboolean
    pauseTransformFeedback(): void
    readBuffer(src: GLenum): void
    renderbufferStorageMultisample(target: GLenum, samples: GLsizei, internalformat: GLenum, width: GLsizei, height: GLsizei): void
    resumeTransformFeedback(): void
    samplerParameterf(sampler: WebGLSampler, pname: GLenum, param: GLfloat): void
    samplerParameteri(sampler: WebGLSampler, pname: GLenum, param: GLint): void
    texImage3D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, border: GLint, format: GLenum, type: GLenum, pboOffset: GLintptr): void
    texImage3D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, border: GLint, format: GLenum, type: GLenum, source: TexImageSource): void
    texImage3D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, border: GLint, format: GLenum, type: GLenum, srcData: ArrayBufferView | null): void
    texImage3D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, border: GLint, format: GLenum, type: GLenum, srcData: ArrayBufferView, srcOffset: GLuint): void
    texStorage2D(target: GLenum, levels: GLsizei, internalformat: GLenum, width: GLsizei, height: GLsizei): void
    texStorage3D(target: GLenum, levels: GLsizei, internalformat: GLenum, width: GLsizei, height: GLsizei, depth: GLsizei): void
    texSubImage3D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GLenum, type: GLenum, pboOffset: GLintptr): void
    texSubImage3D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GLenum, type: GLenum, source: TexImageSource): void
    texSubImage3D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GLenum, type: GLenum, srcData: ArrayBufferView | null, srcOffset?: GLuint): void
    transformFeedbackVaryings(program: WebGLProgram, varyings: string[], bufferMode: GLenum): void
    uniform1ui(location: WebGLUniformLocation | null, v0: GLuint): void
    uniform1uiv(location: WebGLUniformLocation | null, data: Uint32List, srcOffset?: GLuint, srcLength?: GLuint): void
    uniform2ui(location: WebGLUniformLocation | null, v0: GLuint, v1: GLuint): void
    uniform2uiv(location: WebGLUniformLocation | null, data: Uint32List, srcOffset?: GLuint, srcLength?: GLuint): void
    uniform3ui(location: WebGLUniformLocation | null, v0: GLuint, v1: GLuint, v2: GLuint): void
    uniform3uiv(location: WebGLUniformLocation | null, data: Uint32List, srcOffset?: GLuint, srcLength?: GLuint): void
    uniform4ui(location: WebGLUniformLocation | null, v0: GLuint, v1: GLuint, v2: GLuint, v3: GLuint): void
    uniform4uiv(location: WebGLUniformLocation | null, data: Uint32List, srcOffset?: GLuint, srcLength?: GLuint): void
    uniformBlockBinding(program: WebGLProgram, uniformBlockIndex: GLuint, uniformBlockBinding: GLuint): void
    uniformMatrix2x3fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void
    uniformMatrix2x4fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void
    uniformMatrix3x2fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void
    uniformMatrix3x4fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void
    uniformMatrix4x2fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void
    uniformMatrix4x3fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void
    vertexAttribDivisor(index: GLuint, divisor: GLuint): void
    vertexAttribI4i(index: GLuint, x: GLint, y: GLint, z: GLint, w: GLint): void
    vertexAttribI4iv(index: GLuint, values: Int32List): void
    vertexAttribI4ui(index: GLuint, x: GLuint, y: GLuint, z: GLuint, w: GLuint): void
    vertexAttribI4uiv(index: GLuint, values: Uint32List): void
    vertexAttribIPointer(index: GLuint, size: GLint, type: GLenum, stride: GLsizei, offset: GLintptr): void
    waitSync(sync: WebGLSync, flags: GLbitfield, timeout: GLint64): void
 
}

interface WebGL2RenderingContextOverloads {
    bufferData(target: GLenum, size: GLsizeiptr, usage: GLenum): void
    bufferData(target: GLenum, srcData: BufferSource | null, usage: GLenum): void
    bufferData(target: GLenum, srcData: ArrayBufferView, usage: GLenum, srcOffset: GLuint, length?: GLuint): void
    bufferSubData(target: GLenum, dstByteOffset: GLintptr, srcData: BufferSource): void
    bufferSubData(target: GLenum, dstByteOffset: GLintptr, srcData: ArrayBufferView, srcOffset: GLuint, length?: GLuint): void
    compressedTexImage2D(target: GLenum, level: GLint, internalformat: GLenum, width: GLsizei, height: GLsizei, border: GLint, imageSize: GLsizei, offset: GLintptr): void
    compressedTexImage2D(target: GLenum, level: GLint, internalformat: GLenum, width: GLsizei, height: GLsizei, border: GLint, srcData: ArrayBufferView, srcOffset?: GLuint, srcLengthOverride?: GLuint): void
    compressedTexSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GLenum, imageSize: GLsizei, offset: GLintptr): void
    compressedTexSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GLenum, srcData: ArrayBufferView, srcOffset?: GLuint, srcLengthOverride?: GLuint): void
    readPixels(x: GLint, y: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, dstData: ArrayBufferView | null): void
    readPixels(x: GLint, y: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, offset: GLintptr): void
    readPixels(x: GLint, y: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, dstData: ArrayBufferView, dstOffset: GLuint): void
    texImage2D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, border: GLint, format: GLenum, type: GLenum, pixels: ArrayBufferView | null): void
    texImage2D(target: GLenum, level: GLint, internalformat: GLint, format: GLenum, type: GLenum, source: TexImageSource): void
    texImage2D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, border: GLint, format: GLenum, type: GLenum, pboOffset: GLintptr): void
    texImage2D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, border: GLint, format: GLenum, type: GLenum, source: TexImageSource): void
    texImage2D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, border: GLint, format: GLenum, type: GLenum, srcData: ArrayBufferView, srcOffset: GLuint): void
    texSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, pixels: ArrayBufferView | null): void
    texSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, format: GLenum, type: GLenum, source: TexImageSource): void
    texSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, pboOffset: GLintptr): void
    texSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, source: TexImageSource): void
    texSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, srcData: ArrayBufferView, srcOffset: GLuint): void
    uniform1fv(location: WebGLUniformLocation | null, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void
    uniform1iv(location: WebGLUniformLocation | null, data: Int32List, srcOffset?: GLuint, srcLength?: GLuint): void
    uniform2fv(location: WebGLUniformLocation | null, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void
    uniform2iv(location: WebGLUniformLocation | null, data: Int32List, srcOffset?: GLuint, srcLength?: GLuint): void
    uniform3fv(location: WebGLUniformLocation | null, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void
    uniform3iv(location: WebGLUniformLocation | null, data: Int32List, srcOffset?: GLuint, srcLength?: GLuint): void
    uniform4fv(location: WebGLUniformLocation | null, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void
    uniform4iv(location: WebGLUniformLocation | null, data: Int32List, srcOffset?: GLuint, srcLength?: GLuint): void
    uniformMatrix2fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void
    uniformMatrix3fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void
    uniformMatrix4fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void
}


interface WebGLRenderingContextBase {
    readonly canvas: HTMLCanvasElement
    readonly drawingBufferHeight: GLsizei
    readonly drawingBufferWidth: GLsizei
    activeTexture(texture: GLenum): void
    attachShader(program: WebGLProgram, shader: WebGLShader): void
    bindAttribLocation(program: WebGLProgram, index: GLuint, name: string): void
    bindBuffer(target: GLenum, buffer: WebGLBuffer | null): void
    bindFramebuffer(target: GLenum, framebuffer: WebGLFramebuffer | null): void
    bindRenderbuffer(target: GLenum, renderbuffer: WebGLRenderbuffer | null): void
    bindTexture(target: GLenum, texture: WebGLTexture | null): void
    blendColor(red: GLclampf, green: GLclampf, blue: GLclampf, alpha: GLclampf): void
    blendEquation(mode: GLenum): void
    blendEquationSeparate(modeRGB: GLenum, modeAlpha: GLenum): void
    blendFunc(sfactor: GLenum, dfactor: GLenum): void
    blendFuncSeparate(srcRGB: GLenum, dstRGB: GLenum, srcAlpha: GLenum, dstAlpha: GLenum): void
    checkFramebufferStatus(target: GLenum): GLenum
    clear(mask: GLbitfield): void
    clearColor(red: GLclampf, green: GLclampf, blue: GLclampf, alpha: GLclampf): void
    clearDepth(depth: GLclampf): void
    clearStencil(s: GLint): void
    colorMask(red: GLboolean, green: GLboolean, blue: GLboolean, alpha: GLboolean): void
    compileShader(shader: WebGLShader): void
    copyTexImage2D(target: GLenum, level: GLint, internalformat: GLenum, x: GLint, y: GLint, width: GLsizei, height: GLsizei, border: GLint): void
    copyTexSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, x: GLint, y: GLint, width: GLsizei, height: GLsizei): void
    createBuffer(): WebGLBuffer | null
    createFramebuffer(): WebGLFramebuffer | null
    createProgram(): WebGLProgram | null
    createRenderbuffer(): WebGLRenderbuffer | null
    createShader(type: GLenum): WebGLShader | null
    createTexture(): WebGLTexture | null
    cullFace(mode: GLenum): void
    deleteBuffer(buffer: WebGLBuffer | null): void
    deleteFramebuffer(framebuffer: WebGLFramebuffer | null): void
    deleteProgram(program: WebGLProgram | null): void
    deleteRenderbuffer(renderbuffer: WebGLRenderbuffer | null): void
    deleteShader(shader: WebGLShader | null): void
    deleteTexture(texture: WebGLTexture | null): void
    depthFunc(func: GLenum): void
    depthMask(flag: GLboolean): void
    depthRange(zNear: GLclampf, zFar: GLclampf): void
    detachShader(program: WebGLProgram, shader: WebGLShader): void
    disable(cap: GLenum): void
    disableVertexAttribArray(index: GLuint): void
    drawArrays(mode: GLenum, first: GLint, count: GLsizei): void
    drawElements(mode: GLenum, count: GLsizei, type: GLenum, offset: GLintptr): void
    enable(cap: GLenum): void
    enableVertexAttribArray(index: GLuint): void
    finish(): void
    flush(): void
    framebufferRenderbuffer(target: GLenum, attachment: GLenum, renderbuffertarget: GLenum, renderbuffer: WebGLRenderbuffer | null): void
    framebufferTexture2D(target: GLenum, attachment: GLenum, textarget: GLenum, texture: WebGLTexture | null, level: GLint): void
    frontFace(mode: GLenum): void
    generateMipmap(target: GLenum): void
    getActiveAttrib(program: WebGLProgram, index: GLuint): WebGLActiveInfo | null
    getActiveUniform(program: WebGLProgram, index: GLuint): WebGLActiveInfo | null
    getAttachedShaders(program: WebGLProgram): WebGLShader[] | null
    getAttribLocation(program: WebGLProgram, name: string): GLint
    getBufferParameter(target: GLenum, pname: GLenum): any
    getContextAttributes(): WebGLContextAttributes | null
    getError(): GLenum
    getExtension(extensionName: 'EXT_blend_minmax'): EXT_blend_minmax | null
    getExtension(extensionName: 'EXT_color_buffer_float'): EXT_color_buffer_float | null
    getExtension(extensionName: 'EXT_color_buffer_half_float'): EXT_color_buffer_half_float | null
    getExtension(extensionName: 'EXT_float_blend'): EXT_float_blend | null
    getExtension(extensionName: 'EXT_texture_filter_anisotropic'): EXT_texture_filter_anisotropic | null
    getExtension(extensionName: 'EXT_frag_depth'): EXT_frag_depth | null
    getExtension(extensionName: 'EXT_shader_texture_lod'): EXT_shader_texture_lod | null
    getExtension(extensionName: 'EXT_sRGB'): EXT_sRGB | null
    getExtension(extensionName: 'KHR_parallel_shader_compile'): KHR_parallel_shader_compile | null
    getExtension(extensionName: 'OES_vertex_array_object'): OES_vertex_array_object | null
    getExtension(extensionName: 'OVR_multiview2'): OVR_multiview2 | null
    getExtension(extensionName: 'WEBGL_color_buffer_float'): WEBGL_color_buffer_float | null
    getExtension(extensionName: 'WEBGL_compressed_texture_astc'): WEBGL_compressed_texture_astc | null
    getExtension(extensionName: 'WEBGL_compressed_texture_etc'): WEBGL_compressed_texture_etc | null
    getExtension(extensionName: 'WEBGL_compressed_texture_etc1'): WEBGL_compressed_texture_etc1 | null
    getExtension(extensionName: 'WEBGL_compressed_texture_s3tc_srgb'): WEBGL_compressed_texture_s3tc_srgb | null
    getExtension(extensionName: 'WEBGL_debug_shaders'): WEBGL_debug_shaders | null
    getExtension(extensionName: 'WEBGL_draw_buffers'): WEBGL_draw_buffers | null
    getExtension(extensionName: 'WEBGL_lose_context'): WEBGL_lose_context | null
    getExtension(extensionName: 'WEBGL_depth_texture'): WEBGL_depth_texture | null
    getExtension(extensionName: 'WEBGL_debug_renderer_info'): WEBGL_debug_renderer_info | null
    getExtension(extensionName: 'WEBGL_compressed_texture_s3tc'): WEBGL_compressed_texture_s3tc | null
    getExtension(extensionName: 'OES_texture_half_float_linear'): OES_texture_half_float_linear | null
    getExtension(extensionName: 'OES_texture_half_float'): OES_texture_half_float | null
    getExtension(extensionName: 'OES_texture_float_linear'): OES_texture_float_linear | null
    getExtension(extensionName: 'OES_texture_float'): OES_texture_float | null
    getExtension(extensionName: 'OES_standard_derivatives'): OES_standard_derivatives | null
    getExtension(extensionName: 'OES_element_index_uint'): OES_element_index_uint | null
    getExtension(extensionName: 'ANGLE_instanced_arrays'): ANGLE_instanced_arrays | null
    getExtension(name: string): any
    getFramebufferAttachmentParameter(target: GLenum, attachment: GLenum, pname: GLenum): any
    getParameter(pname: GLenum): any
    getProgramInfoLog(program: WebGLProgram): string | null
    getProgramParameter(program: WebGLProgram, pname: GLenum): any
    getRenderbufferParameter(target: GLenum, pname: GLenum): any
    getShaderInfoLog(shader: WebGLShader): string | null
    getShaderParameter(shader: WebGLShader, pname: GLenum): any
    getShaderPrecisionFormat(shadertype: GLenum, precisiontype: GLenum): WebGLShaderPrecisionFormat | null
    getShaderSource(shader: WebGLShader): string | null
    getSupportedExtensions(): string[] | null
    getTexParameter(target: GLenum, pname: GLenum): any
    getUniform(program: WebGLProgram, location: WebGLUniformLocation): any
    getUniformLocation(program: WebGLProgram, name: string): WebGLUniformLocation | null
    getVertexAttrib(index: GLuint, pname: GLenum): any
    getVertexAttribOffset(index: GLuint, pname: GLenum): GLintptr
    hint(target: GLenum, mode: GLenum): void
    isBuffer(buffer: WebGLBuffer | null): GLboolean
    isContextLost(): boolean
    isEnabled(cap: GLenum): GLboolean
    isFramebuffer(framebuffer: WebGLFramebuffer | null): GLboolean
    isProgram(program: WebGLProgram | null): GLboolean
    isRenderbuffer(renderbuffer: WebGLRenderbuffer | null): GLboolean
    isShader(shader: WebGLShader | null): GLboolean
    isTexture(texture: WebGLTexture | null): GLboolean
    lineWidth(width: GLfloat): void
    linkProgram(program: WebGLProgram): void
    pixelStorei(pname: GLenum, param: GLint | GLboolean): void
    polygonOffset(factor: GLfloat, units: GLfloat): void
    renderbufferStorage(target: GLenum, internalformat: GLenum, width: GLsizei, height: GLsizei): void
    sampleCoverage(value: GLclampf, invert: GLboolean): void
    scissor(x: GLint, y: GLint, width: GLsizei, height: GLsizei): void
    shaderSource(shader: WebGLShader, source: string): void
    stencilFunc(func: GLenum, ref: GLint, mask: GLuint): void
    stencilFuncSeparate(face: GLenum, func: GLenum, ref: GLint, mask: GLuint): void
    stencilMask(mask: GLuint): void
    stencilMaskSeparate(face: GLenum, mask: GLuint): void
    stencilOp(fail: GLenum, zfail: GLenum, zpass: GLenum): void
    stencilOpSeparate(face: GLenum, fail: GLenum, zfail: GLenum, zpass: GLenum): void
    texParameterf(target: GLenum, pname: GLenum, param: GLfloat): void
    texParameteri(target: GLenum, pname: GLenum, param: GLint): void
    uniform1f(location: WebGLUniformLocation | null, x: GLfloat): void
    uniform1i(location: WebGLUniformLocation | null, x: GLint): void
    uniform2f(location: WebGLUniformLocation | null, x: GLfloat, y: GLfloat): void
    uniform2i(location: WebGLUniformLocation | null, x: GLint, y: GLint): void
    uniform3f(location: WebGLUniformLocation | null, x: GLfloat, y: GLfloat, z: GLfloat): void
    uniform3i(location: WebGLUniformLocation | null, x: GLint, y: GLint, z: GLint): void
    uniform4f(location: WebGLUniformLocation | null, x: GLfloat, y: GLfloat, z: GLfloat, w: GLfloat): void
    uniform4i(location: WebGLUniformLocation | null, x: GLint, y: GLint, z: GLint, w: GLint): void
    useProgram(program: WebGLProgram | null): void
    validateProgram(program: WebGLProgram): void
    vertexAttrib1f(index: GLuint, x: GLfloat): void
    vertexAttrib1fv(index: GLuint, values: Float32List): void
    vertexAttrib2f(index: GLuint, x: GLfloat, y: GLfloat): void
    vertexAttrib2fv(index: GLuint, values: Float32List): void
    vertexAttrib3f(index: GLuint, x: GLfloat, y: GLfloat, z: GLfloat): void
    vertexAttrib3fv(index: GLuint, values: Float32List): void
    vertexAttrib4f(index: GLuint, x: GLfloat, y: GLfloat, z: GLfloat, w: GLfloat): void
    vertexAttrib4fv(index: GLuint, values: Float32List): void
    vertexAttribPointer(index: GLuint, size: GLint, type: GLenum, normalized: GLboolean, stride: GLsizei, offset: GLintptr): void
    viewport(x: GLint, y: GLint, width: GLsizei, height: GLsizei): void

}
