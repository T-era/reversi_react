const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyFilePlugin = require("copy-webpack-plugin");

const PUBLIC_URL = '/rev';
const OUTPUT_DIR = `${__dirname}/rev`;

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "development",

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: "./src/index.tsx",
  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: OUTPUT_DIR,
    // 出力ファイル名
    filename: "main.js",
    publicPath: PUBLIC_URL
  },
  module: {
    rules: [
      {
        // 拡張子 .ts もしくは .tsx の場合
        test: /\.tsx?$/,
        // TypeScript をコンパイルする
        use: "ts-loader"
      }, {
        test: /\.s?css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader
        }, {
          loader: "css-loader"
        }, {
          loader: "sass-loader"
        }]
      }, {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-url-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      templateParameters: {
        PUBLIC_URL: PUBLIC_URL,
      },
      }),
    new MiniCssExtractPlugin(),
    new CopyFilePlugin({
      patterns: [{
        from: "public/favicon.svg",
        to: OUTPUT_DIR
      }, {
        from: "public/manifest.json",
        to: OUTPUT_DIR
      }]
    })  
  ],
  // import 文で .ts や .tsx ファイルを解決するため
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  // ES5(IE11等)向けの指定（webpack 5以上で必要）
  target: ["web", "es5"],
};