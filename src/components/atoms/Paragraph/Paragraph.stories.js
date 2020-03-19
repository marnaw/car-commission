import React from 'react';
import { storiesOf } from '@storybook/react';
import Paragraph from './Paragraph';

storiesOf('atoms/Paragraph', module).add('Normal', () => <Paragraph> Marcin Nawara</Paragraph>);
storiesOf('atoms/Paragraph', module).add('Small', () => (
  <Paragraph small> Marcin Nawara</Paragraph>
));
