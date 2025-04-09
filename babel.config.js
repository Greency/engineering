export default function (api) {
  api.cache(false);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'entry', // 按需加载 Polyfill
          corejs: 3 // 指定 core-js 版本
        }
      ]
    ],
    plugins: ['@babel/plugin-transform-optional-chaining']
  };
}
