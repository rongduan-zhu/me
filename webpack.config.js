'use strict';

const path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'input'),
  entry: {
    app: './js/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'output'),
    filename: 'js/[name].js'
  },
  module: {
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
        loader: 'style!css'
      }
    ]
  }
}
