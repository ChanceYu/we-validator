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
                `${packageJSON.name}.js
      Version: ${packageJSON.version}
      Address: (https://github.com/ChanceYu/we-validator)
      Author: ChanceYu
      Licensed under the MIT license`)
        ],
        resolve: {
            extensions: ['.js']
        }
    }

    if (outputPath) config.output.path = outputPath

    return config
}

let config = [
    getConfig(path.join(__dirname, 'lib')),
    getConfig(path.join(__dirname, 'example/wechat/js'))
];


module.exports = config