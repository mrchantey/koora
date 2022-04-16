import { autoBind } from '../utils'
import { KooraExports } from './kooraBindings'


export class GlueBase{

	gl: WebGL2RenderingContext
	wasmExports: KooraExports

	constructor(gl){
		this.gl = gl
		autoBind(this)
	}

	onLoad(wasmExports: KooraExports){
		this.wasmExports = wasmExports
	}

}