import { Entity, World } from '../base'
import { Mesh, Rotator } from '../components'
import { CubeGeometry, Shader, StandardMaterial, unlitVertexColorShader } from '../rendering'


export function rotatingCube(_shader: Shader | null): Entity{
	const shader = _shader == null ? unlitVertexColorShader : _shader
	
	const entity = World.main.createEntity()

	const material = new StandardMaterial(shader)
	// .setColor(0.25, 0.4, 0.25)
	// .setColor(0.25, 0.4, 0.25)
	const mesh = new Mesh(CubeGeometry.default, material)

	const rotator = new Rotator()
	rotator.offset.set(0, 1, 0)
	
	entity.attach(mesh)
		.attach(rotator)
	return entity
}

