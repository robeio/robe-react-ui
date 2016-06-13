const webpack = require("webpack");
// const CopyWebpackPlugin = require("copy-webpack-plugin");
const CachePlugin = require("webpack/lib/CachePlugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");

const commonSettings = require("./webpack.config.common.js");

commonSettings.cache = true;
commonSettings.debug = true;
commonSettings.devtool = "eval";
commonSettings.entry = {
    app: [commonSettings.paths.site]
};

commonSettings.module.loaders.push({ test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/ });

commonSettings.devServer = {
    historyApiFallback: true,
    hot: true,
    progress: true,
    inline: true,

    // display only errors to reduce the amount of output

    // stats: "errors-only",

    // parse host and port from env so this is easy
    // to customize
    // host: process.env.HOST,
    host: "0.0.0.0",
    port: 8080
};

commonSettings.plugins.push(new webpack.HotModuleReplacementPlugin());
// commonSettings.plugins.push(new CopyWebpackPlugin([{ from: "showcase" }]));
commonSettings.plugins.push(new CachePlugin({}));
commonSettings.plugins.push(new CopyWebpackPlugin([
    { from: "../static" }
]));
module.exports = commonSettings;
