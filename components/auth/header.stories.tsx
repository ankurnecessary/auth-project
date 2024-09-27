import type { Meta, StoryObj } from '@storybook/react';
import Header from '@/components/auth/header';

const meta: Meta<typeof Header> = {
  title: 'Components/auth/Header', // Each slash will create another level in the left menu
  component: Header, // Component
  tags: ['autodocs'], // Automatically create a document for all the stories of the Header
  parameters: {
    layout: 'centered', // Automatically center the header
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Custom label to show in header',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Welcome back',
  },
};
