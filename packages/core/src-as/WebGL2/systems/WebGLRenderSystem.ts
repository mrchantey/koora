import { Mesh } from '../../components'
import { Color } from '../../math'
import { RenderSystem } from '../../rendering'
import { Viewport } from '../../utility'
import { gl } from '../imports'
import { WebGLMeshSystem } from './WebGLMeshSystem'
import { WebGLUniformBufferObjectSystem } from './WebGLUniformBufferObjectSystem'

export class WebGLRenderSystem extends RenderSystem{

	meshSystem: WebGLMeshSystem
	// uboSystem: WebGLUniformBufferObjectSystem

	constructor(){
		const uboSystem = new WebGLUniformBufferObjectSystem()
		super(uboSystem)
		this.meshSystem = new WebGLMeshSystem(uboSystem)
		this.clearColor(Color.clear)
	}
	clearColor(color: Color): void{
		gl.clearColor(color.r, color.g, color.b, color.a)
	}
	clear(): void{
		gl.clear(gl.ClearingBuffer.COLOR_BUFFER_BIT | gl.ClearingBuffer.DEPTH_BUFFER_BIT)
	}
	handleViewport(viewport: Viewport): void {
		gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height)
	}
	update(): void{
		this.clear()
		super.update()
	}
	handlePrepareOpaque(): void{
		gl.enable(gl.Toggle.DEPTH_TEST)
		gl.depthFunc(gl.Test.LEQUAL)
		gl.disable(gl.Toggle.BLEND)
	}
	handlePrepareTransparent(): void{
		gl.enable(gl.Toggle.BLEND)
		gl.blendFunc(gl.Blend.SRC_ALPHA, gl.Blend.ONE_MINUS_SRC_ALPHA)
		gl.disable(gl.Toggle.DEPTH_TEST)		
	}

	handleCreateMesh(mesh: Mesh): void {
		this.meshSystem.create(mesh)
	}
	handleRenderMesh(mesh: Mesh): void{
		this.meshSystem.render(mesh)
	}
}