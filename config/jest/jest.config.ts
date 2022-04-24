import { 
	globalJestIgnores, ignorePatterns, 
	JestConfig, localModuleNames, 
	repoRoot } from './utility'

const config: JestConfig = {
	rootDir: process.cwd(),
	// allow absolute imports from root
	modulePaths: [repoRoot, '<rootDir>/'],
	//cos we nested, point to root
	roots: [
		'<rootDir>/src/', 
		'<rootDir>/test/jest'],
	...ignorePatterns(globalJestIgnores),
	//use typescript
	preset: 'ts-jest',
	//allow use .d.ts as modules
	// moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
	//testing node apps
	testEnvironment: 'node',
	moduleNameMapper: {
		//order is important, first match only
		'three/examples/jsm/': repoRoot + 'config/jest/mockUndefined.js',
		'firebaseui': repoRoot + 'config/jest/mockUndefined.js',
		'\\.(ico|jpg|jpeg|png|gif|glb|gltf|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|txt)$': repoRoot + 'config/jest/mockFile.js',
		'\\.(css|less)$': repoRoot + 'config/jest/mockStyle.js',
		...localModuleNames,
		// ...aliases
	},
	//include jest-extended
	setupFilesAfterEnv: ['jest-extended'],
	reporters: [
		'default',
		'jest-summary-reporter'
	],
	globals: {
		'ts-jest': {
			tsconfig: repoRoot + 'config/jest/tsconfig.json',
			isolatedModules: true//much faster build time for babylonjs
		},
		'WEBPACK_MODE': 'test'
	}
}
export default config