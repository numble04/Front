export type MeetingCardProps = {
  meeting: {
    id: number;
    title: string;
    location: string;
    date: string;
    numberOfParticipants: number;
    maximumNumber: number;
    image: string;
  };
};
