import { Dispatch, SetStateAction } from "react";
import { RefetchOptions, RefetchQueryFilters, QueryObserverResult } from "react-query";

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
  meeting : MeetingProps;
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

export type TabProps = {
  data : MeetingDetailProps,
  refetch : <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, Error>>;
};

export interface MeetingUser {
  id : number,
  img : string | null,
  isApproved : boolean,
  isLeader : boolean,
  nickname : string,
  region : string,
}

export type ProfileProps = {
  user : MeetingUser;
  isLeader : boolean;
  refetch : <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, Error>>;
};

export type WaitingMemberProps = {
  isWaitingMember : boolean;
  onChangeIsWaitingMember : Dispatch<SetStateAction<boolean>>;
  data : MeetingDetailProps;
  refetch : <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, Error>>;
};

export type SortMeetingProps = {
  isOpen : boolean;
  setIsOpen : Dispatch<SetStateAction<boolean>>;
  sort : string;
  setSort : Dispatch<SetStateAction<string>>;
};

export type Area = {
  city: string;
  dong: string;
  x: number;
  y: number;
}

export type AreaFilterProps = {
  isOpen : boolean;
  setIsOpen : Dispatch<SetStateAction<boolean>>;
  setArea : Dispatch<SetStateAction<Area>>;
};