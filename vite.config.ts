import { fileURLToPath, URL } from 'node:url';

import { defineConfig, type UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const config: UserConfig = {
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
};

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  if (command === 'build') {
    config.base = '/pert-calculator';
  }

  return config;
});
