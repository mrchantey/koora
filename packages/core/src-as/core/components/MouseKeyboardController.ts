import { Component } from '../../base'
import { Transform } from './Transform'

export class MouseKeyboardController extends Component{
	constructor(){
		super()
		this.entity.getOrAdd<Transform>()
	}
	mouseRotationScalar: f32 = 1
	keyRotationScalar: f32 = 0.03
	keyTranslationScalar: f32 = 0.1	
	wheelTranslationScalar: f32 = 0.01
}