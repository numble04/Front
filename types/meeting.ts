export interface MeetingProps {
  cafeName : string,
  day : string,
  id : number,
  img : string | null,
  isFull : boolean,
  latitude : number,
  longitude : number,
  maxPersonnel :  number,
  nowPersonnel : number,
  title : string,
}

export type MeetingCardProps = {
  meeting: MeetingProps;
};