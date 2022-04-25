/* --- AUTO-GENERATED - Do not edit directly --- */
import { CTransform } from '../components'
import { Transform } from '../../core'
import { Matrix, Vector3, Quaternion } from '../../math'

export class CTransformProxy {
	get stride(): u32{ return 256 }

	//primitives
	get matrix(): Matrix{ return changetype<Matrix>(changetype<usize>(this) + 0) }
	set matrix(value: Matrix){ memory.copy(changetype<usize>(this) + 0, changetype<usize>(value), 64) }
	get worldMatrix(): Matrix{ return changetype<Matrix>(changetype<usize>(this) + 64) }
	set worldMatrix(value: Matrix){ memory.copy(changetype<usize>(this) + 64, changetype<usize>(value), 64) }
	get inverseWorldMatrix(): Matrix{ return changetype<Matrix>(changetype<usize>(this) + 128) }
	set inverseWorldMatrix(value: Matrix){ memory.copy(changetype<usize>(this) + 128, changetype<usize>(value), 64) }
	get position(): Vector3{ return changetype<Vector3>(changetype<usize>(this) + 192) }
	set position(value: Vector3){ memory.copy(changetype<usize>(this) + 192, changetype<usize>(value), 16) }
	get scale(): Vector3{ return changetype<Vector3>(changetype<usize>(this) + 208) }
	set scale(value: Vector3){ memory.copy(changetype<usize>(this) + 208, changetype<usize>(value), 16) }
	get rotation(): Quaternion{ return changetype<Quaternion>(changetype<usize>(this) + 224) }
	set rotation(value: Quaternion){ memory.copy(changetype<usize>(this) + 224, changetype<usize>(value), 16) }
	get matrixAutoUpdate(): bool{ return load<bool>(changetype<usize>(this) + 240) }
	set matrixAutoUpdate(value: bool){ store<bool>(changetype<usize>(this) + 240, value) }

	//references
	static childrenRefKeeper: Map<u32, Set<Transform>> = new Map()
	get children(): Set<Transform>{ return changetype<Set<Transform>>(load<usize>(changetype<usize>(this) + 244)) }
	set children(val: Set<Transform>){ store<usize>(changetype<usize>(this) + 244, changetype<usize>(val)) }
	static parentRefKeeper: Map<u32, Transform|null> = new Map()
	get parent(): Transform|null{ return changetype<Transform|null>(load<usize>(changetype<usize>(this) + 248)) }
	set parent(val: Transform|null){ store<usize>(changetype<usize>(this) + 248, changetype<usize>(val)) }

	//handle create
	static handleCreate(proxy: CTransformProxy, eid: u32): void{
		const children = changetype<Set<Transform>>(0)
		CTransformProxy.childrenRefKeeper.set(eid, children)
		proxy.children = children

		const parent = changetype<Transform|null>(0)
		CTransformProxy.parentRefKeeper.set(eid, parent)
		proxy.parent = parent

	}

	//handle remove
	static handleRemove(proxy: CTransformProxy, eid: u32): void{
		CTransformProxy.childrenRefKeeper.delete(eid)
		proxy.children = changetype<T>(0)

		CTransformProxy.parentRefKeeper.delete(eid)
		proxy.parent = changetype<T>(0)

	}	

}

