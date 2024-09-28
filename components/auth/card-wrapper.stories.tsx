import type { Meta, StoryObj } from '@storybook/react';
import CardWrapper from '@/components/auth/card-wrapper';

const meta: Meta<typeof CardWrapper> = {
  title: 'Components/auth/CardWrapper', // Each slash will create another level in the left menu
  component: CardWrapper, // Component
  tags: ['autodocs'], // Automatically create a document for all the stories of the <CardWrapper />
  parameters: {
    layout: 'centered', // Automatically center the <CardWrapper />
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Content of the <CardContent/>',
    },
    headerlabel: {
      control: 'text',
      description: 'Text that will appear under main heading',
    },
    backButtonLabel: {
      control: 'text',
      description: 'Label for back button',
    },
    backButtonHref: {
      control: 'text',
      description: 'Link to which back button will navigate to',
    },
    showSocial: {
      control: 'boolean',
      description: 'Show social login buttons',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'login-form',
    headerlabel: 'Welcome back!',
    backButtonLabel: "Don't have an account",
    backButtonHref: '/auth/register',
    showSocial: false,
  },
};

export const WithSocial: Story = {
  args: {
    children: 'login-form',
    headerlabel: 'Welcome back!',
    backButtonLabel: "Don't have an account",
    backButtonHref: '/auth/register',
    showSocial: true,
  },
};
