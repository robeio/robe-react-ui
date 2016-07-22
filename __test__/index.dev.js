// require all `test/components/**/index.js`
const testsContext = require.context("./", true, /\.spec\.jsx?$/);

testsContext.keys().forEach(testsContext);