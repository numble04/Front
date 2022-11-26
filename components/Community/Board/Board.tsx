import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

interface BoardType {
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
  onClick: (id: number) => void;
}

const Board = ({ data, onClick }: BoardType) => {
  return (
    <StyledBoard onClick={() => onClick(data.id)}>
      <BoardHeader>
        <HeaderMain>
          <div>
            <Image
              src="/image.png"
              alt="profileImage"
              className="boardImage"
              width={48}
              height={48}
            />
          </div>
          <HeaderTitle>
            <span className="name">{data.nickname}</span>
            <span className="time">6시간 전</span>
          </HeaderTitle>
        </HeaderMain>
        <Image
          src="/icons/meatballs.svg"
          alt="meatballs"
          className="meatballs"
          width={15.5}
          height={3.3}
        />
      </BoardHeader>
      <BoardContent>{data.content}</BoardContent>
      <BoardBottom>
        <span className="viewCount">{data.viewCount}</span>
        <div className="boardIcons">
          <IconBox>
            <Image
              src="/icons/heartFill.svg"
              className="heart"
              width={20}
              height={20}
              alt="heart"
            />
            <span>{data.likeCount}</span>
          </IconBox>
          <IconBox>
            <Image
              src="/icons/chat.svg"
              className="chat"
              width={20}
              height={17.5}
              alt="chat"
            />
            <span>{data.commentCount}</span>
          </IconBox>
        </div>
      </BoardBottom>
    </StyledBoard>
  );
};

const StyledBoard = styled.div`
  display: flex;
  flex-direction: column;

  padding: 24px 19px 30px;
`;

const BoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;

  .boardImage {
    border-radius: 50%;
  }
  .meatballs {
    cursor: pointer;
  }
`;
const HeaderMain = styled.div`
  display: flex;
`;

const HeaderTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 12px;
  padding: 4px 0;

  .name {
    font-size: 16px;
    color: #3a3a3a;
  }
  .time {
    font-size: 14px;
    color: #aaaaaa;
  }
`;

const BoardContent = styled.div`
  font-size: 14px;
  margin-bottom: 30px;
`;

const BoardBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .viewCount {
    font-size: 14px;
    color: #aaaaaa;
  }

  .boardIcons {
    display: flex;
  }
`;

const IconBox = styled.div`
  display: flex;

  cursor: pointer;

  :not(:last-child) {
    margin-right: 20px;
  }
  span {
    font-size: 14px;
    color: #3a3a3a;
    margin-left: 6px;
  }
`;

export default Board;
