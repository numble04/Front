import { InquiryIcon, InfoIcon, MoreSeeIcon } from 'components/UI/atoms/Icon';
import router from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import { MeetingUser, TabProps } from 'types/meeting';
import Profile from './Profile';
import SmallMap from './SmallMap';
import WaitingMembers from './WaitingMember';

function Tab ({data, refetch}: TabProps) {
  const [ tab, setTab ] = useState<string>('member');
  const [isWaitingMember, setIsWaitingMember] = useState(false);
  const onClickMoreSee = () => {
    setIsWaitingMember(true);
  }
  return (
    <TabWrapper>
      <WaitingMembers
        onChangeIsWaitingMember={setIsWaitingMember}
        isWaitingMember={isWaitingMember}
        data={data}
        refetch={refetch}
      />
      <TabTitle>
        <TabButton onClick={() => setTab('member')} tab='member' currentTab={tab}>멤버</TabButton>
        <TabButton onClick={() => setTab('area')} tab='area' currentTab={tab}>위치</TabButton>
        <TabButton onClick={() => setTab('inquiry')} tab='inquiry' currentTab={tab}>문의</TabButton>
      </TabTitle>
      {tab === 'area' ? 
        <TabContent>
          <Title>위치</Title>
          <SmallMap
            latitude={data.latitude}
            longitude={data.longitude}
            cafeImg={data.img}
            cafeName={data.cafeName}
            cafeAddress={data.cafeAddress}
          />
        </TabContent>
        :
        tab === 'member' ?
        <TabContent>
          <MemberContainer>
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
          </MemberContainer>
          {data.isLeader &&
            <MemberContainer>
              <WaitingMemberTitleWrapper>
                <Title>승인 대기 멤버</Title>
                <MoreSeeWrapper onClick={onClickMoreSee}>
                  <div>더보기</div>
                  <MoreSeeIcon />
                </MoreSeeWrapper>
              </WaitingMemberTitleWrapper>
              <WaitingMemberWrapper>
                {data.users.map((user: MeetingUser) => {
                  if(!user.isApproved) {
                    return (
                      <ProfileWrapper key={user.id}>
                        <ProfileImg src={`${user.img === null ? `/images/default_profile.png` : user.img}`} alt={user.nickname}/>
                        <Nickname><span>{user.nickname}</span></Nickname>
                      </ProfileWrapper>
                    )
                  }
                })}
              </WaitingMemberWrapper>
            </MemberContainer>
        }
        </TabContent>
        :
        <TabContent>
          <Title>문의</Title>
          <InquiryButton onClick={() => router.push(data.kakaoUrl)}>
            <InquiryIcon />
            <div>오픈 채팅 접속하기</div>
          </InquiryButton>
          <Infomation>
            <InfoIcon />
            <div>위의 오픈채팅을 통해 궁금한 것을 물어보세요.</div>
          </Infomation>
        </TabContent>
      }
    </TabWrapper>
  );
}

export default Tab;

const Title = styled.h2`
  font-size: 1rem;
  font-weight: 600;
`;

const TabWrapper = styled.div`
  background-color: #ffffff;
  padding: 2rem 0 4rem 0;
`;

const TabTitle = styled.div`
  display: flex;
  border-bottom: 3px solid #F4F4F4;
`;

type TabButtonProps = {
  tab: string;
  currentTab: string;
}

const TabButton = styled.button<TabButtonProps>`
  width: 48px;
  height: 30px;
  border: none;
  outline: none;
  background-color: #ffffff;
  cursor: pointer;
  color: ${({tab, currentTab}) => tab === currentTab ? '#3A3A3A' : '#AAAAAA'};
  border-bottom: ${({tab, currentTab}) => tab === currentTab ? '3px solid #5B0FD1' : 'none'};
`;

const TabContent = styled.div`
  margin-top: 30px;
`;

const MemberContainer = styled.div`
  padding: 0px 10px 20px 10px;
  border-bottom: 3px solid #F4F4F4;
`;

const WaitingMemberTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > div {
    display: flex;
    align-items: center;
    font-size: 10px;
    & > div {
      margin-right: 4px;
    }
  }
`;

const MoreSeeWrapper = styled.div`
  cursor: pointer;
`;

const WaitingMemberWrapper = styled.div`
  display: flex;
  height: 60px;
  overflow: hidden;
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
  margin-bottom: 4px;
`;

const Nickname = styled.div`
  width: 60px;
  font-size: 12px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  & > span {
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
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