/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils';

import CustomButton from './CustomButton.vue';

describe('CustomButton', () => {
  it('插槽', () => {
    const wrapper = mount(CustomButton, {
      slots: {
        default: '<span> hello world </span>'
      }
    });

    expect(wrapper.find('span').exists()).toBe(true);
    expect(wrapper.find('span').text()).toBe('hello world');
  });

  it('button 点击事件，点击后 div 节点消失', async () => {
    const wrapper = mount(CustomButton);
    const buttonWrapper = wrapper.find('button');

    await buttonWrapper.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('click');
    expect(wrapper.find('div').exists()).toBe(false);
  });

  it('disable props', async () => {
    const wrapper = mount(CustomButton, {
      props: {
        disabled: true
      }
    });
    const buttonWrapper = wrapper.find('button');

    await buttonWrapper.trigger('click');

    expect(wrapper.emitted('click')).toBeUndefined();
  });
});
