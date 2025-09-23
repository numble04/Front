import type { NextPage } from 'next';

import Seo from 'components/Seo';
import MyEdit from 'components/My/MyEdit';

const MyEditPage: NextPage = () => {
  return (
    <>
      <Seo title="프로필 수정" description="프로필 수정" />
      <MyEdit />
    </>
  );
};

export default MyEditPage;
