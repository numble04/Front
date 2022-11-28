import styled from 'styled-components';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { CreateMeetingParamsType } from 'types/uesrs';
import { Typography } from 'components/UI/Typography/Typography';
import { InfoIcon, MeetingDateIcon, TimeIcon } from 'components/UI/atoms/Icon';
import { theme } from 'styles/theme';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { TimePicker } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

const DateStep = ({
  date,
  onChangeCreateMeetingParams,
}: {
  date: Date | null;
  onChangeCreateMeetingParams: Dispatch<
    SetStateAction<CreateMeetingParamsType>
  >;
}) => {
  const [displayDate, setDisplayDate] = useState(false);
  const onClickDate = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setDisplayDate(true);
  };
  const confirmDate = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setDisplayDate(false);
  };
  const onChangeDate = (changeDate: Date) => {
    const newDate = date !== null ? date : new Date();
    newDate.setFullYear(changeDate.getFullYear());
    newDate.setMonth(changeDate.getMonth());
    newDate.setDate(changeDate.getDate());
    onChangeCreateMeetingParams((param) => ({
      ...param,
      day: newDate,
    }));
  };
  const onChangeTime = (changeTime: any, _: string) => {
    if (changeTime === null) return;
    const newDate = date !== null ? date : new Date();
    newDate.setHours(changeTime.$d.getHours());
    newDate.setMinutes(changeTime.$d.getMinutes());
    newDate.setSeconds(changeTime.$d.getSeconds());
    onChangeCreateMeetingParams((param) => ({
      ...param,
      day: newDate,
    }));
  };

  return (
    <Container>
      <ContentWrapper onClick={onClickDate}>
        <MeetingDateIcon />
        <Typography.Text regular color="ON_PRIMARY">
          {date !== null
            ? date.toLocaleDateString()
            : new Date().toLocaleDateString()}
        </Typography.Text>
        {displayDate && (
          <ConfirmButton onClick={confirmDate}>확인</ConfirmButton>
        )}
      </ContentWrapper>
      {displayDate && (
        <CalendarWrapper>
          <Calendar
            onChange={onChangeDate}
            value={date}
            calendarType={'Hebrew'}
            formatDay={(_, date) =>
              date.toLocaleString('en', { day: 'numeric' })
            }
          />
        </CalendarWrapper>
      )}
      <ContentWrapper>
        <TimeIcon />
        <TimePickerWrapper>
          <TimePicker
            placeholder={'24:00:00'}
            onChange={onChangeTime}
            value={date !== null ? dayjs(date) : dayjs(new Date())}
          />
        </TimePickerWrapper>
      </ContentWrapper>
      <Infomation>
        <InfoIcon />
        <div>모임 시간 3시간 전, 자동으로 신청이 마감됩니다.</div>
      </Infomation>
    </Container>
  );
};

export default DateStep;

const Container = styled.div``;

const ConfirmButton = styled.button`
  position: absolute;
  right: 0;
  color: ${theme.colors.PRIMARY};
  background-color: #ffffff;
  border: none;
  outline: none;
  cursor: pointer;
`;

const ContentWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 19;
  padding: 13px 4px;
  border-bottom: 1px solid #d9d9d9;
  cursor: pointer;
  & > svg {
    margin-right: 12px;
  }
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

const CalendarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  abbr {
    text-decoration: none;
  }
  .react-calendar {
    border: none;
  }
  .react-calendar__month-view__weekdays {
    display: grid !important; // flex 덮어쓰기
    grid-template-columns: repeat(7, 1fr);
    column-gap: 12px;
    padding: 0 12px;
  }
  .react-calendar__month-view__days {
    display: grid !important; // flex 덮어쓰기
    grid-template-columns: repeat(7, 1fr);
    column-gap: 12px;
    padding: 0 12px;
  }
  .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .react-calendar__tile--now {
    color: ${theme.colors.PRIMARY};
    background-color: #ffffff;
    border: solid 1px ${theme.colors.PRIMARY};
    border-radius: 50%;
  }
  .react-calendar__tile--active {
    color: #ffffff;
    background-color: ${theme.colors.PRIMARY};
    border-radius: 50%;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    color: #ffffff;
    background-color: ${theme.colors.PRIMARY};
    border-radius: 50%;
  }
`;

const TimePickerWrapper = styled.div`
  .ant-picker {
    padding: 0;
    border: none;
  }
  .ant-picker-focused {
    border: none;
    box-shadow: none;
  }
  .ant-picker-input {
    & > input {
      font-size: 16px;
      color: #3a3a3a;
    }
    & > input::placeholder {
      color: #3a3a3a;
    }
  }
  .ant-picker-suffix {
    display: none;
  }
`;
