import { initKoora } from './KooraLoader'



export const tryTestRun = async() => {
	const params = new URLSearchParams(window.location.search)
	if (!params.has('ktest'))
		return
	
	const cameraKeyboardController = !(params.get('board') === 'false')
	const cameraMouseController = !(params.get('mouse') === 'false')

	//@ts-ignore
	await import('./testRunStyle.css')
	const { wasmExports } = await initKoora({
		defaultWorld: {
			cameraKeyboardController,
			cameraMouseController,
		}
	})
	const a = wasmExports.rotatingCube(wasmExports.litShader.value)
}

tryTestRun()