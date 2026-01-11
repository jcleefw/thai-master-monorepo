import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'The visual style variant of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler function',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
    disabled: false,
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    variant: 'primary',
    disabled: true,
  },
};

export const WithThaiText: Story = {
  args: {
    children: 'คลิกที่นี่ (Click Here)',
    variant: 'primary',
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with Thai text to demonstrate Thai font rendering with tone marks.',
      },
    },
  },
};

export const ThaiToneMarks: Story = {
  args: {
    children: 'สวัสดี ครับ - ก้า ก๊า ก่า ก๋า',
    variant: 'primary',
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates accurate Thai tone mark positioning (้ ๊ ่ ๋) using Sarabun and Noto Sans Thai fonts.',
      },
    },
  },
};

export const Loading: Story = {
  args: {
    children: 'Loading...',
    variant: 'primary',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'A disabled button representing a loading state.',
      },
    },
  },
};
