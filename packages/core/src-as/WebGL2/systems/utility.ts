import { Attribute, Attribute_f32, Attribute_u8, Uniform, UniformType, Uniform_f32 } from '../../rendering'
import { gl } from '../imports'

export function bufferUsage(dynamic: bool): gl.BufferUsage{
	return dynamic ? gl.BufferUsage.DYNAMIC_DRAW : gl.BufferUsage.STATIC_DRAW
}


//These are wrong, some typed arrays have a byte offset
export function attributeArrayBuffer(attr: Attribute): ArrayBuffer{
	switch (attr.type){
	default:
	case gl.DataType.FLOAT:
		return (attr as Attribute_f32).value.buffer
	case gl.DataType.UNSIGNED_BYTE:
		return (attr as Attribute_u8).value.buffer
	}
}
export function uniformArrayBuffer(uni: Uniform): ArrayBuffer{
	switch (uni.type){
	default:
	case UniformType.FLOAT:
	case UniformType.FLOAT_VEC2:
	case UniformType.FLOAT_VEC3:
	case UniformType.FLOAT_VEC4:
	case UniformType.FLOAT_MAT4:
		return (uni as Uniform_f32).value.buffer
	// case gl.DataType.UNSIGNED_BYTE:
	// 	return (attr as Attribute_u8).value.buffer
	}
}