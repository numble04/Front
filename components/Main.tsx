import Link from 'next/link';
import styled from 'styled-components';

import { Button } from 'components/UI/Button/Button';
import { Flex } from 'components/UI/Flex/Flex';
import { Typography } from 'components/UI/Typography/Typography';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'recoil/user';
import { useLogout } from 'hooks/user';
import { useRouter } from 'next/router';

const Container = styled.div`
  padding: 60px 20px 97px;
  min-height: 100vh;
  background-image: url('/images/background.png');
`;

const TitleWrapper = styled.div`
  padding: 0 10px;
  min-height: calc(100vh - 245px);
`;

const Main = () => {
  const router = useRouter();
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const refreshToken =
    typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;
  const { logout } = useLogout();

  const handleLogout = () => {
    logout(refreshToken);
    router.replace('/');
  };

  if (isLoggedIn) {
    return (
      <div style={{ padding: 20 }}>
        <Flex justify="space-between" align="center">
          <Typography.Text>Boardker</Typography.Text>
          <Button height={24} padding={6} fontSize={12} onClick={handleLogout}>
            로그아웃
          </Button>
        </Flex>
      </div>
    );
  }

  return (
    <Container>
      <TitleWrapper>
        <Typography.Text type="h4" color="WHITE">
          Boardker
        </Typography.Text>
        <Typography.Text
          color="WHITE"
          type="h4"
          medium
          gutter={{ top: 20 }}
          style={{ fontSize: 32 }}
        >
          함께하는
          <br />
          보드게임의
          <br />
          색다로운 즐거움
        </Typography.Text>
        <Typography.Text
          color="WHITE"
          type="h4"
          medium
          gutter={{ top: 20 }}
          style={{ fontSize: 18 }}
        >
          보드게임 커뮤니티,{' '}
          <Typography.Text color="WHITE" type="h6" bold inline>
            보드커
          </Typography.Text>
        </Typography.Text>
      </TitleWrapper>
      <Button
        cssStyle={{ width: '100%' }}
        full
        onClick={() => router.push('/signup')}
      >
        시작하기
      </Button>
      <Flex align="center" justify="center" gutter={{ top: 20 }}>
        <Typography.Text type="b2" color="SLATEGRAY20" inline regular>
          이미 계정이 있나요?
        </Typography.Text>
        <Link href="/login" passHref>
          <Typography.Text
            type="b2"
            underline
            color="WHITE"
            gutter={{ left: 5 }}
          >
            로그인
          </Typography.Text>
        </Link>
      </Flex>
    </Container>
  );
};

export default Main;
