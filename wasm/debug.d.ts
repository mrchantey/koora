declare namespace __AdaptedExports {
  /**
   * src-as/exports/camera/createDefaultCamera
   * @param keyboardControls `bool`
   * @param mouseControls `bool`
   * @returns `src-as/base/Entity/Entity`
   */
  export function createDefaultCamera(keyboardControls?: boolean, mouseControls?: boolean): __Internref79;
  /**
   * src-as/exports/camera/removeAllCameras
   */
  export function removeAllCameras(): void;
  /** src-as/rendering/shader/unlit/unlitVertexColors/unlitVertexColorShader */
  export const unlitVertexColorShader: {
    /** @type `src-as/rendering/shader/Shader/Shader` */
    get value(): __Internref63
  };
  /** src-as/rendering/shader/lit/litShader/litShader */
  export const litShader: {
    /** @type `src-as/rendering/shader/Shader/Shader` */
    get value(): __Internref63
  };
  /**
   * src-as/exports/debug/createDebugGizmos
   */
  export function createDebugGizmos(): void;
  /**
   * src-as/exports/defaultWorld/main
   */
  export function main(): void;
  /**
   * src-as/exports/defaultWorld/update
   */
  export function update(): void;
  /**
   * src-as/exports/defaultWorld/defaultWorld
   * @param options `src-as/exports/defaultWorld/DefaultWorldOptions`
   * @returns `src-as/base/World/World`
   */
  export function defaultWorld(options: __Record124<undefined>): __Internref78;
  /**
   * src-as/exports/demos/rotatingCube
   * @param _shader `src-as/rendering/shader/Shader/Shader | null`
   * @returns `src-as/base/Entity/Entity`
   */
  export function rotatingCube(_shader: __Internref63 | null): __Internref79;
  /**
   * src-as/exports/input/handleMouseDown
   */
  export function handleMouseDown(): void;
  /**
   * src-as/exports/input/handleMouseUp
   */
  export function handleMouseUp(): void;
  /**
   * src-as/exports/input/handleMouseWheel
   * @param x `f32`
   * @param y `f32`
   */
  export function handleMouseWheel(x: number, y: number): void;
  /**
   * src-as/exports/input/handleMouseMove
   * @param x `f32`
   * @param y `f32`
   */
  export function handleMouseMove(x: number, y: number): void;
  /**
   * src-as/exports/input/handleKeyDown
   * @param key `i32`
   */
  export function handleKeyDown(key: number): void;
  /**
   * src-as/exports/input/handleKeyUp
   * @param key `i32`
   */
  export function handleKeyUp(key: number): void;
  /**
   * src-as/exports/light/createDefaultLights
   */
  export function createDefaultLights(): void;
  /**
   * src-as/exports/render/handleResize
   * @param width `u32`
   * @param height `u32`
   */
  export function handleResize(width: number, height: number): void;
}
/** src-as/base/Entity/Entity */
declare class __Internref79 extends Number {
  private __nominal79: symbol;
}
/** src-as/rendering/shader/Shader/Shader */
declare class __Internref63 extends Number {
  private __nominal63: symbol;
}
/** src-as/exports/defaultWorld/DefaultWorldOptions */
declare interface __Record124<TOmittable> {
  /** @type `bool` */
  camera: boolean | TOmittable;
  /** @type `bool` */
  cameraKeyboardController: boolean | TOmittable;
  /** @type `bool` */
  cameraMouseController: boolean | TOmittable;
  /** @type `bool` */
  lights: boolean | TOmittable;
  /** @type `bool` */
  gizmos: boolean | TOmittable;
  /** @type `bool` */
  helloCube: boolean | TOmittable;
}
/** src-as/base/World/World */
declare class __Internref78 extends Number {
  private __nominal78: symbol;
}
/** Instantiates the compiled WebAssembly module with the given imports. */
export declare function instantiate(module: WebAssembly.Module, imports: {
  env: unknown,
  gl: unknown,
  host: unknown,
}): Promise<typeof __AdaptedExports>;
