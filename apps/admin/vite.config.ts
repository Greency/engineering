import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// 测试 ../../types/env.d.ts 是否被解析
// console.log(import.meta.env);

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // 基本配置 chunk
        // manualChunks: {
        //   // 将 lodash-es 单独打包成 lodash-cy
        //   ['lodash-cy']: ['lodash-es']
        // }
        // 复杂配置 chunk
        manualChunks(id) {
          if (id.includes('src/utils')) {
            return 'utils';
          } else if (id.includes('lodash-es')) {
            return 'lodash';
          }
        }
      }
    }
  },
  plugins: [vue()],
  resolve: {
    alias: {
      // @ 别名，以便 vite 能正确解析路径
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
