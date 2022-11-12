import styled, { css } from 'styled-components';
import React from 'react';

import type { ReactElement } from 'react';
import type { FieldError, ChangeHandler } from 'react-hook-form';
import type { CSSProperties } from 'styled-components';

import { Typography } from '../Typography/Typography';

interface IFormItemProps {
  formName?: string;
  asterisk?: boolean;
  children?: ReactElement;
  cssStyle?: CSSProperties;
  label?: React.ReactNode;
  labelStyle?: CSSProperties;
  error?: FieldError;
  successMessage?: string;
  onChange: ChangeHandler;
  onBlur: ChangeHandler;
  noStyle?: boolean;
}

const Container = styled.div<{ nostyle?: boolean }>`
  position: relative;
  ${({ nostyle }) =>
    !nostyle &&
    css`
      margin-bottom: 16px;
    `}
`;

// Ref : https://react-hook-form.com/kr/get-started#Integratinganexistingform
export const FormItem = React.forwardRef(
  (
    {
      formName,
      label,
      cssStyle,
      labelStyle,
      children,
      error,
      successMessage,
      onChange,
      onBlur,
      noStyle,
      asterisk = false,
    }: IFormItemProps,
    ref,
  ) => {
    return (
      <Container style={cssStyle} nostyle={noStyle}>
        {typeof label === 'string' ? (
          <Typography.Text
            type="b2"
            color="SLATEGRAY80"
            style={labelStyle}
            asterisk={asterisk}
            gutter={{ bottom: 8 }}
          >
            {label}
          </Typography.Text>
        ) : (
          label
        )}
        {children &&
          React.cloneElement(children, {
            name: formName,
            ref,
            onChange,
            onBlur,
          })}
        {!successMessage && error && (
          <Typography.Text
            type="b2"
            color="ERROR"
            style={{
              position: 'absolute',
              height: 0,
            }}
          >
            {error.message}
          </Typography.Text>
        )}
        {successMessage && (
          <Typography.Text
            type="b2"
            color="SUCCESS"
            style={{
              position: 'absolute',
              height: 0,
            }}
          >
            {successMessage}
          </Typography.Text>
        )}
      </Container>
    );
  },
);

FormItem.displayName = 'FormItem';
