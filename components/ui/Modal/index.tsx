import { CSSProperties, ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { theme } from 'styles/theme';
import { Flex } from '../Flex/Flex';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: 100vh;
  max-width: 32rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

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
`;

const NoButton = styled.div`
  flex: 1;
  padding: 12px;
  border-left: 1px solid ${theme.colors.SLATEGRAY20};
`;

interface IModalProps {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  onOK: () => void;
  children: ReactElement;
  cssStyle?: CSSProperties;
}

const Modal = ({
  id,
  isOpen,
  onClose,
  onOK,
  children,
  cssStyle,
}: IModalProps) => {
  const [isBrowser, setIsBrowser] = useState(false);

  // HINT: 모달 오버레이에서 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.cssText = `
        position: fixed; 
        // top: -${window.scrollY}px;
        // overflow-y: scroll;
        width: 100%;
      `;

      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = '';
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modalContent = isOpen ? (
    <ModalOverlay id={id}>
      <StyledModal style={cssStyle}>
        <BodyWrapper>{children}</BodyWrapper>
        <FooterWrapper>
          <YesButton onClick={onOK}>예</YesButton>
          <NoButton onClick={onClose}>아니오</NoButton>
        </FooterWrapper>
      </StyledModal>
    </ModalOverlay>
  ) : null;

  if (isBrowser) {
    const modalRootElement = document.getElementById('modal-root');
    if (modalRootElement) {
      return createPortal(modalContent, modalRootElement);
    }
  }

  return null;
};

export default Modal;
