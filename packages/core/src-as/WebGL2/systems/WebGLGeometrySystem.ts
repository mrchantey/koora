import { domUtils } from '../../imports'
import { Attribute, Attribute_f32, Attribute_u8, Geometry } from '../../rendering'
import { WebGLAttribute, WebGLBindAttributeOptions, WebGLGeometry, WebGLShader, WebGLVAOOptions } from '../components'
import { gl } from '../imports'
import { attributeArrayBuffer, bufferUsage } from './utility'




export class WebGLGeometrySystem{	
	
	geometryMap: Map<Geometry, WebGLGeometry> = new Map()
	attributeMap: Map<Attribute, WebGLAttribute> = new Map()

	getOrCreate(geometry: Geometry, shader: WebGLShader): WebGLGeometry{		
		if (this.geometryMap.has(geometry))
			return this.geometryMap.get(geometry)
		const glGeometry = this.create(geometry, shader)
		this.geometryMap.set(geometry, glGeometry)
		return glGeometry
	}

	create(geometry: Geometry, shader: WebGLShader): WebGLGeometry{
		
		const attributes: WebGLAttribute[] = new Array(geometry.attributeArr.length)
		for (let i = 0; i < attributes.length; i++)
			attributes[i] = this.getOrCreateAttribute(geometry.attributeArr[i])
		
		const indices = geometry.indices
		const indicesUsage = bufferUsage(geometry.dynamicIndices)
		const instanceGeometry = geometry.instanceCount > 0

		const vao = this.createVAO(attributes, shader, {
			useSwap: false, indices, indicesUsage, instanceGeometry,
		})
		const swappable = attributes.some(attr => !!attr.bufferSwap)
		
		if (shader.useFeedback && !swappable)
			throw new Error('Geometry Glue - Shader uses Transform Feedback but no attributes found marked as varying. Did you for get to new Attribute().asVarying()')

		const vaoSwap = swappable
			? this.createVAO(attributes, shader, { 
				useSwap: true, indices, indicesUsage, instanceGeometry
			})
			: null
		
		//vao1->feedback2, vao2->feedback1
		const feedback = shader.useFeedback
			? this.createFeedback(attributes, true)
			: null
		const feedbackSwap = shader.useFeedback
			? this.createFeedback(attributes, false)
			: null
		
		const instance: WebGLGeometry = {
			vao: domUtils.set(vao),
			vaoSwap: vaoSwap ? domUtils.set(vaoSwap) : 0,
			feedback: domUtils.set(feedback),
			feedbackSwap: feedbackSwap ? domUtils.set(feedbackSwap) : 0,
			attributes,
			instanceCount: geometry.instanceCount,
			primitiveType: geometry.primitiveType,
			useIndices: !!indices,
			drawCount: indices 
				? indices.length
				: geometry.vertexCount
		}
		
		gl.bindBuffer(gl.BufferType.ARRAY_BUFFER, null)
		return instance
	}
	
	createVAO(attributes: WebGLAttribute[], shader: WebGLShader, options: WebGLVAOOptions): gl.WebGLVertexArrayObject{
	
		const vao = gl.createVertexArray()
		gl.bindVertexArray(vao)
		for (let i = 0; i < attributes.length; i++)
			this.bindAttribute(attributes[i], shader, options)

		const indices = options.indices
		if (indices){
			const indexBuffer = gl.createBuffer()
			gl.bindBuffer(gl.BufferType.ELEMENT_ARRAY_BUFFER, indexBuffer)
			gl.bufferData__5(gl.BufferType.ELEMENT_ARRAY_BUFFER, indices, options.indicesUsage)
		}
		gl.bindVertexArray(null)
		// gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)
		gl.bindBuffer(gl.BufferType.ARRAY_BUFFER, null)
		return vao		
	}

	createFeedback(attributes: WebGLAttribute[], useSwap: bool = false): gl.WebGLTransformFeedback{
		const feedback = gl.createTransformFeedback()
		gl.bindTransformFeedback(gl.TransformFeedback.TRANSFORM_FEEDBACK, feedback)		
		const varyings = attributes.filter(attribute => attribute.bufferSwap !== 0)
		
		for (let i = 0; i < varyings.length; i++){
			const bufferId = useSwap ? varyings[i].bufferSwap : varyings[i].buffer
			const buffer = domUtils.get(bufferId)
			gl.bindBufferBase(gl.BufferType.TRANSFORM_FEEDBACK_BUFFER, i, buffer)
		}
		gl.bindBuffer(gl.BufferType.ARRAY_BUFFER, null)
		gl.bindBuffer(gl.BufferType.TRANSFORM_FEEDBACK_BUFFER, null)
		return feedback
	}
	
	bindAttribute(attr: WebGLAttribute, shader: WebGLShader, options: WebGLBindAttributeOptions): void{
		const program = domUtils.get(shader.programId)
		const loc = gl.getAttribLocation(program, attr.name)
		
		if (loc === -1)//attribute not used by shader
			return
		const bufferId = attr.bufferSwap && options.useSwap 
			? attr.bufferSwap
			: attr.buffer
		const buffer = domUtils.get(bufferId)
		gl.bindBuffer(gl.BufferType.ARRAY_BUFFER, buffer)
		gl.enableVertexAttribArray(loc)
		gl.vertexAttribPointer(loc, attr.elementSize, attr.type, attr.normalize, 0, 0)
		
		if (options.instanceGeometry && attr.instanceDivisor > 0)
			gl.vertexAttribDivisor(loc, attr.instanceDivisor)
	}

	getOrCreateAttribute(attr: Attribute): WebGLAttribute{
		if (this.attributeMap.has(attr))
			return this.attributeMap.get(attr)
		const glAttr = this.createAttribute(attr)
		this.attributeMap.set(attr, glAttr)
		return glAttr
	}
	
	createAttribute(attr: Attribute): WebGLAttribute{
		const buffer = this.createBuffer(attr)
		const bufferSwap = attr.varyingName
			? this.createBuffer(attr)
			: null
		return {
			name: attr.name,
			buffer: domUtils.set(buffer),
			bufferSwap: bufferSwap ? domUtils.set(bufferSwap) : 0,
			type: attr.type,
			normalize: !!attr.normalize,
			elementSize: attr.elementSize,
			instanceDivisor: attr.instanceDivisor
		}
	}
	
	createBuffer(attr: Attribute): gl.WebGLBuffer{
		const buffer = gl.createBuffer()
		gl.bindBuffer(gl.BufferType.ARRAY_BUFFER, buffer)
		switch (attr.type){
		default:
		case gl.DataType.FLOAT:
			gl.bufferData__3(gl.BufferType.ARRAY_BUFFER, (attr as Attribute_f32).value, bufferUsage(attr.dynamic))
			break
		case gl.DataType.UNSIGNED_BYTE:
			gl.bufferData__4(gl.BufferType.ARRAY_BUFFER, (attr as Attribute_u8).value, bufferUsage(attr.dynamic))
			break
		}
		return buffer
	}

	render(geometry: WebGLGeometry): void{
		
		const vao = domUtils.get(geometry.vao)
		// domUtils.log_externref(vao)
		// console.log(`${geometry.vao}`)
		gl.bindVertexArray(vao)
		// domUtils.log_externref(vao)
		//TODO webgl geometries should know how to draw themselves
		if (geometry.feedback){
			// console.log(next)
			//read from 1
			gl.enable(gl.Parameter.RASTERIZER_DISCARD)
			//write to next
			gl.bindTransformFeedback(gl.TransformFeedback.TRANSFORM_FEEDBACK, domUtils.get(geometry.feedback))
			gl.beginTransformFeedback(gl.Primitive.POINTS)
			gl.drawArrays(gl.Primitive.POINTS, 0, geometry.drawCount)
			gl.disable(gl.Parameter.RASTERIZER_DISCARD)
			gl.endTransformFeedback()
			gl.bindTransformFeedback(gl.TransformFeedback.TRANSFORM_FEEDBACK, null)
		} else if (geometry.instanceCount > 0 && geometry.useIndices)
			gl.drawElementsInstanced(geometry.primitiveType, geometry.drawCount, gl.DataType.UNSIGNED_SHORT, 0, geometry.instanceCount)
		else if (geometry.instanceCount > 0)
			gl.drawArraysInstanced(geometry.primitiveType, 0, geometry.drawCount, geometry.instanceCount)
		else if (geometry.useIndices)
			gl.drawElements(geometry.primitiveType, geometry.drawCount, gl.DataType.UNSIGNED_SHORT, 0)
		else
			gl.drawArrays(geometry.primitiveType, 0, geometry.drawCount)
		gl.bindVertexArray(null)

		if (geometry.vaoSwap){
			const temp = geometry.vao
			geometry.vao = geometry.vaoSwap
			geometry.vaoSwap = temp
		}
		if (geometry.feedbackSwap){
			const temp = geometry.feedback
			geometry.feedback = geometry.feedbackSwap
			geometry.feedbackSwap = temp
		}
	}
	
}