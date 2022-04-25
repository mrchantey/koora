import { mat4 } from '../../glMatrix'
import { Matrix, Vector3, Quaternion } from '../../math'
import { Component } from '../../base'

export class Transform extends Component{
	matrix: Matrix
	worldMatrix: Matrix
	inverseWorldMatrix: Matrix
	position: Vector3
	scale: Vector3
	rotation: Quaternion

	children: Set<Transform>
	parent: Transform|null

	matrixAutoUpdate: bool = true

	static fromMatrix(matrix: Matrix, parent: Transform | null = null): Transform{
		const transform = new Transform(parent)
		transform.matrix = matrix
		return transform
	}

	constructor(parent: Transform | null = null){
		super()
		this.matrix = new Matrix()
		this.worldMatrix = new Matrix()
		this.inverseWorldMatrix = new Matrix()
		this.position = new Vector3()
		//fromMatrix has weird behaviour, ie matrix updated before updateMatrix()
		// this.position = Vector3.fromMatrix(this.matrix)
		this.scale = new Vector3(1, 1, 1)
		this.rotation = new Quaternion()

		this.children = new Set()
		if (parent)
			this.setParent(parent)
	}
	setParent(parent: Transform | null, keepWorldPosition: bool = false): Transform{
		const thisParent = this.parent
		thisParent && thisParent.children.delete(this)
		parent && parent.children.add(this)
		this.parent = parent
		if (keepWorldPosition)
			throw new Error('keep world position not yet implemented')
		return this
	}
	updateMatrix(): Transform {
		this.matrix.compose(this.position, this.rotation, this.scale)
		// this.matrixWorldNeedsUpdate = true
		return this
	}
	lookAt(target: Vector3, up: Vector3 = Vector3._up): Transform{
		//should be quaternion lookat
		mat4.fromTranslation(Matrix._tmp0.m, this.position.m)
		Matrix._tmp0.lookAt(target, up)
		mat4.getRotation(this.rotation.m, Matrix._tmp0.m)
		return this
	}
	lookAway(target: Vector3, up: Vector3 = Vector3._up): Transform{
		//should be quaternion lookat
		mat4.fromTranslation(Matrix._tmp0.m, this.position.m)
		Matrix._tmp0.lookAway(target, up)
		mat4.getRotation(this.rotation.m, Matrix._tmp0.m)
		return this
	}
	translateX(translation: f32): Transform{
		this.position.add(this.rotation.right().scale(translation))
		return this
	}
	translateY(translation: f32): Transform{
		this.position.add(this.rotation.up().scale(translation))
		return this
	}
	translateZ(translation: f32): Transform{
		this.position.add(this.rotation.forward().scale(translation))
		return this
	}

	reset(): Transform{
		this.position.set(0, 0, 0)
		this.scale.set(1, 1, 1)
		this.rotation.set(0, 0, 0, 1)
		return this
	}

	updateWorldMatrix(updateParents: boolean = false, updateChildren: boolean = false): Transform {
		const parent = this.parent
		if (parent && updateParents)
			parent.updateWorldMatrix(true, false)
		if (this.matrixAutoUpdate) this.updateMatrix()
		if (parent)
			// Matrix.multiply(this.worldMatrix, this.matrix, parent.worldMatrix)
			Matrix.multiply(this.worldMatrix, parent.worldMatrix, this.matrix)
			// Matrix.multiply(parent.worldMatrix, this.matrix, this.worldMatrix)
		else
			this.worldMatrix.copy(this.matrix)
		mat4.invert(this.inverseWorldMatrix.m, this.worldMatrix.m)
		if (updateChildren) {
			const children = this.children.values()
			//@ts-ignore
			for (let i = 0, l = children.length; i < l; i ++) {
				children[ i ].updateWorldMatrix(false, true)
			}	
		}
		return this
	}

}