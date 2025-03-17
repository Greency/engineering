import { RuleConfigSeverity } from '@commitlint/types';

export default {
  // 具体规则看官方：
  // https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 特意写这个规则，只是为了解释每个 type 的使用场景
    'type-enum': [
      RuleConfigSeverity.Error,
      'always',
      [
        'build', // 影响构建系统的更改（如 Webpack、Rollup、npm 脚本）
        'chore', // 其他杂项（不修改源码或测试文件，如更新依赖）
        'ci', // CI 配置变更（如 GitHub Actions、Travis）
        'docs', // 文档更新（如 README、CHANGELOG）
        'feat', // 新功能（Feature）
        'fix', // Bug 修复
        'perf', // 性能优化
        'refactor', // 代码重构（既非新功能，也非修复 Bug）
        'revert', // 回滚之前的提交
        'style', // 代码格式调整（空格、分号等，不改变逻辑）
        'test' // 添加或修改测试用例
      ]
    ]
  }
};
