import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      features: {
        propsDestructure: true
      }
    })
  ],
  resolve: {
    alias: {
      '@shoppe': path.resolve(new URL('./src', import.meta.url).pathname),
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@shoppe/shared/styles/variables.scss" as *;
          @use "@shoppe/shared/styles/typography.scss" as *;
          @use "@shoppe/shared/styles/mixins.scss" as *;
        `,
      },
    },
  },
});
