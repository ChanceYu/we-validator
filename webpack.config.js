'use strict';

const webpack = require('webpack');
const path = require('path');
const isProduction = process.env.NODE_ENV === 'production';

const packageJSON = require('./package.json');

const getConfig = function (outputPath, min) {
    let config = {
        entry: path.join(__dirname, 'src/we-validator.js'),
        output: {
            path: outputPath,
            filename: min ? 'we-validator.min.js' : 'we-validator.js',
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

    if(min){
        config.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                warnings: false,
                sourceMap: false,
                mangle: false
            })
        )
    }

    return config
}

let configs = [
  getConfig(path.join(__dirname, 'lib')),
  getConfig(path.join(__dirname, 'example/wechat/js'))
]

if(isProduction){
  configs.push( getConfig(path.join(__dirname, 'dist')) )
  configs.push( getConfig(path.join(__dirname, 'dist'), true) )
}

module.exports = configs