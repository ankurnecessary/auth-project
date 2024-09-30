import type { Meta, StoryObj } from '@storybook/react';
import { Label } from '@/components/ui/label';

const meta: Meta<typeof Label> = {
  title: 'Components/ui/Label', // Each slash will create another level in the left menu
  component: Label, // Component
  tags: ['autodocs'], // Automatically create a document for all the stories of the button
  parameters: {
    layout: 'centered', // Automatically center the button
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Tailwind classes or other CSS classes to style the label.',
    },
    children: {
      control: 'text',
      description: 'Text to be displayed inside the label.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Email Address:',
    className: 'text-sm font-medium text-gray-700',
  },
};
