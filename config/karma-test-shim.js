// Error.stackTraceLimit = Infinity;

var appContext = require.context('../src', true, /\.spec\.js/);

appContext.keys().forEach(appContext);


