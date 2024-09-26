import type { Meta, StoryObj } from '@storybook/react';
import { CardDescription } from '@/components/ui/card';

const meta: Meta<typeof CardDescription> = {
  title: 'Components/UI/Card/Card-description', // Each slash will create another level in the left menu
  component: CardDescription, // Component
  tags: ['autodocs'], // Automatically create a document for all the stories of the component
  parameters: {
    layout: 'centered', // Automatically center the component
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to be displayed inside the card description',
    },
    className: {
      control: 'text',
      description:
        'Custom tailwind CSS classes to apply to the card description',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Card description',
    className: 'border',
  },
};
