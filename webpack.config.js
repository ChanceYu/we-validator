'use strict';

const webpack = require('webpack');
const path = require('path');

const packageJSON = require('./package.json');

const year = new Date().getFullYear();

let config = {
  entry: path.join(__dirname, 'src/we-validator.js'),
  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'we-validator.js',
    library: 'WeValidator',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
            presets: ['es2015', 'stage-0']
        }
      }
    ]
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
};


module.exports = config