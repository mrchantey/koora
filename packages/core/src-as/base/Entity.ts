import { CID, Component } from './Component'
import { World } from './World'

export type EID = u32

export class Entity{
	world: World
	id: EID
	components: Map<CID, Component> = new Map()
	constructor(world: World, id: u32){
		this.world = world
		this.id = id
		this.bind()
	}
	bind(): Entity{
		this.world.entity = this
		return this
	}
	has<T extends Component>(): bool{
		return this.components.has(idof<T>())
	}
	add<T extends Component>(): Entity{
		return this.attach(instantiate<T>())
	}
	attach<T extends Component>(component: T): Entity{
		if (component.entity !== this)
			throw new Error('component was instantiated with a different entity, please call entity.bind() first')
		const cid = idof<T>()
		this.components.set(cid, component)
		this.world.onAddComponent(this, cid, component)
		return this
	}
	remove<T extends Component = Component>(cid: u32 = idof<T>()): Entity{
		this.world.onRemoveComponent(this, cid, this.components.get(cid))
		this.components.delete(cid)
		return this
	}
	get<T extends Component>(): T{
		return this.components.get(idof<T>()) as T
	}
	getOrAdd<T extends Component>(): T{
		const cid = idof<T>()
		if (!this.components.has(cid))
			this.add<T>()
		return this.components.get(cid) as T
	}
	dispose(): void{
		const componentIds = this.components.keys()
		const components = this.components.values()
		for (let i = 0; i < components.length; i++){
			this.remove(componentIds[i])
		}
		this.world.onDisposeEntity(this)
	}
}