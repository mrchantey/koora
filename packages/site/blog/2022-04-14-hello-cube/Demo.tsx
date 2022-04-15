import React from 'react'
import { Canvas } from '../../src'


export const Demo = () => <Canvas
	onMount={({ wasmExports }) => {
		wasmExports.rotatingCube(wasmExports.litShader.value)
	}}/>