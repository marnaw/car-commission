import styled, { css } from 'styled-components';

const Paragraph = styled.p`
  font-size: ${({ theme }) => theme.fontSize.m};
  letter-spacing: 0.2px;
  ${({ small }) =>
    small &&
    css`
      font-size: ${({ theme }) => theme.fontSize.s};
    `}
`;

export default Paragraph;
