const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // エントリーポイントを指定
  // インポートされるだけの関数ファイルは指定する必要はない
  // 後に [name] でエントリーポイント名が使える
  entry: {
    main: './web/js/main.js',
    stat: './web/js/stat.js',
  },
  // 最終的な成果物の場所
  // js ファイルは js フォルダに出力させる
  // path は絶対パスで指定すること！
  output: {
    path: path.resolve(__dirname, 'web', 'dist'),
    filename: 'js/[name].[contenthash].js'
  },
  module: {
    rules: [
      {
        // enforce: 'pre'; によって ESlint を一番最初に実行させる
        // fix: true; で自動修正可能な部分を修正させる
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true,
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          // webpack は import, export の変換しかしない。それ以外の高度な記法を使っている場合に babel が必要。
          loader: "babel-loader",
          // options: {
          //   // babel.config.json（jest で必要なので作った） があるからいらない気がする。
          //   presets: ['@babel/preset-env']
          // }
        }
      },
      {
        // HtmlWebpackPlugin と組み合わせて使う（HTML に埋め込んだ画像のパス解析などに用いられる）
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        // テンプレート HTML 中の画像ファイルを扱えるようにする
        // 上記 html-loader と組み合わせて使う
        test: /\.(jpe?g|gif|png|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash].[ext]',
              outputPath: 'img',
              // 生成される html ファイルに現れるリンクに影響する。指定しなければ相対パスになる
              // publicPath: '/img',
            },
          }
        ],
      },
      {
        // 色々なページで使いまわしたいので、HTML には書かず js で import して変換させると良さそう。
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],  // 順番が大事。後ろから実行される
      },
    ],
  },
  plugins: [
    // ビルド前、出力ディレクトリを削除してから行う
    new CleanWebpackPlugin(),
    // 必要な分、書き足していく
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './web/index.html',
      // 指定したチャンクのみを含めるようにすることができる
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      filename: 'terms.html',
      template: './web/terms.html',
      chunks: ['stat'],
    }),
    // バンドルに含まれる CSS 成分を別途 CSS ファイルに抽出する
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
    }),
  ],
  // 設定例１ 既存ライブラリと自作ライブラリを分ける場合
  // optimization: {
  //   splitChunks: {
  //     chunks: 'initial',
  //     cacheGroups: {
  //       vendors: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: "vendors",
  //       },
  //       originals: {
  //         test: /web[\\/]js[\\/]module/,
  //         name: "mymodules",
  //         // 分割する条件を指定する
  //         // 細かいのに無理して分割するとリクエストが増えて逆効果になりうる
  //         minSize: 0,
  //       },
  //     }
  //   },
  // },
  // 設定例２ production では name: false; がおすすめとのこと
  optimization: {
    splitChunks: {
      chunks: 'initial',
      name: false,
      minSize: 0,
    },
  },
};