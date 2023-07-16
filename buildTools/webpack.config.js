const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const sourcePath = path.resolve(__dirname, '../src');

module.exports = {
    mode: 'production',

    entry: path.resolve(__dirname, '../src/maybe.js'),

    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'maybe.js',
        library: 'maybe',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        globalObject: 'this',
    },

    resolve: {
        extensions: ['.js'],
        alias: {
            '@': sourcePath,
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
        new CopyPlugin({
            patterns: [
                {
                    from: './src/defs/maybe.d.ts',
                    to: 'maybe.d.ts',
                },
            ],
        }),
    ],
};
