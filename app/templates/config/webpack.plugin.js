const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const { project } = require('./project.config');

function Plugins() {
  return [
    new MiniCssExtractPlugin({
      filename: `${project}/css/main.css`
    }),
    new HtmlWebpackPlugin({
      filename: `${project}/index.html`,
      template: `./src/${project}/pug/index.pug`,
      inject: false
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: [`dist/${project}`] },
      files: [`./dist/${project}/*`]
    })
  ]
}

module.exports = Plugins;