import styled, { css } from 'styled-components';

interface IFlexProps {
  dir?: React.CSSProperties['flexDirection'];
  align?: React.CSSProperties['alignItems'];
  justify?: React.CSSProperties['justifyContent'];
  flex?: number | string;
  wrap?: string;
  textAlign?: string;
  gap?: number;
  rowGap?: number;
  columnGap?: number;
  gutter?:
    | number
    | { top?: number; bottom?: number; left?: number; right?: number };
}

const defaultProps = {
  dir: 'row' as const,
  align: 'flex-start',
  justify: 'normal',
  flex: 'none',
  textAlign: 'unset',
  wrap: 'false',
  gutter: 0,
};

export const Flex = styled.div<IFlexProps>`
  display: flex;
  flex-direction: ${(props) => props.dir};
  align-items: ${(props) => props.align};
  justify-content: ${(props) => props.justify};
  flex: ${(props) => (props.flex ? props.flex : 'none')};
  gap: ${(props) => props.gap && `${props.gap}px`};
  row-gap: ${(props) => props.rowGap && `${props.rowGap}px`};
  column-gap: ${(props) => props.columnGap && `${props.columnGap}px`};
  flex-wrap: ${({ wrap }) => (wrap === 'true' ? 'wrap' : 'unset')};

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
`;

Flex.defaultProps = defaultProps;
