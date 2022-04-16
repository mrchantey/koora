import React from 'react'
import { KooraLoader, InitKooraOptions, KooraWindow } from '../../../core/src/entry'
interface Props{
	className?: string
	options?: InitKooraOptions
	onMount?: (loader: KooraLoader) => any
}

export const Canvas = ({ className, options, onMount }: Props) => {
	
	onMount ??= ({ wasmExports }) => {
		wasmExports.rotatingCube(null)
	}

	const canvasRef = React.useRef<HTMLCanvasElement>()

	React.useEffect(() => {
		(window as any as KooraWindow).initKoora({
			canvas: canvasRef.current,
			wasmUrl: '/wasm/debug.wasm',
			...options,
		})
			.then(onMount)
	}, [])
	
	return <canvas {...{ className }} ref={canvasRef}/>

}