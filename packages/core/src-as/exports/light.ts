import { World } from '../base'
import { DirectionalLight } from '../components'

export function createDefaultLights(): void{
	// World.main.createEntity()
	// 	.attach(new DirectionalLight().setDirection(0, 1, 0))
	World.main.createEntity()
		.attach(new DirectionalLight().setDirection(-1, -1, -1))
}
