import { DebounceResizeObserver } from '../utils'
import { GlueBase } from './GlueBase'

export class RenderGlue extends GlueBase{

	canvas: HTMLCanvasElement
	resizeObserver: DebounceResizeObserver

	constructor(gl: WebGL2RenderingContext, canvas: HTMLCanvasElement){
		super(gl)
		this.canvas = canvas
		this.resizeObserver = new ResizeObserver(this.resize.bind(this))
		this.resizeObserver.observe(this.canvas.parentElement)
	}
	resize(){
		const width = this.canvas.clientWidth
		const height = this.canvas.clientHeight
		this.canvas.width = width
		this.canvas.height = height
		this.wasmExports?.handleResize(width, height)
		this.wasmExports?.update()
	}
}