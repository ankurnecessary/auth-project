import type { Meta, StoryObj } from '@storybook/react';
import ErrorCard from '@/components/auth/error-card';

const meta: Meta<typeof ErrorCard> = {
  title: 'Components/auth/ErrorCard', // Each slash will create another level in the left menu
  component: ErrorCard, // Component
  tags: ['autodocs'], // Automatically create a document for all the stories of the ErrorCard
  parameters: {
    layout: 'centered', // Automatically center the ErrorCard
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
