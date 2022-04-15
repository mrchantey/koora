import { KooraLoader } from './loader/KooraLoader'
// import './style.css'
const a: number = 2

// console.log('hello', a)

async function run(canvas?: HTMLCanvasElement, wasmLocation?: string){
	const loader = new KooraLoader(canvas)
	await loader.load(wasmLocation)
	loader.start()
	return loader
}
//@ts-ignore
window.startKoora = (canvas?: HTMLCanvasElement) => {
	//@ts-ignore
	return run(canvas, '/wasm/debug.wasm')
}