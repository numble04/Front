import styled from 'styled-components';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

import { CreateMeetingParamsType } from 'types/uesrs';
import { InfoIcon } from 'components/UI/atoms/Icon';

const CostStep = ({
  cost,
  time,
  onChangeCreateMeetingParams,
}: {
  cost: number;
  time: number;
  onChangeCreateMeetingParams: Dispatch<
    SetStateAction<CreateMeetingParamsType>
  >;
}) => {
  const onChangeCost = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeCreateMeetingParams((param) => ({
      ...param,
      cost: parseInt(e.target.value),
    }));
  };

  const onChangeTime = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeCreateMeetingParams((param) => ({
      ...param,
      time: parseInt(e.target.value),
    }));
  };

  return (
    <Container>
      <InputWrapper>
        <div>참가비</div>
        <Input
          type={'number'}
          placeholder="최소 4,000원 이상 입력해주세요."
          onChange={(e) => onChangeCost(e)}
          value={cost}
          min={4000}
        />
      </InputWrapper>
      <InputWrapper>
        <div>총 소요 시간</div>
        <Input
          type={'number'}
          placeholder="1시간"
          onChange={(e) => onChangeTime(e)}
          value={time}
          min={1}
        />
      </InputWrapper>
      <Infomation>
        <InfoIcon />
        <div>1시간 단위로만 입력이 가능합니다.</div>
      </Infomation>
    </Container>
  );
};

export default CostStep;

const Container = styled.div``;

const InputWrapper = styled.div`
  margin-top: 36px;
  font-size: 12px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  margin-top: 12px;
  padding: 10px 16px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid #d9d9d9;
  outline: none;
  border-radius: 8px;
  resize: none;
`;

const Infomation = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  margin-top: 24px;
  padding: 0 12px;
  background-color: #f2f2f2;
  color: #848283;
  font-size: 12px;
  border-radius: 8px;
  & > div {
    margin-left: 4px;
  }
`;
