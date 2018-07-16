const path = require('path');

module.exports = {
  mode:"development",
  entry: './lib/home-page.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.jpg$/,
        exclude: /(node_modules)/,
        use:[
          'file-loader'
        ]
      }
    ]
  },
};