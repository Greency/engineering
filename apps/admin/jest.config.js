/** @type {import('ts-jest').JestConfigWithTsJest} **/

import path from 'path';

export default {
  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true }],
    '^.+\\.vue$': '@vue/vue3-jest'
  },
  moduleNameMapper: {
    // fix: https://stackoverflow.com/questions/72428323/jest-referenceerror-vue-is-not-defined
    '^@vue/test-utils': path.resolve(
      path.dirname(''),
      '../../node_modules/@vue/test-utils/dist/vue-test-utils.cjs.js'
    )
  }
};
