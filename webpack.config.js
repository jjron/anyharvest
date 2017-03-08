'use strict';

require('dotenv').config();

const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const ExtractText = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: `${__dirname}/frontend/entry.js`,
  output: {
    path: `${__dirname}/build`,
    filename: 'bundle.js',
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new ExtractText('bundle.css'),
    new HTMLPlugin({template: `${__dirname}/frontend/index.html`}),
    new webpack.DefinePlugin({
      __API_URL__: JSON.stringify(process.env.API_URL),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        exclude: [/node_modules/],
        loader: ExtractText.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'resolve-url-loader', 'sass-loader?sourceMap'],
        }),
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.(woff|ttf|svg|eot).*/,
        loader: 'url-loader?limit=10000&name=font/[name].[ext]',
      },
      {
        test: /\.(jpg|jpeg|bmp|tiff|gif|png)$/,
        loader: 'url-loader?limit=10000&name=image/[hash].[ext]',
      },
    ],
  },
};
