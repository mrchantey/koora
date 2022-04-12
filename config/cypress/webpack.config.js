const path = require('path')
const { repoRootDir } = require('../webpack/utility')
const { createWebpackConfigBase } = require('../webpack/webpackCommon')


const tsconfigPath = path.join(repoRootDir, 'config', 'cypress', 'tsconfig.json')


const config = createWebpackConfigBase(tsconfigPath, 'test')

module.exports = config