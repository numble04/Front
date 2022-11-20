import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

const Board = () => {
  return (
    <StyledBoard>
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
            <span className="name">시술</span>
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
      <BoardContent>
        OO동에 이사온지 얼마 되지 않아 아는 친구가 한 명도 없어요ㅜㅜ 나이는
        25살 여자입니다! 같이 보드게임 하실 동네 친구 구해요!
      </BoardContent>
      <BoardBottom>
        <span className="viewCount">조회수 290</span>
        <div className="boardIcons">
          <IconBox>
            <Image
              src="/icons/heartFill.svg"
              className="heart"
              width={20}
              height={20}
              alt="heart"
            />
            <span>120</span>
          </IconBox>
          <IconBox>
            <Image
              src="/icons/chat.svg"
              className="chat"
              width={20}
              height={17.5}
              alt="chat"
            />
            <span>20</span>
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
