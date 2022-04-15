import { host, ExternID } from '../../imports'
import { Culling, Uniform, UniformType } from '../../rendering'
import { gl } from '../imports'




export class WebGLMaterial{
	// uniforms: WebGLUniform[]
	uniforms: WebGLUniform[]
	ubos: WebGLUniformBufferObject[]
	transparent: boolean
	culling: Culling
}


export class WebGLUniformBufferObject{
	name: string
	index: u32
	bufferId: ExternID
	uniforms: Uniform[]
	uniformOffsets: u32[]
	// uniforms: {
	// 	apply: () => void
	// 	// index: number
	// 	// offset: number
	// 	// arr: TypedArray
	// }[]
}

export class WebGLUniform{
	locationId: ExternID
	constructor(location: gl.WebGLUniformLocation){
		this.locationId = host.set(location)
	}
	// location:u32
	// arr: TypedArray
	apply(): void{}
}
export class WebGLUniform_typed<T> extends WebGLUniform{
	value: T
	constructor(location: gl.WebGLUniformLocation, value: T){
		super(location)
		this.value = value
	}
}
export class WebGLUniform_float extends WebGLUniform_typed<Float32Array>{
	apply(): void { gl.uniform1fv(host.get(this.locationId), this.value) }
}
export class WebGLUniform_vec2 extends WebGLUniform_typed<Float32Array>{
	apply(): void { gl.uniform2fv(host.get(this.locationId), this.value) }
}
export class WebGLUniform_vec3 extends WebGLUniform_typed<Float32Array>{
	apply(): void { gl.uniform3fv(host.get(this.locationId), this.value) }
}
export class WebGLUniform_vec4 extends WebGLUniform_typed<Float32Array>{
	apply(): void { gl.uniform4fv(host.get(this.locationId), this.value) }
}
export class WebGLUniform_mat4 extends WebGLUniform_typed<Float32Array>{
	apply(): void { gl.uniformMatrix4fv(host.get(this.locationId), false, this.value) }
}




export class WebGLTextureUniform extends WebGLUniform{
	texIndex: u32
	constructor(location: gl.WebGLUniformLocation, texIndex: u32){
		super(location)
		this.texIndex = texIndex
	}

	apply(): void{
		gl.uniform1i(host.get(this.locationId), this.texIndex)
	}
}