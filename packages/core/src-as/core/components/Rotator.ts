import { Vector3 } from '../../math'
import { Component } from '../../base'
import { Transform } from './Transform'

export class Rotator extends Component{
	constructor(){
		super()
		this.entity.getOrAdd<Transform>()
	}

	startTime: f32
	offset: Vector3 = new Vector3()
}