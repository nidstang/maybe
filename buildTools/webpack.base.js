/* eslint-disable */
const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const sourcePath = path.resolve(__dirname, '../src');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, '../src/maybe.js'),
  optimization: {
      minimizer: [new UglifyJsPlugin()]
  },

  resolve: {
    extensions: ['.js'],
    alias: {
      '@': sourcePath
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: sourcePath,
        loader: 'babel-loader',
      },
    ],
  },
}
