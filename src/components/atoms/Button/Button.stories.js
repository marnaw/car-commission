import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './Button';

storiesOf('atoms/Button', module)
  .add('Primary', () => <Button> Hello Roman</Button>)
  .add('Secondary', () => <Button secondary>Dodaj nowe zamówienie</Button>);
