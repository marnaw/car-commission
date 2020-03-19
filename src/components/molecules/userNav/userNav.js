import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signOut } from 'actions';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import angleDown from 'assets/icons/arrow-down.svg';
import iconLogout from 'assets/icons/logout.svg';
import iconSetting from 'assets/icons/gearbox.svg';

const StyledNavUser = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

const StyledIconUser = styled.div`
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.color.primary} url(${({ icon }) => icon});
  background-size: cover;
  background-position: 50% 50%;
  border: 1px solid ${({ theme }) => theme.color.white};
  margin-right: 15px;
`;

const StyledUserName = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.s};
  color: ${({ theme }) => theme.color.white};

  &::after {
    display: inline-block;
    content: '';
    background-image: url(${angleDown});
    background-repeat: no-repeat;
    background-size: cover;
    height: 25px;
    width: 25px;
    margin-left: 5px;
  }
`;
const StyledLinksList = styled.ul`
  position: absolute;
  top: 42px;
  display: flex;
  margin: 0;
  padding: 0;
  flex-direction: column;
  align-items: center;
  list-style: none;
  margin-top: 10px;
  border: 1px solid ${({ theme }) => theme.color.gray100};
  border-radius: 5px;
  box-shadow: 0 3px 8px -5px hsla(0, 0%, 0%, 0.4);
  overflow: hidden;

  &::before {
    position: absolute;
    top: -10px;
    left: 8px;
    content: '';
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 10px solid ${({ theme }) => theme.color.gray100};
  }
`;
const StyledLink = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 40px;
  width: 180px;
  background-color: white;
  background-image: url(${({ icon }) => icon});
  background-repeat: no-repeat;
  background-position: 10px 50%;
  background-size: 23px;
  color: ${({ theme }) => theme.color.primary};
  font-size: ${({ theme }) => theme.fontSize.s};
  padding-left: 45px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.primary};
  }
`;

class NavUser extends Component {
  state = {
    isVisible: false,
  };
  handleChange = () => {
    this.setState(prevState => ({ isVisible: !prevState.isVisible }));
  };

  render() {
    const { icon, userName, signOut } = this.props;
    const { isVisible } = this.state;

    return (
      <StyledNavUser onClick={this.handleChange}>
        <StyledIconUser icon={icon} />
        <StyledUserName>{userName}</StyledUserName>
        {isVisible && (
          <StyledLinksList>
            <StyledLink icon={iconSetting}>Ustawienia</StyledLink>
            <StyledLink onClick={() => signOut()} icon={iconLogout}>
              Wyloguj
            </StyledLink>
          </StyledLinksList>
        )}
      </StyledNavUser>
    );
  }
}

NavUser.propTypes = {
  icon: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(null, mapDispatchToProps)(NavUser);
