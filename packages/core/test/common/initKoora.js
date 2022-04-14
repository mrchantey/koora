import { RenderHelper } from './renderHelper.js'
import { instantiate } from './wasmHelper.js'

const autoBind = (obj) => {
	for (const field in obj){
		if (typeof obj[field] === 'function')
			obj[field] = obj[field].bind(obj)
	}
}


const glOverloads = [
	['compressedTexImage3D', 2],
	['compressedTexSubImage3D', 2],
	['getActiveUniformBlockParameter', 2],
	['getActiveUniforms', 2],
	['texImage3D', 4],
	['texSubImage3D', 3],
	['bufferData', 7],
	['bufferSubData', 2],
	['compressedTexImage2D', 2],
	['compressedTexSubImage2D', 2],
	['readPixels', 3],
	['texImage2D', 5],
	['texSubImage2D', 5],
	['getBufferParameter', 2],
	['getProgramParameter', 2],
	['getShaderParameter', 2],
]

const applyOverloads = (gl) => {
	glOverloads.forEach(([key, count]) => {
		for (let i = 0; i < count; i++)
			gl[`${key}__${i + 1}`] = gl[key]
	})
}

const listen = (gl, val) => {
	const func = gl[val]
	gl[val] = (...args) => {
		console.log(`${val} - `, args)
		func(...args)
	}
}

export const initKoora = async() => {
	//@type {HTMLCanvasElement}
	const canvas = document.getElementById('koora-canvas')
	const gl = canvas.getContext('webgl2')
	autoBind(gl)
	applyOverloads(gl)
	const renderHelper = new RenderHelper(gl, canvas)

	let externId = 1
	const externMap = new Map()
	externMap.set(0, null)
	// listen(gl, 'bufferData__5')

	const wasmImports = {
		gl,
		utils: {
			log: console.log.bind(console),
			elapsed: performance.now.bind(performance),
			now: Date.now.bind(Date),
			set: val => {
				if (val === null || val === undefined)
					return 0
				const id = externId++
				// console.log('setting...')
				// console.dir(val)
				externMap.set(id, val)
				return id
			},
			get: id => externMap.get(id),
			remove: id => externMap.delete(id)
		},
		env: {
		}
	}
	const wasmModule = await WebAssembly.compileStreaming(fetch('/dist/debug.wasm'))
	const wasmExports = await instantiate(wasmModule, wasmImports)
	renderHelper.init(wasmExports)	
	wasmExports.start()
	renderHelper.resize()

	const cb = () => {
		wasmExports.update()
		requestAnimationFrame(cb)
	}
	requestAnimationFrame(cb)
	return {
		gl,
		wasmExports
	}
}