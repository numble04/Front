import { ExpandMoreIcon } from 'components/ui/atoms/Icon';
import Map from 'components/ui/atoms/Map';
import useList from 'hooks/useList';
import type { NextPage } from 'next';
import styled from 'styled-components';

const Page: NextPage = () => {
  const { List, openList, closeList } = useList();
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
      <MapWrapper onClick={closeList}>
        <Map latitude={37.502166} longitude={127.026608} />
      </MapWrapper>
      <ListButton onClick={openList}>목록보기</ListButton>
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

const ListButton = styled.button`
  width: 84px;
  height: 40px;
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  background-color: #f3f3f3;
  border-radius: 20px;
  border: none;
  margin-right: 8px;
  z-index: 3;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;
