import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';

// 测试 ../../types/env.d.ts 是否被解析
console.log(import.meta.env);

// https://vite.dev/config/
export default defineConfig({
  build: {
    // 这个属性只对 esbuild 起作用，最低支持到 es6。
    // 测试的文件路径：src/utils/testESBuild.js，src/utils/index.ts。
    // 将 target 的值改为 es6后，testAsyncAndAwait 对应的 async/await 会被转换成
    // Promise 的写法。因为 es6 不支持 async/await
    // target: 'es6',
    rollupOptions: {
      output: {
        // 基本配置 chunk
        // manualChunks: {
        //   // 将 lodash-es 单独打包成 lodash-cy
        //   ['lodash-cy']: ['lodash-es']
        // }
        // 复杂配置 chunk
        manualChunks(id) {
          // console.log(id);

          if (id.includes('src/utils')) {
            return 'utils';
          } else if (id.includes('lodash-es')) {
            return 'lodash';
          }
        }
      }
    }
  },
  plugins: [
    // 解析 Vue 3 单文件
    vue(),
    // JavaScript 兼容性处理，支持低版本浏览器
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  resolve: {
    alias: {
      // @ 别名，以便 vite 能正确解析路径
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
