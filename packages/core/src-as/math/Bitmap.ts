


export class Bitmap{


	width: u16
	height: u16
	ptr: u16
	get length(): u32{ return this.width * this.height }
	static new(width: u16, height: u16, ptr: u16): Bitmap{
		return new Bitmap(width, height, ptr)
	}
	constructor(width: u16, height: u16, ptr: u16){
		this.width = width
		this.height = height
		this.ptr = ptr
	}
}