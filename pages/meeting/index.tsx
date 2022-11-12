import Map from 'components/UI/atoms/Map';
import { MeetingCard } from 'components/UI/molecules/MeetingCard';
import { meetings } from 'constant/meeting';
import type { NextPage } from 'next';
import styled from 'styled-components';

const Page: NextPage = () => {
  return (
    <Container>
      <Title>모임</Title>
      <div>
        <Map latitude={37.502166} longitude={127.026608}/>
      </div>
      <CardWrapper>
        <div>매칭</div>
        {meetings.map((item) => (
          <MeetingCard key={item.id} meeting={item} />
        ))}
      </CardWrapper>
    </Container>
  );
};

export default Page;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Title = styled.div`
  width: 100%;
  heigth: 4rem;
  text-align: center;
  line-height: 3rem;
  background-color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
`;

const CardWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  margin: 0.2rem 0;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;
