process.argv.slice(4)[0]
var testFile = null;
if(process.argv.length > 4) {
    testFile = process.argv.slice(4)[0];
}

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
commonSettings.module.preLoaders.push({ test: /.jsx?$/, loader: "eslint", exclude: /node_modules/ });


commonSettings.module.preLoaders.push({ test: /.jsx?$/, loader: "eslint", exclude: /node_modules/ });

const server = new JsonServer(3001, "/application");
server.route("config/data/testdb.json").upload("/files", "config/data/upload", "files").start();

commonSettings.externals = {
    cheerio: "window",
    "react/addons": true, // important!!
    "react/lib/ExecutionEnvironment": true,
    "react/lib/ReactContext": true
};

module.exports = function configure(config) {
    var conf = {
        basePath: "../",
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
        reporters: ["mocha"],
        client: {
            mocha: {
                timeout: 15000
            }
        }
    };

    let filePattern = "__test__/index.dev.js";
    if(testFile) {
        filePattern = "__test__/**/*/"+testFile+".spec.js";
    }
    conf.files = [
        filePattern
    ];
    conf.preprocessors = {};
    conf.preprocessors[filePattern] = ["webpack"];
    config.set(conf);
};
