import type { Meta, StoryObj } from '@storybook/react';
import Social from '@/components/auth/social';

const meta: Meta<typeof Social> = {
  title: 'Components/auth/Social', // Each slash will create another level in the left menu
  component: Social, // Component
  tags: ['autodocs'], // Automatically create a document for all the stories of the button
  parameters: {
    layout: 'centered', // Automatically center the button
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
