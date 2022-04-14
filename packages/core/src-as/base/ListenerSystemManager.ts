import { CID } from './Component'
import { Entity } from './Entity'
import { ListenerSystem } from './System'
import { SystemPriority } from './SystemPriority'



export class ListenerSystemManager{

	listenerSystemMap: Map<CID, ListenerSystem[]> = new Map()

	addListenerSystem(system: ListenerSystem): void{
		for (let i = 0; i < system.components.length; i++){
			const cid = system.components[i]
			if (!this.listenerSystemMap.has(cid))
				this.listenerSystemMap.set(cid, [])
			const componentSystems = this.listenerSystemMap.get(cid)
			componentSystems.push(system)
			SystemPriority.sortSystems(componentSystems)
		}
	}

	onAddEntity(entity: Entity, cid: CID): void{
		if (!this.listenerSystemMap.has(cid))
			return
		const systems = this.listenerSystemMap.get(cid)
		for (let i = 0; i < systems.length; i++){
			const systemCids = systems[i].components
			let pass = true
			for (let j = 0; j < systemCids.length; j++){
				if (!entity.components.has(systemCids[j]))
					pass = false
			}
			if (pass)
				systems[i].addEntity(entity)
		}
	}
	
	onRemoveEntity(entity: Entity, cid: CID): void{
		if (!this.listenerSystemMap.has(cid))
			return
		const systems = this.listenerSystemMap.get(cid)
		for (let i = 0; i < systems.length; i++){
			if (!systems[i].entities.has(entity))
				continue
			systems[i].removeEntity(entity)
		}
	}

}