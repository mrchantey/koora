import React from 'react'
import { Canvas } from '../../src'


export const Demo = () => <Canvas
	options={{
		defaultWorld: {
			gizmos: false
		}
	}}
	onMount={({ wasmExports }) => {
		wasmExports.rotatingCube(wasmExports.litShader.value)
	}}/>