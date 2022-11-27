import { GetServerSideProps } from 'next';
import styled from 'styled-components';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Header from 'components/UI/Header';
import { useRouter } from 'next/router';
import api from 'lib/api';

type communityDetailType = {
  commentCount: number;
  comments: any; // 타입 모름
  content: string;
  createDate: string;
  images: any; // 타입 모름
  likeCount: number;
  myLike: boolean;
  myPost: boolean;
  nickname: string;
  postId: number;
  title: string;
  updateDate: string;
  userImg: boolean;
  viewCount: number;
};

type PageProps = {
  id: number;
};

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

const Page = ({ id }: PageProps) => {
  const [data, setData] = useState<communityDetailType>();
  const router = useRouter();

  const getCommunityDetail = useCallback(async () => {
    try {
      const res = await api.get(`/posts/${id}`);
      setData(res.data.data);
    } catch (error) {
      throw new Error('error');
    }
  }, []);

  useEffect(() => {
    getCommunityDetail();
  }, []);

  if (data === undefined) {
    // 임시 코드
    return <Fragment>데이터 없음</Fragment>;
  }

  return (
    <Fragment>
      <Header>
        <Image
          src="/icons/back.svg"
          alt="back"
          width={24}
          height={24}
          onClick={() => router.back()}
        />
      </Header>
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
        <span className="viewCount">조회수 {data.viewCount}</span>
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
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id;

  return {
    props: { id },
  };
};

export default Page;
