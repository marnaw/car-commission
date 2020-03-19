import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Hamburger from 'components/atoms/Hamburger/Hamburger';
import NavUser from 'components/molecules/userNav/userNav';
import iconUser from 'assets/icons/user.svg';
import iconBurger from 'assets/icons/burger.svg';

const StyledWrapper = styled.header`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  width: 100%;
  background-color: ${({ theme }) => theme.color.primary};
  padding: 0 20px;
`;

const Header = ({ userName }) => (
  <StyledWrapper>
    <Hamburger icon={iconBurger} />
    <NavUser icon={iconUser} userName={userName} />
  </StyledWrapper>
);
Header.propTypes = {
  userName: PropTypes.string.isRequired,
};
export default Header;
