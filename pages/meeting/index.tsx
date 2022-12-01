import { CreateIcon, ExpandMoreIcon, SortIcon } from 'components/UI/atoms/Icon';
import Map from 'components/Meeting/Map';
import useGeolocation, { useLocalInfos } from 'hooks/local';
import { useMeetingInfos } from 'hooks/meeting';
import useList from 'hooks/useList';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import SortMeeting from 'components/Meeting/SortMeeting';
import { useEffect, useState } from 'react';
import AreaFilter from 'components/Meeting/AreaFilter';
import { Area, MeetingProps } from 'types/meeting';
import { useLocalArea } from 'lib/zustand/store';
import { MeetingCard } from 'components/UI/molecules/MeetingCard';

const Page: NextPage = () => {
  const { localArea, setLocalArea } = useLocalArea();
  const [sortVisible, setSortVisible] = useState<boolean>(false);
  const [areaFilterVisible, setAreaFilterVisible] = useState<boolean>(false);
  const [meetingVisible, setMeetingVisible] = useState<boolean>(false);
  const [mapMeeting, setMapMeeting] = useState<MeetingProps>({
      cafeName : '',
      day : '',
      id : 0,
      img : null,
      isFull : false,
      latitude : 0,
      longitude : 0,
      maxPersonnel :  0,
      nowPersonnel : 0,
      title : '',
  });
  const [sort, setSort] = useState<string>('createdAt');
  const location = useGeolocation();
  const { lat, lng } = location.coordinates || {};
  const { localInfos, isLoading } = useLocalInfos({
    enabled: location.loaded && location.coordinates !== undefined,
    lng,
    lat,
  });
  const [area, setArea] = useState<Area>(localArea);

  const { meetings, refetch } = useMeetingInfos(
    sort,
    area.y,
    area.x,
    area,
  );
  const { List, openList, closeList } = useList(
    sort,
    area.y,
    area.x,
    area,
  );
  const router = useRouter();

  useEffect(() => {
    if(area.dong !== '') {
    refetch();
  }
  }, [sort, area.dong]);

  useEffect(() => {
    if (localInfos.length > 0) {
      setArea({
        city:
          localInfos[0].region_1depth_name === '서울'
            ? '서울특별시'
            : localInfos[0].region_2depth_name,
        dong: localInfos[0].region_3depth_name,
        x: localInfos[0].x,
        y: localInfos[0].y
      });
      setLocalArea({
        city:
          localInfos[0].region_1depth_name === '서울'
            ? '서울특별시'
            : localInfos[0].region_2depth_name,
        dong: localInfos[0].region_3depth_name,
        x: localInfos[0].x,
        y: localInfos[0].y
      });
    }
  }, [localInfos]);

  return (
    <Container>
      <SortMeeting
        isOpen={sortVisible}
        setIsOpen={setSortVisible}
        sort={sort}
        setSort={setSort}
      />
      <AreaFilter
        isOpen={areaFilterVisible}
        setIsOpen={setAreaFilterVisible}
        setArea={setArea}
      />
      <Header>
        <Title>
          <div>{area.dong}</div>
          <div
            onClick={() => setAreaFilterVisible(true)}
            style={{ cursor: 'pointer' }}
          >
            <ExpandMoreIcon />
          </div>
        </Title>
        <TitleContent>
          <FilterWrapper>
            <Filter onClick={() => setAreaFilterVisible(true)}>지역</Filter>
            <Filter>날짜</Filter>
          </FilterWrapper>
          <IconWrapper>
            <div onClick={() => setSortVisible(true)}>
              <SortIcon />
            </div>
            <div onClick={() => router.push('/createMeeting')}>
              <CreateIcon />
            </div>
          </IconWrapper>
        </TitleContent>
      </Header>
      <MapWrapper onClick={closeList}>
        <Map
          longitude={area.x}
          latitude={area.y}
          meetings={meetings}
          setMeetingVisible={setMeetingVisible}
          setMapMeeting={setMapMeeting}
        />
      </MapWrapper>
      <ListButton onClick={openList} meetingVisible={meetingVisible}>목록보기</ListButton>
      {meetingVisible &&
        <MapMeetingCardWrapper>
          <MeetingCard meeting={mapMeeting}/>
        </MapMeetingCardWrapper>
      }
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

const TitleContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  cursor: pointer;
`;

const IconWrapper = styled.div`
  width: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > div {
    cursor: pointer;
  }
`;

const ListButton = styled.button<{meetingVisible: boolean}>`
  width: 84px;
  height: 40px;
  position: fixed;
  bottom: ${({meetingVisible}) => meetingVisible ? '200px' : '100px'};
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  background-color: #f3f3f3;
  border-radius: 20px;
  border: none;
  margin-right: 8px;
  z-index: 3;
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
`;

const MapMeetingCardWrapper = styled.div`
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  background-color: #ffffff;
  padding: 6px;
  width: 90%;
  max-width: 30rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
`;
