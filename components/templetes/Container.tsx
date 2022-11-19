import { useRouter } from 'next/router';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'recoil/user';
import styled from 'styled-components';
import { Navbar } from '../ui/organisms/Navbar';

type Props = {
  children: JSX.Element;
};

export const Container = ({ children }: Props) => {
  // TODO: 공통 레이아웃이 적용되어 있어 임시적으로 제외해두었습니다. 추후 수정 필요
  const { pathname } = useRouter();
  const isLoggedIn = useRecoilValue(isLoggedInState);

  if (
    !isLoggedIn &&
    (pathname === '/' || pathname === '/signup' || pathname === '/login')
  ) {
    return (
      <Wrapper>
        <D1>
          <Main>{children}</Main>
        </D1>
      </Wrapper>
    );
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
