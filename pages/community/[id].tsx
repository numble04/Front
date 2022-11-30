import { GetServerSideProps } from 'next';
import styled from 'styled-components';
import React, { Fragment, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Header from 'components/UI/Header';
import { useRouter } from 'next/router';
import api from 'lib/api';
import { useQuery } from 'react-query';
import { timeForToday } from 'hooks/useTimeToday';

type PageProps = {
  id: number;
};

const StyledCommunityDetail = styled.div`
  .backIcon {
    cursor: pointer;
  }
`;

const BoardContainer = styled.div`
  max-height: calc(100vh - 192px);
  overflow-y: auto;
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

const ImageList = styled.div`
  img {
    width: 100%;
    margin-bottom: 16px;
  }
`;

const Page = ({ id }: PageProps) => {
  const router = useRouter();

  const { data, refetch } = useQuery(
    ['community-detail'],
    () => getCommunityDetail(),
    {
      onError: (error: Error) => {
        alert(error.message);
      },
    },
  );

  const getCommunityDetail = async () => {
    try {
      const res = await api.get(`/posts/${id}`);

      return res.data.data;
    } catch (error) {
      throw new Error('error');
    }
  };

  const handleLikeBoard = useCallback(async (id: number) => {
    try {
      await api.put(`/posts/${id}/like`);
      refetch();
    } catch (error) {
      throw new Error('post like error');
    }
  }, []);

  if (data === undefined) {
    // 임시 코드
    return <Fragment>데이터 없음</Fragment>;
  }

  return (
    <StyledCommunityDetail>
      <Header>
        <Image
          src="/icons/back.svg"
          className="backIcon"
          alt="back"
          width={24}
          height={24}
          onClick={() => router.back()}
        />
      </Header>
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
      <BoardContainer>
        <ImageList>
          {data.images?.map((item: string, index: number) => (
            <img src={item} alt="detail-image" key={index} />
          ))}
        </ImageList>
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
                onClick={() => handleLikeBoard(data?.postId!)}
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
      </BoardContainer>
    </StyledCommunityDetail>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id;

  return {
    props: { id },
  };
};

export default Page;
