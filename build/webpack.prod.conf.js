var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var util = require('./util.js')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CompressionPlugin = require('compression-webpack-plugin')
const MoveToParent = require('./plugins/MoveToParent.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin")
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const path = require('path');
const resolve = util.resolve;
const BUILD_ENV = process.env.BUILD_ENV
const env = process.env.NODE_ENV = 'production'
let cacheDirectory = resolve('node_modules/.cache/uglifyjs')
if (require("os").type() === "Linux") {
  cacheDirectory = "/cache/uglifyjs"
}
let plugins = [
  new CopyWebpackPlugin([{
    from: resolve('public'),
    to: resolve('dist')
  }]),
  new webpack.HashedModuleIdsPlugin(),
  new ExtractTextPlugin({
    filename: '[name].[chunkhash].css',
    allChunks: true
  }),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(env)
    }
  }),
  //在文件头上添加版权信息
  new webpack.BannerPlugin("Copyright by moa inc."),
  new MoveToParent(3),
  // new webpack.optimize.CommonsChunkPlugin({
  //   names: ['vendor', 'manifest'],
  // }),

  new webpack.optimize.MinChunkSizePlugin({
    minChunkSize: 50 * 1024
  }),

  new webpack.optimize.ModuleConcatenationPlugin(),

  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'src/index.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    },
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    // chunksSortMode: function (chunk1, chunk2) {
    //   var order = ['manifest', 'vendor', 'base', 'index'];
    //   var order1 = order.indexOf(chunk1.names[0]);
    //   var order2 = order.indexOf(chunk2.names[0]);
    //   return order1 - order2;
    // }
  }),
  // new ScriptExtHtmlWebpackPlugin({
  //   inline: ["manifest"]
  // })
]
if (BUILD_ENV !== 'development') {
  // plugins.push(new ParallelUglifyPlugin({
  //   cacheDir: cacheDirectory,
  //   uglifyJS: {
  //     output: {
  //       comments: false
  //     },
  //     compress: {
  //       warnings: false
  //     }
  //   }
  // }))
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    beautify: false,
    mangle: {
      keep_fnames: true
    },
    sourceMap: true,
    comments: false
  }))
}
module.exports = merge(baseWebpackConfig, {
  // cheap-module-eval-source-map is faster for development
  devtool: BUILD_ENV === "development" ? "source-map" : "none", //'source-map',
  output: {
    path: util.resolve('dist'),
    publicPath: '', //公共资源路径
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [{
          loader: "css-loader",
          options: {
            sourceMap: BUILD_ENV === "development",
            minimize: env === "production"
          }
        },
          "postcss-loader"
        ]
      })
    }]
  },
  plugins: plugins
})
