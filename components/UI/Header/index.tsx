import styled, { css } from 'styled-components';

interface HeaderProps {
  children: React.ReactNode;
  isBorder?: boolean;
}

type HeaderType = Pick<HeaderProps, 'isBorder'>;

export const HeaderStyled = styled.div<HeaderType>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;

  border-bottom: ${({ isBorder }) => (isBorder ? '1px solid #D9D9D9' : 'none')};
`;

const Header = ({ children, isBorder }: HeaderProps) => {
  return <HeaderStyled isBorder={isBorder}>{children}</HeaderStyled>;
};

export default Header;
