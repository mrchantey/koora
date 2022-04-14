import { Transform } from '../../components'
import { Entity } from '../Entity'
import { TypedQuery } from '../Query'
import { ListenerSystem } from '../System'
import { transformSystemPriority } from '../SystemPriority'

export class TransformSystem extends ListenerSystem{
	static id: u32 = idof<TransformSystem>()
	transformQuery: TypedQuery<Transform>

	root: Transform
	constructor(){
		super([idof<Transform>()], transformSystemPriority)
		this.transformQuery = this.world.createQuery<Transform>()
		this.root = this.world
			.createEntity()
			.getOrAdd<Transform>()
	}
	onAdd(entity: Entity): void {
		const transform = entity.get<Transform>()
		if (transform != this.root && transform.parent == null)
			transform.setParent(this.root)
	}
	onRemove(entity: Entity): void {
		const transform = entity.get<Transform>()
		if (transform.parent === this.root)
			transform.setParent(null)
	}
	update(): void {
		this.root.updateWorldMatrix(false, true)
	}
}