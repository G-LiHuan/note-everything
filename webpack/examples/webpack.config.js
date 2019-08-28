const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {
  CleanWebpackPlugin,
} = require('clean-webpack-plugin');
// const eslintConfig = require('./.eslintrc.js');

const indexStyle = new ExtractTextPlugin('styles/index.css');
// const loginStyle = new ExtractTextPlugin('styles/login.css');

module.exports = {
  entry: {
    index: './src/index.js',
    login: './src/login.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve('./dist'),
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: indexStyle.extract({
        use: 'css-loader',
      }),
      // use: [
      //   'style-loader',
      //   'css-loader',
      // ],
      // use: [{
      //     loader: 'style-loader'
      //   },
      //   {
      //     loader: 'style-loader'
      //   },
      // ]
    }, {
      test: /\.js$/,
      use: [
        'babel-loader',
        'eslint-loader',
      ],
    }],
  },
  plugins: [
    new CleanWebpackPlugin(),
    // 将多个js引入同一个html模板
    // new HtmlWebpackPlugin({
    //   template: './src/views/index.html',
    //   hash: true,
    //   chunks: ['index', 'login']
    // })
    new HtmlWebpackPlugin({
      template: './src/views/index.html',
      hash: true,
      filename: 'index.html',
      chunks: ['index', 'login'],
    }),
    new HtmlWebpackPlugin({
      template: './src/views/login.html',
      hash: true,
      filename: 'login.html',
      chunks: ['login'],
    }),
    indexStyle,
  ],
  mode: 'development',
};
