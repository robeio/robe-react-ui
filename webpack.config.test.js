"use strict";
/**
 * import common webpack settings
 */
const commonSettings = require("./webpack.config.common.js");

/**
 * @link https://webpack.github.io/docs/configuration.html#cache
 * Cache generated modules and chunks to improve performance for multiple incremental builds.
 This is enabled by default in watch mode.
 * @type {boolean}
 */
commonSettings.cache = true;

/**
 * @link https://webpack.github.io/docs/configuration.html#debug
 * Switch loaders to debug mode.
 * @type {boolean}
 */
commonSettings.debug = true;

/**
 * @link https://webpack.github.io/docs/configuration.html#devtool
 * Choose a developer tool to enhance debugging.
 * source-map - A SourceMap is emitted. See also output.sourceMapFilename.
 * @type {string}
 */
commonSettings.devtool = "eval";

/*
*
*
*
*/
module.exports = function configure(config) {
    config.set({
        browsers: ["PhantomJS"],
        singleRun: true,
        plugins: [
            "karma-webpack",
            "karma-mocha",
            "karma-coverage",
            "karma-phantomjs-launcher",
            "karma-mocha-reporter",
            "karma-bamboo-reporter"
        ],
        frameworks: ["mocha"],

        files: [
            "__test__/**/*.spec.js"
        ],
        preprocessors: {
            "__test__/**/*.spec.js": ["webpack", "coverage"]
        },
        reporters: ["mocha", "bamboo", "coverage"],

        webpack: commonSettings,
        webpackServer: {
            noInfo: true
        },
        coverageReporter: {
            reporters: [{ type: "lcov" }]
        },
    });
};

