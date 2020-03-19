import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Heading from 'components/atoms/Heading/Heading';
import Paragraph from 'components/atoms/Paragraph/Paragraph';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px 25px;
  border: solid 2px ${({ theme, color }) => theme.color[color]};
  width: 320px;
  min-height: 144px;
`;

const StyledHeading = styled(Heading)`
  text-align: center;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.white};
  font-weight: 600;
  letter-spacing: 0.4px;
`;

const StyledWrapperHeading = styled.div`
  background-color: ${({ theme, color }) => theme.color[color]};
  width: 100%;
  padding: 8px 0;
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InnerWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 10px;
`;
const StyledTitle = styled(Heading)`
  font-weight: ${({ theme }) => theme.weight.bold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StyledParagraph = styled(Paragraph)`
  margin-top: 10px;
  font-size: ${({ theme }) => theme.fontSize.s};
`;

const Card = ({ color, title, titleContnet, content, titleAmount, amount }) => (
  <StyledWrapper color={color}>
    <StyledWrapperHeading color={color}>
      <StyledHeading>{title}</StyledHeading>
    </StyledWrapperHeading>
    <InnerWrapper>
      <StyledContent>
        <StyledTitle>{titleContnet}</StyledTitle>
        <StyledParagraph>
          {content}
          {titleAmount ? ' zł' : ' szt'}
        </StyledParagraph>
      </StyledContent>

      {titleAmount && (
        <StyledContent>
          <StyledTitle>{titleAmount}</StyledTitle>
          <StyledParagraph>{amount}</StyledParagraph>
        </StyledContent>
      )}
    </InnerWrapper>
  </StyledWrapper>
);

Card.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string.isRequired,
  titleContnet: PropTypes.string.isRequired,
  content: PropTypes.number.isRequired,
  titleAmount: PropTypes.string,
  amount: PropTypes.number,
};

Card.defaultProps = {
  titleAmount: null,
  amount: null,
};
export default Card;
