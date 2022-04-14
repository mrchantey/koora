import * as glMatrix from './_common'
import { IndexedCollection } from './imports'
import { Maths } from './maths'
import { ReadonlyQuat } from './_quat'

export type vec4 = IndexedCollection;

export type ReadonlyVec4 = IndexedCollection;

/**
 * 4 Dimensional Vector
 * @module vec4
 */

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */
export function create(): vec4 {
	const out = new Float32Array(4)
	if (glMatrix.ARRAY_TYPE != glMatrix.ArrayTypeEnum.Float32ArrayT) {
		out[0] = 0
		out[1] = 0
		out[2] = 0
		out[3] = 0
	}
	return out
}

/**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param {ReadonlyVec4} a vector to clone
 * @returns {vec4} a new 4D vector
 */
export function clone(a: ReadonlyVec4): vec4 {
	const out = new Float32Array(4)
	out[0] = a[0]
	out[1] = a[1]
	out[2] = a[2]
	out[3] = a[3]
	return out
}

/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */
export function fromValues(x: f32, y: f32, z: f32, w: f32): vec4 {
	const out = new Float32Array(4)
	out[0] = x
	out[1] = y
	out[2] = z
	out[3] = w
	return out
}

/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the source vector
 * @returns {vec4} out
 */
export function copy(out: vec4, a: ReadonlyVec4): vec4 {
	out[0] = a[0]
	out[1] = a[1]
	out[2] = a[2]
	out[3] = a[3]
	return out
}

/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */
export function set(out: vec4, x: f32, y: f32, z: f32, w: f32): vec4 {
	out[0] = x
	out[1] = y
	out[2] = z
	out[3] = w
	return out
}

/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */
export function add(out: vec4, a: ReadonlyVec4, b: ReadonlyVec4): vec4 {
	out[0] = a[0] + b[0]
	out[1] = a[1] + b[1]
	out[2] = a[2] + b[2]
	out[3] = a[3] + b[3]
	return out
}

/**
 * Subtracts vector b from vector a
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */
export function subtract(out: vec4, a: ReadonlyVec4, b: ReadonlyVec4): vec4 {
	out[0] = a[0] - b[0]
	out[1] = a[1] - b[1]
	out[2] = a[2] - b[2]
	out[3] = a[3] - b[3]
	return out
}

/**
 * Multiplies two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */
export function multiply(out: vec4, a: ReadonlyVec4, b: ReadonlyVec4): vec4 {
	out[0] = a[0] * b[0]
	out[1] = a[1] * b[1]
	out[2] = a[2] * b[2]
	out[3] = a[3] * b[3]
	return out
}

/**
 * Divides two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */
export function divide(out: vec4, a: ReadonlyVec4, b: ReadonlyVec4): vec4 {
	out[0] = a[0] / b[0]
	out[1] = a[1] / b[1]
	out[2] = a[2] / b[2]
	out[3] = a[3] / b[3]
	return out
}

/**
 * Mathf.ceil the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to ceil
 * @returns {vec4} out
 */
export function ceil(out: vec4, a: ReadonlyVec4): vec4 {
	out[0] = Mathf.ceil(a[0])
	out[1] = Mathf.ceil(a[1])
	out[2] = Mathf.ceil(a[2])
	out[3] = Mathf.ceil(a[3])
	return out
}

/**
 * Mathf.floor the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to floor
 * @returns {vec4} out
 */
export function floor(out: vec4, a: ReadonlyVec4): vec4 {
	out[0] = Mathf.floor(a[0])
	out[1] = Mathf.floor(a[1])
	out[2] = Mathf.floor(a[2])
	out[3] = Mathf.floor(a[3])
	return out
}

/**
 * Returns the minimum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */
export function min(out: vec4, a: ReadonlyVec4, b: ReadonlyVec4): vec4 {
	out[0] = Mathf.min(a[0], b[0])
	out[1] = Mathf.min(a[1], b[1])
	out[2] = Mathf.min(a[2], b[2])
	out[3] = Mathf.min(a[3], b[3])
	return out
}

/**
 * Returns the maximum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */
export function max(out: vec4, a: ReadonlyVec4, b: ReadonlyVec4): vec4 {
	out[0] = Mathf.max(a[0], b[0])
	out[1] = Mathf.max(a[1], b[1])
	out[2] = Mathf.max(a[2], b[2])
	out[3] = Mathf.max(a[3], b[3])
	return out
}

/**
 * Mathf.round the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to round
 * @returns {vec4} out
 */
export function round(out: vec4, a: ReadonlyVec4): vec4 {
	out[0] = Mathf.round(a[0])
	out[1] = Mathf.round(a[1])
	out[2] = Mathf.round(a[2])
	out[3] = Mathf.round(a[3])
	return out
}

/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */
export function scale(out: vec4, a: ReadonlyVec4, b: f32): vec4 {
	out[0] = a[0] * b
	out[1] = a[1] * b
	out[2] = a[2] * b
	out[3] = a[3] * b
	return out
}

/**
 * Adds two vec4's after scaling the second operand by a scalar value
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec4} out
 */
export function scaleAndAdd(out: vec4, a: ReadonlyVec4, b: ReadonlyVec4, scale: f32): vec4 {
	out[0] = a[0] + b[0] * scale
	out[1] = a[1] + b[1] * scale
	out[2] = a[2] + b[2] * scale
	out[3] = a[3] + b[3] * scale
	return out
}

/**
 * Calculates the euclidian distance between two vec4's
 *
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {Number} distance between a and b
 */
export function distance(a: ReadonlyVec4, b: ReadonlyVec4): f32 {
	const x = b[0] - a[0]
	const y = b[1] - a[1]
	const z = b[2] - a[2]
	const w = b[3] - a[3]
	return Maths.hypot4(x, y, z, w)
}

/**
 * Calculates the squared euclidian distance between two vec4's
 *
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {Number} squared distance between a and b
 */
export function squaredDistance(a: ReadonlyVec4, b: ReadonlyVec4): f32 {
	const x = b[0] - a[0]
	const y = b[1] - a[1]
	const z = b[2] - a[2]
	const w = b[3] - a[3]
	return x * x + y * y + z * z + w * w
}

/**
 * Calculates the length of a vec4
 *
 * @param {ReadonlyVec4} a vector to calculate length of
 * @returns {Number} length of a
 */
export function length(a: ReadonlyVec4): f32 {
	const x = a[0]
	const y = a[1]
	const z = a[2]
	const w = a[3]
	return Maths.hypot4(x, y, z, w)
}

/**
 * Calculates the squared length of a vec4
 *
 * @param {ReadonlyVec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
export function squaredLength(a: ReadonlyVec4): f32 {
	const x = a[0]
	const y = a[1]
	const z = a[2]
	const w = a[3]
	return x * x + y * y + z * z + w * w
}

/**
 * Negates the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to negate
 * @returns {vec4} out
 */
export function negate(out: vec4, a: ReadonlyVec4): vec4 {
	out[0] = -a[0]
	out[1] = -a[1]
	out[2] = -a[2]
	out[3] = -a[3]
	return out
}

/**
 * Returns the inverse of the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to invert
 * @returns {vec4} out
 */
export function inverse(out: vec4, a: ReadonlyVec4): vec4 {
	out[0] = 1.0 / a[0]
	out[1] = 1.0 / a[1]
	out[2] = 1.0 / a[2]
	out[3] = 1.0 / a[3]
	return out
}

/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to normalize
 * @returns {vec4} out
 */
export function normalize(out: vec4, a: ReadonlyVec4): vec4 {
	const x = a[0]
	const y = a[1]
	const z = a[2]
	const w = a[3]
	let len = x * x + y * y + z * z + w * w
	if (len > 0) {
		len = 1 / Mathf.sqrt(len)
	}
	out[0] = x * len
	out[1] = y * len
	out[2] = z * len
	out[3] = w * len
	return out
}

/**
 * Calculates the dot product of two vec4's
 *
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {Number} dot product of a and b
 */
export function dot(a: ReadonlyVec4, b: ReadonlyVec4): f32 {
	return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3]
}

/**
 * Returns the cross-product of three vectors in a 4-dimensional space
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} u the first vector
 * @param {ReadonlyVec4} v the second vector
 * @param {ReadonlyVec4} w the third vector
 * @returns {vec4} out
 */
export function cross(out: vec4, u: ReadonlyVec4, v: ReadonlyVec4, w: ReadonlyVec4): vec4 {
	const A = v[0] * w[1] - v[1] * w[0],
		B = v[0] * w[2] - v[2] * w[0],
		C = v[0] * w[3] - v[3] * w[0],
		D = v[1] * w[2] - v[2] * w[1],
		E = v[1] * w[3] - v[3] * w[1],
		F = v[2] * w[3] - v[3] * w[2]
	const G = u[0]
	const H = u[1]
	const I = u[2]
	const J = u[3]

	out[0] = H * F - I * E + J * D
	out[1] = -(G * F) + I * C - J * B
	out[2] = G * E - H * C + J * A
	out[3] = -(G * D) + H * B - I * A

	return out
}

/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec4} out
 */
export function lerp(out: vec4, a: ReadonlyVec4, b: ReadonlyVec4, t: f32): vec4 {
	const ax = a[0]
	const ay = a[1]
	const az = a[2]
	const aw = a[3]
	out[0] = ax + t * (b[0] - ax)
	out[1] = ay + t * (b[1] - ay)
	out[2] = az + t * (b[2] - az)
	out[3] = aw + t * (b[3] - aw)
	return out
}

/**
 * Generates a random vector with the given scale
 *
 * @param {vec4} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If omitted, a unit vector will be returned
 * @returns {vec4} out
 */
export function random(out: vec4, scale: f32): vec4 {
	scale = scale || 1.0

	// Marsaglia, George. Choosing a Point from the Surface of a
	// Sphere. Ann. Mathf. Statist. 43 (1972), no. 2, 645--646.
	// http://projecteuclid.org/euclid.aoms/1177692644;
	let v1: f32, v2: f32, v3: f32, v4: f32
	let s1: f32, s2: f32
	do {
		v1 = glMatrix.RANDOM() * 2 - 1
		v2 = glMatrix.RANDOM() * 2 - 1
		s1 = v1 * v1 + v2 * v2
	} while (s1 >= 1)
	do {
		v3 = glMatrix.RANDOM() * 2 - 1
		v4 = glMatrix.RANDOM() * 2 - 1
		s2 = v3 * v3 + v4 * v4
	} while (s2 >= 1)

	const d = Mathf.sqrt((1 - s1) / s2)
	out[0] = scale * v1
	out[1] = scale * v2
	out[2] = scale * v3 * d
	out[3] = scale * v4 * d
	return out
}

/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the vector to transform
 * @param {ReadonlyMat4} m matrix to transform with
 * @returns {vec4} out
 */
export function transformMat4(out: vec4, a: ReadonlyVec4, m: ReadonlyVec4): vec4 {
	const x = a[0],
		y = a[1],
		z = a[2],
		w = a[3]
	out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w
	out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w
	out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w
	out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w
	return out
}

/**
 * Transforms the vec4 with a quat
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the vector to transform
 * @param {ReadonlyQuat} q quaternion to transform with
 * @returns {vec4} out
 */
export function transformQuat(out: vec4, a: ReadonlyVec4, q: ReadonlyQuat): vec4 {
	const x = a[0],
		y = a[1],
		z = a[2]
	const qx = q[0],
		qy = q[1],
		qz = q[2],
		qw = q[3]

	// calculate quat * vec
	const ix = qw * x + qy * z - qz * y
	const iy = qw * y + qz * x - qx * z
	const iz = qw * z + qx * y - qy * x
	const iw = -qx * x - qy * y - qz * z

	// calculate result * inverse quat
	out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy
	out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz
	out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx
	out[3] = a[3]
	return out
}

/**
 * Set the components of a vec4 to zero
 *
 * @param {vec4} out the receiving vector
 * @returns {vec4} out
 */
export function zero(out: vec4): vec4 {
	out[0] = 0.0
	out[1] = 0.0
	out[2] = 0.0
	out[3] = 0.0
	return out
}

/**
 * Returns a string representation of a vector
 *
 * @param {ReadonlyVec4} a vector to represent as a string
 * @returns {String} string representation of the vector
 */
export function str(a: ReadonlyVec4): string {
	return 'vec4(' + a[0].toString() + ', ' + a[1].toString() + ', ' + a[2].toString() + ', ' + a[3].toString() + ')'
}

/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyVec4} a The first vector.
 * @param {ReadonlyVec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
export function exactEquals(a: ReadonlyVec4, b: ReadonlyVec4): bool {
	return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3]
}

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {ReadonlyVec4} a The first vector.
 * @param {ReadonlyVec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
export function equals(a: ReadonlyVec4, b: ReadonlyVec4): bool {
	const a0 = a[0],
		a1 = a[1],
		a2 = a[2],
		a3 = a[3]
	const b0 = b[0],
		b1 = b[1],
		b2 = b[2],
		b3 = b[3]
	return (
		Mathf.abs(a0 - b0) <=
      glMatrix.EPSILON * Maths.max(1.0, Mathf.abs(a0), Mathf.abs(b0)) &&
    Mathf.abs(a1 - b1) <=
      glMatrix.EPSILON * Maths.max(1.0, Mathf.abs(a1), Mathf.abs(b1)) &&
    Mathf.abs(a2 - b2) <=
      glMatrix.EPSILON * Maths.max(1.0, Mathf.abs(a2), Mathf.abs(b2)) &&
    Mathf.abs(a3 - b3) <=
      glMatrix.EPSILON * Maths.max(1.0, Mathf.abs(a3), Mathf.abs(b3))
	)
}

/**
 * Alias for {@link vec4.subtract}
 * @function
 */
export const sub = subtract

/**
 * Alias for {@link vec4.multiply}
 * @function
 */
export const mul = multiply

/**
 * Alias for {@link vec4.divide}
 * @function
 */
export const div = divide

/**
 * Alias for {@link vec4.distance}
 * @function
 */
export const dist = distance

/**
 * Alias for {@link vec4.squaredDistance}
 * @function
 */
export const sqrDist = squaredDistance

/**
 * Alias for {@link vec4.length}
 * @function
 */
export const len = length

/**
 * Alias for {@link vec4.squaredLength}
 * @function
 */
export const sqrLen = squaredLength

/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */