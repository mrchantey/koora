import 'jest-extended'

import { _Vec2 as Vec2 }  from '../../packages/play/src/primitives/vec2/_Vec2'
import { _Vec3 as Vec3 } from '../../packages/play/src/primitives/vec3/_Vec3'
import { _Quat as Quat } from '../../packages/play/src/primitives/quat/_Quat'

declare global {
namespace jest {

	interface Matchers<R> {
		toBeAngle: (expected: number) => CustomMatcherResult
		toBeQuat: (expected: Quat) => CustomMatcherResult		
		toBeVec3: (expected: Vec3) => CustomMatcherResult		
		toBeVec2: (expected: Vec2) => CustomMatcherResult
		toBeCloseToVec3: (expected: Vec3, precision?: number) => CustomMatcherResult		
		toBeCloseToVec2: (expected: Vec2, precision?: number) => CustomMatcherResult
		toBeCloseToQuat: (expected: Quat) => CustomMatcherResult		
	}
}
}