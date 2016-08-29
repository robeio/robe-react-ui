// require all `test/components/**/index.js`
const testsContext = require.context("./", true, /\.spec\.jsx?$/);

testsContext.keys().forEach(testsContext);

// // require all `src/components/**/index.js`
// const componentsContext = require.context("../src/", true, /.jsx?$/);

// componentsContext.keys().forEach(componentsContext);
