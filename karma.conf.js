/**
 * Created by Dmytro on 4/26/2016.
 */
module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],

        files: [
            './dist/**/*.js'
        ],

        reporters: ['mocha'],

        browsers: ['PhantomJS'],
        // browsers: ['Chrome']
        
        autoWatch: false,
        singleRun: true
    });
};
