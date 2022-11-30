import { BackIcon, CalendarIcon, CostIcon, HeartIcon, InfoIcon, InquiryIcon, MemberIcon, ModifyIcon, TimeIcon } from 'components/UI/atoms/Icon';
import SmallMap from 'components/Meeting/SmallMap';
import api from 'lib/api';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import Profile from 'components/Meeting/Profile';
import { MeetingUser } from 'types/meeting';
import Modal from 'components/UI/Modal';
import Tab from 'components/Meeting/Tab';

const Page: NextPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  
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
      console.log(res.data.data);
      return res.data.data;
    } catch (error) {
      throw new Error('error');
    }
  };
  if (data === undefined) {
    // 임시 코드
    return <Fragment>데이터 없음</Fragment>;
  }

  const deleteMeeting = async () => {
    await api.delete(`/meetings/${id}`);
    router.push('/meeting');
  }

  return (
    <Container>
      <Header>
        <IconWrapper onClick={() => router.back()}>
          <BackIcon />
        </IconWrapper>
        <IconWrapper onClick={() => setModalVisible(true)}>
          <ModifyIcon />
        </IconWrapper>
      </Header>
      <ImgWrapper>
        <Img src={`${data.img === null ? `/image.png` : data.img}`} alt={data.id} />
      </ImgWrapper>
      <MainWrapper>
        <TitleWrapper>
          <Title>{data.title}</Title>
          <Content>{data.content}</Content>
        </TitleWrapper>
        <GuideWrapper>
          <Title>안내사항</Title>
          <GridWrapper>
            <div>
              <CalendarIcon />
              <div>{data.day}</div>
            </div>
            <div>
              <TimeIcon />
              <div>총 {data.time}시간</div>
            </div>
            <div>
              <CostIcon />
              <div>{data.cost}원</div>
            </div>
            <div>
              <MemberIcon />
              <div>{data.maxPersonnel}명</div>
            </div>
          </GridWrapper>
        </GuideWrapper>
        <Tab data={data} refetch={refetch}/>
      </MainWrapper>
      <Footer>
        <HeartButton><HeartIcon /></HeartButton>
        <Button onClick={() => router.push('/createMeeting')}>{data.isLeader ? '수정하기' : '참여하기'}</Button>
      </Footer>
      <Modal
        isOpen={modalVisible}
        onClickUp={deleteMeeting}
        onClickDown={() => setModalVisible(false)}
        onClickOutside={() => setModalVisible(false)}
        type={'twoButton'}
        up='모임 삭제하기'
        down='취소하기'
      />
    </Container>
  ); 
};

export default Page;

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const IconWrapper = styled.div`
  background-color: #ffffff;
  padding: 1rem;
  cursor: pointer;
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
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    & > svg {
      margin-bottom: 6px;
    }
  }
`;

const Footer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4rem;
  padding: 0 16px;
  border-top: 1px solid #e2e4e8;
`;

const HeartButton = styled.button`
  background-color: #ffffff;
  outline: none;
  border: none;
  margin-right: 12px;
  cursor: pointer;
`;

const Button = styled.button`
  background-color: #EBDEFF;
  outline: none;
  border: none;
  width: 100%;
  height: 3rem;
  border-radius: 52px;
  cursor: pointer;
  color: ${theme.colors.PRIMARY};
  font-weight: 500;
  font-size: 16px;
`;