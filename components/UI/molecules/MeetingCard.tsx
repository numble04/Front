/* eslint-disable @next/next/no-img-element */
import { DateIcon, LocationIcon, MeetingIcon } from 'components/UI/atoms/Icon';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { MeetingCardProps } from 'types';

export const MeetingCard = (props: MeetingCardProps) => {
  const { meeting } = props;
  const router = useRouter();
  const existMeeting =
    meeting.numberOfParticipants === meeting.maximumNumber ? false : true;
  return (
    <Container onClick={() => router.push(`/meeting/${meeting.id}`)}>
      <ImgWrapper>
        <Img src={meeting.image[0]} alt={meeting.id} />
      </ImgWrapper>
      <ContentWrapper>
        <Title>
          <span>{meeting.title}</span>
        </Title>
        <Text>
          <LocationIcon />
          <span>{meeting.location.detail}</span>
        </Text>
        <TextWrapper>
          <Text>
            <DateIcon />
            <span>{meeting.date}</span>
          </Text>
          <Text>
            <MeetingIcon />
            <span>
              {meeting.numberOfParticipants}/{meeting.maximumNumber}
            </span>
          </Text>
        </TextWrapper>
      </ContentWrapper>
      <ButtonWrapper>
        <Button existMeeting={existMeeting}>
          {existMeeting ? '모집' : '완료'}
        </Button>
      </ButtonWrapper>
    </Container>
  );
};

const Container = styled.div`
  height: 5rem;
  border: 1px solid #e5e5e5;
  border-radius: 0.2rem;
  margin: 0.4rem 0;
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const Img = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 0.4rem;
`;

const ImgWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
`;

const ContentWrapper = styled.div`
  padding: 0.5rem 0;
  flex-grow: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & > div {
    display: flex;
  }
`;

const Title = styled.div`
  font-weight: 500;
  overflow: hidden;
  display: flex;
  & > span {
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Text = styled.div`
  color: #888888;
  font-size: 10px;
  display: flex;
  align-items: center;
  & > svg {
    margin-right: 0.2rem;
  }
`;

const ButtonWrapper = styled.div`
  padding: 0.5rem;
  display: flex;
  align-items: center;
`;

type ButtonProps = {
  existMeeting: boolean;
};

const Button = styled.button<ButtonProps>`
  border: none;
  border-radius: 102px;
  width: 60px;
  height: 36px;
  align-text: center;
  line-height: 36px;
  background-color: ${({ existMeeting }) =>
    existMeeting ? '#7b2ef0' : '#E5E5E5'};
  color: #ffffff;
`;
