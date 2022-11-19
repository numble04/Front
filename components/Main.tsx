import Link from 'next/link';
import styled from 'styled-components';

import { Button } from 'components/ui/Button/Button';
import { Flex } from 'components/ui/Flex/Flex';
import { Typography } from 'components/ui/Typography/Typography';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'recoil/user';

const Container = styled.div`
  padding: 60px 20px 97px;
  min-height: 100vh;
`;

const TitleWrapper = styled.div`
  padding: 0 10px;
  min-height: calc(100vh - 245px);
`;

const Main = () => {
  const isLoggedIn = useRecoilValue(isLoggedInState);

  if (isLoggedIn) {
    return (
      <div style={{ padding: 20 }}>
        <Typography.Text>Boardker</Typography.Text>
      </div>
    );
  }

  return (
    <Container>
      <TitleWrapper>
        <Typography.Text type="h3" color="MAIN_A">
          Boardker
        </Typography.Text>
        <Typography.Text type="h4" medium gutter={{ top: 8 }}>
          함께하는
          <br />
          보드게임
        </Typography.Text>
      </TitleWrapper>
      <Link href="/signup" passHref>
        <Button cssStyle={{ width: '100%' }} full>
          시작하기
        </Button>
      </Link>
      <Flex align="center" justify="center" gutter={{ top: 20 }}>
        <Typography.Text type="b2" color="SLATEGRAY70" inline>
          이미 계정이 있나요?
        </Typography.Text>
        <Link href="/login" passHref>
          <Typography.Text
            type="b2"
            underline
            color="SUB_A"
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
