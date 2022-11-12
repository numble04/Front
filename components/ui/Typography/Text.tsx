import styled, { css } from 'styled-components';

import { theme } from 'styles/theme';
import type { ITypographyProps } from './Typography';

export interface ITextProps extends ITypographyProps {
  type?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 's1'
    | 's2'
    | 'b1'
    | 'b2'
    | 'button'
    | 'overline'
    | 'caption';
  pre?: boolean;
  whiteSpace?: React.CSSProperties['whiteSpace'];
}

const Text = styled.span<ITextProps>`
  display: block;
  color: #000;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: -0.04em;

  ${({ type }) =>
    type === 'h1' &&
    css`
      font-size: 48px;
    `}

  ${({ type }) =>
    type === 'h2' &&
    css`
      font-size: 42px;
    `}

  ${({ type }) =>
    type === 'h3' &&
    css`
      font-size: 36px;
    `}

    ${({ type }) =>
    type === 'h4' &&
    css`
      font-size: 24px;
      font-weight: 700;
    `}

    ${({ type }) =>
    type === 'h5' &&
    css`
      font-size: 20px;
    `}

    ${({ type }) =>
    type === 'h6' &&
    css`
      font-size: 18px;
      font-weight: 700;
    `}

    ${({ type }) =>
    type === 's1' &&
    css`
      font-size: 18px;
    `}

  ${({ type }) =>
    type === 's2' &&
    css`
      font-size: 16px;
    `}

  ${({ type }) =>
    type === 'b1' &&
    css`
      font-size: 16px;
      line-height: 24px;
    `}

  ${({ type }) =>
    type === 'b2' &&
    css`
      font-size: 14px;
    `}

  ${({ type }) =>
    type === 'button' &&
    css`
      font-size: 16px;
    `}

    ${({ type }) =>
    type === 'overline' &&
    css`
      font-size: 12px;
    `}

  ${({ type }) =>
    type === 'caption' &&
    css`
      font-size: 10px;
    `}

  ${({ gutter }) => {
    if (typeof gutter === 'number') {
      return css`
        margin: ${gutter}px;
      `;
    }
    if (typeof gutter === 'object') {
      return css`
        margin-top: ${gutter.top ? `${gutter.top}px` : 0};
        margin-bottom: ${gutter.bottom ? `${gutter.bottom}px` : 0};
        margin-left: ${gutter.left ? `${gutter.left}px` : 0};
        margin-right: ${gutter.right ? `${gutter.right}px` : 0};
      `;
    }
  }}

  ${({ align }) =>
    align &&
    css`
      text-align: ${align};
    `}

  ${({ whiteSpace }) =>
    whiteSpace &&
    css`
      white-space: ${whiteSpace};
    `}

  ${({ bold }) =>
    bold &&
    css`
      font-weight: 700;
    `}

  ${({ medium }) =>
    medium &&
    css`
      font-weight: 500;
    `}

  ${({ regular }) =>
    regular &&
    css`
      font-weight: 400;
    `}

  ${({ light }) =>
    light &&
    css`
      font-weight: 300;
    `}
    
  ${({ inline }) =>
    inline &&
    css`
      display: inline;
    `}

  ${({ pre }) =>
    pre &&
    css`
      white-space: pre-wrap;
    `}

    ${({ asterisk }) =>
    asterisk &&
    css`
      &::before {
        content: '*';
        color: ${theme.colors.PRIMARY};
      }
    `}

  ${({ underline }) =>
    underline &&
    css`
      text-decoration: underline;
    `}  
    
  ${({ color }) =>
    color &&
    css`
      color: ${theme.colors[color]};
    `}

    ${({ onClick }) =>
    onClick &&
    css`
      cursor: pointer;
    `}
`;

export default Text;
