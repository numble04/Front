import type { NextPage } from 'next';

import Seo from 'components/Seo';
import My from 'components/My';

const MyPage: NextPage = () => {
  return (
    <>
      <Seo title="마이페이지" description="마이페이지" />
      <My />
    </>
  );
};

export default MyPage;
