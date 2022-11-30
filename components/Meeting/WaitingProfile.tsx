import Modal from 'components/UI/Modal';
import api from 'lib/api';
import router from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import { ProfileProps } from 'types/meeting';

function WaitingProfile ({user, isLeader, refetch}: ProfileProps) {
  const { id } = router.query;
  const [modalVisible, setModalVisible] = useState(false);
  const approveUser = async () => {
    await api.put(`/meetings/${id}/approve/${user.id}`);
    refetch();
  }
  const rejectUser = async () => {
    await api.put(`/meetings/${id}/reject/${user.id}`);
    refetch();
  }
  return (
    <Wrapper>
      <ImgWrapper>
        <Img src={`${user.img === null ? `/images/default_profile.png` : user.img}`}/>
      </ImgWrapper>
      <div>
        <Nickname>{user.nickname}</Nickname>
        <Location>{user.region}</Location>
      </div>
      {isLeader && !user.isLeader && <EjectedButton onClick={() => setModalVisible(true)}>확인하기</EjectedButton>}
      <Modal
        isOpen={modalVisible}
        onClickLeft={approveUser}
        onClickRight={rejectUser}
        onClickOutside={() => setModalVisible(false)}
        type={'question'}
        question='승인여부를 선택해주세요.'
        left='승인하기'
        right='거절하기'
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
`;

const ImgWrapper = styled.div`
  margin-right: 10px;
`

const Img = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`

const Nickname = styled.div`
  font-size: 14px;
  color: #3A3A3A;
`

const Location = styled.div`
  font-size: 12px;
  margin-top: 2px;
  color: #B7B7B7;
`

const EjectedButton = styled.button`
  position: absolute;
  width: 60px;
  height: 25px;
  right: 0;
  background-color: ${theme.colors.PRIMARY};
  border: none;
  border-radius: 50px;
  color: #FFFFFF;
  font-weight: 500;
  font-size: 12px;
  line-height: 17px;
  cursor: pointer;
`

export default WaitingProfile;