const path = require("path");

/**
 *
 * @type {{root: (string|*), node_modules: (string|*)}}
 */
const paths = {
    app: path.join(__dirname, "/src"), // application base path
    test: path.join(__dirname, "/__test__"),
    node_modules: path.join(__dirname, "/node_modules"), // modules path,
    dist: path.join(__dirname, "/dist"), // build path in base path
    lib: path.join(__dirname, "/lib")
};


module.exports = {
    paths: paths, // reference path variable
    /**
     * @link https://webpack.github.io/docs/configuration.html#context
     * The base path directory for resolving the entry option if output.pathinfo is set the include shortened to this directory.
     */
    context: paths.app,
    /* add resolve.extensions */
    /**
     *
     * @link https://webpack.github.io/docs/configuration.html#resolve
     */
    resolve: {
        /**
         * @link https://webpack.github.io/docs/configuration.html#resolve-root
         * The directory (absolute path) that contains your modules.
         * May also be an array of directories. This setting should be used to add individual directories to the search path.
         * It must be an absolute path! Don’t pass something like ./app/modules.
         */
        root: [paths.app],
        /**
         * @link https://webpack.github.io/docs/configuration.html#resolve-extensions
         * An array of extensions that should be used to resolve modules.
         * For example, in order to discover react jsx files, your array should contain the string ".jsx".
         */
        extensions: ["", ".jsx", ".js", ".json"],
        /**
         * @link https://webpack.github.io/docs/configuration.html#resolve-modulesdirectories
         * An array of directory names to be resolved to the current directory as well as its ancestors, and searched for modules.
         * This functions similarly to how node finds “node_modules” directories.
         * For example, if the value is ["mydir"], webpack will look in “./mydir”, “../mydir”, “../../mydir”, etc.
         */
        modulesDirectories: [paths.node_modules]
    },
    /**
     * @link https://webpack.github.io/docs/configuration.html#module
     */
    module: {
        /**
         * @link https://webpack.github.io/docs/configuration.html#module-preloaders-module-postloaders
         */
        preLoaders: [
        ],
        /**
         * https://webpack.github.io/docs/configuration.html#loaders
         */
        loaders: [
            {
                /**
                 * @link https://github.com/gaearon/react-hot-loader
                 * npm install react-hot-loader --save-dev
                 */
                test: /\.js?$|\.jsx?$/,
                loader: "babel",
                loaders: ["react-hot", "babel"],
                exclude: /(node_modules|bower_components|fonts)/,
                include: [paths.app, paths.test],
                query: {
                    presets: [
                        "react",
                        "es2015",
                        "stage-0"
                    ]
                }
            }
        ]
    },
    /**
     * @link https://webpack.github.io/docs/configuration.html#plugins
     * will added by environment mode.
     */
    plugins: []
};

