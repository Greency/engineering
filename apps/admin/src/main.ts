import { createApp } from 'vue';
import router from '@/router';
import { createPinia } from 'pinia';

import App from '@/App.vue';

const app = createApp(App);

app.use(router);
app.use(createPinia());

app.mount('#app');

// 测试共享的类型定义
const MyEvent: CyEvent = {
  a: 'My name is cy'
  // 测试 vue-tsc --noEmit 对 .ts 的类型安全检测
  // ESLint 不做 TypeScript 类型安全检测，所以需单独调用 TypeScript 提供的类型安全检测功能
  // 如果不注释掉这个属性，会报错（大概意思）：b 在类型 CyEvent 中不存在。
  // b: '',
};

// 测试 ESLint 对 .ts 的代码质量检测以及修复
// 如果注释掉这行代码时，ESLint 会报错提醒 MyEvent 相关问题
console.log(MyEvent);
