import Image from 'next/image';
import React, { Dispatch, SetStateAction } from 'react';

import { Flex } from 'components/UI/Flex/Flex';
import { Typography } from 'components/UI/Typography/Typography';
import { theme } from 'styles/theme';

const CurrentAreaStep = ({
  region,
  onChangeIsAreaSearching,
}: {
  region: string;
  onChangeIsAreaSearching: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Flex
      style={{
        marginTop: 19,
        padding: '13px 4px',
        borderBottom: `1px solid ${theme.colors.SLATEGRAY20}`,
        cursor: 'pointer',
      }}
      gap={12}
      align="center"
      onClick={() => onChangeIsAreaSearching(true)}
    >
      <Image src="/icons/location.svg" alt="back" width={24} height={24} />
      <Typography.Text regular color="ON_INACTIVE">
        {region || '장소를 입력해주세요.'}
      </Typography.Text>
    </Flex>
  );
};

export default CurrentAreaStep;
