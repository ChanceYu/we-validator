'use strict';

const webpack = require('webpack');
const path = require('path');

const packageJSON = require('./package.json');

const getConfig = function (outputPath) {
    let config = {
        entry: path.join(__dirname, 'src/we-validator.js'),
        output: {
            filename: 'we-validator.js',
            library: 'WeValidator',
            libraryTarget: 'umd',
            umdNamedDefine: true
        },
        module: {
            rules: [{
                test: /\.(js)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'stage-0']
                }
            }]
        },
        plugins: [
            new webpack.BannerPlugin(
`${packageJSON.name}
version: ${packageJSON.version}
address: ${packageJSON.homepage}
author:  ${packageJSON.author}
license: ${packageJSON.license}`)
        ],
        resolve: {
            extensions: ['.js']
        }
    }

    config.output.path = outputPath

    return config
}

module.exports = [
    getConfig(path.join(__dirname, 'lib')),
    getConfig(path.join(__dirname, 'example/wechat/js'))
]