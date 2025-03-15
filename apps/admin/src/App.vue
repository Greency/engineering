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
  a: '',
  // 测试
  // CyEvent 不含 ok 属性。ESLint 不做 TypeScript 的类型检测。
  // TypeScript 的类型检测需自己做，比如：npx tsc --noEmit / npx vue-tsc --noEmit
  ok: ''
};
console.log(ignoreA);
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 测试 css tree-shaking */
.bb {
  display: flex;
  padding: 10rem;
  /* 测试 Stylelint .vue 相关配置 */
  /* padding: 10rem; */
}
</style>

<style scoped lang="scss">
@use './styles/index1';
@use './styles/index2';

.content {
  margin: 10px;
  // 测试 Stylelint .vue 相关配置
  // margin: 10px;

  & > .title {
    @apply text-ez-15px text-ez-green;
  }
}

/* 测试 css tree-shaking */
.cc {
  padding: 10px;
}
</style>
