import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import Board from 'components/Community/Board/Board';
import api from 'lib/api';
import Image from 'next/image';
import { communityDetailType } from 'types/community';
import { Input } from 'components/UI/Input/Input';

const Header = styled.div`
  display: flex;
  align-items: center;
  height: 80px;

  input {
    width: 400px;
    margin: 0 30px;
  }
  .backIcon {
    cursor: pointer;
  }
`;

const Search = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>('');
  const [searchData, setSearchData] = useState<communityDetailType[]>();

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword === '') {
      alert('검색어를 입력하세요.');
      return;
    }
    try {
      const res = await api.get(
        `/posts/search?type=FREE&searchWord=${keyword}&page=0&size=10`,
      );

      setSearchData(res.data.data.content);
    } catch (error) {
      throw new Error('error');
    }
  };

  const handleKeyword = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setKeyword(event.target.value);
  };

  const handleDetailPage = (id: number) => {
    router.push(`community/${id}`);
  };

  return (
    <form onSubmit={handleSearch}>
      <Header>
        <Image
          className="backIcon"
          src="/icons/back.svg"
          alt="back"
          width={24}
          height={24}
          onClick={() => router.back()}
        />
        <Input
          onChange={handleKeyword}
          placeholder="찾고 싶은 보드게임을 검색해 보세요"
        />
        {/* {keyword !== '' && <Button>취소</Button>} */}
      </Header>
      {searchData?.map((item, index) => (
        <Board data={item} key={index} onClick={handleDetailPage} />
      ))}
    </form>
  );
};

export default Search;
