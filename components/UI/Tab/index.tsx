import React from 'react';
import styled, { css } from 'styled-components';

interface TabProps {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

export const TabStyled = styled.div<{ isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  width: 100%;
  height: 50px;
  cursor: pointer;

  ${({ isActive }) =>
    isActive
      ? css`
          border-bottom: 2px solid #7b2ef0;
          color: #3a3a3a;
        `
      : css`
          border-bottom: 1px solid #d9d9d9;
          color: #aaaaaa;
        `}
`;

const Tab = ({ children, onClick, isActive }: TabProps) => {
  return (
    <TabStyled isActive={isActive} onClick={onClick}>
      {children}
    </TabStyled>
  );
};

export default Tab;
