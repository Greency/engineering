<template>
  <div class="content">
    <span class="title">hello world</span>
    <div class="test-scss-file">Test scss file rule</div>
    <div class="test-css-file">Test css file rule</div>
  </div>
  <div class="flex text-red-500 font-bold text-ez-15px">It is OK!</div>
</template>

<script setup lang="ts">
import { arrowFun, customDebounce } from '@/utils';

arrowFun();
customDebounce();

// 测试 eslint 是否支持 Type Defined
let ignoreA: CyEvent = {
  a: ''
  // 测试 vue-tsc --noEmit 对 .vue 的类型安全检测
  // ESLint 不做 TypeScript 类型安全检测，所以需单独调用 TypeScript 提供的类型安全检测功能
  // 如果不注释掉这个属性，会报错（大概意思）：b 在类型 CyEvent 中不存在。
  // b: '',
};

// 测试 ESLint 对 .vue 的代码质量检测以及修复
// 如果注释掉这行代码时，ESLint 会报错提醒 ignoreA 相关问题
console.log(ignoreA);
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 测试构建生产环境时， purgecss 插件对 .vue (css) 的 tree-shaking */
/* 测试效果：去掉所有属性注释，并去掉最后一个的缩进。 */
.tree-shaking-vue-css {
  /* 测试 Stylelint 对 .vue (css) 代码质量检测以及修复 */
  /* 如果有重复属性时，Stylelint 会自动删除多余的，只保留最后一个 */
  /* margin-top: 10px; */
  /* margin-top: 9px; */

  /* 测试 Prettier 对 .vue (css) 的格式化 */
  /* 如果没有缩进时，Prettier 会自动加上缩进 */
  /* margin-top: 8px; */
}
</style>

<style scoped lang="scss">
@use './styles/index1';
@use './styles/index2';

.content {
  margin: 10px;

  & > .title {
    @apply text-ez-15px text-ez-green;
  }
}

/* 测试构建生产环境时， purgecss 插件对 .vue (scss) 的 tree-shaking */
/* 测试效果：去掉所有属性注释，并去掉最后一个的缩进。 */
.tree-shaking-vue-scss {
  /* 测试 Stylelint 对 .vue (scss) 代码质量检测以及修复 */
  /* 如果有重复属性时，Stylelint 会自动删除多余的，只保留最后一个 */

  /* 测试 Prettier 对 .vue (scss) 的格式化 */
  /* 如果没有缩进时，Prettier 会自动加上缩进 */
  margin-top: 8px;
}
</style>
