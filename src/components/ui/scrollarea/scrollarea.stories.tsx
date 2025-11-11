import type { Meta, StoryObj } from '@storybook/react';
import { scrollarea } from './scrollarea';

const meta: Meta<typeof scrollarea> = {
  title: 'UI/scrollarea',
  component: scrollarea,
};
export default meta;

type Story = StoryObj<typeof scrollarea>;

export const Default: Story = {
  args: {
    children: 'scrollarea Component',
  },
};
