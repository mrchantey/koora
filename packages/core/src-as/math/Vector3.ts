import { Math2 } from './aliases'
import { Matrix } from './Matrix'
// import { Quaternion } from './Quaternion'



export class Vector3{
	static new(x: f32 = 0, y: f32 = 0, z: f32 = 0): Vector3{ 
		return new Vector3(x, y, z) }
	static _tmp0: Vector3 = new Vector3()
	static _tmpX: Vector3 = new Vector3()
	static _tmpY: Vector3 = new Vector3()
	static _tmpZ: Vector3 = new Vector3()

	static get zero(): Vector3{	return new Vector3(0, 0, 0) }
	static get one(): Vector3{	return new Vector3(1, 1, 1) }
	static get right(): Vector3{ return new Vector3(1, 0, 0) }
	static get up(): Vector3{ return new Vector3(0, 1, 0) }
	static get forward(): Vector3{ return new Vector3(0, 0, 1) }
	static get left(): Vector3{ return new Vector3(-1, 0, 0) }
	static get down(): Vector3{ return new Vector3(0, -1, 0) }
	static get back(): Vector3{ return new Vector3(0, 0, -1) }
	
	static readonly _zero: Vector3 = Vector3.zero
	static readonly _one: Vector3 = Vector3.one
	static readonly _right: Vector3 = Vector3.right
	static readonly _up: Vector3 = Vector3.up
	static readonly _forward: Vector3 = Vector3.forward
	static readonly _left: Vector3 = Vector3.left
	static readonly _down: Vector3 = Vector3.down
	static readonly _back: Vector3 = Vector3.back
	
	static dot(a: Vector3, b: Vector3): f32{
		return a.x * b.x + a.y * b.y + a.z * b.z }
	static lerp (a: Vector3, b: Vector3, t: f32, ref: Vector3 = new Vector3()): Vector3 {
		ref.x = Math2.lerp(a.x, b.x, t)
		ref.y = Math2.lerp(a.y, b.y, t)
		ref.z = Math2.lerp(a.z, b.z, t)
		return ref
	}
	static cross (a: Vector3, b: Vector3, ref: Vector3 = new Vector3()): Vector3{
		const ax = a.x, ay = a.y, az = a.z
		const bx = b.x, by = b.y, bz = b.z
		ref.x = ay * bz - az * by
		ref.y = az * bx - ax * bz
		ref.z = ax * by - ay * bx
		return ref
	}
	static crossNormalized (a: Vector3, b: Vector3, ref: Vector3 = new Vector3()): Vector3{
		const ax = a.x, ay = a.y, az = a.z
		const bx = b.x, by = b.y, bz = b.z
		ref.x = ay * bz - az * by
		ref.y = az * bx - ax * bz
		ref.z = ax * by - ay * bx
		ref.normalize()
		return ref
	}
	static randomInBox(ref: Vector3 = new Vector3()): Vector3 {
		ref.x = Mathf.random()
		ref.y = Mathf.random()
		ref.z = Mathf.random()
		return ref
	}

	static random(ref: Vector3 = new Vector3()): Vector3 {
		const u = (Mathf.random() - 0.5) * 2
		const t = Mathf.random() * Mathf.PI * 2
		const f = Mathf.sqrt(1 - u ** 2)
		ref.x = f * Mathf.cos(t)
		ref.y = f * Mathf.sin(t)
		ref.z = u
		return ref
	}

	static fromArray(m: Float32Array): Vector3{
		const vec = new Vector3()
		vec.m = m
		return vec
	}
	static fromMatrix(mat: Matrix): Vector3{
		const offset = Float32Array.BYTES_PER_ELEMENT * 12
		return Vector3.fromArray(Float32Array.wrap(mat.m.buffer, offset, 3))
	}
	get x(): f32{ return this.m[0] } set x(val: f32){ this.m[0] = val }
	get y(): f32{ return this.m[1] } set y(val: f32){ this.m[1] = val }
	get z(): f32{ return this.m[2] } set z(val: f32){ this.m[2] = val }
	
	m: Float32Array

	constructor(x: f32 = 0, y: f32 = 0, z: f32 = 0){
		this.m = new Float32Array(3)
		this.m[0] = x
		this.m[1] = y
		this.m[2] = z
	}
	toString(): string{
		return `${this.x}, ${this.y}, ${this.z}`
	}
	clone(ref: Vector3 = new Vector3()): Vector3{
		ref.x = this.x; ref.y = this.y; ref.z = this.z; return ref }
	set(x: f32, y: f32, z: f32): Vector3 { 
		this.x = x; this.y = y; this.z = z; return this }

	lengthSquared(): f32 {	
		return this.x * this.x + this.y * this.y + this.z * this.z }
	length(): f32{
		return Mathf.sqrt(this.lengthSquared())
	}
	clampLength (maxLength: f32): Vector3 {
		const sqrmag = this.lengthSquared()
		if (sqrmag > maxLength * maxLength) {
			const mag = Mathf.sqrt(sqrmag)
			const nx = this.x / mag
			const ny = this.y / mag
			const nz = this.z / mag
	
			this.x = nx * maxLength
			this.y = ny * maxLength
			this.z = nz * maxLength
		}
		return this
	}	
	
	round (): Vector3 {
		this.x = Mathf.round(this.x)
		this.y = Mathf.round(this.y)
		this.z = Mathf.round(this.z)
		return this
	}
		
	swapXZ (): Vector3 {
		const temp = this.z
		this.x = this.z
		this.z = temp
		return this
	}
	negate(): Vector3 {
		this.x = - this.x
		this.y = - this.y
		this.z = - this.z
		return this
	}

	abs(): Vector3{
		this.x = Mathf.abs(this.x)
		this.y = Mathf.abs(this.y)
		this.z = Mathf.abs(this.z)
		return this
	}

	normalize (): Vector3 {
		return this.scaleDiv(this.length()) }
	
	normalizeFromLength (len: f32): Vector3 {
		if (len === 0 || len === 1)
			return this
		return this.scale(<f32>1.0 / len)
	}

	roundToNearest (vec: Vector3, interval: f32): Vector3 {
		vec.x = interval * Mathf.round(vec.x / interval)
		vec.y = interval * Mathf.round(vec.y / interval)
		vec.z = interval * Mathf.round(vec.z / interval)
		return vec
	}	
	// @operator('==')
	isEqual (b: Vector3): boolean
	{ return this.x == b.x && this.y == b.y && this.z == b.z }
	// @operator('!=')
	isNotEqual (b: Vector3): boolean
	{ return this.x != b.x || this.y != b.y || this.z != b.z }
	isAlmostEqual (b: Vector3): boolean
	{ return Math2.isAlmostEqual(this.x, b.x)
		&& Math2.isAlmostEqual(this.y, b.y)
		&& Math2.isAlmostEqual(this.z, b.z) }

	// @operator('+')
	static add (a: Vector3, b: Vector3, o: Vector3 = new Vector3()): Vector3
	{ o.x = a.x + b.x; o.y = a.y + b.y; o.z = a.z + b.z; return o }
	// @operator('-')
	static sub (a: Vector3, b: Vector3, o: Vector3 = new Vector3()): Vector3 
	{ o.x = a.x - b.x; o.y = a.y - b.y; o.z = a.z - b.z; return o }
	// @operator('*')
	static mult (a: Vector3, b: Vector3, o: Vector3 = new Vector3()): Vector3 
	{ o.x = a.x * b.x; o.y = a.y * b.y; o.z = a.z * b.z; return o }
	// @operator('/')
	static div (a: Vector3, b: Vector3, o: Vector3 = new Vector3()): Vector3 
	{ o.x = a.x / b.x; o.y = a.y / b.y; o.z = a.z / b.z; return o }
	//TODO make all sets static
	// addSet (a: Vector3, b: Vector3): Vector3
	// { this.x = a.x + b.x; this.y = a.y + b.y; this.z = a.z + b.z; return this }
	// subSet (a: Vector3, b: Vector3): Vector3 
	// { this.x = a.x - b.x; this.y = a.y - b.y; this.z = a.z - b.z; return this }
	// multSet (a: Vector3, b: Vector3): Vector3 
	// { this.x = a.x * b.x; this.y = a.y * b.y; this.z = a.z * b.z; return this }
	// divSet (a: Vector3, b: Vector3): Vector3 
	// { this.x = a.x / b.x; this.y = a.y / b.y; this.z = a.z / b.z; return this }
	add (b: Vector3): Vector3
	{ this.x += b.x; this.y += b.y; this.z += b.z; return this }
	sub (b: Vector3): Vector3 
	{ this.x -= b.x; this.y -= b.y; this.z -= b.z; return this }
	mult (b: Vector3): Vector3 
	{ this.x *= b.x; this.y *= b.y; this.z *= b.z; return this }
	div (b: Vector3): Vector3 
	{ this.x /= b.x; this.y /= b.y; this.z /= b.z; return this }
	addValue (b: f32): Vector3
	{ this.x += b;	this.y += b; this.z += b; return this }
	subValue (b: f32): Vector3
	{ this.x -= b;	this.y -= b; this.z -= b; return this }
	scale (b: f32): Vector3
	{ this.x *= b;	this.y *= b; this.z *= b; return this }
	scaleDiv (b: f32): Vector3
	{ this.x /= b; this.y /= b; this.z /= b; return this }
	// { this.x /= b || 1; this.y /= b || 1; this.z /= b || 1; return this }
}
