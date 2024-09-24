import type { Meta, StoryObj } from '@storybook/react';
import LoginButton from '@/components/auth/login-button';

const meta: Meta<typeof LoginButton> = {
  title: 'Components/auth/login-button', // Each slash will create another level in the left menu
  component: LoginButton, // Component
  tags: ['autodocs'], // Automatically create a document for all the stories of the component
  parameters: {
    layout: 'centered', // Automatically center the component
  },
  argTypes: {
    // Adding dropdown for mode
    mode: {
      control: 'select',
      description: 'Login Button mode',
      options: ['redirect', 'modal'],
    },
    children: {
      control: 'text',
      description: 'Content to be displayed inside the button',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const RedirectMode: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    mode: 'redirect',
    children: 'Login-Button',
  },
};

export const ModalMode: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    mode: 'modal',
    children: 'Login-Button',
  },
};
