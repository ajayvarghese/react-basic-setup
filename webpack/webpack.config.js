const merge = require('webpack-merge');
const base = require("./webpack.base.config");

const config = {
  devtool: 'inline-source-map',
  mode: 'development',
  entry: ['react-hot-loader/patch', './src'],
  devServer: {
    proxy: {
      '/rest': 'http://localhost:9999/',
    }
  }
};

module.exports = merge(base, config);
