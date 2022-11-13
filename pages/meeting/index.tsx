import { ExpandMoreIcon } from 'components/UI/atoms/Icon';
import Map from 'components/UI/atoms/Map';
import List from 'components/UI/organisms/Modal';
import type { NextPage } from 'next';
import styled from 'styled-components';

const Page: NextPage = () => {
  return (
    <Container>
      <Header>
        <Title>
          <div>삼성동</div>
          <ExpandMoreIcon />
        </Title>
        <FilterWrapper>
          <Filter>지역</Filter>
          <Filter>날짜</Filter>
        </FilterWrapper>
      </Header>
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
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 24px;
  font-weight: 600;
  & > div {
    margin-right: 8px;
  }
  margin-bottom: 12px;
`;

const Header = styled.div`
  height: 110px;
  background-color: #ffffff;
  padding: 16px 30px;
`;

const FilterWrapper = styled.div`
  background-color: #ffffff;
`;

const Filter = styled.button`
  width: 54px;
  height: 30px;
  background-color: #f3f3f3;
  border-radius: 20px;
  border: none;
  margin-right: 8px;
`;
