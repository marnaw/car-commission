import styled from 'styled-components';

const Heading = styled.h1`
  font-weight: ${({ theme }) => theme.weight.bold};
  font-size: ${({ theme }) => theme.fontSize.s};
`;

export default Heading;
