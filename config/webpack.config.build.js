const webpack = require("webpack");
const FileChanger = require("webpack-file-changer");
const Utility = require("./util/Utility");
const path = require("path");
const package = require("../package.json");

console.log(process.argv);
var isProd = process.argv.indexOf("-p") !== -1;
var env = isProd ? "production": "development";

/**
 * import common webpack settings
 */
const settings = require("./webpack.config.common.js")("/src", "/docs", undefined , undefined);

if(isProd) {
    /**
     * @link https://github.com/webpack/docs/wiki/optimization#deduplication
     * @type DedupePlugin
     */
    settings.webpack.plugins.push(new webpack.optimize.UglifyJsPlugin());
    /**
     * @link https://github.com/webpack/docs/wiki/optimization#minimize
     * @type OccurenceOrderPlugin
     */
    settings.webpack.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
    /**
     * https://github.com/webpack/docs/wiki/optimization#chunks
     * @type LimitChunkCountPlugin
     */
    settings.webpack.plugins.push(new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 15 }));
    /**
     * @link https://github.com/webpack/docs/wiki/optimization#chunks
     * @type MinChunkSizePlugin
     */
    settings.webpack.plugins.push(new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 10000 }));
    settings.webpack.devtool = "eval";
} else {
    settings.webpack.devtool = "source-map";
}

var libraryName = "robeReactUi" + (isProd ? ".min": "");
var outputFile = libraryName + ".js";

/**
 * @link https://webpack.github.io/docs/configuration.html#devtool
 * Choose a developer tool to enhance debugging.
 * source-map - A SourceMap is emitted. See also output.sourceMapFilename.
 * @type {string}
 */
settings.webpack.output = {
        path: path.resolve(Utility.projectDir, "build"),
        filename: outputFile,
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true
};

/**
 *
 * @type {{root: *[]}}
 */
settings.webpack.entry = {
    site: "../src/index.js"
};

/* Use production parameter for hiding warnings which are coming from React library. */
settings.webpack.plugins.push(new webpack.DefinePlugin({
    "process.env": {
        NODE_ENV: JSON.stringify(env)
    }
}));

module.exports = settings.webpack;
