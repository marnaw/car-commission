import React from 'react';
import DetailsTemplate from 'templates/DetailsTemplate';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const StyledWrapper = styled.div``;
const DetailsPage = ({ location, order, id }) => (
  <StyledWrapper>
    <DetailsTemplate location={location} order={order} id={id} />
  </StyledWrapper>
);

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const orders = state.firestore.data.orders;
  const order = orders ? orders[id] : null;
  return {
    order,
    id,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: 'orders',
    },
  ]),
)(DetailsPage);
