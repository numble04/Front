import styled from 'styled-components';
import { ProfileProps } from 'types/meeting';

function Profile({user}: ProfileProps) {
  return (
    <Wrapper>
      <ImgWrapper>
        <Img src={`${user.img === null ? `/images/default_profile.png` : user.img}`}/>
      </ImgWrapper>
      <div>
        <Nickname>{user.nickname}</Nickname>
        <Location>{user.region}</Location>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
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

export default Profile;