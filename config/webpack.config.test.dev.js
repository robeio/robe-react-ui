const path = require('path');
const JsonServer = require("./server/JsonServer");
const Utility = require("./util/Utility");

const babelOptions = {
    presets: [
        "react",
        "es2015",
        "stage-0"
    ]
};


const settings = require("./webpack.config.common.js")("/src", "/build", "__test__", undefined, babelOptions);

settings.webpack.cache = true;
settings.webpack.devtool = 'source-map';

settings.webpack.externals = {
    "cheerio": "window",
    "react/addons": true, // important!!
    "react/lib/ExecutionEnvironment": true,
    "react/lib/ReactContext": true
};

const server = new JsonServer(3001, "/application");
server.route("config/data/testdb.json").upload("/files", "config/data/upload", "files").start();

module.exports = function (config) {
    const conf = {
        basePath: "../",
        browsers: ["Chrome_travis_ci"],
        singleRun: false,
        frameworks: ["mocha"],
        customLaunchers: {
            Chrome_travis_ci: {
                base: "Chrome",
                flags: ["--no-sandbox"]
            }
        },
        plugins: [
            "karma-webpack",
            'karma-mocha',
            'karma-mocha-reporter',
            'karma-chrome-launcher',
            'karma-coverage',
            "karma-sourcemap-loader"
        ],
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
            errors: true,
            errorDetails: true,
            warnings: true,
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
    var filePattern = Utility.getTestPattern(process.argv, "__test__/**/*.spec.js");
    conf.files = [
        filePattern,
    ];
    conf.preprocessors = {};
    conf.preprocessors[filePattern] = ['webpack'];
    config.set(conf);
};