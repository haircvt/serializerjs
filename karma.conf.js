/*
 * This file is part of the serializerjs package.
 *
 * (c) HAIRCVT <tfidry@haircvt.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['browserify', 'mocha'],
        files: [
            'node_modules/babel-polyfill/dist/polyfill.js',
            'tests/**/*Test.js',
        ],
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
        reporters: ['dots'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['PhantomJS'],
        singleRun: true,
        concurrency: Infinity,
    });
};
