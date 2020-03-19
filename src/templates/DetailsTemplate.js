import React, { Component } from 'react';
import styled from 'styled-components';
import UserTemplate from 'templates/UserTemplate';
import UserFormTemplate from 'templates/UserFormTemplate';
import Breadcrumb from 'components/molecules/Breadcrumb/Breadcrumb';
import Bar from 'components/molecules/Bar/Bar';
import Heading from 'components/atoms/Heading/Heading';
import { Table, Th, Tr, Td } from 'components/molecules/Table/Table';

const StyledBarWrapper = styled.div`
  grid-column: 1 / -1;
  grid-row: 2;
  padding: 0;
`;

const StyledContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 60px;
  border: 1px solid ${({ theme }) => theme.color.gray100};
  border-radius: 5px;
  grid-gap: 20px;
  margin-top: 20px;
`;
const StyledBox = styled.div`
  padding: 20px;
  width: 300px;
`;

const StyledList = styled.ul`
  margin-top: 15px;
  list-style: none;
`;
const StyledItem = styled.li`
  line-height: 24px;
`;

const StyledTable = styled(Table)`
  grid-column: 1 / -1;
  width: 80%;
`;

class DetailsTemplate extends Component {
  state = {};

  render() {
    const { location, order, id } = this.props;

    return (
      order && (
        <UserTemplate>
          <Breadcrumb location={location} />
          <UserFormTemplate>
            <Bar title={`Szczegóły zamowienia #${id}`} />

            <StyledContent>
              <StyledBox>
                <Heading>Dane rozliczeniowe</Heading>
                <StyledList>
                  <StyledItem>{order.fullName}</StyledItem>
                  <StyledItem>{order.address}</StyledItem>
                  <StyledItem>
                    {order.zipCode} {order.city}
                  </StyledItem>
                  <StyledItem>{order.email}</StyledItem>
                  <StyledItem>Wystawił: Admin</StyledItem>
                </StyledList>
              </StyledBox>

              <StyledBox>
                <Heading>Faktura</Heading>
                <StyledList>
                  {order.company ? (
                    <>
                      <StyledItem>NIP: {order.companyID}</StyledItem>
                      <StyledItem>Firma: {order.companyName}</StyledItem>
                    </>
                  ) : (
                    <>
                      <StyledItem>NIP: brak</StyledItem>
                      <StyledItem>Osoba fizyczna: {order.fullName}</StyledItem>
                    </>
                  )}
                </StyledList>
              </StyledBox>
              <StyledBarWrapper>
                <Bar title="Produkt" margin />
              </StyledBarWrapper>
              <StyledTable>
                <thead>
                  <Tr>
                    <Th>Nazwa towaru</Th>
                    <Th>Ilość</Th>
                    <Th>Wartość netto</Th>
                    <Th>Vat</Th>
                    <Th>Wartość brutto</Th>
                  </Tr>
                </thead>
                <tbody>
                  {order.product.map((el, index) => (
                    <Tr key={index}>
                      <Td>
                        {el.brand} {el.model}
                      </Td>
                      <Td>1</Td>
                      <Td>{Math.round(el.price / 1.23)} zł</Td>
                      <Td>23%</Td>
                      <Td>{el.price} zł</Td>
                    </Tr>
                  ))}
                </tbody>
              </StyledTable>
            </StyledContent>
          </UserFormTemplate>
        </UserTemplate>
      )
    );
  }
}

export default DetailsTemplate;
