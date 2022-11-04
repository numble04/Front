export type MeetingProps = {
  id: string;
  title: string;
  content: string;
  location: string;
  date: string;
  price: number;
  numberOfParticipants: number;
  maximumNumber: number;
  image: string[];
}

export type MeetingCardProps = {
  meeting: MeetingProps;
};
