import React from 'react';
import { storiesOf } from '@storybook/react';
import Breadcrumb from './Breadcrumb';
import StoryRouter from 'storybook-react-router';
storiesOf('molecules/Breadcrumb', module)
  .addDecorator(StoryRouter())
  .add('orders', () => <Breadcrumb match="/orders" />)
  .add('ordersAdd', () => <Breadcrumb match="/ordersAdd" />);
