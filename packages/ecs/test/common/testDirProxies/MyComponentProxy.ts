

import { Vector2, Vector3 } from '../example'




export class MyComponentProxy {
	get stride(): u32{ return 48 }
	get health(): f32{ return load<f32>(changetype<usize>(this) + 0) }
	set health(value: f32){ store<f32>(changetype<usize>(this) + 0, value) }
	get ammunition(): f32{ return load<f32>(changetype<usize>(this) + 4) }
	set ammunition(value: f32){ store<f32>(changetype<usize>(this) + 4, value) }
	get awesomeness(): u8{ return load<u8>(changetype<usize>(this) + 8) }
	set awesomeness(value: u8){ store<u8>(changetype<usize>(this) + 8, value) }
	get velocity(): Vector2{ return changetype<Vector2>(changetype<usize>(this) + 16) }
	set velocity(value: Vector2){ memory.copy(changetype<usize>(this) + 16,changetype<usize>(value), 8) }
	get position(): Vector3{ return changetype<Vector3>(changetype<usize>(this) + 32) }
	set position(value: Vector3){ memory.copy(changetype<usize>(this) + 32,changetype<usize>(value), 16) }

}

	