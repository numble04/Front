import { timeForToday } from 'hooks/useTimeToday';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { communityDetailType } from 'types/community';

const Board = ({
  data,
  onClick,
}: {
  data: communityDetailType;
  onClick: (id: number) => void;
}) => {
  return (
    <StyledBoard onClick={() => onClick(data.id)}>
      <BoardHeader>
        <HeaderMain>
          <div>
            <img
              src={`${data.userImg ?? '/images/default_profile.png'}`}
              alt="profileImage"
              className="boardImage"
            />
          </div>
          <HeaderTitle>
            <span className="name">{data.nickname}</span>
            <span className="time">{timeForToday(data.createDate)}</span>
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
      {data.thumbnail !== null && (
        <ThumnailImage src={data.thumbnail} alt="thumbnail" />
      )}
      <BoardContent>{data.content}</BoardContent>
      <BoardBottom>
        <span className="viewCount">조회수 {data.viewCount}</span>
        <div className="boardIcons">
          <IconBox>
            <Image
              src={`/icons/${data.myLike ? 'heartFill' : 'heartEmpty'}.svg`}
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
  cursor: pointer;
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
  img {
    width: 48px;
    height: 48px;
  }
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

const ThumnailImage = styled.img`
  margin-bottom: 10px;
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
