import { Math2 } from './aliases'
import { Color8 } from './Color8'



export class Color{
	static clear: Color = new Color(0, 0, 0, 0)


	static new(r: f32, g: f32, b: f32, a: f32 = 1): Color{ return new Color(r, g, b, a) }
	static fromColor8(col: Color8): Color{
		return new Color(<f32>col.r / 255, <f32>col.g / 255, <f32>col.b / 255, <f32>col.a / 255)
	}

	static fromHSV(h: f32, s: f32, v: f32, ref: Color = new Color()): Color{
		const i = Mathf.floor(h * 6)
		const f = h * 6 - i
		const p = v * (1 - s)
		const q = v * (1 - f * s)
		const t = v * (1 - (1 - f) * s)
		let r: f32, g: f32, b: f32
		switch (<u32>i % 6) {
		case 0: r = v, g = t, b = p; break
		case 1: r = q, g = v, b = p; break
		case 2: r = p, g = v, b = t; break
		case 3: r = p, g = q, b = v; break
		case 4: r = t, g = p, b = v; break
		case 5: r = v, g = p, b = q; break
		}
		//@ts-ignore
		ref.set(r, g, b)
		return ref
	}

	m: Float32Array

	get r(): f32{ return this.m[0] } set r(val: f32){ this.m[0] = val }
	get g(): f32{ return this.m[1] } set g(val: f32){ this.m[1] = val }
	get b(): f32{ return this.m[2] } set b(val: f32){ this.m[2] = val }
	get a(): f32{ return this.m[3] } set a(val: f32){ this.m[3] = val }
	set(r: f32, g: f32, b: f32, a: f32 = 1): Color { 
		this.r = r; this.g = g; this.b = b; this.a = a; return this }

	constructor(r: f32 = 1, g: f32 = 1, b: f32 = 1, a: f32 = 1){
		this.m = new Float32Array(4)
		this.m[0] = r
		this.m[1] = g
		this.m[2] = b
		this.m[3] = a
	}


	toHSV(): f32[]{
		const r = this.r, g = this.g, b = this.b
		const max = Math2.max3(r, g, b)
		const min = Math2.min3(r, g, b)
		const d = max - min
		let h: f32
		const s = max === <f32>0 ? <f32>0 : d / max
		const v = max
		if (max === min)
			h = 0
		else if (max === r)
			h = ((g - b) + d * (g < b ? 6 : 0)) / (6 * d)
		else if (max === g) 
			h = ((b - r) + d * 2) / (6 * d)
		else if (max === b) 
			h = ((r - g) + d * 4) / (6 * d)
		//@ts-ignore
		return [h, s, v]
	}

}