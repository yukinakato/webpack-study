const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  // devServer 使用時は自動的に watch: true; になる
  // ビルド時は watch せず、継続してウォッチしたい時は devServer を起動するという運用も可能
  devServer: {
    // ポートはデフォルトで 8080 だが、分かりやすく指定している
    port: 8080,
    // Docker で使用する場合に必要
    host: '0.0.0.0',
    // webpack で出来上がったファイル以外はサーブしない
    contentBase: false,
    // 静的ファイルをサーブしたい場合は、以下の contentBase の設定を行う
    // ここではルートを web/dist に設定している。絶対パスで設定すること
    // 基本的に本番に展開するディレクトリを指定すると良さそう（予期せぬファイルにアクセスできてしまうことを防ぐため）
    // contentBase: path.resolve(__dirname, 'web', 'dist'),
  },
});
