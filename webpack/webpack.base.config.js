const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react']
        }
      }
    }, {
      test: /\.css$/,
      exclude: [/global.css/, /flaticon.css/, /theme.css/],
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../',
            hmr: process.env.NODE_ENV === 'development',
          },
        },
        {
          loader: 'css-loader',
          options: {
            modules: {
	             localIdentName: process.env.NODE_ENV === 'development' ? "[name]__[local]___[hash:base64:5]" : "[hash:base64:5]",
            }
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: () => [
              postcssPresetEnv(/* pluginOptions */)
            ]
          }
        }
      ],
    }, {
      test: [/global.css/, /flaticon.css/, /theme.css/],
      use: [
        {
            loader: MiniCssExtractPlugin.loader,
        },
        'css-loader'
      ],
    }, {
      test: /\.(png|jpg|jpeg|gif|svg|ttf|woff|woff2|eot)$/,
      use: [
        {
          loader: 'file-loader'
        }
      ]
    }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      hash: true,
      filename: "index.html",  //target html
      template: "./src/index.html" //source html
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ]
};
