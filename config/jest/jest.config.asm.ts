import baseConfig from './jest.config'
import { JestConfig, repoRoot } from './utility'

const jestAsmConfig: JestConfig = {
	...baseConfig,
	//SLOW! for jest to include js es6 modules
	preset: 'ts-jest/presets/js-with-ts-esm',
	transformIgnorePatterns: ['/node_modules/(?!(@assemblyscript/loader)/)']
}
//@ts-ignore
jestAsmConfig.globals['ts-jest'].tsconfig = repoRoot + 'config/jest/tsconfig.asm.json'
export default jestAsmConfig
