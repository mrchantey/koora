import { applyGLOverloads, autoBind } from '../utils'
import { GlueBase } from './GlueBase'
import { InputGlue } from './InputGlue'
import { DefaultWorldOptions, KooraBindings, kooraBindings } from './kooraBindings'
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
		this.glues.push(new InputGlue(gl, canvas))

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

	async load(wasmUrl?: string, bindings?: KooraBindings): Promise<KooraLoader>{
		wasmUrl ??= '/debug.wasm'
		bindings ??= kooraBindings
		const wasmImports = {
			gl: this.gl,
			host: {
				log: console.log.bind(console),
				log_f64: console.log.bind(console),
				elapsed: performance.now.bind(performance),
				now: Date.now.bind(Date),
				set: this.externSet,
				get: this.externGet,
				remove: this.externRemove
			},
			env: {
				console: {
					log: console.log.bind(console)
				}
			}
		}
		// console.dir(wasmImports)
		const wasmModule = await WebAssembly.compileStreaming(fetch(wasmUrl))
		const wasmExports = await bindings.instantiate(wasmModule, wasmImports)
		for (const glue of this.glues)
			glue.onLoad(wasmExports)
		
		return this
	}
	start(options: false | Partial<DefaultWorldOptions> = {}): KooraLoader{		
		if (options !== false)
			this.wasmExports.defaultWorld({
				lights: true,
				camera: true,
				gizmos: true,
				cameraKeyboardController: false,
				cameraMouseController: false,
				helloCube: false,
				...options
			})
		this.renderGlue.resize()
		this.update()
		return this
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

export interface InitKooraOptions{
	canvas?: HTMLCanvasElement
	wasmUrl?: string
	bindings?: KooraBindings
	defaultWorld?: false | Partial<DefaultWorldOptions>
}

export const initKoora = async({ canvas, wasmUrl, bindings, defaultWorld }: InitKooraOptions = {}) => {	
	const loader = new KooraLoader(canvas)
	await loader.load(wasmUrl, bindings)
	loader.start(defaultWorld)
	return loader
}
//@ts-ignore
window.initKoora = initKoora
export interface KooraWindow extends Window{
	initKoora: typeof initKoora
}