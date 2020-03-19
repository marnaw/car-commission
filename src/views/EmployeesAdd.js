import React from 'react';
import { connect } from 'react-redux';
import { signUp, employeesUpdate } from 'actions';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
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
import iconSalary from 'assets/icons/salary.svg';
import iconPassword from 'assets/icons/password.svg';

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

const EmployeesAdd = ({ location, signUp, employeesUpdate, employee, id }) => (
  <UserTemplate>
    <UserFormTemplate>
      <Breadcrumb location={location} />

      <Bar title={id ? 'Edycja pracownika ' : 'Nowy pracownik'} />
      <Formik
        initialValues={
          employee
            ? { ...employee, password: '' }
            : {
                fullName: '',
                personalID: '',
                address: '',
                IdCard: '',
                city: '',
                zipCode: '',
                salary: '',
                permission: 'pracownik',
                gender: 'mezczyzna',
                email: '',
                password: '',
              }
        }
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          if (!id) {
            signUp(values);
            resetForm({});
          } else {
            console.log(values, id);
            employeesUpdate(values, id);
          }
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

              <Input
                type="text"
                name="personalID"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.personalID}
                icon={iconBusiness}
                placeholder="PESEL"
              />

              <Input
                type="text"
                name="address"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
                icon={iconLocation}
                placeholder="Adres"
              />

              <Input
                type="number"
                name="IdCard"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.IdCard}
                icon={iconPeople}
                placeholder="Nr. dowodu osobistego"
              />

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
                placeholder="Kod pocztowy"
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
              <Input
                type="text"
                name="salary"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.salary}
                icon={iconSalary}
                placeholder="Wynagrodzenie"
              />

              <StyledGroupRadio>
                <Radio
                  type="radio"
                  name="permission"
                  checked={values.permission === 'administrator'}
                  changeFn={() => setFieldValue('permission', 'administrator')}
                >
                  Administrator
                </Radio>
                <Radio
                  type="radio"
                  name="permission"
                  checked={values.permission === 'pracownik'}
                  changeFn={() => {
                    setFieldValue('permission', 'pracownik');
                  }}
                >
                  Pracownik
                </Radio>
              </StyledGroupRadio>

              <StyledGroupRadio>
                <Radio
                  type="radio"
                  name="permission"
                  checked={values.gender === 'mezczyzna'}
                  changeFn={() => setFieldValue('gender', 'mezczyzna')}
                >
                  Mężczyzna
                </Radio>
                <Radio
                  type="radio"
                  name="permission"
                  checked={values.gender === 'kobieta'}
                  changeFn={() => {
                    setFieldValue('gender', 'kobieta');
                  }}
                >
                  Kobieta
                </Radio>
              </StyledGroupRadio>
              {!id && (
                <Input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  icon={iconPassword}
                  placeholder="Hasło"
                />
              )}
            </StyledContent>
            <Button center type="submit">
              {id ? 'Zapisz zmiany' : 'Dodaj pracownika'}
            </Button>
          </form>
        )}
      </Formik>
    </UserFormTemplate>
  </UserTemplate>
);
const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const employees = state.firestore.data.users;
  const employee = employees ? employees[id] : null;
  return {
    employee,
    id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: employee => dispatch(signUp(employee)),
    employeesUpdate: (employee, id) => dispatch(employeesUpdate(employee, id)),
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {
      collection: 'users',
    },
  ]),
)(EmployeesAdd);
