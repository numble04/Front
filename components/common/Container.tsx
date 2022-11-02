import React from 'react';
import styled from 'styled-components';
import { Navbar } from './Navbar';

type Props = {
  children: JSX.Element;
}

export const Container = ({children}: Props) => {
  return (
    <Wrapper>
      <D1>
        <main>
          {children}
        </main>
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
`

const D1 = styled.div`
  position: relative;
  max-width: 32rem;
  width: 100%;
  height: 100%;
  background-color: #E5E5E5;
`