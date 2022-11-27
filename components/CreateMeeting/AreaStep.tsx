import styled from 'styled-components';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

import { CreateMeetingParamsType } from 'types/uesrs';
import { Flex } from 'components/ui/Flex/Flex';
import { Typography } from 'components/ui/Typography/Typography';

const Container = styled.div``;

const AreaStep = ({
  cafeId,
  onChangeCreateMeetingParams,
}: {
  cafeId: string;
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
        <Image src="/icons/location.svg" alt="back" width={24} height={24} />
        <Typography.Text regular color="ON_INACTIVE">
          {cafeId || '장소를 입력해주세요.'}
        </Typography.Text>
      </Flex>
    </Container>
  );
};

export default AreaStep;
