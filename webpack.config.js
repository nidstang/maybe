/* eslint-disable */
const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const sourcePath = path.resolve(__dirname, 'src');
const libraryName = 'maybe';
const output = `${libraryName}.min.js`;

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src/main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: output,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
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

  plugins: [
    new UglifyJsPlugin(),
  ],
}
