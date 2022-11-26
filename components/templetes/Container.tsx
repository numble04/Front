import { useReissueToken } from 'hooks/user';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'recoil/user';
import styled from 'styled-components';
import { Navbar } from '../ui/organisms/Navbar';

type Props = {
  children: JSX.Element;
};

export const Container = ({ children }: Props) => {
  const { pathname } = useRouter();
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const [mounted, setMounted] = useState(false);
  const refreshToken =
    typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;
  const { reissueToken } = useReissueToken();

  useEffect(() => {
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

  if (!mounted) {
    // TODO: 온보딩 페이지 추가
    return <div>Loading...</div>;
  }

  // TODO: 공통 레이아웃이 적용되어 있어 임시적으로 제외해두었습니다. 추후 수정 필요
  if (
    (!isLoggedIn && pathname === '/') ||
    pathname === '/signup' ||
    pathname === '/login'
  )
    return (
      <Wrapper>
        <D1>
          <Main>{children}</Main>
        </D1>
      </Wrapper>
    );

  return (
    <Wrapper>
      <D1>
        <Main>{children}</Main>
        <Navbar />
      </D1>
    </Wrapper>
  );
};

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
