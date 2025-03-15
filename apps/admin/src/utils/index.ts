import { debounce } from 'lodash-es';

export const arrowFun = () => {
  console.log('This is a arrow function!');
};

export const customDebounce = () => {
  const handler = debounce(() => {
    console.log('debounce handle');
  });

  return handler;
};

const My: CyEvent = {
  a: '',
  e: ''
};
console.log(My);
