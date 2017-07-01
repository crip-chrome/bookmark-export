let utils = require('./utils')
let config = require('../config')

let isProduction = process.env.NODE_ENV === 'production'
let sourceMap = isProduction
    ? config.build.productionSourceMap
    : config.dev.cssSourceMap

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap,
    extract: isProduction
  }),
  esModule: true,
}
