/**
 * Created by Dmytro on 3/27/2016.
 */
var browserify = require('browserify'),
    gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    browserSync = require('browser-sync');

/* pathConfig*/
var entryPoint = './src/eventDriver.js',
    browserDir = './',
    jsWatchPath = './src/**/*.js',
    htmlWatchPath = './index.html';
/**/

gulp.task('build', function () {
    return browserify(entryPoint, {debug: true, extensions: ['es6']})
        .transform("babelify", {presets: ["es2015"]})
        .bundle()
        .pipe(source('eventDriver.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(gulp.dest('./dist/'))
        .pipe(sourcemaps.write())
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function () {
    const config = {
        server: {baseDir: browserDir}
    };

    return browserSync(config);
});

gulp.task('watch', function () {
    gulp.watch(jsWatchPath, ['build']);
    gulp.watch(htmlWatchPath, function () {
        return gulp.src('')
            .pipe(browserSync.reload({stream: true}))
    });
});

gulp.task('default', ['build']);

gulp.task('run', ['build', 'watch', 'browser-sync']);