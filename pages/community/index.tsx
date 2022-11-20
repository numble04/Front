import { useState } from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Board from 'components/Community/Board/Board';
import Header from 'components/UI/Header';
import Tab from 'components/UI/Tab';

const CommunityStyled = styled.div``;

const HeaderTitle = styled.p`
  font-size: 24px;
  font-weight: 500;
  color: #3a3a3a;
`;

const IconBox = styled.div`
  display: flex;

  > div:not(:last-child) {
    margin-right: 23px;
  }

  img {
    cursor: pointer;
  }
`;

const TabList = styled.div`
  display: flex;
`;

const Page: NextPage = () => {
  const router = useRouter();
  const [menu, setMenu] = useState('자유게시판');
  const communityList = ['자유게시판', '모임후기', '행사정보'];

  const handleMenu = (item: string) => {
    setMenu(item);
  };

  return (
    <CommunityStyled>
      <Header>
        <HeaderTitle>커뮤니티</HeaderTitle>
        <IconBox>
          <div>
            <Image
              src="/icons/plus.svg"
              alt="back"
              width={24}
              height={24}
              onClick={() => router.push('/createBoard')}
            />
          </div>
          <div>
            <Image
              src="/icons/search.svg"
              alt="back"
              width={24}
              height={24}
              onClick={() => router.push('/search')}
            />
          </div>
        </IconBox>
      </Header>
      <TabList>
        {communityList.map((item, index) => (
          <Tab
            key={index}
            onClick={() => handleMenu(item)}
            isActive={menu === item}
          >
            {item}
          </Tab>
        ))}
      </TabList>
      <Board />
    </CommunityStyled>
  );
};

export default Page;
