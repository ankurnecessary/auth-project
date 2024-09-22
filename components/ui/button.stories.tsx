import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof Button> = {
  title: 'Component/UI/Button', // Each slash will create another level in the left menu
  component: Button, // Component
  tags: ['autodocs'], // Automatically create a document for all the stories of the button
  parameters: {
    layout: 'centered', // Automatically center the button
  },
  argTypes: {
    // Adding dropdown for variants
    variant: {
      control: 'select',
      description: 'Button variants',
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
      ],
    },
    // Adding dropdown for sizes
    size: {
      control: 'select',
      description: 'Button sizes',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    disabled: {
      control: 'boolean',
    },
    onClick: {
      action: 'clicked',
      description: 'Function called when the button is clicked',
    },
    children: {
      control: 'text',
      description: 'Content to be displayed inside the button',
    },
    className: {
      control: 'text',
      description: 'Custom tailwind CSS classes to apply to the button',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'default',
    disabled: false,
    onClick: action('Default button click'),
    children: 'Button',
    className: 'shadow-lg',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'default',
    disabled: false,
    onClick: action('Outline button click'),
    children: 'Button',
    className: 'shadow-lg',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    size: 'default',
    disabled: false,
    onClick: action('Destructive button click'),
    children: 'Button',
    className: 'shadow-lg',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'default',
    disabled: false,
    onClick: action('Secondary button click'),
    children: 'Button',
    className: 'shadow-lg',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'default',
    disabled: false,
    onClick: action('Ghost button click'),
    children: 'Button',
    className: 'shadow-lg',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    size: 'default',
    disabled: false,
    onClick: action('Link button click'),
    children: 'Button',
    className: 'shadow-lg',
  },
};
