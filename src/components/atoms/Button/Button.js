import styled, { css } from 'styled-components';

const Button = styled.button`
  display: inline-block;
  text-align: center;
  line-height: 45px;
  text-decoration: none;
  padding: 0;
  width: ${({ width }) => width || '350px'};
  background-color: ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.white};
  border: none;
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.weight.light};

  cursor: pointer;
  ${({ secondary }) =>
    secondary &&
    css`
      background-color: ${({ theme }) => theme.color.violet};
    `}

  ${({ center }) =>
    center &&
    css`
      transform: translateX(50%);
    `}
`;

export default Button;
