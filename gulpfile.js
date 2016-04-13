/**
 * Created by Dmytro on 3/27/2016.
 */
var browserify = require('browserify'),
    gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    browserSync = require('browser-sync');

/* pathConfig*/
var entryPoint = './src/example.js',
    output = 'example.js',
    browserDir = './',
    jsWatchPath = './src/**/*.js',
    htmlWatchPath = './*.html';
/**/

gulp.task('build', function () {
    return browserify(entryPoint, {debug: true, extensions: ['es6']})
        .transform("babelify", {
            presets: ["es2015"],
            plugins: ["transform-es2015-modules-umd"]
        })
        .bundle()
        .pipe(source(output))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function () {
    const config = {
        server: {baseDir: browserDir}
    };

    return browserSync(config);
});

gulp.task('watch', function () {
    gulp.watch(jsWatchPath, ['js']);
    gulp.watch(htmlWatchPath, function () {
        return gulp.src('')
            .pipe(browserSync.reload({stream: true}))
    });
});

gulp.task('run', ['build', 'watch', 'browser-sync']);
gulp.task('default', ['build']);