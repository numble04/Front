import styled from 'styled-components';

export const StyledTextarea = styled.textarea`
  resize: none;
  outline: none;
`;

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = ({ ...props }: TextareaProps) => {
  return <StyledTextarea {...props} />;
};

export default Textarea;
