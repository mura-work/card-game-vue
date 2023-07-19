/// <reference types="vitest" />
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import path from 'path';
import vuetify from './src/plugins/vuetify';

export default defineConfig({
  plugins: [Vue()],
  test: {
    globals: true,
    environment: 'happy-dom',
    deps: {
      inline: ['vuetify'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
