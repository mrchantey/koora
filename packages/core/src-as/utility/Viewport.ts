import { RenderSystem } from '../rendering'



export class Viewport{

	x: u32
	y: u32
	width: u32
	height: u32

	constructor(x: u32 = 0, y: u32 = 0, width: u32 = RenderSystem.canvasWidth, height: u32 = RenderSystem.canvasHeight){
		this.x = x
		this.y = y
		this.width = width
		this.height = height
	}

}