const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackMerge = require('webpack-merge')

const modeConfig = env => require(`./build-utils/webpack.${env}`)(env)
const presetConfig = require('./build-utils/loadPresets')

const config = ({ mode = 'production', presets = [] }) => {
  return webpackMerge(
    {
      mode,
      entry: ['@babel/polyfill', 'react-hot-loader/patch', './src/index.js'],
      module: {
        rules: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
          {
            test: /\.jpe?g/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 5000
                }
              }
            ]
          }
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          title: 'Blog List',
          template: 'public/index.html'
        }),
        new webpack.ProgressPlugin()
      ]
    },
    modeConfig(mode),
    presetConfig({ mode, presets })
  )
}

module.exports = config