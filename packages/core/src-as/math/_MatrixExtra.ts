import { mat4 } from '../glMatrix'
import { Quaternion } from './Quaternion'
import { Vector3 } from './Vector3'



export class MatrixExtra{
	static new(): MatrixExtra{ return new MatrixExtra() }
	static get identity(): MatrixExtra{ return new MatrixExtra() }
	static _identity: MatrixExtra = MatrixExtra.identity
	static _tmp0: MatrixExtra = new MatrixExtra()	
	m: Float32Array

	constructor(){
		this.m = new Float32Array(16)
		mat4.identity(this.m)
	}
	setRows(
		m11: f32 = 1, m12: f32 = 0, m13: f32 = 0, m14: f32 = 0,
		m21: f32 = 0, m22: f32 = 1, m23: f32 = 0, m24: f32 = 0,
		m31: f32 = 0, m32: f32 = 0, m33: f32 = 1, m34: f32 = 0,
		m41: f32 = 0, m42: f32 = 0, m43: f32 = 0, m44: f32 = 1): MatrixExtra {
		const m = this.m
		m[ 0 ] = m11; m[ 4 ] = m12; m[ 8 ] = m13; m[ 12 ] = m14
		m[ 1 ] = m21; m[ 5 ] = m22; m[ 9 ] = m23; m[ 13 ] = m24
		m[ 2 ] = m31; m[ 6 ] = m32; m[ 10 ] = m33; m[ 14 ] = m34
		m[ 3 ] = m41; m[ 7 ] = m42; m[ 11 ] = m43; m[ 15 ] = m44
		return this
	}
	position(target: Vector3 = new Vector3): Vector3{ target.x = this.m[12]; target.y = this.m[13]; target.z = this.m[14]; return target }
	clone(o: MatrixExtra = new MatrixExtra()): MatrixExtra{ o.m.set(this.m); return o }
	copy(o: MatrixExtra): MatrixExtra{ this.m.set(o.m); return this }
	rotation(target: Quaternion = new Quaternion(), scale: Vector3 = Vector3.one): Quaternion{
		const _m1 = this.clone(MatrixExtra._tmp0).m
		const invSX = <f32>1 / scale.x
		const invSY = <f32>1 / scale.y
		const invSZ = <f32>1 / scale.z

		_m1[ 0 ] *= invSX
		_m1[ 1 ] *= invSX
		_m1[ 2 ] *= invSX

		_m1[ 4 ] *= invSY
		_m1[ 5 ] *= invSY
		_m1[ 6 ] *= invSY

		_m1[ 8 ] *= invSZ
		_m1[ 9 ] *= invSZ
		_m1[ 10 ] *= invSZ
		//@ts-ignore
		target.fromRotationMatrix(MatrixExtra._tmp0)
		return target
	}
	scale(target: Vector3 = new Vector3): Vector3
	{
		const m = this.m
		target.x = Mathf.sqrt(m[0] * m[0] + m[1] * m[1] + m[2] * m[2])
		target.y = Mathf.sqrt(m[4] * m[4] + m[5] * m[5] + m[6] * m[6])
		target.z = Mathf.sqrt(m[8] * m[8] + m[9] * m[9] + m[10] * m[10])
		if (this.determinant() < 0)
			target.x *= -1//target.y in bjs
		return target
	}
	
	isIdentity(): boolean{
		const m = this.m
		return m[0] === 1.0 && m[1] === 0.0 && m[2] === 0.0 && m[3] === 0.0 &&
		m[4] === 0.0 && m[5] === 1.0 && m[6] === 0.0 && m[7] === 0.0 &&
		m[8] === 0.0 && m[9] === 0.0 && m[10] === 1.0 && m[11] === 0.0 &&
		m[12] === 0.0 && m[13] === 0.0 && m[14] === 0.0 && m[15] === 1.0
	}
	transformDirection (vec: Vector3, target: Vector3 = new Vector3()): Vector3{
		const m = this.m
		target.x = 	vec.x * m[0] + vec.y * m[4] + vec.z * m[8]
		target.y = 	vec.x * m[1] + vec.y * m[5] + vec.z * m[9]
		target.z = 	vec.x * m[2] + vec.y * m[6] + vec.z * m[10]
		//target.normalize()
		return target
	}
	//aka apply matrix4
	transformPoint (vec: Vector3, target: Vector3 = new Vector3()): Vector3 {
		const m = this.m
		const rw = <f32>1 / (vec.x * m[3] + vec.y * m[7] + vec.z * m[11] + m[15])
		target.x = vec.x * m[0] + vec.y * m[4] + vec.z * m[8] + m[12] * rw
		target.y = vec.x * m[1] + vec.y * m[5] + vec.z * m[9] + m[13] * rw
		target.z = vec.x * m[2] + vec.y * m[6] + vec.z * m[10] + m[14] * rw
		return target
	}
	compose(position: Vector3, rotation: Quaternion, scale: Vector3): void {
		const x = rotation.x, y = rotation.y, z = rotation.z, w = rotation.w
		const x2 = x + x, y2 = y + y, z2 = z + z
		const xx = x * x2, xy = x * y2, xz = x * z2
		const yy = y * y2, yz = y * z2, zz = z * z2
		const wx = w * x2, wy = w * y2, wz = w * z2

		const sx = scale.x, sy = scale.y, sz = scale.z
		const m = this.m
		m[0] = (1 - (yy + zz)) * sx
		m[1] = (xy + wz) * sx
		m[2] = (xz - wy) * sx
		m[3] = 0

		m[4] = (xy - wz) * sy
		m[5] = (1 - (xx + zz)) * sy
		m[6] = (yz + wx) * sy
		m[7] = 0

		m[8] = (xz + wy) * sz
		m[9] = (yz - wx) * sz
		m[10] = (1 - (xx + yy)) * sz
		m[11] = 0

		m[12] = position.x
		m[13] = position.y
		m[14] = position.z
		m[15] = 1
	}
	decompose(position: Vector3, rotation: Quaternion, scale: Vector3): void {
		this.position(position)
		this.scale(scale)
		this.rotation(rotation, scale)
	}
	determinant(): f32 {
		if (this.isIdentity())
			return 1
		const m = this.m
		const m00 = m[0], m01 = m[1], m02 = m[2], m03 = m[3]
		const m10 = m[4], m11 = m[5], m12 = m[6], m13 = m[7]
		const m20 = m[8], m21 = m[9], m22 = m[10], m23 = m[11]
		const m30 = m[12], m31 = m[13], m32 = m[14], m33 = m[15]
		const det_22_33 = m22 * m33 - m32 * m23
		const det_21_33 = m21 * m33 - m31 * m23
		const det_21_32 = m21 * m32 - m31 * m22
		const det_20_33 = m20 * m33 - m30 * m23
		const det_20_32 = m20 * m32 - m22 * m30
		const det_20_31 = m20 * m31 - m30 * m21
		const cofact_00 = +(m11 * det_22_33 - m12 * det_21_33 + m13 * det_21_32)
		const cofact_01 = -(m10 * det_22_33 - m12 * det_20_33 + m13 * det_20_32)
		const cofact_02 = +(m10 * det_21_33 - m11 * det_20_33 + m13 * det_20_31)
		const cofact_03 = -(m10 * det_21_32 - m11 * det_20_32 + m12 * det_20_31)
		return m00 * cofact_00 + m01 * cofact_01 + m02 * cofact_02 + m03 * cofact_03
	}
	invert (): MatrixExtra { return this.invertFrom(this) }
	invertFrom(other: MatrixExtra): MatrixExtra {
		const m1 = other.m,
			n11 = m1[ 0 ], n21 = m1[ 1 ], n31 = m1[ 2 ], n41 = m1[ 3 ],
			n12 = m1[ 4 ], n22 = m1[ 5 ], n32 = m1[ 6 ], n42 = m1[ 7 ],
			n13 = m1[ 8 ], n23 = m1[ 9 ], n33 = m1[ 10 ], n43 = m1[ 11 ],
			n14 = m1[ 12 ], n24 = m1[ 13 ], n34 = m1[ 14 ], n44 = m1[ 15 ],		
			t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44,
			t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44,
			t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44,
			t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34
		const det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14
		if (det === 0) return this.setRows(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)		
		const detInv = <f32>1 / det			
		const m2 = this.m
		m2[ 0 ] = t11 * detInv
		m2[ 1 ] = (n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44) * detInv
		m2[ 2 ] = (n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44) * detInv
		m2[ 3 ] = (n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43) * detInv
		m2[ 4 ] = t12 * detInv
		m2[ 5 ] = (n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44) * detInv
		m2[ 6 ] = (n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44) * detInv
		m2[ 7 ] = (n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43) * detInv		
		m2[ 8 ] = t13 * detInv
		m2[ 9 ] = (n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44) * detInv
		m2[ 10 ] = (n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44) * detInv
		m2[ 11 ] = (n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43) * detInv		
		m2[ 12 ] = t14 * detInv
		m2[ 13 ] = (n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34) * detInv
		m2[ 14 ] = (n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34) * detInv
		m2[ 15 ] = (n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33) * detInv
		return this		
	}
	multiply(a: MatrixExtra): MatrixExtra{
		return MatrixExtra.multiply(this, a, this)
	}
	static multiply(a: MatrixExtra, b: MatrixExtra, ref: MatrixExtra = new MatrixExtra()): MatrixExtra {
		const ma = a.m
		const mb = b.m
		const mc = ref.m

		const a11 = ma[ 0 ], a12 = ma[ 4 ], a13 = ma[ 8 ], a14 = ma[ 12 ]
		const a21 = ma[ 1 ], a22 = ma[ 5 ], a23 = ma[ 9 ], a24 = ma[ 13 ]
		const a31 = ma[ 2 ], a32 = ma[ 6 ], a33 = ma[ 10 ], a34 = ma[ 14 ]
		const a41 = ma[ 3 ], a42 = ma[ 7 ], a43 = ma[ 11 ], a44 = ma[ 15 ]

		const b11 = mb[ 0 ], b12 = mb[ 4 ], b13 = mb[ 8 ], b14 = mb[ 12 ]
		const b21 = mb[ 1 ], b22 = mb[ 5 ], b23 = mb[ 9 ], b24 = mb[ 13 ]
		const b31 = mb[ 2 ], b32 = mb[ 6 ], b33 = mb[ 10 ], b34 = mb[ 14 ]
		const b41 = mb[ 3 ], b42 = mb[ 7 ], b43 = mb[ 11 ], b44 = mb[ 15 ]

		mc[ 0 ] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41
		mc[ 4 ] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42
		mc[ 8 ] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43
		mc[ 12 ] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44

		mc[ 1 ] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41
		mc[ 5 ] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42
		mc[ 9 ] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43
		mc[ 13 ] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44

		mc[ 2 ] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41
		mc[ 6 ] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42
		mc[ 10 ] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43
		mc[ 14 ] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44

		mc[ 3 ] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41
		mc[ 7 ] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42
		mc[ 11 ] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43
		mc[ 15 ] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44
		return ref
	}
	lookDirection (forward: Vector3, up: Vector3 = Vector3.up): MatrixExtra{
		return this.lookAt(Vector3._zero, forward, up) }
	lookAt(position: Vector3, target: Vector3, up: Vector3 = Vector3.up): MatrixExtra {
		//this sub untested
		Vector3.sub(target, position, Vector3._tmpZ)
		if (Vector3._tmpZ.lengthSquared() === 0)
			Vector3._tmpZ.z = 1
		Vector3._tmpZ.normalize()
		Vector3._tmpX = Vector3.cross(up, Vector3._tmpZ)
		if (Vector3._tmpX.lengthSquared() === 0) {
			// up and z are parallel
			if (Mathf.abs(up.z) === 1) {
				Vector3._tmpZ.x += 0.0001
			} else {
				Vector3._tmpZ.z += 0.0001
			}
			Vector3._tmpZ.normalize()
			Vector3._tmpX = Vector3.cross(up, Vector3._tmpZ)
		}
		Vector3._tmpX.normalize()
		Vector3._tmpY = Vector3.cross(Vector3._tmpZ, Vector3._tmpX)
		const m = this.m
		m[ 0 ] = Vector3._tmpX.x; m[ 4 ] = Vector3._tmpY.x; m[ 8 ] = Vector3._tmpZ.x
		m[ 1 ] = Vector3._tmpX.y; m[ 5 ] = Vector3._tmpY.y; m[ 9 ] = Vector3._tmpZ.y
		m[ 2 ] = Vector3._tmpX.z; m[ 6 ] = Vector3._tmpY.z; m[ 10 ] = Vector3._tmpZ.z
		return this

	}
	transpose(): MatrixExtra {
		const m = this.m
		let tmp: f32

		tmp = m[ 1 ]; m[ 1 ] = m[ 4 ]; m[ 4 ] = tmp
		tmp = m[ 2 ]; m[ 2 ] = m[ 8 ]; m[ 8 ] = tmp
		tmp = m[ 6 ]; m[ 6 ] = m[ 9 ]; m[ 9 ] = tmp

		tmp = m[ 3 ]; m[ 3 ] = m[ 12 ]; m[ 12 ] = tmp
		tmp = m[ 7 ]; m[ 7 ] = m[ 13 ]; m[ 13 ] = tmp
		tmp = m[ 11 ]; m[ 11 ] = m[ 14 ]; m[ 14 ] = tmp

		return this
	}
	// applyMatrix3(matrix: Matrix): Vector3 {
	// 	const x = this.x, y = this.y, z = this.z
	// 	const m = matrix.m
	// 	this.x = m[ 0 ] * x + m[ 3 ] * y + m[ 6 ] * z
	// 	this.y = m[ 1 ] * x + m[ 4 ] * y + m[ 7 ] * z
	// 	this.z = m[ 2 ] * x + m[ 5 ] * y + m[ 8 ] * z
	// 	return this
	// }
	// applyMatrix4(matrix: Matrix): Vector3 {
	// 	const x = this.x, y = this.y, z = this.z
	// 	const m = matrix.m
	// 	const w = 1 / (m[ 3 ] * x + m[ 7 ] * y + m[ 11 ] * z + m[ 15 ])
	// 	this.x = (m[ 0 ] * x + m[ 4 ] * y + m[ 8 ] * z + m[ 12 ]) * w
	// 	this.y = (m[ 1 ] * x + m[ 5 ] * y + m[ 9 ] * z + m[ 13 ]) * w
	// 	this.z = (m[ 2 ] * x + m[ 6 ] * y + m[ 10 ] * z + m[ 14 ]) * w
	// 	return this
	// }


}