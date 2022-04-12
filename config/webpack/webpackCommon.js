const path = require('path')
const { ProvidePlugin, DefinePlugin } = require('webpack')
const { rootDir, repoRootDir } = require('./utility')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

//we need @koora/* to use the same peer dependencies
//but this should be sorted on a workspaces level
// const packageJson = require('../../packages/app/package.json')
// const aliases = Object.keys(packageJson.peerDependencies)
delete process.env.TS_NODE_PROJECT
//modes = test | dev | prod
module.exports.createWebpackConfigBase = (tsconfigFile, modeEnv = 'prod') => ({
	devtool: 'inline-source-map',
	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
		// alias: aliases.reduce((acc, str) => {
		// 	acc[str] = path.resolve(`./node_modules/${str}`)
		// 	return acc
		// }, {}),
		modules: [
			//using an absolute path gets warnings from firebase: export '__spreadArray' (imported as '__spreadArray') was not found in 'tslib'
			'node_modules',
			rootDir,
			// path.join(rootDir, 'node_modules'),
		],
		fallback: {
			fs: false,
			path: false
		},
		plugins: [new TsconfigPathsPlugin({ configFile: path.resolve(repoRootDir, 'config', 'typescript', 'tsconfig.json') })]
	},
	output: {
		filename: '[name].[contenthash].js',
		chunkFilename: '[name].[contenthash].bundle.js',
		path: path.join(rootDir, 'dist'),
		clean: true,
	},
	//import as resource instead, assemblyscript expects 'fetch'
	// experiments: {
	// 	asyncWebAssembly: true,
	// 	syncWebAssembly: true
	// },
	plugins: [
		// required for simple-peer... also run `npm install process buffer`
		new ProvidePlugin({ process: 'process/browser' }),
		new ProvidePlugin({ Buffer: ['buffer', 'Buffer'] }),
		new DefinePlugin({
			'WEBPACK_MODE': `'${modeEnv}'`
		}),
	],
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							configFile: tsconfigFile
						}
					}],
				exclude: [/node_modules/],
			},
			{
				test: /\.(txt|glsl|vert|frag)/,
				type: 'asset/source',
			},
			{
				test: /\.svg$/,
				use: ['@svgr/webpack'],
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				//https://webpack.js.org/guides/asset-modules/
				test: /\.(wasm|ico|jpg|jpeg|png|gif|glb|gltf|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|txt)$/,
				type: 'asset/resource'
			},
		],
	},
})