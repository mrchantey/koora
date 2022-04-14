import { EPSILON, TAU, PI } from './constants'
import { Vector2 } from './Vector2'


export function randomBetween (a: f32, b: f32): f32 {
	return a + (b - a) * Mathf.random()
}
export function clamp (val: f32, min: f32, max: f32): f32{
	return Mathf.min(Mathf.max(val, min), max) }
	
export function polarToCartesian (theta: f32, radius: f32 = 1, target: Vector2 = new Vector2()): Vector2 {
	target.x = Mathf.cos(theta) * radius
	target.y = Mathf.sin(theta) * radius
	return target
}	

export function sum(val: i32[]): i32{
	let sum: i32 = 0
	for (let i = 0; i < val.length; i++){
		sum += val[i]
	}
	return sum
}

//https://stackoverflow.com/questions/4467539/javascript-modulo-gives-a-negative-result-for-negative-f32s
export function moduloWrap (val: f32, modulo: f32): f32{
	return ((val % modulo) + modulo) % modulo }
	
export function isAlmostEqual (a: f32, b: f32, delta: f32 = EPSILON): boolean {
	return Mathf.abs(b - a) < delta }
	
export function normalUnsignedToSigned (val: f32): f32{
	return val * 2 - 1 } 
export function normalSignedToUnsigned (val: f32): f32{
	return val * 0.5 + 1 }
		
export function lerp (a: f32, b: f32, t: f32): f32{
	//@ts-ignore
	return a + (b - a) * t 
}
		
export function randomBool (): bool{
	return Mathf.random() >= 0.5 
}
	
export function roundToNearest (val: f32, interval: f32 = 1): f32{
	return interval * Mathf.round(val / interval) 
}
	
export function lerpAngle (a: f32,  b: f32,  t: f32): f32 {
	let delta = moduloWrap((b - a), TAU)
	if (delta > PI)
		delta -= TAU
	return a + delta * t
}
export function signedToUnsignedTheta (theta: f32): f32{
	return (theta + TAU) % TAU }
		
//https://stackoverflow.com/questions/1878907/how-can-i-find-the-difference-between-two-angles
export function unsignedMod (a: f32, n: f32): f32 {
	return a - Mathf.floor(a / n) * n 
}
export function angleBetween (a: f32, b: f32): f32{
	return unsignedMod((a - b + PI), TAU) - PI 
}
export function unsignedAngleBetween (a: f32, b: f32): f32{
	return Mathf.abs(angleBetween(a, b)) 
}

export function max3(a: f32, b: f32, c: f32): f32{
	const bc = Mathf.max(b, c)
	return Mathf.max(a, bc)
}
export function min3(a: f32, b: f32, c: f32): f32{
	const bc = Mathf.min(b, c)
	return Mathf.min(a, bc)
}