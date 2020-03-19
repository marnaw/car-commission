import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.color.secondary};
  max-width: 1200px;
  min-height: 750px;
  padding: 20px;
`;

const UserFormTemplate = ({ children }) => <StyledWrapper>{children}</StyledWrapper>;

export default UserFormTemplate;
