import { Command } from 'commander'
import { readDirRecursive, watchDirectoryChanges } from '@chantey/core-fs'
import path from 'path'
import fs from 'fs-extra'
import { makeProxyFromText } from './makeProxy'
export const appendMakeProxyCommand = (cmd: Command) =>
	cmd.addCommand(new Command('make-proxies')
		.option('-w, --watch', 'continuously watch the file', false)
		.option('-i, --include [include...]', 'root level paths to run', ['src'] as any)
		//@ts-ignore dunno
		.action(execute))

interface Args{
	watch: boolean
	include: string[]
}

const execute = (args: Args) => {
	if (args.watch)
		return watchDirectoryChanges(process.cwd(), 
			() => run(args), true)
	else 
		return run(args)
}


const run = (args: Args) => {
	for (const relativeDir of args.include) {
		const parentDir = path.resolve(process.cwd(), relativeDir)
		if (!fs.pathExistsSync(parentDir))
			throw new Error(`path not found: ${parentDir}`)
		const saveDir = path.resolve(parentDir, `../${path.basename(relativeDir)}Proxies`)
		if (fs.pathExistsSync(saveDir))
			fs.rmSync(saveDir, { force: true, recursive: true })
		fs.mkdirSync(saveDir)
		for (const filePath of readDirRecursive({ parentDir, includeFiles: true, includeDirs: false })){
			if (filePath.includes('index.ts'))
				continue
			const text = fs.readFileSync(path.resolve(parentDir, filePath)).toString()
			const proxyText = makeProxyFromText(text, path.basename(parentDir))
			const fileSaveDir = path.resolve(saveDir, path.basename(filePath).replace('.ts', 'Proxy.ts'))
			fs.writeFileSync(fileSaveDir, proxyText)
		}
	}
}