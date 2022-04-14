import { gl } from '../../WebGL2'

export class Attribute{

	static Float(name: string, value: Float32Array, dynamic: bool = false): Attribute_f32{
		return new Attribute_f32(name, 1, value, dynamic)
	}
	static Vec2(name: string, value: Float32Array, dynamic: bool = false): Attribute_f32{
		return new Attribute_f32(name, 2, value, dynamic)
	}
	static Vec3(name: string, value: Float32Array, dynamic: bool = false): Attribute_f32{
		return new Attribute_f32(name, 3, value, dynamic)
	}
	static Vec4(name: string, value: Float32Array, dynamic: bool = false): Attribute_f32{
		return new Attribute_f32(name, 4, value, dynamic)
	}

	name: string
	varyingName: string | null
	normalize: bool = false
	dynamic: bool = false
	//TODO decouple attribute from webgl
	type: gl.DataType = gl.DataType.FLOAT
	elementSize: u8
	instanceDivisor: u32 = 0

	constructor(name: string, elementSize: u8, dynamic: bool = false){
		this.name = name
		this.elementSize = elementSize
		this.dynamic = dynamic
	}

	asVarying(varyingName: string): Attribute{
		this.dynamic = true
		this.varyingName = varyingName
		return this
	}

	asInstanced(divisor: u32 = 1): Attribute{
		this.instanceDivisor = divisor
		return this
	}
}

export class TypedAttribute<T> extends Attribute{
	value: T
	numElements: u32
	constructor(name: string, elementSize: u8, value: T, dynamic: bool = false){
		super(name, elementSize, dynamic)
		this.value = value
		//@ts-ignore
		this.numElements = this.value.length / this.elementSize
	}
}
export class Attribute_f32 extends TypedAttribute<Float32Array>{}
export class Attribute_u8 extends TypedAttribute<Uint8Array>{
	type: gl.DataType = gl.DataType.UNSIGNED_BYTE
	normalize: bool = true
}