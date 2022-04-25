import { Camera, Mesh, DirectionalLight, Time, Transform } from '../components'
import { Matrix } from '../../math'
import { Viewport } from '../../utility'
import { Ubo, UniformName, Uniform_f32 } from '../../rendering'
import { ListenerSystem, TypedQuery, Entity, renderSystemPriority, World } from '../../base'
import { UniformBufferObjectSystem } from './UniformBufferObjectSystem'

export class RenderSystem extends ListenerSystem{

	cameraQuery: TypedQuery<Camera>

	opaqueMeshes: Entity[] = []
	transparentMeshes: Entity[] = []
	static canvasWidth: u32 = 100
	static canvasHeight: u32 = 100
	uboSystem: UniformBufferObjectSystem	
	constructor(uboSystem: UniformBufferObjectSystem){
		super([idof<Mesh>()], renderSystemPriority)
		this.uboSystem = uboSystem
		this.cameraQuery = this.world.createQuery<Camera>()
		// this.camera = this.world.createEntity()
		// 	.getOrAdd<Camera>()
		// this.uboSystem.
	}

	onAdd(entity: Entity): void {
		const mesh = entity.get<Mesh>()
		if (mesh.material.transparent)
			this.transparentMeshes.push(entity)
		else
			this.opaqueMeshes.push(entity)
		this.handleCreateMesh(mesh)
	}
	
	update(): void {
		super.update()
		
		//TODO only apply if lights in scene
		DirectionalLight.applyUbo()
		this.uboSystem.apply(Ubo.directionalLight)
		
		for (let i = 0; i < this.cameraQuery.components.length; i++){
			const camera = this.cameraQuery.components[i]
			//doesnt camera update get called anyway?
			camera.update()
			camera.applyUbo()
			this.uboSystem.apply(Ubo.camera)
			
			this.handleViewport(camera.viewport)
			
			this.handlePrepareOpaque()
			for (let i = 0; i < this.opaqueMeshes.length; i++){
				this.renderMesh(camera, this.opaqueMeshes[i])
			}
			this.handlePrepareTransparent()
			for (let i = 0; i < this.transparentMeshes.length; i++){
				this.renderMesh(camera, this.transparentMeshes[i])
			}
		}
	}
	renderMesh(camera: Camera, entity: Entity): void {
		const mesh = entity.get<Mesh>()
		const transform = entity.get<Transform>()
		//update even if unused by material, maybe others would use it?

		//if so, this should execute just after transform system
		Matrix.multiply(mesh.modelViewProjection, camera.viewProjection, transform.worldMatrix)
		Matrix.multiply(mesh.modelView, camera.view, transform.worldMatrix)
		Matrix.transpose(mesh.inverseTransposeModel, transform.inverseWorldMatrix)
		mesh.applyUbo()
		this.uboSystem.apply(Ubo.mesh)

		// TODO only update uniforms used by the shader
		// TODO only update color if dirty
		// TODO remove camera uniforms
		// TODO more efficient light copy / share
		for (let i = 0; i < mesh.material.uniformArr.length; i++){
			const uniform = mesh.material.uniformArr[i]
			// imports.utils.log_string(uniform.name)
			if (uniform.name === UniformName.Color){ /*implicit update*/ }
			else if (uniform.name === UniformName.Texture){ /*implicit update*/ }
			else if (uniform.name === UniformName.Acceleration){ /*implicit update*/ }
			else if (uniform.name === UniformName.Time)
				(uniform as Uniform_f32).value[0] = this.world.get<Time>().elapsed
			else if (uniform.name === UniformName.DeltaTime)
				(uniform as Uniform_f32).value[0] = this.world.get<Time>().delta
			else
				throw new Error(`Uniform not implemented: ${uniform.name}`)
		}
		this.handleRenderMesh(mesh)
	}
	handlePrepareOpaque(): void{}
	handlePrepareTransparent(): void{}
	handleCreateMesh(mesh: Mesh): void{}
	handleRenderMesh(mesh: Mesh): void{}
	handleViewport(viewport: Viewport): void{}
}

export function mainCamera(): Camera|null{
	if (World.main.has<RenderSystem>())
		return World.main.get<RenderSystem>().cameraQuery.components[0]
	return null
}