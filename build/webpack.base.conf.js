const path = require('path')
const webpack = require('webpack')
const util = require('./util.js')
const resolve = util.resolve
const HappyPack = require('happypack')
const cpus = require('os').cpus().length
let cacheDirectory = true
if (require("os").type() === "Linux") {
  cacheDirectory = "/cache/babel"
}
module.exports = {
  target: "web",
  entry: {
    'index': './src/index.js',
    'polyfills': './src/polyfills.js',
    'vendor': './src/vendor.js'
  },

  output: {
    path: resolve('dist'),
    publicPath: '',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },
  stats: "errors-only",
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.vue', '.json', '.html'],
    alias: {
      // 'vue': 'vue/dist/vue.js',
      'vue': 'vue/dist/vue.esm.js',
      // 'vue-router': "vue-router/dist/vue-router.esm.js",
      // 'vuex': "vuex/dist/vuex.esm.js",
      '@': resolve('src'), //映射根目录
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [{
          loader: 'ts-loader',
          options: {
            compilerOptions: {
              declaration: false,
              target: 'es5',
              module: 'commonjs'
            },
            transpileOnly: true
          }
        }]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      }, {
        test: /\.js$/,
        include: [
          // 只去解析运行目录下的 src 和 demo 文件夹
          resolve('src'),
          resolve('test')
        ],
        use: [{
          loader: 'happypack/loader',
          options: {
            cacheDirectory: cacheDirectory
          }
        }
        ]
      },
      {
        test: /\.svg$/,
        include: [
          resolve('src/assets/icons')
        ],
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }]
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: util.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: util.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new HappyPack({
      threads: cpus,
      cache: false,
      loaders: [{
        loader: 'babel-loader',
        query: {
          cacheDirectory: cacheDirectory
        }
      }]
    })
  ]
}
