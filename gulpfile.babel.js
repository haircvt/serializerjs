/*
 * This file is part of the serializerjs package.
 *
 * (c) HAIRCVT <tfidry@haircvt.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import babel from 'gulp-babel';
import browserify from 'browserify';
import derequire from 'gulp-derequire';
import gulp from 'gulp';
import insert from 'gulp-insert';
import path from 'path';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import source from 'vinyl-source-stream';
import uglify from 'gulp-uglify';
import PACKAGE from './package.json';

const VERSION = PACKAGE.version;
const COPYRIGHT = `
/*
 * serializerjs JavaScript Library v${VERSION}.
 *
 * (c) HAIRCVT <tfidry@haircvt.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * Date: ${new Date().toISOString()}
 */

 `;

gulp.task('compile', () => {
    return gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('lib'))
    ;
});

gulp.task('browserify', () => {
    const stream = browserify({
        builtins: {_process: true},
        entries: 'lib/serializerjs.js',
        standalone: 'serializerjs',
    })
        .exclude('xmlhttprequest')
        .ignore('_process')
        .bundle()
    ;

    return stream.pipe(source('serializerjs.js'))
        .pipe(derequire())
        .pipe(insert.prepend(COPYRIGHT))
        .pipe(gulp.dest('./dist'))
    ;
});

gulp.task('minify', () => {
    return gulp.src('dist/serializerjs.js')
        .pipe(uglify())
        .pipe(insert.prepend(COPYRIGHT))
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('./dist'))
    ;
});
