import { CID } from './Component'
import { Entity } from './Entity'
import { ObjectBase } from './Object'
import { SystemPriority, defaultSystemPriority } from './SystemPriority'
import { World } from './World'

export class System extends ObjectBase {
	priority: SystemPriority
	world: World
	constructor(priority: SystemPriority = defaultSystemPriority){
		super()
		this.world = World.main
		this.priority = priority
	}
	start(): void{}
	update(): void{}
	dispose(): void{}
	
}

export class ListenerSystem extends System{
	entities: Set<Entity> = new Set()	
	components: CID[]
	constructor(components: CID[], priority: SystemPriority = defaultSystemPriority){
		super(priority)
		this.components = components
	}
	
	addEntity(entity: Entity): void{
		this.entities.add(entity)
		//insert magical casting here
		this.onAdd(entity)
	}
	removeEntity(entity: Entity): void{
		this.entities.delete(entity)
		this.onRemove(entity)
	}
	update(): void{
		super.update()
		const entities = this.entities.values()
		//@ts-ignore
		for (let i = 0; i < entities.length; i++){
			this.onUpdate(entities[i])
		}
	}
	onAdd(entity: Entity): void{}
	onUpdate(entity: Entity): void{}
	onRemove(entity: Entity): void{}		

}