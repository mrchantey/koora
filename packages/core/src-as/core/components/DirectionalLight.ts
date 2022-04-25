import { Vector1, SharedBufferVector1, SharedBufferVector3, Vector3 } from '../../math'
import { Ubo, UniformName, Uniform_f32 } from '../../rendering'
import { Component } from '../../base'

export class DirectionalLight extends Component{

	
	static directionBuffer: SharedBufferVector3 = new SharedBufferVector3()
	static ambientIntensityBuffer: SharedBufferVector1 = new SharedBufferVector1()
	// intensity: SharedBufferView_f32
	ambientIntensity: Vector1
	direction: Vector3

	constructor(){
		super()
		this.direction = DirectionalLight.directionBuffer.add().set(-1, -1, -1)
		this.ambientIntensity = DirectionalLight.ambientIntensityBuffer.add().set(0.2) as Vector1
	}

	setDirection(x: f32, y: f32, z: f32): DirectionalLight{
		this.direction.set(x, y, z)
		return this
	}
	setIntensity(value: f32): DirectionalLight{
		this.ambientIntensity.set(value)
		return this
	}

	static applyUbo(): void{
		(Ubo.directionalLight.uniformMap.get(UniformName.DirectionalLights_direction) as Uniform_f32).value = DirectionalLight.directionBuffer.arr;
		(Ubo.directionalLight.uniformMap.get(UniformName.DirectionalLights_ambientIntensity) as Uniform_f32).value = DirectionalLight.ambientIntensityBuffer.arr
	}
}