//@ts-nocheck dont know how to do this
const path = require('path')
module.exports = (on, config) => {

	//dont think this is working, no idea why
	//https://www.youtube.com/watch?v=zN29shaTYOs
	const extension = path.resolve(__dirname, '../extensions/webxr-emulator') 
	on('before:browser:launch', (browser = {}, launchOptions) => {
		launchOptions.extensions.push(extension)	
	})

	if (config.testingType === 'component') {
		const { startDevServer } = require('@cypress/webpack-dev-server')

		const webpackConfig = require('../webpack.config.js')

		on('dev-server:start', options =>
			startDevServer({ options, webpackConfig })
		)
	}

	return config
}