import { ArrayUtils } from '../../utility'
import { AttributeName, VaryingName } from '../constants'
import { Attribute, Attribute_f32 } from './Attribute'
import { IndexGeometry, StandardGeometry } from './Geometry'
import { createQuadIndices, createQuadPositions, createQuadUvs } from './QuadGeometry'



export class DebugNormalGeometry extends StandardGeometry{


	constructor(target: IndexGeometry){
		const positions = createQuadPositions(0.1)
		const indices = createQuadIndices()
		const uvs = createQuadUvs()
		const colors = ArrayUtils.toTyped_u8(ArrayUtils.fill(new StaticArray<u8>(4 * 4), [<u8>255, <u8>255, <u8>255, <u8>255]))
		super(positions, indices, uvs, colors)

		const instancePositions = Attribute.Vec3(AttributeName.InstancePosition, target.positions)
			.asVarying(VaryingName.InstancePosition)
			.asInstanced() as Attribute_f32

		const instanceTangents = Attribute.Vec3(AttributeName.InstanceTangent, target.normals)
			.asInstanced()
		
		this.addAttribute(instancePositions)
			.addAttribute(instanceTangents)
			.setInstanceCount(target.vertexCount)
		
	}

}