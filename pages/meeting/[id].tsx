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

const Page: NextPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [ tap, setTap ] = useState<string>('area');
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
        <TapWrapper>
          <TapTitle>
            <TapButton onClick={() => setTap('area')} tap='area' currentTap={tap}>위치</TapButton>
            <TapButton onClick={() => setTap('member')} tap='member' currentTap={tap}>멤버</TapButton>
            <TapButton onClick={() => setTap('inquiry')} tap='inquiry' currentTap={tap}>문의</TapButton>
          </TapTitle>
          {tap === 'area' ? 
            <TapContent>
              <Title>위치</Title>
              <SmallMap
                latitude={data.latitude}
                longitude={data.longitude}
                cafeImg={data.img}
                cafeName={data.cafeName}
                cafeAddress={data.cafeAddress}
              />
            </TapContent>
            :
            tap === 'member' ?
            <TapContent>
              <div>
                <Title>멤버소개</Title>
                <div>
                  {data.users.map((user: MeetingUser) => {
                      if(user.isApproved){
                        return (
                          <Profile key={user.id} user={user} isLeader={data.isLeader} refetch={refetch}/>
                        )
                      }
                    } 
                  )}
                </div>
              </div>
              <div>
                <Title>승인 대기 멤버</Title>
                <WaitingMemberWrapper>
                  {data.users.map((user: MeetingUser) => {
                    if(!user.isApproved) {
                      return (
                        <ProfileWrapper key={user.id}>
                          <ProfileImg src={`${user.img === null ? `/images/default_profile.png` : user.img}`} alt={user.nickname}/>
                          <Nickname>{user.nickname}</Nickname>
                        </ProfileWrapper>
                      )
                    }
                  })}
                </WaitingMemberWrapper>
              </div>
            </TapContent>
            :
            <TapContent>
              <Title>문의</Title>
              <InquiryButton onClick={() => router.push(data.kakaoUrl)}>
                <InquiryIcon />
                <div>오픈 채팅 접속하기</div>
              </InquiryButton>
              <Infomation>
                <InfoIcon />
                <div>위의 오픈채팅을 통해 궁금한 것을 물어보세요.</div>
              </Infomation>
            </TapContent>
          }
        </TapWrapper>
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

const TapWrapper = styled.div`
  background-color: #ffffff;
  padding: 2rem 0 4rem 0;
`;

const TapTitle = styled.div`
  display: flex;
  border-bottom: 3px solid #F4F4F4;
`;

type TapButtonProps = {
  tap: string;
  currentTap: string;
}

const TapButton = styled.button<TapButtonProps>`
  width: 48px;
  height: 30px;
  border: none;
  outline: none;
  background-color: #ffffff;
  cursor: pointer;
  color: ${({tap, currentTap}) => tap === currentTap ? '#3A3A3A' : '#AAAAAA'};
  border-bottom: ${({tap, currentTap}) => tap === currentTap ? '3px solid #5B0FD1' : 'none'};
`;

const TapContent = styled.div`
  margin-top: 30px;
  padding: 0 10px;
  border-bottom: 3px solid #F4F4F4;
`;

const WaitingMemberWrapper = styled.div`
  display: flex;
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justfiy-content: center;
  align-items: center;
  margin-right: 12px;
`;

const ProfileImg = styled.img`
  width: 36px;
  height: 36px;
  object-fit: cover;
  border-radius: 50%;
`;

const Nickname = styled.div`
  font-size: 12px;
`;

const InquiryButton = styled.button` 
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${theme.colors.PRIMARY};
  background-color: #EBDEFF;
  border: solid 1px ${theme.colors.PRIMARY};
  border-radius: 8px;
  cursor: pointer;
  & > div {
    margin-bottom: 4px;
  }
`;

const Infomation = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  margin-top: 24px;
  padding: 0 12px;
  background-color: #f2f2f2;
  color: #848283;
  font-size: 12px;
  border-radius: 8px;
  & > div {
    margin-left: 4px;
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