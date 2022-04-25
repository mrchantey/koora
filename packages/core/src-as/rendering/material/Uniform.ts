import { Bitmap, Texture } from '../../math'
import { UniformType } from '../constants'

export class Uniform{

	static Float(name: string, value: Float32Array = new Float32Array(1)): Uniform_f32{
		return new Uniform_f32(name, value, UniformType.FLOAT)
	}
	static Vec2(name: string, value: Float32Array = new Float32Array(2)): Uniform_f32{
		return new Uniform_f32(name, value, UniformType.FLOAT_VEC2)
	}
	static Vec3(name: string, value: Float32Array = new Float32Array(3)): Uniform_f32{
		return new Uniform_f32(name, value, UniformType.FLOAT_VEC3)
	}
	static Vec4(name: string, value: Float32Array = new Float32Array(4)): Uniform_f32{
		return new Uniform_f32(name, value, UniformType.FLOAT_VEC4)
	}
	static Mat4(name: string, value: Float32Array = new Float32Array(16)): Uniform_f32{
		return new Uniform_f32(name, value, UniformType.FLOAT_MAT4)
	}
	static Texture(name: string, value: Texture = Texture.testTexture): Uniform_texture{
		return new Uniform_texture(name, value, UniformType.TEXTURE)
	}
	static Bitmap(name: string, value: Bitmap): Uniform_bitmap{
		return new Uniform_bitmap(name, value, UniformType.BITMAP)
	}

	name: string
	type: UniformType
	elementSize: u32

	constructor(name: string, elementSize: u32, type: UniformType = UniformType.FLOAT){
		this.name = name
		this.elementSize = elementSize
		this.type = type
	}
}

export class TypedUniform<T> extends Uniform{
	value: T
	constructor(name: string,  value: T, type: UniformType = UniformType.FLOAT){
		//@ts-ignore
		super(name, <u32>value.length, type)
		this.value = value
	}
}
export class Uniform_f32 extends TypedUniform<Float32Array>{}
export class Uniform_i32 extends TypedUniform<Int32Array>{}
export class Uniform_u8 extends TypedUniform<Uint8Array>{}
export class Uniform_u32 extends TypedUniform<Uint32Array>{}
export class Uniform_texture extends TypedUniform<Texture>{}
export class Uniform_bitmap extends TypedUniform<Bitmap>{}