


import fs from 'fs-extra'

// console.dir(files)

// for(const file of files)
const srcBuildDir = './dist'
const dstBuildDir = '../site/static/wasm'
fs.rmSync(dstBuildDir, { recursive: true, force: true })
fs.copySync(srcBuildDir, dstBuildDir)



const defer = false


const deferTag = defer ? 'defer' : ''
const files = fs.readdirSync('./dist')
const prefixes = ['main', 'runtime', 'vendor-sync']
const scripts = files
	.filter(file => prefixes.some(p => file.includes(p)))
	.map(file => ({ src: `/wasm/${file}` }))
	// .map(file => `<script ${deferTag} src="/wasm/${file}"></script>`)
	// .join('\n\t\t')
// console.dir(scriptTags)
// const headerText = 
// `
// import React from 'react'
// import Head from '@docusaurus/Head'

// export const WasmScripts = () =>
// 	<Head>
// 		${scriptTags}
// 	</Head>
// `



// const dstHeader = '../site/src/wasm/wasmScripts.tsx'
const dstHeader = '../site/config/docusaurus/wasmScripts.json'
fs.writeFileSync(dstHeader, JSON.stringify({ scripts }, null, 2))