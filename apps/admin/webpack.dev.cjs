/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  mode: 'development',
  entry: './src/main.ts',
  output: {
    filename: 'bundle.js',
    // 指定打包输出的文件的目录
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    // Loaders 的执行顺序是从右到左
    rules: [
      { test: /\.vue$/, use: 'vue-loader' },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // sass-loader 解析 sass/css，并转译成 css
      // css-loader 解析 @import, url() 语法
      // style-loader 将 css 注入到 <style> 中
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      // appendTsSuffixTo 表示：为所有 .vue 文件添加 .ts 后缀，保证 ts-loader 能解析 .vue 文件中的 <script lang="ts">
      // 执行流程：
      // vue-loader 解析 <script lang="ts">，转换成 foo.vue?vue&type=script&lang=ts 的请求，而 ts-loader 是无法识别 .vue 后缀。
      // 此时 appendTsSuffixTo 就起作用了，请求变为 foo.vue.ts?vue&type=script&lang=ts,
      // ts-loader 识别到 .ts 后缀，就开始解析。
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: { appendTsSuffixTo: [/\.vue$/] }
      }
    ]
  },
  plugins: [new VueLoaderPlugin()],
  resolve: {
    // 如果代码引入的模块没有指明后缀时，按此顺序去寻找对应的模块文件。
    // 比如 import 'foo'（foo.vue）。寻找 foo.ts =》寻找 foo.js => foo.vue。
    extensions: ['.ts', '.js', '.vue', '.json'],
    // 别名
    alias: { '@': path.resolve(__dirname, 'src') }
  },
  devServer: { hot: true, port: 8000 }
};
