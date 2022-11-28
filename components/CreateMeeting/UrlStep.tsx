import styled from 'styled-components';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

import { CreateMeetingParamsType } from 'types/uesrs';

const Container = styled.div``;

const InputWrapper = styled.div``;

const Input = styled.textarea`
  width: 100%;
  height: 220px;
  margin-top: 16px;
  padding: 10px 10px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid #d9d9d9;
  outline: none;
  border-radius: 8px;
  resize: none;
`;

const UrlStep = ({
  kakaoUrl,
  onChangeCreateMeetingParams,
}: {
  kakaoUrl: string;
  onChangeCreateMeetingParams: Dispatch<
    SetStateAction<CreateMeetingParamsType>
  >;
}) => {
  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChangeCreateMeetingParams((param) => ({
      ...param,
      kakaoUrl: e.target.value,
    }));
  };

  return (
    <Container>
      <InputWrapper>
        <Input
          placeholder="URL을 입력해주세요.(필수)"
          onChange={(e) => onChange(e)}
          value={kakaoUrl}
        />
      </InputWrapper>
    </Container>
  );
};

export default UrlStep;
