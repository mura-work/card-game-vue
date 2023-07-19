import { mount } from '@vue/test-utils';
import { test, expect } from 'vitest';
import Card from '../../components/PlayerHandCard.vue';
import Vuex from 'vuex';
import { beforeEach } from 'node:test';

test('Sample Test', () => {
  const wrapper = mount(Card, {
    propsData: {
      playerHands: [],
      playerName: 'test',
    },
  });
  expect(wrapper.text()).toContain('test');
});
