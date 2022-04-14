import { applyGLOverloads, autoBind } from '../utils'
import { GlueBase } from './GlueBase'
import { kooraWasm } from './kooraWasm'
import { RenderGlue } from './RenderGlue'



const listen = (gl, val) => {
	const func = gl[val]
	gl[val] = (...args) => {
		console.log(`${val} - `, args)
		func(...args)
	}
}

export class KooraLoader extends GlueBase{

	glues: GlueBase[] = []
	externId: number = 0
	externMap: Map<number, any> = new Map()

	renderGlue: RenderGlue
	constructor(canvas?: HTMLCanvasElement){
		canvas ??= document.getElementById('koora-canvas') as HTMLCanvasElement
		canvas ??= document.body.appendChild(document.createElement('canvas'))
		const gl = canvas.getContext('webgl2')
		super(gl)
		autoBind(gl)
		applyGLOverloads(gl)

		this.renderGlue = new RenderGlue(gl, canvas)
		this.glues.push(this)
		this.glues.push(this.renderGlue)

		//zero means null
		this.externMap.set(this.externId++, null)
	}
	externSet(val: any){
		if (val === null || val === undefined)
			return 0
		const id = this.externId++
		this.externMap.set(id, val)
		return id
	}
	externGet(id: number){
		const val = this.externMap.get(id)
		// console.dir(val)
		return val
	}
	externRemove(id: number){
		return this.externMap.delete(id)
	}

	async load(wasmUrl = '/debug.wasm'): Promise<KooraLoader>{
		const wasmImports = {
			gl: this.gl,
			utils: {
				log: console.log.bind(console),
				elapsed: performance.now.bind(performance),
				now: Date.now.bind(Date),
				set: this.externSet.bind(this),
				get: this.externGet.bind(this),
				remove: this.externRemove.bind(this)
			},
			env: {}
		}
		// console.dir(wasmImports)
		const wasmModule = await WebAssembly.compileStreaming(fetch(wasmUrl))
		const wasmExports = await kooraWasm.instantiate(wasmModule, wasmImports)
		for (const glue of this.glues)
			glue.init(wasmExports)
		
		return this
	}
	start(){
		this.wasmExports.start()
		this.renderGlue.resize()
		this.update = this.update.bind(this)
		requestAnimationFrame(this.update)
	}
	update(){
		this.wasmExports.update()
		requestAnimationFrame(this.update)
	}
	
	runOnce(){
		this.wasmExports.start()
		this.renderGlue.resize()
		this.wasmExports.update()
	}

}

export const initKoora = async(canvas?: HTMLCanvasElement) => {
	//@type {HTMLCanvasElement}

}