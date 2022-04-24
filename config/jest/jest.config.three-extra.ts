import domConfig from './jest.dom.config'
import { JestConfig } from './utility'

const jestBabylonConfig: JestConfig = {
	...domConfig,
	//SLOW! for jest to include js es6 modules
	preset: 'ts-jest/presets/js-with-ts-esm',
	transformIgnorePatterns: ['/node_modules/(?!(three/examples/jsm)/)'],
}
export default jestBabylonConfig
