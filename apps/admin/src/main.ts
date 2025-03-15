import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from '@/App.vue';
import { arrowFun } from '@/utils';

const app = createApp(App);

app.use(createPinia());

app.mount('#app');

arrowFun();

// 测试共享的类型定义
const MyEvent: CyEvent = {
  a: 'My name is cy'
  // 测试
  // CyEvent 不含 ok 属性。ESLint 不做 TypeScript 的类型检测。
  // TypeScript 的类型检测需自己做，比如：npx tsc --noEmit / npx vue-tsc --noEmit
  // ok: ''
};
console.log(MyEvent);
