import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from 'components/Button';
import Board from 'components/Community/Board/Board';
import Header from 'components/UI/Header';
import { Input } from 'components/ui/Input/Input';
import api from 'lib/api';
import Image from 'next/image';
import { SearchResponseType } from 'types/community';

const StyledSearch = styled.div`
  input {
    width: 260px;
  }
  button {
    color: #7b2ef0;
  }
`;

const Search = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>('');
  const [searchData, setSearchData] = useState<SearchResponseType[]>();

  const handleSearch = async () => {
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

  const handleOnKeyUp = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleKeyword = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setKeyword(event.target.value);
  };

  const handleDetailPage = (id: number) => {
    router.push(`community/${id}`);
  };

  return (
    <StyledSearch>
      <Header>
        <Image
          src="/icons/back.svg"
          alt="back"
          width={24}
          height={24}
          onClick={() => router.back()}
        />
        <Input onChange={handleKeyword} onKeyUp={handleOnKeyUp} />
        {keyword !== '' && <Button>취소</Button>}
      </Header>
      {searchData?.map((item, index) => (
        <Board data={item} key={index} onClick={handleDetailPage} />
      ))}
    </StyledSearch>
  );
};

export default Search;
