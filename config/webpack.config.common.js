const path = require("path");
const Utility = require("./util/Utility");

function InitConfiguration(src, build, test, lib, babelOptions) {
    let settings = {

    };
    settings.webpack = {};
    /**
     *
     * @type {{root: (string|*), node_modules: (string|*)}}
     */
    const paths = {
        root: Utility.projectDir,
        app: path.join(Utility.projectDir, src),
        build: path.join(Utility.projectDir, build),
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
     // reference path variable
     settings.paths = paths;
     settings.webpack = {
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
             * @link https://webpack.github.io/docs/configuration.html#resolve-extensions
             * An array of extensions that should be used to resolve modules.
             * For example, in order to discover react jsx files, your array should contain the string ".jsx".
             */
            extensions: [".jsx", ".js", ".json"],
            /**
             * @link https://webpack.github.io/docs/configuration.html#resolve-modulesdirectories
             * An array of directory names to be resolved to the current directory as well as its ancestors, and searched for modules.
             * This functions similarly to how node finds “node_modules” directories.
             * For example, if the value is ["mydir"], webpack will look in “./mydir”, “../mydir”, “../../mydir”, etc.
             */
            modules: [paths.app, paths.node_modules]
        },
        /**
         * @link https://webpack.github.io/docs/configuration.html#module
         */
        module: {
            /**
             * https://webpack.github.io/docs/configuration.html#loaders
             */
            rules: [
                {
                    /**
                     * @link https://github.com/gaearon/react-hot-loader
                     * npm install react-hot-loader --save-dev
                     */
                    test: /\.jsx?$/,
                    use: {
                        loader: 'babel-loader',
                        options: babelOptions
                    },
                    exclude: /(node_modules|bower_components|fonts)/
                },
                {
                    /**
                     * @link https://github.com/webpack/file-loader
                     * npm install file-loader --save-dev
                     */
                    test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                    use: "file-loader",
                    include: /fonts/
                },
                {
                    test: /\.s?css$/,
                    use: ["style-loader","css-loader"]
                },
                {
                    /**
                     * @link https://github.com/webpack/url-loader
                     * npm install url-loader --save-dev
                     */
                    test: /\.(png|jpe?g|gif)(\?\S*)?$/,
                    use: "url-loader?limit=100000&name=[name].[ext]"
                },
                {
                    /**
                     * @link https://github.com/webpack/json-loader
                     * npm install json-loader --save-dev
                     */
                    test: /\.txt$/,
                    use: "raw-loader"
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
        settings.webpack.resolve.modules.push(paths.lib);
    }
    return settings;
}

module.exports = InitConfiguration;
