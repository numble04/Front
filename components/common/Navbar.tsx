import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { HomeIcon, MyPageIcon } from './Icon';

export const Navbar = () => {
  const router = useRouter();
  return (
    <Container>
      <Wrapper onClick={() => router.push('/')}><IconWrapper><HomeIcon /></IconWrapper><Text>홈</Text></Wrapper>
      <Wrapper><IconWrapper><HomeIcon /></IconWrapper><Text>커뮤니티</Text></Wrapper>
      <Wrapper onClick={() => router.push('/meeting')}><IconWrapper><HomeIcon /></IconWrapper><Text>모임</Text></Wrapper>
      <Wrapper><IconWrapper><HomeIcon /></IconWrapper><Text>게임정보</Text></Wrapper>
      <Wrapper><IconWrapper><MyPageIcon /></IconWrapper><Text>마이</Text></Wrapper>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 4rem;
  background-color: #FFFFFF;
  display: flex;
  flex-wrap: nowrap;
`

const Wrapper = styled.button`
  width: 100%;
  height: 100%;
  background-color: #FFFFFF;
  border: none;
  cursor: pointer;
`

const Text = styled.div`
  color: #BFBFBF;
  font-family: 600;
`
const IconWrapper = styled.div`
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`
