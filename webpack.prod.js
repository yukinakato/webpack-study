const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimizer: [
      // minimizer のデフォルトを上書きしてしまうため、Terser の項目を改めて指定する必要がある
      new TerserPlugin({
        // ライセンスファイルを別途抽出しない
        extractComments: false,
        terserOptions: {
          compress: {
            // console.log を自動で削除する
            drop_console: true,
          },
          output: {
            // コメントを削除する
            comments: false,
          }
        },
      }),
      // css をミニファイする
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
});

