import { Time } from '../components'
import { host } from '../../imports'
import { System, timeSystemPriority } from '../../base'

export class TimeSystem extends System{
	time: Time
	constructor(){
		super(timeSystemPriority)
		this.time = new Time()
		this.world.set<Time>(this.time)
	}

	start(): void {
		const t = this.time
		//maintain 64 bit until after millis2secs
		t.now = host.elapsed() * 0.001
		t.start = t.now
		t.last = t.now
	}
	
	update(): void {
		const t = this.time
		t.last = t.now			
		t.now = host.elapsed() * 0.001
		t.elapsed = t.now - t.start
		t.delta = t.now - t.last
		t.frame++
	}
}
