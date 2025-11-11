import type { Meta, StoryObj } from '@storybook/react';
import { badge } from './badge';

const meta: Meta<typeof badge> = {
  title: 'UI/badge',
  component: badge,
};
export default meta;

type Story = StoryObj<typeof badge>;

export const Default: Story = {
  args: {
    children: 'badge Component',
  },
};
