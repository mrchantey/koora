import { mat4, quat } from '../glMatrix'
import { EPSILON } from './constants'
import { Matrix } from './Matrix'
import { Vector3 } from './Vector3'


export class Quaternion{
	
	
	static tmp0: Quaternion = new Quaternion()
	static new(x: f32 = 0, y: f32 = 0, z: f32 = 0, w: f32 = 1): Quaternion{ 
		return new Quaternion(x, y, z, w) }
	static dot(a: Quaternion, b: Quaternion): f32{
		return quat.dot(a.m, b.m)
	}
	static get identity(): Quaternion{ 
		return new Quaternion() }
	static look(direction: Vector3, up: Vector3 = Vector3._up, ref: Quaternion = new Quaternion()): Quaternion{ 
		return ref.lookAt(direction, up) }
	// static right(ref: Quaternion = new Quaternion()): Quaternion{ 
	// 	return ref.lookRotation(Vector3.right) }
	// static up(ref: Quaternion = new Quaternion()): Quaternion{ 
	// 	return ref.lookRotation(Vector3.up) }

	static fromArray(m: Float32Array): Quaternion{
		const quat = new Quaternion()
		quat.m = m
		return quat
	}

						
	m: Float32Array
	get x(): f32{ return this.m[0] } set x(val: f32){ this.m[0] = val }
	get y(): f32{ return this.m[1] } set y(val: f32){ this.m[1] = val }
	get z(): f32{ return this.m[2] } set z(val: f32){ this.m[2] = val }
	get w(): f32{ return this.m[3] } set w(val: f32){ this.m[3] = val }
	constructor(x: f32 = 0, y: f32 = 0, z: f32 = 0, w: f32 = 1){ 
		this.m = new Float32Array(4)
		this.x = x; this.y = y; this.z = z; this.w = w
	}
	set(x: f32, y: f32, z: f32, w: f32): Quaternion{ 
		this.x = x; this.y = y; this.z = z; this.w = w; return this }

	forward(): Vector3 { 
		return this.multiplyDirection(Vector3._forward) }
	up(): Vector3 { 
		return this.multiplyDirection(Vector3._up) }
	right(): Vector3 { 
		return this.multiplyDirection(Vector3._right) }
	
	multiplyDirection(direction: Vector3, ref: Vector3 = new Vector3()): Vector3 {
		const x = this.x * 2
		const y = this.y * 2
		const z = this.z * 2
		const xx = this.x * x
		const yy = this.y * y
		const zz = this.z * z
		const xy = this.x * y
		const xz = this.x * z
		const yz = this.y * z
		const wx = this.w * x
		const wy = this.w * y
		const wz = this.w * z
		
		ref.x = (1 - (yy + zz)) * direction.x + (xy - wz) * direction.y + (xz + wy) * direction.z
		ref.y = (xy + wz) * direction.x + (1 - (xx + zz)) * direction.y + (yz - wx) * direction.z
		ref.z = (xz - wy) * direction.x + (yz + wx) * direction.y + (1 - (xx + yy)) * direction.z
		return ref
	}
	rotate(x: f32 = 0, y: f32 = 0, z: f32 = 0): Quaternion{
		const euler = this.toEulerAngles()
		euler.x += x
		euler.y += y
		euler.z += z
		this.fromEulerAngles(euler)
		return this
	}

	
	// applyQuaternion(q: Quaternion): Vector3 {
	// 	const x = this.x, y = this.y, z = this.z
	// 	const qx = q.x, qy = q.y, qz = q.z, qw = q.w
	// 	const ix = qw * x + qy * z - qz * y
	// 	const iy = qw * y + qz * x - qx * z
	// 	const iz = qw * z + qx * y - qy * x
	// 	const iw = - qx * x - qy * y - qz * z
	// 	this.x = ix * qw + iw * - qx + iy * - qz - iz * - qy
	// 	this.y = iy * qw + iw * - qy + iz * - qx - ix * - qz
	// 	this.z = iz * qw + iw * - qz + ix * - qy - iy * - qx
	// 	return this
	// }
	// lookAt(pos: Vector3, target: Vector3, up: Vector3 = Vector3.up): Quaternion{
	// 	Matrix._tmp0.setPosition(pos)
	// 	const matrix = Matrix._tmp0.lookAt(target, up)
	// 	// matrix.invert()
	// 	return this.fromRotationMatrix(matrix)
	// }
	lookAt(target: Vector3, up: Vector3 = Vector3._up): Quaternion{
		mat4.fromTranslation(Matrix._tmp0.m, Vector3._zero.m)
		Matrix._tmp0.lookAt(target, up)
		mat4.getRotation(this.m, Matrix._tmp0.m)
		return this
	}
	angleAxis(theta: f32, axis: Vector3 = Vector3.forward): Quaternion{
		const s = Mathf.sin(theta / 2)
		this.x = axis.x * s,
		this.y = axis.y * s,
		this.z = axis.z * s,
		this.w = Mathf.cos(theta / 2)
		return this
	}
	
	fromRotationMatrix(matrix: Matrix): Quaternion{
		const m = matrix.m
		const m11 = m[0], m12 = m[4], m13 = m[8]
		const m21 = m[1], m22 = m[5], m23 = m[9]
		const m31 = m[2], m32 = m[6], m33 = m[10]
		const trace = m11 + m22 + m33
		let s: f32
		if (trace > 0) {
			s = 0.5 / Mathf.sqrt(trace + 1.0)
			this.w = 0.25 / s
			this.x = (m32 - m23) * s
			this.y = (m13 - m31) * s
			this.z = (m21 - m12) * s
		} else if (m11 > m22 && m11 > m33) {	
			s = 2.0 * Mathf.sqrt(1.0 + m11 - m22 - m33)
			this.w = (m32 - m23) / s
			this.x = 0.25 * s
			this.y = (m12 + m21) / s
			this.z = (m13 + m31) / s
		} else if (m22 > m33) {
			s = 2.0 * Mathf.sqrt(1.0 + m22 - m11 - m33)
			this.w = (m13 - m31) / s
			this.x = (m12 + m21) / s
			this.y = 0.25 * s
			this.z = (m23 + m32) / s
		} else {
			s = 2.0 * Mathf.sqrt(1.0 + m33 - m11 - m22)
			this.w = (m21 - m12) / s
			this.x = (m13 + m31) / s
			this.y = (m23 + m32) / s
			this.z = 0.25 * s
		}
		return this
	}

	//z-y-x order, Tait-Bryan
	fromEulerAngles(angles: Vector3): Quaternion{
		const yaw = angles.y
		const pitch = angles.x
		const roll = angles.z

		const halfRoll = roll * 0.5
		const halfPitch = pitch * 0.5
		const halfYaw = yaw * 0.5
	
		const sinRoll = Mathf.sin(halfRoll)
		const cosRoll = Mathf.cos(halfRoll)
		const sinPitch = Mathf.sin(halfPitch)
		const cosPitch = Mathf.cos(halfPitch)
		const sinYaw = Mathf.sin(halfYaw)
		const cosYaw = Mathf.cos(halfYaw)
	
		this.x = (cosYaw * sinPitch * cosRoll) + (sinYaw * cosPitch * sinRoll)
		this.y = (sinYaw * cosPitch * cosRoll) - (cosYaw * sinPitch * sinRoll)
		this.z = (cosYaw * cosPitch * sinRoll) - (sinYaw * sinPitch * cosRoll)
		this.w = (cosYaw * cosPitch * cosRoll) + (sinYaw * sinPitch * sinRoll)
		return this
	}

	toEulerAngles(result: Vector3 = new Vector3()): Vector3 {
		const qx = this.x
		const qy = this.y
		const qz = this.z
		const qw = this.w

		const sqx = qx * qx
		const sqy = qy * qy
		const sqz = qz * qz
		const sqw = qw * qw

		const zAxisY = qy * qz - qx * qw
		const limit = <f32>.4999999

		if (zAxisY < -limit) {
			result.y = <f32>2 * Mathf.atan2(qy, qw)
			result.x = Mathf.PI / 2
			result.z = 0
		} else if (zAxisY > limit) {
			result.y = 2 * Mathf.atan2(qy, qw)
			result.x = -Mathf.PI / 2
			result.z = 0
		} else {
			result.z = Mathf.atan2(2.0 * (qx * qy + qz * qw), (-sqz - sqx + sqy + sqw))
			result.x = Mathf.asin(-2.0 * (qz * qy - qx * qw))
			result.y = Mathf.atan2(2.0 * (qz * qx + qy * qw), (sqz - sqx - sqy + sqw))
		}
		return result
	}


	// @operator('==')
	isEqual (b: Quaternion): boolean
	{ return this.x == b.x && this.y == b.y && this.z == b.z && this.w == b.w }
	// @operator('!=')
	isNotEqual (b: Quaternion): boolean
	{ return this.x != b.x || this.y != b.y || this.z != b.z || this.w !== b.w }
	// isAlmostEqual (b: Quaternion): boolean
	// { return Math2.isAlmostEqual(this.x, b.x)
	// 	&& Math2.isAlmostEqual(this.y, b.y)
	// 	&& Math2.isAlmostEqual(this.z, b.z) 
	// 	&& Math2.isAlmostEqual(this.w, b.w) 
	// }
	isAlmostEqual (b: Quaternion): boolean
	{
		return 1 - Mathf.abs(Quaternion.dot(this, b)) < EPSILON
	}

}