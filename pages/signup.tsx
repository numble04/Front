import type { NextPage } from 'next';

import Seo from 'components/Seo';
import Signup from 'components/Signup';

const SingUpPage: NextPage = () => {
  return (
    <>
      <Seo title="회원가입" description="회원가입" />
      <Signup />
    </>
  );
};

export default SingUpPage;
