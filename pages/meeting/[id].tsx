import { BackIcon } from 'components/UI/atoms/Icon';
import Map from 'components/UI/atoms/Map';
import api from 'lib/api';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

const Page: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, refetch } = useQuery(
    ['community-detail'],
    () => getCommunityDetail(),
    {
      onError: (error: Error) => {
        alert(error.message);
      },
    },
  );

  const getCommunityDetail = async () => {
    try {
      const res = await api.get(`/meetings/${id}`);
      return res.data.data;
    } catch (error) {
      throw new Error('error');
    }
  };
  if (data === undefined) {
    // 임시 코드
    return <Fragment>데이터 없음</Fragment>;
  }
  return (
    <Container>
      <BackWrapper onClick={() => router.back()}>
        <BackIcon />
      </BackWrapper>
      <ImgWrapper>
        <Img src={'/image.png'} alt={data.id} />
      </ImgWrapper>
      <MainWrapper>
        <TitleWrapper>
          <Title>{data.title}</Title>
          <Content>{data.content}</Content>
        </TitleWrapper>
        <GuideWrapper>
          <Title>안내사항</Title>
          <GridWrapper>
            <div>{data.day}</div>
            <div>총 {data.time}시간</div>
            <div>{data.cost}원</div>
            <div>{data.maxPersonnel}명</div>
          </GridWrapper>
        </GuideWrapper>
        <TapWrapper>
          <Title>위치</Title>
          <div>
            <Map
              latitude={data.latitude}
              longitude={data.longitude}
            />
          </div>
        </TapWrapper>
      </MainWrapper>
    </Container>
  );
};

export default Page;

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

const BackWrapper = styled.div`
  background-color: #ffffff;
  padding: 1rem;
`;

const ImgWrapper = styled.div`
  position: relative;
  width: 100%;
  &:after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;

const Img = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleWrapper = styled.div`
  background-color: #ffffff;
  padding: 1rem 1rem 3rem 1rem;
  border-bottom: 2px solid #e5e5e5;
`;

const Title = styled.h2`
  font-size: 1rem;
  font-weight: 600;
`;

const Content = styled.div``;

const GuideWrapper = styled.div`
  background-color: #ffffff;
  padding: 2rem 1rem 4rem 1rem;
  border-bottom: 2px solid #e5e5e5;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 100px);
  grid-template-columns: repeat(2, 1fr);
  row-gap: 1rem;
  column-gap: 1rem;
  & > div {
    border: 1px solid #e5e5e5;
    text-align: center;
    line-height: 100px;
  }
`;

const TapWrapper = styled.div`
  background-color: #ffffff;
  padding: 2rem 1rem 4rem 1rem;
`;
