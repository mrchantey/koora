
import { Matrix } from '../../math'


export class MeshProxy {
	get stride(): u32{ return 192 }
	get modelView(): Matrix{ return changetype<Matrix>(changetype<usize>(this) + 0) }
	set modelView(value: Matrix){ memory.copy(changetype<usize>(this) + 0, changetype<usize>(value), 64) }
	get modelViewProjection(): Matrix{ return changetype<Matrix>(changetype<usize>(this) + 64) }
	set modelViewProjection(value: Matrix){ memory.copy(changetype<usize>(this) + 64, changetype<usize>(value), 64) }
	get inverseTransposeModel(): Matrix{ return changetype<Matrix>(changetype<usize>(this) + 128) }
	set inverseTransposeModel(value: Matrix){ memory.copy(changetype<usize>(this) + 128, changetype<usize>(value), 64) }

}

	