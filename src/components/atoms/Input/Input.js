import styled from 'styled-components';

const Input = styled.input`
  height: 45px;
  width: ${({ width }) => width || '350px'};
  margin: 0;
  padding-left: 50px;
  background-image: url(${({ icon }) => icon});
  background-position: 10px 50%;
  background-repeat: no-repeat;
  border: 1px solid ${({ theme }) => theme.color.gray100};
  font-family: 'Montserrat', sans-serif;
  font-size: ${({ theme }) => theme.fontSize.s};
  &::placeholder {
    color: ${({ theme }) => theme.color.primary};
  }
`;

export const TextArea = styled.textarea`
  resize: none;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.color.gray100};
  font-family: 'Montserrat', sans-serif;
  font-size: ${({ theme }) => theme.fontSize.s};
`;

export default Input;
