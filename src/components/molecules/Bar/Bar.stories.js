import React from 'react';
import { storiesOf } from '@storybook/react';
import Bar from './Bar';
storiesOf('molecules/Bar', module).add('Normal', () => <Bar title="Dodaj zamówienie" />);
