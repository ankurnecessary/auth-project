import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@/components/ui/input';

const meta: Meta<typeof Input> = {
  title: 'Components/ui/Input', // Each slash will create another level in the left menu
  component: Input, // Component
  tags: ['autodocs'], // Automatically create a document for all the stories of the button
  parameters: {
    layout: 'centered', // Automatically center the button
  },
  argTypes: {
    // Adding <Input/> type
    type: {
      control: 'select',
      description: 'Input type',
      options: [
        'text',
        'search',
        'number',
        'password',
        'date',
        'month',
        'email',
        'file',
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    type: 'text',
    className: 'shadow-lg',
  },
};

export const Search: Story = {
  args: {
    type: 'search',
    className: 'shadow-lg',
  },
};

export const Number: Story = {
  args: {
    type: 'number',
    className: 'shadow-lg',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    className: 'shadow-lg',
  },
};

export const Date: Story = {
  args: {
    type: 'date',
    className: 'shadow-lg',
  },
};

export const Month: Story = {
  args: {
    type: 'month',
    className: 'shadow-lg',
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    className: 'shadow-lg',
  },
};

export const File: Story = {
  render: (args) => <Input name="inputField_file" {...args} />,
  args: {
    type: 'file',
    className: 'shadow-lg',
  },
};
