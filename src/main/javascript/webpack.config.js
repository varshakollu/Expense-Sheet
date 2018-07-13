// var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
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
        test: /.\css$/,
        include: "/src",
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.jpg$/,
        use:[
          'file-loader'
        ]
      }
    ]
  },
};