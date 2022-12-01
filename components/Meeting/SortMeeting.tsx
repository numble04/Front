import { MouseEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { SortMeetingProps } from 'types/meeting';
import { RadioChangeEvent, Radio, Input, Space } from 'antd';
import { DeleteIcon } from 'components/UI/atoms/Icon';
import { theme } from 'styles/theme';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: 100vh;
  max-width: 32rem;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const SortMeeting = ({ isOpen, setIsOpen, sort, setSort }: SortMeetingProps) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [value, setValue] = useState<string>(sort);
  const el = useRef<HTMLDivElement>(null);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const applySort = () => {
    setSort(value);
    setIsOpen(false);
  }

  // HINT: 모달 오버레이에서 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.cssText = `
        position: fixed; 
        // top: -${window.scrollY}px;
        // overflow-y: scroll;
        width: 100%;
      `;
      setValue(sort);

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
    if (e.target == el.current) setIsOpen(false);
  };

  const modalContent = isOpen ? (
    <ModalOverlay ref={el} onClick={onClick}>
      <Container>
        <IconWrapper>
          <div onClick={() => setIsOpen(false)}>
            <DeleteIcon />
          </div>
        </IconWrapper>
        <Title>정렬하기</Title>
        <RadioWrapper>
          <Radio.Group onChange={onChange} value={value}>
            <Space direction="vertical">
              <Radio value={'createdAt'}>신규순</Radio>
              <Radio value={'popularity'}>인기순</Radio>
              <Radio value={'day'}>날짜순</Radio>
              <Radio value={'distance'}>가까운 거리순</Radio>
            </Space>
          </Radio.Group>
        </RadioWrapper>
        <Footer>
          <Button onClick={applySort}>
            적용하기
          </Button>
        </Footer>
      </Container>
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

export default SortMeeting;

const Container = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: #ffffff;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: end;
  padding: 20px 20px 4px 20px;
  & > div {
    cursor: pointer;
  }
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 8px;
  padding: 0 20px 4px 20px;
`;

const RadioWrapper = styled.div`
  padding: 0 20px 16px 20px;  
  .ant-radio-checked .ant-radio-inner {
    border-color: ${theme.colors.PRIMARY};
    background-color: ${theme.colors.PRIMARY};
  }
  .ant-radio-checked:hover .ant-radio-inner:hover {
    border-color: ${theme.colors.PRIMARY};
    background-color: ${theme.colors.PRIMARY};
  }
  .ant-radio:hover .ant-radio-inner {
    border-color: ${theme.colors.PRIMARY};
  }
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 4rem;
  padding: 0 16px;
  border-top: 1px solid #e2e4e8;
`;

const Button = styled.button`
  outline: none;
  border: none;
  width: 100%;
  height: 3rem;
  border-radius: 52px;
  cursor: pointer;
  color: #FFFFFF;
  background-color: ${theme.colors.PRIMARY};
  font-weight: 500;
  font-size: 16px;
`;