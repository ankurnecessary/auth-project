import type { Meta, StoryObj } from '@storybook/react';
import { CardTitle } from '@/components/ui/card';

const meta: Meta<typeof CardTitle> = {
  title: 'Components/UI/Card/Card-title', // Each slash will create another level in the left menu
  component: CardTitle, // Component
  tags: ['autodocs'], // Automatically create a document for all the stories of the component
  parameters: {
    layout: 'centered', // Automatically center the component
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to be displayed inside the card title',
    },
    className: {
      control: 'text',
      description: 'Custom tailwind CSS classes to apply to the card title',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Card title',
    className: 'border',
  },
};
