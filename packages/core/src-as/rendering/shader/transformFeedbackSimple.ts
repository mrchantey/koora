import { AttributeName, VaryingName } from '../constants'
import { Shader } from './Shader'

const vert = /*glsl*/`#version 300 es
in vec3 ${AttributeName.InstancePosition};
// in vec3 a_velocity; 
out vec3 ${VaryingName.InstancePosition};
 
void main() {
	${VaryingName.InstancePosition} = ${AttributeName.InstancePosition} + vec3(0.01,0.01,0.01);
}
`
const frag = /*glsl*/`#version 300 es
precision highp float;
void main() {}
`
export const transformFeedbackSimpleShader = new Shader(vert, frag, [VaryingName.InstancePosition])

