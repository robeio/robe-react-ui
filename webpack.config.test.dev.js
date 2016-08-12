const babelOptions = {
    presets: [
        "react",
        "es2015",
        "stage-0"
    ],
    plugins: ["doc-gen"]
};
/**
 * import common webpack settings
 */
const commonSettings = require("./webpack.config.common.js")("/site", "/build", "__test__", "/src", babelOptions);

/**
 * Json Server
 * @type {config|exports|module.exports}
 */
const JsonServer = require("./config/JsonServer");

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
commonSettings.devtool = "inline-source-map";

commonSettings.module.preLoaders.push({ test: /.jsx?$/, loader: "eslint", exclude: /node_modules/ });

const server = new JsonServer(3001);
server.route("testdb.json").upload("/files", "temp").start();

module.exports = function configure(config) {
    config.set({
        colors: true,
        captureTimeout: 3000,
        browserDisconnectTimeout: 3000,
        browserDisconnectTolerance: 1,
        browserNoActivityTimeout: 60000,
        browsers: ["Chrome_DEV"],
        singleRun: false,
        frameworks: ["mocha"],
        customLaunchers: {
            Chrome_DEV: {
                base: "Chrome",
                flags: ["--disable-web-security"]
            }
        },
        plugins: [
            "karma-chrome-launcher",
            "karma-chai",
            "karma-mocha",
            "karma-sourcemap-loader",
            "karma-webpack",
            "karma-mocha-reporter"
        ],
        files: [
            "__test__/index.dev.js"
        ],
        preprocessors: {
            "__test__/index.dev.js": ["webpack"]
        },
        webpack: commonSettings,
        webpackServer: {
            noInfo: true
        },
        reporters: ["mocha"],
        client: {
            mocha: {
                timeout: 15000
            }
        }
    });
};
