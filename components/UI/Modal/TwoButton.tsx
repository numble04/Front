import styled from 'styled-components';

const StyledModal = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  padding: 16px 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const UpButton = styled.div`
  width: 100%;
  height: 54px;
  background-color: #EDEDED;
  color: #ED4954;
  cursor: pointer;
  line-height: 54px;
  margin-bottom: 8px;
  border-radius: 12px;
  font-weight: 500;
  font-size: 16px;
`;

const DownButton = styled.div`
  width: 100%;
  height: 54px;
  background-color: #EDEDED;
  cursor: pointer;
  line-height: 54px;
  border-radius: 12px;
  font-weight: 500;
  font-size: 16px;
`;

interface IBackProps {
  onClickUp?: () => void;
  onClickDown?: () => void;
  up?: string;
  down?: string;
}

const TwoButton = ({ onClickUp, onClickDown, up, down }: IBackProps) => {
  return (
    <StyledModal>
      <UpButton onClick={onClickUp}>{up}</UpButton>
      <DownButton onClick={onClickDown}>{down}</DownButton>
    </StyledModal>
  );
};

export default TwoButton;
