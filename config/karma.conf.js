var webpackConfig = require('./webpack.test');

module.exports = function(config) {
	var _config = {
		basePath: '',
		browsers: ['PhantomJS'], //Chrome
		coverageReporter: {
			reporters: [
				{ type: 'html', subdir: 'html' },
				{ type: 'lcovonly', subdir: '.' },
			],
		},
		coverageReporter: {
			type: 'in-memory'
		},
		frameworks: ['jasmine'],

		files: [{
			pattern: './config/karma-test-shim.js',
			watched: false
		}],

		preprocessors: {
			'./config/karma-test-shim.js': ['coverage','webpack', 'sourcemap']
		},

		webpack: webpackConfig,

		webpackMiddleware: {
			stats: 'errors-only'
		},

		webpackServer: {
			noInfo: true
		},

		reporters: ['progress', 'coverage'],
		// customContextFile: './src/index.html',
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: false,
		singleRun: true
	};

	config.set(_config);
};