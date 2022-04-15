import { kooraExports } from './kooraBindings'


export class GlueBase{

	gl: WebGL2RenderingContext
	wasmExports: kooraExports

	constructor(gl){
		this.gl = gl
	}

	onLoad(wasmExports){
		this.wasmExports = wasmExports
	}

}