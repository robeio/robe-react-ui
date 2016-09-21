const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CachePlugin = require("webpack/lib/CachePlugin");
const JsonServer = require("./config/JsonServer");


const babelOptions = {
    presets: [
        "react",
        "es2015",
        "stage-0"
    ],
    plugins: ["doc-gen"]
};

const webPackConfig = require("./webpack.config.common.js")("/site", "/build", "__test__", "/src", babelOptions);

webPackConfig.cache = true;
webPackConfig.debug = true;
webPackConfig.devtool = "eval-source-map";
webPackConfig.entry = {
    app: [webPackConfig.paths.app]
};

// webPackConfig.module.preLoaders.push({ test: /.jsx?$/, loader: "eslint", exclude: /node_modules/ });

webPackConfig.resolve.alias = {
    "robe-react-ui/lib": webPackConfig.paths.lib,
    "robe-react-ui": webPackConfig.paths.lib + "/index"
}

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

/* Use production parameter for hiding warnings which are coming from React library. */
/* webPackConfig.plugins.push(new webpack.DefinePlugin({
    "process.env": {
        NODE_ENV: JSON.stringify("production")
    }
}));
*/

webPackConfig.plugins.push(new CopyWebpackPlugin([
    {
        from: "../static"
    }
]));

webPackConfig.plugins.push(new CachePlugin({}));


const server = new JsonServer(3000, "/application");
server.route("data/db.json").upload("/files", "data/upload", "files").start();

module.exports = webPackConfig;
