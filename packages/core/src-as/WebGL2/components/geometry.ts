import { ExternID } from '../../imports'
import { gl } from '../imports'

export class WebGLGeometry{
	primitiveType: gl.Primitive
	attributes: WebGLAttribute[]
	drawCount: u32
	instanceCount: u32
	useIndices: boolean
	vao: ExternID
	vaoSwap: ExternID

	feedback: ExternID
	feedbackSwap: ExternID
	// vao: WebGLVertexArrayObject
	// vaoSwap: WebGLVertexArrayObject | null
	// feedback: WebGLTransformFeedback|null
	// feedbackSwap: WebGLTransformFeedback|null
}


export class WebGLBindAttributeOptions{
	instanceGeometry: bool
	useSwap: bool
}

export class WebGLVAOOptions extends WebGLBindAttributeOptions{
	indicesUsage: gl.BufferUsage
	indices: Uint16Array | null
}


export class WebGLAttribute{
	name: string
	normalize: bool
	type: gl.DataType
	buffer: ExternID
	bufferSwap: ExternID
	elementSize: u32
	instanceDivisor: u32
}
