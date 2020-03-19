import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { clientUpdate, clientAdd } from 'actions';
import { firestoreConnect } from 'react-redux-firebase';
import styled, { css } from 'styled-components';
import UserTemplate from 'templates/UserTemplate';
import Breadcrumb from 'components/molecules/Breadcrumb/Breadcrumb';
import UserFormTemplate from 'templates/UserFormTemplate';
import Bar from 'components/molecules/Bar/Bar';
import Radio from 'components/atoms/RadioButton/RadioButton';
import Button from 'components/atoms/Button/Button';
import Input from 'components/atoms/Input/Input';
import { Formik } from 'formik';
import iconUser from 'assets/icons/user.svg';
import iconBusiness from 'assets/icons/business.svg';
import iconLocation from 'assets/icons/location.svg';
import iconPeople from 'assets/icons/people.svg';
import iconCity from 'assets/icons/city.svg';
import iconCode from 'assets/icons/code.svg';
import iconEmail from 'assets/icons/email.svg';

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
      grid-template-rows: 1fr 1fr;
      justify-items: center;
    `}
`;

const StyledGroupRadio = styled.div`
  display: flex;
`;

const ClientsAction = ({ location, clientUpdate, clientAdd, client, id }) => (
  <UserTemplate>
    {console.log(client, id)}
    <Breadcrumb location={location} />
    <UserFormTemplate>
      <Bar title={id ? 'Edycja klienta ' : 'Nowy klient'} />

      <Formik
        initialValues={
          client
            ? client
            : {
                fullName: '',
                companyName: '',
                address: '',
                city: '',
                zipCode: '',
                companyID: '',
                email: '',
                company: true,
              }
        }
        onSubmit={(values, { resetForm }) => {
          if (!id) {
            clientAdd(values);
            resetForm({});
          } else clientUpdate(values, id);
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          /* and other goodies */
        }) => (
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
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.company === false ? '' : values.companyId}
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
                  changeFn={() => {
                    setFieldValue('company', false);
                    setFieldValue('companyName', '');
                    setFieldValue('companyID', '');
                  }}
                >
                  Osoba fizyczna
                </Radio>
              </StyledGroupRadio>
            </StyledContent>
            <Button center type="submit">
              {id ? 'Zapisz zmiany ' : 'Nowy klient'}
            </Button>
          </form>
        )}
      </Formik>
    </UserFormTemplate>
  </UserTemplate>
);

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  const id = ownProps.match.params.id;
  const clients = state.firestore.data.clients;
  const client = clients ? clients[id] : null;
  return {
    client,
    id,
  };
};

const mapDispatchProps = dispatch => {
  return {
    clientUpdate: (client, id) => dispatch(clientUpdate(client, id)),
    clientAdd: client => dispatch(clientAdd(client)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchProps),
  firestoreConnect([
    {
      collection: 'clients',
    },
  ]),
)(ClientsAction);
