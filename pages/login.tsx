import type { NextPage } from 'next';
import styled from 'styled-components';

import Login from 'components/Login';
import Seo from 'components/Seo';

const Container = styled.div`
  margin: 0 auto;
  margin-top: 40px;
  max-width: 320px;
`;

const LoginPage: NextPage = () => {
  return (
    <Container>
      <Seo title="로그인" description="로그인 페이지 입니다." />
      <Login />
    </Container>
  );
};

export default LoginPage;
