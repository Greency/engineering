/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/main.ts',
  output: {
    filename: '[name].[contenthash:8].js',
    // 指定打包输出的文件的目录
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    // Loaders 的执行顺序是从右到左
    rules: [
      { test: /\.vue$/, use: 'vue-loader' },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      // sass-loader 解析 sass/css，并转译成 css
      // postcss-loader 处理 css 兼容性、压缩等
      // css-loader 解析 @import, url() 语法
      // MiniCssExtractPlugin.loader 将 css 提取成文件
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(js|cjs|mjs)$/,
        use: {
          loader: 'babel-loader',
          options: {
            rootMode: 'upward'
          }
        }
      },
      // appendTsSuffixTo 表示：为所有 .vue 文件添加 .ts 后缀，保证 ts-loader 能解析 .vue 文件中的 <script lang="ts">
      // 执行流程：
      // vue-loader 解析 <script lang="ts">，转换成 foo.vue?vue&type=script&lang=ts 的请求，而 ts-loader 是无法识别 .vue 后缀。
      // 此时 appendTsSuffixTo 就起作用了，请求变为 foo.vue.ts?vue&type=script&lang=ts,
      // ts-loader 识别到 .ts 后缀，就开始解析。
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: { appendTsSuffixTo: [/\.vue$/] }
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    // 将 css 分割成独立的文件
    new MiniCssExtractPlugin(),
    // 生成 html
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      filename: 'index.html',
      // 压缩 html
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    })
  ],
  resolve: {
    // 在导入三方库时，按照指定的顺序读取 package.json 中对应的字段。
    // 比如 vue 在 package.json 中声明了 import/require 字段，会优先读取 import 对应的文件。
    // 适用以下情况：
    // 1. 优先读取某类模块，比如 ESM。
    // 2. 报错找不到模块，有可能你设置的读取字段在这个模块的 package.json 中没有声明，此时你需要在 mainFields 加入那个模块入口特有的字段。
    mainFields: ['import', 'require', 'main'],
    // 如果代码引入的模块没有指明后缀时，按此顺序去寻找对应的模块文件。
    // 比如 import 'foo'（foo.vue）。寻找 foo.ts =》寻找 foo.js => foo.vue。
    extensions: ['.ts', '.js', '.vue', '.json'],
    // 别名
    alias: { '@': path.resolve(__dirname, 'src') }
  },
  // 生产环境默认使用 terser-webpack-plugin 压缩 js，所以无需显示的配置
  optimization: {
    splitChunks: {
      // 表示哪些块会执行进入 optimization 的流程，
      // 如果你想更细粒度的控制块的生成，设置为 all 最合适。
      // 可选值：all, async, initial
      chunks: 'all',
      cacheGroups: {
        // lodash: {
        //   test: (module, chunks) => {
        //     console.log('--- module: ', module);
        //     console.log('*** chunks: ', chunks);
        //   }
        // },
        utils: {
          test: /src\/utils\//,
          enforce: true
        }
      }
    }
  }
};
