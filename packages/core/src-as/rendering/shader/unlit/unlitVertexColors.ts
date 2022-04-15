// import { Mesh } from '../../components'
// import { imports } from '../../glue'
import { UniformName, AttributeName, Ubo } from '../../constants'
import { StandardMaterial } from '../../material'
import { Shader } from '../Shader'
// ${Mesh.ubo.block}
const vert = /*glsl*/
`#version 300 es
${Ubo.mesh.block}
${Ubo.camera.block}

in vec4 ${AttributeName.Position};
in vec4 a_color;

out vec4 v_color;

void main(void) {
	gl_Position = ${UniformName.ModelViewProjection} * ${AttributeName.Position};
	v_color = a_color;
}
`

const frag = /*glsl*/
`#version 300 es
precision mediump float;

uniform vec4 u_color;
in vec4 v_color;
out vec4 o_color;

void main(void) {
	o_color = u_color * v_color;
}
`

export const unlitVertexColorShader = new Shader(vert, frag)
