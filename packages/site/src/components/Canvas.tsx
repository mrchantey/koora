import React from 'react'

interface Props{
	className?: string
}

export const Canvas = ({ className }: Props) => {
	
	const canvasRef = React.useRef<HTMLCanvasElement>()

	React.useEffect(() => {
		//@ts-ignore
		window.startKoora(canvasRef.current)
	}, [])
	
	return <canvas {...{ className }} ref={canvasRef}/>

}