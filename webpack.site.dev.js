const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CachePlugin = require("webpack/lib/CachePlugin");
const ConfigUtils = require("./ConfigUtil");


const webPackConfig = require("./webpack.config.common.js")("/site", "/build", "__test__", "/src");

webPackConfig.cache = true;
webPackConfig.debug = true;
webPackConfig.devtool = "eval-source-map";
webPackConfig.entry = {
    app: [webPackConfig.paths.app]
};

// webPackConfig.module.preLoaders.push({ test: /.jsx?$/, loader: "eslint", exclude: /node_modules/ });


webPackConfig.devServer = {
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
    port: process.env.PORT || 8080
};


webPackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
webPackConfig.plugins.push(new CopyWebpackPlugin([
    {
        from: "../static"
    }
]));

webPackConfig.plugins.push(new CachePlugin({}));


ConfigUtils.createJsonServer(3000, "data/db.json");

module.exports = webPackConfig;