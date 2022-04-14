





export class HelperBase{

	gl	
	canvas
	wasmExports

	constructor(gl, canvas){
		this.gl = gl
		this.canvas = canvas
	}

	init(wasmExports){
		this.wasmExports = wasmExports
	}

}