import React from 'react';
import { storiesOf } from '@storybook/react';
import Card from './Card';

storiesOf('molecules/Card', module).add('normal', () => (
  <Card
    color="red"
    title="sprzedaz"
    titleContnet="suma (30dni"
    content="15 456 00"
    titleAmount="Ilość"
    amount="1"
  />
));
