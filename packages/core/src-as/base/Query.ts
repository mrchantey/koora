import { CID, Component } from './Component'
import { EID, Entity } from './Entity'

export class Query{
	
	componentIds: CID[]
	
	entities: Set<Entity> = new Set<Entity>()
	constructor(componentIds: CID[]){
		this.componentIds = componentIds
	}

	addEntity(entity: Entity): void{
		this.entities.add(entity)
	}
	
	removeEntity(entity: Entity): void{
		this.entities.delete(entity)
	}
}


export class TypedQuery<T1 extends Component> extends Query{

	components: T1[] = []

	constructor(){
		super([idof<T1>()])
	}

	addEntity(entity: Entity): void {
		super.addEntity(entity)
		this.components.push(entity.get<T1>())
	}
	removeEntity(entity: Entity): void {
		super.removeEntity(entity)
		this.components.splice(this.components.indexOf(entity.get<T1>()), 1)
	}
}