import { useEffect } from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import Image from 'next/image';
import Board from 'components/Community/Board/Board';
import Header from 'components/UI/Header';
import Tab from 'components/UI/Tab';
import api from 'lib/api';
import { communityDetailType } from 'types/community';

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

const BoardList = styled.div`
  max-height: calc(100vh - 192px);
  overflow-y: auto;
`;

const Page: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const communityList = [
    { name: '자유게시판', type: 'FREE' },
    { name: '정모 후기', type: 'MEET_REVIEW' },
    { name: '지역별 행사 정보', type: 'EVENT' },
  ];

  const handleMenu = (item: TabType) => {
    router.push(`community?type=${item.type}&page=0&size=10`);
  };

  const getCommunityList = async () => {
    try {
      const res = await api.get(
        `/posts?type=${query.type}&page=${query.page}&size=${query.size}`,
      );
      return res.data.data.content;
    } catch (error) {
      throw new Error('error');
    }
  };

  const { data, refetch } = useQuery(
    ['community-list'],
    () => getCommunityList(),
    {
      onError: (error: Error) => {
        alert(error.message);
      },
    },
  );

  const handleDetailPage = (id: number) => {
    router.push(`community/${id}`);
  };

  useEffect(() => {
    refetch();
  }, [router]);

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
            isActive={query.type === item.type}
          >
            {item.name}
          </Tab>
        ))}
      </TabList>
      <BoardList>
        {data?.map((item: communityDetailType, index: number) => (
          <Board data={item} key={index} onClick={handleDetailPage} />
        ))}
      </BoardList>
    </CommunityStyled>
  );
};

export default Page;
