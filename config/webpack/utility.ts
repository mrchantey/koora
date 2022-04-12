import * as fs from 'fs'
import * as path from 'path'
import { CleanArgs, DirtyArgs } from './types'

export const parseArgs = (args: DirtyArgs): CleanArgs => {
	parseBooleans(args)
	if (args.app){
		args.entry ??= `src/app/entry/${args.app}.ts`
		args.out ??= `dist/${args.app}`
		args.title = args.app
	}
	args.app ??= false
	args.entry ??= getEntryPoint()
	args.html ??= '../../config/webpack/index.html'
	args.favicon ??= 'src/assets/favicon.ico'
	if (!args.favicon || !fs.existsSync(args.favicon))
		args.favicon = false
	args.out ??= 'dist'
	args.title ??= pkgConfig.displayName || 'Web App'
	args.description ??= pkgConfig.description || 'An amazing web app.'
	args.prod ??= false
	args.analyzeBundle ??= false
	args.analyzeCircular ??= true
	args.https ??= pkgConfig.httpsDev || false
	args.host ??= 'localhost'
	return {
		...args,
		entryPath: path.join(rootDir, args.entry),
		templatePath: path.join(rootDir, args.html),
		outputPath: path.join(rootDir, args.out),
		faviconPath: args.favicon
			? path.join(rootDir, args.favicon)
			: false,
	} as CleanArgs
}


const rootDir = process.cwd()
const repoRootDir = path.join(rootDir, '../../')

const pkgPath = path.join(rootDir, 'config', 'koorabel.config.json')
const pkgConfig = fs.existsSync(pkgPath) 
	? require(pkgPath)
	: {}

// const srcDir = path.join(rootDir, 'src')
const tsconfigPath = path.join(repoRootDir, 'config', 'typescript', 'tsconfig.dom.json')

const MB = 1048576
//default for both is ~230kb
const SIZE_LIMIT_MAIN = 1 * MB
const SIZE_LIMIT_ASSET = 5 * MB


const parseBooleans = obj => Object.entries(obj)
	.forEach(([key, value]) => {
		if (value === 'false')
			obj[key] = false
		else if (value === 'true')
			obj[key] = true
	})


const getEntryPoint = () => {
	const paths = [
		'src/entry.ts',
		'src/entry/main.ts',
	]
	const entry = paths.find(p => 
		fs.existsSync(`${rootDir}/${p}`))
	if (!entry)
		throw new Error(`\n\nNo entry file found, tried: \n${paths.join('\n')}\n`)
	return entry
}


module.exports = {
	rootDir,
	repoRootDir,
	parseArgs,
	tsconfigPath,
	SIZE_LIMIT_ASSET,
	SIZE_LIMIT_MAIN
}