import { ArrayUtils } from '../../utility'
import { flatMapStatic, arrayToStatic } from '../../utility/_ArrayUtils'
import { CubeGeometry } from './CubeGeometry'
import { StandardGeometry } from './Geometry'

export class TransformGeometry extends StandardGeometry{

	static default: StandardGeometry = TransformGeometry.new()

	static positions(width: f32 = 0.02, length: f32 = 1): StaticArray<f32>{
		const right = CubeGeometry.positions(length, width, width)
		const up = CubeGeometry.positions(width, length, width)
		const fwd = CubeGeometry.positions(width, width, length)
		const hLen = length / 2
		const hWidth = width / 2
		for (let i = 0; i < right.length; i += 3) {
			right[i] += hLen + hWidth
			up[i + 1] += hLen + hWidth
			fwd[i + 2] += hLen + hWidth
		}
		return flatMapStatic(arrayToStatic([right, up, fwd]))
	}

	static indices(): StaticArray<u16>{
		const right = CubeGeometry.indices()
		const up = CubeGeometry.indices()
		const fwd = CubeGeometry.indices()
		const indicesPerCube = <u16>6 * 6
		const verticesPerCube = <u16>4 * 6
		for (let i = 0; i < up.length; i++){
			up[i] += verticesPerCube
			fwd[i] += verticesPerCube * 2
		}
		// return right
		return flatMapStatic(arrayToStatic([right, up, fwd]))
	}
	static uvs(): StaticArray<f32>{
		const right = CubeGeometry.uvs()
		const up = CubeGeometry.uvs()
		const fwd = CubeGeometry.uvs()
		return flatMapStatic(arrayToStatic([right, up, fwd]))
	}
	static colors(): StaticArray<u8>{
		const numVerts = 4 * 6
		const right = new StaticArray<u8>(numVerts * 4)
		const up = new StaticArray<u8>(numVerts * 4)
		const fwd = new StaticArray<u8>(numVerts * 4)
		ArrayUtils.fill(right, [<u8>255, 0, 0, 255])
		ArrayUtils.fill(up, [<u8>0, 255, 0, 255])
		ArrayUtils.fill(fwd, [<u8>0, 0, 255, 255])
		return flatMapStatic(arrayToStatic([right, up, fwd]))
	}

	static new(): StandardGeometry{
		return StandardGeometry.fromStatic(
			TransformGeometry.positions(), 
			TransformGeometry.indices(), 
			TransformGeometry.uvs(), 
			TransformGeometry.colors())
	}
}