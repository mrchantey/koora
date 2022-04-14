import { Math2 } from './aliases'
import { Color } from './Color'




export class Color8{

	static get red (): Color8{ return new Color8(255, 0, 0) }
	static get green (): Color8{ return new Color8(0, 255, 0) }
	static get blue (): Color8{ return new Color8(0, 0, 255) }
	
	static get yellow (): Color8{ return new Color8(255, 255, 0) }
	static get magenta (): Color8{ return new Color8(255, 0, 255) }
	static get cyan (): Color8{ return new Color8(0, 255, 255) }
	
	static get black (): Color8{ return new Color8(0, 0, 0) }
	static get white (): Color8{ return new Color8(255, 255, 255) }
	static get gray (): Color8{ return new Color8(127, 127, 127) }
	
	static get purple(): Color8 { return new Color8(127, 0, 127) }
	
	static readonly _red: Color8 = Color8.red
	static readonly _green: Color8 = Color8.green
	static readonly _blue: Color8 = Color8.blue
	
	static readonly _yellow: Color8 = Color8.yellow
	static readonly _magenta: Color8 = Color8.magenta
	static readonly _cyan: Color8 = Color8.cyan
	
	static readonly _black: Color8 = Color8.black
	static readonly _white: Color8 = Color8.white
	static readonly _gray: Color8 = Color8.gray

	static fromNormal(r: f32 = 1, g: f32 = 1, b: f32 = 1, a: f32 = 1): Color8{
		return new Color8(<u8>(r * 255), <u8>(g * 255), <u8>(b * 255), <u8>(a * 255))
	}
	
	static fromArray(m: Uint8Array): Color8{
		const col = new Color8()
		col.m = m
		return col
	}
	static random(): Color8{
		return Color8.fromNormal(Mathf.random(), Mathf.random(), Mathf.random())
	}
	static lerp(a: Color8, b: Color8, t: f32): Color8{
		return new Color8(
			<u8>Math2.lerp(<f32>a.r, <f32>b.r, t),
			<u8>Math2.lerp(<f32>a.g, <f32>b.g, t),
			<u8>Math2.lerp(<f32>a.b, <f32>b.b, t),
			<u8>Math2.lerp(<f32>a.a, <f32>b.a, t))
	}

	
	m: Uint8Array

	get r(): u8{ return this.m[0] } set r(val: u8){ this.m[0] = val }
	get g(): u8{ return this.m[1] } set g(val: u8){ this.m[1] = val }
	get b(): u8{ return this.m[2] } set b(val: u8){ this.m[2] = val }
	get a(): u8{ return this.m[3] } set a(val: u8){ this.m[3] = val }

	constructor(r: u8 = 255, g: u8 = 255, b: u8 = 255, a: u8 = 255){
		this.m = new Uint8Array(4)
		this.m[0] = r
		this.m[1] = g
		this.m[2] = b
		this.m[3] = a
	}

	toNormalColor(): Color{
		return new Color(<f32> this.r / 255, <f32> this.g / 255, <f32> this.b / 255, <f32> this.a / 255)
	}

	// @operator('==')
	isEqual (b: Color8): boolean
	{ return this.r == b.r && this.g == b.g && this.b == b.b && this.a == b.a }
	// @operator('!=')
	isNotEqual (b: Color8): boolean
	{ return this.r != b.r || this.g != b.g || this.b != b.b || this.a != b.a }
	isAlmostEqual (b: Color8): boolean
	{ return Math2.isAlmostEqual(this.r, b.r)
			&& Math2.isAlmostEqual(this.g, b.g)
			&& Math2.isAlmostEqual(this.b, b.b) 
			&& Math2.isAlmostEqual(this.a, b.a) 		
	}
	
}