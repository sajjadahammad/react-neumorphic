import type { Meta, StoryObj } from '@storybook/react';
import { toggle } from './toggle';

const meta: Meta<typeof toggle> = {
  title: 'UI/toggle',
  component: toggle,
};
export default meta;

type Story = StoryObj<typeof toggle>;

export const Default: Story = {
  args: {
    children: 'toggle Component',
  },
};
