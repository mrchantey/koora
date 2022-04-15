declare namespace __AdaptedExports {
  /**
   * src-as/factories/mainFactories/start
   */
  export function start(): void;
  /**
   * src-as/factories/mainFactories/update
   */
  export function update(): void;
  /**
   * src-as/factories/mainFactories/defaultWorld
   * @returns `src-as/base/World/World`
   */
  export function defaultWorld(): __Internref71;
  /**
   * src-as/factories/mainFactories/unlitRotatingCube
   */
  export function unlitRotatingCube(): void;
  /**
   * src-as/factories/mainFactories/handleResize
   * @param width `u32`
   * @param height `u32`
   */
  export function handleResize(width: number, height: number): void;
}
/** src-as/base/World/World */
declare class __Internref71 extends Number {
  private __nominal71: symbol;
}
/** Instantiates the compiled WebAssembly module with the given imports. */
export declare function instantiate(module: WebAssembly.Module, imports: {
  env: unknown,
  gl: unknown,
  host: unknown,
}): Promise<typeof __AdaptedExports>;
