import { mat4 } from '../glMatrix'
import { Quaternion } from './Quaternion'
import { Vector3 } from './Vector3'

export class Matrix{
	static new(): Matrix{ return new Matrix() }
	static get identity(): Matrix{ return new Matrix() }
	static _identity: Matrix = Matrix.identity
	static _tmp0: Matrix = new Matrix()	

	static multiply(out: Matrix, a: Matrix, b: Matrix): Matrix{
		mat4.multiply(out.m, a.m, b.m)
		return out
	}
	static transpose(out: Matrix, a: Matrix): Matrix{
		mat4.transpose(out.m, a.m)
		return out
	}

	m: Float32Array

	constructor(m: Float32Array = new Float32Array(16)){
		this.m = m
		mat4.identity(this.m)
	}
	identity(): Matrix{
		mat4.identity(this.m)
		return this
	}
	setRows(
		m11: f32 = 1, m12: f32 = 0, m13: f32 = 0, m14: f32 = 0,
		m21: f32 = 0, m22: f32 = 1, m23: f32 = 0, m24: f32 = 0,
		m31: f32 = 0, m32: f32 = 0, m33: f32 = 1, m34: f32 = 0,
		m41: f32 = 0, m42: f32 = 0, m43: f32 = 0, m44: f32 = 1): Matrix {
		const m = this.m
		m[ 0 ] = m11; m[ 4 ] = m12; m[ 8 ] = m13; m[ 12 ] = m14
		m[ 1 ] = m21; m[ 5 ] = m22; m[ 9 ] = m23; m[ 13 ] = m24
		m[ 2 ] = m31; m[ 6 ] = m32; m[ 10 ] = m33; m[ 14 ] = m34
		m[ 3 ] = m41; m[ 7 ] = m42; m[ 11 ] = m43; m[ 15 ] = m44
		return this
	}

	scaledRight(target: Vector3 = new Vector3()): Vector3{ target.set(this.m[0], this.m[1], this.m[2]); return target }
	scaledUp(target: Vector3 = new Vector3()): Vector3{ target.set(this.m[4], this.m[5], this.m[6]); return target }
	scaledForward(target: Vector3 = new Vector3()): Vector3{ target.set(this.m[8], this.m[9], this.m[10]); return target }
	position(target: Vector3 = new Vector3()): Vector3{ target.set(this.m[12], this.m[13], this.m[14]); return target }
	// right(): Vector3{ return new Vector3(this.m[0], this.m[4], this.m[8]) }
	// up(): Vector3{ return new Vector3(this.m[1], this.m[5], this.m[9]) }
	// forward(): Vector3{ return new Vector3(this.m[2], this.m[6], this.m[10]) }
	// position(target: Vector3 = new Vector3): Vector3{ target.x = this.m[3]; target.y = this.m[7]; target.z = this.m[11]; return target }
	clone(o: Matrix = new Matrix()): Matrix{ o.m.set(this.m); return o }

	rotation(target: Quaternion = new Quaternion()): Quaternion{
		mat4.getRotation(target.m, this.m)
		return target
	}
	scale(target: Vector3 = new Vector3()): Vector3
	{
		mat4.getScaling(target.m, this.m)
		return target
	}
	
	isIdentity(): boolean{
		const m = this.m
		return m[0] === 1.0 && m[1] === 0.0 && m[2] === 0.0 && m[3] === 0.0 &&
		m[4] === 0.0 && m[5] === 1.0 && m[6] === 0.0 && m[7] === 0.0 &&
		m[8] === 0.0 && m[9] === 0.0 && m[10] === 1.0 && m[11] === 0.0 &&
		m[12] === 0.0 && m[13] === 0.0 && m[14] === 0.0 && m[15] === 1.0
	}
	transformDirection (vec: Vector3, target: Vector3 = new Vector3()): Vector3{
		const m = this.m
		target.x = 	vec.x * m[0] + vec.y * m[4] + vec.z * m[8]
		target.y = 	vec.x * m[1] + vec.y * m[5] + vec.z * m[9]
		target.z = 	vec.x * m[2] + vec.y * m[6] + vec.z * m[10]
		//target.normalize()
		return target
	}
	transformPoint (vec: Vector3, target: Vector3 = new Vector3()): Vector3 {
		const m = this.m
		const rw = <f32>1 / (vec.x * m[3] + vec.y * m[7] + vec.z * m[11] + m[15])
		target.x = vec.x * m[0] + vec.y * m[4] + vec.z * m[8] + m[12] * rw
		target.y = vec.x * m[1] + vec.y * m[5] + vec.z * m[9] + m[13] * rw
		target.z = vec.x * m[2] + vec.y * m[6] + vec.z * m[10] + m[14] * rw
		return target
	}

	
	lookAt(target: Vector3, up: Vector3 = Vector3._up): Matrix{
		this.position(Vector3._tmp0)
		mat4.targetTo(this.m, target.m, Vector3._tmp0.m, up.m)
		return this
	}
	
	lookAway(target: Vector3, up: Vector3 = Vector3._up): Matrix{
		this.position(Vector3._tmp0)
		mat4.targetTo(this.m, Vector3._tmp0.m, target.m, up.m)
		return this
	}

	setPosition(pos: Vector3): Matrix{
		this.m[12] = pos.x; this.m[13] = pos.y; this.m[14] = pos.z
		return this
	}
	
	
	copy(a: Matrix): Matrix{
		mat4.copy(this.m, a.m)
		return this
	}
	invert(a: Matrix = this): Matrix{
		mat4.invert(this.m, a.m)
		return this
	}
	perspective(fovy: f32, aspect: f32, near: f32, far: f32): Matrix{
		mat4.perspective(this.m, fovy, aspect, near, far)
		return this
	}
	
	multiply(b: Matrix): Matrix{
		mat4.multiply(this.m, this.m, b.m)
		return this
	}

	compose(position: Vector3, rotation: Quaternion, scale: Vector3): Matrix{
		mat4.fromRotationTranslationScale(this.m, rotation.m, position.m, scale.m)
		return this
	}	
	
	decompose(position: Vector3, rotation: Quaternion, scale: Vector3): Matrix{
		mat4.getTranslation(position.m, this.m)
		//TODO optimize, this gets scaling twice
		mat4.getRotation(rotation.m, this.m)
		mat4.getScaling(scale.m, this.m)
		return this
	}
	
	/*

		// applyMatrix3(matrix: Matrix): Vector3 {
	// 	const x = this.x, y = this.y, z = this.z
	// 	const m = matrix.m
	// 	this.x = m[ 0 ] * x + m[ 3 ] * y + m[ 6 ] * z
	// 	this.y = m[ 1 ] * x + m[ 4 ] * y + m[ 7 ] * z
	// 	this.z = m[ 2 ] * x + m[ 5 ] * y + m[ 8 ] * z
	// 	return this
	// }
	// applyMatrix4(matrix: Matrix): Vector3 {
	// 	const x = this.x, y = this.y, z = this.z
	// 	const m = matrix.m
	// 	const w = 1 / (m[ 3 ] * x + m[ 7 ] * y + m[ 11 ] * z + m[ 15 ])
	// 	this.x = (m[ 0 ] * x + m[ 4 ] * y + m[ 8 ] * z + m[ 12 ]) * w
	// 	this.y = (m[ 1 ] * x + m[ 5 ] * y + m[ 9 ] * z + m[ 13 ]) * w
	// 	this.z = (m[ 2 ] * x + m[ 6 ] * y + m[ 10 ] * z + m[ 14 ]) * w
	// 	return this
	// }

	*/
}