/* eslint-disable @next/next/no-img-element */
import { DateIcon, LocationIcon, MeetingIcon } from 'components/ui/atoms/Icon';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { MeetingCardProps } from 'types';

export const MeetingCard = (props: MeetingCardProps) => {
  const { meeting } = props;
  const router = useRouter();
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
          <Text style={{ marginRight: `40px` }}>
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
    </Container>
  );
};

const Container = styled.div`
  height: 5.5rem;
  display: flex;
  margin: 0.2rem 0;
`;

const Img = styled.img`
  width: 110px;
  height: 68px;
  border-radius: 4px;
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
