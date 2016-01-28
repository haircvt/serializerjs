/*
 * This file is part of the serializerjs package.
 *
 * (c) HAIRCVT <tfidry@haircvt.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

var baseConfig = require('./karma.conf.dist');
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

    var sauceConfig = Object.assign(
        baseConfig,
        {
            reporters: ['dots', 'saucelabs'],
            sauceLabs: {
                build: 'Travis #' + process.env.TRAVIS_BUILD_NUMBER + ' (' + process.env.TRAVIS_BUILD_ID + ')',
                testName: 'Serializer.js',
                tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
                startConnect: false,
                connectOptions: {
                    port: 5757,
                    logfile: 'sauce_connect.log',
                },
            },
            captureTimeout: 2 * 60 * 1000,
            customLaunchers: customLaunchers,
            browsers: Object.keys(customLaunchers),
            singleRun: true,
            concurrency: 2,
        }
    );

    console.log(sauceConfig);
    //console.log(sauceConfig.frameworks);

    config.set(sauceConfig);
};
