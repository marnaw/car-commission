import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { routes } from 'routes';
import orderIcon from 'assets/icons/order.svg';
import productsIcon from 'assets/icons/product.svg';
import peopleIcon from 'assets/icons/people.svg';
import angleDown from 'assets/icons/arrow-down.svg';

const toOutside = keyframes`
  from {
    height:0;
  }

  to {
    height:100%;  }
`;

const StyledSidebar = styled.nav`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 240px;
  background-color: ${({ theme }) => theme.color.secondary};
  padding-top: 30px;
  overflow: hidden;
  margin-top: 60px;
`;

const StyledLinksList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const StyledItem = styled.li`
  line-height: 47px;
  color: ${({ theme }) => theme.color.white};
  font-size: ${({ theme }) => theme.fontSize.s};
  width: 100%;
`;
const StyledLink = styled(NavLink)`
  display: flex;
  color: currentColor;
  padding-left: 25px;
  text-decoration: none;
  position: relative;

  &.active {
    display: block;
    color: ${({ theme }) => theme.color.blue};
    background-color: black;
    transition: all 0.4s ease-in-out;

    &::before {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      height: 0;
      display: block;
      content: '';
      width: 7px;
      margin: auto;
      background-color: ${({ theme }) => theme.color.blue};
      animation: ${toOutside} 0.3s 0.4s ease-in-out forwards;
    }
  }
`;

const Title = styled.span`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.color.tertiary};
  font-weight: 500;
  width: 100%;
  position: relative;

  &::before {
    content: '';
    display: block;
    height: 24px;
    width: 24px;
    background-image: url(${({ icon }) => icon});
    background-position-y: 50%;
    background-repeat: no-repeat;
    background-size: 80%;
    margin: 0 10px;
  }

  &::after {
    right: 0;
    content: '';
    display: block;
    height: 24px;
    width: 24px;
    background-image: url(${angleDown});
    background-repeat: no-repeat;
    background-repeat: no-repeat;
    background-size: 110%;
    background-position-y: 50%;
    position: absolute;

    right: 10px;
    cursor: pointer;
  }
`;

class Sidebar extends Component {
  state = {
    orders: true,
    products: true,
    clients: true,
    employees: true,
    reservation: true,
  };

  handleToogleOn = title => {
    this.setState(prevState => ({ [title]: !prevState[title] }));
  };
  render() {
    const { orders, products, clients, employees, reservation } = this.state;
    return (
      <StyledSidebar>
        <StyledLinksList>
          <StyledItem>
            <Title onClick={() => this.handleToogleOn('orders')} icon={orderIcon}>
              Zamówienia
            </Title>
            {orders && (
              <StyledLinksList>
                <StyledItem>
                  <StyledLink exact to={routes.orders} activeClassName="active">
                    Przeglądaj zamówienia
                  </StyledLink>
                </StyledItem>
                <StyledItem>
                  <StyledLink exact to={routes.ordersAdd} activeClassName="active">
                    Dodaj zamówienie
                  </StyledLink>
                </StyledItem>
                <StyledItem>
                  <StyledLink exact to={routes.invoice} activeClassName="active">
                    Faktury
                  </StyledLink>
                </StyledItem>
              </StyledLinksList>
            )}
          </StyledItem>

          <StyledItem>
            <Title onClick={() => this.handleToogleOn('reservation')} icon={orderIcon}>
              Rezerwacje
            </Title>
            {reservation && (
              <StyledLinksList>
                {/* <StyledItem>
                  <StyledLink exact to={routes.reservation} activeClassName="active">
                    Przeglądaj rezerwacje
                  </StyledLink>
                </StyledItem>
                <StyledItem>
                  <StyledLink exact to={routes.reservationAdd} activeClassName="active">
                    Dodaj rezerwacje
                  </StyledLink>
                </StyledItem> */}
              </StyledLinksList>
            )}
          </StyledItem>

          <StyledItem>
            <Title onClick={() => this.handleToogleOn('products')} icon={productsIcon}>
              Produkty
            </Title>
            {products && (
              <StyledLinksList>
                <StyledItem>
                  <StyledLink exact to={routes.products} activeClassName="active">
                    Przeglądaj / Dodaj
                  </StyledLink>
                </StyledItem>
              </StyledLinksList>
            )}
          </StyledItem>

          <StyledItem>
            <Title onClick={() => this.handleToogleOn('clients')} icon={peopleIcon}>
              Klienci
            </Title>
            {clients && (
              <StyledLinksList>
                <StyledItem>
                  <StyledLink exact to={routes.clients} activeClassName="active">
                    Przeglądaj klientów
                  </StyledLink>
                </StyledItem>
              </StyledLinksList>
            )}
          </StyledItem>

          <StyledItem>
            <Title onClick={() => this.handleToogleOn('employees')} icon={peopleIcon}>
              Pracownicy
            </Title>
            {employees && (
              <StyledLinksList>
                <StyledItem>
                  <StyledLink exact to={routes.employees} activeClassName="active">
                    Przeglądaj
                  </StyledLink>
                </StyledItem>
                <StyledItem>
                  <StyledLink exact to={routes.employeesAdd} activeClassName="active">
                    Dodaj
                  </StyledLink>
                </StyledItem>
              </StyledLinksList>
            )}
          </StyledItem>
        </StyledLinksList>
      </StyledSidebar>
    );
  }
}

export default Sidebar;
