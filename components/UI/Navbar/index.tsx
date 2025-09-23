import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import {  NavbarIcon } from '../Icon/Icon';

const NAVBAR = [
  {type: 'home', pathname: '/', push: '/', content: '홈'},
  {type: 'community', pathname: '/community', push: '/community?type=FREE&page=0&size=10', content: '커뮤니티'},
  {type: 'meeting', pathname: '/meeting', push: '/meeting', content: '모임'},
  {type: 'boardgame', pathname: '/boardgame', push: '/boardgame', content: '보드게임'},
  {type: 'my', pathname: '/my', push: '/my', content: '프로필'},
]

export const Navbar = () => {
  const router = useRouter();
  const nowPathname = router.pathname;
  return (
    <Container>
      {NAVBAR.map(({type, pathname, push, content}) => {
        const isRoute = pathname === nowPathname ? true : false;
        return (
          <Wrapper onClick={() => router.push(push)} key={pathname}>
          <IconWrapper>
            <NavbarIcon type={type} isRoute={isRoute}/>
          </IconWrapper>
          <Text isRoute={isRoute}>{content}</Text>
        </Wrapper>
        )
      })}
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 32rem;
  height: 4rem;
  background-color: #ffffff;
  display: flex;
  flex-wrap: nowrap;
  border-top: 2px solid #e5e5e5;
  z-index: 999;
`;

const Wrapper = styled.button`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border: none;
  cursor: pointer;
`;

type TextProps = {
  isRoute: boolean;
}

const Text = styled.div<TextProps>`
  color: ${({ isRoute }) => isRoute ? '#7B2EF0' : '#bfbfbf'};
  font-weight: 600;
`;

const IconWrapper = styled.div`
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
