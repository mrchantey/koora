import { UniformName } from '../../constants'



export const glslUtils = /*glsl*/`
#ifndef MATH_UTILS
#define MATH_UTILS
const float PI = 3.14159265359;
const float TAU = 6.28318530718;
highp float rand(vec2 co)
{
    highp float a = 12.9898;
    highp float b = 78.233;
    highp float c = 43758.5453;
    highp float dt= dot(co.xy ,vec2(a,b));
    highp float sn= mod(dt,3.14);
    return fract(sin(sn) * c);
}

#endif
`
export const lightConstants = /*glsl*/`
#ifndef LIGHT_CONSTANTS
#define LIGHT_CONSTANTS
#define NUM_LIGHTS 8
#endif
`
export const lightUtils = /*glsl*/`
#ifndef LIGHT_UTILS
#define LIGHT_UTILS
vec3 calculateDirectionalLightAtIndex(vec3 diffuse,vec3 normal,int index){
	float strength = max(dot(normal,-${UniformName.DirectionalLights_direction}[index]),0.);
	return 
	diffuse * strength + 
	diffuse * ${UniformName.DirectionalLights_ambientIntensity}[index];
	// return vec3(0.,0.,0.);
}

vec3 calculateLighting(vec3 diffuse,vec3 normal){
	normal = normalize(normal);
	vec3 outputColor = vec3(0.,0.,0.);
	//TODO only iterate instantiated lights
	for(int i = 0; i < NUM_LIGHTS; i++){
		outputColor += calculateDirectionalLightAtIndex(diffuse,normal,i);
	}
	return outputColor;
}

#endif
`