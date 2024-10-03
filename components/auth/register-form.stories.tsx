import type { Meta, StoryObj } from '@storybook/react';
import { RegisterForm } from '@/components/auth/register-form';

const meta: Meta<typeof RegisterForm> = {
  title: 'Components/auth/RegisterForm', // Each slash will create another level in the left menu
  component: RegisterForm, // Component
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
