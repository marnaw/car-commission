import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import UserTemplate from 'templates/UserTemplate';
import Breadcrumb from 'components/molecules/Breadcrumb/Breadcrumb';
import Filter from 'components/molecules/Filter/Filter';
import { Table, Th, Td, Tr } from 'components/molecules/Table/Table';
import { routes } from 'routes';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import IconEdit from 'assets/icons/edit.svg';
import IconDelete from 'assets/icons/delete.svg';
import IconDetail from 'assets/icons/detail.svg';
import { deleteElement } from 'actions';

const StyledTD = styled(Td)`
  display: grid;
  grid-template-columns: repeat(3, 30px);
  justify-content: center;
`;

const Product = ({ location, products, productDelete }) => (
  <UserTemplate>
    <Breadcrumb location={location} />
    <Filter title="Dodaj nowy produkt" link={routes.productsAdd} />
    <Table>
      <thead>
        <Tr>
          <Th>Id</Th>
          <Th>Marka</Th>
          <Th>Model</Th>
          <Th>Rocznik</Th>
          <Th>Cena</Th>
          <Th>Akcja</Th>
        </Tr>
      </thead>
      <tbody>
        {products &&
          products.map((item, index) => (
            <Tr key={item.id}>
              <Td>{index + 1}</Td>
              <Td>{item.brand}</Td>
              <Td>{item.model}</Td>
              <Td>{item.year}</Td>
              <Td>{item.price} zł</Td>
              <StyledTD>
                <ButtonIcon icon={IconEdit} as={Link} to={routes.productsEdit + '/' + item.id} />
                <ButtonIcon
                  icon={IconDelete}
                  onClick={() => productDelete('DELETE_PRODUCT', item.id, 'products')}
                />
                <ButtonIcon icon={IconDetail} as={Link} to={`${routes.products}/${item.id}`} />
              </StyledTD>
            </Tr>
          ))}
      </tbody>
    </Table>
  </UserTemplate>
);

const mapStateToProps = state => {
  return {
    products: state.firestore.ordered.products,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    productDelete: (type, id, col) => dispatch(deleteElement(type, id, col)),
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {
      collection: 'products',
    },
  ]),
)(Product);
