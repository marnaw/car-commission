import React from 'react';
import styled from 'styled-components';
import UserTemplate from 'templates/UserTemplate';
import Breadcrumb from 'components/molecules/Breadcrumb/Breadcrumb';
import Heading from 'components/atoms/Heading/Heading';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const StyledHeading = styled(Heading)`
  font-size: ${({ theme }) => theme.fontSize.xl};
`;
const StyledContent = styled.div`
  border: 1px solid ${({ theme }) => theme.color.gray100};
  border-radius: 5px;
  margin-top: 20px;
  padding: 10px 30px;
  min-width: 320px;
  max-width: 60%;
`;

const StyledList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  list-style: none;
  margin-top: 20px;
`;
const StyledItem = styled.li`
  line-height: 24px;
`;

const StyledBox = styled.div`
  padding: 20px;
  width: 600px;
`;
const Span = styled.span`
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.weight.bold};
`;
const ProductDetail = ({ location, product, id }) => (
  <UserTemplate>
    <Breadcrumb location={location} />
    <StyledContent>
      <StyledBox>
        <StyledHeading>Dane samochodu</StyledHeading>
        {product && (
          <StyledList>
            <StyledItem>
              Marka: <Span>{product.brand}</Span>
            </StyledItem>
            <StyledItem>
              Model: <Span>{product.model}</Span>
            </StyledItem>
            <StyledItem>
              Przebieg: <Span>{product.milage}</Span>
            </StyledItem>
            <StyledItem>
              Typ paliwa: <Span>{product.fuel}</Span>
            </StyledItem>
            <StyledItem>
              Skrzynia biegów: <Span>{product.gearbox}</Span>
            </StyledItem>
            <StyledItem>
              Rocznik: <Span>{product.year}</Span>
            </StyledItem>
            <StyledItem>
              Napęd: <Span>{product.drive}</Span>
            </StyledItem>
            <StyledItem>
              Moc: <Span>{product.power}</Span>
            </StyledItem>
            <StyledItem>
              Kraj pochodzenia: <Span>{product.country}</Span>
            </StyledItem>
            <StyledItem>
              Cena: <Span>{product.price}</Span>
            </StyledItem>
            <StyledItem>
              Nr. rej.: <Span>{product.regNumber}</Span>
            </StyledItem>
            <StyledItem>
              Vin: <Span>{product.vin}</Span>
            </StyledItem>

            <StyledItem>
              Opis: <Span>{product.description}</Span>
            </StyledItem>
          </StyledList>
        )}
      </StyledBox>
    </StyledContent>
  </UserTemplate>
);

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const products = state.firestore.data.products;
  const product = products ? products[id] : null;
  return {
    product,
    id,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: 'products',
    },
  ]),
)(ProductDetail);
