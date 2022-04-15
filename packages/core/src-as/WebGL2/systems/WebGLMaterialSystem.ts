import { host } from '../../imports'
import { Culling, Material, Uniform, UniformType, Uniform_bitmap, Uniform_f32, Uniform_texture } from '../../rendering'
import { WebGLMaterial, WebGLShader, WebGLTextureUniform, WebGLUniform, WebGLUniformBufferObject, WebGLUniform_float, WebGLUniform_mat4, WebGLUniform_vec2, WebGLUniform_vec3, WebGLUniform_vec4 } from '../components'
import { gl } from '../imports'
import { WebGLUniformBufferObjectSystem } from './WebGLUniformBufferObjectSystem'


export class WebGLMaterialSystem{
	
	materialMap: Map<Material, WebGLMaterial> = new Map()
	uboSystem: WebGLUniformBufferObjectSystem
	// imageGlue: LoaderGlue
	textureIndex: u32 = 0

	constructor(uboSystem: WebGLUniformBufferObjectSystem){
		this.uboSystem = uboSystem
		// this.imageGlue = imageGlue
	}

	getOrCreate(material: Material, shader: WebGLShader): WebGLMaterial{
		if (this.materialMap.has(material))
			return this.materialMap.get(material)

		const ubos: WebGLUniformBufferObject[] = []
		for (let i = 0; i < material.uniformBufferObjects.length; i++){
			const ubo = this.uboSystem.assignToShader(material.uniformBufferObjects[i], shader)
			if (ubo)
				ubos.push(ubo)
		}
		const uniforms: WebGLUniform[] = []
		for (let i = 0; i < material.uniformArr.length; i++){
			const uniform = this.createUniform(material.uniformArr[i], shader)
			if (uniform)
				uniforms.push(uniform)
		}

		const glMaterial: WebGLMaterial = {
			transparent: !!material.transparent,
			culling: material.culling,
			uniforms,
			ubos
		}

		this.materialMap.set(material, glMaterial)
		return glMaterial
	}

	createUniform(uniform: Uniform, shader: WebGLShader): WebGLUniform | null {
		const program = host.get(shader.programId)
		const location = gl.getUniformLocation(program, uniform.name)
		// if (location == -1)
		// 	return null
		if (uniform.type === UniformType.TEXTURE || uniform.type === UniformType.BITMAP){
			const texIndex = this.textureIndex++
			if (texIndex >= 32)
				throw new Error('Maximum texture count reached - 32')
			const glTexture = gl.createTexture()
			gl.activeTexture(gl.Texture.TEXTURE0 + texIndex)
			gl.bindTexture(gl.Texture.TEXTURE_2D, glTexture)
			if (uniform.type === UniformType.TEXTURE)
				this.setTextureUniform(uniform)
			else
				this.setBitmapUniform(uniform)
			//options
			//https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter
			gl.generateMipmap(gl.Texture.TEXTURE_2D)
			//REPEAT, MIRRORED_REPEAT, CLAMP_TO_EDGE
			gl.texParameteri(gl.Texture.TEXTURE_2D, gl.Texture.TEXTURE_WRAP_S, gl.Texture.REPEAT)
			gl.texParameteri(gl.Texture.TEXTURE_2D, gl.Texture.TEXTURE_WRAP_T, gl.Texture.REPEAT)
			//only use without mip maps, linear or nearest
			gl.texParameteri(gl.Texture.TEXTURE_2D, gl.Texture.TEXTURE_MAG_FILTER, gl.Texture.LINEAR)
			//only use with mip maps
			gl.texParameteri(gl.Texture.TEXTURE_2D, gl.Texture.TEXTURE_MIN_FILTER, gl.Texture.LINEAR_MIPMAP_LINEAR)
			//end options
			return new WebGLTextureUniform(location, texIndex)
		} else {
			//TODO 
			switch (uniform.type){
			case UniformType.FLOAT:
				return new WebGLUniform_float(location, (uniform as Uniform_f32).value)
			case UniformType.FLOAT_VEC2:
				return new WebGLUniform_vec2(location, (uniform as Uniform_f32).value)
			case UniformType.FLOAT_VEC3:
				return new WebGLUniform_vec3(location, (uniform as Uniform_f32).value)
			case UniformType.FLOAT_VEC4:
				return new WebGLUniform_vec4(location, (uniform as Uniform_f32).value)
			case UniformType.FLOAT_MAT4:
				return new WebGLUniform_mat4(location, (uniform as Uniform_f32).value)
			default:
				throw new Error(`Unimplemented uniform type: ${uniform.type}`)
			}
		}
	}

	setBitmapUniform(_uniform: Uniform): void{
		const uniform = _uniform as Uniform_bitmap
		// const bitmap = uniform.value
		// const image = this.imageGlue.bitmaps.get(bitmap.ptr)
		// gl.texImage2D__2(gl.Texture.TEXTURE_2D, 0, gl.PixelFormat.RGBA, bitmap.width, bitmap.height, 
		// 	0, gl.PixelFormat.RGBA, image)
	}
	setTextureUniform(_uniform: Uniform): void{
		const uniform = _uniform as Uniform_texture
		const tex = uniform.value
		gl.texImage2D__1(gl.Texture.TEXTURE_2D, 0, gl.PixelFormat.RGBA, tex.width, tex.height, 
			0, gl.PixelFormat.RGBA, gl.PixelType.UNSIGNED_BYTE, tex.pixels)
	}

	beforeRender(material: WebGLMaterial): void{
		if (material.culling === Culling.Off){
			gl.disable(gl.Culling.CULL_FACE)
		} else if (material.culling === Culling.Back){
			gl.enable(gl.Culling.CULL_FACE)			
			gl.cullFace(gl.Culling.BACK)
		} else if (material.culling === Culling.Front){
			gl.cullFace(gl.Culling.FRONT)
		} else if (material.culling === Culling.Both){
			gl.cullFace(gl.Culling.FRONT_AND_BACK)
		}	
		for (let i = 0; i < material.uniforms.length; i++){
			material.uniforms[i].apply()			
		}
	}
}