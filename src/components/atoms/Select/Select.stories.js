import React from 'react';
import { storiesOf } from '@storybook/react';
import Select from './Select';
storiesOf('atoms/Select', module).add('Normal', () => (
  <Select>
    <option hidden value="">
      Wybierz
    </option>
    <option value="Poland">Polska</option>
  </Select>
));
