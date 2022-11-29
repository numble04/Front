import { Button } from 'components/UI/Button/Button';
import { Flex } from 'components/UI/Flex/Flex';
import { Typography } from 'components/UI/Typography/Typography';
import { useUserDetail } from 'hooks/user';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
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
  width: 88px;
  height: 88px;
  img {
    border-radius: 50%;
  }
`;

const CommunityTab = styled(Flex)``;

const CommunitySection = styled.section`
  padding: 29px 20px;
`;

const My = () => {
  const { userDetail } = useUserDetail();

  console.log('userDetail: ', userDetail);

  return (
    <Container>
      <TitleSection>
        <Typography.Text type="h4">프로필</Typography.Text>
      </TitleSection>
      <ProfileSection>
        <Flex gap={3}>
          <ProfileImageWrapper>
            <Image
              src="/images/background.png"
              alt="profile"
              width={88}
              height={88}
            ></Image>
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
        >
          내 활동
        </Button>
      </ProfileSection>
      <CommunityTab>
        <div
          style={{
            flex: 1,
            textAlign: 'center',
            padding: 8,
            borderBottom: `1px solid ${theme.colors.SLATEGRAY20}`,
          }}
        >
          게시물
        </div>
        <div
          style={{
            flex: 1,
            textAlign: 'center',
            padding: 8,
            borderBottom: `1px solid ${theme.colors.SLATEGRAY20}`,
          }}
        >
          참여 모임
        </div>
      </CommunityTab>
      <CommunitySection></CommunitySection>
    </Container>
  );
};

export default My;
