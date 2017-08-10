const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const resolve = require('./util.js').resolve
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const serverTarget = 'http://localhost:8083'
const env = process.env.NODE_ENV = "development"

var devParams = {
  session: "ucvbg7ab9i0ag0a96jva2cluc3"
}
module.exports = merge(baseWebpackConfig, {
  // cheap-module-eval-source-map is faster for development
  devtool: 'cheap-module-source-map', //source-map',
  output: {
    devtoolModuleFilenameTemplate: '[resource-path]'
  },
  module: {
    rules: [{
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: [resolve('js'), resolve('test')],
      options: {
        failOnError: false,
        quiet: true, //warn不打印到控制台
        formatter: require('eslint-friendly-formatter')
      }
    }, {
      test: /\.css$/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            sourceMap: true
          }
        },
        "postcss-loader"
      ]
    }]
  },
  plugins: [
    // new webpack.DllReferencePlugin({
    //   context: __dirname,
    //   manifest: resolve('dll/manifest.json')
    // }),
    // new AddAssetHtmlPlugin([{
    //   filepath: resolve('dll/common.dll.js'),
    //   includeSourcemap: true
    // }]),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(env)
      }
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: true,
      chunksSortMode: function (chunk1, chunk2) {
        var order = ['polyfills', 'vendor', 'index'];
        var order1 = order.indexOf(chunk1.names[0]);
        var order2 = order.indexOf(chunk2.names[0]);
        return order1 - order2;
      }
    }),
    new webpack.NamedModulesPlugin(),
    new FriendlyErrorsPlugin()
  ],
  stats: "minimal",
  devServer: {
    inline: true,
    hot: true,
    host: '200.200.106.133',
    port: 81,
    compress: true,
    contentBase: '.',
    historyApiFallback: false,
    stats: 'minimal',
    // quiet:true,
    clientLogLevel: 'error',
    proxy: {
      "/dev": {
        onProxyReq: function (proxyReq, req, res) {
          if (req.method == 'POST') {
            var body = '';
            req.on('data', function (data) {
              body += data;
              // Too much POST data, kill the connection!
              // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
              if (body.length > 1e6)
                req.connection.destroy();
            });
            req.on('end', function () {
              try {
                let temp = JSON.parse(body)
                if (temp.session) {
                  devParams.session = temp.session
                }
              } catch (e) {
                console.error(e)
              }
            });
          }
        },
        onProxyRes: function (proxyRes, req, res) {
          proxyRes.statusCode = 200
          proxyRes.statusMessage = 'ok'
        },
        cookieDomainRewrite: false,
        target: serverTarget,
        secure: false
      },
      "/server/**": {
        onProxyReq: function (proxyReq, req, res) {
          proxyReq.setHeader('Cookie', 'sf_session=' + devParams.session)
          proxyReq.setHeader('Referer', "https://" + proxyReq.getHeader('Host'))
          // console.log(proxyReq.getHeaders())
        },
        onProxyRes: function (proxyRes) {
          // proxyRes.headers['set-cookie'] = ['sf_session=lsn5ro9touje24igtor718hna6']
        },
        cookieDomainRewrite: false,
        target: serverTarget,
        secure: false
      },
      "/m/php/": {
        target: serverTarget,
        secure: false
      },
      "/newim": {
        target: serverTarget,
        secure: false
      },
      "/newim*": {
        target: serverTarget,
        secure: false
      }
    }
  }
})
