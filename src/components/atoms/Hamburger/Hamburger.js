import styled from 'styled-components';

const Hamburger = styled.button`
  display: block;
  width: 32px;
  height: 32px;
  background-image: url(${({ icon }) => icon});
  background-position: 10px 50%;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export default Hamburger;
