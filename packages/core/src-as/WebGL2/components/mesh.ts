import { WebGLGeometry } from './geometry'
import { WebGLMaterial } from './material'
import { WebGLShader } from './shader'

export class WebGLMesh{
	shader: WebGLShader
	geometry: WebGLGeometry
	material: WebGLMaterial
}