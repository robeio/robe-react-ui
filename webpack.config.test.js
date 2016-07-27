/**
 * import common webpack settings
 */
const commonSettings = require("./webpack.config.common.js")("/site", "/build", "__test__", "/src");

/**
 * Json Server
 * @type {config|exports|module.exports}
 */
const ConfigUtils = require("./ConfigUtil");

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
/**
 * @link https://webpack.github.io/docs/configuration.html#devtool
 * Choose a developer tool to enhance debugging.
 * source-map - A SourceMap is emitted. See also output.sourceMapFilename.
 * @type {string}
 */
commonSettings.devtool = "source-map";

commonSettings.module.preLoaders.push({ test: /.jsx?$/, loader: "eslint", exclude: /node_modules/ });
commonSettings.module.loaders.push({
        test: /\.jsx?$/,
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

ConfigUtils.createJsonServer(3000, commonSettings.paths.root + "/testdb.json", "/files", "temp");
module.exports = function configure(config) {
    config.set({
        captureTimeout: 3000,
        browserDisconnectTimeout: 3000,
        browserDisconnectTolerance: 1,
        browserNoActivityTimeout: 60000,
        browsers: ["Chrome_travis_ci"],
        customLaunchers: {
            Chrome_travis_ci: {
                base: "Chrome",
                flags: ["--no-sandbox"]
            }
        },
        singleRun: true,
        frameworks: ["mocha"],
        plugins: [
            "karma-chrome-launcher",
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
            // specify a common output directory
            dir: "coverage",
            reporters: [
                { type: "lcov", subdir: "report-lcov" }
            ]
        },
        client: {
            mocha: {
                timeout: 15000
            }
        }
    });
};
