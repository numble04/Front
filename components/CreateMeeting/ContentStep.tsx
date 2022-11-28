import styled from 'styled-components';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

import { CreateMeetingParamsType } from 'types/uesrs';

const Container = styled.div``;

const InputWrapper = styled.div``;

const InfoWrapper = styled.div`
  color: #aaaaaa;
  margin-top: 8px;
  font-size: 12px;
`;

const Input = styled.textarea`
  width: 100%;
  height: 220px;
  padding: 10px 10px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid #d9d9d9;
  outline: none;
  border-radius: 8px;
  resize: none;
`;

const ContentStep = ({
  content,
  onChangeCreateMeetingParams,
}: {
  content: string;
  onChangeCreateMeetingParams: Dispatch<
    SetStateAction<CreateMeetingParamsType>
  >;
}) => {
  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChangeCreateMeetingParams((param) => ({
      ...param,
      content: e.target.value,
    }));
  };

  return (
    <Container>
      <InputWrapper>
        <Input
          placeholder="내용을 입력해 주세요."
          onChange={(e) => onChange(e)}
          value={content}
        />
      </InputWrapper>
      <InfoWrapper>
        모임 상세 내용을 자세히 작성할수록 멤버들의 신청률도 높아져요!
      </InfoWrapper>
    </Container>
  );
};

export default ContentStep;
