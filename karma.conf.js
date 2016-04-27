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

        // browsers: ['PhantomJS'],//, 'Chrome', 'Chrome_without_security'],
        browsers: ['Chrome'],
        customLaunchers: {
            Chrome_without_security: {
                base: 'Chrome',
                flags: ['--disable-web-security']
            }
        }
    });
};
