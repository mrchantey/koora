import * as UniformName from '../_uniforms'
import { UniformBufferObject } from '../../material/UniformBufferObject'
import { Uniform } from '../../material/Uniform'

const uboName = 'ubo_model'
const uboBlock = `
layout( std140 ) uniform ${uboName}{
	mat4 ${UniformName.Model};
	mat4 ${UniformName.ModelView};
	mat4 ${UniformName.ModelViewProjection};
	mat4 ${UniformName.InverseModel};
	mat4 ${UniformName.InverseTransposeModel};
};
`

export const mesh = new UniformBufferObject(uboName, uboBlock, [
	Uniform.Mat4(UniformName.Model),
	Uniform.Mat4(UniformName.ModelView),
	Uniform.Mat4(UniformName.ModelViewProjection),
	Uniform.Mat4(UniformName.InverseModel),
	Uniform.Mat4(UniformName.InverseTransposeModel)
])