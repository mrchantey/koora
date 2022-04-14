import { CID, Component } from './Component'
import { Entity } from './Entity'
import { Query } from './Query'





export class QueryManager{


	queryMap: Map<CID, Query[]> = new Map()
	currentSystem: u32 = -1

	addQuery(query: Query): QueryManager{
		for (let i = 0; i < query.componentIds.length; i++){
			const cid = query.componentIds[i]
			if (!this.queryMap.has(cid))
				this.queryMap.set(cid, [])
			const queries = this.queryMap.get(cid)
			queries.push(query)
			// SystemPriority.sortSystems(queries)
		}
		return this
	}

	onAddComponent(entity: Entity, cid: CID): void{
		if (!this.queryMap.has(cid))
			return
		const queries = this.queryMap.get(cid)
		for (let i = 0; i < queries.length; i++){
			const queryCids = queries[i].componentIds
			let pass = true
			for (let j = 0; j < queryCids.length; j++){
				if (!entity.components.has(queryCids[j]))
					pass = false
			}
			if (pass)
				queries[i].addEntity(entity)
		}
	}
	
	onRemoveComponent(entity: Entity, cid: CID): void{
		if (!this.queryMap.has(cid))
			return
		const queries = this.queryMap.get(cid)
		for (let i = 0; i < queries.length; i++){
			if (queries[i].entities.has(entity))
				queries[i].removeEntity(entity)
		}
	}

}