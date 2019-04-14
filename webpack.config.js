const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');
const webpack = require('webpack');

const isProduction = /pro?d/gi.test(process.env.NODE_ENV);


module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    library: 'winston-mongo',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|build)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  mode: isProduction ? 'development' : 'production',
  // devtool: isProduction ? undefined : 'source-map',
  devtool: 'inline-source-map',
  plugins: [
    new NodemonPlugin()
  ],
};