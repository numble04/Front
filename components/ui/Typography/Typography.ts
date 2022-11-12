import type { theme } from 'styles/theme';

import Text from './Text';

export interface ITypographyProps {
  gutter?:
    | number
    | { top?: number; bottom?: number; left?: number; right?: number };
  align?: 'left' | 'center' | 'right';
  bold?: boolean;
  medium?: boolean;
  regular?: boolean;
  light?: boolean;
  inline?: boolean;
  color?: keyof typeof theme['colors'];
  underline?: boolean;
  asterisk?: boolean;
}

export const Typography = { Text };
