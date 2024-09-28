import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '@/components/ui/card';

const meta: Meta<typeof Card> = {
  title: 'Components/UI/Card', // Each slash will create another level in the left menu
  component: Card, // Component
  tags: ['autodocs'], // Automatically create a document for all the stories of the component
  parameters: {
    layout: 'centered', // Automatically center the component
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to be displayed inside the card',
    },
    className: {
      control: 'text',
      description: 'Custom tailwind CSS classes to apply to the card',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Card',
    className: '',
  },
};
