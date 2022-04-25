
import { Vector2, Vector3 } from '../example'
import { Transform } from '../example2'





export class MyComponent{

	health: f32
	ammunition: f32
	awesomeness: u8
	velocity: Vector2
	position: Vector3
	parent: Transform
	children: Transform[]
}