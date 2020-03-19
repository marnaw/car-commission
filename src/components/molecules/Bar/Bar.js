import React from 'react';
import styled, { css } from 'styled-components';
import Heading from 'components/atoms/Heading/Heading';
import PropTypes from 'prop-types';
const StyledWrapperHeading = styled.div`
  padding: 12px 25px;
  background-color: ${({ theme }) => theme.color.gray200};

  ${({ margin }) =>
    margin &&
    css`
      margin: 20px 30px;
    `};
`;

const StyledHeading = styled(Heading)`
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.weight.medium};
`;

const Bar = ({ title, margin }) => (
  <StyledWrapperHeading margin={margin}>
    <StyledHeading>{title}</StyledHeading>
  </StyledWrapperHeading>
);

Bar.propTypes = {
  title: PropTypes.string.isRequired,
};
export default Bar;
