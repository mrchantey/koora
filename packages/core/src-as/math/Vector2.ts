import { PolarCoords } from './PolarCoords'
import { Vector3 } from './Vector3'

export class Vector2 {
	static fromPolar(polar: PolarCoords, target: Vector2 = new Vector2()): Vector2 {
		const angle = polar.angle
		const radius = polar.radius
		target.x = Mathf.cos(angle) * radius
		target.y = Mathf.sin(angle) * radius
		return target
	}

	constructor(
		public x: f32 = 0,
		public y: f32 = 0
	) {}
	// @ts-ignore: decorator
	@inline
	clone(ref: Vector2 = new Vector2()): Vector2 {
		ref.x = this.x
		ref.y = this.y
		return ref
	}
	// @ts-ignore: decorator
	@inline
	set(x: f32, y: f32): this {
		this.x = x
		this.y = y
		return this
	}
	// @ts-ignore: decorator
	@inline
	lengthSquared(): f32 {
		const x = this.x
		const y = this.y
		return x * x + y * y
	}
	// @ts-ignore: decorator
	@inline
	length(): f32 {
		return Mathf.sqrt(this.lengthSquared())
	}
	// @ts-ignore: decorator
	@inline
	toPolar(): PolarCoords {
		return new PolarCoords(
			Mathf.atan2(this.y, this.x),
			this.length()
		)
	}
	// @ts-ignore: decorator
	@inline
	toVector3(target: Vector3 = new Vector3()): Vector3 {
		target.x = this.x
		target.y = this.y
		target.z = 0
		return target
	}
	// @ts-ignore: decorator
	@inline
	toVector3XZ(target: Vector3 = new Vector3()): Vector3{
		target.x = this.x
		target.y = 0
		target.z = this.y
		return target
	}
	// @ts-ignore: decorator
	@inline @operator('+')
	addRef(b: Vector2, o: Vector2 = new Vector2()): Vector2 {
		o.x = this.x + b.x
		o.y = this.y + b.y
		return o
	}
	// @ts-ignore: decorator
	@inline @operator('-')
	subRef(b: Vector2, o: Vector2 = new Vector2()): Vector2 {
		o.x = this.x - b.x
		o.y = this.y - b.y
		return o
	}
	// @ts-ignore: decorator
	@inline @operator('*')
	multRef(b: Vector2, o: Vector2 = new Vector2()): Vector2 {
		o.x = this.x * b.x
		o.y = this.y * b.y
		return o
	}
	// @ts-ignore: decorator
	@inline @operator('/')
	divRef(b: Vector2, o: Vector2 = new Vector2()): Vector2 {
		o.x = this.x / b.x
		o.y = this.y / b.y
		return o
	}
	//TODO make all sets static
	// @ts-ignore: decorator
	@inline
	static add(a: Vector2, b: Vector2, ref: Vector2 = new Vector2()): Vector2 {
		ref.x = a.x + b.x
		ref.y = a.y + b.y
		return ref
	}
	// @ts-ignore: decorator
	@inline
	static sub(a: Vector2, b: Vector2, ref: Vector2 = new Vector2()): Vector2 {
		ref.x = a.x - b.x
		ref.y = a.y - b.y
		return ref
	}
	// @ts-ignore: decorator
	@inline
	static mult(a: Vector2, b: Vector2, ref: Vector2 = new Vector2()): Vector2 {
		ref.x = a.x * b.x
		ref.y = a.y * b.y
		return ref
	}
	// @ts-ignore: decorator
	@inline
	static div(a: Vector2, b: Vector2, ref: Vector2 = new Vector2()): Vector2 {
		ref.x = a.x / b.x
		ref.y = a.y / b.y
		return ref
	}
	// @ts-ignore: decorator
	@inline
	add(b: Vector2): this { this.x += b.x; this.y += b.y; return this }
	// @ts-ignore: decorator
	@inline
	sub(b: Vector2): this { this.x -= b.x; this.y -= b.y; return this }
	// @ts-ignore: decorator
	@inline
	mult(b: Vector2): this { this.x *= b.x; this.y *= b.y; return this }
	// @ts-ignore: decorator
	@inline
	div(b: Vector2): this { this.x /= b.x; this.y /= b.y; return this }
	// @ts-ignore: decorator
	@inline
	addValue(b: f32): this { this.x += b;	this.y += b; return this }
	// @ts-ignore: decorator
	@inline
	subValue(b: f32): this { this.x -= b;	this.y -= b; return this }
	// @ts-ignore: decorator
	@inline
	scale(b: f32): this { this.x *= b;	this.y *= b; return this }
	// @ts-ignore: decorator
	@inline
	scaleDiv(b: f32): this { this.x /= b; this.y /= b; return this }
}
