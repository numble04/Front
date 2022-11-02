import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { SampleButton } from '.';

export default {
  title: 'Components/SampleButton',
  component: SampleButton,
} as ComponentMeta<typeof SampleButton>;

const Template: ComponentStory<typeof SampleButton> = (args) => (
  <SampleButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  color: '#ff8e88',
  backgroundColor: '#5c2121',
  label: 'Button',
};
