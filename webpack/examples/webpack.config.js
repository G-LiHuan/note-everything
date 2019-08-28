const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

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
    rules: [
      {
        test: /\.css$/,
        use: indexStyle.extract({
          use: ['css-loader', 'postcss-loader'],
          // css中引用资源的相对路径
          publicPath: '../',
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
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
          },
          'eslint-loader',
        ],
        include: /src/,
        exclude: /node_modules/,
      },
      {
        test: /\.(htm|html)$/,
        use: 'html-withimg-loader',
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 小于8k的图片自动转换成base64
              limit: 8192,
              // 图片打包后存放的目录
              outputPath: 'images/',
            },
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|svg)$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
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
      chunks: ['commons', 'index', 'login'],
    }),
    new HtmlWebpackPlugin({
      template: './src/views/login.html',
      hash: true,
      filename: 'login.html',
      chunks: ['commons', 'login'],
    }),
    indexStyle,
  ],
  mode: 'development',
  devServer: {
    contentBase: './dist',
    host: 'localhost',
    port: 3001,
    hot: true,
  },
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.css',
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /node_modules/,
          name: 'commons',
          chunks: 'initial',
        },
      },
    },
  },
};
