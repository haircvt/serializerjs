#!/usr/bin/env bash
#
# This file is part of the serializerjs package.
#
# (c) HAIRCVT <tfidry@haircvt.com>
#
# For the full copyright and license information, please view the LICENSE
# file that was distributed with this source code.
#

SDK_VERSION=$(cat package.json | sed -n -e '/version/ s/.*: *"\([^"]*\).*/\1/p')
echo "Building serializerjs v$SDK_VERSION..."

echo "Cleaning up old builds..."
echo "rm -rf dist/* lib/*"
rm -rf dist/* lib/*

echo "Building release:"
echo "gulp compile"
gulp compile

echo "Bundling and minifying for CDN distribution:"
echo "gulp browserify"
gulp browserify
echo "gulp minify"
gulp minify

echo "Done"
