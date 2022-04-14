import { HelperBase } from './helperBase.js'




export class RenderHelper extends HelperBase{

	resizeObserver

	constructor(gl, canvas){
		super(gl, canvas)
		//TODO debounce resize observer
		this.resizeObserver = new ResizeObserver(this.resize.bind(this))
		this.resizeObserver.observe(this.canvas?.parentElement)
	}
	resize(){
		const width = this.canvas.clientWidth
		const height = this.canvas.clientHeight
		this.canvas.width = width
		this.canvas.height = height
		// gl.viewport(0, 0, width, height)
		this.wasmExports?.handleResize(width, height)
	}

}