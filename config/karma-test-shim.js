// Error.stackTraceLimit = Infinity;

var appContext = require.context('../test', true, /\.spec\.js/);

appContext.keys().forEach(appContext);


