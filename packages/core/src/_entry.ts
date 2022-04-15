import { initKoora } from './loader/KooraLoader'
import './style.css'


initKoora().then(({ wasmExports }) => {
	const a = wasmExports.rotatingCube(wasmExports.litShader.value)
	// console.dir(a)
})