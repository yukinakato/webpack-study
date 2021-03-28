# webpack セットアップ
```
npm init -y
{
  "scripts": {
    "test": "jest",
    "build:dev": "webpack --config webpack.dev.js",
    "build": "webpack --config webpack.prod.js",
    "s": "webpack-dev-server --config webpack.dev.js"
  }
}
```
"s" いる？
"build:dev" でホットリロードさせたら良さそう。
ファイルを編集したら即再コンパイルされ、nginx から確認できる。

## 必要なものをインストール
### webpack 基本
```
npm install --save-dev webpack webpack-cli webpack-dev-server webpack-merge
```

### ローダー、プラグイン
```
npm install --save-dev css-loader sass-loader node-sass file-loader html-loader postcss-loader autoprefixer@9.8.6
npm install --save-dev clean-webpack-plugin html-webpack-plugin mini-css-extract-plugin optimize-css-assets-webpack-plugin
```
`postcss.config.js` を作成すること。

### ESLint, Prettier 関連
```
npm install --save-dev eslint eslint-loader
npm install --save-dev prettier eslint-plugin-prettier eslint-config-prettier
```
`npx eslint --init` で `.eslintrc.json` を生成し、rules に必要なものを記述する。
```
    "extends": ["eslint:recommended", "plugin:prettier/recommended"],
```
ESlint の設定として return 後の unreachable なコードに対するエラー等を出す。
Prettier の設定として末尾のセミコロンの自動付加等を行う。Prettier の記述を後に持ってくること。
`.prettierrc.json` で Prettier の詳細設定が可能

### Babel 関連
```
npm install --save-dev @babel/core @babel/preset-env babel-loader
```
`babel.config.json`, `.browserslistrc` を作成すること。

### テスト
```
npm install --save-dev jest
```
jest をインストールしたら babel-jest も自動的にインストールされ、`babel.config.js` があれば自動的にファイルを変換した上でテストしてくれる。

### 外部ライブラリ (--save)
```
npm install --save jquery bootstrap popper.js chart.js @fortawesome/fontawesome-free
```

## 要調査
* ポリフィル
