import { SpatialComponent } from '../base'
import { InputSystem } from '../base/systems'
import { KeyboardCode } from '../constants'

export class MouseKeyboardController extends SpatialComponent{
	inputSystem: InputSystem

	mouseRotationScalar: f32 = 1
	keyRotationScalar: f32 = 0.03
	keyTranslationScalar: f32 = 0.1	
	wheelTranslationScalar: f32 = 0.01
	
	constructor(){
		super()
		this.inputSystem = this.world.getOrAdd<InputSystem>()
	}

	update(): void {
		if (this.inputSystem.mouseIsDown){
			const angles = this.transform.rotation.toEulerAngles()
			//roll = mouseY
			angles.x += this.inputSystem.mouseDeltaPos.y * this.mouseRotationScalar * -1
			//yaw = mouseX
			angles.y += this.inputSystem.mouseDeltaPos.x * this.mouseRotationScalar
			this.transform.rotation.fromEulerAngles(angles)
		}
		// imports.utils.log(`${this.inputSystem.mouseDeltaPos.y}`)
		if (this.inputSystem.mouseWheelDeltaPos.y !== 0)
			this.transform.translateY(this.wheelTranslationScalar * this.inputSystem.mouseWheelDeltaPos.y)


		if (this.inputSystem.keysIsDown.has(KeyboardCode.KeyW) || this.inputSystem.keysIsDown.has(KeyboardCode.ArrowUp))
			this.transform.translateZ(this.keyTranslationScalar)
		if (this.inputSystem.keysIsDown.has(KeyboardCode.KeyS) || this.inputSystem.keysIsDown.has(KeyboardCode.ArrowDown))
			this.transform.translateZ(-this.keyTranslationScalar)
		if (this.inputSystem.keysIsDown.has(KeyboardCode.KeyA) || this.inputSystem.keysIsDown.has(KeyboardCode.ArrowLeft))
			this.transform.translateX(this.keyTranslationScalar)
		if (this.inputSystem.keysIsDown.has(KeyboardCode.KeyD) || this.inputSystem.keysIsDown.has(KeyboardCode.ArrowRight))
			this.transform.translateX(-this.keyTranslationScalar)
		if (this.inputSystem.keysIsDown.has(KeyboardCode.KeyQ))
			this.transform.rotation.rotate(0, this.keyRotationScalar, 0)
		if (this.inputSystem.keysIsDown.has(KeyboardCode.KeyE))
			this.transform.rotation.rotate(0, -this.keyRotationScalar, 0)
	}
}