import { keyboardCodeMap } from '../constants'
import { __AdaptedExports } from '../_wasm/debug'
import { GlueBase } from './GlueBase'
import { KooraExports } from './kooraBindings'


export class InputGlue extends GlueBase{


	canvas: HTMLCanvasElement

	constructor(gl: WebGL2RenderingContext, canvas: HTMLCanvasElement){
		super(gl)
		this.canvas = canvas
	}
	
	onLoad(wasmExports: KooraExports): void {
		super.onLoad(wasmExports)
		window.addEventListener('mousedown', this.handleMouseDown)
		window.addEventListener('mouseup', this.handleMouseUp)
		window.addEventListener('mousemove', this.handleMouseMove)
		window.addEventListener('keydown', this.handleKeyDown)
		window.addEventListener('keyup', this.handleKeyUp)
		window.addEventListener('wheel', this.handleWheel)
	}
	
	handleWheel(e: WheelEvent){
		this.wasmExports.handleMouseWheel(e.deltaX, e.deltaY)
	}
	handleMouseDown(e: MouseEvent){
		this.wasmExports.handleMouseDown()
	}
	handleMouseUp(e: MouseEvent){
		this.wasmExports.handleMouseUp()
	}
	
	handleKeyDown(e: KeyboardEvent){
		this.wasmExports.handleKeyDown(keyboardCodeMap[e.code])		
	}
	handleKeyUp(e: KeyboardEvent){
		this.wasmExports.handleKeyUp(keyboardCodeMap[e.code])
	}
	
	handleMouseMove(e: MouseEvent){
		const rect = this.canvas.getBoundingClientRect()
		let x = (e.clientX - rect.left) / rect.width
		let y = (e.clientY - rect.top) / rect.height
		x = x * 2 - 1
		y = y * 2 - 1
		this.wasmExports.handleMouseMove(x, y)
	}
	
	dispose(){
		window.removeEventListener('mousedown', this.handleMouseDown)
		window.removeEventListener('mouseup', this.handleMouseUp)
		window.removeEventListener('mousemove', this.handleMouseMove)
		window.removeEventListener('keydown', this.handleKeyDown)
		window.removeEventListener('keyup', this.handleKeyUp)
		window.removeEventListener('wheel', this.handleWheel)
	}
}