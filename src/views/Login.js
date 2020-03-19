import React from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { signIn } from 'actions';
import iconUser from 'assets/icons/user.svg';
import iconPassword from 'assets/icons/password.svg';
import Input from 'components/atoms/Input/Input';
import Button from 'components/atoms/Button/Button';
import styled from 'styled-components';
import iconCar from 'assets/icons/car.svg';

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xl};
  text-align: center;
`;

const StyledError = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.color.red};
`;

const StyledWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  grid-template-columns: auto;
  grid-row-gap: 20px;
  grid-column-gap: 40px;
  padding: 80px;
`;

const StyledIcon = styled.div`
  display: block;
  width: 60px;
  height: 60px;
  margin: 0 auto;
  background-image: url(${({ icon }) => icon});

  &::before,
  &::after {
    position: absolute;
    top: 110px;
    left: 80px;
    content: '';
    height: 2px;
    width: 100px;
    background-color: ${({ theme }) => theme.color.primary};
  }
  &::after {
    left: 330px;
  }
`;

const Login = ({ signIn, auth, authError }) =>
  auth.uid ? (
    <Redirect to="/" />
  ) : (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={(values, { resetForm }) => {
        signIn(values);
        resetForm();
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
          <StyledWrapper>
            <StyledIcon icon={iconCar} />
            <Title>Panel administracyjny</Title>
            <Input
              type="text"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              icon={iconUser}
              placeholder="Email"
            />

            <Input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              icon={iconPassword}
              placeholder="Hasło"
            />

            <Button secondary type="submit">
              Zaloguj
            </Button>
            <StyledError>{authError}</StyledError>
          </StyledWrapper>
        </form>
      )}
    </Formik>
  );

const mapStateToProps = state => {
  console.log(state);
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: creds => dispatch(signIn(creds)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
