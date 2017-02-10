const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CachePlugin = require("webpack/lib/CachePlugin");
const Utility = require("./util/Utility");
const JsonServer = require("./server/JsonServer");


const babelOptions = {
    presets: [
        "react",
        "es2015",
        "stage-0"
    ],
    plugins: ["doc-gen"]
};

const settings = require("./webpack.config.common.js")("/site", "/build", undefined, "/src", babelOptions);

settings.webpack.cache = true;
settings.webpack.devtool = "source-map";
settings.webpack.entry = {
    app: [settings.paths.app]
};


// webPackConfig.module.preLoaders.push({ test: /.jsx?$/, loader: "eslint", exclude: /node_modules/ });

settings.webpack.resolve.alias = {
    "robe-react-ui/lib": settings.paths.lib,
    "robe-react-ui": settings.paths.lib + "/index"
};

settings.webpack.devServer = {
    historyApiFallback: true,
    hot: true,
    inline: true,

    // display only errors to reduce the amount of output
    // stats: "errors-only",

    // parse host and port from env so this is easy
    // to customize
    // host: process.env.HOST,
    host: "0.0.0.0",
    port: process.env.PORT || 8080
};



settings.webpack.plugins.push(new webpack.HotModuleReplacementPlugin());

/* Use production parameter for hiding warnings which are coming from React library. */
/* webPackConfig.plugins.push(new webpack.DefinePlugin({
    "process.env": {
        NODE_ENV: JSON.stringify("production")
    }
}));
*/

settings.webpack.plugins.push(new CopyWebpackPlugin([
    {
        from: "../static"
    }
]));

settings.webpack.plugins.push(new CachePlugin({}));


const server = new JsonServer(3000, "/application");
server.route("config/data/db.json").upload("/files", "config/data/upload", "files").start();

module.exports = settings.webpack;
