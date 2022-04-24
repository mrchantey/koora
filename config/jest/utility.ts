import fs from 'fs'
import path from 'path'
import { pathsToModuleNameMapper } from 'ts-jest'
import type { Config } from '@jest/types'
import type { InitialOptionsTsJest } from 'ts-jest'

const jsonminify = require('jsonminify')

export const repoRoot = '<rootDir>/../../'

export const setJSDom = (config: JestConfig): JestConfig => {
	config.testEnvironment = 'jsdom'
	//@ts-ignore definately not undefined
	config.globals['JSDOM_ENABLED'] = true
	return config
}

export type JestConfig = Config.InitialOptions | InitialOptionsTsJest


const getLocalModuleNames = () => {
	const pathName = path.join(__dirname, '../typescript/tsconfig.json')
	const file = fs.readFileSync(pathName).toString()
	const tsconfigStr = jsonminify(file)
	const tsconfig = JSON.parse(tsconfigStr)
	return pathsToModuleNameMapper(tsconfig.compilerOptions.paths, { prefix: repoRoot })
}

export const localModuleNames = getLocalModuleNames()

export const globalJestIgnores = [
	'/node_modules/',
	'.cy.test',
	'.api.test',
]

export const ignorePatterns = (patterns: string[]) => ({
	watchPathIgnorePatterns: [...patterns],
	modulePathIgnorePatterns: [...patterns],
	testPathIgnorePatterns: [...patterns],
	coveragePathIgnorePatterns: [...patterns],
})
//we need @chantey/* to use the same peer dependencies
// const packageJson = require('../../package.json')
// const aliases = Object.keys(packageJson.peerDependencies)
// 	.reduce((acc,dep) => ({ 
// 		...acc,
// 		[`${dep}`]: `<rootDir>/node_modules/${dep}`,
// 		[`^${dep}(.*)$`]: `<rootDir>/node_modules/${dep}$1`,

// 	}),{})
// console.dir(aliases)
