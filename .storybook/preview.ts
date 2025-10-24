import type { Preview } from '@storybook/vue3-vite'
import { background } from 'storybook/internal/theming';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;