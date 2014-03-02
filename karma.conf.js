// Karma configuration
// Generated on Sun Mar 02 2014 19:32:03 GMT+0530 (IST)


// base path, that will be used to resolve files and exclude
basePath = '';


// list of files / patterns to load in the browser
files = [
  JASMINE,
  JASMINE_ADAPTER,
  REQUIRE,
  REQUIRE_ADAPTER,
  'tests/main.js',
  {pattern: 'src/js/core/rfclass.js', included: false},
  {pattern: 'src/js/renderers/*.js', included: false},
  {pattern: 'tests/renderers/*Spec.js', included: false},
];


// list of files to exclude
exclude = [
  
];

preprocessors = {
    '**/src/js/renderers/*.js': 'coverage'
};


// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
reporters = ['dots', 'coverage'];

coverageReporter = {
  type : 'text-summary',
  dir : 'coverage/',
  file : 'coverage.txt'
}

// web server port
port = 9876;


// cli runner port
runnerPort = 9100;


// enable / disable colors in the output (reporters and logs)
colors = true;


// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;


// enable / disable watching file and executing tests whenever any file changes
autoWatch = false;


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ['Chrome', 'PhantomJS'];


// If browser does not capture in given timeout [ms], kill it
captureTimeout = 60000;


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = true;
