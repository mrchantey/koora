import { domUtils } from '../../imports'
import { UniformBufferObject, UniformBufferObjectSystem, UniformType, Uniform_f32 } from '../../rendering'
import { WebGLShader, WebGLUniformBufferObject } from '../components'
import { gl } from '../imports'
import { bufferUsage } from './utility'

export class WebGLUniformBufferObjectSystem extends UniformBufferObjectSystem{

	uboMap: Map<UniformBufferObject, WebGLUniformBufferObject> = new Map()
	uboIndexIncr: u32 = 0
	
	assignToShader(ubo: UniformBufferObject, shader: WebGLShader): WebGLUniformBufferObject | null{
		const program = domUtils.get(shader.programId)
		const shaderIndex = gl.getUniformBlockIndex(program, ubo.name)		
		if (shaderIndex === -1 || shaderIndex === 4294967295)//where does this number come from?
			return null
		const glUbo = this.getOrCreate(ubo, shader)
		gl.uniformBlockBinding(program, shaderIndex, glUbo.index)
		return glUbo
	}
		
	getOrCreate(ubo: UniformBufferObject, shader: WebGLShader): WebGLUniformBufferObject{
		if (this.uboMap.has(ubo))
			return this.uboMap.get(ubo)
		const glUbo = this.create(ubo, shader)
		this.uboMap.set(ubo, glUbo)
		return glUbo
	}

	create(ubo: UniformBufferObject, shader: WebGLShader): WebGLUniformBufferObject{
		const program = domUtils.get(shader.programId)
		const uniformNames = new Array<string>(ubo.uniformArr.length)
		for (let i = 0; i < ubo.uniformArr.length; i++){
			uniformNames[i] = ubo.uniformArr[i].name
		}
	
		const uboIndex = this.uboIndexIncr++	
	
		const blockIndex = gl.getUniformBlockIndex(program, ubo.name)
		const blockSize = gl.getActiveUniformBlockParameter__1(program, blockIndex, gl.Uniform.UNIFORM_BLOCK_DATA_SIZE)
		const uboBuffer = gl.createBuffer()
		gl.bindBuffer(gl.BufferType.UNIFORM_BUFFER, uboBuffer)
		gl.bufferData__1(gl.BufferType.UNIFORM_BUFFER, blockSize, bufferUsage(ubo.dynamic))
		gl.bindBuffer(gl.BufferType.UNIFORM_BUFFER, null)		
		
		gl.bindBufferBase(gl.BufferType.UNIFORM_BUFFER, uboIndex, uboBuffer)
		const uniformIndices = gl.getUniformIndices(program, uniformNames)
		const uniformOffsets = gl.getActiveUniforms__1(program, uniformIndices, gl.Uniform.UNIFORM_OFFSET)		
		
		// if (uniformOffsets === null)//we should never reach here, we check its legit on line 16
		// 	return null
		const instance: WebGLUniformBufferObject = {			
			name: ubo.name,
			index: uboIndex,
			bufferId: domUtils.set(uboBuffer),
			uniforms: ubo.uniformArr,
			uniformOffsets
		}
		return instance
	}
	
	apply(ubo: UniformBufferObject): void{
		if (!this.uboMap.has(ubo))
			return //no materials are using this ubo
			// throw new Error(`UBO not found - ${ubo.name}`)
		const glUbo = this.uboMap.get(ubo)
		const buffer = domUtils.get(glUbo.bufferId)		
		gl.bindBuffer(gl.BufferType.UNIFORM_BUFFER, buffer)
		
		for (let i = 0; i < glUbo.uniforms.length; i++){
			switch (glUbo.uniforms[i].type){
			default:
			case UniformType.FLOAT:
			case UniformType.FLOAT_VEC2:
			case UniformType.FLOAT_VEC3:
			case UniformType.FLOAT_VEC4:
			case UniformType.FLOAT_MAT4:{
				const arr = (glUbo.uniforms[i] as Uniform_f32).value
				const offset = glUbo.uniformOffsets[i]
				gl.bufferSubData__2(gl.BufferType.UNIFORM_BUFFER, offset, arr, 0)
			}
			}
		}
		gl.bindBuffer(gl.BufferType.UNIFORM_BUFFER, null)
	}
		
}
	
	
	
	