import { SpatialComponent } from '../base'
import { Matrix, } from '../math'
import { Ubo, UniformName } from '../rendering/constants'
import { Geometry, } from '../rendering/geometry'
import { Material, UniformBufferObject, Uniform_f32 } from '../rendering/material'
import { Shader } from '../rendering/shader'

export class Mesh extends SpatialComponent{
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
		this.geometry = geometry
		this.material = material
		this.shader = this.material.shader
	}


	applyUbo(): void{
		(Ubo.mesh.uniformMap.get(UniformName.Model) as Uniform_f32).value = this.transform.worldMatrix.m;
		(Ubo.mesh.uniformMap.get(UniformName.ModelView) as Uniform_f32).value = this.modelView.m;
		(Ubo.mesh.uniformMap.get(UniformName.ModelViewProjection) as Uniform_f32).value = this.modelViewProjection.m;
		(Ubo.mesh.uniformMap.get(UniformName.InverseModel) as Uniform_f32).value = this.transform.inverseWorldMatrix.m;
		(Ubo.mesh.uniformMap.get(UniformName.InverseTransposeModel) as Uniform_f32).value = this.inverseTransposeModel.m
	}
}