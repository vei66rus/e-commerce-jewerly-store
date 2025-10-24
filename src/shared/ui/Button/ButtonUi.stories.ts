import type { Meta, StoryObj } from '@storybook/vue3-vite';
import ButtonUi from './ButtonUi.vue';
import '@/assets/styles/_global.scss';

const meta: Meta<typeof ButtonUi> = {
  title: 'UI/Button',
  component: ButtonUi,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ButtonUi>;

export const SmallButton: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Small size button (With all default parameters)',
      },
    },
  },
  args: {
    size: 'sm',
    filled: false,
    white: false,
    disabled: false,
    selected: false,
    fullWidth: false,
    default: 'UI Button',
  },
};

export const MediumButton: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Medium size button',
      },
    },
  },
  args: {
    size: 'md',
    filled: false,
    white: false,
    disabled: false,
    selected: false,
    fullWidth: false,
    default: 'UI Button',
  },
};

export const LargeButton: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Large size button',
      },
    },
  },
  args: {
    size: 'lg',
    filled: false,
    white: false,
    disabled: false,
    selected: false,
    fullWidth: false,
    default: 'UI Button',
  },
};
