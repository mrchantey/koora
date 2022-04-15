import React from 'react'
import { KooraLoader } from '../../../core/src/loader/KooraLoader'
interface Props{
	className?: string
	onMount?: (loader: KooraLoader) => any
}

export const Canvas = ({ className, onMount }: Props) => {
	
	onMount ??= ({ wasmExports }) => {
		wasmExports.rotatingCube(null)
	}

	const canvasRef = React.useRef<HTMLCanvasElement>()

	React.useEffect(() => {
		const initOptions = {
			canvas: canvasRef.current,
			wasmUrl: '/wasm/debug.wasm'
		}
		//@ts-ignore
		window.initKoora(initOptions)
			.then(onMount)
	}, [])
	
	return <canvas {...{ className }} ref={canvasRef}/>

}