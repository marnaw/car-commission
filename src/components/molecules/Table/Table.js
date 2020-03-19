import styled from 'styled-components';

export const Table = styled.table`
  font-size: ${({ theme }) => theme.fontSize.s};
  width: ${({ width }) => width || '100%'};
  margin: auto auto;
`;

export const Th = styled.th`
  padding: 10px 30px;
  background-color: ${({ theme }) => theme.color.blue};
  color: ${({ theme }) => theme.color.white};
  font-weight: ${({ theme }) => theme.weight.regular};
`;

export const Tr = styled.tr`
  background-color: ${({ theme }) => theme.color.gray300};

  &:nth-child(2n) {
    background-color: transparent;
  }
`;

export const Td = styled.td`
  position: relative;
  text-align: center;
  padding: 20px 30px;
`;
