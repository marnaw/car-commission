import React from 'react';
import styled from 'styled-components';
import Header from 'components/organisms/Header/Header';
import Sidebar from 'components/organisms/Sidebar/Sidebar';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledMain = styled.main`
  padding: 90px 20px 15px 270px;
`;

const UserTemplate = ({ children, auth, name }) => {
  if (!auth.uid) return <Redirect to="/login" />;
  console.log(auth);
  return (
    <StyledWrapper>
      <Header userName={name} />
      <Sidebar />
      <StyledMain>{children}</StyledMain>
    </StyledWrapper>
  );
};

const mapStateToProps = state => {
  console.log(state);
  return {
    auth: state.firebase.auth,
    name: state.firebase.profile.fullName,
  };
};

export default connect(mapStateToProps)(UserTemplate);
