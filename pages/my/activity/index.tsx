import type { NextPage } from 'next';

import Seo from 'components/Seo';
import MyActivity from 'components/My/MyActivity';

const MyActivityPage: NextPage = () => {
  return (
    <>
      <Seo title="내 활동" description="내 활동" />
      <MyActivity />
    </>
  );
};

export default MyActivityPage;
