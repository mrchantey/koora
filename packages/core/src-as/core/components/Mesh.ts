import { Matrix, } from '../../math'
import { Geometry, Material, Shader, Ubo, UniformName, Uniform_f32 } from '../../rendering'
import { Component } from '../../base'
import { Transform } from './Transform'

export class Mesh extends Component{
	geometry: Geometry
	material: Material
	shader: Shader
	modelView: Matrix = new Matrix()
	modelViewProjection: Matrix = new Matrix()
	inverseTransposeModel: Matrix = new Matrix() //used for normals/lighting only
	static new(geometry: Geometry, material: Material): Mesh{
		return new Mesh(geometry, material)
	}
	
	constructor(geometry: Geometry, material: Material){
		super()
		this.entity.getOrAdd<Transform>()
		this.geometry = geometry
		this.material = material
		this.shader = this.material.shader
	}


	applyUbo(): void{
		const transform = this.entity.get<Transform>();
		(Ubo.mesh.uniformMap.get(UniformName.Model) as Uniform_f32).value = transform.worldMatrix.m;
		(Ubo.mesh.uniformMap.get(UniformName.ModelView) as Uniform_f32).value = this.modelView.m;
		(Ubo.mesh.uniformMap.get(UniformName.ModelViewProjection) as Uniform_f32).value = this.modelViewProjection.m;
		(Ubo.mesh.uniformMap.get(UniformName.InverseModel) as Uniform_f32).value = transform.inverseWorldMatrix.m;
		(Ubo.mesh.uniformMap.get(UniformName.InverseTransposeModel) as Uniform_f32).value = this.inverseTransposeModel.m
	}
}