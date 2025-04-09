import { debounce } from 'lodash-es';
import { testAsyncAndAwait } from '@/utils/testLegacy.js';

export const arrowFun = () => {
  console.log('This is a arrow function!');
};

export const customDebounce = async () => {
  const handler = debounce(() => {
    console.log('debounce handle');
  });

  await testAsyncAndAwait();

  return handler;
};

export const downFun = () => {
  return {
    down: false
  };
};

/** --- 测试 ESM 的静态分析 --- **/
// 通过如下方式导出，会导致 ESM 无法静态分析哪些内容是有用的，
// 进而导致 Tree Shaking 无法起作用，
// 最后导致无法只打包 import 出的内容。

// 查看打包结果，可以看到所有函数都被打包了。

// function arrowFun() {
//   console.log('This is a arrow function!');
// }

// function customDebounce() {
//   const handler = debounce(() => {
//     console.log('debounce handle');
//   });

//   return handler;
// }

// function downFun() {
//   return {
//     down: false
//   };
// }

// export default {
//   arrowFun,
//   customDebounce,
//   downFun
// }

/** --- 测试 ESM 的静态分析 --- **/
