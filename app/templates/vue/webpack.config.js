const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Plugins = require('./config/webpack.plugin');
const { project } = require('./config/project.config');
const resolve = relativePath => path.resolve(__dirname, relativePath);

module.exports = (env, options) => {
  let isProd = options.mode === 'production';
  let plugins = Plugins();

  plugins.push(
    new VueLoaderPlugin()
  );

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
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              css: ['vue-style-loader', {
                loader: 'css-loader?url=false',
              }],
              js: [
                'babel-loader',
              ],
            },
            cacheBusting: true,
          },
        },
        {
          test: /\.js$/,
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
          test: /\.ts?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/\.vue$/]
          }
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
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
      },
      extensions: ['*', '.vue', '.js', '.json', '.scss', '.ts'],
    },
    performance: {
      hints: false,
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