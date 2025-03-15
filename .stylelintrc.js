/** @type {import('stylelint').Config} */

// 查看这篇文章，理解每个配置的含义
// https://www.yuque.com/codercy/fq6dlh/ii1411sfg6cceht2?singleDoc#
module.exports = {
  // 基础配置，检测 .css
  extends: 'stylelint-config-recommended',

  rules: {},

  overrides: [
    // 检测 .scss
    {
      files: ['**/*.scss'],
      extends: 'stylelint-config-recommended-scss'
    },
    // 检测 <style></style> <style lang="scss"></style>
    {
      files: ['**/*.vue'],
      extends: 'stylelint-config-recommended-vue/scss'
    },
    {
      // fix: Unknown rule scss/at-rule-no-unknown. Did you mean at-rule-no-unknown?  scss/at-rule-no-unknown
      files: ['**/*.{scss,vue}'],
      rules: {
        // fix: Unexpected unknown at-rule "@tailwind"  scss/at-rule-no-unknown
        'scss/at-rule-no-unknown': [
          true,
          {
            ignoreAtRules: ['tailwind']
          }
        ]
      }
    }
  ]
};
