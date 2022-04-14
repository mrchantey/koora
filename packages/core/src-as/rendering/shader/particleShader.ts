import { AttributeName, Ubo, UniformName } from '../constants'
import { Shader } from './Shader'
import { glslUtils } from './glsl'

const a_pos = AttributeName.Position
const a_iPos = AttributeName.InstancePosition
const a_texcoord = AttributeName.Texcoord
// const u_mvp = UniformName.ModelViewProjection
const u_m = UniformName.Model
const u_v = UniformName.View
const u_p = UniformName.Projection
// const u_mv = UniformName.ModelView

const vert = /*glsl*/`#version 300 es

${glslUtils}
${Ubo.mesh.block}
${Ubo.camera.block}

in vec3 ${a_pos};
in vec3 ${a_iPos};
in vec2 ${a_texcoord};
out vec2 v_uv;
out float v_col;

void main() {
	vec4 modelPos = vec4(${u_m}[3].xyz + ${a_iPos},1);
	vec4 modelViewPos = ${u_v} * modelPos;
	vec3 vertModelPos = ${a_pos};
	vec4 vertPos = vec4(modelViewPos.xyz + vertModelPos,1);
	gl_Position = ${u_p} * vertPos;
	v_uv = 	${a_texcoord};
	v_col = rand(vec2(gl_InstanceID,0));
	// vec4 vertPos = vec4(${a_iPos} + ${a_pos},1);
	// gl_Position = u_mvp * vertPos;
}
`

const frag = /*glsl*/`#version 300 es
precision mediump float;


in vec2 v_uv;
in float v_col;

out vec4 o_color;
void main() {
	vec2 signedUV = v_uv * 2. - 1.;
	float len = min(length(signedUV),1.);
	o_color = vec4(0.,v_col,1.,1. - len);
}
`

export const particleRenderShader = new Shader(vert, frag)