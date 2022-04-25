import { World } from '../base'
import { Mesh, Transform } from '../core/components'
import { Vector3, TAU } from '../math'
import { StandardMaterial, unlitVertexColorShader, GridGeometry, TransformGeometry } from '../rendering'

export function createDebugGizmos(): void{
	const material = new StandardMaterial(unlitVertexColorShader)
	// material.setTransparent()
	material.color.set(.5, .5, .5, 1)
	// material.uniformMap.get(uniform_Color)
	const grid = World.main.createEntity()
		.add<Transform>()
		.attach(new Mesh(new GridGeometry(21, 20), material))
	grid.get<Transform>().rotation.fromEulerAngles(new Vector3(TAU / 4, 0, 0))

	const trans = World.main.createEntity()

	// 	// .attach(new Mesh(CubeGeometry.default, unlitMaterial))
		// .attach(new Mesh(TransformGeometry.default, material))
		.attach(new Mesh(TransformGeometry.default, new StandardMaterial(unlitVertexColorShader)))
}