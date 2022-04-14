import { Transform } from '../components'
import { Entity } from './Entity'
import { ObjectBase } from './Object'
import { World } from './World'


export type CID = u32


export class Component extends ObjectBase{
	entity: Entity
	world: World
	constructor(){
		super()
		this.entity = World.main.entity
		this.world = this.entity.world
	}
}

export class BehaviorComponent extends Component{
	start(): void{}
	update(): void{}
	dispose(): void{}
}

export class SpatialComponent extends BehaviorComponent{
	transform: Transform
	constructor(){
		super()
		this.transform = this.entity.getOrAdd<Transform>()
	}
}