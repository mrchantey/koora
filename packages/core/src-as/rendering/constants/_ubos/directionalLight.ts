import { UniformBufferObject } from '../../material/UniformBufferObject'
import { Uniform } from '../../material/Uniform'
import { UniformName } from '../aliases'


const uboName = 'ubo_directionalLight'
const uboBlock = `
layout( std140 ) uniform ${uboName}{
	vec3[NUM_LIGHTS] ${UniformName.DirectionalLights_direction};
	float[NUM_LIGHTS] ${UniformName.DirectionalLights_ambientIntensity};
};
`
export const directionalLight = new UniformBufferObject(uboName, uboBlock, [
	Uniform.Float(UniformName.DirectionalLights_ambientIntensity),
	Uniform.Vec3(UniformName.DirectionalLights_direction, new Float32Array(6))
])