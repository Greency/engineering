import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import { purgeCSSPlugin } from '@fullhuman/postcss-purgecss';

export default {
  plugins: [
    // 处理 tailwindcss
    tailwindcss(),

    // 处理兼容性
    autoprefixer(),

    // css tree-shaking，考虑开发时的性能，只在生产环境下运行。
    // 适配 Vue 的官方配置：https://purgecss.com/guides/vue.html#install
    ...(process.env.NODE_ENV === 'production'
      ? [
          purgeCSSPlugin({
            content: ['./*.html', './src/**/*.vue', './src/**/*.{css,scss}'],
            defaultExtractor: (content) =>
              content
                .replace(/<style[^]+?<\/style>/gi, '')
                .match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || [],
            safelist: [
              /-(leave|enter|appear)(|-(to|from|active))$/,
              /^(?!(|.*?:)cursor-move).+-move$/,
              /^router-link(|-exact)-active$/,
              /data-v-.*/
            ]
          })
        ]
      : [])
  ]
};
