// 推荐使用 js 文件进行配置，更灵活
// 官方文档：https://eslint.org/docs/v8.x/use/configure/configuration-files

module.exports = {
  // eslint 默认解析根目录下所有配置，一旦读取的配置 root 为 true，将停止解析。
  // 建议将根目录下的配置的 root 设置为 true，保证不会被其他配置干扰。
  root: true,

  // 指定环境
  env: {
    browser: true,
    node: true
  },

  // eslint-plugin-vue 和 @typescript-eslint/eslint-plugin 都预设了各自的 parser（vue-eslint-parser 和 @typescript-eslint/parser），
  // 但按照顺序来说，@typescript-eslint/eslint-plugin 会覆盖 eslint-plugin-vue 预设的 parser，
  // 但最终是需要基于 vue-eslint-parser 来解析，所以这里要显示的指明 parser。
  parser: 'vue-eslint-parser',

  parserOptions: {
    // eslint 文档中 parserOptions 是不支持 'parser' 这个字段的，
    // 但 vue-eslint-parser 支持再传入 parser，
    // 所以流程是 vue-eslint-parser 处理后，对于 TypeScript 的地方，再用传入的 @typescript-eslint/parser 处理
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },

  // 按照引入的配置文件顺序，进行扩展/覆盖。
  // 由于是引入的“配置文件”，所以大部分情况下也会包含规则/插件等等。
  // 1. 其他配置文件路径。
  // 2. 内置值（比如 eslint:recommended，eslint:all）。
  // 3. 插件（规则是 plugin:packageName），需要安装对应包。插件大部分也包含了规则/插件的声明，所以无需再在 plugins 中引入。
  extends: [
    'eslint:recommended',
    // 对 Vue 的支持（eslint-plugin-vue）。
    'plugin:vue/recommended',
    //（@typescript-eslint/eslint-plugin)。
    // 对 TypeScript 语法的检测（比如：注解，接口，泛型等），关闭可能与 ESLint 产生冲突的规则。
    // ESLint 不做 TypeScript 类型检查，需 TypeScript 自己完成类型检查。比如：npx tsc --noEmit / npx vue-tsc --noEmit。
    'plugin:@typescript-eslint/recommended',
    //（eslint-config-prettier）。
    // 仅关闭可能与 ESLint 产生冲突的规则。prettier 一定要最后引入
    // 为什么不用 eslint-plugin-prettier 这个插件？
    // 看这篇文章：https://www.yuque.com/codercy/fq6dlh/hunftzyk8lpiwyab?singleDoc#
    'prettier'
  ],

  // 插件，（自定义）规则的逻辑执行和默认规则。
  // 如果没有在 extends 中引入，需要在此引入，并在 rules 中配置对应的规则。
  plugins: [],

  // 改写规则，优先级最高
  rules: {
    // Vue 针对组件名必须是多个字的规则，忽略特定的单字组件名
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['Index']
      }
    ]
  },

  // overrides 对指定文件应用不同的规则
  // fix：在 .vue 中直接使用全局类型（不显示引入），报错 ''xxType' is not defined  no-undef'
  // 所以针对 .vue/.tsx 直接不检查
  // 注意⚠️：这样做会导致这两种文件里普通变量也无法检测 no-undef 的情况。
  overrides: [
    {
      files: ['*.vue', '*.tsx', '*.ts'],
      rules: {
        'no-undef': 'off'
      }
    }
  ],

  // 忽略所有 dist 文件
  ignorePatterns: ['**/dist/']
};
