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

export interface MeetingDetailProps {
  cafeAddress : string,
  cafeId : string,
  cafeName : string,
  content : string,
  cost : number,
  day : string,
  id : number,
  img : string | null,
  isFull : boolean,
  isLeader : boolean,
  isRegistered : boolean,
  kakaoUrl : string,
  latitude : number,
  likeCount : number,
  longitude : number,
  maxPersonnel :  number,
  myLike : boolean,
  nowPersonnel : number,
  time : number,
  title : string,
  users: MeetingUser[],
}

export interface MeetingUser {
  id : number,
  img : string | null,
  isApproved : boolean,
  isLeader : boolean,
  nickname : string,
  region : string,
}

export type ProfileProps = {
  user: MeetingUser;
};