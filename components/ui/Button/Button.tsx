import React, { type CSSProperties, useState } from 'react';

import styled, { css } from 'styled-components';

import { theme } from 'styles/theme';

import { Flex } from '../Flex/Flex';

interface StyledButtonProps {
  full?: boolean;
  active?: boolean;
  align?: React.CSSProperties['textAlign'];
  height?: number;
  padding?: number;
  fontSize?: number;
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

  ${({ height }) =>
    height &&
    css`
      height: ${height}px;
    `}

  ${({ padding }) =>
    padding &&
    css`
      padding: ${padding}px;
    `}

  ${({ align }) =>
    align &&
    css`
      text-align: align;
    `}

    ${({ fontSize }) =>
    fontSize &&
    css`
      font-size: ${fontSize}px;
    `}

  ${({ active }) =>
    !active &&
    css`
      background-color: ${theme.colors.PRIMARY_INACTIVE};
      color: rgba(58, 58, 58, 0.6);
      cursor: default;
    `}
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
          {/* TODO: loading indicator */}
          {/* {loading && (
            
          )} */}
          {!loading && icon}
          {children}
        </ChildrenContainer>
      </StyledButton>
    </Container>
  );
};
