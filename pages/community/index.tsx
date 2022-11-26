import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Board from 'components/Community/Board/Board';
import Header from 'components/UI/Header';
import Tab from 'components/UI/Tab';
import api from 'lib/api';

type TabType = {
  name: string;
  type: string;
};

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
  const [data, setData] = useState([]);
  const [menu, setMenu] = useState({ name: '자유게시판', type: 'FREE' });
  const communityList = [
    { name: '자유게시판', type: 'FREE' },
    { name: '정모 후기', type: 'MEET_REVIEW' },
    { name: '지역별 행사 정보', type: 'EVENT' },
  ];

  const handleMenu = (item: TabType) => {
    setMenu(item);
  };

  const getCommunityList = useCallback(async () => {
    const res = await api.get(`/posts?type=${menu.type}&page=0&size=10`);

    if (res.status === 200) {
      setData(res.data.data.content);
    } else {
      alert('통신 에러');
      return;
    }
  }, [menu]);

  useEffect(() => {
    getCommunityList();
  }, [getCommunityList]);

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
            isActive={menu.name === item.name}
          >
            {item.name}
          </Tab>
        ))}
      </TabList>
      {data?.map((item, index) => (
        <Board data={item} key={index} />
      ))}
    </CommunityStyled>
  );
};

export default Page;
