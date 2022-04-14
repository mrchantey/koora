import { gl } from '../../WebGL2'
import { AttributeName } from '../constants'
import { Attribute_u8 } from './Attribute'
import { PositionGeometry } from './Geometry'

export class GridGeometry extends PositionGeometry{


	constructor(divisions: u32 = 10, size: f32 = 10){
		if (divisions <= 1)
			divisions = 2
		const hSize = size / 2


		const numPositions = divisions * 4
		const positions = new Float32Array(numPositions * 3)
		//set row positions
		const deltaPos = size / (<f32>divisions - 1)
		for (let i: u32 = 0; i < divisions; i++){
			const i_f = <f32>i
			//row - bottom
			const vi = i * 12
			positions[vi + 0] = -hSize + i_f * deltaPos
			positions[vi + 1] = -hSize
			positions[vi + 2] = 0
			//row - top
			positions[vi + 3] = -hSize + i_f * deltaPos
			positions[vi + 4] = +hSize
			positions[vi + 5] = 0
			//column - left
			positions[vi + 6] = -hSize 
			positions[vi + 7] = -hSize + i_f * deltaPos
			positions[vi + 8] = 0
			//column - right
			positions[vi + 9] = +hSize 
			positions[vi + 10] = -hSize + i_f * deltaPos
			positions[vi + 11] = 0
		}
		super(positions)
		const colors = new Uint8Array(numPositions * 4)
		for (let i = 0; i < colors.length; i++){
			colors[i] = 127
		}


		this.addAttribute(new Attribute_u8(AttributeName.Color, 4, colors))
		this.primitiveType = gl.Primitive.LINES
	}
}