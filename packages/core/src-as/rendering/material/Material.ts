import { Color, Texture } from '../../math'
import { Culling, Ubo, UniformName } from '../constants'
import { Shader } from '../shader'
import { Uniform, Uniform_texture } from './Uniform'
import { UniformBufferObject } from './UniformBufferObject'

export class Material{
	uniformMap: Map<string, Uniform> = new Map()
	uniformArr: Uniform[] = []
	uniformBufferObjects: UniformBufferObject[] = []
	transparent: bool = false
	culling: Culling = Culling.Back

	static new(shader: Shader): Material{ return new Material(shader) }
	shader: Shader
	constructor(shader: Shader){
		this.shader = shader
	}
	addUniform(uniform: Uniform): Material{
		this.uniformMap.set(uniform.name, uniform)
		this.uniformArr.push(uniform)
		return this
	}
	addUniformBufferObject(ubo: UniformBufferObject): Material{
		this.uniformBufferObjects.push(ubo)
		return this
	}
	getUniform<T extends Uniform>(name: string): T{
		return this.uniformMap.get(name) as T
	}
	setCulling(culling: Culling): Material{
		this.culling = culling
		return this
	}
	setTransparent(transparent: bool = true): Material{
		this.transparent = transparent
		return this
	}
}

export class SpatialMaterial extends Material{

	constructor(shader: Shader){
		super(shader)
		this
			.addUniformBufferObject(Ubo.camera)
			.addUniformBufferObject(Ubo.mesh)
			.addUniformBufferObject(Ubo.directionalLight)
	}
}


export class StandardMaterial extends SpatialMaterial{

	color: Color
	texture: Texture = Texture.white
	static new(shader: Shader): StandardMaterial{ return new StandardMaterial(shader) }
	constructor(shader: Shader){
		super(shader)
		this.color = new Color()
		this.addUniform(Uniform.Float(UniformName.Time))
		this.addUniform(Uniform.Vec4(UniformName.Color, this.color.m))
		this.addUniform(Uniform.Texture(UniformName.Texture, this.texture))
	}
	setColor(r: f32, g: f32, b: f32): StandardMaterial{
		this.color.set(r, g, b)
		return this
	}
	//untested
	// setTexture(texture: Texture): StandardMaterial{
	// 	this.texture = texture;
	// 	(this.getUniform(UniformName.Texture) as Uniform_texture).value = texture
	// 	return this
	// }
	// setBitmap(bitmap: Bitmap): StandardMaterial{
	// 	this.addUniform(Uniform.Bitmap(UniformName.Texture, bitmap))
	// 	return this
	// }
}