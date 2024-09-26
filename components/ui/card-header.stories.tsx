import type { Meta, StoryObj } from '@storybook/react';
import { CardHeader } from '@/components/ui/card';

const meta: Meta<typeof CardHeader> = {
  title: 'Components/UI/Card/Card-header', // Each slash will create another level in the left menu
  component: CardHeader, // Component
  tags: ['autodocs'], // Automatically create a document for all the stories of the component
  parameters: {
    layout: 'centered', // Automatically center the component
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to be displayed inside the card header',
    },
    className: {
      control: 'text',
      description: 'Custom tailwind CSS classes to apply to the card header',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Card header',
    className: 'border',
  },
};
