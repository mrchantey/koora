import { InputSystem, World } from '../base'
import { KeyboardCode } from '../constants'


export function handleMouseDown(): void{
	World.main.get<InputSystem>().handleMouseDown()
}
export function handleMouseUp(): void{
	World.main.get<InputSystem>().handleMouseUp()
}

export function handleMouseWheel(x: f32, y: f32): void{
	World.main.get<InputSystem>().handleMouseWheel(x, y)
}

export function handleMouseMove(x: f32, y: f32): void{
	World.main.get<InputSystem>().handleMouseMove(x, y)
}
export function handleKeyDown(key: KeyboardCode): void{
	World.main.get<InputSystem>().handleKeyDown(key)
}
export function handleKeyUp(key: KeyboardCode): void{
	World.main.get<InputSystem>().handleKeyUp(key)
}
