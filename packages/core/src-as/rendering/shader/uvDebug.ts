import { Material } from '../material'
import { Shader } from './Shader'

const vert = /*glsl*/
`#version 300 es

in vec4 a_position;
in vec2 a_texcoord;

out vec2 v_uv;

void main(void) {
	gl_Position = a_position;
	v_uv = a_texcoord;
}
`

const frag = /*glsl*/
`#version 300 es
precision mediump float;
out vec4 o_color;
in vec2 v_uv;

void main(void) {
	o_color = vec4(v_uv.xy,1,1);
}
`

export const uvDebugShader = new Shader(vert, frag)
// export const uvDebugMaterial = new Material(uvDebugShader)