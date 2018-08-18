/* eslint-disable */
const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const sourcePath = path.resolve(__dirname, '../src');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, '../src/maybe.js'),

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

  plugins: [
    new UglifyJsPlugin(),
  ],
}
