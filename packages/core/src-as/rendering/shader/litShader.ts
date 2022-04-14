// import { Mesh } from '../../components'
import { UniformName, AttributeName, Ubo } from '../constants'
import { StandardMaterial } from '../material'
import { lightConstants, lightUtils } from './glsl'
import { Shader } from './Shader'

// ${Mesh.ubo.block}
const vert = /*glsl*/
`#version 300 es
${Ubo.mesh.block}
${Ubo.camera.block}

in vec4 ${AttributeName.Position};
in vec3 ${AttributeName.Normal};
in vec2 ${AttributeName.Texcoord};

out vec3 v_normal;
out vec2 v_texcoord;

void main(void) {
	gl_Position = ${UniformName.ModelViewProjection} * ${AttributeName.Position};
	v_normal = mat3(${UniformName.InverseTransposeModel}) * ${AttributeName.Normal};
	v_texcoord = ${AttributeName.Texcoord};
}
`

const frag = /*glsl*/
`#version 300 es
precision mediump float;
${lightConstants}
${Ubo.directionalLight.block}

uniform vec4 ${UniformName.Color};
uniform sampler2D ${UniformName.Texture};

${lightUtils}

in vec3 v_normal;
in vec2 v_texcoord;
out vec4 o_color;

void main(void) {
	//TODO input color for lighting first
	vec4 diffuse = (${UniformName.Color} + texture(${UniformName.Texture}, v_texcoord));
	vec3 outputColor = calculateLighting(diffuse.xyz, v_normal);
	o_color = vec4(outputColor,${UniformName.Color}.a);
}
`

export const litShader = new Shader(vert, frag)