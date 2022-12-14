import { CSSProperties, MouseEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import Question from './Question';
import TwoButton from './TwoButton';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: 100vh;
  max-width: 32rem;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

interface IModalProps {
  id?: string;
  isOpen: boolean;
  onClickRight?: () => void;
  onClickLeft?: () => void;
  onClickUp?: () => void;
  onClickDown?: () => void;
  onClickOutside: () => void;
  type: 'question' | 'twoButton';
  question?: string;
  left?: string;
  right?: string;
  up?: string;
  down?: string;
}

const Modal = ({ id, isOpen, onClickRight, onClickLeft, onClickUp, onClickDown, onClickOutside, type, question, left, right, up, down }: IModalProps) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const el = useRef<HTMLDivElement>(null);

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

  const onClick = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    if (e.target == el.current) onClickOutside();
  };

  const modalContent = isOpen ? (
    <ModalOverlay id={id} ref={el} onClick={(e) => onClick(e)}>
      {type === 'question' && <Question onClickRight={onClickRight} onClickLeft={onClickLeft} question={question} left={left} right={right}/>}
      {type === 'twoButton' && <TwoButton onClickUp={onClickUp} onClickDown={onClickDown} up={up} down={down}/>}
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
