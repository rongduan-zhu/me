'use strict';

const path = require('path');

const autoprefixer = require('autoprefixer')
const precss = require('precss')

let ExtractTextPlugin = require("extract-text-webpack-plugin");
let extractCss = new ExtractTextPlugin('css/[name].css');

module.exports = {
  context: path.resolve(__dirname, 'input'),
  entry: {
    app: './js/app.js',
    style: './css/app.css'
  },
  output: {
    path: path.resolve(__dirname, 'output'),
    filename: 'js/[name].js'
  },
  module: {
    preLoaders: [
      { test: /\.css$/, loader: 'stylelint' }
    ],
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader?presets[]=es2015']
      },
      {
        test: /\.tsx?$/,
        loaders: ['ts-loader']
      },
      {
        test: /\.css$/,
        loader: extractCss.extract('style', 'css!postcss')
      }
    ]
  },
  plugins: [extractCss],
  postcss: function() {
    return [autoprefixer, precss];
  },
  stylelint: {
    configFile: path.join(__dirname, './.stylelintrc')
  },
  watchOptions: {
    poll: true
  }
}
