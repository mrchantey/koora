import { Vector3 } from '../../math'
import { NormalUtils } from '../../utility'
import { toTyped_f32, toTyped_u16, toTyped_u8 } from '../../utility/_ArrayUtils'
import { gl } from '../../WebGL2'
import { AttributeName } from '../constants'
import { Attribute, Attribute_f32, Attribute_u8 } from './Attribute'



export class Geometry {
	vertexCount: u32 = 0
	//TODO decouple geometry from WebGL
	primitiveType: gl.Primitive = gl.Primitive.TRIANGLES
	attributeMap: Map<string, Attribute> = new Map()
	attributeArr: Attribute[] = []

	//TODO move to index geometry
	dynamicIndices: bool = false
	indices: Uint16Array | null

	instanceCount: u32 = 0

	static new(vertexCount: u32): Geometry{ return new Geometry(vertexCount) }
	constructor(vertexCount: u32){
		this.vertexCount = vertexCount
	}
	addAttribute(attr: Attribute): Geometry{
		this.attributeMap.set(attr.name, attr)
		this.attributeArr.push(attr)
		return this
	}

	setInstanceCount(instanceCount: u32): Geometry{
		this.instanceCount = instanceCount
		return this
	}

	setPrimitiveType(type: gl.Primitive): Geometry{
		this.primitiveType = type
		return this
	}

	setIndices(indices: Uint16Array): Geometry{
		this.indices = indices
		return this
	}
	addTexcoords(texcoords: Float32Array): Geometry{
		this.addAttribute(Attribute.Vec2(AttributeName.Texcoord, texcoords))
		return this
	}
}

export class PositionGeometry extends Geometry{

	positions: Float32Array
	constructor(positions: Float32Array){
		super(positions.length / 3)
		this.positions = positions
		this.addAttribute(Attribute.Vec3(AttributeName.Position, positions))
	}
}



export class IndexGeometry extends PositionGeometry{
	
	normals: Float32Array

	constructor(positions: Float32Array, indices: Uint16Array, normals: Float32Array | null = null){
		super(positions)
		this.indices = indices
		if (normals == null)
			this.normals = new Float32Array(positions.length)
		else
			this.normals = normals
		this.addAttribute(Attribute.Vec3(AttributeName.Normal, this.normals))
		if (normals == null)
			this.calculateNormals()
	}

	
	calculateNormals(): void{
		const indices = this.indices
		if (this.primitiveType !== gl.Primitive.TRIANGLES || !indices)
			throw new Error('currently only triangle normals can be calculated')
		NormalUtils.normalsFromTriangles(this.positions, indices, this.normals)
	}
}


export class StandardGeometry extends IndexGeometry{
	colors: Uint8Array
	texcoords: Float32Array

	static fromStatic(positions: StaticArray<f32>, indices: StaticArray<u16>, texcoords: StaticArray<f32>, colors: StaticArray<u8>): StandardGeometry{
		return new StandardGeometry(
			toTyped_f32(positions),
			toTyped_u16(indices),
			toTyped_f32(texcoords),
			toTyped_u8(colors)
		)
	}

	constructor(positions: Float32Array, indices: Uint16Array, texcoords: Float32Array, colors: Uint8Array){
		super(positions, indices)
		this.colors = colors
		this.texcoords = texcoords
		this.addAttribute(new Attribute_f32(AttributeName.Texcoord, 2, texcoords))
		this.addAttribute(new Attribute_u8(AttributeName.Color, 4, colors))
	}
}