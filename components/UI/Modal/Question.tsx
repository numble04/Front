import { CSSProperties } from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import { Flex } from '../Flex/Flex';

const StyledModal = styled.div`
  position: relative;
  background-color: ${theme.colors.WHITE};
  border-radius: 7px;
  width: 100%;
  margin: 0 22px;
  text-align: center;
`;

const BodyWrapper = styled.div`
  padding: 14px;
`;

const FooterWrapper = styled(Flex)`
  border-top: 1px solid ${theme.colors.SLATEGRAY20};
`;

const YesButton = styled.div`
  flex: 1;
  padding: 12px;
  cursor: pointer;
`;

const NoButton = styled.div`
  flex: 1;
  padding: 12px;
  border-left: 1px solid ${theme.colors.SLATEGRAY20};
  cursor: pointer;
  color: #ED4954;
`;

interface IBackProps {
  onClickRight?: () => void;
  onClickLeft?: () => void;
  cssStyle?: CSSProperties;
  question?: string;
  left?: string;
  right?: string;
}

const Question = ({ onClickRight, onClickLeft, cssStyle, question, left, right }: IBackProps) => {
  return (
    <StyledModal style={cssStyle}>
      <BodyWrapper>
        <div>{question}</div>
      </BodyWrapper>
      <FooterWrapper>
        <YesButton onClick={onClickLeft}>{left}</YesButton>
        <NoButton onClick={onClickRight}>{right}</NoButton>
      </FooterWrapper>
    </StyledModal>
  );
};

export default Question;
