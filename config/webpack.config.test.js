/**
 * import common webpack settings
 */
const commonSettings = require("./webpack.config.common.js")("/src", "/build", "__test__");

/**
 * Json Server
 * @type {config|exports|module.exports}
 */
const JsonServer = require("./server/JsonServer");

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
commonSettings.debug = false;

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
commonSettings.devtool = "eval";

commonSettings.module.loaders.push({
    test: /\.jsx?$/,
    exclude: /(__test__|node_modules|bower_components)\//,
    loader: "isparta"
});

// *optional* isparta options: istanbul behind isparta will use it
commonSettings.isparta = {
    embedSource: true,
    noAutoWrap: true,
    // these babel options will be passed only to isparta and not to babel-loader
    babel: {
        presets: ["es2015", "stage-0", "react"]
    }
};

commonSettings.externals = {
    "cheerio": "window",
    "react/addons": true, // important!!
    "react/lib/ExecutionEnvironment": true,
    "react/lib/ReactContext": true
};

const server = new JsonServer(3001, "/application");
server.route("config/data/testdb.json").upload("/files", "config/data/upload", "files").start();

module.exports = function configure(config) {
    config.set({
        basePath: "../",
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
            "__test__/**/*.spec.js"
        ],
        preprocessors: {
            "__test__/**/*.spec.js": ["webpack"],
            "src/**/*.js": ["webpack"]
        },
        webpack: commonSettings,
        webpackServer: {
            colors: true,
            hash: false,
            version: false,
            timings: false,
            assets: false,
            chunks: false,
            modules: false,
            reasons: false,
            children: false,
            source: false,
            errors: false,
            errorDetails: false,
            warnings: false,
            publicPath: false
        },
        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i. e.
            stats: "errors-only"
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
