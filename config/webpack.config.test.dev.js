const path = require('path');
const JsonServer = require("./server/JsonServer");
const Utility = require("./util/Utility");

const paths = {
    src: path.join(Utility.projectDir, 'src')
};

const webpackConfig = {
    resolve: {
        extensions: ['', '.js', '.jsx'],
        root: paths.src,
    },
    devtool: 'inline-source-map',
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/, exclude: /(bower_components|node_modules)/,
                loader: 'babel-loader'
            },
            {
                test: /\.s?css$/,
                loader: "style-loader!css-loader"
            },
            {
                /**
                 * @link https://github.com/webpack/json-loader
                 * npm install json-loader --save-dev
                 */
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                /**
                 * @link https://github.com/webpack/url-loader
                 * npm install url-loader --save-dev
                 */
                test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
                loader: "url?limit=100000&name=[name].[ext]"
            }
        ]
    },
    externals: {
        cheerio: "window",
        "react/addons": true, // important!!
        "react/lib/ExecutionEnvironment": true,
        "react/lib/ReactContext": true
    }
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
        webpack: webpackConfig,
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
        filePattern
    ];
    conf.preprocessors = {};
    conf.preprocessors[filePattern] = ['webpack'];
    config.set(conf);
};