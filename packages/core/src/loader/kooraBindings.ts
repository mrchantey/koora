import * as kooraBindings from '../_wasm/debug'
export type KooraExports = typeof kooraBindings.__AdaptedExports
export type KooraBindings = typeof kooraBindings
export type DefaultWorldOptions = Parameters<typeof kooraBindings.__AdaptedExports.defaultWorld>[0]
export {
	kooraBindings
}