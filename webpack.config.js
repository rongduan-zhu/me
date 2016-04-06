'use strict';

const path = require('path');

const autoprefixer = require('autoprefixer');
const precss = require('precss');
const cssImport = require('postcss-import');

let ExtractTextPlugin = require("extract-text-webpack-plugin");
let extractCss = new ExtractTextPlugin('css/[name].css');

module.exports = {
  context: path.resolve(__dirname, 'input'),
  entry: {
    app: './js/app.js',
    init: './ts/init.ts',
    ng2App: './ts/main.ts',
    style: './css/app.css'
  },
  output: {
    path: path.resolve(__dirname, 'output'),
    filename: 'js/[name].js'
  },
  module: {
    preLoaders: [
      { test: /\.js$/, loader: 'eslint' },
      { test: /\.tsx?$/, loader: 'tslint' },
      { test: /\.css$/, loader: 'stylelint' }
    ],
    loaders: [
      {
        test: /\.js$/,
        loaders: ['ng-annotate', 'babel-loader?presets[]=es2015']
      },
      {
        test: /\.tsx?$/,
        loaders: ['awesome-typescript-loader']
      },
      {
        test: /\.css$/,
        loader: extractCss.extract('style', 'css!postcss')
      },
      {
        test: /\.html$/,
        loaders: [
          'ngtemplate',
          'html'
        ]
      }
    ]
  },
  plugins: [extractCss],
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.ts', '.ng2.html','.html']
  },
  postcss: function(webpack) {
    return [
      cssImport({ addDependencyTo: webpack }),
      precss(),
      autoprefixer
    ];
  },
  eslint: {
    emitError: true,
    failOnError: true
  },
  tslink: {
    emitErrors: true,
    failOnHint: true
  },
  stylelint: {
    configFile: path.join(__dirname, './.stylelintrc')
  },
  watchOptions: {
    poll: true
  }
};
