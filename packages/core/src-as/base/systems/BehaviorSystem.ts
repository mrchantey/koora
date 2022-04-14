import { BehaviorComponent } from '../Component'
import { System } from '../System'
import { behaviorSystemPriority } from '../SystemPriority'

export class BehaviorSystem extends System{
	static id: u32 = idof<BehaviorSystem>()

	behaviors: BehaviorComponent[] = []
	constructor(){
		super(behaviorSystemPriority)
	}

	addBehavior(behavior: BehaviorComponent): void{
		this.behaviors.push(behavior)
		if (this.world.isRunning)
			behavior.start()
	}

	removeBehavior(behavior: BehaviorComponent): void{
		this.behaviors.splice(this.behaviors.indexOf(behavior), 1)
	}

	start(): void {
		for (let i = 0; i < this.behaviors.length; i++){
			this.behaviors[i].start()
		}
	}
	update(): void {
		for (let i = 0; i < this.behaviors.length; i++){
			this.behaviors[i].update()
		}
	}
	dispose(): void {
		for (let i = 0; i < this.behaviors.length; i++){
			this.behaviors[i].dispose()
		}
	}

}