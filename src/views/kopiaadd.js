import React from 'react';
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
import iconSearch from 'assets/icons/search.svg';

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

const StyledInput = styled(Input)`
  margin: 20px auto;
`;
const OrdersAdd = ({ match }) => (
  <UserTemplate>
    <Breadcrumb match={match.path} />
    <UserFormTemplate>
      <Bar title="Dodaj zamówienie" />

      <Formik
        initialValues={{
          fullName: '',
          companyName: '',
          address: '',
          companyID: '',
          city: '',
          zipCode: '',
          email: '',
          company: true,
        }}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          resetForm({});
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
                  onChange={
                    values.company === true ? handleChange : () => setFieldValue(values.companyID)
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
              <Input type="number" name="aa" icon={iconPeople} placeholder="ass" />

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
            <Button type="submit">Dodaj zamówienie</Button>
          </form>
        )}
      </Formik>

      <Bar title="Produkt" />
      <StyledContent center>
        <StyledInput icon={iconSearch} placeholder="Search" width="95%" />
      </StyledContent>
    </UserFormTemplate>
  </UserTemplate>
);

export default OrdersAdd;
