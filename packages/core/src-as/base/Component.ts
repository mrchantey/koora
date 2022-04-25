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
