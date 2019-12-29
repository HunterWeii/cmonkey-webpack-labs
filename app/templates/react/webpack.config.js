const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Plugins = require('./config/webpack.plugin');
const { project } = require('./config/project.config');
const resolve = relativePath => path.resolve(__dirname, relativePath);

module.exports = (env, options) => {
  let isProd = options.mode === 'production';
  let plugins = Plugins();

  return {
    entry: {
      index: resolve(`src/${project}/index.js`),
    },
    output: {
      filename: `${project}/js/[name].js`,
      path: resolve('dist'),
    },
    module: {
      rules: [
        {
          test: /\.((ts|js)x|js|ts)$/,
          loader: 'babel-loader',
          include: [
            resolve('src'),
            resolve('node_modules/webpack-dev-server/client'),
          ],
        },
        {
          test: /\.(css|scss)$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader?url=false',
            'sass-loader',
          ]
        },
        {
          test: /\.pug$/,
          use: ['pug-loader']
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          loader: 'file-loader',
          options: {
            name: '[folder]/[name].[ext]',
            outputPath: `${project}/assets`
          }
        }
      ],
    },
    devtool: isProd ? false : 'eval',
    plugins,
    performance: {
      hints: false,
    },
    resolve: {
      alias: {
        "src": resolve(`./src/${project}/app`),
      },
      extensions: ['*', '.js', '.scss', '.ts', '.tsx']
    },
		optimization: {
			splitChunks: {
				chunks: 'initial',
				cacheGroups: {
					default: false,
					vendors: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendors',
						enforce: true,
						priority: 10
					}
				}		
			}
		}
  }
};