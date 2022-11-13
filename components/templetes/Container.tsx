import React from 'react';
import styled from 'styled-components';
import { Navbar } from '../UI/organisms/Navbar';

type Props = {
  children: JSX.Element;
};

export const Container = ({ children }: Props) => {
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
  background-color: #e5e5e5;
`;
