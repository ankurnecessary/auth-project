import type { Meta, StoryObj } from '@storybook/react';
import BackButton from '@/components/auth/back-button';

const meta: Meta<typeof BackButton> = {
  title: 'Components/auth/Back-Button', // Each slash will create another level in the left menu
  component: BackButton, // Component
  tags: ['autodocs'], // Automatically create a document for all the stories of the button
  parameters: {
    layout: 'centered', // Automatically center the button
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Content to be displayed inside the back button',
    },
    href: {
      control: 'text',
      description: 'Custom link',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Button',
    href: '/auth/register',
  },
};
