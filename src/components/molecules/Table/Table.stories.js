import React from 'react';
import { storiesOf } from '@storybook/react';
import { Table, Th, Td, Tr } from './Table';

storiesOf('molecules/Tables', module).add('normal', () => (
  <Table>
    <Th>Id</Th>
    <Th>Produkt</Th>
    <Th>Imię i nazwisko</Th>
    <Th>Data</Th>
    <Th>Kwota</Th>
    <Th>Akcja</Th>

    <Tr>
      <Td>1</Td>
      <Td>Audi a3 8p</Td>
      <Td>Marcin Nawara</Td>
      <Td>2019-12-30 17:38:14 21 godzin temu</Td>
      <Td>15 454,00 zł</Td>
      <Td></Td>
    </Tr>
    <Tr>
      <Td>1</Td>
      <Td>Audi a3 8p</Td>
      <Td>Marcin Nawara</Td>
      <Td>2019-12-30 17:38:14 21 godzin temu</Td>
      <Td>15 454,00 zł</Td>
      <Td></Td>
    </Tr>
  </Table>
));
