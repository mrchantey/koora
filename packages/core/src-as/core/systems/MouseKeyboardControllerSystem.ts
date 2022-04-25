import { ListenerSystem, Entity } from '../../base'
import { KeyboardCode } from '../../constants'
import { MouseKeyboardController, Transform } from '../components'
import { InputSystem } from './InputSystem'




export class MouseKeyboardControllerSystem extends ListenerSystem{

	constructor(){
		super([idof<MouseKeyboardController>()])
	}
	
	onUpdate(entity: Entity): void {
		const inputSystem = this.world.getOrAdd<InputSystem>()
		const controller = entity.get<MouseKeyboardController>()
		const transform = entity.get<Transform>()
		if (inputSystem.mouseIsDown){
			const angles = transform.rotation.toEulerAngles()
			//roll = mouseY
			angles.x += inputSystem.mouseDeltaPos.y * controller.mouseRotationScalar * -1
			//yaw = mouseX
			angles.y += inputSystem.mouseDeltaPos.x * controller.mouseRotationScalar
			transform.rotation.fromEulerAngles(angles)
		}
		// imports.utils.log(`${inputSystem.mouseDeltaPos.y}`)
		if (inputSystem.mouseWheelDeltaPos.y !== 0)
			transform.translateY(controller.wheelTranslationScalar * inputSystem.mouseWheelDeltaPos.y)
	
	
		if (inputSystem.keysIsDown.has(KeyboardCode.KeyW) || inputSystem.keysIsDown.has(KeyboardCode.ArrowUp))
			transform.translateZ(controller.keyTranslationScalar)
		if (inputSystem.keysIsDown.has(KeyboardCode.KeyS) || inputSystem.keysIsDown.has(KeyboardCode.ArrowDown))
			transform.translateZ(-controller.keyTranslationScalar)
		if (inputSystem.keysIsDown.has(KeyboardCode.KeyA) || inputSystem.keysIsDown.has(KeyboardCode.ArrowLeft))
			transform.translateX(controller.keyTranslationScalar)
		if (inputSystem.keysIsDown.has(KeyboardCode.KeyD) || inputSystem.keysIsDown.has(KeyboardCode.ArrowRight))
			transform.translateX(-controller.keyTranslationScalar)
		if (inputSystem.keysIsDown.has(KeyboardCode.KeyQ))
			transform.rotation.rotate(0, controller.keyRotationScalar, 0)
		if (inputSystem.keysIsDown.has(KeyboardCode.KeyE))
			transform.rotation.rotate(0, -controller.keyRotationScalar, 0)
	}
	
}