import { EPSILON } from '../math'
import { System } from './System'



export class SystemPriority{
	static after(other: SystemPriority): SystemPriority{
		const depth = other.depth + 1
		const value = other.value + 1 / Mathf.pow(2, depth)
		return new SystemPriority(value, depth)
	}
	static before(other: SystemPriority): SystemPriority{
		const depth = other.depth + 1
		const value = other.value - 1 / Mathf.pow(2, depth)
		return new SystemPriority(value, depth)
	}
	value: f32
	depth: i16
	constructor(value: f32 = 1, depth: i16 = 0){
		this.value = value
		this.depth = depth
	}
	isEqual(other: SystemPriority): bool{
		return this.value == other.value && this.depth == other.depth
	}
	isAlmostEqual(other: SystemPriority): bool{
		return Mathf.abs(this.value - other.value) < EPSILON && Mathf.abs(this.depth - other.depth) < EPSILON
	}
	static sortSystems<T extends System>(systems: T[]): void{
		systems.sort((a, b) => {
			if (a.priority.value < b.priority.value)
				return -1
			else if (b.priority.value < a.priority.value)
				return 1
			return 0 
		})
	}
}

export const rootSystemPriority = new SystemPriority()
export const renderSystemPriority = SystemPriority.before(rootSystemPriority)
export const transformSystemPriority = SystemPriority.before(renderSystemPriority)
export const timeSystemPriority = SystemPriority.before(transformSystemPriority)
export const behaviorSystemPriority = SystemPriority.after(transformSystemPriority)
export const defaultSystemPriority = SystemPriority.after(behaviorSystemPriority)