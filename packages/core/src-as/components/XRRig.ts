import { Entity, SpatialComponent } from '../base'

export enum XREye{
	Left,
	Right,
	Center
}


export class XRRig extends SpatialComponent{

	constructor(
		leftEye: Entity,
		rightEye: Entity
	){
		super()
		//create left eye
		//create right eye
	}

}