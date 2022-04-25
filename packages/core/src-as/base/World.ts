import { CID, Component } from './Component'
import { EID, Entity } from './Entity'
import { ListenerSystemManager } from './ListenerSystemManager'
import { ObjectBase } from './Object'
import { Query, TypedQuery } from './Query'
import { QueryManager } from './QueryManager'
import { ListenerSystem, System } from './System'
import { SystemPriority } from './SystemPriority'


export class World{
	static _main: World|null
	static get main(): World{ 
		const world = World._main
		return world ? world : new World() 
	}
	static set main(world: World){ World._main = world }
	_entity: Entity |null
	get entity(): Entity{ 
		const entity = this._entity
		return entity ? entity : this.createEntity() 
	}
	set entity(entity: Entity){ this._entity = entity }
	systems: System[] = []
	eidIncr: EID = 0
	isRunning: bool = false

	entityMap: Map<EID, Entity> = new Map()
	worldMap: Map<u32, ObjectBase> = new Map()

	queryManager: QueryManager = new QueryManager()
	listenerSystemManager: ListenerSystemManager = new ListenerSystemManager()
	constructor(){
		this.bind()
	}
	
	bind(): World{
		World.main = this
		return this
	}
	//TODO iterate and return first instanceof instead of map
	get<T extends ObjectBase>(): T{ return this.worldMap.get(idof<T>()) as T }
	getById(id: u32): ObjectBase { return this.worldMap.get(id) }
	getOrAdd<T extends ObjectBase>(): T{ 
		if (this.has<T>())
			return this.get<T>()
		const val = instantiate<T>()
		this.set(val)
		return val	
	}
	has<T extends ObjectBase>(): bool{ return this.worldMap.has(idof<T>()) }
	set<T extends ObjectBase>(obj: T): World{ this.worldMap.set(idof<T>(), obj); return this }

	createEntity(): Entity{
		const eid = this.eidIncr++
		const entity = new Entity(this, eid)
		this.entityMap.set(eid, entity)
		this.entity = entity
		return entity
	}
	
	createQuery<T extends Component>(): TypedQuery<T>{
		const query = new TypedQuery<T>()
		this.queryManager.addQuery(query)
		return query
	}
	addQuery(query: Query): World{
		this.queryManager.addQuery(query)
		return this	
	}
	
	addSystem<T extends System>(): World{
		if (this.has<T>())
			return this
		this.bind()
		const system = instantiate<T>()
		return this.attachSystem(system)
	}
	
	getOrAddSystem<T extends System>(): T{
		if (this.has<T>())
			return this.get<T>()
		this.bind()
		const system = instantiate<T>()
		this.attachSystem(system)
		return system
	}
	

	attachSystem<T extends System>(system: T): World{
		if (this.has<T>()){
			// throw new Error('system already exists!')
			return this
		}
		if (system.world !== this)
			throw new Error('systems was created with a different world, please call world.bind() first')

		if (system instanceof ListenerSystem)
			this.listenerSystemManager.addListenerSystem(system as ListenerSystem)
		this.systems.push(system)
		this.worldMap.set(idof<T>(), system)
		SystemPriority.sortSystems(this.systems)
		return this
	}

	onAddComponent(entity: Entity, cid: CID, component: Component): World{
		this.queryManager.onAddComponent(entity, cid)
		this.listenerSystemManager.onAddEntity(entity, cid)
		return this
	}
	onRemoveComponent(entity: Entity, cid: CID, component: Component): World{
		this.queryManager.onRemoveComponent(entity, cid)
		this.listenerSystemManager.onRemoveEntity(entity, cid)
		return this
	}
	onDisposeEntity(entity: Entity): World{
		this.entityMap.delete(entity.id)
		return this
	}
	start(): World{
		this.isRunning = true
		for (let i = 0; i < this.systems.length; i++){
			this.systems[i].start()
		}
		return this
	}
	update(): World{
		for (let i = 0; i < this.systems.length; i++){
			this.systems[i].update()
		}
		return this
	}
}