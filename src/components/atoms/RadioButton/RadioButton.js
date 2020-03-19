import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const RadioLabel = styled.label`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.s};
  letter-spacing: 0.3px;
`;
const RadioButton = styled.div`
  margin-right: 10px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.gray100};
  border: 2px solid ${({ theme }) => theme.color.gray100};
  cursor: pointer;
`;
const Input = styled.input`
  opacity: 0;
  &:checked + ${RadioButton} {
    border: 2px solid ${({ theme }) => theme.color.gray100};
    box-shadow: inset 0 0 0 2px white;
  }
`;

const Radio = ({ id, children, checked, changeFn }) => (
  <RadioLabel>
    <Input id={id} type="radio" checked={checked} onChange={changeFn} />
    <RadioButton />
    {children}
  </RadioLabel>
);

Radio.protoType = {
  children: PropTypes.string.isRequired,
};

export default Radio;
