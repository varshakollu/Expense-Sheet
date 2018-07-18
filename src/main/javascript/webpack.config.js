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
      },
    {
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'src')
    }, 
    {
      test: /\.css$/,
      use: [
        {
          loader: 'style-loader'
        }, 
        {
          loader: 'css-loader',
          query: {
            modules: true,
            localIdentName: '[name]__[local]___[hash:base64:5]'
          }
        }
      ]
    }],
  }
};