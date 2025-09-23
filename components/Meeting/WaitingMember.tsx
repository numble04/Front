import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { MeetingUser, WaitingMemberProps } from 'types/meeting';
import WaitingProfile from './WaitingProfile';
import { BackIcon } from 'components/UI/Icon/Icon';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: 100vh;
  max-width: 32rem;
  background-color: #FFFFFF;
  z-index: 3;
`;

const WaitingMembers = ({ isWaitingMember, onChangeIsWaitingMember, data, refetch }: WaitingMemberProps) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const el = useRef<HTMLDivElement>(null);

  // HINT: 모달 오버레이에서 스크롤 방지
  useEffect(() => {
    if (isWaitingMember) {
      document.body.style.cssText = `
        position: fixed; 
        // top: -${window.scrollY}px;
        // overflow-y: scroll;
        width: 100%;
      `;

      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = '';
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      };
    }
  }, [isWaitingMember]);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modalContent = isWaitingMember ? (
    <ModalOverlay ref={el}>
      <TitleWrapper>
        <IconWrapper onClick={() => onChangeIsWaitingMember(false)}>
          <BackIcon />
        </IconWrapper>
        <Title>승인 대기 멤버</Title>
        <Space />
      </TitleWrapper>
      <ContentWrapper>
        {
          data.users.map((user: MeetingUser) => {
            if(!user.isApproved){
              return (
                <WaitingProfile key={user.id} user={user} isLeader={data.isLeader} refetch={refetch}/>
              )
            }
          } 
        )}
      </ContentWrapper>
    </ModalOverlay>
  ) : null;

  if (isBrowser) {
    const modalRootElement = document.getElementById('modal-root');
    if (modalRootElement) {
      return createPortal(modalContent, modalRootElement);
    }
  }

  return null;
};

const TitleWrapper = styled.div`
  height: 60px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #e5e5e5;
`

const IconWrapper = styled.div`
  width: 24px;
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 16px;
  color: #3A3A3A;
`

const Space = styled.div`
  width: 24px;
  height: 24px;
`

const ContentWrapper = styled.div`
  padding: 0 20px;
`;

export default WaitingMembers;
