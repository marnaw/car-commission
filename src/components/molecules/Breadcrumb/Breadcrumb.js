import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import iconHome from 'assets/icons/home.svg';
import arrowLeft from 'assets/icons/arrow-left.svg';
import { routes } from '../../../routes';
const StyledBreadcrumb = styled.nav`
  margin: 0;
  display: flex;
  align-items: center;
  height: 53px;
  width: 100%;
  background-color: ${({ theme }) => theme.color.gray200};
  margin-bottom: 30px;
`;
const StyledList = styled.ul`
  display: flex;

  list-style: none;
  margin-left: 30px;
`;

const StyledListItem = styled.li`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.weight.medium};
  text-decoration: none;
  color: currentColor;
  &:not(:last-child) {
    &::after {
      display: inline-block;
      content: '';
      background-image: url(${arrowLeft});
      background-repeat: no-repeat;
      background-size: cover;
      height: 25px;
      width: 25px;
      margin-left: 5px;
      margin-right: 5px;
    }
  }
`;

const StyledHome = styled.div`
  height: 25px;
  width: 25px;
  background-image: url(${iconHome});
  background-size: cover;
  background-repeat: no-repeat;
`;

class Breadcrumb extends React.Component {
  getUrl = location => {
    const url = location.pathname;
    return url.split('/').filter(item => item !== '');
  };

  render() {
    const items = {
      order: {
        first: 'Zamównienia',
        detail: 'Szczegóły zamowienia',
        url: routes.orders,
      },
      orders: {
        first: 'Zamównienia',
        add: 'Dodaj zamówienie',
        url: routes.orders,
      },

      products: {
        first: 'Produkt',
        add: 'Dodaj produkt',
        edit: 'Edytuj produkt',
        detail: 'Szczegóły produktu',
        url: routes.products,
      },

      clients: {
        first: 'Klienci',
        add: 'Dodaj klienta',
        edit: 'Edytuj klienta',
        url: routes.clients,
      },

      employees: {
        first: 'Pracownicy',
        add: 'Dodaj pracownika',
        edit: 'Edytuj pracownika',
        url: routes.employees,
      },
      invoices: {
        first: 'Faktury',
        url: routes.invoice,
      },
    };
    const { location } = this.props;
    return (
      <StyledBreadcrumb>
        <StyledList>
          <StyledListItem>
            <StyledHome as={Link} to="/" />
          </StyledListItem>
          <StyledListItem as={Link} to={items[this.getUrl(location)[0]].url}>
            {items[this.getUrl(location)[0]].first}
          </StyledListItem>
          {this.getUrl(location)[1] === 'add' && (
            <StyledListItem>{items[this.getUrl(location)[0]].add}</StyledListItem>
          )}
          {this.getUrl(location)[1] === 'edit' && (
            <StyledListItem>{items[this.getUrl(location)[0]].edit}</StyledListItem>
          )}
          {this.getUrl(location)[1] &&
            this.getUrl(location)[1] !== 'add' &&
            this.getUrl(location)[1] !== 'edit' && (
              <StyledListItem>{items[this.getUrl(location)[0]].detail}</StyledListItem>
            )}
        </StyledList>
      </StyledBreadcrumb>
    );
  }
}

export default Breadcrumb;
