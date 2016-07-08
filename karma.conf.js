module.exports = function (config) {
  config.set({
    frameworks: [
      'mocha',
      'chai',
      'sinon',
      'browserify'
    ],

    files: [
      'test/**/*.js'
    ],

    browserify: {
      configure: function browserify(bundle) {
        bundle.once('prebundle', function prebundle() {
          bundle.transform('babelify', {presets: ['es2015', 'stage-2']});
        });
      }
    },

    preprocessors: {
      'test/**/*.js': ['browserify']
    },

    reporters: ['progress'],

    browsers: ['Chrome'],

    client: {
      mocha: {
        reporter: 'html'
      }
    }
  });
};
