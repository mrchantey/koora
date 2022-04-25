import { Transform } from '../../core'
import { Matrix, Vector3, Quaternion } from '../../math'

export class CTransform{
	matrix: Matrix
	worldMatrix: Matrix
	inverseWorldMatrix: Matrix
	position: Vector3
	scale: Vector3
	rotation: Quaternion
	matrixAutoUpdate: bool

	children: Set<Transform>
	parent: Transform|null
	
}
