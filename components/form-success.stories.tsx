import type { Meta, StoryObj } from '@storybook/react';
import { FormSuccess } from '@/components/form-success';

const meta: Meta<typeof FormSuccess> = {
  title: 'Components/FormSuccess', // Each slash will create another level in the left menu
  component: FormSuccess, // Component
  tags: ['autodocs'], // Automatically create a document for all the stories of the button
  parameters: {
    layout: 'centered', // Automatically center the button
  },
  argTypes: {
    message: {
      control: 'text',
      description: 'Message that we want to show as a success message.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: 'Registered sucessfully.',
  },
};
