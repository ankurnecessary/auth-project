import type { Meta, StoryObj } from '@storybook/react';
import { CardContent } from '@/components/ui/card';

const meta: Meta<typeof CardContent> = {
  title: 'Components/UI/Card/Card-content', // Each slash will create another level in the left menu
  component: CardContent, // Component
  tags: ['autodocs'], // Automatically create a document for all the stories of the component
  parameters: {
    layout: 'centered', // Automatically center the component
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to be displayed inside the card content',
    },
    className: {
      control: 'text',
      description: 'Custom tailwind CSS classes to apply to the card content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Card content',
    className: 'border',
  },
};
