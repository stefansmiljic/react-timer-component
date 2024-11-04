import type { Meta, StoryObj } from '@storybook/react';
 
import Timer from './Timer';
 
const meta: Meta<typeof Timer> = {
  component: Timer,
};
 
export default meta;
type Story = StoryObj<typeof Timer>;
 
export const Default: Story = {
  args: {
    title: "Default Timer",
    endTime: 152,
    elapsedTime: 13
  }
};

export const MaxTime: Story = {
    args: {
      title: "MaxTime Timer",
      endTime: 3599,
      elapsedTime: 0
    }
};

export const Empty: Story = {
    args: {
      title: "Empty Timer",
      endTime: 0,
      elapsedTime: 0
    }
};
