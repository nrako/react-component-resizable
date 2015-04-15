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
      debug: true
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
