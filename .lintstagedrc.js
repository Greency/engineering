/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */

const path = require('path');
const fs = require('fs');
const yaml = require('yaml');
const glob = require('glob');

// 读取 pnpm-workspace.yaml
const workspace = yaml.parse(
  fs.readFileSync(path.resolve(__dirname, 'pnpm-workspace.yaml'), 'utf8')
);
// 将 Glob 模式转换为 package.json 路径匹配
const patterns = workspace.packages.map((p) => `${p}/package.json`);
// 匹配所有子包的 package.json 路径
const packageJsonPaths = glob.sync(patterns, {
  ignore: ['**/node_modules/**'], // 排除 node_modules
  absolute: false // 返回相对路径
});
// 子包相对路径
const subPackagePaths = packageJsonPaths.map((pkgPath) =>
  path.dirname(pkgPath)
);

// 解决 Monorepo 项目下，vue-tsc 无法正确读取对应子项目的 tsconfig.json 文件
function tscHandler() {
  return (filenames) =>
    filenames.map((filename) => {
      const find = subPackagePaths.find((path) => filename.indexOf(path) > -1);

      if (!find) {
        console.error(
          `${filename} 没有对应的包，请确认这个文件所在位置是否正确`
        );
        process.exit(1);
      }

      return `vue-tsc --project ${process.cwd()}/${find} --noEmit`;
    });
}

module.exports = {
  '*.vue': [
    'stylelint --fix',
    'eslint . --fix',
    tscHandler(),
    'prettier --write'
  ],
  '*.{css,scss}': ['stylelint --fix', 'prettier --write'],
  '*.js': ['eslint . --fix', 'prettier --write'],
  '*.{ts,tsx}': ['eslint . --fix', tscHandler(), 'prettier --write']
};
