import { DefinePlugin, WebpackPluginInstance } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { CleanArgs, DirtyArgs, iWebpackConfig } from './types'
import fs from 'fs'
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CircularDependencyPlugin = require('circular-dependency-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { createWebpackConfigBase } = require('./webpackCommon')
const { 
	SIZE_LIMIT_MAIN, SIZE_LIMIT_ASSET, 
	parseArgs, tsconfigPath, } = require('./utility')



export default (dirtyArgs: DirtyArgs): iWebpackConfig => {
	const {
		entryPath, templatePath, outputPath, faviconPath,
		analyzeBundle, analyzeCircular, prod, description, title, https, host,
		optimize, contentHash
	} = parseArgs(dirtyArgs) as CleanArgs


	let initMsg = `
starting webpack...
\ttitle: ${title}
\tentry: ${entryPath}
\ttemplate: ${templatePath}
\toutput: ${outputPath}
\tproduction: ${prod}
`
// \tfavicon: ${faviconPath}
    
	const plugins: WebpackPluginInstance[] = [
		new HtmlWebpackPlugin({
			template: templatePath,
			favicon: faviconPath,
			title,
			description,
			publicPath: '/'//critical for resolving nested paths, ie example.com/foo/bar
		}),
	]

	if (fs.existsSync('src/assets/robots.txt'))
		plugins.push(new CopyPlugin({ patterns: [	
			{ from: 'src/assets/robots.txt', to: 'robots.txt' }
		] }))
	if (analyzeBundle){
		plugins.push(new BundleAnalyzerPlugin())
		initMsg += '\tanalyzeBundle: true\n'
	}
	
	if (analyzeCircular){
		plugins.push(new CircularDependencyPlugin({
			onDetected: ({ paths, compilation }) => 
				compilation.errors.push(new Error(paths.join(' ->\n'))),
		}))
		initMsg += '\tanalyzeCircular: true\n'
	}
	
	const webpackMode = prod ? 'prod' : 'dev'

	console.log(initMsg)
	const configBase = createWebpackConfigBase(tsconfigPath, webpackMode)
	return {
		...configBase,
		entry: entryPath,
		mode: prod ? 'production' : 'development',
		devtool: prod ? undefined : 'inline-source-map',
		performance: {
			hints: prod ? 'error' : 'warning',
			maxEntrypointSize: prod ? SIZE_LIMIT_MAIN : SIZE_LIMIT_MAIN * 100000,
			maxAssetSize: prod ? SIZE_LIMIT_ASSET : SIZE_LIMIT_ASSET * 100000,
		},
		plugins: [...configBase.plugins, ...plugins],
		optimization: !optimize ? {} : {
			usedExports: true,
			//TODO share chunks between async and sync, do it later
			//https://webpack.js.org/guides/caching/
			//https://medium.com/jspoint/react-router-and-webpack-v4-code-splitting-using-splitchunksplugin-f0a48f110312
			//https://medium.com/hackernoon/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758
			runtimeChunk: 'single', //one runtime for all chunks, smaller
			splitChunks: {
				cacheGroups: {
					default: false, //disable default behavior
					vendors: false,
					vendorSync: {
						name: 'vendor-sync',
						chunks: 'initial',
						// name: module => getModuleName(module,'vendors-sync'),
						test: /node_modules/
					},
					vendorAsync: {
						// name: 'vendor-async',
						chunks: 'async',
						test: /node_modules/,
						name: module => getModuleName(module, 'vendors-async'),
					},
				}
			}
		},
		devServer: {
			open: host !== '0.0.0.0',
			port: 5000,
			contentBase: outputPath,
			historyApiFallback: true,
			https,
			host,
			disableHostCheck: true, //https://stackoverflow.com/questions/43619644/i-am-getting-an-invalid-host-header-message-when-connecting-to-webpack-dev-ser
		},
		output: {
			...configBase.output,
			filename: contentHash ? '[name].[contenthash].js' : '[name].js',
			chunkFilename: contentHash ? '[name].[contenthash].bundle.js' : '[name].bundle.js',	
			path: outputPath,
			clean: {
				keep: (filename => cleanKeep.includes(filename))
			}
		}
	}
}

const cleanKeep = [
	//assemblyscript builds
	'debug.js',
	'debug.d.ts',
	'debug.wasm',
	'debug.wat',
	'debug.wasm.map',
]

const splitModules = [
	'@babylonjs', 
	'firebase', 
	'firebaseui', 
	'three', 
	'ammojs-typed'
]
const nestedSplit = ['@babylonjs']
const getModuleName = (module, prefix = 'vendors') => { 
	const pkg = module.context.split(/[\\/]node_modules[\\/]/)[1].split(/[\\/]/)
	// const name = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
	// const name = pkg[0]
	if (!splitModules.some(m => m === pkg[0]))
		return prefix

	const name = nestedSplit.some(val => val === pkg[0])
		? `${pkg[0]}-${pkg[1]}`
		: pkg[0]
	return `${prefix}-${name.replace('@', '')}` 
}