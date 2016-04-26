/**
 * Created by Dmytro on 3/27/2016.
 */
var browserify = require('browserify'),
    watchify = require('watchify'),
    gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    exec = require('gulp-exec');


// gulp.task('build', function () {
//     return browserify('/src/eventDriver.js', {debug: true, extensions: ['es6']})
//         .transform("babelify", {presets: ["es2015"]})
//         .bundle()
//         .pipe(source('eventDriver.js'))
//         .pipe(buffer())
//         .pipe(sourcemaps.init())
//         .pipe(gulp.dest('./dist/'))
//         .pipe(sourcemaps.write());
// });
//
// gulp.task('test', function () {
//     return browserify('./test/eventDriver.spec.js', {debug: true, extensions: ['es6']})
//         .transform("babelify", {presets: ["es2015"]})
//         .bundle()
//         .pipe(source('eventDriver.spec.js'))
//         .pipe(buffer())
//         .pipe(sourcemaps.init())
//         .pipe(gulp.dest('./dist/'))
//         .pipe(sourcemaps.write());
// });
//
// gulp.task('default', ['build']);
//
// gulp.task('run', ['build', 'test']);

gulp.task('build', function(){
    compile();
});
gulp.task('watch', function () {
    return compile(true);
});

gulp.task('default', ['build']);

function compile(watch) {
    var bundler = watchify(browserify('./src/eventDriver.js', {
        debug: true,
        extensions: ['es6']
    }).transform("babelify", {presets: ["es2015"]}));

    var testBundler = watchify(browserify('./src/eventDriver.spec.js', {
        debug: true,
        extensions: ['es6']
    }).transform("babelify", {presets: ["es2015"]}));

    function _bundle(bundler, output) {
        return bundler.bundle()
            .on('error', function (err) {
                console.error(err);
                this.emit('end');
            })
            .pipe(source(output))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(sourcemaps.write(''))
            .pipe(gulp.dest('./dist'));
    }

    if (watch) {
        bundler.on('update', function () {
            _bundle(bundler, 'eventDriver.js');
        });

        testBundler.on('update', function () {
            _bundle(testBundler, 'eventDriver.spec.js')
        });
    }

    _bundle(testBundler, 'eventDriver.spec.js');

    return _bundle(bundler, 'eventDriver.js');
}
