


import fs from 'fs-extra'

// console.dir(files)

// for(const file of files)

function copyBuildToSite(){
	const srcBuildDir = './dist'
	const dstBuildDir = '../site/static/wasm'
	fs.rmSync(dstBuildDir, { recursive: true, force: true })
	fs.copySync(srcBuildDir, dstBuildDir)
}
function copyScriptTagsToSite(){
	const async = false
	const files = fs.readdirSync('./dist')
	const prefixes = ['main', 'runtime', 'vendor-sync']
	const scripts = files
		.filter(file => prefixes.some(p => file.includes(p)))
		.map(file => ({ src: `/wasm/${file}`, async }))
	const dstHeader = '../site/config/docusaurus/wasmScripts.json'
	fs.writeFileSync(dstHeader, JSON.stringify({ scripts }, null, 2))
}

function copyHostBindingsToSrc(){
	const srcBindings = './dist/debug.js'
	const dstBindings = './src/_wasm/debug.js'
	
	const srcTypes = './dist/debug.d.ts'
	const dstTypes = './src/_wasm/debug.d.ts'
	fs.copySync(srcBindings, dstBindings)
	fs.copySync(srcTypes, dstTypes)
}


copyBuildToSite()
copyScriptTagsToSite()
copyHostBindingsToSrc()