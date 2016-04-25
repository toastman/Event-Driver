/**
 * Created by Dmytro on 3/27/2016.
 */
var browserify = require('browserify'),
    gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    exec = require('gulp-exec');

gulp.task('build', function () {
    return browserify('./src/eventDriver.js', {debug: true, extensions: ['es6']})
        .transform("babelify", {presets: ["es2015"]})
        .bundle()
        .pipe(source('eventDriver.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(gulp.dest('./dist/'))
        .pipe(sourcemaps.write())
});

gulp.task('test', function () {
    return browserify('./test/eventDriver.spec.js', {debug: true, extensions: ['es6']})
        .transform("babelify", {presets: ["es2015"]})
        .bundle()
        .pipe(source('eventDriver.spec.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(gulp.dest('./dist/'))
        .pipe(sourcemaps.write())
        .pipe(exec('npm test'));
});

gulp.task('default', ['build']);

gulp.task('run', ['build', 'test']);