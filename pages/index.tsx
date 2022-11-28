import type { NextPage } from 'next';

import Main from 'components/Main';
import Seo from 'components/Seo';

const HomePage: NextPage = () => {
  return (
    <div>
      <Seo title="보드커" description="보드게임 모임에 참여해보세요." />
      <Main />
    </div>
  );
};

export default HomePage;
