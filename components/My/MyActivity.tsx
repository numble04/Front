import { Flex } from 'components/UI/Flex/Flex';
import { Typography } from 'components/UI/Typography/Typography';
import { useMyComments, useMyMeetingsLike, useMyPostsLike } from 'hooks/user';
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

const Post = styled(Flex)<{ thumbnail: string | null }>`
  flex: 1 1 calc(50% - 4px);
  height: 143px;
  border-radius: 8px;
  max-width: calc(50% - 4px);
  padding: 16px 8px;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4));
  ${({ thumbnail }) =>
    thumbnail &&
    css`
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
        url(${thumbnail});
    `}
  background-position: center;
`;

const MyActivity = () => {
  const router = useRouter();
  const [tab, setTab] = useState<'meeting' | 'comment' | 'post'>('meeting');
  const { myMeetingsLike } = useMyMeetingsLike({ tab });
  const { myPostsLike } = useMyPostsLike({ tab });
  const { myComments } = useMyComments({ tab });

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
          좋아요
        </Tab>
      </TabWrapper>
      <ActivitySection>
        {tab === 'meeting' ? (
          myMeetingsLike?.length === 0 ? (
            <Flex justify="center" dir="column" align="center" gap={8}>
              <Image
                src="/icons/navigation.svg"
                alt="navigation"
                width={36}
                height={36}
              />
              <Typography.Text style={{ color: '#aaa' }}>
                관심 모임이 없어요.
              </Typography.Text>
            </Flex>
          ) : (
            myMeetingsLike?.map(
              (item: {
                cafeName: string;
                day: string;
                id: number;
                img: string;
                isFull: boolean;
                maxPersonnel: number;
                nowPersonnel: number;
                title: string;
              }) => (
                <Flex key={item.id} gap={12}>
                  <div
                    style={{
                      width: 100,
                      height: 100,
                      backgroundImage: `url(${item.img})`,
                      backgroundPosition: 'center',
                      borderRadius: 8,
                    }}
                  ></div>
                  <Flex dir="column" gap={4}>
                    <Typography.Text color="PRIMARY" bold>
                      {item.isFull ? '모집완료' : '모집중'}
                    </Typography.Text>
                    <div>{item.title}</div>
                    <div>{item.cafeName}</div>
                    <div>{item.day}</div>
                  </Flex>
                </Flex>
              ),
            )
          )
        ) : (
          <></>
        )}
        {tab === 'comment' &&
          myComments?.length > 0 &&
          myComments.map(
            (item: {
              id: number;
              content: string;
              postId: number;
              createdAt: string;
              updatedAt: string;
            }) => (
              <div key={item.id}>
                <div>{item.content}</div>
                <div>{item.createdAt}</div>
              </div>
            ),
          )}
        {tab === 'post' &&
          myPostsLike?.length > 0 &&
          myPostsLike.map(
            (item: { id: number; title: string; thumbnail: string | null }) => (
              <Post key={item.id} thumbnail={item.thumbnail} align="flex-end">
                {item.title}
              </Post>
            ),
          )}
      </ActivitySection>
    </Container>
  );
};

export default MyActivity;
