import { AttributeName, Ubo, UniformName } from '../constants'
import { Shader } from './Shader'

const vert = /*glsl*/
`#version 300 es
${Ubo.camera.block}
${Ubo.mesh.block}

in vec3 ${AttributeName.Position};
in vec4 ${AttributeName.InstancePosition};
in vec3 ${AttributeName.InstanceTangent};
in vec2 ${AttributeName.Texcoord};
in vec3 ${AttributeName.Normal};
out vec2 v_uv;
out vec3 v_normal;

vec3 matrixPosition(mat4 matrix){
	return matrix[3].xyz;
}

vec3 modelSpaceCameraDirection(vec3 position){
	return (${UniformName.InverseModel} * vec4(matrixPosition(${UniformName.CameraModel}),1)).xyz - position;
}

void main(void) {
	vec4 pos = ${AttributeName.InstancePosition} + vec4(${AttributeName.InstanceTangent} * max(0.,${AttributeName.Position}.x) * 8.,0);
	
	vec3 fwd = modelSpaceCameraDirection(pos.xyz);
	vec3 up = ${AttributeName.InstanceTangent};
	vec3 right = normalize(cross(fwd,up));
	
	gl_Position = ${UniformName.ModelViewProjection} * (pos + vec4(right * ${AttributeName.Position}.y,0));
	v_normal = ${AttributeName.InstanceTangent};			
}
`

const frag = /*glsl*/
`#version 300 es
precision mediump float;
out vec4 o_color;
in vec3 v_normal;

void main(void) {
	o_color = vec4(v_normal * 0.5 + 0.5,1);
}
`




export const debugNormalsShader = new Shader(vert, frag)
