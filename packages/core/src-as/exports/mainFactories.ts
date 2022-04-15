import { Entity, TimeSystem, TransformSystem, World } from '../base'
import { DirectionalLight, Mesh, Rotator, Transform } from '../components'
import { Color } from '../math'
import { CubeGeometry, RenderSystem, StandardMaterial, unlitVertexColorShader } from '../rendering'
import { WebGLRenderSystem } from '../WebGL2'
import { defaultCamera } from './cameraFactories'


export function update(): void{
	World.main.update()
}

export function defaultWorld(): World{
	World.main
		.addSystem<TimeSystem>()
		.addSystem<TransformSystem>()
	// 	.addSystem<InputSystem>()
		.addSystem<WebGLRenderSystem>()
	
	const renderSystem = World.main.get<WebGLRenderSystem>()
	renderSystem.clearColor(new Color(0, 0, 0, 0))

	// renderSystem.clear()
	// World.main.createEntity()
	// 	.attach(new DirectionalLight().setDirection(0, 1, 0))
	World.main.createEntity()
		.attach(new DirectionalLight().setDirection(-1, -1, -1))
	defaultCamera()
	// unlitRotatingCube()
	return World.main
}



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