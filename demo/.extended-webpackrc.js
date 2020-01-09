const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.md$/,
        use: 'raw-loader'
      }
    ]
  },
  resolve: {
    alias: {
      // '@': path.resolve('nerdlets'),
      '@': path.resolve('../src'),
    }
  }
};