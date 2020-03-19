import React from 'react';
import { storiesOf } from '@storybook/react';
import Input from './Input';
import iconUser from 'assets/icons/user.svg';
storiesOf('atoms/Input', module).add('Normal', () => (
  <Input icon={iconUser} placeholder="Imię i nazwisko" />
));
