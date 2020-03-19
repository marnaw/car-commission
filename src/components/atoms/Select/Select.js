import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Select = styled.select`
  height: 45px;
  width: ${({ width }) => width || '350px'};
  margin: 0;
  padding-left: 50px;
  background-image: url(${({ icon }) => icon});
  background-position: 10px 50%;
  background-repeat: no-repeat;
  color: ${({ theme }) => theme.color.primary};
  border: 1px solid ${({ theme }) => theme.color.gray100};
  font-family: 'Montserrat', sans-serif;
  font-size: ${({ theme }) => theme.fontSize.s};
  cursor: pointer;
  background-color: transparent;

  option {
    height: 30px;
  }
`;

export default Select;
