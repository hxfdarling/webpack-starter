var webpackConfig = require('./webpack.test');

module.exports = function(config) {
	var _config = {
		basePath: '',
		browsers: ['PhantomJS'], //Chrome,PhantomJS
		coverageReporter: {
			reporters: [{
					type: 'lcov',
					dir: 'coverage',
					subdir: '.'
				},
				{
					type: 'text-summary',
					dir: 'coverage',
					subdir: '.'
				}
			]
		},
		frameworks: ['jasmine'],

		files: [
			//for vuex 
			// './node_modules/babel-polyfill/dist/polyfill.js',
			{
				pattern: './config/karma-test-shim.js',
				watched: true
			}
		],

		preprocessors: {
			'./config/karma-test-shim.js': ['webpack', 'sourcemap']
		},

		webpack: webpackConfig,

		webpackMiddleware: {
			stats: 'errors-only'
		},

		webpackServer: {
			noInfo: true
		},
		plugins: [
			'karma-jasmine',
			'karma-sourcemap-loader',
			'karma-webpack',
			'karma-coverage',
			'karma-phantomjs-launcher'
		],
		reporters: ['progress', 'coverage'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		// autoWatch: true
		singleRun: true
	};

	config.set(_config);
};