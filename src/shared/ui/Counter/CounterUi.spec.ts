/**
 * @vitest-environment happy-dom
 */

import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import CounterUi from './CounterUi.vue';

describe('CounterUi', () => {
  it('Click on "+" must be increase modelValue by 1', async () => {
    const wrapper = mount(CounterUi, {
      props: {
        modelValue: 1,
        maxValue: 10,
      },
    });

    await wrapper.find('.counter__increase').trigger('click');

    expect(wrapper.emitted()['update:modelValue']).toBeTruthy();
    expect(wrapper.emitted()['update:modelValue']![0]).toEqual([2]);
  });

  it('Click on "-" must be decrease madelValue by 1', async () => {
    const wrapper = mount(CounterUi, {
      props: {
        modelValue: 5,
        maxValue: 10,
      },
    });

    await wrapper.find('.counter__decrease').trigger('click');

    expect(wrapper.emitted()['update:modelValue']).toBeTruthy();
    expect(wrapper.emitted()['update:modelValue']![0]).toEqual([4]);
  });
  
  it('If modelValue equal 1 decrease button must be emit nothing', async () => {
    const wrapper = mount(CounterUi, {
      props: {
        modelValue: 1,
        maxValue: 10,
      },
    });

    const decreaseButton = wrapper.find('.counter__decrease');
    expect(decreaseButton.attributes('disabled')).toBeDefined();

    await decreaseButton.trigger('click');
    expect(wrapper.emitted()['update:modelValue']).toBeUndefined();
  });
  
  it('If modelValue equal maxValue increase button must be emit nothing', async () => {
    const wrapper = mount(CounterUi, {
      props: {
        modelValue: 10,
        maxValue: 10,
      },
    });

    const increaseButton = wrapper.find('.counter__increase');
    expect(increaseButton.attributes('disabled')).toBeDefined();

    await increaseButton.trigger('click');
    expect(wrapper.emitted()['update:modelValue']).toBeUndefined();
  });
});
