import { arrayToTyped } from '../../utility/_ArrayUtils'
import { StandardGeometry } from './Geometry'


// this.indices = ArrayUtils.toTyped_u16(indices)
// this.positions = ArrayUtils.toTyped_f32(positions)
// this.uvs = ArrayUtils.toTyped_f32(uvs)

export function createQuadPositions(width: f32 = 1, height: f32 = width): Float32Array{
	const hw: f32 = width / 2
	const hh: f32 = height / 2
	return arrayToTyped<f32, Float32Array>([
		-hw, -hh, 0,
		+hw, -hh, 0,
		+hw, +hh, 0,
		-hw, +hh, 0,
	])
}


export function createQuadIndices(): Uint16Array{
	return arrayToTyped<u16, Uint16Array>([
		0, 1, 2, 2, 3, 0])
}

export function createQuadUvs(): Float32Array{
	return arrayToTyped<f32, Float32Array>([
		0, 0,
		1, 0,
		1, 1,
		0, 1,
	])
}

export class QuadGeometry extends StandardGeometry{
	static default: QuadGeometry = new QuadGeometry()
	static new(width: f32 = 1): QuadGeometry{
		return new QuadGeometry(width)
	}
	constructor(width: f32 = <f32>1){
		const positions = createQuadPositions(width)
		const indices = createQuadIndices()
		const colors = arrayToTyped<u8, Uint8Array>([
			255, 255, 255, 255,
			255, 255, 0, 255,
			225, 0, 255, 255,
			0, 255, 255, 255,
		])
		const uvs = createQuadUvs()
		super(positions, indices, uvs, colors)
	}
}

export const quadGeometry = new QuadGeometry()