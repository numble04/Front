import styled from 'styled-components';

type StyledProps = {
  backgroundColor?: string;
};

const StyledButton = styled.button<StyledProps>`
  width: 60px;
  height: 20px;
  border: none;
  ${({ backgroundColor }) =>
    backgroundColor ? `background-color: ${backgroundColor};` : ''}
  ${({ color }) => (color ? `color: ${color};` : '')}
  cursor: pointer;
`;

interface Props {
  readonly color?: string;
  readonly backgroundColor?: string;
  readonly label: string;
  readonly onClick?: () => void;
}

export const SampleButton = ({
  color,
  backgroundColor,
  label,
  onClick,
}: Props) => {
  return (
    <StyledButton
      color={color}
      backgroundColor={backgroundColor}
      onClick={onClick}
    >
      {label}
    </StyledButton>
  );
};
