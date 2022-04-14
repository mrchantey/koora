/// <reference path="../node_modules/assemblyscript/std/portable/index.d.ts" />

declare type IndexedCollection = Float32Array;

// prettier-ignore
declare type mat2 =
  IndexedCollection;

// prettier-ignore
declare type mat2d =
  IndexedCollection;

// prettier-ignore
declare type mat3 =
  IndexedCollection;

// prettier-ignore
declare type mat4 =
  IndexedCollection;

declare type quat = IndexedCollection;

// prettier-ignore
declare type quat2 =
  IndexedCollection;

// prettier-ignore
declare type quat4 =
  IndexedCollection;

declare type vec2 = IndexedCollection;
declare type vec3 = IndexedCollection;
declare type vec4 = IndexedCollection;

// prettier-ignore
declare type ReadonlyMat2 =
  IndexedCollection;

// prettier-ignore
declare type ReadonlyMat2d =
  IndexedCollection;

// prettier-ignore
declare type ReadonlyMat3 =
  IndexedCollection;

// prettier-ignore
declare type ReadonlyMat4 =
  IndexedCollection;

// prettier-ignore
declare type ReadonlyQuat =
  IndexedCollection;

// prettier-ignore
declare type ReadonlyQuat2 =
  IndexedCollection;

declare type ReadonlyVec2 = IndexedCollection;
declare type ReadonlyVec3 = IndexedCollection;
declare type ReadonlyVec4 =
  IndexedCollection;

declare class Fov {
  upDegrees: f32;
  downDegrees: f32;
  leftDegrees: f32;
  rightDegrees: f32;
  [key: string]: f32;
}
