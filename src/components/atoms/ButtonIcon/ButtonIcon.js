import styled from 'styled-components';

const ButtonIcon = styled.button`
  display: block;
  width: 25px;
  height: 25px;
  background-image: url(${({ icon }) => icon});
  border: none;
  background-color: transparent;
  background-size: 90%;
  background-repeat: no-repeat;
  margin: 2px 2px;
  margin: 0 auto;
  cursor: pointer;
  transition: all 0.1s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

export default ButtonIcon;
