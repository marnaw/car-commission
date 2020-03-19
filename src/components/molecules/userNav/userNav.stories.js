import React from 'react';
import { storiesOf } from '@storybook/react';
import NavUser from './userNav';
import iconUser from 'assets/icons/user.svg';

storiesOf('molecules/userNav', module).add('normal', () => (
  <NavUser icon={iconUser} userName="Marcin Nawara" />
));
