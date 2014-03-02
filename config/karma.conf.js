module.exports = function(config){
    config.set({
    basePath : '../',

    files : [
      'public/js/lib/angular/angular.js',
      'public/js/lib/angular/angular-*.js',
      'test/lib/angular/angular-mocks.js',

      'public/js/**/*.js',
      'test/client/**/*.js'
    ],

    exclude : [
      'public/js/lib/angular/angular-loader.js',
      'public/js/lib/angular/*.min.js',
      'public/js/lib/angular/angular-scenario.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['PhantomJS'],

    plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

})}
