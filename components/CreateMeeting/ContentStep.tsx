import styled from 'styled-components';
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from 'react';

import { CreateMeetingParamsType } from 'types/uesrs';
import { CameraIcon } from 'components/UI/atoms/Icon';

const ContentStep = ({
  content,
  file,
  onChangeCreateMeetingParams,
}: {
  content: string;
  file: File | null;
  onChangeCreateMeetingParams: Dispatch<
    SetStateAction<CreateMeetingParamsType>
  >;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleUploadImage = (e:React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const files = (target.files as FileList)[0];

    if(files === undefined) {
      return;
    }

    onChangeCreateMeetingParams((param) => ({
      ...param,
      file: files,
    }));
  };

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChangeCreateMeetingParams((param) => ({
      ...param,
      content: e.target.value,
    }));
  };

  return (
    <Container>
      <InputWrapper>
        {file === null ?
          <InputLabel onClick={() => inputRef.current && inputRef.current.click()}>
            <CameraIcon />
            <div>사진 추가</div>
          </InputLabel>
          :
          <InputLabel onClick={() => inputRef.current && inputRef.current.click()}>
            <Img src={URL.createObjectURL(file)} alt={file.name}/>
          </InputLabel>
        }
        <Input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleUploadImage(e)}
        />
      </InputWrapper>
      <InputWrapper>
        <Textarea
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

const Container = styled.div``;

const InputWrapper = styled.div``;

const InfoWrapper = styled.div`
  color: #aaaaaa;
  margin-top: 8px;
  font-size: 12px;
`;

const InputLabel = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #AAAAAA;
  background-color: #F2F2F2;
  border: 1px solid #d9d9d9;
  outline: none;
  border-radius: 8px;
  margin: 8px 0 8px 0;
  cursor: pointer;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Input = styled.input`
  display: none;
  width: 100%;
  height: 100px;
`;

const Textarea = styled.textarea`
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