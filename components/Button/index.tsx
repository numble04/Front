import styled from 'styled-components';

const ButtonStyled = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = ({ children, ...props }: ButtonProps) => {
  return <ButtonStyled {...props}>{children}</ButtonStyled>;
};

export default Button;
