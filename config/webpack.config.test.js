const path = require("path");

const babelOptions = {
    presets: [
        "react",
        "es2015",
        "stage-0"
    ]
};

const settings = require("./webpack.config.common.js")("/src", "/build", "__test__", undefined, babelOptions);

settings.webpack.cache = true;
settings.webpack.devtool = "eval";


/**
 * Json Server
 * @type {config|exports|module.exports}
 */
const JsonServer = require("./server/JsonServer");

settings.webpack.module.rules.push({
    enforce: 'pre',
    test: /\.jsx?$/,
    exclude: /(__test__|node_modules|bower_components)\//,
    loader: "isparta-loader",
    options: {
        embedSource: true,
        noAutoWrap: true,
        // these babel options will be passed only to isparta and not to babel-loader
        babel: {
            presets: ["es2015", "stage-0", "react"]
        }
    }
});


settings.webpack.externals = {
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
            "__test__/**/*.spec.js": ["webpack"]
        },
        webpack: settings.webpack,
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
