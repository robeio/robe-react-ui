/**
 * import common webpack settings
 */
const commonSettings = require("./webpack.config.common.js");

/**
 * @link https://webpack.github.io/docs/configuration.html#cache
 * Cache generated modules and chunks to improve performance for multiple incremental builds.
 This is enabled by default in watch mode.
 * @type {boolean}
 */
commonSettings.cache = true;

/**
 * @link https://webpack.github.io/docs/configuration.html#debug
 * Switch loaders to debug mode.
 * @type {boolean}
 */
commonSettings.debug = true;

/**
 * @link https://webpack.github.io/docs/configuration.html#devtool
 * Choose a developer tool to enhance debugging.
 * source-map - A SourceMap is emitted. See also output.sourceMapFilename.
 * @type {string}
 */
commonSettings.devtool = "inline-source-map";

/*
commonSettings.module.postLoaders.push({
    test: /\.jsx?$/,
    include: commonSettings.paths.app,
    exclude: /(__test__|node_modules|bower_components)\//,
    loader: "istanbul-instrumenter"
})
*/

commonSettings.module.loaders.push(
    {
        test: /\.jsx?/,
        exclude: /(__test__|node_modules|bower_components)\//,
        loader: "isparta"
    }
);

// *optional* isparta options: istanbul behind isparta will use it
commonSettings.isparta = {
    embedSource: true,
    noAutoWrap: true,
    // these babel options will be passed only to isparta and not to babel-loader
    babel: {
        presets: ["es2015", "stage-0", "react"]
    }
};

module.exports = function configure(config) {
    config.set({
        browsers: ["PhantomJS"],
        singleRun: true,
        frameworks: ["mocha"],
        plugins: [
            "karma-phantomjs-launcher",
            "karma-chai",
            "karma-mocha",
            "karma-sourcemap-loader",
            "karma-webpack",
            "karma-coverage",
            "karma-mocha-reporter"
        ],
        files: [
            "__test__/index.js"
        ],
        preprocessors: {
            "__test__/index.js": ["webpack", "sourcemap"]
        },
        webpack: commonSettings,
        webpackServer: {
            noInfo: true
        },
        reporters: ["mocha", "coverage"],
        coverageReporter: {
            type: "html",
            dir: "coverage/"
        }
    });
};
