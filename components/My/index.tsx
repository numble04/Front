import { Button } from 'components/UI/Button/Button';
import { Flex } from 'components/UI/Flex/Flex';
import { Typography } from 'components/UI/Typography/Typography';
import { useMyMeetings, useMyPosts, useUserDetail } from 'hooks/user';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { theme } from 'styles/theme';

const Container = styled.div``;

const TitleSection = styled.section`
  padding: 39px 20px 21px;
  border-bottom: 1px solid ${theme.colors.SLATEGRAY20};
`;

const ProfileSection = styled.section`
  padding: 24px 20px;
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  width: 88px;
  height: 88px;
  img {
    border-radius: 50%;
  }
`;

const PenImageWrapper = styled(Flex)`
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${theme.colors.PRIMARY};
  border: 2px solid #fff;
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

const PostSection = styled(Flex)`
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

const My = () => {
  const router = useRouter();
  const [tab, setTab] = useState<'community' | 'meeting'>('community');
  const { userDetail } = useUserDetail();
  const { myPosts } = useMyPosts({ tab });
  const { myMeetings } = useMyMeetings({ tab });

  console.log('userDetail: ', userDetail);
  console.log('myMeetings: ', myMeetings);

  return (
    <Container>
      <TitleSection>
        <Typography.Text type="h4">프로필</Typography.Text>
      </TitleSection>
      <ProfileSection>
        <Flex gap={3}>
          <ProfileImageWrapper>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={userDetail?.img || ''}
              alt="profile"
              width={88}
              height={88}
            />
            <PenImageWrapper
              onClick={() => router.push('/my/edit')}
              justify="center"
              align="center"
            >
              <Image src="/icons/pen.svg" alt="back" width={16} height={16} />
            </PenImageWrapper>
          </ProfileImageWrapper>
          <Typography.Text>{userDetail?.nickname || ''}</Typography.Text>
        </Flex>
        <Typography.Text gutter={{ top: 20 }}>
          {userDetail?.introduction || ''}
        </Typography.Text>
        <Button
          full
          height={36}
          padding={10}
          fontSize={12}
          cssStyle={{
            marginTop: 24,
          }}
          onClick={() => router.push('/my/activity')}
        >
          내 활동
        </Button>
      </ProfileSection>
      <TabWrapper>
        <Tab active={tab === 'community'} onClick={() => setTab('community')}>
          게시물
        </Tab>
        <Tab active={tab === 'meeting'} onClick={() => setTab('meeting')}>
          참여 모임
        </Tab>
      </TabWrapper>
      <PostSection
        gap={tab === 'community' ? 8 : 12}
        wrap="true"
        justify={
          (tab === 'community' && myPosts?.length === 0) ||
          (tab === 'meeting' && myMeetings?.length === 0)
            ? 'center'
            : 'normal'
        }
      >
        {tab === 'community' ? (
          myPosts?.length === 0 ? (
            <Flex justify="center" dir="column" align="center" gap={8}>
              <Image
                src="/icons/community.svg"
                alt="community"
                width={36}
                height={36}
              />
              <Typography.Text style={{ color: '#aaa' }}>
                게시물이 없어요.
              </Typography.Text>
            </Flex>
          ) : (
            myPosts?.map(
              (item: {
                id: number;
                thumbnail: string | null;
                title: string;
              }) => (
                <Post key={item.id} thumbnail={item.thumbnail} align="flex-end">
                  {item.title}
                </Post>
              ),
            )
          )
        ) : myMeetings?.length === 0 ? (
          <Flex justify="center" dir="column" align="center" gap={8}>
            <Image
              src="/icons/navigation.svg"
              alt="navigation"
              width={36}
              height={36}
            />
            <Typography.Text style={{ color: '#aaa' }}>
              참여 모임이 없어요.
            </Typography.Text>
          </Flex>
        ) : (
          myMeetings?.map(
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
        )}
      </PostSection>
    </Container>
  );
};

export default My;
