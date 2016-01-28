/*
 * This file is part of the serializerjs package.
 *
 * (c) HAIRCVT <tfidry@haircvt.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

var fs = require('fs');

module.exports = function(config) {
    // Browsers to run on Sauce Labs
    var customLaunchers = {
        SL_Chrome: {
            base: 'SauceLabs',
            browserName: 'chrome',
        },
        SL_InternetExplorer: {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            version: '10',
        },
        SL_FireFox: {
            base: 'SauceLabs',
            browserName: 'firefox',
        },
    };
    config.set({
        basePath: '',
        frameworks: ['browserify', 'mocha'],
        files: ['tests/**/*Test.js'],
        browserify: {
            debug: true,
            bundleDelay: 1000,
            transform: [
                [
                    'babelify',
                    {
                        ignore: /node_modules/,
                    },
                ],
            ],
            extensions: ['.js'],
        },
        preprocessors: {
            'tests/**/*Test.js': ['browserify'],
        },
        reporters: ['dots', 'saucelabs'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        sauceLabs: {
            testName: 'serializerjs',
        },
        captureTimeout: 120000,
        customLaunchers: customLaunchers,
        browsers: Object.keys(customLaunchers),
        singleRun: true,
    });
};
