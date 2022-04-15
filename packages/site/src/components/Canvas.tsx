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
		//@ts-ignore
		window.initKoora(canvasRef.current, '/wasm/debug.wasm')
			.then(onMount)
	}, [])
	
	return <canvas {...{ className }} ref={canvasRef}/>

}