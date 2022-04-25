import { Rotator, Time, Transform } from '../components'
import { Vector2, PolarCoords, Vector3 } from '../../math'
import { ListenerSystem, Entity } from '../../base'
import { host } from '../../imports'

export class RotatorSystem extends ListenerSystem{
	constructor(){
		super([idof<Rotator>()])
	}

	onAdd(entity: Entity): void {
		entity.get<Rotator>().startTime = this.world.get<Time>().elapsed
	}

	onUpdate(entity: Entity): void {		
		const transform = entity.get<Transform>()
		const rotator = entity.get<Rotator>()
		const time = this.world.get<Time>()
		const timeOffset = rotator.startTime + time.elapsed
		Vector2
			.fromPolar(new PolarCoords(timeOffset * 0.4, 1))
			.toVector3(transform.position)
		transform.position.add(rotator.offset)
		// transform.position.x += 0.001
		// transform.rotation.lookAt(target)
		// transform.rotation.angleAxis(timeOffset, Vector3._up)
		transform.rotation.fromEulerAngles(new Vector3(0.3 * timeOffset, 0.5 * timeOffset, 0))
	}
}
