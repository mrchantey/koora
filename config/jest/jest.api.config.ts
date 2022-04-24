import defaultConfig from './jest.config'
import { ignorePatterns,globalJestIgnores, JestConfig } from './utility'


const config: JestConfig = {
	...defaultConfig,
	...ignorePatterns(globalJestIgnores.filter(p => p !== '.api.test'))
}
// @ts-ignore definately not undefined
config.globals.WEBPACK_MODE = 'dev'
config.testEnvironment = 'node'
export default config