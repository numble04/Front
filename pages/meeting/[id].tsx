import { BackIcon, CalendarIcon, CostIcon, HeartIcon, MemberIcon, ModifyIcon, RedHeartIcon, TimeIcon } from 'components/UI/Icon/Icon';
import api from 'lib/api';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import Modal from 'components/UI/Modal';
import Tab from 'components/Meeting/Tab';

const Page: NextPage = () => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [leaveModalVisible, setLeaveModalVisible] = useState(false);
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

  const deleteMeeting = async () => {
    await api.delete(`/meetings/${id}`);
    router.push('/meeting');
  }

  const leaveMeeting = async () => {
    await api.delete(`/meetings/${id}/leave`);
    setLeaveModalVisible(false);
    refetch();
  }

  const onClick = async () => {
    if(data.isLeader) {
      router.push(`/createMeeting/${data.id}`)
      return;
    }
    if(data.isFull) {
      alert('인원이 가득찬 모임입니다.');
      return;
    }
    if(data.isRegistered) {
      setLeaveModalVisible(true);
      return;
    }
    await api.post(`/meetings/${id}/register`);
    refetch();
  }

  const onClickHeart = async () => {
    await api.put(`/meetings/${id}/like`);
    refetch();
  }

  return (
    <Container>
      <Header>
        <IconWrapper onClick={() => router.back()}>
          <BackIcon />
        </IconWrapper>
        <IconWrapper onClick={() => setDeleteModalVisible(true)}>
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
        <HeartButton onClick={onClickHeart}>
          {data.myLike ? <RedHeartIcon /> : <HeartIcon />}
        </HeartButton>
        <Button onClick={onClick} isLeader={data.isLeader} isRegistered={data.isRegistered}>
          {data.isLeader ? '수정하기' : (!data.isRegistered ? '참여하기' : (!data.isAttended ? '참여 등록 취소하기' : '참여 취소하기'))}
        </Button>
      </Footer>
      <Modal
        isOpen={deleteModalVisible}
        onClickUp={deleteMeeting}
        onClickDown={() => setDeleteModalVisible(false)}
        onClickOutside={() => setDeleteModalVisible(false)}
        type={'twoButton'}
        up='모임 삭제하기'
        down='취소하기'
      />
      <Modal
        isOpen={leaveModalVisible}
        onClickLeft={() => setLeaveModalVisible(false)}
        onClickRight={leaveMeeting}
        onClickOutside={() => setLeaveModalVisible(false)}
        type={'question'}
        question={data.isAttended ? '모임을 취소하시겠어요?' : '모임 등록을 취소하시겠어요?'}
        left='유지'
        right='취소하기'
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
  display: flex;
  align-items: center;
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

const Button = styled.button<{isLeader: string; isRegistered: string;}>`
  outline: none;
  border: none;
  width: 100%;
  height: 3rem;
  border-radius: 52px;
  cursor: pointer;
  color: ${({isLeader, isRegistered}) => isLeader || isRegistered ? theme.colors.PRIMARY : '#FFFFFF'};
  background-color: ${({isLeader, isRegistered}) => isLeader || isRegistered ? '#EBDEFF' : theme.colors.PRIMARY};
  font-weight: 500;
  font-size: 16px;
`;