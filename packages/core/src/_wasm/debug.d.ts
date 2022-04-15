declare namespace __AdaptedExports {
  /**
   * src-as/exports/mainFactories/update
   */
  export function update(): void;
  /**
   * src-as/exports/mainFactories/defaultWorld
   * @returns `src-as/base/World/World`
   */
  export function defaultWorld(): __Internref71;
  /**
   * src-as/exports/mainFactories/handleResize
   * @param width `u32`
   * @param height `u32`
   */
  export function handleResize(width: number, height: number): void;
  /**
   * src-as/exports/cameraFactories/defaultCamera
   * @returns `src-as/base/Entity/Entity`
   */
  export function defaultCamera(): __Internref72;
  /**
   * src-as/exports/cameraFactories/removeAllCameras
   */
  export function removeAllCameras(): void;
  /**
   * src-as/exports/demos/rotatingCube
   * @param _shader `src-as/rendering/shader/Shader/Shader | null`
   * @returns `src-as/base/Entity/Entity`
   */
  export function rotatingCube(_shader: __Internref56 | null): __Internref72;
  /** src-as/rendering/shader/unlit/unlitVertexColors/unlitVertexColorShader */
  export const unlitVertexColorShader: {
    /** @type `src-as/rendering/shader/Shader/Shader` */
    get value(): __Internref56
  };
  /** src-as/rendering/shader/lit/litShader/litShader */
  export const litShader: {
    /** @type `src-as/rendering/shader/Shader/Shader` */
    get value(): __Internref56
  };
}
/** src-as/base/World/World */
declare class __Internref71 extends Number {
  private __nominal71: symbol;
}
/** src-as/base/Entity/Entity */
declare class __Internref72 extends Number {
  private __nominal72: symbol;
}
/** src-as/rendering/shader/Shader/Shader */
declare class __Internref56 extends Number {
  private __nominal56: symbol;
}
/** Instantiates the compiled WebAssembly module with the given imports. */
export declare function instantiate(module: WebAssembly.Module, imports: {
  env: unknown,
  gl: unknown,
  host: unknown,
}): Promise<typeof __AdaptedExports>;
