export default {
  // tailwindcss 只会解析 content 指定的目录/文件，
  // 所以 content 必须要配置，保证最大程度的兼容性推荐下面这种全局匹配，不指定特定文件后缀（比如*.{vue,tsx}）
  content: ['./src/*'],
  theme: {
    // 强烈推荐 extend 扩展方式，tailwindcss 预设的主题配置还可以继续使用
    extend: {
      fontSize: {
        'ez-15px': ['15px', { lineHeight: '25px' }]
      },
      colors: {
        'ez-green': 'green'
      }
    }
    // 如果采用直接替换的方式，tailwindcss 预设的主题配置将不能使用
    // 比如 text-red-500 这个默认配置将不能使用
    // colors: {
    //   'ez-green': 'green'
    // }
  },
  plugins: []
};
