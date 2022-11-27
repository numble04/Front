import styled from 'styled-components';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export const LabelStyled = styled.label``;

const Label = ({ children, ...props }: LabelProps) => {
  return <LabelStyled {...props}>{children}</LabelStyled>;
};

export default Label;
