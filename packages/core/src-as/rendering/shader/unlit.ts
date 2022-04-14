// import { Mesh } from '../../components'
// import { imports } from '../../glue'
import { UniformName, AttributeName, Ubo } from '../constants'
import { StandardMaterial } from '../material'
import { Shader } from './Shader'
// ${Mesh.ubo.block}
const vert = /*glsl*/
`#version 300 es
${Ubo.mesh.block}
in vec4 ${AttributeName.Position};

void main(void) {
	gl_Position = ${UniformName.ModelViewProjection} * ${AttributeName.Position};
}
`

const frag = /*glsl*/
`#version 300 es
precision mediump float;

uniform vec4 u_color;
out vec4 o_color;

void main(void) {
	o_color = u_color;
}
`

export const unlitShader = new Shader(vert, frag)
