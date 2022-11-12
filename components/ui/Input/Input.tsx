import type { ChangeEvent, ReactNode } from 'react';
import React from 'react';

import type { CSSProperties } from 'styled-components';
import styled from 'styled-components';

import { theme } from 'styles/theme';

const Container = styled.div`
  display: flex;

  .invalid {
    border: 1px solid ${theme.colors.ERROR};
  }
`;

const StyledInput = styled.input`
  width: 100%;
  height: 50px;
  padding: 10px 16px;
  font-size: 12px;
  font-weight: 500;
  color: #000;
  box-sizing: border-box;
  outline: none;
  border: none;
  border-radius: 8px;
  background-color: ${theme.colors.SLATEGRAY10};

  ::placeholder {
    color: ${theme.colors.SLATEGRAY40};
  }

  :disabled {
    color: ${theme.colors.SLATEGRAY40};
    background-color: ${theme.colors.SLATEGRAY40};
    cursor: not-allowed;
  }
`;

interface IInputProps extends React.ComponentProps<typeof StyledInput> {
  className?: string;
  cssStyle?: CSSProperties;
  gap?: number;
  suffix?: ReactNode;
  onInputChange?: () => void;
}

export const Input = React.forwardRef(
  (
    {
      className,
      suffix,
      cssStyle,
      onInputChange,
      onChange,
      ...props
    }: IInputProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(e);
      onInputChange && onInputChange();
    };
    return (
      <Container style={cssStyle} className={className}>
        <StyledInput {...props} ref={ref} onChange={handleChange} />
        {suffix && suffix}
      </Container>
    );
  },
);

Input.displayName = 'Input';
