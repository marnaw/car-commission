import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { deleteElement } from 'actions';
import UserTemplate from 'templates/UserTemplate';
import Breadcrumb from 'components/molecules/Breadcrumb/Breadcrumb';
import { Table, Th, Td, Tr } from 'components/molecules/Table/Table';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import iconClient from 'assets/icons/client.svg';
import IconEdit from 'assets/icons/edit.svg';
import iconDetail from 'assets/icons/detail.svg';
import IconDelete from 'assets/icons/delete.svg';

import { routes } from 'routes';
const StyledTD = styled(Td)`
  display: grid;
  grid-template-columns: repeat(3, 30px);
  justify-content: center;
`;
const InvoiceList = ({ location, invoices, delInvoice }) => (
  <UserTemplate>
    <Breadcrumb location={location} />
    <Table>
      <thead>
        <Tr>
          <Th>Indeks</Th>
          <Th>Nabywca</Th>
          <Th>Firma</Th>
          <Th>Wystawił</Th>
          <Th>Klient</Th>
          <Th>Zamówienie</Th>
          <Th>Akcja</Th>
        </Tr>
      </thead>
      <tbody>
        {invoices &&
          invoices.map(item => (
            <Tr key={item.id}>
              <Td>{item.idInvoice}</Td>
              <Td>{item.fullName}</Td>
              {item.company ? <Td>{item.companyName}</Td> : <Td>---</Td>}
              <Td>Admin</Td>
              <Td>
                {item.idClient ? (
                  <ButtonIcon
                    as={Link}
                    to={routes.clientEdit + '/' + item.idClient}
                    icon={iconClient}
                  />
                ) : (
                  'Brak w systemie'
                )}
              </Td>
              <Td>
                <ButtonIcon as={Link} to={`${routes.order}/${item.orderId}`} icon={iconDetail} />
              </Td>
              <StyledTD>
                <ButtonIcon as={Link} to={`${routes.orderEdit}/${item.orderId}`} icon={IconEdit} />
                <ButtonIcon
                  icon={IconDelete}
                  onClick={() => delInvoice('DELETE_INVOICE', item.id, 'invoices')}
                />
              </StyledTD>
            </Tr>
          ))}
      </tbody>
    </Table>
  </UserTemplate>
);

const mapStateToProps = state => {
  console.log(state);
  return {
    invoices: state.firestore.ordered.invoices,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    delInvoice: (type, id, col) => dispatch(deleteElement(type, id, col)),
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {
      collection: 'invoices',
    },
  ]),
)(InvoiceList);
