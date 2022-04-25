/* --- AUTO-GENERATED - Do not edit directly --- */
import { MyComponent } from '../testDir'

import { Vector2, Vector3 } from '../example'
import { Transform } from '../example2'





export class MyComponentProxy {
	get stride(): u32{ return 64 }

	//primitives
	get health(): f32{ return load<f32>(changetype<usize>(this) + 0) }
	set health(value: f32){ store<f32>(changetype<usize>(this) + 0, value) }
	get ammunition(): f32{ return load<f32>(changetype<usize>(this) + 4) }
	set ammunition(value: f32){ store<f32>(changetype<usize>(this) + 4, value) }
	get awesomeness(): u8{ return load<u8>(changetype<usize>(this) + 8) }
	set awesomeness(value: u8){ store<u8>(changetype<usize>(this) + 8, value) }
	get velocity(): Vector2{ return changetype<Vector2>(changetype<usize>(this) + 16) }
	set velocity(value: Vector2){ memory.copy(changetype<usize>(this) + 16, changetype<usize>(value), 8) }
	get position(): Vector3{ return changetype<Vector3>(changetype<usize>(this) + 32) }
	set position(value: Vector3){ memory.copy(changetype<usize>(this) + 32, changetype<usize>(value), 16) }

	//references
	static parentRefKeeper: Map<u32, Transform> = new Map()
	get parent(): Transform{ return changetype<Transform>(load<usize>(changetype<usize>(this) + 48)) }
	set parent(val: Transform){ store<usize>(changetype<usize>(this) + 48, changetype<usize>(val)) }
	static childrenRefKeeper: Map<u32, Transform[]> = new Map()
	get children(): Transform[]{ return changetype<Transform[]>(load<usize>(changetype<usize>(this) + 52)) }
	set children(val: Transform[]){ store<usize>(changetype<usize>(this) + 52, changetype<usize>(val)) }

	//handle create
	static handleCreate(proxy: MyComponentProxy, eid: u32): void{
		const parent = changetype<Transform>(0)
		MyComponentProxy.parentRefKeeper.set(eid, parent)
		proxy.parent = parent

		const children = instantiate<Transform[]>(0)
		MyComponentProxy.childrenRefKeeper.set(eid, children)
		proxy.children = children

	}

	//handle remove
	static handleRemove(proxy: MyComponentProxy, eid: u32): void{
		MyComponentProxy.parentRefKeeper.delete(eid)
		proxy.parent = changetype<T>(0)

		MyComponentProxy.childrenRefKeeper.delete(eid)
		proxy.children = changetype<T>(0)

	}	

}

