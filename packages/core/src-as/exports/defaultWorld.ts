import { InputSystem, TimeSystem, TransformSystem, World } from '../base'
import { litShader } from '../rendering'
import { WebGLRenderSystem } from '../WebGL2'
import { createDefaultCamera } from './camera'
import { createDebugGizmos } from './debug'
import { rotatingCube } from './demos'
import { createDefaultLights } from './light'

export function main(): void{}
export function update(): void{
	World.main.update()
}


class DefaultWorldOptions{
	camera: bool
	cameraKeyboardController: bool
	cameraMouseController: bool	
	lights: bool
	gizmos: bool
	helloCube: bool
}

export function defaultWorld(options: DefaultWorldOptions): World{
	World.main
		.addSystem<TimeSystem>()
		.addSystem<TransformSystem>()
		.addSystem<InputSystem>()
		.addSystem<WebGLRenderSystem>()
		
	// renderSystem.clear()
	if (options.lights)
		createDefaultLights()
	if (options.camera)
		createDefaultCamera(options.cameraKeyboardController, options.cameraMouseController)
	if (options.gizmos)
		createDebugGizmos()
	if (options.helloCube)
		rotatingCube(litShader)
	return World.main
}