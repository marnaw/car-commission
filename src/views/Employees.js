import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import UserTemplate from 'templates/UserTemplate';
import Breadcrumb from 'components/molecules/Breadcrumb/Breadcrumb';
import Filter from 'components/molecules/Filter/Filter';
import { Table, Th, Td, Tr } from 'components/molecules/Table/Table';
import { routes } from 'routes';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { deleteElement } from 'actions';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import IconEdit from 'assets/icons/edit.svg';
import IconDelete from 'assets/icons/delete.svg';
import moment from 'moment';
import 'moment/locale/pl';

const StyledTD = styled(Td)`
  display: grid;
  grid-template-columns: repeat(3, 30px);
  justify-content: center;
`;

class Employees extends Component {
  state = {};

  render() {
    const { location, employees, deleteEmployee } = this.props;

    return (
      <UserTemplate>
        <Breadcrumb location={location} />
        <Filter title="Dodaj nowego pracownika" link={routes.employeesAdd} />
        <Table>
          <thead>
            <Tr>
              <Th>Id</Th>
              <Th>Imię i nazwisko</Th>
              <Th>Uprawnienia</Th>
              <Th>Email</Th>
              <Th>Data dodania</Th>
              <Th>Akcja</Th>
            </Tr>
          </thead>
          <tbody>
            {employees &&
              employees.map((item, index) => (
                <Tr key={item.id}>
                  <Td>{index + 1}</Td>
                  <Td>{item.fullName}</Td>
                  <Td>{item.permission}</Td>
                  <Td>{item.email}</Td>
                  <Td>{moment(new Date(item.createdAt.toDate().toString())).calendar()}</Td>
                  <StyledTD>
                    <ButtonIcon
                      icon={IconEdit}
                      as={Link}
                      to={routes.employeesEdit + '/' + item.id}
                    />
                    <ButtonIcon
                      icon={IconDelete}
                      onClick={() => deleteEmployee('DELETE_EMPLOYEE', item.id, 'users')}
                    />
                  </StyledTD>
                </Tr>
              ))}
          </tbody>
        </Table>
      </UserTemplate>
    );
  }
}

const mapStateToProps = state => {
  return {
    employees: state.firestore.ordered.users,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteEmployee: (type, id, col) => dispatch(deleteElement(type, id, col)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {
      collection: 'users',
    },
  ]),
)(Employees);
