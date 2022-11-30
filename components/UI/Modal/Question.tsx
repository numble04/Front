import styled from 'styled-components';
import { theme } from 'styles/theme';
import { Flex } from '../Flex/Flex';

const StyledModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${theme.colors.WHITE};
  border-radius: 7px;
  width: 84%;
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
  question?: string;
  left?: string;
  right?: string;
}

const Question = ({ onClickRight, onClickLeft, question, left, right }: IBackProps) => {
  return (
    <StyledModal>
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
