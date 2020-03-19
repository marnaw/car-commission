import React from 'react';
import { storiesOf } from '@storybook/react';
import Hamburger from './Hamburger';
import iconBurger from 'assets/icons/burger.svg';
storiesOf('atoms/Hamburger', module).add('Normal', () => <Hamburger icon={iconBurger} />);
