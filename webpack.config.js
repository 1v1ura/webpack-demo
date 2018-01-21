const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: '[name].css',
  disable: process.env.NODE_ENV === 'development'
});

module.exports = [
  {
    entry: {
      'dist/common/js/main': './src/js/main.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname)
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  'env', {
                    'modules': false
                  }
                ]
              ]
            }
          }
        }
      ]
    },
    devtool: 'source-map'
  }, {
    entry: {
      'dist/common/css/base': './src/scss/base.scss',
      'dist/common/css/parts': './src/scss/parts.scss',
      'dist/hoge/css/stlye': './src/scss/hoge/style.scss'
    },
    output: {
      filename: '[name].css',
      path: path.resolve(__dirname)
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: extractSass.extract({
            use: [
              {
                loader: 'css-loader'
              }, {
                loader: 'sass-loader',
                options: {
                  outputStyle: 'expanded'
                }
              }
            ],
            fallback: 'style-loader'
          })
        }
      ]
    },
    plugins: [
      extractSass,
      new CleanWebpackPlugin(['dist']),
      new CopyWebpackPlugin([
        {
          from: 'src/assets',
          to: 'dist'
        }
      ])
    ],
    devtool: 'source-map'
  }
];