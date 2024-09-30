import type { Meta, StoryObj } from '@storybook/react';
import { FormError } from '@/components/form-error';

const meta: Meta<typeof FormError> = {
  title: 'Components/FormError', // Each slash will create another level in the left menu
  component: FormError, // Component
  tags: ['autodocs'], // Automatically create a document for all the stories of the button
  parameters: {
    layout: 'centered', // Automatically center the button
  },
  argTypes: {
    message: {
      control: 'text',
      description: 'Message that we want to show in the error.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: 'Something went worng. Please try again later',
  },
};
