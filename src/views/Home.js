import React from 'react';
import styled from 'styled-components';
import UserTemplate from 'templates/UserTemplate';
import Card from 'components/molecules/Card/Card';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 30px;
`;

const Home = () => (
  <UserTemplate>
    <StyledWrapper>
      <Card
        color="red"
        title="sprzedaz"
        titleContnet="suma (30dni"
        content={1545600}
        titleAmount="Ilość"
        amount={1}
      />
      <Card color="green" title="samochody" titleContnet="ilość samochodów w komisie" content={1} />
      <Card
        color="blue"
        title="klienci"
        titleContnet="nowi (30dni)"
        content={10}
        titleAmount="wszystkich"
        amount={45}
      />
    </StyledWrapper>
  </UserTemplate>
);

export default Home;
