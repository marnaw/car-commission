import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { orderAdd } from 'actions';
import styled, { css } from 'styled-components';
import UserTemplate from 'templates/UserTemplate';
import Breadcrumb from 'components/molecules/Breadcrumb/Breadcrumb';
import UserFormTemplate from 'templates/UserFormTemplate';
import Bar from 'components/molecules/Bar/Bar';
import Radio from 'components/atoms/RadioButton/RadioButton';
import Button from 'components/atoms/Button/Button';
import Input from 'components/atoms/Input/Input';
import { Formik } from 'formik';
import { Table, Th, Tr, Td } from 'components/molecules/Table/Table';
import iconUser from 'assets/icons/user.svg';
import iconBusiness from 'assets/icons/business.svg';
import iconLocation from 'assets/icons/location.svg';
import iconPeople from 'assets/icons/people.svg';
import iconCity from 'assets/icons/city.svg';
import iconCode from 'assets/icons/code.svg';
import iconEmail from 'assets/icons/email.svg';
import iconSearch from 'assets/icons/search.svg';

const StyledTr = styled(Tr)`
  cursor: pointer;
`;

const StyledContent = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: flex-start;
  grid-row-gap: 20px;
  grid-column-gap: 40px;
  padding: 30px;
  ${({ center }) =>
    center &&
    css`
      grid-template-columns: 1fr;
      grid-template-rows: 1fr;
      justify-items: center;
    `}
`;

const StyledGroupRadio = styled.div`
  display: flex;
`;

const StyledInput = styled(Input)`
  margin: 0 auto;
`;

class OrdersAdd extends Component {
  state = {
    items: {
      fullName: '',
      companyName: '',
      address: '',
      companyID: '',
      city: '',
      zipCode: '',
      email: '',
      company: true,
      totalPrice: 0,
      visible: true,
    },
    products: [],
    productAdded: [],
    isVisible: false,
  };

  addProduct = item => {
    this.setState(prevState => ({
      ...prevState,
      productAdded: this.uniqueItems([...prevState.productAdded, item]),
    }));
  };

  filterItems = e => {
    this.setState({
      products: this.props.productsBase.filter(
        el => el.brand.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1,
      ),
    });
    this.setState({ isVisible: true });
  };

  uniqueItems = arr => {
    return [...new Map(arr.map(item => [item.id, item])).values()];
  };

  render() {
    const { location, orderAdd, client, id } = this.props;
    const { isVisible, products, productAdded } = this.state;

    console.log(location.pathname.split('/').filter(item => item.length > 0));
    return (
      <UserTemplate>
        <Breadcrumb location={location} />
        <UserFormTemplate>
          <Bar title="Dodaj zamówienie" />
          <Formik
            initialValues={
              client
                ? {
                    ...client,
                    product: '',
                    totalPrice: 0,
                    visible: true,
                    idClient: id,
                  }
                : {
                    fullName: '',
                    companyName: '',
                    address: '',
                    companyID: '',
                    city: '',
                    zipCode: '',
                    email: '',
                    company: true,
                    product: '',
                    totalPrice: 0,
                    visible: true,
                    idClient: '',
                  }
            }
            onSubmit={(values, { resetForm }) => {
              values.product = productAdded;
              orderAdd(values);
              resetForm({});
              this.setState({ productAdded: [] });
            }}
          >
            {({ values, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
              <>
                <form onSubmit={handleSubmit}>
                  <StyledContent>
                    <Input
                      type="text"
                      name="fullName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.fullName}
                      icon={iconUser}
                      placeholder="Imię i nazwisko"
                    />
                    {values.company && (
                      <Input
                        type="text"
                        name="companyName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.companyName}
                        icon={iconBusiness}
                        placeholder="Nazwa firmy"
                      />
                    )}
                    <Input
                      type="text"
                      name="address"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address}
                      icon={iconLocation}
                      placeholder="Adres"
                    />

                    {values.company && (
                      <Input
                        type="number"
                        name="companyID"
                        onChange={
                          values.company === true
                            ? handleChange
                            : () => setFieldValue(values.companyID)
                        }
                        onBlur={handleBlur}
                        value={values.companyID}
                        icon={iconPeople}
                        placeholder="NIP"
                      />
                    )}
                    <Input
                      type="text"
                      name="city"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.city}
                      icon={iconCity}
                      placeholder="Miejscowość"
                    />
                    <Input
                      type="text"
                      name="zipCode"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.zipCode}
                      icon={iconCode}
                      placeholder="Kod"
                    />
                    <Input
                      type="text"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      icon={iconEmail}
                      placeholder="Email"
                    />

                    <StyledGroupRadio>
                      <Radio
                        type="radio"
                        name="company"
                        checked={values.company === true}
                        changeFn={() => setFieldValue('company', true)}
                      >
                        Firma
                      </Radio>
                      <Radio
                        type="radio"
                        name="company"
                        checked={values.company === false}
                        changeFn={() => setFieldValue('company', false)}
                      >
                        Osoba fizyczna
                      </Radio>
                    </StyledGroupRadio>
                  </StyledContent>
                  <Button center type="submit">
                    Dodaj zamówienie
                  </Button>
                </form>

                {productAdded.length > 0 && (
                  <>
                    <Bar title="Dodane produkty" margin />

                    <Table width="80%">
                      <thead>
                        <Tr>
                          <Th>Id</Th>
                          <Th>Marka</Th>
                          <Th>Model</Th>
                          <Th>Rocznik</Th>
                          <Th>Cena</Th>
                        </Tr>
                      </thead>
                      <tbody>
                        {productAdded.map((item, index) => (
                          <StyledTr key={index}>
                            <Td>{index}</Td>
                            <Td>{item.brand}</Td>
                            <Td>{item.model}</Td>
                            <Td>{item.year}</Td>
                            <Td>{item.price} zł</Td>
                          </StyledTr>
                        ))}
                      </tbody>
                    </Table>
                  </>
                )}

                <StyledContent center>
                  <StyledInput
                    icon={iconSearch}
                    placeholder="Search"
                    width="95%"
                    type="text"
                    name="product"
                    onChange={this.filterItems}
                  />
                </StyledContent>
                <Bar title="Produkt" margin />

                {isVisible && (
                  <Table width="80%">
                    <thead>
                      <Tr>
                        <Th>Id</Th>
                        <Th>Marka</Th>
                        <Th>Model</Th>
                        <Th>Rocznik</Th>
                        <Th>Cena</Th>
                      </Tr>
                    </thead>
                    <tbody>
                      {products.map((item, index) => (
                        <StyledTr
                          key={index}
                          onClick={() => {
                            this.addProduct({ id: index, ...item });
                          }}
                        >
                          <Td>{index}</Td>
                          <Td>{item.brand}</Td>
                          <Td>{item.model}</Td>
                          <Td>{item.year}</Td>
                          <Td>{item.price} zł</Td>
                        </StyledTr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </>
            )}
          </Formik>
        </UserFormTemplate>
      </UserTemplate>
    );
  }
}
const mapStateToProps = (state, ownProps, match) => {
  const id = ownProps.match.params.id;
  const clients = state.firestore.data.clients;
  const client = clients ? clients[id] : null;

  return {
    productsBase: state.firestore.ordered.products,
    client,
    id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    orderAdd: order => dispatch(orderAdd(order)),
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {
      collection: 'products',
    },
    {
      collection: 'clients',
    },
  ]),
)(OrdersAdd);
