import React, { type CSSProperties, useState } from 'react';

import styled, { css } from 'styled-components';

import { theme } from 'styles/theme';

import { Flex } from '../Flex/Flex';

interface StyledButtonProps {
  full?: boolean;
  active?: boolean;
  align?: React.CSSProperties['textAlign'];
}

const Container = styled.div`
  position: relative;
`;

const ChildrenContainer = styled(Flex)`
  width: max-content;
  margin: 0 auto;
`;

const StyledButton = styled.button<StyledButtonProps>`
  position: flex;
  width: ${({ full }) => (full ? '100%' : 'fit-content')};
  justify-content: center;
  background-color: ${theme.colors.PRIMARY};
  color: #fff;
  align-content: center;
  height: 54px;
  padding: 12px;
  line-height: 1;
  border-radius: 52px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  border: none;

  ${({ align }) =>
    align &&
    css`
      text-align: align;
    `}

  ${({ active }) =>
    !active &&
    css`
      background-color: ${theme.colors.PRIMARY_INACTIVE};
      color: rgba(58, 58, 58, 0.6);
      cursor: default;
    `}
`;

const LoadingIndicator = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  div {
    transform-origin: 40px 40px;
    animation: lds-spinner 1.2s linear infinite;
  }
  div:after {
    content: ' ';
    display: block;
    position: absolute;
    top: 16px;
    left: 38px;
    width: 3px;
    height: 11px;
    border-radius: 4px;
    background: #3785f7;
  }
  div:nth-child(1) {
    transform: rotate(0deg);
    animation-delay: -1.1s;
  }
  div:nth-child(2) {
    transform: rotate(30deg);
    animation-delay: -1s;
  }
  div:nth-child(3) {
    transform: rotate(60deg);
    animation-delay: -0.9s;
  }
  div:nth-child(4) {
    transform: rotate(90deg);
    animation-delay: -0.8s;
  }
  div:nth-child(5) {
    transform: rotate(120deg);
    animation-delay: -0.7s;
  }
  div:nth-child(6) {
    transform: rotate(150deg);
    animation-delay: -0.6s;
  }
  div:nth-child(7) {
    transform: rotate(180deg);
    animation-delay: -0.5s;
  }
  div:nth-child(8) {
    transform: rotate(210deg);
    animation-delay: -0.4s;
  }
  div:nth-child(9) {
    transform: rotate(240deg);
    animation-delay: -0.3s;
  }
  div:nth-child(10) {
    transform: rotate(270deg);
    animation-delay: -0.2s;
  }
  div:nth-child(11) {
    transform: rotate(300deg);
    animation-delay: -0.1s;
  }
  div:nth-child(12) {
    transform: rotate(330deg);
    animation-delay: 0s;
  }
  @keyframes lds-spinner {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

interface IButtonProps extends React.ComponentProps<typeof StyledButton> {
  className?: string;
  isActive?: boolean;
  cssStyle?: CSSProperties;
  buttonStyle?: CSSProperties;
  children: React.ReactElement | string;
  activeMode?: boolean;
  loading?: boolean;
  icon?: React.ReactElement;
}

export const Button = ({
  full,
  cssStyle,
  buttonStyle,
  isActive = true,
  className,
  activeMode,
  children,
  loading,
  icon,
  align,
  onClick,
  ...props
}: IButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick && isActive && onClick(e);
  };

  return (
    <Container style={cssStyle}>
      <StyledButton
        {...props}
        className={className}
        align={align}
        full={full}
        active={isActive}
        css={buttonStyle}
        onClick={!loading ? handleClick : undefined}
      >
        <ChildrenContainer justify="center" gap={4}>
          {loading && (
            <LoadingIndicator>
              {Array(12)
                .fill(0)
                .map((_, index) => (
                  <div key={index}></div>
                ))}
            </LoadingIndicator>
          )}
          {!loading && icon}
          {children}
        </ChildrenContainer>
      </StyledButton>
    </Container>
  );
};
