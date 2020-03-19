import React from 'react';
import { storiesOf } from '@storybook/react';
import ButtonIcon from './ButtonIcon';
import IconEdit from 'assets/icons/edit.svg';
import IconDelete from 'assets/icons/delete.svg';
import IconDetail from 'assets/icons/detail.svg';
import IconPrint from 'assets/icons/print.svg';
import IconClient from 'assets/icons/client.svg';

storiesOf('atoms/ButtonIcon', module)
  .add('Edit', () => <ButtonIcon icon={IconEdit} />)
  .add('Edit', () => <ButtonIcon icon={IconEdit} />)
  .add('Delete', () => <ButtonIcon icon={IconDelete} />)
  .add('Detail', () => <ButtonIcon icon={IconDetail} />)
  .add('Print', () => <ButtonIcon icon={IconPrint} />)
  .add('Client', () => <ButtonIcon icon={IconClient} />);
