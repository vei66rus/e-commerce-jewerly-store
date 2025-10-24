/**
 * @vitest-environment happy-dom
 */

import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import RatingUi from './RatingUi.vue';

vi.mock('@/ui', () => ({
  StarIcon: {
    template: `<div class="star-icon" @click="$emit('click')">{{ state }}</div>`,
    props: ['state'],
  },
}));

describe('RatingUi', () => {
  it('Component "StarIcon" must be rendered by 5 times', () => {
    const wrapper = mount(RatingUi, {
      props: {
        modelValue: 3,
      },
    });

    const stars = wrapper.findAll('.star-icon');

    expect(stars[0].text()).toBe('filled');
    expect(stars[1].text()).toBe('filled');
    expect(stars[2].text()).toBe('filled');
    expect(stars[3].text()).toBe('empty');
    expect(stars[4].text()).toBe('empty');
  });

  it('Once clicked this component must be emit value equals to target element index + 1', async () => {
    const wrapper = mount(RatingUi, {
      props: {
        modelValue: 2,
      },
    });

    const stars = wrapper.findAll('.star-icon');

    await stars[3].trigger('click');

    expect(wrapper.emitted()['update:modelValue']).toBeTruthy();
    expect(wrapper.emitted()['update:modelValue']![0]).toEqual([4]);
  });
});
