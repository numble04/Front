import Modal from 'components/UI/Modal';
import api from 'lib/api';
import router from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';
import { ProfileProps } from 'types/meeting';

function Profile({user, isLeader, refetch}: ProfileProps) {
  const { id } = router.query;
  const [modalVisible, setModalVisible] = useState(false);
  const ejectedUser = async () => {
    await api.put(`/meetings/${id}/ban/${user.id}`);
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
      {isLeader && !user.isLeader && <EjectedButton onClick={() => setModalVisible(true)}>보내기</EjectedButton>}
      <Modal
        isOpen={modalVisible}
        onClickRight={ejectedUser}
        onClickLeft={() => setModalVisible(false)}
        onClickOutside={() => setModalVisible(false)}
        type={'question'}
        question='멤버를 내보시겠어요?'
        left='취소'
        right='보내기'
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
  background-color: #FEE1E3;
  border: none;
  border-radius: 50px;
  color: #ED4954;
  font-weight: 500;
  font-size: 12px;
  line-height: 17px;
  cursor: pointer;
`

export default Profile;