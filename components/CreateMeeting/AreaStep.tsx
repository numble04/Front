import styled from 'styled-components';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect } from 'react';

import { CreateMeetingParamsType } from 'types/uesrs';
import { Flex } from 'components/UI/Flex/Flex';
import { Typography } from 'components/UI/Typography/Typography';
import api from 'lib/api';

const Container = styled.div``;

const AreaStep = ({
  cafeName,
  onChangeIsAreaSearching,
}: {
  cafeName?: string;
  onChangeIsAreaSearching: Dispatch<SetStateAction<boolean>>;
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
        onClick={() => onChangeIsAreaSearching(true)}
      >
        <Image src="/icons/location.svg" alt="back" width={24} height={24} />
        <Typography.Text regular color="ON_PRIMARY">
          {cafeName || '장소를 입력해주세요.'}
        </Typography.Text>
      </Flex>
    </Container>
  );
};

export default AreaStep;
