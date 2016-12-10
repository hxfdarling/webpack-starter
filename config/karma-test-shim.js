Error.stackTraceLimit = Infinity;

var appContext = require.context('../src', true, /\.spec\.js/);

appContext.keys().forEach(function(path) {
	try {
		appContext(path);
	} catch (err) {
		console.error('[ERROR] WITH SPEC FILE: ', path);
		console.error(err);
	}
});