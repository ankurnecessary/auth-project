import type { Meta, StoryObj } from '@storybook/react';
import { LoginForm } from '@/components/auth/login-form';

const meta: Meta<typeof LoginForm> = {
  title: 'Components/auth/LoginForm', // Each slash will create another level in the left menu
  component: LoginForm, // Component
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
