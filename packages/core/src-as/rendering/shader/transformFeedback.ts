import { AttributeName, UniformName, VaryingName } from '../constants'
import { Shader } from './Shader'
import { glslUtils } from './glsl'

const a_pos = AttributeName.InstancePosition
const a_vel = AttributeName.InstanceVelocity

const v_vel = VaryingName.InstanceVelocity
const v_pos = VaryingName.InstancePosition

const u_acc = UniformName.Acceleration
const u_dt = UniformName.DeltaTime

const vert = /*glsl*/`#version 300 es

${glslUtils}

uniform float ${u_dt};
uniform vec3 ${u_acc};

in vec3 ${a_pos};
in vec3 ${a_vel};
out vec3 ${v_pos};
out vec3 ${v_vel};


void main() {
	${v_vel} = ${a_vel} + ${u_acc} * ${u_dt};
	${v_pos} = ${a_pos} + ${v_vel} * ${u_dt};
	if(${v_pos}.y < 0.){
		float rnd = rand(vec2(gl_VertexID,0));
		float rnd2 = rand(vec2(0,gl_VertexID));
		${v_vel} = vec3(0.,rnd2,1.);
		// ${v_pos} = vec3((rnd * 2. - 1.) * 50.,100., 0.);
		${v_pos} = vec3((rnd * 2. - 1.) * 5.,10., 0.);
	}
}
`
const frag = /*glsl*/`#version 300 es
precision highp float;
void main() {}
`
export const transformFeedbackShader = new Shader(vert, frag, [v_pos, v_vel])

