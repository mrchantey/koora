#!/usr/bin/env node
import { Command } from 'commander'
import { appendMakeProxyCommand } from './makeProxy'


const helpMessage = `
welcome to koora ecs scripts!
`

export const runCLI = (args = process.argv) => {
	const cmd = new Command('main')
		.version('0.0.1', '-v -V --version')
		.on('--help', () => console.log(helpMessage))
	appendMakeProxyCommand(cmd)
	cmd.parse(args)
}

if (require.main === module)
	runCLI()
