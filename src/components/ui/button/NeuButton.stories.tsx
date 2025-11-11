import type { Meta, StoryObj } from '@storybook/react';
import { NeuButton } from './NeuButton';

const meta: Meta<typeof NeuButton> = {
  title: 'UI/NeuButton',
  component: NeuButton,
  args: { children: 'Click Me' },
};
export default meta;

type Story = StoryObj<typeof NeuButton>;

export const Default: Story = {};
export const Soft: Story = { args: { variant: 'soft' } };
export const Glass: Story = { args: { variant: 'glass' } };