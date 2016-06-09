const webpack = require("webpack");

/**
 * import common webpack settings
 */
const commonSettings = require("./webpack.config.common.js");

/**
 * @link https://github.com/webpack/docs/wiki/optimization#deduplication
 * @type DedupePlugin
 */
commonSettings.plugins.push(new webpack.optimize.DedupePlugin());
/**
 * @link https://github.com/webpack/docs/wiki/optimization#deduplication
 * @type DedupePlugin
 */
commonSettings.plugins.push(new webpack.optimize.UglifyJsPlugin());
/**
 * @link https://github.com/webpack/docs/wiki/optimization#minimize
 * @type OccurenceOrderPlugin
 */
commonSettings.plugins.push(new webpack.optimize.OccurenceOrderPlugin());
/**
 * https://github.com/webpack/docs/wiki/optimization#chunks
 * @type LimitChunkCountPlugin
 */
commonSettings.plugins.push(new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 15 }));
/**
 * @link https://github.com/webpack/docs/wiki/optimization#chunks
 * @type MinChunkSizePlugin
 */
commonSettings.plugins.push(new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 10000 }));

/**
 *
 * @type {{root: *[]}}
 */
commonSettings.entry = {
    "robe-react-commons": "../src/index.js"
};

/**
 * @link https://webpack.github.io/docs/configuration.html#devtool
 * Choose a developer tool to enhance debugging.
 * source-map - A SourceMap is emitted. See also output.sourceMapFilename.
 * @type {string}
 */
commonSettings.devtool = "source-map";


commonSettings.output = {
    path: commonSettings.paths.dist,
    filename: "[name].min.js",
    library: "RobeReactCommon",
    libraryTarget: "umd"
};


module.exports = commonSettings;
