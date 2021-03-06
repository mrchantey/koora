//sparse set ecs resource https://gist.github.com/dakom/82551fff5d2b843cbe1601bbaff2acbf

import { EID } from './utility'

export class ComponentPool<T>{

	stride: u32
	ptr: usize = heap.alloc(0)
	count: u32 = 0
	entityIndices: u32[] = []
	entityList: EID[] = []

	constructor() {
		//@ts-ignore find cleaner way to do this
		this.stride = changetype<T>(0).stride
	}

	//TODO would maintaining this be cheaper than frequent changetype?
	// componentList: T[] = []

	add(eid: EID): void {
		this.ptr = heap.realloc(this.ptr, ++this.count * this.stride)

		const index = this.count - 1
		this.entityIndices[eid] = index
		this.entityList[index] = eid
	}

	entityLocation(eid: EID): usize {
		return this.poolLocation(this.entityIndices[eid])
	}

	poolLocation(index: u32): usize {
		return this.ptr + index * this.stride
	}

	get(eid: EID): T {
		return changetype<T>(this.entityLocation(eid))
	}

	remove(eid: EID): void {
		const entityIndex = this.entityIndices[eid]
		//probs unnessecary, we can use entityList to determine existance
		//this.entityIndices[eid] = -1
		const entityPtr = this.poolLocation(entityIndex)
		console.log(`out, ${eid}, ${entityIndex}, ${entityPtr}`)

		const lastIndex = this.count - 1
		const lastPtr = this.poolLocation(lastIndex)

		this.entityList[entityIndex] = this.entityList[lastIndex]
		memory.copy(entityPtr, lastPtr, this.stride)
		this.entityList.length -= 1

		this.ptr = heap.realloc(this.ptr, --this.count * this.stride)
	}
}
