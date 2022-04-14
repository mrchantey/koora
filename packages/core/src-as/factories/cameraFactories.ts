import { Entity, World, TransformSystem } from '../base'
import { MouseKeyboardController, Transform, Camera } from '../components'
import { Vector3, TAU } from '../math'
import { RenderSystem } from '../rendering'

export function defaultCamera(): Entity{
		
	const parent = World.main.createEntity()
		// .add<MouseKeyboardController>()
		.getOrAdd<Transform>()
		
	const backAngle = new Vector3(0, TAU * .5, 0)
	// parent.rotation.lookAt(Vector3._back)
	parent.rotation.fromEulerAngles(backAngle)
	parent.position.z = 3
	parent.position.y = 1
		
	// const 
	const cameraEntity =  World.main.createEntity()
		.attach(new Transform(parent))
		.add<Camera>()
	
	const child = cameraEntity.get<Transform>()
	child.rotation.fromEulerAngles(backAngle)
	// parent.rotation.lookAt(Vector3._back)

	return cameraEntity
}

export function removeAllCameras(): void{
	const renderSystem = World.main.get<RenderSystem>()
	const root = World.main.get<TransformSystem>().root
	const cameras = renderSystem.cameraQuery.components
	for (let i = 0; i < cameras.length; i++){
		const camera = cameras[i]
		const parent = camera.transform.parent
		if (parent != null && parent != root)
			parent.entity.dispose()
		camera.entity.dispose()
	}
}