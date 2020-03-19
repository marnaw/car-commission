import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'components/atoms/Button/Button';
import Input from 'components/atoms/Input/Input';
import iconSearch from 'assets/icons/search.svg';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  height: 82px;
  border: solid 1px ${({ theme }) => theme.color.tertiary};
  border-radius: 5px;
  margin-bottom: 30px;
`;
const StyledSearch = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.25fr;
  grid-column-gap: 20px;
`;

const Filter = ({ title, titleButton, link }) => (
  <StyledWrapper>
    {title && (
      <Button as={Link} to={link}>
        {title}
      </Button>
    )}
    {titleButton && (
      <StyledSearch>
        <Input placeholder="Imię i nazwisko" icon={iconSearch} />
        <Button width="100px">{titleButton}</Button>
      </StyledSearch>
    )}
  </StyledWrapper>
);

Filter.propTypes = {
  title: PropTypes.string.isRequired,
  titleButton: PropTypes.string,
};
export default Filter;
