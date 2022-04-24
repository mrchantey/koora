
import { Matrix, Vector3, Quaternion } from '../../math'

export class TransformProxy {
	get stride(): u32{ return 256 }
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

}

	