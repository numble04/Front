export type MeetingProps = {
  id: string;
  title: string;
  content: string;
  location: {
    name: string;
    detail: string;
    lat: number;
    lng: number;
  };
  date: string;
  price: number;
  numberOfParticipants: number;
  maximumNumber: number;
  image: string[];
};

export type MeetingCardProps = {
  meeting: MeetingProps;
};
