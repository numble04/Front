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
`;

interface IBackProps {
  onClose?: () => void;
  onOK?: () => void;
  cssStyle?: CSSProperties;
}

const Back = ({ onClose, onOK, cssStyle }: IBackProps) => {
  return (
    <StyledModal style={cssStyle}>
      <BodyWrapper>
        <div>회원가입을 종료하시겠습니까?</div>
      </BodyWrapper>
      <FooterWrapper>
        <YesButton onClick={onOK}>예</YesButton>
        <NoButton onClick={onClose}>아니오</NoButton>
      </FooterWrapper>
    </StyledModal>
  );
};

export default Back;
