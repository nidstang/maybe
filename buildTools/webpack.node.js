const path = require('path')
const merge = require('webpack-merge')
const base = require('./webpack.base')

module.exports = merge(base, {
  target: 'node',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'maybe.node.js',
    library: 'maybe',
    libraryTarget: 'umd',
    umdNamedDefine: true
  }
})
