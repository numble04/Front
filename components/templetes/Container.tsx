import { Flex } from 'components/UI/Flex/Flex';
import { Typography } from 'components/UI/Typography/Typography';
import { useReissueToken } from 'hooks/user';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'recoil/user';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import { Navbar } from '../UI/Navbar';

type Props = {
  children: JSX.Element;
};

export const Container = ({ children }: Props) => {
  const router = useRouter();
  const pathname = router.pathname;
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const [isOnboarding, setIsOnboarding] = useState(true);
  const [mounted, setMounted] = useState(false);
  const refreshToken =
    typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;
  const { reissueToken } = useReissueToken();

  useEffect(() => {
    setTimeout(() => {
      setIsOnboarding(false);
    }, 2000);
    if (!isLoggedIn && refreshToken) {
      reissueToken(refreshToken, {
        onSettled: () => {
          setMounted(true);
        },
      });
    } else {
      setMounted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted || isOnboarding) {
    return (
      <Onboarding justify="center" align="center" dir="column">
        <Image src="/icons/dice.svg" alt="dice" width={197} height={104} />
        <LogoText type="h1" color="PRIMARY">
          Boardker
        </LogoText>
      </Onboarding>
    );
  }

  // TODO: 공통 레이아웃이 적용되어 있어 임시적으로 제외해두었습니다. 추후 수정 필요
  if (
    (!isLoggedIn && pathname === '/') ||
    pathname === '/signup' ||
    pathname === '/login' ||
    pathname === '/createMeeting'
  ) {
    return (
      <Wrapper>
        <D1>
          <Main>{children}</Main>
        </D1>
      </Wrapper>
    );
  } else if (!isLoggedIn) {
    router.replace('/');
  }

  return (
    <Wrapper>
      <D1>
        <Main>{children}</Main>
        <Navbar />
      </D1>
    </Wrapper>
  );
};

const Onboarding = styled(Flex)`
  width: 100vw;
  height: 100vh;
  background-color: ${theme.colors.PRIMARY};
`;

const LogoText = styled(Typography.Text)`
  /* -webkit-text-stroke: 2px #fff; */
  text-shadow: -1px 0 #fff, 0 1px #fff, 1px 0 #fff, 0 -1px #fff;
  font-size: 32px;
  transform: translateY(-30px);
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const Main = styled.main`
  width: 100%;
  height: calc(100% - 4rem);
`;

const D1 = styled.div`
  position: relative;
  max-width: 32rem;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
`;
