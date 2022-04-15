import { SpatialComponent } from '../base'
import { PolarCoords, Vector2, Vector3 } from '../math'
import { Time } from './Time'



export class Rotator extends SpatialComponent{

	startTime: f32
	offset: Vector3 = new Vector3()
	start(): void {
		this.startTime = this.world.get<Time>().elapsed
	}
	update(): void {
		const time = this.world.get<Time>()
		const timeOffset = this.startTime + time.elapsed
		Vector2
			.fromPolar(new PolarCoords(timeOffset * 0.4, 1))
			.toVector3(this.transform.position)
		this.transform.position.add(this.offset)
		// this.transform.position.x += 0.001
		// this.transform.rotation.lookAt(target)
		// this.transform.rotation.angleAxis(timeOffset, Vector3._up)
		this.transform.rotation.fromEulerAngles(new Vector3(0.3 * timeOffset, 0.5 * timeOffset, 0))
	}	
}