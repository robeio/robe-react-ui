const path = require("path");
const Utility = require("./util/Utility");

function InitConfiguration(src, build, test, lib, babelOptions) {
    /**
     *
     * @type {{root: (string|*), node_modules: (string|*)}}
     */
    const paths = {
        root: Utility.projectDir,
        app: path.join(Utility.projectDir, src),
        build: path.join(Utility.projectDir, build),
        test: path.join(Utility.projectDir, test),
        lib: lib ? path.join(Utility.projectDir, lib) : null,
        node_modules: path.join(Utility.projectDir, "/node_modules")
    };

    if (!babelOptions) {
        babelOptions = {
            presets: [
                "react",
                "es2015",
                "stage-0"
            ]
        };
    }
    const conf = {
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
            noParse: [/autoit.js/],
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
                    test: /\.jsx?$/,
                    loader: "babel",
                    loaders: ["babel", "react-hot"],
                    exclude: /(node_modules|bower_components|fonts)/,
                    include: paths.lib ? [paths.app, paths.lib, paths.test] : [paths.app, paths.test],
                    query: babelOptions
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
                     * @link https://github.com/webpack/file-loader
                     * npm install file-loader --save-dev
                     */
                    test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                    loader: "file-loader",
                    include: /fonts/
                },
                {
                    test: /\.s?css$/,
                    loader: "style-loader!css-loader"
                },
                {
                    /**
                     * @link https://github.com/webpack/url-loader
                     * npm install url-loader --save-dev
                     */
                    test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
                    loader: "url?limit=100000&name=[name].[ext]"
                },
                {
                    /**
                     * @link https://github.com/webpack/json-loader
                     * npm install json-loader --save-dev
                     */
                    test: /\.txt$/,
                    loader: "raw-loader"
                }
            ]
        },
        /**
         * @link https://webpack.github.io/docs/configuration.html#plugins
         * will added by environment mode.
         */
        plugins: []
    };

    if (paths.lib) {
        conf.resolve.root.push(paths.lib);
    }
    return conf;
}

module.exports = InitConfiguration;
