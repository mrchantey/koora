import { ArrayUtils } from '../utility'



export class Texture{


	width: u16
	height: u16
	pixels: Uint8Array
	get length(): u32{ return this.pixels.length }
	static testTexture: Texture = new Texture(2, 2, ArrayUtils.toTyped_u8([
		0, 0, 0, 255,
		255, 0, 0, 255,
		0, 255, 0, 255,
		255, 255, 0, 255
	]))
	static testTexture2: Texture = new Texture(2, 2, ArrayUtils.toTyped_u8([
		0, 0, 255, 255,
		255, 0, 255, 255,
		0, 255, 255, 255,
		255, 255, 255, 255
	]))
	static new(width: u16, height: u16, pixels: Uint8Array): Texture{
		return new Texture(width, height, pixels)
	}
	constructor(width: u16, height: u16, pixels: Uint8Array = new Uint8Array(width * height)){
		this.width = width
		this.height = height
		this.pixels = pixels
	}
}