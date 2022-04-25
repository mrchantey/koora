import { Mesh } from '../../core/components/Mesh'
import { host } from '../../imports'
import { WebGLMesh } from '../components'
import { gl } from '../imports'
import { WebGLGeometrySystem } from './WebGLGeometrySystem'
import { WebGLMaterialSystem } from './WebGLMaterialSystem'
import { WebGLShaderSystem } from './WebGLShaderSystem'
import { WebGLUniformBufferObjectSystem } from './WebGLUniformBufferObjectSystem'


export class WebGLMeshSystem{

	shaderSystem: WebGLShaderSystem
	geometrySystem: WebGLGeometrySystem
	materialSystem: WebGLMaterialSystem

	meshMap: Map<Mesh, WebGLMesh> = new Map()

	constructor(uboSystem: WebGLUniformBufferObjectSystem){
		this.materialSystem = new WebGLMaterialSystem(uboSystem)
		this.geometrySystem = new WebGLGeometrySystem()
		this.shaderSystem = new WebGLShaderSystem()
	}
	create(mesh: Mesh): void{
		const shader = this.shaderSystem.getOrCreate(mesh.material.shader)
		const geometry = this.geometrySystem.getOrCreate(mesh.geometry, shader)
		const material = this.materialSystem.getOrCreate(mesh.material, shader)
		this.meshMap.set(mesh, { shader, material, geometry })
	}
	render(mesh: Mesh): void{
		const glMesh = this.meshMap.get(mesh)
		const program = host.get(glMesh.shader.programId)
		gl.useProgram(program)
		this.materialSystem.beforeRender(glMesh.material)
		this.geometrySystem.render(glMesh.geometry)
		gl.useProgram(null)
	}	
}