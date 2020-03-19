import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { routes } from 'routes';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { deleteElement } from 'actions';
import UserTemplate from 'templates/UserTemplate';
import Breadcrumb from 'components/molecules/Breadcrumb/Breadcrumb';
import Filter from 'components/molecules/Filter/Filter';
import { Table, Th, Td, Tr } from 'components/molecules/Table/Table';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import IconEdit from 'assets/icons/edit.svg';
import IconDelete from 'assets/icons/delete.svg';
import iconAddOrder from 'assets/icons/addOrder.svg';

const StyledTD = styled(Td)`
  display: grid;
  grid-template-columns: repeat(3, 30px);
  justify-content: center;
`;

const Clients = ({ location, clients, clientDelete }) => (
  <UserTemplate>
    <Breadcrumb location={location} />
    <Filter title="Dodaj nowego klienta" link={routes.clientsAdd} titleButton="Filter" />
    <Table>
      <thead>
        <Tr>
          <Th>Id</Th>
          <Th>Imię i nazwisko</Th>
          <Th>Firma</Th>
          <Th>Email</Th>
          <Th>Akcja</Th>
        </Tr>
      </thead>
      <tbody>
        {clients &&
          clients.map((item, index) => (
            <Tr key={item.id}>
              <Td>{index + 1}</Td>
              <Td>{item.fullName}</Td>
              <Td>{item.company ? item.companyName : '---'}</Td>
              <Td>{item.email}</Td>
              <StyledTD>
                <ButtonIcon icon={IconEdit} as={Link} to={routes.clientEdit + '/' + item.id} />
                <ButtonIcon
                  icon={IconDelete}
                  onClick={() => clientDelete('DELETE_CLIENT', item.id, 'clients')}
                />
                <ButtonIcon icon={iconAddOrder} as={Link} to={routes.ordersAdd + '/' + item.id} />
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
    clients: state.firestore.ordered.clients,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clientDelete: (type, id, col) => dispatch(deleteElement(type, id, col)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {
      collection: 'clients',
    },
  ]),
)(Clients);
