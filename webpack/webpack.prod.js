const path = require("path");
const CopyPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const base = require("./webpack.base.config");
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  optimization: {
    minimizer: [
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({}),
      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
          compress: {
            inline: false
          }
        }
      })
    ],
    runtimeChunk: false,
    splitChunks: {
      cacheGroups: {
        default: false,
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          minChunks: 2
        }
      }
    },
    usedExports: true
  },
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "./../",  "build"),
    filename: "[name]-[hash].js",
    publicPath: '/'
  },
  plugins: [
    new CopyPlugin([
      { from: 'favicon.ico' }
    ]),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
//    new BundleAnalyzerPlugin()
  ]
};

module.exports = merge(base, config);
