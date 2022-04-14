import { PolarCoords } from './PolarCoords'
import { Vector3 } from './Vector3'



export class Vector2{
	
	static fromPolar(polar: PolarCoords, target: Vector2 = new Vector2()): Vector2{
		target.x = Mathf.cos(polar.angle) * polar.radius
		target.y = Mathf.sin(polar.angle) * polar.radius
		return target
	}
	get x(): f32{ return this.m[0] } set x(val: f32){ this.m[0] = val }
	get y(): f32{ return this.m[1] } set y(val: f32){ this.m[1] = val }

	m: Float32Array
	constructor(x: f32 = 0, y: f32 = 0){
		this.m = new Float32Array(2)
		this.m[0] = x
		this.m[1] = y
	}
	clone(ref: Vector2 = new Vector2()): Vector2{
		ref.x = this.x; ref.y = this.y; return ref }
	set(x: f32, y: f32): Vector2 { 
		this.x = x; this.y = y; return this }

	lengthSquared(): f32 {	
		return this.x * this.x + this.y * this.y }
	length(): f32{
		return Mathf.sqrt(this.x * this.x + this.y * this.y)
	}
	toPolar (): PolarCoords {
		return new PolarCoords(
			Mathf.atan2(this.y, this.x),
			this.length())
	}
	toVector3(target: Vector3 = new Vector3()): Vector3{
		target.x = this.x
		target.y = this.y
		target.z = 0
		return target
	}
	toVector3XZ(target: Vector3 = new Vector3()): Vector3{
		target.x = this.x
		target.y = 0
		target.z = this.y
		return target
	}
	// @operator('+')
	addRef (b: Vector2, o: Vector2 = new Vector2()): Vector2
	{ o.x = this.x + b.x; o.y = this.y + b.y; return o }
	// @operator('-')
	subRef (b: Vector2, o: Vector2 = new Vector2()): Vector2 
	{ o.x = this.x - b.x; o.y = this.y - b.y; return o }
	// @operator('*')
	multRef (b: Vector2, o: Vector2 = new Vector2()): Vector2 
	{ o.x = this.x * b.x; o.y = this.y * b.y; return o }
	// @operator('/')
	divRef (b: Vector2, o: Vector2 = new Vector2()): Vector2 
	{ o.x = this.x / b.x; o.y = this.y / b.y; return o }
	//TODO make all sets static
	static add (a: Vector2, b: Vector2, ref: Vector2 = new Vector2()): Vector2
	{ ref.x = a.x + b.x; ref.y = a.y + b.y; return ref }
	static sub (a: Vector2, b: Vector2, ref: Vector2 = new Vector2()): Vector2 
	{ ref.x = a.x - b.x; ref.y = a.y - b.y; return ref }
	static mult (a: Vector2, b: Vector2, ref: Vector2 = new Vector2()): Vector2 
	{ ref.x = a.x * b.x; ref.y = a.y * b.y; return ref }
	static div (a: Vector2, b: Vector2, ref: Vector2 = new Vector2()): Vector2 
	{ ref.x = a.x / b.x; ref.y = a.y / b.y; return ref }
	add (b: Vector2): Vector2
	{ this.x += b.x; this.y += b.y; return this }
	sub (b: Vector2): Vector2 
	{ this.x -= b.x; this.y -= b.y; return this }
	mult (b: Vector2): Vector2 
	{ this.x *= b.x; this.y *= b.y; return this }
	div (b: Vector2): Vector2 
	{ this.x /= b.x; this.y /= b.y; return this }
	addValue (b: f32): Vector2
	{ this.x += b;	this.y += b; return this }
	subValue (b: f32): Vector2
	{ this.x -= b;	this.y -= b; return this }
	scale (b: f32): Vector2
	{ this.x *= b;	this.y *= b; return this }
	scaleDiv (b: f32): Vector2
	{ this.x /= b; this.y /= b; return this }
	
}