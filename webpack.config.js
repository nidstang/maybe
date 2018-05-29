/* eslint-disable */
const webpack = require('webpack');
const path = require('path');

const { UglifyJsPlugin } = webpack.optimize;

const sourcePath = path.resolve(__dirname, 'src');
const libraryName = 'maybe';
const output = `${libraryName}.min.js`;

module.exports = {
  entry: path.resolve(__dirname, 'src/main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: output,
    libraryName,
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
    new UglifyJsPlugin({
      minimize: true
    }),
  ],
}
