import { Maths } from './maths'

/**
 * Common utilities
 * @module glMatrix
 */

// Configuration Constants
export const EPSILON = 0.000001
export enum ArrayTypeEnum {
  Float32ArrayT = idof<Float32Array>(),
  ArrayF32T = idof<Array<f32>>(),
}
export let ARRAY_TYPE = ArrayTypeEnum.Float32ArrayT
export const RANDOM = Mathf.random
export const ANGLE_ORDER = 'zyx'

/**
 * Sets the type of array used when creating new vectors and matrices
 *
 * @param {Number} id Array type, such as Float32Array or Array
 */
export function setMatrixArrayType(id: i32): void {
	ARRAY_TYPE = id
}

const degree: f32 = Mathf.PI / 180

/**
 * Convert Degree To Radian
 *
 * @param {Number} a Angle in Degrees
 */
export function toRadian(a: f32): f32 {
	return a * degree
}

/**
 * Tests whether or not the arguments have approximately the same value, within an absolute
 * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less
 * than or equal to 1.0, and a relative tolerance is used for larger values)
 *
 * @param {Number} a The first number to test.
 * @param {Number} b The second number to test.
 * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
 */
export function equals(a: f32, b: f32): bool {
	return Mathf.abs(a - b) <= EPSILON * Maths.max(1.0, Mathf.abs(a), Mathf.abs(b))
}
