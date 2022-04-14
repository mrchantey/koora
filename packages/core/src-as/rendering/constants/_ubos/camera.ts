import { Uniform } from '../../material/Uniform'
import { UniformBufferObject } from '../../material/UniformBufferObject'
import * as UniformName from '../_uniforms'

const uboName = 'ubo_camera'
const uboBlock = `
layout( std140 ) uniform ${uboName}{
	mat4 ${UniformName.View};
	mat4 ${UniformName.Projection};
	mat4 ${UniformName.ViewProjection};
	mat4 ${UniformName.CameraModel};
};
`


export const camera = new UniformBufferObject(uboName, uboBlock,
	[
		Uniform.Mat4(UniformName.View),
		Uniform.Mat4(UniformName.Projection),
		Uniform.Mat4(UniformName.ViewProjection),
		Uniform.Mat4(UniformName.CameraModel)
	])