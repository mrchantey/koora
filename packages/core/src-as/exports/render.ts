import { World } from '../base'
import { RenderSystem } from '../core'
import { WebGLRenderSystem } from '../WebGL2'





export function handleResize(width: u32, height: u32): void{
	RenderSystem.canvasWidth = width
	RenderSystem.canvasHeight = height
	const aspect = <f32>width / <f32>height
	//TODO get parent class can return child, ie get<RenderSystem>
	const renderSystem = World.main.get<WebGLRenderSystem>()
	const cameras = renderSystem.cameraQuery.components
	for (let i = 0; i < cameras.length; i++){
		if (cameras[i].fillCanvas){
			cameras[i].setViewport(0, 0, width, height, aspect)
		}
	}
}
