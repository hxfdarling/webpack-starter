var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.dll.common.js');

const ENV = process.env.BUILD_RELEASE = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = commonConfig(ENV);