import styled from 'styled-components';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

import { CreateMeetingParamsType } from 'types/uesrs';

const Container = styled.div``;

const InputWrapper = styled.div`
  border-bottom: 1px solid #e4e4e4;
`;

const CountWrapper = styled.div`
  display: flex;
  justify-content: end;
  color: #aaaaaa;
  margin-top: 2px;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  padding: 10px 16px;
  font-size: 12px;
  font-weight: 500;
  outline: none;
  border: none;
`;

const TitleStep = ({
  title,
  onChangeCreateMeetingParams,
}: {
  title: string;
  onChangeCreateMeetingParams: Dispatch<
    SetStateAction<CreateMeetingParamsType>
  >;
}) => {
  const [count, setCount] = useState(0);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeCreateMeetingParams((param) => ({
      ...param,
      title: e.target.value,
    }));
    setCount(e.target.value.length);
  };

  return (
    <Container>
      <InputWrapper>
        <Input
          placeholder="인사동으로 함께 카페투어가요✨"
          onChange={(e) => onChange(e)}
          value={title}
          maxLength={60}
        />
      </InputWrapper>
      <CountWrapper>
        <div>{`${count}/60`}</div>
      </CountWrapper>
    </Container>
  );
};

export default TitleStep;
