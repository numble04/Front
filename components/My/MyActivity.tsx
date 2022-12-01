import { Flex } from 'components/UI/Flex/Flex';
import { Typography } from 'components/UI/Typography/Typography';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { theme } from 'styles/theme';

const Container = styled.div``;

const TitleWrapper = styled.div`
  padding: 15px 20px;
`;

const TabWrapper = styled(Flex)``;

const Tab = styled.div<{ active: boolean }>`
  flex: 1;
  text-align: center;
  padding: 8px;
  border-bottom: 1px solid ${theme.colors.SLATEGRAY20};
  color: #aaa;

  ${({ active }) =>
    active &&
    css`
      color: #3a3a3a;
      border-bottom: 2px solid ${theme.colors.PRIMARY};
    `}
`;

const ActivitySection = styled.div`
  padding: 28px 20px;
`;

const MyActivity = () => {
  const router = useRouter();
  const [tab, setTab] = useState<'meeting' | 'comment' | 'post'>('meeting');

  const handleClickBackIcon = () => {
    router.back();
  };

  return (
    <Container>
      <TitleWrapper>
        <Flex justify="space-between">
          <Image
            src="/icons/back.svg"
            alt="back"
            width={24}
            height={24}
            onClick={handleClickBackIcon}
          />
          <Typography.Text type="h6">내 활동</Typography.Text>
          <div></div>
        </Flex>
      </TitleWrapper>
      <TabWrapper>
        <Tab active={tab === 'meeting'} onClick={() => setTab('meeting')}>
          관심 모임
        </Tab>
        <Tab active={tab === 'comment'} onClick={() => setTab('comment')}>
          댓글
        </Tab>
        <Tab active={tab === 'post'} onClick={() => setTab('post')}>
          댓글
        </Tab>
      </TabWrapper>
      <ActivitySection></ActivitySection>
    </Container>
  );
};

export default MyActivity;
