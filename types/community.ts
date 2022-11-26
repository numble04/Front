export interface SearchResponseType {
  commentCount: number;
  content: string;
  createDate: string;
  id: number;
  likeCount: number;
  myLike: boolean;
  myPost: boolean;
  nickname: string;
  thumbnail: any; // TODO: 타입 수정하기
  title: string;
  type: string;
  updateDate: string;
  userImg: any; // TODO: 타입 수정하기
  viewCount: number;
}

export interface BoardResponseType {
  data: {
    commentCount: number;
    content: string;
    createDate: string;
    id: number;
    likeCount: number;
    myLike: boolean;
    myPost: boolean;
    nickname: string;
    thumbnail: any; // TODO: 타입 수정하기
    title: string;
    type: string;
    updateDate: string;
    userImg: any; // TODO: 타입 수정하기
    viewCount: number;
  };
}

export interface BoardDetailType extends BoardResponseType {
  onClick: (id: number) => void;
}
