import { GLenum, WebGLShader, GLint, GLuint, GLsizei } from './_types'

// @ts-ignore external
@external("gl", "clearColor")
export declare function clearColor(r: f32, g: f32, b: f32, a: f32): void

//@ts-ignore external
@external('gl', 'clear')// 
export declare function clear(flag: u32): void

interface WEBGL_color_buffer_float {
    readonly FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE_EXT: GLenum
    readonly RGBA32F_EXT: GLenum
    readonly UNSIGNED_NORMALIZED_EXT: GLenum
}

interface WEBGL_compressed_texture_astc {
    getSupportedProfiles(): string[]
    readonly COMPRESSED_RGBA_ASTC_10x10_KHR: GLenum
    readonly COMPRESSED_RGBA_ASTC_10x5_KHR: GLenum
    readonly COMPRESSED_RGBA_ASTC_10x6_KHR: GLenum
    readonly COMPRESSED_RGBA_ASTC_10x8_KHR: GLenum
    readonly COMPRESSED_RGBA_ASTC_12x10_KHR: GLenum
    readonly COMPRESSED_RGBA_ASTC_12x12_KHR: GLenum
    readonly COMPRESSED_RGBA_ASTC_4x4_KHR: GLenum
    readonly COMPRESSED_RGBA_ASTC_5x4_KHR: GLenum
    readonly COMPRESSED_RGBA_ASTC_5x5_KHR: GLenum
    readonly COMPRESSED_RGBA_ASTC_6x5_KHR: GLenum
    readonly COMPRESSED_RGBA_ASTC_6x6_KHR: GLenum
    readonly COMPRESSED_RGBA_ASTC_8x5_KHR: GLenum
    readonly COMPRESSED_RGBA_ASTC_8x6_KHR: GLenum
    readonly COMPRESSED_RGBA_ASTC_8x8_KHR: GLenum
    readonly COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR: GLenum
    readonly COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR: GLenum
    readonly COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR: GLenum
    readonly COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR: GLenum
    readonly COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR: GLenum
    readonly COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR: GLenum
    readonly COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR: GLenum
    readonly COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR: GLenum
    readonly COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR: GLenum
    readonly COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR: GLenum
    readonly COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR: GLenum
    readonly COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR: GLenum
    readonly COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR: GLenum
    readonly COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR: GLenum
}

interface WEBGL_compressed_texture_etc {
    readonly COMPRESSED_R11_EAC: GLenum
    readonly COMPRESSED_RG11_EAC: GLenum
    readonly COMPRESSED_RGB8_ETC2: GLenum
    readonly COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2: GLenum
    readonly COMPRESSED_RGBA8_ETC2_EAC: GLenum
    readonly COMPRESSED_SIGNED_R11_EAC: GLenum
    readonly COMPRESSED_SIGNED_RG11_EAC: GLenum
    readonly COMPRESSED_SRGB8_ALPHA8_ETC2_EAC: GLenum
    readonly COMPRESSED_SRGB8_ETC2: GLenum
    readonly COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2: GLenum
}

interface WEBGL_compressed_texture_etc1 {
    readonly COMPRESSED_RGB_ETC1_WEBGL: GLenum
}

/** The WEBGL_compressed_texture_s3tc extension is part of the WebGL API and exposes four S3TC compressed texture formats. */
interface WEBGL_compressed_texture_s3tc {
    readonly COMPRESSED_RGBA_S3TC_DXT1_EXT: GLenum
    readonly COMPRESSED_RGBA_S3TC_DXT3_EXT: GLenum
    readonly COMPRESSED_RGBA_S3TC_DXT5_EXT: GLenum
    readonly COMPRESSED_RGB_S3TC_DXT1_EXT: GLenum
}

interface WEBGL_compressed_texture_s3tc_srgb {
    readonly COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT: GLenum
    readonly COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT: GLenum
    readonly COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT: GLenum
    readonly COMPRESSED_SRGB_S3TC_DXT1_EXT: GLenum
}

/** The WEBGL_debug_renderer_info extension is part of the WebGL API and exposes two constants with information about the graphics driver for debugging purposes. */
interface WEBGL_debug_renderer_info {
    readonly UNMASKED_RENDERER_WEBGL: GLenum
    readonly UNMASKED_VENDOR_WEBGL: GLenum
}

interface WEBGL_debug_shaders {
    getTranslatedShaderSource(shader: WebGLShader): string
}

/** The WEBGL_depth_texture extension is part of the WebGL API and defines 2D depth and depth-stencil textures. */
interface WEBGL_depth_texture {
    readonly UNSIGNED_INT_24_8_WEBGL: GLenum
}

interface WEBGL_draw_buffers {
    drawBuffersWEBGL(buffers: GLenum[]): void
    readonly COLOR_ATTACHMENT0_WEBGL: GLenum
    readonly COLOR_ATTACHMENT10_WEBGL: GLenum
    readonly COLOR_ATTACHMENT11_WEBGL: GLenum
    readonly COLOR_ATTACHMENT12_WEBGL: GLenum
    readonly COLOR_ATTACHMENT13_WEBGL: GLenum
    readonly COLOR_ATTACHMENT14_WEBGL: GLenum
    readonly COLOR_ATTACHMENT15_WEBGL: GLenum
    readonly COLOR_ATTACHMENT1_WEBGL: GLenum
    readonly COLOR_ATTACHMENT2_WEBGL: GLenum
    readonly COLOR_ATTACHMENT3_WEBGL: GLenum
    readonly COLOR_ATTACHMENT4_WEBGL: GLenum
    readonly COLOR_ATTACHMENT5_WEBGL: GLenum
    readonly COLOR_ATTACHMENT6_WEBGL: GLenum
    readonly COLOR_ATTACHMENT7_WEBGL: GLenum
    readonly COLOR_ATTACHMENT8_WEBGL: GLenum
    readonly COLOR_ATTACHMENT9_WEBGL: GLenum
    readonly DRAW_BUFFER0_WEBGL: GLenum
    readonly DRAW_BUFFER10_WEBGL: GLenum
    readonly DRAW_BUFFER11_WEBGL: GLenum
    readonly DRAW_BUFFER12_WEBGL: GLenum
    readonly DRAW_BUFFER13_WEBGL: GLenum
    readonly DRAW_BUFFER14_WEBGL: GLenum
    readonly DRAW_BUFFER15_WEBGL: GLenum
    readonly DRAW_BUFFER1_WEBGL: GLenum
    readonly DRAW_BUFFER2_WEBGL: GLenum
    readonly DRAW_BUFFER3_WEBGL: GLenum
    readonly DRAW_BUFFER4_WEBGL: GLenum
    readonly DRAW_BUFFER5_WEBGL: GLenum
    readonly DRAW_BUFFER6_WEBGL: GLenum
    readonly DRAW_BUFFER7_WEBGL: GLenum
    readonly DRAW_BUFFER8_WEBGL: GLenum
    readonly DRAW_BUFFER9_WEBGL: GLenum
    readonly MAX_COLOR_ATTACHMENTS_WEBGL: GLenum
    readonly MAX_DRAW_BUFFERS_WEBGL: GLenum
}

interface WEBGL_lose_context {
    loseContext(): void
    restoreContext(): void
}

interface WEBGL_multi_draw {
    multiDrawArraysInstancedWEBGL(mode: GLenum, firstsList: Int32Array | GLint[], firstsOffset: GLuint, countsList: Int32Array | GLsizei[], countsOffset: GLuint, instanceCountsList: Int32Array | GLsizei[], instanceCountsOffset: GLuint, drawcount: GLsizei): void
    multiDrawArraysWEBGL(mode: GLenum, firstsList: Int32Array | GLint[], firstsOffset: GLuint, countsList: Int32Array | GLsizei[], countsOffset: GLuint, drawcount: GLsizei): void
    multiDrawElementsInstancedWEBGL(mode: GLenum, countsList: Int32Array | GLint[], countsOffset: GLuint, type: GLenum, offsetsList: Int32Array | GLsizei[], offsetsOffset: GLuint, instanceCountsList: Int32Array | GLsizei[], instanceCountsOffset: GLuint, drawcount: GLsizei): void
    multiDrawElementsWEBGL(mode: GLenum, countsList: Int32Array | GLint[], countsOffset: GLuint, type: GLenum, offsetsList: Int32Array | GLsizei[], offsetsOffset: GLuint, drawcount: GLsizei): void
}

/** A WaveShaperNode always has exactly one input and one output. */
// interface WaveShaperNode extends AudioNode {
//     curve: Float32Array | null
//     oversample: OverSampleType
// }

// declare var WaveShaperNode: {
//     prototype: WaveShaperNode
//     new(context: BaseAudioContext, options?: WaveShaperOptions): WaveShaperNode
// }
