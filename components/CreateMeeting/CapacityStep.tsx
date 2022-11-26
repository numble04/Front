import styled, { css } from 'styled-components';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

import { CreateMeetingParamsType } from 'types/uesrs';
import { Flex } from 'components/ui/Flex/Flex';
import { Typography } from 'components/ui/Typography/Typography';
import { AddIcon, InfoIcon, SubIcon } from 'components/ui/atoms/Icon';
import { theme } from 'styles/theme';

const CapacityStep = ({
  capacity,
  onChangeCreateMeetingParams,
}: {
  capacity: number;
  onChangeCreateMeetingParams: Dispatch<
    SetStateAction<CreateMeetingParamsType>
  >;
}) => {
  const subCapacity = () => {
    if (capacity === 3) return;
    onChangeCreateMeetingParams((param) => ({
      ...param,
      capacity: capacity - 1,
    }));
  };
  const addCapacity = () => {
    if (capacity === 10) return;
    onChangeCreateMeetingParams((param) => ({
      ...param,
      capacity: capacity + 1,
    }));
  };
  return (
    <Container>
      <CapacityWrapper>
        <SubButton onClick={subCapacity}>
          <SubIcon />
        </SubButton>
        <Capacity>{capacity}</Capacity>
        <AddButton onClick={addCapacity}>
          <AddIcon />
        </AddButton>
      </CapacityWrapper>
      <Infomation>
        <InfoIcon />
        <div> 모임 시간 3시간 전, 자동으로 신청이 마감됩니다.</div>
      </Infomation>
    </Container>
  );
};

export default CapacityStep;

const Container = styled.div``;

const CapacityWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 32px 0;
  padding: 0 160px;
`;

const buttonCss = css`
  width: 24px;
  height: 24px;
  border: none;
  outline: none;
  border-radius: 50%;
  padding: 0;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubButton = styled.button`
  ${buttonCss}
  background-color: #848283;
`;

const AddButton = styled.button`
  ${buttonCss}
  background-color: ${theme.colors.PRIMARY};
`;

const Capacity = styled.div`
  font-size: 24px;
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
