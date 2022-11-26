import styled from 'styled-components';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

import { CreateMeetingParamsType } from 'types/uesrs';
import { Flex } from 'components/ui/Flex/Flex';
import { Typography } from 'components/ui/Typography/Typography';
import { InfoIcon, MeetingDateIcon, TimeIcon } from 'components/ui/atoms/Icon';

const Container = styled.div``;

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

const DateStep = ({
  date,
  onChangeCreateMeetingParams,
}: {
  date: string;
  onChangeCreateMeetingParams: Dispatch<
    SetStateAction<CreateMeetingParamsType>
  >;
}) => {
  return (
    <Container>
      <Flex
        style={{
          marginTop: 19,
          padding: '13px 4px',
          borderBottom: '1px solid #d9d9d9',
          cursor: 'pointer',
        }}
        gap={12}
        align="center"
      >
        <MeetingDateIcon />
        <Typography.Text regular color="ON_PRIMARY">
          {date || '11.7 (월)'}
        </Typography.Text>
      </Flex>
      <Flex
        style={{
          marginTop: 19,
          padding: '13px 4px',
          borderBottom: '1px solid #d9d9d9',
          cursor: 'pointer',
        }}
        gap={12}
        align="center"
      >
        <TimeIcon />
        <Typography.Text regular color="ON_PRIMARY">
          {date || '오후 6:00'}
        </Typography.Text>
      </Flex>
      <Infomation>
        <InfoIcon />
        <div>모임 시간 3시간 전, 자동으로 신청이 마감됩니다.</div>
      </Infomation>
    </Container>
  );
};

export default DateStep;
