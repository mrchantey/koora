import { ArrayUtils } from '../../utility'
import { StandardGeometry } from './Geometry'





export class CubeGeometry extends StandardGeometry{
	static default: StandardGeometry = CubeGeometry.new()

	static positions(width: f32 = .5, height: f32 = width, depth: f32 = width): StaticArray<f32>{
		const w = width / 2, h = height / 2, d = depth / 2
		const v0 = [-w, -h, +d]
		const v1 = [+w, -h, +d]
		const v2 = [-w, +h, +d]
		const v3 = [+w, +h, +d]
		const v4 = [-w, -h, -d]
		const v5 = [+w, -h, -d]
		const v6 = [-w, +h, -d]
		const v7 = [+w, +h, -d]
		return ArrayUtils.flatMap([
			v0, v1, v2, v3, //front
			v5, v4, v7, v6, //back
			v1, v5, v3, v7, //right
			v4, v0, v6, v2, //left
			v2, v3, v6, v7, //top
			v1, v0, v5, v4, //bottom
		])
	}
	static indices(): StaticArray<u16>{
		const arr = new StaticArray<u16>(6 * 6)
		let ai = 0
		// const arrs: u16[][] = []
		for (let i = 0; i < 6; i++){
			const o = <u16>i * 4
			arr[ai++] = o + 0
			arr[ai++] = o + 1
			arr[ai++] = o + 2
			arr[ai++] = o + 2
			arr[ai++] = o + 1
			arr[ai++] = o + 3
		}
		return arr
	}
	static uvs(): StaticArray<f32>{
		const uv0: f32[] = [1, 0]
		const uv1: f32[] = [0, 0]
		const uv2: f32[] = [0, 1]
		const uv3: f32[] = [1, 1]		

		return ArrayUtils.flatMap([
			uv0, uv1, uv2, uv3,
			uv0, uv1, uv2, uv3,
			uv0, uv1, uv2, uv3,
			uv0, uv1, uv2, uv3,
			uv0, uv1, uv2, uv3,
			uv0, uv1, uv2, uv3,
		])
	}


	static colors(depth: u8 = 127): StaticArray<u8>{
		const blue1: u8[] = [0, 0, 255, 255]
		const blue2: u8[] = [0, 0, depth, 255]
		const red1: u8[] = [255, 0, 0, 255]
		const red2: u8[] = [depth, 0, 0, 255]
		const green1: u8[] = [0, 255, 0, 255]
		const green2: u8[] = [0, depth, 0, 255]
		return ArrayUtils.flatMap([
			blue1, blue1, blue1, blue1,			
			blue2, blue2, blue2, blue2,			
			red1, red1, red1, red1,			
			red2, red2, red2, red2,			
			green1, green1, green1, green1,			
			green2, green2, green2, green2,			
		])
	}
	static new(): StandardGeometry{
		return StandardGeometry.fromStatic(
			CubeGeometry.positions(), 
			CubeGeometry.indices(),
			CubeGeometry.uvs(),
			CubeGeometry.colors())
	}
	// constructor(){

	// 	// super()
	// }

	
}