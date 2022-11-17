import { BackIcon } from 'components/ui/atoms/Icon';
import Map from 'components/ui/atoms/Map';
import { meetings } from 'constant/meeting';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MeetingProps } from 'types';

const Page: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [meeting, setMeeting] = useState<MeetingProps>({
    id: '',
    title: '',
    content: '',
    location: {
      name: '',
      detail: '',
      lat: 0,
      lng: 0,
    },
    date: '',
    price: 0,
    numberOfParticipants: 0,
    maximumNumber: 0,
    image: [],
  });
  useEffect(() => {
    if (!router.isReady) return;
    setMeeting(meetings.filter((meeting) => meeting.id === id)[0]);
  }, [router.isReady]);
  return (
    <Container>
      <BackWrapper onClick={() => router.back()}>
        <BackIcon />
      </BackWrapper>
      <ImgWrapper>
        <Img src={meeting.image[0]} alt={meeting.id} />
      </ImgWrapper>
      <MainWrapper>
        <TitleWrapper>
          <Title>{meeting.title}</Title>
          <Content>{meeting.content}</Content>
        </TitleWrapper>
        <GuideWrapper>
          <Title>안내사항</Title>
          <GridWrapper>
            <div>날짜</div>
            <div>Play시간</div>
            <div>{meeting.price}원</div>
            <div>{meeting.maximumNumber}명</div>
          </GridWrapper>
        </GuideWrapper>
        <TapWrapper>
          <Title>위치</Title>
          <div>
            <Map
              latitude={meeting.location.lat}
              longitude={meeting.location.lng}
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
