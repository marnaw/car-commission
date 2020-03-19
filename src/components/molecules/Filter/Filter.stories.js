import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';

import Filter from './Filter';

storiesOf('molecules/Filter', module)
  .addDecorator(StoryRouter())
  .add('normal', () => <Filter title="Dodaj nowego  klienta" />);
