/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */

module.exports = {
  // CSS 相关的检测与修复
  '*.{vue,css,scss}': 'stylelint --config  ./.stylelintrc.js --fix'
};
