import React from 'react';
import styled from 'styled-components';
import UserTemplate from 'templates/UserTemplate';
import { routes } from 'routes';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import moment from 'moment';
import Breadcrumb from 'components/molecules/Breadcrumb/Breadcrumb';
import Filter from 'components/molecules/Filter/Filter';
import { Table, Th, Td, Tr } from 'components/molecules/Table/Table';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import IconEdit from 'assets/icons/edit.svg';
import IconDelete from 'assets/icons/delete.svg';
import IconDetail from 'assets/icons/detail.svg';
import IconInvoices from 'assets/icons/invoices.svg';

import { Link } from 'react-router-dom';
import { updateElement, addInvoice } from 'actions';
import 'moment/locale/pl';

const StyledTD = styled(Td)`
  display: grid;
  grid-template-columns: repeat(4, 30px);
  justify-content: center;
`;

const StyledList = styled.ul`
  list-style: none;

  && li {
    margin-top: 5px;
  }
`;
const Orders = ({ location, orders, orderUpdate, addInvoice }) => (
  <UserTemplate>
    <Breadcrumb location={location} />
    <Filter title="Dodaj nowe zamówienie" link={routes.ordersAdd} titleButton="Filter" />
    <Table>
      <thead>
        <Tr>
          <Th>Id</Th>
          <Th>Imię i nazwisko</Th>
          <Th>Data</Th>
          <Th>Kwota</Th>
          <Th>Produckt</Th>
          <Th>Akcja</Th>
        </Tr>
      </thead>
      <tbody>
        {orders &&
          orders.map((item, index) => (
            <Tr key={item.id}>
              <Td>{index + 1}</Td>
              <Td>{item.fullName}</Td>
              <Td>{moment(new Date(item.createdAt.toDate().toString())).calendar()}</Td>
              <Td>{item.totalPrice} zł</Td>

              <Td>
                <StyledList>
                  {[...item.product].map((el, i) => (
                    <React.Fragment key={i}>
                      <li>
                        {el.brand} {el.model}
                      </li>
                    </React.Fragment>
                  ))}
                </StyledList>
              </Td>

              <StyledTD>
                {/* <ButtonIcon icon={IconEdit} /> */}
                <ButtonIcon
                  icon={IconDelete}
                  onClick={() => orderUpdate('UPDATE_ORDER', item.id, 'orders', { visible: false })}
                />
                <ButtonIcon icon={IconDetail} as={Link} to={routes.order + `/${item.id}`} />
                <ButtonIcon icon={IconInvoices} onClick={() => addInvoice(item)} />
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
    orders: state.firestore.ordered.orders,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    orderUpdate: (type, id, col, content) => dispatch(updateElement(type, id, col, content)),
    addInvoice: content => dispatch(addInvoice(content)),
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => {
    return [
      {
        collection: 'orders',
        where: [['visible', '==', true]],
      },
    ];
  }),
)(Orders);
