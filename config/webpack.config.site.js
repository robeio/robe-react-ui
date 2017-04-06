const webpack = require("webpack");
const FileChanger = require("webpack-file-changer");
const Utility = require("./util/Utility");
const path = require("path");
const package = require("../package.json");

/**
 * import common webpack settings
 */
/**
 * import common webpack settings
 */
const settings = require("./webpack.config.common.js")("/site", "/docs", undefined , "/src");

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

/**
 *
 * @type {{root: *[]}}
 */
settings.webpack.entry = {
    site: "../site/index.js"
};

/**
 * @link https://webpack.github.io/docs/configuration.html#devtool
 * Choose a developer tool to enhance debugging.
 * source-map - A SourceMap is emitted. See also output.sourceMapFilename.
 * @type {string}
 */
settings.webpack.devtool = "source-map";

settings.webpack.output = {
    path: settings.paths.build,
    filename: "bundle.[hash].js"
    // chunkFilename: "[id].bundle.js"
};

settings.webpack.resolve.alias = {
    "robe-react-ui/lib": settings.paths.lib,
    "robe-react-ui": settings.paths.lib + "/index"
};

const fileChanger = new FileChanger({
    move: [{
        from: path.join(Utility.projectDir, "static"),
        to: path.join(Utility.projectDir, "./docs")
    }
    ],
    change: [{
        file: "./index.html",
        parameters: {
            "\\$VERSION": package.version,
            "\\$BUILD_TIME": new Date(),
            "bundle\\.js": "bundle.[hash].js"
        }
    }
    ]
});
settings.webpack.plugins.push(fileChanger);

/* Use production parameter for hiding warnings which are coming from React library. */
settings.webpack.plugins.push(new webpack.DefinePlugin({
    "process.env": {
        NODE_ENV: JSON.stringify("production")
    }
}));


module.exports = settings.webpack;
