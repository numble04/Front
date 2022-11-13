import Map from 'components/UI/atoms/Map';
import { MeetingCard } from 'components/UI/molecules/MeetingCard';
import List from 'components/UI/organisms/Modal';
import { meetings } from 'constant/meeting';
import type { NextPage } from 'next';
import styled from 'styled-components';

const Page: NextPage = () => {
  return (
    <Container>
      <Title>모임</Title>
      <MapWrapper>
        <Map latitude={37.502166} longitude={127.026608} />
      </MapWrapper>
      <List />
    </Container>
  );
};

export default Page;

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const MapWrapper = styled.div`
  position: absolute;
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
