import { System, SystemPriority, renderSystemPriority } from '../../base'
import { KeyboardCode } from '../../constants'
import { Vector2 } from '../../math'

export class InputSystem extends System{
	static id: u32 = idof<InputSystem>()

	mousePos: Vector2 = new Vector2()
	mouseDeltaPos: Vector2 = new Vector2()

	mouseWheelDeltaPos: Vector2 = new Vector2()

	mouseDown: bool
	mouseUp: bool
	mouseIsDown: bool

	keysDown: Set<KeyboardCode> = new Set()
	keysIsDown: Set<KeyboardCode> = new Set()
	keysUp: Set<KeyboardCode> = new Set()

	constructor(){
		super(SystemPriority.after(renderSystemPriority))
	}


	handleMouseDown(): void{
		this.mouseIsDown = true
		this.mouseDown = true
	}
	handleMouseUp(): void{
		this.mouseUp = true
		this.mouseIsDown = false
	}

	handleKeyDown(code: KeyboardCode): void{
		this.keysDown.add(code)
		this.keysIsDown.add(code)
	}
	handleKeyUp(code: KeyboardCode): void{
		this.keysDown.delete(code)
		this.keysIsDown.delete(code)
	}

	handleMouseMove(x: f32, y: f32): void{
		this.mouseDeltaPos.set(x - this.mousePos.x, y - this.mousePos.y)
		this.mousePos.set(x, y)
	}
	handleMouseWheel(x: f32, y: f32): void{
		this.mouseWheelDeltaPos.set(x, y)
	}

	update(): void {
		this.mouseDown = false
		this.mouseUp = false
		this.mouseDeltaPos.set(0, 0)
		this.mouseWheelDeltaPos.set(0, 0)
		
		this.keysDown.clear()
		this.keysUp.clear()
	}
	
}
