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
	animFrameId: number
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
			host: {
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
			glue.onLoad(wasmExports)
		
		return this
	}
	start(): kooraWasm.__Internref71{
		const world = this.wasmExports.defaultWorld()
		// console.dir(a.toString())
		this.renderGlue.resize()
		this.update = this.update.bind(this)
		this.update()
		return world
	}
	update(){
		this.wasmExports.update()
		this.animFrameId = requestAnimationFrame(this.update)
	}
	
	runOnce(): KooraLoader{
		this.start()
		cancelAnimationFrame(this.animFrameId)
		return this
	}

}

export const initKoora = async(canvas?: HTMLCanvasElement, wasmLocation?: string) => {	
	const loader = new KooraLoader(canvas)
	await loader.load(wasmLocation)
	loader.start()
	return loader
}
//@ts-ignore
window.initKoora = initKoora


